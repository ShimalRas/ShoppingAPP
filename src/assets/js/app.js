// Combined application logic (previously main.js, cart.js, products.js)
// -------------------------------- Products Data --------------------------------
const products = [
    { id: 'k1', name: 'Mechanical Keyboard', description: 'RGB Backlit Mechanical Gaming Keyboard with Blue Switches', price: 89.99, image: '../assets/images/k1.jpg', category: 'keyboards', featured: true },
    { id: 'k2', name: 'Wireless Mechanical Keyboard', description: 'Low-latency Wireless Mechanical Keyboard with Brown Switches', price: 129.99, image: '../assets/images/k2.jpg', category: 'keyboards' },
    { id: 'k3', name: 'Compact 60% Keyboard', description: 'Compact 60% Layout Mechanical Keyboard with PBT Keycaps', price: 79.99, image: '../assets/images/k3.jpg', category: 'keyboards' },
    { id: 'k4', name: 'Premium Mechanical Keyboard', description: 'Premium Aluminum Frame Keyboard with Hot-swappable Switches', price: 149.99, image: '../assets/images/k4.jpg', category: 'keyboards' },
    { id: 'k5', name: 'Silent Mechanical Keyboard', description: 'Ultra-quiet Mechanical Keyboard for Office and Gaming', price: 99.99, image: '../assets/images/k5.jpg', category: 'keyboards' },
    { id: 'm1', name: 'Cyberpunk Edition Mouse', description: 'Exclusive Cyberpunk RGB Wireless Gaming Mouse – Only while stocks last!', price: 129.99, image: '../assets/images/m1-cyberpunk.jpg', category: 'mice', featured: true, limited: true },
    { id: 'm2', name: 'Wireless Gaming Mouse', description: 'Ultra-lightweight Wireless Gaming Mouse with 20,000 DPI Sensor', price: 69.99, image: '../assets/images/m2.jpg', category: 'mice' },
    { id: 'm3', name: 'Ergonomic Mouse', description: 'Vertical Ergonomic Mouse for Reduced Wrist Strain', price: 49.99, image: '../assets/images/m3.jpg', category: 'mice' },
    { id: 'm4', name: 'MMO Gaming Mouse', description: 'MMO Gaming Mouse with 12 Programmable Side Buttons', price: 79.99, image: '../assets/images/m4.jpg', category: 'mice' },
    { id: 'm5', name: 'Premium Gaming Mouse', description: 'Ultralight Gaming Mouse with PTFE Feet and Paracord Cable', price: 89.99, image: '../assets/images/m5.jpg', category: 'mice' },
    { id: 'm6', name: 'Classic Mouse', description: 'Reliable Wired Mouse for Everyday Use', price: 29.99, image: '../assets/images/m6.jpg', category: 'mice' },
    { id: 'mn1', name: 'Gaming Monitor', description: '27-inch 144Hz Gaming Monitor with 1ms Response Time', price: 299.99, image: '../assets/images/mn1.jpg', category: 'monitors', featured: true },
    { id: 'mn2', name: 'Ultrawide Monitor', description: '34-inch Curved Ultrawide Monitor with 21:9 Aspect Ratio', price: 449.99, image: '../assets/images/mn2.jpg', category: 'monitors' },
    { id: 'mn3', name: '4K Professional Monitor', description: '32-inch 4K Professional Monitor with 99% Adobe RGB Coverage', price: 599.99, image: '../assets/images/mn3.jpg', category: 'monitors' },
    { id: 'mn4', name: '240Hz Esports Monitor', description: '24.5-inch 1080p 240Hz TN Monitor for Competitive Gaming', price: 349.99, image: '../assets/images/mn4.jpg', category: 'monitors' },
    { id: 'mn5', name: 'Budget Gaming Monitor', description: '24-inch 1080p 75Hz Monitor with FreeSync Technology', price: 179.99, image: '../assets/images/mn5.jpg', category: 'monitors' },
    { id: 'h1', name: 'Wireless Gaming Headset', description: 'Low-latency Wireless Gaming Headset with 7.1 Surround Sound', price: 129.99, image: '../assets/images/h1.jpg', category: 'headphones', featured: true },
    { id: 'h2', name: 'Studio Headphones', description: 'Professional Studio Monitoring Headphones with Flat Response', price: 149.99, image: '../assets/images/h2.jpg', category: 'headphones' },
    { id: 'h3', name: 'Noise Cancelling Headphones', description: 'Wireless Noise Cancelling Headphones with 30-hour Battery Life', price: 199.99, image: '../assets/images/h3.jpg', category: 'headphones' },
    { id: 'h4', name: 'Budget Gaming Headset', description: 'Affordable Gaming Headset with RGB Lighting and Microphone', price: 49.99, image: '../assets/images/h4.jpg', category: 'headphones' }
];

