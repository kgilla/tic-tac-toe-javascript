const player = (name, symbol) => {
  return { name, symbol };
};

const p1 = Object.create(player("KEN", "X"));
const p2 = Object.create(player("JULIA", "O"));

const gameBoard = (() => {
  
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const boardSpots = document.querySelectorAll(".board-spot");

  boardSpots.forEach((spot, i) => {
    spot.addEventListener("click", legalMove);
    spot.setAttribute("data", i);
  });

  function legalMove() {
    move = this.getAttribute("data");
    gameState[move] == "" ? addMove(move) : console.log("spot taken idiot");
  }

  function addMove(move) {
    gameState[move] = game.currentTurn.symbol;
    game.checkWin()
    render()
    game.currentTurn = game.turnSwitch(game.currentTurn);
  }

  function render() {
    gameState.forEach((spot, i) => {
      boardSpots[i].innerHTML = spot;
    });
  }

  return {gameState, addMove, boardSpots};

})();

const game = (() => {
  
  const randomTurn = () => {
    let turn = Math.floor(Math.random() * 2);
    return turn == 0 ? p1 : p2;
  }

  function turnSwitch(turn) {
    turnCount == 9 ? tie() : turnCount++;
    return turn == p1 ? p2 : p1;
  }

  function checkWin() {
    winCombos.forEach(combo => {
      let counter = 0;
      combo.forEach(index => {
        if (gameBoard.gameState[index] == currentTurn.symbol) {
          counter++;
          if (counter == 3) win(combo); 
        } 
      });
    });
  }

  function win(combo) {
    combo.forEach(i => {
      gameBoard.boardSpots[i].classList.toggle("green");
    })
  }

  function lose() {
    console.log("loser");
  }

  function tie() {
    console.log("tie");
  }

  let turnCount = 1;
  let currentTurn = randomTurn();

  const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]];

  return {currentTurn, turnSwitch, checkWin};
})();

