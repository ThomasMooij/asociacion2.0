import { useQuery } from "@tanstack/react-query";
import newRequest from "../../functions/newRequest";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import NavBar from "../NavBar";
import Banner from "../Banner";
import ScrollToTop from "../../functions/ScrollToTop";

const ClassPhotos = ({ collectionName, classTitle }) => {
  const location = useLocation();

  const [arrayNum, setArrayNum] = useState(0);
  const [slideNum, setSlideNum] = useState(0);
  const [arrayName, setArrayName] = useState("");
  const [name, setName] = useState(collectionName || location.state);
  const [open, setOpen] = useState(false);

  ScrollToTop()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [name],
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    queryFn: () =>
      newRequest.get(`/pics/${name}`).then((res) => {
        return res.data;
      }),
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setArrayName(data.collections[0].title);
    }
  }, [data]);

  const handleArray = (direction) => {
    let newArrayNum;
    const collectionsLength = data?.collections.length || 0;
  
    if (direction === "left") {
      newArrayNum = arrayNum === 0 ? collectionsLength - 1 : arrayNum - 1;
    } else {
      newArrayNum = arrayNum === collectionsLength - 1 ? 0 : arrayNum + 1;
    }
  
    if (newArrayNum < 0) {
      newArrayNum = collectionsLength - 1;
    } else if (newArrayNum >= collectionsLength) {
      newArrayNum = 0;
    }
  
    setArrayNum(newArrayNum);
    setArrayName(data?.collections[newArrayNum]?.title || "");
  };
  

  const serverBaseUrl = "http://localhost:8080";

  console.log("count:", data?.collections);

  const openImage = (i) => {
    setOpen(true);
    setSlideNum(i);
  };
  const handleSlides = (direction, length) => {
    let newSlide;

    if (direction === "left") {
      newSlide = slideNum === 0 ? length : slideNum - 1;
    } else {
      newSlide = slideNum === length ? 0 : slideNum + 1;
    }
    setSlideNum(newSlide);
  };

  return (
    <>
      {location.state && <NavBar />}
      {!open && (
        <section className="w-screen h-screen flex flex-col justify-center items-center gap-15">
          <Banner title={classTitle ? `fotos de la clasa${classTitle}` : location.state} />
          <header className="flex items-center justify-center z-99 h-14">
            {data?.collections.length > 1 && (
              <div className="rounded-full bg-white cursor-pointer" onClick={() => handleArray("left")} ><ArrowLeftIcon /></div>
            )}
            {data?.collections.length && !location.state > 0 && <h2>{arrayName}</h2>}
            {data?.collections.length > 1 && (
              <div className="rounded-full bg-white cursor-pointer" onClick={() => handleArray("right")}><ArrowRightIcon  /></div>
            )}
          </header>
          <div className="grid grid-cols-3 gap-5">
            {isLoading ? (
              <p>Un momento</p>
            ) : error ? (
              <p>Algo no salio como deberia</p>
            ) : (
              <>
                {data?.collections?.map((img) => {
                  return img.title === arrayName
                    ? img.images.map((image, i) => (
                        <article key={i} className="w-full">
                          <img
                            key={image}
                            className="w-full h-40 cursor-pointer object-cover"
                            onClick={() => openImage(i)}
                            src={`${serverBaseUrl}${image}`}
                            alt=""
                          />
                        </article>
                      ))
                    : null;
                })}
              </>
            )}
          </div>
        </section>
      )}
      {open && (
        <section className="fixed top-0 left-0 w-full h-full bg-gray-300 z-999 flex items-center justify-center">
          <article className="absolute top-5 right-5 text-black text-3xl cursor-pointer">
            <CloseIcon onClick={() => setOpen(false)} />
          </article>
          <article className="w-full h-full flex justify-center items-center">
            {data.collections.map((collection) => {
              if (collection.title === arrayName) {
                return (
                  <>
                    <article
                      onClick={() =>
                        handleSlides("left", collection.images.length)
                      }
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-2"
                    >
                      <ArrowLeftIcon />
                    </article>
                    <img
                      className="object-contain max-w-3/4 max-h-3/4"
                      src={`${serverBaseUrl}${collection.images[slideNum]}`}
                      alt=""
                    />
                    <article
                      onClick={() =>
                        handleSlides("right", collection.images.length)
                      }
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2"
                    >
                      <ArrowRightIcon />
                    </article>
                  </>
                );
              } else {
                return null;
              }
            })}
          </article>
        </section>
      )}
    </>
  );
};

export default ClassPhotos;
