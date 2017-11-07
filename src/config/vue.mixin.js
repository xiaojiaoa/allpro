// const mixin =  {
//     data () {
//          return{
//             isWx : false,
//             isAliPay :false,
//             isLoading:false,
//             alert:'',
//             isSuccess:false,
//          }
//     },

//     mounted ()  {

//         let sreenHeight = window.innerHeight,
//             pageMinHeight = sreenHeight;

//         let pages = document.querySelectorAll(".container");

       

//         // 不同浏览器兼容处理
//         let userAgent = window.navigator.userAgent.toLowerCase();

//         this.isWx = userAgent.match( /MicroMessenger/i ) == 'micromessenger'
//                     ? true : false ;
//         this.isAliPay = userAgent.match( /aliapp/i ) == 'aliapp'
//                         ? true : false;

//         pageMinHeight = ( this.isWx || this.isAliPay ) ? sreenHeight : pageMinHeight ;
        
//         Array.from(pages).forEach( ( page) => {
//              page.style.minHeight = pageMinHeight + 'px';
//         });
       
//     }
// }

// export default mixin;