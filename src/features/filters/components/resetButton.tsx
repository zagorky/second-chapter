import { Button } from '~components/ui/button/button';
import { useSearchParams } from 'react-router';

export const ResetButton = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const handleOnClick = () => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.delete('subcategory');
    newParameter.delete('category');
    newParameter.delete('search');
    setSearchParameters(newParameter);
  };

  return <Button onClick={handleOnClick}>Reset</Button>;
};
