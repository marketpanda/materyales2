export const countPlanks = (e) => {
    //150mm x 1200mm, .18m, 5.55 multiplier
    let pl = e * 5.55
    return pl
}

export const countAdhesive = (e) => {
    let adhesive = e * .111
    return adhesive
}