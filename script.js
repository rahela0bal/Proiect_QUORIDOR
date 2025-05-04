let inputNume1, inputNume2, butonConfirmare; 
let numeJucator1 = "", numeJucator2 = ""; 
let numeConfirmate = false; 

let iconite = []; 
let iconitaSelectata = null; 
let mutaIconita = false; 

function setup() {
    let canvas = createCanvas(1604, 815); 
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
    
    let stea = createDiv('<i class="bi bi-star-fill"></i>'); 
    stea.style('color', '#e9a2f7'); 
    stea.style('font-size', '24px'); 
    stea.position(815, 758); 
    stea.style('pointer-events', 'none'); 

    
    iconite.push({ div: inima, x: 759, y: 145, w: 24, h: 24 });
    iconite.push({ div: stea, x: 815, y: 758, w: 24, h: 24 });
}

function draw() {
    background(255); 

    
    for (let ico of iconite) {
        ico.div.position(ico.x, ico.y); 
    }

    
    stroke('#e9a2f7');
    fill('#fad1f8'); 
    square(452, 30, 700);
    casuteMici(11, 466, 45, 12);

    stroke('#e9a2f7');
    fill('#fad1f8');
    arc(402, 30, 100, 50, radians(180), radians(0));
    arc(402, 730, 100, 50, radians(0), radians(180));
    arc(1201, 30, 100, 50, radians(180), radians(0));
    arc(1201, 730, 100, 50, radians(0), radians(180));

    quad(351, 30, 452, 30, 452, 730, 351, 730);
    quad(1251, 30, 1151, 30, 1151, 730, 1251, 730);

    ziduri(13, 372, 42, 2);
}

function mousePressed() {
    if (!mutaIconita) {  
        for (let ico of iconite) {
            if (mouseX > ico.x && mouseX < ico.x + ico.w && mouseY > ico.y && mouseY < ico.y + ico.h) {
                iconitaSelectata = ico; 
                mutaIconita = true;  
                return;
            }
        }
    } else {
        if (iconitaSelectata) {
            iconitaSelectata.x = mouseX - iconitaSelectata.w / 2; 
            iconitaSelectata.y = mouseY - iconitaSelectata.h / 2;  
            iconitaSelectata.div.position(iconitaSelectata.x, iconitaSelectata.y);  
            iconitaSelectata = null;  
            mutaIconita = false;  
        }
    }
}

function ziduri(nrLinii, startX, startY, rand) {
    stroke('#e9a2f7');
    fill('#f5f5dc');
    let latime = 51;
    let inaltime = 5;

    for (let ii = 0; ii < rand; ii++) {
        let x = startX + ii * (latime + 752); 
        for (let i = 0; i < nrLinii; i++) {
            let y = startY + i * (inaltime + 51); 
            rect(x, y, latime, inaltime);
        }
    }
}

function casuteMici(nr, startX, startY, rand) {
    stroke('#e9a2f7');
    fill('#f5f5dc');
    let size = 51;
    for (let ii = 0; ii < rand; ii++) {
        for (let i = 0; i <= nr; i++) {
            let x = startX + i * (size + 5);
            let y = startY + ii * (size + 5);
            square(x, y, size);
        }
    }
}
