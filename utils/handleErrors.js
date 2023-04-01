const handleErrors = (err) => {
    // err messages and err codes - 11000
    let errors = { email: "", password: "", name: " ",}
    if (err.code === 11000){
        errors.email = 'Email already in use'
        return errors;
    }

    if (errors.message === 'Incorrect Email') {
        errors.email = 'This email is not yet registered';
        return errors;
    }
    if (errors.message === 'Incorrect Password') {
        errors.email = 'Invalid email or Password';
        errors.password = 'Invalid email or Password';
        return errors;
    }
    
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

module.exports = handleErrors;