import { useRoutes } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

import { TopBarMenu } from '../widgets';
import { menuPages } from '../constants';

import { appContainerSx } from './styles';

export const App = () => {
  const routes = useRoutes(menuPages);

  return (
    <>
      <TopBarMenu />
      <Box sx={appContainerSx}>
        <Stack width='100%'>{routes}</Stack>
      </Box>
    </>
  );
};
