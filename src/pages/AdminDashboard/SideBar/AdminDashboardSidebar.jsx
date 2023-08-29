import React, { useContext, useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { BiSolidContact } from 'react-icons/bi'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { CgWebsite } from "react-icons/cg"
import { FaBlog, FaHome, FaUsers } from 'react-icons/fa'
import { HiMiniCog6Tooth } from 'react-icons/hi2'
import { MdBallot } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo-white.png'
import { AuthContext } from '../../../Providers/AuthProvider'

const AdminDashboardSidebar = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const user = true;
    const {  logout } = useContext(AuthContext);
    const [isActive, setActive] = useState('false')
    const toggleHandler = event => {
        setToggle(event.target.checked)
    }
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    const handleLogOut = () => {
        logout()
          .then(toast.success("logout successfully"))
          .catch((err) => console.log(err));
      };
    
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-teal-900  flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to={'/'}><img className="h-12 mx-auto" src={logo} alt="logo" /></Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-teal-800'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-teal-900  w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    {/* Branding & Profile Info */}
                    <div>
                        <div className='w-full hidden md:flex justify-center mx-auto'>
                            <Link to={'/'}><img className="h-12 mx-auto" src={logo} alt="logo" /></Link>
                        </div>

                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6 text-white '>
                        <nav>
                            <>
                                {/* Menu Links */}
                                <NavLink
                                    to='/adminDashboard/adminHome'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950  ${isActive ? 'bg-teal-950' : ''
                                        }`
                                    }
                                >
                                    <BsFillHouseAddFill className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>AdminHome</span>
                                </NavLink>
                           
                                <NavLink
                                    to='/adminDashboard/userManagement'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950  ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <FaUsers className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Manage Users</span>
                                </NavLink>
                           
                                <NavLink
                                    to='/dashboard/satings'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950   ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <HiMiniCog6Tooth className='w-5 h-5' />
                                    <span className='mx-4 font-medium'>Profile</span>
                                </NavLink>
                                <div className="divider  mt-8 font-semibold ">Quick Action</div>
                                <NavLink
                                    to='/'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950   ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <FaHome className='w-5 h-5' />
                                    <span className='mx-4 font-medium'>Home</span>
                                </NavLink>
                                <NavLink
                                    to='/about'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950   ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <CgWebsite className='w-5 h-5 text-white' />
                                    <span className='mx-4 font-medium'>About</span>
                                </NavLink>
                                <NavLink
                                    to='/blog'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950   ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <FaBlog className='w-5 h-5' />
                                    <span className='mx-4 font-medium'>Blog</span>
                                </NavLink>
                                   
                                <NavLink
                                    to='/contact'
                                    onClick={handleToggle}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-teal-950   ${isActive ? 'bg-teal-950 ' : ''
                                        }`
                                    }
                                >
                                    <BiSolidContact className='w-5 h-5' />
                                    <span className='mx-4 font-medium'>Contact</span>
                                </NavLink>
                                   
                            </>

                        </nav>
                    </div>
                </div>
                <button className="my-btn-sec" onClick={handleLogOut}>
              LogOUT
            </button>
            </div>
        </>
    )
}

export default AdminDashboardSidebar
