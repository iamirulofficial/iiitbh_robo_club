    // Initialize Firebase
    
    var config = {
        apiKey: "AIzaSyAOzIIUWqCvEUGxTeHBFpHXk-AL-Am7u4o",
        authDomain: "axis2019-47b13.firebaseapp.com",
        databaseURL: "https://axis2019-47b13.firebaseio.com",
        projectId: "axis2019-47b13",
        storageBucket: "axis2019-47b13.appspot.com",
        messagingSenderId: "282546345277"
    };
    firebase.initializeApp(config);
    var usersRef = firebase.database().ref().child('users');
    
    function showLogin(){
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.                
                document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'hidden';
                document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'visible';
                document.getElementsByClassName("myRegistrations")[0].style.visibility = 'visible';
                var emailkey = user.email;
                var key = emailkey.slice(0,emailkey.search('@'));
                key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 

                document.getElementsByClassName("clientName")[0].innerHTML = user.displayName;
                        
                firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
                    /*
                    document.getElementsByClassName("techNITi19id")[0].innerHTML = snapshot.val().axisid;
                    if (snapshot.val().phone == -1 && window.location.href !== "form.html")
                    {
                        var formPath = sessionStorage.getItem("formPath"); 
                        window.location.href = formPath;
                    }*/
                    
                    if(snapshot.val() == null && window.location.href !== "http://www.axisvnit.org/form.html")
                    {
                        var formPath = sessionStorage.getItem("formPath"); 
                        window.location.href = formPath;
                    }
                    else if ( snapshot.val() != null && snapshot.val().phone == -1 && window.location.href !== "form.html")
                    {
                        var formPath = sessionStorage.getItem("formPath"); 
                        window.location.href = formPath;
                    }
                    else if(snapshot.val() != null)
                    {
                        document.getElementsByClassName("techNITi19id")[0].innerHTML = snapshot.val().axisid;
                    }
                });   
            }
        });
    }

    showLogin();

    function logout(){
        document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'visible';        
        document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'hidden';
        document.getElementsByClassName("myRegistrations")[0].style.visibility = 'hidden'; 
        firebase.auth().signOut();
    }

    function login(){
        var user = firebase.auth().currentUser;
        if(user)
        {
            
        }   
        else
        {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider).then(function onSuccess(result) {
                
                document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'hidden';
                document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'visible';
                document.getElementsByClassName("myRegistrations")[0].style.visibility = 'visible';
                
                var user = firebase.auth().currentUser;
                var emailkey = user.email;
                var key = emailkey.slice(0,emailkey.search('@'));
                key = key.replace(/[^a-zA-Z0-9 ]/g, "") ;
                
                firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
                    // if signing in for the first time we cannot find any related entry in the database
                    if (snapshot.val() == null) 
                    {           
                        var formPath = sessionStorage.getItem("formPath");  
                        window.location.href = formPath;                        
                    }
                    else if( snapshot.val().phone == -1 && window.location.href !== "form.html" )
                    {
                        var formPath = sessionStorage.getItem("formPath");  
                        window.location.href = formPath;   
                    }
                    else
                    {
                        var axisid = (snapshot.val() && snapshot.val().axisid) || null;
                        document.getElementsByClassName("clientName")[0].innerHTML = user.displayName;
                        document.getElementsByClassName("techNITi19id")[0].innerHTML = axisid;
                    }
                });
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        }   
    }
    
    function generate_axis_id()
    {
        var r = Math.floor(Math.random()*1000) + 1;
        var d = new Date();
        var milisec = d.getMilliseconds();
        var day = d.getDate();
        r = Math.pow(r,2); milisec = Math.pow(milisec,2);
        r = (r+milisec)%1000;
        var id = ((r < 100)?'0': ((r<10)?'00':'') )+ r.toString();
        return "techNITi1919" + (day < 10 ? '0' : '') + day.toString() + id;
    }

    function signUp(gender,dob,college,phone,city)
    {   
        var user = firebase.auth().currentUser;
        if(user)
        {
            var emailkey = user.email;
            var key = emailkey.slice(0,emailkey.search('@'));
            key = key.replace(/[^a-zA-Z0-9 ]/g, "") ;
            var axis_id = generate_axis_id();

            firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
                // if signing in for the first time we cannot find any related entry in the database
                if(snapshot.val() == null)
                {
                    usersRef.child(key).set({
                            username: user.displayName,
                            email: user.email,
                            axisid: axis_id,
                            gender: gender,
                            DOB: dob,
                            college: college,
                            phone: phone,
                            city: city,
                            //set remaining fields as null  
                        }).then(function onSuccess(res) {
                            
                            alert("Successfully Signed Up \nAxis ID : " + axis_id + "\nYou can check your techNITi19 ID in myRegistrations tab");                
                            
                            var path = sessionStorage.getItem("path"); 
                            if(path == null){
                                window.location.href = "index.html";
                            }
                            else{
                                sessionStorage.removeItem("path");
                                sessionStorage.removeItem("formPath");                              
                                sessionStorage.clear();
                                if(path == 'guestLectures.html')
                                {
                                    alert("Now you can Register for guest lecture . Just click on Register button");
                                }
                                if(path == 'events/software_and_electronics/insomnia.html')
                                {
                                    alert("Now you can Register for insomnia . Just click on Register button");
                                }
                                if( path == 'events/software_and_electronics/electroblitz.html' )
                                {
                                    alert("Now you can Register for electroblitz . Just click on Register button");
                                }
                                if(path == 'events/software_and_electronics/posterolic.html')
                                {
                                    alert("Now you can Register for posterolic . Just click on Register button");
                                }
                                if(path == 'events/software_and_electronics/Cryptocrux.html')
                                {
                                    alert("Now you can Register for Cryptocrux . Just click on Register button");
                                }
                                if(path == 'events/igniting_minds/kartavya.html')
                                {
                                    alert("Now you can Register for kartavya . Just click on Register button");    
                                }
                                if(path == 'events/igniting_minds/technodocx.html')
                                {
                                    alert("Now you can Register for technodocx . Just click on Register button");                               
                                }
                                if(path == 'events/construction_and_design/aquaskylark.html')
                                {
                                    alert("Now you can Register for aquaskylark . Just click on Register button");
                                }
                                if(path == 'events/construction_and_design/crepido.html')
                                {
                                    alert("Now you can Register for crepido. Just click on Register button");
                                }
                                if(path == 'events/construction_and_design/devise.html')
                                {
                                    alert("Now you can Register for Devise . Just click on Register button");    
                                }
                                if(path == 'events/construction_and_design/paradeigma.html')
                                {
                                    alert("Now you can Register for paradeigma . Just click on Register button");
                                }
                                if(path == 'events/construction_and_design/turboflux.html')
                                {
                                    alert("Now you can Register for turboflux . Just click on Register button");
                                }
                                if(path == 'events/automation_and_robotics/aquahunt.html')
                                {
                                    alert("Now you can Register for aquahunt . Just click on Register button");
                                }
                                if(path == 'events/automation_and_robotics/autobot.html')
                                {
                                    alert("Now you can Register for autobot . Just click on Register button");
                                }
                                if(path == 'events/automation_and_robotics/electrogt.html')
                                {
                                    alert("Now you can Register for electrogt . Just click on Register button");    
                                }
                                if(path == 'events/automation_and_robotics/manual_robotics.html')
                                {
                                    alert("Now you can Register for manual_robotics . Just click on Register button");
                                }
                                if(path == 'events/automation_and_robotics/mechatryst.html')
                                {
                                    alert("Now you can Register for mechatryst . Just click on Register button");
                                }
                                if(path == 'events/automation_and_robotics/robocup.html')
                                {
                                    alert("Now you can Register for robocup . Just click on Register button");
                                }
                                if(path == 'events/automation_and_robotics/robowar.html')
                                {
                                    alert("Now you can Register for robowar . Just click on Register button");
                                }
                                if(path == 'events/analytics_and_others/221B.html')
                                {
                                    alert("Now you can Register for 221B . Just click on Register button");
                                }
                                if(path == 'events/analytics_and_others/FOM.html')
                                {
                                    alert("Now you can Register for FOM . Just click on Register button");
                                }
                                if(path == 'events/analytics_and_others/laserlitt.html')
                                {
                                    alert("Now you can Register for laserlitt . Just click on Register button");
                                }
                                if(path == 'events/analytics_and_others/whoistheboss.html')
                                {
                                    alert("Now you can Register for who is the boss . Just click on Register button");
                                }
                                window.location.href = path;
                            }
                        });   
                }
            });
        }
        else
        {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider).then(function onSuccess(result) {
                validate();
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        }
    }

    function validate()
    {
        var gender = document.forms["myForm"]["gender"].value;
        var dob = document.forms["myForm"]["dob"].value;
        var college = document.forms["myForm"]["college"].value;
        var phone = document.forms["myForm"]["phone1"].value;
        var city = document.forms["myForm"]["city"].value;
        
        if( phone.length != 10 )
        {
            alert("Enter valid mobile number ");
            return false;   
        }
        signUp(gender,dob,college,phone,city);
        return false;
    }
    function registrationClosed(){
        alert("Registration closed !");
    }