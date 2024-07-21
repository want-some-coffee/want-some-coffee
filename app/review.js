
// apikey
const yelpApiKey =
  "6s3duDKaT-sk9tOaM9sBvc_jcb1M1J19w8CXoXWtAmKK4hG1HN1nzn-5YOx5Xs-du_VdDUuwjE11qJILd-tXyForyhu51JwDmStUmJzQGNaF-VSEh_zUl7Ck-gacZnYx";
const baseUrl = 'https://api.yelp.com/v3/businesses/search?location=Toronto&categories=cafes&limit=10';



function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function fetchWithDelay(url) {
  await delay(1000);
  return fetch(url);
}
const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
    'Content-Type': 'application/json'
  }
};


let cafeList = [];
let totalResults = 0;

const getCafes = async (url=baseUrl) => {
  try {
    const response = await fetch(url, options);
    console.log('response:', response);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data fetched:', data);

    if (data.businesses && data.businesses.length > 0) {
      cafeList = data.businesses;
      totalResults = data.totalResults;

      drawCafeList(data.businesses);
    } else {
      displayError('No cafés found.', true);
    }
  } catch (error) {
    console.error('Error fetching and parsing data', error);
  }
};

// Draw café list
const drawCafeList = () => {
  console.log('Drawing café list:', cafeList);
  const cafeHTML = cafeList
    .map((cafe) => {
      return `<img class="bd-placeholder-img card-img-top" src="${cafe.image_url}" width="100%" height="225">
        <div class="card-body">
          <h3 class="card-title">${cafe.name}</h3>
          <p class="card-text">${cafe.location.address1}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Write a review</button>
            </div>
            <button class="btn btn-link p-0" onclick="toggleHeart(this)">
              <i class="fas fa-heart text-body-secondary"></i>
            </button>
          </div>
        </div>
      `;
    })
    .join('');
  document.getElementById('cafe-board').innerHTML = cafeHTML;
};





function closeSideBar() {
    document.querySelector('.cafe-box').classList.add('closed');
    document.querySelector('.cafe-box').classList.remove('open');
}

function openSideBar() {
    document.querySelector('.cafe-box').classList.remove('closed');
    document.querySelector('.cafe-box').classList.add('open');
}

