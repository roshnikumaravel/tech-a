let fontBLK, fontREG;
let points = [];
let slider, slider2;
let input, inputText;
let charLength, seperateLines = [];
let size;
let marginL, marginR, marginT;
let textX = marginL, textY;
let textR = 15, textG = 15, textB = 15;
let bgR = 250, bgG = 250, bgB = 250;
let autoR = 150, autoG = 150, autoB = 150, autoT = 255, autoMode=0;
let ang = 0.01;

function preload() {
    fontBLK = loadFont('FengardoNeue_Black.otf');
    fontREG = loadFont('FengardoNeue_Regular.otf')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    marginL = 50;
    marginR = windowWidth-marginL; 
    marginT = 75;
    textFont(fontBLK);
    textSize(size);
    
    // happy/anxious slider
    slider = createSlider(-50,50,0);
    slider.position(marginL,marginT);
    slider.style('width', '200px');
    
    //font size slider
    slider2 = createSlider(40,150,40);
    slider2.position(marginL+220,marginT);
    slider2.style('width', '200px')
    
    //text input box
    input = createInput('\"as the indispensable packaging for things produced, as a general gloss on the rationality of the system, and as the advanced economic sector directly responsible for the manufacture of an ever-growing mass of image-objects, the spectacle is the chief product of present day society\" - guy debord, the society of the spectacle');
    input.position(marginL+440,marginT+5);
    input.style('width', marginR-marginL-448+'px');
    
    frameRate(10);
}



function draw() {
    background(bgR,bgG,bgB);
    
    // margins
    // line(marginL,0,marginL,height);
    // line(marginR,0,marginR,height);
    // line(0,marginT,width,marginT);
    // line(0,height-marginT,width,height-marginT);
    
    push();
    strokeWeight(0.5);
    stroke(150);
    line(marginL,marginT+50,marginR,marginT+50);
    pop();
    
    fill(textR,textG,textB);
    stroke(textR,textG,textB);
    
    
    size = slider2.value();
    charLength = floor((marginR-marginL)/(size/2.25));
    textSize(size);
    inputText = input.value();
    textX = marginL;
    textY=150+size;
    lineCount = floor((height-300)/(size));
    for(i=0; i<lineCount; i++) { 
        let start = i*charLength;
        if(inputText.substring(start,start+1)==' ') {
            start++;
        }
        let stop = (i*charLength)+charLength;
        seperateLines[i]=inputText.substring(start,stop);
    }
    
    for(i=0;i<lineCount;i++)
    {text(seperateLines[i],textX, textY+size*i*1.08);  }
    
    //text and labels
    push();
    fill(150);
    noStroke();
    textFont(fontREG);
    textSize(12);
    text('enter text here:', marginL+440, marginT);
    text('text size:', marginL+222, marginT);
    text('happy', marginL+2, marginT);
    textAlign(RIGHT);
    text('anxious', 252, marginT);
    if (mouseX>=marginL+2 && mouseX<=marginL+32 && mouseY>=marginT+20 && mouseY<=marginT+30) {
        if (autoMode==0){
            fill(autoR-40, autoG-40, autoB-40);
        } else {
            fill(110,110,110);
        }
    } else {
        fill(autoR,autoG,autoB);
    }
    rect(marginL+2,marginT+20,30,10,5)
    fill(autoT);
    textAlign(CENTER);
    textSize(8);
    text('AUTO',marginL+17,marginT+28)
    pop();
    
    let val, x;
    if (autoMode==1) {
        val=map(sin(ang),-1,1,-50,50)
        slider.value(val);
    } else {
        val = slider.value();
    }
    let SF;
    ang+=0.065;
    
    //anxiety
    if (val>0){
        //mapping text colour to slider value
        // textR = map(val,0,50,0,77);
        // textG = map(val,0,50,0,91);
        // textB = map(val,0,50,0,113);
        
        //mapping sample factor to slider value
        SF = map(val,0,50,0.2,map(size,40,150,0.82,0.95)); 
        
        for(i=0; i<lineCount; i++){
            points[i] = fontBLK.textToPoints(seperateLines[i], textX, textY+size*i*1.08, size, {sampleFactor:SF});
        }
        
        //mapping line distortion to slider value
        let lineX = map(val,0,50,0,map(size,40,150,12,35));
        let lineY = map(val,0,50,0,map(size,40,150,2,5));
        
        //render loop
        for (let j=0; j<lineCount; j++) {
            for (let i=0; i<points[j].length; i++) {
                let x = random(lineX);
                let y = random(lineY);
                push();
                strokeWeight(random(0.5,1.5));
                line(points[j][i].x-x, points[j][i].y-y, points[j][i].x+x, points[j][i].y+y);
                pop();
            }
        }
    }
    
    //happiness
    if (val<0){
        //mapping text colour to slider value
        // textR = map(val,-50,0,180,0);
        // textG = map(val,-50,0,52,0);
        // textB = map(val,-50,0,45,0);
        
        //mapping sample factor to slider value
        SF = map(val,-50,0,map(size,40,150,0.22,0.12),0.2);
        
        for(i=0; i<lineCount; i++) {
            points[i] = fontBLK.textToPoints(seperateLines[i], textX, textY+size*i*1.08, size, {sampleFactor:SF});
        }
        
        //mapping dot distortion sizes to slider value
        let dotSize= map(val,-50,0,map(size,40,150,5,12),0); 
        
        //render loop
        for (let j=0; j<lineCount; j++) {
            for (let i=0; i<points[j].length; i++) {
                //ellipse(points[i].x, points[i].y, dotSize,dotSize);
                let x = constrain(random(dotSize-3,dotSize),0,15);
                ellipse(points[j][i].x, points[j][i].y, x,x);
            }
        }
        
    }
}

function mousePressed() {
    if (mouseX>=marginL+2 && mouseX<=marginL+32 && mouseY>=marginT+20 && mouseY<=marginT+30) {
        if (autoMode==0) {
            autoR = 0;
            autoG = 0;
            autoB = 255;
            autoT = 255;
            if (ang!=0) {ang=0;}
            autoMode = 1;
        } else {
            autoR = 150;
            autoG = 150;
            autoB = 150;
            autoT = 255;
            autoMode = 0;
        }
    } 
}
