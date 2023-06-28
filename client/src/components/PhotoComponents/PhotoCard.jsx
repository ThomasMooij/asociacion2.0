import { Link } from "react-router-dom";

const PhotoCard = ({item}) => {

const serverBaseUrl = "http://localhost:8080";
  return (
    <div>    
        <Link
          to="/foto"
          state={item.title}
          key={item.title}
          >
          <div className="flex flex-col items-center justify-center h-96 bg-gray-200 rounded-lg overflow-hidden hover:cursor-pointer">
            <img
              className="w-full h-4/5 object-cover"
              src={`${serverBaseUrl}${item.images[0]}`}
              alt=""
            />
            <h2 className="text-lg font-bold mt-4">{item.title}</h2>
          </div>
        </Link>   
    </div>
  )
}

export default PhotoCard
