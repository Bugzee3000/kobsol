import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Page /auth/callback
 * Supabase redirige ici après :
 *   - Confirmation d'email d'inscription
 *   - Lien de réinitialisation de mot de passe
 *
 * Dans votre router (ex: React Router), créez une route :
 *   <Route path="/auth/callback" element={<AuthCallback />} />
 */
export default function AuthCallback({ onDone }) {
  useEffect(() => {
    // Supabase lit automatiquement les tokens dans l'URL (#access_token=...)
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Rediriger vers l'app une fois la session établie
      if (session) {
        onDone?.('app')
      } else {
        onDone?.('landing')
      }
    })
  }, [])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#080D1A', color: '#E8EDF5',
      fontFamily: 'sans-serif', flexDirection: 'column', gap: 16
    }}>
      <div style={{ fontSize: 32 }}>⏳</div>
      <div>Vérification en cours...</div>
    </div>
  )
}
