# null-image-effects
This is a program for Null containing blocks for basic image manipulation. Check out Null here: https://github.com/matt-way/0x00

## Included blocks
- image-loader
- gif-file-loader
- image-effects
- image2canvas
- rgb-split

## Notes

### image-effects
The image-effects block contains basic image manipulation features. It only recieves data, manipulates it, and sends it forward. It does not draw anything on a canvas. Works with regular images and gifs.
- All effects activated by checkboxes to prevent unecessary calculations.
- All effects are applied to imageData in one loop. 

### rgb-split
Splits RGB channels in different directions. Works with regular images and gifs.
- Can be placed before or after other blocks for desired effect.

### image2canvas
The image2canvas block is simply used to draw whatever imageData it recieves on a canvas.

## Other
These blocks can be used in other programs such as the LCD screen program.

## Images

<img width="1161" src="https://user-images.githubusercontent.com/22250686/161390879-7318566d-42ed-456d-b1a3-988cec6b59d4.png">

<img width="1037" src="https://user-images.githubusercontent.com/22250686/161390680-b422024e-f705-43cb-a143-49101405f422.png">


