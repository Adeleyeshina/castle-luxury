// src/components/Topbar.tsx
import { FaBars } from 'react-icons/fa';
import Logo from '../assets/images/Logo.png'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface TopbarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
  mobileOpen: boolean;
  toggleMobile: () => void;
}

const Topbar: React.FC<TopbarProps> = ({  toggleCollapse, toggleMobile }) => {
  const user = useAuthStore((s)=>s.user)
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
      <div>
        <Link to={"/"}>
          <img src={Logo} alt="Castle luxury" className='w-[100px] md:w-[130px]'/>
        </Link>
        
      </div>
      <div>
      </div>
    </header>
  );
};

export default Topbar;