// ----------------------------- Components Loader -----------------------------
function loadComponents() {
    // Load header
    fetch('../components/header.html')
        .then(r => r.text())
        .then(html => {
            const placeholder = document.getElementById('header-placeholder');
            if (!placeholder) return;
            placeholder.innerHTML = html;
            // Active link highlight
            const current = window.location.pathname.split('/').pop();
            document.querySelectorAll('nav ul li a').forEach(a => {
                const href = a.getAttribute('href');
                const hrefPage = href ? href.split('/').pop() : '';
                a.classList.toggle('active', hrefPage === current);
            });
            updateCartIcon();
        });
        
    // Load footer
    fetch('../components/footer.html')
        .then(r => r.text())
        .then(html => {
            const placeholder = document.getElementById('footer-placeholder');
            if (!placeholder) return;
            placeholder.innerHTML = html;
        });

    // Load product modal
    fetch('../components/product-modal.html')
        .then(r => r.text())
        .then(html => {
            const placeholder = document.getElementById('product-modal-placeholder');
            if (!placeholder) return;
            placeholder.innerHTML = html;
            setupProductModal();
        });
}

// ----------------------------- Modal Logic -----------------------------
function setupProductModal() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    const modalClose = modal.querySelector('.modal-close');
    modalClose?.addEventListener('click', () => { closeModal(); });
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    // Tabs
    const tabHeader = modal.querySelectorAll('.tab-header div');
    const tabContent = modal.querySelectorAll('.tab-body');
    tabHeader.forEach((tab, i) => tab.addEventListener('click', () => {
        tabHeader.forEach(t => t.classList.remove('active'));
        tabContent.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabContent[i].classList.add('active');
    }));

    // Quantity
    const plus = modal.querySelector('.quantity-btn.plus');
    const minus = modal.querySelector('.quantity-btn.minus');
    const input = modal.querySelector('.quantity-input');
    plus?.addEventListener('click', () => { if (input.value < input.max) input.value = Number(input.value) + 1; });
    minus?.addEventListener('click', () => { if (input.value > input.min) input.value = Number(input.value) - 1; });

    modal.querySelector('.modal-add-to-cart')?.addEventListener('click', () => {
        const pid = modal.querySelector('.modal-product')?.dataset.productId;
        const qty = Number(input.value) || 1;
        if (pid) addToCart(pid, qty);
        closeModal();
    });
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    const wrap = modal.querySelector('.modal-product');
    wrap.dataset.productId = product.id;
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-price').textContent = `$${product.price.toFixed(2)}`;
    const qty = modal.querySelector('.quantity-input');
    if (qty) qty.value = 1;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ----------------------------- Product Cards -----------------------------
function createProductCard(p) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = p.id;
    if (p.limited) { card.classList.add('limited-edition'); }
    card.innerHTML = `
        <div class="product-image"><img src="${p.image}" alt="${p.name}"></div>
        <div class="product-info">
            <h3>${p.name} ${p.limited ? '<span class="limited-edition-label">(Limited Edition)</span>' : ''}</h3>
            <p class="product-description">${p.description}</p>
            <p class="product-price">$${p.price.toFixed(2)}</p>
            <button class="btn-add-to-cart">Add to Cart</button>
        </div>`;
    card.addEventListener('click', e => { if (!e.target.classList.contains('btn-add-to-cart')) openProductModal(p); });
    return card;
}

function loadProducts() {
    const map = {
        featured: '.featured-products .product-grid',
        keyboards: '#keyboards .product-grid',
        mice: '#mice .product-grid',
        monitors: '#monitors .product-grid',
        headphones: '#headphones .product-grid'
    };
    if (document.querySelector(map.featured)) products.filter(p => p.featured).forEach(p => document.querySelector(map.featured).appendChild(createProductCard(p)));
    ['keyboards','mice','monitors','headphones'].forEach(cat => {
        const el = document.querySelector(map[cat]);
        if (el) products.filter(p => p.category === cat).forEach(p => el.appendChild(createProductCard(p)));
    });
}

function setupStaticProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        if (card.getAttribute('data-listeners-added')) return;
        const id = card.dataset.productId;
        if (!id) return;
        const product = products.find(p => p.id === id);
        const data = product || (() => {
            const name = card.querySelector('h3')?.textContent.trim();
            const desc = card.querySelector('.product-description')?.textContent.trim();
            const price = parseFloat(card.querySelector('.product-price')?.textContent.replace('$','') || '0');
            const image = card.querySelector('.product-image img')?.src;
            return { id, name, description: desc, price, image };
        })();
        card.addEventListener('click', e => { if (!e.target.classList.contains('btn-add-to-cart')) openProductModal(data); });
        card.setAttribute('data-listeners-added', 'true');
    });
}

