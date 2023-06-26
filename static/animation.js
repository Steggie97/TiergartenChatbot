let openMouth = document.getElementById('redPanda_open_mouth');
let closedMouth = document.getElementById('redPanda_closed_mouth');
let openEyes = document.getElementById('redPanda_open_eyes');
let closedEyes = document.getElementById('redPanda_closed_eyes');
let tail = document.getElementById('redPanda_tail');
let head = document.getElementById('redPanda_head');

let earLeft = document.getElementById('g3064');
let earRight = document.getElementById('g3069');
let eyeBrows = document.getElementById('redPanda_eyebrows');
let eyeBrowLeft = document.getElementById('path5505');
let eyeBrowRight = document.getElementById('ellipse5507');

//Aktuelle Position des Mundes
let mouthCurrent = 0;
//Variable Animationslänge
let animationDuration = 50;

//lock-Variablen
let headLock = true;
let mouthLock = true;
let eyeLock = true;

//Schwanzwackeln
let tailAnimation = anime.timeline({
    easing: 'easeInOutSine',
    autoplay: true,
    loop: true
}).add({
    targets: tail,
    translateX:[0, 10],
    translateY:[0, -10],
    rotate: [0,5],
    duration: 1000,
}).add({
    targets: tail,
    translateX: [10,0],
    translateY: [-10,0],
    rotate: [5,0],
    duration: 2000,
    delay: 400
});

