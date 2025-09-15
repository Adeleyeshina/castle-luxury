
import type { IconType } from 'react-icons';
import { FaUserPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa';

interface NavLinkProps {
    icon : IconType,
    title : string,
    path : string
}
export const navLink : NavLinkProps [] = [
    {
        icon: FaUsers,
        title: 'Agent List',
        path: '/agents'
    },
    {
        icon: FaUserPlus,
        title: 'Add Agent',
        path: '/add-agent'
    },
    {
        icon: FaSignOutAlt,
        title: 'Logout',
        path: '/logout'
    },
]