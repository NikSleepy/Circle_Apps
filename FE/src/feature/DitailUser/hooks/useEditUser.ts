// import React from 'react

import { useState } from "react"
import { API } from "../../../libs/api"
import { IEditPhotoProfile, IEditUser } from "../../../types/Type"
import { RootState } from "../../../store/type"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Action, ThunkDispatch } from "@reduxjs/toolkit"
import { userLogin } from "../../../store/slice/UserSlice"
import { useToast } from "@chakra-ui/react"

export const useEditUser = () => {
  const user = useSelector((state: RootState) => state.user.data)
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>()

  const [ data, setData ] = useState<IEditUser>({
    username:user.username,
    fullName:user.fullName,
    description:user.description,
  })
  const [ profile, setProfile ] = useState<IEditPhotoProfile>({
    photo_profile:null
  })
  // const [ cover, setCover ] = useState<IEditPhotoCover>({
  //   photo_cover:null
  // })
  const toast = useToast()
 


    const editUser = async() => {
        try {
          const formData = new FormData()

            formData.append('username', data.username)
            formData.append('fullName', data.fullName)
            formData.append('description', data.description)

            if ( profile.photo_profile !== null ){
              formData.append('photo_profile', profile.photo_profile)
            }

            // if (cover.photo_cover !== null) {
            //   formData.append('photo_cover', cover.photo_cover);
            // }

            await API.put('/users/update', formData)
            .then(res => {
                toast({
                  title: 'Update Success',
                  description: `Update Profile ${user.username} Success`,
                  status: 'success',
                  duration:4000,
                  isClosable: true,
                  position: 'top',
              })
              return res
            })
            .catch(function (eror) {
              editUser();
              console.log(eror)
            })



            dispatch(userLogin())
  
        } catch (error) {
            console.log('eror edit profile')
        }
    }

  return {
    editUser,
    setData,
    setProfile,
    // setCover
  }
}
