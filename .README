# 📱 Facebook Ads API - Automation Tool

Công cụ tự động hóa tạo và quản lý quảng cáo Facebook bằng Node.js và Facebook Business SDK.

## 🎯 **Tính năng chính**

- ✅ Tự động tạo Campaign (Chiến dịch)
- ✅ Tự động tạo Ad Set (Nhóm quảng cáo)
- ⚠️ Tự động tạo Creative (Nội dung sáng tạo)
- ⚠️ Tự động tạo Ad (Quảng cáo)
- 🔒 An toàn với trạng thái PAUSED mặc định

## 📋 **Yêu cầu hệ thống**

- Node.js >= 14.0.0
- NPM >= 6.0.0
- Facebook Developer Account
- Facebook Ad Account với quyền truy cập

## 🚀 **Cài đặt**

### 1. Clone repository
```bash
git clone <repository-url>
cd test_facebook_api
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình môi trường
Tạo file `.env` trong thư mục gốc:

```env
ACCESS_TOKEN=your_facebook_access_token_here
APP_ID=your_facebook_app_id_here
APP_SECRET=your_facebook_app_secret_here
AD_ACCOUNT_ID=act_your_ad_account_id_here
```

## 🔑 **Cách lấy thông tin cấu hình**

### **ACCESS_TOKEN**
1. Vào [Facebook Developers](https://developers.facebook.com/)
2. Chọn app của bạn
3. Tools → Graph API Explorer
4. Generate Access Token với quyền: `ads_management`, `pages_manage_posts`

### **APP_ID & APP_SECRET**
1. Vào [Facebook Developers](https://developers.facebook.com/)
2. Chọn app của bạn
3. Settings → Basic
4. Copy App ID và App Secret

### **AD_ACCOUNT_ID**
1. Vào [Facebook Ads Manager](https://www.facebook.com/adsmanager/)
2. Chọn Ad Account
3. Copy ID từ URL (dạng: `act_1234567890`)

## 🏃‍♂️ **Chạy ứng dụng**

### Chạy script chính
```bash
node index.js
```

### Chạy Campaign Management (CRUD)
```bash
node campaign_management.js
```

### Chạy examples
```bash
node campaign_examples.js
```

## 📊 **Cấu trúc dự án**

```
test_facebook_api/
├── index.js                 # File chính - tạo campaign đầy đủ
├── campaign_management.js   # CRUD operations cho campaigns
├── campaign_examples.js     # Examples và test cases
├── convert_post_id.js       # Utility convert Facebook post IDs
├── .env                     # Environment variables (không commit)
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
└── README.md               # Tài liệu này
```

## 🎯 **Workflow tạo quảng cáo**

### **Bước 1: Campaign (Chiến dịch)**
```javascript
{
    name: 'Chiến dịch đầu tiên của tôi',
    objective: 'OUTCOME_AWARENESS',  // Mục tiêu
    status: 'PAUSED',                // An toàn
    special_ad_categories: []        // Danh mục đặc biệt
}
```

### **Bước 2: Ad Set (Nhóm quảng cáo)**
```javascript
{
    name: 'Nhóm quảng cáo cho chiến dịch',
    campaign_id: 'CAMPAIGN_ID',
    optimization_goal: 'REACH',      // Mục tiêu tối ưu
    billing_event: 'IMPRESSIONS',    // Sự kiện tính phí
    daily_budget: 27000,             // 270 VND/ngày
    targeting: {
        geo_locations: { countries: ['VN'] },
        genders: [1, 2],             // Nam & Nữ
        age_min: 18,
        age_max: 65
    },
    status: 'PAUSED'
}
```

### **Bước 3: Creative (Nội dung)**
```javascript
{
    name: 'Creative test basic',
    object_story_spec: {
        page_id: 'YOUR_PAGE_ID',
        link_data: {
            message: 'Tin nhắn quảng cáo',
            link: 'https://your-website.com',
            name: 'Tiêu đề quảng cáo',
            description: 'Mô tả ngắn gọn',
            call_to_action: { type: 'LEARN_MORE' }
        }
    }
}
```

### **Bước 4: Ad (Quảng cáo)**
```javascript
{
    name: 'Quảng cáo hoàn chỉnh',
    adset_id: 'ADSET_ID',
    creative: { creative_id: 'CREATIVE_ID' },
    status: 'PAUSED'
}
```

## ⚠️ **Vấn đề thường gặp**

### **1. Creative Creation Error**
```
Lỗi: "Bài viết chứa nội dung quảng cáo do một quảng cáo ở chế độ phát triển tạo"
```

**Nguyên nhân:** App đang ở Development Mode

**Giải pháp:**
- Submit App Review để chuyển Production Mode
- Hoặc tạo Creative thủ công trong Ads Manager

### **2. Permission Error**
```
Lỗi: "does not exist, cannot be loaded due to missing permissions"
```

**Nguyên nhân:** Thiếu quyền truy cập Page/Ad Account

**Giải pháp:**
```bash
# Kiểm tra quyền
node -e "
const fetch = require('node-fetch');
fetch('https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_TOKEN')
.then(r => r.json())
.then(d => console.log(d));
"
```

### **3. Budget Too Low Error**
```
Lỗi: "daily_budget must be at least 100"
```

**Giải pháp:**
```javascript
daily_budget: 100000  // Tối thiểu ~1 triệu VND
```

## 🛠️ **API Documentation**

### **Campaign Management**
```javascript
const CampaignManager = require('./campaign_management');
const cm = new CampaignManager();

