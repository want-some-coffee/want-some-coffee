let map;
let userMarker;

// Google Maps API를 사용하여 지도를 초기화하는 함수
function initMap() {
  // 기본 지도 설정
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.0447, lng: -114.0719 },
    zoom: 15,
    mapTypeControl: false, // 지도 위성 버튼 숨기기 ***
    streetViewControl: false, // 노란색 사람 모양 숨기기 ***
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

  //지도 클릭 이벤트 추가
  map.addListener("click", (event) => {
    const clickedLocation = {
        lat : event.latLng.lat(),
        lng : event.latLng.lng(),
    };
    searchCafes(clickedLocation);
    console.log(clickedLocation);
});
}

const yelpAPI = 'P8yrZJ5yne3K8xtnN9mu5kPWG39xDyF8LiR7W8IFcgvHpeVyuimRuUHwsAUa_gslcPCTNP3UPYU_GjeEkP22hvjCO3LvMpthn7IEFP0ooQ2yeOgkszVS9YbszuuXZnYx'

// Yelp API를 사용하여 특정 위치 주변의 카페 정보를 가져오는 함수
async function fetchCafes(latitude, longitude) {
  const response = await fetch(`https://api.yelp.com/v3/businesses/search?term=cafe&latitude=${latitude}&longitude=${longitude}`, {
    headers: {
      'Authorization': `Bearer ${yelpAPI}`, 
    },
  });
  const data = await response.json();
  return data.businesses;
}

// 리뷰 아이콘을 생성하는 함수 ***
function generateStars(rating) {
    const fullStarUrl = 'css/icon/brwon_coffee-bean-fill.svg'; 
    const emptyStarUrl = 'css/icon/brwon_coffee-bean-fill.svg'; 
    
    const fullStar = `<img src="${fullStarUrl}" class="star" alt="Full Star" />`; // 이미지 태그로 수정 ***
    const emptyStar = `<img src="${emptyStarUrl}" class="star" alt="Empty Star" />`; // 이미지 태그로 수정 ***
    
    let stars = '';
    
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? fullStar : emptyStar;
    }
    return stars;
  }

// 사용자가 입력한 위치를 기준으로 카페를 검색하는 함수
async function searchCafes(location) {
    const latitude = location ? location.lat : 51.0447; // 기본 위치는 캘거리
    const longitude = location ? location.lng : -114.0719; // 기본 위치는 캘거리
    const cafes = await fetchCafes(latitude, longitude);
  
    // 기존 마커와 결과 삭제
    map.markers && map.markers.forEach(marker => marker.setMap(null));
    map.markers = [];
  
    const cafesContainer = document.getElementById('cafes');
    cafesContainer.innerHTML = ''; // 이전 결과를 초기화
  
    // const customIcon =  "css/icon/brwon_coffee-bean-fill.svg"
    cafes.forEach((cafe) => {
      const marker = new google.maps.Marker({
        position: { lat: cafe.coordinates.latitude, lng: cafe.coordinates.longitude },
        map: map,
        title: cafe.name,
        // icon: customIcon,
      });


      // InfoWindow 생성 *** 
    const infoWindow = new google.maps.InfoWindow({
        content: `<div style="width: 250px; height: 200px;"> <!-- InfoWindow 크기 조정 *** -->
                    <h5 style="text-align: center;">${cafe.name}</h5>
                    <img src="${cafe.image_url}" alt="${cafe.name}" style="width: 100%; height: 120px; object-fit: cover;"> 
                    <div style="text-align: center; margin-top: 10px;">${generateStars(cafe.rating)}</div> 
                  </div>`,
        disableAutoPan: true
      });
  
      // 마우스오버 이벤트 추가 
      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });
  
      // 마우스아웃 이벤트 추가 
      marker.addListener('mouseout', () => {
        infoWindow.close();
      });
    // 마커를 배열에 추가
    map.markers.push(marker);

    // 카페 정보를 보여주는 요소 생성
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
  }
// 위치 입력란에서 Enter 키를 누르면 검색 수행
document.getElementById('location').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
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
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  });


  