import React from 'react'


export const countPhenolic = (e) => {
    var phenolicCount = e / 2.88
    return phenolicCount.toFixed(2)
  }

export const countCement = (e) => {
  var cement = e * 12
  return cement.toFixed(2)
}

export const countSand = (e) => {
  var countSand = e / 2
  return countSand.toFixed(2)
}

export const countGravel = (e) => {
  var countGravel = e
  return countGravel.toFixed(2)
}

export const countTenMm = (e, f, g) => {
  var rebarsLength = 0
  var lCount = 0
  var wCount = 0

  if (e && f) {
    lCount = ( e / .1 ) + 1
    wCount = ( f / .1 ) + 1
    rebarsLength = (lCount * f) + (wCount * e)
  } else if (g) {
    var side = Math.sqrt(g)
    lCount = ( side / .1 ) + 1

    rebarsLength = (lCount * side) * 2

  }
  //divide by 6m commercial length
  return (rebarsLength / 6).toFixed(2)
}

export const countCocolumber2x4 = (e) => {

  //20m of 2x4 / sqm
  return (e * 20) / 6
}

export const countTieWire = (e) => {
  //.006kg per sqm
  return (e * .006)
}

 


 