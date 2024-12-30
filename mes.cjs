const Canvas = require('canvas');
const fs = require("fs")

async function wrap() {
  const canvas = Canvas.createCanvas(500, 500);
  const ctx = canvas.getContext('2d');
  
  const teks = "brat and it's the same but there's three more songs so it's not";
  const lebarCanvas = 500;
  const tinggiBaris = 70;
  const font = '75px Arial';
  
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, lebarCanvas, lebarCanvas);
  ctx.font = font;
  ctx.fillStyle = "black";
  
  function wrapText(teks, lebar, tinggiBaris) {
    const katas = teks.split(' ');
    const baris = [];
    let barisiSaatIni = '';
  
    katas.forEach((kata) => {
      const lebarTeks = ctx.measureText(barisiSaatIni + ' ' + kata).width;
      if (lebarTeks > lebar) {
        baris.push(barisiSaatIni);
        barisiSaatIni = kata + ' ';
      } else {
        barisiSaatIni += kata + ' ';
      }
    });
  
    baris.push(barisiSaatIni);
    return baris;
  }
  
  const barisTeks = wrapText(teks, lebarCanvas, tinggiBaris);
  let y = 75;
  barisTeks.forEach((baris) => {
    ctx.fillText(baris, 10, y);
    y += tinggiBaris;
  });
  
  const buffer = canvas.toBuffer();
  
  await fs.writeFileSync("./output.png", buffer);
}

wrap()