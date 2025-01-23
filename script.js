const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load an image
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img); // Resolve with the image element
    img.onerror = () =>
      reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}

// Download images in parallel
function downloadImages(images) {
  // Display the loading spinner
  loading.style.display = "block";
  errorDiv.textContent = ""; // Clear any previous error message
  output.innerHTML = ""; // Clear previous images

  const imagePromises = images.map(loadImage);

  Promise.all(imagePromises)
    .then((loadedImages) => {
      // Hide the loading spinner
      loading.style.display = "none";

      // Append each loaded image to the output div
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      // Hide the loading spinner and display the error message
      loading.style.display = "none";
      errorDiv.textContent = err.message;
    });
}

// Trigger the download process
downloadImages(images);
