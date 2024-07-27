const yelpAPI = 'cLCckwvPZ64EAo3l2oCqdkYwO92JumAudkV78b84mY_4StYXylEUG0u4R6exM-pnEv3OGRQK16VM_jvgBWBHTwR0jqrBEmhLOWNYTEuaSoodzEYYMAl2PW9ZWBSOZnYx'

// 은미님 api 'P8yrZJ5yne3K8xtnN9mu5kPWG39xDyF8LiR7W8IFcgvHpeVyuimRuUHwsAUa_gslcPCTNP3UPYU_GjeEkP22hvjCO3LvMpthn7IEFP0ooQ2yeOgkszVS9YbszuuXZnYx'
// kIrjDqF68bBxQuQ2oASKMilcGPTcgR9uOdCOKHXVxbCSg96wj-EPsShqiv_igpVi2V90fJtvu-0hQDPyzXHl7cemU1E62wz7Jo5x0C1XfzPogjXJL54-PepA2H-ZZnYx

let map;
let userMarker;
const cafesContainer = document.getElementById('cafes');


// Google Maps API를 사용하여 지도를 초기화하는 함수
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.0447, lng: -114.0719 },
    zoom: 15,
    mapTypeControl: false, // 지도 위성 버튼 숨기기 
    streetViewControl: false, // 노란색 사람 모양 숨기기 
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(pos);
      userMarker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'You are here',
      });
    });
  }
}
// document.getElementById('map').addEventListener('focus', function() {
//   this.style.outline = '2px solid #8C4416'; 
// });

// document.getElementById('map').addEventListener('blur', function() {
//   this.style.outline = 'none'; // 
// });
document.getElementById('goToMyLocation').addEventListener('click', moveToCurrentLocation);

function moveToCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(pos);
      if (userMarker) {
        userMarker.setPosition(pos);
      } else {
        userMarker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'You are here',
        });
      }
    });
  } else {
    alert("Can't find the location");
  }
}

window.onload = initMap;

document.addEventListener('DOMContentLoaded', function () {
  // Function to uncheck other checkboxes in the same group
  function uncheckOthers(event) {
      const checkboxes = document.querySelectorAll(`.${event.target.className}`);
      checkboxes.forEach(checkbox => {
          if (checkbox !== event.target) {
              checkbox.checked = false;
          }
      });
  }

  // Add event listeners to each group of checkboxes
  const priceCheckboxes = document.querySelectorAll('.filter-price');
  const reviewCheckboxes = document.querySelectorAll('.filter-reviews');
  const categoryCheckboxes = document.querySelectorAll('.filter-category');

  priceCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', uncheckOthers);
  });

  reviewCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', uncheckOthers);
  });

  categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', uncheckOthers);
  });
});



// Yelp API를 사용하여 특정 위치 주변의 카페 정보를 가져오는 함수
async function fetchCafes(latitude, longitude) {
  const response = await fetch(`https://api.yelp.com/v3/businesses/search?term=cafe&latitude=${latitude}&longitude=${longitude}`, {
    headers: {
      'Authorization': `Bearer ${yelpAPI}`, 
    },
  });
  // const data = await response.json();
  // return data.businesses;
  if (response.ok) {
    const data = await response.json();
    console.log(data); 
    return data.businesses;
  } else {
    console.error('Error fetching data from Yelp API', response);
    return [];
  }
}

