import { Grid, Paper, Image } from '@mantine/core'
import { RegisterForm } from '../../components/form/registerForm/RegisterForm'
import TwoDucks from '../../assets/two_ducks_with_hat.png'

export function Register() {
  return (
    <>
      <Grid justify="space-around" align="center">
        <Grid.Col xs={12} sm={7} lg={4} offsetLg={1}>
          <Paper p={30}>
            <Image src={TwoDucks} alt="Your Image" width="100%" height="auto" />
          </Paper>
        </Grid.Col>
        <Grid.Col xs={12} sm={5} lg={4}>
          <RegisterForm />
        </Grid.Col>
      </Grid>
    </>
  )
}
