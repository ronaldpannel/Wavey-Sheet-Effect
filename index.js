/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
ctx.strokeStyle = "white";
ctx.fillStyle = "black";
ctx.lineWidth = 1;

class Cell {
  constructor(x0, y0, rad, angle) {
    this.x0 = x0;
    this.y0 = y0;
    this.x = 0;
    this.y = 0;
    this.rad = rad;
    this.angle = angle;
  }
  update() {
    this.x = this.rad * Math.cos(this.angle);
    this.y = this.rad * Math.sin(this.angle);
    this.angle += 0.01;
  }
  draw(ctx) {
    // ctx. beginPath()
    // ctx.arc(this.x0, this.y0, this.rad, 0, Math.PI * 2);
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(this.x0, this.y0);
    // ctx.lineTo(this.x0 + this.x, this.y0 +this.y);
    // ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x0 + this.x, this.y0 + this.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}
class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cell = new Cell();
    this.cols = 30;
    this.rows = 30;
    this.rowSize = this.height / this.rows;
    this.colSize = this.width / this.cols;
    this.grid = [];
    this.loc = 50;

    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Cell(
          this.colSize / 2 + i * this.colSize,
          this.rowSize / 2 + j * this.rowSize,
          this.colSize / 2,
          i * this.loc + j * this.loc
        );
      }
    }
  }
  render(ctx) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].update();
        this.grid[i][j].draw(ctx);
      }
    }
  }
}
const effect = new Effect(canvas.width, canvas.height);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(ctx);
  requestAnimationFrame(animate);
}
animate();
