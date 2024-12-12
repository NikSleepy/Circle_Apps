import { useToast } from "@chakra-ui/react";

export const CheckInput = (value:string) => {
    const toast = useToast();
    if (/[^a-zA-Z0-9 ]/.test(value)) {
        toast({
          title: 'Username can only contain letters, numbers, and spaces',
          status: 'error',
          duration: 2000,
          position: 'top',
        })
        return;
      }
}