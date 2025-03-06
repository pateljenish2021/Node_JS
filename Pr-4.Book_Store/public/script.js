function loader() {
    document.querySelector(".loader-container").style.display = "none";
  }

  function fadeOut() {
    setTimeout(loader, 2000);
  }

  window.onload = fadeOut;