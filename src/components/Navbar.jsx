import { useState } from "react"
import { FiMenu, FiSearch, FiX } from "react-icons/fi"
import handy from '../assets/Handy_logo1.png'

const Navbar = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-300 transition-all">
                <div className="flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-3">
                    <a href="#" className="text-3xl font-bold text-red-500">
                        <img className="h-14 w-32 object-cover" src={handy} alt="Handy logo" />
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-8">
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>

                        {/* Search Box */}
                        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                            <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                            <FiSearch className="text-red-500" />
                        </div>

                        {/* Cart Icon */}
                        <div className="relative cursor-pointer">
                            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="red" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <button className="absolute -top-2 -right-3 text-xs text-white bg-red-500 w-[18px] h-[18px] rounded-full">3</button>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
                        <FiSearch className="w-6 h-6 text-red-600" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="sm:hidden bg-white shadow-md py-4 flex flex-col items-start gap-3 px-5 text-sm">
                        <a href="#" className="block w-full">Home</a>
                        <a href="#" className="block w-full">About</a>
                        <a href="#" className="block w-full">Contact</a>
                        <button className="px-6 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm w-full text-center">
                            Login
                        </button>
                    </div>
                )}
            </nav>

            {/* Spacer div to offset fixed navbar height */}
            <div className="h-[70px] sm:h-[80px]"></div>
        </>
    )
}

export default Navbar
