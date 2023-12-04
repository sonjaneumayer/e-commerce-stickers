import { createStyles, rem } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  footer: {
    margin: '2rem',
    padding: '1rem',
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[5]
    }`,
    justifyContent: 'space-between',
  },
  inner: {
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

    [theme.breakpoints.sm]: {
      flexDirection: 'column',
    },
  },
  links: {
    [theme.breakpoints.sm]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}))
