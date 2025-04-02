"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function FeedingScheduleForm() {
  const [isRecurring, setIsRecurring] = useState(true);
  const [timesPerDay, setTimesPerDay] = useState("1");
  const [feedingTimes, setFeedingTimes] = useState<string[]>([""]);

  const handleTimesChange = (index: number, value: string) => {
    const newTimes = [...feedingTimes];
    newTimes[index] = value;
    setFeedingTimes(newTimes);
  };

  const handleSubmit = () => {
    console.log({ isRecurring, timesPerDay, feedingTimes });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Agendar Alimentação</h2>

      <div className="flex items-center justify-between">
        <Label>Horário Recorrente</Label>
        <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
      </div>

      {isRecurring && (
        <div>
          <Label>Quantas vezes por dia?</Label>
          <Select
            onValueChange={(value) => {
              setTimesPerDay(value);
              setFeedingTimes(Array(Number(value)).fill(""));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 vez</SelectItem>
              <SelectItem value="2">2 vezes</SelectItem>
              <SelectItem value="3">3 vezes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {isRecurring &&
        feedingTimes.map((time, index) => (
          <div key={index}>
            <Label>Horário {index + 1}</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => handleTimesChange(index, e.target.value)}
            />
          </div>
        ))}

      <Button onClick={handleSubmit} className="w-full">
        Salvar Horários
      </Button>
    </div>
  );
}
