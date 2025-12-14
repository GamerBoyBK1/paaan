import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Formik, Form, FormikHelpers } from 'formik';
import { object, string, ref } from 'yup';
import Field from '@/components/elements/Field';
import Button from '@/components/elements/Button';
import tw from 'twin.macro';
import useFlash from '@/plugins/useFlash';
import CustomModal from './CustomModal';

interface ErrorResponse {
    errors?: Array<{ message: string }>;
}

const RegisterElement: React.FC = () => {
    const [error, setError] = useState('');
    const { clearFlashes } = useFlash();
    const [isModalOpen, setModalOpen] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
    });
    
    useEffect(() => {
        const baseUrl = window.location.hostname;
        const isHttps = window.location.protocol === 'https:';
        axios.get(`${isHttps ? 'https://' : 'http://'}${baseUrl}/extensions/huxregister/getTheme`)
            .then(response => {
                const themeFromServer = response.data.theme || 'light';
                setTheme(themeFromServer);
            })
            .catch(() => {
                setTheme('light');
            });
    }, []);

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
    
        if (formData.password !== formData.passwordRepeat) {
            setError('Passwords do not match');
            setNotification({ message: 'Passwords do not match. Please try again.', type: 'danger' });
            setIsSubmitting(false);
            return;
        }
    
        const baseUrl = window.location.hostname;
        const isHttps = window.location.protocol === 'https:';
    
        try {
            const createUserResponse = await axios.post(`${isHttps ? 'https://' : 'http://'}${baseUrl}/extensions/huxregister/create-user`, {
                email: formData.email,
                username: formData.username,
                first_name: formData.firstName,
                last_name: formData.lastName,
                password: formData.password,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setNotification({ message: 'Successfully registered! Please log in.', type: 'success' });
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
    
            const errors = axiosError.response?.data.errors;
            if (errors) {
                setError('Registration failed');
            } else {
                setError('An error occurred during registration. Please try again.');
            }
    
            setNotification({ message: 'Registration failed. Please check your input and try again. (There must be no -, ", \' characters)', type: 'danger' });
        } finally {
            setIsSubmitting(false);
            setModalOpen(false);
    
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };
    

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <br></br>
                <p className="text-center mb-4 text-white">
                    Don't have an account?{' '}
                    <span 
                        className="text-blue-400 cursor-pointer hover:underline" 
                        onClick={() => setModalOpen(true)}
                    >
                        Register here.
                    </span>
                </p>
            </div>

            <CustomModal visible={isModalOpen} onDismissed={() => setModalOpen(false)}
                css={[
                    theme === 'dark' 
                        ? tw`bg-gray-900` 
                        : tw`bg-white`
                ]}
            >
                        <form
                            onSubmit={handleSubmit}
                            css={[
                                tw`w-full flex flex-col items-center p-6 rounded-lg shadow-md`,
                                theme === 'dark' 
                                    ? tw`bg-gray-900` 
                                    : tw`bg-white`
                            ]}
                        >
                            <p
                            css={[
                                tw`text-2xl font-bold mb-4 text-center`,
                                theme === 'dark' 
                                    ? tw`text-white` 
                                    : tw`text-black`
                            ]}>Registration</p>
                            {error && <p css={tw`text-red-500 mb-4`}>{error}</p>}
                            
                            <div css={tw`flex w-full mb-2`}>
                                <div css={tw`w-1/2 pr-2`}>
                                    <label
                                        htmlFor="firstName"
                                        css={[tw`block text-sm font-medium`, theme === 'dark' ? tw`text-white` : tw`text-black`]}
                                    >
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        css={[
                                            tw`w-full text-black bg-gray-700 placeholder-gray-400 p-2 rounded`,
                                            theme === 'dark' ? tw`bg-gray-700 text-white placeholder-gray-400` : tw`bg-gray-200 text-black placeholder-gray-600`,
                                        ]}
                                    />
                                </div>
                                <div css={tw`w-1/2 pl-2`}>
                                    <label
                                        htmlFor="lastName"
                                        css={[tw`block text-sm font-medium`, theme === 'dark' ? tw`text-white` : tw`text-black`]}
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        css={[
                                            tw`w-full text-black bg-gray-700 placeholder-gray-400 p-2 rounded`,
                                            theme === 'dark' ? tw`bg-gray-700 text-white placeholder-gray-400` : tw`bg-gray-200 text-black placeholder-gray-600`,
                                        ]}
                                    />
                                </div>
                            </div>

                            <div css={tw`flex w-full mb-2`}>
                                <div css={tw`w-1/2 pr-2`}>
                                    <label
                                        htmlFor="username"
                                        css={[tw`block text-sm font-medium`, theme === 'dark' ? tw`text-white` : tw`text-black`]}
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        css={[
                                            tw`w-full text-black bg-gray-700 placeholder-gray-400 p-2 rounded`,
                                            theme === 'dark' ? tw`bg-gray-700 text-white placeholder-gray-400` : tw`bg-gray-200 text-black placeholder-gray-600`,
                                        ]}
                                    />
                                </div>
                                <div css={tw`w-1/2 pl-2`}>
                                    <label
                                        htmlFor="email"
                                        css={[tw`block text-sm font-medium`, theme === 'dark' ? tw`text-white` : tw`text-black`]}
                                    >
                                        E-Mail
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        css={[
                                            tw`w-full text-black bg-gray-700 placeholder-gray-400 p-2 rounded`,
                                            theme === 'dark' ? tw`bg-gray-700 text-white placeholder-gray-400` : tw`bg-gray-200 text-black placeholder-gray-600`,
                                        ]}
                                    />
                                </div>
                            </div>

                            <div css={tw`flex w-full mb-2`}>
                                <div css={tw`w-1/2 pr-2`}>
                                    <label
                                        htmlFor="password"
                                        css={[tw`block text-sm font-medium`, theme === 'dark' ? tw`text-white` : tw`text-black`]}
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        css={[
                                            tw`w-full text-black bg-gray-700 placeholder-gray-400 p-2 rounded`,
                                            theme === 'dark' ? tw`bg-gray-700 text-white placeholder-gray-400` : tw`bg-gray-200 text-black placeholder-gray-600`,
                                        ]}
                                    />
                                </div>
                                <div css={tw`w-1/2 pl-2`}>
                                    <label
                                        htmlFor="passwordRepeat"
                                        css={[tw`block text-sm font-medium`, theme === 'dark' ? tw`text-white` : tw`text-black`]}
                                    >
                                        Repeat Password
                                    </label>
                                    <input
                                        id="passwordRepeat"
                                        name="passwordRepeat"
                                        type="password"
                                        value={formData.passwordRepeat}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        css={[
                                            tw`w-full text-black bg-gray-700 placeholder-gray-400 p-2 rounded`,
                                            theme === 'dark' ? tw`bg-gray-700 text-white placeholder-gray-400` : tw`bg-gray-200 text-black placeholder-gray-600`,
                                        ]}
                                    />
                                </div>
                            </div>


                            <div css={tw`mt-6 w-full`}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    css={[
                                        tw`w-full py-2 px-4 rounded bg-blue-600 text-white font-bold`,
                                        theme === 'dark' ? tw`bg-blue-700 hover:bg-blue-800` : tw`bg-blue-500 hover:bg-blue-600`,
                                    ]}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Register'}
                                </button>
                            </div>
                        </form>
            </CustomModal>

            {notification && (
                <div 
                    css={[
                        tw`fixed bottom-4 left-4 text-white p-2 rounded flex items-center`,
                        notification.type === 'success' ? tw`bg-green-600` : tw`bg-red-600`
                    ]}
                >
                    <img src="https://addons.huxplay.eu/icons/bell.png" alt="Notification Icon" css={tw`w-6 h-6 mr-2`} />
                    <span>{notification.message}</span>
                </div>
            )}
        </>
    );
};

export default RegisterElement;