let rock = document.getElementById("rock-btn");
let paper = document.getElementById("paper-btn");
let scissor = document.getElementById("scissor-btn");
let reset = document.getElementById("reset-btn");
let result_label = document.getElementById("result-label");

let rock_com = document.getElementById("rock-com-btn");
let paper_com = document.getElementById("paper-com-btn");
let scissor_com = document.getElementById("scissor-com-btn");

let hasil_suit;

let array_com = ["Batu","Gunting","Kertas"];

class comAction {
    static com_choosing() {
        let random_com = Math.floor(Math.random() * 3);
        console.log("com: " + array_com[random_com]);

        let hasil_com = array_com[random_com];
        
        if(hasil_com === "Batu") {
            rock_com.classList.add("com-choose-suit");
        } else if(hasil_com === "Kertas") {
            paper_com.classList.add("com-choose-suit");
        } else{
            scissor_com.classList.add("com-choose-suit");
        }

        return hasil_com;

        //Math.floor((Math.random() * 10) + 1);
        //document.getElementById("demo").innerHTML = Math.random();
    }
}

class validate_hasilSuit extends comAction{
    static validate_suit(pilihan_player) {
       let hasil_com = comAction.com_choosing();

       console.log("hasil com : " + hasil_com);

       if((hasil_com === "Batu" && pilihan_player === "Kertas") || (hasil_com === "Gunting" && pilihan_player === "Batu") || (hasil_com === "Kertas" && pilihan_player === "Gunting")){
            // return player win
            hasil_suit = "Player 1 Win";
       } else if(hasil_com === pilihan_player) {
            // draw
            hasil_suit = "Draw";
       } else {
            // return com win
            hasil_suit = "Com Win";
       }
 
       console.log(hasil_suit);
       return hasil_suit;
    }
}

// setelah suit
function disableButton() {
    document.getElementById("rock-btn").disabled = true;
    document.getElementById("paper-btn").disabled = true;
    document.getElementById("scissor-btn").disabled = true;
}

// setelah klik reset
function enableButton() {
    document.getElementById("rock-btn").disabled = false;
    document.getElementById("paper-btn").disabled = false;
    document.getElementById("scissor-btn").disabled = false;
}

// nampilin hasil result
function showResultLabel() {
    //result_label
    result_label.innerText = hasil_suit;     

    result_label.classList.add("lbl-hasil-suit");
    
}

rock.addEventListener("click", function(){
    console.log("Batu"); 
    rock.classList.add("btn-choose-suit");

    validate_hasilSuit.validate_suit("Batu");

    disableButton();
    showResultLabel();
})

paper.addEventListener("click", function () {
    console.log("Kertas"); 
    paper.classList.add("btn-choose-suit");

    validate_hasilSuit.validate_suit("Kertas");
    disableButton();
    showResultLabel();
})

scissor.addEventListener("click", function() {
    console.log("Gunting"); 
    scissor.classList.add("btn-choose-suit");

    validate_hasilSuit.validate_suit("Gunting");
    disableButton();
    showResultLabel();
})

reset.addEventListener("click", function() {
    rock.classList.remove("btn-choose-suit");
    paper.classList.remove("btn-choose-suit");
    scissor.classList.remove("btn-choose-suit");

    rock_com.classList.remove("com-choose-suit");
    paper_com.classList.remove("com-choose-suit");
    scissor_com.classList.remove("com-choose-suit");

    result_label.innerText = "VS";
    result_label.classList.remove("lbl-hasil-suit");

    enableButton();
})
