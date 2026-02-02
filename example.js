let classifier;
let img;
let labelP;

function preload() {
  console.log("1. Preload started");
  classifier = ml5.imageClassifier("MobileNet", () => {
    console.log("2. MobileNet loaded");
  });
  img = loadImage("image.png", 
    () => console.log("3. Image loaded successfully"),
    () => console.error("3. Image FAILED to load")
  );
}

function setup() {
  console.log("4. Setup started");
  noCanvas();

  createImg("image.png").size(300, 300);
  console.log("5. Image element created");

  labelP = createP("Waiting for result...");
  labelP.style("font-size", "18px");
  labelP.style("color", "black");
  console.log("6. Label P created:", labelP);

  setTimeout(() => {
    console.log("7. About to classify");
    classifier.classify(img, gotResult);
  }, 500);
}

function gotResult(error, results) {
  console.log("8. gotResult called");
  console.log("9. labelP exists?", labelP);
  console.log("10. results:", results);
  console.log("11. error:", error);
  
  if (error) {
    console.error("ERROR:", error);
    labelP.html("Error: " + error);
    return;
  }

  let resultText = `Label: ${results[0].label}<br>Confidence: ${(results[0].confidence * 100).toFixed(2)}%`;
  console.log("12. Setting HTML to:", resultText);
  labelP.html(resultText);
  console.log("13. HTML should be set now");
}