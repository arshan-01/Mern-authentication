// auth-fields.js
export const login = {
    title: "Welcome Back 👋",
    description: "Please input your log in details to gain access", 
    fields: [
        {
        label: "Email",
        placeholder: "Email",
        type: "text",
        name: "email",
        },
        {
        label: "Password",
        placeholder: "Password",
        type: "password",
        name: "password",
        },
    ],
    buttonLabel: "Log in",
    forgotPassword: "Forgot password?",
    forgotPasswordLink: "/enter/forgot-password",
    footer: "Don't have an account?",
    footerText : "Register",
    footerLink: "/enter/new-user",
    };

    export const register = {
    title: "Create an account 🚀",
    description: "Please input your details to create an account",
    fields: [
        {
        label: "Full Name",
        placeholder: "Full Name",
        type: "text",
        name: "fullName",
        },
        {
        label: "Username",
        placeholder: "Username",
        type: "text",
        name: "username",
        },
        {
        label: "Email",
        placeholder: "Email",
        type: "email",
        name: "email",
        },
        {
        label: "Password",
        placeholder: "Password",
        type: "password",
        name: "password",
        },
        {
        label: "Confirm Password",
        placeholder: "Confirm password",
        type: "password",
        name: "confirmPassword",
        },
    ],
    buttonLabel: "Register",
    footer: "Already have an account?",
    footerText : "Log in",
    footerLink: "/enter",
    };

    export const forgetPassword = {
    title: "🔒 Forgot Your Password? ",
    description: "Enter the email address associated with your account, and we'll send you a link to reset your password.",
    fields: [
        {
        label: "Email",
        placeholder: "Email",
        type: "email",
        name: "email",
        },
    ],
    buttonLabel: "Send Reset Link",
    footer: "Back to login",
    footerLink: "/enter",
    };

    export const ReseUsertPassword = {
    title: " 🔓 Reset Your Password",
    description: "Please enter your new password",
    fields: [
        {
        label: "Password",
        placeholder: "Password",
        type: "password",
        name: "password",
        },
        {
        label: "Confirm Password",
        placeholder: "Confirm password",
        type: "password",
        name: "confirmPassword",
        },
    ],
    buttonLabel: "Reset Password",
    footer: "Back to login",
    footerLink: "/enter",
    };