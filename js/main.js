document.addEventListener('DOMContentLoaded', () => {
  // 1. مزامنة القائمة في الشاشات الصغيرة
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('is-active');
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. إدارة وتحديث السلة مع LocalStorage
  const cartBadge = document.getElementById('cartCount');

  const updateCartDisplay = () => {
    if (!cartBadge) return;
    const currentCount = localStorage.getItem('mh_cart_count') || '0';
    cartBadge.textContent = currentCount;
  };

  updateCartDisplay();

  // معالجة أزرار إضافة المنتجات
  const addButtons = document.querySelectorAll('[data-action="add-to-cart"]');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let count = parseInt(localStorage.getItem('mh_cart_count') || '0', 10);
      count += 1;
      localStorage.setItem('mh_cart_count', count.toString());

      updateCartDisplay();

      if (cartBadge) {
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
          cartBadge.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });
});
