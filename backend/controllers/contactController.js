import Contact from "../models/Contact.js";


// =========================
// PUBLIC - Submit contact
// =========================
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =========================
// ADMIN - Get contacts (pagination)
// =========================
export const getContacts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =========================
// ADMIN - Mark read
// =========================
export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =========================
// ADMIN - Delete
// =========================
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
