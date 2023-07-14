# TiergartenChatbot 

## Beschreibung

Das Projekt enthält einen Chatbot mit animierten Avatar für den Tiergarten Kleve. Der Chatbot umfasst folgende Funktionen:

- Beantwortung von Nachrichten in Text und in Sprache (Sprachsynthese mit Azure Text to Speech)
- Anzeige des Chatverlaufs
- SVG-Avatar mit Animationen
- Fragen/Nachrichten können mit Texteingabe oder Spracheingabe(Speech to Text) gestellt werden

Der Chatbot wurde mit folgenden Technologien und Frameworks umgesetzt:
- Node.js
- anime.js
- Express.js
- Web Speech API (integriert im Browser -> siehe Vorraussetzungen)
- Google Dialogflow ES
- Azure Speech SDK
  - Sprachsynthese (Text to Speech)
  - Abruf der Azure [Viseme-Informationen](https://learn.microsoft.com/de-de/azure/cognitive-services/speech-service/how-to-speech-synthesis-viseme?tabs=visemeid&pivots=programming-language-javascript) für die Animation des Mundes

Dateiüberblick:
- `Root-Verzeichnis`: Serverskript und package.json für die Installation der Node-Module
- Verzeichnis `static`: Frontend mit Medieninhalte (SVG-Avatar, Audiodateien), sowie Skript zur Steuerung der Benutzeroberfläche und Animationsskript
- ZIP-Verzeichnis `DialogflowES_Agent_Backup`: Export des Agenten mit allen Intents aus Dialogflow ES im JSON-Format

## Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Beitragende](#beitragende)
- [Lizenz](#lizenz)

## Voraussetzungen

Um dieses Projekt auszuführen, müssen die folgenden Voraussetzungen erfüllt sein:

- Internetverbindung
- Mikrofon (Nur für Verwendung der Spracheingabe)
- Node.js 18.16.0 oder höher
- Bitte stellen Sie sicher, dass Sie einen der folgenden Browser in der aktuellen Version verwenden:

    - Google Chrome
    - Microsoft Edge
    - Safari

    Die Verwendung anderer Browser kann zu Inkompatibilitäten führen, da das Projekt die Speech Recognition der Web Speech API verwendet, die  nicht von allen Browsern unterstützt werden. Für weiter Informationen siehe [hier](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility).

## Installation

1. Klonen Sie das Repository auf Ihren lokalen Computer:

   ```bash
   git clone https://github.com/Steggie97/TiergartenChatbot
   ```
   Oder laden Sie das Repository als ZIP herunter.

2. Wechseln Sie in das Projektverzeichnis:

   ```bash
   cd TiergartenChatbot 
   ```

3. Installieren Sie die Abhängigkeiten, indem Sie den folgenden Befehl ausführen:

   ```bash
   npm install
   ```

4. Führen Sie das Projekt aus:

   ```bash
   npm start
   ```

   Das Projekt wird nun lokal gestartet und ist unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Verwendung

Nach Ausführung der obenstehenden Installationsschritte kann die Benutzeroberfläche des Chatbots unter der Adresse [http://localhost:3000](http://localhost:3000) abgerufen werden.

Für die Texteingabe einfach den gewünschten Text in das vorgesehende Textfeld eingeben und anschließend auf dem nebenstehenden Button mit Papierflieger-Icon klicken, um die Nachricht zu versenden.

Für die Spracheingabe muss der Mikrofonzugriff für die Seite erlaubt werden. 
Zur Aktivierung der Spracheingabe wird der Button mit Mikrofon-Icon angeklickt. Danach muss die Spracheingabe innerhalb von 5 Sekunden erfolgen.

Nach einer kurzen Verarbeitungsdauer vom Server wird automatisch die Antwort des Chatbots auf der Benutzeroberfläche zurückgegeben.

Um den Node.js-Prozess für dieses Projekt zu beenden, können Sie die folgenden Schritte befolgen:

1. Wechseln Sie zum Terminal oder der Befehlszeile, in der das Projekt ausgeführt wird.

2. Drücken Sie `Ctrl + C` auf Ihrer Tastatur.

   Dadurch wird der aktive Node.js-Prozess beendet und das Projekt wird gestoppt.

## Lizenz

Dieses Projekt wurde in Kooperation mit der Hochschule Rhein Waal und dem Tiergarten Kleve erstellt. Das Projekt ist unter der MIT-License lizenziert. Weitere Informationen finden Sie in der `LICENSE`-Datei.
