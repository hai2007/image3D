import xhtml from '@hai2007/tool/xhtml';
import OpenWebEditor from 'open-web-editor';

export default {
    inserted: (el, binding) => {

        let code = el.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        let owe = new OpenWebEditor({

            // 编辑器挂载点
            el,

            // 初始化文本
            content: code,

            // 是否只读
            readonly: binding.type != 'editor',

            // 着色语言
            shader: [binding.exp || 'javascript', {
                insign: "#000000",
                "css": {
                    insign: "#000000"
                },
                "javascript": {
                    insign: "#000000"
                }
            }],

            // 设置颜色
            color: {
                background: "rgb(239, 235, 234)", /*编辑器背景*/
                text: "#000000", /*文本颜色*/
                number: "#888484", /*行号颜色*/
                edit: "#eaeaf1", /*编辑行背景色*/
                cursor: "#ff0000", /*光标颜色*/
                select: "gray", /*选择背景*/
            },

            // 是否隐藏行号
            // 如果只有一行，就不显示行号(编辑界面一定显示)
            noLineNumber: !/\n/.test(code)

        });

        // 添加复制按钮
        let btnNode = xhtml.prepend(el, '<span class="copy-btn" title="复制到剪切板">复制<span></span></span>');

        xhtml.bind(btnNode, 'click', () => {
            owe.copy(() => {
                alert('复制成功')
            }, error => {
                console.log(error);
                alert('复制失败')
            });
        });

        xhtml.setStyles(btnNode, {
            position: "absolute",
            right: "10px",
            top: "6px",
            border: "none",
            outline: 0,
            padding: "4p 10p",
            transition: "0.2s",
            "font-size": "12px",
            cursor: "pointer",
            "z-index": 1,
            "line-height": '20px',
            "background-color": "#f8f8f8",
            "padding": "5px 10px"
        });

        el.__owe__ = owe;

    }
};
