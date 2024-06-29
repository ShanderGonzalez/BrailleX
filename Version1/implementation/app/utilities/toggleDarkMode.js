// toggleDarkMode.js
const toggleSwitch = document.getElementById('darkModeToggle');
toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
