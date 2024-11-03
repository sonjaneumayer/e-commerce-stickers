import { MainTheme } from './styles/MainTheme'
import { Container } from '@mantine/core'
import { RouterComponent } from './app/routing/RouterComponent'

export default function App() {
  
  return (
      <MainTheme>
        <Container size="xl">
          <RouterComponent />
        </Container>
      </MainTheme>
  )
}
