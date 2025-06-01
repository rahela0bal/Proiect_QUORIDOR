let peretiModificati = [];
let pereteSelectat = null;
let mutaPerete = false;

let intrareNume1, intrareNume2, butonStart;
let numeJucator1 = "";
let numeJucator2 = "";
let numeConfirmate = false;

let jucatorActiv = 1;
let primaMiscareFacuta = false;

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

let pion1;
let pion2;

let pozitiiPosibileZiduri = [];

let ziduriJucator1 = 10;
let ziduriJucator2 = 10;

let pereteSelectatIndex = -1;

let jucator2AIActiv = false;
let butonActivareAI;

let ultimaActiuneAI = 'zid';

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
            butonActivareAI.show();
        }
    });
    butonStart.elt.classList.add('font-bold', 'py-2', 'px-4', 'rounded', 'shadow-md');
    butonStart.elt.style.backgroundColor = culoareButonStartBackground;
    butonStart.elt.style.color = culoareButonStartText;

    butonActivareAI = createButton('Activează AI Jucător 2');
    butonActivareAI.position(50 + decalajGlobalX, 270);
    butonActivareAI.mousePressed(() => {
        jucator2AIActiv = !jucator2AIActiv;
        if (jucator2AIActiv) {
            butonActivareAI.html('Dezactivează AI Jucător 2');
            console.log("AI Jucător 2 activat.");
            if (numeConfirmate && jucatorActiv === 2) {
                miscareAIJucator2();
            }
        } else {
            butonActivareAI.html('Activează AI Jucător 2');
            console.log("AI Jucător 2 dezactivat.");
        }
    });
    butonActivareAI.elt.classList.add('font-bold', 'py-2', 'px-4', 'rounded', 'shadow-md');
    butonActivareAI.elt.style.backgroundColor = '#f5f5dc';
    butonActivareAI.elt.style.color = '#000000';
    butonActivareAI.hide();

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
            ico.div.style('font-size', '36px');
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
        culoareTextAlegeCuloare = '#e9a2f7';

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
            ico.div.style('font-size', '36px');
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
            ico.div.style('font-size', '36px');
        }
    });

    dimensiuneCelula = (700 - 2 * spatiu - 8 * spatiu) / 9;

    let inima = createDiv('<i class="bi bi-heart-fill"></i>');
    inima.style('color', culoareIcoane);
    inima.style('font-size', '36px');
    inima.style('pointer-events', 'none');
    icoane.push({ div: inima, linie: 1, coloana: 4, w: 36, h: 36 });

    let stea = createDiv('<i class="bi bi-star-fill"></i>');
    stea.style('color', culoareIcoane);
    stea.style('font-size', '36px');
    stea.style('pointer-events', 'none');
    icoane.push({ div: stea, linie: 9, coloana: 4, w: 36, h: 36 });

    pion1 = icoane[0];
    pion2 = icoane[1];

    let numarLiniiZiduriLaterale = 10;
    let numarRanduriZiduriLaterale = 2;
    let startXPereti = (452 + decalajXObiecte + decalajGlobalX) + spatiu;
    let latimeInitialaZid = 2 * dimensiuneCelula + spatiu;
    let inaltimeInitialaZid = 5;

    let inaltimeTotalaBlocPerete = (numarLiniiZiduriLaterale - 1) * (dimensiuneCelula + spatiuVerticalPerete) + inaltimeInitialaZid;
    let inaltimePatrat = 730 - 30;
    let spatiuVerticalRamas = inaltimePatrat - inaltimeTotalaBlocPerete;
    let startYPereti = 30 + (spatiuVerticalRamas / 2);

    for (let ii = 0; ii < numarRanduriZiduriLaterale; ii++) {
        let x = startXPereti + ii * (latimeInitialaZid + 752);
        let proprietarZid = (ii === 0) ? 1 : 2;
        for (let i = 0; i < numarLiniiZiduriLaterale; i++) {
            let y = startYPereti + i * (dimensiuneCelula + spatiuVerticalPerete);
            peretiModificati.push({ x: x, y: y, latime: latimeInitialaZid, inaltime: inaltimeInitialaZid, orientare: 'orizontal', proprietar: proprietarZid });
        }
    }

    initializeazaPozitiiPosibileZiduri();
}

