'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const sidebarRevealer = document.querySelector('.sidebar-revealer')
  const hideSidebar = document.querySelector('.sidebar-hider')
  const sidebar = document.querySelector('.sidebar')
  const sidebarOpenerIcon = document.querySelector('.sidebarOpenerIcon')
  const blocker = document.querySelector('.blocker')
  const addNewBoard = document.querySelector('.addNewBoard')
  //  Available boards
  const createdBoards = ['platform']

  // Show number of created boards

  // =============//

  // change theme manually via theme-toggler
  document
    .querySelector('.theme-toggler')
    .addEventListener('click', function () {
      const whiteSquare = document.querySelector('.theme-toggler .bg-white')
      whiteSquare.classList.toggle('translate-x-4')
    })

  //===========//

  // WHEN hideSidebar icon ,in the sidebar, is clicked,
  // sidebar disappears and sidebar-revealer eye-icon appears
  hideSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('disAppearNow')
    sidebarRevealer.classList.toggle('appear')
  })

  // WHEN sidebar-revealer eye-icon is clicked,
  //   sidebar-revealer icon disappears and sidebar appears
  sidebarRevealer.addEventListener('click', () => {
    sidebarRevealer.classList.remove('appear')
    sidebar.classList.remove('disAppearNow')
  })

  // =====// Mobile Device

  // WHEN the icon in the header, sidebarOpenerIcon, is clicked
  // sidebar appears in mobile devices and blocker gets activated
  sidebarOpenerIcon.addEventListener('click', function () {
    sidebarOpenerIcon.classList.toggle('rotated')
    blocker.classList.toggle('active')
    sidebar.classList.toggle('active')
    hideSidebar.classList.toggle('hidden')
  })

  window.addEventListener('resize', function () {
    // If the window width is greater than or equal to 768px, hide the sidebar
    if (window.innerWidth >= 768) {
      sidebar.classList.toggle('hidden')
      blocker.classList.remove('active')
      sidebar.classList.remove('active')
      hideSidebar.classList.remove('hidden')
    }
  })

  // When blocker is clicked sidebar and blocker disappear
  blocker.addEventListener('click', () => {
    document.body.classList.remove('active')
    sidebarOpenerIcon.classList.remove('rotated')
    blocker.classList.remove('active')
    sidebar.classList.remove('active')
    hideSidebar.classList.remove('hidden')
  })

  addNewBoard.addEventListener('click', () => {
    document.body.classList.remove('block')
    sidebarOpenerIcon.classList.remove('rotated')
    sidebar.classList.remove('active')
    hideSidebar.classList.remove('hidden')
  })

  const boardLinks = document.querySelectorAll('.board__link')

  boardLinks.forEach((boardLink) => {
    boardLink.addEventListener('click', () => {
      document.body.classList.remove('block')
      sidebarOpenerIcon.classList.remove('rotated')
      blocker.classList.remove('active')
      sidebar.classList.remove('active')
      hideSidebar.classList.remove('hidden')
    })
  })

  const tripleDots = document.querySelector('.triple-dots')
  const editDeleteList = document.querySelector('.edit-delete-list')
  const toggleButton = document.querySelectorAll('.toggle-modal-button')

  // Show or hide edit-delete-list on triple dots click
  tripleDots.addEventListener('click', function (event) {
    event.stopPropagation() // Prevents the click event from reaching the document

    editDeleteList.classList.toggle('active')
  })

  // Hide edit-delete-list when clicking outside of it
  document.addEventListener('click', function () {
    editDeleteList.classList.remove('active')
  })

  // Prevent hiding when clicking inside the edit-delete-list
  editDeleteList.addEventListener('click', function (event) {
    event.stopPropagation()
  })

  toggleButton.forEach((button) => {
    button.addEventListener('click', () => {
      editDeleteList.classList.remove('active')
    })
  })

  document.querySelector('.cancel-btn').addEventListener('click', () => {
    document.getElementById('delete-board-modal').classList.add('hidden')
    blocker.classList.remove('active')
  })
})
