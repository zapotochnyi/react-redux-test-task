//libraries
import { React, useState, useEffect } from "react";
import { animateModal } from "../../utils/animation";
//css
import s from "./ModalWindow.module.css";
//components
import Textarea from "rc-textarea";

const ModalWindow = ({ setFormData, setIsOpen, title = null, body = null }) => {
  const [fieldsNotFilled, setFieldsNotFilled] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [localBody, setLocalBody] = useState(body);

  const handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let post = e.target.post.value;
    if (title && post) {
      setFormData({ title, post });
      document.body.classList.remove("lock");
    } else {
      setFieldsNotFilled(true);
    }
  };

  useEffect(() => animateModal(s.modal_overflow), [setIsOpen]);

  return (
    <div className={s.modal_overflow}>
      <div className={s.modal_window}>
        <form onSubmit={handleSubmit}>
          <div className={s.title_wrap}>
            <span>Title</span>
            <input
              value={localTitle}
              onChange={(e) => setLocalTitle(e.currentTarget.value)}
              type="text"
              name="title"
            />
          </div>

          <div className={s.post_wrap}>
            <span className={s.post_span}>Post</span>
            <Textarea
              value={localBody}
              onChange={(e) => setLocalBody(e.currentTarget.value)}
              className={s.text_area}
              autoSize={{ minRows: 8, maxRows: 8 }}
              name="post"
            />
          </div>

          <div className={s.buttons_wrap}>
            {fieldsNotFilled && (
              <div className={s.fields_message}>Please fill in all fields</div>
            )}
            <button className={s.publish_btn} type="submit">
              Publish
            </button>
            <button
              className={s.cancel_btn}
              onClick={() => {
                setIsOpen(false);
                document.body.classList.remove("lock");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
