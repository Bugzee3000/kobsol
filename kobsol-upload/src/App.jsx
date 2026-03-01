import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import KobsolUI from './components/KobsolUI.jsx'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: '#080D1A',
        color: '#00E5A0', fontFamily: 'sans-serif',
        fontSize: 32, fontWeight: 800
      }}>
        KOB.SOL
      </div>
    )
  }

  return <KobsolUI supabase={supabase} session={session} />
}
