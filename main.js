var lastResult = ""
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
  synth = window.speechSynthesis


}

function draw() {
  image(video, 0, 0, 300, 300)
  classifier.classify(video, gotResults)
}

function modelLoaded() {
  console.log("Loaded Successfully")
}

function gotResults(error, results) {
  if (error) {
    console.error(error)
  } else {
    //console.log(results)
    if (results[0].confidence > 0.5 && lastResult != results[0].label) {
      console.log(results[0].label + "-" + results[0].confidence)
      document.getElementById("objectName").innerHTML = results[0].label
      document.getElementById("Accuracy").innerHTML = results[0].confidence.toFixed(3)
      var utterThis = new SpeechSynthesisUtterance("object detected is " + results[0].label)
      synth.speak(utterThis)
      lastResult = results[0].label
    }


  }
}





