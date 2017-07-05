export function formatDate(date){
  if(date.getHours()<18){
    date.setDate(date.getDate() - 1);
  }
  let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  return `${new Date(date - tzoffset).toISOString().slice(0, 10)} 08:00:00`;
}