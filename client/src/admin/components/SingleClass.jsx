import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const SingleClass = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [Class, setClass] = useState({
    name: item.name,
    location: item.location,
    price: item.price,
    teacher: item.teacher,
  });

  const handleDelete = () => {
    // Logica voor het verwijderen van de klas
  };

  const handleUpdate = () => {
    // Logica voor het bijwerken van de klas
  };

  const handleEdit = (field, value) => {
    setIsEditing(true);
    setClass((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setClass({
      name: item.name,
      location: item.location,
      price: item.price,
      teacher: item.teacher,
    });
  };

  const handleSave = () => {
    // Logica voor het opslaan van de bijgewerkte klasnaam
    setIsEditing(false);
  };
console.log(Class)
  console.log(item);
  return (
    <div className="bg-white rounded-md p-4 mb-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={Class.name}
              onChange={(e) => handleEdit("name", e.target.value)}
              className="w-full rounded-md py-2 px-3 mr-2"
            />
            <input
              type="text"
              value={Class.location}
              onChange={(e) => handleEdit("location", e.target.value)}
              className="w-full rounded-md py-2 px-3 mr-2"
            />
            <input
              type="text"
              value={Class.price}
              onChange={(e) => handleEdit("price", e.target.value)}
              className="w-full rounded-md py-2 px-3 mr-2"
            />
            <input
              type="text"
              value={Class.teacher}
              onChange={(e) => handleEdit("teacher", e.target.value)}
              className="w-full rounded-md py-2 px-3 mr-2"
            />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="mr-2"   onClick={() => handleEdit("name", item.name)}
            >Nombre: {item.name}</div>
       
            <div className="mr-2">Ubicacion: {item.location}</div>
           
            <div className="mr-2">Precio: {item.price}</div>
         
            <div className="mr-2">Profesor: {item.teacher}</div>
            <EditIcon
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
        {isEditing ? (
          <div className="flex">
            <CheckIcon onClick={handleSave} className="cursor-pointer" />
            <CloseIcon onClick={handleCancel} className="cursor-pointer" />
          </div>
        ) : (
          <DeleteIcon onClick={handleDelete} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default SingleClass;
