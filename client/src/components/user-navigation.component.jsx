import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { DataContext } from "../context/DataProvider";

const UserNavigationPanel = () => {
  const { account } = useContext(DataContext);
 
  const { setIsAuthenticated, setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setAccount({ username: "" });
    navigate("/account");
  };

  return (
    <AnimationWrapper transition={{ duration: 0.2 }} className="absolute right-0 z-50">
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200">
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-edit text-2xl"></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${account.username}`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="link pl-8 py-4">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="link pl-8 py-4">
         Settings
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>
        <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4" onClick={logout}>
            <h1 className="font-bold text-xl mb:1">Sign Out</h1>
            <p className="text-dark-grey">@{account.username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
