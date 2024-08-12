const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { getPagesByMenuId } = require('../../Module/menus');
const { getPageById } = require('../../Module/pages');
const { getFormById } = require('../../Module/formHasInput');
const { addJob } = require('../../Module/addJob');
const { getCandidatesForJob } = require('../../Module/candidatesforjob');

const { findOrCreateUser } = require('../../Module/findOrCreateUser');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rawankadi9@gmail.com',
    pass: 'jrzz dnow jdxr xkxr'
  }
});

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myproject',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/addJob', async (req, res) => {
  const jobData = req.body;
  try {
    const result = await addJob(jobData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).send('Server Error');
  }
});

app.get('/candidates/:jobID', async (req, res) => {
  const jobID = req.params.jobID;
  try {
    const candidates = await getCandidatesForJob(jobID);
    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates for job:', error);
    res.status(500).send('Failed to fetch candidates for job');
  }
});

app.post('/invite-to-interview', async (req, res) => {
  const { candidateID, jobID } = req.body;
  const status = 'Invited';

  let connection;

  try {
    connection = await pool.getConnection();

    const [candidateRows] = await connection.query(
      'SELECT Email FROM users WHERE userID = ?',
      [candidateID]
    );
    const [jobRows] = await connection.query(
      'SELECT jobTitle, description FROM jobs WHERE jobID = ?',
      [jobID]
    );

    if (candidateRows.length > 0 && jobRows.length > 0) {
      const { Email } = candidateRows[0];
      const { jobTitle, description } = jobRows[0];

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: Email,
        subject: 'Interview Invitation',
        text: `You have been invited to an interview for the job: ${jobTitle}. Description: ${description}`
      };

      try {
        await transporter.sendMail(mailOptions);

        await connection.query(
          'INSERT INTO interview_process (candidateID, jobID, status) VALUES (?, ?, ?)',
          [candidateID, jobID, status]
        );

        res.status(200).json({ success: true, message: 'Invitation sent successfully!' });
      } catch (mailError) {
        console.error('Error sending email:', mailError);
        res.status(500).json({ success: false, message: 'Failed to send email' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Candidate or job not found' });
    }
  } catch (error) {
    console.error('Error inviting to interview:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
  }
});


app.get('/pages/:id', async (req, res) => {
  const pageID = req.params.id;
  try {
    const pages = await getPageById(pageID);
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
    res.json(pages);
  } catch (error) {
    console.error('Error fetching Form By pageID:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

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

const session = require('express-session');

app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Change to true if using HTTPS
}));

app.get('/auth/linkedin/callback', async (req, res) => {
  try {
    console.log('Session object:', req.session); // Check if this is undefined
    const accessToken = 'AQU1-0hv5zEj1zmLoWL10-PEybcKq7-dwqHdmVW8y5pFQxG7AxD6iHro8XnBTwGEUiE41FDhtV30STSihselxKO6xHoyXt3BJ8am0oISPQTo6roI6AgxNgkR-3ScrMF4abwX_evyHDmBeYdLt6WicabtcR4aUa85DuIfOogxLX3UutSgiKPuYeAd5L4WWcvHTMhUcGmPawP3UjxRL53btDQd2FZy0qN6bwTylgouifQvMGOlbUrZomk8WfwIz_4_GEHExdIVKmsC4VmT5U2Hili9Erfd4ZpWiWq9IEndjk6jb3q47TaIYNUg1etCypegEsV3WItyfmEZ9qkmeoWm6jfRY-Nq4w'; // Replace with your actual token logic
    if (!req.session) {
      throw new Error('Session is undefined');
    }
    req.session.accessToken = accessToken; // This should work if session is properly configured
    res.redirect('http://localhost:3000/Home?success=true');
  } catch (error) {
    console.error('Error during LinkedIn authentication:', error);
    res.redirect('/error');
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


/*

app.get('/linkedin-profile', async (req, res) => {
  const accessToken = 'AQU1-0hv5zEj1zmLoWL10-PEybcKq7-dwqHdmVW8y5pFQxG7AxD6iHro8XnBTwGEUiE41FDhtV30STSihselxKO6xHoyXt3BJ8am0oISPQTo6roI6AgxNgkR-3ScrMF4abwX_evyHDmBeYdLt6WicabtcR4aUa85DuIfOogxLX3UutSgiKPuYeAd5L4WWcvHTMhUcGmPawP3UjxRL53btDQd2FZy0qN6bwTylgouifQvMGOlbUrZomk8WfwIz_4_GEHExdIVKmsC4VmT5U2Hili9Erfd4ZpWiWq9IEndjk6jb3q47TaIYNUg1etCypegEsV3WItyfmEZ9qkmeoWm6jfRY-Nq4w'; 

  try {
    // Fetch LinkedIn profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!profileResponse.ok) {
      const error = await profileResponse.json();
      throw new Error(`Failed to fetch LinkedIn user profile: ${JSON.stringify(error)}`);
    }

    const profileData = await profileResponse.json();

    // Fetch LinkedIn email
    const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.json();
      throw new Error(`Failed to fetch LinkedIn user email: ${JSON.stringify(error)}`);
    }
    const emailData = await emailResponse.json();
    const linkedInProfileUrl = `https://www.linkedin.com/in/${profileData.localizedFirstName}-${profileData.localizedLastName}-${profileData.profileUniqueId}`;

    console.log(linkedInProfileUrl); 
    
    const userProfile = {
      id: profileData.id,
      firstName: profileData.localizedFirstName,
      lastName: profileData.localizedLastName,
      email: emailData.elements[0]['handle~'].emailAddress,
      profileUrl: linkedInProfileUrl
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching LinkedIn data:', error);
    res.status(500).send('LinkedIn Profile Internal Server Error');
  }
});


*/