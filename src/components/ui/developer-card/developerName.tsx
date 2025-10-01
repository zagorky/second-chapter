import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../button/button';

type DeveloperNameType = {
  name: string;
  img: string;
  imgHover: string;
  bounceUpIndexes: number[];
  bounceDownIndexes: number[];
  onClick: () => void;
  isActive: boolean;
};

const DeveloperName = ({
  name,
  img,
  imgHover,
  bounceUpIndexes,
  bounceDownIndexes,
  onClick,
  isActive = false,
}: DeveloperNameType) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div
        className="group flex cursor-pointer items-end"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            onClick();
          }
        }}
      >
        <div className="flex">
          {[...name].map((letter, index) => {
            let className = 'about-developer-name typeography-clamp-sm';

            if (bounceUpIndexes.includes(index)) {
              className += isHovered ? ' bounce-up' : ' bounce-up-reset';
            } else if (bounceDownIndexes.includes(index)) {
              className += isHovered ? ' bounce-down' : ' bounce-down-reset';
            }

            return (
              <span key={`dev-${index.toString()}`} className={className}>
                {letter}
              </span>
            );
          })}
        </div>
        <div className="relative flex h-[clamp(150px,15vw,200px)] w-[clamp(150px,15vw,200px)] items-end">
          <img
            src={img}
            alt="developer"
            className="absolute h-full w-full opacity-100 transition-opacity duration-600 ease-in-out group-hover:opacity-0"
          />
          <img
            src={imgHover}
            alt="developer"
            className="absolute ml-7 w-[clamp(100px,7vw,120px)] opacity-0 transition-opacity duration-600 ease-in-out group-hover:opacity-100"
          />
        </div>
        <div className="flex h-[clamp(150px,15vw,200px)] items-center">
          <Button variant={'default'}>{isActive ? <ChevronUp /> : <ChevronDown />}</Button>
        </div>
      </div>
    </li>
  );
};

export default DeveloperName;
