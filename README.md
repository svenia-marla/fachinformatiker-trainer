# 📘 Fachinformatiker Trainer (Klassisch HTML + Bootstrap)

Ein simples, dunkles Quiz für **Fachinformatiker/in Systemintegration**.  
Kein React, keine Bundler, keine Kopfschmerzen. Nur **HTML + CSS + JS + JSON**.

---

## 🚀 Schnellstart

### Option A — VS Code (empfohlen)
1. Ordner in **VS Code** öffnen.  
2. Erweiterung **“Live Server”** installieren (Ritwick Dey).  
3. Rechtsklick auf `index.html` → **Open with Live Server**.  
4. App öffnet sich unter `http://127.0.0.1:5500`. Fertig.  

### Option B — Python (Mini-Server)

cd C:\Users\DEINNAME\Desktop\fachinformatiker-trainer
python -m http.server
Öffnen: http://localhost:8000

Warum ein Server? Browser blockieren fetch() über file://.
Wenn du nur doppelklickst und “Fehler beim Laden der Fragen 😵” siehst, liegt’s daran.

📁 Projektstruktur


fachinformatiker-trainer/
├─ index.html       # UI (Bootstrap 5 via CDN)
├─ script.js        # Quiz-Logik
├─ questions.json   # Fragenpool
└─ (optionale Assets wie Audio/Bilder)
🧠 Funktionsweise
Beim Start lädt die App questions.json.

Der Pool wird gemischt und es werden 30 zufällige Fragen ausgewählt.

Antworten erscheinen jedes Mal in zufälliger Reihenfolge.

Am Ende gibt es eine Zusammenfassung:

Punktezahl

Alle Fragen des Durchgangs

Deine Antwort (rot/grün)

Richtige Antwort

Erklärung zu falschen Antworten

Buttons:

Neu starten (30 Zufallsfragen)

Nur falsche wiederholen

✍️ Fragen bearbeiten / hinzufügen
Ein Eintrag in questions.json sieht so aus:

json
Code kopieren
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

Immer doppelte Anführungszeichen.

answer muss exakt einer Option in options entsprechen.

Kein Komma am Ende der Liste.

Im Zweifel mit jsonlint.com prüfen.

🎨 Anpassen
Titel/Branding: in index.html <h1> ändern.

Farben/Styles: Bootstrap-Klassen anpassen oder style.css ergänzen.

Sounds: fail-sound <audio> in index.html austauschen.

🧪 Fehlerbehebung
“Fehler beim Laden der Fragen 😵”
→ Nicht per Doppelklick öffnen, sondern Server nutzen (siehe Schnellstart).

Buttons reagieren nicht
→ IDs nicht ändern. Script erwartet:
#quiz-container, #question-number, #question, #options, #hint-button, #explanation-button, #score, #wrong.

Änderungen in Fragen erscheinen nicht
→ Browser-Cache. Mit Strg+F5 neu laden oder Server neu starten.

JSON-Fehler
→ Prüfen mit jsonlint.com.

📤 Deployment
Funktioniert auf GitHub Pages, Netlify oder jedem statischen Webserver.

questions.json muss im gleichen Ordner liegen wie index.html.

👤 Credits
Gebaut von dir, mit sarkastischer Unterstützung von Monday.
Lizenz: MIT. Frei zum Lernen, Basteln oder Angeben.