//Kopf schief legen und umkehren
async function animPayAttention() {
    await waitForHead();
    headLock=false;

    anim = anime.timeline({
        autoplay: true,
        easing: 'easeInOutSine',
    }).add({
        targets: head,
        duration: 500,
        /*
        rotate: [0, -10],
        translateX: [0, -10],
        translateY: [0, 10],
        scaleX: [1, 1.05],
        scaleY: [1, 1.05],
        /**/
        
        rotate: '-=10',
        translateX: '-=10',
        translateY: '+=10',
        scaleX: '+=0.05',
        scaleY: '+=0.05',
        /**/
    }).add({
        targets: eyeBrows,
        duration: 200,
        translateY: '-=5',
    });
    /*
    anim.finished.then(() => {
        headLock=true;
    });
    /**/
}
async function animEndAttention() {
    /*
    await waitForHead();
    headLock=false;
    /**/

    anim = anime.timeline({
        autoplay: true,
        easing: 'easeInOutSine',
    }).add({
        targets: head,
        duration: 500,
        /*
        rotate: [-10, 0],
        translateX: [-10, 0],
        translateY: [10, 0],
        scaleX: [1.05, 1],
        scaleY: [1.05, 1],
        /**/
        
        rotate: '+=10',
        translateX: '+=10',
        translateY: '-=10',
        scaleX: '-=0.05',
        scaleY: '-=0.05',
        /**/
    }).add({
        targets: eyeBrows,
        duration: 200,
        translateY: '+=5',
    });

    anim.finished.then(() => {
        headLock=true;
    });
}
//Nicken
async function nod() {
    await waitForHead();
    headLock=false;

    anim = anime.timeline({
        easing: 'easeInOutSine',
        autoplay: true,
    }).add({
        targets: head,
        translateY: '+=5',
        duration: 250
    }).add({
        targets: head,
        translateY: '-=5',
        duration: 250,
        delay: 100
    });

    anim.finished.then(() => {
        headLock=true;
    });
}
//dynamischer Mund
async function mouthMovement(mouthAfter) {
    anim = anime({
        targets: openMouth,
        translateY: [mouthCurrent, mouthAfter],
        duration: animationDuration,
        easing: 'easeInOutSine',
        autoplay: true,
    })
    anim.finished.then(() => {
        mouthCurrent=mouthAfter;
    });
}
//zufälliges Blinzeln
async function randomBlink(delay) {
    await new Promise(resolve => setTimeout(resolve, delay));;
    await waitForEyes();
    eyeLock=false;
    
    anim = anime.timeline({
        easing: 'easeInOutSine',
        autoplay: true,
    }).add({
        //Augen schließen
        targets: openEyes,
        opacity: [1, 0],
        duration: 10,
    }).add({
        //Augen öffnen
        targets: closedEyes,
        opacity: [0,1],
        duration: 10
    }).add({
        targets:closedEyes,
        opacity: [1,0],
        duration: 10,
        delay: 250
    }).add({
        targets:openEyes,
        opacity:[0,1],
        duration:10,
    });

    anim.finished.then(() => {
        eyeLock=true;
        randomBlink(500 + Math.floor(Math.random()*7000));
    });
}
//zufälliges Kopf-Strecken
async function randomWobble(delay) {
    await new Promise(resolve => setTimeout(resolve, delay));;
    await waitForHead();
    headLock=false;

    anim = anime.timeline({
        easing: 'easeInOutSine',
        autoplay: true,
        loop: 2,
        targets: head,
        duration: 400,
    }).add({
        scaleX: '+=0.02',
        scaleY: '-=0.02',
    }).add({
        scaleX: '-=0.04',
        scaleY: '+=0.04',
    }).add({
        scaleX: '+=0.04',
        scaleY: '-=0.04',
    }).add({
        scaleX: '-=0.02',
        scaleY: '+=0.02',
    });

    anim.finished.then(() => {
        headLock=true;
        randomWobble(15000 + Math.floor(Math.random()*15000));
    });
}
//zufälliges Kopf-Wackeln
async function randomTilt(delay) {
    await new Promise(resolve => setTimeout(resolve, delay));;
    await waitForHead();
    headLock=false;

    anim = anime.timeline({
        easing: 'easeInOutSine',
        autoplay: true,
        loop: 2,
        targets: head,
    }).add({
        duration: 250,
        rotate: '-=5',
        translateX: '-=2',
    }).add({
        duration: 500,
        rotate: '+=10',
        translateX: '+=4',
    }).add({
        duration: 250,
        rotate: '-=5',
        translateX: '-=2',
    });

    anim.finished.then(() => {
        headLock=true;
        randomTilt(15000 + Math.floor(Math.random()*15000));
    });
}
//zufällig Lächeln
async function randomSmile(delay) {
    await new Promise(resolve => setTimeout(resolve, delay));;
    await waitForMouth();
    mouthLock=false;
    await waitForEyes();
    eyeLock=false;

    anim = anime.timeline({
        easing: 'easeInOutSine',
        autoplay: true,
    }).add({
        targets: openMouth,
        translateY: '+=12',
        duration: 250,
    }).add({
        targets: openEyes,
        opacity: [1, 0],
        duration: 10,
    }).add({
        targets: closedEyes,
        opacity: [0,1],
        duration: 10
    }).add({
        targets: openMouth,
        translateY: '-=12',
        duration: 250,
        delay: 2000,
    }).add({
        targets:closedEyes,
        opacity: [1,0],
        duration: 10,
    }).add({
        targets:openEyes,
        opacity:[0,1],
        duration:10,
    });

    anim.finished.then(() => {
        mouthLock=true;
        eyeLock=true;
        randomSmile(20000 + Math.floor(Math.random()*20000));
    });
}

//Warte-Funktionen
function waitForHead() {
    return new Promise((resolve) => {
        const checkVariable = () => {
            if (headLock === true) {
                resolve();
            } else {
                setTimeout(checkVariable, 100); // Check again after 100 milliseconds
            }
        };
        checkVariable();
    });
}
function waitForMouth() {
    return new Promise((resolve) => {
    const checkVariable = () => {
        if (mouthLock === true) {
            resolve();
        } else {
            setTimeout(checkVariable, 100); // Check again after 100 milliseconds
        }
    };
    checkVariable();
    });
}
function waitForEyes() {
    return new Promise((resolve) => {
    const checkVariable = () => {
        if (eyeLock === true) {
            resolve();
        } else {
            setTimeout(checkVariable, 100); // Check again after 100 milliseconds
        }
    };
    checkVariable();
    });
}