// CREATE
await cm.createCampaign(campaignData);
await cm.createMultipleCampaigns([campaign1, campaign2]);

// READ
await cm.getAllCampaigns();
await cm.getCampaignById(campaignId);
await cm.searchCampaignsByName('search term');
await cm.getCampaignsByStatus('PAUSED');

// UPDATE
await cm.updateCampaign(campaignId, updateData);
await cm.pauseCampaign(campaignId);
await cm.resumeCampaign(campaignId);
await cm.batchUpdateCampaigns(updates);

// DELETE
await cm.deleteCampaign(campaignId, forceDelete);
await cm.batchDeleteCampaigns(campaignIds, forceDelete);

// UTILITY
await cm.duplicateCampaign(sourceCampaignId, newName);
await cm.getCampaignStats();
```

## 🔒 **Bảo mật**

### **Environment Variables**
- ✅ Sử dụng `.env` file
- ✅ Không commit `.env` vào git
- ✅ Rotate access tokens định kỳ

### **Access Tokens**
```bash
# Kiểm tra token hợp lệ
curl -X GET "https://graph.facebook.com/v18.0/me?access_token=YOUR_TOKEN"

# Kiểm tra quyền token
curl -X GET "https://graph.facebook.com/v18.0/debug_token?input_token=YOUR_TOKEN&access_token=YOUR_TOKEN"
```

### **Rate Limiting**
```javascript
// Thêm delay giữa các API calls
await new Promise(resolve => setTimeout(resolve, 1000));
```

## 📊 **Campaign Objectives**

| Objective | Mô tả | Use Case |
|-----------|--------|----------|
| `OUTCOME_AWARENESS` | Tăng nhận biết thương hiệu | Brand marketing |
| `OUTCOME_TRAFFIC` | Tăng traffic website | Drive visitors |
| `OUTCOME_ENGAGEMENT` | Tăng tương tác | Social engagement |
| `OUTCOME_LEADS` | Thu thập leads | Lead generation |
| `OUTCOME_APP_PROMOTION` | Quảng cáo app | App installs |
| `OUTCOME_SALES` | Tăng doanh số | E-commerce |

## 🎯 **Targeting Options**

### **Geographic**
```javascript
geo_locations: {
    countries: ['VN'],           // Quốc gia
    regions: [123],              // Tỉnh/Bang  
    cities: [2673730],           // Thành phố
    location_types: ['home']     // Loại vị trí
}
```

### **Demographics**
```javascript
{
    genders: [1, 2],            // 1: Nam, 2: Nữ, 0: Tất cả
    age_min: 18,                // Tuổi tối thiểu
    age_max: 65,                // Tuổi tối đa
    locales: [1000]             // Ngôn ngữ
}
```

### **Interests & Behaviors**
```javascript
{
    interests: [
        { id: '6003107902433', name: 'Thời trang' },
        { id: '6003139266461', name: 'Thể thao' }
    ],
    behaviors: [
        { id: '6002714895372', name: 'Frequent online purchasers' }
    ]
}
```

## 📈 **Monitoring & Analytics**

### **Campaign Performance**
```javascript
// Lấy insights
const insights = await campaign.getInsights([
    'impressions',
    'clicks', 
    'spend',
    'ctr',
    'cpc',
    'cpm'
]);

