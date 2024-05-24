let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGamebtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg")

let count = 0;
let turn0 = true;

const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const resetGame = () =>{
    turn0 = true;
    EnableBoxes();
    count =0;
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide");

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true
        count++;
        
        let isWinner = checkWinner();

        if (count == 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () =>{
    msg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    DisableBoxes()
    resetBtn.classList.add("hide");
};

const DisableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const EnableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    DisableBoxes();
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        
        if (val1 != "" && val2 != "" && val3 != "") {
            if(val1 === val2 && val2 === val3){
                console.log(`Winner ${val1}`);
                resetBtn.classList.add("hide");
                showWinner(val1);
                return true;
            }
        }
    }
};

newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);