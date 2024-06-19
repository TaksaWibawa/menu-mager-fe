import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiChevronDown, HiChevronUp, HiCog, HiLogout, HiUser } from 'react-icons/hi';
import { MenuButton } from '../buttons';
import { useToast } from '@/hooks';
import { resetAdminState } from '@/slices';

export function ProfileDropdown({ avatar, name, email }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onLogout = () => {
    try {
      Cookies.remove('token');
      dispatch(resetAdminState());
      showToast('Logout success', 'success');
      navigate('/dashboard/login');
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <details
      className="dropdown"
      onClick={toggleDropdown}
    >
      <summary
        tabIndex="0"
        className="m-1 btn btn-ghost"
      >
        <img
          src={avatar || 'https://ui-avatars.com/api/?name=admin&color=ffffff&background=006400'}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="ml-2 flex flex-col justify-center items-start gap-1 max-w-28">
          <p className="font-semibold truncate">{name || 'Admin'}</p>
          <p className="text-xs text-[#666] truncate w-full">{email || 'admin@gmail.com'}</p>
        </div>
        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
      </summary>
      <ul
        tabIndex="0"
        className="p-2 mt-1 shadow-lg menu dropdown-content bg-base-100 rounded-box w-full flex flex-col gap-2 border border-gray-200"
      >
        <MenuButton icon={HiUser}>Profile</MenuButton>
        <MenuButton icon={HiCog}>Settings</MenuButton>
        <hr className="dropdown-divider" />
        <MenuButton
          icon={HiLogout}
          onClick={onLogout}
          className="text-error hover:bg-red-500 hover:text-white"
        >
          Logout
        </MenuButton>
      </ul>
    </details>
  );
}

ProfileDropdown.propTypes = {
  id: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
};
