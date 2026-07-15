// ========== إعدادات الاتصال بالـ Backend ==========

// التحقق من عدم تعريف API_URL مسبقاً
if (typeof window.API_URL === 'undefined') {
    // في حالة Vercel أو أي Hosting، استخدم الـ URL الحالي
    // لو الموقع شغال على Vercel، هياخد الـ domain بتاعه تلقائياً
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // لو شغال محلياً
        window.API_URL = 'http://localhost:5001/api';
    } else {
        // لو شغال على Vercel أو أي Hosting حقيقي
        window.API_URL = window.location.origin + '/api';
    }
}

// WebSocket URL (للإشعارات الفورية)
if (typeof window.WS_URL === 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.WS_URL = 'ws://localhost:8080';
    } else {
        // لو على Vercel، استخدم wss (آمن) لنفس الـ domain
        window.WS_URL = window.location.origin.replace('http', 'ws') + '/ws';
    }
}

// Backend URL (للملفات الثابتة زي الصور)
if (typeof window.BACKEND_URL === 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.BACKEND_URL = 'http://localhost:5001';
    } else {
        window.BACKEND_URL = window.location.origin;
    }
}

// ========== إعدادات التطبيق ==========
if (typeof window.APP_NAME === 'undefined') {
    window.APP_NAME = 'نظام إدارة المخازن - عطارة الصالح';
}

if (typeof window.APP_VERSION === 'undefined') {
    window.APP_VERSION = '1.0.0';
}

// ========== معلومات الاتصال ==========
console.log('%c🏪 ' + window.APP_NAME, 'color: #4361ee; font-size: 20px; font-weight: bold;');
console.log('%cالإصدار: ' + window.APP_VERSION, 'color: #10b981; font-size: 14px;');
console.log('%cBackend API: ' + window.API_URL, 'color: #6b7280; font-size: 12px;');
console.log('%cWebSocket: ' + window.WS_URL, 'color: #6b7280; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #e5e7eb;');

// ========== اختبار الاتصال بالـ Backend ==========
async function testBackendConnection() {
    try {
        const response = await fetch(window.API_URL + '/test', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('%c✅ الاتصال بالـ Backend ناجح!', 'color: #10b981; font-size: 14px; font-weight: bold;');
            console.log('%c📡 الوقت: ' + data.time, 'color: #6b7280; font-size: 12px;');
            console.log('%c🔗 الرابط: ' + window.location.href, 'color: #6b7280; font-size: 12px;');
            return true;
        } else {
            console.warn('%c⚠️ البيانات المُرجعة من Backend غير صحيحة', 'color: #f59e0b; font-size: 14px;');
            return false;
        }
    } catch (error) {
        console.error('%c❌ فشل الاتصال بالـ Backend', 'color: #ef4444; font-size: 14px; font-weight: bold;');
        console.error('%c💡 تأكد من تشغيل السيرفر على: ' + window.BACKEND_URL, 'color: #6b7280; font-size: 12px;');
        console.error('%c💡 لو على Vercel، تأكد من إعدادات Environment Variables', 'color: #6b7280; font-size: 12px;');
        return false;
    }
}

// اختبار الاتصال عند تحميل الصفحة (مرة واحدة فقط)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testBackendConnection);
} else {
    // استخدام setTimeout لتجنب التداخل
    setTimeout(testBackendConnection, 100);
}

// ========== تصدير الدوال ==========
window.testBackendConnection = testBackendConnection;

console.log('%c✅ تم تحميل config.js بنجاح', 'color: #10b981; font-size: 14px;');