document.querySelector(".control span").onclick = function () {
    let name = prompt("What's Your name?");
    this.parentElement.remove();
    if(name==null || name == ""){
        name = "unKnown"
    }
    document.querySelector(".name span").appendChild(document.createTextNode(name));
    
}
let div = document.querySelector(".game_memory");
let timeFlib = setInterval
let block_cont = document.querySelectorAll(".memory_block");
let blocks = Array.from(block_cont);
let range = [...Array(blocks.length).keys()];

shuffle(range);

blocks.forEach((ele,index)=>{
    ele.style.order = range[index];
    ele.addEventListener("click",(e)=>{
        flibBlock(ele)
    })
})



function shuffle(array) {

    let current = array.length,
        temp,
        random;
  
    while (current > 0) {
  
      random = Math.floor(Math.random() * current);
      current--;
      temp = array[current];
      array[current] = array[random];
      array[random] = temp;
  
    }
    return array;
}
function flibBlock (ele) {
    ele.classList.add("isFlibed");
    let allFlibed = blocks.filter((block)=>block.classList.contains("isFlibed"));
    if(allFlibed.length === 2){
        stopClick ();
        checking(allFlibed[0],allFlibed[1]);

    }
}

function stopClick () {
    div.classList.add("pointer");
    let time = setTimeout(()=>{
      div.classList.remove("pointer");
    },1000);    
}
function checking(a,b){
    let wrong = document.querySelector(".tries span");
    if(a.dataset.nature === b.dataset.nature){
        document.getElementById("success").play();
        a.classList.remove("isFlibed");
        b.classList.remove("isFlibed");
        a.classList.add("checked");
        b.classList.add("checked");
        final();
    }
    else {
        document.getElementById("fail").play();
        wrong.innerHTML = parseInt(wrong.innerHTML) +1;
        setTimeout(()=>{
            a.classList.remove("isFlibed");
        b.classList.remove("isFlibed");
          },1000);    
       
    }
}
function final(){
    let u =0;
    blocks.forEach((ele)=>{
        if(ele.classList.contains("checked")){
            u++;
   
        }
    })
    if(u === blocks.length) {
        div.classList.add("pointer");
        let pop = document.createElement("div");
        let span = document.createElement("span");
        let textpop = document.createTextNode("you win");
        span.appendChild(textpop)
        pop.appendChild(span);
        pop.style.cssText = "position: fixed; width: 100%; height: 100%; z-index: 2; background-color: rgba(3, 169, 244, .9); top: 0; left: 0;"
        span.style.cssText = "    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); background-color: #f44336; color: #fff; padding: 15px 25px; font-size: 30px; text-align: center; border-radius: 6px; "
        document.body.appendChild(pop)
    }
}