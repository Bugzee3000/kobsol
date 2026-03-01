# KOB.SOL — Structure du projet

## ⚡ Démarrage rapide

1. Uploadez tous ces fichiers sur GitHub (drag & drop)
2. Connectez le repo à Vercel
3. Ajoutez vos variables d'environnement dans Vercel :
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Deploy !

## 📁 Structure des fichiers

```
kobsol/
├── index.html                        ← Point d'entrée HTML
├── package.json                      ← Dépendances npm
├── vite.config.js                    ← Config Vite
├── vercel.json                       ← Config déploiement Vercel
├── .gitignore                        ← Fichiers exclus de git
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   ← ⭐ À exécuter dans Supabase SQL Editor
│
└── src/
    ├── main.jsx                      ← Point d'entrée React
    ├── App.jsx                       ← App principale + routing auth
    │
    ├── lib/
    │   └── supabase.js              ← Client Supabase (utilise vos clés)
    │
    ├── contexts/
    │   └── AuthContext.jsx          ← Session, profil, signIn/signUp/signOut
    │
    ├── hooks/
    │   ├── useProjects.js           ← CRUD projets, membres, retards
    │   └── useAdmin.js              ← Stats globales (superadmin)
    │
    ├── components/
    │   ├── AppShell.jsx             ← Coque app après connexion
    │   └── KobsolUI.jsx             ← Toute l'interface visuelle KOB.SOL
    │
    └── pages/
        └── AuthCallback.jsx         ← Gestion redirects email Supabase
```

## 🔑 Variables d'environnement

Créez un fichier `.env.local` (développement local) ou ajoutez dans Vercel :

```
VITE_SUPABASE_URL=https://votreprojet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 👑 Devenir superadmin

Après votre première inscription dans l'app, exécutez dans Supabase SQL Editor :

```sql
UPDATE public.profiles SET role = 'superadmin' WHERE email = 'votre@email.com';
```
