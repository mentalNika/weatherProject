! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t()
}(this, function() {
    "use strict";
    var f = "undefined" == typeof document ? {
            body: {},
            addEventListener: function() {},
            removeEventListener: function() {},
            activeElement: {
                blur: function() {},
                nodeName: ""
            },
            querySelector: function() {
                return null
            },
            querySelectorAll: function() {
                return []
            },
            getElementById: function() {
                return null
            },
            createEvent: function() {
                return {
                    initEvent: function() {}
                }
            },
            createElement: function() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function() {},
                    getElementsByTagName: function() {
                        return []
                    }
                }
            },
            location: {
                hash: ""
            }
        } : document,
        G = "undefined" == typeof window ? {
            document: f,
            navigator: {
                userAgent: ""
            },
            location: {},
            history: {},
            CustomEvent: function() {
                return this
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            getComputedStyle: function() {
                return {
                    getPropertyValue: function() {
                        return ""
                    }
                }
            },
            Image: function() {},
            Date: function() {},
            screen: {},
            setTimeout: function() {},
            clearTimeout: function() {}
        } : window,
        l = function(e) {
            for (var t = 0; t < e.length; t += 1) this[t] = e[t];
            return this.length = e.length, this
        };

    function x(e, t) {
        var i = [],
            a = 0;
        if (e && !t && e instanceof l) return e;
        if (e)
            if ("string" == typeof e) {
                var n, s, r = e.trim();
                if (0 <= r.indexOf("<") && 0 <= r.indexOf(">")) {
                    var o = "div";
                    for (0 === r.indexOf("<li") && (o = "ul"), 0 === r.indexOf("<tr") && (o = "tbody"), 0 !== r.indexOf("<td") && 0 !== r.indexOf("<th") || (o = "tr"), 0 === r.indexOf("<tbody") && (o = "table"), 0 === r.indexOf("<option") && (o = "select"), (s = f.createElement(o)).innerHTML = r, a = 0; a < s.childNodes.length; a += 1) i.push(s.childNodes[a])
                } else
                    for (n = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])], a = 0; a < n.length; a += 1) n[a] && i.push(n[a])
            } else if (e.nodeType || e === G || e === f) i.push(e);
        else if (0 < e.length && e[0].nodeType)
            for (a = 0; a < e.length; a += 1) i.push(e[a]);
        return new l(i)
    }

    function s(e) {
        for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    x.fn = l.prototype, x.Class = l, x.Dom7 = l;
    var t = {
        addClass: function(e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var a = 0; a < this.length; a += 1) void 0 !== this[a] && void 0 !== this[a].classList && this[a].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var a = 0; a < this.length; a += 1) void 0 !== this[a] && void 0 !== this[a].classList && this[a].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var a = 0; a < this.length; a += 1) void 0 !== this[a] && void 0 !== this[a].classList && this[a].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var a = 0; a < this.length; a += 1)
                if (2 === i.length) this[a].setAttribute(e, t);
                else
                    for (var n in e) this[a][n] = e[n], this[a].setAttribute(n, e[n]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var a = 0; a < this.length; a += 1)(i = this[a]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
                var n = i.getAttribute("data-" + e);
                return n || void 0
            }
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var a = t[0],
                s = t[1],
                r = t[2],
                n = t[3];

            function o(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e), x(t).is(s)) r.apply(t, i);
                    else
                        for (var a = x(t).parents(), n = 0; n < a.length; n += 1) x(a[n]).is(s) && r.apply(a[n], i)
                }
            }

            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
            }
            "function" == typeof t[1] && (a = (e = t)[0], r = e[1], n = e[2], s = void 0), n || (n = !1);
            for (var d, p = a.split(" "), u = 0; u < this.length; u += 1) {
                var c = this[u];
                if (s)
                    for (d = 0; d < p.length; d += 1) {
                        var h = p[d];
                        c.dom7LiveListeners || (c.dom7LiveListeners = {}), c.dom7LiveListeners[h] || (c.dom7LiveListeners[h] = []), c.dom7LiveListeners[h].push({
                            listener: r,
                            proxyListener: o
                        }), c.addEventListener(h, o, n)
                    } else
                        for (d = 0; d < p.length; d += 1) {
                            var v = p[d];
                            c.dom7Listeners || (c.dom7Listeners = {}), c.dom7Listeners[v] || (c.dom7Listeners[v] = []), c.dom7Listeners[v].push({
                                listener: r,
                                proxyListener: l
                            }), c.addEventListener(v, l, n)
                        }
            }
            return this
        },
        off: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var a = t[0],
                n = t[1],
                s = t[2],
                r = t[3];
            "function" == typeof t[1] && (a = (e = t)[0], s = e[1], r = e[2], n = void 0), r || (r = !1);
            for (var o = a.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], p = 0; p < this.length; p += 1) {
                    var u = this[p],
                        c = void 0;
                    if (!n && u.dom7Listeners ? c = u.dom7Listeners[d] : n && u.dom7LiveListeners && (c = u.dom7LiveListeners[d]), c && c.length)
                        for (var h = c.length - 1; 0 <= h; h -= 1) {
                            var v = c[h];
                            s && v.listener === s ? (u.removeEventListener(d, v.proxyListener, r), c.splice(h, 1)) : s || (u.removeEventListener(d, v.proxyListener, r), c.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var i = e[0].split(" "), a = e[1], n = 0; n < i.length; n += 1)
                for (var s = i[n], r = 0; r < this.length; r += 1) {
                    var o = this[r],
                        l = void 0;
                    try {
                        l = new G.CustomEvent(s, {
                            detail: a,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (e) {
                        (l = f.createEvent("Event")).initEvent(s, !0, !0), l.detail = a
                    }
                    o.dom7EventData = e.filter(function(e, t) {
                        return 0 < t
                    }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData
                }
            return this
        },
        transitionEnd: function(t) {
            var i, a = ["webkitTransitionEnd", "transitionend"],
                n = this;

            function s(e) {
                if (e.target === this)
                    for (t.call(this, e), i = 0; i < a.length; i += 1) n.off(a[i], s)
            }
            if (t)
                for (i = 0; i < a.length; i += 1) n.on(a[i], s);
            return this
        },
        outerWidth: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (0 < this.length) {
                var e = this[0],
                    t = e.getBoundingClientRect(),
                    i = f.body,
                    a = e.clientTop || i.clientTop || 0,
                    n = e.clientLeft || i.clientLeft || 0,
                    s = e === G ? G.scrollY : e.scrollTop,
                    r = e === G ? G.scrollX : e.scrollLeft;
                return {
                    top: t.top + s - a,
                    left: t.left + r - n
                }
            }
            return null
        },
        css: function(e, t) {
            var i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (var a in e) this[i].style[a] = e[a];
                    return this
                }
                if (this[0]) return G.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 !== arguments.length || "string" != typeof e) return this;
            for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
            return this
        },
        each: function(e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, i, a = this[0];
            if (!a || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (a.matches) return a.matches(e);
                if (a.webkitMatchesSelector) return a.webkitMatchesSelector(e);
                if (a.msMatchesSelector) return a.msMatchesSelector(e);
                for (t = x(e), i = 0; i < t.length; i += 1)
                    if (t[i] === a) return !0;
                return !1
            }
            if (e === f) return a === f;
            if (e === G) return a === G;
            if (e.nodeType || e instanceof l) {
                for (t = e.nodeType ? [e] : e, i = 0; i < t.length; i += 1)
                    if (t[i] === a) return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t, i = this.length;
            return new l(i - 1 < e ? [] : e < 0 ? (t = i + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            for (var a = 0; a < t.length; a += 1) {
                e = t[a];
                for (var n = 0; n < this.length; n += 1)
                    if ("string" == typeof e) {
                        var s = f.createElement("div");
                        for (s.innerHTML = e; s.firstChild;) this[n].appendChild(s.firstChild)
                    } else if (e instanceof l)
                    for (var r = 0; r < e.length; r += 1) this[n].appendChild(e[r]);
                else this[n].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            var t, i, a = this;
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var n = f.createElement("div");
                    for (n.innerHTML = e, i = n.childNodes.length - 1; 0 <= i; i -= 1) a[t].insertBefore(n.childNodes[i], a[t].childNodes[0])
                } else if (e instanceof l)
                for (i = 0; i < e.length; i += 1) a[t].insertBefore(e[i], a[t].childNodes[0]);
            else a[t].insertBefore(e, a[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && x(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([])
        },
        nextAll: function(e) {
            var t = [],
                i = this[0];
            if (!i) return new l([]);
            for (; i.nextElementSibling;) {
                var a = i.nextElementSibling;
                e ? x(a).is(e) && t.push(a) : t.push(a), i = a
            }
            return new l(t)
        },
        prev: function(e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && x(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([])
            }
            return new l([])
        },
        prevAll: function(e) {
            var t = [],
                i = this[0];
            if (!i) return new l([]);
            for (; i.previousElementSibling;) {
                var a = i.previousElementSibling;
                e ? x(a).is(e) && t.push(a) : t.push(a), i = a
            }
            return new l(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? x(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return x(s(t))
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var a = this[i].parentNode; a;) e ? x(a).is(e) && t.push(a) : t.push(a), a = a.parentNode;
            return x(s(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var a = this[i].querySelectorAll(e), n = 0; n < a.length; n += 1) t.push(a[n]);
            return new l(t)
        },
        children: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var a = this[i].childNodes, n = 0; n < a.length; n += 1) e ? 1 === a[n].nodeType && x(a[n]).is(e) && t.push(a[n]) : 1 === a[n].nodeType && t.push(a[n]);
            return new l(s(t))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i, a;
            for (i = 0; i < e.length; i += 1) {
                var n = x(e[i]);
                for (a = 0; a < n.length; a += 1) this[this.length] = n[a], this.length += 1
            }
            return this
        },
        styles: function() {
            return this[0] ? G.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(t).forEach(function(e) {
        x.fn[e] = t[e]
    });
    var e, i, a, H = {
            deleteProps: function(e) {
                var t = e;
                Object.keys(t).forEach(function(e) {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            },
            nextTick: function(e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t)
            },
            now: function() {
                return Date.now()
            },
            getTranslate: function(e, t) {
                var i, a, n;
                void 0 === t && (t = "x");
                var s = G.getComputedStyle(e, null);
                return G.WebKitCSSMatrix ? (6 < (a = s.transform || s.webkitTransform).split(",").length && (a = a.split(", ").map(function(e) {
                    return e.replace(",", ".")
                }).join(", ")), n = new G.WebKitCSSMatrix("none" === a ? "" : a)) : i = (n = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (a = G.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (a = G.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), a || 0
            },
            parseUrlQuery: function(e) {
                var t, i, a, n, s = {},
                    r = e || G.location.href;
                if ("string" == typeof r && r.length)
                    for (n = (i = (r = -1 < r.indexOf("?") ? r.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                            return "" !== e
                        })).length, t = 0; t < n; t += 1) a = i[t].replace(/#\S+/g, "").split("="), s[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
                return s
            },
            isObject: function(e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
            },
            extend: function() {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                for (var i = Object(e[0]), a = 1; a < e.length; a += 1) {
                    var n = e[a];
                    if (null != n)
                        for (var s = Object.keys(Object(n)), r = 0, o = s.length; r < o; r += 1) {
                            var l = s[r],
                                d = Object.getOwnPropertyDescriptor(n, l);
                            void 0 !== d && d.enumerable && (H.isObject(i[l]) && H.isObject(n[l]) ? H.extend(i[l], n[l]) : !H.isObject(i[l]) && H.isObject(n[l]) ? (i[l] = {}, H.extend(i[l], n[l])) : i[l] = n[l])
                        }
                }
                return i
            }
        },
        F = (a = f.createElement("div"), {
            touch: G.Modernizr && !0 === G.Modernizr.touch || !!("ontouchstart" in G || G.DocumentTouch && f instanceof G.DocumentTouch),
            pointerEvents: !(!G.navigator.pointerEnabled && !G.PointerEvent),
            prefixedPointerEvents: !!G.navigator.msPointerEnabled,
            transition: (i = a.style, "transition" in i || "webkitTransition" in i || "MozTransition" in i),
            transforms3d: G.Modernizr && !0 === G.Modernizr.csstransforms3d || (e = a.style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
            flexbox: function() {
                for (var e = a.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1)
                    if (t[i] in e) return !0;
                return !1
            }(),
            observer: "MutationObserver" in G || "WebkitMutationObserver" in G,
            passiveListener: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    G.addEventListener("testPassiveListener", null, t)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in G
        }),
        n = function(e) {
            void 0 === e && (e = {});
            var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
                t.on(e, t.params.on[e])
            })
        },
        r = {
            components: {
                configurable: !0
            }
        };
    n.prototype.on = function(e, t, i) {
        var a = this;
        if ("function" != typeof t) return a;
        var n = i ? "unshift" : "push";
        return e.split(" ").forEach(function(e) {
            a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][n](t)
        }), a
    }, n.prototype.once = function(a, n, e) {
        var s = this;
        if ("function" != typeof n) return s;
        return s.on(a, function e() {
            for (var t = [], i = arguments.length; i--;) t[i] = arguments[i];
            n.apply(s, t), s.off(a, e)
        }, e)
    }, n.prototype.off = function(e, a) {
        var n = this;
        return n.eventsListeners && e.split(" ").forEach(function(i) {
            void 0 === a ? n.eventsListeners[i] = [] : n.eventsListeners[i].forEach(function(e, t) {
                e === a && n.eventsListeners[i].splice(t, 1)
            })
        }), n
    }, n.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i, a, n, s = this;
        return s.eventsListeners && (n = "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], a = e.slice(1, e.length), s) : (i = e[0].events, a = e[0].data, e[0].context || s), (Array.isArray(i) ? i : i.split(" ")).forEach(function(e) {
            if (s.eventsListeners && s.eventsListeners[e]) {
                var t = [];
                s.eventsListeners[e].forEach(function(e) {
                    t.push(e)
                }), t.forEach(function(e) {
                    e.apply(n, a)
                })
            }
        })), s
    }, n.prototype.useModulesParams = function(i) {
        var a = this;
        a.modules && Object.keys(a.modules).forEach(function(e) {
            var t = a.modules[e];
            t.params && H.extend(i, t.params)
        })
    }, n.prototype.useModules = function(a) {
        void 0 === a && (a = {});
        var n = this;
        n.modules && Object.keys(n.modules).forEach(function(e) {
            var i = n.modules[e],
                t = a[e] || {};
            i.instance && Object.keys(i.instance).forEach(function(e) {
                var t = i.instance[e];
                n[e] = "function" == typeof t ? t.bind(n) : t
            }), i.on && n.on && Object.keys(i.on).forEach(function(e) {
                n.on(e, i.on[e])
            }), i.create && i.create.bind(n)(t)
        })
    }, r.components.set = function(e) {
        this.use && this.use(e)
    }, n.installModule = function(t) {
        for (var e = [], i = arguments.length - 1; 0 < i--;) e[i] = arguments[i + 1];
        var a = this;
        a.prototype.modules || (a.prototype.modules = {});
        var n = t.name || Object.keys(a.prototype.modules).length + "_" + H.now();
        return (a.prototype.modules[n] = t).proto && Object.keys(t.proto).forEach(function(e) {
            a.prototype[e] = t.proto[e]
        }), t.static && Object.keys(t.static).forEach(function(e) {
            a[e] = t.static[e]
        }), t.install && t.install.apply(a, e), a
    }, n.use = function(e) {
        for (var t = [], i = arguments.length - 1; 0 < i--;) t[i] = arguments[i + 1];
        var a = this;
        return Array.isArray(e) ? (e.forEach(function(e) {
            return a.installModule(e)
        }), a) : a.installModule.apply(a, [e].concat(t))
    }, Object.defineProperties(n, r);
    var o = {
        updateSize: function() {
            var e, t, i = this,
                a = i.$el;
            e = void 0 !== i.params.width ? i.params.width : a[0].clientWidth, t = void 0 !== i.params.height ? i.params.height : a[0].clientHeight, 0 === e && i.isHorizontal() || 0 === t && i.isVertical() || (e = e - parseInt(a.css("padding-left"), 10) - parseInt(a.css("padding-right"), 10), t = t - parseInt(a.css("padding-top"), 10) - parseInt(a.css("padding-bottom"), 10), H.extend(i, {
                width: e,
                height: t,
                size: i.isHorizontal() ? e : t
            }))
        },
        updateSlides: function() {
            var e = this,
                t = e.params,
                i = e.$wrapperEl,
                a = e.size,
                n = e.rtlTranslate,
                s = e.wrongRTL,
                r = e.virtual && t.virtual.enabled,
                o = r ? e.virtual.slides.length : e.slides.length,
                l = i.children("." + e.params.slideClass),
                d = r ? e.virtual.slides.length : l.length,
                p = [],
                u = [],
                c = [],
                h = t.slidesOffsetBefore;
            "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
            var v = t.slidesOffsetAfter;
            "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
            var f = e.snapGrid.length,
                m = e.snapGrid.length,
                g = t.spaceBetween,
                b = -h,
                w = 0,
                y = 0;
            if (void 0 !== a) {
                var x, T;
                "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * a), e.virtualSize = -g, n ? l.css({
                    marginLeft: "",
                    marginTop: ""
                }) : l.css({
                    marginRight: "",
                    marginBottom: ""
                }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
                for (var C, E = t.slidesPerColumn, S = x / E, M = S - (t.slidesPerColumn * S - d), k = 0; k < d; k += 1) {
                    T = 0;
                    var P = l.eq(k);
                    if (1 < t.slidesPerColumn) {
                        var L = void 0,
                            O = void 0,
                            I = void 0;
                        "column" === t.slidesPerColumnFill ? (I = k - (O = Math.floor(k / E)) * E, (M < O || O === M && I === E - 1) && E <= (I += 1) && (I = 0, O += 1), L = O + I * x / E, P.css({
                            "-webkit-box-ordinal-group": L,
                            "-moz-box-ordinal-group": L,
                            "-ms-flex-order": L,
                            "-webkit-order": L,
                            order: L
                        })) : O = k - (I = Math.floor(k / S)) * S, P.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== I && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", O).attr("data-swiper-row", I)
                    }
                    if ("none" !== P.css("display")) {
                        if ("auto" === t.slidesPerView) {
                            var z = G.getComputedStyle(P[0], null),
                                D = P[0].style.transform,
                                A = P[0].style.webkitTransform;
                            D && (P[0].style.transform = "none"), A && (P[0].style.webkitTransform = "none"), T = e.isHorizontal() ? P[0].getBoundingClientRect().width + parseFloat(z.getPropertyValue("margin-left")) + parseFloat(z.getPropertyValue("margin-right")) : P[0].getBoundingClientRect().height + parseFloat(z.getPropertyValue("margin-top")) + parseFloat(z.getPropertyValue("margin-bottom")), D && (P[0].style.transform = D), A && (P[0].style.webkitTransform = A), t.roundLengths && (T = Math.floor(T))
                        } else T = (a - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), l[k] && (e.isHorizontal() ? l[k].style.width = T + "px" : l[k].style.height = T + "px");
                        l[k] && (l[k].swiperSlideSize = T), c.push(T), t.centeredSlides ? (b = b + T / 2 + w / 2 + g, 0 === w && 0 !== k && (b = b - a / 2 - g), 0 === k && (b = b - a / 2 - g), Math.abs(b) < .001 && (b = 0), t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), u.push(b)) : (t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), u.push(b), b = b + T + g), e.virtualSize += T + g, w = T, y += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, a) + v, n && s && ("slide" === t.effect || "coverflow" === t.effect) && i.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }), F.flexbox && !t.setWrapperSize || (e.isHorizontal() ? i.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }) : i.css({
                        height: e.virtualSize + t.spaceBetween + "px"
                    })), 1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? i.css({
                        width: e.virtualSize + t.spaceBetween + "px"
                    }) : i.css({
                        height: e.virtualSize + t.spaceBetween + "px"
                    }), t.centeredSlides)) {
                    C = [];
                    for (var B = 0; B < p.length; B += 1) {
                        var $ = p[B];
                        t.roundLengths && ($ = Math.floor($)), p[B] < e.virtualSize + p[0] && C.push($)
                    }
                    p = C
                }
                if (!t.centeredSlides) {
                    C = [];
                    for (var N = 0; N < p.length; N += 1) {
                        var V = p[N];
                        t.roundLengths && (V = Math.floor(V)), p[N] <= e.virtualSize - a && C.push(V)
                    }
                    p = C, 1 < Math.floor(e.virtualSize - a) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - a)
                }
                0 === p.length && (p = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? n ? l.css({
                    marginLeft: g + "px"
                }) : l.css({
                    marginRight: g + "px"
                }) : l.css({
                    marginBottom: g + "px"
                })), H.extend(e, {
                    slides: l,
                    snapGrid: p,
                    slidesGrid: u,
                    slidesSizesGrid: c
                }), d !== o && e.emit("slidesLengthChange"), p.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), u.length !== m && e.emit("slidesGridLengthChange"), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        },
        updateAutoHeight: function(e) {
            var t, i = this,
                a = [],
                n = 0;
            if ("number" == typeof e ? i.setTransition(e) : !0 === e && i.setTransition(i.params.speed), "auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView)
                for (t = 0; t < Math.ceil(i.params.slidesPerView); t += 1) {
                    var s = i.activeIndex + t;
                    if (s > i.slides.length) break;
                    a.push(i.slides.eq(s)[0])
                } else a.push(i.slides.eq(i.activeIndex)[0]);
            for (t = 0; t < a.length; t += 1)
                if (void 0 !== a[t]) {
                    var r = a[t].offsetHeight;
                    n = n < r ? r : n
                } n && i.$wrapperEl.css("height", n + "px")
        },
        updateSlidesOffset: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this,
                i = t.params,
                a = t.slides,
                n = t.rtlTranslate;
            if (0 !== a.length) {
                void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
                var s = -e;
                n && (s = e), a.removeClass(i.slideVisibleClass);
                for (var r = 0; r < a.length; r += 1) {
                    var o = a[r],
                        l = (s + (i.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + i.spaceBetween);
                    if (i.watchSlidesVisibility) {
                        var d = -(s - o.swiperSlideOffset),
                            p = d + t.slidesSizesGrid[r];
                        (0 <= d && d < t.size || 0 < p && p <= t.size || d <= 0 && p >= t.size) && a.eq(r).addClass(i.slideVisibleClass)
                    }
                    o.progress = n ? -l : l
                }
            }
        },
        updateProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this,
                i = t.params,
                a = t.maxTranslate() - t.minTranslate(),
                n = t.progress,
                s = t.isBeginning,
                r = t.isEnd,
                o = s,
                l = r;
            r = 0 === a ? s = !(n = 0) : (s = (n = (e - t.minTranslate()) / a) <= 0, 1 <= n), H.extend(t, {
                progress: n,
                isBeginning: s,
                isEnd: r
            }), (i.watchSlidesProgress || i.watchSlidesVisibility) && t.updateSlidesProgress(e), s && !o && t.emit("reachBeginning toEdge"), r && !l && t.emit("reachEnd toEdge"), (o && !s || l && !r) && t.emit("fromEdge"), t.emit("progress", n)
        },
        updateSlidesClasses: function() {
            var e, t = this,
                i = t.slides,
                a = t.params,
                n = t.$wrapperEl,
                s = t.activeIndex,
                r = t.realIndex,
                o = t.virtual && a.virtual.enabled;
            i.removeClass(a.slideActiveClass + " " + a.slideNextClass + " " + a.slidePrevClass + " " + a.slideDuplicateActiveClass + " " + a.slideDuplicateNextClass + " " + a.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + a.slideClass + '[data-swiper-slide-index="' + s + '"]') : i.eq(s)).addClass(a.slideActiveClass), a.loop && (e.hasClass(a.slideDuplicateClass) ? n.children("." + a.slideClass + ":not(." + a.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(a.slideDuplicateActiveClass) : n.children("." + a.slideClass + "." + a.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(a.slideDuplicateActiveClass));
            var l = e.nextAll("." + a.slideClass).eq(0).addClass(a.slideNextClass);
            a.loop && 0 === l.length && (l = i.eq(0)).addClass(a.slideNextClass);
            var d = e.prevAll("." + a.slideClass).eq(0).addClass(a.slidePrevClass);
            a.loop && 0 === d.length && (d = i.eq(-1)).addClass(a.slidePrevClass), a.loop && (l.hasClass(a.slideDuplicateClass) ? n.children("." + a.slideClass + ":not(." + a.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(a.slideDuplicateNextClass) : n.children("." + a.slideClass + "." + a.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(a.slideDuplicateNextClass), d.hasClass(a.slideDuplicateClass) ? n.children("." + a.slideClass + ":not(." + a.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(a.slideDuplicatePrevClass) : n.children("." + a.slideClass + "." + a.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(a.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, i = this,
                a = i.rtlTranslate ? i.translate : -i.translate,
                n = i.slidesGrid,
                s = i.snapGrid,
                r = i.params,
                o = i.activeIndex,
                l = i.realIndex,
                d = i.snapIndex,
                p = e;
            if (void 0 === p) {
                for (var u = 0; u < n.length; u += 1) void 0 !== n[u + 1] ? a >= n[u] && a < n[u + 1] - (n[u + 1] - n[u]) / 2 ? p = u : a >= n[u] && a < n[u + 1] && (p = u + 1) : a >= n[u] && (p = u);
                r.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
            }
            if ((t = 0 <= s.indexOf(a) ? s.indexOf(a) : Math.floor(p / r.slidesPerGroup)) >= s.length && (t = s.length - 1), p !== o) {
                var c = parseInt(i.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                H.extend(i, {
                    snapIndex: t,
                    realIndex: c,
                    previousIndex: o,
                    activeIndex: p
                }), i.emit("activeIndexChange"), i.emit("snapIndexChange"), l !== c && i.emit("realIndexChange"), i.emit("slideChange")
            } else t !== d && (i.snapIndex = t, i.emit("snapIndexChange"))
        },
        updateClickedSlide: function(e) {
            var t = this,
                i = t.params,
                a = x(e.target).closest("." + i.slideClass)[0],
                n = !1;
            if (a)
                for (var s = 0; s < t.slides.length; s += 1) t.slides[s] === a && (n = !0);
            if (!a || !n) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
            t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(x(a).attr("data-swiper-slide-index"), 10) : t.clickedIndex = x(a).index(), i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    };
    var d = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params,
                i = this.rtlTranslate,
                a = this.translate,
                n = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -a : a;
            var s = H.getTranslate(n[0], e);
            return i && (s = -s), s || 0
        },
        setTranslate: function(e, t) {
            var i = this,
                a = i.rtlTranslate,
                n = i.params,
                s = i.$wrapperEl,
                r = i.progress,
                o = 0,
                l = 0;
            i.isHorizontal() ? o = a ? -e : e : l = e, n.roundLengths && (o = Math.floor(o), l = Math.floor(l)), n.virtualTranslate || (F.transforms3d ? s.transform("translate3d(" + o + "px, " + l + "px, 0px)") : s.transform("translate(" + o + "px, " + l + "px)")), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? o : l;
            var d = i.maxTranslate() - i.minTranslate();
            (0 === d ? 0 : (e - i.minTranslate()) / d) !== r && i.updateProgress(e), i.emit("setTranslate", i.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    };
    var p = {
        setTransition: function(e, t) {
            this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            var i = this,
                a = i.activeIndex,
                n = i.params,
                s = i.previousIndex;
            n.autoHeight && i.updateAutoHeight();
            var r = t;
            if (r || (r = s < a ? "next" : a < s ? "prev" : "reset"), i.emit("transitionStart"), e && a !== s) {
                if ("reset" === r) return void i.emit("slideResetTransitionStart");
                i.emit("slideChangeTransitionStart"), "next" === r ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart")
            }
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            var i = this,
                a = i.activeIndex,
                n = i.previousIndex;
            i.animating = !1, i.setTransition(0);
            var s = t;
            if (s || (s = n < a ? "next" : a < n ? "prev" : "reset"), i.emit("transitionEnd"), e && a !== n) {
                if ("reset" === s) return void i.emit("slideResetTransitionEnd");
                i.emit("slideChangeTransitionEnd"), "next" === s ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd")
            }
        }
    };
    var u = {
        slideTo: function(e, t, i, a) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var n = this,
                s = e;
            s < 0 && (s = 0);
            var r = n.params,
                o = n.snapGrid,
                l = n.slidesGrid,
                d = n.previousIndex,
                p = n.activeIndex,
                u = n.rtlTranslate;
            if (n.animating && r.preventInteractionOnTransition) return !1;
            var c = Math.floor(s / r.slidesPerGroup);
            c >= o.length && (c = o.length - 1), (p || r.initialSlide || 0) === (d || 0) && i && n.emit("beforeSlideChangeStart");
            var h, v = -o[c];
            if (n.updateProgress(v), r.normalizeSlideIndex)
                for (var f = 0; f < l.length; f += 1) - Math.floor(100 * v) >= Math.floor(100 * l[f]) && (s = f);
            if (n.initialized && s !== p) {
                if (!n.allowSlideNext && v < n.translate && v < n.minTranslate()) return !1;
                if (!n.allowSlidePrev && v > n.translate && v > n.maxTranslate() && (p || 0) !== s) return !1
            }
            return h = p < s ? "next" : s < p ? "prev" : "reset", u && -v === n.translate || !u && v === n.translate ? (n.updateActiveIndex(s), r.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), "slide" !== r.effect && n.setTranslate(v), "reset" !== h && (n.transitionStart(i, h), n.transitionEnd(i, h)), !1) : (0 !== t && F.transition ? (n.setTransition(t), n.setTranslate(v), n.updateActiveIndex(s), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, a), n.transitionStart(i, h), n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(e) {
                n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(i, h))
            }), n.$wrapperEl[0].addEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onSlideToWrapperTransitionEnd))) : (n.setTransition(0), n.setTranslate(v), n.updateActiveIndex(s), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, a), n.transitionStart(i, h), n.transitionEnd(i, h)), !0)
        },
        slideToLoop: function(e, t, i, a) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var n = e;
            return this.params.loop && (n += this.loopedSlides), this.slideTo(n, t, i, a)
        },
        slideNext: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var a = this,
                n = a.params,
                s = a.animating;
            return n.loop ? !s && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, a.slideTo(a.activeIndex + n.slidesPerGroup, e, t, i)) : a.slideTo(a.activeIndex + n.slidesPerGroup, e, t, i)
        },
        slidePrev: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var a = this,
                n = a.params,
                s = a.animating,
                r = a.snapGrid,
                o = a.slidesGrid,
                l = a.rtlTranslate;
            if (n.loop) {
                if (s) return !1;
                a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft
            }

            function d(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            var p, u = d(l ? a.translate : -a.translate),
                c = r.map(function(e) {
                    return d(e)
                }),
                h = (o.map(function(e) {
                    return d(e)
                }), r[c.indexOf(u)], r[c.indexOf(u) - 1]);
            return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = a.activeIndex - 1), a.slideTo(p, e, t, i)
        },
        slideReset: function(e, t, i) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
        },
        slideToClosest: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var a = this,
                n = a.activeIndex,
                s = Math.floor(n / a.params.slidesPerGroup);
            if (s < a.snapGrid.length - 1) {
                var r = a.rtlTranslate ? a.translate : -a.translate,
                    o = a.snapGrid[s];
                (a.snapGrid[s + 1] - o) / 2 < r - o && (n = a.params.slidesPerGroup)
            }
            return a.slideTo(n, e, t, i)
        },
        slideToClickedSlide: function() {
            var e, t = this,
                i = t.params,
                a = t.$wrapperEl,
                n = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                s = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                e = parseInt(x(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? s < t.loopedSlides - n / 2 || s > t.slides.length - t.loopedSlides + n / 2 ? (t.loopFix(), s = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), H.nextTick(function() {
                    t.slideTo(s)
                })) : t.slideTo(s) : s > t.slides.length - n ? (t.loopFix(), s = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), H.nextTick(function() {
                    t.slideTo(s)
                })) : t.slideTo(s)
            } else t.slideTo(s)
        }
    };
    var c = {
        loopCreate: function() {
            var a = this,
                e = a.params,
                t = a.$wrapperEl;
            t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
            var n = t.children("." + e.slideClass);
            if (e.loopFillGroupWithBlank) {
                var i = e.slidesPerGroup - n.length % e.slidesPerGroup;
                if (i !== e.slidesPerGroup) {
                    for (var s = 0; s < i; s += 1) {
                        var r = x(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                        t.append(r)
                    }
                    n = t.children("." + e.slideClass)
                }
            }
            "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = n.length), a.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), a.loopedSlides += e.loopAdditionalSlides, a.loopedSlides > n.length && (a.loopedSlides = n.length);
            var o = [],
                l = [];
            n.each(function(e, t) {
                var i = x(t);
                e < a.loopedSlides && l.push(t), e < n.length && e >= n.length - a.loopedSlides && o.push(t), i.attr("data-swiper-slide-index", e)
            });
            for (var d = 0; d < l.length; d += 1) t.append(x(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
            for (var p = o.length - 1; 0 <= p; p -= 1) t.prepend(x(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass))
        },
        loopFix: function() {
            var e, t = this,
                i = t.params,
                a = t.activeIndex,
                n = t.slides,
                s = t.loopedSlides,
                r = t.allowSlidePrev,
                o = t.allowSlideNext,
                l = t.snapGrid,
                d = t.rtlTranslate;
            t.allowSlidePrev = !0, t.allowSlideNext = !0;
            var p = -l[a] - t.getTranslate();
            a < s ? (e = n.length - 3 * s + a, e += s, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)) : ("auto" === i.slidesPerView && 2 * s <= a || a >= n.length - s) && (e = -n.length + a + s, e += s, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p));
            t.allowSlidePrev = r, t.allowSlideNext = o
        },
        loopDestroy: function() {
            var e = this.$wrapperEl,
                t = this.params,
                i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), i.removeAttr("data-swiper-slide-index")
        }
    };
    var h = {
        setGrabCursor: function(e) {
            if (!(F.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function() {
            F.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    };
    var v = {
            appendSlide: function(e) {
                var t = this,
                    i = t.$wrapperEl,
                    a = t.params;
                if (a.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var n = 0; n < e.length; n += 1) e[n] && i.append(e[n]);
                else i.append(e);
                a.loop && t.loopCreate(), a.observer && F.observer || t.update()
            },
            prependSlide: function(e) {
                var t = this,
                    i = t.params,
                    a = t.$wrapperEl,
                    n = t.activeIndex;
                i.loop && t.loopDestroy();
                var s = n + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var r = 0; r < e.length; r += 1) e[r] && a.prepend(e[r]);
                    s = n + e.length
                } else a.prepend(e);
                i.loop && t.loopCreate(), i.observer && F.observer || t.update(), t.slideTo(s, 0, !1)
            },
            addSlide: function(e, t) {
                var i = this,
                    a = i.$wrapperEl,
                    n = i.params,
                    s = i.activeIndex;
                n.loop && (s -= i.loopedSlides, i.loopDestroy(), i.slides = a.children("." + n.slideClass));
                var r = i.slides.length;
                if (e <= 0) i.prependSlide(t);
                else if (r <= e) i.appendSlide(t);
                else {
                    for (var o = e < s ? s + 1 : s, l = [], d = r - 1; e <= d; d -= 1) {
                        var p = i.slides.eq(d);
                        p.remove(), l.unshift(p)
                    }
                    if ("object" == typeof t && "length" in t) {
                        for (var u = 0; u < t.length; u += 1) t[u] && a.append(t[u]);
                        o = e < s ? s + t.length : s
                    } else a.append(t);
                    for (var c = 0; c < l.length; c += 1) a.append(l[c]);
                    n.loop && i.loopCreate(), n.observer && F.observer || i.update(), n.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1)
                }
            },
            removeSlide: function(e) {
                var t = this,
                    i = t.params,
                    a = t.$wrapperEl,
                    n = t.activeIndex;
                i.loop && (n -= t.loopedSlides, t.loopDestroy(), t.slides = a.children("." + i.slideClass));
                var s, r = n;
                if ("object" == typeof e && "length" in e) {
                    for (var o = 0; o < e.length; o += 1) s = e[o], t.slides[s] && t.slides.eq(s).remove(), s < r && (r -= 1);
                    r = Math.max(r, 0)
                } else s = e, t.slides[s] && t.slides.eq(s).remove(), s < r && (r -= 1), r = Math.max(r, 0);
                i.loop && t.loopCreate(), i.observer && F.observer || t.update(), i.loop ? t.slideTo(r + t.loopedSlides, 0, !1) : t.slideTo(r, 0, !1)
            },
            removeAllSlides: function() {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e)
            }
        },
        m = function() {
            var e = G.navigator.userAgent,
                t = {
                    ios: !1,
                    android: !1,
                    androidChrome: !1,
                    desktop: !1,
                    windows: !1,
                    iphone: !1,
                    ipod: !1,
                    ipad: !1,
                    cordova: G.cordova || G.phonegap,
                    phonegap: G.cordova || G.phonegap
                },
                i = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                n = e.match(/(iPad).*OS\s([\d_]+)/),
                s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                r = !n && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            if (i && (t.os = "windows", t.osVersion = i[2], t.windows = !0), a && !i && (t.os = "android", t.osVersion = a[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), (n || r || s) && (t.os = "ios", t.ios = !0), r && !s && (t.osVersion = r[2].replace(/_/g, "."), t.iphone = !0), n && (t.osVersion = n[2].replace(/_/g, "."), t.ipad = !0), s && (t.osVersion = s[3] ? s[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (r || n || s) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
                var o = t.osVersion.split("."),
                    l = f.querySelector('meta[name="viewport"]');
                t.minimalUi = !t.webView && (s || r) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui")
            }
            return t.pixelRatio = G.devicePixelRatio || 1, t
        }();

    function g() {
        var e = this,
            t = e.params,
            i = e.el;
        if (!i || 0 !== i.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var a = e.allowSlideNext,
                n = e.allowSlidePrev,
                s = e.snapGrid;
            if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
                var r = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(r), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight()
            } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = n, e.allowSlideNext = a, e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow()
        }
    }
    var b = {
        attachEvents: function() {
            var e = this,
                t = e.params,
                i = e.touchEvents,
                a = e.el,
                n = e.wrapperEl;
            e.onTouchStart = function(e) {
                var t = this,
                    i = t.touchEventsData,
                    a = t.params,
                    n = t.touches;
                if (!t.animating || !a.preventInteractionOnTransition) {
                    var s = e;
                    if (s.originalEvent && (s = s.originalEvent), i.isTouchEvent = "touchstart" === s.type, (i.isTouchEvent || !("which" in s) || 3 !== s.which) && (!i.isTouched || !i.isMoved))
                        if (a.noSwiping && x(s.target).closest(a.noSwipingSelector ? a.noSwipingSelector : "." + a.noSwipingClass)[0]) t.allowClick = !0;
                        else if (!a.swipeHandler || x(s).closest(a.swipeHandler)[0]) {
                        n.currentX = "touchstart" === s.type ? s.targetTouches[0].pageX : s.pageX, n.currentY = "touchstart" === s.type ? s.targetTouches[0].pageY : s.pageY;
                        var r = n.currentX,
                            o = n.currentY,
                            l = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
                            d = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
                        if (!l || !(r <= d || r >= G.screen.width - d)) {
                            if (H.extend(i, {
                                    isTouched: !0,
                                    isMoved: !1,
                                    allowTouchCallbacks: !0,
                                    isScrolling: void 0,
                                    startMoving: void 0
                                }), n.startX = r, n.startY = o, i.touchStartTime = H.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < a.threshold && (i.allowThresholdMove = !1), "touchstart" !== s.type) {
                                var p = !0;
                                x(s.target).is(i.formElements) && (p = !1), f.activeElement && x(f.activeElement).is(i.formElements) && f.activeElement !== s.target && f.activeElement.blur(), p && t.allowTouchMove && s.preventDefault()
                            }
                            t.emit("touchStart", s)
                        }
                    }
                }
            }.bind(e), e.onTouchMove = function(e) {
                var t = this,
                    i = t.touchEventsData,
                    a = t.params,
                    n = t.touches,
                    s = t.rtlTranslate,
                    r = e;
                if (r.originalEvent && (r = r.originalEvent), i.isTouched) {
                    if (!i.isTouchEvent || "mousemove" !== r.type) {
                        var o = "touchmove" === r.type ? r.targetTouches[0].pageX : r.pageX,
                            l = "touchmove" === r.type ? r.targetTouches[0].pageY : r.pageY;
                        if (r.preventedByNestedSwiper) return n.startX = o, void(n.startY = l);
                        if (!t.allowTouchMove) return t.allowClick = !1, void(i.isTouched && (H.extend(n, {
                            startX: o,
                            startY: l,
                            currentX: o,
                            currentY: l
                        }), i.touchStartTime = H.now()));
                        if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
                            if (t.isVertical()) {
                                if (l < n.startY && t.translate <= t.maxTranslate() || l > n.startY && t.translate >= t.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
                            } else if (o < n.startX && t.translate <= t.maxTranslate() || o > n.startX && t.translate >= t.minTranslate()) return;
                        if (i.isTouchEvent && f.activeElement && r.target === f.activeElement && x(r.target).is(i.formElements)) return i.isMoved = !0, void(t.allowClick = !1);
                        if (i.allowTouchCallbacks && t.emit("touchMove", r), !(r.targetTouches && 1 < r.targetTouches.length)) {
                            n.currentX = o, n.currentY = l;
                            var d, p = n.currentX - n.startX,
                                u = n.currentY - n.startY;
                            if (!(t.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(u, 2)) < t.params.threshold))
                                if (void 0 === i.isScrolling && (t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : 25 <= p * p + u * u && (d = 180 * Math.atan2(Math.abs(u), Math.abs(p)) / Math.PI, i.isScrolling = t.isHorizontal() ? d > a.touchAngle : 90 - d > a.touchAngle)), i.isScrolling && t.emit("touchMoveOpposite", r), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1;
                                else if (i.startMoving) {
                                t.allowClick = !1, r.preventDefault(), a.touchMoveStopPropagation && !a.nested && r.stopPropagation(), i.isMoved || (a.loop && t.loopFix(), i.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !a.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", r)), t.emit("sliderMove", r), i.isMoved = !0;
                                var c = t.isHorizontal() ? p : u;
                                n.diff = c, c *= a.touchRatio, s && (c = -c), t.swipeDirection = 0 < c ? "prev" : "next", i.currentTranslate = c + i.startTranslate;
                                var h = !0,
                                    v = a.resistanceRatio;
                                if (a.touchReleaseOnEdges && (v = 0), 0 < c && i.currentTranslate > t.minTranslate() ? (h = !1, a.resistance && (i.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + i.startTranslate + c, v))) : c < 0 && i.currentTranslate < t.maxTranslate() && (h = !1, a.resistance && (i.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - i.startTranslate - c, v))), h && (r.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), 0 < a.threshold) {
                                    if (!(Math.abs(c) > a.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
                                    if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void(n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
                                }
                                a.followFinger && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), a.freeMode && (0 === i.velocities.length && i.velocities.push({
                                    position: n[t.isHorizontal() ? "startX" : "startY"],
                                    time: i.touchStartTime
                                }), i.velocities.push({
                                    position: n[t.isHorizontal() ? "currentX" : "currentY"],
                                    time: H.now()
                                })), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate))
                            }
                        }
                    }
                } else i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", r)
            }.bind(e), e.onTouchEnd = function(e) {
                var t = this,
                    i = t.touchEventsData,
                    a = t.params,
                    n = t.touches,
                    s = t.rtlTranslate,
                    r = t.$wrapperEl,
                    o = t.slidesGrid,
                    l = t.snapGrid,
                    d = e;
                if (d.originalEvent && (d = d.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", d), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && a.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
                a.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                var p, u = H.now(),
                    c = u - i.touchStartTime;
                if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), c < 300 && 300 < u - i.lastClickTime && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = H.nextTick(function() {
                        t && !t.destroyed && t.emit("click", d)
                    }, 300)), c < 300 && u - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", d))), i.lastClickTime = H.now(), H.nextTick(function() {
                        t.destroyed || (t.allowClick = !0)
                    }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === n.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1);
                if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = a.followFinger ? s ? t.translate : -t.translate : -i.currentTranslate, a.freeMode) {
                    if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                    if (p > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                    if (a.freeModeMomentum) {
                        if (1 < i.velocities.length) {
                            var h = i.velocities.pop(),
                                v = i.velocities.pop(),
                                f = h.position - v.position,
                                m = h.time - v.time;
                            t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < a.freeModeMinimumVelocity && (t.velocity = 0), (150 < m || 300 < H.now() - h.time) && (t.velocity = 0)
                        } else t.velocity = 0;
                        t.velocity *= a.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                        var g = 1e3 * a.freeModeMomentumRatio,
                            b = t.velocity * g,
                            w = t.translate + b;
                        s && (w = -w);
                        var y, x, T = !1,
                            C = 20 * Math.abs(t.velocity) * a.freeModeMomentumBounceRatio;
                        if (w < t.maxTranslate()) a.freeModeMomentumBounce ? (w + t.maxTranslate() < -C && (w = t.maxTranslate() - C), y = t.maxTranslate(), T = !0, i.allowMomentumBounce = !0) : w = t.maxTranslate(), a.loop && a.centeredSlides && (x = !0);
                        else if (w > t.minTranslate()) a.freeModeMomentumBounce ? (w - t.minTranslate() > C && (w = t.minTranslate() + C), y = t.minTranslate(), T = !0, i.allowMomentumBounce = !0) : w = t.minTranslate(), a.loop && a.centeredSlides && (x = !0);
                        else if (a.freeModeSticky) {
                            for (var E, S = 0; S < l.length; S += 1)
                                if (l[S] > -w) {
                                    E = S;
                                    break
                                } w = -(w = Math.abs(l[E] - w) < Math.abs(l[E - 1] - w) || "next" === t.swipeDirection ? l[E] : l[E - 1])
                        }
                        if (x && t.once("transitionEnd", function() {
                                t.loopFix()
                            }), 0 !== t.velocity) g = s ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);
                        else if (a.freeModeSticky) return void t.slideToClosest();
                        a.freeModeMomentumBounce && T ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, r.transitionEnd(function() {
                            t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(a.speed), t.setTranslate(y), r.transitionEnd(function() {
                                t && !t.destroyed && t.transitionEnd()
                            }))
                        })) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, r.transitionEnd(function() {
                            t && !t.destroyed && t.transitionEnd()
                        }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                    } else if (a.freeModeSticky) return void t.slideToClosest();
                    (!a.freeModeMomentum || c >= a.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                } else {
                    for (var M = 0, k = t.slidesSizesGrid[0], P = 0; P < o.length; P += a.slidesPerGroup) void 0 !== o[P + a.slidesPerGroup] ? p >= o[P] && p < o[P + a.slidesPerGroup] && (k = o[(M = P) + a.slidesPerGroup] - o[P]) : p >= o[P] && (M = P, k = o[o.length - 1] - o[o.length - 2]);
                    var L = (p - o[M]) / k;
                    if (c > a.longSwipesMs) {
                        if (!a.longSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && (L >= a.longSwipesRatio ? t.slideTo(M + a.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (L > 1 - a.longSwipesRatio ? t.slideTo(M + a.slidesPerGroup) : t.slideTo(M))
                    } else {
                        if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && t.slideTo(M + a.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M)
                    }
                }
            }.bind(e), e.onClick = function(e) {
                this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }.bind(e);
            var s = "container" === t.touchEventsTarget ? a : n,
                r = !!t.nested;
            if (F.touch || !F.pointerEvents && !F.prefixedPointerEvents) {
                if (F.touch) {
                    var o = !("touchstart" !== i.start || !F.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    s.addEventListener(i.start, e.onTouchStart, o), s.addEventListener(i.move, e.onTouchMove, F.passiveListener ? {
                        passive: !1,
                        capture: r
                    } : r), s.addEventListener(i.end, e.onTouchEnd, o)
                }(t.simulateTouch && !m.ios && !m.android || t.simulateTouch && !F.touch && m.ios) && (s.addEventListener("mousedown", e.onTouchStart, !1), f.addEventListener("mousemove", e.onTouchMove, r), f.addEventListener("mouseup", e.onTouchEnd, !1))
            } else s.addEventListener(i.start, e.onTouchStart, !1), f.addEventListener(i.move, e.onTouchMove, r), f.addEventListener(i.end, e.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", e.onClick, !0), e.on(m.ios || m.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", g, !0)
        },
        detachEvents: function() {
            var e = this,
                t = e.params,
                i = e.touchEvents,
                a = e.el,
                n = e.wrapperEl,
                s = "container" === t.touchEventsTarget ? a : n,
                r = !!t.nested;
            if (F.touch || !F.pointerEvents && !F.prefixedPointerEvents) {
                if (F.touch) {
                    var o = !("onTouchStart" !== i.start || !F.passiveListener || !t.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    s.removeEventListener(i.start, e.onTouchStart, o), s.removeEventListener(i.move, e.onTouchMove, r), s.removeEventListener(i.end, e.onTouchEnd, o)
                }(t.simulateTouch && !m.ios && !m.android || t.simulateTouch && !F.touch && m.ios) && (s.removeEventListener("mousedown", e.onTouchStart, !1), f.removeEventListener("mousemove", e.onTouchMove, r), f.removeEventListener("mouseup", e.onTouchEnd, !1))
            } else s.removeEventListener(i.start, e.onTouchStart, !1), f.removeEventListener(i.move, e.onTouchMove, r), f.removeEventListener(i.end, e.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", e.onClick, !0), e.off(m.ios || m.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", g)
        }
    };
    var w, y = {
            setBreakpoint: function() {
                var e = this,
                    t = e.activeIndex,
                    i = e.initialized,
                    a = e.loopedSlides;
                void 0 === a && (a = 0);
                var n = e.params,
                    s = n.breakpoints;
                if (s && (!s || 0 !== Object.keys(s).length)) {
                    var r = e.getBreakpoint(s);
                    if (r && e.currentBreakpoint !== r) {
                        var o = r in s ? s[r] : e.originalParams,
                            l = n.loop && o.slidesPerView !== n.slidesPerView;
                        H.extend(e.params, o), H.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }), e.currentBreakpoint = r, l && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - a + e.loopedSlides, 0, !1)), e.emit("breakpoint", o)
                    }
                }
            },
            getBreakpoint: function(e) {
                if (e) {
                    var t = !1,
                        i = [];
                    Object.keys(e).forEach(function(e) {
                        i.push(e)
                    }), i.sort(function(e, t) {
                        return parseInt(e, 10) - parseInt(t, 10)
                    });
                    for (var a = 0; a < i.length; a += 1) {
                        var n = i[a];
                        n >= G.innerWidth && !t && (t = n)
                    }
                    return t || "max"
                }
            }
        },
        T = {
            isIE: !!G.navigator.userAgent.match(/Trident/g) || !!G.navigator.userAgent.match(/MSIE/g),
            isEdge: !!G.navigator.userAgent.match(/Edge/g),
            isSafari: (w = G.navigator.userAgent.toLowerCase(), 0 <= w.indexOf("safari") && w.indexOf("chrome") < 0 && w.indexOf("android") < 0),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(G.navigator.userAgent)
        };
    var C = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        },
        E = {
            update: o,
            translate: d,
            transition: p,
            slide: u,
            loop: c,
            grabCursor: h,
            manipulation: v,
            events: b,
            breakpoints: y,
            checkOverflow: {
                checkOverflow: function() {
                    var e = this,
                        t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var t = this.classNames,
                        i = this.params,
                        e = this.rtl,
                        a = this.$el,
                        n = [];
                    n.push(i.direction), i.freeMode && n.push("free-mode"), F.flexbox || n.push("no-flexbox"), i.autoHeight && n.push("autoheight"), e && n.push("rtl"), 1 < i.slidesPerColumn && n.push("multirow"), m.android && n.push("android"), m.ios && n.push("ios"), (T.isIE || T.isEdge) && (F.pointerEvents || F.prefixedPointerEvents) && n.push("wp8-" + i.direction), n.forEach(function(e) {
                        t.push(i.containerModifierClass + e)
                    }), a.addClass(t.join(" "))
                },
                removeClasses: function() {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function(e, t, i, a, n, s) {
                    var r;

                    function o() {
                        s && s()
                    }
                    e.complete && n ? o() : t ? ((r = new G.Image).onload = o, r.onerror = o, a && (r.sizes = a), i && (r.srcset = i), t && (r.src = t)) : o()
                },
                preloadImages: function() {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var a = e.imagesToLoad[i];
                        e.loadImage(a, a.currentSrc || a.getAttribute("src"), a.srcset || a.getAttribute("srcset"), a.sizes || a.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        S = {},
        M = function(c) {
            function h() {
                for (var e, t, n, i = [], a = arguments.length; a--;) i[a] = arguments[a];
                (n = 1 === i.length && i[0].constructor && i[0].constructor === Object ? i[0] : (t = (e = i)[0], e[1])) || (n = {}), n = H.extend({}, n), t && !n.el && (n.el = t), c.call(this, n), Object.keys(E).forEach(function(t) {
                    Object.keys(E[t]).forEach(function(e) {
                        h.prototype[e] || (h.prototype[e] = E[t][e])
                    })
                });
                var s = this;
                void 0 === s.modules && (s.modules = {}), Object.keys(s.modules).forEach(function(e) {
                    var t = s.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0],
                            a = t.params[i];
                        if ("object" != typeof a) return;
                        if (!(i in n && "enabled" in a)) return;
                        !0 === n[i] && (n[i] = {
                            enabled: !0
                        }), "object" != typeof n[i] || "enabled" in n[i] || (n[i].enabled = !0), n[i] || (n[i] = {
                            enabled: !1
                        })
                    }
                });
                var r = H.extend({}, C);
                s.useModulesParams(r), s.params = H.extend({}, r, S, n), s.originalParams = H.extend({}, s.params), s.passedParams = H.extend({}, n);
                var o = (s.$ = x)(s.params.el);
                if (t = o[0]) {
                    if (1 < o.length) {
                        var l = [];
                        return o.each(function(e, t) {
                            var i = H.extend({}, n, {
                                el: t
                            });
                            l.push(new h(i))
                        }), l
                    }
                    t.swiper = s, o.data("swiper", s);
                    var d, p, u = o.children("." + s.params.wrapperClass);
                    return H.extend(s, {
                        $el: o,
                        el: t,
                        $wrapperEl: u,
                        wrapperEl: u[0],
                        classNames: [],
                        slides: x(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === s.params.direction
                        },
                        isVertical: function() {
                            return "vertical" === s.params.direction
                        },
                        rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
                        rtlTranslate: "horizontal" === s.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
                        wrongRTL: "-webkit-box" === u.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: s.params.allowSlideNext,
                        allowSlidePrev: s.params.allowSlidePrev,
                        touchEvents: (d = ["touchstart", "touchmove", "touchend"], p = ["mousedown", "mousemove", "mouseup"], F.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : F.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), s.touchEventsTouch = {
                            start: d[0],
                            move: d[1],
                            end: d[2]
                        }, s.touchEventsDesktop = {
                            start: p[0],
                            move: p[1],
                            end: p[2]
                        }, F.touch || !s.params.simulateTouch ? s.touchEventsTouch : s.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: H.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: s.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), s.useModules(), s.params.init && s.init(), s
                }
            }
            c && (h.__proto__ = c);
            var e = {
                extendedDefaults: {
                    configurable: !0
                },
                defaults: {
                    configurable: !0
                },
                Class: {
                    configurable: !0
                },
                $: {
                    configurable: !0
                }
            };
            return ((h.prototype = Object.create(c && c.prototype)).constructor = h).prototype.slidesPerViewDynamic = function() {
                var e = this,
                    t = e.params,
                    i = e.slides,
                    a = e.slidesGrid,
                    n = e.size,
                    s = e.activeIndex,
                    r = 1;
                if (t.centeredSlides) {
                    for (var o, l = i[s].swiperSlideSize, d = s + 1; d < i.length; d += 1) i[d] && !o && (r += 1, n < (l += i[d].swiperSlideSize) && (o = !0));
                    for (var p = s - 1; 0 <= p; p -= 1) i[p] && !o && (r += 1, n < (l += i[p].swiperSlideSize) && (o = !0))
                } else
                    for (var u = s + 1; u < i.length; u += 1) a[u] - a[s] < n && (r += 1);
                return r
            }, h.prototype.update = function() {
                var i = this;
                if (i && !i.destroyed) {
                    var e = i.snapGrid,
                        t = i.params;
                    t.breakpoints && i.setBreakpoint(), i.updateSize(), i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.params.freeMode ? (a(), i.params.autoHeight && i.updateAutoHeight()) : (("auto" === i.params.slidesPerView || 1 < i.params.slidesPerView) && i.isEnd && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0)) || a(), t.watchOverflow && e !== i.snapGrid && i.checkOverflow(), i.emit("update")
                }

                function a() {
                    var e = i.rtlTranslate ? -1 * i.translate : i.translate,
                        t = Math.min(Math.max(e, i.maxTranslate()), i.minTranslate());
                    i.setTranslate(t), i.updateActiveIndex(), i.updateSlidesClasses()
                }
            }, h.prototype.init = function() {
                var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
            }, h.prototype.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i = this,
                    a = i.params,
                    n = i.$el,
                    s = i.$wrapperEl,
                    r = i.slides;
                return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), a.loop && i.loopDestroy(), t && (i.removeClasses(), n.removeAttr("style"), s.removeAttr("style"), r && r.length && r.removeClass([a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function(e) {
                    i.off(e)
                }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), H.deleteProps(i)), i.destroyed = !0), null
            }, h.extendDefaults = function(e) {
                H.extend(S, e)
            }, e.extendedDefaults.get = function() {
                return S
            }, e.defaults.get = function() {
                return C
            }, e.Class.get = function() {
                return c
            }, e.$.get = function() {
                return x
            }, Object.defineProperties(h, e), h
        }(n),
        k = {
            name: "device",
            proto: {
                device: m
            },
            static: {
                device: m
            }
        },
        P = {
            name: "support",
            proto: {
                support: F
            },
            static: {
                support: F
            }
        },
        L = {
            name: "browser",
            proto: {
                browser: T
            },
            static: {
                browser: T
            }
        },
        O = {
            name: "resize",
            create: function() {
                var e = this;
                H.extend(e, {
                    resize: {
                        resizeHandler: function() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function() {
                    G.addEventListener("resize", this.resize.resizeHandler), G.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy: function() {
                    G.removeEventListener("resize", this.resize.resizeHandler), G.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        },
        I = {
            func: G.MutationObserver || G.WebkitMutationObserver,
            attach: function(e, t) {
                void 0 === t && (t = {});
                var i = this,
                    a = new I.func(function(e) {
                        if (1 !== e.length) {
                            var t = function() {
                                i.emit("observerUpdate", e[0])
                            };
                            G.requestAnimationFrame ? G.requestAnimationFrame(t) : G.setTimeout(t, 0)
                        } else i.emit("observerUpdate", e[0])
                    });
                a.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), i.observer.observers.push(a)
            },
            init: function() {
                var e = this;
                if (F.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (var t = e.$el.parents(), i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
                    e.observer.attach(e.$el[0], {
                        childList: !1
                    }), e.observer.attach(e.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function() {
                this.observer.observers.forEach(function(e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        },
        z = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1
            },
            create: function() {
                H.extend(this, {
                    observer: {
                        init: I.init.bind(this),
                        attach: I.attach.bind(this),
                        destroy: I.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function() {
                    this.observer.init()
                },
                destroy: function() {
                    this.observer.destroy()
                }
            }
        },
        D = {
            handle: function(e) {
                var t = this,
                    i = t.rtlTranslate,
                    a = e;
                a.originalEvent && (a = a.originalEvent);
                var n = a.keyCode || a.charCode;
                if (!t.allowSlideNext && (t.isHorizontal() && 39 === n || t.isVertical() && 40 === n)) return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && 37 === n || t.isVertical() && 38 === n)) return !1;
                if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (37 === n || 39 === n || 38 === n || 40 === n)) {
                        var s = !1;
                        if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                        var r = G.innerWidth,
                            o = G.innerHeight,
                            l = t.$el.offset();
                        i && (l.left -= t.$el[0].scrollLeft);
                        for (var d = [
                                [l.left, l.top],
                                [l.left + t.width, l.top],
                                [l.left, l.top + t.height],
                                [l.left + t.width, l.top + t.height]
                            ], p = 0; p < d.length; p += 1) {
                            var u = d[p];
                            0 <= u[0] && u[0] <= r && 0 <= u[1] && u[1] <= o && (s = !0)
                        }
                        if (!s) return
                    }
                    t.isHorizontal() ? (37 !== n && 39 !== n || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (39 === n && !i || 37 === n && i) && t.slideNext(), (37 === n && !i || 39 === n && i) && t.slidePrev()) : (38 !== n && 40 !== n || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 40 === n && t.slideNext(), 38 === n && t.slidePrev()), t.emit("keyPress", n)
                }
            },
            enable: function() {
                this.keyboard.enabled || (x(f).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            },
            disable: function() {
                this.keyboard.enabled && (x(f).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        },
        A = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0
                }
            },
            create: function() {
                H.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: D.enable.bind(this),
                        disable: D.disable.bind(this),
                        handle: D.handle.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.keyboard.enabled && this.keyboard.enable()
                },
                destroy: function() {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        };
    var B = {
            lastScrollTime: H.now(),
            event: -1 < G.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
                var e = "onwheel",
                    t = e in f;
                if (!t) {
                    var i = f.createElement("div");
                    i.setAttribute(e, "return;"), t = "function" == typeof i[e]
                }
                return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")), t
            }() ? "wheel" : "mousewheel",
            normalize: function(e) {
                var t = 0,
                    i = 0,
                    a = 0,
                    n = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), a = 10 * t, n = 10 * i, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (a = e.deltaX), (a || n) && e.deltaMode && (1 === e.deltaMode ? (a *= 40, n *= 40) : (a *= 800, n *= 800)), a && !t && (t = a < 1 ? -1 : 1), n && !i && (i = n < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: i,
                    pixelX: a,
                    pixelY: n
                }
            },
            handleMouseEnter: function() {
                this.mouseEntered = !0
            },
            handleMouseLeave: function() {
                this.mouseEntered = !1
            },
            handle: function(e) {
                var t = e,
                    i = this,
                    a = i.params.mousewheel;
                if (!i.mouseEntered && !a.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent);
                var n = 0,
                    s = i.rtlTranslate ? -1 : 1,
                    r = B.normalize(t);
                if (a.forceToAxis)
                    if (i.isHorizontal()) {
                        if (!(Math.abs(r.pixelX) > Math.abs(r.pixelY))) return !0;
                        n = r.pixelX * s
                    } else {
                        if (!(Math.abs(r.pixelY) > Math.abs(r.pixelX))) return !0;
                        n = r.pixelY
                    }
                else n = Math.abs(r.pixelX) > Math.abs(r.pixelY) ? -r.pixelX * s : -r.pixelY;
                if (0 === n) return !0;
                if (a.invert && (n = -n), i.params.freeMode) {
                    i.params.loop && i.loopFix();
                    var o = i.getTranslate() + n * a.sensitivity,
                        l = i.isBeginning,
                        d = i.isEnd;
                    if (o >= i.minTranslate() && (o = i.minTranslate()), o <= i.maxTranslate() && (o = i.maxTranslate()), i.setTransition(0), i.setTranslate(o), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!l && i.isBeginning || !d && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky && (clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = H.nextTick(function() {
                            i.slideToClosest()
                        }, 300)), i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), o === i.minTranslate() || o === i.maxTranslate()) return !0
                } else {
                    if (60 < H.now() - i.mousewheel.lastScrollTime)
                        if (n < 0)
                            if (i.isEnd && !i.params.loop || i.animating) {
                                if (a.releaseOnEdges) return !0
                            } else i.slideNext(), i.emit("scroll", t);
                    else if (i.isBeginning && !i.params.loop || i.animating) {
                        if (a.releaseOnEdges) return !0
                    } else i.slidePrev(), i.emit("scroll", t);
                    i.mousewheel.lastScrollTime = (new G.Date).getTime()
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
            },
            enable: function() {
                var e = this;
                if (!B.event) return !1;
                if (e.mousewheel.enabled) return !1;
                var t = e.$el;
                return "container" !== e.params.mousewheel.eventsTarged && (t = x(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(B.event, e.mousewheel.handle), e.mousewheel.enabled = !0
            },
            disable: function() {
                var e = this;
                if (!B.event) return !1;
                if (!e.mousewheel.enabled) return !1;
                var t = e.$el;
                return "container" !== e.params.mousewheel.eventsTarged && (t = x(e.params.mousewheel.eventsTarged)), t.off(B.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1)
            }
        },
        $ = {
            update: function() {
                var e = this,
                    t = e.params.navigation;
                if (!e.params.loop) {
                    var i = e.navigation,
                        a = i.$nextEl,
                        n = i.$prevEl;
                    n && 0 < n.length && (e.isBeginning ? n.addClass(t.disabledClass) : n.removeClass(t.disabledClass), n[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), a && 0 < a.length && (e.isEnd ? a.addClass(t.disabledClass) : a.removeClass(t.disabledClass), a[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            },
            init: function() {
                var e, t, i = this,
                    a = i.params.navigation;
                (a.nextEl || a.prevEl) && (a.nextEl && (e = x(a.nextEl), i.params.uniqueNavElements && "string" == typeof a.nextEl && 1 < e.length && 1 === i.$el.find(a.nextEl).length && (e = i.$el.find(a.nextEl))), a.prevEl && (t = x(a.prevEl), i.params.uniqueNavElements && "string" == typeof a.prevEl && 1 < t.length && 1 === i.$el.find(a.prevEl).length && (t = i.$el.find(a.prevEl))), e && 0 < e.length && e.on("click", function(e) {
                    e.preventDefault(), i.isEnd && !i.params.loop || i.slideNext()
                }), t && 0 < t.length && t.on("click", function(e) {
                    e.preventDefault(), i.isBeginning && !i.params.loop || i.slidePrev()
                }), H.extend(i.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function() {
                var e = this.navigation,
                    t = e.$nextEl,
                    i = e.$prevEl;
                t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click"), i.removeClass(this.params.navigation.disabledClass))
            }
        },
        N = {
            makeElFocusable: function(e) {
                return e.attr("tabIndex", "0"), e
            },
            addElRole: function(e, t) {
                return e.attr("role", t), e
            },
            addElLabel: function(e, t) {
                return e.attr("aria-label", t), e
            },
            disableEl: function(e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function(e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function(e) {
                var t = this,
                    i = t.params.a11y;
                if (13 === e.keyCode) {
                    var a = x(e.target);
                    t.navigation && t.navigation.$nextEl && a.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(i.lastSlideMessage) : t.a11y.notify(i.nextSlideMessage)), t.navigation && t.navigation.$prevEl && a.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(i.firstSlideMessage) : t.a11y.notify(i.prevSlideMessage)), t.pagination && a.is("." + t.params.pagination.bulletClass) && a[0].click()
                }
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                var e = this;
                if (!e.params.loop) {
                    var t = e.navigation,
                        i = t.$nextEl,
                        a = t.$prevEl;
                    a && 0 < a.length && (e.isBeginning ? e.a11y.disableEl(a) : e.a11y.enableEl(a)), i && 0 < i.length && (e.isEnd ? e.a11y.disableEl(i) : e.a11y.enableEl(i))
                }
            },
            updatePagination: function() {
                var a = this,
                    n = a.params.a11y;
                a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.bullets.each(function(e, t) {
                    var i = x(t);
                    a.a11y.makeElFocusable(i), a.a11y.addElRole(i, "button"), a.a11y.addElLabel(i, n.paginationBulletMessage.replace(/{{index}}/, i.index() + 1))
                })
            },
            init: function() {
                var e = this;
                e.$el.append(e.a11y.liveRegion);
                var t, i, a = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, a.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), i && (e.a11y.makeElFocusable(i), e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, a.prevSlideMessage), i.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t, i = this;
                i.a11y.liveRegion && 0 < i.a11y.liveRegion.length && i.a11y.liveRegion.remove(), i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl), i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl), e && e.off("keydown", i.a11y.onEnterKey), t && t.off("keydown", i.a11y.onEnterKey), i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.off("keydown", "." + i.params.pagination.bulletClass, i.a11y.onEnterKey)
            }
        },
        V = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = H.nextTick(function() {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
                }, i)
            },
            start: function() {
                var e = this;
                return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
            },
            stop: function() {
                var e = this;
                return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
            },
            pause: function(e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            }
        },
        R = {
            update: function() {
                var e = this,
                    t = e.rtl,
                    n = e.params.pagination;
                if (n.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var s, i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        a = e.pagination.$el,
                        r = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((s = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > i - 1 - 2 * e.loopedSlides && (s -= i - 2 * e.loopedSlides), r - 1 < s && (s -= r), s < 0 && "bullets" !== e.params.paginationType && (s = r + s)) : s = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === n.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                        var o, l, d, p = e.pagination.bullets;
                        if (n.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), a.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (n.dynamicMainBullets + 4) + "px"), 1 < n.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += s - e.previousIndex, e.pagination.dynamicBulletIndex > n.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = n.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = s - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, n.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(n.bulletActiveClass + " " + n.bulletActiveClass + "-next " + n.bulletActiveClass + "-next-next " + n.bulletActiveClass + "-prev " + n.bulletActiveClass + "-prev-prev " + n.bulletActiveClass + "-main"), 1 < a.length) p.each(function(e, t) {
                            var i = x(t),
                                a = i.index();
                            a === s && i.addClass(n.bulletActiveClass), n.dynamicBullets && (o <= a && a <= l && i.addClass(n.bulletActiveClass + "-main"), a === o && i.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), a === l && i.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next"))
                        });
                        else if (p.eq(s).addClass(n.bulletActiveClass), n.dynamicBullets) {
                            for (var u = p.eq(o), c = p.eq(l), h = o; h <= l; h += 1) p.eq(h).addClass(n.bulletActiveClass + "-main");
                            u.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), c.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next")
                        }
                        if (n.dynamicBullets) {
                            var v = Math.min(p.length, n.dynamicMainBullets + 4),
                                f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                m = t ? "right" : "left";
                            p.css(e.isHorizontal() ? m : "top", f + "px")
                        }
                    }
                    if ("fraction" === n.type && (a.find("." + n.currentClass).text(n.formatFractionCurrent(s + 1)), a.find("." + n.totalClass).text(n.formatFractionTotal(r))), "progressbar" === n.type) {
                        var g;
                        g = n.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        var b = (s + 1) / r,
                            w = 1,
                            y = 1;
                        "horizontal" === g ? w = b : y = b, a.find("." + n.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed)
                    }
                    "custom" === n.type && n.renderCustom ? (a.html(n.renderCustom(e, s + 1, r)), e.emit("paginationRender", e, a[0])) : e.emit("paginationUpdate", e, a[0]), a[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](n.lockClass)
                }
            },
            render: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        a = e.pagination.$el,
                        n = "";
                    if ("bullets" === t.type) {
                        for (var s = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, r = 0; r < s; r += 1) t.renderBullet ? n += t.renderBullet.call(e, r, t.bulletClass) : n += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        a.html(n), e.pagination.bullets = a.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (n = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', a.html(n)), "progressbar" === t.type && (n = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', a.html(n)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function() {
                var i = this,
                    e = i.params.pagination;
                if (e.el) {
                    var t = x(e.el);
                    0 !== t.length && (i.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === i.$el.find(e.el).length && (t = i.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), i.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function(e) {
                        e.preventDefault();
                        var t = x(this).index() * i.params.slidesPerGroup;
                        i.params.loop && (t += i.loopedSlides), i.slideTo(t)
                    }), H.extend(i.pagination, {
                        $el: t,
                        el: t[0]
                    }))
                }
            },
            destroy: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var i = e.pagination.$el;
                    i.removeClass(t.hiddenClass), i.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && i.off("click", "." + t.bulletClass)
                }
            }
        },
        j = [k, P, L, O, z, A, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarged: "container"
                }
            },
            create: function() {
                var e = this;
                H.extend(e, {
                    mousewheel: {
                        enabled: !1,
                        enable: B.enable.bind(e),
                        disable: B.disable.bind(e),
                        handle: B.handle.bind(e),
                        handleMouseEnter: B.handleMouseEnter.bind(e),
                        handleMouseLeave: B.handleMouseLeave.bind(e),
                        lastScrollTime: H.now()
                    }
                })
            },
            on: {
                init: function() {
                    this.params.mousewheel.enabled && this.mousewheel.enable()
                },
                destroy: function() {
                    this.mousewheel.enabled && this.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function() {
                H.extend(this, {
                    navigation: {
                        init: $.init.bind(this),
                        update: $.update.bind(this),
                        destroy: $.destroy.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.navigation.init(), this.navigation.update()
                },
                toEdge: function() {
                    this.navigation.update()
                },
                fromEdge: function() {
                    this.navigation.update()
                },
                destroy: function() {
                    this.navigation.destroy()
                },
                click: function(e) {
                    var t = this.navigation,
                        i = t.$nextEl,
                        a = t.$prevEl;
                    !this.params.navigation.hideOnClick || x(e.target).is(a) || x(e.target).is(i) || (i && i.toggleClass(this.params.navigation.hiddenClass), a && a.toggleClass(this.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}"
                }
            },
            create: function() {
                var t = this;
                H.extend(t, {
                    a11y: {
                        liveRegion: x('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                    }
                }), Object.keys(N).forEach(function(e) {
                    t.a11y[e] = N[e].bind(t)
                })
            },
            on: {
                init: function() {
                    this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
                },
                toEdge: function() {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                fromEdge: function() {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                paginationUpdate: function() {
                    this.params.a11y.enabled && this.a11y.updatePagination()
                },
                destroy: function() {
                    this.params.a11y.enabled && this.a11y.destroy()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function() {
                var t = this;
                H.extend(t, {
                    autoplay: {
                        running: !1,
                        paused: !1,
                        run: V.run.bind(t),
                        start: V.start.bind(t),
                        stop: V.stop.bind(t),
                        pause: V.pause.bind(t),
                        onTransitionEnd: function(e) {
                            t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                        }
                    }
                })
            },
            on: {
                init: function() {
                    this.params.autoplay.enabled && this.autoplay.start()
                },
                beforeTransitionStart: function(e, t) {
                    this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
                },
                sliderFirstMove: function() {
                    this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
                },
                destroy: function() {
                    this.autoplay.running && this.autoplay.stop()
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function(e) {
                        return e
                    },
                    formatFractionTotal: function(e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function() {
                var e = this;
                H.extend(e, {
                    pagination: {
                        init: R.init.bind(e),
                        render: R.render.bind(e),
                        update: R.update.bind(e),
                        destroy: R.destroy.bind(e),
                        dynamicBulletIndex: 0
                    }
                })
            },
            on: {
                init: function() {
                    this.pagination.init(), this.pagination.render(), this.pagination.update()
                },
                activeIndexChange: function() {
                    this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
                },
                snapIndexChange: function() {
                    this.params.loop || this.pagination.update()
                },
                slidesLengthChange: function() {
                    this.params.loop && (this.pagination.render(), this.pagination.update())
                },
                snapGridLengthChange: function() {
                    this.params.loop || (this.pagination.render(), this.pagination.update())
                },
                destroy: function() {
                    this.pagination.destroy()
                },
                click: function(e) {
                    var t = this;
                    t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !x(e.target).hasClass(t.params.pagination.bulletClass) && t.pagination.$el.toggleClass(t.params.pagination.hiddenClass)
                }
            }
        }];
    return void 0 === M.use && (M.use = M.Class.use, M.installModule = M.Class.installModule), M.use(j), M
});