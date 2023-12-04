import { createStyles, rem } from '@mantine/core';
import BackgroundImage from '../../assets/duck_family.png';

export const useStyles = createStyles((theme) => ({
    header: {
      position: 'relative',
      background:`url(${BackgroundImage})`,
      backgroundSize: 'cover'
    },
  
    container: {
      height: rem(700),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: `calc(${theme.spacing.xl} * 6)`,
      zIndex: 1,
      position: 'relative',
  
      [theme.fn.smallerThan('sm')]: {
        height: rem(500),
        paddingBottom: `calc(${theme.spacing.xl} * 3)`,
      },
    },
  
    title: {
      color: theme.black,
      fontSize: rem(60),
      fontWeight: 900,
      lineHeight: 1.1,
  
      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(40),
        lineHeight: 1.2,
      },
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: rem(28),
        lineHeight: 1.3,
      },
    },

    welcome: {
      fontFamily: theme.fontFamilyMonospace,
      color: theme.black,
      fontSize: rem(40),
      fontWeight: 900,
      textAlign: 'right'
    },
  
    description: {
      color: theme.black,
      maxWidth: 600,
  
      [theme.fn.smallerThan('sm')]: {
        maxWidth: '100%',
        fontSize: theme.fontSizes.sm,
      },
    },
  
    control: {
      marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));