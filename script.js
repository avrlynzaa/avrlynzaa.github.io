function switchTab(tabName, event) {
  if (event) event.preventDefault();

  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  document.getElementById(`tab-${tabName}`).classList.add('active');

  if (event && event.target.classList.contains('nav-btn')) {
    event.target.classList.add('active');
  } else {
    const targetNav = document.querySelector(`nav a[onclick*="${tabName}"]`);
    if (targetNav) targetNav.classList.add('active');
  }
}

function openSection(sectionId) {
  document.getElementById(sectionId).classList.add('active');
}

function closeOverlay(sectionId) {
  document.getElementById(sectionId).classList.remove('active');
}