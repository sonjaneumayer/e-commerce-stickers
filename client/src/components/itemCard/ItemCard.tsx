import {
  Card,
  Image,
  AspectRatio,
  SimpleGrid,
  Text,
  Title,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { useStyles } from './item_card_styles'
import { useGetAllItemsQuery } from '../../app/features/items/itemsApiSlice'
import { useNavigate } from 'react-router-dom'

export const ItemCard = () => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { data: items } = useGetAllItemsQuery()

  const navigateToItem = (id: string) => {
    navigate(`/item/${id}`)
  }

  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: '62rem', cols: 3, spacing: 'md' },
          { maxWidth: '48rem', cols: 2, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {items?.map((item, index) => (
          <Card
            key={item.itemName}
            style={{
              backgroundColor:
                index % 2 === 0
                  ? theme.colors.orange[1]
                  : theme.colors.orange[2],
            }}
          >
            <Card.Section
              className={classes.linkToItem}
              component="a"
              onClick={() => navigateToItem(item._id)}
            >
              <AspectRatio ratio={2000 / 1700}>
                <Image src={item.imagePath} />
              </AspectRatio>
            </Card.Section>
            <Stack>
              <Text size="md" className={classes.itemTitle}>
                {item.itemName}
              </Text>

              <Text size="md" fw={700} className={classes.itemTitle}>
                {item.itemPrice}
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  )
}
