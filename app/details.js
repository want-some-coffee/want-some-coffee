const yelpApiKey =
  'CEiX7Ik4-D6pfISyZyYOyoLndefKlZBmXJeG4v4R0B01dhDk8niVEuOxyOQJRtaM8qkFBe2RUlF-ARlBAufVXAMqCSSVDSgoEykV54euotmC77IbkVL2ggsSvNGaZnYx';
const baseUrl = `https://api.yelp.com/v3/businesses/search?location=Vancouver&categories=cafes&limit=1`;



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
    const cafeHTML = cafeList.map(item => `
      
    <h1 class="bona-nova-sc-regular-italic cafe-name"> ${item.name} </h1>
   
    <div class="attributes"> 
              <div>
              <a href="#"> ${item.review_count} reviews </a>
             <span> | </span>
              <span> ${item.price} </span>
              <span> | </span>
              <span> ${item.categories[0].title} </span>
              </div>

               <div>
                <span> ${item.location.address1} ${item.location.city} ${item.location.state} ${item.location.zip_code} ${item.location.country} 
                <span> | </span>
                <span> ${item.phone}</span>
                <span> | </span>
                <a href="${item.url}">Website</a>
                <span> | </span>
                <a href="${item.attributes.menu_url}"> Menu </a>
                <span> | </span>
                <span> ${item.business_hours.is_open_now ? 'Open now' : 'Closed now'} </span>  
              </div>
            </div>

         <div class="image-container">
        <img src="${item.image_url}" class="image-size">
      </div>

      <div class="container">
            <div class="row">
                <div class="col-lg-6 col-sm-12"> 
                  <div class="card mx-auto col-6" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title"> Location and contact </h5> 
                      <img src="https://maps.google.com/maps/api/staticmap?&channel=ta.desktop.restaurant_review&zoom=15&size=279x136&scale=1&client=gme-tripadvisorinc&format=jpg&sensor=false&language=en_CA&center=49.256638,-123.006920&maptype=roadmap&&markers=icon:http%3A%2F%2Fc1.tacdn.com%2F%2Fimg2%2Fmaps%2Ficons%2Fcomponent_map_pins_v1%2FR_Pin_Small.png|49.256638,-123.006920&signature=TWdKTvwD8vyGoIBXWZnX0I5pLbY=" width="250px">
                      <p class="card-text"> <i class="fa-regular fa-compass"></i> ${item.location.address1} ${item.location.city} ${item.location.state} ${item.location.zip_code} ${item.location.country} </p>
                      <p class="card-text"> <i class="fa-solid fa-laptop"></i><a href="${item.url}"> WEBSITE </a> </p>
                      <p class="card-text"> <i class="fa-solid fa-phone"></i> ${item.phone}</p>
                  </div>
                </div>
                </div>
 <div class="col-lg-6 col-sm-12"> 
                <div class="card col-6" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Reserve a table</h5>
                    <div class="card-text"> <input type ="date" class="reservation-button"> </div> 
                    <div class="card-text">  <input type= "time" class ="reservation-button"> </div> 
                      <span class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle dropdown-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Guests
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"> 1 Guest </a></li>
                        <li><a class="dropdown-item" href="#"> 2 Guest  </a></li>
                        <li><a class="dropdown-item" href="#"> 3 Guest </a></li>
                        <li><a class="dropdown-item" href="#"> 4 Guest  </a></li>
                        <li><a class="dropdown-item" href="#"> 5 Guest </a></li>
                        <li><a class="dropdown-item" href="#"> 6 Guest </a></li>
                        <li><a class="dropdown-item" href="#"> 7 Guest </a></li>
                        <li><a class="dropdown-item" href="#"> 8 Guest </a></li>
                      </ul>
                    </span>
                    <div class="button-position2"> <p class="card-link"> <a href="#"><button class="reservation-link">Find a Table </button> </a> </p> </div>
                  </div>
                </div>
              </div>
    

              <div class="col-lg-6 col-sm-12"> 
                <div class="card col-6" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title"> Details</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Price </h6>
                    <p class="card-text"> ${item.price}</p>
                    <h6 class="card-subtitle mb-2 text-body-secondary">CUISINES</h6>
                    <p class="card-text"> ${item.categories[0].title} </p>
                    <h6 class="card-subtitle mb-2 text-body-secondary"> Vegetarian Friendly </h6>
                    <p class="card-text"> ${item.liked_by_vegetarians ? '<i class="fa-solid fa-carrot"></i>' : '<i class="fa-solid fa-x"> </i>'}
                     </p>
                    <h6 class="card-subtitle mb-2 text-body-secondary"> WI-FI </h6>
                    <p class="card-text"> ${item.wi_fi == "free" ? 'FREE' : '<i class="fa-solid fa-x"> </i'} </p>
                    

                  </div>
                </div>
              </div>
          
              <div class="col-lg-6 col-sm-12"> 
                <div class="card col-6" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Hours</h5>
                    <p> MON : ${item.business_hours[0].open[0].start} - ${item.business_hours[0].open[0].end} </p>
                    <p>TUE : ${item.business_hours[0].open[1].start} - ${item.business_hours[0].open[1].end} </p>
                    <p>WED : ${item.business_hours[0].open[2].start} - ${item.business_hours[0].open[2].end}</p>
                    <p>THU : ${item.business_hours[0].open[3].start} - ${item.business_hours[0].open[3].end}</p>
                    <p>FRI : ${item.business_hours[0].open[4].start} - ${item.business_hours[0].open[4].end}</p>
                    <p>SAT : ${item.business_hours[0].open[5].start} - ${item.business_hours[0].open[5].end}</p>
                    <p>SUN : ${item.business_hours[0].open[6].start} - ${item.business_hours[0].open[6].end}</p>
                  </div>
                </div> 
              </div>

              <div class="col"> 
                <div class="card" style="width: 36rem; height: 15rem;">
                  <div class="card-body">
                    <h5 class="card-title"> Business History </h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary"> ABOUT</h6>
                    <p class="card-text"> 
                     ${item.attributes.about_this_biz_history ? item.attributes.about_this_biz_history : "No Business History Available" }  </p>
                    <p> ESTABLISED AT : 
                     ${item.attributes.about_this_biz_year_established ? item.attributes.about_this_biz_year_established : "No Info" } </p>
                     <p> 
                  </div>
                </div>
              </div>
               <div class="col"> 
                <div class="card" style="width: 36rem; height: 15rem;">
                  <div class="card-body">
                    <h5 class="card-title"> Business Specialty </h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary"> </h6>
                    <p> ${item.attributes.about_this_biz_specialties? item.attributes.about_this_biz_specialties : "No Info" } </>
                     <p> 
                  </div>
                </div>
              </div>

              <div class="col"> 
                <div class="card" style="width: 36rem; height: 10rem;">
                  <div class="card-body">
                    <h5 class="card-title"> Help Improve Want Some Coffee  </h5>
                    <p class="card-text"> Can you bring a dog? </p>
                    <button class="button-style"> <a href="#"> Yes </a></button>
                    <button class="button-style"> <a href="#"> No </a></button>
                 </div>
                </div>
              </div>
        
           
            <div class="button-position">
              <button class="button-style"> <a href="#"> Write a Review </a></button>
              <button class="button-style"> <a href="#"> Add Photo </a></button>
              <button class="button-style"> <a href="#"> Share </a></button>
              <button class="button-style"> <a href="#"> Save </a></button>
            </div>
          </div>
        </div>
      </container>
      </section>

        `);

        
    document.getElementById("details-items").innerHTML = cafeHTML;
    };
    

    

  getCafes();


  