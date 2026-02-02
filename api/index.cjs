const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// مسار الفحص - تأكد أنه سيرسل استجابة واضحة
app.get('/api/send-whatsapp', (req, res) => {
    return res.status(200).send("API is Live and Running!");
});

app.post('/api/send-whatsapp', async (req, res) => {
    try {
        const { phone, message } = req.body;
        const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
        const token = process.env.ULTRAMSG_TOKEN;

        if (!instanceId || !token) {
            return res.status(500).json({ success: false, error: "Missing Env Vars" });
        }

        const response = await axios.post(
            `https://api.ultramsg.com/${instanceId}/messages/chat`,
            { token, to: phone, body: message }
        );

        return res.json({ success: true, data: response.data });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.response?.data || error.message 
        });
    }
});

// هذا السطر هو الأهم للعمل على Vercel
module.exports = app;