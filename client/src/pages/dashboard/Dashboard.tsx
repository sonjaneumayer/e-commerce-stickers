import { Overlay, Container, Title, Text } from '@mantine/core'
import { useStyles } from './dashboard_styles'
import { ItemCard } from '../../components/itemCard/ItemCard'
import { useAppSelector } from '../../hooks/hooks'
import { selectUser } from '../../app/features/users/userSlice'

export function Dashboard() {
  const { classes } = useStyles()
  const user = useAppSelector(selectUser)

  return (
    <>
      <Title className={classes.welcome}>WELCOME {user?.userName}</Title>
      <div className={classes.header}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(247,227,203,0.25) 0%, rgba(148,199,192,0.5) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}>STICKERS</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Funny drawings characterised by <b>Sticker Factory</b>
          </Text>
        </Container>
      </div>
      <ItemCard />
    </>
  )
}
