const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

interface RawTileValue {
  transform(): Tile;
}
class AirValue implements RawTileValue {
  transform(): Tile {
    return new Air();
  }
}
class FluxValue implements RawTileValue {
  transform(): Tile {
    return new Flux();
  }
}
class UnbreakableValue implements RawTileValue {
  transform(): Tile {
    return new UnBreakable();
  }
}
class PlayerValue implements RawTileValue {
  transform(): Tile {
    return new PlayTile();
  }
}

class StoneValue implements RawTileValue {
  transform(): Tile {
    return new Stone(new Resting());
  }
}
class FallingStoneValue implements RawTileValue {
  transform(): Tile {
    return new Stone(new Falling());
  }
}
class BoxValue implements RawTileValue {
  transform(): Tile {
    return new Box(new Resting());
  }
}
class FallingBoxValue implements RawTileValue {
  transform(): Tile {
    return new Box(new Falling());
  }
}
class Key1Value implements RawTileValue {
  transform(): Tile {
    return new Key(YELLOW_KEY);
  }
}
class Key2Value implements RawTileValue {
  transform(): Tile {
    return new Key(BLUE_KEY);
  }
}
class Lock1Value implements RawTileValue {
  transform(): Tile {
    return new Lock1(YELLOW_KEY);
  }
}
class Lock2Value implements RawTileValue {
  transform(): Tile {
    return new Lock1(BLUE_KEY);
  }
}

class RawTile2 {
  static readonly AIR = new RawTile2(new AirValue())

  static readonly FLUX = new RawTile2(new FluxValue())

  static readonly UNBREAKABLE = new RawTile2(new UnbreakableValue())

  static readonly PLAYER = new RawTile2(new PlayerValue())

  static readonly STONE = new RawTile2(new StoneValue())

  static readonly FALLING_STONE = new RawTile2(new FallingStoneValue())

  static readonly BOX = new RawTile2(new BoxValue())

  static readonly FALLING_BOX = new RawTile2(new FallingBoxValue())

  static readonly KEY1 = new RawTile2(new Key1Value())

  static readonly KEY2 = new RawTile2(new Key2Value())

  static readonly LOCK1 = new RawTile2(new Lock1Value())

  static readonly LOCK2 = new RawTile2(new Lock2Value())

  constructor(private value: RawTileValue) { }

  transform() {
    return this.value.transform();
  }
}

const RAW_TILES = [
  RawTile2.AIR,
  RawTile2.FLUX,
  RawTile2.UNBREAKABLE,
  RawTile2.PLAYER,
  RawTile2.STONE,
  RawTile2.FALLING_STONE,
  RawTile2.BOX,
  RawTile2.FALLING_BOX,
  RawTile2.KEY1,
  RawTile2.KEY2,
  RawTile2.LOCK1,
  RawTile2.LOCK2,
];

class Map1 {
  private map: Tile[][];

  constructor() {
    this.map = new Array(rawMap.length);
    for (let y = 0; y < rawMap.length; y++) {
      this.map[y] = new Array(rawMap[y].length);
      for (let x = 0; x < rawMap[y].length; x++) {
        this.map[y][x] = RAW_TILES[rawMap[y][x]].transform();
      }
    }
  }

  remove(shouldRemove: RemoveStrategy) {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (shouldRemove.check(this.map[y][x])) {
          this.map[y][x] = new Air();
        }
      }
    }
  }

  update() {
    for (let y = this.map.length - 1; y >= 0; y--) {
      for (let x = 0; x < this.map[y].length; x++) {
        this.map[y][x].update(map1, x, y);
      }
    }
  }

  draw(g: CanvasRenderingContext2D) {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        this.map[y][x].draw(g, x, y);
      }
    }
  }

  drop(tile: Tile, x: number, y: number) {
    this.map[y + 1][x] = tile;
    this.map[y][x] = new Air();
  }

  getBlockOnTopState(x: number, y: number) {
    return this.map[x][y].getBlockOnTopState();
  }

  isAir(x: number, y: number) {
    return this.map[y][x].isAir();
  }

  setTile(x: number, y: number, tile: Tile) {
    this.map[y][x] = tile;
  }

  moveHorizontal(player: Player, x: number, y: number, dx: number) {
    this.map[y][x + dx].moveHorizontal(this, player, dx);
  }

  moveVertical(player: Player, x: number, y: number, dy: number): void {
    this.map[y][x + dy].moveVertical(map1, player, dy);
  }

  movePlayer(x: number, y: number, newx: number, newy: number) {
    this.map[y][x] = new Air();
    this.map[newx][newy] = new PlayTile();
  }

  pushHorizontal(player: Player, tile: Tile, x: number, y: number, dx: number) {
    if (this.map[y][x + dx + dx].isAir()
      || !this.map[y + 1][x + dx].isAir()) {
      this.map[y][x + dx + dx] = tile;
      player.moveToTile(this, x + dx, y);
    }
  }
}

const map1 = new Map1();

class Player {
  private x = 1;

  private y = 1;

