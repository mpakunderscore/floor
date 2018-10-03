function password() {


    if (document.getElementById('password').value === 'geekpower') {
        localStorage.setItem('password', 'geekpower');
        window.location.replace("/");
    }

    document.getElementById('password').value = '';
}