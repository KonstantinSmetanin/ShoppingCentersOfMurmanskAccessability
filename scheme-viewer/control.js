//moving image with dragging

let x, y, savedX = 0, savedY = 0
let isPressed = false

const sidebar = document.getElementById('sidebar')
const actionLayer = document.getElementById('action-layer')

const onMouseDown = (e) => {
    x = e.offsetX
    y = e.offsetY
    isPressed = true
}

const onMouseMove = (e) => {
    if (isPressed){
        actionLayer.style.backgroundPosition = `left ${savedX + e.offsetX - x}px top ${savedY + e.offsetY - y}px`                
    }
}

const onMouseUp = (e) => {
    savedX += e.offsetX - x
    savedY += e.offsetY - y
    actionLayer.style.backgroundPosition = `left ${savedX}px top ${savedY}px`
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

const schemeSelection = document.getElementById('scheme-selection')

//get id of schemeSet 
let params = new URLSearchParams(window.location.search)
let id = params.get('id')

//func to change displayed scheme 
function changeScheme(schemeID){
    actionLayer.style.backgroundImage = `url('../schemes/${id}/${schemeID}.png')`
    changeButtonColor(schemeID)
    reset()
}

//scheme changing menu

let selectionButton 
let mapButtons = new Map()

//adding buttons for every scheme
schemeSets[id].schemeNumbers.forEach(i => {
    mapButtons.set(i, document.createElement('button'))
    mapButtons.get(i).classList = 'selection-button btn'
    mapButtons.get(i).innerText = `Этаж ${i}`
    mapButtons.get(i).onclick = () => changeScheme(i) 
    mapButtons.get(i).style.backgroundColor
    schemeSelection.appendChild(mapButtons.get(i))
})

// func to change buttons color 
function changeButtonColor(i) {
    for (j of mapButtons.keys()){
        if (i === j)
            mapButtons.get(j).style.backgroundColor = '#c83349'
        else
            mapButtons.get(j).style.backgroundColor = '#622569'
    }
}

//change scheme initially
changeScheme(1)

//show legend

const legend = document.getElementById('legend')
let elementLegend, imageLegend, textLegend

//adding elements of legend
schemeSets[id].legendElements.forEach(i => {
    elementLegend = document.createElement('div')
    elementLegend.classList = 'element-legend'

    imageLegend = document.createElement('img')
    imageLegend.src = `../schemes/elements/${i}.png`
    imageLegend.classList = 'legend-icon'
    elementLegend.appendChild(imageLegend)

    // textLegend = document.createElement('span')
    textLegend = document.createElement('figcaption')
    textLegend.innerText = ` - ${legendDescription.get(i)}`
    textLegend.classList = 'text-legend'
    elementLegend.appendChild(textLegend)

    legend.appendChild(elementLegend)
})