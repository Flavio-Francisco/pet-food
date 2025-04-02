"use client";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { decodeToken } from "@/lib/utils/decodeToken";
import { useSession } from "@/context/user";

// Definição do schema de validação
const loginSchema = z.object({
  name: z.string({ message: "Nome inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { getUser } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      try {
        const response = await axios.post("/api/auth/login", data, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Resposta da API:", response.data); // Exibe os dados retornados

        return response.data;
      } catch (error) {
        console.error("Erro no login:", error);
        return error;
      }
    },
    onSuccess: (data) => {
      getUser(decodeToken(data.token));
      router.push("/dashboard"); // Redireciona após login bem-sucedido
    },
    onError: (error) => {
      console.error("Erro na autenticação:", error);
      router.push("/");
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold shadow shadow-popover">Pet Food</h1>
        </div>
        <div className="bg-transparent flex justify-center">
          <Image
            src="/image.png"
            height={300}
            width={300}
            alt="Imagem com fundo transparente"
          />
        </div>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) => mutation.mutate(data))}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
