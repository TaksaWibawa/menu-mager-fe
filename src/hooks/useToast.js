import { toast, Bounce } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { capitalize } from '@/utils';

export function useToast() {
  const timeoutId = useRef();

  const showToast = (message, type, duration = 3000) => {
    toast(capitalize(message), {
      type,
      position: 'bottom-right',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });

    timeoutId.current = setTimeout(() => {
      toast.dismiss();
    }, duration);
  };

  useEffect(
    () => () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    },
    []
  );

  return showToast;
}
