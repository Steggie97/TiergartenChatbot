let openMouth = document.getElementById('redPanda_open_mouth');
let closedMouth = document.getElementById('redPanda_closed_mouth');
let openEyes = document.getElementById('redPanda_open_eyes');
let closedEyes = document.getElementById('redPanda_closed_eyes');
let tail = document.getElementById('redPanda_tail');
let head = document.getElementById('redPanda_head');

//Aktuelle Position des Mundes
let mouthY = 0;

function updateMouthState(newState){
    mouthY = newState
}
//Variable Animationslänge
let animationDuration = 50;

let eyeAnimation = anime.timeline({
    easing: 'easeInOutSine',
    autoplay: true,
    loop: true
});
//Augenanimation:
eyeAnimation.add({
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


let tailAnimation = anime.timeline({
    easing: 'easeInOutSine',
    autoplay: true,
    loop: true
});

tailAnimation.add({
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
    translateY: [mouthY, 12],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
    //complete: () => {
    //    mouthCompleteCloseAnimation.play();
    //}
});
// Mund wird komplett geschlossen
let mouthCompleteCloseAnimation = anime({
    targets: openMouth,
    translateY: [12,0],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
});

//Mund wird zu 75% geöffnet
let mouth3QuarterOpenAnimation = anime({
    targets: openMouth,
    translateY: [mouthY, 9],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
    //complete: () => {
    //    mouth3QuarterCloseAnimation.play();
    //}
});
let mouth3QuarterCloseAnimation = anime({
    targets: openMouth,
    translateY: [9, 0],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
});

// Mund wird zu 50% geöffnet
let mouthHalfOpenAnimation = anime({
    targets: openMouth,
    translateY: [mouthY, 6],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
    //complete: () => {
    //    mouthHalfCloseAnimation.play();
    //}
});
let mouthHalfCloseAnimation = anime({
    targets: openMouth,
    translateY: [6, 0],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
});

//Mund wird zu 25% geöffnet
let mouth1QuarterOpenAnimation = anime({
    targets: openMouth,
    translateY: [mouthY, 3],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
    //complete: () => {
    //    mouth1QuarterCloseAnimation.play();
    //}
});
let mouth1QuarterCloseAnimation = anime({
    targets: openMouth,
    translateY: [3, 0],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
});

//Mund wird von beliebiger Position geschlossen
let mouthCloseAnimation = anime({
    targets: openMouth,
    translateY: [mouthY,0],
    duration: animationDuration,
    easing: 'linear',
    autoplay: false,
});

let headBobbing = anime.timeline({
    easing: 'linear',
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

