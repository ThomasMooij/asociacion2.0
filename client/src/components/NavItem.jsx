import {Link} from 'react-scroll';

const NavItem = ({ 
    page,
    selectedPage,
    setSelectedPage,
    setMobile,
  }) => {

  const lowerCasePage = page.toLowerCase().replace(/ /g, "") 
  const isPage = selectedPage === lowerCasePage ? "text-green-500 border-b-2" : ""
  const active= "text-green-500 "

  return (
    <Link 
    activeClass={active}
    page={page} 
    selectedPage={selectedPage}
    onClick={()=> {setSelectedPage(lowerCasePage); setMobile(false)}}
    to={page || "/"} 
    smooth={true} 
    offset={-250} 
    duration={500}
    spy={true}
    className={`${isPage} border-none cursor-pointer text-2xl hover:text-green-500 active:text-green-500`}>{page}</Link>
   
  )
}

export default NavItem