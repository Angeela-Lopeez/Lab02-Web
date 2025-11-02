"use client"

import { useAppStore } from "@/lib/store"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"

export function ProjectsSection() {
  const { projects, team, removeProject } = useAppStore()
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const openDetails = (id: string) => {
    setActiveId(id)
    setOpen(true)
  }

  const projectById = projects.find(p => p.id === activeId)
  const teamForProject = (id: string) => team.filter(m => m.projectId === id)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                  <CardDescription>{p.description || "Sin descripción"}</CardDescription>
                </div>
                <Badge
                  variant={
                    p.status === "Completado"
                      ? "default"
                      : p.status === "En progreso"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {p.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">{p.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Miembros: {teamForProject(p.id).length}
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => openDetails(p.id)}>
                    Ver detalles
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => removeProject(p.id)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {projectById ? (
            <>
              <DialogHeader>
                <DialogTitle>Detalle del Proyecto</DialogTitle>
                <DialogDescription>ID: {projectById.id}</DialogDescription>
              </DialogHeader>

              <div className="space-y-2">
                <p><b>Título:</b> {projectById.title}</p>
                <p><b>Descripción:</b> {projectById.description || "—"}</p>
                <p><b>Estado:</b> {projectById.status}</p>
                <p><b>Progreso:</b> {projectById.progress}%</p>
                <p><b>Miembros:</b></p>
                <ul className="list-disc ml-5">
                  {team.filter(m => projectById.teamMemberIds.includes(m.id)).map(m => (
                    <li key={m.id}>{m.name} — {m.position}</li>
                  ))}
                  {team.filter(m => projectById.teamMemberIds.includes(m.id)).length === 0 && (
                    <li>Sin asignar</li>
                  )}
                </ul>
                <p className="text-xs text-muted-foreground">
                  Creado: {new Date(projectById.createdAt).toLocaleString()}
                </p>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
