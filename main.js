let canvas = document.querySelector(".canvas"); // kalder canvas id
// sætter højden og bredden til vores window størrelse
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

const canvasBorder = canvas.getBoundingClientRect(); // finder canvas rektangel/grænser
const context = canvas.getContext("2d");

//canvas højde og bredde
const cWidth = canvas.width;
const cHeight = canvas.height;

const color = document.querySelector("#colors");
const size  = document.querySelector("#size");

const mouse =  { //objekt med musens position
    x: 0,
    y: 0,
    down: false // skal kun blive true når man trykker på mussen
};

function paint(){
    context.beginPath()
    context.fillStyle = color.value; //bruger den valgte farve
    context.arc(mouse.x,mouse.y,Math.abs(Number(size.value)), Math.PI * 2, false); //laver en circel baseret på #size input når man trykker på musen
    context.fill();
    context.closePath();
}

let penLine = [];
addEventListener("mousemove",function (e){
    mouse.x = e.clientX - canvasBorder.left;
    mouse.y = e.clientY - canvasBorder.top;// finder musens positon på canvas
    if (mouse.down){ //tjekker om man trykker på musen. hvis det er true pusher man musens position til arrayet penLine
        penLine.push({
            x: mouse.x,
            y: mouse.y
        })
        paint();
    }
})

addEventListener("mousedown",function (){  // hvis musen er trykket ned, er down true
    mouse.down = true;
})

addEventListener("mouseup",function (){ // hvis musen ikke er trykket på, er down false
    mouse.down = false;
    for (let i = 0; i < penLine.length - 1; i++) {// et loop der laver linjen fra hvert item/XY-punkt i penLine arrayet
        context.beginPath();
        context.strokeStyle = color.value;
        context.lineWidth = Number(size.value) * 2;
        context.moveTo(penLine[i].x, penLine[i].y);
        context.lineTo(penLine[i+1].x,penLine[i+1].y);
        context.stroke();
        context.closePath();
    }
    penLine = [];
})


//knapper
const saveImageBtn = document.querySelector("#saveImage")
const eraseBtn = document.querySelector("#erase")
const clearBtn = document.querySelector("#clearBtn")

eraseBtn.addEventListener("click", function(){
    color.value = "#ffffff"; //farven hvid bruges som eraser for at fjerne andre farver på canvas
})
clearBtn.addEventListener("click", function (){
    context.clearRect(0,0,cWidth,cHeight); // sletter alle pixels i canvas rectangel
})
saveImageBtn.addEventListener("click", function(){ // funktionen til at kunne gemme sin tegning i en jpeg fil.
    let data = canvas.toDataURL("image/jpeg")
    let a = document.createElement("a")
    a.href = data
    a.download = "Fetch&Paint-Art.jpeg"
    a.click()
})


