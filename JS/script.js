const board = document.getElementById("game-board");

let firstCard = null; 
let secondCard = null; 
let lockBoard = false; 
let moves = 0; 
let matchedCount = 0; 


let dimension = 150; 
let imgStart = Math.floor(Math.random() * 100) + 1; 
let cards = [];

const images = []; 

for (let i = imgStart; i <= imgStart + 7; i++) {
    images.push(`https://picsum.photos/id/${i}/${dimension}/${dimension}`);
}

cards = [...images, ...images]; 

function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1)); 

        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

function initGame(){
    board.innerHTML = ""; 

    shuffle(cards); 

    cards.forEach((Img) => {
        const card = document.createElement("div"); 
        card.classList.add("card"); 
        card.dataset.value = Img; 
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.addEventListener("click", () => handleCardClick(card));
        board.appendChild(card); 
    }); 
}

function handleCardClick(card){
    if (lockBoard || firstCard === card || card.classList.contains("matched") || card.firstChild){
        return; 
    }

    revealCard(card);

        if (!firstCard) {
            firstCard = card;
            return;
        }
        secondCard = card;
        lockBoard = true; 
        moves++; 
        
        checkMatch();
}

function revealCard(card) {
    const img = document.createElement("img");
    img.src = card.dataset.value;
    img.alt = "Image du Memory";
    card.appendChild(img);
}

function checkMatch(){
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if(isMatch === true){
        firstCard.classList.add("matched");  
        secondCard.classList.add("matched"); 

        matchedCount += 2; 
        resetTurn(); 
    } else {
        setTimeout(() => {
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
            resetTurn(); 
        }, 800);
    }
}

function resetTurn(){
    firstCard = null; 
    secondCard = null; 
    lockBoard = false;
}

initGame();
