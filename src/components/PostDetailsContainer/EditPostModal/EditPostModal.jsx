import React, { useEffect, useState } from "react";
//components
import ModalWindow from "../../common/ModalWindow";

const EditPostModal = ({
  setIsOpen,
  editPost,
  postId,
  userId,
  title,
  body,
}) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (formData) {
      editPost(postId, formData.title, formData.post, userId).then(() => {
        setIsOpen(false);
        document.body.classList.remove("lock");
      });
    }
  }, [formData, postId, setIsOpen, editPost, userId]);

  return (
    <ModalWindow
      setFormData={setFormData}
      setIsOpen={setIsOpen}
      title={title}
      body={body}
    />
  );
};

export default EditPostModal;
