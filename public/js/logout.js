$(document).ready(function() { 
  $(".logoutBtn").on("click", handleLogout); 

  function handleLogout() {
    $.get("/logout").then(function() {
      window.location.href = "/";
      console.log("logging out")
    })
  }
})