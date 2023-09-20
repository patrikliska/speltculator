import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { useRecoilState } from 'recoil';
import { itemQualityAtom } from '../../atoms';

export const ItemQualityPicker = () => {
  const [selectedItemQuality, setSelectedItemQuality] =
    useRecoilState(itemQualityAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedItemQuality(event.target.value);

  const qualities = [
    { id: '1', name: 'normal' },
    { id: '2', name: 'good' },
    { id: '3', name: 'outstanding' },
    { id: '4', name: 'excelent' },
    { id: '5', name: 'masterpiece' },
  ];

  return (
    <FormControl>
      <FormLabel>Quality</FormLabel>
      <RadioGroup
        name='Quality'
        value={selectedItemQuality}
        onChange={handleChange}
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        {qualities.map(({ id, name }, index) => (
          <FormControlLabel value={id} control={<Radio />} label={name} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
