let turn = "X";
let is_game_over = false;
let count = 0;

//to change players turn
const change_turn = () => {
    return turn === "X" ? "0" : "X";
}

// 012
// 345
// 678
//checking if any one of the player has own
const check_win = () => {
    let boxtext = document.getElementsByClassName("box");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach(e => {
        if (boxtext[e[0]].innerText == boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText == boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText != '') {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " won";
            is_game_over = true;
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    });
}

//handling click event of player and switching the position of players 
//this is the main game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            count++;
            boxtext.innerText = turn;
            turn = change_turn();
            if(count>=9){
                document.querySelector('.info').innerText = "It's draw"; 
                is_game_over=true;
            }
            check_win();
            //game is not over yet display turn change for the player
            if (!is_game_over) {
                document.querySelector('.info').innerText = "Turn for " + turn;
            }
        }
    })
})

//resetting the game to original 
reset.addEventListener('click', () => {
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(element => {
        let boxtext = element.querySelector('.boxtext');
        boxtext.innerText = '';
    });
    count = 0;
    turn = "X";
    is_game_over = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    document.querySelector(".line").style.width = "0vw";
});
