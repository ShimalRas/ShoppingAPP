// Function to include header
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Update active nav link
            const navLinks = document.querySelectorAll('nav ul li a');
            const currentPage = window.location.pathname.split('/').pop();
            navLinks.forEach(link => {
                if(link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
}

// Function to handle product modal
function setupProductModal() {
    const modal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Close modal when clicking X button
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Close modal when clicking outside modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
    
    // Tab functionality
    const tabHeader = document.querySelectorAll('.tab-header div');
    const tabContent = document.querySelectorAll('.tab-body');
    
    tabHeader.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            tabHeader.forEach(item => item.classList.remove('active'));
            tabContent.forEach(item => item.classList.remove('active'));
            
            tab.classList.add('active');
            tabContent[index].classList.add('active');
        });
    });
    
    // Quantity selector functionality
    const quantityPlus = document.querySelector('.quantity-btn.plus');
    const quantityMinus = document.querySelector('.quantity-btn.minus');
    const quantityInput = document.querySelector('.quantity-input');
    
    quantityPlus.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < parseInt(quantityInput.max)) {
            quantityInput.value = value + 1;
        }
    });
    
    quantityMinus.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > parseInt(quantityInput.min)) {
            quantityInput.value = value - 1;
        }
    });
    
    // Modal Add to Cart button
    const modalAddToCartBtn = document.querySelector('.modal-add-to-cart');
    modalAddToCartBtn.addEventListener('click', function() {
        const productId = document.querySelector('.modal-product').dataset.productId;
        const quantity = parseInt(document.querySelector('.quantity-input').value);
        addToCart(productId, quantity);
        
        // Close the modal
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
}

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    if (product.limited) {
        card.style.border = '2px solid #ff1a1a';
        card.style.boxShadow = '0 0 15px #ff1a1a';
    }
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name} ${product.limited ? '<span style="color:#ff1a1a;font-size:14px;">(Limited Edition)</span>' : ''}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="btn-add-to-cart">Add to Cart</button>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart')) {
            // Don't do anything here, it's handled by the global event listener
            return;
        }
        openProductModal(product);
    });
    
    return card;
}

// Function to open product modal with product data
function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    const modalProduct = document.querySelector('.modal-product');
    
    // Set product ID on modal for cart functionality
    if (modalProduct) {
        modalProduct.dataset.productId = product.id;
    }
    
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-price').textContent = `$${product.price.toFixed(2)}`;
    
    // Reset quantity to 1
    const quantityInput = document.querySelector('.quantity-input');
    if (quantityInput) {
        quantityInput.value = 1;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Load products into the page
function loadProducts() {
    const featuredProductsGrid = document.querySelector('.featured-products .product-grid');
    const keyboardsGrid = document.querySelector('#keyboards .product-grid');
    const miceGrid = document.querySelector('#mice .product-grid');
    const monitorsGrid = document.querySelector('#monitors .product-grid');
    const headphonesGrid = document.querySelector('#headphones .product-grid');

    if (featuredProductsGrid) {
        const featured = products.filter(p => p.featured);
        featured.forEach(product => {
            featuredProductsGrid.appendChild(createProductCard(product));
        });
    }

    if (keyboardsGrid) {
        const keyboards = products.filter(p => p.category === 'keyboards');
        keyboards.forEach(product => {
            keyboardsGrid.appendChild(createProductCard(product));
        });
    }

    if (miceGrid) {
        const mice = products.filter(p => p.category === 'mice');
        mice.forEach(product => {
            miceGrid.appendChild(createProductCard(product));
        });
    }

    if (monitorsGrid) {
        const monitors = products.filter(p => p.category === 'monitors');
        monitors.forEach(product => {
            monitorsGrid.appendChild(createProductCard(product));
        });
    }

    if (headphonesGrid) {
        const headphones = products.filter(p => p.category === 'headphones');
        headphones.forEach(product => {
            headphonesGrid.appendChild(createProductCard(product));
        });
    }
}

// Function to handle static product cards (for Categories.html)
function setupStaticProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Skip if card already has event listeners (from dynamic generation)
        if (card.getAttribute('data-listeners-added')) {
            return;
        }
        
        // Get product ID
        const productId = card.dataset.productId;
        if (!productId) {
            console.error('Product card is missing data-product-id attribute:', card);
            return;
        }
        
        // Find the product
        const product = products.find(p => p.id === productId);
        if (!product) {
            // Try to create a product object from card content
            const name = card.querySelector('h3').textContent.trim();
            const description = card.querySelector('.product-description').textContent.trim();
            const priceText = card.querySelector('.product-price').textContent.trim();
            const price = parseFloat(priceText.replace('$', ''));
            const image = card.querySelector('.product-image img').src;
            
            // Use this product object for the modal
            const productObj = {
                id: productId,
                name: name,
                description: description,
                price: price,
                image: image
            };
            
            // We only need to add the click event for opening the modal,
            // the add to cart buttons are handled globally
            card.addEventListener('click', function(e) {
                if (e.target.classList.contains('btn-add-to-cart')) {
                    // Don't do anything here, it's handled by the global event listener
                    return;
                }
                openProductModal(productObj);
            });
            
        } else {
            // Use the existing product object
            card.addEventListener('click', function(e) {
                if (e.target.classList.contains('btn-add-to-cart')) {
                    // Don't do anything here, it's handled by the global event listener
                    return;
                }
                openProductModal(product);
            });
        }
        
        // Mark card as having event listeners
        card.setAttribute('data-listeners-added', 'true');
    });
}

// Function to setup global event handlers
function setupGlobalEventHandlers() {
    // Global handler for all "Add to Cart" buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart')) {
            // Find the parent product card
            const card = e.target.closest('.product-card');
            if (card && card.dataset.productId) {
                // Add to cart when the button is clicked
                addToCart(card.dataset.productId, 1);
                e.stopPropagation(); // Prevent opening the modal
            }
        }
    });
}

// Initial page load
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadProducts();
    setupProductModal();
    setupStaticProductCards(); // Handle static product cards
    setupGlobalEventHandlers(); // Setup global event handlers
});
