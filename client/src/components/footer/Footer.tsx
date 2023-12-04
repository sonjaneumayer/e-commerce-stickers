import { Anchor, Group, ActionIcon, rem, Image, Text } from '@mantine/core'
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from '@tabler/icons-react'
import { useStyles } from './footer_styles'
import { useMediaQuery } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import dogHappy from './../../assets/dog_happy.svg'

const links = [
  { link: '/contact', label: 'Contact' },
  { link: '/about', label: 'About' },
  { link: '/products', label: 'Shop' },
]

export function Footer() {
  const { classes } = useStyles()
  const matches = useMediaQuery('(min-width: 56.25em)')
  
  const items = links.map((link) => (
    <Link key={link.link} to={link.link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Text>{link.label}</Text>
    </Link>
  ))

  return (
    <Group
      className={classes.footer}
      sx={{
        flexDirection: matches ? 'row' : 'column',
        justifyContent: matches ? 'space-around' : 'center',
      }}
    >
      <Group>
        <Image height="3.5rem" width="3.5rem" src={dogHappy} alt="Happy Dog" />
      </Group>

      {!matches && (
        <Group>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      )}

      <Group className={classes.links}>{items}</Group>

      {matches && (
        <Group>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      )}
    </Group>
  )
}
