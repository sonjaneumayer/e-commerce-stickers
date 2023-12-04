import { Header, Group, Button, Box, TextInput } from '@mantine/core'
import { navBarStyles } from './nav_bar_styles'
import { Link } from 'react-router-dom'
import { DogHappy } from '../../assets/DogHappy'
import { NavBarLoggedOut } from './NavBarLoggedOut'
import { NavBarLoggedIn } from './NavBarLoggedIn'
import { IconSearch } from '@tabler/icons-react'
import { HamburgerDropdown } from './HamburgerDropdown'
import { useUser } from '../../hooks/hooks'

export function MainNavBar() {
  const { classes } = navBarStyles()
  // const [userAuth] = useUserDetails()
  const [userAuth] = useUser()
  //console.log("User auth token",userAuth?.token)
  const UserButtons = () => {
    // gets set to false whenever page is refreshed
    // need persisted state for isAutheneticated
    if (userAuth?.token === null || userAuth.token === undefined) {
      //console.log("YAY")
      return <NavBarLoggedOut />
    } else {
      return <NavBarLoggedIn />
    }
  }

  return (
    <Box>
      <Header height={56} m="1rem" className={classes.inner}>
        <Box className={classes.burger}>
          <HamburgerDropdown />
        </Box>
        <Link to="/">
          <DogHappy />
        </Link>
        <Group className={classes.items} spacing={5}>
          <Group>
            <Button variant="outline" component={Link} to="/products">
              Products
            </Button>
            <Button variant="outline" component={Link} to="/contact">
              Contact
            </Button>
            <Button variant="outline" component={Link} to="/about">
              About
            </Button>
          </Group>
        </Group>
        <UserButtons />
      </Header>
    </Box>
  )
}
