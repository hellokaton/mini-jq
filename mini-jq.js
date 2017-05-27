var Jquery = function (ss, el) {
    this.selector = ss;
    this.el = el;
};

function $(selector) {
    console.log('selector => ' + selector);
    var dom = document.querySelectorAll(selector);
    if (dom.length <= 0) {
        return null;
    }
    var el;
    if (dom.length == 1) {
        el = document.querySelectorAll(selector)[0];
    } else {
        el = document.querySelectorAll(selector);
    }
    return new Jquery(selector, el);
}

/**
 * 返回DOM innerHTML
 * @returns {string}
 */
Jquery.prototype.html = function (html) {
    if (html) {
        this.el.innerHTML = html;
    } else {
        return this.el.innerHTML;
    }
};

/**
 * 返回DOM text文本
 * @returns {string}
 */
Jquery.prototype.text = function (text) {
    if (text) {
        this.el.textContent = text;
    } else {
        return this.el.textContent;
    }
};

Jquery.prototype.length = function () {
    return this.el.length;
};

Jquery.prototype.each = function (eachCall) {
    Array.prototype.forEach.call(this.el, function (index, value) {
        eachCall(index, new Jquery('', value));
    });

    // var len = this.length();
    // for (var i = 0; i < len; i++) {
    //     eachCall(new Jquery('', this.el[i]));
    // }
};

Jquery.prototype.attr = function (attr, value) {
    if (value) {
        this.el.setAttribute(attr, value);
    } else {
        return this.el.getAttribute(attr);
    }
};

Jquery.prototype.css = function (ruleName, ruleValue) {
    if (ruleValue) {
        this.el.style[ruleName] = ruleValue;
    } else {
        return getComputedStyle(this.el)[ruleName];
    }
};

/**
 * 查找下一个节点
 *
 * @param selector
 * @returns {Jquery}
 */
Jquery.prototype.find = function (selector) {
    var el = this.el.querySelectorAll(selector)[0];
    return new Jquery(selector, el);
};

Jquery.prototype.append = function (html) {
    this.el.insertAdjacentHTML('beforeend', html);
};

Jquery.prototype.prepend = function (html) {
    this.el.insertAdjacentHTML('afterbegin', html);
};

Jquery.prototype.insertBefore = function (html) {
    this.el.insertAdjacentHTML('beforebegin', html);
};

Jquery.prototype.before = function (html) {
    this.el.insertAdjacentHTML('beforebegin', html);
};

Jquery.prototype.insertAfter = function (html) {
    this.el.insertAdjacentHTML('afterend', html);
};

Jquery.prototype.after = function (html) {
    this.el.insertAdjacentHTML('afterend', html);
};

Jquery.prototype.children = function () {
    return new Jquery('', this.el.children);
};

