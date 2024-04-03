import React from 'react'
import { Layout } from '../layout/Layout'
import { ButtonBack } from '../components/ButtonBack'
import { EditUser } from '../feature/DitailUser/component/EditUser'

export const EditUserPages = () => {
  return (
    <Layout>
         <ButtonBack/>
        <EditUser/>
    </Layout>
  )
}
