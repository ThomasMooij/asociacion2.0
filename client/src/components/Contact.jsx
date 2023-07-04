import Banner from "./Banner"

const ContactForm = () => {
  return (
    <>
   
   
    <main className='w-screen h-full max-w-full flex flex-col items-center'>
    <Banner title="Pongase en contacto con nosotros" />
    <div className="w-[60%] p-6 bg-beige rounded-lg shadow-md border-2 border-yellow-500">
      <h2 className="text-xl font-bold mb-4">Contactformulier</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Naam:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border-2 border-gray-300 p-2 rounded"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border-2 border-gray-300 p-2 rounded"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">
            Bericht:
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full border-2 border-gray-300 p-2 rounded"
            ></textarea>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-300"
          >
          Verzenden
        </button>
      </form>
    </div>
  </main>
  </>
  );
};

export default ContactForm;
