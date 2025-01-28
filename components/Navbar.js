"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {

    const { data: session } = useSession();

    const [showDropDown, setShowDropDown] = useState(false);

    const handleDropDown = () => {
        setShowDropDown(!showDropDown);
    }

    const handleDropDownClick = () => {
        setTimeout(() => {
            setShowDropDown(false);
        }, 300);
    }



    return (
        <nav className="bg-gray-900 shadow-lg shadow-white text-white flex justify-between items-center p-2">
            <Link href={"/"}>
                <div className="logo font-bold text-lg flex justify-center items-center">
                    <img className="invertImg" src="tea.gif" width={44} alt="" />
                    <span>GetMeAChai</span>
                </div>
            </Link>

            <div className="relative flex gap-4 justify-center items-center">
                {session && <>
                    <button onClick={handleDropDown} onBlur={handleDropDownClick} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>

                    <div id="dropdown" className={`z-10 ${showDropDown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href={"/dashboard"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={`${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link onClick={() => { signOut() }} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>
                }

                {session && <button className="btns" onClick={() => { signOut() }}>Logout</button>}

                {!session && <Link href={"/login"}>
                    <button className="btns">Login</button>
                </Link>
                }
            </div>
        </nav>
    )


}

export default Navbar;