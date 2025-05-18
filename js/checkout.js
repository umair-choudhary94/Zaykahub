document.getElementById("payment").addEventListener("change", function () {
    const method = this.value;
    document.getElementById("card-info").style.display = method === "card" ? "block" : "none";
   
  });
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let subtotal = 0;
  cart.forEach(item => {
      subtotal += item.price * item.quantity;
  });
  
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  document.getElementById("order-summary").innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-line"><span>Subtotal:</span> <span>$${subtotal.toFixed(2)}</span></div>
    <div class="summary-line"><span>Tax (10%):</span> <span>$${tax.toFixed(2)}</span></div>
    <div class="summary-line total"><span>Total:</span> <span>$${total.toFixed(2)}</span></div>
  `;
  

  
  document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zip").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const payment = document.getElementById("payment").value;
  
    // Optional: Validate payment fields if card/upi selected
    if (payment === "card") {
      const cardNumber = document.getElementById("cardNumber").value;
      const expiry = document.getElementById("expiry").value;
      const cvv = document.getElementById("cvv").value;
      if (!cardNumber || !expiry || !cvv) {
        alert("Please fill in all card details.");
        return;
      }
    }
  
    const orderId = new Date().getTime(); // Generate a unique order ID based on timestamp
    const orderDate = new Date().toISOString(); // Get the current date and time
    const orderInfo = {
      id: orderId,
      date: orderDate,
      total: total.toFixed(2),
      cart: cart
    };

    // Retrieve existing orders from local storage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add the new order to the existing orders
    existingOrders.push(orderInfo);

    // Store the updated orders in local storage
    localStorage.setItem("orders", JSON.stringify(existingOrders));
  
    alert("Order placed successfully! Thank you for choosing ZaykaHub.");
    localStorage.removeItem("cart"); // Clear the cart
    window.location.href = "index.html"; // Redirect to homepage
  });
  