// Author: Lukas Steggers
//Script des Backend-Servers:

// Config: Anmeldeinformationen des Dienstkontos Dialogflow - Erforderlich für die Verwendung von Dialogflow ES
const config = './tiergartenchatbot-0a808221bcbe.json';
//Import der Node-Module:
//Express
const express = require('express');
// CORS-Modul
const cors = require('cors');

//UUID-Modul
const { v4: uuidv4 } = require('uuid');

//path-Modul
const path = require('path');

//send-Modul
const send = require('send');

//Filesystem - Modul
const fs = require('fs');

//Util
const util = require('util');

//CORS
const corsOptions = {
  origin: 'http://localhost:3000'
};

//Azure Cognitive-Service (Azure TTS & Azure Viseme):
const sdk = require("microsoft-cognitiveservices-speech-sdk");

//Express
//Initialisierung Express-Server
const app = express();
const port = 3000;
app.options('*', cors(corsOptions));

//Deaktivieren von Caching:
app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Range', '*');
  next();
});

//Middleware zur Verarbeitung von json-Datenpakete:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//HTML-Seite
app.use(express.static(path.join(__dirname, 'static')));

//Starten des Servers auf Port 3000
const server = app.listen(3000, () => {
  console.log(`Server is listening on port ${port}.`);
});

//Dialogflow Essentials 

//projectId: ID of the GCP project where Dialogflow agent is deployed
const projectId = 'tiergartenchatbot';
// sessionId: String representing a random number or hashed user identifier
const sessionId = uuidv4();

//Erste Nachricht
const query = 'Hallo';

// languageCode: Indicates the language Dialogflow agent should use to detect intents
const languageCode = 'de';

// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient({ keyFilename: config });

//Pfade zu Input-Audio- /bzw. Output-Audio-Datei
const outputFile = './static/media/Audio/output.wav';

//Context Variable für die Erkennung älterer Fragen
let lastContext = '';

// VisemeInfo
let visemeInfo = {
  audioOffset: [],
  visemeId: []
};
async function detectIntent(query) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );
  // The audio query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  console.log(responses);

  //Ausgaben
  return responses[0];
}

async function textToSpeech(text) {

  //Anmeldung in Azure mit API-Token
  const speechConfig = sdk.SpeechConfig.fromSubscription('7e56c83e8c524aebb059328887568386', 'Germanywestcentral');
  //Speicherort der Output-Datei
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(outputFile);
  //Sprache & Stimme der TTS:
  //Gisela: Mädchen - de-DE-GiselaNeural
  //Elke: Erwachsene Frau - de-DE-ElkeNeural
  speechConfig.speechSynthesisVoiceName = 'de-DE-ElkeNeural';
  //Erstellung des Speech-Synthesizers:
  let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  // Subscribes to viseme received event
  synthesizer.visemeReceived = function (s, e) {
    let visemId = e.visemeId;
    let audioOffset = e.audioOffset / 10000;
    console.log("(Viseme), Audio offset: " + audioOffset + "ms. Viseme ID: " + visemId);
    visemeInfo.audioOffset.push(audioOffset);
    visemeInfo.visemeId.push(visemId);
  }
  //Starten des Synthesizers
  synthesizer.speakTextAsync(text,
    function (result) {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        console.log("synthesis finished.");
      } else {
        console.error("Speech synthesis canceled, " + result.errorDetails +
          "\nDid you set the speech resource key and region values?");
      }
      synthesizer.close();
      synthesizer = null;
    },
    function (err) {
      console.trace("err - " + err);
      synthesizer.close();
      synthesizer = null;
    });
  console.log("Now synthesizing to: " + outputFile);
}


//Express-Server Endpunkte:
// Endpunkt für Textnachrichten:
app.post('/chat', async (req, res) => {
  const { text } = req.body;
  console.log(text);
  try {
    const response = await detectIntent(text);
    console.log(response);
    const result = response.queryResult.fulfillmentText;
    await textToSpeech(result);
    setTimeout(() => {
      res.status(200).send(JSON.stringify({
        text: result,
        viseme: visemeInfo
      }));
    }, 2500);
    visemeInfo = {
      audioOffset: [],
      visemeId: []
    };
  } catch (error) {
    console.log(error);
    res.status(500).send(JSON.stringify({ text: 'fehler' }));
  }
});


