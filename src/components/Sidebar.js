import React, { useEffect, useState, useContext } from "react";
//import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  BuildingOfficeIcon,
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
  // const classes = classNames({
  //   "px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex": true,
  //   "text-gray-600 hover:text-blue-500 transform hover:translate-x-1 transition ease-in-out duration-100":
  //     !isCurrentRoute,
  //   "bg-gradient text-gray-100 shadow-lg": isCurrentRoute,
  // });
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
                  // <a
                  //   key={item.name}
                  //   href={item.href}
                  //   className={classNames(
                  //     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  //     'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  //   )}
                  // >
                  //   <item.icon
                  //     className={classNames(
                  //       item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                  //       'mr-3 flex-shrink-0 h-6 w-6'
                  //     )}
                  //     aria-hidden="true"
                  //   />
                  //   {item.name}
                  // </a>
                ))}
              </nav>
            </div>
          </div>
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
