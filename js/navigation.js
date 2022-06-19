export function pageNavigation() {
  document.querySelector(".add-entry").addEventListener("click", () => {
    document.querySelector(".entries").classList.add("display-none");
    document.querySelector(".subscription-info").classList.add("display-none");
    document.querySelector(".new-entry-form").classList.remove("display-none");
  });

  document.querySelector(".home").addEventListener("click", () => {
    document.querySelector(".new-entry-form").classList.add("display-none");
    document.querySelector(".subscription-info").classList.add("display-none");
    document.querySelector(".entries").classList.remove("display-none");

    const subInfo = document.querySelector(".subscription-info");

    //subInfo.removeChild(document.querySelector(".info"));

    if (subInfo.lastElementChild) {
      const info = document.querySelector(".info");
      info.remove();
    }
  });

  const showEntry = () => {
    for (let element of document.querySelectorAll(".entry")) {
      element.addEventListener("click", () => {
        document.querySelector(".entries").classList.add("display-none");
        document
          .querySelector(".subscription-info")
          .classList.remove("display-none");
        let id = element.getAttribute("id");
        let retrievedData = JSON.parse(localStorage.getItem(id));
        //console.log(retrievedData);
        document.querySelector(".subscription-info").insertAdjacentHTML(
          "afterbegin",
          `<div class="info">
          <div class="logo">${retrievedData.service[0]}</div>
          <div class="name-and-price">
            <div class="name">
              <h3>${retrievedData.service}</h3>
            </div>
            <div class="recurrence-info">
              <p>Monthly Subscription</p>
            </div>
            <div class="price-info">
              <h2>$ ${retrievedData.price}</h2>
            </div>
          </div>
          <div class="other-info">
            <div class="next-payment-date">
              <p>Next Payment Date</p>
              <p>${new Date(retrievedData.date).nextDate(
                retrievedData.recurrence,
              )}</p>
            </div>
            <div class="days-left">
              <p>Days Left</p>
              <p>${daysLeft(
                new Date(retrievedData.date).nextDate(retrievedData.recurrence),
              )} day(s)</p>
            </div>
          </div>
          <div class="delete">Delete</div>
        </div>`,
        );
      });
    }
  };

  const daysLeft = (date) => {
    let today = new Date().toLocaleDateString();
    today = new Date(today);
    // console.log(today);
    let dateDue = new Date(date);
    // console.log(dateDue);
    let diff = dateDue.getTime() - today.getTime();
    // console.log(diff);
    let dayDiff = diff / (1000 * 60 * 60 * 24);
    // console.log(dayDiff);
    return dayDiff;
  };

  const entries = document.querySelector(".entries");
  if (entries.lastElementChild.classList.contains("entry")) {
    showEntry();
  }
}
