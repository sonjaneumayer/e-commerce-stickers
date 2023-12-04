import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    form: {
      maxWidth: rem(450),
      [theme.fn.smallerThan("sm")]: {
        maxWidth: "100%",
      },
    },
    title: {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));