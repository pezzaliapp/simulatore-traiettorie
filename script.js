function simulate() {
  const velocity = parseFloat(document.getElementById("velocity").value);
  const angle = parseFloat(document.getElementById("angle").value) * (Math.PI / 180); // Converti in radianti
  const gravity = parseFloat(document.getElementById("gravity").value);

  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");

  // Pulisci il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calcola i parametri
  const totalTime = (2 * velocity * Math.sin(angle)) / gravity; // Tempo totale di volo
  const maxDistance = velocity * Math.cos(angle) * totalTime; // Distanza massima
  const maxHeight = Math.pow(velocity * Math.sin(angle), 2) / (2 * gravity); // Altezza massima

  // Disegna gli assi
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  ctx.lineTo(canvas.width - 50, canvas.height - 50); // Asse X
  ctx.lineTo(50, 50); // Asse Y
  ctx.stroke();

  // Disegna la traiettoria
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50); // Punto iniziale
  for (let t = 0; t <= totalTime; t += 0.01) {
    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;

    // Scala per adattare al canvas
    const canvasX = 50 + (x / maxDistance) * (canvas.width - 100);
    const canvasY = canvas.height - 50 - (y / maxHeight) * (canvas.height - 100);

    ctx.lineTo(canvasX, canvasY);
  }
  ctx.strokeStyle = "blue";
  ctx.stroke();

  // Mostra i risultati
  alert(`Distanza massima: ${maxDistance.toFixed(2)} m\nAltezza massima: ${maxHeight.toFixed(2)} m\nTempo totale: ${totalTime.toFixed(2)} s`);
}
