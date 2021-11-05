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
                        <input type="button" class="btn"value="Схема" onclick="window.location='./scheme-viewer/scheme-viewer.html?id=${properties.id}'"></input>`)
            )
            .addTo(map)
    )
}
