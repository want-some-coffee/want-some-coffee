let map;
let userMarker;

// Google Maps API를 사용하여 지도를 초기화하는 함수
function initMap() {
  // 기본 지도 설정
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.0447, lng: -114.0719 },
    zoom: 15,
    mapTypeControl: false, // 지도 위성 버튼 숨기기 
    streetViewControl: false, // 노란색 사람 모양 숨기기 
  });

  // 사용자의 현재 위치를 가져와 지도 중심으로 설정
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


const yelpAPI = 'kIrjDqF68bBxQuQ2oASKMilcGPTcgR9uOdCOKHXVxbCSg96wj-EPsShqiv_igpVi2V90fJtvu-0hQDPyzXHl7cemU1E62wz7Jo5x0C1XfzPogjXJL54-PepA2H-ZZnYx'

// 은미님 api 'P8yrZJ5yne3K8xtnN9mu5kPWG39xDyF8LiR7W8IFcgvHpeVyuimRuUHwsAUa_gslcPCTNP3UPYU_GjeEkP22hvjCO3LvMpthn7IEFP0ooQ2yeOgkszVS9YbszuuXZnYx'

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
  const cafeHTML = cafeList
    .map((cafe) => {
      return `
      <div class="row">
        <div class="col-lg-4 col-md-5 cafe-list"><img src="${cafe.image_url}" class="d-block w-100"></div>
        <div class="col-lg-8 col-md-7">
            <div class="data-title"><a href="${cafe.url}">${cafe.name}</a></div>
            <div class="data-txt">${cafe.rating} ${cafe.review_count} reviews</div>
            <div class="data-txt"><span class="ribbon-highlight">${cafe.categories.map((cat) => cat.title).join(', ')}</span>, ${cafe.location.city}</div>
            <div class="data-txt">${cafe.hours && cafe.hours[0].is_open_now ? 'Open' : 'Closed'}</div>
            <div class="data-txt">“${cafe.snippet_text || 'No description available.'}” more</div>
            <div class="data-txt">${cafe.location.address1}, ${cafe.location.city}</div>
        </div>
    </div>
        <hr>
      `;
    })
    .join('');

  document.getElementById('cafes').innerHTML = cafeHTML; 
  }

// 사용자가 입력한 위치를 기준으로 카페를 검색하는 함수
async function searchCafes(location) {
  const latitude = location ? location.lat : map.getCenter().lat(); 
  const longitude = location ? location.lng : map.getCenter().lng();
    const cafes = await fetchCafes(latitude, longitude);
  
    map.markers && map.markers.forEach(marker => marker.setMap(null));
    map.markers = [];
  
    const cafesContainer = document.getElementById('cafes');
    cafesContainer.innerHTML = ''; 
  
    // const customIcon =  "css/icon/brown_coffee-bean-fill.svg"
    cafes.forEach((cafe) => {
      const marker = new google.maps.Marker({
        position: { lat: cafe.coordinates.latitude, lng: cafe.coordinates.longitude },
        map: map,
        title: cafe.name,
        // icon: customIcon,
      });


      // InfoWindow 생성 
    const infoWindow = new google.maps.InfoWindow({
        content: `<div style="width: 250px; height: 200px;"> <!-- InfoWindow 크기 조정 *** -->
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

    // 카페 정보를 보여줌
    const cafeElement = document.createElement('div');
    cafeElement.classList.add('col-md-4', 'mb-3');
    cafeElement.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${cafe.name}</h5>
          <p class="card-text">${cafe.location.address1}</p>
          <a href="${cafe.url}" target="_blank" class="btn btn-primary">View on Yelp</a>
        </div>
      </div>
    `;
    cafesContainer.appendChild(cafeElement);

    });
    cafeList = cafes; 
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


  