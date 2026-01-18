/**
 * API Client để upload ảnh lên backend Python
 */

const API_BASE_URL = 'http://localhost:5000';

/**
 * Upload ảnh từ file input
 */
async function uploadImageFile(file, imageKey) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('key', imageKey);

        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Upload thành công:', result.path);
            return result;
        } else {
            console.error('❌ Upload thất bại:', result.error);
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Lỗi kết nối backend:', error);
        throw error;
    }
}

/**
 * Upload ảnh từ Base64 string
 */
async function uploadImageBase64(base64Data, imageKey) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/upload-base64`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: base64Data,
                key: imageKey
            })
        });

        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Upload Base64 thành công:', result.path);
            return result;
        } else {
            console.error('❌ Upload thất bại:', result.error);
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Lỗi kết nối backend:', error);
        throw error;
    }
}

/**
 * Lấy danh sách tất cả ảnh
 */
async function getImagesList() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/images`);
        const result = await response.json();
        
        if (result.success) {
            return result.images;
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Lỗi lấy danh sách ảnh:', error);
        throw error;
    }
}

/**
 * Xóa ảnh
 */
async function deleteImage(filename) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename })
        });

        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Đã xóa ảnh:', filename);
            return result;
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Lỗi xóa ảnh:', error);
        throw error;
    }
}

/**
 * Kiểm tra backend có hoạt động không
 */
async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const result = await response.json();
        return result.status === 'OK';
    } catch (error) {
        console.error('❌ Backend không hoạt động:', error);
        return false;
    }
}
