import FeedingScheduleForm from "@/components/FeedingScheduleForm";
import PetFeedingCountdown from "@/components/PetFeedingForm";

type FeedingTime = {
  time: string;
};
export default function HomePage() {
  const times: FeedingTime[] = [
    { time: "08:00" },
    { time: "12:00" },
    { time: "18:00" },
  ];
  return (
    <div className="flex justify-center items-center flex-col w-full h-full ">
      <PetFeedingCountdown times={times} />
      <FeedingScheduleForm />
    </div>
  );
}
