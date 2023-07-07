export const countCHB = (e) => {
    let CHB = e * 12.5
    return CHB
}

export const countDowels = (e) => {
    let dowels = e * 6 / 6
    return dowels
}

export const countPlastering = (e) => {
    let plaster = e * .025
    return plaster
}


export const countMortarCement = (e) => {
    // *.7 bags of cement
    let mortarCement = 0.7 * e
    return mortarCement
}

export const countMortarSand = (e) => {
    // * .07 cubic meter
    let mortarSand = 0.07 * e
    return mortarSand
}   

export const countPlasterCement = (e) => {
    // .24 bags of cement
    let plasterCement = .24 * e
    return plasterCement
}

export const countPlasterSand = (e) => {
    // .02 cubic meter
    let plasterSand = 0.02 * e
    return plasterSand
}
