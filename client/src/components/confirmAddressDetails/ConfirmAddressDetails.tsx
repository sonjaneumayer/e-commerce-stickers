import { Box, Text, Anchor, Card, Group } from '@mantine/core'
import { IConfirmAddressProps } from './confirm_address_details_types'
export const ConfirmAddressDetails = ({
  firstName,
  lastName,
  streetName,
  houseNumber,
  postCode,
  city,
  country,
  handleAddressChange,
}: IConfirmAddressProps) => {
  return (
    <Box>
      <Card shadow="sm" padding="lg" radius="md">
        <Group mb="sm">
          <Text size="lg" weight={600}>{`${firstName} ${lastName}`}</Text>
        </Group>
        <Group mb="xs">
          <Text>{`${houseNumber} ${streetName}`}</Text>
        </Group>
        <Group mb="xs">
          <Text>{`${city} ${postCode}`}</Text>
        </Group>
        <Group mb="sm">
          <Text>{country}</Text>
        </Group>
        <Group>
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={handleAddressChange}
            size="xs"
          >
            Not your Address? Update Address details
          </Anchor>
        </Group>
      </Card>
    </Box>
  )
}
