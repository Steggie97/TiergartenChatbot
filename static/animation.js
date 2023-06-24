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

//Nicken
let headBobbing = anime.timeline({
    easing: 'easeInOutSine',
    autoplay: false
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
//Kopf Schieflage und umkehr
function animPayAttention() {
    let headTilt = anime({
        targets: head,
        autoplay: true,
        easing: 'easeInOutSine',
        duration: 500,
        rotate: '-=10',
        translateX: '-=10',
        translateY: '+=10',
        scaleX: '+=0.05',
        scaleY: '+=0.05',
    });
    let eyeBrowRaise = anime({
        targets: eyeBrows,
        autoplay: true,
        easing: 'easeInOutSine',
        duration: 200,
        translateY: '-=5',
    });
}
function animEndAttention() {
    let eyeBrowLower = anime({
        targets: eyeBrows,
        autoplay: true,
        easing: 'easeInOutSine',
        duration: 200,
        translateY: '+=5',
    });
    
    let headUntilt = anime({
        targets: head,
        autoplay: true,
        easing: 'easeInOutSine',
        duration: 500,
        rotate: '+=10',
        translateX: '+=10',
        translateY: '-=10',
        scaleX: '-=0.05',
        scaleY: '-=0.05',
        complete: () => {
            headBobbing.play()
        }
    });
}

//nicht-fixe Animationen

//dynamischer Mund
function mouthMovement(mouthAfter) {
    anime({
        targets: openMouth,
        translateY: [mouthCurrent, mouthAfter],
        duration: animationDuration,
        easing: 'easeInOutSine',
        autoplay: true,
    })
    mouthCurrent=mouthAfter;
}

//zufälliges Blinzeln
function randomBlink() {
    anime.timeline({
        easing: 'easeInOutSine',
        autoplay: true,
    }).add({
        //Augen schließen
        targets: openEyes,
        opacity: [1, 0],
        duration: 10,
        delay: anime.random(500, 7500),
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
        complete: () => {
            randomBlink();
        }
    });
}

//zufälliges Kopf-Strecken
function randomWobble() {
    anime({
        autoplay: true,
        duration: anime.random(15000, 30000),
        begin: () => {
            anime.timeline({
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
        },
        complete: () => {
            randomWobble();
        }
    });
}

//zufälliges Kopf-Wackeln
function randomTilt() {
    anime({
        autoplay: true,
        duration: anime.random(15000, 30000),
        begin: () => {
            anime.timeline({
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
        },
        complete: () => {
            randomTilt();
        }
    });
}

//random eyeBrowRaise
/*
function randomEyeBrowRaise() {
    anime.timeline({
        easing: 'easeInOutSine',
        autoplay: true,
    }).add({
        delay: anime.random(15000, 30000,),
        targets: eyeBrowLeft,
        duration: 200,
        translateY: [24, -4],
    }).add({
        delay: 500,
        targets: eyeBrowLeft,
        duration: 200,
        translateY: [-4, 24],
    })
}
*/