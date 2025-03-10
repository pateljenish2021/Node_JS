function loader() {
    const loader = document.querySelector(".loader-container");
    loader.style.opacity = "0";
    loader.style.visibility = "hidden"; 
  }
  
  function fadeOut() {
    setTimeout(loader, 300); 
  }
  
  window.onload = fadeOut;