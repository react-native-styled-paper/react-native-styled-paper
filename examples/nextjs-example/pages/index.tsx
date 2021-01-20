import styled from 'styled-components'
import { Text } from "react-native-styled-paper";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default function Home() {
  return (
      <div>
    <Title>My page</Title>
    <Text>Text</Text>
    </div>
  )
}
