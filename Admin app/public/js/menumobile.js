// Truy cập vào class backdrop bao bọc toàn bộ cả 2 response
const backdrop = document.querySelector(".backdrop");
// Truy cập vào class mobile-nav để tạo giao diện cho nó hợp với mobile
const sideDrawer = document.querySelector(".mobile-nav");
// Truy cập vào id side-menu-toggle
const menuToggle = document.querySelector("#showMenu");

// Nút này sẽ tạo ra theme tối đi cho hợp với show button
function backdropClickHandler() {
  // Khi click sẽ ẩn đi
  backdrop.style.display = "none";
  //   Xóa class open
  sideDrawer.classList.remove("open");
}

// Nút này sẽ ẩn hiện menu
function menuToggleClickHandler() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

// Bắt sự kiện toàn app.js
backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);
