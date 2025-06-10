

import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { FiMenu, FiSearch, FiX } from "react-icons/fi"
import { MdRestaurantMenu, MdFeedback, MdChecklist, MdDeliveryDining } from 'react-icons/md'
import handy from '../assets/Handy_logo1.png'
import { useSearch } from '../SearchContext' // Import the search context

const Navbar = () => {
    const navbarRef = useRef(null)
    const desktopSearchRef = useRef(null)
    const mobileSearchRef = useRef(null)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { searchQuery, setSearchQuery } = useSearch() // Use search context

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('touchstart', handleClickOutside) // For mobile
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [open])

    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    const navItems = [
        {
            path: '/foods',
            icon: MdRestaurantMenu,
            label: 'Foods'
        },
        {
            path: '/logistics',
            icon: MdDeliveryDining,
            label: 'Logistics'
        },
        {
            path: '/errands',
            icon: MdChecklist,
            label: 'Errands'
        },
        {
            path: '/feedback',
            icon: MdFeedback,
            label: 'Feedback'
        }
    ]

    const handleNavigation = (path) => {
        navigate(path)
        setOpen(false) // Close mobile menu after navigation
    }

    const isActive = (path) => {
        if (path === '/foods') {
            return location.pathname === '/' || location.pathname === '/foods'
        }
        return location.pathname === path
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
        // Scroll to top when user starts typing
        if (e.target.value) {
            scrollToTop()
        }
    }

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Blur the input to close keyboard
            e.target.blur()
            // Close mobile menu if open
            setOpen(false)
            // Scroll to top
            scrollToTop()
        }
    }

    const clearSearch = () => {
        setSearchQuery('')
        scrollToTop()
    }

    return (
        <>
            <nav ref={navbarRef} className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-300 transition-all">
                <div className="flex items-center justify-between px-2 md:px-16 lg:px-24 xl:px-32 py-3">
                    <button 
                        onClick={() => handleNavigation('/foods')} 
                        className="text-3xl font-bold text-red-500"
                    >
                        <img className="h-16 w-48 ml-[-10px] object-cover" src={handy} alt="Handy logo" />
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-8">
                        {navItems.map((item) => {
                            const IconComponent = item.icon
                            const active = isActive(item.path)
                            
                            return (
                                <button 
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 ${
                                        active 
                                            ? 'text-red-600 bg-red-50 font-semibold' 
                                            : 'text-gray-700 hover:text-red-600'
                                    }`}
                                >
                                    <IconComponent className={`w-5 h-5 ${active ? 'text-red-600' : 'text-gray-500'}`} />
                                    <span>{item.label}</span>
                                </button>
                            )
                        })}

                        {/* Desktop Search Box */}
                        <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full relative">
                            <input 
                                ref={desktopSearchRef}
                                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" 
                                type="text" 
                                placeholder="Search restaurants..." 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyDown}
                            />
                            {searchQuery ? (
                                <button 
                                    onClick={clearSearch}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <FiX className="w-4 h-4" />
                                </button>
                            ) : (
                                <FiSearch className="text-red-500" />
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
                        {open ? (
                            <FiX className="w-6 h-6 text-red-600" />
                        ) : (
                            <FiMenu className="w-6 h-6 text-red-600" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="sm:hidden bg-white shadow-md py-4 flex flex-col items-start gap-3 px-5 text-sm border-t border-gray-200">
                        {navItems.map((item) => {
                            const IconComponent = item.icon
                            const active = isActive(item.path)
                            
                            return (
                                <button 
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center gap-3 w-full py-3 px-3 rounded-lg transition-all duration-200 ${
                                        active 
                                            ? 'text-red-600 bg-red-50 font-semibold' 
                                            : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                                    }`}
                                >
                                    <IconComponent className={`w-5 h-5 ${active ? 'text-red-600' : 'text-gray-500'}`} />
                                    <span>{item.label}</span>
                                </button>
                            )
                        })}
                        
                        {/* Mobile Search */}
                        <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full w-full mt-2 relative">
                            <input 
                                ref={mobileSearchRef}
                                className="py-2 w-full bg-transparent outline-none placeholder-gray-500" 
                                type="text" 
                                placeholder="Search restaurants..." 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyDown}
                            />
                            {searchQuery ? (
                                <button 
                                    onClick={clearSearch}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <FiX className="w-4 h-4" />
                                </button>
                            ) : (
                                <FiSearch className="text-red-500" />
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer div to offset fixed navbar height */}
            <div className="h-[70px] sm:h-[80px]"></div>
        </>
    )
}

