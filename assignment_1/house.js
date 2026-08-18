const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// ================= house-roof ================= //
ctx.fillStyle = "black";
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(100, 200);
ctx.lineTo(500, 200);
ctx.lineTo(550, 250);
ctx.closePath();
ctx.stroke();
ctx.fill();

// ================= house-body ================= //
ctx.fillStyle = "rgb(0,255,0)";
ctx.fillRect(100, 250, 400, 250);

// house-body-frame
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.strokeRect(100, 250, 400, 250);

// house-chimney
ctx.fillStyle = "black";
ctx.fillRect(400, 150, 50, 100);

// house-chimney-smoke-particles
ctx.fillStyle = "lightgray";
ctx.beginPath();
ctx.arc(415, 130, 10, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(445, 105, 8, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(430, 70, 6, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(455, 50, 4, 0, Math.PI * 2);
ctx.fill();

// ================= house-gardens ================= //

ctx.fillStyle = "saddlebrown";

// left fence
ctx.fillRect(0, 355, 100, 5);
ctx.fillRect(0, 475, 100, 5);

for (let i = 5; i < 98; i += 14) {
    ctx.fillRect(i, 350, 5, 30);
    ctx.fillRect(i, 470, 5, 30);
}

// right fence
ctx.fillRect(500, 355, 100, 5);
ctx.fillRect(500, 475, 100, 5);

for (let i = 505; i < 598; i += 14) {
    ctx.fillRect(i, 350, 5, 30);
    ctx.fillRect(i, 470, 5, 30);
}

// grass
ctx.fillStyle = "green";
ctx.fillRect(0, 370, 100, 100);
ctx.fillRect(500, 370, 100, 100);

// ================= sun ================= //
ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(0, 0, 100, 0, Math.PI * 2);
ctx.fill();

// sun-rays
ctx.strokeStyle = "yellow";
ctx.lineWidth = 5;

// Imma be honest, this loop is all generated with chatgpt, because cba drawin all lines manually. All I did was change the values a bit.
for (let angle = 0; angle <= Math.PI / 2; angle += Math.PI / 8) {
    const startX = Math.cos(angle) * 110;
    const startY = Math.sin(angle) * 110;

    const endX = Math.cos(angle) * 150;
    const endY = Math.sin(angle) * 150;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}




// ================= house-door ================= //
ctx.fillStyle = "lightpink";
ctx.fillRect(260, 400, 80, 100);

// house-door-frame
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(260, 500); 
ctx.lineTo(260, 400); 
ctx.lineTo(340, 400); 
ctx.lineTo(340, 500); 
ctx.stroke();

// house-door-knob
ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(270, 450, 5, 0, Math.PI * 2);
ctx.fill();

// house-door-window
ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(300, 430, 20, Math.PI, 0);
ctx.closePath();
ctx.fill();

// house-door-window-frame
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.arc(300, 430, 20, Math.PI, 0);
ctx.closePath();
ctx.fill();
ctx.stroke();

// house-door-welcome-mat
ctx.fillStyle = "brown";
ctx.beginPath();
ctx.arc(300, 500, 40, 0, Math.PI);
ctx.closePath();
ctx.fill();

// house-door-welcome-mat-frame
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.arc(300, 500, 40, 0, Math.PI);
ctx.closePath();
ctx.fill();
ctx.stroke();


// ================= house-windows ================= //
ctx.fillStyle = "yellow";
ctx.fillRect(150, 300, 80, 80);
ctx.fillRect(370, 300, 80, 80);

// house-window-frames
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.strokeRect(150, 300, 80, 80);
ctx.strokeRect(370, 300, 80, 80);

// house-window-crosses
ctx.beginPath();
ctx.lineWidth = 2;
ctx.moveTo(150, 340); 
ctx.lineTo(230, 340);

ctx.moveTo(190, 300);   
ctx.lineTo(190, 380);

ctx.moveTo(370, 340); 
ctx.lineTo(450, 340);

ctx.moveTo(410, 300);
ctx.lineTo(410, 380);
ctx.stroke();


