const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
let modelHasLoaded = false;

function modelLoaded() {
  console.log('Yay, the model has loaded!');
  document.querySelector("#title").innerText = "Model loaded!";
  modelHasLoaded = true;
}

document.querySelector('#photo').addEventListener('click', function (e) {
  console.log(e.target);
  if (modelHasLoaded && e.target instanceof HTMLImageElement) {
    classifier.classify(e.target, (err, results) => {
      console.log(results);
      // e.target.nextElementSibling.innerHTML = '';
      for (let result of results) {
        console.log(result);
        if (result.confidence >= 0.01) {//0.8
          document.querySelector('#results').innerHTML += `<h2>${result.label}</h2>`;
        } else {
          document.querySelector('#results').innerHTML = `<h2>no result found</h2>`
        }
      }

    });
  }
});