Jquery.prototype.ready = function (fn) {
    // 检测 DOMContentLoaded 是否已完成
    if (document.readyState === 'complete' || document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

Jquery.prototype.is = function (selector) {
    return (this.el.matches || this.el.matchesSelector || this.el.msMatchesSelector
    || this.el.mozMatchesSelector || this.el.webkitMatchesSelector
    || this.el.oMatchesSelector).call(this.el, selector);
};

Jquery.prototype.prev = function () {
    return new Jquery('', this.el.previousElementSibling);
};

Jquery.prototype.next = function () {
    return new Jquery('', this.el.nextElementSibling);
};

Jquery.prototype.siblings = function () {
    //   Array.prototype.filter.call(el.parentNode.children, function(child){
    //   return child !== el;
// })
};

Jquery.prototype.offset = function () {
    var rect = this.el.getBoundingClientRect();
    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
};

Jquery.prototype.offsetParent = function () {
    return this.el.offsetParent || this.el;
};

Jquery.prototype.outerHeight = function () {
    return this.el.offsetHeight;
};

Jquery.prototype.outerWidth = function () {
    return this.el.offsetWidth;
};

Jquery.prototype.parent = function () {
    return new Jquery('', this.el.parentNode);
};

Jquery.prototype.position = function () {
    return {left: this.el.offsetLeft, top: this.el.offsetTop};
};

Jquery.prototype.remove = function () {
    return this.el.parentNode.removeChild(this.el);
};

Jquery.prototype.empty = function () {
    this.el.innerHTML = '';
};

Jquery.prototype.on = function (eventName, fn) {
    this.el.addEventListener(eventName, fn);
};

Jquery.prototype.off = function (eventName, fn) {
    this.el.removeEventListener(eventName, fn);
};

Jquery.prototype.show = function () {
    this.el.style.display = '' | 'inline' | 'inline-block' | 'inline-table' | 'block';
};

Jquery.prototype.hide = function () {
    this.el.style.display = 'none';
};

/**
 * 显示或隐藏元素
 */
Jquery.prototype.toggle = function () {
    if (this.el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
        this.el.style.display = '' | 'inline' | 'inline-block' | 'inline-table' | 'block';
    } else {
        this.el.style.display = 'none';
    }
};

/**
 * FadeIn
 * @param seconds
 */
Jquery.prototype.fadeIn = function (seconds) {
    this.el.style.transition = 'opacity ' + seconds + 's';
    this.el.style.opacity = '1';
};

/**
 * fadeOut
 * @param seconds
 */
Jquery.prototype.fadeOut = function (seconds) {
    this.el.style.transition = 'opacity ' + seconds + 's';
    this.el.style.opacity = '0';
};

/**
 * 调整元素透明度
 *
 * @param sd
 * @param opacity
 */
Jquery.prototype.fadeTo = function (sd, opacity) {
    var speed = sd == 'slow' ? 'opacity 3s' : 'opacity 1s';
    this.el.style.transition = speed; // 假设 'slow' 等于 3 秒
    this.el.style.opacity = opacity;
};

/**
 * 动画调整透明度用来显示或隐藏
 */
Jquery.prototype.fadeToggle = function () {
    this.el.style.transition = 'opacity 3s';
    var opacity = this.el.ownerDocument.defaultView.getComputedStyle(this.el, null);
    if (opacity === '1') {
        this.el.style.opacity = '0';
    } else {
        this.el.style.opacity = '1';
    }
};

Jquery.prototype.SlideUp = function () {
    this.el.style.transition = 'height 3s';
    // slideUp
    this.el.style.height = '0px';
};

Jquery.prototype.slideDown = function (originHeight) {
    this.el.style.transition = 'height 3s';
    // slideUp
    this.el.style.height = originHeight;
};

Jquery.prototype.trigger = function (eventName, data) {
    var event;
    if (window.CustomEvent) {
        event = new CustomEvent(eventName, {detail: data});
    } else {
        event = document.createEvent(eventName);
        event.initCustomEvent(eventName, true, true, data);
    }
    this.el.dispatchEvent(event);
};

Jquery.prototype.addClass = function (cls) {
    if (this.el.classList)
        this.el.classList.add(cls);
    else
        this.el.className += ' ' + cls;
};

Jquery.prototype.removeClass = function (cls) {
    if (this.el.classList)
        this.el.classList.remove(cls);
    else
        this.el.className = this.el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

Jquery.prototype.toggleClass = function (cls) {
    if (this.el.classList) {
        this.el.classList.toggle(cls);
    } else {
        var classes = this.el.className.split(' ');
        var existingIndex = classes.indexOf(cls);
        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(cls);
        this.el.className = classes.join(' ');
    }
};

Jquery.prototype.hasClass = function (cls) {
    if (this.el.classList)
        this.el.classList.contains(cls);
    else
        new RegExp('(^| )' + cls + '( |$)', 'gi').test(this.el.className);
};

/**
 * 发起Ajax请求
 *
 * @param options
 */
$.ajax = function (options) {
    var url = options.url;
    var method = options.method || 'GET';
    var headers = options.headers || {};
    var body = options.body;
    var dataType = options.dataType || 'text';

    fetch(url, {
        method: method,
        headers: headers,
        body: body
    }).then(function (response) {
        if (response.ok) {
            var nextRes;
            if (dataType == 'text') {
                nextRes = response.text();
            }
            if (dataType == 'json') {
                nextRes = response.json();
            }
            nextRes.then(function (data) {
                options.success(data);
            });
        } else {
            options.error(response);
        }
    }).catch(function (e) {
        options.fail(e);
    });
};

/**
 * 发起GET请求
 *
 * @param url
 * @param success
 */
$.get = function (url, success) {
    $.ajax({
        url: url,
        method: 'GET',
        success: success
    });
};

$.getJSON = function (url, success) {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: success
    });
};

/**
 * 发起POST请求
 *
 * @param url
 * @param data
 * @param success
 */
$.post = function (url, data, success) {
    var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    $.ajax({
        url: url,
        method: 'POST',
        headers: headers,
        success: success,
        body: data
    });
};

/**
 * 检测参数是不是数组
 *
 * @param range
 * @returns {boolean}
 */
$.isArray = function (range) {
    return Array.isArray(range);
};

/**
 * 检测参数是不是 window
 *
 * @param obj
 * @returns {boolean}
 */
$.isWindow = function (obj) {
    return obj !== null && obj !== undefined && obj === obj.window;
};

/**
 * 在数组中搜索指定值并返回索引 (找不到则返回 -1)
 *
 * @param item
 * @param array
 * @returns {boolean}
 */
$.inArray = function (item, array) {
    return array.indexOf(item) > -1;
};

/**
 * 检测传入的参数是不是数字
 *
 * @param value
 * @returns {boolean}
 */
$.isNumeric = function (value) {
    var type = typeof value;
    return (type === 'number' || type === 'string') && !Number.isNaN(value - Number.parseFloat(value));
};

/**
 * 检测传入的参数是不是 JavaScript 函数对象
 *
 * @param item
 * @returns {boolean}
 */
$.isFunction = function (item) {
    if (typeof item === 'function') {
        return true;
    }
    var type = Object.prototype.toString(item);
    return type === '[object Function]' || type === '[object GeneratorFunction]';
};

/**
 * 检测对象是否为空 (包括不可枚举属性).
 *
 * @param obj
 * @returns {boolean}
 */
$.isEmptyObject = function (obj) {
    return Object.keys(obj).length === 0;
};

/**
 * 检测是不是扁平对象 (使用 “{}” 或 “new Object” 创建).
 *
 * @param obj
 * @returns {boolean}
 */
$.isPlainObject = function (obj) {
    if (typeof (obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {
        return false;
    }
    if (obj.constructor &&
        !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
    }
    return true;
};

/**
 * 合并多个对象的内容到第一个对象
 *
 * @param obj
 * @param defaultOpts
 * @param opts
 */
$.extend = function (obj, defaultOpts, opts) {
    // Object.assign(obj || {}, defaultOpts || {}, opts || {});
    var deepExtend = function (out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (!obj)
                continue;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }
        return out;
    };
};

/**
 * 移除字符串头尾空白
 *
 * @param value
 * @returns {string}
 */
$.trim = function (value) {
    return value.trim();
};

/**
 * 将数组或对象转化为包含新内容的数组
 *
 * @param array
 * @param callback
 */
$.map = function (array, callback) {
    array.map(callback(value, value));
};

/**
 * 轮询函数，可用于平滑的轮询对象和数组。
 *
 * @param array
 * @param callback
 */
$.each = function (array, callback) {
    array.forEach(callback(item, i));
};

/**
 * 找到数组中符合过滤函数的元素
 *
 * @param array
 * @param callback
 */
$.grep = function (array, callback) {
    array.filter(callback(value, index));
};

/**
 * 检测对象的 JavaScript [Class] 内部类型
 *
 * @param item
 * @returns {string}
 */
$.type = function (item) {
    const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
    return Object.prototype.toString.call(item)
        .replace(reTypeOf, '$1')
        .toLowerCase();
};

/**
 * 合并第二个数组内容到第一个数组
 *
 * @param arr1
 * @param arr2
 */
$.merge = function (arr1, arr2) {
    return [].concat(arr1, arr2);
};

/**
 * 返回当前时间的数字呈现
 *
 * @returns {number}
 */
$.now = function () {
    return Date.now();
};

/**
 * 传入函数并返回一个新函数，该函数绑定指定上下文
 *
 * @param fn
 * @param context
 */
$.proxy = function (fn, context) {
    fn.bind(context);
};

/**
 * 类数组对象转化为真正的 JavaScript 数组
 *
 * @param arrayLike
 */
$.makeArray = function (arrayLike) {
    Array.prototype.slice.call(arrayLike);
};

/**
 * 检测 DOM 元素是不是其他 DOM 元素的后代
 *
 * @param el
 * @param child
 * @returns {boolean}
 */
$.contains = function (el, child) {
    return el !== child && el.contains(child);
};

/**
 * 全局执行 JavaScript 代码
 *
 * @param code
 */
$.globaleval = function (code) {
    const script = document.createElement('script');
    script.text = code;
    document.head.appendChild(script).parentNode.removeChild(script);
};

/**
 * 解析字符串为 DOM 节点数组
 *
 * @param string
 * @returns {HTMLElement[]}
 */
$.parseHTML = function (string) {
    const context = document.implementation.createHTMLDocument();

    // Set the base href for the created document so any parsed elements with URLs
    // are based on the document's URL
    const base = context.createElement('base');
    base.href = document.location.href;
    context.head.appendChild(base);

    context.body.innerHTML = string;
    return context.body.children;
};

/**
 * 解析json
 *
 * @param str
 */
$.parseJSON = function (str) {
    return JSON.parse(str);
};
