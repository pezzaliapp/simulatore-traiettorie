function simulate() {
  // Leggi i valori di input
  const velocity = parseFloat(document.getElementById("velocity").value);
  const angle = parseFloat(document.getElementById("angle").value) * (Math.PI / 180); // Converti in radianti
  const gravity = parseFloat(document.getElementById("gravity").value);

  // Ottieni il canvas e il contesto
  const canvas = document.getElementById("trajectory");
  const ctx = canvas.getContext("2d");

  // Pulisci il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calcola i parametri della traiettoria
  const totalTime = (2 * velocity * Math.sin(angle)) / gravity; // Tempo totale di volo
  const maxDistance = velocity * Math.cos(angle) * totalTime; // Distanza massima
  const maxHeight = Math.pow(velocity * Math.sin(angle), 2) / (2 * gravity); // Altezza massima

  // Disegna gli assi
  ctx.beginPath();
  ctx.moveTo(50, canvas.height - 50);
  ctx.lineTo(canvas.width - 50, canvas.height - 50); // Asse X
  ctx.lineTo(50, 50); // Asse Y
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Variabili per la scala (dinamica)
  const scaleX = (canvas.width - 100) / maxDistance; // Scala per adattare la distanza
  const scaleY = (canvas.height - 100) / maxHeight; // Scala per adattare l'altezza

  // Variabili per l'animazione
  let t = 0; // Tempo iniziale

  // Funzione per animare il punto lungo la traiettoria
  function animate() {
    if (t > totalTime) return; // Fine dell'animazione

    // Calcola la posizione del punto
    const x = velocity * Math.cos(angle) * t;
    const y = velocity * Math.sin(angle) * t - 0.5 * gravity * t * t;

    // Scala per adattare al canvas
    const canvasX = 50 + x * scaleX;
    const canvasY = canvas.height - 50 - y * scaleY;

    // Ripulisci il canvas e ridisegna
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna gli assi
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(canvas.width - 50, canvas.height - 50); // Asse X
    ctx.lineTo(50, 50); // Asse Y
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Disegna la traiettoria fino al punto attuale
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    for (let i = 0; i <= t; i += 0.01) {
      const xi = velocity * Math.cos(angle) * i;
      const yi = velocity * Math.sin(angle) * i - 0.5 * gravity * i * i;

      const canvasXi = 50 + xi * scaleX;
      const canvasYi = canvas.height - 50 - yi * scaleY;

      ctx.lineTo(canvasXi, canvasYi);
    }
    ctx.strokeStyle = "blue";
    ctx.stroke();

    // Disegna il punto
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2); // Punto come un cerchio
    ctx.fillStyle = "red";
    ctx.fill();

    // Incrementa il tempo
    t += 0.02; // Avanza il tempo (più basso = animazione più fluida)
    requestAnimationFrame(animate); // Richiama l'animazione
  }

  // Avvia l'animazione
  animate();

  // Mostra i risultati in un popup
  alert(`Distanza massima: ${maxDistance.toFixed(2)} m\nAltezza massima: ${maxHeight.toFixed(2)} m\nTempo totale: ${totalTime.toFixed(2)} s`);
}