// ----------------------------- Cart Logic -----------------------------
function getCart() { return JSON.parse(localStorage.getItem('cart')) || []; }
function saveCart(c) { localStorage.setItem('cart', JSON.stringify(c)); updateCartIcon(); }
function addToCart(id, qty=1) {
    const c = getCart();
    const p = products.find(p => p.id === id);
    if (!p) return console.error('Product not found');
    const existing = c.find(i => i.id === id);
    existing ? existing.quantity += qty : c.push({ id, name: p.name, price: p.price, image: p.image, quantity: qty });
    saveCart(c); showNotification(`${p.name} added to cart.`);
}
function updateCartIcon() {
    const count = getCart().reduce((s,i)=>s+i.quantity,0);
    const link = document.querySelector('.cart a');
    if (link) link.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${count})`;
}
function showNotification(msg) {
    let container = document.getElementById('notification-container');
    if (!container) { container = document.createElement('div'); container.id='notification-container'; document.body.appendChild(container);}    
    const note = document.createElement('div');
    note.className='notification';
    note.innerHTML=`<i class="fas fa-check-circle"></i><p>${msg}</p>`;
    container.appendChild(note);
    setTimeout(()=>{ note.classList.add('fade-out'); setTimeout(()=> note.remove(),500); },3000);
}

// Cart page specific
function renderCartPage() {
    if (!document.body.classList.contains('cart-page')) return;
    const cart = getCart();
    const list = document.querySelector('.cart-items-list');
    const empty = document.querySelector('.empty-cart-message');
    const layout = document.querySelector('.cart-layout');
    if (!list) return;
    if (cart.length === 0) { 
        if (empty) empty.classList.add('active'); 
        if (layout) layout.style.display='none'; 
        return; 
    }
    if (empty) empty.classList.remove('active'); 
    if (layout) layout.style.display='grid';
    list.innerHTML='';
    cart.forEach(item => {
        const el = document.createElement('div');
        el.className='cart-item';
        el.innerHTML=`<div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="cart-item-details"><h3>${item.name}</h3><p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <div class="quantity-selector"><button class="quantity-btn minus" data-id="${item.id}">-</button>
            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
            <button class="quantity-btn plus" data-id="${item.id}">+</button></div></div>
            <div class="cart-item-total"><p>$${(item.price*item.quantity).toFixed(2)}</p><button class="remove-item-btn" data-id="${item.id}">&times;</button></div>`;
        list.appendChild(el);
    });
    updateCartSummary(cart);
    addCartEventListeners();
}
function updateCartSummary(cart) {
    const subtotal = cart.reduce((s,i)=>s+i.price*i.quantity,0);
    const tax = subtotal*0.07; const total=subtotal+tax;
    const set=(id,val)=>{ const el=document.getElementById(id); if (el) el.textContent=val; };
    set('summary-subtotal', `$${subtotal.toFixed(2)}`);
    set('summary-tax', `$${tax.toFixed(2)}`);
    set('summary-total', `$${total.toFixed(2)}`);
}
function addCartEventListeners() {
    const list=document.querySelector('.cart-items-list'); if(!list) return;
    list.onclick=e=>{ const id=e.target.dataset.id; if(e.target.classList.contains('remove-item-btn')) removeFromCart(id); if(e.target.classList.contains('plus')) updateQuantity(id,1); if(e.target.classList.contains('minus')) updateQuantity(id,-1); };
    list.onchange=e=>{ const id=e.target.dataset.id; if(e.target.classList.contains('quantity-input')) { const q=parseInt(e.target.value); if(q>0) updateQuantity(id,q,true); else removeFromCart(id);} };
}
function removeFromCart(id){ let c=getCart().filter(i=>i.id!==id); saveCart(c); renderCartPage(); }
function updateQuantity(id,change,absolute=false){ const c=getCart(); const item=c.find(i=>i.id===id); if(!item)return; absolute? item.quantity=change: item.quantity+=change; if(item.quantity<=0) return removeFromCart(id); saveCart(c); renderCartPage(); }

// ----------------------------- Global Events -----------------------------
function setupGlobalEventHandlers() {
    document.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const card = e.target.closest('.product-card');
            if (card?.dataset.productId) { addToCart(card.dataset.productId,1); e.stopPropagation(); }
        }
        if (e.target.classList.contains('continue-shopping')) { window.location.href = 'index.html'; }
    });
}

// ----------------------------- Init -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    loadProducts();
    setupStaticProductCards();
    setupGlobalEventHandlers();
    renderCartPage();
});
