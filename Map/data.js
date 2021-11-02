const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [33.110868, 68.960652]
            },
            properties: {
                id: 0,
                title: 'PLAZMA',
                psudo: 'плазма',
                address: 'Рогозерская 4'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [33.095705, 68.913702]
            },
            properties: {
                id: 1,
                title: 'Северное Нагорное',
                psudo: null,
                address: 'Кольский проспект 158'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [33.070579, 68.956546]
            },
            properties: {
                id: 2,
                title: 'Murmansk Mall',
                psudo: 'мурманск молл',
                address: 'Проспект Ленина 32'
            }
        }
    ]
}