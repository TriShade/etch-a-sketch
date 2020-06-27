const container = document.querySelector('#gridcontainer');
container.style.display = 'grid'; 
let drawColour = 'black';

makeGrid(16);

const resetbtn = document.querySelector('#reset');
resetbtn.addEventListener('click', () => {
  let num = prompt("Enter size for new grid", 16);
  num = parseFloat(num);
  while (num < 1 || Number.isInteger(num) === false) {
    num = prompt("Please enter a positive integer", 16);
  }
  makeGrid(num);
});

const pencilbtn = document.querySelector('#pencil');
pencilbtn.addEventListener('click', () => {
  drawColour = 'black';
});

const eraserbtn = document.querySelector('#eraser');
eraserbtn.addEventListener('click', () => {
  drawColour = 'white';
});

const rainbowbtn = document.querySelector('#rainbow');
rainbowbtn.addEventListener('click', () => {
  drawColour = 'rainbow';
});

function randomColour() {
  let c1 = Math.floor((Math.random() * 255) + 0);
  let c2 = Math.floor((Math.random() * 255) + 0);
  let c3 = Math.floor((Math.random() * 255) + 0);
  return `rgb(${c1}, ${c2}, ${c3})`
}

// Makes a new grid of variable size
function makeGrid(size) {
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  container.style.gridTemplateColumns = `repeat(${size}, ${640 / size}px)`;
  container.style.gridTemplateRows = `repeat(${size}, ${640 / size}px)`;
  let row = 1;
  let lastNum = 0;

  for (let i = 1; i <= (size * size); i++) {
    const div = document.createElement('div');
    div.setAttribute('id', `${i}`);
    div.classList.add('gridblock');
    if (i != 1 && (i % size) === 1) {
      row += 1;
    }
    lastNum = (row - 1) * size;
    div.style.gridColumn = `${i - lastNum} / span 1`;
    div.style.gridRow = `${row} / span 1`; 
    container.appendChild(div)
  }

  const blockNL = container.querySelectorAll('.gridblock');
  blockNL.forEach((block) => {
    block.addEventListener('mouseenter', () => {
      if (drawColour === 'rainbow') {
        block.style.backgroundColor = randomColour(); 
      }
      else {
        block.style.backgroundColor = drawColour; 
      }
    });
  }); 
}

