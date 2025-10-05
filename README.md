# Marketing App – Descriere Generală

## 1. Obiectivul aplicației

Marketing App este o platformă completă pentru promovarea produselor, serviciilor sau activităților sociale. Aplicația combină funcții de marketing automate și manuale, cu integrare AI, plăți, SEO și statistică avansată. Este concepută să poată fi vândută și promovată singură (autopromovare), oferind o interfață prietenoasă pentru administratori și utilizatori finali.

### Funcționalități principale

- **Campanii de marketing**: creare, modificare și promovare pe multiple canale (Facebook, Instagram, TikTok, LinkedIn, email etc.).
- **Autopromovare**: aplicația își promovează propriul produs/serviciu pentru a atrage utilizatori și clienți noi.
- **Integrare ChatGPT**: suport interactiv pentru utilizatori, consiliere în alegerea abonamentelor și ghidaj în configurarea campaniilor.
- **Plăți și abonamente**: carduri, PayPal, Google Pay, transfer bancar și perioadă gratuită de 1 lună.
- **SEO integrat**: optimizare automată pentru motoarele de căutare.
- **Statistici și optimizare AI**: analiza performanței campaniilor prin **rețele neuronale**, ajustări automate și manuale.
- **Management useri**: conturi cu username/nume societate, fotografie sau logo, setări personale, recuperare parolă, verificare email, refresh token/session, autentificare Google/Facebook.
- **Frontend modern**: header cu User Settings, footer cu datele companiei și echipei de dezvoltare, pagini responsive.
- **Funcții vocale**: dictare text pentru campanii și mesaje, Text-to-Speech (TTS) pentru ghidare și consultanță.

---

## 2. Backend – Funcționalități și responsabilități (C#)

Backend-ul va fi responsabil pentru:

1. **Autentificare și securitate**

   - Login/Logout cu email și parolă.
   - Recuperare parolă prin email sau număr de telefon cu confirmare cod.
   - **Verificare email** la înregistrare și la schimbarea emailului (verify email).
   - **Refresh token / session management** pentru menținerea autentificării utilizatorului.
   - Autentificare socială (Google Auth, Facebook Auth).
   - Gestionare roluri (Admin, User).

2. **Gestionare utilizatori**

   - Creare, modificare și ștergere utilizatori.
   - Stocare username, email, fotografie/logo, abonament.
   - Setări user (update parola, update fotografie/logo).

3. **Campanii și autopromovare**

   - Creare, modificare și ștergere campanii.
   - Planificare postări automate pe toate platformele social media prin API-uri.
   - Funcție de autopromovare: aplicația inițiază campanii pentru promovarea propriului produs.

4. **Integrare ChatGPT**

   - Endpoint-uri pentru suport utilizatori.
   - Răspunsuri AI pentru alegerea abonamentelor și consultanță marketing.

5. **Plăți și abonamente**

   - Management plăți prin Google Pay, PayPal, card, transfer bancar.
   - Generare facturi și urmărire abonamente.
   - Perioadă gratuită de încercare 1 lună.

6. **SEO și Analytics**

   - Stocarea și generarea datelor SEO.
   - Analiză statistici campanii folosind **rețele neuronale**.
   - Ajustare recomandări setări marketing.

7. **Admin Panel**
   - Management campanii, utilizatori, abonamente, vizualizare statistici.
   - Introducere manuală a postărilor sau configurări speciale.

---

## 3. Frontend – Funcționalități și responsabilități

Frontend-ul va fi responsabil pentru:

1. **Interfață utilizator (UI)**

   - Pagini responsive: Home, Login, Register, Admin Dashboard, User Settings, Campaigns, Statistici, Subscriptions, Verify Email.
   - Header cu acces la User Settings și logout.
   - Footer cu detalii companie, social media și echipa proiectului.

2. **User Settings**

   - Modificare parolă.
   - Modificare fotografie sau logo.
   - Vizualizare abonament și date cont.
   - Refresh session dacă utilizatorul rămâne pe pagină.

3. **Password Recovery și Verify Email**

   - Formular de recuperare parolă în Login Page.
   - Trimitere cod de confirmare pe email sau telefon.
   - **Verify Email Page**: pagină pentru confirmarea emailului după înregistrare sau schimbarea adresei email.

4. **Autentificare socială**

   - Login/Register prin Google Auth.
   - Login/Register prin Facebook Auth.

5. **Campanii**

   - Creare, editare și vizualizare campanii.
   - Programare postări automate și manuale.
   - Funcție de autopromovare vizibilă în dashboard.

6. **Statistici și AI**

   - Dashboard cu performanță campanii și recomandări AI.
   - Optimizări automate și manuale prin rețele neuronale.

7. **Plăți și abonamente**

   - Formular pentru plată cu card, PayPal, Google Pay sau transfer bancar.
   - Înregistrare perioadă gratuită de 1 lună.
   - Vizualizare status abonament.

8. **Integrare ChatGPT**

   - Chat live pentru consultanță.
   - Răspunsuri automate pentru întrebări despre marketing și abonamente.

9. **Funcții vocale**
   - Dictare text pentru crearea campaniilor și mesaje.
   - Text-to-Speech (TTS) pentru ghidare și notificări.

---

Aceasta este structura completă și actualizată a aplicației, pregătită pentru implementare și extindere, inclusiv **backend Node.Js C#**, **rețele neuronale pentru analiza campaniilor**, **refresh token/session**, **autentificare socială Google/Facebook** și **funcții vocale**.
# trigger GH Pages workflow
