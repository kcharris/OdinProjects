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
const player1 = Player('player1')
const player2 = Player('player2')

const displayController = function(){
  let freezeGame = false
  let renderGame = function(){
    if (!freezeGame){
      let board = function(gameBoard){
        let nodes = document.querySelectorAll("#gameBoard input")
        let b = gameBoard.readBoard()
        for(let i = 0; i < 9; i++){
          nodes[i].setAttribute('value', b[i])
        }    
      }(gameBoard)
      if (gameBoard.checkStatus()){
        freezeGame = true
        if (gameBoard.checkStatus() == 1){
          let div = document.querySelector('.gameMessage')
          div.innerHTML = `${player1.name} wins!`
          player1.plusScore()
        }
        else if (gameBoard.checkStatus() == 2){
          let div = document.querySelector('.gameMessage')
          div.innerHTML = `${player2.name} wins!`
          player2.plusScore()
        }
        
        else if (gameBoard.checkStatus() == 3){
          let div = document.querySelector('.gameMessage')
          div.innerHTML = `It's a tie.`
        }
      }
    }
    let changeName = function(player){
      let btn = document.createElement('input')
      btn.setAttribute('type', 'button')
      btn.setAttribute('value', 'ChangeName')
      btn.addEventListener('click', () => {
        let playerDiv = document.getElementById(player.id)
        playerDiv.innerHTML = ""
        let inputText = document.createElement('input')
        inputText.setAttribute('type', 'text')
        inputText.setAttribute('class', `${player.id}Change`)
        let inputBtn = document.createElement('input')
        inputBtn.setAttribute('type', 'button')
        inputBtn.setAttribute('value', 'Submit')
        inputBtn.addEventListener('click', () => {
          player.name = document.querySelector(`.${player.id}Change`).value
          playerDiv.innerHTML = player.name + ': ' + player.readScore()
          playerDiv.append(changeName(player))
        })
        playerDiv.append(inputText)
        playerDiv.append(inputBtn)
      })
      return btn
    }
    let player = function(player){
      div = document.getElementById(player.id)
      div.innerHTML = player.name + ': ' + player.readScore()
      div.append(changeName(player))
    }
    player(player1)
    player(player2)
  }
  createBoard = function(){ //Buttons have logic that calls renderGame
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
      freezeGame = false
      document.querySelector('.gameMessage').innerHTML = ' '
      renderGame()})
    resetBtn.append(inputBtn)
  }()
}();