const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const Point = require('./models/point');

const settings = {
  dimensions: [ 1024, 1024 ],
  animate: false,
  duration: 5,
  fps: 30
};
const quants = 256
const step = settings.dimensions[0] / quants
const amplitude = 10

const points = []

for (let i = 0; i < settings.dimensions[0]; i += step) {
  points.push(new Point(i, amplitude, settings.dimensions[1]/2))
}

const sketch = () => {
  return ({ context, width, height, frame}) => {
    let x = 0;
    // const width = context.canvas.width;
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)
    
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "rgb(255,255,255)";

    const vertical_margin = height / 10;
    
    for (let i = vertical_margin; i < height - vertical_margin; i+=100) {
      context.moveTo(0,i);
      draw_sine(context, width, frame, height, i);
    }

  };
};

function mid_pass_filter(x, y, frame, width, height) {
  const amplitude = height / 20;
  // const suppressor = Math.pow((4*x/width)-2,10) + 1; //Unknown pleasues version
  
  const suppressor = Math.abs(Math.sin(2*Math.PI*x/width)); //Arctic Monkeys
  console.log('suppressor :>> ', suppressor);
  return (random.noise2D(x, y + frame, 0.2, amplitude)) * suppressor;
}

function draw_sine(context, width, frame, height, offset) {
  for (let i = 0; i < width; i+=1) {
    y = mid_pass_filter(i, offset, frame, width, height) + offset;
    console.log(`X: ${i}, Y: ${y}`);
    context.lineTo(i,y);
  }
  context.stroke();
}

canvasSketch(sketch, settings);
