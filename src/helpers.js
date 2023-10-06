export const formatTimeNumbers = (timestamp) => {
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
};

export const formatTimeMixed = (timestamp) => {
  const minutes = Math.floor(timestamp / 60);
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const newMinutes = minutes % 60;
    return `${hours} hr ${newMinutes} min`;
  }
  const seconds = Math.floor(timestamp % 60);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes} min ${formattedSeconds} sec`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};
