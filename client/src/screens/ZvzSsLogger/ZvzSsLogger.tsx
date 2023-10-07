import { useCallback, useState } from 'react';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Party, PlayerLoadout } from './components';

export const ZvzSsLogger = () => {
  const [parties, setParties] = useState<number[]>([]);

  const createParty = useCallback(() => {
    setParties((currentParties) => [
      ...currentParties,
      (currentParties[currentParties.length - 1] || 0) + 1,
    ]);
  }, []);

  const onRemoveClick = useCallback((partyId: number) => {
    setParties((currentParties) =>
      currentParties.filter((currentPartyId) => currentPartyId !== partyId)
    );
  }, []);

  return (
    <>
      <Box display='flex'>
        {parties.map((partyId, index) => (
          <Party
            index={index}
            partyId={partyId}
            onRemoveClick={onRemoveClick}
          />
        ))}
        {parties.length < 2 && (
          <Box width={250} my='auto' textAlign='center'>
            <Button variant='outlined' onClick={createParty}>
              Create party
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ ml: 2 }}>
        <PlayerLoadout name='Player 1' />
        <Button
          sx={{ position: 'absolute', right: 20, bottom: 20, py: 2 }}
          variant='contained'
          aria-label='massup registration'
          size='large'
          startIcon={<AddOutlinedIcon fontSize='large' />}
        >
          <Typography variant='h6'>Massup registration</Typography>
        </Button>
      </Box>
    </>
  );
};
