/* 
i = startpoint
k = multiplier
N = amount of points
j = destination 
 */

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const N = document.getElementById("antall");
const k = document.getElementById("k");


function readValues() {
    const NValue = parseInt(N.value);
    const kValue = k.value === "max" ? "max" : parseInt(k.value); // checks if k.value is "max", otherwise parses the value to an integer

    console.log("N:", NValue);
    console.log("k:", kValue);


    return { N: NValue, k: kValue };
}

function drawCircle(N, k) {
    // center of the circle
    const cx = canvas.width/2;
    const cy = canvas.height/2;

    // radius of the circle:
    // r = min(width / 2, height / 2)
    const r = Math.min(cx, cy);

    // angular distance between each of the N points:
    // Δθ = 2π / N
    const deltaTheta = (2 * Math.PI) / N;

    // draw outer circle/polygon
    ctx.beginPath();

    for (let theta = 0; theta <= 2 * Math.PI; theta += deltaTheta) {
        // parametric equation of a circle:
        // x = cx + r*cos(θ)
        // y = cy + r*sin(θ)
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);

        if (theta === 0) {
            ctx.moveTo(x,y)
        } else {
            ctx.lineTo(x,y)
        }
    }
    ctx.closePath();
    ctx.stroke();
    console.log("drawing outer...")

    // draw multiplication pattern
    for (let i = 0; i < N; i++) {

        // angle of point i:
        // θᵢ = 2πi / N
        const theta1 = (i / N) * 2 * Math.PI;

        // coordinates of point i:
        // xᵢ = cx + r·cos(θᵢ)
        // yᵢ = cy + r·sin(θᵢ)
        const x1 = cx + r * Math.cos(theta1);
        const y1 = cy + r * Math.sin(theta1);

        // i -> ki
        // modulo N wraps around when ki exceeds the amount of points:
        // j = (k·i) mod N
        const j = (i * k) % N;

        // angle of destination point j:
        // θⱼ = 2πj / N
        const theta2 = (j / N) * 2 * Math.PI;

        // coordinates of destination point j:
        // xⱼ = cx + r·cos(θⱼ)
        // yⱼ = cy + r·sin(θⱼ)
        const x2 = cx + r * Math.cos(theta2);
        const y2 = cy + r * Math.sin(theta2);

        // draw line from i to j points:
        // Pᵢ → Pⱼ, where j = (k·i) mod N
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

     
}

function drawBackground() {
    // draw background
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("done drawing frame...");
}

function draw() {

    // clears the canvas before drawing new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { N, k} = readValues();
    drawBackground();
    drawCircle(N, k);
};

draw();