document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.getElementById("cart-items-new");
    const subtotalElement = document.querySelector(".subtotal-new");
    const cartCountElement = document.getElementById("cart-count");
    let cartItems = [];

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const itemElement = button.closest(".columnsprice");
            const itemName = itemElement.querySelector(".header").innerText;
            const itemPrice = parseFloat(itemElement.querySelector("h1").innerText.replace(/[^0-9.-]+/g, ""));

            const existingCartItem = cartItems.find(item => item.name === itemName);
            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCartDisplay();
            displayNotification("Item added to cart!");
        });
    });

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cartItems.forEach((item) => {
            const totalItemPrice = item.price * item.quantity;
            subtotal += totalItemPrice;

            const cartItemRow = document.createElement("tr");
            cartItemRow.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${totalItemPrice.toFixed(2)}</td>
            `;

            cartItemsContainer.appendChild(cartItemRow);
        });

        subtotalElement.innerText = `Subtotal: N${subtotal.toFixed(2)}`;
        updateCartCount();
    }

    function updateCartCount() {
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        if (itemCount > 0) {
            cartCountElement.innerText = itemCount;
            cartCountElement.style.display = 'block';
        } else {
            cartCountElement.style.display = 'none';
        }
    }

    function displayNotification(message) {
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.innerText = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});

document.getElementById("open-modal-new").addEventListener("click", function() {
    document.getElementById("cart-modal-new").style.display = "block";
});

document.getElementById("close-modal-new").addEventListener("click", function() {
    document.getElementById("cart-modal-new").style.display = "none";
});

function continueShoppingNew() {
    document.getElementById("cart-modal-new").style.display = "none";
}