function displayCafes(cafes) {
  const cafeListDiv = document.getElementById('cafe-info');
  cafeListDiv.innerHTML = "";

  cafes.forEach((cafe) => {
    const cafeCol = document.createElement("div");
    cafeCol.className = "col";

    cafeCol.innerHTML = `
      <div class="card shadow-sm card-color">
        <img class="bd-placeholder-img card-img-top" src="${cafe.image_url}" alt="${cafe.name}" width="100%" height="225">
        <div class="card-body">
          <h3 class="card-title">${cafe.name}</h3>
          <p class="card-text">${cafe.location.address1}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <button class="btn btn-link p-0" onclick="toggleHeart(this)">
              <i class="fas fa-heart text-body-secondary"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    cafeListDiv.appendChild(cafeCol);
  });
}

function toggleHeart(button) {
  const heartIcon = button.querySelector('i');
  heartIcon.classList.toggle('text-danger'); // Toggle red color
  heartIcon.classList.toggle('fas'); // Toggle solid heart
  heartIcon.classList.toggle('far'); // Toggle outlined heart
}
document.addEventListener('DOMContentLoaded', (event) => {
  getCafes();
});


///practice end ----------------------------
///list ///

/// 1.call business name


///2. read our review guideline
/// -> click event show modal about guidence
// Update business details
const updateBusinessDetails = (business) => {
  document.getElementById('cafe-image').src = business.image_url;
  document.getElementById('cafe-name').textContent = business.name;
  document.getElementById('cafe-score').textContent = business.rating;
  document.getElementById('cafe-address').textContent = business.location.address1;
};


// View details
const viewDetails = async (businessId) => {
  const url = `https://api.yelp.com/v3/businesses/${businessId}`;
  try {
    const response = await fetchWithDelay(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const business = await response.json();
    console.log('Business details fetched:', business);
    updateBusinessDetails(business);
  } catch (error) {
    console.error('Error fetching and parsing business details', error);
  }
};

const displayError = (message, clearList = false) => {
  if (clearList) {
    document.getElementById('cafe-board').innerHTML = '';
  }
  alert(message);
};


// Fetch review highlights
const fetchReviewHighlights = async (businessId) => {
  const url = `https://api.yelp.com/v3/businesses/${businessId}/review_highlights?count=3`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const reviewData = await response.json();
    console.log('Review highlights fetched:', reviewData);
    drawReviewHighlights(reviewData.review_highlights);
  } catch (error) {
    console.error('Error fetching and parsing review highlights', error);
  }
};



// Draw review highlights
const drawReviewHighlights = (reviews) => {
  const reviewSection = document.getElementById('review-section');
  reviewSection.innerHTML = reviews.map(review => `
    <div class="profile-wrap">
      <img class="review-profile" src="${review.user.profile_url}" alt="profile photo">
      <div class="profile-content">
        <div class="fs-5 fw-bold text-capitalize text">${review.user.name}</div>
        <div class="profile-name">
          <div class="bean-date-wrap">
             <div class="bean-rate">${beanImages}</div>
            </div>
            <div class="">${new Date(review.time_created).toLocaleDateString()}</div>
          </div>
        </div>
        <div>${review.text}</div>
      </div>
    </div>
  `).join('');
};

/// 3. coffee bean hoverover action
// -> showing words accordingly.
let selectedFilters = [];
  let rating = 0;
  const beans = document.querySelectorAll(".bean");
  const ratingText = document.querySelector(".rating-text");
  const ratings = [
    "Bad 😭 ",
    "Not Bad 😢",
    "Good 😊",
    "Great 🤗",
    "Perfect 😍",
  ];

  beans.forEach((bean) => {
    bean.addEventListener("mouseover", handleMouseOver);
    bean.addEventListener("click", handleClick);
  });

  function handleMouseOver(event) {
    const index = event.target.dataset.index;
    fillBeans(index);
    updateRatingText(index);
  }

function handleClick(event) {
  const index = event.target.dataset.index;
  rating = parseInt(index); 
  fillBeans(index);
  updateRatingText(index);
  }

  function fillBeans(index) {
    beans.forEach((bean, idx) => {
      if (idx < index) {
        bean.classList.add("filled");
      } else {
        bean.classList.remove("filled");
      }
    });
  }

  function updateRatingText(index) {
    ratingText.textContent = ratings[index - 1];
  }
;
//  4. ambience -> hover  // selected
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("selected");
    if (btn.classList.contains("selected")) {
      selectedFilters.push(btn.textContent);
    } else {
      selectedFilters = selectedFilters.filter(filter => filter !== btn.textContent);
    }
  });
});

//5. text box

//-> word count

const textInput = document.getElementById("text-input");
const charCountMessage = document.getElementById("char-count");

textInput.addEventListener("input", () => {
  const textLength = textInput.value.length;
  if (textLength < 40) {
    charCountMessage.textContent = `Count: ${textLength}`;
  } else if ((textLength) => 40) {
    charCountMessage.textContent = `Great!`;
  } else {
    charCountMessage.textContent = "";
  }
});

//-> constrain:
//  >> if user click post btn when the  words less than 80 chr, show error message


// 6. add photo
///> if click show modal popup

  const addPhotoButton = document.querySelector(".photo-add");
  const photoModal = document.getElementById("photoModal")
  const closeModal = document.querySelector(".close")
  const dropArea = document.getElementById("dropArea")
  const photoInput = document.getElementById("photoInput")
  const uploadPhotoButton = document.getElementById("uploadPhotoButton")
  const photoArea = document.querySelector(".photo-area");
  const previewArea = document.getElementById("previewArea");
  const ctaButton = document.querySelector(".cta-btn");
 
  const reviewArea = document.querySelector(".profile-card");


  let filesToUpload = [];



  //show modal
  addPhotoButton.addEventListener("click", () => {
    photoModal.style.display = "block";
    previewArea.innerHTML = ""
  });

  //hide modal
  closeModal.addEventListener("click", () => {
    photoModal.style.display = "none";
  })
  //hide modal when clicking out
  window.addEventListener("click", (event) => {
    if (event.target === photoModal) {
      photoModal.style.display = "none";
    }
  })


  // drag and drop
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover")
  })

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover")
  })
  
  dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("dragover");
    const files = event.dataTransfer.files;
    if (files.length) {
      filesToUpload = [...filesToUpload, ...Array.from(files)];
      previewPhotos(filesToUpload);
    }
  })

  //display preview
