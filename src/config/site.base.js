// (function(){
//     var docEl = document.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = () => {
//             //设置根字体大小
//             var tagFont = 50 * (docEl.clientWidth / 360)
//             if (tagFont > 60) {
//                 docEl.style.fontSize = '60px';
//             } else {
//                 docEl.style.fontSize = 50 * (docEl.clientWidth / 360) + 'px';
//             }
//         };
        
//     //绑定浏览器缩放与加载时间
//     window.addEventListener(resizeEvt, recalc, false);
//     document.addEventListener('DOMContentLoaded', recalc, false);

// })();
    