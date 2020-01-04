const gameBoard = function(){
  
  let board = [1,2,3,4,5,6,7,8,9]
  let turn = 0
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
  const readBoard = () => board
  return {playMove,boardReset,readBoard}
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
    let player = function(player){
      div = document.getElementById(player.id)
      div.innerHTML = player.name + ': ' + player.readScore()
    }
    player(player1)
    player(player2)
    let board = function(gameBoard){
      nodes = document.querySelectorAll("#gameBoard input")
      let b = gameBoard.readBoard()
      for(let i = 0; i < 9; i++){
        nodes[i].setAttribute('value', b[i])
      }    
    }(gameBoard)    
  }
  createBoard = function(){
    div = document.getElementById("gameBoard")
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