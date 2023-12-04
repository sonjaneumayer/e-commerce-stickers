import { createStyles, UnstyledButton, rem } from '@mantine/core'

export const navBarStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    height: rem(56),

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
    },
  },
  items: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    [theme.fn.smallerThan('md')]: {
      gap: '1rem',
    },
    gap: '2rem',
  },
  textBox: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  itemAmount: {
    position: 'relative',
    right: '1rem',
    borderRadius: '50%',
    padding: '5px',
    background: theme.colors.orange[5],
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  avatar: {
    border: `1px solid ${theme.colors.orange[5]}`,
  },
  hamburgerDropdown: {
    position: 'fixed',
    zIndex: 1000,
    width: '100vw',
    marginTop: '2rem',
    marginLeft: '-2rem',
    padding: '2rem 0rem 2rem 0rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    background: 'white',
    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
  },
}))
