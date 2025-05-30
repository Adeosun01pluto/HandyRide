// import React from 'react'
// import { MdRestaurantMenu, MdFeedback, MdChecklist, MdDeliveryDining } from 'react-icons/md'
// import { FaTruck } from 'react-icons/fa'

// const Bottombar = () => {
//   return (
//     <div className="block sm:hidden">
//       <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-red-200 dark:bg-red-700 dark:border-red-600">
//         <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
//           <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-red-50 dark:hover:bg-red-800 group">
//             <MdRestaurantMenu className="w-5 h-5 mb-1 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500" />
//             <span className="text-sm text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500">Foods</span>
//           </button>

//           <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-red-50 dark:hover:bg-red-800 group">
//             <MdDeliveryDining  className="w-5 h-5 mb-1 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500" />
//             <span className="text-sm text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500">Logistics</span>
//           </button>

//           <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-red-50 dark:hover:bg-red-800 group">
//             <MdChecklist className="w-5 h-5 mb-1 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500" />
//             <span className="text-sm text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500">Errands</span>
//           </button>

//           <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-red-50 dark:hover:bg-red-800 group">
//             <MdFeedback className="w-5 h-5 mb-1 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500" />
//             <span className="text-sm text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-500">Feedback</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Bottombar


// components/Bottombar.js
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdRestaurantMenu, MdFeedback, MdChecklist, MdDeliveryDining } from 'react-icons/md'

const Bottombar = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
  }

  const isActive = (path) => {
    if (path === '/foods') {
      return location.pathname === '/' || location.pathname === '/foods'
    }
    return location.pathname === path
  }

  return (
    <div className="block sm:hidden">
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-red-200 dark:bg-red-700 dark:border-red-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          {navItems.map((item) => {
            const IconComponent = item.icon
            const active = isActive(item.path)
            
            return (
              <button 
                key={item.path}
                type="button" 
                onClick={() => handleNavigation(item.path)}
                className={`inline-flex flex-col items-center justify-center px-5 hover:bg-red-50 dark:hover:bg-red-800 group ${
                  active ? 'bg-red-50 dark:bg-red-800' : ''
                }`}
              >
                <IconComponent 
                  className={`w-5 h-5 mb-1 ${
                    active 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-red-500 dark:text-red-400'
                  } group-hover:text-red-600 dark:group-hover:text-red-500`} 
                />
                <span 
                  className={`text-sm ${
                    active 
                      ? 'text-red-600 dark:text-red-500' 
                      : 'text-red-500 dark:text-red-400'
                  } group-hover:text-red-600 dark:group-hover:text-red-500`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Bottombar