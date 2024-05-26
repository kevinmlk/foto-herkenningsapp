const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

const startBtn = document.querySelector('#start-button');
const closeBtn = document.querySelector('#close-button');
const flipBtn  = document.querySelector('#flip-button');
const snapshotBtn = document.querySelector('#snapshot-button');

startBtn.addEventListener('click', () => {

  webcam.start()
  .then(result =>{
    console.log("webcam started");
  })
  .catch(err => {
      console.log(err);
  });
});

closeBtn.addEventListener('click', () => {
  webcam.stop();
});

flipBtn.addEventListener('click', () => {
  webcam.flip();
  webcam.start();  
});

snapshotBtn.addEventListener('click', () => {
  let picture = webcam.snap();
  document.querySelector('#photo').src = picture;
  document.querySelector('#detect-objects').classList.remove('d-none');
});
