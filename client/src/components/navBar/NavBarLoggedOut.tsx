import {
  Group,
  Button,
  ActionIcon,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { navBarStyles } from './nav_bar_styles'
import { Link } from 'react-router-dom'
import { getTotalAmountOfItems } from '../../app/features/cart/cartSlice'
import { useAppSelector } from '../../hooks/hooks'
import { useMediaQuery } from '@mantine/hooks'
import {} from '@tabler/icons-react'
import {
  IconShoppingCartFilled,
  IconMoonStars,
  IconSun,
} from '@tabler/icons-react'

export function NavBarLoggedOut() {
  const totalAmount = useAppSelector(getTotalAmountOfItems)
  const { classes } = navBarStyles()

  const matches = useMediaQuery('(max-width: 50em)')
  // change color scheme on toggle
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Group>
      {!matches ? (
        <Link to="/cart">
          <ActionIcon aria-label="Shopping Cart Icon">
            <IconShoppingCartFilled />
          </ActionIcon>
        </Link>
      ) : null}
      {totalAmount > 0 && !matches ? (
        <Text className={classes.itemAmount}>{totalAmount}</Text>
      ) : null}
      {!matches ? (
        <ActionIcon
          variant="outline"
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {colorScheme === 'dark' ? (
            <IconSun size={18} />
          ) : (
            <IconMoonStars size={18} />
          )}
        </ActionIcon>
      ) : null}
      <Button
        size={matches ? 'xs' : 'sm'}
        component={Link}
        to="/login"
        radius="xl"
      >
        Login
      </Button>
      <Button
        size={matches ? 'xs' : 'sm'}
        component={Link}
        to="/register"
        radius="xl"
      >
        Signup
      </Button>
    </Group>
  )
}
