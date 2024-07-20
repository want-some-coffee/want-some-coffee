const yelpApiKey =
  'BqzgfBC1YsJknV7DjFR22Q2WlZjIT9vuUFG0SIE27irpo49yoh0vwCRwyhrkhM2GF7JFdctbD1j9vEUg3L1YNkw1ArwiX_PDvqAMd59vcfRxJzGPOmpcZKxhsb2UZnYx';
const baseUrl = `https://api.yelp.com/v3/businesses/search?location=Toronto&categories=cafes&limit=1`;



const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
    'Content-Type': 'application/json'
  }
};

let cafeList = [];
let totalResults = 0;



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
    const cafeHTML = cafeList.map(item => `<h1 class="cafe-name"> ${item.name} </h1>

        <div class="double-top"></div>
        <div> 
        <img class="cafe-image" 
            src="${item.image_url}"> 
        </div>
        <div class="double-top"></div>

        <div class="card" style="width: 600px;">
        <div class="card-header fa-solid">
        MENU
        </div>
        <ul class="list-group list-group-flush fa-solid">
          <li class="list-group-item">
          ${item.attributes.menu_url == null ? 'Menu not Available' : '<a href="${item.attributes.menu_url}"> Website Menu </a>'} </li>
        </ul> 
      </div>
         
       <div class="card" style="width: 600px;">
        <div class="card-header fa-solid">
          Amenities and More
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"> <i class="fa-solid  fa-calendar"> Reservation :
           ${item.attributes.restaurant_reservations == 'true' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'} </i></li>
          <li class="list-group-item"> <i class="fa-solid fa-clock"> Waitlist Reservation :</i> ${item.attributes.waitlist_reservation == 'true' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'} </li>
          <li class="list-group-item"> <i class="fa-solid fa-dog"> Dogs Allowed : ${item.attributes.dogs_allowed == "!false" ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'}</i></li>
          <li class="list-group-item"> <i class="fa-solid fa-people-group"> Good for Groups : ${item.attributes.restaurants_delivery== 'true' ? '<i class="fa-regular fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-down"></i>'}</i></li>
          <li class="list-group-item"><i class="fa-solid fa-child"> Good for Kids: ${item.attributes.good_for_kids == "true" ? '<i class="fa-regular fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-down"></i>'}</i></li>
          <li class="list-group-item"><i class="fa-solid fa-carrot"> Vegetarian Options :  ${item.attributes.liked_by_vegetarians == 'true' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'} </i></li>
          <li class="list-group-item"> <i class="fa-solid fa-leaf"> Vegan Options : ${item.attributes.liked_by_vegans == 'true' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'} </i></li>
          <li class="list-group-item"> <i class="fa-solid fa-tree"> Outdoor Seating : ${item.attributes.outdoor_seating== 'true' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'} </i> </li>
          <li class="list-group-item"> <i class="fa-solid fa-truck"> Delivery : ${item.attributes.restaurants_delivery== 'true' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'}  </i>  </li>
          <li class="list-group-item"> <i class="fa-solid fa-person"> Waiter Service : </i>  ${item.attributes.restaurant_table_service == 'true' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'}  </li>
          <li class="list-group-item"> <i class="fa-solid fa-basket-shopping"> Offers Takeout : ${item.attributes.restaurant_take_out== 'true' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fa-solid fa-x"></i>'}  </i> </li>
          <li class="list-group-item"> <i class="fa-solid fa-wifi"> Wi-Fi :</i> ${item.attributes.wi_fi == "free" ? 'Free Wi-fi' : '<i class="fa-solid fa-x"></i>'}</li>
          <li class="list-group-item"> <i class="fa-solid fa-volume-high"> Noise Level: ${item.attributes.noise_level == '<i class="fa-solid fa-volume-xmark"></i>' ? 'average' : '<i class="fa-solid fa-volume-high"></i>'} </i></li>
        </ul>
     </div>
     </div>
     </div>
    </div>
       
        `);
    document.getElementById("details-item").innerHTML = cafeHTML;
    };
    

    


  getCafes();
