const bizSdk = require('facebook-nodejs-business-sdk');
require('dotenv').config();

const access_token = process.env.ACCESS_TOKEN;
const ad_account_id = process.env.AD_ACCOUNT_ID;

async function checkAdsStatus() {
    try {
        const api = bizSdk.FacebookAdsApi.init(access_token);
        const account = new bizSdk.AdAccount(ad_account_id);

        console.log('📊 KIỂM TRA TRẠNG THÁI QUẢNG CÁO');
        console.log('==================================');

        // 1. Kiểm tra tất cả Campaigns
        console.log('\n🎯 CAMPAIGNS:');
        const campaigns = await account.getCampaigns([
            'id', 'name', 'status', 'objective', 'created_time'
        ]);

        campaigns.forEach(campaign => {
            const status = campaign.status === 'PAUSED' ? '⏸️' : 
                          campaign.status === 'ACTIVE' ? '✅' : '❌';
            console.log(`${status} ${campaign.name} (${campaign.id})`);
            console.log(`   📅 Tạo: ${new Date(campaign.created_time).toLocaleString('vi-VN')}`);
            console.log(`   🎯 Mục tiêu: ${campaign.objective}`);
        });

        // 2. Kiểm tra tất cả Ad Sets
        console.log('\n📦 AD SETS:');
        const adSets = await account.getAdSets([
            'id', 'name', 'status', 'daily_budget', 'campaign_id'
        ]);

        adSets.forEach(adSet => {
            const status = adSet.status === 'PAUSED' ? '⏸️' : 
                          adSet.status === 'ACTIVE' ? '✅' : '❌';
            const budget = (adSet.daily_budget / 100).toLocaleString('vi-VN');
            console.log(`${status} ${adSet.name} (${adSet.id})`);
            console.log(`   💰 Budget: ${budget} VND/ngày`);
            console.log(`   📁 Campaign: ${adSet.campaign_id}`);
        });

        // 3. Kiểm tra tất cả Ads
        console.log('\n🎨 ADS:');
        const ads = await account.getAds([
            'id', 'name', 'status', 'adset_id', 'creative'
        ]);

        ads.forEach(ad => {
            const status = ad.status === 'PAUSED' ? '⏸️' : 
                          ad.status === 'ACTIVE' ? '✅' : '❌';
            console.log(`${status} ${ad.name} (${ad.id})`);
            console.log(`   📦 Ad Set: ${ad.adset_id}`);
            console.log(`   🎨 Creative: ${ad.creative?.creative_id || 'Không có'}`);
        });

        // 4. Kiểm tra Creatives
        console.log('\n🖼️ CREATIVES:');
        const creatives = await account.getAdCreatives([
            'id', 'name', 'status'
        ]);

        creatives.forEach(creative => {
            console.log(`🎨 ${creative.name} (${creative.id})`);
        });

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

checkAdsStatus();