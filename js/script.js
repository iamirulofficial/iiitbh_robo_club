/* Set the width of the side navigation according to screen size */
  function openNav() {
    if (screen.width >= 768) {
    document.getElementById("mySidenav").style.width = "350px";
  }
  else {
    document.getElementById("mySidenav").style.width = "100%";
  }}

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  $(document).mouseup(function (e)
    {
    var container = $("#mySidenav"); // YOUR CONTAINER SELECTOR
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      closeNav();
    }
  });