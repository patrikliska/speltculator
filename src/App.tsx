import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Container } from '@mui/material';

import aoData from './aoData/items.json';
import weaponsJson from './aoData/weapons.json';

import { allItemsList } from './aoData/constants';
import { TopBarMenu } from './widgets';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { topBarRouter } from './constants';

export const App = () => {
  const [onlyNamesAndIds, setOnlyNamesAndIds] = useState<string[]>([]);
  const [weapons, setWeapons] = useState<{ name: string; label: string }[]>([]);
  // console.log('aoData', aoData);

  useEffect(() => {
    const onlyName: string[] = [];
    const weaponsList: { name: string; label: string }[] = [];

    // allItemsList.forEach(({ LocalizedNames, UniqueName }) => {
    //   const animal = UniqueName.includes('FARM');
    //   const hideout = UniqueName.includes('HIDEOUT');
    //   const fish = UniqueName.includes('FISH');
    //   const treasure = UniqueName.includes('TREASURE');
    //   const questItem = UniqueName.includes('QUESTITEM');
    //   const mountUpgrade = UniqueName.includes('MOUNTUPGRADE');
    //   const silverBag = UniqueName.includes('SILVERBAG');
    //   const skillBook = UniqueName.includes('SKILLBOOK');
    //   const nonTradable = UniqueName.includes('NONTRADABLE');
    //   const meat = UniqueName.includes('MEAT');
    //   const butter = UniqueName.includes('BUTTER');
    //   const alcohol = UniqueName.includes('ALCOHOL');
    //   const bread = UniqueName.includes('BREAD');
    //   const flour = UniqueName.includes('FLOUR');
    //   const wood = UniqueName.includes('WOOD');
    //   const rock = UniqueName.includes('ROCK');
    //   const ore = UniqueName.includes('ORE');
    //   const hide = UniqueName.includes('HIDE');
    //   const fiber = UniqueName.includes('FIBER');
    //   const planks = UniqueName.includes('PLANKS');
    //   const stoneblock = UniqueName.includes('STONEBLOCK');
    //   const metalbar = UniqueName.includes('METALBAR');
    //   const leather = UniqueName.includes('LEATHER');
    //   const cloth = UniqueName.includes('CLOTH');
    //   const artefact = UniqueName.includes('ARTEFACT');
    //   const tool = UniqueName.includes('TOOL');
    //   const vanity = UniqueName.includes('VANITY');
    //   const debug = UniqueName.includes('DEBUG');

    //   const weapon = UniqueName.includes('MAIN') || UniqueName.includes('2H');

    //   if (
    //     !animal &&
    //     !hideout &&
    //     !fish &&
    //     !treasure &&
    //     !mountUpgrade &&
    //     !questItem &&
    //     !silverBag &&
    //     !skillBook &&
    //     !nonTradable &&
    //     !meat &&
    //     !butter &&
    //     !alcohol &&
    //     !bread &&
    //     !flour &&
    //     !wood &&
    //     !rock &&
    //     !ore &&
    //     !hide &&
    //     !fiber &&
    //     !planks &&
    //     !stoneblock &&
    //     !metalbar &&
    //     !leather &&
    //     !cloth &&
    //     !artefact &&
    //     !tool &&
    //     !vanity &&
    //     !debug
    //   ) {
    //     onlyName.push(UniqueName);

    //     if (weapon) {
    //       const newItem = {
    //         name: UniqueName,
    //         label: LocalizedNames?.['EN-US'] || UniqueName,
    //       };

    //       weaponsList.push(newItem);
    //     }
    //   }
    // });

    // console.log('weapon', JSON.stringify(weaponsList));

    console.log('cože', weaponsJson);

    const weaponsListek = weaponsJson.filter(
      ({ name }) =>
        (name.includes('T7') || name.includes('T8')) && !name.includes('@')
    );

    setOnlyNamesAndIds(onlyName);
    setWeapons(weaponsListek);
  }, []);

  console.log('onlyNamesAndIds', onlyNamesAndIds);

  useEffect(() => {
    fetch(
      'https://west.albion-online-data.com/api/v2/stats/prices/T4_HIDE?locations=Caerleon&qualities=2'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
      });
  }, []);

  return (
    <>
      <TopBarMenu />
      <Box
        sx={{
          p: 2,
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          position: 'relative',
        }}
      >
        <RouterProvider router={topBarRouter} />
      </Box>
      {/* <div className='App'>
        <header className='App-header'>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Button onClick={() => console.log('weapons', weapons)}>
            dwadwadawddwa
          </Button>
          <TextField
            id='outlined-select-currency'
            select
            label='Select'
            defaultValue='T4_BURDOCK'
            helperText='Please select your currency'
          >
            {onlyNamesAndIds.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id='outlined-select-currency'
            select
            label='Select'
            helperText='Please select your currency'
          >
            {weapons.map(({ name, label }) => (
              <MenuItem key={name} value={name}>
                <img
                  alt={label}
                  style={{ width: 32, height: 32 }}
                  src={`https://render.albiononline.com/v1/item/${name}.png`}
                />
                {label}
              </MenuItem>
            ))}
          </TextField>
          <Box display='block'>
            {weapons.map(({ name, label }) => (
              <img
                alt={label}
                style={{ width: 50, height: 50 }}
                src={`https://render.albiononline.com/v1/item/${name}.png`}
              />
            ))}
          </Box>
        </header>
      </div> */}
    </>
  );
};
