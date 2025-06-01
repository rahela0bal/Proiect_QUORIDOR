let peretiModificati = [];
let pereteSelectat = null;
let mutaPerete = false;

let intrareNume1, intrareNume2, butonStart;
let numeJucator1 = "";
let numeJucator2 = "";
let numeConfirmate = false;

let icoane = [];
let icoanaSelectata = null;

let spatiu = 5;
let dimensiuneCelula;

let decalajXObiecte = -180;
let spatiuVerticalPerete = 1;

let decalajGlobalX = 50;

let afiseazaPatratSetari = false;
let butonComutarePatrat;
let butonSchimbCuloare;

function setup() {
    let panza = createCanvas(1800, 800);
    panza.parent("canvas-pozitie");

    intrareNume1 = createInput();
    intrareNume1.position(50 + decalajGlobalX, 50);
    intrareNume1.size(200);
    intrareNume1.attribute('placeholder', 'Nume Jucător 1');

    intrareNume2 = createInput();
    intrareNume2.position(50 + decalajGlobalX, 100);
    intrareNume2.size(200);
    intrareNume2.attribute('placeholder', 'Nume Jucător 2');

    butonStart = createButton('Start');
    butonStart.position(50 + decalajGlobalX, 150);
    butonStart.mousePressed(() => {
        numeJucator1 = intrareNume1.value();
        numeJucator2 = intrareNume2.value();
        if (numeJucator1 && numeJucator2) {
            numeConfirmate = true;
            intrareNume1.hide();
            intrareNume2.hide();
            butonStart.hide();
        }
    });

    butonComutarePatrat = createButton('');
    butonComutarePatrat.html('<i class="bi bi-gear-fill"></i>');
    butonComutarePatrat.style('font-size', '45px'); // Dimensiunea fontului a fost modificată la 45px
    butonComutarePatrat.position(width - 250, 30);
    butonComutarePatrat.mousePressed(() => {
        afiseazaPatratSetari = !afiseazaPatratSetari;
    });

    butonSchimbCuloare = createButton('Schimbă Culoare');
    butonSchimbCuloare.position(0, 0);
    butonSchimbCuloare.mousePressed(() => {
        console.log("Butonul de schimbare a culorii a fost apăsat!");
    });
    butonSchimbCuloare.hide();

    let inima = createDiv('<i class="bi bi-heart-fill"></i>');
    inima.style('color', '#e9a2f7');
    inima.style('font-size', '24px');
    inima.position(759 + decalajGlobalX, 145);
    inima.style('pointer-events', 'none');
    icoane.push({ div: inima, x: 759 + decalajGlobalX, y: 145, w: 24, h: 24 });

    let stea = createDiv('<i class="bi bi-star-fill"></i>');
    stea.style('color', '#e9a2f7');
    stea.style('font-size', '24px');
    stea.position(815 + decalajGlobalX, 758);
    stea.style('pointer-events', 'none');
    icoane.push({ div: stea, x: 815 + decalajGlobalX, y: 758, w: 24, h: 24 });

    dimensiuneCelula = (700 - 2 * spatiu - 8 * spatiu) / 9;

    let numarLinii = 10;
    let randuri = 2;
    let startXPereti = (452 + decalajXObiecte + decalajGlobalX) + spatiu;
    let latime = 2 * dimensiuneCelula + spatiu;
    let inaltime = 5;

    let inaltimeTotalaBlocPerete = (numarLinii - 1) * (dimensiuneCelula + spatiuVerticalPerete) + inaltime;
    let inaltimePatrat = 730 - 30; 
    let spatiuVerticalRamas = inaltimePatrat - inaltimeTotalaBlocPerete;
    let startYPereti = 30 + (spatiuVerticalRamas / 2); 

    for (let ii = 0; ii < randuri; ii++) {
        let x = startXPereti + ii * (latime + 752);
        for (let i = 0; i < numarLinii; i++) {
            let y = startYPereti + i * (dimensiuneCelula + spatiuVerticalPerete);
            peretiModificati.push({ x: x, y: y, latime: latime, inaltime: inaltime });
        }
    }
}

function draw() {
    background(255);

    if (numeConfirmate) {
        fill(50);
        textSize(24);
        textAlign(LEFT, TOP);
        text("Jucător 1: " + numeJucator1, 50 + decalajGlobalX, 10);
        text("Jucător 2: " + numeJucator2, 50 + decalajGlobalX, 40);
    }

    stroke('#e9a2f7');
    fill('#fad1f8');

    square(452 + decalajGlobalX, 30, 700);
    
    if (afiseazaPatratSetari) {
        let patratSetariX = width - 435 + decalajGlobalX;
        let patratSetariY = 30;
        let patratSetariDim = 150;

        square(patratSetariX, patratSetariY, patratSetariDim); 

        butonSchimbCuloare.position(patratSetariX + (patratSetariDim / 2) - (butonSchimbCuloare.width / 2), patratSetariY + (patratSetariDim / 2) - (butonSchimbCuloare.height / 2));
        butonSchimbCuloare.show();
    } else {
        butonSchimbCuloare.hide();
    }

    dimensiuneCelula = (700 - 2 * spatiu - 8 * spatiu) / 9;
    let startXCasuteMici = (452 + decalajGlobalX) + spatiu;
    let startYCasuteMici = 30 + spatiu;

    deseneazaCasuteMici(8, startXCasuteMici, startYCasuteMici, 9, dimensiuneCelula, spatiu);

    stroke('#e9a2f7');
    fill('#fad1f8');

    quad(250 + decalajGlobalX, 30, 452 + decalajGlobalX, 30, 452 + decalajGlobalX, 730, 250 + decalajGlobalX, 730);

    quad(1151 + decalajGlobalX, 30, 1351 + decalajGlobalX, 30, 1351 + decalajGlobalX, 730, 1151 + decalajGlobalX, 730);

    for (let z of peretiModificati) {
        fill('#f5f5dc');
        stroke('#e9a2f7');
        if (z === pereteSelectat && mutaPerete) {
            rect(mouseX - z.latime / 2, mouseY - z.inaltime / 2, z.latime, z.inaltime);
        } else {
            rect(z.x, z.y, z.latime, z.inaltime);
        }
    }

    for (let ico of icoane) {
        ico.div.position(ico.x, ico.y);
    }
}

function mousePressed() {
    if (!mutaPerete) {
        for (let z of peretiModificati) {
            if (mouseX > z.x && mouseX < z.x + z.latime &&
                mouseY > z.y && mouseY < z.y + z.inaltime) {
                pereteSelectat = z;
                mutaPerete = true;
                return;
            }
        }
    } else {
        if (pereteSelectat) {
            pereteSelectat.x = mouseX - pereteSelectat.latime / 2;
            pereteSelectat.y = mouseY - pereteSelectat.inaltime / 2;
            pereteSelectat = null;
        }
        mutaPerete = false;
    }
}

function deseneazaCasuteMici(nr, startX, startY, rand, dim, spatiu) {
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
