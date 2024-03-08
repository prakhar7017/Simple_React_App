function checkPassword(password, len) {
    // Check if the password length is greater than len
    if (password.length <= len) {
        return false;
    }

    // Check if the password contains at least one uppercase character
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Check if the password contains at least one special character
    if (!/[^A-Za-z0-9]/.test(password)) {
        return false;
    }

    // If all conditions are met, return true
    return true;
}
export default checkPassword;