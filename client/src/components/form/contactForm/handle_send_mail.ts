import emailjs from '@emailjs/browser'
import { ContactFormType } from './ContactForm'

export const handleSendMail = (details: ContactFormType) => {
  emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY)
  emailjs
    .send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      {
        name: details.name,
        email: details.email,
        subject: details.subject,
        message: details.message,
      }
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
