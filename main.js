"use strict";
const playerName = "";
const playerPoints = 0;

const game = () => {

  let board = ["","","","","","","","",""];
  const winCombos = [[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8]];
  const playerOne = `<svg class="symbol x"><use href="#x"></use></svg>`;
  const playerTwo = `<svg class="symbol o"><use href="#o"></use></svg>`;
  let isPlayerOTurn = false;
  let gameOver = false;
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.getElementById('reset');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close__modal');
  
  // this function clear the cells and reset the game
  const resetGame = () => {
    gameOver = true;
    // reset the player one as the first player
    isPlayerOTurn = false
    // reset the board
    board = ["","","","","","","","",""];
    // empty the grid
    cells.forEach((cell) =>  cell.innerHTML = "");
    // restart the game
    gameOver = false;
  }

  // event listener for reset button
  resetButton.addEventListener('click', resetGame);

  // this function shows the modal with a custom message
  const showModal = (message) => {
    let div = document.createElement('div');
    div.classList.add('modal__message');
    div.innerText = message;
    modal.insertAdjacentElement("afterbegin", div)
    modal.showModal();

    closeModal.addEventListener('click', () => {
      div.innerText = "";
      modal.close();
      resetGame();
    })
  }

  // this functions alternates the inner html for the cell
  const currentPlayer = () => {
    const currentPlayer = isPlayerOTurn ? playerTwo : playerOne;
    isPlayerOTurn = !isPlayerOTurn;
    return currentPlayer;
  }

  // check if there is an empty slot in the board
  const checkSlot = (id) => {
    return board[id] === "";
  }

  // this functions checks is the board array is not c
  const checkDraw = () => {
    return !board.some((mark) => mark === "")
  }

  // check if there is a win combination or draw
  const checkWin = (player) => {
    if(checkDraw()){
      gameOver = true;
      showModal('draw')
      return;
    };

    for(const winPos of winCombos) {
      if(board[winPos[0]] === player && board[winPos[1]] === player && board[winPos[2]] === player) {
      gameOver = true;

      player === "x" ? showModal(`player wins the game`) : showModal(`computer wins the game`)
      
      return;
      }
    }
  }

  // this functions add event listener to every cell and 
  // inserts the current player into the clicked cell
  // and tracks the moves by inserting the corresponding mark into board array
  const clickCell = (e) => {
    // select cell
    const cell = e.target;

    //switch players to fill the board with moves
    let player = isPlayerOTurn ? "o" : "x";
    
    // check if game is over
    if(gameOver) {
      //console.log('game over');
      return;
    } else {
      if(checkSlot(cell.id)) {
      cell.innerHTML = currentPlayer();
      board[cell.id] = player;
      } 
    }
    checkWin(player);
  }

  const play = () => {
    if(gameOver === false){
      cells.forEach((cell) => {
        cell.addEventListener('click', clickCell)
      })
    } else return;   
  }

  play()
}

game();
