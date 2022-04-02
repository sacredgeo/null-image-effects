if (!state.imageDataIn) {
  md`No imageData connected.`
  return
}

function hslToRgb(h, s, l) {
  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [255 * f(0), 255 * f(8), 255 * f(4)]
}

function rgbToHsl(r, g, b) {
  ;(r /= 255), (g /= 255), (b /= 255)
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max == min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return [h * 360, s, l]
}

const originalArray = state.imageDataIn.data
const newArray = new Uint8ClampedArray(originalArray)

for (let i = 0; i < originalArray.length; i += 4) {
  //invert
  if (state.invert_color) {
    newArray[i] = 255 - newArray[i]
    newArray[i + 1] = 255 - newArray[i + 1]
    newArray[i + 2] = 255 - newArray[i + 2]
  }
  //grayscale
  if (state.gray_scale) {
    let average =
      newArray[i] * 0.21 + newArray[i + 1] * 0.72 + newArray[i + 2] * 0.07
    newArray[i] = average
    newArray[i + 1] = average
    newArray[i + 2] = average
  }
  if (state.BRIGHT_CONTRAST) {
    //brightness
    newArray[i] += 255 * (state.brightness / 100)
    newArray[i + 1] += 255 * (state.brightness / 100)
    newArray[i + 2] += 255 * (state.brightness / 100)
    //contrast
    let factor = (259 * (state.contrast + 255)) / (255 * (259 - state.contrast))
    newArray[i] = factor * (newArray[i] - 128.0) + 128.0
    newArray[i + 1] = factor * (newArray[i + 1] - 128.0) + 128.0
    newArray[i + 2] = factor * (newArray[i + 2] - 128.0) + 128.0
  }
  //shift hue
  if (state.SHIFT_HUE && !state.gray_scale) {
    let hslColor = rgbToHsl(newArray[i], newArray[i + 1], newArray[i + 2])
    let rgbColor = hslToRgb(
      (hslColor[0] + state.shift_hue_by) % 360,
      hslColor[1],
      hslColor[2]
    )
    newArray[i] = rgbColor[0]
    newArray[i + 1] = rgbColor[1]
    newArray[i + 2] = rgbColor[2]
  }
  //fill
  if (state.FILL && state.fill_amount > 0) {
    newArray[i] += Math.round(
      (state.fill_color.rgb.r - newArray[i]) / (1 / state.fill_amount)
    )
    newArray[i + 1] += Math.round(
      (state.fill_color.rgb.g - newArray[i + 1]) / (1 / state.fill_amount)
    )
    newArray[i + 2] += Math.round(
      (state.fill_color.rgb.b - newArray[i + 2]) / (1 / state.fill_amount)
    )
  }
}

state.imageDataOut = new ImageData(
  newArray,
  state.imageDataIn.width,
  state.imageDataIn.height
)
