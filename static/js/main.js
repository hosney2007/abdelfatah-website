const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});
function openVideo(videoUrl) {

    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");

    frame.src = videoUrl;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeVideo() {

    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");

    frame.src = "";

    modal.classList.remove("active");

    document.body.style.overflow = "";
}


document
    .getElementById("videoModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeVideo();
        }

    });
 
 /* =====================================================
   SUCCESS STORIES SLIDER
===================================================== */

const successSlider =
    document.getElementById("successSlider");

const successPrev =
    document.getElementById("successPrev");

const successNext =
    document.getElementById("successNext");

const successDots =
    document.getElementById("successDots");


let successCards = [];

let currentSuccessIndex = 0;

let successAutoPlay;


/* =====================================================
   CREATE DOTS
===================================================== */

function createSuccessDots() {

    if (!successSlider || !successDots) {
        return;
    }

    successCards =
        Array.from(
            successSlider.querySelectorAll(".success-card")
        );

    successDots.innerHTML = "";


    successCards.forEach((card, index) => {

        const dot =
            document.createElement("button");

        dot.type = "button";

        dot.className = "success-dot";

        dot.setAttribute(
            "aria-label",
            `Go to student ${index + 1}`
        );


        dot.addEventListener(
            "click",
            () => {

                goToSuccessCard(index);

                restartSuccessAutoPlay();

            }
        );


        successDots.appendChild(dot);

    });


    updateSuccessDots();

}


/* =====================================================
   GET CARD POSITION
===================================================== */

function goToSuccessCard(index) {

    if (!successSlider || !successCards.length) {
        return;
    }


    if (index < 0) {

        index =
            successCards.length - 1;

    }


    if (index >= successCards.length) {

        index = 0;

    }


    currentSuccessIndex = index;


    successSlider.scrollTo({

        left:
            successCards[index].offsetLeft -
            successSlider.offsetLeft -
            4,

        behavior: "smooth"

    });


    updateSuccessDots();

}


/* =====================================================
   DOT UPDATE
===================================================== */

function updateSuccessDots() {

    if (!successDots) {
        return;
    }


    const dots =
        successDots.querySelectorAll(".success-dot");


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSuccessIndex
        );

    });

}


/* =====================================================
   NEXT
===================================================== */

function nextSuccessCard() {

    goToSuccessCard(
        currentSuccessIndex + 1
    );

}


/* =====================================================
   PREVIOUS
===================================================== */

function previousSuccessCard() {

    goToSuccessCard(
        currentSuccessIndex - 1
    );

}


/* =====================================================
   BUTTONS
===================================================== */

if (successNext) {

    successNext.addEventListener(
        "click",
        () => {

            nextSuccessCard();

            restartSuccessAutoPlay();

        }
    );

}


if (successPrev) {

    successPrev.addEventListener(
        "click",
        () => {

            previousSuccessCard();

            restartSuccessAutoPlay();

        }
    );

}


/* =====================================================
   AUTO PLAY
===================================================== */

function startSuccessAutoPlay() {

    stopSuccessAutoPlay();


    successAutoPlay =
        setInterval(() => {

            nextSuccessCard();

        }, 4500);

}


function stopSuccessAutoPlay() {

    if (successAutoPlay) {

        clearInterval(
            successAutoPlay
        );

    }

}


function restartSuccessAutoPlay() {

    stopSuccessAutoPlay();

    startSuccessAutoPlay();

}


/* =====================================================
   PAUSE WHILE TOUCHING / HOVERING
===================================================== */

if (successSlider) {

    successSlider.addEventListener(
        "mouseenter",
        stopSuccessAutoPlay
    );


    successSlider.addEventListener(
        "mouseleave",
        startSuccessAutoPlay
    );


    successSlider.addEventListener(
        "touchstart",
        stopSuccessAutoPlay,
        { passive: true }
    );


    successSlider.addEventListener(
        "touchend",
        restartSuccessAutoPlay,
        { passive: true }
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

createSuccessDots();

startSuccessAutoPlay();   


