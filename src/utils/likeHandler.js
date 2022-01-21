
const setLike = (e) => {
    const parent = e.target.parentNode
    const text = parent.querySelector(".text");
    const elem = e.target.parentNode.querySelector(".sub-image");

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
let timeout = 0
export const likeHandler = (e, history) => {
    if (e.target.classList.contains("sub-image")) {
        if (timeout === 0) {
            timeout = setTimeout(function () {

                history.push(`/image/${e.target.getAttribute("data-id")}`);
                timeout = 0;
            }, 250);
        } else {
            setLike(e);
            clearTimeout(timeout);
            timeout = 0;
        }
    }
}
