const loadPhone = async(searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}
const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone_container');
    // clear card before adding new cards
    phoneContainer.innerText = '';

    phones.forEach (phone =>{
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList=`card bg-base-100 shadow-xl p-6`;
        phoneCard.innerHTML=`<figure><img src="${phone.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>`;
        phoneContainer.appendChild(phoneCard);
    })
}
// search button handle
const searchhandle = () =>{
    const searchInput = document.getElementById('search_input');
    const searchText = searchInput.value;
    console.log(searchText);
    loadPhone(searchText);
}

// loadPhone();