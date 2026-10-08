/* =========================================
   SADIA PROPOSAL
   PARTICLE HEART + MUSIC
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const startScreen =
    document.getElementById("startScreen");

const startBtn =
    document.getElementById("startBtn");

const bgMusic =
    document.getElementById("bgMusic");

const particleIntro =
    document.getElementById("particleIntro");

const canvas =
    document.getElementById("heartCanvas");

const ctx =
    canvas.getContext("2d");

const sadiaText =
    document.getElementById("sadiaText");

const mainContent =
    document.getElementById("mainContent");

const continueBtn =
    document.getElementById("continueBtn");

const finalMessage =
    document.getElementById("finalMessage");

const yesBtn =
    document.getElementById("yesBtn");

const ofCourseBtn =
    document.getElementById("ofCourseBtn");


/* =========================================
   MUSIC
========================================= */

bgMusic.volume = 0.45;


/* =========================================
   PARTICLE VARIABLES
========================================= */

let particles = [];

let heartPoints = [];

let scattered = false;

let animationRunning = false;


/* =========================================
   RESIZE CANVAS
========================================= */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createHeartPoints();

}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   HEART SHAPE
========================================= */

function createHeartPoints() {

    heartPoints = [];


    const scale =
        Math.min(
            canvas.width,
            canvas.height
        ) * 0.017;


    for (
        let t = 0;
        t < Math.PI * 2;
        t += 0.009
    ) {

        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            13 *
            Math.cos(t)

            -

            5 *
            Math.cos(
                2 * t
            )

            -

            2 *
            Math.cos(
                3 * t
            )

            -

            Math.cos(
                4 * t
            );


        heartPoints.push({

            x:
                canvas.width / 2
                + x * scale,

            y:
                canvas.height / 2
                - y * scale

        });

    }

}


/* =========================================
   RANDOM COLOR
========================================= */

function randomColor() {

    const colors = [

        "#ffffff",

        "#ffd6ed",

        "#ffb3d9",

        "#ff80ba",

        "#ff4fa3",

        "#ff1493",

        "#ff0080"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}


/* =========================================
   PARTICLE CLASS
========================================= */

class Particle {

    constructor() {

        /* Start from random location */

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;


        this.targetX = 0;

        this.targetY = 0;


        this.size =
            Math.random() *
            2.2 + .45;


        this.speed =
            Math.random() *
            .035 + .012;


        this.color =
            randomColor();


        this.alpha =
            Math.random() *
            .75 + .25;


        this.glow =
            Math.random() *
            14 + 5;


        this.angle =
            Math.random() *
            Math.PI *
            2;


        this.scatterSpeed =
            Math.random() *
            4 + 1.5;

    }


    setTarget(point) {

        this.targetX =
            point.x;

        this.targetY =
            point.y;

    }


    update() {

        if (!scattered) {

            const dx =
                this.targetX -
                this.x;


            const dy =
                this.targetY -
                this.y;


            this.x +=
                dx * this.speed;


            this.y +=
                dy * this.speed;

        }

        else {

            this.x +=
                Math.cos(
                    this.angle
                ) *
                this.scatterSpeed;


            this.y +=
                Math.sin(
                    this.angle
                ) *
                this.scatterSpeed;


            this.alpha -=
                0.006;

        }

    }


    draw() {

        if (
            this.alpha <= 0
        ) {
            return;
        }


        ctx.save();


        ctx.globalAlpha =
            this.alpha;


        ctx.shadowBlur =
            this.glow;


        ctx.shadowColor =
            this.color;


        ctx.fillStyle =
            this.color;


        ctx.beginPath();


        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI * 2

        );


        ctx.fill();


        ctx.restore();

    }

}


/* =========================================
   CREATE PARTICLES
========================================= */

function createParticles() {

    particles = [];


    const particleCount =
        Math.min(
            2000,

            Math.max(
                900,

                Math.floor(
                    (
                        canvas.width *
                        canvas.height
                    ) / 600
                )
            )
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            new Particle();


        const point =
            heartPoints[
                i %
                heartPoints.length
            ];


        particle.setTarget(
            point
        );


        particles.push(
            particle
        );

    }

}


/* =========================================
   ANIMATION
========================================= */

function animate() {

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    for (
        const particle
        of particles
    ) {

        particle.update();

        particle.draw();

    }


    requestAnimationFrame(
        animate
    );

}


/* =========================================
   START EXPERIENCE
========================================= */

startBtn.addEventListener(
    "click",
    () => {

        /* Music starts after user tap */

        bgMusic.play()
            .catch(() => {});


        /* Hide start screen */

        startScreen.classList.add(
            "hide"
        );


        /* Show particle intro */

        setTimeout(() => {

            particleIntro.classList.add(
                "active"
            );

            startHeartAnimation();

        }, 500);

    }
);


/* =========================================
   HEART ANIMATION
========================================= */

function startHeartAnimation() {

    scattered = false;


    resizeCanvas();

    createParticles();


    /*

       0 - 3.5 sec
       particles form heart

    */

    setTimeout(() => {

        sadiaText.classList.add(
            "show"
        );

    }, 3500);


    /*

       7 sec
       particles explode outward

    */

    setTimeout(() => {

        scattered = true;

        particles.forEach(
            particle => {

                particle.angle =
                    Math.random() *
                    Math.PI *
                    2;

            }
        );

    }, 7000);


    /*

       8.8 sec
       intro disappears

    */

    setTimeout(() => {

        particleIntro.classList.add(
            "finished"
        );


        mainContent.classList.add(
            "show"
        );


        document.body.style.overflow =
            "auto";


    }, 8800);

}


/* =========================================
   CONTINUE BUTTON
========================================= */

continueBtn.addEventListener(
    "click",
    () => {

        finalMessage.classList.add(
            "show"
        );


        continueBtn.style.display =
            "none";

    }
);


/* =========================================
   YES BUTTON
========================================= */

yesBtn.addEventListener(
    "click",
    () => {

        finalMessage.innerHTML = `

            <div class="finalHeart">
                💖
            </div>

            <h2>
                Thank you, Sadia ❤️
            </h2>

            <p>
                This moment will always
                be special. ✨
            </p>

        `;

    }
);


/* =========================================
   OF COURSE BUTTON
========================================= */

ofCourseBtn.addEventListener(
    "click",
    () => {

        finalMessage.innerHTML = `

            <div class="finalHeart">
                ❤️
            </div>

            <h2>
                You made me smile! ❤️
            </h2>

            <p>
                This is a very special moment.
                ✨
            </p>

        `;

    }
);


/* =========================================
   INITIALIZE
========================================= */

resizeCanvas();

createParticles();

animate();