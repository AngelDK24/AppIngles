let resultElement = document.querySelector('.result');
let mainContainer = document.querySelector('.main-container');
let rowId = 1;

// Lista de 100 palabras en inglés
const wordsList = [
    "apple", "banana", "cherry", "grape", "lemon", "orange", "peach", "pear", "plum", "berry",
    "mango", "melon", "kiwi", "olive", "leek", "tomato", "pepper", "carrot", "onion", "garlic",
    "broccoli", "potato", "cabbage", "spinach", "celery", "lettuce", "radish", "turnip", "beet",
    "parsley", "basil", "mint", "thyme", "sage", "cumin", "clove", "nutmeg", "ginger", "cardamom",
    "salt", "sugar", "honey", "butter", "cream", "cheese", "yogurt", "milk", "water", "juice",
    "soda", "coffee", "tea", "cake", "bread", "pasta", "noodle", "rice", "beans", "corn", "peas",
    "wheat", "oats", "barley", "rye", "buckwheat", "almond", "walnut", "cashew", "peanut", "hazelnut",
    "chicken", "beef", "pork", "lamb", "duck", "fish", "crab", "shrimp", "lobster", "oyster",
    "salt", "spice", "meat", "tofu", "egg", "ham", "bacon", "sausage", "ketchup", "mustard",
    "mayo", "vinegar", "oil", "soup", "stew", "chili", "curry", "pizza", "sushi", "taco"
];

// Seleccionar una palabra aleatoria del arreglo
let word = wordsList[Math.floor(Math.random() * wordsList.length)];
let worArry = word.toLowerCase().split('');
console.log("Word to guess:", worArry);

// Configurar la primera fila del juego
let actualRow = document.querySelector('.row');
drawSquares(actualRow);
listenInput(actualRow);

// Funciones del juego
function listenInput(currentRow) {
    let squares = [...currentRow.querySelectorAll('.square')];
    squares[0].focus();

    let userInput = new Array(squares.length).fill('');

    squares.forEach((element, index) => {
        element.addEventListener('input', event => {
            if (event.inputType === 'deleteContentBackward') {
                userInput[index] = '';
                return;
            }

            userInput[index] = event.target.value.toLowerCase();

            if (event.target.nextElementSibling) {
                event.target.nextElementSibling.focus();
            } else {
                let finaluserInput = squares.map(square => square.value.toLowerCase());

                // Marcar letras correctas en posiciones incorrectas (dorado)
                let existIndexArray = existLetter(worArry, finaluserInput);
                existIndexArray.forEach(idx => squares[idx].classList.add('gold'));

                // Marcar letras en posiciones correctas (verde)
                let rightIndexes = compareArrayx(worArry, finaluserInput);
                rightIndexes.forEach(idx => squares[idx].classList.add('green'));

                // Verificar si el usuario ha ganado
                if (rightIndexes.length === worArry.length) {
                    showResult('Ganaste');
                    return;
                }

                // Crear una nueva fila para el siguiente intento
                let newRow = createRow();
                if (newRow) {
                    drawSquares(newRow);
                    listenInput(newRow);
                }
            }
        });
    });
}

// Función para comparar el arreglo original con el ingresado por el usuario
function compareArrayx(arr1, arr2) {
    let equalsIndexes = [];
    arr1.forEach((element, index) => {
        if (element === arr2[index]) {
            equalsIndexes.push(index);
        }
    });
    return equalsIndexes;
}

// Función para encontrar las letras que existen en la palabra pero están en la posición incorrecta
function existLetter(arr1, arr2) {
    let existIndexArray = [];
    arr2.forEach((element, index) => {
        if (arr1.includes(element) && arr1[index] !== element) {
            existIndexArray.push(index);
        }
    });
    return existIndexArray;
}

// Función para crear una nueva fila de cuadros
function createRow() {
    rowId++;
    if (rowId <= 6) {
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.setAttribute('id', rowId); // Asignar el id numérico
        mainContainer.appendChild(newRow);
        return newRow;
    } else {
        showResult(`Inténtalo de nuevo, la respuesta correcta era "${word.toLowerCase()}"`);
        return null;
    }
}

// Función para dibujar los cuadros en la fila
function drawSquares(currentRow) {
    worArry.forEach(() => {
        currentRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
    });
}

// Función para mostrar el resultado final
function showResult(textMsg) {
    resultElement.innerHTML = `<p>${textMsg}</p><button class="button" onclick="location.reload()">Reiniciar</button>`;
}
