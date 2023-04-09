//const apiKey = '915a8d973d7349fc8b62166c50dc6520';

let form = document.getElementById('mobile-form');
let mobileInfo = document.getElementById('mobile-info');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let mobile = document.getElementById('num').value;
    getmobilenumbervalid(mobile);
});

async function getmobilenumbervalid(mobile) {
    // make a request to the api
    // get the details
    // parse the details to the html

    try {
        let response = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=915a8d973d7349fc8b62166c50dc6520&phone=${mobile}`);
        let data = await response.json();
       // console.log(data);
        let mobilenumber=data.phone;
        let validnumber=data.valid;
        let country=data.country.name;
        let location=data.location;
        //console.log(mobilenumber,validnumber,country,location);
        let card = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h3 class="card-title">Mobile Number is:${mobilenumber}</h3>
                        </div>
                        <div class="card-body">
                            <div class="text-center">
                                <p class="temperature mb-0">Valid:${validnumber}</p>
                                <p class="description">Country${country}</p>
                                <p class="description">Location${location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            mobileInfo.innerHTML = card;
    } catch (error) {
        console.error('error fetching weather data');
    }
}