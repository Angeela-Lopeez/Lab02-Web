"use client"

import { useMemo, useState } from "react"
import { useAppStore } from "@/lib/store"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination"
import type { TaskStatus, TaskPriority } from "@/lib/store"

const STATUS: TaskStatus[] = ["Pendiente", "En progreso", "Completado"]
const PRIORITY: TaskPriority[] = ["Baja", "Media", "Alta", "Urgente"]

export function TasksSection() {
  const { tasks, projects, team, addTask, updateTask, removeTask } = useAppStore()

  const [page, setPage] = useState(1)
  const pageSize = 5
  const pageCount = Math.max(1, Math.ceil(tasks.length / pageSize))
  const pagedTasks = useMemo(() => tasks.slice((page - 1) * pageSize, page * pageSize), [tasks, page])

  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    description: "",
    projectId: "",
    status: "Pendiente" as TaskStatus,
    priority: "Media" as TaskPriority,
    userId: "",
    dateline: null as Date | null,
  })

  const startCreate = () => {
    setEditingId(null)
    setForm({
      description: "",
      projectId: projects[0]?.id || "",
      status: "Pendiente",
      priority: "Media",
      userId: team[0]?.userId || "",
      dateline: null,
    })
    setOpen(true)
  }

  const startEdit = (id: string) => {
    const t = tasks.find(x => x.id === id)
    if (!t) return
    setEditingId(id)
    setForm({
      description: t.description,
      projectId: t.projectId,
      status: t.status as TaskStatus,
      priority: t.priority as TaskPriority,
      userId: t.userId,
      dateline: t.dateline ? new Date(t.dateline) : null,
    })
    setOpen(true)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      description: form.description.trim(),
      projectId: form.projectId,
      status: form.status,
      priority: form.priority,
      userId: form.userId,
      dateline: form.dateline
        ? form.dateline.toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    }
    if (editingId) updateTask(editingId, payload)
    else addTask(payload)
    setOpen(false)
  }

  const statusVariant = (status: string) =>
    status === "Completado" ? "default" : status === "En progreso" ? "secondary" : "outline"

  const priorityVariant = (p: string) =>
    p === "Urgente" ? "destructive" : p === "Alta" ? "default" : p === "Media" ? "secondary" : "outline"

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div />
        <Button onClick={startCreate}>Nueva tarea</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>Lista de todas las tareas del proyecto</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Tarea</TableHead>
              <TableHead>Proyecto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Fecha límite</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell className="font-medium">{task.description}</TableCell>
                <TableCell>{projects.find(p => p.id === task.projectId)?.title || "—"}</TableCell>
                <TableCell><Badge variant={statusVariant(task.status)}>{task.status}</Badge></TableCell>
                <TableCell><Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge></TableCell>
                <TableCell>{team.find(m => m.userId === task.userId)?.name || "—"}</TableCell>
                <TableCell>{task.dateline}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => startEdit(task.id)}>Editar</Button>
                    <Button variant="destructive" size="sm" onClick={() => removeTask(task.id)}>Eliminar</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pagedTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No hay tareas en esta página.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="py-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
              </PaginationItem>
              {Array.from({ length: pageCount }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => setPage(p => Math.min(pageCount, p + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
              <DialogDescription>Completa la información y guarda.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-2">
              <div className="grid gap-1">
                <Label>Descripción *</Label>
                <Input
                  value={form.description}
                  onChange={e => setForm(s => ({ ...s, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Proyecto *</Label>
                  <Select
                    value={form.projectId}
                    onValueChange={v => setForm(s => ({ ...s, projectId: v }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {projects.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <Label>Asignado a *</Label>
                  <Select
                    value={form.userId}
                    onValueChange={v => setForm(s => ({ ...s, userId: v }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {team.map(m => (
                        <SelectItem key={m.id} value={m.userId}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Estado</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v: TaskStatus) => setForm(s => ({ ...s, status: v }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUS.map(s => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1">
                  <Label>Prioridad</Label>
                  <Select
                    value={form.priority}
                    onValueChange={(v: TaskPriority) => setForm(s => ({ ...s, priority: v }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PRIORITY.map(p => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-1">
                <Label>Fecha límite</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline">
                      {form.dateline ? format(form.dateline, "yyyy-MM-dd") : "Elegir fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={form.dateline || undefined}
                      onSelect={d => setForm(s => ({ ...s, dateline: d ?? null }))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{editingId ? "Guardar cambios" : "Crear"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
