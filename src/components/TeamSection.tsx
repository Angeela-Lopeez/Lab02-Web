"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export function TeamSection() {
  const { team, projects, addMember, updateMember, removeMember } = useAppStore()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState({
    userId: "",
    role: "DEV",
    name: "",
    email: "",
    position: "",
    birthdate: null as Date | null,
    phone: "",
    projectId: "" as string | null,
    isActive: true,
  })

  // ➕ Crear nuevo miembro
  const startCreate = () => {
    setEditingId(null)
    setForm({
      userId: "",
      role: "DEV",
      name: "",
      email: "",
      position: "",
      birthdate: null,
      phone: "",
      projectId: "",
      isActive: true,
    })
    setOpen(true)
  }

  // ✏️ Editar miembro
  const startEdit = (id: string) => {
    const m = team.find(x => x.id === id)
    if (!m) return
    setEditingId(id)
    setForm({
      userId: m.userId,
      role: m.role,
      name: m.name,
      email: m.email,
      position: m.position,
      birthdate: m.birthdate ? new Date(m.birthdate) : null,
      phone: m.phone,
      projectId: m.projectId || "",
      isActive: m.isActive,
    })
    setOpen(true)
  }

  // 💾 Guardar cambios o crear nuevo
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      userId: form.userId.trim(),
      role: form.role,
      name: form.name.trim(),
      email: form.email.trim(),
      position: form.position.trim(),
      birthdate: form.birthdate ? form.birthdate.toISOString().slice(0, 10) : "",
      phone: form.phone.trim(),
      projectId: form.projectId || "",
      isActive: form.isActive,
    }

    if (editingId) updateMember(editingId, payload)
    else addMember(payload)

    setOpen(false)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={startCreate}>Nuevo miembro</Button>
      </div>

      <div className="space-y-4">
        {team.map(m => (
          <Card key={m.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{m.name}</CardTitle>
                  <CardDescription>{m.position} — {m.email}</CardDescription>
                </div>
                <Badge variant={m.isActive ? "default" : "secondary"}>
                  {m.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <p><b>UserID:</b> {m.userId}</p>
                <p><b>Rol:</b> {m.role}</p>
                <p><b>Tel:</b> {m.phone}</p>
                <p><b>Nacimiento:</b> {m.birthdate || "—"}</p>
                <p className="sm:col-span-2"><b>Proyecto:</b> {projects.find(p => p.id === m.projectId)?.title || "—"}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => startEdit(m.id)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => removeMember(m.id)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar miembro" : "Nuevo miembro"}</DialogTitle>
              <DialogDescription>Completa los campos y guarda.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-2">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>User ID *</Label>
                  <Input value={form.userId} onChange={e => setForm(s => ({ ...s, userId: e.target.value }))} required />
                </div>
                <div className="grid gap-1">
                  <Label>Rol *</Label>
                  <Select value={form.role} onValueChange={v => setForm(s => ({ ...s, role: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DEV">DEV</SelectItem>
                      <SelectItem value="UX">UX</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                      <SelectItem value="QA">QA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Nombre *</Label>
                  <Input value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))} required />
                </div>
                <div className="grid gap-1">
                  <Label>Email *</Label>
                  <Input type="email" value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Posición</Label>
                  <Input value={form.position} onChange={e => setForm(s => ({ ...s, position: e.target.value }))} />
                </div>
                <div className="grid gap-1">
                  <Label>Teléfono</Label>
                  <Input value={form.phone} onChange={e => setForm(s => ({ ...s, phone: e.target.value }))} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Fecha de nacimiento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline">
                        {form.birthdate ? format(form.birthdate, "yyyy-MM-dd") : "Elegir fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar
                        mode="single"
                        selected={form.birthdate || undefined}
                        onSelect={(d) => setForm(s => ({ ...s, birthdate: d ?? null }))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-1">
                  <Label>Proyecto</Label>
                  <Select value={form.projectId || ""} onValueChange={v => setForm(s => ({ ...s, projectId: v }))}>
                    <SelectTrigger><SelectValue placeholder="(Opcional)" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">—</SelectItem>
                      {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Switch checked={form.isActive} onCheckedChange={v => setForm(s => ({ ...s, isActive: !!v }))} />
                <Label>Activo</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit">{editingId ? "Guardar cambios" : "Crear"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