function draw() {
    background(255);

    if (numeConfirmate) {
        fill(50);
        textSize(24);
        textAlign(LEFT, TOP);
        text("Jucător 1: " + numeJucator1, 50 + decalajGlobalX, 10);
        text("Ziduri Jucător 1: " + ziduriJucator1, 50 + decalajGlobalX, 40);
        text("Jucător 2: " + numeJucator2, 50 + decalajGlobalX, 70);
        text("Ziduri Jucător 2: " + ziduriJucator2, 50 + decalajGlobalX, 100);
        text("Este rândul lui: " + (jucatorActiv === 1 ? numeJucator1 : numeJucator2), 50 + decalajGlobalX, 130);
    }

    stroke(culoareTablaContur);
    fill(culoareTablaFundal);
    square(452 + decalajGlobalX, 30, 700);

    if (afiseazaPatratSetari) {
        let patratSetariX = width - 435 + decalajGlobalX;
        let patratSetariY = 30;

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

    deseneazaPioni();
}

function mousePressed() {
    if (afiseazaPatratSetari && mouseX > patratCuloareMaro.position().x && mouseX < patratCuloareMaro.position().x + patratCuloareMaro.width &&
        mouseY > patratCuloareMaro.position().y && mouseY < patratCuloareMaro.position().y + patratCuloareMaro.height) {
        return;
    }
    if (afiseazaPatratSetari && mouseX > patratCuloareNegru.position().x && mouseX < patratCuloareNegru.position().x + patratCuloareNegru.width &&
        mouseY > patratCuloareNegru.position().y && mouseY < patratCuloareNegru.position().y + patratCuloareNegru.position().height) {
        return;
    }
    if (afiseazaPatratSetari && mouseX > patratCuloareRoz.position().x && mouseX < patratCuloareRoz.position().x + patratCuloareRoz.width &&
        mouseY > patratCuloareRoz.position().y && mouseY < patratCuloareRoz.position().y + patratCuloareRoz.height) {
        return;
    }

    if (numeConfirmate && primaMiscareFacuta) {
        if (!mutaPerete) {
            for (let i = 0; i < peretiModificati.length; i++) {
                let z = peretiModificati[i];
                if (mouseX > z.x && mouseX < z.x + z.latime &&
                    mouseY > z.y && mouseY < z.y + z.inaltime &&
                    z.proprietar === jucatorActiv &&
                    (z.linieGrila === undefined || z.coloanaGrila === undefined)) {
                    
                    if ((jucatorActiv === 1 && ziduriJucator1 > 0) || (jucatorActiv === 2 && ziduriJucator2 > 0)) {
                        pereteSelectat = z;
                        pereteSelectatIndex = i;
                        mutaPerete = true;
                        return;
                    }
                }
            }
        }
    }
}

function mouseReleased() {
    if (numeConfirmate && primaMiscareFacuta && mutaPerete && pereteSelectat && pereteSelectatIndex !== -1) {
        let celMaiApropiatPunct = gasesteCelMaiApropiatPunctDeAliniere(mouseX, mouseY, pereteSelectat.orientare);

        if (celMaiApropiatPunct) {
            let ziduriTemporare = copiazaZiduri(peretiModificati);
            
            let pozitieOcupata = false;
            for(let i = 0; i < peretiModificati.length; i++) {
                if (i !== pereteSelectatIndex && 
                    peretiModificati[i].linieGrila === celMaiApropiatPunct.linieGrila && 
                    peretiModificati[i].coloanaGrila === celMaiApropiatPunct.coloanaGrila &&
                    peretiModificati[i].orientare === celMaiApropiatPunct.orientare) {
                    pozitieOcupata = true;
                    break;
                }
            }
            if (pozitieOcupata) {
                console.log("Poziția este deja ocupată de un alt zid!");
                pereteSelectat = null;
                mutaPerete = false;
                pereteSelectatIndex = -1;
                return;
            }

            ziduriTemporare[pereteSelectatIndex].x = celMaiApropiatPunct.x;
            ziduriTemporare[pereteSelectatIndex].y = celMaiApropiatPunct.y;
            ziduriTemporare[pereteSelectatIndex].latime = celMaiApropiatPunct.latime;
            ziduriTemporare[pereteSelectatIndex].inaltime = celMaiApropiatPunct.inaltime;
            ziduriTemporare[pereteSelectatIndex].orientare = celMaiApropiatPunct.orientare;
            ziduriTemporare[pereteSelectatIndex].linieGrila = celMaiApropiatPunct.linieGrila;
            ziduriTemporare[pereteSelectatIndex].coloanaGrila = celMaiApropiatPunct.coloanaGrila;

            let caleJucator1Exista = existaCale(pion1.linie, pion1.coloana, 0, ziduriTemporare);
            let caleJucator2Exista = existaCale(pion2.linie, pion2.coloana, 8, ziduriTemporare);

            if (caleJucator1Exista && caleJucator2Exista) {
                peretiModificati[pereteSelectatIndex].x = celMaiApropiatPunct.x;
                peretiModificati[pereteSelectatIndex].y = celMaiApropiatPunct.y;
                peretiModificati[pereteSelectatIndex].latime = celMaiApropiatPunct.latime;
                peretiModificati[pereteSelectatIndex].inaltime = celMaiApropiatPunct.inaltime;
                peretiModificati[pereteSelectatIndex].orientare = celMaiApropiatPunct.orientare;
                peretiModificati[pereteSelectatIndex].linieGrila = celMaiApropiatPunct.linieGrila;
                peretiModificati[pereteSelectatIndex].coloanaGrila = celMaiApropiatPunct.coloanaGrila;

                if (jucatorActiv === 1) {
                    ziduriJucator1--;
                } else {
                    ziduriJucator2--;
                }
                ultimaActiuneAI = 'zid';
                schimbaRandul();
            } else {
                console.log("Plasarea zidului ar bloca calea unui jucător!");
            }
        }
        pereteSelectat = null;
        mutaPerete = false;
        pereteSelectatIndex = -1;
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

function deseneazaPioni() {
    let startX = 452 + decalajGlobalX + spatiu;
    let startY = 30 + spatiu;

    pion1.div.position(
        startX + pion1.coloana * (dimensiuneCelula + spatiu) + (dimensiuneCelula / 2) - (pion1.w / 2),
        startY + pion1.linie * (dimensiuneCelula + spatiu) + (dimensiuneCelula / 2) - (pion1.h / 2)
    );

    pion2.div.position(
        startX + pion2.coloana * (dimensiuneCelula + spatiu) + (dimensiuneCelula / 2) - (pion2.w / 2),
        startY + pion2.linie * (dimensiuneCelula + spatiu) + (dimensiuneCelula / 2) - (pion2.h / 2)
    );
}

function keyPressed() {
    if (numeConfirmate && !mutaPerete) {
        if (jucatorActiv === 1) {
            let pionCurent = pion1;
            let pionAdversar = pion2;

            let linieNoua = pionCurent.linie;
            let coloanaNoua = pionCurent.coloana;
            let miscareReusita = false;

            if (key === 'w') { linieNoua--; }
            else if (key === 's') { linieNoua++; }
            else if (key === 'a') { coloanaNoua--; }
            else if (key === 'd') { coloanaNoua++; }

            if (linieNoua >= 0 && linieNoua < 9 && coloanaNoua >= 0 && coloanaNoua < 9) {
                if (!esteBlocat(pionCurent.linie, pionCurent.coloana, linieNoua, coloanaNoua)) {
                    if (linieNoua === pionAdversar.linie && coloanaNoua === pionAdversar.coloana) {
                        let linieSaritura = linieNoua + (linieNoua - pionCurent.linie);
                        let coloanaSaritura = coloanaNoua + (coloanaNoua - pionCurent.coloana);

                        if (linieSaritura >= 0 && linieSaritura < 9 && coloanaSaritura >= 0 && coloanaSaritura < 9) {
                            if (!esteBlocat(pionAdversar.linie, pionAdversar.coloana, linieSaritura, coloanaSaritura)) {
                                pionCurent.linie = linieSaritura;
                                pionCurent.coloana = coloanaSaritura;
                                miscareReusita = true;
                            } else {
                                console.log("Săritura este blocată de un zid!");
                            }
                        }
                    } else {
                        pionCurent.linie = linieNoua;
                        pionCurent.coloana = coloanaNoua;
                        miscareReusita = true;
                    }
                } else {
                    console.log("Mișcarea este blocată de un zid!");
                }
            }

            if (miscareReusita) {
                if (!primaMiscareFacuta) {
                    primaMiscareFacuta = true;
                }
                schimbaRandul();
            }

        } else if (jucatorActiv === 2) {
            if (jucator2AIActiv) {
                miscareAIJucator2();
            } else {
                let pionCurent = pion2;
                let pionAdversar = pion1;

                let linieNoua = pionCurent.linie;
                let coloanaNoua = pionCurent.coloana;
                let miscareReusita = false;

                if (keyCode === UP_ARROW) { linieNoua--; }
                else if (keyCode === DOWN_ARROW) { linieNoua++; }
                else if (keyCode === LEFT_ARROW) { coloanaNoua--; }
                else if (keyCode === RIGHT_ARROW) { coloanaNoua++; }

                if (linieNoua >= 0 && linieNoua < 9 && coloanaNoua >= 0 && coloanaNoua < 9) {
                    if (!esteBlocat(pionCurent.linie, pionCurent.coloana, linieNoua, coloanaNoua)) {
                        if (linieNoua === pionAdversar.linie && coloanaNoua === pionAdversar.coloana) {
                            let linieSaritura = linieNoua + (linieNoua - pionCurent.linie);
                            let coloanaSaritura = coloanaNoua + (coloanaNoua - pionCurent.coloana);

                            if (linieSaritura >= 0 && linieSaritura < 9 && coloanaSaritura >= 0 && coloanaSaritura < 9) {
                                if (!esteBlocat(pionAdversar.linie, pionAdversar.coloana, linieSaritura, coloanaSaritura)) {
                                    pionCurent.linie = linieSaritura;
                                    pionCurent.coloana = coloanaSaritura;
                                    miscareReusita = true;
                                } else {
                                    console.log("Săritura este blocată de un zid!");
                                }
                            }
                        } else {
                            pionCurent.linie = linieNoua;
                            pionCurent.coloana = coloanaNoua;
                            miscareReusita = true;
                        }
                    } else {
                        console.log("Mișcarea este blocată de un zid!");
                    }
                }

                if (miscareReusita) {
                    schimbaRandul();
                }
            }
        }
    }

    if (numeConfirmate && primaMiscareFacuta) {
        if (pereteSelectat && (key === 'v' || key === 'o')) {
            let tempLatime = pereteSelectat.latime;
            pereteSelectat.latime = pereteSelectat.inaltime;
            pereteSelectat.inaltime = tempLatime;

            if (pereteSelectat.orientare === 'orizontal') {
                pereteSelectat.orientare = 'vertical';
            } else {
                pereteSelectat.orientare = 'orizontal';
            }
        }
    }
}

function schimbaRandul() {
    jucatorActiv = jucatorActiv === 1 ? 2 : 1;
    if (jucatorActiv === 2 && jucator2AIActiv) {
        setTimeout(miscareAIJucator2, 500);
    }
}

function initializeazaPozitiiPosibileZiduri() {
    pozitiiPosibileZiduri = [];
    let startXTabla = 452 + decalajGlobalX;
    let startYTabla = 30;

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let x = startXTabla + spatiu + c * (dimensiuneCelula + spatiu);
            let y = startYTabla + spatiu + (r + 1) * (dimensiuneCelula + spatiu) - spatiuVerticalPerete;
            let latime = 2 * dimensiuneCelula + spatiu;
            let inaltime = 5;
            pozitiiPosibileZiduri.push({ x: x, y: y, latime: latime, inaltime: inaltime, orientare: 'orizontal', tip: 'zid', linieGrila: r, coloanaGrila: c });
        }
    }

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let x = startXTabla + spatiu + (c + 1) * (dimensiuneCelula + spatiu) - spatiuVerticalPerete;
            let y = startYTabla + spatiu + r * (dimensiuneCelula + spatiu);
            let latime = 5;
            let inaltime = 2 * dimensiuneCelula + spatiu;
            pozitiiPosibileZiduri.push({ x: x, y: y, latime: latime, inaltime: inaltime, orientare: 'vertical', tip: 'zid', linieGrila: r, coloanaGrila: c });
        }
    }
}

