document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }
    if (password === confirmPassword) {
        var user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
            phone: "",
            address: "",
            authenticated: false,
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('Registration successful!');
    } else {
        alert('Passwords do not match!');
    }
});

