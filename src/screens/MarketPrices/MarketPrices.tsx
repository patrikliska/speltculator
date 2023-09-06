import {
  Box,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Typography,
} from '@mui/material';

import weaponsList from '../../aoData/weapons.json';
import { useState } from 'react';

interface Item {
  name: string;
  label: string;
  enchantments: string[];
}

interface ItemPriceInformation {
  buy_price_max: number;
  buy_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  city: string;
  item_id: string;
  quality: number;
  sell_price_max: number;
  sell_price_max_date: string;
  sell_price_min: number;
  sell_price_min_date: string;
}

export const MarketPrices = () => {
  const [selectedItemTiers, setSelectedItemTiers] = useState([0, 2, 3, 4]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const itemTiers = [0, 1, 2, 3, 4];

  const handleSelectedItemTiers = (itemTier: number) => {
    // Check if itemTier is already in the array
    if (selectedItemTiers.includes(itemTier)) {
      // If it is, filter it out
      const updatedSelectedItems = selectedItemTiers.filter(
        (tier) => tier !== itemTier
      );
      setSelectedItemTiers(updatedSelectedItems);
    } else {
      // If it's not, add it to the array
      const updatedSelectedItems = [...selectedItemTiers, itemTier];
      // Sort the array if needed
      updatedSelectedItems.sort((a, b) => a - b);
      setSelectedItemTiers(updatedSelectedItems);
    }
  };

  const getItemTier = (itemName: string) => {
    // Use a regular expression to extract the tier (e.g., "T4", "T7", "T8")
    const tierMatch = itemName.match(/T\d+/);

    if (tierMatch) {
      return tierMatch[0];
    } else {
      // Handle the case where no tier is found (return a default value or null)
      return 'Unknown';
    }
  };

  const getItemPrices = async (itemName: string) => {
    const itemPrices: ItemPriceInformation[] = await fetch(
      `https://west.albion-online-data.com/api/v2/stats/prices/${itemName}?locations=Caerleon,Lymhurst,Martlock,Bridgewatch,Thetford,FortSterling&&qualities=1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);

        return data;
      });

    const price = itemPrices.map(({ sell_price_min = '0' }) => (
      <Typography>{sell_price_min}</Typography>
    ));

    console.log('price', price);

    return price;
  };
  return (
    <>
      <Box mx='auto' display='flex' alignItems='flex-end' gap={6} pb={2}>
        <Autocomplete
          sx={{ width: '500px' }}
          multiple
          id='tags-standard'
          options={weaponsList}
          getOptionLabel={(option) => option.label}
          fullWidth
          onChange={(item, activeItems) => setSelectedItems(activeItems)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='standard'
              label='Find your Item'
              placeholder={weaponsList[0].label}
            />
          )}
        />
        <Box>
          <Box display='flex' justifyContent='flex-end'>
            <Button variant='text' size='small'>
              Select all
            </Button>
            <Button variant='text' size='small'>
              Unselect all
            </Button>
          </Box>
          <Box>
            {itemTiers.map((itemTier, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedItemTiers.includes(itemTier)}
                    onClick={() => handleSelectedItemTiers(itemTier)}
                  />
                }
                label={`T${itemTier}`}
              />
            ))}
          </Box>
        </Box>
      </Box>
      {selectedItems.map(({ name, label }) => (
        <Paper sx={{ width: 400, p: 2, display: 'flex' }}>
          <img
            alt={label}
            style={{ width: 64, height: 64 }}
            src={`https://render.albiononline.com/v1/item/${name}.png`}
          />
          <Box p={0.5} display='flex' flexDirection='column'>
            <>
              <Typography typography='h5'>
                {label} ({getItemTier(name)})
              </Typography>
              {getItemPrices(name)}
            </>
          </Box>
        </Paper>
      ))}
    </>
  );
};
