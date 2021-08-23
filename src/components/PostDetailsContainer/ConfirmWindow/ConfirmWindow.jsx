//libraries
import { React, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { animateModal } from "../../../utils/animation";
//css
import s from "./ConfirmWindow.module.css";

const ConfirmWindow = ({
  setConfirmWindowIsOpen,
  deletePost,
  postId,
  postNumber,
  setPostNumber,
  ...props
}) => {
  const handleClick = () => {
    deletePost(postId).then(() => {
      setPostNumber(postNumber + 1);
      setTimeout(() => {
        props.history.push("/posts");
        document.body.classList.remove("lock");
      });
    });
  };

  useEffect(() => animateModal(s.window_overflow), [setConfirmWindowIsOpen]);

  return (
    <div className={s.window_overflow}>
      <div className={s.window}>
        <div className={s.question}>Are you sure?</div>
        <div className={s.buttons_wrap}>
          <button onClick={handleClick} className={s.confirm_btn}>
            Confirm
          </button>

          <button
            className={s.cancel_btn}
            onClick={() => {
              setConfirmWindowIsOpen(false);
              document.body.classList.remove("lock");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ConfirmWindow);
