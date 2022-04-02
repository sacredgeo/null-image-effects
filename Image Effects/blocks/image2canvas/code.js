if (!state.imageData) {
  md`No imageData connected.`
  return
}

runOnce(() => {
  html`<canvas id="c"/>`
})

const canvas = element.querySelector('#c')
const ctx = canvas.getContext('2d')

const width = state.imageData.width
const height = state.imageData.height

ctx.canvas.width = state.imageData.width
ctx.canvas.height = state.imageData.height
ctx.putImageData(state.imageData, 0, 0)
