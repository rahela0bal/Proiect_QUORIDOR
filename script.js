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

let globalShiftX = 50;

function setup() {
    let canvas = createCanvas(1600, 800);
    canvas.parent("canvas-pozitie");

    inputNume1 = createInput();
    inputNume1.position(50 + globalShiftX, 50);
    inputNume1.size(200);
    inputNume1.attribute('placeholder', 'Nume Jucător 1');

    inputNume2 = createInput();
    inputNume2.position(50 + globalShiftX, 100);
    inputNume2.size(200);
    inputNume2.attribute('placeholder', 'Nume Jucător 2');

    butonConfirmare = createButton('Start');
    butonConfirmare.position(50 + globalShiftX, 150);
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
    inima.position(759 + globalShiftX, 145);
    inima.style('pointer-events', 'none');
    iconite.push({ div: inima, x: 759 + globalShiftX, y: 145, w: 24, h: 24 });

    let stea = createDiv('<i class="bi bi-star-fill"></i>');
    stea.style('color', '#e9a2f7');
    stea.style('font-size', '24px');
    stea.position(815 + globalShiftX, 758);
    stea.style('pointer-events', 'none');
    iconite.push({ div: stea, x: 815 + globalShiftX, y: 758, w: 24, h: 24 });

    dim = (700 - 2 * spatiu - 8 * spatiu) / 9;

    let nrLinii = 10;
    let randuri = 2;
    let startXZiduri = (452 + offsetX + globalShiftX) + spatiu;
    let latime = 2 * dim + spatiu;
    let inaltime = 5;

    let totalWallBlockHeight = (nrLinii - 1) * (dim + wallVerticalGap) + inaltime;
    let quadHeight = 730 - 30; 
    let remainingVerticalSpace = quadHeight - totalWallBlockHeight;
    let startYWalls = 30 + (remainingVerticalSpace / 2); 

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
        text("Jucător 1: " + numeJucator1, 50 + globalShiftX, 10);
        text("Jucător 2: " + numeJucator2, 50 + globalShiftX, 40);
    }

    stroke('#e9a2f7');
    fill('#fad1f8');

    square(452 + globalShiftX, 30, 700);

    square(width - 250, 30, 240); 

    dim = (700 - 2 * spatiu - 8 * spatiu) / 9;
    let startXCasuteMici = (452 + globalShiftX) + spatiu;
    let startYCasuteMici = 30 + spatiu;

    casuteMici(8, startXCasuteMici, startYCasuteMici, 9, dim, spatiu);

    stroke('#e9a2f7');
    fill('#fad1f8');

    quad(250 + globalShiftX, 30, 452 + globalShiftX, 30, 452 + globalShiftX, 730, 250 + globalShiftX, 730);

    quad(1151 + globalShiftX, 30, 1351 + globalShiftX, 30, 1351 + globalShiftX, 730, 1151 + globalShiftX, 730);

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

