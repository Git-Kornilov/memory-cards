"use strict";

const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Add cards to localStorage
const setCardsData = (cards) => {
  localStorage.setItem("cards", JSON.stringify(cards));
  //   reload page
  window.location.reload();
};

// Get cards DATA from locale storage
const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
};

// Store card DATA
const cardsData = getCardsData();

// Show number of card
const updateCurrentText = () => {
  currentEl.innerText = `
	${currentActiveCard + 1} / ${cardsEl.length}
	`;
};

// Create a single card in DOM
const createCard = (data, indx) => {
  const card = document.createElement("div");
  card.classList.add("card");

  // for first card
  if (indx === 0) card.classList.add("active");

  card.innerHTML = `
	<div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>

        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
  `;

  //   addEventListener for flip card
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  //Add card to DOM cards
  cardsEl.push(card);

  // Add card to DOM
  cardsContainer.appendChild(card);

  // Change current number of card
  updateCurrentText();
};

// Create all cards
const createCards = () => {
  cardsData.forEach((data, indx) => createCard(data, indx));
};

createCards();

// Move cards - next/prev
const moveCard = (path, indx) => {
  cardsEl[currentActiveCard].className = `card ${path}`;

  currentActiveCard = currentActiveCard + indx;

  if (currentActiveCard > cardsEl.length - 1)
    currentActiveCard = cardsEl.length - 1;

  if (currentActiveCard < 0) currentActiveCard = 0;

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
};

// Add new card from add-form
const addNewCard = () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    // const newCard = { question: question, answer: answer }
    const newCard = { question, answer };

    createCard(newCard);

    // Clear input form
    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    // to localStorage
    setCardsData(cardsData);
  }
};

// Clear local storage
const clearCardsData = () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  //   reload page
  window.location.reload();
};

// All addEventListener
// Next / prev arrows
nextBtn.addEventListener("click", () => moveCard("left", 1));
prevBtn.addEventListener("click", () => moveCard("right", -1));

// Show/hide add-form for new card (addContainer)
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add data to new card
addCardBtn.addEventListener("click", addNewCard);

// Clear local storage
clearBtn.addEventListener("click", clearCardsData);
