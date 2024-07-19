import { baseUrl, yelpApiKey } from './apiKey.js';
import { drawPagination } from './pagination.js';

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
    'Content-Type': 'application/json'
  }
};

export let cafeList = [];
export let dataTotal = 0;

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
      dataTotal = data.total;
      console.log('Cafe list:', cafeList);
      console.log('data total:', dataTotal);

      drawCafeList(data.businesses);
      drawPagination();
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
      // Determine the number of review images to show based on the rating
      let imageCount = 0;
      if (cafe.rating > 4) {
        imageCount = 5;
      } else if (cafe.rating > 3) {
        imageCount = 4;
      } else if (cafe.rating > 2) {
        imageCount = 3;
      } else if (cafe.rating > 1) {
        imageCount = 2;
      } else if (cafe.rating > 0) {
        imageCount = 1;
      }

      // Generate the review images HTML
      const reviewImages = new Array(imageCount)
        .fill('<img src="./img/ico-review-single.jpg" class="main-ico-review">')
        .join('');

      // Check for opening status and hours
      const isOpenNow =
        cafe.business_hours &&
        cafe.business_hours[0] &&
        cafe.business_hours[0].is_open_now;
      const openingHours =
        cafe.business_hours &&
        cafe.business_hours[0] &&
        cafe.business_hours[0].open[0]
          ? `${cafe.business_hours[0].open[0].start} - ${cafe.business_hours[0].open[0].end}`
          : 'N/A';

      // convert doller sign to icon
      let dollarCount = 0;
      if (cafe.price === '$') {
        dollarCount = 1;
      } else if (cafe.price === '$$') {
        dollarCount = 2;
      } else if (cafe.price === '$$$') {
        dollarCount = 3;
      } else if (cafe.price === '$$$$') {
        dollarCount = 4;
      } else if (cafe.price === '$$$$$') {
        dollarCount = 5;
      }

      // Generate the dollar images HTML
      const iconDollar = new Array(dollarCount)
        .fill('<img src="./img/ico-dollar.png" class="main-list-ico">')
        .join('');

      // Extract additional attributes
      const attributes = cafe.attributes || {};
      const wifi =
        attributes.wi_fi && attributes.wi_fi !== 'No'
          ? `<i class="fa-solid fa-wifi"></i> WiFi: ${attributes.wi_fi} <br>`
          : '';
      const noiseLevel =
        attributes.noise_level && attributes.noise_level !== 'No'
          ? `<i class="fa-solid fa-bullhorn"></i> Noise Level: ${attributes.noise_level} <br>`
          : '';
      const parking = attributes.business_parking || {};
      const parkingTypes = [];
      if (parking.garage) parkingTypes.push('Garage');
      if (parking.lot) parkingTypes.push('Lot');
      if (parking.street) parkingTypes.push('Street');
      if (parking.valet) parkingTypes.push('Valet');
      if (parking.validated) parkingTypes.push('Validated');
      const parkingDetails = parkingTypes.length
        ? `${parkingTypes.join(', ')} parking available`
        : '';
      const parkingHTML = parkingDetails
        ? `<i class="fa-solid fa-parking"></i> Parking: ${parkingDetails} <br>`
        : '';
      const reservation = attributes.restaurants_reservations ? 'Yes' : 'No';
      const reservationHTML =
        reservation !== 'No'
          ? `<i class="fa-solid fa-calendar-check"></i> Reservation: ${reservation} <br>`
          : '';
      const outdoorSeating = attributes.outdoor_seating ? 'Yes' : 'No';
      const outdoorSeatingHTML =
        outdoorSeating !== 'No'
          ? `<i class="fa-solid fa-tree"></i> Outdoor Seating: ${outdoorSeating} <br>`
          : '';
      const happyHour = attributes.happy_hour ? 'Yes' : 'No';
      const happyHourHTML =
        happyHour !== 'No'
          ? `<img src="./img/ico-togo-cup.png" class="main-list-ico-happyhour"> Happy Hour: ${happyHour}`
          : '';

      // description visibility and truncation
      let description =
        attributes.about_this_biz_specialties || 'No description available.';
      const descriptionClass =
        description === 'No description available.' ? 'd-none' : '';
      if (description.length > 100) {
        description = description.substring(0, 120) + '...';
      }

      return `
    <div class="row">
      <div class="col-lg-4 col-md-5 cafe-list"><img src="${cafe.image_url}"></div>
      <div class="col-lg-8 col-md-7">
          <div class="cafe-list-title"><a href="${cafe.url}">${cafe.name}</a> ${iconDollar}</div>
          <div class="cafe-list-txt">
            ${reviewImages}
            <span class="cafe-list-txt-accent">${cafe.rating}</span> 
            <span class="cafe-list-review-count">(${cafe.review_count} reviews)</span>
          </div>
          <div class="cafe-list-txt"><span class="ribbon-highlight">${cafe.categories.map((cat) => cat.title).join(', ')}</span></div>
          <div class="cafe-list-txt">${cafe.location.address1}, ${cafe.location.city}</div>
          <div class="data-txt"><span class="cafe-list-txt-accent">${isOpenNow ? 'Open now' : 'Closed now'}</span> (Hours: ${openingHours})</div>
          <div class="cafe-list-txt-description ${descriptionClass}"><i class="fa-regular fa-comment"></i> “${description}” more</div>
          <div class="additional-info">
            ${wifi}
            ${noiseLevel}
            ${parkingHTML}
            ${reservationHTML}
            ${outdoorSeatingHTML}
            ${happyHourHTML}
          </div>
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
