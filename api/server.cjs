const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// إعدادات CORS مهمة جداً عند الرفع
app.use(cors());
app.use(express.json());

app.post('/api/send-whatsapp', async (req, res) => {
    const { phone, message } = req.body;

    // التأكد من وجود المتغيرات
    const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
    const token = process.env.ULTRAMSG_TOKEN;

    if (!instanceId || !token) {
        return res.status(500).json({
            success: false,
            error: 'Environment variables are missing on Vercel'
        });
    }

    try {
        const response = await axios.post(
            `https://api.ultramsg.com/${instanceId}/messages/chat`,
            {
                token: token,
                to: phone,
                body: message
            }
        );

        return res.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('❌ UltraMsg Error:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            error: 'فشل إرسال الرسالة من مزود الخدمة'
        });
    }
});

// هذا السطر مهم جداً لـ Vercel
module.exports = app;