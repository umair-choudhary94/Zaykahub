function convertTo12Hour(time24) {
    const [hour, minute] = time24.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}


document.getElementById("reservation-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time24 = document.getElementById("time").value;
    const time = convertTo12Hour(time24);
    const guests = document.getElementById("guests").value;
    const specialRequest = document.getElementById("special-request").value;
    alert(`Reservation submitted successfully!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nNumber of Guests: ${guests}\nSpecial Request: ${specialRequest} \n Thanks`);
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const newReservation = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time,
        guests: guests,
        specialRequest: specialRequest
    };
    reservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
});

