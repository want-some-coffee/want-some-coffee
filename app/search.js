import { baseUrl, yelpApiKey } from './apiKey.js';
import { geCafes } from './cafes.js';
import { setPage } from './pagination.js';

// 카테고리별 검색
// 메뉴 불러오기
const menus = document.querySelectorAll('.menus li, .side-menu-list li');

// forEach: 리턴값 없이 메뉴 아이템 하나하나 읽어옴
menus.forEach((menu) => {
  menu.addEventListener('click', (event) => {
    handleMenuClick(event);
    getNewsByCategory(event);
  });
});

// Search by location
const locationInput = document.getElementById('location-input');
locationInput.addEventListener('focus', () => (searchInput.value = ''));
locationInput.addEventListener('blur', () => (searchInput.value = ''));
locationInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    getCafessByLocation(event);
  }
});

// Search by keyword
const searchInput = document.getElementById('search-input');
const btnSsearch = document.getElementById('btn-search-input');
btnSsearch.addEventListener('click', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    getCafessByKeyword(event);
  }
});

export let currentLocation = '';
export let currentKeyword = '';

export const getCafessByLocation = async (event) => {
  closeMenu();

  const category = event.target.textContent.toLowerCase();
  console.log('category: ', category);

  currentLocation = category;
  currentKeyword = ''; // Reset keyword

  const newUrl = new URL(
    `${baseUrl}&pageSize=${pageSize}&category=${currentCategory}`
  );
  setPage(1); // Reset to first page
  return getNews(newUrl);
};

export const getCafessByKeyword = async (event) => {
  const keyword = searchInput.value;
  console.log('keyword', keyword);

  currentKeyword = keyword;
  currentLocation = ''; // Reset category

  const newUrl = new URL(`${baseUrl}&pageSize=${pageSize}&q=${currentKeyword}`);
  setPage(1); // Reset to first page
  return getNews(newUrl);
};

function handleMenuClick(event) {
  menus.forEach((menu) => menu.classList.remove('active'));
  event.target.classList.add('active');
}
