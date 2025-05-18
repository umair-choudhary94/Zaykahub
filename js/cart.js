document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartFooter = document.querySelector(".cart-footer");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
        cartFooter.style.display = "none";
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price} each</p>
                    <p>Quantity ${item.quantity}</p>
                </div>
             
                <div class="cart-item-total">
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    cartFooter.innerHTML = `
        <h3>Subtotal:</h3><p>$${subtotal.toFixed(2)}</p>
        <h3>Tax (10%):</h3><p>$${tax.toFixed(2)}</p>
        <h3>Total:</h3><p>$${total.toFixed(2)}</p>
        <a href="checkout.html" class="btn">Checkout</a>
    `;
});
