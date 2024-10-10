import { PersonOutlineSharp } from "@mui/icons-material";

interface SignUpForm {
    firstName: string;
    lastName: string;
    pronouns: string;
    email: string;
    password: string;
    confirmPassword: string;
    }

export const validateSignUp = (values: SignUpForm) => {

    const errors: Partial<SignUpForm> = {};

    const { firstName, lastName, pronouns, email, password, confirmPassword } = values;

    if (!firstName) {
        errors.firstName = "First name is required";
    }
    
    if (!lastName) {
        errors.lastName = "Last name is required";
    }

    if (!pronouns) {
        errors.pronouns = "Pronouns is required";
    }

    if (!email) {
        errors.email = "Email is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    } else if (password.length > 30) {
        errors.password = "Password must be less than 30 characters";
    } else if (password.search(/[a-z]/i) < 0) {
        errors.password = "Password must contain at least one letter";
    } else if (password.search(/[0-9]/) < 0) {
        errors.password = "Password must contain at least one digit";
    } else if (password.search(/[!@#$%^&*]/) < 0) {
        errors.password = "Password must contain at least one special character";
    }

    if (confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match";
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = "Invalid email address";
    }

    return errors;
}