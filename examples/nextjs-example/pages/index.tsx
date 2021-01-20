import styled from 'styled-components'
import { LightTheme, Text } from "react-native-styled-paper";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default function Home() {
  return (
      <div>
    <Title>My page</Title>
    <Text theme={LightTheme}>Text</Text>
    </div>
  )
}
