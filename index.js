const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "./assets/images/house.jpg";
image.crossOrigin = "Anonymous";
// image.setAttribute('crossOrigin', '');

const PARTICLE_DIAMETER = 4;
const particles = []; //Array to hold each particles

image.addEventListener('load', () => {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);
    //getting the pixel of the image
    //imageDate is an array of pixels imageDate = [rgba, rgba, ...]
    const imageData = ctx.getImageData(0, 0, image.width, image.height).data;

    const numRows = Math.round(image.height / PARTICLE_DIAMETER);
    const numColunm = Math.round(image.width / PARTICLE_DIAMETER);

    for(let row = 0; row < numRows; row++) {
        for(let colunm = 0; colunm < numColunm; colunm++) {
            const pixelIndex = (row * PARTICLE_DIAMETER * image.width + colunm * PARTICLE_DIAMETER) * 4;

            const red = imageData[pixelIndex];
            const green = imageData[pixelIndex + 1];
            const blue = imageData[pixelIndex + 2];
            const alpha = imageData[pixelIndex + 3];

            particles.push({
                x: colunm * PARTICLE_DIAMETER + PARTICLE_DIAMETER / 2,
                y: row * PARTICLE_DIAMETER + PARTICLE_DIAMETER /2,
                
                originX: colunm * PARTICLE_DIAMETER + PARTICLE_DIAMETER / 2,
                originY: row * PARTICLE_DIAMETER + PARTICLE_DIAMETER /2,

                color: `rgba(${red},${green},${blue},${alpha / 255})`
            });
        }
    }
    drawParticle();
});

function drawParticle() {
    updateParticles();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, PARTICLE_DIAMETER / 2, 0, 2 * Math.PI);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });

    requestAnimationFrame(drawParticle);
}

//Handling the mouse mouvement
let mouseX = Infinity;
let mouseY = Infinity;

image.addEventListener('mousemove', (event) => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
});


image.addEventListener('mouseleave', () => {
    mouseX = Infinity;
    mouseY = Infinity;
});

function updateParticles() {
    const REPEL_RADIUS = 50;
    const REPEL_SPEED = 5;
    const RETURN_SPEED = 0.1;

    particles.forEach((particle) => {
        const distanceFromMouseX = mouseX - particle.x;
        const distanceFromMouseY = mouseY - particle.y;
        const distanceFromMouse = Math.sqrt(distanceFromMouseX ** 2 + distanceFromMouseY ** 2);

        if (distanceFromMouse < REPEL_RADIUS) {
            const angle  = Math.atan2(distanceFromMouseY, distanceFromMouseX);
            const force = (REPEL_RADIUS - distanceFromMouse) / REPEL_RADIUS;
            const moveX = Math.cos(angle) * force * REPEL_SPEED;
            const moveY = Math.sin(angle) * force * REPEL_SPEED;

            particle.x -= moveX;
            particle.y -= moveY;
        } else if (particle.x !== particle.originX || particle.y !== particle.originY) {
            const distanceFromOriginX = particle.originX - particle.x;
            const distanceFromOriginY = particle.originY - particle.y;
            const distanceFromOrigin = Math.sqrt(distanceFromOriginX ** 2 + distanceFromOriginY ** 2);

            const angle  = Math.atan2(distanceFromOriginY, distanceFromMouseX);
            const moveX = Math.cos(angle) * distanceFromOrigin * RETURN_SPEED;
            const moveY = Math.sin(angle) * distanceFromOrigin * RETURN_SPEED;

            particle.x += moveX;
            particle.y += moveY;
        }
    });
}
