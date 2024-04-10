import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import prince from '../assets/baby_1.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AdminLayout = ({ children }) => {
    const navigate = useNavigate()
    const current = window.location.pathname

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Invitaciones Confirmadas', href: '/admin/invitation-accepted' },
        { name: 'Invitaciones Negadas', href: '/admin/invitation-negated' },
    ]

    const logout = () => { }
    return (
        <div className=" min-h-screen relative">
            <Disclosure as="nav" className="bg-white shadow-lg">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="flex flex-shrink-0 items-center">
                                        {/* Image */}
                                    </div>
                                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                        {navigation.map((item) => (
                                            <p
                                                onClick={() => navigate(item.href)}
                                                key={item.name}
                                                className={classNames(
                                                    current === item.href
                                                        ? 'border-indigo-500 text-gray-900'
                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                    'inline-flex items-center border-b-2 px-1 pt-1 text-base font-medium cursor-pointer'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative border-2 border-indigo-500 flex p-2 justify-center items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2  focus:border-indigo-500">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                    className=" h-5  w-5 " />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <p
                                                            onClick={() => { logout() }}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Cerrar Sesion
                                                        </p>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                                <div className="-mr-2 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="p"
                                        onClick={() => navigate(item.href)}
                                        className={classNames(
                                            current === item.href
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                                            'block border-l-4 py-2 pl-3 pr-4 text-base font-medium cursor-pointer'
                                        )}
                                    // aria-current={current === item.href ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pb-3 pt-4">
                                {/* <div className="flex items-center px-4 gap-4">
                                    <div className="flex-shrink-0">
                                        <img className="h-8 w-8 rounded-full" src="https://avatars.githubusercontent.com/u/1164541?v=4" alt="" />
                                    </div>
                                </div> */}
                                <div className="mt-3 space-y-1">
                                    <Disclosure.Button
                                        as="p"
                                        onClick={() => { logout() }}
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Cerrar Sesion
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <div className="py-10 px-8">
                <main>
                    <div className="w-full max-w-screen-xl mx-auto p-4 bg-white rounded-lg ">{children}</div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout