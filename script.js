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

let textAlegeCuloare;
let patratCuloareMaro;
let patratCuloareRoz;
let patratCuloareNegru;

let culoareTablaFundal;
let culoareTablaContur;
let culoareIcoane;
let culoarePatratRozFundal;
let culoarePatratRozContur;

let culoareTitlu;
let culoareInputBorder;
let culoareInputFocusRing;
let culoareInputText;
let culoareSetariIcon;
let culoareGardContur;
let culoareFooterBackground;
let culoareInstructiuniText;
let culoareParagraphText;
let culoareButonStartBackground;
let culoareButonStartText;
let culoareTextAlegeCuloare;


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
        if (afiseazaPatratSetari) {
            textAlegeCuloare.show();
            patratCuloareMaro.show();
            patratCuloareRoz.show();
            patratCuloareNegru.show();
        } else {
            textAlegeCuloare.hide();
            patratCuloareMaro.hide();
            patratCuloareRoz.hide();
            patratCuloareNegru.hide();
        }
    });


    textAlegeCuloare = createDiv('Alegeți Culoare');
    textAlegeCuloare.style('color', culoareTextAlegeCuloare);
    textAlegeCuloare.style('font-size', '16px');
    textAlegeCuloare.style('font-weight', 'bold');
    textAlegeCuloare.hide();

    patratCuloareMaro = createDiv('');
    patratCuloareMaro.style('width', '25px');
    patratCuloareMaro.style('height', '25px');
    patratCuloareMaro.style('background-color', 'brown');
    patratCuloareMaro.style('border', '2px solid #5a2d0b');
    patratCuloareMaro.hide();
    patratCuloareMaro.mousePressed(() => {
        culoareTablaFundal = '#D2B48C';
        culoareTablaContur = '#A0522D';
        culoareIcoane = '#A0522D';
        culoareGardContur = '#A0522D';

        culoareTitlu = '#A0522D';
        culoareInputBorder = '#8B4513';
        culoareInputFocusRing = '#CD853F';
        culoareInputText = '#4A2B1A';
        culoareSetariIcon = '#A0522D';
        culoareFooterBackground = '#D2B48C';
        culoareInstructiuniText = '#4A2B1A';
        culoareParagraphText = '#4A2B1A';
        culoareButonStartBackground = '#CD853F';
        culoareButonStartText = '#FFFFFF';
        culoareTextAlegeCuloare = '#4A2B1A';

        document.querySelector('.titlul').style.color = culoareTitlu;
        document.querySelector('footer').style.backgroundColor = culoareFooterBackground;
        document.querySelector('.instructiuni').style.color = culoareInstructiuniText;
        document.querySelectorAll('footer p').forEach(p => p.style.color = culoareParagraphText);

        intrareNume1.elt.style.borderColor = culoareInputBorder;
        intrareNume1.elt.style.color = culoareInputText;
        intrareNume1.elt.style.setProperty('--tw-ring-color', culoareInputFocusRing);

        intrareNume2.elt.style.borderColor = culoareInputBorder;
        intrareNume2.elt.style.color = culoareInputText;
        intrareNume2.elt.style.setProperty('--tw-ring-color', culoareInputFocusRing);

        butonComutarePatrat.elt.querySelector('i').style.color = culoareSetariIcon;

        butonStart.elt.style.backgroundColor = culoareButonStartBackground;
        butonStart.elt.style.color = culoareButonStartText;

        textAlegeCuloare.style('color', culoareTextAlegeCuloare);

        for (let ico of icoane) {
            ico.div.style('color', culoareIcoane);
        }
    });


    patratCuloareRoz = createDiv('');
    patratCuloareRoz.style('width', '25px');
    patratCuloareRoz.style('height', '25px');
    patratCuloareRoz.style('background-color', culoarePatratRozFundal);
    patratCuloareRoz.style('border', `2px solid ${culoarePatratRozContur}`);
    patratCuloareRoz.hide();
    patratCuloareRoz.mousePressed(() => {
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
        culoareTextAlegeCuloare = '#e9a2f7'; // Asigură că textul devine roz

        document.querySelector('.titlul').style.color = culoareTitlu;
        document.querySelector('footer').style.backgroundColor = culoareFooterBackground;
        document.querySelector('.instructiuni').style.color = culoareInstructiuniText;
        document.querySelectorAll('footer p').forEach(p => p.style.color = culoareParagraphText);

        intrareNume1.elt.style.borderColor = culoareInputBorder;
        intrareNume1.elt.style.color = culoareInputText;
        intrareNume1.elt.style.setProperty('--tw-ring-color', culoareInputFocusRing);

        intrareNume2.elt.style.borderColor = culoareInputBorder;
        intrareNume2.elt.style.color = culoareInputText;
        intrareNume2.elt.style.setProperty('--tw-ring-color', culoareInputFocusRing);

        butonComutarePatrat.elt.querySelector('i').style.color = culoareSetariIcon;

        butonStart.elt.style.backgroundColor = culoareButonStartBackground;
        butonStart.elt.style.color = culoareButonStartText;

        textAlegeCuloare.style('color', culoareTextAlegeCuloare);

        for (let ico of icoane) {
            ico.div.style('color', culoareIcoane);
        }
    });


    patratCuloareNegru = createDiv('');
    patratCuloareNegru.style('width', '25px');
    patratCuloareNegru.style('height', '25px');
    patratCuloareNegru.style('background-color', 'black');
    patratCuloareNegru.style('border', '2px solid #333');
    patratCuloareNegru.hide();
    patratCuloareNegru.mousePressed(() => {
        culoareTablaFundal = '#FFFFFF';
        culoareTablaContur = '#000000';
        culoareIcoane = '#000000';
        culoareGardContur = '#000000';

        culoareTitlu = '#000000';
        culoareInputBorder = '#333333';
        culoareInputFocusRing = '#666666';
        culoareInputText = '#000000';
        culoareSetariIcon = '#000000';
        culoareFooterBackground = '#EEEEEE';
        culoareInstructiuniText = '#333333';
        culoareParagraphText = '#333333';
        culoareButonStartBackground = '#333333';
        culoareButonStartText = '#FFFFFF';
        culoareTextAlegeCuloare = '#000000';

        document.querySelector('.titlul').style.color = culoareTitlu;
        document.querySelector('footer').style.backgroundColor = culoareFooterBackground;
        document.querySelector('.instructiuni').style.color = culoareInstructiuniText;
        document.querySelectorAll('footer p').forEach(p => p.style.color = culoareParagraphText);

        intrareNume1.elt.style.borderColor = culoareInputBorder;
        intrareNume1.elt.style.color = culoareInputText;
        intrareNume1.elt.style.setProperty('--tw-ring-color', culoareInputFocusRing);

        intrareNume2.elt.style.borderColor = culoareInputBorder;
        intrareNume2.elt.style.color = culoareInputText;
        intrareNume2.elt.style.setProperty('--tw-ring-color', culoareInputFocusRing);

        butonComutarePatrat.elt.querySelector('i').style.color = culoareSetariIcon;

        butonStart.elt.style.backgroundColor = culoareButonStartBackground;
        butonStart.elt.style.color = culoareButonStartText;

        textAlegeCuloare.style('color', culoareTextAlegeCuloare);

        for (let ico of icoane) {
            ico.div.style('color', culoareIcoane);
        }
    });


    let inima = createDiv('<i class="bi bi-heart-fill"></i>');
    inima.style('color', culoareIcoane);
    inima.style('font-size', '24px');
    inima.position(759 + decalajGlobalX, 145);
    inima.style('pointer-events', 'none');
    icoane.push({ div: inima, x: 759 + decalajGlobalX, y: 145, w: 24, h: 24 });

    let stea = createDiv('<i class="bi bi-star-fill"></i>');
    stea.style('color', culoareIcoane);
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

    stroke(culoareTablaContur);
    fill(culoareTablaFundal);
    square(452 + decalajGlobalX, 30, 700);

    if (afiseazaPatratSetari) {
        let patratSetariX = width - 435 + decalajGlobalX;
        let patratSetariY = 30;
        let patratSetariDim = 150;

        textAlegeCuloare.position(patratSetariX + 10, patratSetariY + 10);
        patratCuloareMaro.position(patratSetariX + 10, patratSetariY + 40);
        patratCuloareRoz.position(patratSetariX + 10 + 25 + 5, patratSetariY + 40);
        patratCuloareNegru.position(patratSetariX + 10 + 25 + 5 + 25 + 5, patratSetariY + 40);
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

    for (let ico of icoane) {
        ico.div.position(ico.x, ico.y);
    }
}

