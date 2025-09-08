// cart.js

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('cart-page')) {
        renderCartPage();
        
        // Setup continue shopping button
        const continueShoppingBtn = document.querySelector('.continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', function() {
                window.location.href = 'Main.html';
            });
        }
    }
    updateCartIcon();
});

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);

    if (!product) {
        console.error('Product not found!');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    showNotification(`${product.name} has been added to your cart.`);
}

function showNotification(message) {
    // Create notification container if it doesn't exist
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>${message}</p>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Remove after animation
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            container.removeChild(notification);
        }, 500);
    }, 3000);
}

function updateCartIcon() {
    const cart = getCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartLink = document.querySelector('.cart a');
    if (cartLink) {
        cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cartCount})`;
    }
}

function renderCartPage() {
    const cart = getCart();
    const cartItemsList = document.querySelector('.cart-items-list');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartLayout = document.querySelector('.cart-layout');
    
    if (!cartItemsList) return;

    if (cart.length === 0) {
        // Show empty cart message
        if (emptyCartMessage) emptyCartMessage.style.display = 'flex';
        if (cartLayout) cartLayout.style.display = 'none';
        return;
    }
    
    // Hide empty cart message and show cart layout
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartLayout) cartLayout.style.display = 'grid';

    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="quantity-selector">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="cart-item-total">
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item-btn" data-id="${item.id}">&times;</button>
            </div>
        `;
        cartItemsList.appendChild(itemElement);
    });

    updateCartSummary(cart);
    addCartEventListeners();
}

function updateCartSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0; // Free shipping
    const taxRate = 0.07; // 7% tax
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

function addCartEventListeners() {
    const cartItemsList = document.querySelector('.cart-items-list');

    cartItemsList.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains('remove-item-btn')) {
            removeFromCart(id);
        }
        if (e.target.classList.contains('plus')) {
            updateQuantity(id, 1);
        }
        if (e.target.classList.contains('minus')) {
            updateQuantity(id, -1);
        }
    });

    cartItemsList.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains('quantity-input')) {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                updateQuantity(id, newQuantity, true);
            } else {
                removeFromCart(id);
            }
        }
    });
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCartPage();
}

function updateQuantity(productId, change, isAbsolute = false) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);

    if (item) {
        if (isAbsolute) {
            item.quantity = change;
        } else {
            item.quantity += change;
        }

        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
            renderCartPage();
        }
    }
}
