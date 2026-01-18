// ===========================
// IMAGES.JS - Xử lý hình ảnh động từ localStorage
// ===========================

(function() {
    // Lấy hình ảnh từ localStorage
    function getStoredImages() {
        const images = localStorage.getItem('siteImages');
        return images ? JSON.parse(images) : {};
    }

    // Thay thế hình ảnh trên trang
    function loadDynamicImages() {
        const images = getStoredImages();
        
        // Danh sách mapping giữa key và selector
        const imageMap = {
            'banner': 'img[src*="banner.jpg"]',
            'hoanggia': 'img[src*="hoanggia.jpg"]',
            'canhho': 'img[src*="canhho.jpg"]',
            'quansu': 'img[src*="quansu.jpg"]',
            'ebook1': 'img[src*="ebook1.jpg"]',
            'ebook2': 'img[src*="ebook2.jpg"]',
            'camera1': 'img[src*="camera1.jpg"]',
            'studio1': 'img[src*="studio1.jpg"]',
            'studio2': 'img[src*="studio2.jpg"]',
            'studio3': 'img[src*="studio3.jpg"]',
            'sanhcuoi': 'img[src*="sanhcuoi.jpg"]',
            'xehopdong1': 'img[src*="xehopdong1.jpg"]',
            'rose': 'img[src*="rose.jpg"]',
            'lace': 'img[src*="lace.jpg"]',
            'trungtamtieccuoi': 'img[src*="trungtamtieccuoi.jpg"]',
            'thoitrangcuoi': 'img[src*="thoitrangcuoi.jpg"]'
        };

        // Thay thế từng hình ảnh
        Object.keys(imageMap).forEach(key => {
            if (images[key]) {
                const elements = document.querySelectorAll(imageMap[key]);
                elements.forEach(img => {
                    img.src = images[key];
                });
            }
        });

        // Xử lý video nếu có
        if (images['video']) {
            const videoElements = document.querySelectorAll('video source[src*="video.mp4"]');
            videoElements.forEach(video => {
                video.src = images['video'];
                video.parentElement.load();
            });
        }
    }

    // Chạy khi DOM đã load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDynamicImages);
    } else {
        loadDynamicImages();
    }
})();
