const player = (name, symbol) => {
  return { name, symbol };
};

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
    sym = game.currentTurn == 0 ? p1.symbol : p2.symbol;
    gameState[move] = sym;
    render()
    game.currentTurn = game.turnSwitch(game.currentTurn);
  }

  function render() {
    gameState.forEach((spot, i) => {
      boardSpots[i].innerHTML = spot;
    });
  }

  return {
    gameState, addMove
  };
})();



const game = (() => {
  const randomTurn = () => {
    let turn = Math.floor(Math.random() * 2);
    return turn
  }

  function turnSwitch(turn) {
    return turn == 0 ? 1 : 0;
  }

  // function checkWin {

  // }

  let currentTurn = randomTurn();

  const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]];

  return {currentTurn, turnSwitch};
})();

const p1 = Object.create(player("KEN", "X"));
const p2 = Object.create(player("JULIA", "O"));