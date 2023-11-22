import { animalEmojis, funnyPetEpitaphs, petNames } from "./data.js";

let petArray = [];

function generateRandomPet() {
  const newPet = {
    id: Date.now(),
    emoji: animalEmojis[Math.floor(Math.random() * animalEmojis.length)],
    name: petNames[Math.floor(Math.random() * petNames.length)],
    hunger: 0,
    love: 100,
    isAlive: true,
    epitaph: `"${
      funnyPetEpitaphs[Math.floor(Math.random() * funnyPetEpitaphs.length)]
    }"`,
  };
  petArray.push(newPet);
}

function generateCards(pet) {
  let petCard = document.createElement("div");
  petCard.className = "pet-card";

  let petEmoji = document.createElement("p");
  petEmoji.textContent = pet.emoji;
  petEmoji.className = "pet-emoji";
  petEmoji.addEventListener("click", () => handleLove(pet));

  let petName = document.createElement("p");
  petName.textContent = pet.name;
  petName.className = "pet-name";

  let hunger = document.createElement("p");
  hunger.textContent = "Hunger:";
  hunger.className = "hunger";

  let hungerBar = document.createElement("div");
  hungerBar.className = "hunger-bar";
  let hungerFill = document.createElement("div");
  hungerFill.className = "hunger-fill";
  hungerFill.style.width = `${pet.hunger}%`;
  hungerBar.appendChild(hungerFill);

  let love = document.createElement("p");
  love.textContent = "Love:";
  love.className = "love";

  let loveBar = document.createElement("div");
  loveBar.className = "love-bar";
  let loveFill = document.createElement("div");
  loveFill.className = "love-fill";
  loveFill.style.width = `${pet.love}%`;
  loveBar.appendChild(loveFill);

  let button = document.createElement("button");
  button.textContent = "Feed Me!🍞";
  button.addEventListener("click", () => feedPet(pet));

  petCard.appendChild(petEmoji);
  petCard.appendChild(petName);
  petCard.appendChild(hunger);
  petCard.appendChild(hungerBar);
  petCard.appendChild(love);
  petCard.appendChild(loveBar);
  petCard.appendChild(button);

  if (!pet.isAlive) {
    petCard.classList.add("dead-pet");
    let epitaph = document.createElement("p");
    epitaph.textContent = pet.epitaph;
    epitaph.className = "pet-epitaph";
    petCard.appendChild(epitaph);
  }

  cardContainer.appendChild(petCard);
}

function render() {
  cardContainer.replaceChildren();
  for (let pet of petArray) {
    generateCards(pet);
  }
}

//handles love and hunger bars
function updateStats() {
  for (let pet of petArray) {
    if (pet.hunger === 100 || pet.love === 0) {
      pet.isAlive = false;
    } else {
      pet.hunger += 1;
      pet.love -= 1;
    }
  }
}

//onclick handlers
function feedPet(pet) {
  if (pet.hunger > 0) {
    pet.hunger = 0;
    render();
  }
}

function handleLove(pet) {
  if (pet.love < 100) {
    pet.love = 100;
    render();
  }
}

let isAllAlive = true;
let cardContainer = document.querySelector("#cards-container");

function spawnPet() {
  generateRandomPet();
  render();
}

const petInterval = setInterval(function () {
  if (!isAllAlive) {
    clearInterval(petInterval);
  } else {
    spawnPet();
  }
}, 30000);

spawnPet();

const statInterval = setInterval(() => {
  updateStats();
  render();
  isAllAlive = petArray.every((pet) => pet.isAlive);
  if (!isAllAlive) {
    clearInterval(statInterval);
    alert("Game Over!");
  }
}, 1000);

render();

// function spawnPet() {
//   generateRandomPet();
//   render();
//   if (isAllAlive) {
//     setTimeout(spawnPet, 30000);
//   }
// }

// spawnPet();
