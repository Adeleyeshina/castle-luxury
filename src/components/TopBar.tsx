// src/components/Topbar.tsx
import { FaBars } from 'react-icons/fa';

interface TopbarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
  mobileOpen: boolean;
  toggleMobile: () => void;
}

const Topbar: React.FC<TopbarProps> = ({  toggleCollapse, toggleMobile }) => {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow sticky top-0 z-50">
      <button onClick={toggleMobile} className="text-primary md:hidden" aria-label="Toggle sidebar">
        <FaBars size={24} className='cursor-pointer'/>
      </button>
      <button
        onClick={toggleCollapse}
        className="hidden md:block text-primary"
        aria-label="Toggle collapse sidebar"
      >
        <FaBars size={24} className='cursor-pointer'/>
      </button>
      <div className="text-xl font-bold text-primary py-2">Agent Panel</div>
      <div>{/* Add right side stuff here */}</div>
    </header>
  );
};

export default Topbar;
