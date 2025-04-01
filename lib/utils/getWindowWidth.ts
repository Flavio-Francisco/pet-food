// Função para obter o tamanho da tela
export function getWindowWidth(): number {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0; // Retorna 0 caso esteja no lado do servidor (SSR)
  }
  
  // Exemplo de uso:
  const width = getWindowWidth();
  console.log("Largura da janela:", width);
  