const board = document.getElementById("game-board");

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

initGame();
