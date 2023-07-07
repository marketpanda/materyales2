export const countTiles = (e) => {

    let tiles = e / .36
    return tiles
}

export const countAdhesive = (e) => {
    //3kg per square meter
    let adhesive = e * 3
    return adhesive
}


export const countGrout = (e) => {
    let grout = e / 4.8 //kg
    return grout
}