export default Navbar

// import { useEffect, useRef, useState } from "react"
// import { useNavigate, useLocation } from 'react-router-dom'
// import { FiMenu, FiSearch, FiX, FiMapPin, FiChevronDown, FiLoader } from "react-icons/fi"
// import { MdRestaurantMenu, MdFeedback, MdChecklist, MdDeliveryDining, MdLocationOn, MdMyLocation, MdAdd } from 'react-icons/md'
// import handy from '../assets/Handy_logo1.png'
// import { useSearch } from '../SearchContext'

// const Navbar = () => {
//     const navbarRef = useRef(null)
//     const addressDropdownRef = useRef(null)
//     const desktopSearchRef = useRef(null)
//     const mobileSearchRef = useRef(null)
//     const [open, setOpen] = useState(false)
//     const [addressDropdownOpen, setAddressDropdownOpen] = useState(false)
//     const [selectedAddress, setSelectedAddress] = useState("Getting your location...")
//     const [searchInput, setSearchInput] = useState("")
//     const [isLoadingLocation, setIsLoadingLocation] = useState(false)
//     const [userCoordinates, setUserCoordinates] = useState(null)
//     const [savedAddresses, setSavedAddresses] = useState([])
//     const [addressSuggestions, setAddressSuggestions] = useState([])
//     const [isSearchingAddress, setIsSearchingAddress] = useState(false)
    
//     const navigate = useNavigate()
//     const location = useLocation()
//     const { searchQuery, setSearchQuery } = useSearch()

//     // Get user's current location on component mount
//     useEffect(() => {
//         getCurrentLocation()
//         loadSavedAddresses()
//     }, [])

//     // Load saved addresses from localStorage
//     const loadSavedAddresses = () => {
//         const saved = localStorage.getItem('savedAddresses')
//         if (saved) {
//             setSavedAddresses(JSON.parse(saved))
//         }
//     }

//     // Save addresses to localStorage
//     const saveAddressesToStorage = (addresses) => {
//         localStorage.setItem('savedAddresses', JSON.stringify(addresses))
//         setSavedAddresses(addresses)
//     }

//     // Get current location
//     const getCurrentLocation = () => {
//         if (!navigator.geolocation) {
//             setSelectedAddress("Geolocation not supported")
//             return
//         }

//         setIsLoadingLocation(true)
        
//         navigator.geolocation.getCurrentPosition(
//             async (position) => {
//                 const { latitude, longitude } = position.coords
//                 setUserCoordinates({ lat: latitude, lng: longitude })
                
//                 try {
//                     const address = await reverseGeocode(latitude, longitude)
//                     setSelectedAddress(address)
//                     console.log('Final address set:', address)
//                 } catch (error) {
//                     console.error('Error getting address:', error)
//                     setSelectedAddress(`Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
//                 }
//                 setIsLoadingLocation(false)
//             },
//             (error) => {
//                 console.error('Geolocation error:', error)
//                 setIsLoadingLocation(false)
                
//                 switch(error.code) {
//                     case error.PERMISSION_DENIED:
//                         setSelectedAddress("Location access denied")
//                         break
//                     case error.POSITION_UNAVAILABLE:
//                         setSelectedAddress("Location unavailable")
//                         break
//                     case error.TIMEOUT:
//                         setSelectedAddress("Location timeout")
//                         break
//                     default:
//                         setSelectedAddress("Location error")
//                         break
//                 }
//             },
//             {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 300000 // 5 minutes
//             }
//         )
//     }

