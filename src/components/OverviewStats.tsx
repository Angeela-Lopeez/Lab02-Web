"use client"

import { useMemo } from "react"
import { useAppStore } from "@/lib/store"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function OverviewStats() {
  const { projects, tasks, team } = useAppStore()

  const stats = useMemo(() => {
    const totalProjects = projects.length
    const completedTasks = tasks.filter(t => t.status === "Completado").length
    const totalHours = tasks.length * 2 + projects.reduce((acc, p) => acc + Math.round(p.progress / 5), 0) // simulación
    const activeMembers = team.filter(m => m.isActive).length

    return { totalProjects, completedTasks, totalHours, activeMembers }
  }, [projects, tasks, team])

  const items = [
    { title: "Total Proyectos", value: stats.totalProjects, sub: "registrados actualmente" },
    { title: "Tareas Completadas", value: stats.completedTasks, sub: "según CRUD de tareas" },
    { title: "Horas Estimadas", value: `${stats.totalHours} h`, sub: "estimación de carga de trabajo" },
    { title: "Miembros Activos", value: stats.activeMembers, sub: "en el equipo actual" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{it.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{it.value}</div>
            <p className="text-xs text-muted-foreground">{it.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
