import { pageNavigation } from "./navigation.js";
import { nextDatePrototype } from "./prototype.js";

/*
Written Prototype 
*/

nextDatePrototype();

const fields = {
  form: document.querySelector(".form"),
  service: document.querySelector(".service"),
  price: document.querySelector(".price"),
  datePaid: document.querySelector(".date_paid"),
  recurrence: document.querySelector(".recurrence"),
  freeTrial: document.querySelector(".free_trial"),
};

const sliceWord = (word) => {
  if (word == "daily") {
    word = word.slice(0, word.length - 3) + "y";
  } else {
    word = word.slice(0, word.length - 2);
  }

  return word;
};

let number;
let store;
if (JSON.parse(localStorage.getItem(`number`)) >= 1) {
  number = JSON.parse(localStorage.getItem(`number`));
} else {
  number = 1;
}

if (JSON.parse(localStorage.getItem(`store`)) !== null) {
  store = JSON.parse(localStorage.getItem(`store`));
} else {
  store = [];
}

/* Load Data from local storage */
const loadContent = () => {
  for (let key of store) {
    let data = JSON.parse(localStorage.getItem(key));
    //console.log(data);
    document.querySelector(".entries").insertAdjacentHTML(
      "beforeend",
      `<div class="entry" id="${key}">
          <div class="logo">${data.service[0]}</div>
          <div class="entry-info">
            <p class="company">${data.service}</p>
            <p class="rate">$ ${data.price}/${sliceWord(data.recurrence)}</p>
            <div class="payment-date">
              <p class="text">Next Payment Date</p>
              <p class="date">${new Date(data.date).nextDate(
                data.recurrence,
              )}</p>
            </div>
          </div>
        </div>`,
    );
    //console.log(`${key}: ${JSON.parse(localStorage.getItem(key))}`);
  }
};

loadContent();

fields.form.addEventListener("submit", (event) => {
  // event.preventDefault();

  formValidation();

  if (formValidation()) {
    localStorage.setItem("number", JSON.stringify(number));
    localStorage.setItem("store", JSON.stringify(store));

    insertEntry();
    fields.form.reset();
  }
});

const formValidation = () => {
  if (fields.service.value.trim() == "") {
    console.log("Field cannot be empty");
    return false;
  } else if (fields.price.value.trim() == "") {
    console.log("Field cannot be empty");
    return false;
  } else if (!fields.datePaid.value) {
    console.log("Field cannot be empty");
    return false;
  } else if (fields.recurrence.value == "title") {
    console.log("Field cannot be empty");
    return false;
  } else {
    console.log("Input filled");
    return true;
  }
};

const insertEntry = () => {
  let savedData = {
    date: new Date(fields.datePaid.value),
    service: fields.service.value,
    price: fields.price.value,
    recurrence: fields.recurrence.value,
  };

  localStorage.setItem(`store${number}`, JSON.stringify(savedData));

  /* Load Data from local storage */
  let retrievedData = JSON.parse(localStorage.getItem(`store${number}`));

  document.querySelector(".entries").insertAdjacentHTML(
    "afterbegin",
    `<div class="entry" id="store${number}">
          <div class="logo">${retrievedData.service[0]}</div>
          <div class="entry-info">
            <p class="company">${retrievedData.service}</p>
            <p class="rate">$ ${retrievedData.price}/${sliceWord(
      retrievedData.recurrence,
    )}</p>
            <div class="payment-date">
              <p class="text">Next Payment Date</p>
              <p class="date">${new Date(retrievedData.date).nextDate(
                retrievedData.recurrence,
              )}</p>
            </div>
          </div>
        </div>`,
  );

  store.unshift(`store${number}`);
  localStorage.setItem("store", JSON.stringify(store));

  number += 1;
  localStorage.setItem("number", JSON.stringify(number));
};

/* 
Page Navigation Control
*/

pageNavigation();
