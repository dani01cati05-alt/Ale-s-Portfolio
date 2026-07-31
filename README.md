# Portfolio 3D — Character Select Screen

## Concept

Portfolio personale in cui i progetti vengono presentati come **personaggi in una schermata di selezione di un fighting game** (stile Street Fighter III / Marvel vs Capcom). Ogni progetto è rappresentato da un "personaggio" (avatar/modello) disposto in una griglia o in una composizione a griglia sferica/curva; l'utente naviga e seleziona un progetto come selezionerebbe un personaggio prima di un match.

A differenza di una classica select screen 2D con sprite statici, questa versione va **realizzata in 3D**: gli avatar dei progetti devono vivere in una scena 3D reale (non semplici immagini in CSS grid), con profondità, illuminazione, e possibilità di camera/parallax.

## Reference visive

Sono state fornite due schermate di riferimento (allegate alla conversazione originale, non nel repo — vanno recuperate dalla chat o richieste di nuovo all'utente se servono asset):

1. **Street Fighter III: 3rd Strike — Character Select**
   - Layout: griglia di ritratti circolari disposti su più righe, leggermente sfalsate.
   - Il personaggio in focus (es. Chun-Li) viene mostrato a figura intera, a grandezza naturale, sulla sinistra, con nome ("1P CHUN-LI") e prompt di conferma ("PRESS 2P SMART") in alto.
   - Fascia rossa diagonale in basso con testo "PLAYER SELECT" in stile fumetto/comic, timer countdown in basso a destra.
   - Palette calda (arancio/rosso) sullo sfondo, contrasto forte con i ritratti.

2. **Marvel vs Capcom — Select Your Heroes**
   - Layout: griglia di ritratti quadrati disposta su una **sfera wireframe 3D** (il "globo" di selezione), con titolo curvo "SELECT YOUR HEROES!" in alto.
   - Sfondo scuro/bordeaux, griglia blu che suggerisce la superficie sferica in prospettiva.
   - Effetto di profondità: i personaggi ai bordi della sfera appaiono leggermente più piccoli/distorti rispetto al centro, dando la sensazione di curvatura.

**Direzione stilistica da portare in 3D**: combinare i due riferimenti — la sfera/globo wireframe di MvC come "container" 3D navigabile per la griglia dei progetti, con il livello di dettaglio e il "focus panel" (ritratto grande + nome + call to action) di SF3 quando un progetto viene selezionato/hoverato.

## Obiettivo del sito

- Homepage con scena 3D: griglia di "avatar progetto" disposta su una superficie curva/sferica (ispirata a MvC), ruotabile con mouse/drag o scroll.
- Hover/focus su un avatar → ingrandimento, evidenziazione, comparsa nome progetto e breve descrizione (ispirato al pannello "1P CHUN-LI" di SF3).
- Click/selezione su un avatar → reindirizzamento a link esterno del progetto (demo live, repo, case study — comportamento già deciso in precedenza: **vai a link esterno**, non pagina interna).
- Contenuti progetto: nome, immagine/avatar quadrato o texture, breve descrizione opzionale, URL destinazione. (I contenuti reali dei progetti devono ancora essere forniti dall'utente — vedi sezione "Da fare".)

## Stack tecnico consigliato

Per la parte 3D in un contesto web:

- **Three.js** come motore di rendering 3D (WebGL), oppure
- **React Three Fiber** (`@react-three/fiber`) + `@react-three/drei` se si preferisce un approccio a componenti React sopra Three.js (consigliato se il sito crescerà con più sezioni/routing).
- HTML/CSS/JS per l'overlay UI (nome progetto, testo, bottoni, timer/effetti stile SF3) sopra il canvas 3D.
- Nessun bisogno di backend: sito statico, deployabile su Netlify/Vercel/GitHub Pages.

Librerie utili:
- `three` (core)
- `@react-three/fiber`, `@react-three/drei` (se React)
- `gsap` o `framer-motion` per animazioni di transizione/focus in stile arcade
- Font arcade/comic (es. Google Fonts "Bangers", "Anton") per titoli tipo "PLAYER SELECT"

## Struttura dati progetti (da compilare)

Ogni progetto dovrebbe seguire questo schema (JSON/JS):

```json
{
  "id": "progetto-1",
  "name": "Nome Progetto",
  "avatar": "/assets/avatars/progetto-1.png",
  "description": "Breve descrizione one-liner del progetto",
  "url": "https://link-esterno-al-progetto.com"
}
```

## Da fare / informazioni ancora mancanti

1. **Lista progetti reale**: nome, immagine/avatar, descrizione breve, link esterno per ciascun progetto (l'utente ha detto di avere già tutto pronto ma non li ha ancora forniti in chat).
2. **Asset grafici**: avatar/ritratti dei progetti (idealmente quadrati o circolari, stile "portrait" come negli esempi). Se non esistono ancora, valutare se generarli (illustrazione/AI) o usare screenshot dei progetti stilizzati.
3. **Decidere la disposizione 3D esatta**: sfera completa (come MvC) vs griglia curva parziale vs carosello cilindrico — dipende da quanti progetti ci sono (poche card stanno meglio su un arco/cilindro, molte su una sfera piena).
4. **Palette colori e branding personale** (l'utente non ha ancora specificato colori/font brand).
5. **Font e loghi**: eventuale titolo personale al posto di "SELECT YOUR HEROES!".

## Note per Claude Code

- Il sito è **statico** (HTML/CSS/JS, o React se si sceglie R3F) — nessun backend.
- L'interazione di selezione porta a **link esterni** (non modali, non pagine interne).
- Prima di generare asset o contenuti placeholder, controllare se l'utente ha fornito la lista progetti reale altrove nel repo (es. `projects.json`); se non esiste, chiedere all'utente o crearne uno con dati fittizi chiaramente marcati come placeholder.
- Le due immagini di riferimento (Street Fighter III select screen, Marvel vs Capcom "Select Your Heroes") sono la guida visiva principale per tono, layout e mood — non sono asset da includere nel sito, servono solo da ispirazione stilistica.
