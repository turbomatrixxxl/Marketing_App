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

### Backend – foldere și fișiere (C#)

backend/
├─ Controllers/
│ ├─ AuthController.cs # Login, Register, PasswordRecovery, VerifyEmail, RefreshToken, SocialAuth
│ ├─ UserController.cs # User profile, photo/logo, setări
│ ├─ CampaignController.cs # CRUD campanii
│ ├─ AutoPromotionController.cs # Autopromovare, AI rules
│ ├─ SubscriptionController.cs # Abonamente & neural network
│ └─ AnalyticsController.cs # Statistici campanii, neural network, trial gratuit
│
├─ Models/
│ ├─ User.cs
│ ├─ Campaign.cs
│ ├─ Subscription.cs
│ ├─ Analytics.cs
│ ├─ AutoPromotion.cs
│ └─ Stats.cs
│
├─ Services/
│ ├─ PaymentService.cs # Google Pay, PayPal, card, bank
│ ├─ SocialMediaAPIService.cs # Facebook, Instagram, Google Ads etc.
│ ├─ ChatGPTService.cs # Consultanță AI
│ └─ SEOService.cs # Generare meta tags, sitemap etc.
│
├─ Middleware/
│ ├─ AuthMiddleware.cs # include token refresh
│ └─ ErrorMiddleware.cs
│
├─ Utils/
│ ├─ EmailService.cs # Recuperare parola + verify email
│ ├─ AuthUtils.cs # JWT, token handling, refresh token
│ └─ NeuralNetworkUtils.cs # Analiza și ajustarea campaniilor
│
├─ Program.cs
├─ Startup.cs
└─ appsettings.json

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

## 4. Structură foldere și fișiere – Frontend

frontend/
├─ src/
│ ├─ components/
│ │ ├─ Header.jsx  
 │ │ ├─ Footer.jsx  
 │ │ ├─ CampaignForm.jsx  
 │ │ ├─ AutoPromotion.jsx  
 │ │ ├─ StatsDashboard.jsx  
 │ │ ├─ ChatGPTSupport.jsx  
 │ │ ├─ UserProfile.jsx  
 │ │ ├─ UserSettings.jsx # Dropdown în Header ptr. setări user + refresh session
│ │ ├─ PasswordRecovery.jsx # Link în Login Page
│ │ └─ VerifyEmail.jsx # Pagină separată pentru verificare email
│ │
│ ├─ pages/
│ │ ├─ Home.jsx
│ │ ├─ AdminDashboard.jsx
│ │ ├─ Login.jsx # Include PasswordRecovery component + Social Login
│ │ ├─ Register.jsx # Include Social Register
│ │ ├─ Subscriptions.jsx
│ │ ├─ Campaigns.jsx
│ │ ├─ UserSettingsPage.jsx # Opțional, poate fi redirect din Header
│ │ └─ VerifyEmailPage.jsx # Rutează către componenta VerifyEmail
│ │
│ ├─ services/
│ │ ├─ api.js  
 │ │ ├─ paymentService.js  
 │ │ ├─ chatGPTService.js  
 │ │ └─ authService.js # include refresh session, Google/Facebook Auth
│ │
│ ├─ App.jsx
│ └─ index.js

---

Aceasta este structura completă și actualizată a aplicației, pregătită pentru implementare și extindere, inclusiv **backend C#**, **rețele neuronale pentru analiza campaniilor**, **refresh token/session**, **autentificare socială Google/Facebook** și **funcții vocale**.

@startuml
title Marketing App – Backend UML (Entități și Relații)

' --- Entități principale ---
class User {
+guide Id
+string Username
+string Email
+string PasswordHash
+string PhotoLogo
+string Role
+DateTime CreatedAt
+DateTime UpdatedAt
}

class Campaign {
+guide Id
+string Title
+string Content
+DateTime StartDate
+DateTime EndDate
+string Status
+int OwnerId
}

class Subscription {
+guide Id
+int UserId
+string Type
+DateTime StartDate
+DateTime EndDate
+bool IsTrial
}

