"use client";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import FeedingScheduleForm from "@/components/FeedingScheduleForm";
import PetFeedingCountdown from "@/components/PetFeedingForm";
import { useSession } from "@/context/user";
import Image from "next/image";

export default function HomePage() {
  const { user } = useSession();
  if (user?.id === undefined) {
    return (
      <Stack spacing={2} direction="row" alignItems="center">
        <CircularProgress size={60} />
      </Stack>
    );
  }
  return (
    <div className="flex justify-center items-center flex-col w-full h-full ">
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
      <PetFeedingCountdown />
      <FeedingScheduleForm />
    </div>
  );
}
