// apikey
const yelpApiKey =
  "cLCckwvPZ64EAo3l2oCqdkYwO92JumAudkV78b84mY_4StYXylEUG0u4R6exM-pnEv3OGRQK16VM_jvgBWBHTwR0jqrBEmhLOWNYTEuaSoodzEYYMAl2PW9ZWBSOZnYx";
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
    <div>image</div>
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
document.addEventListener("DOMContentLoaded", () => {
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
});
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

//ambience -> select toggle

// 6. add photo
///> if click show modal popup

//and able to upload photos
///>

// 7.click post

//>>show modal or something that indicate success.

//8. check if my review updated on review section.
