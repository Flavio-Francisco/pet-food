import jwt from "jsonwebtoken";
type User = {
  name: string;
  id: number;
};

export function decodeToken(token: string) {
  if (!token) return null;
  const user :User|null=jwt.decode(token) as User;
  try {
    return  user
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}
