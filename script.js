let peretiModificati = [];
let pereteSelectat = null;
let mutaPerete = false;

let intrareNume1, intrareNume2, butonStart;
let numeJucator1 = "";
let numeJucator2 = "";
let numeConfirmate = false;

let spatiu = 5;
let dimensiuneCelula;

let decalajXObiecte = -180;
let spatiuVerticalPerete = 1;

let decalajGlobalX = 50;

let afiseazaPatratSetari = false;
let butonComutarePatrat;

function setup() {
    let panza = createCanvas(1800, 800);
    panza.parent("canvas-pozitie");

    culoareTablaFundal = '#fad1f8';
    culoareTablaContur = '#e9a2f7';
    culoareIcoane = '#e9a2f7';
    culoarePatratRozFundal = '#ffc0cb';
    culoarePatratRozContur = '#e9a2f7';
    culoareGardContur = '#e9a2f7';

    culoareTitlu = '#e9a2f7';
    culoareInputBorder = '#a78bfa';
    culoareInputFocusRing = '#8b5cf6';
    culoareInputText = '#374151';
    culoareSetariIcon = '#9333ea';
    culoareFooterBackground = '#fad1f8';
    culoareInstructiuniText = '#f5f5dc';
    culoareParagraphText = '#fdfdd7';
    culoareButonStartBackground = '#8b5cf6';
    culoareButonStartText = '#ffffff';
    culoareTextAlegeCuloare = '#e9a2f7';

    document.querySelector('.titlul').style.color = culoareTitlu;
    document.querySelector('footer').style.backgroundColor = culoareFooterBackground;
    document.querySelector('.instructiuni').style.color = culoareInstructiuniText;
    document.querySelectorAll('footer p').forEach(p => p.style.color = culoareParagraphText);


    intrareNume1 = createInput();
    intrareNume1.position(50 + decalajGlobalX, 50);
    intrareNume1.size(200);
    intrareNume1.attribute('placeholder', 'Nume Jucător 1');
    intrareNume1.elt.classList.add('p-2', 'border', 'rounded', 'focus:outline-none', 'focus:ring-2');
    intrareNume1.elt.style.borderColor = culoareInputBorder;
    intrareNume1.elt.style.color = culoareInputText;
    intrareNume1.elt.style.setProperty('--tw-ring-color', culoareInputFocusRing);


    intrareNume2 = createInput();
    intrareNume2.position(50 + decalajGlobalX, 100);
    intrareNume2.size(200);
    intrareNume2.attribute('placeholder', 'Nume Jucător 2');
    intrareNume2.elt.classList.add('p-2', 'border', 'rounded', 'focus:outline-none', 'focus:ring-2');
    intrareNume2.elt.style.borderColor = culoareInputBorder;
    intrareNume2.elt.style.color = culoareInputText;
    intrareNume2.elt.style.setProperty('--tw-ring-color', culoareInputFocusRing);


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
    butonStart.elt.classList.add('font-bold', 'py-2', 'px-4', 'rounded', 'shadow-md');
    butonStart.elt.style.backgroundColor = culoareButonStartBackground;
    butonStart.elt.style.color = culoareButonStartText;


    butonComutarePatrat = createButton('');
    butonComutarePatrat.html('<i class="bi bi-gear-fill"></i>');
    butonComutarePatrat.style('font-size', '45px');
    butonComutarePatrat.position(width - 250, 30);
    butonComutarePatrat.elt.querySelector('i').style.color = culoareSetariIcon;
    butonComutarePatrat.elt.classList.add('bg-transparent', 'border-none', 'focus:outline-none');


    butonComutarePatrat.mousePressed(() => {
        afiseazaPatratSetari = !afiseazaPatratSetari;
    });

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

        // Afișare stare curentă
        textSize(20);
        fill('#000');
        text(`Este rândul lui ${jucatorCurent === 1 ? numeJucator1 : numeJucator2} (${jucatorCurent === 1 ? '❤️' : '⭐'}) - ${etapaMutare === 'muta' ? 'Mută pionul' : 'Plasează zid'}`,
            50 + decalajGlobalX, 80);
    }

    stroke(culoareTablaContur);
    fill(culoareTablaFundal);
    square(452 + decalajGlobalX, 30, 700);

    if (afiseazaPatratSetari) {
        square(width - 435 + decalajGlobalX, 30, 150); 
    }

    dimensiuneCelula = (700 - 2 * spatiu - 8 * spatiu) / 9;
    let startXCasuteMici = (452 + decalajGlobalX) + spatiu;
    let startYCasuteMici = 30 + spatiu;

    deseneazaCasuteMici(8, startXCasuteMici, startYCasuteMici, 9, dimensiuneCelula, spatiu);

    stroke(culoareTablaContur);
    fill(culoareTablaFundal);
    quad(250 + decalajGlobalX, 30, 452 + decalajGlobalX, 30, 452 + decalajGlobalX, 730, 250 + decalajGlobalX, 730);
    quad(1151 + decalajGlobalX, 30, 1351 + decalajGlobalX, 30, 1351 + decalajGlobalX, 730, 1151 + decalajGlobalX, 730);

    for (let z of peretiModificati) {
        fill('#f5f5dc');
        stroke(culoareGardContur);
        if (z === pereteSelectat && mutaPerete) {
            rect(mouseX - z.latime / 2, mouseY - z.inaltime / 2, z.latime, z.inaltime);
        } else {
            rect(z.x, z.y, z.latime, z.inaltime);
        }
    }

    deseneazaPioni();
}

function mousePressed() {
    if (!mutaPerete) {
        for (let z of peretiModificati) {
            if (jucatorCurent === 1 && z.x < width / 2) {
                if (mouseX > z.x && mouseX < z.x + z.latime &&
                    mouseY > z.y && mouseY < z.y + z.inaltime) {
                    pereteSelectat = z;
                    mutaPerete = true;
                    return;
                }
            }
            if (jucatorCurent === 2 && z.x > width / 2) {
                if (mouseX > z.x && mouseX < z.x + z.latime &&
                    mouseY > z.y && mouseY < z.y + z.inaltime) {
                    pereteSelectat = z;
                    mutaPerete = true;
                    return;
                }
            }
        }
    } else {
        if (pereteSelectat) {
            pereteSelectat.x = mouseX - pereteSelectat.latime / 2;
            pereteSelectat.y = mouseY - pereteSelectat.inaltime / 2;
            pereteSelectat = null;

            etapaMutare = "muta";
            jucatorCurent = (jucatorCurent === 1) ? 2 : 1;
        }
        mutaPerete = false;
    }
}

function keyPressed() {
    if (etapaMutare !== "muta") return;

    if (jucatorCurent === 1) {
        if (key === 'w' && pion1.linie > 0) pion1.linie--;
        else if (key === 's' && pion1.linie < 8) pion1.linie++;
        else if (key === 'a' && pion1.coloana > 0) pion1.coloana--;
        else if (key === 'd' && pion1.coloana < 8) pion1.coloana++;
        etapaMutare = "zid";
    }

    if (jucatorCurent === 2) {
        if (keyCode === UP_ARROW && pion2.linie > 0) pion2.linie--;
        else if (keyCode === DOWN_ARROW && pion2.linie < 8) pion2.linie++;
        else if (keyCode === LEFT_ARROW && pion2.coloana > 0) pion2.coloana--;
        else if (keyCode === RIGHT_ARROW && pion2.coloana < 8) pion2.coloana++;
        etapaMutare = "zid";
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
