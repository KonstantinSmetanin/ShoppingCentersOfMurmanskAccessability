// const legendDescription = [
//     {
//         type: 'elevator',
//         description: 'лифт'
//     },
//     {
//         type: 'escalator',
//         description: 'эскалатор'
//     }
// ]

const legendDescription = new Map()
legendDescription.set('elevator', 'лифт')
legendDescription.set('escalator', 'эскалатор')
legendDescription.set('oneway', 'переход между этажами в одну сторону')
legendDescription.set('twoway', 'переход между этажами в обе стороны')