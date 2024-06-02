const express = require("express");
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


const dataPath = path.join(__dirname, 'data.json');
let jsonData = null;


const sideBarPath = path.join(__dirname, 'sideBar.json');
let sideBarData = null;


fs.readFile(dataPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }
  jsonData = JSON.parse(data);
});

fs.readFile(sideBarPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the sideBar JSON file:', err);
    return;
  }
  sideBarData = JSON.parse(data);
});

app.get("/api/data/:window", (req, res) => {
  const windowName = req.params.window;
  const pageData = jsonData.find(page => page[windowName]);
  
  if (!pageData) {
    res.status(404).send({ error: `${windowName} data not found` });
    return;
  }
  res.json(pageData[windowName]);
});

app.get("/api/sideBar/:window", (req, res) => {
  const windowName = req.params.window;
  const pageData = sideBarData.find(page => page[windowName]);

  if (!pageData) {
    res.status(404).send({ error: `${windowName} data not found` });
    return;
  }

  res.json(pageData[windowName]);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
