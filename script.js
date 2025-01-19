// Forza il refresh della cache per caricare sempre la versione aggiornata
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
  // Leggi i valori di input
  const velocity = parseFloat(document.getElementById("velocity").value);
  const angle = parseFloat(document.getElementById("angle").value) * (Math.PI / 180); // Converti in radianti
  const gravity = parseFloat(document.getElementById("gravity").value);

  // Controllo dei parametri
  if (isNaN(velocity) || isNaN(angle) || isNaN(gravity) || velocity <= 0 || gravity <= 0) {
    alert("Inserisci valori validi per velocità, angolo e gravità!");
    return;
  }

  // Ottieni il canvas e il contesto
  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");

  // Pulisci il canvas con sfondo bianco
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Calcola i parametri della traiettoria
  const totalTime = (2 * velocity * Math.sin(angle)) / gravity; // Tempo totale di volo
  const maxDistance = velocity * Math.cos(angle) * totalTime; // Distanza massima
  const maxHeight = Math.pow(velocity * Math.sin(angle), 2) / (2 * gravity); // Altezza massima

  // Disegna gli assi
  drawAxes(ctx, canvas);

  // Scala per adattare il grafico al canvas
  const scaleX = (canvas.width - 100) / maxDistance; // Scala X
  const scaleY = (canvas.height - 100) / maxHeight; // Scala Y

  // Disegna la griglia
  drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight);

  // Disegna la traiettoria completa
  drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime);
}

function drawAxes(ctx, canvas) {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  ctx.lineTo(canvas.width - 50, canvas.height - 50); // Asse X
  ctx.lineTo(50, 50); // Asse Y
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Etichette sugli assi
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Distanza (m)", canvas.width - 100, canvas.height - 30);
  ctx.fillText("Altezza (m)", 60, 40);
}

function drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight) {
  ctx.strokeStyle = "#CCCCCC";
  ctx.lineWidth = 0.5;

  // Linee verticali (griglia per distanza)
  for (let x = 0; x <= maxDistance; x += maxDistance / 10) {
    const canvasX = 50 + x * scaleX;
    ctx.beginPath();
    ctx.moveTo(canvasX, canvas.height - 50);
    ctx.lineTo(canvasX, 50);
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(x.toFixed(1), canvasX - 10, canvas.height - 35); // Etichette asse X
  }

  // Linee orizzontali (griglia per altezza)
  for (let y = 0; y <= maxHeight; y += maxHeight / 10) {
    const canvasY = canvas.height - 50 - y * scaleY;
    ctx.beginPath();
    ctx.moveTo(50, canvasY);
    ctx.lineTo(canvas.width - 50, canvasY);
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(y.toFixed(1), 25, canvasY + 5); // Etichette asse Y
  }
}

function drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime) {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50); // Punto di partenza
  for (let t = 0; t <= totalTime; t += 0.01) {
    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;

    const canvasX = 50 + x * scaleX;
    const canvasY = canvas.height - 50 - y * scaleY;

    ctx.lineTo(canvasX, canvasY);
  }
  ctx.strokeStyle = "#0000FF";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function saveCanvas() {
  const canvas = document.getElementById("trajectory");
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  // Dimensioni del canvas temporaneo
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Copia il contenuto del canvas originale con sfondo bianco
  tempCtx.fillStyle = "#FFFFFF";
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  tempCtx.drawImage(canvas, 0, 0);

  // Salva il canvas come immagine
  const link = document.createElement("a");
  link.download = "traiettoria.png";
  link.href = tempCanvas.toDataURL("image/png");
  link.click();
}

function reset() {
  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  document.getElementById("velocity").value = 50;
  document.getElementById("angle").value = 45;
  document.getElementById("gravity").value = 9.81;
}
