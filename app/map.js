import { getYelpData } from './service.cafe.js';

const googleMapsApiKey = 'AIzaSyBmYcA2GpI9H5qMgWCSFEj91g4Lxn2LVoc';

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    // Call function to fetch Yelp data and place markers
    getYelpData(map);
}

function displayResultsOnMap(businesses, map) {
    businesses.forEach(business => {
        const marker = new google.maps.Marker({
            position: { lat: business.coordinates.latitude, lng: business.coordinates.longitude },
            map: map,
            title: business.name
        });

        const infowindow = new google.maps.InfoWindow({
            content: `
                <div>
                    <h3>${business.name}</h3>
                    <p>Rating: ${business.rating}</p>
                    <p>${business.location.address1}, ${business.location.city}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infowindow.open(map, marker);
        });
    });
}

document.addEventListener('DOMContentLoaded', initMap);// Test change
