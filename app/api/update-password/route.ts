import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
    const url = new URL(req.nextUrl.href);
    const id = url.searchParams.get("id");
  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Senha atual e nova senha são necessárias." },
        { status: 400 }
      );
    }

    // Em um cenário real, obtenha o userId da sessão autenticada.
    const userId = 1; // Exemplo fixo para demonstração

    // Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: Number(id)},
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // Verifica se a senha atual confere com a senha armazenada (em texto puro)
    if (currentPassword !== user.password) {
      return NextResponse.json(
        { message: "Senha atual incorreta." },
        { status: 401 }
      );
    }

    // Atualiza a senha do usuário no banco de dados
    await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    return NextResponse.json({ message: "Senha atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
