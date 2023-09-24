import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useRecoilState } from 'recoil';

import { itemQualityAtom } from '../../atoms';
import { qualities } from '../../constants';
import { QualityName } from '../../types';

export const ItemQualityPicker = () => {
  const [selectedItemQuality, setSelectedItemQuality] = useRecoilState(itemQualityAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => setSelectedItemQuality(value as QualityName);

  return (
    <FormControl>
      <FormLabel>Quality</FormLabel>
      <RadioGroup name='Quality' value={selectedItemQuality} onChange={handleChange} sx={{ display: 'flex', flexDirection: 'row' }}>
        {qualities.map((tier, index) => (
          <FormControlLabel key={`${tier}-${index}`} value={tier} control={<Radio />} label={tier} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
