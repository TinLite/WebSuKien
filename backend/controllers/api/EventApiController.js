import eventModel from "../../models/EventModel.js";

const getEventDetails = async (req, res) => {
    try {
        const { id }  = req.params;
        const event = await eventModel.getEventById(id);

        if (!event) {
            return res.status(404).json({ message: "Sự kiện không tồn tại." });
        }

        res.status(200).json(event[0]);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin sự kiện.", error: error.message });
    }
};

const lockEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await eventModel.lockEvent(id);
        res.status(200).json({ message: "Sự kiện đã được khóa thành công." });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi khóa sự kiện.", error: error.message });
    }
};
const unlockEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await eventModel.unlockEvent(id);
        res.status(200).json({ message: "Sự kiện đã mở khóa thành công." });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi mở khóa sự kiện.", error: error.message });
    }   
};

const getAllEvent = async (req, res) => {
    try {
        const event = await eventModel.getAllEvent();
        if (!event) {
            return res.status(404).json({ message: "Sự kiện không tồn tại." });
        }

        res.status(200).json(event[0]);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin sự kiện.", error: error.message });
    }
};

export default {
    unlockEvent,
    getAllEvent,
    getEventDetails,
    lockEvent,
};