"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DeleteButtonProps {
  action: () => Promise<void>
  itemName: string
  itemType: "vente" | "dépense" | "catégorie" | "produit" | "patient" | "consultation" | "rendez-vous"
}

export function DeleteButton({ action, itemName, itemType }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cette ${itemType} ?`
    )

    if (!confirmed) return

    setIsDeleting(true)
    try {
      await action()
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      alert("Erreur lors de la suppression. Veuillez réessayer.")
      setIsDeleting(false)
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      className="w-full"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Suppression..." : `Supprimer cette ${itemType}`}
    </Button>
  )
}