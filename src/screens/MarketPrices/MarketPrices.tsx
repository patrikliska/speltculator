import { SyntheticEvent, useCallback } from 'react';
import { Box, Autocomplete, TextField, AutocompleteChangeDetails, AutocompleteChangeReason, Grid } from '@mui/material';
import { useSetRecoilState } from 'recoil';

import weaponsList from '../../aoData/weapons.json';

import { ItemQualityPicker, ItemTierPicker, SelectedItems } from './components';
import { selectedMarketItemsAtom } from './atoms';
import { Item, ItemPriceInformation, SelectedItem } from './types';

export const MarketPrices = () => {
  const setSelectedItems = useSetRecoilState(selectedMarketItemsAtom);

  const handleSelectedItemsChange = useCallback(
    async (event: SyntheticEvent<Element, Event>, newItems: Item[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<Item>) => {
      if (!details) return;

      const { option } = details;

      if (reason === 'removeOption') return setSelectedItems((currentlySelectedItems) => currentlySelectedItems.filter(({ name }) => name !== option.name));

      const itemPrices: ItemPriceInformation[] = await fetch(
        `https://west.albion-online-data.com/api/v2/stats/prices/${option.name}?locations=Caerleon,Lymhurst,Martlock,Bridgewatch,Thetford,FortSterling`
      ).then((response) => response.json());

      console.log('itemPrices', itemPrices);

      const newlySelectedItem: SelectedItem = { ...option, prices: itemPrices };

      setSelectedItems((currentlySelectedItems) => [...currentlySelectedItems, newlySelectedItem]);
    },
    [setSelectedItems]
  );

  return (
    <>
      <Grid container alignItems='center' gap={6} mb={2} justifyContent='center'>
        <Autocomplete
          sx={{ width: '500px' }}
          multiple
          id='tags-standard'
          options={weaponsList}
          getOptionLabel={(option) => option.label}
          fullWidth
          onChange={handleSelectedItemsChange}
          renderInput={(params) => <TextField {...params} variant='standard' label='Find your Item' placeholder={weaponsList[0].label} />}
        />
        <Box>
          <ItemTierPicker />
          <ItemQualityPicker />
        </Box>
      </Grid>
      <SelectedItems />
    </>
  );
};
