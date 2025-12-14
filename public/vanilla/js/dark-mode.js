/**
 * LawGlitch Dark Mode Toggle
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
});

function initDarkMode() {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const darkIcon = document.getElementById('dark-icon');
  const lightIcon = document.getElementById('light-icon');
  
  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
  
  // Toggle button click
  toggleBtn.addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
      disableDarkMode();
      localStorage.setItem('theme', 'light');
    } else {
      enableDarkMode();
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
  
  function enableDarkMode() {
    document.body.classList.add('dark-mode');
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'block';
  }
  
  function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    darkIcon.style.display = 'block';
    lightIcon.style.display = 'none';
  }
}
