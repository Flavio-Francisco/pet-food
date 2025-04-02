import axios from "axios";

export async function getAppellant(id: number) {
    try {
      const response = await axios.get(`/api/appellant?id=${id}`);
  
      console.log("Resposta da API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar horario:", error);
      throw error;
    }
  }