//moving image with dragging

let x, y, savedX = 0, savedY = 0
let isPressed = false

const sidebar = document.getElementById('sidebar')
const actionLayer = document.getElementById('actionLayer')

const onMouseDown = (e) => {
    x = e.offsetX
    y = e.offsetY
    sidebar.innerHTML = 'pressed'
    sidebar.innerHTML += `<br>X: ${savedX}<br>Y: ${savedY}`
    isPressed = true
}

const onMouseMove = (e) => {
    if (isPressed){
        actionLayer.style.backgroundPosition = `left ${savedX + e.offsetX - x}px top ${savedY + e.offsetY - y}px`                
        sidebar.innerHTML = 'moving'
        sidebar.innerHTML += `<br>X: ${savedX + e.offsetX - x}<br>Y: ${savedY + e.offsetY - y}`
    }
}

const onMouseUp = (e) => {
    savedX += e.offsetX - x
    savedY += e.offsetY - y
    actionLayer.style.backgroundPosition = `left ${savedX}px top ${savedY}px`
    sidebar.innerHTML = 'not' 
    sidebar.innerHTML += `<br>X: ${savedX}<br>Y: ${savedY}`
    isPressed = false   
}

actionLayer.addEventListener('mousedown', onMouseDown)
actionLayer.addEventListener('mouseup', onMouseUp)
actionLayer.addEventListener('mousemove', onMouseMove)

//func to center map 
function center(){
    savedX = 0;
    savedY = 0;
    actionLayer.style.backgroundPosition = 'left 0px top 0px'
}

//zooming with scrolling

let zoom = 80

document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0){
        actionLayer.style.backgroundSize = `${zoom *= 0.9}vw`
    }
    else{
        actionLayer.style.backgroundSize = `${zoom *= 1.1}vw`
    }
})

//func to reset zoom 
function unzoom(){
    zoom = 80
    actionLayer.style.backgroundSize = '80vw'
}

//func to set everything back
function reset(){
    center()
    unzoom()
}

//change scheme to display

const schemeSelection = document.getElementById('schemeSelection')

//get id of schemeSet 
let params = new URLSearchParams(window.location.search)
let id = params.get('id')

//change scheme initially
actionLayer.style.backgroundImage = `url('../schemes/${id}/1.png')`

//func to change displayed scheme 
function changeScheme(schemeID){
    actionLayer.style.backgroundImage = `url('../schemes/${id}/${schemeID}.png')`
    reset()
}

for (i of schemeSets[id].schemeNumbers){
    schemeSelection.innerHTML += `<button onclick="changeScheme(${i})">floor ${i}</button><br>`
}

//show legend
const legend = document.getElementById('legend')

for (el of schemeSets[id].legendElements){
    legend.innerHTML += `<image class="legendIcon" src="../schemes/elements/${el}.png"></image>`
    legend.innerHTML += `- ${legendDescription.get(el)}`
    legend.innerHTML += '<br>'
}