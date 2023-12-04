import { Button, TextInput, Box, Grid, Title, Textarea } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleSendMail } from './handle_send_mail'

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name is Required' }).toLowerCase(),
  email: z.string().email().min(2, { message: 'Email is Required' }),
  subject: z.string().min(2, { message: 'Subject is Required' }),
  message: z.string().min(2, { message: 'Message is Required' }).toLowerCase(),
})

export type ContactFormType = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    resolver: zodResolver(contactSchema),
  })

  const onSubmit: SubmitHandler<ContactFormType> = async (formData) => {
    try {
      console.log(formData)
      handleSendMail(formData)
      // show success pop up when email is sent
      notifications.show({
        title: 'Message Sent!',
        message: 'We will try to get back to you as soon as possible 😊',
      })
    } catch (error) {
      // show error pop up if it fails
      notifications.show({
        title: 'Whoops',
        message: 'Something went wrong, please try again later 😞',
        color: 'red',
      })
      console.error('Error:', error)
    }
  }

  return (
    <Box>
      <Title mb="sm">Get in touch</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="name"
                  size="md"
                  radius="md"
                  id="name"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="email"
                  size="md"
                  radius="md"
                  id="email"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextInput
                  placeholder="subject"
                  size="md"
                  radius="md"
                  id="subject"
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="message"
                  size="md"
                  radius="md"
                  id="message"
                  autosize
                  minRows={8}
                  {...field}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col sx={{ display: 'flex', justifyContent: 'right' }}>
            <Button type="submit" mt="sm">
              Send Message
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  )
}
