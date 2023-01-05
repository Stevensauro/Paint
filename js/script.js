let canvas = document.querySelector("canvas")
let pincel = canvas.getContext("2d")

pincel.fillStyle = 'gray'
pincel.fillRect(0, 0, 2000, 2400)

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;
  
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    }
}

const backPath1 = new Path2D()
const colorPath1 = new Path2D()
const backPath2 = new Path2D()
const colorPath2 = new Path2D()
const backPath3 = new Path2D()
const colorPath3 = new Path2D()

backPath1.rect(0, 0, 40, 40)
pincel.fillStyle = 'black'
pincel.fill(backPath1)
colorPath1.rect(2, 2, 36, 36)
pincel.fillStyle = 'red'
pincel.fill(colorPath1)

backPath2.rect(40, 0, 40, 40)
pincel.fillStyle = 'black'
pincel.fill(backPath2)
colorPath2.rect(42, 2, 36, 36)
pincel.fillStyle = 'green'
pincel.fill(colorPath2)

backPath3.rect(80, 0, 40, 40)
pincel.fillStyle = 'black'
pincel.fill(backPath3)
colorPath3.rect(82, 2, 36, 36)
pincel.fillStyle = 'blue'
pincel.fill(colorPath3)

let color = 'blue'

canvas.addEventListener('click', (e)=>{
    
    if (dibujar){
        dibujar = false
        return
    }
    
    const red = pincel.isPointInPath(backPath1, e.offsetX, e.offsetY)

    const green = pincel.isPointInPath(backPath2, e.offsetX, e.offsetY)

    const blue = pincel.isPointInPath(backPath3, e.offsetX, e.offsetY)

    if (red){
        color = 'red'
        console.log(color + ' ' + red) 
    }  else if(green){
        color = 'green'
        console.log(color + ' ' + green) 
    } else if(blue){
        color = 'blue'
        console.log(color + ' ' + blue)
    }
})

//cliping area
pincel.beginPath()
pincel.moveTo(0, 40)
pincel.lineTo(120, 40)
pincel.lineTo(120, 0)
pincel.lineTo(2000, 0)
pincel.lineTo(2000, 2400)
pincel.lineTo(0, 2400)
pincel.lineTo(0, 40)
pincel.closePath()
pincel.clip()
//cliping area

pincel.lineWidth = 10;
pincel.lineCap = "round";

let dibujar = false

function empezarDibujo(e) {
    dibujar = true
    pincel.beginPath()
    dibujarEnClick(e)
}

function pararDibujo(e) {
    dibujar = false
}

window.addEventListener("mousedown", empezarDibujo)
window.addEventListener("mouseup", pararDibujo)


function dibujarEnClick(e) {

    if (!dibujar) return

    let { x, y } = getMousePos(canvas, e);

    pincel.strokeStyle = color
    pincel.lineTo(x, y);
    pincel.stroke();
}



window.addEventListener("mousemove", dibujarEnClick);


