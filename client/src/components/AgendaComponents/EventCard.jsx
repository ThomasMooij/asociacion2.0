import { Link } from "react-router-dom";


const EventCard = ({item}) => {

    console.log("eventCardItem:" , item)
  return (
    <main
    to={`/events/${item._id}`}
    className="mt-2 border-2 border-black flex  h-full w-[80%] text-white justify-evenly"
    style={{ textDecoration: "none", color: "inherit" }}
  >
    
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Lo que vamos a hacer</h2>
        <article>{item.name}</article>
      </section>
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Direccion y fecha</h2>
        <div className="flex mb-4">
          <article className="font-semibold">Direccion:</article>
          <article>{item.location}</article>
        </div>
        <div className="flex">
          <article className="font-semibold">El dia</article>
          <article>{item.day}</article>
        </div>
      </section>
  </main>
  )
}

export default EventCard
