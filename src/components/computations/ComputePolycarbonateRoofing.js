export const polycarbonate = (e) => {
  let polyC = e / 2.88
  return polyC
}

export const primaryFrame = (a=0, b=0, c=0) => {
  a = Number(a)
  b = Number(b)
  c = Number(c)

  let perimeter = 0

  if (c > 0) {
    //if area is given, we consider it a square, get the square root and multiply to 4
    perimeter = Math.sqrt(c) * 4
  } else {
    perimeter = (a + b) * 2
  }

  console.log('numbers', a, b, c)
 
  return perimeter
}

export const secondaryFrame = (a=0, b=0, c=0) => {
  //use the usual 40cm (max) interval (mimics floor joists)
  a = Number(a)
  b = Number(b)
  c = Number(c)

  let joistLength = 0
  let numJoists = 0

  if (c > 0) {
    joistLength = Math.sqrt(c)
    if (c > 0.4) {

      numJoists = Math.floor(c / 0.4)

    }
  } else {
    
    if (a < b) {
      joistLength = a
      numJoists = Math.floor(b / 0.4)
    } else {
      joistLength = b
      numJoists = Math.floor(a / 0.4)
    }
  }
 
  return (joistLength * numJoists)
}

export const screw = (e) => {
  return e * 2
}

export const epoxyPrimer = (e) => {
  return e
}

export const paint = (e) => {
  return e
}

export const weldingRods = (e) => {
  return e 
}