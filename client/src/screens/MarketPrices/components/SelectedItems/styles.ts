import { BoxProps, PaperProps } from '@mui/material';

export const getItemContainerSx = (isFirstItem: boolean): PaperProps['sx'] => {
  const itemContainerSx: PaperProps['sx'] = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    maxWidth: 400,
    overflow: 'hidden',
    p: 2,
    position: 'relative',
    zIndex: 1,
  };

  if (!isFirstItem) Object.assign(itemContainerSx, { transform: 'scale(0.95)', mt: -3, zIndex: 0, pt: 3.5 });

  return itemContainerSx;
};

export const itemContentSx: BoxProps['sx'] = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  pb: 1,
};

export const imageStyles = { width: 64, height: 64 };
