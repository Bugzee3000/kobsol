import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useProjects() {
  const { session, profile } = useAuth()
  const [projects, setProjects]   = useState([])
  const [loading,  setLoading]    = useState(true)
  const [error,    setError]      = useState(null)

  // ── Charger les projets (admin + membre) ───────────────────
  const fetchProjects = useCallback(async () => {
    if (!session) return
    setLoading(true)
    setError(null)

    try {
      // RLS gère automatiquement les permissions
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles!admin_id (id, name, email),
          project_members (
            id, name, email, order_index, status, user_id, joined_at,
            late_payments (id, since, due_date, reason, resolved, resolved_at)
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [session])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  // ── Créer un projet ────────────────────────────────────────
  const createProject = async ({ name, amountPerPerson, period, startDate, endDate, country, members }) => {
    const { data: project, error: projError } = await supabase
      .from('projects')
      .insert({
        name,
        amount_per_person: amountPerPerson,
        period,
        start_date: startDate,
        end_date: endDate || null,
        country: country || null,
        admin_id: session.user.id,
      })
      .select()
      .single()

    if (projError) return { error: projError }

    // Insérer les membres
    if (members?.length) {
      const membersToInsert = members.map((m, i) => ({
        project_id:  project.id,
        name:        m.name,
        email:       m.email || null,
        order_index: i,
        status:      'active',
      }))

      const { error: membersError } = await supabase
        .from('project_members')
        .insert(membersToInsert)

      if (membersError) return { error: membersError }
    }

    await fetchProjects()
    return { data: project, error: null }
  }

  // ── Mettre à jour un projet ────────────────────────────────
  const updateProject = async (projectId, updates) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single()

    if (!error) await fetchProjects()
    return { data, error }
  }

  // ── Supprimer un projet ────────────────────────────────────
  const deleteProject = async (projectId) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (!error) setProjects(p => p.filter(pr => pr.id !== projectId))
    return { error }
  }

  // ── Réordonner les membres ─────────────────────────────────
  const reorderMembers = async (projectId, orderedMemberIds) => {
    const updates = orderedMemberIds.map((id, index) => ({
      id,
      order_index: index,
      project_id: projectId,
    }))

    const { error } = await supabase
      .from('project_members')
      .upsert(updates)

    if (!error) await fetchProjects()
    return { error }
  }

  // ── Signaler un retard ─────────────────────────────────────
  const markLate = async (projectId, memberId, { since, dueDate, reason }) => {
    const { error } = await supabase
      .from('late_payments')
      .insert({
        project_id: projectId,
        member_id:  memberId,
        since,
        due_date:   dueDate || null,
        reason:     reason || '',
      })

    if (!error) await fetchProjects()
    return { error }
  }

  // ── Résoudre un retard ─────────────────────────────────────
  const resolveLate = async (lateId) => {
    const { error } = await supabase
      .from('late_payments')
      .update({ resolved: true, resolved_at: new Date().toISOString() })
      .eq('id', lateId)

    if (!error) await fetchProjects()
    return { error }
  }

  return {
    projects,
    loading,
    error,
    refresh: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    reorderMembers,
    markLate,
    resolveLate,
    // Helpers
    myProjects:    projects.filter(p => p.admin_id === session?.user?.id),
    memberProjects: projects.filter(p => p.admin_id !== session?.user?.id),
  }
}
