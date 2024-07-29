export const checkUserAndMeditation = (req: string) => {
  // Expressão regular para encontrar o nome e o tipo de meditação
  const regex = /Olá, me chamo (.+)\. Gostaria de receber as meditações (dos|das) (.+)/;
  const matches = req.match(regex);

  if (matches) {
    const nome = matches[1];
    const tipoMeditacao = matches[3];
    return { nome, tipoMeditacao };
  } else {
    return { nome: null, tipoMeditacao: null };
  }
}
