import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Login from "./Login";
import SignUp from "./Signup";
import Swal from 'sweetalert2';
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [SignupOpen, setSignupOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleSelectProfile = () => {
    closeDropdown();
  };

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePathClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsMenuOpen(false);
  };

  const handleSignupModal = () => {
    setSignupOpen(!SignupOpen);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userToken');
        localStorage.removeItem('UserId');
        localStorage.removeItem('likedJobs');
        setUserName(null);

        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        setIsMenuOpen(false);
        navigate('/');
        window.location.reload();
      }
    });
  };

  const navItems = [
    { path: "/", title: "Start a Search" },
    { path: "/post-job", title: "Post Job" },
    ...(userName ? [{ path: "/my-job", title: "My Jobs" }] : []),
    { path: "/browsejobs", title: "Browse Jobs" },
    { path: "/resume-analyzer", title: "AI Resume Analyzer" },
    { path: "/contact", title: "Contact Us" },
    { path: "/blog", title: "Blogs" },
  ];
  const handlePostJobClick = () => {
    if (!userName) {
      Swal.fire({
        title: 'Please log in or Sign up',
        text: 'You need to log in or sign up to post a job',
        icon: 'warning',
        confirmButtonText: 'Login',
        showCancelButton: true,
        cancelButtonText: 'Sign Up',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoginOpen(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setSignupOpen(true);
        }
      });
    } else {
      setIsMenuOpen(false);
      navigate('/post-job');
    }
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]);


  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 
        ${location.pathname === '/'
          ? isMobile
            ? 'bg-white shadow-lg'
            : isScrolled
              ? 'bg-white shadow-lg backdrop-blur-md'
              : 'bg-gradient-to-b from-black/40 to-transparent'
          : 'bg-white shadow-lg'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/weblogo.jpeg"
            alt="Aidifys Logo"
            className="h-auto max-h-14 w-auto max-w-xs object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-1" id="navbar">
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className={`${location.pathname === '/'
                ? (isScrolled ? 'text-gray-900' : 'text-white')
                : 'text-gray-900'
                }`}
            >
              {path === '/post-job' ? (
                <button
                  onClick={() => handlePostJobClick(path)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group
                    ${location.pathname === '/post-job' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                      : `${location.pathname === '/' && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:text-blue-600'}  hover:bg-gray-100 md:hover:bg-transparent`
                    }`}
                >
                  {title}
                  {path !== '/post-job' && (
                    <span className={`absolute left-4 right-4 bottom-0 h-0.5 ${location.pathname === '/' && !isScrolled ? 'bg-white' : 'bg-blue-600'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
                  )}
                </button>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                      : `${location.pathname === '/' && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:text-blue-600'} hover:bg-gray-100 md:hover:bg-transparent`
                    }`
                  }
                >
                  {title}
                  {!({ isActive: location.pathname === path }) && (
                    <span className={`absolute left-4 right-4 bottom-0 h-0.5 ${location.pathname === '/' && !isScrolled ? 'bg-white' : 'bg-blue-600'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Auth Buttons - Desktop */}
        <div className={`hidden lg:flex items-center gap-4 ${location.pathname === '/' ? (isScrolled ? 'text-gray-900' : 'text-white') : 'text-gray-900'}`}>
          {userName ? (
            <div className="relative inline-block group">
              <button
                onClick={toggleDropdown}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${location.pathname === '/' && !isScrolled 
                    ? 'border border-white/30 text-white hover:bg-white/10' 
                    : 'border border-gray-300 text-gray-900 hover:bg-gray-100'}`}
              >
                <span className="truncate max-w-[100px]">{userName}</span>
                {dropdownVisible ? (
                  <IoMdArrowDropup size={18} className="ml-2 flex-shrink-0" />
                ) : (
                  <IoMdArrowDropdown size={18} className="ml-2 flex-shrink-0" />
                )}
              </button>

              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <NavLink
                    to="/userprofile"
                    onClick={handleSelectProfile}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md mx-1"
                  >
                    👤 Show Profile
                  </NavLink>
                  <NavLink
                    to="/user-applied-jobs"
                    onClick={handleSelectProfile}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md mx-1"
                  >
                    📝 Applied Jobs
                  </NavLink>
                  <NavLink
                    to="/saved-jobs"
                    onClick={handleSelectProfile}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-md mx-1"
                  >
                    ❤️ Saved Jobs
                  </NavLink>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={handleLoginModal} 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 border
                ${location.pathname === '/' && !isScrolled 
                  ? 'border-white/30 text-white hover:bg-white/10' 
                  : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}
            >
              Log In
            </button>
          )}
          {userName ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleSignupModal}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {userName && (
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {dropdownVisible ? (
                <IoMdArrowDropup size={24} className="text-gray-900" />
              ) : (
                <IoMdArrowDropdown size={24} className="text-gray-900" />
              )}
            </button>
          )}
          <button
            onClick={handleMenuToggler}
            className={`p-2 rounded-lg transition-colors duration-200 ${location.pathname === '/' && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}`}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-40 md:hidden`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} aria-hidden="true"></div>

        <div className="relative flex flex-col h-screen bg-white w-80 max-w-full shadow-xl overflow-y-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" onClick={handlePathClick} className="flex items-center gap-2">
              <img
                src="/weblogo.jpeg"
                alt="Aidifys Logo"
                className="h-auto max-h-12 w-auto max-w-xs object-contain"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close Menu"
            >
              <FaTimes size={24} className="text-gray-900" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col gap-2 p-4">
            {navItems.map(({ path, title }) => (
              <li key={path}>
                {path === '/post-job' ? (
                  <button
                    onClick={() => { handlePostJobClick(path); handlePathClick(); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300
                      ${location.pathname === '/post-job' 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                        : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {title}
                  </button>
                ) : (
                  <NavLink
                    to={path}
                    onClick={handleNavLinkClick}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg font-medium transition-all duration-300
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                        : 'text-gray-700 hover:bg-gray-100'}`
                    }
                  >
                    {title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile User Section */}
          <div className="mt-auto p-4 border-t border-gray-200 space-y-3">
            {userName ? (
              <>
                <div className="px-4 py-2 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Logged in as</p>
                  <p className="font-semibold text-gray-900 truncate">{userName}</p>
                </div>

                <NavLink
                  to="/userprofile"
                  onClick={() => { handleSelectProfile(); handlePathClick(); }}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors duration-200
                    ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  👤 Show Profile
                </NavLink>

                <NavLink
                  to="/user-applied-jobs"
                  onClick={() => { handleSelectProfile(); handlePathClick(); }}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors duration-200
                    ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  📝 Applied Jobs
                </NavLink>

                <NavLink
                  to="/saved-jobs"
                  onClick={() => { handleSelectProfile(); handlePathClick(); }}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors duration-200
                    ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  ❤️ Saved Jobs
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginModal}
                  className="w-full py-2 px-4 border-2 border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Log In
                </button>

                <button
                  onClick={handleSignupModal}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-600/30"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      {isLoginOpen && (
        <Login
          setLoginOpen={setIsLoginOpen}
          setsignupOpen={setSignupOpen}
          setUserName={setUserName}
        />
      )}
      {SignupOpen && (
        <SignUp
          setsignupOpen={setSignupOpen}
          setLoginOpen={setIsLoginOpen}
          setUserName={setUserName}
        />
      )}
    </header>

  );
};

export default Navbar;
