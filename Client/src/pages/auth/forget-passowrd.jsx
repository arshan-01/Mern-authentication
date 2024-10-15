import React from 'react';
import { forgetPassword } from './auth-fields';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { UserForgotPassword } from '../../schema/user.schema';
import { useDispatch } from 'react-redux';
import { resetPasswordLink } from '../../redux/features/auth/auth.service';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: UserForgotPassword,
        onSubmit: (values) => {
            dispatch(resetPasswordLink(values));
        },
    });
    return (
        <div className="antialiased bg-slate-200 min-h-screen flex items-center justify-center">
            <div className="w-140 max-w-lg mx-auto my-5 bg-white p-6 rounded-xl shadow shadow-slate-300"> {/* Reduced padding and margin */}
                <div className="heading_s1 text-center">
                    <h1 className="mb-4 font-weight-900 text-2xl text-primary"> {/* Reduced margin */}
                        {forgetPassword.title}
                    </h1>
                </div>
                <div className="heading_s1 text-center text-md text-gray-5">
                    <p className="mb-20"> {/* Reduced margin */}
                        {forgetPassword.description}
                    </p>
                </div>

                <form className="my-6" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col space-y-4"> {/* Reduced spacing */}
                        {forgetPassword.fields.map((field, index) => (
                            <div key={index}>
                                <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={formik.handleChange}
                                    value={formik.values[field.name]}
                                    onBlur={formik.handleBlur}
                                    className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"  // Reduced padding
                                />
                                {formik.touched[field.name] && formik.errors[field.name] && field.name !== 'password' && (
                                    <div className="text-[10px] xl:text-xs 2xl:text-sm text-red-500 mt-1">
                                        {formik.errors[field.name]}
                                    </div>
                                )}
                            </div>
                        ))}
                        <button type='submit' className="w-full py-2 font-medium text-white bg-primary hover:bg-primary-light rounded-lg border-primary hover:shadow inline-flex space-x-2 items-center justify-center"> {/* Reduced padding */}
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
                            <span>{forgetPassword.buttonLabel}</span>
                        </button>
                        <p className="text-center">
                            {forgetPassword.footer}{' '}
                            <Link to={forgetPassword.footerLink} className="text-primary hover:text-primary-light font-medium inline-flex space-x-1 items-center">
                                <span>{forgetPassword.footerText}</span>
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

export default ForgotPassword;
