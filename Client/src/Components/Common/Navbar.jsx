import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Service/Operation/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const Locpath = location.pathname.split('/').at(-1);

    const logoutButtonRef = useRef(null);

    const handleOnLogout = () => {
        dispatch(logout(navigate));
    };

    useEffect(() => {
        if (!token && logoutButtonRef.current) {
            logoutButtonRef.current.focus();
        }
    }, [token]);

    return (
        <nav className="bg-richblack-800 border border-richblack-700 p-4 fixed top-0 w-full z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className='hidden lg:block'>
                        <Link to="/" className="text-white font-bold text-lg">Logo</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ul className="flex space-x-6 text-white">
                            <li>
                                <Link to="/" className="hover:text-gray-300">Home</Link>
                            </li>
                            {token && Locpath !== "posts" && (
                                <li>
                                    <Link to="/posts" className="hover:text-gray-300">Posts</Link>
                                </li>
                            )}
                        </ul>
                        {token ? (
                            <button
                                ref={logoutButtonRef}
                                onClick={handleOnLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                aria-label="Logout"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex space-x-4">
                                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                                <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
