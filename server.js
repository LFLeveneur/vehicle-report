// Requires
require('dotenv').config({path: './config/.env'});
require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
// -- Google API
const {google} = require("googleapis");
const { auth } = require('google-auth-library');

// Initialize the app
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Google API
const fs = require('fs');
const readline = require('readline');


const CREDENTIALS_PATH = 'credentials.json';
const TOKEN_PATH = 'token.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Fonction pour obtenir un jeton d'accès valide
function getAccessToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this URL:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          reject('Error while trying to retrieve access token', err);
          return;
        }
        resolve(token);
      });
    });
  });
}

// Fonction pour lire les informations d'identification à partir d'un fichier
function loadCredentials() {
  return new Promise((resolve, reject) => {
    fs.readFile(CREDENTIALS_PATH, (err, content) => {
      if (err) {
        reject('Error loading client secret file:', err);
        return;
      }
      // Autorisez un client avec les informations d'identification chargées, puis appelez la fonction Google Sheets API.
      resolve(JSON.parse(content));
    });
  });
}

// Fonction principale pour lire les données de Google Sheets
async function readGoogleSheets() {
  try {
    // Charger les informations d'identification
    const credentials = await loadCredentials();
    const { client_email, private_key } = credentials;

    // Configurer l'authentification OAuth2
    const jwtClient = new google.auth.JWT(
        client_email,
        null,
        private_key,
        SCOPES
    );

    // Authentifier et connecter le client
    await jwtClient.authorize();

    // Créer une instance de l'API Google Sheets
    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    // Exemple de lecture des données d'une feuille
    const spreadsheetId = '1i_aUZ9K6_HWUwhZmW35KUcdxniJyKnOZl5QJzkeUUwc';
    const range = 'TROOPY NEOS!A2:A';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const values = response.data.values;
    console.log(values);
  } catch (error) {
    console.error('Error:', error);
  }
}

app.get('/', async (req, res) => {
  try {
    // Lire les données de Google Sheets
    const values = await readGoogleSheets();

    // Créer le contenu du tableau HTML
    let tableHTML = '<table>';

    // Ajouter les en-têtes du tableau
    tableHTML += '<tr>';
    values[0].forEach((header) => {
      tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr>';

    // Ajouter les lignes de données
    values.slice(1).forEach((row) => {
      tableHTML += '<tr>';
      row.forEach((cell) => {
        tableHTML += `<td>${cell}</td>`;
      });
      tableHTML += '</tr>';
    });

    tableHTML += '</table>';

    // Afficher le tableau HTML dans la réponse
    res.send(tableHTML);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Une erreur est survenue');
  }
});




// Client
app.use(express.static('client/build'));
app.get('/js/main.eaeb3e9f.js', function(req, res) {
  res.sendFile("client/build/static/js/main.eaeb3e9f.js");
});
app.get('/css/main.e518cfad.css', function(req, res) {
  res.sendFile("client/build/static/css/main.e518cfad.css");
});
app.get('/favicon.ico', function(req, res) {
  res.sendFile("client/build/favicon.ico");
});
app.get('/manifest.json', function(req, res) {
  res.sendFile("client/build/manifest.json");
});

// Route signal
const signalRoutes = require('./routes/signal.routes');
app.use('/api/signal', signalRoutes);

// Launch the function to send slack every 10 minutes (with node-cron)
const slackUtils = require('./utils/slack.utils');
cron.schedule('*/10 * * * *', () => { slackUtils.sendSlack() }, { scheduled: true, timezone: 'Europe/Paris' });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);