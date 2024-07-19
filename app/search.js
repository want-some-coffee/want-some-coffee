import { baseUrl, pageSize, getNews } from './news.js';
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

// 키워드별 검색
// keyword value
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('focus', () => (searchInput.value = ''));
searchInput.addEventListener('blur', () => (searchInput.value = ''));
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    getNewsByKeyword(event);
  }
});

export let currentCategory = '';
export let currentKeyword = '';

export const getNewsByCategory = async (event) => {
  closeMenu();

  const category = event.target.textContent.toLowerCase();
  console.log('category: ', category);

  currentCategory = category;
  currentKeyword = ''; // Reset keyword

  const newUrl = new URL(
    `${baseUrl}&pageSize=${pageSize}&category=${currentCategory}`
  );
  setPage(1); // Reset to first page
  return getNews(newUrl);
};

export const getNewsByKeyword = async (event) => {
  const keyword = searchInput.value;
  console.log('keyword', keyword);

  currentKeyword = keyword;
  currentCategory = ''; // Reset category

  const newUrl = new URL(`${baseUrl}&pageSize=${pageSize}&q=${currentKeyword}`);
  setPage(1); // Reset to first page
  return getNews(newUrl);
};

function handleMenuClick(event) {
  menus.forEach((menu) => menu.classList.remove('active'));
  event.target.classList.add('active');
}
