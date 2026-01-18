// ===========================
// AUTH.JS - Xử lý đăng nhập/đăng ký
// ===========================

// Dữ liệu mẫu (trong thực tế sẽ kết nối với backend)
const defaultUsers = [
    {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        fullname: 'Administrator',
        email: 'admin@AutoRent.vn',
        phone: '0123456789'
    },
    {
        username: 'user',
        password: 'user123',
        role: 'user',
        fullname: 'Nguyễn Văn A',
        email: 'user@example.com',
        phone: '0987654321'
    }
];

// Khởi tạo dữ liệu người dùng
function initUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// Lấy danh sách người dùng
function getUsers() {
    initUsers();
    return JSON.parse(localStorage.getItem('users'));
}

// Lưu danh sách người dùng
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Đăng ký
function register(username, password, fullname, email, phone) {
    const users = getUsers();
    
    // Kiểm tra username đã tồn tại
    if (users.find(u => u.username === username)) {
        return false;
    }
    
    // Thêm user mới
    users.push({
        username,
        password,
        role: 'user',
        fullname,
        email,
        phone,
        createdAt: new Date().toISOString()
    });
    
    saveUsers(users);
    return true;
}

// Đăng nhập
function login(username, password, remember = false) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Lưu thông tin đăng nhập
        const userData = { ...user };
        delete userData.password; // Không lưu password
        
        if (remember) {
            localStorage.setItem('currentUser', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(userData));
        }
        
        return true;
    }
    
    return false;
}

// Đăng xuất
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

// Lấy thông tin user hiện tại
function getCurrentUser() {
    const user = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Kiểm tra đăng nhập
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Kiểm tra quyền admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Bảo vệ trang admin
function requireAdmin() {
    if (!isAdmin()) {
        alert('Bạn không có quyền truy cập trang này!');
        window.location.href = '../login.html';
    }
}

// Khởi tạo
initUsers();
