const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer'); 
const { getPagesByMenuId } = require('../../Module/menus');
const { getPageById } = require('../../Module/pages');
const { getFormById } = require('../../Module/formHasInput');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rawankadi9@gmail.com',
    pass: 'jrzz dnow jdxr xkxr'
  }
});


// Fetch all pages from MySQL
app.get("/pages/:id", async(req, res) => {
  const pageID = req.params.id;
  try {
    const pages = await getPageById(pageID);
    console.log(pageID);
    res.json(pages);
  } catch (error) {
    console.error('Error fetching Page By pageID:', error);
    res.status(500).send('Server Error');
  }
});

app.get('/menu/:id', async (req, res) => {
  const menuID = req.params.id;
  try {
    const pages = await getPagesByMenuId(menuID);
    console.log(menuID);
    res.json(pages);
  } catch (error) {
    console.error('Error fetching menu By menuID:', error);
    res.status(500).send('Server Error');
  }
});

app.get('/form/:id', async (req, res) => {
  const pageID = req.params.id;
  try {
    const pages = await getFormById(pageID);
    console.log(pageID);
    res.json(pages);
  } catch (error) {
    console.error('Error fetching Form By pageID:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  console.log(`Received email data: Name: ${name}, Email: ${email}, Message: ${message}`); 

  const mailOptions = {
    from: email,
    to: 'rawankadi9@gmail.com', 
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Error sending email by Node.js.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    }
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
