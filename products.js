const products = [
    // Keyboards
    {
        id: 'k1',
        name: 'Mechanical Keyboard',
        description: 'RGB Backlit Mechanical Gaming Keyboard with Blue Switches',
        price: 89.99,
        image: 'images/k1.jpg',
        category: 'keyboards',
        featured: true
    },
    {
        id: 'k2',
        name: 'Wireless Mechanical Keyboard',
        description: 'Low-latency Wireless Mechanical Keyboard with Brown Switches',
        price: 129.99,
        image: 'images/k2.jpg',
        category: 'keyboards'
    },
    {
        id: 'k3',
        name: 'Compact 60% Keyboard',
        description: 'Compact 60% Layout Mechanical Keyboard with PBT Keycaps',
        price: 79.99,
        image: 'images/k3.jpg',
        category: 'keyboards'
    },
    {
        id: 'k4',
        name: 'Premium Mechanical Keyboard',
        description: 'Premium Aluminum Frame Keyboard with Hot-swappable Switches',
        price: 149.99,
        image: 'images/k4.jpg',
        category: 'keyboards'
    },
    {
        id: 'k5',
        name: 'Silent Mechanical Keyboard',
        description: 'Ultra-quiet Mechanical Keyboard for Office and Gaming',
        price: 99.99,
        image: 'images/k5.jpg',
        category: 'keyboards'
    },
    // Mice
    {
        id: 'm1',
        name: 'Cyberpunk Edition Mouse',
        description: 'Exclusive Cyberpunk RGB Wireless Gaming Mouse – Only while stocks last!',
        price: 129.99,
        image: 'images/m1-cyberpunk.jpg',
        category: 'mice',
        featured: true,
        limited: true
    },
    {
        id: 'm2',
        name: 'Wireless Gaming Mouse',
        description: 'Ultra-lightweight Wireless Gaming Mouse with 20,000 DPI Sensor',
        price: 69.99,
        image: 'images/m2.jpg',
        category: 'mice'
    },
    {
        id: 'm3',
        name: 'Ergonomic Mouse',
        description: 'Vertical Ergonomic Mouse for Reduced Wrist Strain',
        price: 49.99,
        image: 'images/m3.jpg',
        category: 'mice'
    },
    {
        id: 'm4',
        name: 'MMO Gaming Mouse',
        description: 'MMO Gaming Mouse with 12 Programmable Side Buttons',
        price: 79.99,
        image: 'images/m4.jpg',
        category: 'mice'
    },
    {
        id: 'm5',
        name: 'Premium Gaming Mouse',
        description: 'Ultralight Gaming Mouse with PTFE Feet and Paracord Cable',
        price: 89.99,
        image: 'images/m5.jpg',
        category: 'mice'
    },
    {
        id: 'm6',
        name: 'Classic Mouse',
        description: 'Reliable Wired Mouse for Everyday Use',
        price: 29.99,
        image: 'images/m6.jpg',
        category: 'mice'
    },
    // Monitors
    {
        id: 'mn1',
        name: 'Gaming Monitor',
        description: '27-inch 144Hz Gaming Monitor with 1ms Response Time',
        price: 299.99,
        image: 'images/mn1.jpg',
        category: 'monitors',
        featured: true
    },
    {
        id: 'mn2',
        name: 'Ultrawide Monitor',
        description: '34-inch Curved Ultrawide Monitor with 21:9 Aspect Ratio',
        price: 449.99,
        image: 'images/mn2.jpg',
        category: 'monitors'
    },
    {
        id: 'mn3',
        name: '4K Professional Monitor',
        description: '32-inch 4K Professional Monitor with 99% Adobe RGB Coverage',
        price: 599.99,
        image: 'images/mn3.jpg',
        category: 'monitors'
    },
    {
        id: 'mn4',
        name: '240Hz Esports Monitor',
        description: '24.5-inch 1080p 240Hz TN Monitor for Competitive Gaming',
        price: 349.99,
        image: 'images/mn4.jpg',
        category: 'monitors'
    },
    {
        id: 'mn5',
        name: 'Budget Gaming Monitor',
        description: '24-inch 1080p 75Hz Monitor with FreeSync Technology',
        price: 179.99,
        image: 'images/mn5.jpg',
        category: 'monitors'
    },
    // Headphones
    {
        id: 'h1',
        name: 'Wireless Gaming Headset',
        description: 'Low-latency Wireless Gaming Headset with 7.1 Surround Sound',
        price: 129.99,
        image: 'images/h1.jpg',
        category: 'headphones',
        featured: true
    },
    {
        id: 'h2',
        name: 'Studio Headphones',
        description: 'Professional Studio Monitoring Headphones with Flat Response',
        price: 149.99,
        image: 'images/h2.jpg',
        category: 'headphones'
    },
    {
        id: 'h3',
        name: 'Noise Cancelling Headphones',
        description: 'Wireless Noise Cancelling Headphones with 30-hour Battery Life',
        price: 199.99,
        image: 'images/h3.jpg',
        category: 'headphones'
    },
    {
        id: 'h4',
        name: 'Budget Gaming Headset',
        description: 'Affordable Gaming Headset with RGB Lighting and Microphone',
        price: 49.99,
        image: 'images/h4.jpg',
        category: 'headphones'
    }
];
