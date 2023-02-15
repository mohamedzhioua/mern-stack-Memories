import React, { useState } from "react";
import { useField, ErrorMessage } from "formik";
import {Popper} from "../../index";
// Styles
import styles from "./style.module.css";
import { MdOutlineErrorOutline } from "react-icons/md";

function AuthInput({ placeholder, dir, type, disabled, ...props }) {
    const [trigger, setTrigger] = useState(null);
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);

  return (
    <div className={styles.authInput_container} ref={setTrigger}>
      {meta.touched && meta.error && show && (
        <Popper placement={dir || "top-start"} offsetNum={8}>
          <ErrorMessage name={field.name} />
        </Popper>
      )}
      <input
        className={meta.touched && meta.error ? styles.ERROR : ""}
        type={type}
        name={field.name}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="on"
        {...field}
        onFocusCapture={() => setShow(true)}
        onBlurCapture={(e) => {
          setShow(false);
        }}
      />
      {meta.touched && meta.error && (
        <MdOutlineErrorOutline className={styles.ER} style={{ top: "15px" , width: "16px",
        height: "16px" }}/>
      )}
    </div>
  );
}

export default AuthInput;
