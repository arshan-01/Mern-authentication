import React, { useState } from 'react';
import { login } from './auth-fields';
import { Link } from 'react-router-dom';
import { UserLogin } from '../../schema/user.schema';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing React Icons
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/features/auth/auth.service';

const Login = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: UserLogin,
        onSubmit: (values) => {
            dispatch(loginUser(values));
        },
    });

    return (
        <div className="antialiased bg-slate-200 min-h-screen flex items-center justify-center">
            <div className="w-140 max-w-lg mx-auto my-6 bg-white p-6 rounded-xl shadow shadow-slate-300"> {/* Reduced margin and padding */}
                <div className="heading_s1 text-center">
                    <h1 className="mb-4 font-weight-900 text-xl text-primary"> {/* Reduced font size and margin */}
                        {login.title}
                    </h1>
                </div>
                <div className="heading_s1 text-center text-sm text-gray-5">
                    <p className="mb-4"> {/* Reduced subtitle size and margin */}
                        {login.description}
                    </p>
                </div>

                <form className="my-6" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col space-y-4"> {/* Reduced vertical spacing */}
                        {login.fields.map((field, index) => (
                            <div key={index}>
                                <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    <input
                                        type={field.name === 'password' ? (showPassword.password ? 'text' : 'password') : field.type}
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        onChange={formik.handleChange}
                                        value={formik.values[field.name]}
                                        onBlur={formik.handleBlur}
                                        className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
                                    />
                                    {field.name === 'password' && (
                                        <span
                                            className="absolute right-3 top-3 cursor-pointer"
                                            onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                                        >
                                            {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    )}
                                </div>
                                {formik.touched[field.name] && formik.errors[field.name] && (
                                    <div className="text-[10px] xl:text-xs 2xl:text-sm text-red-500 mt-1">
                                        {formik.errors[field.name]}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="flex flex-row justify-between items-center">
                            <div className="flex pt-5">
                                <label htmlFor="remember" className="flex">
                                    <input type="checkbox" id="remember" className="pt-3 border-slate-200 focus:bg-primary" />
                                    <span className="ml-2">Remember me</span>
                                </label>
                            </div>
                            <div>
                                <Link to={login.forgotPasswordLink} className="custom-link font-medium">
                                    {login.forgotPassword}
                                </Link>
                            </div>
                        </div>


                        <button type='submit' className="w-full py-2 font-medium text-white bg-primary hover:bg-primary-light rounded-lg border-primary hover:shadow inline-flex space-x-2 items-center justify-center"> {/* Reduced padding */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>{login.buttonLabel}</span>
                        </button>

                        <p className="text-center text-sm"> {/* Reduced text size */}
                            {login.footer}{' '}
                            <Link to={login.footerLink} className="custom-link font-medium inline-flex space-x-1 items-center">
                                <span>{login.footerText}</span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 custom-link"
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

export default Login;
