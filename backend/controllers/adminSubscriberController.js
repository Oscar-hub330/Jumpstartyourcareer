// controllers/adminSubscriberController.js
import Subscriber from "../models/Subscriber.js";

// GET all subscribers
export const getAdminSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscribers", error: err.message });
  }
};

// DELETE subscriber by ID
export const deleteAdminSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