class Analytics {
+guide Id
+int CampaignId
+int Views
+int Clicks
+float CTR
+float ConversionRate
}

class AutoPromotion {
+guide Id
+int CampaignId
+string Platform
+string Schedule
+bool IsActive
}

class Stats {
+guide Id
+int UserId
+int TotalCampaigns
+int ActiveCampaigns
+float SuccessRate
}

' --- Relații ---
User "1" -- "0.._" Campaign : owns >
Campaign "1" -- "0..1" Analytics : generates >
Campaign "1" -- "0.._" AutoPromotion : automates >
User "1" -- "0..1" Subscription : has >
User "1" -- "0..1" Stats : has >

@enduml

## Varianta UML 2

@startuml
title Marketing App – Backend UML (Entități + Controllers)

' --- Entități principale ---
class User {
+guide Id
+string Username
+string Email
+string PasswordHash
+string PhotoLogo
+string Role
+DateTime CreatedAt
+DateTime UpdatedAt
}

class Campaign {
+guide Id
+string Title
+string Content
+DateTime StartDate
+DateTime EndDate
+string Status
+int OwnerId
}

class Subscription {
+guide Id
+int UserId
+string Type
+DateTime StartDate
+DateTime EndDate
+bool IsTrial
}

class Analytics {
+guide Id
+int CampaignId
+int Views
+int Clicks
+float CTR
+float ConversionRate
}

class AutoPromotion {
+guide Id
+int CampaignId
+string Platform
+string Schedule
+bool IsActive
}

class Stats {
+guide Id
+int UserId
+int TotalCampaigns
+int ActiveCampaigns
+float SuccessRate
}

' --- Controller-ele ---
class AuthController {
+Login()
+Register()
+PasswordRecovery()
+VerifyEmail()
+RefreshToken()
+SocialAuth()
}

class UserController {
+GetProfile()
+UpdateProfile()
+UpdatePhotoLogo()
+DeleteUser()
}

class CampaignController {
+CreateCampaign()
+UpdateCampaign()
+DeleteCampaign()
+GetCampaigns()
}

class AutoPromotionController {
+StartAutoPromotion()
+StopAutoPromotion()
+GetSchedules()
}

class SubscriptionController {
+CreateSubscription()
+UpdateSubscription()
+CancelSubscription()
+GetUserSubscription()
}

class AnalyticsController {
+GetCampaignAnalytics()
+GetStats()
}

' --- Relații entități ---
User "1" -- "0.._" Campaign : owns >
Campaign "1" -- "0..1" Analytics : generates >
Campaign "1" -- "0.._" AutoPromotion : automates >
User "1" -- "0..1" Subscription : has >
User "1" -- "0..1" Stats : has >

' --- Relații Controllers -> Entități ---
AuthController ..> User : manages >
UserController ..> User : manages >
CampaignController ..> Campaign : manages >
AutoPromotionController ..> AutoPromotion : manages >
SubscriptionController ..> Subscription : manages >
AnalyticsController ..> Analytics : manages >
AnalyticsController ..> Stats : manages >

@enduml

---

### MarketingApp

#### Structură proiect

- **Backend (C# .NET Core)**

  - Controllers: API endpoints
  - Models: entități (User, Campaign, Notification, Analytics)
  - Services: business logic
  - AI: integrare GPT / modele neuronale
  - Notifications: email, social media push
  - Analytics: metrici campanii

- **Frontend (React)**
  - components/: UI re-utilizabil
  - pages/: pagini aplicație
  - services/: API calls
  - context/: management state global
  - assets/: imagini, icons

#### UML

- `Docs/UML/backend.puml`
- `Docs/UML/frontend.puml`

#### Funcționalități cheie

1. Autentificare utilizatori
2. Creare și management campanii
3. Integrare AI pentru mesaje promoționale
4. Trimitere notificări automate
5. Dashboard analytics
6. Chat AI vocal/text pentru clienți
