const bizSdk = require('facebook-nodejs-business-sdk');
require('dotenv').config();

const access_token = process.env.ACCESS_TOKEN;

async function checkPermissions() {
    try {
        const api = bizSdk.FacebookAdsApi.init(access_token);
        
        // Kiểm tra permissions hiện tại
        const response = await fetch(`https://graph.facebook.com/me/permissions?access_token=${access_token}`);
        const data = await response.json();
        
        console.log('📋 Permissions hiện tại:');
        data.data.forEach(perm => {
            const status = perm.status === 'granted' ? '✅' : '❌';
            console.log(`${status} ${perm.permission}: ${perm.status}`);
        });
        
        // Kiểm tra các permissions cần thiết
        const requiredPermissions = [
            'ads_management',
            'ads_read', 
            'pages_manage_posts',
            'pages_manage_metadata',
            'pages_show_list'
        ];
        
        console.log('\n🔍 Kiểm tra permissions cần thiết:');
        requiredPermissions.forEach(perm => {
            const hasPermission = data.data.find(p => p.permission === perm && p.status === 'granted');
            const status = hasPermission ? '✅' : '❌';
            console.log(`${status} ${perm}`);
        });
        
    } catch (error) {
        console.error('Lỗi:', error.message);
    }
}

checkPermissions();