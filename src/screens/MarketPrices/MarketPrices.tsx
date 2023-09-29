import { SyntheticEvent, useCallback } from 'react';
import { Box, Autocomplete, TextField, AutocompleteChangeDetails, AutocompleteChangeReason, Grid } from '@mui/material';
import { useSetRecoilState } from 'recoil';

import { weaponsJson } from '../../constants';

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

      // const todaysDate = new Date();
      // const previousDayDate = new Date();

      // previousDayDate.setDate(todaysDate.getDate() - 2);

      // const todaysDateFormatted = `${todaysDate.getMonth() + 1}-${todaysDate.getDate()}-${todaysDate.getFullYear()}`;
      // const previousDayDateFormatted = `${previousDayDate.getMonth() + 1}-${previousDayDate.getDate()}-${previousDayDate.getFullYear()}`;

      // const priceFetchUrl = `https://west.albion-online-data.com/api/v2/stats/history/${option.name}?locations=Caerleon,Lymhurst,Martlock,Bridgewatch,Thetford,FortSterling&date=${previousDayDateFormatted}&end_date=${todaysDateFormatted}&time-scale=1`;
      const priceFetchUrl = `https://west.albion-online-data.com/api/v2/stats/prices/${option.name}?locations=Caerleon,Lymhurst,Martlock,Bridgewatch,Thetford,FortSterling`;

      const itemPrices: ItemPriceInformation[] = await fetch(priceFetchUrl).then((response) => response.json());

      console.log('itemPrices', itemPrices);
      console.log('priceFetchUrl', priceFetchUrl);

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
          options={weaponsJson}
          getOptionLabel={(option) => option.label}
          fullWidth
          onChange={handleSelectedItemsChange}
          renderInput={(params) => <TextField {...params} variant='standard' label='Find your Item' placeholder={weaponsJson[0].label} />}
          ChipProps={{ size: 'small' }}
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
