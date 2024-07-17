export async function getYelpData(map) {
  const location = 'Toronto';
  const category = 'cafes';

  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${location}&categories=${category}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    displayResultsOnMap(data.businesses, map);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export function displayResultsOnMap(businesses, map) {
  businesses.forEach((business) => {
    const marker = new google.maps.Marker({
      position: {
        lat: business.coordinates.latitude,
        lng: business.coordinates.longitude
      },
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
