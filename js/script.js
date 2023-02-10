console.log("Ioannis Papapetrou");

//l’utente clicca su un pulsante PLAY  per generare la una griglia quadrata 10 * 10
const btnPlayElement = document.querySelector(".btn-play");
const gridElement = document.querySelector(".grid");

btnPlayElement.addEventListener("click", startGame);
//console.log('click');



//Quando l’utente clicca su una cella: se il numero della cella è presente nella lista dei numeri generati
//- abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
//Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
//La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile
//di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
//Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato
//su una cella che non era una bomba.

let level = 10
let cellNumber

//FUNZIONI

function startGame() {
	resetGame();
	gridGenerator(level);
	//Generiamo le bombe
	//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta:

	bombGenerator();
	
	const cellElements = document.querySelectorAll(".cell");
	
	for (let i = 0; i < cellElements.length; i++) {
		const cell = cellElements[i];
		
		cell.addEventListener("click", function () {
			console.log(i + 1);
			cell.classList.add("bg-violet");
		});
	}
	//console.log(cellElements);
}

function gridGenerator(gridSide) {
	cellNumber = gridSide ** 2;
	//console.log(gridSide, cellNumber)

	for (let i = 0; i < cellNumber; i++) {
		let cellInner = i + 1;
		//console.log(cellInner)

		//creo elemento html

		let widthCalc = `calc(100% / ${gridSide})`;

		//creo elemento html
		const cellElement = document.createElement("div");
		cellElement.classList.add("cell");
		cellElement.style.width = widthCalc;
		//const cellElement = `<div class="cell" style="width: calc(100% / ${gridSide});" >${cellInner}</div>`;

		//lo "appendo" nel dom
		gridElement.appendChild(cellElement);
		//gridElement.innerHTML += cellElement;

		//ogni casella deve contenere il numero corrispondente a partire da 1 fino a 100
		cellElement.innerHTML = cellInner;
	}

}

function resetGame() {
	gridElement.innerHTML = "";
}

function randomNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	const number = Math.floor(Math.random() * (max - min + 1) + min);
	return number;
}

function bombGenerator() {
	const bomb = [];

	while (bomb.length < 16) {
		let bombRandom = randomNumber(1, cellNumber);
		//facendo attenzione che: nella stessa cella può essere posizionata al massimo una bomba,
		//perciò nell’array delle bombe non potranno esserci due numeri uguali.
		if (!bomb.includes(bombRandom)) {
			bomb.push(bombRandom);
		}
		console.log(bomb);
	}
}