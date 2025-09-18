const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const AdSet = bizSdk.AdSet;
const AdCreative = bizSdk.AdCreative;
const Ad = bizSdk.Ad;
require('dotenv').config();

const access_token = process.env.ACCESS_TOKEN;
const app_id = process.env.APP_ID;
const app_secret = process.env.APP_SECRET;
const ad_account_id = process.env.AD_ACCOUNT_ID;

if (!access_token || !app_id || !app_secret || !ad_account_id) {
    console.error('❌ Thiếu thông tin trong file .env');
    console.log('ACCESS_TOKEN:', access_token ? 'Có' : 'Không có');
    console.log('APP_ID:', app_id ? 'Có' : 'Không có');
    console.log('APP_SECRET:', app_secret ? 'Có' : 'Không có');
    console.log('AD_ACCOUNT_ID:', ad_account_id ? 'Có' : 'Không có');
    process.exit(1);
}

try {
    const api = bizSdk.FacebookAdsApi.init(access_token);
    const account = new AdAccount(ad_account_id);

    console.log('🚀 Đang tạo Chiến dịch (Campaign)...');

    account.createCampaign(
        [],
        {
            [Campaign.Fields.name]: 'Chiến dịch đầu tiên của tôi',
            [Campaign.Fields.objective]: 'OUTCOME_AWARENESS',
            [Campaign.Fields.status]: 'PAUSED',
            [Campaign.Fields.special_ad_categories]: [],
        }
    )
    .then((campaignResult) => {
        console.log('✅ Chiến dịch đã được tạo:', campaignResult.id);
        const campaignId = campaignResult.id;
        console.log('🚀 Đang tạo Nhóm quảng cáo (Ad Set)...');

        // Tạo Ad Set, sử dụng campaignId vừa lấy được
        account.createAdSet(
            [],
            {
                [AdSet.Fields.name]: 'Nhóm quảng cáo cho chiến dịch',
                [AdSet.Fields.campaign_id]: campaignId,
                [AdSet.Fields.optimization_goal]: 'REACH',
                [AdSet.Fields.billing_event]: 'IMPRESSIONS',
                [AdSet.Fields.bid_strategy]: 'LOWEST_COST_WITHOUT_CAP',
                [AdSet.Fields.daily_budget]: 27000,
                [AdSet.Fields.targeting]: {
                    geo_locations: {
                        countries: ['VN'],
                    },
                    genders: [1, 2], // 1: Nam, 2: Nữ
                    age_min: 18, // Facebook yêu cầu tối thiểu 18 tuổi
                    age_max: 65,
                    targeting_automation: {
                        advantage_audience: 0  // 0 = tắt, 1 = bật
                    }
                },
                [AdSet.Fields.status]: 'PAUSED',
                [AdSet.Fields.start_time]: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('.')[0] + '+0000',
            }
        )
        .then((adSetResult) => {
            console.log('✅ Nhóm quảng cáo đã được tạo:', adSetResult.id);
            const adSetId = adSetResult.id;
            console.log('🚀 Đang thử tạo Creative đơn giản...');

            // Thử tạo Creative không cần Page post - sử dụng format khác
            account.createAdCreative(
                [],
                {
                    [AdCreative.Fields.name]: 'Creative test basic',
                    [AdCreative.Fields.object_story_spec]: {
                        page_id: '789453527584978', // Page ID của bạn
                        link_data: {
                            message: 'Đây là tin nhắn quảng cáo test',
                            link: 'https://facebook.com',
                            name: 'Tiêu đề quảng cáo test',
                            description: 'Mô tả ngắn gọn',
                            call_to_action: {
                                type: 'LEARN_MORE'
                            }
                        }
                    }
                }
            )
            .then((creativeResult) => {
                console.log('✅ Creative đã được tạo:', creativeResult.id);
                
                // Tạo Ad với Creative vừa tạo
                return account.createAd(
                    [],
                    {
                        [Ad.Fields.name]: 'Quảng cáo hoàn chỉnh với Creative',
                        [Ad.Fields.adset_id]: adSetId,
                        [Ad.Fields.creative]: {
                            creative_id: creativeResult.id,
                        },
                        [Ad.Fields.status]: 'PAUSED',
                    }
                );
            })
            .then((adResult) => {
                console.log('✅ Quảng cáo đã được tạo thành công!', adResult.id);
                console.log('🎉 HOÀN THÀNH: Campaign → Ad Set → Creative → Ad');
                console.log('💡 Tất cả đều ở trạng thái PAUSED - không tốn tiền!');
            })
            .catch((error) => {
                console.error('❌ Lỗi khi tạo Creative/Ad:', error.message);
                console.error('Chi tiết:', JSON.stringify(error.response?.data || error, null, 2));
                
                console.log('\n💡 Giải pháp thay thế:');
                console.log('1. Vào Facebook Ads Manager: https://www.facebook.com/adsmanager/');
                console.log(`2. Tìm Campaign ID: ${campaignResult.id}`);
                console.log(`3. Tìm Ad Set ID: ${adSetId}`);
                console.log('4. Thêm Creative và Ad thủ công qua giao diện');
            });
        })
        .catch((adSetError) => {
            console.error('❌ Lỗi khi tạo nhóm quảng cáo:', adSetError.message);
            console.error('Error type:', adSetError.type);
            console.error('Error code:', adSetError.code);
            console.error('Error subcode:', adSetError.error_subcode);
            console.error('Full error object:', JSON.stringify(adSetError, null, 2));
            
            if (adSetError.response) {
                console.error('Response status:', adSetError.response.status);
                console.error('Response data:', JSON.stringify(adSetError.response.data, null, 2));
                console.error('Response error:', JSON.stringify(adSetError.response.error, null, 2));
            }
        });
    })
    .catch((campaignError) => {
        console.error('❌ Lỗi khi tạo chiến dịch:', campaignError.message);
        if (campaignError.response) {
            console.error('Response data:', campaignError.response.data);
        }
    });

} catch (initError) {
    console.error('❌ Lỗi khởi tạo API:', initError.message);
}