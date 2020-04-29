const player = (name, symbol) => {
  return {
    name,
    symbol
  };
};

const gameBoard = (() => {
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const boardSpots = document.querySelectorAll(".board-spot");

  boardSpots.forEach((spot, i) => {
    spot.addEventListener("click", legalMove);
    spot.setAttribute("data", i);
  });

  function legalMove() {
    move = this.getAttribute("data")
    if (gameState[move] == "") {
      addMove(move)
    } else {
      console.log("spot taken idiot")
    }
  }

  function addMove(move) {
    console.log(move);
    gameState[move] = "X";
  }

  function render() {
    gameState.forEach((spot, i) => {
      boardSpots[i].innerHTML = spot;
    });
  }

  return {
    gameState
  };
})();

const game = (() => {
  function currentPlayer() {

  }

  function render() {

  }
})();