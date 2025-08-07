const cart = JSON.parse(localStorage.getItem('cart')) || [];

async function ambilData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const displayhtml = document.getElementById("data-product");

    data.forEach(product => {
      const postElement = document.createElement('div');
      postElement.className = 'border p-4 rounded-md shadow hover:shadow-lg';

      postElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain" />
        <h3 class="mt-2 font-semibold">${product.title}</h3>
        <p class="text-sm">Rp ${(product.price * 16000).toLocaleString('id-ID')} ⭐ ${product.rating?.rate ?? 'N/A'}</p>
        <button class="bg-cyan-500 text-white px-4 py-1 mt-2 rounded add-to-cart">
          Detail Produk
        </button>
        `;
        

      postElement.querySelector('.add-to-cart').addEventListener('click', () => {
        tambahKeKeranjang(product);
      });

      displayhtml.appendChild(postElement);
    });

  } catch (error) {
    console.error("Terjadi error saat fetch:", error);
  }
}
// keranjang//
function tambahKeKeranjang(product) {
  cart.push(product);
  simpanCart();

  // Simpan produk terakhir ke localStorage untuk detail
  localStorage.setItem('detailProduct', JSON.stringify(product));

  // ke halaman detail produk
  window.location.href = 'detail.html';
}
function updateKeranjang() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemElement = document.createElement('p');
    itemElement.textContent = `${item.title} - Rp ${(item.price * 16000).toLocaleString('id-ID')}`;
    cartItems.appendChild(itemElement);
    total += item.price * 16000;
  });

  cartTotal.innerHTML = `<strong>Total: Rp ${total.toLocaleString('id-ID')}</strong>`;
}

function simpanCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


// Contoh produk yang akan dimasukkan ke localStorage saat klik cart
const dummyProduct = {
  title: "Men's levis shorts",

  price: 150000
};


document.querySelector('button.cart-btn')?.addEventListener('click', () => {
  localStorage.setItem('detail', JSON.stringify(dummyProduct));
  
});




ambilData();
updateKeranjang();

