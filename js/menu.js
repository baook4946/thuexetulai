/**
 * MENU.JS - Xử lý hamburger menu cho mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tạo nút hamburger menu nếu chưa có
    const menu = document.querySelector('.menu');
    const menuUl = document.querySelector('.menu ul');
    
    if (menu && !document.querySelector('.menu-toggle')) {
        // Tìm nút login trong menu
        const loginItem = menuUl.querySelector('li.login');
        const loginLink = loginItem ? loginItem.querySelector('a') : null;
        
        // Tạo header mobile
        const menuHeader = document.createElement('div');
        menuHeader.className = 'menu-header';
        
        // Tạo nút toggle
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'menu-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle menu');
        toggleBtn.innerHTML = '☰';
        
        // Tạo nút login mobile
        const loginMobile = document.createElement('div');
        loginMobile.className = 'menu-login-mobile';
        if (loginLink) {
            const loginMobileLink = loginLink.cloneNode(true);
            loginMobile.appendChild(loginMobileLink);
        }
        
        // Thêm vào header
        menuHeader.appendChild(toggleBtn);
        menuHeader.appendChild(loginMobile);
        
        // Thêm header vào menu
        menu.insertBefore(menuHeader, menuUl);
        
        // Xử lý sự kiện click
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            menuUl.classList.toggle('active');
            
            // Đổi icon
            if (menuUl.classList.contains('active')) {
                toggleBtn.innerHTML = '✕';
            } else {
                toggleBtn.innerHTML = '☰';
            }
        });
        
        // Đóng menu khi click vào item
        const menuItems = menuUl.querySelectorAll('li a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuUl.classList.remove('active');
                    toggleBtn.innerHTML = '☰';
                }
            });
        });
        
        // Đóng menu khi click ra ngoài
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && menuUl.classList.contains('active')) {
                menuUl.classList.remove('active');
                toggleBtn.innerHTML = '☰';
            }
        });
        
        // Xử lý khi resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuUl.classList.remove('active');
                toggleBtn.innerHTML = '☰';
            }
        });
    }
});