function mousePressed() {
    if (afiseazaPatratSetari && mouseX > patratCuloareMaro.position().x && mouseX < patratCuloareMaro.position().x + patratCuloareMaro.width &&
        mouseY > patratCuloareMaro.position().y && mouseY < patratCuloareMaro.position().y + patratCuloareMaro.height) {
        return;
    }
    if (afiseazaPatratSetari && mouseX > patratCuloareNegru.position().x && mouseX < patratCuloareNegru.position().x + patratCuloareNegru.width &&
        mouseY > patratCuloareNegru.position().y && mouseY < patratCuloareNegru.position().y + patratCuloareNegru.height) {
        return;
    }
    if (afiseazaPatratSetari && mouseX > patratCuloareRoz.position().x && mouseX < patratCuloareRoz.position().x + patratCuloareRoz.width &&
        mouseY > patratCuloareRoz.position().y && mouseY < patratCuloareRoz.position().y + patratCuloareRoz.height) {
        return;
    }

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
    stroke(culoareTablaContur);
    fill('#f5f5dc');
    for (let ii = 0; ii < rand; ii++) {
        for (let i = 0; i <= nr; i++) {
            let x = startX + i * (dim + spatiu);
            let y = startY + ii * (dim + spatiu);
            square(x, y, dim);
        }
    }
}

