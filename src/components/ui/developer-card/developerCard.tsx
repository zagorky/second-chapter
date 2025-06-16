import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/carousel/carousel';
import { AvatarImage } from '~/components/ui/avatarImage/imageAvatar';
import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/card';
import { randomIndex } from '~/utils/helpers';

import { Button } from '../button/button';

type DeveloperCardType = {
  fullName: string;
  position: string;
  imageUrl: string;
  description: string;
  feedbackKey: FeedbackKey;
  githubLink: string;
};

type FeedbackKey = keyof typeof feedback;

const feedbackArrayImgs = ['reviewer-1.svg', 'reviewer-2.svg', 'reviewer-3.svg'];

const feedback = {
  firstDeveloper: [
    { message: 'Good students don’t code like that.', author: 'Reviewer 1' },
    { message: 'Do you work at Google? Your icon here is misaligned.', author: 'Reviewer 2' },
    { message: 'In my opinion, the work is incorrect because there is no HTML code at all.', author: 'Reviewer 3' },
  ],
  secondDeveloper: [
    { message: '70% of your code was actually written by your mentor.', author: 'Reviewer 1' },
    { message: "It used to be called bad practice — now it's just called custom.", author: 'Sasarik' },
  ],
  thirdDeveloper: [
    {
      message:
        'I could put up with her being at the computer all the time now — if only she at least did something high-quality.',
      author: 'Andrey, Nastya’s husband',
    },
    { message: '-50 points. Good luck with your future studies', author: 'Reviewer 1' },
  ],
};

const GITHUB_BUTTON_MSG = 'Visit Github';

const DeveloperCard = ({ fullName, position, imageUrl, description, feedbackKey, githubLink }: DeveloperCardType) => {
  return (
    <Card className="bg-secondary-background w-full px-10">
      <div className="flex items-center justify-center gap-5">
        <AvatarImage imageUrl={imageUrl} />
        <div>
          <CardTitle>{fullName}</CardTitle>
          <CardDescription>{position}</CardDescription>
        </div>
      </div>
      <CardDescription className="px-5 md:px-10">{description}</CardDescription>
      <div className="flex justify-center">
        <Carousel className="flex w-[clamp(150px,60vw,800px)] items-center">
          <CarouselPrevious className="bg-secondary-background hover:bg-transparent hover:outline-none" />
          <CarouselContent>
            {feedback[feedbackKey].map((_, index) => (
              <CarouselItem className="bg-secondary-background" key={`dev-${index.toString()}`}>
                <div className="p-[10px]">
                  <Card className="bg-secondary-background text-main-foreground p-0 shadow-none">
                    <CardContent className="flex flex-col items-center justify-center gap-5 p-4">
                      <div className="flex flex-col items-center font-bold">
                        <AvatarImage imageUrl={feedbackArrayImgs[randomIndex(feedbackArrayImgs)]} />
                        <span>{feedback[feedbackKey][index].author}</span>
                      </div>
                      <span className="font-base text-foreground text-sm">{feedback[feedbackKey][index].message}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="bg-secondary-background hover:bg-transparent hover:outline-none" />
        </Carousel>
      </div>
      <a href={githubLink} target="_blank" rel="noopener noreferrer">
        <Button variant={'neutral'}>{GITHUB_BUTTON_MSG}</Button>
      </a>
    </Card>
  );
};

export default DeveloperCard;
