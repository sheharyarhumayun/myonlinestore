// Add item to cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(item => item.name === name);

    if (item) {
        item.quantity = (item.quantity || 1) + 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// Increase quantity
function increaseQuantity(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.name === name);

    if (item) {
        item.quantity = (item.quantity || 1) + 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// Decrease quantity
function decreaseQuantity(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.name === name);

    if (item && item.quantity > 1) {
        item.quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// Remove item completely
function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== name);

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// Display cart items (used on cart.html)
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach(item => {
        let quantity = item.quantity || 1;
        let itemTotal = item.price * quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>
                    Quantity:
                    <button onclick="decreaseQuantity('${item.name}')">−</button>
                    ${quantity}
                    <button onclick="increaseQuantity('${item.name}')">+</button>
                </p>
                <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;

        total += itemTotal;
    });

    totalElement.textContent = "Total: $" + total.toFixed(2);
}

// Checkout → go to payment page
function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "payment.html";
}

// Pay Now (used on payment.html)
function payNow() {
    let name = document.getElementById("cardName").value.trim();
    let number = document.getElementById("cardNumber").value.trim();
    let expiry = document.getElementById("expiry").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    if (!name || !number || !expiry || !cvv) {
        alert("Please fill in all fields.");
        return;
    }

    if (number.length !== 16 || isNaN(number)) {
        alert("Card number must be 16 digits.");
        return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        alert("CVV must be 3 digits.");
        return;
    }

    alert("Payment successful! 🎉 Thank you, " + name + "!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}
function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("open");
}
function searchProducts() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let name = product.getAttribute("data-name").toLowerCase();
        if (name.includes(query)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}