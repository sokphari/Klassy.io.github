
// let cardItem = JSON.parse(localStorage.getItem("cardItem")) || [];
// let total = 0;
// let itemsCount = 0;
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Show/Hide modal
let cardIcon = document.querySelector('.card-icon');
let cardModal = document.querySelector('.card-modol');
let cardClose = document.querySelector('.close-btn');

cardIcon.addEventListener("click", () => cardModal.classList.add('open'));
cardClose.addEventListener("click", () => cardModal.classList.remove('open'));

// Add product to cart
function addToCart(button) {
    const productCard = button.closest('.card');
    const title = productCard.querySelector('.card-title').textContent;
    const priceText = productCard.querySelector('.fw-bold').textContent;
    const price = parseFloat(priceText.replace('$', ''));
    const image = productCard.querySelector('.card-img-top').src;

    const existing = cartItems.find(item => item.title === title);

    if (existing) {
        existing.quantity += 1;
    } else {
        cartItems.push({ title, price, quantity: 1, image });
    }

    updateLocalStorage();
    updateCartDisplay();
}

// Update the modal cart
function updateCartDisplay() {
    const cartList = document.getElementById('card-items');
    const totalPrice = document.getElementById('total-price');

    cartList.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;

        const li = document.createElement('li');
        li.classList = "card-item";
        li.innerHTML = `
              <img src="${item.image}" alt="" class="card-item-image">
        <div class="card-item-detail">
        <div class="card-item-name">${item.title}</div>
        <div class="card-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
         </div>
        <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-primary me-1"  onclick="changeQty('${item.title}', -1)">-</button>
            <button class="btn btn-sm btn-info me-1" onclick="changeQty('${item.title}', 1)">+</button>
            <button class="btn btn-sm btn-danger" onclick="removeItem('${item.title}')"><i class="fa-solid fa-trash"></i></button>
        </div>

        `;
        cartList.appendChild(li);
    });

    totalPrice.textContent = total.toFixed(2);
}

// Change quantity
function changeQty(title, amount) {
    const item = cartItems.find(i => i.title === title);
    if (!item) return;
    item.quantity += amount;
    if (item.quantity <= 0) {
        cartItems = cartItems.filter(i => i.title !== title);
    }
    updateLocalStorage();
    updateCartDisplay();
}

// Remove item
function removeItem(title) {
    cartItems = cartItems.filter(i => i.title !== title);
    updateLocalStorage();
    updateCartDisplay();
}

// Save to localStorage
function updateLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Init on load
updateCartDisplay();



// Live product search
document.getElementById('product-search').addEventListener('input', function () {
    const query = this.value.toLowerCase(); // user input
    const cards = document.querySelectorAll('.card'); // all product cards

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        if (title.includes(query)) {
            card.parentElement.style.display = ''; // show
        } else {
            card.parentElement.style.display = 'none'; // hide
        }
    });
});

//click icon heart
function toggleWishlist(iconContainer) {
    const icon = iconContainer.querySelector('i');

    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas', 'text-danger'); // filled heart + red
    } else {
        icon.classList.remove('fas', 'text-danger');
        icon.classList.add('far'); // outline heart
    }
}
