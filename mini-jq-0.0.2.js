(function () {
    var $ = window.$ = function (selector, context) {
        return new $.fn.init(selector, context);
    };
    var isLetter = function (str) {
        if (str && 'string' == typeof str) {
            str = str.toUpperCase()
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i)
                if (code < 65 || code > 90) {
                    return false
                }
            }
            return true;
        }
        return false;
    }, classes = 'boolean number string function array date regexp object error'.split(' ');

    // 原型对象处理
    $.fn = $.prototype = {
        version: '0.0.2',
        constructor: $,
        length: 0,
        init: function (selector, context) {
            if (!selector) return this // $(null)
            var len = selector.length
            if ($.isFunction(selector)) {
                return selector()
            } else if (selector.nodeType) {
                // $(dom)
                this.context = this[0] = selector
                this.length = 1
            } else if ('string' == typeof selector) {
                context = context || document;
                if (context.nodeType) context = $(context) // convert dom to $(dom)
                return context.find(selector)
            } else if (len) {
                // $([dom1, dom2])
                // should after string, because string, function has length too
                for (var i = 0; i < len; i++) {
                    if (selector[i] && selector[i].nodeType) {
                        this[this.length] = selector[i]
                        this.length++;
                    }
                }
            }
            return this;
        },
        get: function (i) {
            return i < 0 ? this[i + this.length] : this[i];
        },
        find: function (str) {
            var f = function (str, context) {
                var ret = [];
                if (context && context.length) {
                    for (var i = 0, node; node = context[i++];) {
                        ret.push.apply(ret, $.findOne(str, node))
                    }
                } else {
                    ret.push.apply(ret, $.findOne(str, context))
                }
                return ret;
            };
            return $(f(str, this));
        },
        each: function (fn) {
            return $.each(this, fn)
        },
        map: function (fn) {
            return $.map(this, fn)
        },
        filter: function (fn) {
            return $.filter(this, fn)
        },
        pushStack: function (elems) {
            var ret = $.merge($(), elems)
            ret.prevObject = this
            ret.context = this.context
            return ret;
        },
        eq: function (i) {
            var len = this.length
            i = +i
            if (i < 0) {
                i = len + i
            }
            return this.pushStack([this[i]] || []);
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        ready: function (fn) {
            if (this.context.readyState === 'complete' || this.context.readyState !== 'loading') {
                fn();
            } else {
                this.context.addEventListener('DOMContentLoaded', fn);
            }
        }
    };

    $.fn.init.prototype = $.fn;

    // 继承
    $.extend = $.fn.extend = function () {
        var len = arguments.length;
        var i = 1, obj
        var target = arguments[0] || {};
        if (1 == len) {
            target = this;
            i--
        }
        for (; i < len; i++) {
            obj = arguments[i];
            if (obj && 'object' == typeof obj) {
                for (var k in obj) {
                    target[k] = obj[k]
                }
            }
        }
        return target;
    };

    // 扩展静态方法
    $.extend({
        toArray: function (arr, ret) {
            ret = ret || [];
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                ret.push(arr[i])
            }
            return ret
        },
        each: function (arr, fn) {
            var len = arr ? arr.length : 0;
            if (len && len > 0 && 'function' == typeof fn) {
                for (var i = 0; i < len; i++) {
                    if (false === fn.call(arr[i], i, arr[i], arr)) break
                }
            }
            return arr
        },
        filter: function (arr, fn) {
            var ret = [];
            $.each(arr, function (k, v) {
                if (fn.call(this, k, v, arr)) {
                    ret.push(v)
                }
            });
            return ret
        },
        map: function (arr, fn) {
            var ret = [];
            $.each(arr, function (k, v) {
                ret[k] = fn.call(this, k, v, arr)
            });
            return ret
        },
        trim: function (str) {
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
            return null == str ? '' : (str + '').replace(rtrim, '')
        },
        indexOf: function (arr, val, from) {
            from = from || 0;
            if ('string' == typeof arr) {
                var index = arr.substr(from).indexOf(val);
                if (-1 == index) return -1;
                return from + index
            }
            var i = from - 1;
            var len = arr.length;
            while (++i < len) {
                if (arr[i] === val) {
                    return i
                }
            }
            return -1
        },
        now: function () {
            return +new Date()
        },
        merge: function (a, b) {
            var len = +b.length
                , j = 0
                , i = a.length;
            for (; j < len; j++) {
                a[i++] = b[j]
            }
            a.length = i;
            return a
        },
        findOne: function (str, dom) {
            dom = dom || document
            var nodes, ret = []
            if ('#' == str.charAt(0)) {
                var id = str.substr(1)
                if (id && dom.getElementById) {
                    // $('#id')
                    var el = dom.getElementById(id)
                    if (el) {
                        return [el]
                    }
                }
            }
            if (isLetter(str)) {
                // $('tag')
                nodes = dom.getElementsByTagName(str)
            } else if (dom.querySelectorAll) {
                nodes = dom.querySelectorAll(str)
            }
            // cannot use slice.call because dom object throw error in ie8-
            var len = nodes ? nodes.length : 0
            var ret = []
            for (var i = 0; i < len; i++) {
                ret[i] = nodes[i]
            }
            return ret;
        },
        error: function (msg) {
            throw new Error(msg)
        },
        parseJSON: function (str) {
            if (window.JSON && JSON.parse) {
                return JSON.parse(str + '')
            }

            str = $.trim(str + '');
            var depth, requireNonComma;

            return str && !$.trim(str.replace(rvalidtokens, function (token, comma, open, close) {
                if (requireNonComma && comma) depth = 0;
                if (depth = 0) return token;
                requireNonComma = open || comma;
                depth += !close - !open;
                return ''
            })) ? (Function('return ' + str))() : $.error("Invalid JSON: " + data)
        },
        getClassName: function (val) {
            var ret = {}.toString.call(val).split(' ')[1];
            return ret.substr(0, ret.length - 1).toLowerCase()
        },
        type: function (val) {
            var tp = typeof val;
            if (tp == 'object' || tp == 'function') {
                var className = $.getClassName(val);
                if (-1 == $.indexOf(classes, className)) {
                    return 'object'
                }
                return className
            }
            return tp
        },
        isArray: function (arr) {
            return 'array' == $.type(arr);
        },
        isFunction: function (func) {
            return 'function' == $.type(func);
        },
        prop: function (elem, key, val) {
            if (undefined === val) {
                return elem[key]
            }
            elem[key] = val
        },
        handler: function (fn, val) {
            var elems = this;
            for (var i = 0; i < elems.length; i++) {
                var el = elems[i];
                fn(el, val);
            }
            return elems;
        },
        handler: function (elems, fn, key, val, isChain) {
            var i = 0
            if (key && 'object' === typeof key) {
                // set multi k, v
                for (i in key) {
                    $.handler(elems, fn, i, key[i], true)
                }
            } else if (undefined === val) {
                // get value
                var ret
                if (elems[0]) { // TODO text, html should be ''
                    ret = fn(elems[0], key)
                }
                if (!isChain) {
                    return ret
                }
            } else {
                // set one k, v
                for (i = 0; i < elems.length; i++) {
                    fn(elems[i], key, val)
                }
            }
            return elems;
        },
        ajax: function (options) {
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
        },
        get: function (url, success) {
            $.ajax({
                url: url,
                method: 'GET',
                success: success
            });
        },
        getJSON: function (url, success) {
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: success
            });
        },
        post: function (url, data, success) {
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
        }
    });

    $.fn.extend({
        val: function (val) {
            return $.handler(this, function (elem, key, val) {
                if (undefined === val) {
                    return elem.value;
                }
                elem.value = '' + val;
            }, null, val);
        },
        text: function (val) {
            return $.handler(this, function (elem, key, val) {
                if (undefined !== val) return elem.textContent = '' + val
                var nodeType = elem.nodeType
                if (3 == nodeType || 4 == nodeType) {
                    return elem.nodeValue
                }
                if ('string' == typeof elem.textContent) {
                    return elem.textContent
                }
                var ret = ''
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                    ret += $.text(elem)
                }
                return ret;
            }, null, val)
        },
        html: function (val) {
            return $.handler(this, function (elem, key, val) {
                if (undefined === val) {
                    return elem.innerHTML;
                }
                elem.innerHTML = '' + val;
            }, null, val);
        },
        attr: function (key, val) {
            return $.handler(this, function (elem, key, val) {
                if (undefined === val) {
                    return elem.getAttribute(key)
                } else if (null === val) {
                    return elem.removeAttribute(key)
                }
                elem.setAttribute(key, '' + val)
            }, key, val);
        },
        prop: function (key, val) {
            return $.handler(this, $.prop, key, val)
        },
        show: function () {
            $.handler(this, function (elem) {
                elem.style.display = '' | 'inline' | 'inline-block' | 'inline-table' | 'block';
            }, null, null);
        },
        hide: function () {
            $.handler(this, function (elem) {
                elem.style.display = 'none';
            }, null, null);
        },
        css: function (key, val) {
            return $.access(this, function (elem, key, val) {
                var style = elem.style || {}
                if (undefined === val) {
                    var ret = style[key]
                    if (ret) return ret
                    if (window.getComputedStyle) {
                        return getComputedStyle(elem, null)[key]
                    }
                } else {
                    style[key] = val
                }
            }, key, val)
        },
        on: function (ev, fn) {
            // $.handler(function (el) {
            //     el.addEventListener(ev, fn);
            // });
        },
        trigger: function (elem, ev, data) {
            $.handler(function (el) {
                var event;
                if (window.CustomEvent) {
                    event = new CustomEvent(ev, {detail: data});
                } else {
                    event = document.createEvent(ev);
                    event.initCustomEvent(ev, true, true, data);
                }
                el.dispatchEvent(event);
            });
        },
        off: function (elem, ev, fn) {
            $.handler(function (el) {
                el.removeEventListener(ev, fn);
            });
        }
    });

    window.$ = $;
})();