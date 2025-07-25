import Subscriber from "../models/Subscriber.js";

export const getAllSubscribers = async (req, res) => {
  try {
    // Return emails and subscribedAt sorted newest first
    const subscribers = await Subscriber.find({}, { email: 1, subscribedAt: 1, _id: 0 }).sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
