const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// إعدادات CORS للسماح لطلبات الـ Frontend بالوصول
app.use(cors());
app.use(express.json());

// مسار للفحص (Health Check) - افتحه في المتصفح للتأكد
app.get('/api/send-whatsapp', (req, res) => {
    res.json({ message: "Server is online! Use POST to send messages." });
});

app.post('/api/send-whatsapp', async (req, res) => {
    const { phone, message } = req.body;

    const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
    const token = process.env.ULTRAMSG_TOKEN;

    if (!instanceId || !token) {
        return res.status(500).json({
            success: false,
            error: 'Environment variables (ID or Token) are missing'
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

// هام جداً: لا تستخدم app.listen
module.exports = app;