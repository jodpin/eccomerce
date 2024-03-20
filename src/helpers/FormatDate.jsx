

export const FormatDate = date => {
    // la funcion new Date tiene comportamientos extraños
    // va a salir una nueva api que se llama temporal
    // por eso lo hacemos de la siguiente manera

  const newDate = new Date(date.split('T')[0].split('-'));

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return newDate.toLocaleDateString('es-Es', options);
}
