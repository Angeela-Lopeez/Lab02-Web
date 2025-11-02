"use client"

import { create } from "zustand"
import { nanoid } from "nanoid"

// Tipos
export type TaskStatus = "Pendiente" | "En progreso" | "Completado"
export type TaskPriority = "Baja" | "Media" | "Alta" | "Urgente"

export interface Project {
  id: string
  title: string
  description: string
  status: string
  progress: number
  teamMemberIds: string[]
  createdAt: string
}

export interface TeamMember {
  id: string
  userId: string
  name: string
  email: string
  role: string
  position: string
  birthdate: string
  phone: string
  projectId?: string | null
  isActive: boolean
}

export interface Task {
  id: string
  description: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  userId: string
  dateline: string
}

export interface AppState {
  projects: Project[]
  team: TeamMember[]
  tasks: Task[]
  loading: boolean

  setLoading: (v: boolean) => void

  addProject: (data: Omit<Project, "id" | "createdAt">) => Project
  updateProject: (id: string, data: Partial<Project>) => void
  removeProject: (id: string) => void

  addMember: (data: Omit<TeamMember, "id">) => void
  updateMember: (id: string, data: Partial<TeamMember>) => void
  removeMember: (id: string) => void

  addTask: (data: Omit<Task, "id">) => void
  updateTask: (id: string, data: Partial<Task>) => void
  removeTask: (id: string) => void
}

// Implementación Zustand
export const useAppStore = create<AppState>((set, get) => ({
  projects: [
    {
      id: nanoid(),
      title: "E-commerce Platform",
      description: "Plataforma de ventas con Next.js",
      status: "En progreso",
      progress: 65,
      teamMemberIds: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: nanoid(),
      title: "Dashboard Analytics",
      description: "Panel de métricas con Tailwind + Shadcn",
      status: "Completado",
      progress: 100,
      teamMemberIds: [],
      createdAt: new Date().toISOString(),
    },
  ],

  team: [
    {
      id: nanoid(),
      userId: "U001",
      name: "María García",
      email: "maria@example.com",
      role: "Frontend Developer",
      position: "Frontend",
      birthdate: "1998-03-12",
      phone: "987654321",
      projectId: "",
      isActive: true,
    },
    {
      id: nanoid(),
      userId: "U002",
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "Backend Developer",
      position: "Backend",
      birthdate: "1996-06-22",
      phone: "987123456",
      projectId: "",
      isActive: true,
    },
  ],

  // 👇 Tipado explícito como Task[] + literals con as TaskStatus/TaskPriority
  tasks: ([
    {
      id: nanoid(),
      description: "Implementar autenticación",
      projectId: "",
      status: "En progreso" as TaskStatus,
      priority: "Alta" as TaskPriority,
      userId: "U001",
      dateline: "2025-11-15",
    },
    {
      id: nanoid(),
      description: "Configurar CI/CD",
      projectId: "",
      status: "Completado" as TaskStatus,
      priority: "Media" as TaskPriority,
      userId: "U002",
      dateline: "2025-11-20",
    },
  ] as Task[]).map(t => ({
    ...t,
    projectId: get()?.projects?.[0]?.id || "",
  })),

  loading: false,
  setLoading: (v) => set({ loading: v }),

  // Proyectos
  addProject: (data) => {
    const newProject: Project = {
      id: nanoid(),
      ...data,
      createdAt: new Date().toISOString(),
    }
    set({ projects: [...get().projects, newProject] })
    return newProject
  },

  updateProject: (id, data) => {
    set({ projects: get().projects.map(p => (p.id === id ? { ...p, ...data } : p)) })
  },

  removeProject: (id) => {
    set({ projects: get().projects.filter(p => p.id !== id) })
  },

  // Miembros
  addMember: (data) => {
    const newMember: TeamMember = { id: nanoid(), ...data }
    set({ team: [...get().team, newMember] })
  },

  updateMember: (id, data) => {
    set({ team: get().team.map(m => (m.id === id ? { ...m, ...data } : m)) })
  },

  removeMember: (id) => {
    set({ team: get().team.filter(m => m.id !== id) })
  },

  // Tareas
  addTask: (data) => {
    const newTask: Task = { id: nanoid(), ...data }
    set({ tasks: [...get().tasks, newTask] })
  },

  updateTask: (id, data) => {
    set({ tasks: get().tasks.map(t => (t.id === id ? { ...t, ...data } : t)) })
  },

  removeTask: (id) => {
    set({ tasks: get().tasks.filter(t => t.id !== id) })
  },
}))
