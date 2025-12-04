import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Simple reply to incoming messages
app.post(`/webhook/${TOKEN}`, async (req, res) => {
  try {
    const chatId = req.body.message.chat.id;
    const messageText = req.body.message.text;

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `You said: ${messageText}`
    });

    res.sendStatus(200);
  } catch (e) {
    console.error("Error:", e.message);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
