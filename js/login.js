document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var storedUser = localStorage.getItem('user');
    if (storedUser) {
        var user = JSON.parse(storedUser);
        if (username === user.username && password === user.password) {
            user.authenticated = true;
            localStorage.setItem('user', JSON.stringify(user));
            alert('Login successful!');
             window.location.href = 'profile.html';
        } else {
            alert('Invalid username or password!');
        }
    } else {
        alert('No user registered!');
    }
});

