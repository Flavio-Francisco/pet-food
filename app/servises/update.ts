import axios from "axios";

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function updatePassword(id:number,payload: UpdatePasswordPayload) {
  try { 
    const response = await axios.patch(`/api/update-password?id=${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    throw error;
  }
}
