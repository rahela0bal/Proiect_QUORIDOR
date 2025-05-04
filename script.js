function setup() {
    let canvas = createCanvas(1604, 815);
    canvas.parent("canvas-pozitie"); 

  }

  function draw() { 
    stroke('#e9a2f7');
    fill('#fad1f8'); 

    square(452, 30, 700);

    casuteMici(11, 466, 45, 12);
    
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