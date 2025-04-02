
import prisma from "@/lib/prisma";


import { NextRequest, NextResponse } from "next/server";

type FeedingTime = {
    time: string;
  };
  
export  interface PetFeedingCountdownProps {
      times: FeedingTime[];
      recurrentFeeding: boolean;
  }

export async function GET(req: NextRequest) {
    const url = new URL(req.nextUrl.href);
    const id = url.searchParams.get("id");

    try {
    
        const data= await prisma.foodControl.findMany({
            where: {
                user_id: Number(id)
            }
        });

      

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({
            message: error
        },
        {
            status: 500
        });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const url = new URL(req.nextUrl.href);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "ID não informado" }, { status: 400 });
        }

        const food:PetFeedingCountdownProps = await req.json();
        console.log("Servidor recebeu:", id, food);
        console.log("tamanho do food:",  food.times.length);
        if (!food.times || !Array.isArray(food.times)) {
            return NextResponse.json({ message: "times inválido" }, { status: 400 });
        }

       

        const data = await prisma.foodControl.upsert({
            where: { user_id: Number(id),id:1 },
            update: {
                feedingTime:food.times.length>=1|| food.times[0]?.time!=''?food.times[0]?.time :null,
                feedingTime1:food.times.length>=2|| food.times[1]?.time!=''?food.times[1]?.time:null,
                feedingTime2:food.times.length===3|| food.times[2]?.time!=''?food.times[2]?.time :null,
                food: false,
                recurrentFeeding: food.recurrentFeeding,
            },
            create: {
                user_id: Number(id),
                feedingTime:food.times.length>=1?food.times[0]?.time :null,
                feedingTime1:food.times.length>=2?food.times[1]?.time:null,
                feedingTime2:food.times.length===3?food.times[2]?.time :null,
                food: false,
                recurrentFeeding: food.recurrentFeeding,
            }
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error("Erro no servidor:", error);
        return NextResponse.json({ message: "Erro interno no servidor", error: error }, { status: 500 });
    }
}