//     // Reverse geocoding using OpenStreetMap Nominatim API (free)
//     const reverseGeocode = async (lat, lng) => {
//         try {
//             console.log('Attempting reverse geocoding for:', lat, lng)
            
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1&accept-language=en`,
//                 {
//                     headers: {
//                         'User-Agent': 'HandyApp/1.0',
//                         'Accept': 'application/json'
//                     }
//                 }
//             )
            
//             console.log('Response status:', response.status)
            
//             if (!response.ok) {
//                 console.error('Response not ok:', response.status, response.statusText)
//                 return await tryAlternativeGeocoding(lat, lng)
//             }
            
//             const data = await response.json()
//             console.log('Geocoding response:', data)
            
//             if (data && data.display_name) {
//                 const address = data.address || {}
//                 let formattedAddress = ''
                
//                 // Build address from most specific to least specific
//                 if (address.house_number && address.road) {
//                     formattedAddress += `${address.house_number} ${address.road}, `
//                 } else if (address.road) {
//                     formattedAddress += `${address.road}, `
//                 } else if (address.pedestrian) {
//                     formattedAddress += `${address.pedestrian}, `
//                 }
                
//                 if (address.suburb) {
//                     formattedAddress += `${address.suburb}, `
//                 } else if (address.neighbourhood) {
//                     formattedAddress += `${address.neighbourhood}, `
//                 } else if (address.residential) {
//                     formattedAddress += `${address.residential}, `
//                 }
                
//                 if (address.city) {
//                     formattedAddress += `${address.city}`
//                 } else if (address.town) {
//                     formattedAddress += `${address.town}`
//                 } else if (address.village) {
//                     formattedAddress += `${address.village}`
//                 } else if (address.county) {
//                     formattedAddress += `${address.county}`
//                 }
                
//                 if (address.state) {
//                     formattedAddress += `, ${address.state}`
//                 } else if (address.region) {
//                     formattedAddress += `, ${address.region}`
//                 }
                
//                 if (address.country) {
//                     formattedAddress += `, ${address.country}`
//                 }
                
//                 // Clean up the address
//                 formattedAddress = formattedAddress.replace(/^,\s*/, '').replace(/,\s*$/, '')
                
//                 if (formattedAddress) {
//                     console.log('Formatted address:', formattedAddress)
//                     return formattedAddress
//                 }
                
//                 // Fallback to display_name if formatting fails
//                 console.log('Using display_name:', data.display_name)
//                 return data.display_name
//             }
            
//             console.log('No address found, trying alternative')
//             return await tryAlternativeGeocoding(lat, lng)
            
//         } catch (error) {
//             console.error('Geocoding error:', error)
//             return await tryAlternativeGeocoding(lat, lng)
//         }
//     }

//     // Alternative geocoding using a different approach
//     const tryAlternativeGeocoding = async (lat, lng) => {
//         try {
//             // Try with different zoom level and simpler request
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`,
//                 {
//                     headers: {
//                         'User-Agent': 'HandyApp/1.0'
//                     }
//                 }
//             )
            
//             if (response.ok) {
//                 const data = await response.json()
//                 if (data && data.display_name) {
//                     console.log('Alternative geocoding success:', data.display_name)
//                     return data.display_name
//                 }
//             }
            
//             // If all else fails, try to get at least the city/area
//             const simpleResponse = await fetch(
//                 `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=0`
//             )
            
//             if (simpleResponse.ok) {
//                 const simpleData = await simpleResponse.json()
//                 if (simpleData && simpleData.display_name) {
//                     console.log('Simple geocoding success:', simpleData.display_name)
//                     return simpleData.display_name
//                 }
//             }
            
//         } catch (error) {
//             console.error('Alternative geocoding failed:', error)
//         }
        
//         // Final fallback - return coordinates with a descriptive label
//         return `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
//     }

//     // Forward geocoding for address search
//     const searchAddresses = async (query) => {
//         if (!query.trim()) {
//             setAddressSuggestions([])
//             return
//         }

//         setIsSearchingAddress(true)
        
//         try {
//             const response = await fetch(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=ng`, // Restricting to Nigeria based on your context
//                 {
//                     headers: {
//                         'User-Agent': 'HandyApp/1.0'
//                     }
//                 }
//             )
            
//             if (!response.ok) throw new Error('Address search failed')
            
//             const data = await response.json()
            
//             const suggestions = data.map(item => ({
//                 id: item.place_id,
//                 display_name: item.display_name,
//                 lat: parseFloat(item.lat),
//                 lng: parseFloat(item.lon),
//                 address: formatSearchResult(item)
//             }))
            
