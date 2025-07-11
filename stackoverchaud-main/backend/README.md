# Eduresa API

API RESTful pour la gestion d'une plateforme de réservation de salles avec rôles, utilisateurs, invitations et notifications.

## 🚀 Stack utilisée

- **Node.js** + **Express**
- **MongoDB** (avec Mongoose)
- **JWT** pour l'authentification
- **Swagger** pour la documentation
- **Dotenv** pour la configuration
- **bcryptjs** pour le hash des mots de passe

---

## 🧩 Fonctionnalités

- 🔐 Authentification (login, JWT)
- 👤 Gestion des utilisateurs (CRUD)
- 🏷️ Gestion des rôles
- 📨 Invitations
- 📅 Réservations de salles
- 🔔 Notifications
- 📄 Documentation Swagger disponible à `/api/docs`

---

---

## ⚙️ Configuration

Créer un fichier `.env` à la racine du dossier `backend` :

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/eduresa
JWT_SECRET_KEY=StackOverChaudSecretKey!2025
```

## 🧪 Installation & Lancement

# Cloner le projet
git clone https://github.com/Salman-Ali05/stackoverchaud.git
cd stackoverchaud/backend

# Installer les dépendances
npm install

# Lancer le serveur
npm run dev


## Contrainte

L'api est full local, problème de déploiment.