import { createStyles, rem } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  title: {
    paddingBottom: '50px',
  },
  itemTitle: {
    color: theme.black,
    textAlign: "left",

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(15),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(15),
      lineHeight: 1.3,
    },
  },
  linkToItem: {
    cursor: "pointer"
  }
}))
