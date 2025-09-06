# 📘 Fachinformatiker Trainer (HTML + Bootstrap)

Ein simples, dunkles Quiz für **Fachinformatiker/in Systemintegration**.  
Kein React, keine Bundler, kein Overkill – nur **HTML, CSS, JS und JSON**.

---

## 🚀 Schnellstart

### Option A – VS Code (empfohlen)
1. Projektordner in **VS Code** öffnen.  
2. Erweiterung **“Live Server”** installieren (von Ritwick Dey).  
3. Rechtsklick auf `index.html` → **Open with Live Server**.  
4. App öffnet sich unter `http://127.0.0.1:5500`. Fertig!  

### Option B – Python (Mini-Server)

cd C:\Users\DEINNAME\Desktop\fachinformatiker-trainer
python -m http.server
Öffnen: http://localhost:8000

Warum ein Server?
Browser blockieren fetch() über file://.
Wenn du nur doppelklickst und “Fehler beim Laden der Fragen 😵” siehst, liegt’s daran.

📂 Projektstruktur
fachinformatiker-trainer/
├─ index.html       # UI (Bootstrap 5 via CDN)
├─ script.js        # Quiz-Logik
├─ questions.json   # Fragenpool
├─ README.md        # Diese Anleitung
└─ sounds/          # Soundeffekte (z. B. sad-trombone.mp3)

🧠 Funktionsweise
Beim Start lädt die App questions.json.

Es werden 30 zufällige Fragen aus dem Pool ausgewählt.

Antwortmöglichkeiten werden jedes Mal zufällig gemischt.

Am Ende gibt es eine Zusammenfassung:

Punktezahl

Alle Fragen des Durchgangs

Deine Antworten (rot/grün markiert)

Richtige Antworten

Erklärungen zu falschen Antworten

Buttons:

Neu starten (30 neue Zufallsfragen)

Nur falsche wiederholen

✍️ Fragen hinzufügen / bearbeiten
Beispiel-Eintrag in questions.json:

{
  "question": "Was macht ein DHCP-Server?",
  "answer": "Er weist IP-Adressen automatisch zu.",
  "hint": "Hilft Geräten, sich im Netzwerk zurechtzufinden.",
  "explanation": "DHCP (Dynamic Host Configuration Protocol) weist IP, Gateway und DNS automatisch zu.",
  "options": [
    "Er weist IP-Adressen automatisch zu.",
    "Er hostet Webseiten.",
    "Er schützt vor Viren.",
    "Er verschlüsselt E-Mails."
  ]
}
Regeln:

Immer doppelte Anführungszeichen verwenden.

answer muss exakt einer Option in options entsprechen.

Kein Komma nach dem letzten Eintrag.

Mit jsonlint.com prüfen, wenn unsicher.

🎨 Anpassen
Titel/Branding: in index.html den <h1>-Text ändern.

Farben/Styles: Bootstrap-Klassen anpassen oder style.css ergänzen.

Sounds: im <audio>-Tag in index.html den src anpassen.

🧪 Fehlerbehebung
❌ “Fehler beim Laden der Fragen 😵”
→ Nicht per Doppelklick öffnen, sondern über Server (siehe Schnellstart).

❌ Buttons reagieren nicht
→ IDs in index.html dürfen nicht verändert werden (#question-number, #question, #options, #hint-button, #explanation-button, #score, #wrong).

❌ Änderungen erscheinen nicht
→ Browser-Cache leeren oder mit Strg+F5 neu laden.

❌ JSON-Fehler
→ Datei mit jsonlint.com validieren.

📤 Deployment
Funktioniert auf GitHub Pages, Netlify oder jedem statischen Webserver.

questions.json muss im selben Ordner wie index.html liegen.

GitHub Pages URL:


https://svenia-marla.github.io/fachinformatiker-trainer/
👤 Credits
Gebaut von svenia-marla, mit sarkastischer Unterstützung von Monday.
Lizenz: MIT – frei zum Lernen, Basteln und Angeben.