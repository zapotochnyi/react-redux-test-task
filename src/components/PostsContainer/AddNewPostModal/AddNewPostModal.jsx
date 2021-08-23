import { React, useState, useEffect } from "react";
//components
import ModalWindow from "../../common/ModalWindow";

const AddNewPostModal = ({ setIsOpen, addPostToAPI, userId }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (formData) {
      addPostToAPI(userId, formData.title, formData.post).then(() => {
        setIsOpen(false);
        document.body.classList.remove("lock");
      });
    }
  }, [formData, addPostToAPI, userId, setIsOpen]);

  return <ModalWindow setFormData={setFormData} setIsOpen={setIsOpen} />;
};

export default AddNewPostModal;
