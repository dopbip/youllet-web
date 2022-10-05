import React, { useEffect, useState, useContext } from "react";
//import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Link, useLocation } from "react-router-dom";
import logo from "./../images/logo.png";
import { AuthContext } from "./../context/AuthContext";
import { FetchContext } from "../context/FetchContext";
import axios from "axios";

const navigation = [
  { name: 'Dashboard',path: "dashboard", icon: HomeIcon, current: true, allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Team', path: '#', icon: UsersIcon, current: false,  allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Projects', path: '#', icon: FolderIcon, current: false,  allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Calendar', path: '#', icon: CalendarIcon, current: false,  allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Documents', path: '#', icon: InboxIcon, current: false,  allowedRoles: ["admin", "clientAccess", "HRUser"] },
  { name: 'Reports', path: '#', icon: ChartBarIcon, current: false,  allowedRoles: ["admin", "clientAccess", "HRUser"] },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const NavItemContainer = ({ children }) => <div>{children}</div>;

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [badgeHRUserInvisibility, setBadgeHRUserInvisibility] = useState(true);
  const [badgeHRUserCount, setBadgeHRUSerCount] = useState(0);
  const [badgeInvoiceCount, setBadgeInvoiceCount] = useState(0);
  const [badgeEmployeeCredit, setBadgeEmployeeCredit] = useState(0);
  const fetchContext = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const { role } = auth.authState.userInfo;
  const { _id } = auth.authState.userInfo;
      
  
const NavItem = ({ navItem }) => {
  const location = useLocation();
  const isCurrentRoute = location.pathname === `/${navItem.path}`;
  const classes = classNames({
    "px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex": true,
    "text-gray-600 hover:text-blue-500 transform hover:translate-x-1 transition ease-in-out duration-100":
      !isCurrentRoute,
    "bg-gradient text-gray-100 shadow-lg": isCurrentRoute,
  });
  return (
    <Link to={navItem.path} className={classes}>
      <div className="flex items-center">
        <div className="mr-0 sm:mr-4">
          {/* {navItem.hasBadge = (navItem.badgeName==='companiesHR') ? (
            <Badge
              badgeContent={badgeHRUserCount}
              color="primary"
              invisible={badgeHRUserInvisibility}
            >
              <FontAwesomeIcon icon={navItem.icon} />
            </Badge>
          ) : ( */}
            <FontAwesomeIcon icon={navItem.icon} />
          {/* )} */}
        </div>
        <span className="hidden sm:block">{navItem.label}</span>
      </div>
    </Link>
  );
};

  useEffect(() => {
    (async () => {
      try {
        if (role === "admin") {
          const { data } = await fetchContext.authAxios.post(
            "getCountCompanyHasNoHR"
          );
           
          let count = data.arrCount;
          console.log(count)
          if (count > 0) {
            setBadgeHRUSerCount(count);
            setBadgeHRUserInvisibility(false);
          }
        }
         else if (role === "clientAccess") {
          const { data } = await fetchContext.authAxios.post(
            "getCountCompanyHasNoHR",
            { createdBy: _id }
          );
          let count = data.arrCount
          console.log(count)
          if (count > 0) {
            setBadgeHRUSerCount(count);
            setBadgeHRUserInvisibility(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
    // return () => {
    //   source.cancel("Cancelled due to stale request");
    // };
  }, [fetchContext.authAxios, _id, role]);

  return (

    <>
       <div className="mt-5 h-0 flex-1 overflow-y-auto">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                )}
              >
                <item.icon
                  className={classNames(
                    item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                    'mr-4 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
    </>



    // <section className="h-screen">
    //   <div className="w-16 sm:w-24 m-auto">
    //     {/* <img src={logo} rel="logo" alt="Logo" /> */}
    //   </div>
    //   <div className="mt-20">
    //     {navigation.map((navItem, i) => (
    //       <NavItemContainer key={i}>
    //         {navItem.allowedRoles.includes(role) && (
    //           <NavItem
    //             navItem={navItem}
    //           />
    //         )}
    //       </NavItemContainer>
    //     ))}
    //   </div>
    // </section>
  );
};

export default Sidebar;
