let objectDetector;

let img;
let objects = [];
let modelLoaded;

const imgEl = document.querySelector("#photo");

function preload() {
  if (!imgEl.src) {
    img = loadImage(imgEl.src);
  }
}

function setup() {
  createCanvas(640, 420);
  objectDetector = ml5.objectDetector('cocossd', modelReady);
}

function modelReady() {
  modelLoaded = true;
  // document.querySelector("#model-feedback").visibility = "hidden";
  objectDetector.detect(img, gotResult);
}

function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results)
  objects = results;
}

function draw() {
  // enkel tekenen als model geladen werd
  image(img, 0, 0);
  if (modelLoaded) {
    //teken groene kader rond elk gevonden object
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].confidence > 0.5) {

        noStroke();
        fill(0, 208, 133);
        // textSize(8);
        text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x + 8, objects[i].y + 12);
        noFill();
        strokeWeight(4);
        stroke(0, 208, 133);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
  }
}