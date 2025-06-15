import { useState } from 'react';

type DeveloperCardType = {
  name: string;
  img: string;
  imgHover: string;
  bounceUpIndexes: number[];
  bounceDownIndexes: number[];
};

const DeveloperCard = ({ name, img, imgHover, bounceUpIndexes, bounceDownIndexes }: DeveloperCardType) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <li
      className="group flex cursor-pointer items-end"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div className="flex">
        {[...name].map((letter, index) => {
          let className = 'about-developer-name';

          if (bounceUpIndexes.includes(index)) {
            className += isHovered ? ' bounce-up' : ' bounce-up-reset';
          } else if (bounceDownIndexes.includes(index)) {
            className += isHovered ? ' bounce-down' : ' bounce-down-reset';
          }

          return (
            <span key={index} className={className}>
              {letter}
            </span>
          );
        })}
      </div>

      <div className="relative flex h-40 w-40 items-end">
        <img
          src={img}
          alt="developer"
          className="absolute h-full w-full opacity-100 transition-opacity duration-600 ease-in-out group-hover:opacity-0"
        />
        <img
          src={imgHover}
          alt="developer"
          className="absolute ml-7 w-25 opacity-0 transition-opacity duration-600 ease-in-out group-hover:opacity-100"
        />
      </div>
    </li>
  );
};

export default DeveloperCard;
