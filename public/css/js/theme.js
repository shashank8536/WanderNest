document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");

  if (document.documentElement.classList.contains("dark-mode")) {
    icon.textContent = "🌙";
  } else {
    icon.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    icon.classList.add("rotate");

    setTimeout(() => {
      if (document.documentElement.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        icon.textContent = "🌙";
      } else {
        localStorage.setItem("theme", "light");
        icon.textContent = "☀️";
      }
    }, 150);

    setTimeout(() => {
      icon.classList.remove("rotate");
    }, 300);
  });
});