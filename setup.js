const five = require('johnny-five')
const Oled = require('oled-js')

const board = new five.Board()
const width = 128
const height = 64
const address = 0x3C
const tileSize = 8

const vector = () => {
  return {
    x: 0,
    y: 0
  }
}

const createTile = (tile, screen) => {
  const num = Math.random()
  const lineStart = vector()
  const lineEnd = vector()

  if (num > 0.5) {
    lineStart.x = tile.x
    lineStart.y = tile.y + tileSize - 1
    lineEnd.x = tile.x + tileSize - 1
    lineEnd.y = tile.y
  } else {
    lineStart.x = tile.x
    lineStart.y = tile.y
    lineEnd.x = tile.x + tileSize - 1
    lineEnd.y = tile.y + tileSize - 1
  }
  screen.drawLine(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y, 1)
}

const createArt = screen => {
  for (let i = 0; i < width; i += tileSize) {
    for (let j = 0; j < width; j += tileSize) {
      const tile = vector()
      tile.x = i
      tile.y = j
      createTile(tile, screen)
    }
  }
  screen.update()
}

board.on('ready', function() {
  const opts = {
    width,
    height,
    address
  };

  const screen = new Oled(board, five, opts);

  screen.clearDisplay()
  screen.update()

  createArt(screen)
})
