"use client";

import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/app/servises/update";
import { useSession } from "@/context/user";

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

const UpdatePassword = () => {
  const { user } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (payload: UpdatePasswordPayload) =>
      updatePassword(user?.id || 0, payload),

    onSuccess: () => {
      setMessage("Senha atualizada com sucesso!");
      setError(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err) => {
      console.error("Erro ao atualizar senha:", err);
      setError("Erro ao atualizar senha.");
      setMessage(null);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("A nova senha e a confirmação não coincidem.");
      return;
    }

    mutation.mutate({ currentPassword, newPassword });
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Atualizar Senha</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="block mb-1">
              Senha Atual
            </Label>
            <Input
              type="password"
              id="currentPassword"
              placeholder="Digite a senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="newPassword" className="block mb-1">
              Nova Senha
            </Label>
            <Input
              type="password"
              id="newPassword"
              placeholder="Digite a nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="block mb-1">
              Confirmar Nova Senha
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Atualizando..." : "Atualizar Senha"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePassword;
