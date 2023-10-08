import { ItemPriceInformation } from './types';

// Calculate the average of a property in an array of items
const calculateAverage = (items: ItemPriceInformation[], property: keyof ItemPriceInformation): number => {
  const validItems = items.filter((item) => Number(item[property]) > 0);
  if (validItems.length === 0) {
    return 0;
  }
  const total = validItems.reduce((sum, item) => sum + Number(item[property]), 0);

  return Number((total / validItems.length).toFixed());
};

export const getAveragePrice = (data: ItemPriceInformation[]) => {
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
};