function gasesteCelMaiApropiatPunctDeAliniere(mouseX, mouseY, orientareCurenta) {
    let celMaiApropiat = null;
    let distantaMinima = Infinity;
    const toleranta = 50;

    for (let pos of pozitiiPosibileZiduri) {
        if (pos.orientare === orientareCurenta) {
            let centerX = pos.x + pos.latime / 2;
            let centerY = pos.y + pos.inaltime / 2;

            let d = dist(mouseX, mouseY, centerX, centerY);

            if (d < distantaMinima) {
                distantaMinima = d;
                celMaiApropiat = pos;
            }
        }
    }

    if (distantaMinima > toleranta) {
        return null;
    }
    return celMaiApropiat;
}

function esteBlocat(linieCurenta, coloanaCurenta, linieNoua, coloanaNoua, ziduriVerificare = peretiModificati) {
    for (let perete of ziduriVerificare) {
        if (perete.linieGrila === undefined || perete.coloanaGrila === undefined) {
            continue;
        }

        if (coloanaCurenta === coloanaNoua) {
            if (linieNoua < linieCurenta) {
                if (perete.orientare === 'orizontal' &&
                    perete.linieGrila === linieNoua &&
                    (perete.coloanaGrila === coloanaCurenta || perete.coloanaGrila === coloanaCurenta - 1)) {
                    return true;
                }
            }
            else if (linieNoua > linieCurenta) {
                if (perete.orientare === 'orizontal' &&
                    perete.linieGrila === linieCurenta &&
                    (perete.coloanaGrila === coloanaCurenta || perete.coloanaGrila === coloanaCurenta - 1)) {
                    return true;
                }
            }
        }
        else if (linieCurenta === linieNoua) {
            if (coloanaNoua < coloanaCurenta) {
                if (perete.orientare === 'vertical' &&
                    perete.coloanaGrila === coloanaNoua &&
                    (perete.linieGrila === linieCurenta || perete.linieGrila === linieCurenta - 1)) {
                    return true;
                }
            }
            else if (coloanaNoua > coloanaCurenta) {
                if (perete.orientare === 'vertical' &&
                    perete.coloanaGrila === coloanaCurenta &&
                    (perete.linieGrila === linieCurenta || perete.linieGrila === linieCurenta - 1)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function existaCale(startLinie, startColoana, linieFinala, ziduriVerificare) {
    const coada = [[startLinie, startColoana]];
    const vizitat = new Set();
    vizitat.add(`${startLinie},${startColoana}`);

    const directii = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    while (coada.length > 0) {
        const [linieCurenta, coloanaCurenta] = coada.shift();

        if (linieCurenta === linieFinala) {
            return true;
        }

        for (const [dl, dc] of directii) {
            const linieNoua = linieCurenta + dl;
            const coloanaNoua = coloanaCurenta + dc;

            if (linieNoua >= 0 && linieNoua < 9 && coloanaNoua >= 0 && coloanaNoua < 9) {
                if (!esteBlocat(linieCurenta, coloanaCurenta, linieNoua, coloanaNoua, ziduriVerificare)) {
                    const cheieNoua = `${linieNoua},${coloanaNoua}`;
                    if (!vizitat.has(cheieNoua)) {
                        vizitat.add(cheieNoua);
                        coada.push([linieNoua, coloanaNoua]);
                    }
                }
            }
        }
    }
    return false;
}

function copiazaZiduri(ziduriOriginale) {
    return ziduriOriginale.map(zid => ({ ...zid }));
}

function incercaMiscarePionAI() {
    let pionCurent = pion2;
    let pionAdversar = pion1;
    let miscareReusita = false;

    const directiiIncercate = [
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 0]
    ];

    for (const [dl, dc] of directiiIncercate) {
        let linieNoua = pionCurent.linie + dl;
        let coloanaNoua = pionCurent.coloana + dc;

        if (linieNoua >= 0 && linieNoua < 9 && coloanaNoua >= 0 && coloanaNoua < 9) {
            if (!esteBlocat(pionCurent.linie, pionCurent.coloana, linieNoua, coloanaNoua)) {
                if (linieNoua === pionAdversar.linie && coloanaNoua === pionAdversar.coloana) {
                    let linieSaritura = linieNoua + dl;
                    let coloanaSaritura = coloanaNoua + dc;

                    if (linieSaritura >= 0 && linieSaritura < 9 && coloanaSaritura >= 0 && coloanaSaritura < 9) {
                        if (!esteBlocat(pionAdversar.linie, pionAdversar.coloana, linieSaritura, coloanaSaritura)) {
                            pionCurent.linie = linieSaritura;
                            pionCurent.coloana = coloanaSaritura;
                            miscareReusita = true;
                            break;
                        }
                    }
                } else {
                    pionCurent.linie = linieNoua;
                    pionCurent.coloana = coloanaNouă;
                    miscareReusita = true;
                    break;
                }
            }
        }
    }
    return miscareReusita;
}

function incercaPlasareZidAI() {
    if (ziduriJucator2 <= 0) {
        return false;
    }

    let zidDisponibilIndex = -1;
    for (let i = 0; i < peretiModificati.length; i++) {
        let z = peretiModificati[i];
        if (z.proprietar === 2 && (z.linieGrila === undefined || z.coloanaGrila === undefined)) {
            zidDisponibilIndex = i;
            break;
        }
    }

    if (zidDisponibilIndex === -1) {
        return false;
    }

    let candidatiZiduriValizi = [];
    const orientariIncercate = ['orizontal', 'vertical'];

    for (let orientare of orientariIncercate) {
        for (let pos of pozitiiPosibileZiduri) {
            if (pos.orientare === orientare) {
                let ziduriTemporare = copiazaZiduri(peretiModificati);
                
                ziduriTemporare[zidDisponibilIndex].x = pos.x;
                ziduriTemporare[zidDisponibilIndex].y = pos.y;
                ziduriTemporare[zidDisponibilIndex].latime = pos.latime;
                ziduriTemporare[zidDisponibilIndex].inaltime = pos.inaltime;
                ziduriTemporare[zidDisponibilIndex].orientare = pos.orientare;
                ziduriTemporare[zidDisponibilIndex].linieGrila = pos.linieGrila;
                ziduriTemporare[zidDisponibilIndex].coloanaGrila = pos.coloanaGrila;

                let pozitieOcupata = false;
                for(let i = 0; i < peretiModificati.length; i++) {
                    if (i !== zidDisponibilIndex && 
                        peretiModificati[i].linieGrila === pos.linieGrila && 
                        peretiModificati[i].coloanaGrila === pos.coloanaGrila &&
                        peretiModificati[i].orientare === pos.orientare) {
                        pozitieOcupata = true;
                        break;
                    }
                }
                if (pozitieOcupata) continue;

                let caleJucator1Exista = existaCale(pion1.linie, pion1.coloana, 0, ziduriTemporare);
                let caleJucator2Exista = existaCale(pion2.linie, pion2.coloana, 8, ziduriTemporare);

                if (caleJucator1Exista && caleJucator2Exista) {
                    candidatiZiduriValizi.push(pos);
                }
            }
        }
    }

    if (candidatiZiduriValizi.length > 0) {
        let pozitieAleatorie = random(candidatiZiduriValizi);

        peretiModificati[zidDisponibilIndex].x = pozitieAleatorie.x;
        peretiModificati[zidDisponibilIndex].y = pozitieAleatorie.y;
        peretiModificati[zidDisponibilIndex].latime = pozitieAleatorie.latime;
        peretiModificati[zidDisponibilIndex].inaltime = pozitieAleatorie.inaltime;
        peretiModificati[zidDisponibilIndex].orientare = pozitieAleatorie.orientare;
        peretiModificati[zidDisponibilIndex].linieGrila = pozitieAleatorie.linieGrila;
        peretiModificati[zidDisponibilIndex].coloanaGrila = pozitieAleatorie.coloanaGrila;

        ziduriJucator2--;
        return true;
    }
    return false;
}


function miscareAIJucator2() {
    let miscareEfectuata = false;

    if (ultimaActiuneAI === 'zid') {
        miscareEfectuata = incercaMiscarePionAI();
        if (miscareEfectuata) {
            ultimaActiuneAI = 'pion';
        } else {
            miscareEfectuata = incercaPlasareZidAI();
            if (miscareEfectuata) {
                ultimaActiuneAI = 'zid';
            }
        }
    } else {
        miscareEfectuata = incercaPlasareZidAI();
        if (miscareEfectuata) {
            ultimaActiuneAI = 'zid';
        } else {
            miscareEfectuata = incercaMiscarePionAI();
            if (miscareEfectuata) {
                ultimaActiuneAI = 'pion';
            }
        }
    }

    schimbaRandul();
}