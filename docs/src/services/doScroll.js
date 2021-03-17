import fixedScroll from './fixedScroll';

export default function (routername, fixedName) {
    console.log(routername,fixedName);
    window.location.href = "./index.html#/" + routername + "?fixed=" + fixedName;
    fixedScroll();
};
