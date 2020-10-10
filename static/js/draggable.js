; (function (window, undefined) {
    //#region dom方法
    var dom = {
        on: function (node, eventName, handler) {
            if (node.addEventListener) {
                node.addEventListener(eventName, handler);
            }
            else {
                node.attachEvent("on" + eventName, handler);
            }
            return this;
        },
        off: function (node, eventName, handler) {
            if (node.removeEventListener) {
                node.removeEventListener(eventName, handler);
            }
            else {
                node.detachEvent("on" + eventName, handler);
            }
            return this;
        },
        getStyle: function (node, styleName) {
            var realStyle = null;
            if (window.getComputedStyle) {
                realStyle = window.getComputedStyle(node, null)[styleName];
            }
            else if (node.currentStyle) {
                realStyle = node.currentStyle[styleName];
            }
            return realStyle;
        },
        setCss: function (node, css) {
            for (var key in css) {
                node.style[key] = css[key];
            }
            return this;
        }
    };
    //#endregion

    //#region 拖拽元素类
    function DragElement(node) {
        this.target = node;

        node.onselectstart = function () {
            //防止拖拽对象内的文字被选中
            return false;
        }
    }
    DragElement.prototype = {
        constructor: DragElement,
        setXY: function (x, y) {
            this.x = parseInt(x) || 0;
            this.y = parseInt(y) || 0;
            return this;
        },
        setTargetCss: function (css) {
            dom.setCss(this.target, css);
            return this;
        }
    }
    //#endregion

    //#region 鼠标元素
    function Mouse() {
        this.x = 0;
        this.y = 0;
    }
    Mouse.prototype.setXY = function (x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }
    //#endregion

    //拖拽配置
    var draggableConfig = {
        zIndex: 1,
        dragElement: null,
        mouse: new Mouse()
    };

    var draggableStyle = {
        dragging: {
            cursor: "move"
        },
        defaults: {
            cursor: "default"
        }
    }

    function drag(ele) {
        var dragNode = (ele.querySelector(".draggable") || ele);
        dom.on(dragNode, "mousedown", function (event) {
            var dragElement = draggableConfig.dragElement = new DragElement(ele);

            draggableConfig.mouse.setXY(event.clientX, event.clientY);
            draggableConfig.dragElement
                .setXY(dragElement.target.style.left, dragElement.target.style.top)
                .setTargetCss({
                    "zIndex": draggableConfig.zIndex++,
                    "position": "relative"
                });
        }).on(dragNode, "mouseover", function () {
            dom.setCss(this, draggableStyle.dragging);
        }).on(dragNode, "mouseout", function () {
            dom.setCss(this, draggableStyle.defaults);
        });
    }

    function move(event) {
        if (draggableConfig.dragElement) {
            var mouse = draggableConfig.mouse,
                dragElement = draggableConfig.dragElement;
            dragElement.setTargetCss({
                "left": parseInt(event.clientX - mouse.x + dragElement.x) + "px",
                "top": parseInt(event.clientY - mouse.y + dragElement.y) + "px"
            });

            dom.off(document, "mousemove", move);
            setTimeout(function () {
                dom.on(document, "mousemove", move);
            }, 25);
        }
    }

    dom.on(document, "mousemove", move);

    dom.on(document, "mouseup", function (event) {
        draggableConfig.dragElement = null;
    })

    window.drag = Drag;
})(window, undefined);