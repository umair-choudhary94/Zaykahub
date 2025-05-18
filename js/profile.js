document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.authenticated) {
        alert("Please login to access your profile.");
        window.location.href = "login.html";
        return;
    }
    document.getElementById('display-name').textContent = user.firstName + ' ' + user.lastName;
    document.getElementById('display-email').textContent = 'Email: ' + user.email;
    // Pre-fill form fields
    document.getElementById('edit-name').value = user.firstName + ' ' + user.lastName;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('edit-phone').value = user.phone || '';
    document.getElementById('edit-address').value = user.address || '';

    // Handle Save Changes
    document.getElementById('profile-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const fullName = document.getElementById('edit-name').value.trim();
        const email = document.getElementById('edit-email').value.trim();
        const phone = document.getElementById('edit-phone').value.trim();
        const address = document.getElementById('edit-address').value.trim();
        const newPassword = document.getElementById('edit-password').value;
        const confirmPassword = document.getElementById('edit-confirm-password').value;

        // Validate passwords
        if (newPassword && newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Update user object
        const [firstName, ...lastNameParts] = fullName.split(' ');
        user.firstName = firstName;
        user.lastName = lastNameParts.join(' ') || '';
        user.email = email;
        user.phone = phone;
        user.address = address;
        if (newPassword) user.password = newPassword; // WARNING: plain password in localStorage is not secure

        // Save back to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        alert("Profile updated successfully.");

        // Optionally refresh top display:
        document.getElementById('name-display').textContent = user.firstName + ' ' + user.lastName;
        document.getElementById('email-display').textContent = 'Email: ' + user.email;
    });


    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    if (reservations.length > 0) {
        console.log(reservations);
    const reservationHistoryContainer = document.getElementById('reservation-history');
    reservations.forEach(reservation => {
        const reservationItem = document.createElement('div');
        reservationItem.classList.add('reservation-item');

        const reservationHeader = document.createElement('div');
        reservationHeader.classList.add('reservation-header');

        const reservationDate = document.createElement('span');
        reservationDate.classList.add('reservation-date');
        reservationDate.textContent = reservation.date;

        const reservationTime = document.createElement('span');
        reservationTime.classList.add('reservation-time');
        reservationTime.textContent = reservation.time;

        const reservationStatus = document.createElement('span');
        reservationStatus.classList.add('reservation-status');
        reservationStatus.textContent = 'Completed';
        reservationStatus.style.color = 'green';

        reservationHeader.appendChild(reservationDate);
        reservationHeader.appendChild(reservationTime);
        reservationHeader.appendChild(reservationStatus);

        const reservationDetails = document.createElement('div');
        reservationDetails.classList.add('reservation-details');

        const guestsParagraph = document.createElement('p');
        guestsParagraph.textContent = `Table for ${reservation.guests} people`;

        const specialRequestParagraph = document.createElement('p');
        specialRequestParagraph.textContent = `Special request: ${reservation.specialRequest}`;

        reservationDetails.appendChild(guestsParagraph);
        reservationDetails.appendChild(specialRequestParagraph);

        reservationItem.appendChild(reservationHeader);
        reservationItem.appendChild(reservationDetails);

        reservationHistoryContainer.appendChild(reservationItem);
    });
    }

const orders = JSON.parse(localStorage.getItem('orders')) || [];
if (orders.length > 0) {
    console.log(orders);
    const orderHistoryContainer = document.getElementById('past-orders');
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');

        const orderHeader = document.createElement('div');
        orderHeader.classList.add('order-header');

        const orderDate = document.createElement('span');
        orderDate.classList.add('order-date');
        orderDate.textContent = new Date(order.date).toLocaleDateString();

        const orderTotal = document.createElement('span');
        orderTotal.classList.add('order-total');
        orderTotal.textContent = `Total: $${order.total}`;

        orderHeader.appendChild(orderDate);
        orderHeader.appendChild(orderTotal);

        const orderDetails = document.createElement('div');
        orderDetails.classList.add('order-details');

        order.cart.forEach(item => {
            const itemParagraph = document.createElement('p');
            itemParagraph.textContent = `${item.name} x ${item.quantity}`;
            orderDetails.appendChild(itemParagraph);
        });

        orderItem.appendChild(orderHeader);
        orderItem.appendChild(orderDetails);

        orderHistoryContainer.appendChild(orderItem);
    });
}
});




function showTab(tabId) {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    var tabs = document.getElementsByClassName("profile-tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    
    document.getElementById(tabId).classList.add("active");
    
    var buttons = document.getElementsByClassName("profile-tab");
    for (var j = 0; j < buttons.length; j++) {
        if (buttons[j].getAttribute("onclick").includes(tabId)) {
            buttons[j].classList.add("active");
        }
    }
}

window.onload = function() {
    document.getElementById("past-orders").classList.add("active");
    document.getElementsByClassName("profile-tab")[0].classList.add("active");
    
    var profileForm = document.getElementById("profile-form");
    if (profileForm) {
        profileForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            var password = document.getElementById("password").value;
            var confirmPassword = document.getElementById("confirm-password").value;
            
            if (password && password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            
            alert("Profile updated successfully!");
        });
    }
    
    var cancelButtons = document.getElementsByClassName("cancel-btn");
    for (let k = 0; k < cancelButtons.length; k++) {
        cancelButtons[k].addEventListener("click", function() {
            if (confirm("Are you sure you want to cancel this reservation?")) {
                alert("Reservation cancelled!");
                
                var reservationItem = this.closest(".reservation-item");
                reservationItem.style.opacity = "0.5";
                this.textContent = "Cancelled";
                this.disabled = true;
                this.style.backgroundColor = "#ddd";
                this.style.color = "#666";
            }
        });
    }
}

function logout() {
    var storedUser = localStorage.getItem('user');
    if (storedUser) {
        var user = JSON.parse(storedUser);
        user.authenticated = false;
        localStorage.setItem('user', JSON.stringify(user));
        alert('Logged out successfully!');
        window.location.href = 'login.html';
    }
}

