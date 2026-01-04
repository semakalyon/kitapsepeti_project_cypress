export const SearchLocators = {
  // --- Search ---
  searchBar: '#live-search',
  searchButton: '#live-search-btn',
  acceptCookiesButton: '.cc-nb-okagree',

  // --- Product List ---
  
  productContainer: '#catalog362',
  productItem: '#catalog362 .product-item',
  productCard: '#catalog362 .product-detail-card',

  productImage: '.product-detail img', 
  productTitle: '.product-title',
  productPublisher: '.brand-title',
  productAuthor: '.model-title',
  productPrice: '.current-price .product-price',


  // --- Add to Cart ---
  addToCartButton: '#catalog362 .add-to-cart-btn',

  // --- Cart ---
  cartCount: '.shopping-cart .count',

  // --- Filters & Sorting ---
  sortDropdown: '#sort',
  authorCheckbox: '[id^="label-brand"]',
  brandCheckbox: '#brand_195',

  // --- Category ---
  categoryItemByText: (text) =>
    `a.filter-item:contains("${text}")`,

  categoryContainer: '#product-filter',
  categoryHoverByText: (text) => `li:contains("${text}")`,
  categoryInfo: '.sgm-search-product-info-category',

  filterPanel: '.filter-body', // Filtre panelinin ana konteyneri
  sortDropdown: 'select#sort', //
  productList: '#catalog362 .product-item',
  // Spesifik ID (#brand_195) yerine genel kategori/marka listesi
  filterGroupTitles: '.filter-title', 
  activeFilters: '.filter-item',

  // --- Success / Modal ---
  successModal: '.swal2-popup',
  topMenuCategoryByTitle: (title) =>
     `#main-menu a[title="${title}"]`,
// --- Category ---
categoryTitle: 'h1.category-name',

};
