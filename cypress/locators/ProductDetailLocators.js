// cypress/locators/ProductDetailLocators.js

export const ProductDetailLocators = {
  // ===== BASIC INFO =====
  productImage: '.product-detail img',
  productTitle: 'h1.product-name',
  productAuthor: '#model-title span',
  productPublisher: '.brand-title',
  productPrice: '.product-current-price .product-price',

  // ===== PRODUCT INFORMATION =====
  infoTitle: '.book-info-title',
  infoValue: '.book-info-desc',

  cartIcon: "#header-cart-btn",
  cartCount: ".cart-soft-count",
  
  quantityInput: 'input.form-control.text-center',
  removeFromCartButton: "clear-cart-btn-129",
  decreaseQtyButton: "span.ti-minus",
  clearCartButton: 'a:contains("Sepeti Temizle")',
  emptyCartMessage: 'p:contains("Sepetinizde ürün bulunmamaktadır")',
  continueShoppingButton: 'a:contains("Alışverişe Devam Et")',
  emptyCartMessage: 'p.fw-light.text-center.mb-2',

  // Add to cart (product detail)
  addToCartButton: "#addToCartBtn",

  // Cart price box
  cartPriceBox: ".cart-price-box",

  cartSubtotalLabel: ".cart-price-box .row:contains('Sepet Toplamı')",
  shippingFeeLabel: ".cart-price-box .row:contains('Kargo Ücreti')",
  grandTotalLabel: ".cart-price-box .row:contains('Genel Toplam')",

  priceValue: ".text-right",

  // Success popup
  successModal: "#cart-popup",
  goToCartButton: "#cart-popup-go-cart",
  buyNowButton: "#cart-popup-continue-shopping",

  cartItemRow: ".cart-item",
  deleteProductIcon: ".cart-item-delete",
  confirmDeleteButton: ".t-popconfirm-cancel-btn",
 
};
