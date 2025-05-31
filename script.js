let ziduriModificate = [];
let zidSelectat = null;
let mutaZid = false;

let inputNume1, inputNume2, butonConfirmare;
let numeJucator1 = "", numeJucator2 = "";
let numeConfirmate = false;

let iconite = [];
let iconitaSelectata = null;

let spatiu = 5;
let dim;

let offsetX = -180;
let wallVerticalGap = 1;

function setup() {
    let canvas = createCanvas(1600, 800);
    canvas.parent("canvas-pozitie");

    inputNume1 = createInput();
    inputNume1.position(50, 50);
    inputNume1.size(200);
    inputNume1.attribute('placeholder', 'Nume Jucător 1');

    inputNume2 = createInput();
    inputNume2.position(50, 100);
    inputNume2.size(200);
    inputNume2.attribute('placeholder', 'Nume Jucător 2');

    butonConfirmare = createButton('Start');
    butonConfirmare.position(50, 150);
    butonConfirmare.mousePressed(() => {
        numeJucator1 = inputNume1.value();
        numeJucator2 = inputNume2.value();
        if (numeJucator1 && numeJucator2) {
            numeConfirmate = true;
            inputNume1.hide();
            inputNume2.hide();
            butonConfirmare.hide();
        }
    });

    let inima = createDiv('<i class="bi bi-heart-fill"></i>');
    inima.style('color', '#e9a2f7');
    inima.style('font-size', '24px');
    inima.position(759, 145);
    inima.style('pointer-events', 'none');
    iconite.push({ div: inima, x: 759, y: 145, w: 24, h: 24 });

    let stea = createDiv('<i class="bi bi-star-fill"></i>');
    stea.style('color', '#e9a2f7');
    stea.style('font-size', '24px');
    stea.position(815, 758);
    stea.style('pointer-events', 'none');
    iconite.push({ div: stea, x: 815, y: 758, w: 24, h: 24 });

    dim = (700 - 2 * spatiu - 8 * spatiu) / 9;

    let nrLinii = 10;
    let randuri = 2;
    let startXZiduri = (452 + offsetX) + spatiu;
    let latime = 2 * dim + spatiu;
    let inaltime = 5;

    // Calculăm noua poziție de start Y pentru ziduri pentru a le centra vertical
    let totalWallBlockHeight = (nrLinii - 1) * (dim + wallVerticalGap) + inaltime;
    let quadHeight = 730 - 30; // Înălțimea quad-ului
    let remainingVerticalSpace = quadHeight - totalWallBlockHeight;
    let startYWalls = 30 + (remainingVerticalSpace / 2); // Poziția de start Y pentru ziduri

    for (let ii = 0; ii < randuri; ii++) {
        let x = startXZiduri + ii * (latime + 752);
        for (let i = 0; i < nrLinii; i++) {
            let y = startYWalls + i * (dim + wallVerticalGap);
            ziduriModificate.push({ x: x, y: y, latime: latime, inaltime: inaltime });
        }
    }
}

function draw() {
    background(255);

    if (numeConfirmate) {
        fill(50);
        textSize(24);
        textAlign(LEFT, TOP);
        text("Jucător 1: " + numeJucator1, 50, 10);
        text("Jucător 2: " + numeJucator2, 50, 40);
    }

    stroke('#e9a2f7');
    fill('#fad1f8');

    square(452, 30, 700);

    dim = (700 - 2 * spatiu - 8 * spatiu) / 9;
    let startXCasuteMici = 452 + spatiu;
    let startYCasuteMici = 30 + spatiu;

    casuteMici(8, startXCasuteMici, startYCasuteMici, 9, dim, spatiu);

    stroke('#e9a2f7');
    fill('#fad1f8');

    quad(250, 30, 452, 30, 452, 730, 250, 730);

    quad(1151, 30, 1351, 30, 1351, 730, 1151, 730);

    for (let z of ziduriModificate) {
        fill('#f5f5dc');
        stroke('#e9a2f7');
        if (z === zidSelectat && mutaZid) {
            rect(mouseX - z.latime / 2, mouseY - z.inaltime / 2, z.latime, z.inaltime);
        } else {
            rect(z.x, z.y, z.latime, z.inaltime);
        }
    }

    for (let ico of iconite) {
        ico.div.position(ico.x, ico.y);
    }
}

function mousePressed() {
    if (!mutaZid) {
        for (let z of ziduriModificate) {
            if (mouseX > z.x && mouseX < z.x + z.latime &&
                mouseY > z.y && mouseY < z.y + z.inaltime) {
                zidSelectat = z;
                mutaZid = true;
                return;
            }
        }
    } else {
        if (zidSelectat) {
            zidSelectat.x = mouseX - zidSelectat.latime / 2;
            zidSelectat.y = mouseY - zidSelectat.inaltime / 2;
            zidSelectat = null;
        }
        mutaZid = false;
    }
}

function casuteMici(nr, startX, startY, rand, dim, spatiu) {
    stroke('#e9a2f7');
    fill('#f5f5dc'); 
    for (let ii = 0; ii < rand; ii++) {
        for (let i = 0; i <= nr; i++) {
            let x = startX + i * (dim + spatiu);
            let y = startY + ii * (dim + spatiu);
            square(x, y, dim);
        }
    }
}
