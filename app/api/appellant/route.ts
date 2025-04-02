import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      if (!id) {
        return NextResponse.json({ message: "ID não informado" }, { status: 400 });
      }
  
      // Busca o registro do usuário no banco de dados
      const record = await prisma.foodControl.findUnique({
        where: { user_id: Number(id),id:1 }
      });
  
      if (!record) {
        return NextResponse.json({ message: "Registro não encontrado" }, { status: 404 });
      }
  
      // Extrai os horários válidos (não vazios) e garante que sejam strings
      const feedingTimes = [record.feedingTime, record.feedingTime1, record.feedingTime2]
        .filter((time): time is string => !!time && time.trim() !== "");
  
      if (feedingTimes.length === 0) {
        return NextResponse.json({ message: "Nenhum horário de alimentação disponível" });
      }
  
      // Obtém o horário atual em minutos desde a meia-noite
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
  
      let closestTime: string | null = null;
      let smallestDiff = Infinity;
  
      // Para cada horário, calcula a diferença (em minutos)
      feedingTimes.forEach(time => {
        const [hoursStr, minutesStr] = time.split(":");
        const timeMinutes = parseInt(hoursStr) * 60 + parseInt(minutesStr);
        let diff = timeMinutes - nowMinutes;
        // Se o horário já passou, considere como do próximo dia
        if (diff < 0) diff += 24 * 60;
        if (diff < smallestDiff) {
          smallestDiff = diff;
          closestTime = time;
        }
      });
  
      return NextResponse.json({
        time: closestTime,
       
      });
    } catch (error) {
      console.error("Erro na rota GET:", error);
      return NextResponse.json(
        { message: "Erro interno no servidor", error: error },
        { status: 500 }
      );
    }
  }
