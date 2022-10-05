import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvatarDropdown from './AvatarDropdown';



const Navbar = () => {
  return (
    <nav className="flex justify-between px-4">
      <div className="">
        {/* <SearchInput /> */}
      </div>
      <div className="">
        <AvatarDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
