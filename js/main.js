const elements = document.querySelectorAll('.element');
const tikus = document.querySelectorAll('.tikus');
const skorSpan = document.querySelector('.skor');
const buttonStart = document.querySelector('.button-start');
const pow = document.querySelectorAll('.pow');
const aExplode = document.querySelector('#explode');
const aPop = document.querySelector('#pop');
const aBg = document.querySelector('#back');
const progessBar = document.querySelector('.progress-bar');
const progressWrapper = document.querySelector('.progress-wrapper');
const btnBoost = document.querySelector('.button-boost');
const btnBounty = document.querySelector('.button-bounty');

let status = aBg.play();
if (status !== undefined) {
    status.then(_ => {
        // Autoplay started!
    }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
    });
}

let skor = 0;
let time;
let mulai = false;
let noElement;
let totalTime = 0;
let min;
let max;
let bountyStatus = false;
let bountyNumber = 0;

tikus.forEach(element => {
    element.addEventListener('click', pukulTikus);
})

buttonStart.addEventListener('click', start);
btnBoost.addEventListener('click', boost);
btnBounty.addEventListener('click', bountyActive);

function randElement() {
    let w = Math.floor(Math.random() * 6) + 1;
    if (w == noElement) {
        randElement();
    }
    return w;
}

function checkButtonBoost() {
    if (skor == 25 || skor == 100 || skor == 200 || skor == 300 || skor == 400 || skor == 500) {
        btnBoost.classList.add('show');
    }
}

function checkBountyButton() {
    if (skor == 50) {
        btnBounty.classList.add('show');
    }
}

function randWaktu(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkSkill() {
    switch (skor) {
        case 0:
            min = 500;
            max = 1000;
            break;
        case 25:
            min = 500;
            max = 900;
            break;
        case 50:
            min = 400;
            max = 800;
            break;
        case 100:
            min = 300;
            max = 700;
            break;
        case 200:
            min = 300;
            max = 600;
            break;
        case 250:
            min = 250;
            max = 500;
            break;
        case 300:
            min = 250;
            max = 500;
            break;
        case 350:
            min = 100;
            max = 200;
            break;
    }
}

function showTikus() {
    noElement = randElement();
    console.log(noElement);
    let waktu = randWaktu(min, max);
    aPop.play();
    elements[noElement - 1].classList.add('muncul');
    if (bountyStatus == true) {
        bountyAction(noElement);
    } else {
        totalTime = totalTime - 1;
        displayProgressBar();
        setTimeout(function () {
            aPop.pause();
            aPop.currentTime = 0;
            elements[noElement - 1].classList.remove('muncul');
            calculateTime();
            if (mulai == true) {
                showTikus();
            }
        }, waktu);
    }


}

function pukulTikus() {
    skor++;
    checkButtonBoost();
    checkSkill();
    skorSpan.innerHTML = skor;
    let temp = this;
    let id = temp.dataset.id;
    let tempElement = document.getElementById('' + id + '');
    tempElement.classList.add('active');
    aExplode.play();
    elements[noElement].classList.remove('muncul');
    if (totalTime < 15) {
        totalTime = totalTime + 1.5;
    }

    setTimeout(function () {
        tempElement.classList.remove('active');
    }, 100);
}

function displayProgressBar() {
    let perc = totalTime / 15 * 100;
    progessBar.setAttribute('style', 'width:' + perc + '%');
}

function displaySkor() {
    skorSpan.innerHTML = skor;
}

function calculateTime() {
    if (totalTime <= 0) {
        aBg.play();
        mulai = false;
        elements[noElement].classList.remove('muncul');
        clearInterval(time);
        buttonStart.classList.remove('hidden');
        progressWrapper.classList.remove('active');
        btnBoost.classList.remove('show');
    }
}

function boost() {
    totalTime = 15;
    displayProgressBar();
    this.classList.remove('show');
}

function start() {
    if (mulai == false) {
        mulai = true
        aBg.pause();
        aBg.currentTime = 0;
        skor = 0;
        totalTime = 15;
        displaySkor();
        checkSkill();
        progressWrapper.classList.add('active');
        buttonStart.classList.add('hidden');
        showTikus();
    }

}

function bountyActive() {
    bountyStatus = true;
    totalTime = 15;
    displayProgressBar();
    //console.log('active');
    btnBounty.classList.remove('show');
}

function bountyAction(noElement) {
    bountyNumber++;
    if (bountyNumber == 11) {
        elements[noElement - 1].classList.remove('muncul');
        bountyStatus = false;
        bountyNumber = 0;
        return showTikus();
    }
    if (noElement) {
        let waktu = randWaktu(min, max);
        console.log(noElement);
        skor++;
        displaySkor();
        let tempElement = document.getElementById('' + noElement + '');
        console.log(tempElement);

        setTimeout(function () {
            tempElement.classList.add('active');
            elements[noElement - 1].classList.remove('muncul');
        }, 100)

        // console.log(tempElement);
        aExplode.play();
        setTimeout(function () {
            tempElement.classList.remove('active');
            showTikus();
        }, waktu);
    } else {
        showTikus();
    }

}

