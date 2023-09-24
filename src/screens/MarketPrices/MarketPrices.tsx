import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Box, Autocomplete, TextField, Paper, Typography, AutocompleteChangeDetails, AutocompleteChangeReason, Tooltip, Grid, Divider } from '@mui/material';
import { useRecoilValue } from 'recoil';

import weaponsList from '../../aoData/weapons.json';
import { cityColors } from '../../constants';

import { ItemQualityPicker, ItemTierPicker } from './components';
import { itemQualityAtom, itemTiersAtom } from './atoms';
import { Quality } from './types';

interface Item {
  name: string;
  label: string;
  enchantments: string[];
}

type City = 'Bridgewatch' | 'Thetford' | 'Lymhurst' | 'Carleon' | 'Fort Sterling';

interface ItemPriceInformation {
  buy_price_max: number;
  buy_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  city: City;
  item_id: string;
  quality: number;
  sell_price_max: number;
  sell_price_max_date: string;
  sell_price_min: number;
  sell_price_min_date: string;
}

interface SelectedItem extends Item {
  prices: ItemPriceInformation[];
}

const qualityId = {
  Normal: Quality.Normal,
  Good: Quality.Good,
  Outstanding: Quality.Outstanding,
  Excelent: Quality.Excelent,
  Masterpiece: Quality.Masterpiece,
};

export const MarketPrices = () => {
  const selectedItemTiers = useRecoilValue(itemTiersAtom);
  const selectedItemQuality = useRecoilValue(itemQualityAtom);

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const getItemTier = (itemName: string) => {
    const tierMatch = itemName.match(/T\d+/);

    if (tierMatch) return tierMatch[0];
    else return 'UnknownTier';
  };

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
    []
  );

  const memoizedSelectedItems = useMemo(
    () =>
      selectedItems.map(({ name, label, prices }, index) => (
        <>
          <Grid container justifyContent='center'>
            {selectedItemTiers.map((tier) => (
              <Paper key={`${name}@${tier}-${index}`} sx={{ width: 400, p: 2, display: 'flex', m: 2 }}>
                <img alt={label} style={{ width: 64, height: 64 }} src={`https://render.albiononline.com/v1/item/${name}@${tier}.png`} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: ({ spacing }) => spacing(0.5, 0, 1, 0),
                  }}
                >
                  <>
                    <Typography typography='h5'>
                      {label} ({getItemTier(name)}.{tier})
                    </Typography>
                    <Box display='flex'>
                      {prices.map(({ sell_price_min, city, quality }, priceIndex) => {
                        const cityName = city.replace(/\s/g, '').toLowerCase();

                        if (quality !== Number(qualityId[selectedItemQuality])) return <></>;

                        return (
                          <Tooltip key={`priceof-${name}-${priceIndex}`} title={city}>
                            <Typography
                              variant='h6'
                              sx={{
                                '&:not(:first-of-type)': {
                                  ml: 0.5,
                                },
                                cursor: 'pointer',
                                borderRadius: 0.5,
                                padding: ({ spacing }) => spacing(0, 0.75),
                                bgcolor: cityColors[cityName] ?? '#ffffff',
                                color: '#ffffff',
                              }}
                            >
                              {sell_price_min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                            </Typography>
                          </Tooltip>
                        );
                      })}
                    </Box>
                  </>
                </Box>
              </Paper>
            ))}
          </Grid>
          {selectedItems[index + 1] ? <Divider variant='fullWidth' sx={{ m: 1 }} /> : undefined}
        </>
      )),
    [selectedItemQuality, selectedItems, selectedItemTiers]
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
      {memoizedSelectedItems}
    </>
  );
};
