// apikey
const yelpApiKey =
// 'BqzgfBC1YsJknV7DjFR22Q2WlZjIT9vuUFG0SIE27irpo49yoh0vwCRwyhrkhM2GF7JFdctbD1j9vEUg3L1YNkw1ArwiX_PDvqAMd59vcfRxJzGPOmpcZKxhsb2UZnYx';
const baseUrl = `https://api.yelp.com/v3/businesses/search?location=Toronto&categories=cafes&limit=3`;

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
    'Content-Type': 'application/json'
  }
};

let cafeList = [];
let totalResults = 0;



// Fetch Yelp data and display in café list area
const getCafes = async (url = baseUrl) => {
    try {
      const response = await fetch(url, options);
      console.log('response:', response);
  
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
  
      const data = await response.json();
      cafeList = data.businesses;
      render();
      console.log('Data fetched:', cafeList);
    } catch (error) {
      console.error('Error fetching and parsing data', error);
    }
  };
 

  

  const render =() => {
    const cafeHTML = cafeList.map(item => `
        <div class="double-top"></div>
        <div class="items-left">
            <h1 class="cafe-name"> ${item.name} </h1>
            <div class="general-info">
              <div id="price"> ${item.price} </div>
              <div>  ${item.rating} (${item.review_count
              } reviews)
                <i class="fa-solid fa-mug-saucer"></i>
                <i class="fa-solid fa-mug-saucer"></i>
                <i class="fa-solid fa-mug-saucer"></i>
                <i class="fa-solid fa-mug-saucer"></i>
                <i class="fa-solid fa-mug-saucer"></i>
              </div>

              </div>
              <div class="divider"> </div> 
            <div class="location-details">
                Address
                <br>
                ${item.location.address1}
                <br>
                ${item.location.city} ${item.location.state}
                <br>
                ${item.location.zip_code}
                </div>
            <div class="divider"> </div>
            <i class="fa-solid fa-phone"> PHONE NUMBER : ${item.phone}</i>
            <div class="divider"> </div> 
            <i class="fa-solid  fa-map"> <a class="map-direction" href ="https://www.google.com/maps"> GET DIRECTIONS </a> </i>
            <div class="divider"> </div>
            <i class="fa-solid fa-clock"> HOURS  </i>
            ${item.business_hours.open}      영업시간    
            <div class="divider"> </div>
          
            <div class="cafe-position">
                <div> 
                  <img src=${item.image_url} class="d-block w-100" alt="...">
                </div>


                
            <div class="card" style="width: 28rem;">
              <div class="card-header">
                Amenities
              </div>
              <div class="amenities-icons">
                <i class="fa-solid fa-utensils"> </i> 
                <i class="fa-solid fa-square-parking"> </i>
                <i class="fa-solid fa-couch"> </i>
               <i class="fa-solid fa-mug-saucer"></i>
            </div>

        </div>
        <div class="user-can-do"> 
          <i class="fa-solid fa-mug-saucer"> Reserve a table </i>
        <i class="fa-solid fa-mug-hot"> Write a review </i>
        <i class="fa-solid fa-image">Add Photo </i>
        <i class="fa-solid fa-share"> Share </i>
        <i class="fa-solid fa-star"> Favorite </i>
        </div>
       </div> 
    </div>
        `);

    document.getElementById("cafe-details").innerHTML = cafeHTML;
  };
  getCafes();
