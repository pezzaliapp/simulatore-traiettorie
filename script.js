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

  // Pulisci il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calcola i parametri della traiettoria
  const totalTime = (2 * velocity * Math.sin(angle)) / gravity; // Tempo totale di volo
  const maxDistance = velocity * Math.cos(angle) * totalTime; // Distanza massima
  const maxHeight = Math.pow(velocity * Math.sin(angle), 2) / (2 * gravity); // Altezza massima
  const straightDistance = Math.sqrt(Math.pow(maxDistance, 2) + Math.pow(maxHeight, 2)); // Distanza in linea retta

  // Disegna gli assi
  drawAxes(ctx, canvas);

  // Scala per adattare il grafico al canvas
  const scaleX = (canvas.width - 100) / maxDistance; // Scala X
  const scaleY = (canvas.height - 100) / maxHeight; // Scala Y

  // Disegna la griglia
  drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight);

  // Disegna la traiettoria completa
  const curvedDistance = drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime);

  // Anima il punto sulla traiettoria
  animatePoint(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime);

  // Mostra i risultati
  displayResults(maxDistance, curvedDistance, straightDistance, totalTime);
}

function drawAxes(ctx, canvas) {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  ctx.lineTo(canvas.width - 50, canvas.height - 50); // Asse X
  ctx.lineTo(50, 50); // Asse Y
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Etichette sugli assi
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Distanza (m)", canvas.width - 100, canvas.height - 30);
  ctx.fillText("Altezza (m)", 60, 40);
}

function drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight) {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 0.5;

  // Linee verticali (griglia per distanza)
  for (let x = 0; x <= maxDistance; x += maxDistance / 10) {
    const canvasX = 50 + x * scaleX;
    ctx.beginPath();
    ctx.moveTo(canvasX, canvas.height - 50);
    ctx.lineTo(canvasX, 50);
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000";
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
    ctx.fillStyle = "#000";
    ctx.fillText(y.toFixed(1), 25, canvasY + 5); // Etichette asse Y
  }
}

function drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime) {
  let curvedDistance = 0;
  let previousX = 0;
  let previousY = 0;

  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50); // Punto di partenza

  for (let t = 0; t <= totalTime; t += 0.01) {
    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;

    const canvasX = 50 + x * scaleX;
    const canvasY = canvas.height - 50 - y * scaleY;

    if (t > 0) {
      // Calcola la distanza curva tra i punti
      const dx = x - previousX;
      const dy = y - previousY;
      curvedDistance += Math.sqrt(dx * dx + dy * dy);
    }

    ctx.lineTo(canvasX, canvasY);

    previousX = x;
    previousY = y;
  }

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  return curvedDistance;
}

function animatePoint(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime) {
  let t = 0;

  function animate() {
    if (t > totalTime) return; // Fine dell'animazione

    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;

    const canvasX = 50 + x * scaleX;
    const canvasY = canvas.height - 50 - y * scaleY;

    // Ripulisci il canvas e ridisegna
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ridisegna gli assi, la griglia e la traiettoria
    drawAxes(ctx, canvas);
    drawGrid(ctx, canvas, scaleX, scaleY, velocity * Math.cos(angle) * totalTime, Math.pow(velocity * Math.sin(angle), 2) / (2 * gravity));
    drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime);

    // Disegna il punto animato
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    t += 0.02; // Incrementa il tempo per l'animazione
    requestAnimationFrame(animate);
  }

  animate();
}

function displayResults(maxDistance, curvedDistance, straightDistance, totalTime) {
  const results = `
    Distanza massima percorsa (curva): ${curvedDistance.toFixed(2)} m
    Distanza in linea retta: ${straightDistance.toFixed(2)} m
    Tempo totale di volo: ${totalTime.toFixed(2)} s
    Distanza massima orizzontale: ${maxDistance.toFixed(2)} m
  `;
  alert(results);
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
