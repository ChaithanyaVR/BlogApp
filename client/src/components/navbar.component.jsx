import { useContext, useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/images/bebo-logo.png";
import { DataContext } from "../context/DataProvider";
import { categories } from "../constants/data";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [usernavpanel, setUserNavPanel] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const { setIsAuthenticated, setAccount } = useContext(DataContext);
  const navigate = useNavigate();


 const handleUserNavpanel = () =>{
    setUserNavPanel(curval => !curval);
 }

 const handleBlur = () =>{
  setTimeout(()=>{
    setUserNavPanel(false);
  },200);
 }

 

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBoxVisibility ? "show" : "hide")
          }
        >
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="search"
              className="w-full bg-grey-50 p-4 pl-6 pr-12 rounded-full placeholder:text-dark-grey md:pl-12"
            />
            <i className="fi fi-br-search absolute right-4 top-1/2 -translate-y-1/2 text-dark-grey text-xl"></i>
          </div>

          {/* <button onClick={logout}>Logout</button> */}
        </div>
        <div className="flex items-center bg-white gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey border-none w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => {
              setSearchBoxVisibility((currentValue) => !currentValue);
            }}
          >
            <i className="fi fi-br-search text-xl"></i>
          </button>
          <Link
            to="/editor"
            className="hidden md:flex gap-2 link"
          >
            <i className="fi fi-rr-edit text-2xl"></i>
            <p>Write</p>
          </Link>

          {accessToken ? (
            <>
              <Link to="#">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                </button>
              </Link>

              <div className="relative bg-black/60 rounded-full w-12 h-12" tabIndex={0} onClick={handleUserNavpanel} onBlur={handleBlur}>
                <button className="w-full h-full">
                  <i className="fi fi-rr-user text-white text-2xl block mt-1"></i>
                </button>
                {usernavpanel ? <UserNavigationPanel /> : " "}
              </div>
            </>
          ) : (
            <Link className="btn-dark py-2 hidden md:block" to="/account">
              Sign Up
            </Link>
          )}
        </div>
      </nav>
            <Outlet/>
    </>
  );
};

export default Navbar;
