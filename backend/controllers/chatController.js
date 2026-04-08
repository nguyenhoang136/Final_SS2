import axios from 'axios';

export const getAIResponse = async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post('https://api.voidai.app/v1/chat/completions', {
            model: "gpt-4o",
            messages: [{ 
                    role: "system", 
                    content: `Bạn là trợ lý ảo của trang web "Budget Tracker". 
                    Nhiệm vụ của bạn là hướng dẫn người dùng:
                    1. Trang Dashboard: Xem tổng quan thu chi bằng biểu đồ.
                    2. Trang Income: Nơi thêm các khoản thu nhập như lương, thưởng.
                    3. Trang Expense: Nơi ghi chép các khoản chi tiêu hàng ngày.
                    4. Trang Profile: Quản lý thông tin cá nhân.
                    Hãy trả lời ngắn gọn, lịch sự bằng tiếng Việt.` 
                },{ role: "user", content: message }]
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