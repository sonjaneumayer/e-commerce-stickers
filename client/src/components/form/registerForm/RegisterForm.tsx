import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Title,
} from '@mantine/core'
import { TextInput } from '../custom_input_fields/textInput/TextInput'
import { PasswordInput } from '../custom_input_fields/passwordInput/PasswordInput'
import { Checkbox } from '../custom_input_fields/checkboxInput/CheckboxInput'
import { GoogleButton } from '../../buttons/socialButtons/SocialButtons'
import { useStyles } from '../loginForm/login_form_styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '../../../app/features/auth/authApiSlice'

const registerSchema = z
  .object({
    userName: z.string().min(2, { message: 'User Name is required' }),
    email: z
      .string()
      .email('Invalid email')
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must have more than 8 characters' }),
    confirm: z.string().min(1, { message: 'Password is required' }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'You must accept Terms and Conditions',
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'], //path of error
  })

type FormSchemaType = z.infer<typeof registerSchema>

export function RegisterForm() {
  const { classes } = useStyles()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchemaType>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirm: '',
      terms: false,
    },
    resolver: zodResolver(registerSchema),
  })

  const navigate = useNavigate()

  const navigateToLogin = () => {
    navigate('/login')
  }

  const [register, { isLoading }] = useRegisterMutation()
  if (isLoading) {
    return <p>Loading...</p>
  }

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await register(data)
    // should this maybe update the user state?
    navigateToLogin()
  }

  return (
    <>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to STICKERS, register with
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
              placeholder="Username"
              size="md"
              radius="md"
              id="username"
              name="userName"
            />
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
            <PasswordInput
              placeholder="Confirm Password"
              mt="md"
              size="md"
              radius="md"
              id="confirm"
              control={control}
              name="confirm"
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? (
                  <IconEyeOff size={size} />
                ) : (
                  <IconEyeCheck size={size} />
                )
              }
            />
            <Checkbox
              control={control}
              label="I accept terms and conditions"
              name="terms"
              id="terms"
              value="false"
            />
          </Stack>
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => navigateToLogin()}
              size="xs"
            >
              {'Already have an account? Login'}
            </Anchor>
            <Button type="submit" radius="xl" disabled={isSubmitting}>
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  )
}
