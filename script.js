function simulate() {
  // Ottenere i valori dagli input
  const velocityInput = document.getElementById("velocity");
  const angleInput = document.getElementById("angle");
  const gravityInput = document.getElementById("gravity");
  
  const velocity = parseFloat(velocityInput.value);
  const angleDeg = parseFloat(angleInput.value);
  const angle = angleDeg * (Math.PI / 180); // Converti in radianti
  const gravity = parseFloat(gravityInput.value);

  console.log(`Velocità: ${velocity} m/s, Angolo: ${angleDeg}°, Gravità: ${gravity} m/s²`);

  // Validazione dei valori
  if (isNaN(velocity) || isNaN(angleDeg) || isNaN(gravity) || velocity <= 0 || gravity <= 0) {
    alert("Inserisci valori validi per velocità, angolo e gravità!");
    return;
  }

  // Ottenere il contesto del canvas
  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calcolare il tempo totale, distanza massima e altezza massima
  const totalTime = (2 * velocity * Math.sin(angle)) / gravity;
  const maxDistance = velocity * Math.cos(angle) * totalTime;
  const maxHeight = (Math.pow(velocity * Math.sin(angle), 2)) / (2 * gravity);

  console.log(`Tempo totale: ${totalTime.toFixed(2)} s, Distanza massima: ${maxDistance.toFixed(2)} m, Altezza massima: ${maxHeight.toFixed(2)} m`);

  // Calcolo della distanza in linea retta (maxDistance)
  const straightDistance = maxDistance;

  // Calcolo della distanza percorsa lungo la traiettoria (curvilinea)
  const curvedDistance = calculateCurvedDistance(velocity, angle, gravity, totalTime);
  console.log(`Distanza percorsa lungo la traiettoria: ${curvedDistance.toFixed(2)} m`);

  // Aggiornamento dei risultati nel DOM
  document.getElementById("straightDistance").textContent = straightDistance.toFixed(2);
  document.getElementById("curvedDistance").textContent = curvedDistance.toFixed(2);
  document.getElementById("totalTime").textContent = totalTime.toFixed(2);

  // Disegno degli assi
  drawAxes(ctx, canvas);

  const scaleX = (canvas.width - 100) / maxDistance;
  const scaleY = (canvas.height - 100) / maxHeight;

  // Disegno della griglia
  drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight);

  // Disegno della traiettoria
  drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime);

  // Animazione del pallino rosso
  animateProjectile(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime, maxDistance, maxHeight);
}

function calculateCurvedDistance(velocity, angle, gravity, totalTime) {
  const dt = 0.01; // Passo di integrazione in secondi
  let distance = 0;
  let previousX = 0;
  let previousY = 0;

  for (let t = 0; t <= totalTime; t += dt) {
    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;

    if (t > 0) {
      const dx = x - previousX;
      const dy = y - previousY;
      distance += Math.sqrt(dx * dx + dy * dy);
    }

    previousX = x;
    previousY = y;
  }

  console.log(`Calcolo della distanza curvilinea: ${distance.toFixed(2)} m`);
  return distance;
}

function drawAxes(ctx, canvas) {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50); // Asse x
  ctx.lineTo(canvas.width - 50, canvas.height - 50);
  ctx.moveTo(50, canvas.height - 50); // Asse y
  ctx.lineTo(50, 50);
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Etichette degli assi
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Distanza (m)", canvas.width - 100, canvas.height - 30);
  ctx.fillText("Altezza (m)", 60, 40);
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

function drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime) {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  for (let t = 0; t <= totalTime; t += 0.01) {
    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;
    const canvasX = 50 + x * scaleX;
    const canvasY = canvas.height - 50 - y * scaleY;
    ctx.lineTo(canvasX, canvasY);
  }
  ctx.strokeStyle = "rgba(0, 0, 255, 0.3)";
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
}

function animateProjectile(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime, maxDistance, maxHeight) {
  let t = 0;

  function animate() {
    if (t > totalTime) return;

    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;
    const canvasX = 50 + x * scaleX;
    const canvasY = canvas.height - 50 - y * scaleY;

    // Ridisegno completo del canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(ctx, canvas);
    drawGrid(ctx, canvas, scaleX, scaleY, maxDistance, maxHeight);
    drawTrajectory(ctx, canvas, velocity, angle, gravity, scaleX, scaleY, totalTime);

    // Disegno del pallino rosso
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    t += 0.02;
    requestAnimationFrame(animate);
  }
  animate();
}

function reset() {
  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("velocity").value = 50;
  document.getElementById("angle").value = 45;
  document.getElementById("gravity").value = 9.81;

  // Reset dei risultati
  document.getElementById("straightDistance").textContent = "-";
  document.getElementById("curvedDistance").textContent = "-";
  document.getElementById("totalTime").textContent = "-";
}
