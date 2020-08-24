const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;



// Unsplash API

let initialCount = 5;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }
   

// Helper Function to setAttribute on DOM element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create elements for links and photos & add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash 
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, checks when each images is finished loading
        img.addEventListener('load', imageLoaded)
        // put <img> in <a> and place inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item); 
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
      if (isInitialLoad) { // NEW LINE ****
        updateAPIURLWithNewCount(30) // NEW LINE ****
        isInitialLoad = false // NEW LINE ****
      } // NEW LINE ****
    } catch (error) {
      // Catch Error Here
    }
  }

// Check to see if scrolling near bottom and if so load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos();