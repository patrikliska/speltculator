import { SyntheticEvent, useCallback } from 'react';
import { Box, Autocomplete, TextField, AutocompleteChangeDetails, AutocompleteChangeReason, Grid } from '@mui/material';
import { useRecoilState } from 'recoil';

import { weaponsJson } from '../../constants';

import { ItemQualityPicker, ItemTierPicker, SelectedItems } from './components';
import { selectedMarketItemsAtom, selectedItemsOptionsAtom } from './atoms';
import { Item, ItemPriceInformation, SelectedItem } from './types';

export const MarketPrices = () => {
  const [selectedMarketItems, setSelectedMarketItems] = useRecoilState(selectedMarketItemsAtom);
  const [selectedItemsOptions, setSelectedItemsOptions] = useRecoilState(selectedItemsOptionsAtom);

  // Calculate the average of a property in an array of items
  const calculateAverage = (items: ItemPriceInformation[], property: keyof ItemPriceInformation): number => {
    const validItems = items.filter((item) => Number(item[property]) > 0);
    if (validItems.length === 0) {
      return 0;
    }
    const total = validItems.reduce((sum, item) => sum + Number(item[property]), 0);

    return Number((total / validItems.length).toFixed());
  };

  const getAveragePrice = useCallback((data: ItemPriceInformation[]) => {
    const result: ItemPriceInformation[] = [];

    // Group the data by city
    const groupedData: { [city: string]: ItemPriceInformation[] } = {};

    data.forEach((item) => {
      const city = item.city;
      if (!groupedData[city]) {
        groupedData[city] = [];
      }
      groupedData[city].push(item);
    });

    // Calculate the average price for each city and add to result
    for (const city of Object.keys(groupedData)) {
      const cityItems = groupedData[city];
      const averageItem: ItemPriceInformation = {
        ...cityItems[0], // Use the first item as a template
        quality: 0, // Set quality to 0
        sell_price_min: calculateAverage(cityItems, 'sell_price_min'),
        sell_price_max: calculateAverage(cityItems, 'sell_price_max'),
        buy_price_min: calculateAverage(cityItems, 'buy_price_min'),
        buy_price_max: calculateAverage(cityItems, 'buy_price_max'),
        sell_price_min_date: '0001-01-01T00:00:00',
        sell_price_max_date: '0001-01-01T00:00:00',
        buy_price_min_date: '0001-01-01T00:00:00',
        buy_price_max_date: '0001-01-01T00:00:00',
      };
      result.push(...cityItems, averageItem);
    }

    return result;
  }, []);

  const handleSelectedItemsChange = useCallback(
    async (event: SyntheticEvent<Element, Event>, newItems: Item[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<Item>) => {
      console.log('dwadaw', reason, details);
      if (reason === 'clear') return setSelectedMarketItems([]);

      if (!details) return;

      const { option } = details;

      setSelectedItemsOptions(newItems);

      if (reason === 'removeOption') return setSelectedMarketItems((currentlySelectedItems) => currentlySelectedItems.filter(({ name }) => name !== option.name));

      const priceFetchUrl = `https://west.albion-online-data.com/api/v2/stats/prices/${option.name}?locations=Caerleon,Lymhurst,Martlock,Bridgewatch,Thetford,FortSterling`;

      const itemPrices: ItemPriceInformation[] = await fetch(priceFetchUrl)
        .then((response) => response.json())
        .then((data: ItemPriceInformation[]) => getAveragePrice(data));

      console.log('itemPrices', itemPrices);
      console.log('priceFetchUrl', priceFetchUrl);

      const newlySelectedItem: SelectedItem = { ...option, prices: itemPrices };

      setSelectedMarketItems((currentlySelectedItems) => [...currentlySelectedItems, newlySelectedItem]);
    },
    [getAveragePrice, setSelectedItemsOptions, setSelectedMarketItems]
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
          value={selectedItemsOptions}
          isOptionEqualToValue={(option, value) => option.name === value.name}
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
