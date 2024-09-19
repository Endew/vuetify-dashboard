const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-line-notify', async (req, res) => {
    try {
      const token = 'FUjligDJrKv3tramPU4EaXf2aH39bRLxwH6dE4Gm0pY';
      const message = req.body.message;
  
      if (!message) {
        return res.status(400).send('Message is required');
      }
  
      const response = await axios.post('https://notify-api.line.me/api/notify', 
        new URLSearchParams({ message }), 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      res.status(200).send('Notification sent');
    } catch (error) {
      console.error('Error sending notification:', error.response ? error.response.data : error.message, error);
      res.status(500).send('Error sending notification');
    }
  });

app.listen(3001, () => {
  console.log('Backend server running on http://localhost:3001');
});