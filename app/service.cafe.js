
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

