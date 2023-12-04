import { Card, Text, Title } from '@mantine/core'
import { useGetAllItemsQuery } from '../../app/features/items/itemsApiSlice'
import { ItemCard } from '../../components/itemCard/ItemCard'

export const Products = () => {
  const { data: items } = useGetAllItemsQuery()

  return (
    <>
      <Title size="h1" pt="xl" pb="lg" align="center">
        COLLECTION
      </Title>
      {items?.length === 0 ? (
        <Card>
          <Text>No items at the moment</Text>
        </Card>
      ) : (
        <ItemCard />
      )}
    </>
  )
}
