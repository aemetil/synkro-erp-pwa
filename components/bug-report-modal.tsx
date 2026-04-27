"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Button } from "./ui/button"
import { X, Loader2, Bug, CheckCircle, AlertCircle } from "lucide-react"

type Lang = "fr" | "ht"

const t = {
  fr: {
    trigger: "Signaler un problème",
    title: "Signaler un problème",
    subtitle: "Aidez-nous à améliorer Synkro",
    email: "Votre adresse email",
    emailPlaceholder: "vous@exemple.com",
    category: "Catégorie",
    categoryPlaceholder: "Choisissez une catégorie",
    categories: [
      { value: "bug", label: "Bug / Erreur" },
      { value: "affichage", label: "Problème d'affichage" },
      { value: "calcul", label: "Calcul incorrect" },
      { value: "lenteur", label: "Lenteur / Performance" },
      { value: "connexion", label: "Connexion / Accès" },
      { value: "suggestion", label: "Suggestion d'amélioration" },
      { value: "autre", label: "Autre" },
    ],
    description: "Description",
    placeholder: "Décrivez le problème en détail : que s'est-il passé ? Sur quelle page ? Quelles étapes ont conduit à ce problème ?",
    hint: "Chaque rapport nous aide à améliorer Synkro pour vous et tous vos utilisateurs. Merci de prendre le temps de nous le signaler.",
    submit: "Envoyer le rapport",
    sending: "Envoi en cours...",
    success: "Rapport envoyé ! Merci pour votre aide.",
    error: "Une erreur est survenue. Veuillez réessayer.",
    required: "Veuillez remplir tous les champs.",
  },
  ht: {
    trigger: "Rapòte yon pwoblèm",
    title: "Rapòte yon pwoblèm",
    subtitle: "Ede nou amelyore Synkro",
    email: "Adrès imèl ou",
    emailPlaceholder: "ou@egzanp.com",
    category: "Kategori",
    categoryPlaceholder: "Chwazi yon kategori",
    categories: [
      { value: "bug", label: "Erè / Bug" },
      { value: "affichage", label: "Pwoblèm afichaj" },
      { value: "calcul", label: "Movè kalkil" },
      { value: "lenteur", label: "Lantè / Pèfòmans" },
      { value: "connexion", label: "Koneksyon / Aksè" },
      { value: "suggestion", label: "Sijesyon" },
      { value: "autre", label: "Lòt" },
    ],
    description: "Deskripsyon",
    placeholder: "Dekri pwoblèm lan an detay : ki sa ki te pase ? Sou ki paj ? Kisa ki koz pwoblèm sa a ?",
    hint: "Chak rapò ede nou amelyore Synkro pou ou ak tout itilizatè ou yo. Mèsi paske ou pran tan pou ou rapòte problèm sa a.",
    submit: "Voye rapò a",
    sending: "Ap anvoye...",
    success: "Rapò anvoye ! Mèsi pou èd ou.",
    error: "Te gen yon erè. Tanpri eseye ankò.",
    required: "Tanpri ranpli tout chan yo.",
  },
}

export function BugReportModal() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [lang, setLang] = useState<Lang>("fr")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  useEffect(() => { setMounted(true) }, [])

  const tx = t[lang]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !category || !description.trim()) {
      setStatus("error")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch("/api/bug-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, category, description, language: lang }),
      })
      if (res.ok) {
        setStatus("success")
        setTimeout(() => {
          setOpen(false)
          setStatus("idle")
          setEmail("")
          setCategory("")
          setDescription("")
        }, 2500)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const modal = open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b bg-gray-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
              <Bug className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{tx.title}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{tx.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4 mt-0.5">
            <button
              onClick={() => setLang("fr")}
              className={`text-lg leading-none transition-opacity ${lang === "fr" ? "opacity-100" : "opacity-35 hover:opacity-60"}`}
              title="Français"
            >
              🇫🇷
            </button>
            <button
              onClick={() => setLang("ht")}
              className={`text-lg leading-none transition-opacity ${lang === "ht" ? "opacity-100" : "opacity-35 hover:opacity-60"}`}
              title="Kreyòl"
            >
              🇭🇹
            </button>
            <button
              onClick={() => setOpen(false)}
              className="ml-1 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">{tx.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tx.emailPlaceholder}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">{tx.category}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
              <option value="">{tx.categoryPlaceholder}</option>
              {tx.categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">{tx.description}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={tx.placeholder}
              rows={4}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-400">{tx.hint}</p>
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-4 w-4 shrink-0" />
              {tx.success}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {!email.trim() || !category || !description.trim() ? tx.required : tx.error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={status === "sending" || status === "success"}>
            {status === "sending" ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{tx.sending}</>
            ) : tx.submit}
          </Button>
        </form>
      </div>
    </div>
  ) : null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Bug className="h-3 w-3" />
        {tx.trigger}
      </button>

      {mounted && createPortal(modal, document.body)}
    </>
  )
}
