export default function hora(hora) {
  hora = Date.parse(hora);

  const now = Date.now();

  const diff = (now - hora) / 1000;

  if (diff > 86400) {
    const dias = diff / 86400;
    return `${Math.round(dias)} d`;
  }
  if (diff > 3600) {
    const horas = diff / 3600;
    return `${Math.round(horas)} h`;
  }

  if (diff > 60) {
    const seg = diff / 60;
    return `${Math.round(seg)} min`;
  }

  return "1 min";
}
