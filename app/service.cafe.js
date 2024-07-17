<<<<<<< HEAD
=======
export const yelpApiKey =
  'cLCckwvPZ64EAo3l2oCqdkYwO92JumAudkV78b84mY_4StYXylEUG0u4R6exM-pnEv3OGRQK16VM_jvgBWBHTwR0jqrBEmhLOWNYTEuaSoodzEYYMAl2PW9ZWBSOZnYx';

>>>>>>> fec981de25d1f1b9f13ce37a33942f165bbb2273
export async function getYelpData(map) {
  const location = 'Toronto';
  const category = 'cafes';

<<<<<<< HEAD
=======
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${yelpApiKey}`,
      'Content-Type': 'application/json',
    },
  };

>>>>>>> fec981de25d1f1b9f13ce37a33942f165bbb2273
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

<<<<<<< HEAD
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
=======
// // search for restaurants
// const options = {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${apiKey}`,
//     'Content-Type': 'application/json'
//   }
// };

// fetch('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
>>>>>>> fec981de25d1f1b9f13ce37a33942f165bbb2273
