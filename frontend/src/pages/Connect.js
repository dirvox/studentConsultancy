/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react';
import { RiInstagramFill, RiFacebookFill, RiTwitterFill, RiYoutubeFill } from 'react-icons/ri';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Connect = () => {
    const [agreed, setAgreed] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            firstName,
            lastName,
            company,
            email,
            phone,
            message,
            agreed
        };

        try {
            await axios.post('/api/users/submit', formData);
            alert('Form submitted successfully!');
            // Optional: Reset form
            setFirstName('');
            setLastName('');
            setCompany('');
            setEmail('');
            setPhone('');
            setMessage('');
            setAgreed(false);
        } catch (err) {
            console.error(err);
            alert('There was an error submitting the form.');
        }
    };

    return (
        <div className="isolate mt-44 mb-36 p-6 mx-auto max-w-sm sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div className="mx-auto text-center">
                <h2 className="title">Contact Us</h2>
                <p className="mt-2 subdesc">We are here to assist you on your study abroad journey.</p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-600">First name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-600">Last name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-600">Company</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-600">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-600">Phone number</label>
                        <div className="relative mt-2.5">
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 pl-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-600">Message</label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>
                    <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2 justify-center">
                        <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className={classNames(
                                    agreed ? 'bg-primary' : 'bg-gray-200',
                                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors'
                                )}
                            >
                                <span className="sr-only">Agree to policies</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition'
                                    )}
                                />
                            </Switch>
                        </div>
                        <Switch.Label className="text-sm leading-6 text-gray-700">
                            By selecting this, you agree to allow us to contact you via phone
                        </Switch.Label>
                    </Switch.Group>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-xl bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xl hover:bg-primary-hover focus:bg-primary-hover duration-300 transition-colors"
                    >
                        Let's talk
                    </button>
                </div>
            </form>

            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a href="mailto:info@dirvox.co.in" className="text-primary font-semibold hover:text-gray-500">info@dirvox.co.in</a>
                <p className="leading-normal my-5 text-gray-700 ">
                    <a href="https://goo.gl/maps/Rko9qVf1rBpS9qe2A" className='hover:text-gray-500'>
                        608-A, Pinnacle Business Park<br />Corporate Road, Prahladnagar, Ahmedabad
                    </a>
                </p>
                <span className="inline-flex">
                    <a className="text-gray-500 hover:text-[#3b5998] text-xl"><RiFacebookFill /></a>
                    <a className="ml-4 text-gray-500 hover:text-[#26a7de] text-xl"><RiTwitterFill /></a>
                    <a className="ml-4 text-gray-500 hover:text-[#e2457a] text-xl"><RiInstagramFill /></a>
                    <a className="ml-4 text-gray-500 hover:text-[#CD201F] text-xl"><RiYoutubeFill /></a>
                </span>
            </div>
        </div>
    );
};

export default Connect;
