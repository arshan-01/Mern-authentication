import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resendVerificationEmail, verifyEmail } from '../../redux/features/auth/auth.service';

function EmailVerification() {
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'failure', 'alreadyVerified', 'noToken'
    const dispatch = useDispatch();
    const { token, id } = useParams();
    console.log("🚀 ~ file: email-verification.jsx ~ line 10 ~ EmailVerification ~ token", token)
    console.log("🚀 ~ file: email-verification.jsx ~ line 11 ~ EmailVerification ~ id", id)
    useEffect(() => {
        if (!token || !id) {
            setStatus('noToken'); // No token available
            return;
        }

        const verify = async () => {
            setStatus('loading'); // Set status to loading before API call

            try {
                const result = await dispatch(verifyEmail({ token, id }));
                console.log("🚀 ~ verify ~ result:", result)

                const resultStatus = result.payload.status; // Store status in a variable for readability

                // Check the result of the verification
                if (resultStatus === 'verificationSuccess') {
                    setStatus('success');
                } else if (resultStatus === 'alreadyVerified') {
                    setStatus('alreadyVerified');
                } else if (resultStatus === 'invalidToken') {
                    setStatus('invalidToken');
                } else {
                    setStatus('failure');
                }

            } catch (error) {
                console.error('Verification error:', error);
                setStatus('failure'); // Handle error case
            }
        };

        verify();
    }, [token, id, dispatch]);

    // Resend verification email
    const handleResendVerification = async () => {
        // Resend verification email
        dispatch(resendVerificationEmail({UserId : id}));
    };
    const statusConfig = {
        loading: {
            message: 'Verifying Email...',
            description: 'Please wait while we verify your email.',
            icon: <div className="flex items-center justify-center h-16 w-16 bg-gray-200 rounded-full">
                <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                </svg>
            </div>,
        },
        success: {
            message: 'Email Verified!',
            description: 'Your email has been successfully verified. You can now proceed to your dashboard.',
            icon: <div className="rounded-full bg-green-200 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            </div>,
        },
        alreadyVerified: {
            message: 'Email Already Verified',
            description: 'It looks like your email is already verified. You can now proceed to your dashboard.',
            icon: <div className="rounded-full bg-green-200 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
            </div>,
        },
        invalidToken: {
            message: 'Invalid or Expired Token',
            description: 'The verification token is invalid or has expired. Please request a new verification email.',
            icon: <div className="rounded-full bg-yellow-200 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15M4.5 12h15" />
                    </svg>
                </div>
            </div>,
        },
        failure: {
            message: 'Verification Failed',
            description: 'There was an issue verifying your email. Please try again or contact support.',
            icon: <div className="rounded-full bg-red-200 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>,
        },
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100" aria-live="polite">
            <div className="rounded-lg bg-gray-50 px-20 py-16 shadow-lg w-[500px]">
                <div className="flex justify-center mb-6">
                    {statusConfig[status]?.icon}
                </div>
                <h3 className="my-4 text-center text-3xl font-semibold text-gray-700">
                    {statusConfig[status]?.message}
                </h3>
                <p className="w-[400px] text-center font-normal text-gray-600 my-4">
                    {statusConfig[status]?.description}
                </p>
                {status !== 'loading' && (
                    <>
                        {status === 'success' || status === 'alreadyVerified' ? (
                            <Link to="/">
                                <button
                                    className="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-blue-500 px-8 py-3 text-center text-base font-medium text-white hover:bg-blue-600"
                                >
                                    Start Your Journey
                                </button>
                            </Link>
                        ) : status === 'invalidToken' ? (
                            <button
                                onClick={handleResendVerification}
                                className={`mx-auto mt-10 block rounded-xl border-4 border-transparent bg-blue-500 px-8 py-3 text-center text-base font-medium text-white hover:bg-blue-600 ${status === 'loading' ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                                disabled={status === 'loading'}
                            >
                                Resend Verification
                            </button>
                        ) : null}

                        {status === 'failure' && (
                            <div className="mt-4 text-center">
                                <Link to="/contact-support" className="text-sm text-gray-500 hover:underline">
                                    Contact Support
                                </Link>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
}

export default EmailVerification;
