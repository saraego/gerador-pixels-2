let container = document.querySelector(".container")//ok
let gridButtonCreate = document.getElementById("submit-grid")//ok
let clearGridButton = document.getElementById("clear-grid")//ok
let gridWidth = document.getElementById("width-range");//ok
let gridHeight = document.getElementById("height-range");//ok
let colorButton = document.getElementById("color-input")//ok
let eraseBtn = document.getElementById("erase-btn")//ok
let paintBtn = document.getElementById("paint-btn")
let widthValue = document.getElementById("width-value");//ok
let heightValue = document.getElementById("height-value");//ok


let events = {
    mouse:{
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch:{
        down:"touchstart",
        mobe: "touchmove",
        up : "touchend"
    }
};

let deviceType = "";

let draw = false;
let erase = false;

const isToucheDevice =()=>{
    try{
        document.createEvent("TouchEvent");
        deviceType = "touch"
        return true
    }catch(e){
        deviceType = "mouse";
        return false
    }
};

isToucheDevice()

gridButtonCreate.addEventListener("click",()=>{
    container.innerHTML = "";
    console.log("ola");
    let count = 0;
    for(let i = 0; i < gridHeight.value; i++){
        count+= 2
        let div = document.createElement("div");
        div.classList.add("gridRow")

        for(let j = 0; j < gridWidth.value; j++){
            count+=2;
            let col = document.createElement("div");
            col.classList.add("gridCol")
            col.setAttribute("id", `gridCol${count}`)
            col.addEventListener(events[deviceType].down, ()=>{
                draw = true;
                if(erase){
                    col.style.backgroundColor = "transparent"
                }else{
                    col.style.backgroundColor = colorButton.value;
                }
            });
            col.addEventListener(events[deviceType].move, (e)=>{
                let elementId = document.elementFromPoint(
                    !isToucheDevice() ? e.clientX : e.touches[0].clientX,
                    !isToucheDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId)
            });

            col.addEventListener(events[deviceType].up, ()=>{
                draw = false;
            })
            div.appendChild(col)
        }

        container.appendChild(div)
    }
})

function checker(elementId){
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach(element =>{
        if(elementId == element.id){
            if(draw && !erase){
                element.style.backgroundColor = colorButton.value;
            }else if(draw && erase){
                element.style.backgroundColor = "transparent"
            }
        }
    })
}



clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});


gridWidth.addEventListener('input',()=>{
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
})

gridHeight.addEventListener('input',()=>{
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
})

window.onload =()=>{
    gridWidth.value = 0;
    gridHeight.value = 0;
};