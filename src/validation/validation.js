

export default function validateEmail(email){
    let errorList;
    if(!email.trim()){
        errorList="Email is required";
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
        errorList="Invalid email address";
    }
    return errorList;
}