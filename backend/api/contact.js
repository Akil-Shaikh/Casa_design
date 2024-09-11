const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Contact route
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone_no, message } = req.body;
  try {
    // Construct the email content
    const emailContent = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone_no}\nMessage: ${message}\n`;

    const mailOptions = {
      from: `${email}`,
      to: 'musamjiakbar225@gmail.com, casadesignstudio1@gmail.com',
      subject: 'CONTACTS DATA FROM THE CASA DESIGN WEBSITE',
      text: emailContent
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ status: 'error', message: `Failed to send email $(error)` });
      }
      console.log('Email sent:', info.response);
      res.json({ status: 'success', message: 'Email sent successfully!' });
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred' });
  }
});

// Export the handler for Vercel
module.exports = app;
