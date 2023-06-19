import { Link } from "react-router-dom";

const ClassCard = ({ item }) => {
  const days = item?.days?.length;
  const secondLastDay = item?.days?.length - 1;
  let renderDays = [];

  for (let i = 0; i < days; i++) {
    if (i !== secondLastDay) {
      renderDays.push(item.days[i].day + " ");
    }
    if (i == secondLastDay && secondLastDay.length >= 2) {
      renderDays.push(item.days[i].day);
      renderDays.splice(secondLastDay, 0, "y ");
    } else {
      renderDays.push(item.days[i].day);
    }
  }
  return (
    <Link
      to={`/class/${item?._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <section className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <img
          src="https://media.istockphoto.com/id/1047570732/vector/english.jpg?s=612x612&w=0&k=20&c=zgafUJxCytevU-ZRlrZlTEpw3mLlS_HQTIOHLjaSPPM="
          className="w-full h-auto"
          alt="Card Image"
        />
        <article className="p-4">
          <header className="text-xl font-bold">{item.name}</header>
        </article>
        <article className="px-4">{renderDays}</article>
        <article className="px-4">
          {item.price === 0 ? "Gratis" : item.price + " euro"}
        </article>
        <article className="px-4 pb-4">{item.location}</article>
      </section>
    </Link>
  );
};

export default ClassCard;
