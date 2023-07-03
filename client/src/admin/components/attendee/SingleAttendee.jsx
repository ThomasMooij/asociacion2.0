const SingleAttendee = ({ item }) => {
    console.log(item)
    return (
      <div className="singleAttendee bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-500 mb-2">Clase: {item.className}</p>
        <p className="text-gray-500">Telefoonnummer: {item.phone}</p>
        <p className="text-gray-500">E-mail: {item.email}</p>
        {
            item.days.map((day) => (
                <p className="text-gray-500"> {day}</p>
            ))
        }
      </div>
    );
  };
  
  export default SingleAttendee;