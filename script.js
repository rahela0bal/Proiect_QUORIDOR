function setup() {
    let canvas = createCanvas(1604, 815);
    canvas.parent("canvas-pozitie"); 

  }

  function draw() { 
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

    quad(351, 30, 452, 30, 452, 730, 351, 730)
    quad(1251, 30, 1151, 30, 1151, 730, 1251, 730)


    stroke('#e9a2f7');
    fill('#f5f5dc');

    quad(372, 40, 430, 40, 430, 45, 372, 45);

  }

  function casuteMici(nr,startX, startY,rand){
    stroke('#e9a2f7');
    fill('#f5f5dc');
    let size = 51;
        for( let ii = 0; ii < rand; ii++){
            for ( let i=0; i<=nr; i++){
            let x = startX + i * (size + 5);
            let y = startY + ii * (size + 5);
                square(x, y, size);
        }
    }
}
