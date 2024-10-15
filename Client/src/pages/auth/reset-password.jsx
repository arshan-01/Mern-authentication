import React, { useState } from 'react';
import { ReseUsertPassword } from './auth-fields';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { UserResetPassword } from '../../schema/user.schema';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing React Icons
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/features/auth/auth.service';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const [passwordGuidelines, setPasswordGuidelines] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    }); // State for toggling password visibility

    const validatePassword = (password) => {
        setPasswordGuidelines({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*]/.test(password),
        });
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: UserResetPassword,
        onSubmit: (values) => {
            dispatch (resetPassword({
                ...values,
                resetToken: token,
            }))
            .then(() => {
                formik.resetForm();
                navigate('/enter');
            });
        },
    });

    return (
        <div className="antialiased bg-slate-200 min-h-screen flex items-center justify-center">
            <div className="w-140 max-w-lg mx-auto my-5 bg-white p-6 rounded-xl shadow shadow-slate-300">
                <div className="heading_s1 text-center">
                    <h1 className="mb-4 font-weight-900 text-2xl text-primary">
                        {ReseUsertPassword.title}
                    </h1>
                </div>
                <div className="heading_s1 text-center text-md text-gray-5">
                    <p className="mb-4">
                        {ReseUsertPassword.description}
                    </p>
                </div>

                <form className="my-6" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        {ReseUsertPassword.fields.map((field, index) => (
                            <div key={index}>
                                <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            field.name === 'password'
                                                ? showPassword.password
                                                    ? 'text'
                                                    : 'password'
                                                : showPassword.confirmPassword
                                                    ? 'text'
                                                    : 'password'
                                        }
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            if (field.name === 'password') {
                                                validatePassword(e.target.value);
                                            }
                                        }}
                                        value={formik.values[field.name]}
                                        onBlur={formik.handleBlur}
                                        className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                    {/* Toggle Password Visibility Icon */}
                                    {(field.name === 'password' || field.name === 'confirmPassword') && (
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                                            onClick={() => {
                                                if (field.name === 'password') {
                                                    setShowPassword((prev) => ({ ...prev, password: !prev.password }));
                                                } else {
                                                    setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }));
                                                }
                                            }}
                                        >
                                            {field.name === 'password' ? (
                                                showPassword.password ? <FaEyeSlash /> : <FaEye />
                                            ) : (
                                                showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />
                                            )}
                                        </button>
                                    )}
                                </div>
                                {formik.touched[field.name] && field.name === 'password' && formik.values.password === '' && (
                                    <div className="text-[10px] xl:text-xs 2xl:text-sm text-red-500 mt-1">
                                        Password is required
                                    </div>
                                )}
                                {formik.touched[field.name] && formik.errors[field.name] && field.name !== 'password' && (
                                    <div className="text-[10px] xl:text-xs 2xl:text-sm text-red-500 mt-1">
                                        {formik.errors[field.name]}
                                    </div>
                                )}
                                {field.name === 'password' && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        <p className={`flex items-center ${passwordGuidelines.length ? 'text-green-600' : ''}`}>
                                            {passwordGuidelines.length && <span className="mr-1 text-green-600">✔</span>}
                                            At least 8 characters long
                                        </p>
                                        <p className={`flex items-center ${passwordGuidelines.uppercase ? 'text-green-600' : ''}`}>
                                            {passwordGuidelines.uppercase && <span className="mr-1 text-green-600">✔</span>}
                                            At least one uppercase letter
                                        </p>
                                        <p className={`flex items-center ${passwordGuidelines.lowercase ? 'text-green-600' : ''}`}>
                                            {passwordGuidelines.lowercase && <span className="mr-1 text-green-600">✔</span>}
                                            At least one lowercase letter
                                        </p>
                                        <p className={`flex items-center ${passwordGuidelines.number ? 'text-green-600' : ''}`}>
                                            {passwordGuidelines.number && <span className="mr-1 text-green-600">✔</span>}
                                            At least one number
                                        </p>
                                        <p className={`flex items-center ${passwordGuidelines.specialChar ? 'text-green-600' : ''}`}>
                                            {passwordGuidelines.specialChar && <span className="mr-1 text-green-600">✔</span>}
                                            At least one special character
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button type='submit' className="w-full py-2 font-medium text-white bg-primary hover:bg-primary-light rounded-lg border-primary hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>{ReseUsertPassword.buttonLabel}</span>
                        </button>
                        <p className="text-center">
                            {ReseUsertPassword.footer}{' '}
                            <Link to={ReseUsertPassword.footerLink} className="text-primary hover:text-primary-light font-medium inline-flex space-x-1 items-center">
                                <span>{ReseUsertPassword.footerText}</span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 hover:text-primary-light"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
