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
    let btn, frm

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
                btn = document.createElement('button')
                btn.type = 'button'
                btn.classList = 'searchResult'
                btn.onclick = () => callFlyToWithId(el.properties.id)
                btn.innerHTML = `${el.properties.title}<br>${el.properties.address}`

                frm = document.createElement('form')
                frm.appendChild(btn)
                resultList.appendChild(frm)
            }
        })
    }
}