let classifier;
let selectedFiles = [];

function preload() {
  classifier = ml5.imageClassifier("MobileNet", () => {
    console.log("MobileNet loaded");
  });
}

function setup() {
  noCanvas();
  
  createP("Select multiple images:");
  
  fileInput = createFileInput(handleFiles, true); // true = multiple files
  fileInput.attribute('multiple', ''); // Enable multiple selection
  
  createButton('Clear All').mousePressed(clearAll);
}

function handleFiles(file) {
  // This function is called once for EACH file selected
  if (file.type === 'image') {
    let container = createDiv('').class('image-container');
    
    let imgElement = createImg(file.data, file.name);
    imgElement.size(200, 200);
    imgElement.parent(container);
    
    //label for results
    let labelP = createP('Classifying...');
    labelP.parent(container);
    
    loadImage(file.data, (img) => {
      classifier.classify(img, (results, error) => {
        if (error) {
          console.error("ERROR:", error);
          labelP.html("Error: " + error);
          return;
        }
        
        console.log(`Results for ${file.name}:`, results);
        
        let resultText = `
          <strong>${file.name}</strong><br>
          Label: ${results[0].label}<br>
          Confidence: ${(results[0].confidence * 100).toFixed(2)}%<br>
          <small>Alt: ${results[1].label} (${(results[1].confidence * 100).toFixed(2)}%)</small>
        `;
        labelP.html(resultText);
      });
    });
  }
}

function clearAll() {
  selectAll('.image-container').forEach(div => div.remove());
}