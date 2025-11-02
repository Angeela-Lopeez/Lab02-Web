"use client"

import { useState, useMemo } from "react"
import { useAppStore, type TaskStatus, type TaskPriority } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

// Opcional: si usas estados de proyecto como en tus cards
export type ProjectStatus = "Planificado" | "En progreso" | "En revisión" | "Completado"
const STATUSES: ProjectStatus[] = ["Planificado", "En progreso", "En revisión", "Completado"]

export function ProjectForm() {
  const { addProject, team, updateMember, setLoading, loading } = useAppStore()

  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<ProjectStatus>("Planificado")
  const [progress, setProgress] = useState(0)
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])

  // siempre arreglo
  const teamList = useMemo(() => team || [], [team])

  const toggleMember = (memberId: string) => {
    setSelectedMemberIds(prev =>
      prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
    )
  }

  const canSave = title.trim() && status

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSave) {
      setError("Completa al menos el título y el estado del proyecto.")
      return
    }

    setError(null)
    setLoading(true)
    await new Promise(r => setTimeout(r, 800)) // spinner demo

    const created = addProject({
      title,
      description,
      status,
      progress: Math.max(0, Math.min(100, Number(progress) || 0)),
      teamMemberIds: selectedMemberIds,
    })

    // asignar proyecto a los miembros seleccionados
    selectedMemberIds.forEach(memberId => {
      updateMember(memberId, { projectId: created.id })
    })

    setLoading(false)
    setTitle("")
    setDescription("")
    setStatus("Planificado")
    setProgress(0)
    setSelectedMemberIds([])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {loading ? (
            <Spinner className="mr-2 h-4 w-4" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          )}
          Nuevo Proyecto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
            <DialogDescription>
              Completa la información y presiona <b>Crear Proyecto</b>.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="title">Nombre del Proyecto *</Label>
              <Input
                id="title"
                placeholder="Mi Proyecto Increíble"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Breve descripción..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Estado *</Label>
                <Select value={status} onValueChange={(val: ProjectStatus) => setStatus(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map(s => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="progress">Progreso (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={e => setProgress(Number(e.target.value || 0))}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Miembros del equipo</Label>
              <Card>
                <CardContent className="pt-4 grid gap-2 max-h-48 overflow-auto">
                  {teamList.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No hay miembros disponibles.</p>
                  ) : (
                    teamList.map(m => (
                      <label key={m.id} className="flex items-center gap-3 text-sm">
                        <Checkbox
                          checked={selectedMemberIds.includes(m.id)}
                          onCheckedChange={() => toggleMember(m.id)}
                        />
                        <span className="font-medium">{m.name}</span>
                        <span className="text-muted-foreground">({m.position})</span>
                      </label>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
              Crear Proyecto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
