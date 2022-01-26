import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//Хук обрабатывает клик по картинке и в зависимости от того двойной был клик, или один выдает анимацию лайка, или переводит пользователя на страницу картинки
let timeout = 0
export const useLike = (el) => {

    const history = useHistory()
    const setLike = (e) => {
        const text = e.target.parentNode.querySelector(".text");
        const elem = e.target

        function toggleLike(direction) {
            elem.style.animationName = "pulse";
            elem.style.animationDuration = "0.75s";
            elem.style.animationDirection = direction;
        }

        if (JSON.parse(elem.getAttribute("is-liked"))) {
            return;
        }
        text.innerText = parseInt(text.innerText) + 1;

        const opacity = elem.style.opacity;

        if (opacity != 0.0) {
            elem.style.opacity = 0.0;
        } else {
            toggleLike();
            elem.setAttribute("is-liked", true);
            elem.offsetParent.children[0].style.backgroundImage =
                'url("../assets/icons/heart_background_white.png")';
        }
    }




    const handler = (e) => {

        if (e.target.classList.contains('sub-image')) {
            if (timeout === 0) {
                timeout = setTimeout(() => {
                    timeout = 0
                    history.push(`/image/${e.target.getAttribute("data-id")}`)
                }
                    , 250);
            } else {
                setLike(e);
                clearTimeout(timeout);
                timeout = 0;
            }
        }
    }


    useEffect(() => {
        console.log(el)
        if (el.current) {
            el.current.addEventListener('click', handler) // Вешаем обработчик на клик по обертке картинок
        }
        return () => el.current ?  el.current.removeEventListener('click', handler) : ''
    }, [el])

} 