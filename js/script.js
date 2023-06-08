console.log('JS OK');

// Recupero gli elementi dal DOM
const grid = document.getElementById('grid'); // GRIGLIA
const play = document.getElementById('play'); // BOTTONE
const difficulty = document.getElementById('difficulty'); // DIFFICOLTÁ
const bombNumber = document.getElementById('bomb-number'); // Numero di BOMBE
// Numero di celle
let numberOfCell;
let numberOfBomb;

// Al click del bottone gioca
play.addEventListener('click', function () {
    // Faccio apparire la griglia
    grid.classList.remove('d-none');

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

    // Elimino le "vecchie celle" prima di generare le nuove
    grid.innerText = '';

    // Genero le celle
    for (let i = 0; i < numberOfCell; i++) grid.innerHTML += `<div class="cell"></div>`;

    const cell = document.querySelectorAll('.cell'); // CELLE
    console.log('Numero di celle: ', cell.length);

    // Assegno i numeri in sequenza a tutte le celle
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerText = i + 1;


        //! Al click sulle celle
        cell[i].addEventListener('click', function () {
            cell[i].classList.toggle('active');
            const x = i + 1;// Numero della cella cliccata
            console.log('Cliccata cella numero: ', x);

            // Genera celle con le bombe
            // Array con i numeri random
            const bomb = [];
            let randomNumber;
            for (let i = 0; i < numberOfBomb; i++) {
                do {
                    randomNumber = Math.floor((Math.random() * cell.length) + 1);
                } while (bomb.includes(randomNumber) || randomNumber === x) // Estrae tot numeri tutti diversi tra loro e diversi dal numero della cella cliccata

                bomb.push(randomNumber);
            }
            console.table(bomb);

            for (let i = 0; i < bomb.length; i++) {
                console.log(bomb[i])
                cell[bomb[i] - 1].classList.add('bomb');
                cell[bomb[i] - 1].innerText = '';
            }

            // Controllo di quante bombe ci sono intorno alla cella selezionata
            const bombArray = [cell[i - (Math.sqrt(cell.length) - 1)].className, cell[i - (Math.sqrt(cell.length))].className, cell[i - (Math.sqrt(cell.length) + 1)].className, cell[i - 1].className, cell[i].className, cell[i + 1].className, cell[i + (Math.sqrt(cell.length) - 1)].className, cell[i + (Math.sqrt(cell.length))].className, cell[i + (Math.sqrt(cell.length) + 1)].className]
            console.table(bombArray)
            console.log((Math.sqrt(cell.length)))
            console.log(cell[i])
            console.log('i uguale ', i)
            console.log(cell[i - (Math.sqrt(cell.length))].className)

            let counter = 0;
            for (let i = 0; i < bombArray.length; i++) {
                if (bombArray[i] === 'cell bomb') {
                    counter += 1;
                }
            }

            // Numero delle bombe adiacenti alla cella cliccata
            if (counter === 1) {
                cell[i].classList.add('one-bomb');
                cell[i].innerText = '';
            } else if (counter === 2) {
                cell[i].classList.add('two-bomb');
                cell[i].innerText = '';
            } else if (counter === 3) {
                cell[i].classList.add('three-bomb');
                cell[i].innerText = '';
            } else if (counter === 4) {
                cell[i].classList.add('for-bomb');
                cell[i].innerText = '';
            } else if (counter === 5) {
                cell[i].classList.add('five-bomb');
                cell[i].innerText = '';
            } else if (counter === 6) {
                cell[i].classList.add('six-bomb');
                cell[i].innerText = '';
            }
            console.log('Contatore: ', counter)

        })
    }

}) 