  draw(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ff0000';
    g.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(map: Map1, dx: number): void {
    map.moveHorizontal(this, this.x, this.y, dx);
  }

  moveVertical(map: Map1, dy: number): void {
    map.moveVertical(this, this.x, this.y, dy);
  }

  move(map: Map1, dx: number, dy: number) {
    this.moveToTile(map, this.x + dx, this.y + dy);
  }

  pushHorizontal(map: Map1, tile: Tile, dx: number) {
    if (map.isAir(this.x + dx + dx, this.y)
      || !map.isAir(this.x + dx, this.y + 1)) {
      map.setTile(this.x + dx + dx, this.y, tile);
      this.moveToTile(map, this.x + dx, this.y);
    }
  }

  moveToTile(map: Map1, newx: number, newy: number) {
    map.movePlayer(this.x, this.y, newx, newy);
    this.x = newx;
    this.y = newy;
  }
}

const player = new Player();

interface Tile {
  isAir(): boolean;
  isPlayer(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  moveHorizontal(map: Map1, player: Player, dx: number): void;
  moveVertical(map: Map1, player: Player, dy: number): void;
  update(map: Map1, x: number, y: number): void;
  getBlockOnTopState(): FallingState;
}

interface RemoveStrategy {
  check(tile: Tile): boolean;
}

class RemoveLock1 implements RemoveStrategy {
  check(tile: Tile) {
    return tile.isLock1();
  }
}

class RemoveLock2 implements RemoveStrategy {
  check(tile: Tile) {
    return tile.isLock2();
  }
}

class Flux implements Tile {
  isAir(): boolean { return false; }

  isPlayer(): boolean { return false; }

  isLock1(): boolean { return false; }

  isLock2(): boolean { return false; }

  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ccffcc';
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#ccffcc';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(map: Map1, player: Player, dx: number): void {
    player.move(map, dx, 0);
  }

  update(map: Map1, x: number, y: number): void { }

  moveVertical(map: Map1, player: Player, dy: number): void {
    player.move(map, 0, dy);
  }

  getBlockOnTopState() {
    return new Falling();
  }
}

class Air implements Tile {
  isAir(): boolean { return false; }

  isPlayer(): boolean { return false; }

  isLock1(): boolean { return false; }

  isLock2(): boolean { return false; }

  draw(g: CanvasRenderingContext2D, x: number, y: number) { }

  moveHorizontal(map: Map1, player: Player, dx: number): void {
    player.move(map, dx, 0);
  }

  moveVertical(map: Map1, player: Player, dy: number): void {
    player.move(map, 0, dy);
  }

  update(map: Map1, x: number, y: number): void { }

  getBlockOnTopState() {
    return new Falling();
  }
}
class UnBreakable implements Tile {
  isAir(): boolean { return false; }

  isPlayer(): boolean { return false; }

  isLock1(): boolean { return false; }

  isLock2(): boolean { return false; }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#999999';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(map: Map1, player: Player, dx: number): void { }

  update(map: Map1, x: number, y: number): void { }

  moveVertical(map: Map1, player: Player, dy: number): void { }

  getBlockOnTopState() {
    return new Falling();
  }
}

class PlayTile implements Tile {
  isAir(): boolean { return false; }

  isPlayer(): boolean { return false; }

  isLock1(): boolean { return false; }

  isLock2(): boolean { return false; }

  draw(g: CanvasRenderingContext2D, x: number, y: number) { }

  moveHorizontal(map: Map1, player: Player, dx: number): void { }

  update(map: Map1, x: number, y: number): void { }

  moveVertical(map: Map1, player: Player, dy: number): void { }

  getBlockOnTopState() {
    return new Falling();
  }
}

interface FallingState {
  isFalling(): boolean;
  moveHorizontal(map: Map1, player: Player, tile: Tile, dx: number): void;
  drop(map: Map1, title: Tile, x: number, y: number): void;
}

class Falling {
  isFalling(): boolean {
    return true;
  }

  moveHorizontal(map: Map1, player: Player, tile: Tile, dx: number): void { }

  drop(map: Map1, tile: Tile, x: number, y: number) {
    map.drop(tile, x, y);
  }
}

class Resting {
  isFalling(): boolean {
    return false;
  }

  moveHorizontal(map: Map1, player: Player, tile: Tile, dx: number) {
    player.pushHorizontal(map, tile, dx);
  }

  drop(map: Map1, tile: Tile, x: number, y: number) { }
}

class FallStrategy {
  constructor(private falling: FallingState) { }

  isFalling() {
    return this.falling;
  }

  moveHorizontal(map: Map1, player: Player, tile: Tile, dx: number) {
    this.falling.moveHorizontal(map, player, tile, dx);
  }

  update(map: Map1, tile: Tile, x: number, y: number): void {
    map.getBlockOnTopState(x, y + 1);
    this.falling.drop(map, tile, x, y);
  }
}

class Stone implements Tile {
  private fallStrategy: FallStrategy;

  constructor(falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isFlux(): boolean { return false; }

  isAir(): boolean { return false; }

  isPlayer(): boolean { return false; }

  isFalling(): boolean { return this.isFalling(); }

  isLock1(): boolean { return false; }

  isLock2(): boolean { return false; }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#0000cc';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(map: Map1, player: Player, dx: number) {
    this.fallStrategy.moveHorizontal(map, player, this, dx);
  }

