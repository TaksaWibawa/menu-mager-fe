export const toggleModal = (id) => {
  const showModal = () => {
    document.getElementById(id).showModal();
  };

  const closeModal = () => {
    document.getElementById(id).close();
  };

  return [showModal, closeModal];
};
