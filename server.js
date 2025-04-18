const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (like main.js)
app.use(express.static(__dirname));

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Set up Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maheaportfolio@gmail.com',
    pass: 'ffyx ppav otly dqdx', 
  }
});

// Handle form submission
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'maheaportfolio@gmail.com',
    subject: subject || `New message from ${name}`,
    text: `You have a new message from the contact form:

Full Name: ${name}
Email: ${email}
Subject: ${subject}
Message: 
${message}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Email sending failed:", err);
      return res.status(500).json({ success: false, message: "Failed to send email." });
    }
    console.log("✅ Email sent:", info.response);
    res.json({ success: true, message: "Email sent successfully!" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
