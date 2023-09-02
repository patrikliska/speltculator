import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function createData(role: string, name?: string) {
  return { role, name };
}

const rows = [
  createData('Caller', 'Spelix'),
  createData('1h Mace/Hoj', 'Grago'),
  createData('Heavy Mace', 'iAfroo'),
  createData('GA'),
  createData('SOB'),
  createData('Hallowfall'),
  createData('Fallen'),
  createData('Fallen'),
  createData('Blight/Wild staff'),
  createData('Enigmatic'),
  createData('Locus'),
  createData('Locus'),
  createData('Oathkeepers'),
  createData('Life curse'),
  createData('Clarent'),
  createData('Realm'),
  createData('Spirita/Carving'),
  createData('Clarent'),
  createData('BM - chariot'),
  createData('Brim'),
];

export const PlayersList = () => {
  return (
    <TableContainer sx={{ pt: 2 }}>
      <Table sx={{}} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography sx={{ fontWeight: 900 }} variant='subtitle1'>
                Role
              </Typography>
            </TableCell>
            <TableCell align='right'>
              <Typography sx={{ fontWeight: 900 }} variant='subtitle1'>
                Player
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.role}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:nth-of-type(odd)': { bgcolor: 'secondary' },
              }}
            >
              <TableCell component='th' scope='row'>
                {row.role}
              </TableCell>
              <TableCell align='right'>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
