/**
 * MH Brand Core Scripts
 * Clean modular ES6 standard
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCartState();
  initProductAddActions();
});

// إدارة فتح وإغلاق القائمة في الموبايل عبر الفئات (Classes)
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = navMenu.classList.toggle('is-active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  });
}

// مزامنة حالة سلة الشراء عبر الصفحات باستخدام LocalStorage
function initCartState() {
  const cartBadge = document.getElementById('cartCount');
  if (!cartBadge) return;

  const currentCartCount = localStorage.getItem('mh_cart_count') || '0';
  cartBadge.textContent = currentCartCount;
}

// معالجة إضافة المنتجات وتحديث العداد
function initProductAddActions() {
  const addButtons = document.querySelectorAll('[data-action="add-to-cart"]');
  const cartBadge = document.getElementById('cartCount');

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      let count = parseInt(localStorage.getItem('mh_cart_count') || '0', 10);
      count += 1;
      localStorage.setItem('mh_cart_count', count);

      if (cartBadge) {
        cartBadge.textContent = count;
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
          cartBadge.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });
}
