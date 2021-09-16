import QuickPaper from 'quick-paper';

// 兼容文件
import '@hai2007/polyfill/Promise.js';

// 引入样式
import '@hai2007/style/normalize.css';
import './assets/style.scss';
import '@hai2007/style/doc-view.css'

import qCode from './directives/q-code'; QuickPaper.directive('qCode', qCode);

let urlFormat = function (url) {

    let splitTemp = url.split('?');
    let routerTemp = (splitTemp[0] + "#").split("#")[1].replace(/^\//, '').replace(/\/$/, '').split('/');
    let paramTemp = splitTemp[1] || "";

    let paramResult, paramArray;
    if (paramTemp == "") {
        paramResult = {};
    } else {
        paramArray = paramTemp.split("&"), paramResult = {};
        paramArray.forEach(item => {
            let temp = item.split("=");
            paramResult[temp[0]] = temp[1];
        });
    }

    let resultData = {
        router: routerTemp[0] == '' ? [] : routerTemp,
        params: paramResult
    };

    return resultData;
};

QuickPaper.prototype.urlFormat = urlFormat;

import uiSearch from './components/ui-search.paper'; QuickPaper.component('uiSearch', uiSearch);
import uiFooter from './components/ui-footer.paper'; QuickPaper.component('uiFooter', uiFooter);

import doScroll from './Service/doScroll'; QuickPaper.prototype.doScroll = doScroll;

// 打开新页面
QuickPaper.prototype.loadPage = url => {
    let aDom = document.createElement('a');
    aDom.setAttribute('href', url);
    aDom.setAttribute('target', '_blank');
    aDom.click();
};

let pagename = urlFormat(window.location.href).router[0];


// 启动界面
let pages = {
    app: () => import('./App.paper'),
    core: () => import('./pages/core.paper')
};

(pagename in pages ? pages[pagename] : pages.app)().then(data => {

    // 创建对象
    window.quickPaper = new QuickPaper({

        // 挂载点
        el: document.getElementById('root'),

        // 启动组件
        render: createElement => createElement(data.default)

    });

});
