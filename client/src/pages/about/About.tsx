import { Box, Title, Text, Grid, Image, Paper } from '@mantine/core'

import Duck from '../../assets/duck_big.png'

export function About() {
  return (
    <Box>
      <Grid justify="space-around" align="center">
        <Grid.Col xs={12} sm={5} offsetSm={1} lg={4} offsetLg={1} p="lg">
          <Title>Welcome to Stickers</Title>
          <Text>
            Welcome to our sticker wonderland, where joy and excitement go to
            take a nap. Peel away the layers of monotony as our stickers bring
            forth a subtle chuckle or, at best, a dry smirk. These notes of
            adhesive amusement compose a symphony of humor, creating a tune that
            might just be too sophisticated for your average chuckle. Be
            cautious, for these stickers have been known to induce rare
            conditions such as mild amusement, subtle smirking, and the
            occasional eyebrow raise. Handle them with the utmost seriousness—or
            don't, as we navigate the profound world of mild hilarity. Ready to
            turn the sticker page on excessive enthusiasm? Dive into our
            collection, where every peel is a stoically whimsical journey.
            Because when life hands you 🍋, why not stick them on a sticker? 🤷‍♀️
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper>
            <Image src={Duck} />
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  )
}
