import { MainTheme } from './styles/MainTheme'
import { Container } from '@mantine/core'
import { RouterComponent } from './app/routing/RouterComponent'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from '@clerk/clerk-react'
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw 'Missing Publishable Key'
}

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <MainTheme>
        <Container size="xl">
          <RouterComponent />
        </Container>
      </MainTheme>
    </ClerkProvider>
  )
}
