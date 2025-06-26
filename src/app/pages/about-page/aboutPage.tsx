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
  accentColor: string;
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
      accentColor: 'chart-2',
    },
    secondDeveloper: {
      developerName: 'Daria',
      developerFullName: 'Daria Melnikova',
      developerId: 'secondDeveloper',
      developerPosition: 'Frontend Developer / Teamlead',
      developerDesription: `Hi, Im the dev who ships code then immediately hates it. It works... but what if I rewrite it just one more time?
      Design? Please. My UI looks like a pink potato. My imposter syndrome says Im a fraud, my ide says Im a mess, and my commit history says 'refactor:
      fix typo' 47 times.`,
      developerGithubLink: 'https://github.com/zagorky',
      developerGithubImg: 'https://avatars.githubusercontent.com/u/156232667?v=4',
      accentColor: 'chart-3',
    },
    thirdDeveloper: {
      developerName: 'Anastasia',
      developerFullName: 'Anastasiia Nikonova',
      developerId: 'thirdDeveloper',
      developerPosition: 'Frontend Developer',
      developerDesription: `A year ago I was choosing between studying frontend or starting a TikTok for my cat. At that moment
      I came across RS School, and that’s how a year went by. I really like the style of teaching at the school, the challenging
      assignments, and the community. But cat's TikTok still an option.`,
      developerGithubLink: 'https://github.com/anastanei',
      developerGithubImg: 'https://avatars.githubusercontent.com/u/9627974?v=4',
      accentColor: 'main',
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
            <Card className="flex flex-col items-center px-5 text-left">
              <CardDescription className="text-base md:text-lg">
                Every book begins with a first chapter — but the real magic starts with the second. At{' '}
                <span className="text-main text-base font-extrabold sm:text-2xl">Second Chapter</span>, we believe great
                stories deserve to be shared, rediscovered, and loved again.
              </CardDescription>
              <CardDescription className="text-base md:text-lg">
                We give pre-loved books a new life, curating each one to find its next home. Every worn cover and folded
                page holds two stories — the one inside, and the one it’s lived through.
              </CardDescription>
              <CardDescription className="text-base md:text-lg">
                With care and heart, we create a cozy space where readers can find stories that feel like they were
                meant for them. Because{' '}
                <span className="text-main text-base font-extrabold sm:text-2xl">Second Chapter</span> is not just about
                books — it’s about people, memories, and new beginnings.
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
                isActive={activeDeveloper === developerProps.secondDeveloper.developerId}
              />
              <AnimatePresence mode="wait">
                {activeDeveloper === developerProps.secondDeveloper.developerId && (
                  <motion.div
                    key={developerProps.secondDeveloper.developerId}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <DeveloperCard
                      fullName={developerProps.secondDeveloper.developerFullName}
                      position={developerProps.secondDeveloper.developerPosition}
                      imageUrl={developerProps.secondDeveloper.developerGithubImg}
                      description={developerProps.secondDeveloper.developerDesription}
                      feedbackKey={developerProps.secondDeveloper.developerId}
                      githubLink={developerProps.secondDeveloper.developerGithubLink}
                      accentColor={developerProps.secondDeveloper.accentColor}
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
                isActive={activeDeveloper === developerProps.thirdDeveloper.developerId}
              />
              <AnimatePresence mode="wait">
                {activeDeveloper === developerProps.thirdDeveloper.developerId && (
                  <motion.div
                    key={developerProps.thirdDeveloper.developerId}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <DeveloperCard
                      fullName={developerProps.thirdDeveloper.developerFullName}
                      position={developerProps.thirdDeveloper.developerPosition}
                      imageUrl={developerProps.thirdDeveloper.developerGithubImg}
                      description={developerProps.thirdDeveloper.developerDesription}
                      feedbackKey={developerProps.thirdDeveloper.developerId}
                      githubLink={developerProps.thirdDeveloper.developerGithubLink}
                      accentColor={developerProps.thirdDeveloper.accentColor}
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
                isActive={activeDeveloper === developerProps.firstDeveloper.developerId}
              />
              <AnimatePresence mode="wait">
                {activeDeveloper === developerProps.firstDeveloper.developerId && (
                  <motion.div
                    key={developerProps.firstDeveloper.developerId}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: 20 }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <DeveloperCard
                      fullName={developerProps.firstDeveloper.developerFullName}
                      position={developerProps.firstDeveloper.developerPosition}
                      imageUrl={developerProps.firstDeveloper.developerGithubImg}
                      description={developerProps.firstDeveloper.developerDesription}
                      feedbackKey={developerProps.firstDeveloper.developerId}
                      githubLink={developerProps.firstDeveloper.developerGithubLink}
                      accentColor={developerProps.firstDeveloper.accentColor}
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
            <Card className="px-5 sm:px-10">
              <CardTitle>💛 Thank You, RSSchool</CardTitle>
              <CardDescription className="text-base md:text-lg">
                This project was created as part of our training at{' '}
                <a
                  href="https://rs.school/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-chart-1 text-base font-extrabold underline transition sm:text-2xl"
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
                  className="hover:text-chart-1 text-base font-extrabold underline transition sm:text-2xl"
                >
                  RSSchool
                </a>
                , for the knowledge, for the friendships, and for the atmosphere that makes you want to learn, improve,
                and move forward. 💛
              </CardDescription>
              <a href="https://rs.school/" target="_blank" rel="noopener noreferrer" className="flex justify-center">
                <Button variant={'default'}>
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
