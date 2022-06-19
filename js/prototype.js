export const nextDatePrototype = () => {
  Date.prototype.nextDate = function (recurrence) {
    const dateTime = new Date(this.valueOf());
    let day = dateTime.getDate();
    let month = dateTime.getMonth();
    let year = dateTime.getFullYear();
    switch (recurrence) {
      case "daily":
        day += 1;
        break;
      case "weekly":
        day += 7;
        break;
      case "monthly":
        month += 1;
        break;
      case "yearly":
        year += 1;
        break;
      default:
        break;
    }
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day} ${months[month]} ${year}`;
  };
};