//             setAddressSuggestions(suggestions)
//         } catch (error) {
//             console.error('Address search error:', error)
//             setAddressSuggestions([])
//         } finally {
//             setIsSearchingAddress(false)
//         }
//     }

//     // Format search results
//     const formatSearchResult = (item) => {
//         const addr = item.address
//         let formatted = ''
        
//         if (addr.house_number && addr.road) {
//             formatted += `${addr.house_number} ${addr.road}, `
//         } else if (addr.road) {
//             formatted += `${addr.road}, `
//         }
        
//         if (addr.suburb || addr.neighbourhood) {
//             formatted += `${addr.suburb || addr.neighbourhood}, `
//         }
        
//         if (addr.city || addr.town) {
//             formatted += `${addr.city || addr.town}`
//         }
        
//         if (addr.state) {
//             formatted += `, ${addr.state}`
//         }
        
//         return formatted || item.display_name
//     }

//     // Debounced address search
//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             if (searchInput) {
//                 searchAddresses(searchInput)
//             } else {
//                 setAddressSuggestions([])
//             }
//         }, 500)

//         return () => clearTimeout(timeoutId)
//     }, [searchInput])

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//                 setOpen(false)
//             }
//             if (addressDropdownRef.current && !addressDropdownRef.current.contains(event.target)) {
//                 setAddressDropdownOpen(false)
//                 setAddressSuggestions([])
//             }
//         }

//         if (open || addressDropdownOpen) {
//             document.addEventListener('mousedown', handleClickOutside)
//             document.addEventListener('touchstart', handleClickOutside)
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside)
//             document.removeEventListener('touchstart', handleClickOutside)
//         }
//     }, [open, addressDropdownOpen])

//     useEffect(() => {
//         setOpen(false)
//     }, [location.pathname])

//     const navItems = [
//         {
//             path: '/foods',
//             icon: MdRestaurantMenu,
//             label: 'Foods'
//         },
//         {
//             path: '/logistics',
//             icon: MdDeliveryDining,
//             label: 'Logistics'
//         },
//         {
//             path: '/errands',
//             icon: MdChecklist,
//             label: 'Errands'
//         },
//         {
//             path: '/feedback',
//             icon: MdFeedback,
//             label: 'Feedback'
//         }
//     ]

//     const handleNavigation = (path) => {
//         navigate(path)
//         setOpen(false)
//     }

//     const isActive = (path) => {
//         if (path === '/foods') {
//             return location.pathname === '/' || location.pathname === '/foods'
//         }
//         return location.pathname === path
//     }

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//     }

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value)
//         if (e.target.value) {
//             scrollToTop()
//         }
//     }

//     const handleSearchKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             e.target.blur()
//             setOpen(false)
//             scrollToTop()
//         }
//     }

//     const clearSearch = () => {
//         setSearchQuery('')
//         scrollToTop()
//     }

//     const handleAddressSelect = (address) => {
//         if (typeof address === 'string') {
//             setSelectedAddress(address)
//         } else {
//             setSelectedAddress(address.address || address.display_name)
//             setUserCoordinates({ lat: address.lat, lng: address.lng })
            
//             // Save to recent addresses if it's not already saved
//             const existingAddress = savedAddresses.find(addr => 
//                 addr.address === (address.address || address.display_name)
//             )
            
//             if (!existingAddress) {
//                 const newAddress = {
//                     id: Date.now(),
//                     name: "Recent",
//                     address: address.address || address.display_name,
//                     lat: address.lat,
//                     lng: address.lng,
//                     type: "recent"
//                 }
                
//                 const updatedAddresses = [newAddress, ...savedAddresses.slice(0, 4)] // Keep only 5 recent
//                 saveAddressesToStorage(updatedAddresses)
//             }
//         }
        
//         setAddressDropdownOpen(false)
//         setAddressSuggestions([])
//         setSearchInput("")
//     }

//     const handleCurrentLocation = () => {
//         setAddressDropdownOpen(false)
//         getCurrentLocation()
//     }

//     const handleAddressSearch = () => {
//         if (addressSuggestions.length > 0) {
//             handleAddressSelect(addressSuggestions[0])
//         }
//     }

//     const handleAddressSearchKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleAddressSearch()
//         }
//     }

