const canvas = document.getElementById('drawingPad');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const saveButton = document.getElementById('saveButton');

let drawing = false;
let currentColor = colorPicker.value;

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

function startDrawing(e) {
  drawing = true;
  draw(e);
}

function endDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  const rect = canvas.getBoundingClientRect();
  const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
  const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', endDrawing);
canvas.addEventListener('touchmove', draw);

colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
});

saveButton.addEventListener('click', () => {
  if (navigator.canShare && navigator.canShare({ files: [] })) {
    canvas.toBlob((blob) => {
      const file = new File([blob], 'drawing.png', { type: 'image/png' });
      const filesArray = [file];

      navigator.share({
        files: filesArray,
        title: 'Drawing',
        text: 'Check out my drawing!',
      })
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
    });
  } else {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  }
});
