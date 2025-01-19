Simulatore di Traiettorie Balistiche

Descrizione

Il Simulatore di Traiettorie Balistiche è un’applicazione web interattiva che permette di calcolare e visualizzare la traiettoria di un proiettile lanciato con una determinata velocità, angolo e soggetto alla gravità. L’applicazione fornisce:
•	Distanza in linea retta: la distanza orizzontale massima raggiunta dal proiettile.
•	Distanza percorsa lungo la traiettoria: la lunghezza totale del percorso effettuato dal proiettile.
•	Tempo totale impiegato: il tempo necessario perché il proiettile raggiunga il suolo.

Caratteristiche
•	Inserimento di parametri come velocità iniziale, angolo di lancio e gravità.
•	Calcolo dinamico dei risultati in tempo reale.
•	Visualizzazione grafica della traiettoria su un canvas HTML5.
•	Animazione di un pallino rosso che si muove lungo la traiettoria.
•	Funzione di reset per ripristinare i valori predefiniti.

Tecnologie Utilizzate
•	HTML5: per la struttura della pagina.
•	CSS3: per lo stile e il layout.
•	JavaScript: per la logica di calcolo e la manipolazione del DOM.
•	GitHub Pages: per l’hosting gratuito dell’applicazione.

Anteprima

Nota: Sostituisci screenshot.png con uno screenshot reale della tua applicazione.

Come Utilizzare
1.	Accedi all’applicazione:
Visita il sito ospitato su GitHub Pages: https://tuo-username.github.io/simulatore-traiettorie/
2.	Inserisci i Parametri:
•	Velocità iniziale (m/s): Inserisci la velocità di lancio del proiettile.
•	Angolo di lancio (°): Inserisci l’angolo di lancio rispetto all’orizzontale.
•	Gravità (m/s²): Inserisci l’accelerazione dovuta alla gravità.
3.	Calcola la Traiettoria:
Clicca sul pulsante “Calcola Traiettoria” per visualizzare i risultati e la traiettoria.
4.	Resetta i Valori:
Clicca sul pulsante “Reset” per riportare i campi ai valori predefiniti e svuotare il canvas.

Installazione e Configurazione

Se desideri eseguire l’applicazione localmente o contribuire allo sviluppo, segui questi passaggi:

1. Clona il Repository

Apri il terminale e clona il repository sul tuo computer:

git clone https://github.com/tuo-username/simulatore-traiettorie.git

2. Naviga nella Cartella del Progetto

cd simulatore-traiettorie

3. Apri l’Applicazione nel Browser

Puoi aprire il file index.html direttamente nel tuo browser oppure servire i file tramite un server locale per evitare problemi con il protocollo file://.

Utilizzando Python (Opzione Raccomandata)

Se hai Python installato, puoi avviare un semplice server locale:
	•	Per Python 3:

python -m http.server 8000


	•	Per Python 2:

python -m SimpleHTTPServer 8000



Apri il tuo browser e vai a http://localhost:8000 per vedere l’applicazione in azione.

Pubblicazione su GitHub Pages

GitHub Pages è un servizio gratuito che ti permette di ospitare siti web direttamente dai tuoi repository GitHub. Segui questi passaggi per pubblicare la tua applicazione:

1. Crea un Repository su GitHub
1.	Vai su GitHub e accedi al tuo account.
2.	Clicca su “New” o vai a https://github.com/new.
3.	Nome del Repository: simulatore-traiettorie
4.	Visibilità: Pubblico
5.	README: Puoi aggiungere un README, ma non è necessario.
6.	Clicca su “Create repository”.

2. Carica i Tuoi File nel Repository
1.	Nel tuo nuovo repository, clicca su “Add file” > “Upload files”.
2.	Trascina e rilascia i tuoi file (index.html, script.js, style.css) nell’area di upload o usa il pulsante per selezionarli manualmente.
3.	Dopo aver caricato i file, scorri verso il basso, aggiungi un messaggio di commit (ad esempio, “Aggiungi file iniziali”), e clicca su “Commit changes”.

3. Configura GitHub Pages
1.	Nel tuo repository, clicca su “Settings” (in alto a destra).
2.	Nel menu a sinistra, scorri fino a “Pages”.
3.	Source: Nella sezione “Build and deployment”, seleziona la branch main (o master) e la cartella /root se i tuoi file si trovano nella directory principale.
4.	Clicca su “Save”.
5.	GitHub Pages imposterà il tuo sito e mostrerà l’URL pubblico dove sarà accessibile (ad esempio, https://tuo-username.github.io/simulatore-traiettorie/).

4. Accedi al Tuo Sito

Dopo qualche minuto, il tuo sito sarà accessibile all’URL fornito da GitHub Pages. Visita l’URL per vedere la tua applicazione web in azione.

Debugging e Risoluzione dei Problemi

Se riscontri problemi con la visualizzazione dei risultati o altre funzionalità, segui questi passaggi per il debug:
1.	Apri la Console del Browser:
•	Premi F12 o Ctrl+Shift+I (Windows/Linux) o Cmd+Option+I (Mac) per aprire gli strumenti per sviluppatori.
•	Vai alla scheda Console per vedere eventuali messaggi di errore o di debug.
2.	Verifica gli ID nel index.html:
•	Assicurati che gli ID degli elementi span (straightDistance, curvedDistance, totalTime) corrispondano esattamente a quelli usati nel script.js.
3.	Controlla la Corretta Caricamento dei File:
•	Assicurati che script.js e style.css siano correttamente collegati nel index.html.
4.	Assicurati che i File Siano nella Cartella Corretta:
•	I file index.html, script.js e style.css devono trovarsi nella root del tuo repository GitHub Pages.
5.	Svuota la Cache del Browser:
•	Dopo aver effettuato modifiche, potrebbe essere necessario svuotare la cache del browser o ricaricare la pagina con Ctrl + F5 (Windows) o Cmd + Shift + R (Mac) per vedere le modifiche.
6.	Verifica i Messaggi di Log:
•	I console.log nel script.js ti aiuteranno a capire se i calcoli vengono eseguiti correttamente e se i risultati vengono aggiornati nel DOM.

Contribuire

Se desideri contribuire a questo progetto, segui questi passaggi:
1.	Fork del Repository:
•	Clicca sul pulsante “Fork” in alto a destra nella pagina del repository per creare una copia nel tuo account GitHub.
2.	Clona il Repository Forkato:

git clone https://github.com/tuo-username/simulatore-traiettorie.git


3.	Crea un Nuovo Branch:

git checkout -b feature-nome-feature


4.	Apporta le Tue Modifiche:
•	Aggiungi nuove funzionalità, correggi bug o migliora lo stile.
5.	Commit delle Modifiche:

git commit -m "Aggiungi [descrizione delle modifiche]"


6.	Pusha le Modifiche al Repository Forkato:

git push origin feature-nome-feature


7.	Crea una Pull Request:
•	Vai al tuo repository forkato su GitHub.
•	Clicca su “Compare & pull request”.
•	Aggiungi una descrizione dettagliata delle tue modifiche e invia la pull request.

Licenza

Questo progetto è concesso sotto la licenza MIT.

Esempio di Screenshot

Nota: Aggiungi uno screenshot reale della tua applicazione nella cartella del repository e aggiorna il percorso dell’immagine nel README.

Ringraziamenti

Grazie per aver utilizzato il Simulatore di Traiettorie Balistiche! Se hai suggerimenti o feedback, non esitare a contattarmi tramite le issue del repository.
