import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Textarea,
  Button,
  Avatar,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/type';
import { userLogin } from '../../../store/slice/UserSlice';
import { API } from '../../../libs/api';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

export const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  const [formData, setFormData] = useState({
    fullName: '',
    description: '',
    username: '',
    photo_profile: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        photo_profile: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const updateData = new FormData();

      // Add only the fields that are filled
      if (formData.fullName) updateData.append('fullName', formData.fullName);
      if (formData.description)
        updateData.append('description', formData.description);
      if (formData.username) updateData.append('username', formData.username);
      if (formData.photo_profile)
        updateData.append('photo_profile', formData.photo_profile);

      // Send the update request
      await API.put('/users/update', updateData);
    console.log("updateData",updateData)
      toast({
        title: 'Profile Updated',
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      dispatch(userLogin()); // Update Redux state
      onClose(); // Close the modal
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'An error occurred while updating your profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        w={'150px'}
        bg={'none'}
        color={'white'}
        _hover={{ color: 'black', bg: 'white' }}
        h={'40px'}
        border={'1px solid'}
      >
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'#262626'} textColor={'white'}>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="fullName"
                placeholder={user?.fullName || 'Enter your full name'}
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                placeholder={user?.username || 'Enter your username'}
                value={formData.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                placeholder={user?.description || 'Enter your description'}
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Profile Picture</FormLabel>
              <Avatar
                src={
                  formData.photo_profile
                    ? URL.createObjectURL(formData.photo_profile)
                    : user?.photo_profile
                }
                size="xl"
                mb={2}
              />
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button bg={'#04a51e'}  mr={3} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button bg={'red'}  onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
