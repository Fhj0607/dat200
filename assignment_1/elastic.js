const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


// define global variables and constants
let isDragging = false;
let circleX = canvas.width / 2;
let circleY = canvas.height / 2;
const circleRadius = 8;


// define what happens when mouse is pressed down
canvas.addEventListener("mousedown", function (e) {

    // get current mouse position
    let currX = e.clientX - canvas.offsetLeft;
    let currY = e.clientY - canvas.offsetTop;

    // calculate distance from mouse to circle
    const dx = currX - circleX;
    const dy = currY - circleY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= circleRadius) {
        // start dragging if mouse is pressed down on the circle
        isDragging = true;
    }
});

// define what happens when mouse is moved and isDragging is true
canvas.addEventListener("mousemove", function (e) {

    // get current mouse position
    let currX = e.clientX - canvas.offsetLeft;
    let currY = e.clientY - canvas.offsetTop;

    // calculate distance from mouse to circle
    const dx = currX - circleX;
    const dy = currY - circleY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // change cursor style based on whether the mouse is over the circle or dragging it
    if (isDragging) {

        circleX = currX;
        circleY = currY;

        canvas.style.cursor = "grabbing";

        draw();

    } else if (distance <= circleRadius) {

        canvas.style.cursor = "pointer";

    } else {

        canvas.style.cursor = "default";
    }
});

// define what happens when mouse is released
canvas.addEventListener("mouseup", function (e) {
    // returns circle to its original position when released
    circleX = canvas.width / 2;
    circleY = canvas.height / 2;

    // update state
    isDragging = false;

    // draws the circle in its original position
    draw();
});

// function to draw the canvas elements on each frame
function draw() {

    // clears the canvas before drawing new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw background, foreground, ropes, and circle
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 4, canvas.height / 2);
    ctx.lineTo(circleX, circleY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width * 3 / 4, canvas.height / 2);
    ctx.lineTo(circleX, circleY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.stroke();
};

// initialize the canvas by drawing the initial state
draw();
