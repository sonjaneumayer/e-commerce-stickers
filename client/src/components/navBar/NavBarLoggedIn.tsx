import { useEffect, useState } from 'react'
import {
  Group,
  Menu,
  Avatar,
  ActionIcon,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { navBarStyles } from './nav_bar_styles'
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../../app/features/auth/authApiSlice'
import { useAppDispatch, useAppSelector, useUserDetails } from '../../hooks/hooks'
import { IconShoppingCartFilled, IconSettings } from '@tabler/icons-react'
import { getTotalAmountOfItems } from '../../app/features/cart/cartSlice'
import { selectUser, unsetUser } from '../../app/features/users/userSlice'
import { IconLogout, IconMoonStars, IconSun } from '@tabler/icons-react'

export function NavBarLoggedIn() {
  const { classes } = navBarStyles()
  const totalAmount = useAppSelector(getTotalAmountOfItems)
  const navigate = useNavigate()
  const [userDetails] = useUserDetails()
  const [logout, { isLoading, isSuccess }] = useSendLogoutMutation()
  //initialize state with image from user state
  const profileImg: any = useAppSelector(selectUser)
  const [profileImage, setProfileImage] = useState(profileImg?.profileImage)
  const dispatch = useAppDispatch()
  // change color scheme om toggle
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  useEffect(() => {
    setProfileImage(profileImg?.profileImagePath)
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  const logOut = async () => {
    await logout({})
    dispatch(unsetUser())
  }

  return (
    <Group>
      <Menu shadow="md" width={150}>
        <Link to="/cart">
          <ActionIcon aria-label="Shopping Cart Icon">
            <IconShoppingCartFilled />
          </ActionIcon>
        </Link>
        {totalAmount > 0 ? (
          <Text className={classes.itemAmount}>{totalAmount}</Text>
        ) : null}

        <Menu.Target>
          {userDetails.user?.profileImage !== '' ||
          userDetails.user?.profileImage !== null ? (
            <Avatar
              className={classes.avatar}
              src={profileImg?.profileImage}
              radius="xl"
            />
          ) : (
            <Avatar radius="xl">
              {userDetails.user?.email.substring(0, 1)}
            </Avatar>
          )}
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item color='orange' icon={<IconSettings></IconSettings>}>
            <Link to="/profile">
              <Text size="md">Settings</Text>
            </Link>
          </Menu.Item>
        </Menu.Dropdown>
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
        <ActionIcon aria-label="Logout Icon">
          <IconLogout onClick={logOut} />
        </ActionIcon>
      </Menu>
    </Group>
  )
}
