const express = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const fileUrl = `https://your-deployed-url/${req.file.filename}`;

    // Call Gemini API to analyze image
    const apiResponse = await axios.get(`https://ccprojectapis.ddns.net/api/gemini?ask=Analyze&imgurl=${fileUrl}`);
    const result = apiResponse.data.result;

    res.send(`<h2>Image analysée :</h2><p>${result}</p>`);
  } catch (error) {
    res.status(500).send('Erreur lors de l\'analyse de l\'image');
  }
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
