// apikey
export const yelpApiKey =
  'P8yrZJ5yne3K8xtnN9mu5kPWG39xDyF8LiR7W8IFcgvHpeVyuimRuUHwsAUa_gslcPCTNP3UPYU_GjeEkP22hvjCO3LvMpthn7IEFP0ooQ2yeOgkszVS9YbszuuXZnYx';
export const baseUrl = `https://api.yelp.com/v3/businesses/search?location=Toronto&categories=cafes&limit=10`;

// cLCckwvPZ64EAo3l2oCqdkYwO92JumAudkV78b84mY_4StYXylEUG0u4R6exM-pnEv3OGRQK16VM_jvgBWBHTwR0jqrBEmhLOWNYTEuaSoodzEYYMAl2PW9ZWBSOZnYx

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
    'Content-Type': 'application/json'
  }
};

export let cafeList = [];
export let totalResults = 0;

// Fetch Yelp data and display in café list area
export const getCafes = async (url = baseUrl) => {
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
      return `
      <div class="row">
        <div class="col-lg-4 col-md-5 cafe-list"><img src="${cafe.image_url}" class="d-block w-100"></div>
        <div class="col-lg-8 col-md-7">
            <div class="data-title"><a href="${cafe.url}">${cafe.name}</a></div>
            <div class="data-txt">${cafe.rating} ${cafe.review_count} reviews</div>
            <div class="data-txt"><span class="ribbon-highlight">${cafe.categories.map((cat) => cat.title).join(', ')}</span>, ${cafe.location.city}</div>
            <div class="data-txt">Open until ${cafe.hours && cafe.hours[0].is_open_now ? 'Open' : 'Closed'}</div>
            <div class="data-txt">“${cafe.snippet_text || 'No description available.'}” more</div>
            <div class="data-txt">${cafe.location.address1}, ${cafe.location.city}</div>
        </div>
    </div>
        <hr>
      `;
    })
    .join('');

  document.getElementById('cafe-lists-board').innerHTML = cafeHTML;
};

// Error message display function
const displayError = (message, returnMessage = false) => {
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.classList.remove('d-none');
    let showReturnMessage = `${message}`;
    if (returnMessage) {
      showReturnMessage += `<br /><br /><p class="fw-light fs-4" style="color: black;">Default news will be displayed in three seconds.</p>`;
    }
    errorMessage.innerHTML = showReturnMessage;

    const newsBoard = document.getElementById('cafe-lists-board');
    if (newsBoard) {
      newsBoard.classList.add('d-none');
    }

    setTimeout(() => {
      getCafes();
    }, 3000);
  } else {
    console.error('error-message element not found.');
  }
};
