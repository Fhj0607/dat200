const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 800; // grid size
const padding = 15;    // // i used padding because it looks slightly better. Everything in this script will work without it, so its only for aesthetics 
const canvasSize = gridSize + padding * 2; // defines canvasSize

canvas.width = canvasSize; // make the html-element adapt the calculated size
canvas.height = canvasSize;



function draw() { 
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    createCells();
}

function createCells() {

    const cellSize = gridSize / 4; // this divides the canvas into 4 cells, outlining the grid

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) { // iterate through and define cell dimensions in the grid. Again this would work without padding

            const x = padding + col * cellSize;
            const y = padding + row * cellSize;

            const mirrored = (row + col) % 2 === 1; // alternate between normal and mirrored cells

            drawSpiralSquare(x, y, cellSize, mirrored); // input definitions for function parameters
        }
    }
}

function drawSpiralSquare(startX, startY, size, mirrored) {

    let x1 = startX;
    let y1 = startY;

    let x2 = startX + size;
    let y2 = startY;

    let x3 = startX + size;
    let y3 = startY + size;

    let x4 = startX;
    let y4 = startY + size;

    const step = 0.1;

    for (let i = 0; i < 22; i++) { // with this method (where each iteration moves 10% towards the next vertex) I have to use 22 iterations to make sure the inner square lines up with the angle in the assignment image. 

        ctx.beginPath();

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();

        ctx.stroke();

        let newX1, newY1, newX2, newY2, newX3, newY3, newX4, newY4

        if (mirrored) { // true = reverse spiral direction
            newX1 = x1 + step * (x4 - x1);
            newY1 = y1 + step * (y4 - y1);

            newX2 = x2 + step * (x1 - x2);
            newY2 = y2 + step * (y1 - y2);

            newX3 = x3 + step * (x2 - x3);
            newY3 = y3 + step * (y2 - y3);

            newX4 = x4 + step * (x3 - x4);
            newY4 = y4 + step * (y3 - y4);
        } else {
            newX1 = x1 + step * (x2 - x1);
            newY1 = y1 + step * (y2 - y1);

            newX2 = x2 + step * (x3 - x2);
            newY2 = y2 + step * (y3 - y2);

            newX3 = x3 + step * (x4 - x3);
            newY3 = y3 + step * (y4 - y3);

            newX4 = x4 + step * (x1 - x4);
            newY4 = y4 + step * (y1 - y4);
        }

        x1 = newX1;
        y1 = newY1;

        x2 = newX2;
        y2 = newY2;

        x3 = newX3;
        y3 = newY3;

        x4 = newX4;
        y4 = newY4;
    }
    console.log("blalsmdaskdk")

}

draw();