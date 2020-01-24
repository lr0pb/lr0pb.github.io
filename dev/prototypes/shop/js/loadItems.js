(function () {

let totalIndex;
let currentIndex = 1;
let response;

document.addEventListener('DOMContentLoaded', async function () {
  async function iDetecter() {
    for (let i = 1; i < 30; i++) {
      response = await fetch(`items/itemList${i}.json`);
      console.log(response);
      if (!response.ok) {
        totalIndex = --i;
        break;
      };
    };
  };
  await iDetecter();
  await loadItems();
  document.querySelector('#loadingBlock').style.display = 'none';
  document.querySelector('#reloadBlock').removeAttribute('style');
});

document.querySelector('#reloadBlock > button').addEventListener('click', async function (e) {
  if (currentIndex < totalIndex) {
    e.target.parentElement.style.display = 'none';
    document.querySelector('#loadingBlock').removeAttribute('style');
    await loadItems();
    document.querySelector('#loadingBlock').style.display = 'none';
    e.target.parentElement.removeAttribute('style');
  };
});

document.addEventListener('scroll', async function () {
  if (document.documentElement.offsetHeight - document.documentElement.scrollTop < document.documentElement.clientHeight * 1.5 && loadStream == 'go') {
    document.querySelector('#loadingBlock').removeAttribute('style');
    document.querySelector('#reloadBlock').style.display = 'none';
    await loadItems();
    document.querySelector('#loadingBlock').style.display = 'none';
  };
});

async function loadItems() {
  if (currentIndex <= totalIndex) {
    response = await fetch(`items/itemList${currentIndex}.json`);

    if (response.ok) {
      let rawJson = await response.json();
      let json = JSON.parse(rawJson);
      showItems(json);
    } else {
      console.log(response.status);
    };

    document.querySelector('#reloadBlock').removeAttribute('style');
    currentIndex++;
    if (i == 1) {
      document.querySelector('#reloadBlock').style.display = 'none';
    };
  };
};

function showItems(json) {
  for (let i = 0; i < json.length; i++) {
    new createItem('itemsList', 'none', json[i].index, json[i].title, json[i].price, json[i].image, json[i].link);
  };
};

})()
