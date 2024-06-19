import { HiOutlineMenu } from 'react-icons/hi';
import { Breadcrumb, ProfileDropdown } from '@/components';

export function HeaderPage() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[#C8CBD9] bg-white">
      <label
        htmlFor="my-drawer"
        className="drawer-button lg:hidden btn btn-ghost"
      >
        <HiOutlineMenu size={24} />
      </label>
      <Breadcrumb />
      <ProfileDropdown />
    </header>
  );
}
