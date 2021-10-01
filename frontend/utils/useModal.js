import { useState } from 'react';

export const useModal = (initialMode = false) => {
  const [visible, setVisible] = useState(initialMode);
  const toggleModal = () => {
      setVisible(!visible);    
  }

  return [visible, setVisible, toggleModal]
};

