import Canvas, { createCanvas } from "canvas";
import fs from "fs"

const canvas = Canvas.createCanvas(500, 500);
const ctx = canvas.getContext('2d');

ctx.fillStyle = "white"
ctx.font = '14px Arial';

const teks = "Lorem ipsum sit amet, elit.";
const kata = teks.split(' ');
const lebarCanvas = 500;
const tinggiBaris = 20;

function justifyText(ctx, teks, lebar, y) {
  const lebarTeks = ctx.measureText(teks).width;
  const spasi = lebar - lebarTeks;
  const jumlahSpasi = kata.length - 1;
  const spasiPerKata = jumlahSpasi > 0 ? spasi / jumlahSpasi : 0;

  let x = 0;
  kata.forEach((kata, indeks) => {
    ctx.fillText(kata, x, y);
    x += ctx.measureText(kata).width + spasiPerKata;
    if (indeks < kata.length - 1) {
      ctx.fillText(' ', x, y);
      x += spasiPerKata;
    }
  });
}

justifyText(ctx, teks, lebarCanvas, 20);
ctx.fillStyle = 'white';
ctx.fillText('Justify Text', 200, 450);

const buffer = canvas.toBuffer();
await fs.writeFileSync("./output.png", buffer);