export const countPhenolic = (e) => {
  let phenolicCount = e / 2.88
  return phenolicCount
}

export const countCement = (e) => {
  let cement = e * 12
  return cement
}

export const countSand = (e) => {
  let countSands = e / 2
  return countSands 
}

export const countGravel = (e) => {
  let countGravels = e
  return countGravels
}

export const countTenMm = (e) => {
  let countGravels = e
  return countGravels
}

export const count16mm = (e) => {
  let rebarsLength = e * 2
  return (rebarsLength / 6)
}

export const countCocolumber2x3 = (e) => {

//20m of 2x4 / sqm
  return ((e * 20) / 6 )
}

export const countTieWire = (e) => {
//.006kg per sqm
return (e * .006)
}




