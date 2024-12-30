import { createCanvas } from "canvas";
import fs from "fs";
import { Jimp } from "jimp";

async function createBrat(teks) {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");

  const lebarCanvas = 500;
  const tinggiBaris = 35;
  const marginTop = 85;
  const marginLeft = 20;
  const katas = teks.split(" ");
  const space = " "

  let baris = [];
  let fontSize = 130;
  let font = "Arial";
  let barisiSaatIni = "";
  let whiteSpace = 1
  
  let y = marginTop;
  let x = marginLeft;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, lebarCanvas, lebarCanvas);
  // ctx.textStyle = "bold"
  ctx.fillStyle = "black";

  while (fontSize > 50) {
    ctx.font = `${fontSize}px ${font}`;
    baris = []
    barisiSaatIni = ""
    for (let i = 0; i < katas.length; i ++) {
      const kata = katas[i]
      const lebarTeks = ctx.measureText(barisiSaatIni + kata).width;
      if (lebarTeks > lebarCanvas) {
        baris.push(barisiSaatIni);
        barisiSaatIni = kata + " ";
      } else {
        barisiSaatIni += kata + " ";
      }
    };
  
    baris.push(barisiSaatIni);
    fontSize--
    if (baris.length < (katas.length > 15 ? 7 : katas.length > 10 ? 6 : katas.length > 5 ? 5 : 4)) break
  }

  y = 15 + ctx.measureText(baris[0]).emHeightAscent
  baris.filter(Boolean).forEach(baris => {
    let maxWidth = lebarCanvas - 40
    
    baris = baris.split(" ").filter(Boolean).join(" ")
    if (ctx.measureText(baris).width < lebarCanvas && baris.split(" ").length > 1) {
      while (ctx.measureText(baris.split(" ").join(space.repeat(whiteSpace))).width < lebarCanvas) {
        whiteSpace++
      }
    }

    if (baris.split(" ").length == 1) maxWidth = ctx.measureText(baris).width - 40
    ctx.fillText(baris.split(" ").join(space.repeat(whiteSpace)), x, y, maxWidth);
    y += katas.length > 15 ? tinggiBaris + (fontSize - baris.length * 1.5) : katas.length > 10 ? tinggiBaris + (baris.length * 5) : (tinggiBaris + fontSize + baris.length) - 10;
    whiteSpace = 1
  });

  const buffer = canvas.toBuffer();
  const image = await Jimp.fromBuffer(buffer);
  image.blur(2);
  await image.write("./output.png");
  console.log("[ Brat ] Sukses merender gambar: ./output.png");
}

// createBrat("brat and it's the same but there's three more songs so it's not");
// createBrat("Ini gruf apa ya kok isinya buton semua");
// createBrat("kmu banyk tanya kyk wartawan aja");
// createBrat("brat and it's the same but there's three more songs so it's not skibidi sigma mewing anjay mabar banget rek anajs selebew gyatt mabar kontol memek ngentot lmao");
// createBrat("Ini grup apa ya kok membernya cabul semua");
// createBrat("Permisi ini grup apa ya kok member nya pada cabul dan bringas semua, apalagi yang namanya agus");
createBrat("Kapan yah? kapan kapan 😁");