"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"

export function SettingsSection() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    language: "es",
    timezone: "America/Lima",
    notifications: true,
    weeklySummary: true,
    orgName: "Mi Organización",
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(false)
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración</CardTitle>
        <CardDescription>Preferencias de la cuenta y de la organización</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-3">
          {saved && (
            <Alert>
              <AlertTitle>Guardado</AlertTitle>
              <AlertDescription>Las preferencias se han actualizado correctamente.</AlertDescription>
            </Alert>
          )}

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="grid gap-1">
              <Label>Idioma</Label>
              <Select value={form.language} onValueChange={v => setForm(s => ({ ...s, language: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">Inglés</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label>Zona horaria</Label>
              <Select value={form.timezone} onValueChange={v => setForm(s => ({ ...s, timezone: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Lima">America/Lima</SelectItem>
                  <SelectItem value="America/Bogota">America/Bogota</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-1">
            <Label>Nombre de la organización</Label>
            <Input value={form.orgName} onChange={e => setForm(s => ({ ...s, orgName: e.target.value }))} />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Switch checked={form.notifications} onCheckedChange={v => setForm(s => ({ ...s, notifications: !!v }))} />
            <Label>Notificaciones</Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.weeklySummary} onCheckedChange={v => setForm(s => ({ ...s, weeklySummary: !!v }))} />
            <Label>Resumen semanal por correo</Label>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? <Spinner className="mr-2 h-4 w-4" /> : null}
              Guardar cambios
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
