// apikey
const yelpApiKey =
  "Up68Zn5jJ6Zsz2kpPMNoDC-xKea27bM2vfpqf-RMdxu56gZeJ5puyTJ6JlIvtNYm2FrNFF6WMn4W34jpOzbL_pOFaZJXmaUgAYDgFD5S5ov83sJu5MmyFFxFnDqYZnYx";
const baseUrl = `https://api.yelp.com/v3/businesses/search?location=Toronto&categories=cafes&limit=10`;

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
    "Content-Type": "application/json",
  },
};

let cafeList = [];
let totalResults = 0;
let selectedFilters = [];

// Fetch Yelp data and display in café list area
const getCafes = async (url = baseUrl) => {
  try {
    const response = await fetch(url, options);
    console.log("response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched:", data);

    if (data.businesses && data.businesses.length > 0) {
      drawCafeList(data.businesses);
    } else {
      displayError("No cafés found.", true);
    }
  } catch (error) {
    console.error("Error fetching and parsing data", error);
  }
};

// ///practice--------------------------------

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getCafes();
  if (data && data.businesses) {
    drawCafeList(data.businesses);
    populateCafeSelect(data.businesses);
  }
});

// Populate café select dropdown
const populateCafeSelect = (cafes) => {
  const cafeSelect = document.getElementById("cafe-select");
  cafes.forEach((cafe) => {
    const option = document.createElement("option");
    option.value = cafe.id;
    option.textContent = cafe.name;
    cafeSelect.appendChild(option);
  });
};



// Display café list

const drawCafeList = (cafes) => {
  const cafeListDiv = document.getElementById("cafe-list");
  cafeListDiv.innerHTML = "";
  cafes.forEach((cafe) => {
    const cafeDiv = document.createElement("div");
    cafeDiv.className = "cafe";
    cafeDiv.innerHTML = `
    <div class="cafe-wrapper">
    <img class="image-size" src="${cafe.image_url}" alt="${cafe.name}">
    <div class="business-info">
    <h3>${cafe.name}</h3>
    <p>${cafe.location.address1}</p>
    </div>
    </div>`;
    cafeListDiv.appendChild(cafeDiv);
  });
};


///practice end ----------------------------
///list ///

/// 1.call business name

///2. read our review guideline
/// -> click event show modal about guidence

/// 3. coffee bean hoverover action
// -> showing words accordingly.

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
    console.log("btn ", btn.textContent);
    btn.classList.toggle("selected");
    console.log("class", btn.className);
  });
});

//5. text box

//-> word count

const textInput = document.getElementById("text-input");
const charCountMessage = document.getElementById("char-count");

textInput.addEventListener("input", () => {
  const textLength = textInput.value.length;
  if (textLength < 80) {
    charCountMessage.textContent = `Count: ${textLength}`;
  } else if ((textLength) => 80) {
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


  const reviewArea = document.querySelector(".review-area");


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

  
  // open file
  dropArea.addEventListener("click", () => {
    photoInput.click();
  })

  //
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
    filesToUpload = [];
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
    if (reviewText.length < 80) {
      alert("Review must be at least 80 characters.");
      return;
    }

    const postContainer = document.createElement("div");
    postContainer.className = "post-container";

    const reviewElement = document.createElement("p");
    reviewElement.className = "review-text";
    reviewElement.textContent = reviewText;
    postContainer.appendChild(reviewElement);

    const ratingElement = document.createElement("p");
    ratingElement.textContent = `Rating: ${ratingText.textContent}`;
    postContainer.appendChild(ratingElement);

    const filtersElement = document.createElement("p");
    filtersElement.textContent = `Ambience: ${selectedFilters.join(", ")}`;
    postContainer.appendChild(filtersElement);

    if (filesToUpload.length) {
      filesToUpload.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.className = "board-image";
          postContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    }

    reviewArea.appendChild(postContainer);



    //>>show modal or something that indicate success.

   

  // Clear the inputs and arrays
    textInput.value = "";
    charCountMessage.textContent = "you need at least 80 words";
    filesToUpload = [];
    selectedFilters = [];
    fillBeans(0);
    ratingText.textContent = "Give a rate!";
  });

 //8. check if my review updated on review section.

