export type ProjectStatus = "Planificado" | "En progreso" | "En revisión" | "Completado"
export type TaskStatus = "Pendiente" | "En progreso" | "Completado"
export type TaskPriority = "Baja" | "Media" | "Alta" | "Urgente"

export interface TeamMember {
  id: string
  userId: string
  role: string
  name: string
  email: string
  position: string
  birthdate: string | null
  phone: string
  projectId?: string | null
  isActive: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  progress: number
  teamMemberIds: string[]   // IDs de TeamMember
  createdAt: string
}

export interface Task {
  id: string
  description: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  userId: string            // TeamMember.userId
  dateline: string          // ISO date
  createdAt: string
}
