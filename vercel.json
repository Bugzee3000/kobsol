import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useAdmin() {
  const { isSuperAdmin } = useAuth()
  const [stats,   setStats]   = useState(null)
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSuperAdmin) { setLoading(false); return }
    fetchAll()
  }, [isSuperAdmin])

  const fetchAll = async () => {
    setLoading(true)
    await Promise.all([fetchStats(), fetchUsers()])
    setLoading(false)
  }

  // ── Stats globales (via vue SQL) ───────────────────────────
  const fetchStats = async () => {
    const { data } = await supabase.from('admin_stats').select('*').single()
    setStats(data)
  }

  // ── Liste de tous les utilisateurs ────────────────────────
  const fetchUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*, projects(count)')
      .order('created_at', { ascending: false })
    setUsers(data || [])
  }

  // ── Changer le rôle d'un utilisateur ──────────────────────
  const setUserRole = async (userId, role) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)

    if (!error) await fetchUsers()
    return { error }
  }

  // ── Supprimer un utilisateur ───────────────────────────────
  // Note: nécessite une Edge Function car supabase.auth.admin
  // n'est pas accessible côté client
  const deleteUser = async (userId) => {
    const { error } = await supabase.functions.invoke('admin-delete-user', {
      body: { userId },
    })
    if (!error) await fetchUsers()
    return { error }
  }

  return {
    stats,
    users,
    loading,
    refresh: fetchAll,
    setUserRole,
    deleteUser,
  }
}
