import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';


const Footer = () => {
  return (
    <footer className="bg-[#dbdbce] shadow-lg py-6 mt-4">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-bold text-white mb-2">AVV Barrio De La Cruz</h1>
        <p className="text-white font-bold">© {new Date().getFullYear()}</p>
        <div className="flex justify-center mt-4">
          <a href="#" className="text-white hover:text-gray-500 mx-2">
             <FacebookOutlinedIcon />
          </a>
          <a href="#" className="text-white hover:text-gray-500 mx-2">
            <TwitterIcon />
            </a>
          <a href="#" className="text-white hover:text-gray-500 mx-2">
            {/* Social media icon 3 */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
