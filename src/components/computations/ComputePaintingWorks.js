
export const countSkimCoat = (e) => {
    //for better results, use two coats of skimcoat
    let twoSkimCoats = e * 2

    //20 kg for each bag
    let bags = twoSkimCoats / 20
    return bags
}

export const countPrimer = (e) => {
    //25sqm per 4-liter can
    let primers = e / 25
    return  primers 
}

export const countTopCoat = (e) => {
    //25sqm per 4-liter can
    let topCoats = e / 25
    return topCoats 
}

export const countSandpaper = (e) => {
    let sandpapers = e / 5
    return sandpapers 
}

export const countRollerBrush = (e) => {
    let rollerBrushes = e / 40
    return rollerBrushes 
}