// 리뷰 아이콘을 생성하는 함수 
function generateBeans(rating) {
    const fullStarUrl = 'css/icon/brown_coffee-bean-fill.svg'; 
    const halfStarUrl = 'css/icon/half-filled-bean.svg'; 
    const emptyStarUrl = 'css/icon/brown_coffee-bean-fill.svg'; 
    
    const fullStar = `<img src="${fullStarUrl}" class="star" alt="Full Star" />`; 
    const halfStar = `<img src="${halfStarUrl}" class="star" alt="Half Star" />`; 
    const emptyStar = `<img src="${emptyStarUrl}" class="star" alt="Empty Star" />`;  
    
    let stars = '';
    let roundedRating = Math.round(rating * 2) / 2; 
    
    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= i) {
          stars += fullStar;
      } else if (roundedRating + 0.5 >= i) {
          stars += halfStar;
      } else {
          stars += emptyStar;
      }
    }
    return stars;
  }

  const updateMapMarkers = (cafes) => {
    map.markers && map.markers.forEach(marker => marker.setMap(null));
    map.markers = [];
  
    cafes.forEach(cafe => {
      const marker = new google.maps.Marker({
        position: { lat: cafe.coordinates.latitude, lng: cafe.coordinates.longitude },
        map: map,
        title: cafe.name,
        // icon: 'css/icon/brown_coffee-bean-fill.svg', // 원하는 아이콘 설정
      });
  
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="width: 250px; height: 200px;">
                    <h5 style="text-align: center;">${cafe.name}</h5>
                    <img src="${cafe.image_url}" alt="${cafe.name}" style="width: 100%; height: 120px; object-fit: cover;">
                    <div style="text-align: center; margin-top: 10px;">${generateBeans(cafe.rating)}</div>
                  </div>`,
        disableAutoPan: false
      });
  
      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });
  
      marker.addListener('mouseout', () => {
        infoWindow.close();
      });
  
      map.markers.push(marker);
    });
  }

  const filterByPrice = (priceRange) => {
    const filteredCafeList = cafeList.filter(cafe => {
      if (priceRange === '$') {
        return cafe.price === '$';
      } else if (priceRange === '$$') {
        return cafe.price === '$$';
      } else if (priceRange === '$$$') {
        return cafe.price === '$$$';
      }
      return false;
    });
    drawCafeList(filteredCafeList);
    updateMapMarkers(filteredCafeList);
  };

const filterByRating = (minRating) => {
  const filteredCafeList = cafeList.filter(cafe => cafe.rating >= minRating);
  drawCafeList(filteredCafeList);
  updateMapMarkers(filteredCafeList); 

}

const filterByOpenStatus = () => {
  const filteredCafeList = cafeList.filter(cafe => cafe.business_hours && cafe.business_hours[0] && cafe.business_hours[0].is_open_now); 
  drawCafeList(filteredCafeList);
  updateMapMarkers(filteredCafeList);
}

const filterByReviews = () => {
  const sortedCafeList = [...cafeList].sort((a, b) => b.review_count - a.review_count); 
  drawCafeList(sortedCafeList); 
  updateMapMarkers(filteredCafeList);
}

const filterByBreakfast = () => {
  const filteredCafeList = cafeList.filter(cafe => 
    cafe.categories.some(category => category.alias === 'breakfast_brunch')); 
  drawCafeList(filteredCafeList); 
  updateMapMarkers(filteredCafeList);
}

const filterByDelivery = () => {
  const filteredCafeList = cafeList.filter(cafe => cafe.attributes && cafe.attributes.delivery); 
  drawCafeList(filteredCafeList); 
  updateMapMarkers(filteredCafeList);
}

const filterByReservation = () => {
  const filteredCafeList = cafeList.filter(cafe => cafe.attributes && cafe.attributes.waitlist_reservation); 
  drawCafeList(filteredCafeList);
  updateMapMarkers(filteredCafeList); 
}

const drawCafeList = (cafeList) => {
  console.log('Drawing café list:', cafeList);
  const cafesContainer = document.getElementById('cafe-lists-board'); 
  const existingAlert = document.getElementById('no-results-alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  if (cafeList.length === 0) {
    cafesContainer.innerHTML = '';
    const alertMessage = `<div id="no-results-alert" class="alert alert-warning" role="alert" style="position: absolute; bottom: 40%; width: 20%; left: 30%;">Sorry, we couldn't find any results</div>`;
    cafesContainer.insertAdjacentHTML('beforebegin', alertMessage); 
    return;
  }

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
          <div class="cafe-list-title"><a href="details.html">${cafe.name}</a> ${iconDollar}</div>
          <div class="cafe-list-txt">
            ${reviewImages}
            <span class="cafe-list-txt-accent">${cafe.rating}</span> 
            <span class="cafe-list-review-count">(${cafe.review_count} reviews)</span>
          </div>
          <div class="cafe-list-txt"><span class="ribbon-highlight">${cafe.categories.map((cat) => cat.title).join(', ')}</span></div>
          <div class="cafe-list-txt">${cafe.location.address1}, ${cafe.location.city}</div>
          <div class="data-txt"><span class="cafe-list-txt-accent">${isOpenNow ? 'Open now' : 'Closed now'}</span> (Hours: ${openingHours})</div>
          <div class="cafe-list-txt-description ${descriptionClass}"><i class="fa-regular fa-comment"></i> "${description}" more</div>
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
async function searchCafes(location) {
  const bounds = map.getBounds(); 
  const northeast = bounds.getNorthEast(); // 
  const southwest = bounds.getSouthWest(); // 

  const latitude = location ? location.lat : map.getCenter().lat();
  const longitude = location ? location.lng : map.getCenter().lng();
  const cafes = await fetchCafes(latitude, longitude);

  map.markers && map.markers.forEach(marker => marker.setMap(null));
  map.markers = [];

  cafesContainer.innerHTML = '';

  const visibleCafes = cafes.filter((cafe) => {
    const cafeLat = cafe.coordinates.latitude;
    const cafeLng = cafe.coordinates.longitude;

    // 카페가 현재 보이는 지도 영역 안에 있는지 확인
    return cafeLat <= northeast.lat() && cafeLat >= southwest.lat() && 
           cafeLng <= northeast.lng() && cafeLng >= southwest.lng();
  });

  visibleCafes.forEach((cafe) => {
    const cafeLat = cafe.coordinates.latitude;
    const cafeLng = cafe.coordinates.longitude;
      
    const marker = new google.maps.Marker({
      position: { lat: cafeLat, lng: cafeLng },
      map: map,
      title: cafe.name,
    });

    
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="width: 250px; height: 250px;">
                  <h5 style="text-align: center;">${cafe.name}</h5>
                  <img src="${cafe.image_url}" alt="${cafe.name}" style="width: 100%; height: 120px; object-fit: cover;">
                  <div style="text-align: center; margin-top: 10px;">${generateBeans(cafe.rating)}</div>
                </div>`,
      disableAutoPan: false
    });

    marker.addListener('mouseover', () => {
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      infoWindow.close();
    });

    map.markers.push(marker);
  });

  cafeList = visibleCafes; 
  drawCafeList(cafeList); 
}


// 입력된 위치를 기반으로 >> 지도 중심을 이동
function geocodeLocation() {
  const location = document.getElementById('location').value;
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: location }, (results, status) => {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      searchCafes({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      });
    } else {
      alert('error' + status);
    }
  });
}

  document.getElementById('filter-rating-4').addEventListener('click', () => filterByRating(4)); 
  document.getElementById('filter-rating-3').addEventListener('click', () => filterByRating(3)); 
  document.getElementById('filter-open').addEventListener('click', filterByOpenStatus);
  document.getElementById('filter-by-reviews').addEventListener('click', filterByReviews); 
  document.getElementById('filter-breakfast').addEventListener('click', filterByBreakfast);
  document.getElementById('filter-delivery').addEventListener('click', filterByDelivery); 
  document.getElementById('filter-reservation').addEventListener('click', filterByReservation); 
  document.getElementById('filter-price-1').addEventListener('click', () => filterByPrice('$'));
  document.getElementById('filter-price-2').addEventListener('click', () => filterByPrice('$$'));
  document.getElementById('filter-price-3').addEventListener('click', () => filterByPrice('$$$'));


  