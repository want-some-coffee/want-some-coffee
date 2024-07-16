export const yelpApiKey =
  'cLCckwvPZ64EAo3l2oCqdkYwO92JumAudkV78b84mY_4StYXylEUG0u4R6exM-pnEv3OGRQK16VM_jvgBWBHTwR0jqrBEmhLOWNYTEuaSoodzEYYMAl2PW9ZWBSOZnYx';

export async function getYelpData(map) {
  const location = 'Toronto';
  const category = 'cafes';

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${yelpApiKey}`,
      'Content-Type': 'application/json',
    },
  };

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