  update(map: Map1, x: number, y: number): void {
    this.fallStrategy.update(map, this, x, y);
  }

  moveVertical(map: Map1, player: Player, dy: number): void { }

  getBlockOnTopState() {
    return new Resting();
  }
}

class Box implements Tile {
  private fallStrategy: FallStrategy;

  constructor(falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isFlux(): boolean { return false; }

  isAir(): boolean { return false; }

  isPlayer(): boolean { return false; }

  isFalling(): boolean { return this.isFalling(); }

  isLock1(): boolean { return false; }

  isLock2(): boolean { return false; }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#8b4513';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(map: Map1, player: Player, dx: number): void {
    this.fallStrategy
      .moveHorizontal(map, player, this, dx);
  }

  update(map: Map1, x: number, y: number): void {
    this.fallStrategy.update(map, this, x, y);
  }

  moveVertical(map: Map1, player: Player, dy: number): void { }

  getBlockOnTopState() {
    return new Resting();
  }
}

class KeyConfiguration {
  constructor(
    private color: string,
    private lock1: boolean,
    private removeStrategy: RemoveStrategy,
  ) { }

  setColor(g: CanvasRenderingContext2D) {
    g.fillStyle = this.color;
  }

  isLock() {
    return this.lock1;
  }

  removeLock() {
    remove(map1, this.removeStrategy);
  }

  setFillRect(g: CanvasRenderingContext2D, x: number, y: number) {
    return g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

class Key implements Tile {
  constructor(
    private keyConf: KeyConfiguration,
  ) { }

  isFlux(): boolean { return false; }

  isAir(): boolean { return false; }

  isUnBreakable(): boolean { return false; }

  isPlayer(): boolean { return false; }

  isStone(): boolean { return false; }

  isFalling(): boolean { return false; }

  isBox(): boolean { return false; }

  isKey1(): boolean { return true; }

  isKey2(): boolean { return false; }

  isLock1(): boolean { return false; }

  isLock2(): boolean { return false; }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    this.keyConf.setColor(g);
    this.keyConf.setFillRect(g, x, y);
  }

  moveHorizontal(map: Map1, player: Player, dx: number): void {
    this.keyConf.removeLock();
    player.move(map, dx, 0);
  }

  update(map: Map1, x: number, y: number): void { }

  moveVertical(map: Map1, player: Player, dy: number): void {
    this.keyConf.removeLock();
    player.move(map, 0, dy);
  }

  getBlockOnTopState() {
    return new Falling();
  }
}

class Lock1 implements Tile {
  constructor(
    private keyConf: KeyConfiguration,
  ) { }

  isAir(): boolean { return false; }

  isPlayer(): boolean { return false; }

  isLock1(): boolean { return this.keyConf.isLock(); }

  isLock2(): boolean { return !this.keyConf.isLock(); }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    this.keyConf.setColor(g);
    this.keyConf.setFillRect(g, x, y);
  }

  moveHorizontal(map: Map1, player: Player, dx: number): void { }

  update(map: Map1, x: number, y: number): void { }

  moveVertical(map: Map1, player: Player, dy: number): void { }

  getBlockOnTopState() {
    return new Falling();
  }
}

enum RawInput {
  UP, DOWN, LEFT, RIGHT
}

interface Input {
  handle(player: Player, map: Map1): void;
}

class Right implements Input {
  handle(player: Player, map: Map1) {
    player.moveHorizontal(map, 1);
  }
}

class Left implements Input {
  handle(player: Player, map: Map1) {
    player.moveHorizontal(map, -1);
  }
}

class Up implements Input {
  handle(player: Player, map: Map1) {
    player.moveVertical(map, -1);
  }
}

class Down implements Input {
  handle(player: Player, map: Map1) {
    player.moveVertical(map, 1);
  }
}

const rawMap: number[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];
// const assertExhausted = (x: never): never => {
//   throw new Error(`Unexpected object: ${x}`);
// };

const YELLOW_KEY = new KeyConfiguration('#ffcc00', true, new RemoveLock1());
const BLUE_KEY = new KeyConfiguration('#00ccff', false, new RemoveLock2());

let map: Tile[][];
const transformTile = (tile: RawTile2) => tile.transform();

const inputs: Input[] = [];

function remove(map: Map1, shouldRemove: RemoveStrategy) {
  return map.remove(shouldRemove);
}

function updateMap(map: Map1) {
  return map.update();
}

function handleInputs() {
  while (inputs.length > 0) {
    const input = inputs.pop();
    input.handle(player, map1);
  }
}

function update() {
  handleInputs();
  updateMap(map1);
}

function drawMap(map: Map1, g: CanvasRenderingContext2D) {
  return map.draw(g);
}

function drawPlayer(player: Player, g: CanvasRenderingContext2D) {
  player.draw(g);
}

function createGraphics() {
  const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement;
  const g = canvas.getContext('2d');

  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function draw() {
  const g = createGraphics();

  drawMap(map1, g);

  drawPlayer(player, g);
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
