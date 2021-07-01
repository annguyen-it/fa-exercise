const sidebarItems = document.querySelectorAll('.sidebar-item');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentTabIndex = 2;
let listMenuItemData;

fetch('https://app-travel-api.herokuapp.com/list-menu')
  .then((response) => response.json())
  .then((data) => (listMenuItemData = data.data))
  .then(() => loadSidebar())
  .then(async () => await loadGallery())
  .then(() => playBackgroundVideo());

function loadSidebar() {
  var htmls = listMenuItemData.map((menu) => {
    return `<li><a href="#"></a>${menu.name}</li>`;
  });
  var html = htmls.join('');
  document.querySelector('.list-items').innerHTML = html;
}

async function loadGallery() {
  let html =''
  const requestId = listMenuItemData[currentTabIndex].id;

  console.log(`https://app-travel-api.herokuapp.com/list-travel/${requestId}`);

  await fetch(`https://app-travel-api.herokuapp.com/list-travel/${requestId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);

      data.data.forEach((item, index) => {
        html += `<div class="col-xl-3 col-md-6">
          <div class="card gallery-item" style="width: 18rem;">
            <img src="${item.thumb}" class="card-img-top" alt="travel-picture">
            <div class="card-body">
              <p class="card-text">${item.title}</p>
            </div>
          </div>
        </div>`
      });
    
      document.querySelector('#gallery').innerHTML = html
    });
}

function changeTab(index) {
  sidebarItems[currentTabIndex].classList.remove('current');
  sidebarItems[index].classList.add('current');
  currentTabIndex = index;
}

function playBackgroundVideo() {
  document.querySelector('#heroVideo').src += '&autoplay=1';
}

sidebarItems.forEach((e, index) => {
  e.addEventListener('click', async () => {
    changeTab(index);
    await loadGallery();
  });
});
