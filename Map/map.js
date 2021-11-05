mapboxgl.accessToken = 'pk.eyJ1IjoiZmluaXQ5OTAwNiIsImEiOiJja3VvNW9jMmIwdjNyMm9wMWh5emJveDRpIn0.slXg3xsen3_8aD_QsOTNvQ'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [33.074918, 68.970663],
    zoom: 11,
    maxBounds: [
        [32.581393, 68.805421],
        [33.412376, 69.113479]
    ]
})

map.addControl(new mapboxgl.NavigationControl())

// here i'll try to safe markers in array for use in searching
function toMarkerDict (prop,  obj){
    return {
        'properties':   prop,
        'marker':       obj, 
        'flyTo':        () => {
            obj.togglePopup()
            map.flyTo({ center: obj.getLngLat() })
        }
    }
}

let markerDict = []

function toTitleList() {
     return markerDict.map( (x) => x.properties.title )
}

// add markers to map
for (const { geometry, properties } of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    markerDict[markerDict.length] = toMarkerDict(properties,  //here's a trick to remeber markers for searching
        new mapboxgl.Marker(el).setLngLat(geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${properties.title}</h3>
                        <p>${properties.address}</p>
                        <input type="button" class="btn"value="Схема" onclick="window.location='../scheme-viewer/scheme-viewer.html?id=${properties.id}'"></input>`)
            )
            .addTo(map)
    )
}

//test of adding marker to the map 
//IT WORKS
const el = document.createElement('div')            //so it will be in it's own <div> 
el.className = 'marker'                             //so it will be displayed with markers style

new mapboxgl.Marker(el)                             //creates a mapbox marker
    .setLngLat([33.068424, 68.961794])              //defines coordinates
    .setPopup(new mapboxgl.Popup({ offset: 25 })    //adds popup for marker { struct with 'offset' parameter }
    .setHTML(                                       //defines HTML inside it 
        '<h3>БАЛОВСТВО</h3>'
    ))
    .addTo(map)                                     //displayes result on the map 

console.log(markerDict[0].properties.psudo)