import { Box, Button, FormControlLabel, Checkbox, FormLabel, Typography, MenuItem, Stack, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { useCallback, useState } from 'react';

import { itemTiersAtom } from '../../atoms';
import { itemTiers } from '../../constants';
import { ItemTier } from '../../types';

export const ItemTierPicker = () => {
  const [activePriceRange, setActivePriceRange] = useState('Current');

  const [selectedItemTiers, setSelectedItemTiers] = useRecoilState(itemTiersAtom);

  const handleSelectedItemTiers = useCallback(
    (itemTier: ItemTier) => {
      setSelectedItemTiers((currentlySelectedItemTiers) => {
        if (currentlySelectedItemTiers.includes(itemTier)) {
          if (currentlySelectedItemTiers.length === 1) return currentlySelectedItemTiers;

          const updatedSelectedItems = currentlySelectedItemTiers.filter((tier) => tier !== itemTier);

          return updatedSelectedItems;
        } else {
          const updatedSelectedItems = [...currentlySelectedItemTiers, itemTier];

          updatedSelectedItems.sort((a, b) => a - b);

          return updatedSelectedItems;
        }
      });
    },
    [setSelectedItemTiers]
  );

  return (
    <Stack direction='row' justifyContent='space-between'>
      <Stack width='fit-content'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <FormLabel sx={{ m: 0 }}>
            <Typography variant='body2'>Tier</Typography>
          </FormLabel>
          <Box>
            <Button variant='text' size='small' onClick={() => setSelectedItemTiers(itemTiers)}>
              Select all
            </Button>
            <Button variant='text' size='small' onClick={() => setSelectedItemTiers([itemTiers[0]])}>
              Unselect all
            </Button>
          </Box>
        </Box>
        <Box>
          {itemTiers.map((itemTier, index) => (
            <FormControlLabel
              key={`${itemTier}-${index}`}
              control={<Checkbox checked={selectedItemTiers.includes(itemTier)} onClick={() => handleSelectedItemTiers(itemTier)} size='small' />}
              label={`T .${itemTier}`}
            />
          ))}
        </Box>
      </Stack>
      <FormControlLabel
        disabled
        sx={{ width: 120 }}
        label='Price range'
        labelPlacement='top'
        control={
          <TextField select size='small' fullWidth value={activePriceRange} onChange={(event) => setActivePriceRange(event.target.value)}>
            {['Current', '1 Hour', '6 Hours', '1 Day', '3 Days', '7 Days'].map((priceRange, index) => (
              <MenuItem key={`${priceRange}#${index}`} value={priceRange}>
                {priceRange}
              </MenuItem>
            ))}
          </TextField>
        }
      />
    </Stack>
  );
};
