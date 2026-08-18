const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


// define global variables and constants
let isDragging = false;
let circleX = canvas.width / 2;
let circleY = canvas.height / 2;
const circleRadius = 8;


// define what happens when mouse is pressed down
canvas.addEventListener("mousedown", function (e) {
    // checks current mouse positions
    let currX = e.clientX - canvas.offsetLeft; 
    let currY = e.clientY - canvas.offsetTop;  

    // calculate distance from mouse position to circle center
    const dx = currX - circleX;
    const dy = currY - circleY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // check if mouse is within the circle radius
    if (distance <= circleRadius) {
        isDragging = true;
        console.log("Circle clicked!"); // for debugging
    } 
}, false);

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


// define what happens when mouse is moved and isDragging is true
canvas.addEventListener("mousemove", function (e) {
    if (isDragging) {

        // checks current mouse position
        let currX = e.clientX - canvas.offsetLeft;
        let currY = e.clientY - canvas.offsetTop;

        // update circle position to current mouse position
        circleX = currX;
        circleY = currY;

        // redraw the canvas with updated circle position
        draw();
    }
});

// define what happens when mouse is released
canvas.addEventListener("mouseup", function (e) {

    // stop dragging, which essentially means the circle will stay in its new position
    isDragging = false;
});

// ============== initial draw  ============== //

// background
ctx.fillStyle = "yellow";  
ctx.fillRect(0, 0, canvas.width, canvas.height);

// foreground
ctx.fillStyle = "red";
ctx.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);

// ropes
ctx.beginPath();
ctx.moveTo(canvas.width/4, canvas.height/2);
ctx.lineTo(canvas.width/4 + 93, canvas.height/2);
ctx.moveTo(canvas.width/4 + 107, canvas.height/2);
ctx.lineTo(canvas.width/4 + 200, canvas.height/2);
ctx.stroke();

// center-circle
ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/2, 8, 0, Math.PI * 2);
ctx.stroke();
