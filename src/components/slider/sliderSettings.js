import { Lazy } from "swiper"
export const settings = {
    modules: [Lazy],
    lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
        loadPrevNextAmount: 2,
    },
    //freeMode={{
    //  enabled:true,
    //  sticky:true,
    //}}
    touchRatio: 3,
    speed: 1000,
    slidesPerView: 5,
    spaceBetween: 5,
    autoHeight: true,
    loop: false,
    grabCursor: true,

    breakpoints: {
        "@0.75": {
            slidesPerView: 5,
        },
        "@1.25": {
            slidesPerView: 10,
        },
    }
}