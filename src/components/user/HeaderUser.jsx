import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from '@/assets/logo.png';
import { FilledButton } from '@/components';

export function HeaderUser() {
  const location = useLocation();
  const links = [
    { text: 'Back to Home', url: '/' },
    { text: 'Why Choose Us', url: '/#about-us' },
    { text: 'Our Menu', url: '/#menu' },
  ];

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white px-4 sm:px-16 py-2 sm:py-4 flex justify-between items-center border-b border-gray-200">
      <nav className="flex justify-between items-center w-full">
        <img
          src={Logo}
          alt="Menu Mager"
          className="h-6"
        />
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ul className="hidden sm:flex items-center space-x-2 sm:space-x-4">
            {links.map(
              (link, index) =>
                ((location.pathname === '/' && link.text !== 'Back to Home') ||
                  (location.pathname !== '/' && link.text === 'Back to Home')) && (
                  <li key={index}>
                    <Link
                      to={link.url}
                      className="btn btn-ghost btn-sm hover:bg-transparent hover:underline hover:font-semibold hover:text-primary"
                    >
                      {link.text}
                    </Link>
                  </li>
                )
            )}
          </ul>
          {location.pathname === '/' && (
            <>
              <div className="border-l border-gray-300 mx-1 sm:mx-3 h-5"></div>
              <Link to="/order/select-plan">
                <FilledButton>Order Now</FilledButton>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
