// Initialize theme on load
(function() {
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
})();

// Listen for theme changes from React
window.addEventListener('themeChanged', (e) => {
  const theme = e.detail?.theme;
  if(theme === 'dark') {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
});