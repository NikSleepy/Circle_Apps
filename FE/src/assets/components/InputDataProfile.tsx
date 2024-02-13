import { Input, InputProps } from '@chakra-ui/react'
import React from 'react'

export const InputDataProfile:React.FC<InputProps> = ({ ...res } ) => {

  return (

        <Input {...res} my={1} />
  )
}

