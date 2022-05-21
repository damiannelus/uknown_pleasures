
class Point {
  constructor(x, amplitude, wave_x) {
    this.x = x
    this.y = wave_x + Math.sin(0 + x) * amplitude
    this.amplitude = amplitude
    this.wave_x = wave_x
  }

  update(degree, amplitude) {
    this.y = this.wave_x + Math.sin(degree) * amplitude
    console.log('this.y :>> ', this.y);
  }

  draw(context) {
    // context.lineTo(this.x, this.y)
    // context.moveTo(this.x, this.y)
    console.log("Draw");
    context.save();
    context.translate(this.x, this.y);
    context.lineWidth = 3;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.strokeStyle = `red`;
    context.fill();
    context.stroke();

    context.restore();
    
  }
}

module.exports = Point