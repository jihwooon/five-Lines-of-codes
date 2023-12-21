const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

// Tile Interface & Class
interface Tile {
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isLock1(): boolean;
  isKey2(): boolean;
  isLock2(): boolean;
}

class Flux implements Tile {
  isFlux() { return true; }
  isUnbreakable() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isLock1() { return false; }
  isKey2() { return false; }
  isLock2() { return false; }
}

class Unbreakable implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return true; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isLock1() { return false; }
  isKey2() { return false; }
  isLock2() { return false; }
}

class Stone implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isStone() { return true; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isLock1() { return false; }
  isKey2() { return false; }
  isLock2() { return false; }
}

class FallingStone implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isStone() { return false; }
  isFallingStone() { return true; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isLock1() { return false; }
  isKey2() { return false; }
  isLock2() { return false; }
}

class Box implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return true; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isLock1() { return false; }
  isKey2() { return false; }
  isLock2() { return false; }
}

class FallingBox implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return true; }
  isKey1() { return false; }
  isLock1() { return false; }
  isKey2() { return false; }
  isLock2() { return false; }
}

class Key1 implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return true; }
  isLock1() { return false; }
  isKey2() { return false; }
  isLock2() { return false; }
}

class Lock1 implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isLock1() { return true; }
  isKey2() { return false; }
  isLock2() { return false; }
}

class Key2 implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isLock1() { return false; }
  isKey2() { return true; }
  isLock2() { return false; }
}

class Lock2 implements Tile {
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isStone() { return false; }
  isFallingStone() { return false; }
  isBox() { return false; }
  isFallingBox() { return false; }
  isKey1() { return false; }
  isLock1() { return false; }
  isKey2() { return false; }
  isLock2() { return true; }
}

enum RawInput {
  UP, DOWN, LEFT, RIGHT
}

// Input Interface & Class
interface Input {
  isRight(): boolean;
  isLeft(): boolean;
  isUp(): boolean;
  isDown(): boolean;
  handle(): void;
}

class Right implements Input {
  isRight() { return true; }
  isLeft() { return false; }
  isUp() { return false; }
  isDown() { return false; }
  handle() { moveHorizontal(1); }
}

class Left implements Input {
  isRight() { return false; }
  isLeft() { return true; }
  isUp() { return false; }
  isDown() { return false; }
  handle() { moveHorizontal(-1); }
}

class Up implements Input {
  isRight() { return false; }
  isLeft() { return false; }
  isUp() { return true; }
  isDown() { return false; }
  handle() { moveVertical(-1); }
}

class Down implements Input {
  isRight() { return false; }
  isLeft() { return false; }
  isUp() { return false; }
  isDown() { return true; }
  handle() { moveVertical(1); }
}

let playerx = 1;
let playery = 1;
const map: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

const inputs: Input[] = [];

function remove(tile: RawTile) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === tile) {
        map[y][x] = RawTile.AIR;
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = RawTile.AIR;
  map[newy][newx] = RawTile.PLAYER;
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  if (map[playery][playerx + dx] === RawTile.FLUX
    || map[playery][playerx + dx] === RawTile.AIR) {
    moveToTile(playerx + dx, playery);
  } else if ((map[playery][playerx + dx] === RawTile.STONE
    || map[playery][playerx + dx] === RawTile.BOX)
    && map[playery][playerx + dx + dx] === RawTile.AIR
    && map[playery + 1][playerx + dx] !== RawTile.AIR) {
    map[playery][playerx + dx + dx] = map[playery][playerx + dx];
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx] === RawTile.KEY1) {
    remove(RawTile.LOCK1);
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx] === RawTile.KEY2) {
    remove(RawTile.LOCK2);
    moveToTile(playerx + dx, playery);
  }
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx] === RawTile.FLUX
    || map[playery + dy][playerx] === RawTile.AIR) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx] === RawTile.KEY1) {
    remove(RawTile.LOCK1);
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx] === RawTile.KEY2) {
    remove(RawTile.LOCK2);
    moveToTile(playerx, playery + dy);
  }
}

function update() {
  handleInputs();
  updateMap();
}

function handleInputs() {
  while (inputs.length > 0) {
    const input = inputs.pop();
    input.handle();
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      if ((map[y][x] === RawTile.STONE || map[y][x] === RawTile.FALLING_STONE)
        && map[y + 1][x] === RawTile.AIR) {
        map[y + 1][x] = RawTile.FALLING_STONE;
        map[y][x] = RawTile.AIR;
      } else if ((map[y][x] === RawTile.BOX || map[y][x] === RawTile.FALLING_BOX)
        && map[y + 1][x] === RawTile.AIR) {
        map[y + 1][x] = RawTile.FALLING_BOX;
        map[y][x] = RawTile.AIR;
      } else if (map[y][x] === RawTile.FALLING_STONE) {
        map[y][x] = RawTile.STONE;
      } else if (map[y][x] === RawTile.FALLING_BOX) {
        map[y][x] = RawTile.BOX;
      }
    }
  }
}

function draw() {
  let g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function createGraphics() {
  const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement;
  let g = canvas.getContext('2d');
  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawMap(g:CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      colorOfTile(g, x, y);
    }
  }
}

function colorOfTile(g: CanvasRenderingContext2D, x: number, y: number) {
  if (map[y][x]) {
    g.fillStyle = '#ccffcc';
  } else if (map[y][x] === RawTile.UNBREAKABLE) {
    g.fillStyle = '#999999';
  } else if (map[y][x] === RawTile.STONE || map[y][x] === RawTile.FALLING_STONE) {
    g.fillStyle = '#0000cc';
  } else if (map[y][x] === RawTile.BOX || map[y][x] === RawTile.FALLING_BOX) {
    g.fillStyle = '#8b4513';
  } else if (map[y][x] === RawTile.KEY1 || map[y][x] === RawTile.LOCK1) {
    g.fillStyle = '#ffcc00';
  } else if (map[y][x] === RawTile.KEY2 || map[y][x] === RawTile.LOCK2) {
    g.fillStyle = '#00ccff';
  }

  if (map[y][x] !== RawTile.AIR && map[y][x] !== RawTile.PLAYER) {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

function drawPlayer(g:CanvasRenderingContext2D) {
  g.fillStyle = '#ff0000';
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  const before = Date.now();
  update();
  draw();
  const after = Date.now();
  const frameTime = after - before;
  const sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  gameLoop();
};

const LEFT_KEY = 'ArrowLeft';
const UP_KEY = 'ArrowUp';
const RIGHT_KEY = 'ArrowRight';
const DOWN_KEY = 'ArrowDown';
window.addEventListener('keydown', (e) => {
  if (e.key === LEFT_KEY || e.key === 'a') inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === 'w') inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === 'd') inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === 's') inputs.push(new Down());
});
