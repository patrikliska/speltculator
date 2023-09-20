import { Box, Button, FormControlLabel, Checkbox, FormLabel } from '@mui/material';
import { useRecoilState } from 'recoil';

import { itemTiersAtom } from '../../atoms';
import { useCallback } from 'react';

export const ItemTierPicker = () => {
  const [selectedItemTiers, setSelectedItemTiers] = useRecoilState(itemTiersAtom);

  const itemTiers = [0, 1, 2, 3, 4];

  const handleSelectedItemTiers = useCallback(
    (itemTier: number) => {
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
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <FormLabel sx={{ m: 0 }}>Tier</FormLabel>
        <Box>
          <Button variant='text' size='small'>
            Select all
          </Button>
          <Button variant='text' size='small'>
            Unselect all
          </Button>
        </Box>
      </Box>
      <Box>
        {itemTiers.map((itemTier, index) => (
          <FormControlLabel
            key={`${itemTier}-${index}`}
            control={<Checkbox checked={selectedItemTiers.includes(itemTier)} onClick={() => handleSelectedItemTiers(itemTier)} />}
            label={`T${itemTier}`}
          />
        ))}
      </Box>
    </>
  );
};
