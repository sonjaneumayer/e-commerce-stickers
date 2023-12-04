import { Stack, ActionIcon, rem, Text } from "@mantine/core"
import { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import { IconArrowBack } from "@tabler/icons-react"
import { arrowBackStyles } from "./arrow_back_styles"

export const ArrowBack: FunctionComponent = () => {
    const { classes } = arrowBackStyles()

    return (
        <Stack pl="md">
            <Link to="/products">
                <ActionIcon aria-label="Shopping Cart Icon">
                    <IconArrowBack style={{ width: rem(25), height: rem(25) }} />
                </ActionIcon>
            </Link>
            <Text size="lg" fw="bold" className={classes.arrowBackText}>Continue Shopping</Text>
        </Stack>
    )
}

