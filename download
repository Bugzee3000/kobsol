import { useState } from 'react'
import { useProjects } from '../hooks/useProjects'
import { useAdmin }    from '../hooks/useAdmin'
import { useAuth }     from '../contexts/AuthContext'

/**
 * AppShell — coque principale de l'app après connexion.
 * Remplace le render() principal de l'ancien kobsol.jsx.
 * 
 * Les composants internes (TeamCard, TeamDetail, CreateModal, etc.)
 * restent identiques à votre kobsol.jsx existant — copiez-les ici.
 */
export default function AppShell({ profile, onSignOut, lang, setLang, theme, setTheme }) {
  const { isSuperAdmin } = useAuth()
  const {
    projects, loading, error,
    createProject, updateProject, deleteProject,
    reorderMembers, markLate, resolveLate,
    myProjects, memberProjects,
  } = useProjects()

  const [page,    setPage]    = useState('teams')
  const [sel,     setSel]     = useState(null)
  const [showC,   setShowC]   = useState(false)
  const [toast,   setToast]   = useState(null)

  const showToast = (msg, type = '') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // ── Créer un projet via Supabase ───────────────────────────
  const handleCreate = async (formData) => {
    const { data, error } = await createProject(formData)
    if (error) showToast('Erreur: ' + error.message, 'danger')
    else {
      setShowC(false)
      showToast('Projet créé avec succès !', 'success')
    }
  }

  // ── Mettre à jour un projet (retards, réordonnancement) ────
  const handleUpdate = async (updatedProject, key) => {
    if (key === 'reorder') {
      const { error } = await reorderMembers(
        updatedProject.id,
        updatedProject.project_members.map(m => m.id)
      )
      if (!error) showToast('Ordre mis à jour !')
    } else if (key === 'markLate') {
      // updatedProject contient { projectId, memberId, since, dueDate, reason }
      const { error } = await markLate(
        updatedProject.projectId,
        updatedProject.memberId,
        updatedProject
      )
      if (!error) showToast('Retard enregistré', 'warn')
    } else if (key === 'resolveLate') {
      const { error } = await resolveLate(updatedProject.lateId)
      if (!error) showToast('Retard résolu !')
    }
    // Mettre à jour le projet sélectionné si ouvert
    if (sel?.id === updatedProject.id) {
      setSel(projects.find(p => p.id === updatedProject.id))
    }
  }

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', color: '#00E5A0', fontSize: 24
    }}>
      Chargement...
    </div>
  )

  // ──────────────────────────────────────────────────────────
  // RENDU PRINCIPAL
  // Copiez ici le JSX de votre ancien App() dans kobsol.jsx,
  // en remplaçant :
  //   - useState(DEMO)     → projects  (vient de useProjects)
  //   - create(team)       → handleCreate(formData)
  //   - update(upd, key)   → handleUpdate(upd, key)
  //   - user               → profile
  //   - user.name          → profile?.name
  //   - handleSignOut      → onSignOut
  //   - isSuperAdmin check → isSuperAdmin (boolean)
  // ──────────────────────────────────────────────────────────

  return (
    <div>
      {/* 
        ⬇️  Collez ici le JSX de votre App() existant dans kobsol.jsx
        en appliquant les remplacements ci-dessus.
        
        Exemple de la structure attendue :
      */}
      <nav className="app-nav">
        <div className="nav-logo" onClick={() => setSel(null)}>KOB.SOL</div>
        <div className="nav-r">
          {/* tabs, boutons, profil, etc. */}
          <div style={{ color: '#E8EDF5', fontSize: 14 }}>
            Connecté : {profile?.name}
            {isSuperAdmin && <span style={{ color: '#F5C842', marginLeft: 8 }}>★ Admin</span>}
          </div>
          <button onClick={onSignOut} style={{
            background: 'none', border: '1px solid #1A2840', color: '#E8EDF5',
            padding: '6px 14px', borderRadius: 8, cursor: 'pointer', marginLeft: 12
          }}>
            Déconnexion
          </button>
        </div>
      </nav>

      <main style={{ padding: 40, color: '#E8EDF5', fontFamily: 'sans-serif' }}>
        <p style={{ color: '#5A6A88' }}>
          ✅ Supabase connecté — {projects.length} projet(s) chargé(s) depuis la DB.
        </p>
        <p style={{ color: '#5A6A88', fontSize: 13, marginTop: 8 }}>
          👉 Copiez le JSX de AppShell depuis votre kobsol.jsx pour finaliser l'intégration.
        </p>
        {error && <p style={{ color: '#FF4D6D' }}>Erreur: {error}</p>}
      </main>
    </div>
  )
}
