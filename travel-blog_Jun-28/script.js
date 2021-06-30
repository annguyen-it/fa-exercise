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
  const requestId = listMenuItemData[currentTabIndex].id;

  console.log(`https://app-travel-api.herokuapp.com/list-travel/${requestId}`);

  await fetch(`https://app-travel-api.herokuapp.com/list-travel/${requestId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);

      data.data.forEach((item, index) => {
        galleryItems[index].querySelector('img').setAttribute('src', item.thumb);
        galleryItems[index].querySelector('.card-text').innerText = item.title;
      });
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
