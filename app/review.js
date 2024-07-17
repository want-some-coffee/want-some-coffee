// // apikey
// export const yelpApiKey =
//   "cLCckwvPZ64EAo3l2oCqdkYwO92JumAudkV78b84mY_4StYXylEUG0u4R6exM-pnEv3OGRQK16VM_jvgBWBHTwR0jqrBEmhLOWNYTEuaSoodzEYYMAl2PW9ZWBSOZnYx";
// export const baseUrl = `https://api.yelp.com/v3/businesses/search?location=Toronto&categories=cafes&limit=10`;

// const options = {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${yelpApiKey}`,
//     "Content-Type": "application/json",
//   },
// };

// export let cafeList = [];
// export let totalResults = 0;

// // Fetch Yelp data and display in café list area
// export const getCafes = async (url = baseUrl) => {
//   try {
//     const response = await fetch(url, options);
//     console.log("response:", response);

//     if (!response.ok) {
//       throw new Error(`HTTP error. Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Data fetched:", data);

//     if (data.businesses && data.businesses.length > 0) {
//       drawCafeList(data.businesses);
//     } else {
//       displayError("No cafés found.", true);
//     }
//   } catch (error) {
//     console.error("Error fetching and parsing data", error);
//   }
// };

// ///practice
// const getLatestReview = () => {
//   const url = URL`https://api.yelp.com/v3/businesses/${businessId}/reviews`;
// };

///list ///

/// 1.call business name

///2. read our review guideline
/// -> click event show modal about guidence

/// 3. coffee bean hoverover action
// -> showing words accordingly.
document.addEventListener("DOMContentLoaded", () => {
  const beans = document.querySelectorAll(".bean");
  const ratingText = document.querySelector(".rating-text");
  const ratings = ["Bad", "Not Bad", "Good", "Nice", "Perfect"];

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

//5. text box

//-> word count

const textInput = document.getElementById("text-input");
const CharCountMessage = document.getElementById("char-count");

textInput.addEventListener("input", () => {
  const textLength = textInput.value.length;
  if (textLength < 80) {
    CharCountMessage.textContent = `Count: ${textLength}`;
  } else {
    CharCountMessage.textContent = "";
  }
});

//-> constrain:
//  >> if user click post btn when the  words less than 80 chr, show error message

// 6. add photo
///> if click show modal and able to upload photos
///>

// 7.click post

//>>show modal or something that indicate success.

//8. check if my review updated on review section.
