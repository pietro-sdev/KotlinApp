export const fixDate = (date) => {
    if (!!date) {
      let newDate = new Date(date);
      newDate = newDate.toISOString().split("T")[0];
      return newDate;
    }
    else
      return ""
  };