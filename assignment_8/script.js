const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const showPolygon = document.getElementById("showPolygon");

const controlPoints = [];


// based on the supplied example
// i is the fourth control point's index; n is the number of line segments.
function drawBSpline(i, n, g) {
    let j;
    let t;

    const curvePoints = new Array(n + 1); // stores the points along the curve for this span
    const delta = 1.0 / n; // the parameter increment for each line segment

    for (j = 0; j <= n; j++) {
        t = j * delta; 
        curvePoints[j] = {};

        curvePoints[j].x = (
            (controlPoints[i - 3].x * (1 - t) * (1 - t) * (1 - t)
            + controlPoints[i - 2].x * (3 * t * t * t - 6 * t * t + 4)
            + controlPoints[i - 1].x * (-3 * t * t * t + 3 * t * t + 3 * t + 1)
            + controlPoints[i].x * t * t * t) / 6
        ); // x coordinate of the curve point

        curvePoints[j].y = (
            (controlPoints[i - 3].y * (1 - t) * (1 - t) * (1 - t)
            + controlPoints[i - 2].y * (3 * t * t * t - 6 * t * t + 4)
            + controlPoints[i - 1].y * (-3 * t * t * t + 3 * t * t + 3 * t + 1)
            + controlPoints[i].y * t * t * t) / 6
        ); // y coordinate of the curve point
    }

    g.strokeStyle = "black";
    g.lineCap = "round";
    g.lineJoin = "round";
    g.beginPath();
    g.moveTo(curvePoints[0].x, curvePoints[0].y); // move to the first curve point

    for (j = 0; j < n; j++) {
        g.lineTo(curvePoints[j + 1].x, curvePoints[j + 1].y); // draw a line segment to the next curve point
    }

    g.stroke(); 
}

// draws the control polygon, the B-spline curve, and the control points
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (showPolygon.checked && controlPoints.length > 0) { 
        context.beginPath();
        context.moveTo(controlPoints[0].x, controlPoints[0].y);

        for (const point of controlPoints.slice(1)) context.lineTo(point.x, point.y);

        context.strokeStyle = "#a4b2bf";
        context.lineWidth = 1;
        context.stroke();
    } // draw the control polygon if the checkbox is checked

    const n = 40; // number of line segments per curve span


    context.lineWidth = 3;

    // m control points produce m - 3 curve spans (when m >= 4).
    for (let i = 3; i < controlPoints.length; i++) drawBSpline(i, n, context); 

    controlPoints.forEach(point => {
        context.beginPath();
        context.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        context.fill();
    }); // draw the control points as filled circles

    document.getElementById("undo").disabled = controlPoints.length === 0; // just disables the undo button if there are no control points
}

// returns the pointer position relative to the centered canvas
function pointerPosition(event) {
    const bounds = canvas.getBoundingClientRect();

    return {
        x: Math.max(0, Math.min(canvas.width, (event.clientX - bounds.left - canvas.clientLeft) * canvas.width / canvas.clientWidth)),
        y: Math.max(0, Math.min(canvas.height, (event.clientY - bounds.top - canvas.clientTop) * canvas.height / canvas.clientHeight))
    };
}

// add a new control point on left click
canvas.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;

    controlPoints.push(pointerPosition(event));
    draw();
});

// redraw the canvas when the checkbox is toggled
showPolygon.addEventListener("change", draw);

// remove the last control point on undo button click
document.getElementById("undo").addEventListener("click", () => {
    controlPoints.pop();
    draw();
});

// clear all control points on clear button click
document.getElementById("clear").addEventListener("click", () => {
    controlPoints.length = 0;
    draw();
});

draw(); 