//     const saveCurrentAddress = () => {
//         if (!selectedAddress || selectedAddress.includes("Getting") || selectedAddress.includes("error") || selectedAddress.includes("denied")) {
//             return
//         }

//         const addressName = prompt("Give this address a name (e.g., Home, Work):")
//         if (addressName) {
//             const newAddress = {
//                 id: Date.now(),
//                 name: addressName,
//                 address: selectedAddress,
//                 lat: userCoordinates?.lat,
//                 lng: userCoordinates?.lng,
//                 type: "saved"
//             }
            
//             const updatedAddresses = [...savedAddresses, newAddress]
//             saveAddressesToStorage(updatedAddresses)
//             alert("Address saved successfully!")
//         }
//     }

//     return (
//         <>
//             <nav ref={navbarRef} className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-300 transition-all">
//                 <div className="flex items-center justify-between px-2 md:px-16 lg:px-24 xl:px-32 py-3">
//                     <button 
//                         onClick={() => handleNavigation('/foods')} 
//                         className="text-3xl font-bold text-red-500"
//                     >
//                         <img className="h-16 w-48 ml-[-10px] object-cover" src={handy} alt="Handy logo" />
//                     </button>

//                     {/* Desktop Menu */}
//                     <div className="hidden sm:flex items-center gap-8">
//                         {navItems.map((item) => {
//                             const IconComponent = item.icon
//                             const active = isActive(item.path)
                            
//                             return (
//                                 <button 
//                                     key={item.path}
//                                     onClick={() => handleNavigation(item.path)}
//                                     className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 ${
//                                         active 
//                                             ? 'text-red-600 bg-red-50 font-semibold' 
//                                             : 'text-gray-700 hover:text-red-600'
//                                     }`}
//                                 >
//                                     <IconComponent className={`w-5 h-5 ${active ? 'text-red-600' : 'text-gray-500'}`} />
//                                     <span>{item.label}</span>
//                                 </button>
//                             )
//                         })}

//                         {/* Desktop Search Box */}
//                         <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full relative">
//                             <input 
//                                 ref={desktopSearchRef}
//                                 className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" 
//                                 type="text" 
//                                 placeholder="Search restaurants..." 
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                                 onKeyDown={handleSearchKeyDown}
//                             />
//                             {searchQuery ? (
//                                 <button 
//                                     onClick={clearSearch}
//                                     className="text-gray-400 hover:text-red-500 transition-colors"
//                                 >
//                                     <FiX className="w-4 h-4" />
//                                 </button>
//                             ) : (
//                                 <FiSearch className="text-red-500" />
//                             )}
//                         </div>
//                     </div>

//                     {/* Mobile Menu Toggle */}
//                     <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
//                         {open ? (
//                             <FiX className="w-6 h-6 text-red-600" />
//                         ) : (
//                             <FiMenu className="w-6 h-6 text-red-600" />
//                         )}
//                     </button>
//                 </div>

//                 {/* Mobile Menu */}
//                 {open && (
//                     <div className="sm:hidden bg-white shadow-md py-4 flex flex-col items-start gap-3 px-5 text-sm border-t border-gray-200">
//                         {navItems.map((item) => {
//                             const IconComponent = item.icon
//                             const active = isActive(item.path)
                            
//                             return (
//                                 <button 
//                                     key={item.path}
//                                     onClick={() => handleNavigation(item.path)}
//                                     className={`flex items-center gap-3 w-full py-3 px-3 rounded-lg transition-all duration-200 ${
//                                         active 
//                                             ? 'text-red-600 bg-red-50 font-semibold' 
//                                             : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
//                                     }`}
//                                 >
//                                     <IconComponent className={`w-5 h-5 ${active ? 'text-red-600' : 'text-gray-500'}`} />
//                                     <span>{item.label}</span>
//                                 </button>
//                             )
//                         })}
                        
