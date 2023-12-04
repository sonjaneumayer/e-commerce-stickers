import { useDisclosure } from '@mantine/hooks'
import { Box, NavLink, Burger, Title, TextInput, Button } from '@mantine/core'
import { IconChevronRight, IconSearch } from '@tabler/icons-react'
import { navBarStyles } from './nav_bar_styles'
export function HamburgerDropdown() {
  const [opened, { toggle }] = useDisclosure()
  const { classes } = navBarStyles()

  return (
    <Box>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      {opened ? (
        <Box className={classes.hamburgerDropdown}>
          <NavLink
            label={<Title order={3}>Products</Title>}
            rightSection={<IconChevronRight stroke={1.5} />}
            variant="light"
            active
            component="a"
            href="/products"
          />

          <NavLink
            label={<Title order={3}>Contact</Title>}
            rightSection={<IconChevronRight stroke={1.5} />}
            variant="light"
            active
            component="a"
            href="/contact"
          />
          <NavLink
            label={<Title order={3}>Products</Title>}
            rightSection={<IconChevronRight stroke={1.5} />}
            variant="light"
            active
            component="a"
            href="/about"
          />
          <NavLink
            label={<Title order={3}>Login</Title>}
            rightSection={<IconChevronRight stroke={1.5} />}
            variant="light"
            active
            component="a"
            href="/login"
          />
          <NavLink
            label={<Title order={3}>Register</Title>}
            rightSection={<IconChevronRight stroke={1.5} />}
            variant="light"
            active
            component="a"
            href="/register"
          />
          <TextInput
            size="sm"
            aria-label="Search Items"
            icon={<IconSearch size="1rem" />}
            sx={{ margin: '0.25rem' }}
          />
          <Button size="sm" sx={{ margin: '0.25rem' }}>
            Search Store
          </Button>
        </Box>
      ) : null}
    </Box>
  )
}
