import { Grid, Paper, Box, Typography, Tooltip } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { cityColors } from '../../../../constants';
import { itemTiersAtom, itemQualityAtom, selectedMarketItemsAtom, allowItemQualityAtom } from '../../atoms';
import { ItemPriceInformation, Quality, SelectedItem } from '../../types';
import { imageStyles, getItemContainerSx, itemContentSx } from './styles';
import { useCallback } from 'react';

const qualityId = {
  Normal: Quality.Normal,
  Good: Quality.Good,
  Outstanding: Quality.Outstanding,
  Excelent: Quality.Excelent,
  Masterpiece: Quality.Masterpiece,
};

interface SelectedItemTierProps extends SelectedItem {
  tier: number;
  itemIndex: number;
}

export const SelectedItems = () => {
  const allowItemQuality = useRecoilValue(allowItemQualityAtom);
  const selectedItemTiers = useRecoilValue(itemTiersAtom);
  const selectedItemQuality = useRecoilValue(itemQualityAtom);
  const selectedMarketItems = useRecoilValue(selectedMarketItemsAtom);

  const getItemTier = (itemName: string) => {
    const tierMatch = itemName.match(/T\d+/);

    if (tierMatch) return tierMatch[0];
    else return 'UnknownTier';
  };

  const ItemPrice = useCallback(
    ({ name, prices }: { name: string; prices: ItemPriceInformation[] }) => {
      return (
        <Box display='flex'>
          {prices.map(({ sell_price_min, city, quality }, priceIndex) => {
            const cityName = city.replace(/\s/g, '').toLowerCase();

            if (allowItemQuality && quality !== Number(qualityId[selectedItemQuality])) return undefined;

            if (!allowItemQuality && quality > 0) return undefined;

            return (
              <Tooltip key={`priceof-${name}-${priceIndex}`} title={city}>
                <Typography
                  variant='body2'
                  sx={{
                    '&:not(:first-of-type)': {
                      ml: 0.5,
                    },
                    cursor: 'pointer',
                    borderRadius: 0.5,
                    padding: ({ spacing }) => spacing(0, 0.75),
                    bgcolor: cityColors[cityName] ?? '#ffffff',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {sell_price_min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                </Typography>
              </Tooltip>
            );
          })}
        </Box>
      );
    },
    [allowItemQuality, selectedItemQuality]
  );

  const SelectedItemTier = useCallback(
    ({ enchantments, label, name, prices, itemIndex, tier }: SelectedItemTierProps) => (
      <Box display='flex'>
        <img alt={label} style={imageStyles} src={`https://render.albiononline.com/v1/item/${name}@${tier}.png`} />
        <Box sx={itemContentSx}>
          <>
            <Typography typography='subtitle1'>
              {label} ({getItemTier(name)}.{tier})
            </Typography>
            <ItemPrice name={name} prices={prices} />
          </>
        </Box>
      </Box>
    ),
    [ItemPrice]
  );

  return (
    <Grid container justifyContent='center'>
      {selectedMarketItems.map(({ name, label, prices, enchantments }, index) => (
        <Box key={`${name}-${index}`} m={2}>
          <Paper sx={getItemContainerSx(true)}>
            <SelectedItemTier enchantments={enchantments} itemIndex={0} label={label} name={name} prices={prices} tier={selectedItemTiers[0]} />
          </Paper>
          {selectedItemTiers.length > 1 && (
            <Paper sx={getItemContainerSx(false)}>
              {selectedItemTiers.map(
                (tier, itemTierIndex) =>
                  itemTierIndex > 0 && (
                    <SelectedItemTier
                      key={`${name}@${tier}-${itemTierIndex}`}
                      enchantments={enchantments}
                      itemIndex={itemTierIndex}
                      label={label}
                      name={name}
                      prices={prices}
                      tier={tier}
                    />
                  )
              )}
            </Paper>
          )}
        </Box>
      ))}
    </Grid>
  );
};