// Real-time metrics
const stats = await cm.getCampaignStats();
```

### **Budget Tracking**
```javascript
// Kiểm tra budget remaining
const campaign = await cm.getCampaignById(campaignId);
console.log('Budget remaining:', campaign.budget_remaining);
```

## 🚨 **Error Handling**

### **Comprehensive Error Logging**
```javascript
.catch((error) => {
    console.error('❌ Error:', error.message);
    console.error('Type:', error.type);
    console.error('Code:', error.code);
    console.error('Subcode:', error.error_subcode);
    console.error('Details:', JSON.stringify(error.response?.data, null, 2));
});
```

### **Common Error Codes**
| Code | Meaning | Solution |
|------|---------|----------|
| 100 | Invalid parameter | Kiểm tra format dữ liệu |
| 190 | Access token expired | Refresh token |
| 200 | Permissions error | Kiểm tra quyền app |
| 1885183 | Development mode | Submit app review |

## 🔄 **Development Workflow**

### **Testing**
```bash
# Test campaign creation
node index.js

# Test CRUD operations
node campaign_management.js

# Run examples
node campaign_examples.js
```

### **Debugging**
```javascript
// Enable debug mode
process.env.DEBUG = 'facebook-business-sdk:*';

// Verbose logging
console.log('Request:', JSON.stringify(requestData, null, 2));
console.log('Response:', JSON.stringify(responseData, null, 2));
```

## 📚 **Resources**

- [Facebook Marketing API](https://developers.facebook.com/docs/marketing-api/)
- [Business SDK Documentation](https://github.com/facebook/facebook-nodejs-business-sdk)
- [Ad Account Structure](https://developers.facebook.com/docs/marketing-api/buying-api)
- [Targeting Specifications](https://developers.facebook.com/docs/marketing-api/audiences/reference/basic-targeting)

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

## ❓ **FAQ**

**Q: Tại sao tất cả đều tạo với status PAUSED?**
A: Để đảm bảo an toàn, tránh tốn tiền không mong muốn khi test.

**Q: Có thể chạy ads tự động không?**
A: Có, nhưng cần cẩn thận với budget và targeting để tránh chi phí cao.

**Q: Làm sao để monitor performance?**
A: Sử dụng Insights API để lấy metrics real-time hoặc check trong Ads Manager.

**Q: App bị stuck ở Development Mode?**
A: Submit App Review với use cases rõ ràng hoặc sử dụng manual Creative creation.

---

**💡 Lưu ý:** Đây là tool để học tập và phát triển. Khi sử dụng production, hãy đảm bảo tuân thủ chính sách quảng cáo của Facebook và test kỹ lưỡng trước khi chạy ads thực tế.

**📧 Support:** Nếu gặp vấn đề, vui lòng tạo issue trong repository này.

---

*🚀 Happy Coding! Let's automate Facebook Ads like a pro!*