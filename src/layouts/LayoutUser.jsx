import { FooterUser, HeaderUser } from '@/components';

export function LayoutUser({ children, className = 'flex-1' }) {
  return (
    <div className="min-h-screen flex flex-col justify-between px-8">
      <HeaderUser />
      <main className={`${className}`}>{children}</main>
      <FooterUser />
    </div>
  );
}
