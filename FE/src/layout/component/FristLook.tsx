import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const FirstLook = () => {
  return (
    <Box
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      h={'100vh'}
      color={'white'}
      fontFamily={''}
      animation={'fadeIn 2s ease-in-out forwards'} // Terapkan animasi fadeIn saat komponen dimuat
    >
      <Text fontSize={'40px'} fontWeight={'bold'} >Welcome To</Text>
      <Text
        fontSize={'40px'}
        fontWeight={'bold'}
        color={'#04a51e'}
        position={'relative'}
        overflow={'hidden'} // Tambahkan overflow hidden agar animasi glitch bisa terlihat
        _before={{ // Tambahkan pseudo-element _before untuk efek glitch
          content: 'attr(data-text)',
          position: 'absolute',
          top: 0,
          left: 0,
          color: '#ff0000',
          overflow: 'hidden',
          clip: 'rect(0, auto, 0, 0)', // Sembunyikan teks
          animation: 'glitch 2s infinite linear',
        }}
        data-text={'Circle apps'}
      >
        Circle apps {/* Tambahkan teks langsung di dalam elemen untuk teks yang tidak terkena efek glitch */}
      </Text>
      <Link to={'/login'}>
        <Text>Please click here to start!!</Text>
      </Link>
    </Box>
  )
}
