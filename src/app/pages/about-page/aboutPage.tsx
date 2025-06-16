import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { Button } from '~/components/ui/button/button';
import { Card, CardDescription, CardTitle } from '~/components/ui/card';
import DeveloperCard from '~/components/ui/developer-card/developerCard';
import DeveloperName from '~/components/ui/developer-card/developerName';

type DeveloperId = 'firstDeveloper' | 'secondDeveloper' | 'thirdDeveloper';

type DeveloperInfo = {
  developerName: string;
  developerFullName: string;
  developerId: DeveloperId;
  developerPosition: string;
  developerDesription: string;
  developerGithubLink: string;
  developerGithubImg: string;
};

type DeveloperProps = Record<DeveloperId, DeveloperInfo>;

const AboutPage = () => {
  const firstDeveloperImgSource = 'aboutFirstDev.svg';
  const firstDeveloperImgSourceHover = 'aboutFirstDevHover.svg';

  const secondDeveloperImgSource = 'aboutSecondDev.svg';
  const secondDeveloperImgSourceHover = 'aboutSecondDevHover.svg';

  const thirdDeveloperImgSource = 'aboutThirdDev.svg';
  const thirdDeveloperImgSourceHover = 'aboutThirdDevHover.svg';

  const ZERO_LETTER_INDEX = 0;
  const SECOND_LETTER_INDEX = 2;
  const THIRD_LETTER_INDEX = 3;
  const FOUR_LETTER_INDEX = 4;
  const EIGHTH_LETTER_INDEX = 8;

  const developerProps: DeveloperProps = {
    firstDeveloper: {
      developerName: 'Anastasia',
      developerFullName: 'Anastasia Savrukhina',
      developerId: 'firstDeveloper',
      developerPosition: 'Frontend Developer',
      developerDesription: `Before joining the school, I didn't know how to code at all — but step by step, I found my rhythm and started
       to enjoy the process. I've fallen in love with the visual side of frontend: I like exploring new animation techniques and digging
       through beautiful references to find just the right vibe. For me, it's not just about making things work — it's about giving the
       interface its own voice and personality. To future graduates, I'd say: stay curious and stay consistent — inspiration is great,
       but discipline makes the magic real.`,
      developerGithubLink: 'https://github.com/savryna',
      developerGithubImg: 'https://avatars.githubusercontent.com/u/123760669?v=4',
    },
    secondDeveloper: {
      developerName: 'Daria',
      developerFullName: 'Daria Melnikova',
      developerId: 'secondDeveloper',
      developerPosition: 'Frontend Developer / Teamlead',
      developerDesription: `Before joining the school, I wasn't very confident in my coding skills, but my passion for writing clean,
       elegant code kept me motivated. Styling and visual design aren't my favorite parts — I prefer focusing on the structure and
       quality of the code itself. Sometimes, I rewrote assignments from scratch multiple times just to make sure the code was as
       clear and well-organized as possible. To future developers, I'd say: focus on writing clean and well-structured code — it
       makes all the difference.`,
      developerGithubLink: 'https://github.com/zagorky',
      developerGithubImg: 'https://avatars.githubusercontent.com/u/156232667?v=4',
    },
    thirdDeveloper: {
      developerName: 'Anastasia',
      developerFullName: 'Anastasiia Nikonova',
      developerId: 'thirdDeveloper',
      developerPosition: 'Frontend Developer',
      developerDesription: `I've never been the kind of developer who's okay with just making things work — I always want to understand
       how and why they work. I love digging into documentation, exploring new features, and making sure every detail is thought through.
       Even linters feel like a fun challenge rather than a chore. I'd rather spend extra time finding the right solution than use a quick
       fix or hacky workaround. For me, clean and reliable code isn't a luxury — it's the standard.`,
      developerGithubLink: 'https://github.com/anastanei',
      developerGithubImg: 'https://avatars.githubusercontent.com/u/9627974?v=4',
    },
  };

  const [activeDeveloper, setActiveDeveloper] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <h1 className="heading-1">Welcome to Second Chapter</h1>
        <div className="flex flex-col items-center gap-30">
          <div className="grid w-full grid-cols-1 items-start sm:grid-cols-[1fr_100fr]">
            <div className="vertical-header">
              <span>About Us</span>
            </div>
            <Card className="flex flex-col items-center px-5">
              <CardDescription className="text-base md:text-lg">
                Every book has its first chapter, but the real magic begins with the second. At Second Chapter, we
                believe that great stories deserve more than just one reader — they deserve to be shared, rediscovered,
                and loved all over again.
              </CardDescription>
              <CardDescription className="text-base md:text-lg">
                We collect books with a past and give them a future, carefully curating each one so it can find a new
                home. Every worn cover and dog-eared page holds a story within a story — not only the one written by the
                author, but also the silent journey it’s taken through hands and hearts.
              </CardDescription>
              <CardDescription className="text-base md:text-lg">
                Our team puts love and care into every part of the process — from choosing books to creating a cozy
                space where readers can explore and enjoy. We work so that you can feel the joy of finding something
                special — a story that feels like it was waiting just for you.
              </CardDescription>
              <CardDescription className="text-base md:text-lg">
                Because at Second Chapter, it’s not just about books — it’s about the people who read them, the memories
                they carry, and the new beginnings they inspire.
              </CardDescription>
            </Card>
          </div>
          <div className="grid w-full grid-cols-1 items-start sm:grid-cols-[1fr_100fr]">
            <div className="vertical-header">
              <span>Our Team</span>
            </div>
            <ul className="flex flex-col items-center">
              <DeveloperName
                name={developerProps.secondDeveloper.developerName}
                img={secondDeveloperImgSource}
                imgHover={secondDeveloperImgSourceHover}
                bounceUpIndexes={[ZERO_LETTER_INDEX, SECOND_LETTER_INDEX]}
                bounceDownIndexes={[FOUR_LETTER_INDEX, EIGHTH_LETTER_INDEX]}
                onClick={() => {
                  setActiveDeveloper((previous) =>
                    previous === developerProps.secondDeveloper.developerId
                      ? null
                      : developerProps.secondDeveloper.developerId
                  );
                }}
              />
              <AnimatePresence mode="wait">
                {activeDeveloper === developerProps.secondDeveloper.developerId && (
                  <motion.div
                    key={developerProps.secondDeveloper.developerId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DeveloperCard
                      fullName={developerProps.secondDeveloper.developerFullName}
                      position={developerProps.secondDeveloper.developerPosition}
                      imageUrl={developerProps.secondDeveloper.developerGithubImg}
                      description={developerProps.secondDeveloper.developerDesription}
                      feedbackKey={developerProps.secondDeveloper.developerId}
                      githubLink={developerProps.secondDeveloper.developerGithubLink}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <DeveloperName
                name={developerProps.thirdDeveloper.developerName}
                img={thirdDeveloperImgSource}
                imgHover={thirdDeveloperImgSourceHover}
                bounceUpIndexes={[ZERO_LETTER_INDEX, THIRD_LETTER_INDEX, FOUR_LETTER_INDEX]}
                bounceDownIndexes={[SECOND_LETTER_INDEX, EIGHTH_LETTER_INDEX]}
                onClick={() => {
                  setActiveDeveloper((previous) =>
                    previous === developerProps.thirdDeveloper.developerId
                      ? null
                      : developerProps.thirdDeveloper.developerId
                  );
                }}
              />
              <AnimatePresence mode="wait">
                {activeDeveloper === developerProps.thirdDeveloper.developerId && (
                  <motion.div
                    key={developerProps.thirdDeveloper.developerId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DeveloperCard
                      fullName={developerProps.thirdDeveloper.developerFullName}
                      position={developerProps.thirdDeveloper.developerPosition}
                      imageUrl={developerProps.thirdDeveloper.developerGithubImg}
                      description={developerProps.thirdDeveloper.developerDesription}
                      feedbackKey={developerProps.thirdDeveloper.developerId}
                      githubLink={developerProps.thirdDeveloper.developerGithubLink}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <DeveloperName
                name={developerProps.firstDeveloper.developerName}
                img={firstDeveloperImgSource}
                imgHover={firstDeveloperImgSourceHover}
                bounceUpIndexes={[ZERO_LETTER_INDEX, SECOND_LETTER_INDEX]}
                bounceDownIndexes={[FOUR_LETTER_INDEX, EIGHTH_LETTER_INDEX]}
                onClick={() => {
                  setActiveDeveloper((previous) =>
                    previous === developerProps.firstDeveloper.developerId
                      ? null
                      : developerProps.firstDeveloper.developerId
                  );
                }}
              />
              <AnimatePresence mode="wait">
                {activeDeveloper === developerProps.firstDeveloper.developerId && (
                  <motion.div
                    key={developerProps.firstDeveloper.developerId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DeveloperCard
                      fullName={developerProps.firstDeveloper.developerFullName}
                      position={developerProps.firstDeveloper.developerPosition}
                      imageUrl={developerProps.firstDeveloper.developerGithubImg}
                      description={developerProps.firstDeveloper.developerDesription}
                      feedbackKey={developerProps.firstDeveloper.developerId}
                      githubLink={developerProps.firstDeveloper.developerGithubLink}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </ul>
          </div>
          <div className="grid w-full grid-cols-1 items-start sm:grid-cols-[1fr_100fr]">
            <div className="vertical-header">
              <span>RS School</span>
            </div>
            <Card className="w-[clamp(280px,90vw,800px)]">
              <CardTitle>💛 Thank You, RSSchool</CardTitle>
              <CardDescription className="text-base md:text-lg">
                This project was created as part of our training at{' '}
                <a
                  href="https://rs.school/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main underline transition"
                >
                  RSSchool
                </a>
                . We want to thank the school, our mentors, and everyone behind this amazing learning journey. Thanks to
                RSSchool, we not only became confident junior developers but also discovered the joy of working as a
                real team.
              </CardDescription>
              <CardDescription className="text-base md:text-lg">
                Collaborating on this project felt surprisingly easy and inspiring — we always knew we could rely on
                each other’s support, ideas, and care. It wasn’t just about building a product, it was about learning to
                listen, to cooperate, and to grow together.
              </CardDescription>
              <CardDescription className="text-base md:text-lg">
                Thank you,{' '}
                <a
                  href="https://rs.school/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main underline transition"
                >
                  RSSchool
                </a>
                , for the knowledge, for the friendships, and for the atmosphere that makes you want to learn, improve,
                and move forward. 💛
              </CardDescription>
              <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
                <Button variant={'neutral'}>
                  <span>Visit</span>

                  <img src="logo-rs.svg" alt="RSSchool Logo" className="h-10 w-10" />
                  <span> RSSchool</span>
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
