const sidebarItems = document.querySelectorAll('.sidebar-item');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentTabIndex = 2;
let listMenuItemData;

fetch('https://app-travel-api.herokuapp.com/list-menu')
  .then((response) => response.json())
  .then((data) => (listMenuItemData = data.data))
  .then(() => loadData());

async function loadData() {
  const requestId = listMenuItemData[currentTabIndex].id;

  console.log(`https://app-travel-api.herokuapp.com/list-travel/${requestId}`);

  fetch(`https://app-travel-api.herokuapp.com/list-travel/${requestId}`)
    .then((response) => response.json())
    .then((data) => {
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

sidebarItems.forEach((e, index) => {
  e.addEventListener('click', async () => {
    changeTab(index);
    await loadData();
  });
});
