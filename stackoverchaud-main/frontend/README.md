# Eduresa Frontend

Interface utilisateur pour la plateforme de réservation de salles Eduresa, construite avec React et TypeScript.

## 🚀 Stack utilisée

- **React** 18 + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Material-UI** (composants UI)
- **Three.js** + **React Three Fiber** (visualisation 3D)
- **React Router** (navigation)
- **React Hot Toast** (notifications)
- **Lucide React** (icônes)

---

## 🧩 Fonctionnalités

- 🔐 Authentification utilisateur
- 🏢 Visualisation 3D des salles de classe
- 📅 Réservation de salles
- 📨 Gestion des invitations
- 🔔 Notifications en temps réel
- 📱 Interface responsive

---

## ⚙️ Installation & Lancement

```bash
# Cloner le projet
git clone https://github.com/Salman-Ali05/stackoverchaud.git
cd stackoverchaud/frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🛠️ Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run preview` - Prévisualise la version de production

---

## 📁 Structure du projet

```
src/
├── components/         # Composants réutilisables
├── hooks/             # Hooks personnalisés (Context, Toast)
├── page/              # Pages de l'application
├── types/             # Types TypeScript
└── assets/            # Images et ressources
```

---

## 🔧 Configuration

L'application communique avec l'API backend. Assurez-vous que le serveur backend est démarré avant de lancer le frontend.

---

## 🎨 Composants principaux

- **Scene3D** - Visualisation 3D des salles
- **Dashboard** - Tableau de bord principal
- **Classroom** - Composant de salle de classe
- **AddClassroomModal** - Modal d'ajout de salle