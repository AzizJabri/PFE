import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto ">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Let's change it up a bit
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </p>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Find a class
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/image2.jpg",},
  {
    id: 2,
    src: "/images.jpg",
  },
  {
    id: 3,
    src: "/image3.jpeg",
  },
  {
    id: 4,
    src: "/image4.webp",
  },
  {
    id: 5,
    src: "/home1.jpg",
  },
  {
    id: 6,
    src: "/home2.png",
  },
  {
    id: 7,
    src: "/clo2.jpg",
  },
  {
    id: 8,
    src: "/home4.jpg",
  },
  {
    id: 9,
    src: "/tech1.jpg",
  },
  {
    id: 10,
    src: "/tech2.jpg",
  },
  {
    id: 11,
    src: "/tech3.avif",
  },
  {
    id: 12,
    src: "/tech3.webp",
  },
  {
    id: 13,
    src: "/shop.jpg",
  },
  {
    id: 14,
    src: "/home3.jpg",
  },
  {
    id: 15,
    src: "/plant.jpg",
  },
  {
    id: 16,
    src: "/clo1.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;