//                         {/* Mobile Search */}
//                         <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full w-full mt-2 relative">
//                             <input 
//                                 ref={mobileSearchRef}
//                                 className="py-2 w-full bg-transparent outline-none placeholder-gray-500" 
//                                 type="text" 
//                                 placeholder="Search restaurants..." 
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                                 onKeyDown={handleSearchKeyDown}
//                             />
//                             {searchQuery ? (
//                                 <button 
//                                     onClick={clearSearch}
//                                     className="text-gray-400 hover:text-red-500 transition-colors"
//                                 >
//                                     <FiX className="w-4 h-4" />
//                                 </button>
//                             ) : (
//                                 <FiSearch className="text-red-500" />
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </nav>

//             {/* Address Picker and Search Section */}
//             <div className="fixed top-[80px] left-0 w-full z-40 mt-2 bg-white border-b border-gray-200 shadow-sm">
//                 <div className="px-2 md:px-16 lg:px-24 xl:px-32 py-3">
//                     {/* Desktop Layout */}
//                     <div className="hidden sm:flex items-center gap-4">
//                         {/* Address Picker */}
//                         <div className="relative" ref={addressDropdownRef}>
//                             <button
//                                 onClick={() => setAddressDropdownOpen(!addressDropdownOpen)}
//                                 className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors min-w-[250px] text-left"
//                                 disabled={isLoadingLocation}
//                             >
//                                 {isLoadingLocation ? (
//                                     <FiLoader className="w-5 h-5 text-red-500 flex-shrink-0 animate-spin" />
//                                 ) : (
//                                     <MdLocationOn className="w-5 h-5 text-red-500 flex-shrink-0" />
//                                 )}
//                                 <span className="text-sm text-gray-700 truncate flex-1">{selectedAddress}</span>
//                                 <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${addressDropdownOpen ? 'rotate-180' : ''}`} />
//                             </button>

//                             {/* Address Dropdown */}
//                             {addressDropdownOpen && (
//                                 <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
//                                     {/* Current Location Option */}
//                                     <button
//                                         onClick={handleCurrentLocation}
//                                         className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100"
//                                     >
//                                         <MdMyLocation className="w-5 h-5 text-blue-500" />
//                                         <span className="text-sm text-gray-700">Use Current Location</span>
//                                     </button>

//                                     {/* Save Current Address */}
//                                     {selectedAddress && !selectedAddress.includes("Getting") && !selectedAddress.includes("error") && (
//                                         <button
//                                             onClick={saveCurrentAddress}
//                                             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100"
//                                         >
//                                             <MdAdd className="w-5 h-5 text-green-500" />
//                                             <span className="text-sm text-gray-700">Save Current Address</span>
//                                         </button>
//                                     )}

//                                     {/* Saved Addresses */}
//                                     {savedAddresses.map((address) => (
//                                         <button
//                                             key={address.id}
//                                             onClick={() => handleAddressSelect(address)}
//                                             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
//                                         >
//                                             <MdLocationOn className="w-5 h-5 text-red-500" />
//                                             <div className="flex-1">
//                                                 <div className="text-sm font-medium text-gray-900">{address.name}</div>
//                                                 <div className="text-xs text-gray-500">{address.address}</div>
//                                             </div>
//                                         </button>
//                                     ))}

//                                     {savedAddresses.length === 0 && (
//                                         <div className="px-4 py-3 text-sm text-gray-500 text-center">
//                                             No saved addresses
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Address Search */}
//                         <div className="flex items-center gap-2 flex-1 max-w-md relative">
//                             <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white flex-1">
//                                 <FiMapPin className="w-4 h-4 text-gray-400 mr-2" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search for address..."
//                                     value={searchInput}
//                                     onChange={(e) => setSearchInput(e.target.value)}
//                                     onKeyDown={handleAddressSearchKeyDown}
//                                     className="flex-1 outline-none text-sm placeholder-gray-500"
//                                 />
//                                 {isSearchingAddress && (
//                                     <FiLoader className="w-4 h-4 text-gray-400 animate-spin" />
//                                 )}
//                             </div>
                            
//                             {/* Address Suggestions Dropdown */}
//                             {addressSuggestions.length > 0 && (
//                                 <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
//                                     {addressSuggestions.map((suggestion) => (
//                                         <button
//                                             key={suggestion.id}
//                                             onClick={() => handleAddressSelect(suggestion)}
//                                             className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
//                                         >
//                                             <div className="text-sm text-gray-900">{suggestion.address}</div>
//                                             <div className="text-xs text-gray-500 truncate">{suggestion.display_name}</div>
//                                         </button>
//                                     ))}
//                                 </div>
//                             )}
                            
