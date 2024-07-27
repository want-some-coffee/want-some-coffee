import { getCafes } from './cafes.js';

// 윈도우 로딩되면 이벤트 실행
document.addEventListener('DOMContentLoaded', () => {
  getCafes();
  function adjustButtonContent() {
    const button49 = document.querySelector('#sorting .button-49');
    const button53 = document.querySelector('#sorting .button-53');
    const button51 = document.querySelector('#sorting .button-51');
    const button52 = document.querySelector('#sorting .button-52');
    
    if (window.innerWidth <= 768) {
      if (button49) button49.textContent = 'All';
      if (button53) button53.textContent = 'Open';
      if (button51) button51.textContent = 'Reservation';
      if (button52) button52.textContent = 'Price';
    } else {
      if (button49) button49.textContent = 'All results';
      if (button53) button53.textContent = 'Open Now Only';
      if (button51) button51.textContent = 'Reservation Available';
      if (button52) button52.textContent = 'Sort by Price';
    }
  }

  adjustButtonContent(); // Initial call to adjust button content on page load

  window.addEventListener('resize', adjustButtonContent);
});



// 푸터 연도표기
document.getElementById('copyRightYear').textContent = new Date().getFullYear();