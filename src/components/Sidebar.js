import React, { useContext } from "react";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  ChartBarIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";

const navigation = [
  { name: 'Dashboard',path: "dashboard", icon: HomeIcon, allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Users', path: 'systemUsers', icon: UsersIcon, allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Employees', path: 'companyUsers', icon: UsersIcon, allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Companies', path: 'companies', icon: BuildingOfficeIcon, allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Calendar', path: '#', icon: CalendarIcon, allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Documents', path: '#', icon: InboxIcon, allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Reports', path: 'report', icon: ChartBarIcon, allowedRoles: ["admin", "clientAccess", "HRUser"] },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const { role } = auth.authState.userInfo;const NavItem = ({ navItem }) => {
  const location = useLocation();
  const isCurrentRoute = location.pathname === `/${navItem.path}`;
  return (
    <Link to={navItem.path} >
      <a
        key={navItem.name}
        href={navItem.path}
        className={classNames(
          isCurrentRoute ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
        )}
      >
        <navItem.icon
          className={classNames(
            isCurrentRoute ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
            'mr-3 flex-shrink-0 h-6 w-6'
          )}
          aria-hidden="true"
        />
        {navItem.name}
      </a>
    </Link>
  );
};

  return (
    <>
       {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((navItem) => (
                  navItem.allowedRoles.includes(role) && (
                    <NavItem
                      navItem={navItem}
                    />
                  )
                ))}
              </nav>
            </div>
          </div>
        </div>
    </>
  );
};

export default Sidebar;
