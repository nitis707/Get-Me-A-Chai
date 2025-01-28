import React from "react"

const Footer = () => {

    const currYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white flex justify-center items-center p-4 text-center">
            <p className="">Copyright &copy; {currYear} Get Me A Chai - All rights reserved!</p>
        </footer>
    )
}

export default Footer;