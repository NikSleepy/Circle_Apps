import { Button } from '@chakra-ui/react'
import React from 'react'
interface InputButtom {
    children : React.ReactNode
}
export const ButtomInput = ({children}:InputButtom) => {
  return (
    <Button w={'100%'} borderRadius={'20px'} my={'10px'} bg={'#04a51e'}>
        {children}
    </Button>
  )
}
