import DeveloperCard from '~/components/ui/developer-card/developerCard';

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

  return (
    <>
      <h1 className="heading-1">About Us</h1>
      <ul className="flex flex-col items-center">
        <DeveloperCard
          name="Anastasia"
          img={firstDeveloperImgSource}
          imgHover={firstDeveloperImgSourceHover}
          bounceUpIndexes={[ZERO_LETTER_INDEX, SECOND_LETTER_INDEX]}
          bounceDownIndexes={[FOUR_LETTER_INDEX, EIGHTH_LETTER_INDEX]}
        />
        <DeveloperCard
          name="Daria"
          img={secondDeveloperImgSource}
          imgHover={secondDeveloperImgSourceHover}
          bounceUpIndexes={[ZERO_LETTER_INDEX, SECOND_LETTER_INDEX]}
          bounceDownIndexes={[FOUR_LETTER_INDEX, EIGHTH_LETTER_INDEX]}
        />
        <DeveloperCard
          name="Anastasia"
          img={thirdDeveloperImgSource}
          imgHover={thirdDeveloperImgSourceHover}
          bounceUpIndexes={[ZERO_LETTER_INDEX, THIRD_LETTER_INDEX, FOUR_LETTER_INDEX]}
          bounceDownIndexes={[SECOND_LETTER_INDEX, EIGHTH_LETTER_INDEX]}
        />
      </ul>
    </>
  );
};

export default AboutPage;
