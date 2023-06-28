import NavItem from "./NavItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const NavBar = ({ topPage, selectedPage, setSelectedPage }) => {

  const backgroundColor = topPage ? "" : "bg-[#dbdbce]";
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if(isHomePage) {
    return (
  <nav className={`${backgroundColor} max-w-full fixed top-0 z-2999 w-full p-4 mb-3`}>
    <div className="w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
    {/* LOGO */}
      <article className="pl-4 flex items-center border-r-2 divide-orange-600 p-4 flex-col">
        <h2 className="text-red-600 text-2xl font-bold">AVV Barrio de la Cruz</h2>
        <h2 className="text-red-600 text-2xl font-bold">Granada</h2>
      </article>
      {/* MAIN CONTENT */}
      <div className="hidden md:flex gap-x-10 text-center">
      <NavItem
          page={"Inicio"}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          setMobile={setMobile}
          />
        <NavItem
          page={"Clases"}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          setMobile={setMobile}
          />
        <NavItem
          page={"Agenda"}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          setMobile={setMobile}
          />
        <NavItem
          page={"Photos"}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          setMobile={setMobile}
          />
           <NavItem
          page={"Contacto"}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          setMobile={setMobile}
          />
      </div>
      {/* CONTACT INFO */}
      <div className="">
        <article className=" md:border-l-2 divide-orange-600 p-4 grid grid-cols-3 place-items-center">
          <div className="hidden md:flex flex-col items-center  cursor-pointer">
            <span>ESP</span>
            <ArrowDropDownIcon />
          </div>
          <div className="hidden md:block">
            <h2>Address: SomePlace 111</h2>
            <h2>Phone: SomeNumber</h2>
          </div>
        </article>
      </div>
      {/* MOBILE MENU */}
      {!mobile ? (
        <div
        onClick={() => setMobile(true)}
        className="cursor-pointer hover:bg-red-500 md:hidden"
        >
          <MenuIcon />
        </div>
      ) : (
        <ul
        className={
          !mobile
          ? "hidden"
          : "md:hidden absolute text-white top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center gap-6"
        }
        >
          <CloseIcon
            className="cursor-pointer hover:text-red-600"
            onClick={() => setMobile(false)}
            />
          <NavItem
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
            page={"Inicio"}
            setMobile={setMobile}
            />
          <NavItem
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          page={"Clases"}
          setMobile={setMobile}
          />
          <NavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            page={"Agenda"}
            setMobile={setMobile}
            />
            
            <NavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            page={"Photos"}
            setMobile={setMobile}
          />
             <NavItem
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            page={"Contacto"}
            setMobile={setMobile}
            />
        </ul>
      )}
    </div>
    </nav>
 ) } else {
  return (
    <div className="w-screen h-[95px] bg-black text-white flex justify-center items-center max-w-full">  
      <Link
        className="self-center bg-black text-white rounded-3xl p-2 m-2 hover:text-blue-500"
        to="/"
      >
        <ArrowLeftIcon /> Volver al inicio
      </Link>
        AVV BARRIO DE LA CRUZ
    </div>
  )
 }



};

export default NavBar;
