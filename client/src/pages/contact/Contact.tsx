import { Grid, Image, Paper } from '@mantine/core'
import { ContactForm } from '../../components/form/contactForm/ContactForm'
import Duck from '../../assets/duck_big.png'

export function Contact() {
  return (
    <Grid justify="space-around" align="center">
      <Grid.Col xs={12} sm={5} offsetSm={1} lg={4} offsetLg={1}>
        <ContactForm />
      </Grid.Col>
      <Grid.Col span={4}>
        <Paper>
          <Image src={Duck} />
        </Paper>
      </Grid.Col>
    </Grid>
  )
}