//                             <button
//                                 onClick={handleAddressSearch}
//                                 className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
//                             >
//                                 Search
//                             </button>
//                         </div>
//                     </div>

//                     {/* Mobile Layout */}
//                     <div className="sm:hidden space-y-3">
//                         {/* Address Picker */}
//                         <div className="relative" ref={addressDropdownRef}>
//                             <button
//                                 onClick={() => setAddressDropdownOpen(!addressDropdownOpen)}
//                                 className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors w-full text-left"
//                                 disabled={isLoadingLocation}
//                             >
//                                 {isLoadingLocation ? (
//                                     <FiLoader className="w-5 h-5 text-red-500 flex-shrink-0 animate-spin" />
//                                 ) : (
//                                     <MdLocationOn className="w-5 h-5 text-red-500 flex-shrink-0" />
//                                 )}
//                                 <span className="text-sm text-gray-700 truncate flex-1">{selectedAddress}</span>
//                                 <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${addressDropdownOpen ? 'rotate-180' : ''}`} />
//                             </button>

//                             {/* Mobile Address Dropdown */}
//                             {addressDropdownOpen && (
//                                 <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
//                                     {/* Current Location Option */}
//                                     <button
//                                         onClick={handleCurrentLocation}
//                                         className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100"
//                                     >
//                                         <MdMyLocation className="w-5 h-5 text-blue-500" />
//                                         <span className="text-sm text-gray-700">Use Current Location</span>
//                                     </button>

//                                     {/* Save Current Address */}
//                                     {selectedAddress && !selectedAddress.includes("Getting") && !selectedAddress.includes("error") && (
//                                         <button
//                                             onClick={saveCurrentAddress}
//                                             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100"
//                                         >
//                                             <MdAdd className="w-5 h-5 text-green-500" />
//                                             <span className="text-sm text-gray-700">Save Current Address</span>
//                                         </button>
//                                     )}

//                                     {/* Saved Addresses */}
//                                     {savedAddresses.map((address) => (
//                                         <button
//                                             key={address.id}
//                                             onClick={() => handleAddressSelect(address)}
//                                             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
//                                         >
//                                             <MdLocationOn className="w-5 h-5 text-red-500" />
//                                             <div className="flex-1">
//                                                 <div className="text-sm font-medium text-gray-900">{address.name}</div>
//                                                 <div className="text-xs text-gray-500">{address.address}</div>
//                                             </div>
//                                         </button>
//                                     ))}

//                                     {savedAddresses.length === 0 && (
//                                         <div className="px-4 py-3 text-sm text-gray-500 text-center">
//                                             No saved addresses
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Mobile Address Search */}
//                         <div className="relative">
//                             <div className="flex items-center gap-2">
//                                 <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white flex-1">
//                                     <FiMapPin className="w-4 h-4 text-gray-400 mr-2" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search for address..."
//                                         value={searchInput}
//                                         onChange={(e) => setSearchInput(e.target.value)}
//                                         onKeyDown={handleAddressSearchKeyDown}
//                                         className="flex-1 outline-none text-sm placeholder-gray-500"
//                                     />
//                                     {isSearchingAddress && (
//                                         <FiLoader className="w-4 h-4 text-gray-400 animate-spin" />
//                                     )}
//                                 </div>
//                                 <button
//                                     onClick={handleAddressSearch}
//                                     className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
//                                 >
//                                     Search
//                                 </button>
//                             </div>
                            
//                             {/* Mobile Address Suggestions */}
//                             {addressSuggestions.length > 0 && (
//                                 <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
//                                     {addressSuggestions.map((suggestion) => (
//                                         <button
//                                             key={suggestion.id}
//                                             onClick={() => handleAddressSelect(suggestion)}
//                                             className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
//                                         >
//                                             <div className="text-sm text-gray-900">{suggestion.address}</div>
//                                             <div className="text-xs text-gray-500 truncate">{suggestion.display_name}</div>
//                                         </button>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Spacer div to offset fixed navbar + address picker height */}
//             <div className="h-[140px] sm:h-[150px]"></div>
//         </>
//     )
// }

// export default Navbar