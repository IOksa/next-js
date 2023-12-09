'use client'
import React, { useState,  useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button/Button";
import services from "../../data/services";
import * as API from "../../services/api";
import useLocalStorage from "../../hooks/useLocalStorage";
import css from "./CallForm.module.css";

const LS_KEY='test_call_form';
const LS_CHECKBOX_KEY='checkbox';

const CallForm = () => {
    const initialValues = {name: "", surname: "", phone: "", service: "", comment: "", policy: false};

    const [data, setData] = useLocalStorage(LS_KEY, initialValues);
    // const [policy, setPolicy]=useLocalStorage(LS_CHECKBOX_KEY, false);
    // const [policy, setPolicy]=useState(false);
    console.log("useLocalStorage data=", data);
    // console.log("useLocalStorage policy=", policy);
    const {name, surname, phone, service, comment, policy}=data;


    // const handleChangeCheckbox = (evt) => {
    //     const { checked } = evt.target;   
    //     setPolicy(checked); 
    // };

   
    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;   
        console.log("handleChange evt.target=", evt.target);
        setData(prevState=>({...prevState, [name]: type === "checkbox" ? checked : value}));   
        // setData(prevState=>({...prevState, [name]:value}));  
        console.log("handleChange data=", data);
        
    };
  

    const handleSubmit = (e) => {
        e.preventDefault();
  
        if (service === "") {
            toast.error(`Оберіть потрібну послугу з переліку`, {
                duration: 3000,
                position: "top-center",
            });
        } else 
        if (!policy) {
            toast.error(
                `Поставте "V" у полі "Погоджуюся з Політикою конфіденційності"`,
                { duration: 3000, position: "top-center" }
            );
        } else {
            // const message = `Ім'я: ${name}\nПрізвище: ${surname}\nТелефон: ${phone}\nПослуга: ${service}\nКоментарій: ${comment}`;
            
            // console.log(message);
            // API.sendMessageToTelegram(message);

            setData(initialValues);
            // setPolicy(false);
        }
    };

    return(
        <div className={css.wrapper}>
            <Toaster />
            <form className={css.formCall} onSubmit={handleSubmit}>
                <h3 className={css.formTitle}>
                    Залиште свої дані,
                    <br /> ми вам передзвонимо
                </h3>
                <label className={css.formLabel}>
                    <input
                        type="text"
                        className={css.formInput}
                        name="name"
                        placeholder="Введіть ваше ім'я"
                        minLength="2"
                        pattern="[A-Za-zА-Яа-яІіїЇЄєЁё'\-]{2,50}"
                        title="Ім'я повинно містити тільки літери та  апостроф ', довжина імені від 2 до 50 символів"
                        autoFocus
                        required
                        value={name}
                        onChange={handleChange}

                    />
                </label>

                <label className={css.formLabel}>
                    <input
                        type="text"
                        className={css.formInput}
                        name="surname"
                        placeholder="Введіть ваше прізвище"
                        required
                        minLength="2"
                        pattern="[A-Za-zА-Яа-яІіЇїЄєЁё'\-]{2,70}"
                        title="Прізвище повинно містити тільки літери, '-', апостроф ', довжина імені від 2 до 70 символів"
                        value={surname}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="service" className={css.formLabel}>
                    <select
                        id="service"
                        name="service"
                        className={css.formSelect}
                        value={service}
                        onChange={handleChange}
           
                    >
                        <option value="">
                            Оберіть послугу
                        </option>
                        {services?.length > 0 &&
                            services.map(({ id, title }) => (
                                <option key={id} value={title}>
                                    {title}
                                </option>
                            ))}
                    </select>
                </label>
                <label className={css.formLabel}>
                    <input
                        type="tel"
                        className={css.formInput}
                        name="phone"
                        pattern="[+]{1}[0-9]{12}"
                        title="Телефонний номер повинен починатися з '+' та мати 12 цифр"
                        placeholder="Введіть телефон +380XXXXXXXXX"
                        required
                        value={phone}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="comment">
                    <textarea
                        className={css.formTextarea}
                        name="comment"
                        id="comment"
                        placeholder="Введіть текст повідомлення"
                        value={comment}
                        onChange={handleChange}
                    />
                </label>
                <div className={css.butWrapper}>
                    <Button type="submit" caption="Передзвонити" />
                </div>

                <div className={css.policyWrapper}>
                    <input
                        type="checkbox"
                        name="policy"
                        id="policy"
                        className={css.checkboxPolicy}
                        checked={policy}
                        onChange={handleChange}
                    />
                    <svg width="16" height="15" className={css.checkboxIcon}>
                        <use href="./icons/symbol-defs.svg#icon-check"></use>
                    </svg>
                    <label htmlFor="policy" className={css.policyLabel}>
                        Погоджуюся з
                        <a
                            href="./PrivatePolicy.docx"
                            className={css.policyLink}
                        >
                            {" "}
                            Політикою конфіденційності
                        </a>
                    </label>
                </div>
            </form>
           
        </div>
    );
};

export default CallForm;


// window.addEventListener("DOMContentLoaded",() => {
// 	const btn = document.querySelector("button");
// 	var doneTimeout = null,
// 		resetTimeout = null;

// 	if (btn) {
// 		btn.addEventListener("click",function() {
// 			const runClass = "btn--running";
// 			const doneClass = "btn--done";
// 			// `.btn--running .btn__progress-fill` `stroke-dashoffset` duration in ms
// 			const submitDuration = 2000;
// 			const resetDuration = 1500;

// 			// fake the submission
// 			this.disabled = true;
// 			this.classList.add(runClass);

// 			clearTimeout(doneTimeout);
// 			clearTimeout(resetTimeout);

// 			doneTimeout = setTimeout(() => {
// 				this.classList.remove(runClass);
// 				this.classList.add(doneClass);
				
// 				// reset the button
// 				resetTimeout = setTimeout(() => {
// 					this.disabled = false;
// 					this.classList.remove(doneClass);
// 				}, resetDuration);

// 			}, 600 + submitDuration);
// 		});
// 	}
// });