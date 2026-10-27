const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let height = canvas.height;
let width = canvas.width;

let drawd = true;
let isPath = false;
let points = [];

document.addEventListener('click', (event) => {

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left; // X coordinate relative to the canvas
    const y = event.clientY - rect.top; // Y coordinate relative to the canvas

    if (x < 0 || x > 1000 || y < 0 || y > 800) {

    } else {

        if (drawd) {
            point(x, y);
        }
    }
});

canvas.addEventListener("contextmenu", (event) => {

    event.preventDefault();

    if (isPath) {
        ctx.closePath();
        ctx.stroke();

        isPath = false;
        drawd = false;
    }
});

document.addEventListener("keydown", (event) => {

    if (drawd) {
        return;
    }

    // Translation
    if (event.key === "ArrowUp") {
        translate(0, -10);
    }
    else if (event.key === "ArrowDown") {
        translate(0, 10);
    }
    else if (event.key === "ArrowLeft") {
        translate(-10, 0);
    }
    else if (event.key === "ArrowRight") {
        translate(10, 0);
    }

    // Rotation
    else if (event.key.toLowerCase() === "a") {
        rotate(-5);
    }
    else if (event.key === "d") {
        rotate(5);
    }

    // Scaling
    else if (event.key === "+") {
        scale(1.1);
    }
    else if (event.key === "-") {
        scale(0.9);
    }
});

function point(x, y) {

    points.push({ x: x, y: y });

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (!isPath) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        isPath = true;
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function translate(tx, ty) {

    for (let i = 0; i < points.length; i++) {
        points[i].x += tx;
        points[i].y += ty;
    }

    redraw();
}

function redraw() {

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath();
    ctx.stroke();
}

function rotate(angle) {

    let centerX = 0;
    let centerY = 0;

    for (let i = 0; i < points.length; i++) {
        centerX += points[i].x;
        centerY += points[i].y;
    }

    centerX /= points.length;
    centerY /= points.length;

    const rad = angle * Math.PI / 180;

    for (let i = 0; i < points.length; i++) {

        const x = points[i].x - centerX;
        const y = points[i].y - centerY;

        const newX = x * Math.cos(rad) - y * Math.sin(rad);
        const newY = x * Math.sin(rad) + y * Math.cos(rad);

        points[i].x = newX + centerX;
        points[i].y = newY + centerY;
    }

    redraw();
}

function scale(factor) {

    let centerX = 0;
    let centerY = 0;

    for (let i = 0; i < points.length; i++) {
        centerX += points[i].x;
        centerY += points[i].y;
    }

    centerX /= points.length;
    centerY /= points.length;

    for (let i = 0; i < points.length; i++) {

        const x = points[i].x - centerX;
        const y = points[i].y - centerY;

        points[i].x = x * factor + centerX;
        points[i].y = y * factor + centerY;
    }

    redraw();
}