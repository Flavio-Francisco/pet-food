import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../../../../lib/prisma"; // Certifique-se de ter um arquivo para inicializar o Prisma

interface User{
    name: string;
    password: string;
}
export async function POST(req: Request) {
  try {
    const { name, password }:User = await req.json();

    // Verifica se o usuário existe
    const user = await prisma.user.findFirst({ where: { name:name } });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Compara a senha diretamente (⚠️ Menos seguro)
    if (password !== user.password) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

