// Author: Lukas Steggers
// FrontEnd-Script:
//Variablen: 
let speechIsActive = false;
//Eventlistener:Skript soll erst ausgeführt werden, wenn das DOM vollständig geladen ist:
document.addEventListener('DOMContentLoaded', () => {
    //Verwendung der Browser-Speechrecognition via Speechrecognition-Objekt/ WebkitURL-Speechrecogniton
    //Hinweis: Speech-Recognition wird in FireFox nicht unterstüzt. Bei Opera und Safari werden einzelne Features des SpeechRecognition nicht unterstützt.
    //Mehr Informationen siehe MDN-WebAPI-Dokumentation: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

    //Aufruf des SpeechRecognition via window-Objekt - neue SpeechRecognition-Instanz wird durch Konstruktor erzeugt:
    //Quelle: https://www.youtube.com/watch?v=9o2rSxHiv9w&list=PLQeAbXMTAyKRnz1I5Ef3-QB6a9VgWN9AB&index=5
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recogniton = new SpeechRecognition();
    //Spracherkennung auf Deutsch stellen - Default-Sprache: Übernahme Wert des HTML-Attribute "lang"
    recogniton.lang = 'de';

    //Spracherkennung-Eventhandler:
    //Start der Spracherkennung
    recogniton.onstart = () => {
        console.log('Spracherkennung gestartet');
        speechIsActive = true;
        //Änderung des Buttons: Background-Color bleibt während der Aufnahme 
        document.getElementById('recordBtn').style.backgroundColor = '#f47b20';
    }

    // Ende der Spracherkennung
    recogniton.onresult = (event) => {
        headBobbing.play();
        let input = event.results[0][0].transcript;
        console.log(`Speechrecognition-Result: ${input}`);
        //Erkannter Text im Chatlog einhängen:
        addMessageToChatLog(input, false);
        sendTextMsg(input);
        //Variable auf Standard-Wert zurücksetzen
        speechIsActive = false;
        //Zurücksetzen der Standard-Background-Farbe
        document.getElementById('recordBtn').style.backgroundColor = '#640000';
    }

    // Eventhandler für Texteingaben:
    document.getElementById('sendTextBtn').addEventListener('click', (event) => {
        //Verhindern des Standard-Events
        event.preventDefault();

        let textMsg = document.getElementById('textInput').value;
        if (textMsg) {   //leere Eingabe wird unterbunden um fehler zu vermeiden
            headBobbing.play();
            sendTextMsg(textMsg);
            //leeren des Text-Inputfeldes
            document.getElementById('textInput').value = '';
            //Texteingabe des Users in Chatlog anzeigen:
            addMessageToChatLog(textMsg, false);
        }
    });

    //Eventhandler für Spracheingaben
    document.getElementById('recordBtn').addEventListener('click', (event) => {
        event.preventDefault();
        if (!speechIsActive) {
            //Start der Speechrecognition (siehe Speechrecognition-Eventhandler)
            recogniton.start();
        }
    });

    //Chatbot automatische Begrüßung 
    // Nicht funktional mit Browser aufgrund der Anpassung der Autoplay-Policy
    //Ohne Eingabe des Users wird kein Sound abgespielt
    /*
    setTimeout(() => {
        sendTextMsg('Hallo');
    },1500);
    */
});

//Funktion zum Einhängen der Textnachricht im Chatlog
//Parameter:
// message (String): Textnachricht
// isBotMessage (boolean): true für Nachrichten, die vom Bot stammen | false für Nachrichten vom User
function addMessageToChatLog(message, isBotMessage) {
    let chatLog = document.getElementById('chat_log');
    let message_box = document.createElement('div');
    if (isBotMessage) {
        message_box.classList.add('botMsgBox');
        message_box.innerHTML = `<p class="bot_message">${message}</p>`;
    }
    else {
        message_box.classList.add('userMsgBox');
        message_box.innerHTML = `<p class="user_message">${message}</p>`;
    }
    chatLog.appendChild(message_box);
    message_box.scrollIntoView(true, { behavior: 'smooth' });
}

// Funktion zum Abspielen einer Audio-Datei

async function playAudio() {
    //Durch hinzufügen eines Timestamps im Query-Strings wird verhindert, dass die vorherige Antwort, die vom Server geladen wurde, verwendet wird (caching).
    //Durch den Timestamp ändert sich die URL der Audio-Datei, sodass der Browser immer eine neue Audiodatei vom Server lädt
    const audio = new Audio('./media/Audio/output.wav?timestamp=' + Date.now());
    audio.play();
}

async function animateMouth(visemInfo) {
    let audioOffset = visemInfo.audioOffset;
    let visemId = visemInfo.visemeId;
    
    for (let i = 0; i < visemId.length; i++) {
      // Animationsdauer ermitteln
      if (i === 0) {
        //Erste Mundanimation wird ohne Delay gestartet:
        animationDuration = Math.floor(audioOffset[0]);
      } else {
        //Alle anderen Animationen werden mit einem Delay gestartet:
        animationDuration = Math.floor(audioOffset[i] - audioOffset[i - 1]);
      }
      await playAnimation(visemId[i], animationDuration);
      await delay(Math.floor(animationDuration*0.95)); // Warte bis zum angegebenen Audiooffset
    }
  }
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

async function playAnimation(visemId, duration){
    //Animation wird in Abhängigkeit der VisemeId abgespielt
    return new Promise((resolve) => {
        //console.log(`VisemId: ${visemId}, audioOffset: ${duration}`);
        switch (visemId) {
            case 6:
            case 7:
            case 12:
            case 15:
            case 16:
            case 18:
                mouth1QuarterOpenAnimation.play();
                mouthY=3
                break;
            case 3:
            case 8:
            case 10:
            case 13:
            case 14:
                mouthHalfOpenAnimation.play();
                mouthY=6
                break;
            case 2:
            case 4:
            case 5:
            case 19:
                mouth3QuarterOpenAnimation.play();
                mouthY=9
                break;
            case 1:
            case 9:
            case 11:
            case 17:
            case 20:
                mouthCompleteOpenAnimation.play();
                mouthY=12
                break;
            case 0:
            case 21:
            default:
                mouthCloseAnimation.play();
                mouthY=0
        }
        resolve()
    });
   
}
// Funktion zum Versenden einer Text-Nachricht zum Server
async function sendTextMsg(msg) {
    try {
        const res = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: msg }),
        });
        const data = await res.json();
        console.log(data);

        //Einen Delay von 2500ms einfügen, damit die vollständige Audio-Datei gesendet werden kann
        //Falls die Datei wegen des noch nicht vollständig durchgeführten Überschreibevorgang abgerufen wird, kommt eine Response mit HTTP Status 416 / bzw. u.U. 404
        setTimeout(() => {
            // Antwort vom Chatbot im Chat-Log anzeigen und Audio abspielen.
            addMessageToChatLog(data.text, true);
            playAudio();
            animateMouth(data.viseme);
        }, 2500);

    } catch (error) {
        console.log(error);
    }
}