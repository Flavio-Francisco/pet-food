import axios from "axios";
import { PetFeedingCountdownProps } from "../api/food/route";



export async function updateFoodControl(id: number, food: PetFeedingCountdownProps) {
  try {
    const response = await axios.patch(
      `/api/food?id=${id}`,
      food,
    
    );

    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar FoodControl:", error);
    throw error;
  }
}
