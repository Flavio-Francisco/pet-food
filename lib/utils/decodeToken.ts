import jwt from "jsonwebtoken";

export function decodeToken(token: string) {
  if (!token) return null;
  
  try {
    return jwt.decode(token); // Apenas lê os dados, sem validar
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}
