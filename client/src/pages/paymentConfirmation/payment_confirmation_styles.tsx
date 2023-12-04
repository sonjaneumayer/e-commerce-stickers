import { createStyles } from '@mantine/core';

export const usePaymentConfirmationStyles = createStyles((theme) => ({
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vH"
    },
    icon: {
        color: theme.colors.green[5],
    },
}));