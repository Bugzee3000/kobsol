import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useProjects }           from './hooks/useProjects'
import { supabase }              from './lib/supabase'

// ── Importer vos composants existants ─────────────────────────
// (copiez les composants depuis kobsol.jsx ici)
import Landing     from './components/Landing'
import AuthScreen  from './components/AuthScreen'
import AppShell    from './components/AppShell'
import AuthCallback from './pages/AuthCallback'

// ── Détection de la route ──────────────────────────────────────
const isAuthCallback = window.location.pathname.includes('/auth/callback')
  || window.location.hash.includes('access_token')

function KobsolApp() {
  const { session, profile, loading, signIn, signUp, signOut, resetPassword } = useAuth()
  const [screen, setScreen] = useState('landing') // landing | auth | app | reset-password
  const [lang,   setLang]   = useState('fr')
  const [theme,  setTheme]  = useState('dark')

  // ── Gérer le callback Supabase (confirmation email, reset pwd) ─
  useEffect(() => {
    if (isAuthCallback) {
      setScreen('callback')
    }
  }, [])

  // ── Rediriger selon la session ─────────────────────────────────
  useEffect(() => {
    if (loading) return
    if (session && screen !== 'callback') setScreen('app')
    else if (!session && screen === 'app') setScreen('landing')
  }, [session, loading])

  // ── Gérer le lien de reset password ───────────────────────────
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setScreen('reset-password')
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <LoadingScreen />
  if (screen === 'callback') return <AuthCallback onDone={setScreen} />

  if (screen === 'reset-password') return (
    <ResetPasswordScreen
      onDone={() => setScreen('app')}
      theme={theme}
      lang={lang}
    />
  )

  if (screen === 'landing') return (
    <Landing
      onStart={() => setScreen('auth')}
      lang={lang} setLang={setLang}
      theme={theme} setTheme={setTheme}
    />
  )

  if (screen === 'auth') return (
    <AuthScreen
      onAuth={() => setScreen('app')}
      onBack={() => setScreen('landing')}
      lang={lang} setLang={setLang}
      theme={theme} setTheme={setTheme}
      signIn={signIn}
      signUp={signUp}
      resetPassword={resetPassword}
    />
  )

  return (
    <AppShell
      profile={profile}
      onSignOut={async () => { await signOut(); setScreen('landing') }}
      lang={lang} setLang={setLang}
      theme={theme} setTheme={setTheme}
    />
  )
}

// ── Écran de chargement initial ────────────────────────────────
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#080D1A', color: '#00E5A0',
      fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800,
      letterSpacing: -1
    }}>
      KOB.SOL
    </div>
  )
}

// ── Écran de réinitialisation de mot de passe ──────────────────
function ResetPasswordScreen({ onDone, theme, lang }) {
  const [pwd, setPwd]     = useState('')
  const [done, setDone]   = useState(false)
  const [err, setErr]     = useState('')

  const handleReset = async () => {
    if (pwd.length < 6) { setErr('Minimum 6 caractères.'); return }
    const { error } = await supabase.auth.updateUser({ password: pwd })
    if (error) setErr(error.message)
    else { setDone(true); setTimeout(onDone, 2000) }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#080D1A', padding: 24
    }}>
      <div style={{
        background: '#0F1729', border: '1px solid #1A2840', borderRadius: 20,
        padding: 40, width: '100%', maxWidth: 400, fontFamily: 'sans-serif'
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#E8EDF5', marginBottom: 8 }}>
          Nouveau mot de passe
        </div>
        {done ? (
          <div style={{ color: '#00E5A0' }}>✓ Mot de passe mis à jour ! Redirection...</div>
        ) : (
          <>
            <input
              type="password"
              placeholder="Nouveau mot de passe (6 caractères min)"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 10,
                border: '1px solid #1A2840', background: '#080D1A',
                color: '#E8EDF5', fontSize: 14, marginBottom: 12, boxSizing: 'border-box'
              }}
            />
            {err && <div style={{ color: '#FF4D6D', fontSize: 13, marginBottom: 12 }}>{err}</div>}
            <button
              onClick={handleReset}
              style={{
                width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                background: '#00E5A0', color: '#000', fontWeight: 700,
                fontSize: 15, cursor: 'pointer'
              }}
            >
              Confirmer
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Export avec Provider ───────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <KobsolApp />
    </AuthProvider>
  )
}
