import {
  Title,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Grid,
} from '@mantine/core'
import { TextInput } from '../custom_input_fields/textInput/TextInput'
import { PasswordInput } from '../custom_input_fields/passwordInput/PasswordInput'
import { GoogleButton } from '../../buttons/socialButtons/SocialButtons'
import Duck from '../../../assets/duck_big.png'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../app/features/auth/authApiSlice'
import { setCredentials } from '../../../app/features/auth/authSlice'
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react'
import { useStyles } from './login_form_styles'
import { usePersistentState } from '../../../hooks/usePersistentState'
import { Checkbox } from '../custom_input_fields/checkboxInput/CheckboxInput'
import { setUser } from '../../../app/features/users/userSlice'
import { useUserDetails } from '../../../hooks/hooks'

const formSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
  persist: z.any(),
})

export type FormSchemaType = z.infer<typeof formSchema>

export function LoginForm() {
  //const [persist, setPersist] = usePersistentState()
  const { classes } = useStyles()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      //persist: persist,
    },
    resolver: zodResolver(formSchema),
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user] = useUserDetails()

  const navigateToRegister = () => {
    navigate('/register')
  }

  const [login, { isLoading }] = useLoginMutation()
  if (isLoading) {
    return <p>Loading...</p>
  }

  const onSubmit: SubmitHandler<FormSchemaType> = async (loginData) => {
    console.log("loginData",loginData)
    const userData = await login(loginData).unwrap()
    console.log("userdata", userData)
    dispatch(setCredentials({ ...userData }))
    dispatch(setUser({ ...userData }))
    navigate('/dashboard')
  }

  // const handleToggle = () => {
  //   setPersist((prev: boolean) => !prev)
  // }

  return (
    <>
      <Grid justify="space-around" align="center">
        <Grid.Col xs={12} sm={5} offsetSm={1} lg={4} offsetLg={1}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title
              order={2}
              className={classes.title}
              ta="center"
              mt="md"
              mb={50}
            >
              Welcome to STICKERS, login with
            </Title>

            <Group grow mb="md" mt="md">
              <GoogleButton radius="xl">Google</GoogleButton>
            </Group>

            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <TextInput
                  control={control}
                  placeholder="Email"
                  size="md"
                  radius="md"
                  id="email"
                  name="email"
                />

                <PasswordInput
                  placeholder="Password"
                  mt="md"
                  size="md"
                  radius="md"
                  id="password"
                  control={control}
                  name="password"
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? (
                      <IconEyeOff size={size} />
                    ) : (
                      <IconEyeCheck size={size} />
                    )
                  }
                />
              </Stack>

              <Group position="apart" mt="xl">
                <Anchor
                  component="button"
                  type="button"
                  color="dimmed"
                  onClick={() => navigateToRegister()}
                  size="xs"
                >
                  Don't have an account? Register
                </Anchor>
                <Button type="submit" radius="xl" disabled={isSubmitting}>
                  Login
                </Button>
              </Group>

              {/* <Checkbox
                control={control}
                name="persist"
                id="persist"
                label="Trust this device"
                value="false"
                onChange={handleToggle}
              /> */}
            </form>
          </Paper>
        </Grid.Col>

        <Grid.Col xs={12} sm={6} lg={4}>
          <Paper p={30}>
            <img src={Duck} alt="Duck" width="100%" height="auto" />
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  )
}
