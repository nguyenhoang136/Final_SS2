import axios from 'axios';

export const getAIResponse = async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post('https://api.voidai.app/v1/chat/completions', {
            model: "gpt-4o",
            messages: [{ role: "user", content: message }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.AI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const reply = response.data.choices[0].message.content;
        // Trả về thêm field success để khớp với logic check ở Frontend
        res.status(200).json({ success: true, reply });

    } catch (error) {
        console.error("AI Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: "Lỗi khi kết nối với AI" });
    }
};