export function formatTimer(timeHashed){
  let {hours, minutes, seconds} = timeHashed;

  return `${formateTime(hours)} : ${formateTime(minutes)} : ${formateTime(seconds)}`;
}

export function hashTime(timeInSeconds){
  return {
    seconds: Math.floor(timeInSeconds % 60),
    minutes: Math.floor((timeInSeconds / 60) % 60),
    hours: Math.floor((timeInSeconds / (60*60)) % (60*60))
  };
}

function formateTime(timeToFormat){
  let time = timeToFormat.toString();
  if(time.length === 1){
    return `0${time}`;
  }
  else return `${time}`;
}