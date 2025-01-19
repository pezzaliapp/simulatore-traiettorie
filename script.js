// Pulizia della cache per forzare il caricamento della versione più recente
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
  // Lettura dei valori di input
  const velocity = parseFloat(document.getElementById("velocity").value);
  const angle = parseFloat(document.getElementById("angle").value) * (Math.PI / 180); // Converti in radianti
  const gravity = parseFloat(document.getElementById("gravity").value);

  // Verifica validità dei dati
  if (isNaN(velocity) || isNaN(angle) || isNaN(gravity) || velocity <= 0 || gravity <= 0) {
    alert("Inserisci valori validi per velocità, angolo e gravità!");
    return;
  }

  // Ottieni il canvas e il contesto
  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");

  // Pulisci il canvas
  ctx.fillStyle = "#FFFFFF"; // Sfondo bianco
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

  // Disegna la traiettoria
  drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime);
}

function drawAxes(ctx, canvas) {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  ctx.lineTo(canvas.width - 50, canvas.height - 50); // Asse X
  ctx.lineTo(50, 50); // Asse Y
  ctx.strokeStyle = "#000000"; // Nero
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Etichette degli assi
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000000"; // Nero
  ctx.fillText("Distanza (m)", canvas.width - 100, canvas.height - 30);
  ctx.fillText("Altezza (m)", 60, 40);
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
  ctx.strokeStyle = "#0000FF"; // Linea blu
  ctx.lineWidth = 2;
  ctx.stroke();
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