function previewPhotos(files) {
  previewArea.innerHTML = "";
  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgContainer = document.createElement("div");
      imgContainer.style.position = "relative";
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "preview-image";
      imgContainer.appendChild(img);

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.innerHTML = '<i class="fas fa-times"></i>'; // Font Awesome "times" icon
      deleteButton.addEventListener("click", () => {
        filesToUpload.splice(index, 1);
        previewPhotos(filesToUpload);
      });
      imgContainer.appendChild(deleteButton);
      previewArea.appendChild(imgContainer);
    };
    reader.readAsDataURL(file);
  });
}

// Open file dialog
dropArea.addEventListener("click", () => {
  photoInput.click();
});

photoInput.addEventListener("change", (event) => {
  const files = event.target.files;
  if (files.length) {
    filesToUpload = [...filesToUpload, ...Array.from(files)];
    previewPhotos(filesToUpload);
  }
});

  function displayPhoto(files) {
    photoArea.innerHTML = "";
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgContainer = document.createElement("div");
        imgContainer.style.position = "relative";
        const img = document.createElement("img");
        img.src = e.target.result;
        img.className = "uploaded-image";
        imgContainer.appendChild(img);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.addEventListener("click", () => {
          filesToUpload.splice(index, 1);
          displayPhoto(filesToUpload);
        });
        imgContainer.appendChild(deleteButton);
        photoArea.appendChild(imgContainer);
      };
      reader.readAsDataURL(file);
     
    });

  }

  uploadPhotoButton.addEventListener("click", () => {
  if (filesToUpload.length) {
    displayPhoto(filesToUpload);
    photoModal.style.display = "none";
  } else {
    alert("Please select a photo to upload.");
  }
  });


  //and able to upload photos
  ///>

  // 7.click post

  
ctaButton.addEventListener("click", () => {
  const reviewText = textInput.value.trim();
  if (reviewText.length < 40) {
    alert("Review must be at least 40 characters.");
    return;
  }

  const date = new Date().toLocaleDateString();
  const beanImages = Array.from({ length: 5 }, (_, i) =>
    i < rating
      ? '<img src="css/icon/brown_coffee-bean-fill.svg" width="16">'
      : '<img src="css/icon/gray_coffee-bean-fill.svg" width="16">'
  ).join("");
  const filterTags = selectedFilters
    .map((filter) => `<div class="filter-ambience">${filter}</div>`)
    .join("");

  // Create photo HTML elements
  let photosHtml = "";
  filesToUpload.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      photosHtml += `<img src="${e.target.result}" class="board-image">`;

      // Append the reviewHtml once all images are read
      if (index === filesToUpload.length - 1) {
        appendReview(reviewText, beanImages, date, filterTags, photosHtml);
        clearInputs();
      }
    };
    reader.readAsDataURL(file);
  });

  if (filesToUpload.length === 0) {
    appendReview(reviewText, beanImages, date, filterTags, photosHtml);
    clearInputs();
  }
});

let reviewsArray = [];

function appendReview(reviewText, beanImages, date, filterTags, photosHtml) {
  const reviewHtml = `
    <div class="profile-wrap" id="review-section">
      <img class="review-profile" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSny4PnXoYsvn0pbc8QDlr3TEcculK75Px4mbWh8chRwRRcOv4N" alt="profile photo">
      <div class="profile-content">
        <div class="fs-5 fw-bold text-capitalize text">Amy A</div>
        <div class="profile-name">
          <div class="bean-date-wrap">
            <div class="bean-rate">${beanImages}</div>
            <div>${date}</div>
          </div>
        </div>
        <div class="filters-container">${filterTags}</div>
        <div class="review-text">${reviewText}</div>
        <div class="photo-area">${photosHtml}</div>
      </div>
    </div>`;

  
  reviewsArray.unshift(reviewHtml);

  reviewArea.innerHTML = reviewsArray.join('');
}

function clearInputs() {
  textInput.value = "";
  charCountMessage.textContent = "you need at least 40 words";
  filesToUpload = [];
  selectedFilters = [];
  fillBeans(0);
  ratingText.textContent = "Give a rate!";
  previewArea.innerHTML = "";
  photoArea.innerHTML = "";
}

 //8. check if my review updated on review section.

document.addEventListener('DOMContentLoaded', () => {
  getCafes();
  updateBusinessDetails(business)

});