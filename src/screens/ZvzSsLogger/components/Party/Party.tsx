import { Paper, Typography, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrop } from 'react-dnd';
import { PlayersList } from './PlayersList';

export const Party = ({
  partyId,
  onRemoveClick,
  index,
}: {
  index: number;
  partyId: number;
  onRemoveClick: (partyId: number) => void;
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Party' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        alignItems: 'center',
        p: 2,
        width: 250,
        position: 'relative',
        ...(index === 0 && { mr: 2 }),
      }}
      ref={drop}
      data-testid='party'
    >
      <Typography variant='h5'>Party {partyId}</Typography>
      <IconButton
        onClick={() => onRemoveClick(partyId)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
        aria-label='Remove party'
        color='error'
      >
        <DeleteIcon />
      </IconButton>
      <PlayersList />
    </Paper>
  );
};
