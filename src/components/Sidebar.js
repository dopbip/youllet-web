import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames";
import Badge from "@material-ui/core/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartPie,
  faBuilding,
  faUsers,
  faCheckCircle,
  faUserTie,
  faMoneyCheck,
  faFileInvoice,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import logo from "./../images/logo.png";
import { AuthContext } from "./../context/AuthContext";
import { FetchContext } from "../context/FetchContext";
import axios from "axios";

// const userId = auth.authState.userInfo._id;
// useEffect(() => {
//   effect
//   return () => {
//     cleanup
//   }
// }, [input])
const navItems = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: faChartLine,
    hasBadge: false,
    allowedRoles: ["admin", "clientAccess", "HRUser"],
  },
  {
    label: "Companies",
    path: "companies",
    icon: faBuilding,
    hasBadge: false,
    allowedRoles: ["clientAccess", "admin"],
  },
  {
    label: "Report",
    path: "report",
    icon: faChartPie,
    hasBadge: false,
    allowedRoles: ["admin"],
  },
  {
    label: "Users",
    path: "systemUsers",
    icon: faUsers,
    hasBadge: false,
    allowedRoles: ["admin"],
  },
  {
    label: "Approvals",
    path: "approval",
    icon: faCheckCircle,
    hasBadge: false,
    allowedRoles: ["admin"],
  },
  {
    label: "HR",
    path: "companiesHR",
    icon: faUserTie,
    hasBadge: true,
    badgeName: "companiesHR",
    allowedRoles: ["admin", "clientAccess"],
  },
  {
    label: "Invoice",
    path: "invoice",
    icon: faFileInvoice,
    hasBadge: true,
    allowedRoles: ["HRUser", "admin"]
  },
  {
    label:'Employees Credits',
    path: 'companyUsers',
    icon:faUsers,
    hasBadge: true,
    allowedRoles: ["HRUser"]
  },
  {
    label: "Bank Details",
    path:"bankDetails",
    icon: faMoneyCheck,
    hasBadge: false,
    allowedRoles: ["admin", "HRUser"]
  },
  {
    label: "Employees settings",
    path: "employeesSettings",
    icon: faUsersCog,
    hasBadge: false,
    allowedRoles: ["HRUser"]
  }
];



const NavItemContainer = ({ children }) => <div>{children}</div>;

const Sidebar = () => {
  //const [pendingHRCount, setPendingHRCount] = useState();
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
          {navItem.hasBadge = (navItem.badgeName==='companiesHR') ? (
            <Badge
              badgeContent={badgeHRUserCount}
              color="primary"
              invisible={badgeHRUserInvisibility}
            >
              <FontAwesomeIcon icon={navItem.icon} />
            </Badge>
          ) : (
            <FontAwesomeIcon icon={navItem.icon} />
          )}
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
    <section className="h-screen">
      <div className="w-16 sm:w-24 m-auto">
        {/* <img src={logo} rel="logo" alt="Logo" /> */}
      </div>
      <div className="mt-20">
        {navItems.map((navItem, i) => (
          <NavItemContainer key={i}>
            {navItem.allowedRoles.includes(role) && (
              <NavItem
                navItem={navItem}
              />
            )}
          </NavItemContainer>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
