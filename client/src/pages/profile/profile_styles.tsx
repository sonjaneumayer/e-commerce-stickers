import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    form: {
        margin: "0 auto",
        maxWidth: rem(800),
    },
    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));