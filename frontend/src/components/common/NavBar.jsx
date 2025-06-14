import React, { useRef, useState, useEffect } from 'react';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath, useNavigate, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector, useDispatch } from 'react-redux';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { BsChevronDown } from "react-icons/bs";
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoIosClose } from "react-icons/io";
import { toggle } from '../../slice/themeSlice';
import { HiSearch } from 'react-icons/hi';
import useOnClickOutside from '../../hooks/useOnClickOutSide';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux state selectors
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const theme = useSelector((state) => state.theme)

  // Component state
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)
  const [subLinks, setSubLinks] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [searchActive, setSearchActive] = useState("icon")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refs
  const mobileNavRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const overlayRef = useRef();
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  // Fetch sublinks from API
  useEffect(() => {
    const fetchSublinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API)
        if (result?.data?.data?.length > 0) {
          setSubLinks(result?.data?.data);
        }
        localStorage.setItem("sublinks", JSON.stringify(result.data.data))
      } catch (err) {
        console.log("Could not the fetch the category list");
        console.log("Error : ", err)
      }
    }
    fetchSublinks()
  }, [subLinks])

  // Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(currentScrollPos <= prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Click Outside for Mobile Menu
  useOnClickOutside([mobileNavRef, mobileMenuButtonRef], () => { setMobileMenuOpen(false) });

  // Foucs Search input when active
  useEffect(() => {
    if (searchActive === 'search' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchActive]);

  // Helper Functions fro matching routes
  const MatchRoute = (route) => { return matchPath({ path: route }, location.pathname) }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue?.length > 0) {
      navigate(`/search/${searchValue}`);
      setSearchValue("");
    }
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className={`flex w-screen relative z-50 h-14 items-center justify-center border-b-[1px] dark:border-b-dark-richblack-700 border-b-light-richblack-700 transition-all duration-500 ${location.pathname === '/' ? "bg-white dark:bg-dark-richblack-900" : "dark:bg-dark-richblack-800 bg-light-richblack-800"}`}>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>        <Link to={'/'}>
        <img
          src={logo}
          alt="logo"
          width={160}
          height={42}
          loading='lazy'
          className={`${theme === 'light' ? 'filter brightness-0' : ''}`}
        />
      </Link>

        {/* Mobile Navigation Icons */}
        <div className='flex md:hidden gap-x-4 items-center'>
          {/* Cart Icon (Mobile) */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to={'/dashboard/cart'} className='relative' >
              <AiOutlineShoppingCart className='dark:fill-dark-richblack-25 fill-light-richblack-25 w-8 h-8' />
              {totalItems > 0 && (
                <span className='font-medium text-[12px] shadow-[3px] shadow-black dark:bg-dark-yellow-100 bg-red-500 absolute dark:text-dark-richblack-900 text-light-richblack-900 rounded-full px-[4px] -top-[2px] -right-[1px] animate-bounce  '>
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {/* Theme Toggle (Mobile) */}
          <button
            onClick={() => dispatch(toggle())}
            className={`relative p-2 rounded-full cursor-pointer overflow-hidden
                       ${theme === 'dark' ? 'bg-dark-richblack-700' : 'bg-light-richblack-900'}
                      `}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="relative h-5 w-5 flex items-center justify-center">
              <FiMoon
                size={20}
                className={`
                         absolute transition-all duration-200
                         ${theme === 'dark'
                    ? 'text-dark-yellow-50 rotate-0 scale-100 opacity-100'
                    : 'text-red-600 rotate-180 scale-0 opacity-0'}
                        `}
              />
              <FiSun
                size={20}
                className={`
                         absolute transition-all duration-200
                          ${theme === 'dark'
                    ? 'text-dark-yellow-50 rotate-180 scale-0 opacity-0'
                    : 'text-red-600 rotate-0 scale-100 opacity-100'}
                          `}
              />
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button ref={mobileMenuButtonRef} onClick={toggleMobileMenu}>
            <AiOutlineMenu className={`fill-light-richblack-25 dark:fill-dark-richblack-25 w-8 h-8`} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className='hidden md:block'>
          <ul className='gap-x-6 dark:text-dark-richblack-25  text-light-richblack-25 transition-all duration-200 gap-5 items-center flex'>
            {NavbarLinks.map((ele, i) => (
              <li key={i}>
                {ele.title === "Catalog" ? (
                  <div className={`flex items-center gap-2 group relative cursor-pointer transition-all duration-200 ${MatchRoute('/catalog/:catalogName') ? "dark:text-dark-yellow-25 text-red-500" : "text-light-richblack-25 dark:text-dark-richblack-25"}`}>
                    <p>{ele.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg dark:bg-dark-richblack-5 bg-light-richblack-5 p-4 dark:text-dark-richblack-900 text-light-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] overflow-y-auto">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded dark:bg-dark-richblack-5 bg-light-richblack-5"></div>
                      {
                        subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link
                              to={`/catalog/${subLink.name}`}
                              className={`hover:dark:bg-dark-richblack-50 hover:bg-light-richblack-50 py-4 pl-4 rounded-lg`}
                              key={subLink._id || index}
                            >
                              <p>
                                {subLink.name}
                              </p>
                            </Link>
                          ))
                        ) : (<p className='text-white dark:text-dark-richblack-900'>Loading...</p>)}
                    </div>
                  </div>
                ) : (
                  <Link to={ele.path}>
                    <p className={`${MatchRoute(ele.path) ? "dark:text-dark-yellow-25 text-red-500" : "text-light-richblack-25 dark:text-dark-richblack-25"
                      }`}>
                      {ele.title}
                    </p>
                  </Link>
                )
                }

              </li>
            ))}
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center relative h-10"
            >
              {/* Circular background for icon */}
              <div
                className={`absolute left-0 flex items-center cursor-pointer justify-center rounded-full transition-all duration-300 ${searchActive === 'icon'
                  ? 'w-10 h-10 bg-light-richblack-700 dark:bg-dark-richblack-700'
                  : 'w-10 h-10'
                  }`}
              >
                <HiSearch
                  className={`cursor-pointer text-light-richblack-200 dark:text-dark-richblack-200 transition-all duration-300 text-xl opacity-100`}
                  onClick={() => searchActive === 'icon' && setSearchActive('search')}
                />
              </div>

              {/* Input container with relative positioning */}
              <div className={`relative transition-all duration-300 ease-in-out ${searchActive === 'icon' ? 'w-0' : 'w-48 md:w-64'
                }`}>
                {/* Input field */}
                <input
                  type="text"
                  ref={inputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search Course"
                  className={`w-full bg-light-richblack-800 dark:bg-dark-richblack-800 dark:text-dark-richblack-100 text-light-richblack-100 py-2 pl-12 pr-10 rounded-lg transition-opacity duration-300 ${searchActive === 'icon' ? 'opacity-0' : 'opacity-100'
                    }`}
                  onClick={() => searchActive === 'icon' && setSearchActive('search')}
                  onBlur={() => {
                    if (!searchValue) {
                      setSearchActive('icon');
                    }
                  }}
                />

                {/* Search submit button - positioned inside input */}
                {searchActive === 'search' && (
                  <button
                    type="submit"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${searchValue
                      ? 'bg-light-blue-600 dark:bg-dark-blue-600 text-white'
                      : 'bg-light-richblack-700 dark:bg-dark-richblack-700 text-light-richblack-400 dark:text-dark-richblack-400 cursor-default'
                      }`}
                    disabled={!searchValue}
                  >
                    <HiSearch className="text-lg" />
                  </button>
                )}
              </div>
            </form>
          </ul>
        </nav>

        {/* Desktop Right side buttons */}
        <div className='hidden md:flex gap-x-5 items-center'>
          {/* Theme Toggle Button */}
          <button
            onClick={() => dispatch(toggle())}
            className={`relative p-2 rounded-full cursor-pointer overflow-hidden ${theme === 'dark' ? 'bg-dark-richblack-700' : 'bg-light-richblack-900'}`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="relative h-5 w-5 flex items-center justify-center">
              {/* Moon Icon (Dark Mode) */}
              <FiMoon
                size={20}
                className={`
                         absolute transition-all duration-200
                         ${theme === 'dark'
                    ? 'text-dark-yellow-50 rotate-0 scale-100 opacity-100'
                    : 'text-red-600 rotate-180 scale-0 opacity-0'}
                        `}
              />
              <FiSun
                size={20}
                className={`
                         absolute transition-all duration-200
                          ${theme === 'dark'
                    ? 'text-dark-yellow-50 rotate-180 scale-0 opacity-0'
                    : 'text-red-600 rotate-0 scale-100 opacity-100'}
                          `}
              />
            </div>
          </button>

          {/* Cart Icon */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className='relative'>
              <AiOutlineShoppingCart className={`text-2xl  text-light-richblack-100 dark:text-white`} />
              {
                totalItems > 0 && (
                  <span className=" -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-center text-xs font-bold dark:bg-dark-yellow-100 bg-red-500 absolute dark:text-dark-richblack-900 text-light-richblack-900 animate-bounce">
                    {totalItems}
                  </span>
                )
              }
            </Link>
          )
          }

          {/* Auth Buttons */}
          {
            token === null && (
              <>
                <Link to={'/login'}>
                  <button className="rounded-[8px] cursor-pointer border-[1px] border-[#2A4CF3] dark:border-dark-richblack-700 dark:bg-dark-richblack-800 bg-[#F1FAFF] px-[12px] py-[8px] dark:text-dark-richblack-100 text-light-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to={'/signup'}>
                  <button className="rounded-[8px] cursor-pointer border-[1px] border-[#2A4CF3] dark:border-dark-richblack-700 dark:bg-dark-richblack-800 bg-[#F1FAFF] px-[12px] py-[8px] dark:text-dark-richblack-100 text-light-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            )
          }
          {
            token !== null && <ProfileDropDown />
          }
        </div>    

        {/* Mobile Menu Overlay */}
        <div
          ref={overlayRef}
          className={`fixed top-0 bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(0,0,0,0.5)] z-30 w-[100vw] h-[100vh] overflow-y-hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu Content */}
        <div ref={mobileNavRef} className={`fixed top-0 right-0 h-screen w-64 bg-light-richblack-800 dark:bg-dark-richblack-800 z-40 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div>
            {/* Account Section */}
            {token === null ? (
              <div className='flex flex-col gap-4 m-6'>
                <Link to={'/login'} onClick={() => setMobileMenuOpen(false)}>
                  <button className='w-full mx-auto text-center px-6 py-2 rounded-md font-semibold bg-dark-yellow-5 text-black hover:scale-95 transition-all duration-200'>Login</button>
                </Link>
                <Link to={'/signup'} onClick={() => setMobileMenuOpen(false)}>
                  <button className='w-full text-center px-6 py-2 rounded-md font-semibold bg-dark-yellow-5 text-black hover:scale-95 transition-all duration-200'>Signup</button>
                </Link>
              </div>
            ) : (<div className='mb-6'>
              <p className='text-light-richblack-50 dark:text-dark-richblack-50 text-center mb-4 text-xl mt-4'>Account</p>
              <div className='flex justify-center'>
                <ProfileDropDown />
              </div>
            </div>)}

            {/* Courses Section */}
            <div className='mt-4 mb-4 bg-light-richblack-600 dark:bg-dark-richblack-600 w-62 mx-auto h-[1px]'></div>
            <div className='my-6 mx-4'>
              <p className='text-xl text-red-500 dark:text-dark-yellow-50 font-semibold'>Courses</p>
              <div>
                {!subLinks.length ? (
                  <p className='text-dark-richblack-900 dark:text-dark-richblack-5'>Loading...</p>
                ) : (
                  subLinks.map((ele, i) => (
                    <Link to={`/catalog/${ele?.name}`} key={i} onClick={() => { dispatch(setProgress(30)); shownav() }} className="p-2 text-sm">
                      <p className='text-light-richblack-5 dark:text-dark-richblack-5'>
                        {ele?.name}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </div>
            <div className='mt-4 mb-4 bg-light-richblack-600 dark:bg-dark-richblack-600 w-62 mx-auto h-[1px]'></div>
            {/* Other Links */}
            <div className='my-6 mx-4'>
              <Link to='/about' onClick={() => { setMobileMenuOpen(false) }} className="p-2">
                <p className=' dark:text-dark-richblack-5 text-light-richblack-5 '>
                  About
                </p>
              </Link>
              <Link to='/contact' onClick={() => { setMobileMenuOpen(false) }} className="p-2">
                <p className='dark:text-dark-richblack-5 text-light-richblack-5 '>
                  Contact
                </p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NavBar