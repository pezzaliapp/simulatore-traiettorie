// Forza il refresh della cache all'avvio
(function resetCache() {
  const links = document.querySelectorAll('link[rel="stylesheet"], script');
  links.forEach((link) => {
    const url = new URL(link.href || link.src);
    url.searchParams.set('cachebuster', Date.now());
    if (link.tagName === 'LINK') link.href = url.href;
    if (link.tagName === 'SCRIPT') link.src = url.href;
  });
})();

function simulate() {
  const velocity = parseFloat(document.getElementById("velocity").value);
  const angle = parseFloat(document.getElementById("angle").value) * (Math.PI / 180);
  const gravity = parseFloat(document.getElementById("gravity").value);

  if (isNaN(velocity) || isNaN(angle) || isNaN(gravity) || velocity <= 0 || gravity <= 0) {
    alert("Inserisci valori validi per velocità, angolo e gravità!");
    return;
  }

  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const totalTime = (2 * velocity * Math.sin(angle)) / gravity;
  const maxDistance = velocity * Math.cos(angle) * totalTime;
  const maxHeight = Math.pow(velocity * Math.sin(angle), 2) / (2 * gravity);

  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  ctx.lineTo(canvas.width - 50, canvas.height - 50);
  ctx.lineTo(50, 50);
  ctx.strokeStyle = "#000";
  ctx.stroke();

  ctx.font = "14px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Distanza (m)", canvas.width - 100, canvas.height - 30);
  ctx.fillText("Altezza (m)", 60, 40);

  const scaleX = (canvas.width - 100) / maxDistance;
  const scaleY = (canvas.height - 100) / maxHeight;

  drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight);

  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  for (let i = 0; i <= totalTime; i += 0.01) {
    const x = velocity * Math.cos(angle) * i;
    const y = velocity * Math.sin(angle) * i - 0.5 * gravity * i * i;
    const canvasX = 50 + x * scaleX;
    const canvasY = canvas.height - 50 - y * scaleY;
    ctx.lineTo(canvasX, canvasY);
  }
  ctx.strokeStyle = "rgba(0, 0, 255, 0.3)";
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);

  let t = 0;
  function animate() {
    if (t > totalTime) return;

    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;
    const canvasX = 50 + x * scaleX;
    const canvasY = canvas.height - 50 - y * scaleY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(canvas.width - 50, canvas.height - 50);
    ctx.lineTo(50, 50);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight);

    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    for (let i = 0; i <= totalTime; i += 0.01) {
      const xi = velocity * Math.cos(angle) * i;
      const yi = velocity * Math.sin(angle) * i - 0.5 * gravity * i * i;
      const canvasXi = 50 + xi * scaleX;
      const canvasYi = canvas.height - 50 - yi * scaleY;
      ctx.lineTo(canvasXi, canvasYi);
    }
    ctx.strokeStyle = "rgba(0, 0, 255, 0.3)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    t += 0.02;
    requestAnimationFrame(animate);
  }
  animate();
}

function drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight) {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= maxDistance; x += maxDistance / 10) {
    const canvasX = 50 + x * scaleX;
    ctx.beginPath();
    ctx.moveTo(canvasX, canvas.height - 50);
    ctx.lineTo(canvasX, 50);
    ctx.stroke();
  }

  for (let y = 0; y <= maxHeight; y += maxHeight / 10) {
    const canvasY = canvas.height - 50 - y * scaleY;
    ctx.beginPath();
    ctx.moveTo(50, canvasY);
    ctx.lineTo(canvas.width - 50, canvasY);
    ctx.stroke();
  }
}

function reset() {
  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("velocity").value = 50;
  document.getElementById("angle").value = 45;
  document.getElementById("gravity").value = 9.81;
}

function saveCanvas() {
  const canvas = document.getElementById("trajectory");
  const link = document.createElement("a");
  link.download = "traiettoria.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
