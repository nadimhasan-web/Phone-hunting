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
    // show all btn show and hide
    const showAll = document.getElementById('show_all');
    if(phones.length > 12){
      showAll.classList.remove('hidden');
    }
    else{
      showAll.classList.add('hidden');
    }
    // show 12 card
    phones = phones.slice(0,12);

    phones.forEach (phone =>{
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList=`card bg-base-100 shadow-xl p-6`;
        phoneCard.innerHTML=`<figure><img src="${phone.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
          </div>
        </div>`;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}
// search button handle
const searchhandle = () =>{
  toggleLoadingSpinner(true);
    const searchInput = document.getElementById('search_input');
    const searchText = searchInput.value;
    console.log(searchText);
    loadPhone(searchText);
}

// loadding spinner
const toggleLoadingSpinner = (isLoading) =>{
  const loader = document.getElementById('loader');
  if(isLoading){
    loader.classList.remove('hidden');
  }
  else{
    loader.classList.add('hidden');
  }
}
// handle show all 
const handleShowAll = () => {

}
// show details
const handleShowDetails = async(id) => {
  // console.log('asi re vai', id);
  // show single phone
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}
// show details modal
const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('modal_phone_name');
  phoneName.innerText = phone.name;
  const modalDetails = document.getElementById('modal_details');
  modalDetails.innerHTML = `
    <img src="${phone.image}"  alt=""/>
    <p><span class="font-bold">Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">Release Date:</span>${phone?.releaseDate}</p>
    <p><span class="font-bold">Memory:</span>${phone?.mainFeatures?.memory}</p>
  `;
  console.log(phone);
  show_details_modal.showModal()
}