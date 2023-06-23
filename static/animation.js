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

//Augenanimation:
let eyeAnimation = anime.timeline({
    easing: 'easeInOutSine',
    autoplay: false,
    loop: true
}).add({
    //Augen schließen
    targets: openEyes,
    opacity: [1, 0],
    duration: 10,
    delay:4500
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
    duration:10
});

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

//Mundanimationen
//Mund wird zu 100% geöffnet
let mouthCompleteOpenAnimation = anime({
    targets: openMouth,
    translateY: [mouthCurrent, 12],
    duration: animationDuration,
    easing: 'easeInOutSine',
    autoplay: false,
    //complete: () => {
    //    mouthCompleteCloseAnimation.play();
    //}
});
//Mund wird zu 75% geöffnet
let mouth3QuarterOpenAnimation = anime({
    targets: openMouth,
    translateY: [mouthCurrent, 9],
    duration: animationDuration,
    easing: 'easeInOutSine',
    autoplay: false,
    //complete: () => {
    //    mouth3QuarterCloseAnimation.play();
    //}
});
// Mund wird zu 50% geöffnet
let mouthHalfOpenAnimation = anime({
    targets: openMouth,
    translateY: [mouthCurrent, 6],
    duration: animationDuration,
    easing: 'easeInOutSine',
    autoplay: false,
    //complete: () => {
    //    mouthHalfCloseAnimation.play();
    //}
});
//Mund wird zu 25% geöffnet
let mouth1QuarterOpenAnimation = anime({
    targets: openMouth,
    translateY: [mouthCurrent, 3],
    duration: animationDuration,
    easing: 'easeInOutSine',
    autoplay: false,
});
//Mund wird von beliebiger Position geschlossen
let mouthCloseAnimation = anime({
    targets: openMouth,
    translateY: [mouthCurrent,0],
    duration: animationDuration,
    easing: 'easeInOutSine',
    autoplay: false,
});

//Nicken
let headBobbing = anime.timeline({
    easing: 'easeInOutSine',
    autoplay: false
}).add({
    targets: head,
    translateY: [0,5],
    translateX: [-4,-4],
    duration: 250
}).add({
    targets: head,
    translateY: [5,0],
    translateX: [-4,-4],
    duration: 250,
    delay: 100
});
//Kopf Schieflage und umkehr
let headUntilt = anime({
    targets: head,
    autoplay: false,
    easing: 'easeInOutSine',
    duration: 500,
    rotate: [-10, 0],
    translateX: [-14, -4],
    translateY: [10, 0],
    scaleX: [1.05, 1],
    scaleY: [1.05, 1],
    //rotateY: [25, 0],
    complete: () => {
        headBobbing.play()
    }
});
let headTilt = anime({
    targets: head,
    autoplay: false,
    easing: 'easeInOutSine',
    duration: 500,
    rotate: [0, -10],
    translateX: [-4, -14],
    translateY: [0, 10],
    scaleX: [1, 1.05],
    scaleY: [1, 1.05],
    //rotateY: [0, 25],
});
//Augenbrauen
let eyeBrowLower = anime({
    targets: eyeBrows,
    autoplay: false,
    easing: 'easeInOutSine',
    duration: 200,
    //translateX: [-4, -4],
    translateY: [-5, 0],
});
let eyeBrowRaise = anime({
    targets: eyeBrows,
    autoplay: false,
    easing: 'easeInOutSine',
    duration: 200,
    //translateX: [-4, -4],
    translateY: [0, -5],
});



//nicht-fixe Animationen

//dynamischer Mund
function mouthMovement(before, after) {
    anime({
        targets: openMouth,
        translateY: [before, after],
        duration: animationDuration,
        easing: 'easeInOutSine',
        autoplay: true,
    })
    mouthCurrent=after;
}

//random-delay Blinzeln
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

//random headWobble
function randomWobble() {
    anime({
        autoplay: true,
        duration: anime.random(15000, 30000),
        begin: () => {
            anime.timeline({
                easing: 'easeInOutSine',
                autoplay: true,
                loop: 3,
                targets: head,
                duration: 200,
            }).add({
                scaleX: [1, 1.02],
            }).add({
                scaleY: [1, 1.02],
            }).add({
                scaleX: [1.02, 1],
            }).add({
                scaleY: [1.02, 1],
            });
        },
        complete: () => {
            randomWobble();
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