import { getCafes } from './cafes.js';

// 윈도우 로딩되면 이벤트 실행
document.addEventListener('DOMContentLoaded', () => {
  getCafes();
});



// 푸터 연도표기
document.getElementById('copyRightYear').textContent = new Date().getFullYear();