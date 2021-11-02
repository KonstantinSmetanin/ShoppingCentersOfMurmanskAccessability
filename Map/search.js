function callFlyToWithId(id){
    for (m of markerDict){
        if (m.properties.id === id){
            m.flyTo()
        }
    }
}

function updateResult(query){
    let resultList = document.getElementById('searchResults')
    resultList.innerHTML =  ''

    if(query !== ''){
        markerDict.map( (el) => {
            if (
                (el.properties.title.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1)
                ?true
                :(
                    (el.properties.psudo !== null) 
                    ?(el.properties.psudo.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1)
                    :false
                )
            ){
                resultList.innerHTML +=    `<form>
                                                <button type="button" class="searchResult" onclick="callFlyToWithId(${el.properties.id})">
                                                    ${el.properties.title}<br>
                                                    ${el.properties.address}
                                                </button>
                                            </form>`
            }
        })
    }
}