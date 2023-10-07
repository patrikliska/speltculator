import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';

import { allowItemQualityAtom, itemQualityAtom } from '../../atoms';
import { qualities } from '../../constants';
import { QualityName } from '../../types';

export const ItemQualityPicker = () => {
  const [allowItemQuality, setAllowItemQuality] = useRecoilState(allowItemQualityAtom);
  const [selectedItemQuality, setSelectedItemQuality] = useRecoilState(itemQualityAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => setSelectedItemQuality(value as QualityName);

  return (
    <FormControl>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <FormLabel>
          <Typography variant='body2'>Quality</Typography>
        </FormLabel>
        <FormControlLabel
          control={<Switch size='small' defaultChecked={allowItemQuality} onChange={(_event, checked) => setAllowItemQuality(checked)} />}
          label={<Typography variant='body2'>Specify quality</Typography>}
        />
      </Box>
      <RadioGroup name='Quality' value={allowItemQuality && selectedItemQuality} onChange={handleChange} sx={{ display: 'flex', flexDirection: 'row' }}>
        {qualities.map((tier, index) => (
          <FormControlLabel key={`${tier}-${index}`} disabled={!allowItemQuality} value={tier} control={<Radio size='small' />} label={tier} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
