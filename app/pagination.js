import { baseUrl, yelpApiKey } from './apiKey.js';
import { getCafes, dataTotal } from './cafes.js';

export const pagination = document.getElementById('cafe-lists-pagination');
let page = 1; // current page
export const pageSize = 10; // number of results per page

export const drawPagination = () => {
  const totalPages = Math.ceil(dataTotal / pageSize);
  console.log('pageSize: ', pageSize);
  console.log('dataTotal: ', dataTotal);

  // page group
  const groupSize = 5; // < pre | 6 7 8 | next >
  const pageGroup = Math.ceil(page / groupSize); // my page group
  // ex) if my current page is 7,
  // = 7 / 5 = 1.4
  // round up = 2
  // my page group = 2

  // last page of the page group
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``;

  // show first page button <<
  if (page > groupSize) {
    paginationHTML = `<li class="page-item" onClick="moveToPage(1)"><a class="page-link"> &lt;&lt; </a></li>`;
  }

  // show previous page button <
  if (page > 1) {
    paginationHTML += `<li class="page-item" onClick="moveToPage(${page - 1})"><a class="page-link"> &lt; </a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
      <li class="page-item ${i === page ? 'active' : ''}">
        <a class="page-link" href="#" onclick="moveToPage(${i}); return false;">${i}</a>
      </li>
    `;
  }

  // show next page button >
  if (page < totalPages) {
    paginationHTML += `<li class="page-item" onClick="moveToPage(${page + 1})"><a class="page-link"> &gt; </a></li>`;
  }

  // show last page button >>
  if (lastPage < totalPages) {
    paginationHTML += `<li class="page-item" onClick="moveToPage(${totalPages})"><a class="page-link"> &gt;&gt; </a></li>`;
  }

  pagination.innerHTML = paginationHTML;
};

window.moveToPage = (pageNum) => {
  setPage(pageNum);
  const offset = (pageNum - 1) * pageSize;
  let newUrl = `${baseUrl}&offset=${offset}`;
  getCafes(newUrl);
  drawPagination();
};

// Function to set the current page
export const setPage = (newPage) => {
  page = newPage;
};
