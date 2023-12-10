function Validation(values){
    let error = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if(values.email === ""){
        error.email = "Email cannot be empty!"
    }
    else if(!emailPattern.test(values.email)){
        error.email = "Email didn't match"
    }
    else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password cannot be Empty!"
    }
    else if(!passwordPattern.test(values.password)){
        error.password = "Password didn't match"
    }
    else{
        error.password = ""
    }
    return error;
}

export default Validation;