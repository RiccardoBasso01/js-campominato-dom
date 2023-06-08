console.log('JS OK');

// Recupero gli elementi dal DOM
const grid = document.getElementById('grid'); // GRIGLIA
const play = document.getElementById('play'); // BOTTONE
const difficulty = document.getElementById('difficulty'); // DIFFICOLTÁ
const bombNumber = document.getElementById('bomb-number'); // Numero di BOMBE
const score = document.getElementById('score'); // Punteggio

let numberOfCell; // Numero di celle
let numberOfBomb; // Numero di bombe
let currentScore = 0; // Punteggio

// Al click del bottone gioca
play.addEventListener('click', function () {
    // Faccio apparire la griglia
    grid.classList.remove('d-none');

    // Pulisco la griglia prima di generare le celle nuove
    grid.innerText = '';


    if (difficulty.value === 'easy') {
        grid.classList.add('easy');
        grid.classList.remove('medium');
        grid.classList.remove('hard');

        numberOfCell = '64';
        numberOfBomb = 10;
        bombNumber.innerText = '10 BOMBE';

    } else if (difficulty.value === 'medium') {
        grid.classList.remove('easy');
        grid.classList.add('medium');
        grid.classList.remove('hard');

        numberOfCell = '81';
        numberOfBomb = 20;
        bombNumber.innerText = '20 BOMBE';

    } else if (difficulty.value === 'hard') {
        grid.classList.remove('easy');
        grid.classList.remove('medium');
        grid.classList.add('hard');

        numberOfCell = '100';
        numberOfBomb = 30;
        bombNumber.innerText = '30 BOMBE';

    }

    console.log('Numero di celle: ', numberOfCell)

    // FUNZIOINE PER GENRARE LE CELLE
    const getBomb = () => {
        const bomb = []; // Array con i numeri random delle caselle-bomba
        let randomNumber;
        for (let i = 0; i < numberOfBomb; i++) {
            do {
                randomNumber = Math.floor((Math.random() * numberOfCell) + 1);
            } while (bomb.includes(randomNumber)) // Estrae tot numeri tutti diversi tra loro

            bomb.push(randomNumber);
        }
        return bomb;
    }
    // Genero le bombe
    const bombs = getBomb();
    console.log('I numeri delle caselle-bomba sono: ', bombs);



    // FUNZIOINE PER GENRARE LE CELLE
    const getCell = (numberOfCell, container) => {
        for (let i = 0; i < numberOfCell; i++) container.innerHTML += `<div class="cell"></div>`;
        return container;
    }
    // Genero le celle
    getCell(numberOfCell, grid);
    const cells = document.querySelectorAll('.cell'); // CELLE

    //Assegno alle celle-bomba la classe bomb
    for (let i = 0; i < bombs.length; i++) {
        cells[bombs[i] - 1].classList.add('bomb', 'disable-bomb');
        cells[bombs[i] - 1].innerText = '';

        console.log('Celle bomba: ', bombs[i])
    }

    const endGame = (result) => {
        for(let i = 0; i < cells.length; i++){
            cells[i].classList.remove('disable-bomb')
        }
        if (result === 'win'){
            alert('Hai vinto!')
        } else{
            alert('Hai perso!')
        }
    }

    // ciclo for per selezionare le celle all' interno dell' array cells
    for (let i = 0; i < cells.length; i++) {
        const currentCell = cells[i];
        // ! Al click sulle celle
        currentCell.addEventListener('click', function () {
            const isBomb = bombs.includes(i + 1)
            if(isBomb){
                cells[i].classList.remove('disable-bomb');
                endGame('lose');
            }else if(!(currentCell.classList.contains('active'))){
                currentCell.classList.add('active');
                score.innerText = ++currentScore;
                console.log(currentScore)
            }
            
            if(currentScore === (numberOfCell - numberOfBomb)){
                endGame('win');
            }

                // // Controllo di quante bombe ci sono intorno alla cella selezionata
                // const bombArray = [cells[i - (Math.sqrt(cells.length) + 1)].className, cells[i - (Math.sqrt(cells.length))].className, cells[i - (Math.sqrt(cells.length) - 1)].className, cells[i - 1].className, cells[i].className, cells[i + 1].className, cells[i + (Math.sqrt(cells.length) - 1)].className, cells[i + (Math.sqrt(cells.length))].className, cells[i + (Math.sqrt(cells.length) + 1)].className]
                // console.table(bombArray)
                // console.log('Numero delle colonne: ', (Math.sqrt(cells.length)))

                // let counter = 0;
                // for (let i = 0; i < bombArray.length; i++) {
                //     if (bombArray[i] === 'cell bomb' || bombArray[i] === 'cell bomb disable-bomb') {
                //         counter += 1;
                //     }
                // }

                // // Numero delle bombe adiacenti alla cella cliccata
                // if (counter === 1) {
                //     cells[i].classList.add('one-bomb');
                //     cells[i].innerText = '';
                // } else if (counter === 2) {
                //     cells[i].classList.add('two-bomb');
                //     cells[i].innerText = '';
                // } else if (counter === 3) {
                //     cells[i].classList.add('three-bomb');
                //     cells[i].innerText = '';
                // } else if (counter === 4) {
                //     cells[i].classList.add('for-bomb');
                //     cells[i].innerText = '';
                // } else if (counter === 5) {
                //     cells[i].classList.add('five-bomb');
                //     cells[i].innerText = '';
                // } else if (counter === 6) {
                //     cells[i].classList.add('six-bomb');
                //     cells[i].innerText = '';
                // }
                // console.log('Contatore: ', counter)
            
        })
    }
                    
})
