import { SocialIcon } from 'react-social-icons';

export function FooterUser() {
  return (
    <footer className="py-6 border-t border-gray-200 flex flex-col sm:flex-row justify-around items-center">
      <div className="text-center text-gray-600 text-sm mb-4 sm:mb-0">
        &copy; 2024 <b>MenuMager</b> All Rights Reserved
      </div>
      <div className="flex gap-4">
        <SocialIcon
          url="https://www.facebook.com/"
          style={{ height: 24, width: 24 }}
          target="_blank"
        />
        <SocialIcon
          url="https://www.instagram.com/"
          style={{ height: 24, width: 24 }}
          target="_blank"
        />
        <SocialIcon
          url="https://www.x.com/"
          style={{ height: 24, width: 24 }}
          target="_blank"
        />
      </div>
    </footer>
  );
}
