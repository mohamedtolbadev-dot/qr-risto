const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-whatsapp', async (req, res) => {
  const { phone, message, orderDetails } = req.body;

  try {
    const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
    const token = process.env.ULTRAMSG_TOKEN;
    
    const response = await axios.post(
      `https://api.ultramsg.com/${instanceId}/messages/chat`,
      {
        token: token,
        to: phone,
        body: message
      }
    );

    console.log('✅ WhatsApp sent:', response.data);

    res.json({
      success: true,
      messageId: response.data.id,
      status: response.data
    });

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'فشل الإرسال'
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});