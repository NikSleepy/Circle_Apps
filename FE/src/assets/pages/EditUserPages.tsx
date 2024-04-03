import React from 'react'
import { Layout } from '../layout/Layout'
import { EditUser } from '../../feature/DitailUser/component/editUser'
import { ButtonBack } from '../atom/ButtonBack'

export const EditUserPages = () => {
  return (
    <Layout>
         <ButtonBack/>
        <EditUser/>
    </Layout>
  )
}
