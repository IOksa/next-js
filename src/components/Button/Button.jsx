import css from "./Button.module.css";

const Button = ({ type, caption, disabled=false, openModal }) => {
    // console.log(showModal);
    return (
        <>
            <button type={type} disabled={disabled} onClick={openModal} className={css.button}>
                {caption}
            </button>
        </>
    );
};

export default Button;
