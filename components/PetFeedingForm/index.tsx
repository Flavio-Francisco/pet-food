"use client";

import { getAppellant } from "@/app/servises/appellant";
import { useSession } from "@/context/user";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const PetFeedingCountdown = () => {
  const [tempoRestante, setTempoRestante] = useState({
    dias: 1,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  const { user, Getrefrech } = useSession();
  const { data, refetch } = useQuery({
    queryKey: ["appellant"],
    queryFn: () => getAppellant(user?.id || 0),
  });
  useEffect(() => {
    if (!data) return;
    Getrefrech(refetch);
    const calcularTempoRestante = () => {
      const hoje = new Date();
      const [horas, minutos] = data.time.split(":").map(Number); // Pegando os valores de horas e minutos
      const dataInicialDate = new Date(hoje);
      dataInicialDate.setHours(horas, minutos, 0, 0); // Definindo o horário correto

      // Se a hora já passou hoje, consideramos para o próximo dia
      if (dataInicialDate.getTime() < hoje.getTime()) {
        dataInicialDate.setDate(dataInicialDate.getDate() + 1);
      }

      const diferencaTempo = dataInicialDate.getTime() - hoje.getTime();
      const diferencaSegundos = Math.ceil(diferencaTempo / 1000);

      const segundosRestantes = diferencaSegundos % 60;
      const minutosRestantes = Math.floor(diferencaSegundos / 60) % 60;
      const horasRestantes = Math.floor(diferencaSegundos / 3600) % 24;

      setTempoRestante({
        dias: 1,
        horas: horasRestantes,
        minutos: minutosRestantes,
        segundos: segundosRestantes,
      });
    };

    // Atualizar o contador a cada segundo
    const interval = setInterval(calcularTempoRestante, 1000);
    calcularTempoRestante(); // Atualiza imediatamente

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center w-full  ">
      <div className="flex justify-center items-center ">
        <p className="text-center p-2 font-bold text-xl">Próxima Alimentação</p>
      </div>
      <div className="flex flex-row items-center justify-center w-2/12 max-md:w-4/12 max-sm:w-10/12">
        {tempoRestante.dias > 0 && (
          <>
            <div className="flex flex-row justify-center items-center max-sm:w-9/12 w-full pb-2">
              <div className="pl-2  pb-2 pt-2 flex flex-row justify-end rounded-s border-l border-t border-b border-collapse text-xl bg-black text-white font-bold max-sm:w-1/4">
                <p className="max-sm:ml-22">{tempoRestante.horas}</p>
                <p>:</p>
              </div>
              <div className="pb-2 pt-2 flex flex-row border-t border-b border-collapse text-xl bg-black text-white font-bold gap-1">
                <p>{tempoRestante.minutos}</p>
                <p>:</p>
              </div>
              <div className="pr-2 max-sm:pr-0 pb-2 pt-2 flex flex-row rounded-e border-r border-t border-b border-collapse text-xl bg-black text-white font-bold max-md:w-2/4 ">
                <p>{tempoRestante.segundos} horas</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PetFeedingCountdown;
