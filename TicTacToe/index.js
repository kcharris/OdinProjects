const gameBoard = function(){
  
  let board = [1,2,3,4,5,6,7,8,9]
  let turn = 0
  let player1Piece = 'X'
  let player2Piece = 'O'
  const boardReset = function(){
    board = [1,2,3,4,5,6,7,8,9]
    turn = 0
  }
  const playMove = function(x){
    if (/[1-9]/.test(x.toString())){
      if(turn == 0){
        board[x-1] = 'X'
        turn = 1
      }
      else {
        board[x-1] = 'O'
        turn = 0
      }
    }
  }
  const readBoard = () => board;
  const checkStatus = function() {  //returns 0 for nothing 1 for player1 2 for player2 and 3 for tie
    let str = readBoard().join("")
    let p1 = player1Piece
    let p2 = player2Piece
    const drawChecker = function(str){
      if (/[1-9]+/.test(str)){
        return false
      }
      else return true
    }
    const winChecker = function(p){
      const verticalCheck = function(y){ //meant to take 0 1 2 which are indexes of bottom row
        return (str[y] + str[y + 3] + str[y + 6])
      }
      let end = false
      switch (p + p + p){
        case str.slice(0,3):
          end = true
        case str.slice(3,6):
          end = true
        case str.slice(6,9):
          end = true
        case verticalCheck(0):
          end = true
        case verticalCheck(1):
          end = true
        case verticalCheck(2):
          end = true
        case (str[0] + str[4] + str[8]):
          end = true
        case (str[2] + str[4] + str[6]):
          end = true
      }
      return end
    }
    if (winChecker(p1)){
      return 1
    }
    else if (winChecker(p2)){
      return 2
    }
    else if (drawChecker(str)){
      return 3
    }
    else return 0
  }
  return {playMove,boardReset,readBoard, checkStatus}
}();
const Player = function(str){
  let name = str
  const id = str
  let score = 0
  const plusScore = () => {score++}
  const readScore = () => {return score}
  return {name, plusScore, readScore, id}
}
player1 = Player('player1')
player2 = Player('player2')

const displayController = function(){
  let renderGame = function(){
    if (gameBoard.checkStatus()){
      if (gameBoard.checkStatus() == 1){
        let div = document.getElementById('gameBoard')
        player1.plusScore()
      }
      else if (gameBoard.checkStatus() == 2){
        let div = document.getElementById('gameBoard')
        player2.plusScore()
      }
      
      else if (gameBoard.checkStatus() == 3){
        let div = document.getElementById('gameBoard')
      }
      gameBoard.boardReset()
    }
    let player = function(player){
      div = document.getElementById(player.id)
      div.innerHTML = player.name + ': ' + player.readScore()
    }
    let board = function(gameBoard){
      let nodes = document.querySelectorAll("#gameBoard input")
      let b = gameBoard.readBoard()
      for(let i = 0; i < 9; i++){
        nodes[i].setAttribute('value', b[i])
      }    
    }(gameBoard)
    player(player1)
    player(player2)
  }
  createBoard = function(){ //Buttons have logic that call renderGame
    div = document.getElementById("gameBoard")
    div.innerHTML = ' '
    for(let i = 1; i < 10; i ++){
      let btn = document.createElement('input')
      btn.setAttribute('value', i)
      btn.setAttribute('type', 'button')
      btn.addEventListener('click', function(){
        gameBoard.playMove(this.getAttribute("value"))
        renderGame()
      })
    div.append(btn)
    }
    renderGame()
  }();
  addResetBtn = function(){
    let resetBtn = document.getElementById('reset')
    let inputBtn = document.createElement('input')
    inputBtn.setAttribute('type','button')
    inputBtn.setAttribute('value','RESET')
    inputBtn.addEventListener('click', () => {
      gameBoard.boardReset()
      renderGame()})
    resetBtn.append(inputBtn)
  }()
}();