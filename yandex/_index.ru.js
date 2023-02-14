var __assign = this && this.__assign || function() {
    return __assign = Object.assign || function(t) {
        for (var e, n = 1, i = arguments.length; n < i; n++) {
            e = arguments[n];
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
        }
        return t
    }, __assign.apply(this, arguments)
},
__spreadArrays = this && this.__spreadArrays || function() {
    for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
    for (var i = Array(t), o = 0, e = 0; e < n; e++)
        for (var s = arguments[e], r = 0, a = s.length; r < a; r++, o++) i[o] = s[r];
    return i
};
! function(t) {
function e(t) {
    var e = a(t);
    if (d)
        for (var n, i = 0; n = m[i++];) t.hasOwnProperty(n) && e.push(n);
    return e
}

function n(n, i, s) {
    for (var r, a, c = e(s), l = 0, d = c.length; l < d;) "__self" !== (r = c[l++]) && (a = s[r], u(a) && (!o || a.toString().indexOf(".__base") > -1) ? i[r] = function(e, o) {
        var s = function() {
            var t = this.__base;
            this.__base = s.__base;
            var e = o.apply(this, arguments);
            return this.__base = t, e
        };
        return s.__base = n[e] || ("__constructor" === e ? i.__self.__parent : t.noop), s
    }(r, a) : i[r] = a)
}

function i(e, n) {
    for (var i, o = 1; i = e[o++];) n ? u(i) ? t.inheritSelf(n, i.prototype, i) : t.inheritSelf(n, i) : n = u(i) ? t.inherit(e[0], i.prototype, i) : t.inherit(e[0], i);
    return n || e[0]
}
var o = function() {
        return "_"
    }.toString().indexOf("_") > -1,
    s = function() {},
    r = Object.create || function(t) {
        var e = function() {};
        return e.prototype = t, new e
    },
    a = Object.keys,
    c = t.extend,
    l = Array.isArray,
    u = t.isFunction,
    d = !0,
    h = {
        toString: ""
    };
for (var p in h) h.hasOwnProperty(p) && (d = !1);
var m = d ? ["toString", "valueOf"] : null;
t.inherit = function() {
    var t = arguments,
        e = l(t[0]),
        o = e || u(t[0]),
        a = o ? e ? i(t[0]) : t[0] : s,
        d = t[o ? 1 : 0] || {},
        h = t[o ? 2 : 1],
        p = d.__constructor || o && a.prototype.__constructor ? function() {
            return this.__constructor.apply(this, arguments)
        } : o ? function() {
            return a.apply(this, arguments)
        } : function() {};
    if (!o) return p.prototype = d, p.prototype.__self = p.prototype.constructor = p, c(p, h);
    c(p, a), p.__parent = a;
    var m = a.prototype,
        f = p.prototype = r(m);
    return f.__self = f.constructor = p, d && n(m, f, d), h && n(a, p, h), p
}, t.inheritSelf = function() {
    var t = arguments,
        e = l(t[0]),
        o = e ? i(t[0], t[0][0]) : t[0],
        s = t[1],
        r = t[2],
        a = o.prototype;
    return s && n(a, a, s), r && n(o, o, r), o
}, t.inherit.self = t.inheritSelf
}(jQuery),
function(t) {
var e = 0,
    n = "__" + Number(new Date),
    i = function() {
        return "uniq" + ++e
    };
t.identify = function(t, e) {
    if (!t) return i();
    var o = "uniqueID" in t ? "uniqueID" : n;
    return e || o in t ? t[o] : t[o] = i()
}
}(jQuery),
function(t) {
var e = "__" + Number(new Date) + "storage",
    n = function(e, n) {
        return t.identify(e) + (n ? t.identify(n) : "")
    },
    i = {
        buildEventName: function(t) {
            return t
        },
        on: function(i, o, s, r, a) {
            if ("string" == typeof i) {
                t.isFunction(o) && (r = s, s = o, o = void 0);
                for (var c, l = n(s, r), u = this[e] || (this[e] = {}), d = i.split(" "), h = 0; i = d[h++];)
                    if (i = this.buildEventName(i), c = u[i] || (u[i] = {
                            ids: {},
                            list: {}
                        }), !(l in c.ids)) {
                        var p = c.list,
                            m = {
                                fn: s,
                                data: o,
                                ctx: r,
                                special: a
                            };
                        p.last ? (p.last.next = m, m.prev = p.last) : p.first = m, c.ids[l] = p.last = m
                    }
            } else {
                var f = this;
                t.each(i, function(t, e) {
                    f.on(t, e, o, a)
                })
            }
            return this
        },
        onFirst: function(t, e, n, i) {
            return this.on(t, e, n, i, {
                one: !0
            })
        },
        un: function(i, o, s) {
            if ("string" == typeof i || "undefined" == typeof i) {
                var r = this[e];
                if (r)
                    if (i) {
                        for (var a, c = i.split(" "), l = 0; i = c[l++];)
                            if (i = this.buildEventName(i), a = r[i])
                                if (o) {
                                    var u = n(o, s),
                                        d = a.ids;
                                    if (u in d) {
                                        var h = a.list,
                                            p = d[u],
                                            m = p.prev,
                                            f = p.next;
                                        m ? m.next = f : p === h.first && (h.first = f), f ? f.prev = m : p === h.last && (h.last = m), delete d[u]
                                    }
                                } else delete this[e][i]
                    } else delete this[e]
            } else {
                var _ = this;
                s = o, t.each(i, function(t, e) {
                    _.un(t, e, s)
                })
            }
            return this
        },
        trigger: function(n, i) {
            var o = this[e],
                s = "string" == typeof n,
                r = s ? n : n.type,
                a = this.buildEventName(r);
            if (s || (n.type = a, n.target || (n.target = this)), o && (o = o[a])) {
                var c, l = o.list.first;
                for (l && s && (n = t.Event(a), n.target = this); l;) n.data = l.data, c = l.fn.call(l.ctx || this, n, i), "undefined" != typeof c && (n.result = c, c === !1 && (n.preventDefault(), n.stopPropagation())), l.special && l.special.one && this.un(r, l.fn, l.ctx), l = l.next
            }
            return this
        }
    };
t.observable = t.inherit(i, i)
}(jQuery),
function() {
var t = Array.prototype.slice;
Function.prototype.bind || (Function.prototype.bind = function(e) {
    var n = this,
        i = t.call(arguments, 1);
    return function() {
        return n.apply(e, i.concat(t.call(arguments)))
    }
})
}(),
function(t, e) {
function n(t, e, n) {
    return (t ? "__elem_" + t : "") + "__mod" + (e ? "_" + e : "") + (n ? "_" + n : "")
}

function i(t, e, i) {
    if (c(t)) return void(e[n(i, "*", "*")] = t);
    var o, s, r;
    for (o in t)
        if (l(t, o))
            if (r = t[o], c(r)) e[n(i, o, "*")] = r;
            else
                for (s in r) l(r, s) && (e[n(i, o, s)] = r[s])
}

function o(t, e) {
    return e ? Array.isArray(e) ? function(n) {
        for (var i = 0, o = e.length; i < o;)
            if (n.hasMod(t, e[i++])) return !0;
        return !1
    } : function(n) {
        return n.hasMod(t, e)
    } : function(e) {
        return e.hasMod(t)
    }
}

function s(t) {
    t.onSetMod && (i(t.onSetMod, t), delete t.onSetMod);
    var e, n;
    if (t.onElemSetMod) {
        for (e in t.onElemSetMod) l(t.onElemSetMod, e) && (n = t.onElemSetMod[e], i(n, t, e));
        delete t.onElemSetMod
    }
}
var r = [],
    a = t.inherit,
    c = t.isFunction,
    l = Function.prototype.call.bind(Object.prototype.hasOwnProperty),
    u = {},
    d = "_",
    h = "__",
    p = {};
this.BEM = a(t.observable, {
    __constructor: function(t, e, n) {
        var i = this;
        i._modCache = t || {}, i._processingMods = {}, i._params = e, i.params = null, n !== !1 ? i._init() : i.afterCurrentEvent(function() {
            i._init()
        })
    },
    _init: function() {
        return this._initing || this.hasMod("js", "inited") || (this._initing = !0, this.params || (this.params = t.extend(this.getDefaultParams(), this._params), delete this._params), this.setMod("js", "inited"), delete this._initing, this.hasMod("js", "inited") && this.trigger("init")), this
    },
    changeThis: function(t, e) {
        return t.bind(e || this)
    },
    afterCurrentEvent: function(t, e) {
        this.__self.afterCurrentEvent(t.bind(e || this))
    },
    on: function(e, n, i, o) {
        return "object" == typeof e && (t.isFunction(n) || t.isFunction(i)) && (e = this.__self._buildModEventName(e)), this.__base.apply(this, arguments)
    },
    un: function(e, n, i) {
        return "object" == typeof e && t.isFunction(n) && (e = this.__self._buildModEventName(e)), this.__base.apply(this, arguments)
    },
    trigger: function(e, n) {
        var i = !0;
        return "object" != typeof e || e instanceof t.Event || (i = "js" === e.modName || this.hasMod("js"), e = this.__self._buildModEventName(e)), i && (this.__base(e = this.buildEvent(e), n), this._trigger(e, n)), this
    },
    _trigger: function(t, e) {
        this.__self.trigger(t, e)
    },
    buildEvent: function(e) {
        return "string" == typeof e && (e = t.Event(e)), e.block = this, e
    },
    hasMod: function(t, n, i) {
        var o = arguments.length,
            s = !1;
        1 == o ? (i = "", n = t, t = e, s = !0) : 2 == o && ("string" == typeof t ? (i = n, n = t, t = e) : (i = "", s = !0));
        var r = this.getMod(t, n) === i;
        return s ? !r : r
    },
    getMod: function(t, e) {
        var n = typeof t;
        if ("string" === n || "undefined" === n) {
            e = t || e;
            var i = this._modCache,
                o = e in i ? i[e] : i[e] = this._extractModVal(e);
            return o
        }
        return this._getElemMod(e, t)
    },
    _getElemMod: function(t, e, n) {
        return this._extractModVal(t, e, n)
    },
    getMods: function(t) {
        var e = t && "string" != typeof t,
            n = this._modCache,
            i = [].slice.call(arguments, e ? 1 : 0);
        return i.length ? i.reduce(function(t, e) {
            return e in n && (t[e] = n[e]), t
        }, {}) : n
    },
    setMod: function(n, i, o) {
        "undefined" == typeof o && ("string" == typeof n ? (o = "undefined" == typeof i || i, i = n, n = e) : o = !0);
        var s = this;
        if (!n || n[0]) {
            o === !1 || null === o ? o = "" : o !== !0 && (o = o.toString());
            var r = (n && n[0] ? t.identify(n[0]) : "") + "_" + i;
            if (this._processingMods[r]) return s;
            var a, c = n ? s._getElemMod(i, n, a = s.__self._extractElemNameFrom(n)) : s.getMod(i);
            if (c === o) return s;
            this._processingMods[r] = !0;
            var l = !0,
                u = [i, o, c];
            n && u.unshift(n), [
                ["*", "*"],
                [i, "*"],
                [i, o]
            ].forEach(function(t) {
                l = s._callModFn(a, t[0], t[1], u) !== !1 && l
            }), !n && l && (s._modCache[i] = o), l && s._afterSetMod(i, o, c, n, a), delete this._processingMods[r]
        }
        return s
    },
    _afterSetMod: function(t, e, n, i, o) {
        var s = {
            modName: t,
            modVal: e,
            oldModVal: n
        };
        i && (s.elem = i), this.trigger({
            modName: t,
            modVal: "*",
            elem: o
        }, s).trigger({
            modName: t,
            modVal: e,
            elem: o
        }, s)
    },
    toggleMod: function(t, n, i, o, s) {
        "string" == typeof t && (s = o, o = i, i = n, n = t, t = e), "undefined" == typeof o ? o = "" : "boolean" == typeof o && (s = o, o = "");
        var r = this.getMod(t, n);
        return (r == i || r == o) && this.setMod(t, n, "boolean" == typeof s ? s ? i : o : this.hasMod(t, n, i) ? o : i), this
    },
    delMod: function(t, n) {
        return n || (n = t, t = e), this.setMod(t, n, "")
    },
    _callModFn: function(t, i, o, s) {
        var r = n(t, i, o);
        return this[r] ? this[r].apply(this, s) : e
    },
    _extractModVal: function(t, e) {
        return ""
    },
    channel: function(t, e) {
        return this.__self.channel(t, e)
    },
    getDefaultParams: function() {
        return {}
    },
    del: function(t) {
        var e = [].slice.call(arguments);
        return "string" == typeof t && e.unshift(this), this.__self.del.apply(this.__self, e), this
    },
    destruct: function() {
        var t = {
            modName: "js",
            modVal: "",
            oldModVal: "inited"
        };
        this.trigger({
            modName: t.modName,
            modVal: t.modVal
        }, t)
    }
}, t.extend(this.BEM, {
    _name: "i-bem",
    blocks: u,
    decl: function(n, i, r) {
        "string" == typeof n ? n = {
            block: n
        } : n.name && (n.block = n.name), s(i || (i = {}));
        var l = u[n.baseBlock || n.block] || this;
        if (n.modName) {
            var d = o(n.modName, n.modVal);
            t.each(i, function(t, n) {
                c(n) && (i[t] = function() {
                    var o;
                    if (d(this)) o = n;
                    else {
                        var s = l.prototype[t];
                        s && s !== i[t] && (o = this.__base)
                    }
                    return o ? o.apply(this, arguments) : e
                })
            })
        }
        if (r && "boolean" == typeof r.live) {
            var h = r.live;
            r.live = function() {
                return h
            }
        }
        var p, m = l;
        return n.baseMix && (m = [m], n.baseMix.forEach(function(t) {
            m.push(u[t])
        })), n.block == l._name ? (p = a.self(m, i, r))._processLive(!0) : ((p = u[n.block] = a(m, i, r))._name = n.block, delete p._liveInitable), p
    },
    declMix: function(t, e, n) {
        return s(e || (e = {})), t = u[t] = a(e, n)
    },
    _processLive: function(t) {
        return !1
    },
    create: function(t, e) {
        return "string" == typeof t && (t = {
            block: t
        }), new u[t.block](t.mods, e)
    },
    getName: function() {
        return this._name
    },
    on: function(e, n, i, o) {
        return "object" == typeof e && (t.isFunction(n) || t.isFunction(i)) && (e = this._buildModEventName(e)), this.__base.apply(this, arguments)
    },
    un: function(e, n, i) {
        return "object" == typeof e && t.isFunction(n) && (e = this._buildModEventName(e)), this.__base.apply(this, arguments)
    },
    _buildModEventName: function(t) {
        var e = d + t.modName + d + (t.modVal === !1 ? "" : t.modVal);
        return t.elem && (e = h + t.elem + e), e
    },
    _extractElemNameFrom: function(t) {},
    afterCurrentEvent: function(t, e) {
        1 == r.push({
            fn: t,
            ctx: e
        }) && setTimeout(this._runAfterCurrentEventFns, 0)
    },
    _runAfterCurrentEventFns: function() {
        var t = r.length;
        t && r.splice(0, t).forEach(function(t) {
            t.fn.call(t.ctx || this)
        }, this)
    },
    changeThis: function(t, e) {
        return t.bind(e || this)
    },
    del: function(t) {
        var e = "string" == typeof t,
            n = e ? 0 : 1,
            i = arguments.length;
        for (e && (t = this); n < i;) delete t[arguments[n++]];
        return this
    },
    channel: function(n, i) {
        return "boolean" == typeof n && (i = n, n = e), n || (n = "default"), i ? void(p[n] && (p[n].un(), delete p[n])) : p[n] || (p[n] = new t.observable)
    }
}))
}(jQuery),
function(t, e, n) {
function i(t) {
    var e = typeof t;
    return "string" === e || "number" === e || "boolean" === e
}

function o(t, e, n) {
    null != e && e !== !1 && (n.push(c, t), e !== !0 && n.push(c, e))
}

function s(t, e, n, i) {
    i.push(t), o(e, n, i)
}

function r(t, e, n, i, r) {
    s(t, a, a, r), r.push(l, e), o(n, i, r)
}
var a, c = "_",
    l = "__",
    u = "[a-zA-Z0-9-]+";
t.INTERNAL = {
    NAME_PATTERN: u,
    MOD_DELIM: c,
    ELEM_DELIM: l,
    buildModPostfix: function(t, e, n) {
        var i = n || [];
        return o(t, e, i), n ? i : i.join("")
    },
    buildClass: function(t, e, n, o, c) {
        if (i(n) ? i(o) || (c = o, o = n, n = e, e = a) : "undefined" != typeof n ? (c = n, n = a) : e && "string" != typeof e && (c = e, e = a), !e && "undefined" == typeof n && !c) return t;
        var l = c || [];
        return e ? r(t, e, n, o, l) : s(t, n, o, l), c ? l : l.join("")
    },
    buildClasses: function(t, i, o, a) {
        i && "string" != typeof i && (a = o, o = i, i = n);
        var c = a || [];
        return i ? r(t, i, n, n, c) : s(t, n, n, c), o && e.each(o, function(e, n) {
            n && (c.push(" "), i ? r(t, i, e, n, c) : s(t, e, n, c))
        }), a ? c : c.join("")
    }
}
}(BEM, jQuery),
function(t, e, n) {
function i(t, n) {
    var i = t[0];
    e.each(a(i), function(r, a) {
        s(a, i, r, n);
        var c = m[a.uniqId];
        c ? c.domElem.index(i) < 0 && (c.domElem = c.domElem.add(t), e.extend(c._params, a)) : o(r, t, a)
    })
}

function o(t, i, o, r, c) {
    "boolean" == typeof o && (c = r, r = o, o = n);
    var l = i[0];
    if (!l || l.dataset === n || "react" !== l.dataset.lego) {
        o = s(o || a(l)[t], l, t);
        var u = o.uniqId;
        if (m[u]) return m[u]._init();
        p[u] = p[u] ? p[u].add(i) : i;
        var d = l.parentNode;
        d && 11 !== d.nodeType || e.unique(p[u]);
        var h = v[t] || B.decl(t, {}, {
            live: !0
        });
        if (!(h._liveInitable = Boolean(h._processLive())) || r || o.live === !1) {
            r && i.addClass("i-bem");
            var f = new h(p[u], o, Boolean(r));
            return delete p[u], c && c.apply(f, T.call(arguments, 4)), f
        }
    }
}

function s(t, n, i, o) {
    (t || (t = {})).uniqId || (t.uniqId = (t.id ? i + "-id-" + t.id : e.identify()) + (o || e.identify()));
    var s = e.identify(n),
        r = f[s] || (f[s] = {});
    return r[i] || (r[i] = t), t
}

function r(t, e, n) {
    var i = t.find(e);
    return n ? i : i.add(t.filter(e))
}

function a(t) {
    var n = e.identify(t);
    return f[n] || (f[n] = c(t))
}

function c(t) {
    var e, n = t.getAttribute("data-bem");
    return n ? JSON.parse(n) : e ? e() : {}
}

function l(t) {
    delete f[e.identify(t)]
}

function u(t, e) {
    1 === t.domElem.length ? t.destruct(!0) : t.domElem = t.domElem.not(e)
}
var d = e(window),
    h = e(document),
    p = {},
    m = {},
    f = {},
    _ = {},
    g = {},
    v = t.blocks,
    y = t.INTERNAL,
    b = y.NAME_PATTERN,
    k = y.MOD_DELIM,
    M = y.ELEM_DELIM,
    w = RegExp("[^" + k + "]" + k + "(" + b + ")(?:" + k + "(" + b + "))?$"),
    E = y.buildModPostfix,
    x = y.buildClass,
    T = Array.prototype.slice,
    C = Array.prototype.reverse;
e.fn.bem = function(t, e) {
    return o(t, this, e, !0)
};
var B = t.DOM = t.decl("i-bem__dom", {
    __constructor: function(t, n, i) {
        var o = this;
        o.domElem = t, o._eventNameCache = {}, o._elemCache = {}, o._blockInsideCache = {}, m[o._uniqId = n.uniqId || e.identify(o)] = o, o._needSpecialUnbind = !1, o.__base(null, n, i)
    },
    findBlocksInside: function(t, e) {
        return this._findBlocks("find", t, e)
    },
    findBlockInside: function(t, e) {
        var n = this._buildBlockCacheKey(t, e),
            i = this._findBlocks("find", t, e, !0);
        return this._blockInsideCache[n] = i, i
    },
    blockInside: function(t, e) {
        var n = this._buildBlockCacheKey(t, e),
            i = this._blockInsideCache[n];
        return i || (i = this.findBlockInside(t, e)), i
    },
    dropBlockInsideCache: function(t, e) {
        t || e ? this._blockInsideCache[this._buildBlockCacheKey(t, e)] = null : this._blockInsideCache = {}
    },
    _buildBlockCacheKey: function(t, e) {
        e || (e = t, t = "");
        var n = "string" == typeof e ? e : x(e.block, e.modName, e.modVal),
            i = "string" == typeof t ? t : t.__bemElemName;
        return i + ":" + n
    },
    findBlocksOutside: function(t, e) {
        return this._findBlocks("parents", t, e)
    },
    findBlockOutside: function(t, e) {
        return this._findBlocks("closest", t, e)[0] || null
    },
    findBlocksOn: function(t, e) {
        return this._findBlocks("", t, e)
    },
    findBlockOn: function(t, e) {
        return this._findBlocks("", t, e, !0)
    },
    _findBlocks: function(t, i, s, r) {
        if (!this.domElem) return r ? null : [];
        s || (s = i, i = n);
        var a = i ? "string" == typeof i ? this.findElem(i) : i : this.domElem,
            c = "string" == typeof s,
            l = c ? s : s.block || s.blockName,
            u = "." + (c ? l : x(l, s.modName, s.modVal)) + (r ? ":first" : ""),
            d = a.filter(u);
        if (t && (d = d.add(a[t](u))), r) return d[0] ? o(l, d.eq(0), !0) : null;
        var h = [],
            p = {};
        return e.each(d, function(t, n) {
            var i = o(l, e(n), !0);
            p[i._uniqId] || (p[i._uniqId] = !0, h.push(i))
        }), h
    },
    bindToDomElem: function(t, i, o, s) {
        e.isFunction(o) && (s = o, o = n);
        var r = this,
            a = function(t) {
                return (t.data || (t.data = {})).domElem = e(this), s.apply(r, arguments)
            };
        return s ? t.bind(r._buildEventName(i), o, (a.guid = s.guid = s.guid || e.guid++, a)) : e.each(i, function(e, n) {
            r.bindToDomElem(t, e, o, n)
        }), r
    },
    bindToDoc: function(t, e, n) {
        return this._needSpecialUnbind = !0, this.bindToDomElem(h, t, e, n)
    },
    bindToWin: function(t, i, o) {
        return e.isFunction(i) && (o = i, i = n), this._needSpecialUnbind = !0, this.bindToDomElem(d, t, i, o)
    },
    bindTo: function(t, n, i, o) {
        var s = arguments.length;
        switch (s) {
            case 3:
                e.isFunction(i) && (o = i, "object" == typeof n && (i = n, n = t, t = this.domElem));
                break;
            case 2:
                e.isFunction(n) ? (o = n, n = t, t = this.domElem) : "string" == typeof t || t instanceof e || (i = n, n = t, t = this.domElem);
                break;
            case 1:
                n = t, t = this.domElem
        }
        return "string" == typeof t && (t = this.elem(t)), this.bindToDomElem(t, n, i, o)
    },
    unbindFromDomElem: function(t, e, n) {
        return t.unbind(this._buildEventName(e), n), this
    },
    unbindFromDoc: function(t, e) {
        return this.unbindFromDomElem(h, t, e)
    },
    unbindFromWin: function(t, e) {
        return this.unbindFromDomElem(d, t, e)
    },
    unbindFrom: function(t, n, i) {
        var o = arguments.length;
        return 1 === o ? (n = t, t = this.domElem) : 2 === o && e.isFunction(n) ? (i = n, n = t, t = this.domElem) : "string" == typeof t && (t = this.elem(t)), this.unbindFromDomElem(t, n, i)
    },
    _buildEventName: function(t) {
        var e = this;
        return t.indexOf(" ") > 1 ? t.split(" ").map(function(t) {
            return e._buildOneEventName(t)
        }).join(" ") : e._buildOneEventName(t)
    },
    _buildOneEventName: function(t) {
        var e = this._eventNameCache;
        if (t in e) return e[t];
        var n = "." + this._uniqId;
        if (t.indexOf(".") === -1) return e[t] = t + n, e[t];
        var i = ".bem_" + this.__self._name;
        return e[t] = t.split(".").map(function(t, e) {
            return 0 === e ? t + i : i + "_" + t
        }).join("") + n, e[t]
    },
    _trigger: function(t, e) {
        this.__base.apply(this, arguments), this._ctxTrigger(t, e)
    },
    _ctxTrigger: function(t, n) {
        var i = this,
            o = _[i.__self._buildCtxEventName(t.type)],
            s = {};
        o && i.domElem.each(function() {
            for (var r = this, a = o.counter; r && a;) {
                var c = e.identify(r, !0);
                if (c) {
                    if (s[c]) break;
                    var l = o.ctxs[c];
                    l && (e.each(l, function(e, o) {
                        o.fn.call(o.ctx || i, t, n)
                    }), a--), s[c] = !0
                }
                r = r.parentNode
            }
        })
    },
    getMods: function(t) {
        var e = t && "string" != typeof t,
            i = this._modCache,
            o = [].slice.call(arguments, e ? 1 : 0),
            s = this._extractMods(o, e ? t : n);
        return e || (o.length ? o.forEach(function(t) {
            i[t] = s[t]
        }) : i = s), s
    },
    setMod: function(t, n, i) {
        if (t && "undefined" != typeof i && t.length > 1) {
            var o = this;
            return t.each(function() {
                var s = e(this);
                s.__bemElemName = t.__bemElemName, o.setMod(s, n, i)
            }), o
        }
        return this.__base(t, n, i)
    },
    _extractModVal: function(t, e, n) {
        var i, o = (e || this.domElem)[0];
        return o && (i = o.getAttribute("class").match(this.__self._buildModValRE(t, n || e))), i ? i[2] || !0 : ""
    },
    _extractMods: function(t, e) {
        var n = {},
            i = !t.length,
            o = 0;
        return ((e || this.domElem).eq(0).attr("class").match(this.__self._buildModValRE("(" + (i ? b : t.join("|")) + ")", e, "g")) || []).forEach(function(t) {
            var e = t.match(w);
            n[e[1]] = e[2] || !0, ++o
        }), o < t.length && t.forEach(function(t) {
            t in n || (n[t] = "")
        }), n
    },
    _afterSetMod: function(t, n, i, o, s) {
        if (this._isDestructing) return this.__base.apply(this, arguments);
        var r = this.__self,
            a = r._buildModClassPrefix(t, s),
            c = r._buildModValRE(t, s, "g"),
            l = "" === n || n === !1;
        (o || this.domElem).each(function() {
            var t = e(this),
                o = t.attr("class"),
                s = a;
            n !== !0 && (s += k + n), (i === !0 ? c.test(o) : (" " + o).indexOf(" " + a + k) > -1) ? t.attr("class", o.replace(c, l ? "" : "$1" + s)) : l || t.addClass(s)
        }), s && this.dropElemCache(s, t, i).dropElemCache(s, t, n), this.__base.apply(this, arguments)
    },
    findElem: function(t, e, n, i) {
        arguments.length % 2 ? (i = n, n = e, e = t, t = this.domElem) : "string" == typeof t && (t = this.findElem(t)), e = e.split(" ");
        var o = this.__self.getName(),
            s = E(n, i),
            a = [],
            c = e.map(function(t) {
                return a.push("." + x(o, t, n, i)), t + s
            }),
            l = 1 === c.length,
            u = r(t, a.join(","));
        return t === this.domElem && a.forEach(function(t, n) {
            (this._elemCache[c[n]] = l ? u : u.filter(t)).__bemElemName = e[n]
        }, this), u
    },
    _elem: function(t, e, n) {
        return this._elemCache[t + E(e, n)] || this.findElem(t, e, n)
    },
    elem: function(t, n, i) {
        if (2 === arguments.length && (i = !0), n && "string" != typeof n) return n.__bemElemName = t, n;
        if (t.indexOf(" ") < 0) return this._elem(t, n, i);
        var o = e([]);
        return t.split(" ").forEach(function(t) {
            o = o.add(this._elem(t, n, i))
        }, this), o
    },
    dropElemCache: function(t, e, n) {
        if (t) {
            var i = E(e, n);
            t.indexOf(" ") < 0 ? delete this._elemCache[t + i] : t.split(" ").forEach(function(t) {
                delete this._elemCache[t + i]
            }, this)
        } else this._elemCache = {};
        return this
    },
    elemParams: function(t) {
        var e;
        return "string" == typeof t ? (e = t, t = this.elem(t)) : e = this.__self._extractElemNameFrom(t), c(t[0])[x(this.__self.getName(), e)] || {}
    },
    elemify: function(t, n) {
        return (t = e(t)).__bemElemName = n, t
    },
    containsDomElem: function(t) {
        var e = !1;
        return this.domElem.each(function() {
            return !(e = t.parents().andSelf().index(this) > -1)
        }), e
    },
    buildSelector: function(t, e, n) {
        return this.__self.buildSelector(t, e, n)
    },
    destruct: function(t) {
        var n = this,
            i = n.__self;
        n._isDestructing || (n._isDestructing = !0, n._needSpecialUnbind && i.doc.add(i.win).unbind("." + n._uniqId), n.dropElemCache().domElem.each(function(t, n) {
            var i = a(n);
            e.each(i, function(t, e) {
                var i = m[e.uniqId];
                i ? i._isDestructing || u(i, n) : delete p[e.uniqId]
            }), l(n)
        }), t || n.domElem.remove(), n.__base(), delete m[n.un()._uniqId], delete n.domElem, delete n._elemCache)
    }
}, {
    scope: null,
    doc: h,
    win: d,
    html: e(document.documentElement),
    _processLive: function(t) {
        var e = this._liveInitable;
        if ("live" in this) {
            var n = "undefined" == typeof e;
            if (n ^ t) {
                e = this.live() !== !1;
                var i = this.getName(),
                    o = this.live;
                this.live = function() {
                    return this.getName() === i ? e : o.apply(this, arguments)
                }
            }
        }
        return e
    },
    init: function(t, n, o) {
        !t || e.isFunction(t) ? (o = n, n = t, t = h) : "string" == typeof t && (t = e(t));
        var s = e.identify();
        return r(t, ".i-bem").each(function() {
            i(e(this), s)
        }), n && this.afterCurrentEvent(function() {
            n.call(o || this, t)
        }), this._runAfterCurrentEventFns(), t
    },
    destruct: function(t, i, o) {
        "boolean" != typeof t && (o = i, i = t, t = n), i && (C.call(r(i, ".i-bem", o)).each(function(t, n) {
            var i = a(this);
            e.each(i, function(t, e) {
                if (e.uniqId) {
                    var i = m[e.uniqId];
                    i ? u(i, n) : delete p[e.uniqId]
                }
            }), l(this)
        }), t || (o ? i.empty() : i.remove()))
    },
    update: function(t, e, n, i) {
        return this.destruct(t, !0), this.init(t.html(e), n, i)
    },
    replace: function(t, n) {
        return this.destruct(!0, t), this.init(e(n).replaceAll(t))
    },
    append: function(t, n) {
        return this.init(e(n).appendTo(t))
    },
    prepend: function(t, n) {
        return this.init(e(n).prependTo(t))
    },
    before: function(t, n) {
        return this.init(e(n).insertBefore(t))
    },
    after: function(t, n) {
        return this.init(e(n).insertAfter(t))
    },
    _buildCtxEventName: function(t) {
        return this._name + ":" + t
    },
    _liveClassBind: function(t, n, i, o) {
        var s = this;
        if (n.indexOf(" ") > -1) n.split(" ").forEach(function(e) {
            s._liveClassBind(t, e, i, o)
        });
        else {
            var r = g[n],
                a = e.identify(i);
            r || (r = g[n] = {}, h.bind(n, s._liveClassTrigger.bind(s))), r = r[t] || (r[t] = {
                uniqIds: {},
                fns: []
            }), a in r.uniqIds || (r.fns.push({
                uniqId: a,
                fn: s._buildLiveEventFn(i, o)
            }), r.uniqIds[a] = r.fns.length - 1)
        }
        return this
    },
    _liveClassUnbind: function(t, n, i) {
        var o = g[n];
        if (o)
            if (i) {
                if (o = o[t]) {
                    var s = e.identify(i);
                    if (s in o.uniqIds) {
                        var r = o.uniqIds[s],
                            a = o.fns.length - 1;
                        for (o.fns.splice(r, 1); r < a;) o.uniqIds[o.fns[r++].uniqId] = r - 1;
                        delete o.uniqIds[s]
                    }
                }
            } else delete o[t];
        return this
    },
    _liveClassTrigger: function(t) {
        var n = g[t.type];
        if (n) {
            var i = t.target,
                o = Object.keys(n);
            do
                for (var s, r = " " + i.className + " ", a = 0; s = o[a++];)
                    if (r.indexOf(" " + s + " ") !== -1) {
                        for (var c = !1, l = n[s].fns, u = 0; u < l.length; u++) l[u].fn.apply(e(i), arguments) === !1 && (c = !0);
                        if (c && t.preventDefault(), c || t.isPropagationStopped()) return;
                        o.splice(--a, 1)
                    } while (o.length && (i = i.parentNode))
        }
    },
    _buildLiveEventFn: function(t, n) {
        var i = this;
        return function(s) {
            var r = [i._name, ((s.data || (s.data = {})).domElem = e(this)).closest(i.buildSelector()), !0],
                a = o.apply(null, n ? r.concat([t, s]) : r);
            if (a && !n && t) return t.apply(a, arguments)
        }
    },
    liveInitOnEvent: function(t, e, n) {
        return this.liveBindTo(t, e, n, !0)
    },
    liveBindTo: function(t, i, o, s) {
        i && !e.isFunction(i) || (o = i, i = t, t = n), t && "string" != typeof t || (t = {
            elem: t
        }), t.elemName && (t.elem = t.elemName);
        var r = this;
        return t.elem && t.elem.indexOf(" ") > 0 ? (t.elem.split(" ").forEach(function(e) {
            r._liveClassBind(x(r._name, e, t.modName, t.modVal), i, o, s)
        }), r) : r._liveClassBind(x(r._name, t.elem, t.modName, t.modVal), i, o, s)
    },
    liveUnbindFrom: function(t, i, o) {
        i && !e.isFunction(i) || (o = i, i = t, t = n);
        var s = this;
        return t && t.indexOf(" ") > 1 ? (t.split(" ").forEach(function(t) {
            s._liveClassUnbind(x(s._name, t), i, o)
        }), s) : s._liveClassUnbind(x(s._name, t), i, o)
    },
    _liveInitOnBlockEvent: function(t, e, n, i) {
        var o = this._name;
        return v[e].on(t, function(t) {
            if (t.block.domElem) {
                var e = arguments,
                    s = t.block[i](o);
                n && s.forEach(function(t) {
                    n.apply(t, e)
                })
            }
        }), this
    },
    liveInitOnBlockEvent: function(t, e, n) {
        return this._liveInitOnBlockEvent(t, e, n, "findBlocksOn")
    },
    liveInitOnBlockInsideEvent: function(t, e, n) {
        return this._liveInitOnBlockEvent(t, e, n, "findBlocksOutside")
    },
    on: function(t, e, n, i, o) {
        return t.jquery ? this._liveCtxBind(t, e, n, i, o) : this.__base(t, e, n, i, o)
    },
    un: function(t, e, n, i) {
        return t.jquery ? this._liveCtxUnbind(t, e, n, i) : this.__base(t, e, n)
    },
    liveCtxBind: function(t, e, n, i, o) {
        return this._liveCtxBind(t, e, n, i, o)
    },
    _liveCtxBind: function(t, i, o, s, r) {
        var a = this;
        if ("object" == typeof i && (e.isFunction(o) || e.isFunction(s)) && (i = this._buildModEventName(i)), "string" == typeof i)
            if (e.isFunction(o) && (r = s, s = o, o = n), i.indexOf(" ") > -1) i.split(" ").forEach(function(e) {
                a._liveCtxBind(t, e, o, s, r)
            });
            else {
                var c = a._buildCtxEventName(i),
                    l = _[c] || (_[c] = {
                        counter: 0,
                        ctxs: {}
                    });
                t.each(function() {
                    var t = e.identify(this),
                        n = l.ctxs[t];
                    n || (n = l.ctxs[t] = {}, ++l.counter), n[e.identify(s) + (r ? e.identify(r) : "")] = {
                        fn: s,
                        data: o,
                        ctx: r
                    }
                })
            }
        else e.each(i, function(e, n) {
            a._liveCtxBind(t, e, n, o)
        });
        return a
    },
    liveCtxUnbind: function(t, e, n, i) {
        return this._liveCtxUnbind(t, e, n, i)
    },
    _liveCtxUnbind: function(t, n, i, o) {
        "object" == typeof n && e.isFunction(i) && (n = this._buildModEventName(n));
        var s = this,
            r = _[n = s._buildCtxEventName(n)];
        return r && (t.each(function() {
            var t, n = e.identify(this, !0);
            n && (t = r.ctxs[n]) && (i && delete t[e.identify(i) + (o ? e.identify(o) : "")], i && !e.isEmptyObject(t) || (r.counter--, delete r.ctxs[n]))
        }), r.counter || delete _[n]), s
    },
    _extractElemNameFrom: function(t) {
        if (t.__bemElemName) return t.__bemElemName;
        var e = t.eq(0).attr("class").match(this._buildElemNameRE());
        return e ? e[1] : n
    },
    extractParams: c,
    _buildModClassPrefix: function(t, e) {
        return this._name + (e ? M + ("string" == typeof e ? e : this._extractElemNameFrom(e)) : "") + k + t
    },
    _buildModValRE: function(t, e, n) {
        return new RegExp("(\\s|^)" + this._buildModClassPrefix(t, e) + "(?:" + k + "(" + b + "))?(?=\\s|$)", n)
    },
    _buildElemNameRE: function() {
        return new RegExp(this._name + M + "(" + b + ")(?:\\s|$)")
    },
    buildSelector: function(t, e, n) {
        return "." + x(this._name, t, e, n)
    },
    getBlockByUniqId: function(t) {
        return m[t]
    },
    getWindowSize: function() {
        return {
            width: d.width(),
            height: d.height()
        }
    }
});
e(function() {
    t.DOM.scope = e("body")
})
}(BEM, jQuery),
function(t) {
function e() {
    return window.innerHeight | 0 + i.outerHeight()
}

function n() {
    return window.innerWidth | 0 + i.outerWidth()
}
var i = t(window),
    o = e(),
    s = n();
(t.event.special.resize || (t.event.special.resize = {})).preDispatch = function(t) {
    var i = e(),
        r = n();
    return (s !== r || o !== i) && (o = i, void(s = r))
}
}(jQuery), jQuery.cookie = function(t, e, n) {
    if ("undefined" == typeof e) {
        var i = null;
        if (document.cookie && "" != document.cookie)
            for (var o = document.cookie.split(";"), s = 0; s < o.length; s++) {
                var r = jQuery.trim(o[s]);
                if (r.substring(0, t.length + 1) == t + "=") {
                    i = decodeURIComponent(r.substring(t.length + 1));
                    break
                }
            }
        return i
    }
    n = n || {}, null === e && (e = "", n.expires = -1);
    var a = "";
    if (n.expires && ("number" == typeof n.expires || n.expires.toUTCString)) {
        var c;
        "number" == typeof n.expires ? (c = new Date, c.setTime(c.getTime() + 24 * n.expires * 60 * 60 * 1e3)) : c = n.expires, a = "; expires=" + c.toUTCString()
    }
    var l = n.path ? "; path=" + n.path : "",
        u = n.domain ? "; domain=" + n.domain : "",
        d = n.secure ? "; secure" : "";
    document.cookie = [t, "=", encodeURIComponent(e), a, l, u, d].join("")
},
function(t) {
    function e(t) {
        return t.replace(/%.{2}/g, function(t) {
            return i[t] || t
        })
    }

    function n(t, n) {
        var i = "";
        try {
            i = t(n)
        } catch (o) {
            try {
                i = t(e(n))
            } catch (t) {
                i = n
            }
        }
        return i
    }
    var i = {
        "%D0": "%D0%A0",
        "%C0": "%D0%90",
        "%C1": "%D0%91",
        "%C2": "%D0%92",
        "%C3": "%D0%93",
        "%C4": "%D0%94",
        "%C5": "%D0%95",
        "%A8": "%D0%81",
        "%C6": "%D0%96",
        "%C7": "%D0%97",
        "%C8": "%D0%98",
        "%C9": "%D0%99",
        "%CA": "%D0%9A",
        "%CB": "%D0%9B",
        "%CC": "%D0%9C",
        "%CD": "%D0%9D",
        "%CE": "%D0%9E",
        "%CF": "%D0%9F",
        "%D1": "%D0%A1",
        "%D2": "%D0%A2",
        "%D3": "%D0%A3",
        "%D4": "%D0%A4",
        "%D5": "%D0%A5",
        "%D6": "%D0%A6",
        "%D7": "%D0%A7",
        "%D8": "%D0%A8",
        "%D9": "%D0%A9",
        "%DA": "%D0%AA",
        "%DB": "%D0%AB",
        "%DC": "%D0%AC",
        "%DD": "%D0%AD",
        "%DE": "%D0%AE",
        "%DF": "%D0%AF",
        "%E0": "%D0%B0",
        "%E1": "%D0%B1",
        "%E2": "%D0%B2",
        "%E3": "%D0%B3",
        "%E4": "%D0%B4",
        "%E5": "%D0%B5",
        "%B8": "%D1%91",
        "%E6": "%D0%B6",
        "%E7": "%D0%B7",
        "%E8": "%D0%B8",
        "%E9": "%D0%B9",
        "%EA": "%D0%BA",
        "%EB": "%D0%BB",
        "%EC": "%D0%BC",
        "%ED": "%D0%BD",
        "%EE": "%D0%BE",
        "%EF": "%D0%BF",
        "%F0": "%D1%80",
        "%F1": "%D1%81",
        "%F2": "%D1%82",
        "%F3": "%D1%83",
        "%F4": "%D1%84",
        "%F5": "%D1%85",
        "%F6": "%D1%86",
        "%F7": "%D1%87",
        "%F8": "%D1%88",
        "%F9": "%D1%89",
        "%FA": "%D1%8A",
        "%FB": "%D1%8B",
        "%FC": "%D1%8C",
        "%FD": "%D1%8D",
        "%FE": "%D1%8E",
        "%FF": "%D1%8F"
    };
    t.extend({
        decodeURI: function(t) {
            return n(decodeURI, t)
        },
        decodeURIComponent: function(t) {
            return n(decodeURIComponent, t)
        }
    })
}(jQuery), BEM.DOM.decl("i-global", {
    onSetMod: {
        js: {
            inited: function() {
                this.del(this.__self._params = $.extend({}, this.params), "uniqId", "name");
                var t = this.__self._params;
                t["passport-msg"] || (t["passport-msg"] = t.id), void 0 === t["show-counters"] && (t["show-counters"] = Math.round(100 * Math.random()) <= t["show-counters-percent"]), t.locale = t.lang, window.BEMHTML && BEMHTML.apply({
                    block: "i-global",
                    params: t
                })
            }
        }
    },
    getDefaultParams: function() {
        return {
            id: "",
            login: this.__self.getCookie("yandex_login") ? $.cookie("yandex_login") || "" : "",
            yandexuid: $.cookie("yandexuid"),
            lang: "ru",
            tld: "ru",
            retpath: encodeURI($.decodeURI(location.href)),
            "passport-host": "https://passport.yandex.ru",
            "pass-host": "https://pass.yandex.ru",
            "social-host": "https://social.yandex.ru",
            "lego-path": "/lego",
            "show-counters-percent": 100
        }
    }
}, {
    param: function(t, e) {
        return "undefined" == typeof e ? (this._params || {})[t] : void(this._params && (this._params[t] = e))
    },
    getCookie: function(t) {
        var e = document.cookie;
        if (e.length < 1) return !1;
        var n = e.indexOf(t + "=");
        if (n === -1) return !1;
        n += t.length + 1;
        var i = e.indexOf(";", n);
        return decodeURIComponent(i === -1 ? e.substring(n) : e.substring(n, i))
    }
}),
function(t) {
    t || (t = window.Lego = {}), t.getCookie = function(t) {
        var e = document.cookie;
        if (e.length < 1) return !1;
        var n = e.indexOf(t + "=");
        if (n === -1) return !1;
        n += t.length + 1;
        var i = e.indexOf(";", n);
        return decodeURIComponent(i === -1 ? e.substring(n) : e.substring(n, i))
    }
}(window.Lego),
function(t, e) {
    e || (e = window.Lego = {}), e.init || (e.init = function(n) {
        return (n = e.params = t.extend({
            id: "",
            login: e.isSessionValid() ? e.getCookie("yandex_login") || "" : "",
            yandexuid: e.getCookie("yandexuid"),
            locale: "ru",
            retpath: window.location.toString(),
            "passport-host": "https://passport.yandex.ru",
            "pass-host": "https://pass.yandex.ru",
            "passport-msg": n.id,
            "social-host": "https://social.yandex.ru",
            "lego-path": "/lego",
            "show-counters-percent": 100
        }, n, e.params))["show-counters"] = Math.round(100 * Math.random()) <= n["show-counters-percent"], BEM.blocks["i-global"]._params || t.extend(BEM.blocks["i-global"]._params = {}, n), n
    }), e.block || (e.block = {}), e.blockInit || (e.blockInit = function(n, i) {
        n = n || document, i = i || ".g-js", t(n).find(i).each(function() {
            var n = t(this),
                i = n.data("bem") || (this.onclick ? this.onclick() : {}),
                o = i.name || "",
                s = e.block[o];
            s && !n.data(o) && (s.call(n, i), n.data(o, !0).addClass(o + "_js_inited"))
        })
    }), e.blockInitBinded || (e.blockInitBinded = Boolean(t(document).ready(function() {
        e.blockInit()
    })))
}(jQuery, window.Lego),
function(t, e) {
    var n = {};
    /msie|trident/i.test(e) ? n.ie = parseInt(e.split(/msie|rv:/i)[1], 10) : e.indexOf("Opera") !== -1 && (n.opera = parseInt(e.split(/Version\//i)[1], 10));
    var i, o = {},
        s = {};
    (i = e.match(/Windows\sPhone[^\d]*\s([\d.]+)/)) ? o.wp = i[1]: (i = e.match(/Android\s+([\d.]+)/)) ? o.android = i[1] : e.match(/\sHTC[\s_].*AppleWebKit/) ? o.android = "2.3" : (i = e.match(/iPhone\sOS\s([\d_]+)/)) ? (o.ios = i[1].replace(/_/g, "."), s.iphone = !0) : (i = e.match(/iPad.*OS\s([\d_]+)/)) ? (o.ios = i[1].replace(/_/g, "."), s.ipad = !0) : (i = e.match(/Bada\/([\d.]+)/)) ? o.bada = i[1] : (i = e.match(/MSIE\s9/)) ? o.wp = "7.5" : o.other = !0, BEM.DOM.decl("i-ua", {
        onSetMod: {
            js: {
                inited: function() {
                    var t = this.__self,
                        e = "other";
                    ["ios", "android", "bada", "wp", "opera"].some(function(n) {
                        return t[n] && (e = n)
                    }), this.setMod("platform", e)
                }
            }
        },
        setVersion: function() {
            var t = this.parseVersion();
            t && (this.setMod(t.platform, t.major), this.setMod(t.platform + "-subversion", t.subversion))
        },
        parseVersion: function() {
            if (this.__self.ios || this.__self.android) {
                var t = this.__self.ios || this.__self.android,
                    e = t.split("."),
                    n = e.shift(),
                    i = e.join("-"),
                    o = this.getMod("platform");
                return {
                    platform: o,
                    major: n,
                    subversion: i
                }
            }
        }
    }, {
        ios: o.ios,
        iphone: s.iphone,
        ipad: s.ipad,
        android: o.android,
        bada: o.bada,
        wp: o.wp,
        other: o.other,
        ua: e,
        ie: n.ie,
        opera: n.opera
    })
}(window, navigator.userAgent),
function(t, e, n) {
    function i(t, e) {
        var n = {},
            i = t.originalEvent || {};
        e || (e = {});
        for (var o, s = 0; s < c; s++) o = r[s], n[o] = e[o] || t[o] || i[o] || a[s];
        return n.x = n.clientX, n.y = n.clientY, n.pressure = n.pressure || (n.buttons ? .5 : 0), n.buttons || l || (n.buttons = u[n.which] || 0), n.originalEvent = t.originalEvent || null, e.preventDefault ? n.preventDefault = function() {
            e.preventDefault(), t.preventDefault()
        } : (n.preventDefault = function() {
            t.preventDefault()
        }, n._preventScroll = function() {}), n
    }

    function o(t, e) {
        var i = n.Event(t),
            o = e.preventDefault,
            s = i.preventDefault.bind(i);
        return jQuery.extend(i, e), i.preventDefault = function() {
            o(), s()
        }, i
    }
    var s = {
            bubbles: !1,
            cancelable: !1,
            view: null,
            detail: null,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: !1,
            altKey: !1,
            shiftKey: !1,
            metaKey: !1,
            button: 0,
            relatedTarget: null,
            buttons: 0,
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tiltX: 0,
            tiltY: 0,
            pointerType: "",
            hwTimestamp: 0,
            isPrimary: !1,
            target: null,
            currentTarget: null,
            which: 0,
            pageX: 0,
            pageY: 0,
            timeStamp: 0
        },
        r = Object.keys(s),
        a = r.map(function(t) {
            return s[t]
        }),
        c = r.length,
        l = !1,
        u = [0, 1, 4, 2];
    try {
        l = 1 === new MouseEvent("test", {
            buttons: 1
        }).buttons
    } catch (t) {}
    var d = t.Map && t.Map.prototype.forEach,
        h = d ? new t.Map : {
            array: [],
            size: 0,
            set: function(t, e) {
                return void 0 === e ? this.delete(t) : (this.has(t) || this.size++, void(this.array[t] = e))
            },
            has: function(t) {
                return void 0 !== this.array[t]
            },
            delete: function(t) {
                this.has(t) && (delete this.array[t], this.size--)
            },
            get: function(t) {
                return this.array[t]
            },
            clear: function() {
                this.array.length = 0, this.size = 0
            },
            forEach: function(t, e) {
                return this.array.forEach(function(n, i) {
                    t.call(e, n, i, this)
                }, this)
            }
        },
        p = {
            eventMap: {},
            captureInfo: {},
            eventSourceList: [],
            registerSource: function(t, e) {
                var n = e.events;
                n && (n.forEach(function(t) {
                    e[t] && (this.eventMap[t] = e[t].bind(e))
                }, this), this.eventSourceList.push(e))
            },
            register: function(t) {
                for (var e, n = this.eventSourceList.length, i = 0; i < n && (e = this.eventSourceList[i]); i++) e.register.call(e, t)
            },
            unregister: function(t) {
                for (var e, n = this.eventSourceList.length, i = 0; i < n && (e = this.eventSourceList[i]); i++) e.unregister.call(e, t);
            },
            contains: function(t, e) {
                return !!t.contains && t.contains(e)
            },
            getCommonAncestor: function(t, n) {
                for (; t && t !== e.documentElement;) {
                    if (t.contains && t.contains(n)) return t;
                    t = t.parentNode
                }
                return null
            },
            down: function(t) {
                t.bubbles = !0, this.fireEvent("pointerdown", t)
            },
            move: function(t) {
                t.bubbles = !0, this.fireEvent("pointermove", t)
            },
            up: function(t) {
                t.bubbles = !0, this.fireEvent("pointerup", t)
            },
            enter: function(t) {
                var e = [],
                    n = t.target,
                    i = this.getCommonAncestor(n, t.relatedTarget);
                for (t.bubbles = !1; n && n !== i;) e.push(n), n = n.parentNode;
                for (; e.length;) t.target = e.pop(), this.fireEvent("pointerenter", t)
            },
            leave: function(t) {
                var e = [],
                    n = t.target,
                    i = this.getCommonAncestor(n, t.relatedTarget);
                for (t.bubbles = !1; n && n !== i;) e.push(n), n = n.parentNode;
                for (; e.length;) t.target = e.shift(), this.fireEvent("pointerleave", t)
            },
            over: function(t) {
                t.bubbles = !0, this.fireEvent("pointerover", t)
            },
            out: function(t) {
                t.bubbles = !0, this.fireEvent("pointerout", t)
            },
            cancel: function(t) {
                t.bubbles = !0, this.fireEvent("pointercancel", t)
            },
            leaveOut: function(t) {
                this.out(t), this.contains(t.target, t.relatedTarget) || this.leave(t)
            },
            enterOver: function(t) {
                this.over(t), this.contains(t.target, t.relatedTarget) || this.enter(t)
            },
            listen: function(t, e) {
                e.forEach(function(e) {
                    this.addEvent(t, e)
                }, this)
            },
            unlisten: function(t, e) {
                e.forEach(function(e) {
                    this.removeEvent(t, e)
                }, this)
            },
            addEvent: function(t, e) {
                n(t).on(e, this.boundHandler)
            },
            removeEvent: function(t, e) {
                n(t).off(e, this.boundHandler)
            },
            eventHandler: function(t) {
                var e = this.eventMap[t.type];
                e && e(t, t.originalEvent)
            },
            makeEvent: function(t, e) {
                this.captureInfo[e.pointerId] && (e.relatedTarget = null);
                var n = o(t, e);
                return n._target = n._target || e.target, n
            },
            fireEvent: function(t, e) {
                var n = this.makeEvent(t, e);
                return this.dispatchEvent(n)
            },
            getTarget: function(t) {
                return this.captureInfo[t.pointerId] || t._target
            },
            setCapture: function(t, i) {
                this.captureInfo[t] && this.releaseCapture(t), this.captureInfo[t] = i, this.implicitRelease = this.releaseCapture.bind(this, t), n(e).on("pointerup pointercancel", this.implicitRelease), this.asyncDispatchEvent(n.Event("gotpointercapture", {
                    bubbles: !0,
                    cancelable: !1,
                    pointerId: t,
                    _target: i
                }))
            },
            releaseCapture: function(t) {
                var i = this.captureInfo[t];
                i && (this.captureInfo[t] = void 0, n(e).off("pointerup pointercancel", this.implicitRelease), this.asyncDispatchEvent(n.Event("lostpointercapture", {
                    bubbles: !0,
                    cancelable: !1,
                    pointerId: t,
                    _target: i
                })))
            },
            dispatchEvent: function(t) {
                var e = this.getTarget(t);
                if (e) return n.event.trigger(t, null, e, !t.bubbles)
            },
            asyncDispatchEvent: function(e) {
                (t.requestAnimationFrame || setTimeout)(this.dispatchEvent.bind(this, e))
            }
        };
    p.boundHandler = p.eventHandler.bind(p);
    var m, f, _ = {
            POINTER_ID: 1,
            POINTER_TYPE: "mouse",
            DEDUP_DIST: 25,
            events: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout"],
            register: function(t) {
                p.listen(t, this.events)
            },
            unregister: function(t) {
                p.unlisten(t, this.events)
            },
            lastTouches: [],
            isEventSimulatedFromTouch: function(t) {
                for (var e, n = this.lastTouches, i = t.clientX, o = t.clientY, s = 0, r = n.length; s < r && (e = n[s]); s++) {
                    var a = Math.abs(i - e.x),
                        c = Math.abs(o - e.y);
                    if (a <= this.DEDUP_DIST && c <= this.DEDUP_DIST) return !0
                }
            },
            prepareEvent: function(t) {
                return i(t, {
                    pointerId: this.POINTER_ID,
                    isPrimary: !0,
                    pointerType: this.POINTER_TYPE
                })
            },
            mousedown: function(t) {
                this.isEventSimulatedFromTouch(t) || (h.has(this.POINTER_ID) && this.cancel(t), h.set(this.POINTER_ID, t), p.down(this.prepareEvent(t)))
            },
            mousemove: function(t) {
                this.isEventSimulatedFromTouch(t) || p.move(this.prepareEvent(t))
            },
            mouseup: function(t) {
                if (!this.isEventSimulatedFromTouch(t)) {
                    var e = h.get(this.POINTER_ID);
                    e && e.button === t.button && (p.up(this.prepareEvent(t)), this.cleanupMouse())
                }
            },
            mouseover: function(t) {
                this.isEventSimulatedFromTouch(t) || p.enterOver(this.prepareEvent(t))
            },
            mouseout: function(t) {
                this.isEventSimulatedFromTouch(t) || p.leaveOut(this.prepareEvent(t))
            },
            cancel: function(t) {
                p.cancel(this.prepareEvent(t)), this.cleanupMouse()
            },
            cleanupMouse: function() {
                h.delete(this.POINTER_ID)
            }
        },
        g = {
            POINTER_TYPE: "touch",
            DEDUP_TIMEOUT: 2500,
            CLICK_COUNT_TIMEOUT: 200,
            events: ["touchstart", "touchmove", "touchend", "touchcancel"],
            register: function(t) {
                p.listen(t, this.events)
            },
            unregister: function(t) {
                p.unlisten(t, this.events)
            },
            firstTouch: null,
            isPrimaryTouch: function(t) {
                return this.firstTouch === t.identifier
            },
            setPrimaryTouch: function(t) {
                (0 === h.size || 1 === h.size && h.has(1)) && (this.firstTouch = t.identifier, this.firstTouchTarget = t.target, this.scrolling = !1, this.firstXY = {
                    X: t.clientX,
                    Y: t.clientY
                }, this.cancelResetClickCount())
            },
            removePrimaryPointer: function(t) {
                t.isPrimary && (this.firstTouch = null, this.firstTouchTarget = null, this.firstXY = null, this.shouldScrollCache = void 0, this.resetClickCount())
            },
            clickCount: 0,
            resetId: null,
            resetClickCount: function() {
                var t = function() {
                    this.clickCount = 0, this.resetId = null
                }.bind(this);
                this.resetId = setTimeout(t, this.CLICK_COUNT_TIMEOUT)
            },
            cancelResetClickCount: function() {
                this.resetId && clearTimeout(this.resetId)
            },
            typeToButtons: function(t) {
                return "touchstart" === t || "touchmove" === t ? 1 : 0
            },
            findTarget: function(t) {
                return e.elementFromPoint(t.clientX, t.clientY)
            },
            touchToPointer: function(t) {
                var e = this,
                    o = this.currentTouchEvent,
                    s = t.identifier + 2;
                return i(o, n.extend({}, t, {
                    pointerId: s,
                    target: p.captureInfo[s] || this.findTarget(t),
                    bubbles: !0,
                    cancelable: !0,
                    detail: this.clickCount,
                    button: 0,
                    buttons: this.typeToButtons(o.type),
                    width: t.webkitRadiusX || t.radiusX || 0,
                    height: t.webkitRadiusY || t.radiusY || 0,
                    pressure: t.webkitForce || t.force || .5,
                    isPrimary: this.isPrimaryTouch(t),
                    pointerType: this.POINTER_TYPE,
                    preventDefault: function() {
                        e.scrolling = !1, e.shouldScrollCache = !1, e.firstXY = null
                    }
                }))
            },
            processTouches: function(t, e) {
                var n = t.originalEvent.changedTouches;
                this.currentTouchEvent = t;
                for (var i, o = 0; o < n.length; o++) i = n[o], e.call(this, this.touchToPointer(i))
            },
            scrollTypes: {
                EMITTER: "none",
                XSCROLLER: "pan-x",
                YSCROLLER: "pan-y",
                SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/
            },
            touchActionToScrollType: function(t) {
                var e, n = this.scrollTypes;
                return t === n.EMITTER ? e = "none" : t === n.XSCROLLER ? e = "X" : t === n.YSCROLLER ? e = "Y" : n.SCROLLER.exec(t) && (e = "XY"), e
            },
            shouldScroll: function(t) {
                if (void 0 !== this.shouldScrollCache) return this.shouldScrollCache;
                if (!this.firstXY) return !0;
                var e, n, i = this.firstTouchTarget;
                do {
                    if (!i) break;
                    if (e = i.getAttribute("touch-action"), null !== e) break;
                    i = i.parentNode
                } while (i !== document);
                var o = this.touchActionToScrollType(e);
                if ("none" === o) n = !1;
                else if ("XY" === o || void 0 === o) n = !0;
                else {
                    var s = t.originalEvent.changedTouches[0],
                        r = o,
                        a = "Y" === o ? "X" : "Y",
                        c = Math.abs(s["client" + r] - this.firstXY[r]),
                        l = Math.abs(s["client" + a] - this.firstXY[a]);
                    n = c >= l
                }
                return this.shouldScrollCache = n, this.firstXY = null, this.firstTouchTarget = null, this.shouldScrollCache
            },
            findTouch: function(t, e) {
                for (var n, i = 0, o = t.length; i < o && (n = t[i]); i++)
                    if (n.identifier === e) return !0
            },
            vacuumTouches: function(t) {
                var e = t.originalEvent.touches;
                if (h.size >= e.length) {
                    var n = [];
                    h.forEach(function(t, i) {
                        if (1 !== i && !this.findTouch(e, i - 2)) {
                            var o = t.out;
                            n.push(o)
                        }
                    }, this), n.forEach(this.cancelOut, this)
                }
            },
            touchstart: function(t) {
                var e = t.originalEvent.changedTouches[0];
                this.vacuumTouches(t), this.setPrimaryTouch(e), this.dedupSynthMouse(e), this.scrolling || (this.clickCount++, this.processTouches(t, this.overDown))
            },
            overDown: function(t) {
                h.set(t.pointerId, {
                    target: t.target,
                    out: t,
                    outTarget: t.target
                }), p.over(t), p.enter(t), p.down(t)
            },
            touchmove: function(t) {
                this.scrolling || (this.shouldScroll(t) ? (this.scrolling = !0, this.touchcancel(t)) : (t.preventDefault(), this.processTouches(t, this.moveOverOut)))
            },
            moveOverOut: function(t) {
                var e = h.get(t.pointerId);
                if (e) {
                    var n = e.out,
                        i = e.outTarget;
                    p.move(t), n && i !== t.target && (n.relatedTarget = t.target, t.relatedTarget = i, n.target = i, t.target ? (p.leaveOut(n), p.enterOver(t)) : (t.target = i, t.relatedTarget = null, this.cancelOut(t))), e.out = t, e.outTarget = t.target
                }
            },
            touchend: function(t) {
                this.dedupSynthMouse(t.originalEvent.changedTouches[0]), this.processTouches(t, this.upOut)
            },
            upOut: function(t) {
                this.scrolling || (p.up(t), p.out(t), p.leave(t)), this.cleanUpPointer(t)
            },
            touchcancel: function(t) {
                this.processTouches(t, this.cancelOut)
            },
            cancelOut: function(t) {
                p.cancel(t), p.out(t), p.leave(t), this.cleanUpPointer(t)
            },
            cleanUpPointer: function(t) {
                h.delete(t.pointerId), this.removePrimaryPointer(t)
            },
            dedupSynthMouse: function(t) {
                var e = _.lastTouches;
                if (this.isPrimaryTouch(t)) {
                    var n = {
                        x: t.clientX,
                        y: t.clientY
                    };
                    e.push(n);
                    var i = function(t, e) {
                        var n = t.indexOf(e);
                        n > -1 && t.splice(n, 1)
                    }.bind(null, e, n);
                    setTimeout(i, this.DEDUP_TIMEOUT)
                }
            }
        },
        v = {
            POINTER_TYPES: ["", "unavailable", "touch", "pen", "mouse"],
            HAS_BITMAP_TYPE: t.MSPointerEvent && "number" == typeof t.MSPointerEvent.MSPOINTER_TYPE_MOUSE,
            events: ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerOut", "MSPointerOver", "MSPointerCancel", "MSGotPointerCapture", "MSLostPointerCapture"],
            register: function(t) {
                p.listen(t, this.events)
            },
            unregister: function(t) {
                p.unlisten(t, this.events)
            },
            prepareEvent: function(t) {
                var e = i(t);
                return this.HAS_BITMAP_TYPE && (e.pointerType = this.POINTER_TYPES[e.pointerType]), e
            },
            cleanup: function(t) {
                h.delete(t)
            },
            MSPointerDown: function(t) {
                h.set(t.originalEvent.pointerId, t), p.down(this.prepareEvent(t))
            },
            MSPointerMove: function(t) {
                p.move(this.prepareEvent(t))
            },
            MSPointerUp: function(t) {
                p.up(this.prepareEvent(t)), this.cleanup(t.originalEvent.pointerId)
            },
            MSPointerOut: function(t) {
                p.leaveOut(this.prepareEvent(t))
            },
            MSPointerOver: function(t) {
                p.enterOver(this.prepareEvent(t))
            },
            MSPointerCancel: function(t) {
                p.cancel(this.prepareEvent(t)), this.cleanup(t.originalEvent.pointerId)
            },
            MSGotPointerCapture: function(t) {
                p.fireEvent("gotpointercapture", this.prepareEvent(t))
            },
            MSLostPointerCapture: function(t) {
                p.fireEvent("lostpointercapture", this.prepareEvent(t))
            }
        },
        y = function(t) {
            if (!h.has(t)) throw new Error("InvalidPointerId")
        };
    t.Element && Element.prototype.setPointerCapture ? (m = function(t, e) {
        t.setPointerCapture(e)
    }, f = function(t, e) {
        t.releasePointerCapture(e)
    }) : t.navigator.msPointerEnabled ? (m = function(t, e) {
        y(e), t.msSetPointerCapture(e)
    }, f = function(t, e) {
        y(e), t.msReleasePointerCapture(e)
    }) : (m = function(t, e) {
        y(e), p.setCapture(e, t)
    }, f = function(t, e) {
        y(e), p.releaseCapture(e, t)
    }), n.fn.extend({
        setPointerCapture: function(t) {
            m(this[0], t)
        },
        releasePointerCapture: function(t) {
            f(this[0], t)
        }
    }), t._pointerPolyfillInited || (t._pointerPolyfillInited = !0, t.PointerEvent ? ["move", "down", "up", "over", "out", "enter", "leave", "cancel"].forEach(function(t) {
        var e = jQuery.event.fixHooks,
            n = "pointer" + t;
        e[n] || (e[n] = {}), e[n].props = r.concat(e[n].props || [])
    }) : (delete n.event.special.pointerenter, delete n.event.special.pointerleave, t.navigator.msPointerEnabled ? p.registerSource("ms", v) : (p.registerSource("mouse", _), void 0 !== t.ontouchstart && p.registerSource("touch", g)), p.register(document)))
}(window, document, jQuery),
function() {
    function t() {
        n.hasClass("pointerfocus") && (o = !0, setTimeout(function() {
            o = !1
        }))
    }
    var e = $(window),
        n = $(document.documentElement),
        i = 0,
        o = !1;
    document.documentMode <= 11 ? n.on("focusin", function(e) {
        var n = e.originalEvent;
        !n || n.fromElement || n.relatedTarget || t()
    }) : e.on("blur", function() {
        e.one("focus", t)
    }), n.addClass("utilityfocus").on({
        focusin: function() {
            n.toggleClass("pointerfocus", o).toggleClass("utilityfocus", !o)
        },
        keydown: function() {
            clearTimeout(i), o = !1
        },
        "pointerdown pointerup click": function(t) {
            o = !0, clearTimeout(i), i = setTimeout(function() {
                o = !1
            }, 600)
        }
    })
}(), BEM.DOM.decl("i-config", {
    onSetMod: {
        js: function() {
            var t = this;
            t.__self._params = t.params.params
        }
    }
}, {
    param: function(t) {
        var e = this;
        return (e._params || {})[t]
    }
}), BEM.decl("i-utils", {}, {
    GPU_BY_DEVICE: {
        iphone5: "PowerVR",
        macPro15: ["Radeon", "555", "AMD"]
    },
    hasWebGl: function(t) {
        void 0 === t && (t = {});
        var e = this,
            n = t.contextProps || "",
            i = "_hasWebGlCache" + JSON.stringify(n);
        if (void 0 === e[i]) {
            var o = document.createElement("canvas"),
                s = o.getContext("webgl") || o.getContext("experimental-webgl"),
                r = !0;
            if (s && n) {
                var a = Object.prototype.hasOwnProperty;
                for (var c in n)
                    if (a.call(n, c) && s.getParameter(s[c]) < n[c]) {
                        r = !1;
                        break
                    }
            }
            e[i] = r && Boolean(s)
        }
        return e[i]
    },
    testDeviceNameWithWebGL: function(t) {
        var e, n = this,
            i = document.createElement("canvas");
        if (i) {
            var o = i.getContext("webgl") || i.getContext("experimental-webgl");
            if (o) {
                var s;
                try {
                    s = o.getExtension("WEBGL_debug_renderer_info")
                } catch (t) {
                    return !1
                }
                s && (e = o.getParameter(s.UNMASKED_RENDERER_WEBGL))
            }
        }
        if (e)
            for (var r = 0; r < t.length; r++) {
                var a = n.GPU_BY_DEVICE[t[r]];
                if (!a) return !1;
                if ("string" == typeof a && e.indexOf(a) > -1) return !0;
                if (Array.isArray(a)) {
                    for (var c = !0, l = 0; l < a.length; l++)
                        if (e.indexOf(a[l]) === -1) {
                            c = !1;
                            break
                        } if (c) return !0
                }
            }
        return !1
    },
    getCurrentScrollWidth: function() {
        return "undefined" == typeof window ? 0 : "number" == typeof window.innerWidth ? window.innerWidth - document.documentElement.clientWidth : this._getScrollWidth()
    },
    _getScrollWidth: function() {
        if (null !== this._scrollWidth) return this._scrollWidth;
        var t = $("<div>").css({
            position: "absoulte",
            left: -9999,
            top: -9999,
            overflow: "scroll",
            width: 200,
            height: 200
        }).appendTo(document.body);
        return this._scrollWidth = 200 - t.get(0).scrollWidth, t.remove(), this._scrollWidth
    },
    color2rgb: function(t) {
        return t.indexOf("#") === -1 ? t.replace(/[rgba()]/g, "").split(/,\s*/).map(Number).slice(0, 3) : 7 === t.length ? t.substr(1).split(/([0-9a-f]{2})/i).filter(Boolean).map(function(t) {
            return parseInt(t, 16)
        }) : Array.from(t.substr(1)).map(function(t) {
            return parseInt(t + t, 16)
        })
    },
    mixColors: function(t, e, n) {
        var i = this.color2rgb(t),
            o = this.color2rgb(e);
        return "#" + [i[0] + Math.round(n * (o[0] - i[0])), i[1] + Math.round(n * (o[1] - i[1])), i[2] + Math.round(n * (o[2] - i[2]))].map(function(t) {
            return ("00" + t.toString(16)).substr(-2)
        }).join("").replace(/N/g, "a")
    },
    findSurroundingItems: function(t, e) {
        var n = t.slice().sort(function(t, e) {
                return t - e
            }),
            i = n[0],
            o = n[n.length - 1];
        return n.some(function(t, s) {
            return e === t ? (i = e, o = e, !0) : e > t && e < n[s + 1] && (i = t, o = n[s + 1], !0)
        }), [i, o]
    }
}),
function(t) {
    t.decl("b-statcounter__metrika", {
        onSetMod: {
            js: {
                inited: function() {
                    this.__self.loadMetrika(), this.addCounter(this.params)
                }
            }
        },
        addCounter: function(t) {
            var e = window.Ya && Ya.Metrika,
                n = window.yandex_metrika_callbacks || (window.yandex_metrika_callbacks = []),
                i = function() {
                    window["yaCounter" + t.id] = new Ya.Metrika(t)
                };
            if (!t.id) throw new Error([BEM.I18N("b-statcounter__metrika", "JSERR_incorrectID"), "block: " + this.__self.getName(), "method: addCounter"].join("\n"));
            e ? i() : n.push(i)
        },
        getDefaultParams: function() {
            return {
                enableAll: !0
            }
        }
    }, {
        loadMetrika: function() {
            var t = window.Ya && Ya.Metrika,
                e = "https:" === document.location.protocol ? "https:" : "http:",
                n = "//mc.yandex.ru/metrika/watch.js";
            !t && $.ajax({
                url: e + n,
                dataType: "script",
                cache: !0
            }), this.loadMetrika = function() {}
        }
    })
}(BEM.DOM),
function(t) {
    t.queryParam = function(t) {
        if (!t) return location.search.substr(1).split("&").reduce(function(t, e) {
            var n = e.indexOf("=");
            return n === -1 ? t[e] = !0 : t[e.substr(0, n)] = decodeURIComponent(e.substr(n + 1)), t
        }, {});
        var e = RegExp("[?&]" + t + "=([^&]*)").exec(location.search);
        return e && decodeURIComponent(e[1].replace(/\+/g, " "))
    }
}(jQuery), BEM.DOM.decl("i-redir", {
    onSetMod: {
        js: function() {
            this.redir = this.findBlockOutside("b-page").findBlockInside("redir"), this.bindTo("click", this._click)
        }
    },
    _click: function() {
        this.redir.send(this.params.event)
    }
}), BEM.decl("i-metrika", {}, {
    getId: function() {
        var t = BEM.blocks["i-global"].param("metrikaId");
        return t && "yaCounter" + t
    },
    hit: function(t) {
        var e = this;
        t = t || {}, e._safeMetrikaApply("hit", [t.pathname || location.pathname, {
            params: t.params || {},
            referer: t.referrer || document.referrer,
            title: t.title || document.title
        }])
    },
    params: function(t) {
        var e = this;
        e._safeMetrikaApply("params", [t])
    },
    reachGoal: function(t, e) {
        var n = this;
        n._safeMetrikaApply("reachGoal", [t, e])
    },
    reachGoalInline: function(t, e) {
        var n = this,
            i = n.getId();
        return "window." + i + " && " + i + ".reachGoal(" + JSON.stringify(t) + (e ? ", " + JSON.stringify(e).replace(/"/g, "'") : "") + ");return true;"
    },
    _safeFn: function(t, e, n) {
        n[t].apply(n, e)
    },
    _safeMetrikaApply: function(t, e) {
        var n = this,
            i = n.getId(),
            o = window[i],
            s = n._safeFn.bind(null, t, e);
        o ? s(o) : n._bindOnInit(s)
    },
    _bindOnInit: function(t) {
        var e = this;
        if (e._queue || (e._queue = []), e._queue.push(t), !e._binded && e.getId()) {
            e._binded = !0;
            var n = e.getId();
            $(document).on(n.toLowerCase() + "inited", function() {
                var t = window[n];
                $.each(e._queue, function(e, n) {
                    n(t)
                })
            })
        }
    }
}),
function() {
    "use strict";

    function t(t) {
        try {
            return decodeURIComponent(t)
        } catch (e) {
            return t
        }
    }

    function e(e) {
        if (!e || "string" != typeof e || !e.length) return {};
        /%23\d{10}/.test(e) && (e = t(e)), e = e.split("#");
        for (var n, i = Date.now() / 1e3, o = {}, s = 0, r = e.length; s < r; s++) n = e[s].split("."), 2 === n.length ? o[n[0]] = t(n[1]) : n.length > 2 && (isNaN(n[0]) ? o[n[0]] = t(n.slice(1).join(".")) : n[0] > i && (o[n[1]] = {
            value: t(n.slice(2).join(".")),
            expires: new Date(Number(n[0] + "000"))
        }));
        return o
    }
    window.Ya = window.Ya || {}, window.Ya.ypCookie = window.Ya.ypCookie || {}, window.Ya.ypCookie.get = function(t) {
        return e($.cookie("yp"))[t]
    }, window.Ya.ypCookie.set = function(t) {
        var e = BEM.blocks["i-global"].param("host"),
            n = BEM.blocks["i-global"].param("tld"),
            i = BEM.blocks["i-global"].param("secret-key");
        if (e && n && i) {
            for (var o = "", s = Object.keys(t), r = 0; r < s.length; r++) {
                var a = s[r];
                o += "&" + encodeURIComponent(a) + "=" + encodeURIComponent(t[a])
            }
            var c = $("<img>", {
                src: "//yandex." + n + "/portal/set/any/?sk=" + i + o + "&gif=1",
                style: "position:absolute;left:-9999px"
            });
            c.on("load error", function() {
                c.remove()
            }).appendTo(document.body)
        }
    }
}(), BEM.DOM.decl("i-yp_szm-cookie", {
    onSetMod: {
        js: function() {
            var t = window.Ya.ypCookie.get("szm"),
                e = t && t.value,
                n = String(window.devicePixelRatio || 1).replace(".", "_"),
                i = window.screen.width,
                o = window.screen.height,
                s = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                r = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                a = n + ":" + i + "x" + o + ":" + s + "x" + r;
            e && e === a || window.Ya.ypCookie.set({
                szm: a
            })
        }
    }
}), BEM.DOM.decl("b-page", {
    onSetMod: {
        js: {
            inited: function() {
                var t = this,
                    e = t.params.historyReplaceUrl;
                e && window.history.replaceState && window.history.replaceState(null, null, e), String.prototype.startsWith || Object.defineProperty(String.prototype, "startsWith", {
                    value: function(t, e) {
                        var n = e > 0 ? 0 | e : 0;
                        return this.substring(n, n + t.length) === t
                    }
                }), window.performance && !window.performance.now && (window.performance.now = function() {
                    return Date.now()
                })
            }
        }
    }
}), BEM.DOM.decl("b-page", {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), this.bindTo("mousedown", function() {
                    this.setMod("pressed", "yes")
                }).bindTo("mouseup dragend", function() {
                    this.delMod("pressed")
                });
                var t = $(".yandex-header");
                this.$header = t, t && t.get(0) && t.bem("header"), window.location.hash && $(".b-page").bem("anchor"), this.makeHeaderAccessible(), this._silentlyUpdateLocation()
            }
        }
    },
    makeHeaderAccessible: function() {
        var t = this.$header;
        if (t && t.get(0)) {
            var e = t.find(".yandex-header__logo-base"),
                n = t.find(".yandex-header__logo-service"),
                i = t.find(".yaplus__link"),
                o = t.find(".yandex-header__nav"),
                s = t.find(".notifier"),
                r = s.find(".notifier__ticker"),
                a = s.find(".notifier__icon"),
                c = t.find(".legouser__current-account"),
                l = c.find(".ticker__value"),
                u = t.find(".yandex-header__nav-link_active_yes"),
                d = Number(l.text()),
                h = Number(r.text());
            e.removeAttr("tabindex").attr("aria-label", BEM.I18N("interface-a11y", "goToYandex")), n.removeAttr("tabindex").attr("aria-label", BEM.I18N("interface-a11y", "goToWeather")), i.attr("aria-label", BEM.I18N("interface-a11y", "goToPlus")), o.attr("role", "menu").find("a").attr({
                itemprop: "url",
                role: "menuitem"
            }).find("span").attr({
                itemprop: "name"
            }), u.attr("aria-current", "page"), o.find(".yandex-header__nav-link").each(function(t, e) {
                var n = $(e);
                n.attr("aria-label", n.find("span").text())
            }), a.attr({
                role: "button",
                tabindex: 0,
                "aria-haspopup": "true",
                "aria-label": BEM.I18N("interface-a11y", "notifierCount").replace("%count", h || 0)
            }), r.attr({
                role: "alert",
                "aria-live": "assertive",
                "aria-atomic": "true"
            }), c.attr({
                role: "button",
                "aria-haspopup": "true",
                "aria-label": BEM.I18N("interface-a11y", "user2").replace("%count", d || 0)
            }), c.find(".user-pic").attr({
                "aria-hidden": !0
            })
        }
    },
    _silentlyUpdateLocation: function() {
        var t = this;
        BEM.blocks["i-geolocation"].getGeolocationPermissionStatus().then(function(e) {
            BEM.blocks["i-global"].param("is-region-user-choice") ? BEM.blocks["i-metrika"].reachGoal("skip-silent-location-update-from-user-chosen-region") : (BEM.blocks["i-metrika"].params({
                geolocation_permission_status: e
            }), "granted" === e && BEM.blocks["i-geolocation"].isLocationCookieTooOld() && BEM.blocks["i-geolocation"].updateLocation(!0).then(t._onUpdateLocation, t._onUpdateLocationError))
        })
    },
    _onUpdateLocation: function() {
        BEM.blocks["i-metrika"].reachGoal("silent-location-update")
    },
    _onUpdateLocationError: function(t) {
        var e = "silent-location-update.";
        BEM.blocks["i-metrika"].reachGoal(e + "error"), BEM.blocks["i-metrika"].reachGoal(e + "error-" + t.message)
    }
}), $.extend({
    debounce: function(t, e, n, i) {
        var o, s = function() {
            var s = arguments;
            i = i || this, n && !o && t.apply(i, s), clearTimeout(o), o = setTimeout(function() {
                n || t.apply(i, s), o = null
            }, e)
        };
        return 3 === arguments.length && "boolean" != typeof n && (i = n, n = !1), s.stop = function() {
            clearTimeout(o), o = null
        }, s
    },
    throttle: function(t, e, n) {
        var i, o, s, r = function() {
            o = arguments, s = !0, n = n || this, i || function() {
                s ? (t.apply(n, o), s = !1, i = setTimeout(arguments.callee, e)) : i = null
            }()
        };
        return r.stop = function() {
            clearTimeout(i), i = null
        }, r
    }
}), BEM.DOM.decl("header", {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), this.bindToWin("resize", $.throttle(this._onResize, 150)), this._collapseUserIfNeeded()
            }
        }
    },
    _onResize: function() {
        this._collapseUserIfNeeded()
    },
    _onUserUpdatesName: function() {
        this._collapseBreakpoint = null, this._collapseUserIfNeeded()
    },
    _collapseUserIfNeeded: function() {
        var t = this._getUser();
        t && t.toggleCollapsed(this._getCollapseBreakpoint() >= this.elem("nav").width())
    },
    _getCollapseBreakpoint: function() {
        return this._collapseBreakpoint || (this._collapseBreakpoint = this._getNavItemsWidth() + this.__self.NAV_ITEMS_GAP), this._collapseBreakpoint
    },
    _getNavItemsWidth: function() {
        var t = 0;
        return this.elem("nav").children().each(function() {
            t += $(this).outerWidth(!0)
        }), t
    },
    _getUser: function() {
        return this._user ? this._user._isDestructing && (this._collapseBreakpoint = null, this._user = this.findBlockInside("user")) : (this._user = this.findBlockInside("user"), this._user && this._user.on("update-name", this._onUserUpdatesName, this)), this._user
    }
}, {
    NAV_ITEMS_GAP: 10,
    live: !1
}), BEM.DOM.decl("header", {
    onSetMod: {
        js: function() {
            var t = $(".yandex-header__more-button"),
                e = $(".yandex-header__more-wrapper"),
                n = $("body"),
                i = "yandex-header__menu_opened";
            t.click(function(o) {
                return o.preventDefault(), !e.is(":visible") && (e.fadeIn(), n.addClass(i), void t.attr("aria-expanded", "true"))
            }), document.body.addEventListener("click", function() {
                n.hasClass(i) && (e.fadeOut(), n.removeClass(i), t.attr("aria-expanded", "false"))
            }, !0)
        }
    }
}), window.MBEM = window.MBEM || {},
function() {
    var t = function(t) {
        this.type = t, this.propagationStopped = !1
    };
    t.prototype.stopPropagation = function() {
        this.propagationStopped = !0
    };
    var e = function() {};
    e.prototype.on = function(t, e, n) {
        if ("object" == typeof t) {
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && this.on(i, t[i], e);
            return this
        }
        var o = this._handlerStorage || (this._handlerStorage = {}),
            s = o[t] || (o[t] = []);
        return s.push({
            fn: e,
            ctx: n
        }), this
    }, e.prototype.un = function(t, e) {
        for (var n = this._handlerStorage || (this._handlerStorage = {}), i = n[t] || (n[t] = []), o = 0; o < i.length; ++o)
            if (i[o].fn === e) return i.splice(o, 1), this;
        return this
    }, e.prototype.trigger = function(e, n) {
        for (var i, o = new t(e), s = this, r = this._handlerStorage || (this._handlerStorage = {}), a = r[e] || (r[e] = []), c = 0; c < a.length; ++c) {
            var l = a[c];
            if (i = l.fn.call(l.ctx || s, o, n), i === !1 && o.stopPropagation(), o.propagationStopped) break
        }
        return i
    }, MBEM.Observable = e
}(), MBEM.arrayFrom = function(t) {
    return Array.prototype.slice.call(t)
},
function() {
    var t = /\s+/;
    MBEM.cls = {
        list: function(e) {
            return e.split(t).filter(Boolean)
        },
        contains: function(t, e) {
            return MBEM.cls.list(t.className).indexOf(e) > -1
        },
        add: function(t, e) {
            var n = MBEM.cls.list(t.className);
            return n.indexOf(e) === -1 && n.push(e), t.className = n.join(" "), this
        },
        remove: function(t, e) {
            var n = MBEM.cls.list(t.className),
                i = n.indexOf(e);
            return i > -1 && n.splice(i, 1), t.className = n.join(" "), this
        },
        toggle: function(t, e, n) {
            return void 0 === n && (n = !MBEM.cls.contains(t, e)), MBEM.cls[n ? "add" : "remove"](t, e)
        }
    }
}(), MBEM.extend = function(t, e) {
    for (var n in e)
        if (Object.prototype.hasOwnProperty.call(e, n)) {
            var i = e[n];
            i instanceof Array || i instanceof Date || "object" != typeof i || null === i ? t[n] = i : (t[n] = t[n] || {}, MBEM.extend(t[n], i))
        } return t
},
function() {
    var t = "__uniqMBEM" + Math.random().toString().substr(2, 5);
    MBEM.blocks = {};
    var e = MBEM.blocks;
    MBEM.prototype = Object.create(MBEM.Observable.prototype), MBEM.prototype.getDefaultParams = function() {
        return {}
    }, MBEM._propListeners = "__uniqMBEMListeners" + Math.random().toString().substr(2, 5);
    var n = MBEM._propListeners;
    MBEM.prototype.bindTo = function(t, e, i) {
        return "function" == typeof e && (i = e, e = t, t = this.domElem), "string" == typeof t ? t = this.elem(t) : Array.isArray(t) || (t = [t]), e.split(" ").forEach(function(e) {
            t.forEach(function(t) {
                var o = i.bind(this);
                o.origHandler = i, t[n] || (t[n] = {}), t[n][e] || (t[n][e] = []), t[n][e].push(o), t.addEventListener(e, o)
            }, this)
        }, this), this
    }, MBEM.prototype.elem = function(t, e, n) {
        var i = [],
            o = t.split(" ").map(function(t) {
                var o = this.__self.className(t, e, n);
                return MBEM.cls.contains(this.domElem, o) && i.push(this.domElem), "." + o
            }, this).join(",");
        return i.concat(MBEM.arrayFrom(this.domElem.querySelectorAll(o)))
    };
    var i = function() {};
    MBEM.override = function(t, e) {
        return "function" == typeof e && e.toString().indexOf("__base") > -1 ? (t = t || i, function() {
            var n = this.__base;
            this.__base = t;
            var i = e.apply(this, arguments);
            return this.__base = n, i
        }) : e
    }, MBEM.staticProto = {}, MBEM.staticProto.className = function(t, e, n) {
        var i = this._name;
        return t && (i += "__" + t), void 0 !== e && n !== !1 && (i += "_" + e + (n !== !0 && void 0 !== n ? "_" + n : "")), i
    }, MBEM.decl = function(t, n, i) {
        n = n || {};
        var o, s, r, a, c, l = !1;
        "object" == typeof t && t.baseBlock ? (l = !0, c = t.baseBlock, t = t.block) : c = t, c in e ? (s = e[c].prototype, r = e[c], o = r) : (l = !0, s = MBEM.prototype, r = MBEM.staticProto), l && (s = Object.create(s), o = function(t) {
            this.__internalConstructor(t), this.__constructor(t), this.__afterConstructor(t)
        }, o.prototype = s, o.prototype.constructor = o, o.prototype.__self = o, o._name = t, e[t] = o);
        for (var u in n) Object.prototype.hasOwnProperty.call(n, u) && (s[u] = MBEM.override(s[u], n[u]));
        for (a in r) i && Object.prototype.hasOwnProperty.call(i, a) || o[a] || (o[a] = r[a]);
        if (i)
            for (a in i) Object.prototype.hasOwnProperty.call(i, a) && (o[a] = MBEM.override(r[a], i[a]));
        return o
    }, MBEM.getBlock = function(e, n) {
        return e[t] && e[t][n]
    }, MBEM.consoleError = function() {
        if (window.console && window.console.error) try {
            window.console.error.apply(window.console, arguments)
        } catch (t) {}
    }, MBEM.prototype.__internalConstructor = function(e) {
        e = e || {}, this.domElem = e.node, this.params = MBEM.extend(this.getDefaultParams(), e.params || {}), e.node && ((e.node[t] || (e.node[t] = {}))[this.__self._name] = this)
    }, MBEM.prototype.__constructor = function() {}, MBEM.prototype.__afterConstructor = function() {}, MBEM.initBlockFromNode = function(t, e, n) {
        var i;
        return (i = MBEM.getBlock(t, e)) ? i : (n || (n = MBEM.getNodeParams(t)[e]), MBEM._createBlockFromNode({
            node: t,
            block: e,
            params: n
        }))
    }, MBEM.createBlock = function(t) {
        return e[t.block] ? new e[t.block](t) : void MBEM.consoleError("Block is not declared", t.block)
    }, MBEM._createBlockFromNode = MBEM.createBlock, MBEM.getNodeParams = function(t) {
        var e;
        try {
            e = JSON.parse(t.getAttribute("data-bem")) || {}
        } catch (e) {
            return void MBEM.consoleError("Incorrect params", t)
        }
        return e
    }
}(), Function.prototype.bind || (Function.prototype.bind = function(t) {
    var e = this,
        n = MBEM.arrayFrom(arguments).slice(1);
    return function() {
        var i = MBEM.arrayFrom(arguments);
        return e.apply(t, n.concat(i))
    }
}),
function() {
    function t() {
        return document.documentElement.className.indexOf("svg_yes") !== -1
    }

    function e(t) {
        var e = "";
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e += " " + n + '="' + String(t[n]).replace(/"/g, "&quot;") + '"');
        return e
    }
    MBEM.decl("mini-suggest", {
        __constructor: function() {
            this.__base.apply(this, arguments), this._prevRequestText = null, this._focused = !1, this._empty = !0, this._setElements(), this._syncVal(), this._bindHandlers(), setTimeout(function() {
                document.activeElement === this._input && this._onInputFocus()
            }.bind(this), 0)
        },
        _setElements: function() {
            this._input = this.domElem, this._clear = this.elem("input-clear")[0]
        },
        _bindHandlers: function() {
            this.bindTo(this._input, "focus", MBEM.eventProxy("_onInputFocus", this)).bindTo(this._input, "blur deactivate", MBEM.eventProxy("_onInputBlur", this)).bindTo(this._input, "input", MBEM.eventProxy("_onInput", this)).bindTo(this._clear, "click", MBEM.eventProxy("_onClearClick", this)), this.on("item-click", MBEM.eventProxy("_onItemClick", this)), 9 === document.documentMode && this.bindTo(document, "selectionchange", function() {
                document.activeElement === this._input && this._onInput()
            })
        },
        _onClearClick: function() {
            document.activeElement !== this._input && (this._renderItems([]), this._input.focus()), this._changeText("", "clear")
        },
        _onInputFocus: function() {
            this._fixScrollTop(), this._update(), this._checkAndShowPopup(), this._focused = !0, this._startInput()
        },
        _startInput: function() {
            this._inputStarted || (this._inputStarted = !0, this.trigger("start-input"))
        },
        _onInputBlur: function() {
            this._hidePopup(), this._focused = !1
        },
        _onInput: function() {
            this._input.value !== this._val && (this._syncVal(), this._update(), this.trigger("input-change", {
                type: "user"
            }))
        },
        _checkAndShowPopup: function() {
            this._shouldShowPopup() && this._showPopup()
        },
        _shouldShowPopup: function() {
            return !this._isShown && !this._empty
        },
        _showPopup: function() {
            this._createPopup(), MBEM.cls.add(this.domElem, "mini-suggest_open"), this.trigger("popup-show"), this._isShown = !0
        },
        _hidePopup: function() {
            this._isShown && (MBEM.cls.remove(this.domElem, "mini-suggest_open"), this.trigger("popup-hide"), this._isShown = !1)
        },
        _update: function(t) {
            if (t || this._prevRequestText !== this._val) return this._prevRequestText = this._val, this.params.skipEmptyRequest && !this._val ? void this._renderItems([]) : void this._request(this._val, this._onResponse)
        },
        _onResponse: function(t, e, n) {
            var i = this._processResponse(e),
                o = t === this._prevRequestText;
            this.trigger("response", {
                data: e,
                items: i,
                url: n.url,
                duration: n.duration,
                relevant: o,
                text: t
            }), o && this._renderItems(i)
        },
        _processResponse: function(t) {
            return this.params.responseAdapter ? this.params.responseAdapter(t) : t
        },
        _renderItems: function(t) {
            this._createPopup(), t.length ? (this._popupContent.innerHTML = this._getItemsHTML(t), this.trigger("popup-update", {
                items: t
            }), this._empty = !1, this._focused && this._checkAndShowPopup()) : (this._popupContent.innerHTML = "", this.trigger("popup-clear"), this._empty = !0, this._hidePopup()), this._syncItems(t)
        },
        _getItemsHTML: function(t) {
            return t.reduce(this._renderItem.bind(this), "")
        },
        _renderItem: function(t, e, n) {
            if (this.params.itemRenderer) return t + this.params.itemRenderer(e, n);
            var i = this._buildItem(e, n),
                o = this._wrapItemLink(this._buildItemContent(e, i), i);
            return t + (o ? "<" + i.tag + ' class="' + i.className + '"' + this.__self.toHtmlAttrsString(i.attrs) + ">" + o + "</" + i.tag + ">" : "")
        },
        _buildItem: function(t, e) {
            return {
                tag: "li",
                className: "mini-suggest__item mini-suggest__item_type_" + t[0],
                attrs: {
                    "data-index": e,
                    "data-type": t[0]
                },
                content: {}
            }
        },
        _wrapItemLink: function(t, e) {
            return e.linkAttrs ? "<a" + this.__self.toHtmlAttrsString(e.linkAttrs) + ">" + t + "</a>" : t
        },
        _createPopup: function() {
            if (this._popup) return !1;
            this._popup = document.createElement("div");
            var t = this._popup;
            t.className = "mini-suggest__popup mini-suggest__popup_svg_" + (this.__self.hasSvg() ? "yes" : "no"), this._popupInner = document.createElement("div");
            var e = this._popupInner;
            e.className = "mini-suggest__popup-inner", this._popupContent = document.createElement("ul");
            var n = this._popupContent;
            return n.className = "mini-suggest__popup-content", n.setAttribute("role", "listbox"), e.appendChild(n), t.appendChild(e), this._appendPopup(t), this._popup
        },
        _appendPopup: function(t) {
            MBEM.insertAfter(t, this._input)
        },
        _onPopupClick: function(t) {
            var e = MBEM.closest(t.target, "mini-suggest__item");
            e && this._handleLinkItemClick(t, e, "nav")
        },
        _onItemClick: function() {
            this.params.resetOnSelect && (this._renderItems([]), this._prevRequestText = null)
        },
        _syncVal: function() {
            this._setVal(this._input.value)
        },
        _syncItems: function(t) {
            this._dataItems = t, this._items = MBEM.arrayFrom(this._popupContent.querySelectorAll(".mini-suggest__item"))
        },
        _setVal: function(t) {
            this._val = t, MBEM.cls.toggle(this.domElem, this.__self.className("", "has-value", "yes"), Boolean(this._val))
        },
        _setInputVal: function(t) {
            this._input.value = t
        },
        _changeText: function(t, e, n, i) {
            this._input.focus(), n = void 0 === n || n, this._setInputVal(t), this._syncVal(), this._moveCaret(), n && (this._update(), this.trigger("input-change", {
                type: e
            })), i && i.call(this)
        },
        _getMainUrlParams: function(e) {
            var n = {
                svg: t() ? 1 : 0,
                part: e,
                pos: this._getCaretPosition()
            };
            return n
        },
        _getCaretPosition: function() {
            var t, e = this._val.length;
            return document.selection ? (t = document.selection.createRange(), t.moveStart("character", -e), t.text.length) : "number" == typeof this._input.selectionStart ? this._input.selectionStart : e
        },
        _moveCaretToEnd: function() {
            var t = this._val.length;
            try {
                if ("undefined" != typeof this._input.createTextRange) {
                    var e = this._input.createTextRange();
                    e.collapse(!1), e.select()
                } else "number" == typeof this._input.selectionStart && (this._input.scrollLeft = 999999, this._input.setSelectionRange(t, t))
            } catch (t) {}
        },
        _moveCaretToStart: function() {
            try {
                this._input.scrollLeft = 0, this._input.setSelectionRange(0, 0)
            } catch (t) {}
        },
        _moveCaret: function() {
            this._moveCaretToEnd()
        },
        _getItemEventProps: function(t, e, n, i) {
            return {
                node: t,
                type: e,
                subtype: t.getAttribute("data-subtype"),
                byKeyboard: Boolean(i),
                itemIndex: 0 | t.getAttribute("data-index"),
                val: this._val
            }
        },
        _blur: function() {
            this._input.blur();
            try {
                document.activeElement && document.activeElement.blur()
            } catch (t) {
                MBEM.consoleError("No active element")
            }
        },
        _handleClick: function() {},
        _fixScrollTop: function() {
            window.pageYOffset < 1 && (document.body.scrollTop = 0)
        },
        _handleLinkItemClick: function(t, e, n) {
            n && (e = this._getItemEventProps(e, n)), this._touchClick(t) || this.trigger("item-click", e)
        },
        _touchClick: function(t, e) {
            return !("touchend" !== t.type || !t.defaultPrevented) && ((e || t.target).click(), !0)
        }
    }, {
        hasSvg: t,
        toHtmlAttrsString: e,
        itemTypeIsNavigable: function(t) {
            return "nav" === t
        }
    })
}(), MBEM.decl("mini-suggest", {
    _createPopup: function() {
        var t = this.__base.apply(this, arguments);
        return t && (this._handleClick(this._popup, MBEM.eventProxy("_onPopupClick", this)), this.bindTo(this._popup, "mouseover", MBEM.eventProxy("_onMouseover", this)).bindTo(this._popup, "mouseout", MBEM.eventProxy("_onMouseout", this))), t
    },
    _onMouseover: function(t) {
        var e = MBEM.closest(t.target, "mini-suggest__item");
        e && this._selectItem(e)
    },
    _onMouseout: function(t) {
        var e = MBEM.closest(t.target, "mini-suggest__item");
        e && this._unselectAll()
    },
    _update: function() {
        this._unselectAll(), this.__base.apply(this, arguments)
    },
    _selectItem: function(t) {
        this._unselectAll(), t && MBEM.cls.add(t, "mini-suggest__item_selected_yes")
    },
    _unselectAll: function() {
        if (this._popup) {
            var t = this._popupContent.querySelectorAll(".mini-suggest__item_selected_yes");
            MBEM.arrayFrom(t).forEach(function(t) {
                MBEM.cls.remove(t, "mini-suggest__item_selected_yes")
            })
        }
    },
    _handleClick: function(t, e) {
        return this.bindTo(t, "mousedown", function(t) {
            t.preventDefault()
        }).bindTo(t, "click", function(t) {
            !t.button && e && e.call(this, t)
        }), this
    }
}), Date.now || (Date.now = function() {
    return (new Date).getTime()
}), MBEM.offset = function(t) {
    if (!t) return {
        top: 0,
        left: 0
    };
    var e = t.getBoundingClientRect(),
        n = document.documentElement.getBoundingClientRect();
    return {
        top: e.top - n.top,
        left: e.left - n.left
    }
}, MBEM.closest = function(t, e) {
    for (; t && t !== document;) {
        if (MBEM.cls.contains(t, e)) return t;
        t = t.parentNode
    }
}, MBEM.encodeUriComponent = function(t) {
    try {
        return encodeURIComponent(t)
    } catch (e) {
        t = t.replace(/[\ud800-\udbff](?![\udc00-\udfff])/g, "").replace(/([^\ud800-\udbff]|^)[\udc00-\udfff]/g, function(t) {
            return t.slice(0, -1)
        });
        try {
            return encodeURIComponent(t)
        } catch (e) {
            throw new URIError("РќРµРІРѕР·РјРѕР¶РЅРѕ Р·Р°С€РёС„СЂРѕРІР°С‚СЊ СЃС‚СЂРѕРєСѓ: " + t)
        }
    }
}, MBEM.appendUrlParams = function(t, e) {
    return t + (t.indexOf("?") > -1 ? "&" : "?") + Object.keys(e).map(function(t) {
        return t + "=" + MBEM.encodeUriComponent(e[t])
    }).join("&")
}, MBEM.throttle = function(t, e, n) {
    var i, o, s, r = null,
        a = 0;
    n || (n = {});
    var c = function() {
        a = n.leading === !1 ? 0 : (new Date).getTime(), r = null, s = t.apply(i, o), r || (o = null, i = o)
    };
    return function() {
        var l = (new Date).getTime();
        a || n.leading !== !1 || (a = l);
        var u = e - (l - a);
        return i = this, o = arguments, u <= 0 || u > e ? (r && (clearTimeout(r), r = null), a = l, s = t.apply(i, o), r || (o = null, i = o)) : r || n.trailing === !1 || (r = setTimeout(c, u)), s
    }
}, MBEM.insertAfter = function(t, e) {
    "function" == typeof e.insertAdjacentElement ? e.insertAdjacentElement("afterend", t) : e.parentNode.insertBefore(t, e.nextSibling)
}, MBEM.encode = function(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}, MBEM.resolveUrl = function(t) {
    return (/[/]{2}/.test(t) ? "" : "http://") + t
}, MBEM.eventProxy = function(t, e) {
    return function() {
        return e[t] && e[t].apply(e, arguments)
    }
}, MBEM.transitionendEvent = function() {
    var t = document.createElement("el"),
        e = {
            transition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        };
    for (var n in e)
        if (void 0 !== t.style[n]) return e[n]
}, MBEM.decl("mini-suggest", {
    _buildItem: function(t) {
        var e = this.__base.apply(this, arguments),
            n = t[0],
            i = t[1],
            o = t[3],
            s = t[4],
            r = t[5];
        return "tpah" === n && r && r.tpah && (i = i.slice(r.tpah[0], r.tpah[2])), e.content.title = MBEM.encode(i), e.content.info = o && MBEM.encode(o), e.attrs.role = "option", e.attrs["data-text"] = MBEM.encode(this._getItemText(t)), s && (e.linkAttrs = {
            href: MBEM.resolveUrl(s(t[5])),
            target: MBEM.encode(t[5] && t[5].target || "_self"),
            rel: "noopener",
            class: "mini-suggest__item-link"
        }), e
    },
    _getItemText: function(t) {
        var e = t[0],
            n = t[1],
            i = t[3],
            o = t[5];
        return o && o.searchQuery || ("fact" !== e || o && o.inline ? n : i)
    },
    _buildItemContentTitle: function(t, e) {
        return e.content.title || ""
    },
    _buildItemContentInfo: function(t, e) {
        return e.content.info || ""
    }
}), MBEM.decl("mini-suggest", {
    _buildItem: function(t) {
        var e = this.__base.apply(this, arguments);
        return t[5] && t[5].hl && (e.content.title = this._highlightText(t[1], t[5].hl)), e
    },
    _highlightText: function(t, e) {
        var n = e.reduce(function(e, n) {
            var i = n[0],
                o = n[1];
            return i !== e.lastIndex && (e.text += MBEM.encode(t.slice(e.lastIndex, i))), e.text += "<b>" + MBEM.encode(t.slice(i, o)) + "</b>", e.lastIndex = o, e
        }, {
            text: "",
            lastIndex: 0
        });
        return n.text + MBEM.encode(t.slice(n.lastIndex))
    }
}), MBEM.decl("mini-suggest", {
    _buildItemContent: function(t, e) {
        return this._buildItemContentTitle(t, e) + this._buildItemContentInfo(t, e)
    }
}), MBEM.decl("mini-suggest", {
    _buildItemContentTitle: function() {
        var t = this.__base.apply(this, arguments);
        return t ? '<span class="mini-suggest__item-title">' + t + "</span>" : t
    },
    _buildItemContentInfo: function() {
        var t = this.__base.apply(this, arguments);
        return t ? '<span class="mini-suggest__item-info">' + t + "</span>" : t
    }
}), MBEM.decl("mini-suggest", {
    __constructor: function() {
        this.__base.apply(this, arguments), this._selectedItem = -1, this._keyboardSelectedItem = -1, this._keyboardStartValue = this._val
    },
    _bindHandlers: function() {
        this.__base.apply(this, arguments), this.bindTo(this._input, "keydown", MBEM.eventProxy("_onKeydown", this)).bindTo(this._input, "keypress", MBEM.eventProxy("_onKeypress", this)).bindTo(this._input, "click", MBEM.eventProxy("_checkAndShowPopup", this)), this.on("input-change", MBEM.eventProxy("_onInputChange", this))
    },
    _onInputChange: function(t, e) {
        this._keyboardSelectedItem = -1, "select" !== e.type && "unselect" !== e.type && (this._keyboardStartValue = this._val)
    },
    _onKeydown: function(t) {
        var e, n = this.__self.keyboard;
        !this._popupContent || !this._isShown || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || t.which !== n.arrowUp && t.which !== n.arrowDown ? this._isShown && t.which === n.esc && (this._hidePopup(), this._unselectAll()) : (t.preventDefault(), t.which === n.arrowUp ? e = this._selectedItem === -1 ? this._items.length - 1 : this._selectedItem - 1 : t.which === n.arrowDown && (e = this._selectedItem === this._items.length - 1 ? -1 : this._selectedItem + 1), e < 0 ? this._selectItem(null, e, !0) : this._selectItem(this._items[e], e, !0))
    },
    _onKeypress: function(t) {
        var e = this.__self.keyboard;
        if (t.which === e.enter) {
            var n = this._keyboardSelectedItem > -1 && this._items[this._keyboardSelectedItem];
            if (t.preventDefault(), n) {
                var i = n.getAttribute("data-type");
                this.trigger("item-click", this._getItemEventProps(n, i, null, !0))
            } else {
                this.trigger("input-enter");
                var o = this.params.urlToSearch + "&request=" + encodeURIComponent(this._input.value);
                setTimeout(function() {
                    window.location = o
                }, 0)
            }
        }
    },
    _selectItem: function(t, e, n) {
        if (this.__base.apply(this, arguments), t)
            if (this._selectedItem = void 0 === e ? this._items.indexOf(t) : e, n) {
                var i = t.getAttribute("data-type"),
                    o = t.getAttribute("data-text");
                this._keyboardSelectedItem = this._selectedItem, this._changeText(o, "select", !1), this.trigger("item-select", this._getItemEventProps(t, i, o, !0), !0)
            } else this._keyboardSelectedItem = -1;
        else this._selectedItem = -1, this._keyboardSelectedItem = -1, this._changeText(this._keyboardStartValue, "unselect", !1)
    },
    _unselectAll: function() {
        this.__base.apply(this, arguments), this._selectedItem = -1, this._keyboardSelectedItem = -1
    },
    _onItemClick: function(t, e) {
        this.__base.apply(this, arguments), "nav" === e.type && e.byKeyboard && this._openLinkByKeyboard(e)
    },
    _openLinkByKeyboard: function(t) {
        var e = t.node.querySelector(".mini-suggest__item-link"),
            n = e.getAttribute("target"),
            i = e.getAttribute("href");
        if ("_self" === n) setTimeout(function() {
            window.location = i
        }, 0);
        else {
            var o = window.open("", n);
            o.opener = null, o.location = i
        }
    }
}, {
    keyboard: {
        enter: 13,
        arrowUp: 38,
        arrowDown: 40,
        esc: 27
    }
}),
function() {
    var t = MBEM.blocks,
        e = MBEM.decl;
    MBEM.decl = function(n, i, o) {
        if (i = i || {}, "object" == typeof n && n.modName) {
            var s;
            s = n.block in t ? t[n.block].prototype : MBEM.prototype;
            for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && "function" == typeof i[r] && ! function() {
                var t = n,
                    e = s[r],
                    o = i[r];
                i[r] = function() {
                    return this._simpleCheckMod(t.modName, t.modVal) ? o.apply(this, arguments) : e && this.__base ? e.apply(this, arguments) : void 0
                }
            }();
            n = n.block
        }
        return e(n, i, o)
    }, MBEM.prototype.__internalConstructor = MBEM.override(MBEM.prototype.__internalConstructor, function(t) {
        this._modCache = t && t.mods || this._extractInitMods(t), this.__base.apply(this, arguments)
    }), MBEM.prototype._extractInitMods = function(t) {
        var e = {};
        if (!t || !t.node) return e;
        for (var n, i, o = MBEM.cls.list(t.node.className), s = this.__self._name + "_", r = 0; r < o.length; ++r) 0 === o[r].indexOf(s) && (n = o[r].substring(s.length), i = n.indexOf("_"), i > -1 ? e[n.substring(0, i)] = n.substring(i + 1) : e[n] = !0);
        return e
    }, MBEM.prototype._simpleCheckMod = function(t, e) {
        return void 0 === e ? Boolean(this._modCache[t]) : this._modCache[t] === e
    }
}(), MBEM.decl({
    block: "mini-suggest",
    modName: "request"
}, {
    _prepareRequestUrl: function(t, e) {
        var n = MBEM.appendUrlParams(this.params.url, this._getMainUrlParams(t));
        return e && (n = MBEM.appendUrlParams(n, e)), n
    }
}), MBEM.decl({
    block: "mini-suggest",
    modName: "request",
    modVal: "jsonp"
}, {
    _request: function(t, e, n) {
        var i = document.createElement("script"),
            o = this._initRequestCallback(),
            s = this._prepareRequestUrl(t, {
                callback: o
            }),
            r = "undefined" != typeof document.currentScript,
            a = r ? Math.random().toString().substr(2, 5) : o;
        this._callbackStorage[a] = {
            start: Date.now(),
            url: s,
            text: t,
            callback: e
        }, i.dataset.id = a, i.src = s, i.onload = function() {
            r || delete window[o], delete this._callbackStorage[a], i.parentNode.removeChild(i)
        }.bind(this), i.onerror = function() {
            r || delete window[o], delete this._callbackStorage[a], i.parentNode.removeChild(i), n && n.call(this)
        }.bind(this), document.head.appendChild(i), this.trigger("request", {
            text: t
        })
    },
    _initRequestCallback: function() {
        var t = "undefined" != typeof document.currentScript;
        if (this._callbackName && t) return this._callbackName;
        this._callbackName = (this.params.jsonpCallbackPrefix || "onSuggestResponse") + Math.random().toString().substr(2, 5);
        var e = this._callbackName;
        return this._callbackStorage = this._callbackStorage || {}, window[e] = function(n) {
            var i;
            if (t ? document.currentScript && (i = this._callbackStorage[document.currentScript.dataset.id]) : i = this._callbackStorage[e], i) {
                var o = Date.now() - i.start;
                return i.callback.call(this, i.text, n, {
                    url: i.url,
                    duration: o
                })
            }
        }.bind(this), e
    }
}), MBEM.decl({
    block: "mini-suggest",
    modName: "form",
    modVal: "yes"
}, {
    _bindHandlers: function() {
        this.__base.apply(this, arguments), this.bindTo(window, "resize orientationchange", MBEM.throttle(MBEM.eventProxy("_setDimensions", this), 300)).bindTo(this._form, "submit", MBEM.eventProxy("_onFormSubmit", this))
    },
    _setElements: function() {
        this.__base.apply(this, arguments), this._input = this.elem("input")[0], this._form = this._input.form
    },
    _doSubmit: function() {
        var t = document.createEvent("Event");
        t.initEvent("submit", !0, !0), this._form.dispatchEvent(t) !== !1 && this._form.submit()
    },
    _onFormSubmit: function() {
        this.trigger("submit"), this._blur()
    }
}), MBEM.decl({
    block: "mini-suggest",
    modName: "separate-popup",
    modVal: "yes"
}, {
    _bindHandlers: function() {
        this.__base.apply(this, arguments), this.bindTo(window, "orientationchange resize", this._repositionPopup.bind(this))
    },
    _createPopup: function() {
        if (this._popup) return !1;
        var t = this.__base.apply(this, arguments),
            e = this.params.popupMods,
            n = this.params.popupMix;
        for (var i in e)
            if (Object.prototype.hasOwnProperty.call(e, i)) {
                var o = e[i];
                if (!o) continue;
                MBEM.cls.add(this._popup, "mini-suggest__popup_" + i + (o === !0 ? "" : "_" + o))
            } if (n)
            for (var s = 0; s < n.length; s++) MBEM.cls.add(this._popup, n[s]);
        return t
    },
    _appendPopup: function(t) {
        var e = this.params.getPopupContainer && this.params.getPopupContainer() || document.body;
        e.appendChild(t)
    },
    _repositionPopup: function() {
        if (this.__base.apply(this, arguments), this._popup && this._popupInner) {
            this._popup.style.top = MBEM.offset(this._input).top + this._input.offsetHeight + this.params.popupOffset + "px";
            var t = window.innerWidth,
                e = MBEM.offset(this._input).left;
            t > 1440 && (e -= Math.floor((t - 1440) / 2)), this._popupInner.style.width = this._input.offsetWidth + "px", this._popupInner.style.left = e + "px"
        }
    },
    _showPopup: function() {
        this.__base.apply(this, arguments), MBEM.cls.add(this._popup, "mini-suggest__popup_visible"), this._repositionPopup()
    },
    _hidePopup: function() {
        this._isShown && (this.__base.apply(this, arguments), MBEM.cls.remove(this._popup, "mini-suggest__popup_visible"))
    },
    getDefaultParams: function() {
        var t = this.__base.apply(this, arguments);
        return t.popupOffset = 0, t
    }
}), MBEM.decl({
    block: "mini-suggest",
    modName: "a11y",
    modVal: "yes"
}, {
    __constructor: function() {
        this.__base.apply(this, arguments), this._suggestId = Math.random().toString(36).substr(2)
    },
    _selectItem: function(t) {
        this.__base.apply(this, arguments), t && (this._input.setAttribute("aria-activedescendant", t.id), t.setAttribute("aria-selected", !0))
    },
    _unselectAll: function() {
        if (this.__base.apply(this, arguments), this._popup) {
            var t = this._input.getAttribute("aria-activedescendant");
            if (t) {
                this._input.setAttribute("aria-activedescendant", "");
                var e = document.getElementById(t);
                e && e.setAttribute("aria-selected", !1)
            }
        }
    },
    _buildItem: function(t, e) {
        var n = this.__base.apply(this, arguments);
        return n.attrs.id = "suggest-item-" + this._suggestId + "-" + e, n.linkAttrs && this.params.a11y && this.params.a11y.nav && (n.attrs["aria-roledescription"] = this.params.a11y.nav), n
    },
    _createPopup: function() {
        if (!this.__base.apply(this, arguments)) return !1;
        this._popupContent.id = "suggest-list-" + this._suggestId;
        var t = this._input.getAttribute("aria-controls");
        return this._input.setAttribute("aria-controls", (t ? t + " " : "") + this._popupContent.id), this._popup
    }
}), BEM.DOM.decl("mini-suggest-form", {
    onSetMod: {
        js: function() {
            this.params = this.params || {}, this._url = this.params.url, this._counter = this.params.counter, this._urlToSearch = this.params.urlToSearch, this._initSuggest()
        }
    },
    _initSuggest: function() {
        MBEM.initBlockFromNode(this.domElem[0], "mini-suggest", {
            url: this._url,
            urlToSearch: this._urlToSearch,
            counter: this._counter,
            jsonpCallbackPrefix: "jQuery",
            responseAdapter: this._responseAdapter,
            skipEmptyRequest: !0
        })
    },
    _responseAdapter: function(t) {
        if (Array.isArray(t) && t[1]) {
            for (var e = [], n = t[1], i = 0; i < n.length; i++) {
                var o = n[i];
                e.push(["nav", o.name, o.name_short, "", BEM.blocks["geo-suggest-util"].getUrl, o])
            }
            return e
        }
        return t
    }
}), BEM.decl("geo-suggest-util", {}, {
    getUrl: function(t, e) {
        var n = this,
            i = BEM.blocks["i-global"],
            o = blocks.get("i-utils"),
            s = o.makeURL.bind(o),
            r = i.param("host").split("://"),
            a = {
                serviceRoot: i.param("service-root"),
                query: $.queryParam(),
                protocol: r[0],
                host: r[1],
                queryLang: $.queryParam("lang")
            };
        e = e || {}, e.weatherSfx = e.weatherSfx || "", e.goToSuggestByEnter = e.goToSuggestByEnter || !1, e.goToLocationOnSuggest = e.goToLocationOnSuggest || !1, e.customRegionsCenter = e.customRegionsCenter || {}, "/" !== e.weatherSfx[0] && (e.weatherSfx = "/" + e.weatherSfx);
        var c = {
            absolute: !0,
            query: {},
            overrideOptions: a
        };
        if (e.goToSuggestByEnter && (c.query.via = "ssc"), "/maps" === e.weatherSfx) return $.extend(c.query, n._buildMapUrlQuery(t, e.customRegionsCenter)), s(t.geoid + e.weatherSfx, c);
        var l = ["geobase_province", "geobase_country"];
        return l.indexOf(t.kind) > -1 ? s("/region/" + t.geoid, c) : "weather" === t.kind && t.geoid ? s("/" + t.geoid + e.weatherSfx, c) : (c.coords = {
            lat: t.lat,
            lon: t.lon
        }, ["street", "house", "metro", "airport"].indexOf(t.kind) === -1 ? s(e.weatherSfx, c) : (c.query.name = t.name, c.query.kind = t.kind, s(e.weatherSfx, c)))
    },
    _buildMapUrlQuery: function(t, e) {
        var n = 30,
            i = 145,
            o = e[t.geoid] || {},
            s = o.lat || t.lat,
            r = o.lon || t.lon,
            a = (o.spn_lat || t.spnlat || n) / 2,
            c = (o.spn_lon || t.spnlon || i) / 2;
        return {
            lat: t.lat,
            lon: t.lon,
            bounds: r - c + "," + (s - a) + ";" + (r + c) + "," + (s + a)
        }
    }
}), BEM.DOM.decl("dropdown2", {
    onSetMod: {
        js: {
            inited: function() {
                this._switcher = null, this._popup = null
            }
        },
        opened: {
            yes: function() {
                return !this.hasMod("disabled") && void this.trigger("beforeOpen").getPopup().setAnchor(this.getSwitcher()).setMod("visible", "yes").on("beforeClose", this._onPopupBeforeClose, this)
            },
            "": function() {
                this.trigger("beforeClose").getPopup().delMod("visible").un("beforeClose", this._onPopupBeforeClose, this)
            }
        },
        disabled: {
            "*": function(t, e) {
                this.getSwitcher().setMod(t, e)
            },
            yes: function() {
                this.delMod("opened")
            }
        }
    },
    getPopup: function() {
        return this._popup || (this._popup = this.findBlockInside("popup2")), this._popup
    },
    getSwitcher: function() {
        return this._switcher || (this._switcher = this.findBlockInside(this.getMod("switcher"))), this._switcher
    },
    _onPopupBeforeClose: function() {
        this.delMod("opened")
    },
    _onSwitcherClick: function(t) {
        this._switcher || (this._switcher = t.block), this.toggleMod("opened", "yes")
    }
}, {
    live: !0
}), $.extend({
    util: {}
}),
function() {
    function t(t) {
        return "[object Object]" === i.call(t)
    }

    function e(n, i, o) {
        var s, r;
        n = Object(n), i = Object(i);
        for (s in i) r = o && o(n[s], i[s], s), void 0 !== r ? n[s] = r : t(n[s]) && t(i[s]) ? n[s] = e(n[s], i[s], o) : n[s] = i[s];
        return n
    }

    function n(t, n) {
        return e(t, n, function(t, e, n) {
            if ("mix" === n) return [].concat(t, e)
        })
    }
    var i = Object.prototype.toString;
    $.extend($.util, {
        merge: e,
        mergeBemjson: n
    })
}(),
function(t, e) {
    function n(t) {
        t.isPrimary && (f.push(t), setTimeout(Array.prototype.shift.bind(f), p))
    }

    function i(t, e) {
        return Math.abs(t.clientX - e.clientX) > d || Math.abs(t.clientY - e.clientY) > d
    }

    function o(t) {
        var e = t.clientX,
            n = t.clientY,
            i = "_compat" + t.type;
        if (!t._sourcePoint) {
            for (var o = 0; o < f.length; o++) {
                var s = f[o],
                    r = s.target === t.target;
                if (!s[i] && (r || !(Math.abs(e - s.clientX) > h || Math.abs(n - s.clientY) > h)) && (r || document.elementFromPoint(s.clientX, s.clientY) !== s.target)) {
                    t._sourcePoint = s, s[i] = t;
                    break
                }
            }
            _.push(t), setTimeout(Array.prototype.shift.bind(_), p)
        }
    }

    function s(t) {
        for (var e = 0; e < _.length; e++)
            if (_[e] === t) return _[e]._sourcePoint
    }

    function r(t) {
        var e = s(t);
        return Boolean(e) && e.target !== t.target
    }

    function a(t) {
        var n, i = t.type;
        return t.button || (t.type = "pointerclick", n = e.event.dispatch.apply(this, arguments), t.type = i), n
    }
    if (!e.event.special.pointerclick) {
        var c, l = void 0 !== t.ontouchstart || navigator.msMaxTouchPoints > 0,
            u = "touchAction" in document.documentElement.style,
            d = 10,
            h = 25,
            p = 900,
            m = 250,
            f = [],
            _ = [],
            g = null,
            v = null,
            y = u ? function(t) {
                function e(t) {
                    return !(!t || t === document.documentElement) && ("manipulation" === getComputedStyle(t)["touch-action"] || e(t.parentElement))
                }
                return e(t)
            } : function() {
                return !1
            };
        l ? (c = {
            click: function(t) {
                var e = Object(t.originalEvent)._sourcePoint;
                return e ? void(e.isDefaultPrevented() && t.preventDefault()) : a.apply(this, arguments)
            },
            "pointerdown pointermove pointerleave pointercancel pointerup": function(t) {
                var e = t.type;
                if ("mouse" !== t.pointerType && ("pointerdown" !== e && "pointerup" !== e || !y(t.target)))
                    if ("pointerdown" === e) v = t;
                    else if ("pointermove" === e && v && (v.target !== t.target || i(v, t))) v = null;
                else if ("pointerleave" === e || "pointercancel" === e) v = null;
                else if ("pointerup" === e) {
                    if (n(t), !v) return;
                    if (!(t.timeStamp - v.timeStamp > m)) return g || (g = setTimeout(function() {
                        g = v = null
                    })), a.apply(this, arguments);
                    v = null
                }
            }
        }, ["mousedown", "click"].forEach(function(e) {
            t.addEventListener(e, function(t) {
                o(t), r(t) && (t.preventDefault(), t.stopPropagation())
            }, !0)
        })) : c = {
            click: function(t) {
                return a.apply(this, arguments)
            }
        }, e.event.special.pointerclick = {
            setup: function() {
                e(this).on(c)
            },
            teardown: function() {
                e(this).off(c)
            }
        }
    }
}(window, jQuery), BEM.DOM.decl("popup2", {
    onSetMod: {
        js: {
            inited: function() {
                this._parentPopup = void 0, this._zIndex = null, this._zIndexGroupLevel = null, this._scope = BEM.DOM.scope, this._isAttachedToScope = !1
            }
        },
        visible: {
            yes: function() {
                this.trigger("beforeOpen"), this._isAttachedToScope || (this._scope.append(this.domElem), this._isAttachedToScope = !0), this._captureZIndex()._bindToParentPopup().bindTo("pointerdown pointerclick", this._setPreventHideByClick)
            },
            "": function() {
                this.trigger("beforeClose")._releaseZIndex()._unbindFromParentPopup().unbindFrom("pointerdown pointerclick")
            }
        }
    },
    destruct: function() {
        this.delMod("visible"), this.__base.apply(this, arguments)
    },
    setScope: function(t) {
        return this._scope = t, this._isAttachedToScope = !1, this
    },
    setContent: function(t) {
        return BEM.DOM.update(this.domElem, t), this
    },
    _calcZIndexGroupLevel: function() {
        var t = this.params.zIndexGroupLevel,
            e = this._getParentPopup();
        return e && (t += e._zIndexGroupLevel), t
    },
    _setPreventHideByClick: function() {
        var t = this;
        do t._preventHideByClick = !0, t = t._getParentPopup(); while (t)
    },
    _bindToParentPopup: function() {
        var t = this._getParentPopup();
        return t && (t.on("beforeClose", this._onParentPopupClose, this), t.addChild && t.addChild(this)), this
    },
    _unbindFromParentPopup: function() {
        return this._parentPopup && this._parentPopup.un("beforeClose", this._onParentPopupClose, this), this._parentPopup = void 0, this
    },
    _onParentPopupClose: function() {
        this.delMod("visible")
    },
    _getParentPopup: function() {
        return this._parentPopup
    },
    _captureZIndex: function() {
        null === this._zIndexGroupLevel && (this._zIndexGroupLevel = this._calcZIndexGroupLevel());
        var t = this.__self._visiblePopupsZIndexes,
            e = this._zIndexGroupLevel,
            n = t[e],
            i = this._zIndex;
        return n || (n = t[e] = [(e + 1) * this.__self.ZINDEX_FACTOR]), this._zIndex = n[n.length - 1] + 1, n.push(this._zIndex), this._zIndex !== i && this.domElem.css("z-index", this._zIndex), this
    },
    _releaseZIndex: function() {
        var t = this.__self._visiblePopupsZIndexes[this._zIndexGroupLevel];
        return t && t.splice(t.indexOf(this._zIndex), 1), this
    },
    _recaptureZIndex: function() {
        return this._releaseZIndex(), this._zIndexGroupLevel = null, this._captureZIndex()
    },
    getDefaultParams: function() {
        return {
            zIndexGroupLevel: 0
        }
    }
}, {
    live: !0,
    _visiblePopupsZIndexes: (BEM.blocks.popup || {})._visiblePopupsZIndexes || {},
    ZINDEX_FACTOR: 1e3
}), BEM.decl("keycodes", {}, {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    is: function(t, e) {
        return (Array.isArray(e) ? e : Array.prototype.slice.call(arguments, 1)).some(function(e) {
            return this[e] === t
        }, this)
    }
}), BEM.DOM.decl({
    block: "popup2",
    modName: "target"
}, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), this._lastPopupDrawingCss = {
                    left: void 0,
                    top: void 0,
                    zIndex: void 0,
                    display: void 0
                }, this._lastTailDrawingCss = {
                    left: void 0,
                    top: void 0
                }, this._initialVisible = this.hasMod("visible")
            }
        },
        visible: {
            yes: function() {
                this.__base.apply(this, arguments), this.bindToWin("scroll resize", this._onWinScollAndResize).redraw(!0)
            },
            "": function() {
                this.__base.apply(this, arguments), this.unbindFromWin("scroll resize")
            }
        }
    },
    setContent: function() {
        return this.__base.apply(this, arguments).redraw()
    },
    _draw: function() {
        function t(t, e) {
            var n = !1;
            return Object.keys(e).forEach(function(i) {
                var o = e[i];
                t[i] !== o && (t[i] = o, n = !0)
            }), n
        }
        var e = this._calcBestDrawingParams();
        return this.setMod("direction", e.direction), t(this._lastPopupDrawingCss, this._calcDrawingCss(e)) && this.domElem.css(this._lastPopupDrawingCss), t(this._lastTailDrawingCss, this._calcTailDrawingCss(e)) && this.elem("tail").css(this._lastTailDrawingCss), this
    },
    redraw: function(t) {
        return this.hasMod("visible", "yes") || t ? (this.setMod("outside", "yes")._draw().delMod("outside"), this) : this
    },
    _calcDrawingCss: function(t) {
        var e, n = this._scope;
        return n.is(BEM.DOM.scope) || (e = n.offset(), t.top -= e.top, t.left -= e.left), {
            left: t.left,
            top: t.top
        }
    },
    _calcTailDrawingCss: function(t) {
        return t.tail
    },
    calcPossibleDrawingParams: function() {
        var t = this._calcTargetDimensions(),
            e = this._calcViewportDimensions(),
            n = this._calcOffsets();
        return this.params.directions.map(function(i) {
            var o = {
                direction: i,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            };
            return this._checkMainDirection(i, "bottom") ? (o.top = t.top + t.height + n.main, o.height = e.bottom - o.top - n.viewport) : this._checkMainDirection(i, "top") ? (o.height = t.top - e.top - n.main - n.viewport, o.top = t.top - o.height - n.main) : (this._checkSecondaryDirection(i, "center") ? (o.height = e.bottom - e.top - 2 * n.viewport, o.top = t.top + (t.height - o.height) / 2) : this._checkSecondaryDirection(i, "bottom") ? (o.height = t.top + t.height - e.top - n.secondary - n.viewport, o.top = t.top + t.height - o.height - n.secondary) : this._checkSecondaryDirection(i, "top") && (o.top = t.top + n.secondary, o.height = e.bottom - o.top - n.viewport), this._checkMainDirection(i, "left") ? (o.width = t.left - e.left - n.main - n.viewport, o.left = t.left - o.width - n.main) : (o.left = t.left + t.width + n.main, o.width = e.right - o.left - n.viewport)), this._checkSecondaryDirection(i, "right") ? (o.width = t.left + t.width - e.left - n.secondary - n.viewport, o.left = t.left + t.width - o.width - n.secondary) : this._checkSecondaryDirection(i, "left") ? (o.left = t.left + n.secondary, o.width = e.right - o.left - n.viewport) : this._checkSecondaryDirection(i, "center") && this._checkMainDirection(i, "top", "bottom") && (o.width = e.right - e.left - 2 * n.viewport, o.left = t.left + t.width / 2 - o.width / 2), o
        }, this)
    },
    _calcBestDrawingParams: function() {
        for (var t, e, n, i, o, s, r = this._calcPopupDimensions(), a = this._calcTargetDimensions(), c = this._calcViewportDimensions(), l = this.params.directions, u = l.length, d = 0; d < u && (t = l[d], e = this._calcPos(t, a, r), n = this._calcViewportFactor(e, c, r), (0 === d || n > s || !s && this.hasMod("direction", t)) && (i = t, s = n, o = e), !(s > this.__self.VIEWPORT_ACCURACY_FACTOR)); d++);
        return {
            direction: i,
            left: o.left,
            top: o.top,
            tail: this._calcTailPos(i, a, r, o)
        }
    },
    _calcPopupDimensions: function() {
        var t = this.domElem.outerWidth(),
            e = this.domElem.outerHeight();
        return {
            width: t,
            height: e,
            innerWidth: this.domElem.innerWidth(),
            innerHeight: this.domElem.innerHeight(),
            area: t * e
        }
    },
    _calcTailDimension: function() {
        var t = this.elem("tail"),
            e = this.params.tailSize || t.outerWidth();
        return t.length > 0 && "none" !== t.css("display") ? e : 0
    },
    _calcTargetDimensions: function() {},
    _calcViewportDimensions: function() {
        var t = BEM.DOM.win,
            e = t.scrollTop(),
            n = t.scrollLeft(),
            i = t.width(),
            o = t.height();
        return {
            top: e,
            left: n,
            bottom: e + o,
            right: n + i
        }
    },
    _calcPos: function(t, e, n) {
        var i = {},
            o = this._calcOffsets();
        return this._checkMainDirection(t, "bottom") ? i.top = e.top + e.height + o.main : this._checkMainDirection(t, "top") ? i.top = e.top - n.height - o.main : this._checkMainDirection(t, "left") ? i.left = e.left - n.width - o.main : this._checkMainDirection(t, "right") && (i.left = e.left + e.width + o.main), this._checkSecondaryDirection(t, "right") ? i.left = e.left + e.width - n.width - o.secondary : this._checkSecondaryDirection(t, "left") ? i.left = e.left + o.secondary : this._checkSecondaryDirection(t, "bottom") ? i.top = e.top + e.height - n.height - o.secondary : this._checkSecondaryDirection(t, "top") ? i.top = e.top + o.secondary : this._checkSecondaryDirection(t, "center") && (this._checkMainDirection(t, "top", "bottom") ? i.left = e.left + e.width / 2 - n.width / 2 : this._checkMainDirection(t, "left", "right") && (i.top = e.top + e.height / 2 - n.height / 2)), i
    },
    _calcTailPos: function(t, e, n, i) {
        var o = {},
            s = this._calcTailDimension() / 2,
            r = this.params.tailOffset,
            a = this.params.tailSize;
        return this._checkMainDirection(t, "bottom") ? o.top = -s : this._checkMainDirection(t, "top") ? o.top = Math.floor(n.innerHeight - s) : this._checkMainDirection(t, "left") ? o.left = Math.floor(n.innerWidth - s) : this._checkMainDirection(t, "right") && (o.left = -s), this._checkSecondaryDirection(t, "right") ? o.left = n.innerWidth - Math.ceil(Math.min(n.innerWidth, e.width) / 2) - s - r : this._checkSecondaryDirection(t, "left") ? o.left = Math.ceil(Math.min(n.innerWidth, e.width) / 2) - s + r : this._checkSecondaryDirection(t, "bottom") ? o.top = n.innerHeight - Math.ceil(Math.min(n.innerHeight, e.height) / 2) - s - r : this._checkSecondaryDirection(t, "top") ? o.top = Math.ceil(Math.min(n.innerHeight, e.height) / 2) - s + r : this._checkSecondaryDirection(t, "center") && (this._checkMainDirection(t, "top", "bottom") ? o.left = Math.ceil(n.innerWidth / 2) - s + r : o.top = Math.ceil(n.innerHeight / 2) - s + r), {
            top: o.top,
            left: o.left,
            width: a,
            height: a
        }
    },
    _calcViewportFactor: function(t, e, n) {
        var i = this.params.viewportOffset,
            o = Math.max(t.left, e.left + i),
            s = Math.min(t.left + n.width, e.right - i),
            r = Math.max(t.top, e.top + i),
            a = Math.min(t.top + n.height, e.bottom - i);
        return o < s && r < a ? (s - o) * (a - r) / n.area : 0
    },
    _calcOffsets: function() {
        var t = this.params,
            e = this._calcTailDimension();
        return {
            main: t.mainOffset >= 0 && e > 0 ? Math.max(t.mainOffset, Math.round(e * Math.SQRT1_2)) : t.mainOffset,
            secondary: t.secondaryOffset,
            viewport: t.viewportOffset
        }
    },
    _checkMainDirection: function(t, e, n) {
        return 0 === t.indexOf(e) || n && 0 === t.indexOf(n)
    },
    _checkSecondaryDirection: function(t, e) {
        return t.indexOf("-" + e) > 0
    },
    _checkDirection: function(t, e) {
        return t.indexOf(e) >= 0
    },
    _onWinScollAndResize: function(t) {
        this.hasMod("visible", "yes") && this._draw()
    },
    getDefaultParams: function() {
        return $.extend(this.__base.apply(this, arguments), {
            mainOffset: 0,
            secondaryOffset: 0,
            viewportOffset: 0,
            tailOffset: 0,
            directions: this.__self.AVAILABLE_DIRECTIONS
        })
    },
    _setVisible: function() {
        this._initialVisible && (this._initialVisible = !1, this.delMod("visible").setMod("visible", "yes"))
    }
}, {
    VIEWPORT_ACCURACY_FACTOR: .99,
    AVAILABLE_DIRECTIONS: ["bottom-left", "bottom-center", "bottom-right", "top-left", "top-center", "top-right", "right-top", "right-center", "right-bottom", "left-top", "left-center", "left-bottom"]
}), BEM.DOM.decl({
    block: "popup2",
    modName: "theme",
    modVal: "normal"
}, {
    getDefaultParams: function() {
        return $.extend(this.__base(), {
            mainOffset: 5,
            viewportOffset: 5
        })
    }
}), BEM.DOM.decl({
    block: "popup2",
    modName: "autoclosable",
    modVal: "yes"
}, {
    onSetMod: {
        visible: {
            yes: function() {
                this.__self._visiblePopupsStack.unshift(this), this.afterCurrentEvent(function() {
                    this.domElem && this.hasMod("visible") && this.bindToDoc("pointerclick", this._onDocClick)
                }), this.__base.apply(this, arguments)
            },
            "": function() {
                var t = this.__self._visiblePopupsStack;
                t.splice(t.indexOf(this), 1), this.unbindFromDoc("pointerclick").__base.apply(this, arguments)
            }
        }
    },
    _onDocClick: function(t) {
        this.hasMod("target", "anchor") && (this._anchor[0] === t.target || this._anchor.find(t.target).length > 0) || (this._preventHideByClick ? this._preventHideByClick = null : this.delMod("visible"))
    }
}, {
    live: function() {
        return BEM.DOM.doc.on("keydown", this._onDocKeyPress.bind(this)), this.__base()
    },
    _visiblePopupsStack: (BEM.blocks.popup || {})._visiblePopupsStack || [],
    _onDocKeyPress: function(t) {
        BEM.blocks.keycodes.is(t.keyCode, "ESC") && this._visiblePopupsStack.length && this._visiblePopupsStack[0].__self.getName() === this.getName() && this._visiblePopupsStack[0].delMod("visible")
    }
}),
function(t) {
    function e(t, e) {
        return t.addClass("i-bem " + e).bem(e)
    }
    BEM.DOM.decl({
        block: "popup2",
        modName: "target",
        modVal: "anchor"
    }, {
        onSetMod: {
            js: {
                inited: function() {
                    this.__base.apply(this, arguments), this._anchor = null, this._destructor = null, this._fixedAnchor = void 0
                }
            },
            visible: {
                yes: function() {
                    this.bindToDoc("documentchange", this._onWinScollAndResize), this.__base.apply(this, arguments)
                },
                "": function() {
                    this.__base.apply(this, arguments), this.unbindFromDoc("documentchange")
                }
            }
        },
        destruct: function() {
            this._unbindFromDestructor(), this.__base.apply(this, arguments)
        },
        setAnchor: function(t) {
            return this._unbindFromDestructor()._unbindFromParentPopup(), this._anchor = t instanceof BEM.DOM ? t.domElem : t, this._destructor = e(this._anchor, "_" + this.__self.getName() + "-destructor"), this._fixedAnchor = void 0, this._bindToDestructor(), this._setVisible(), this.hasMod("visible") ? this._recaptureZIndex()._bindToParentPopup().redraw() : this._zIndexGroupLevel = null, this
        },
        _calcTargetDimensions: function() {
            var t = this._anchor,
                e = this._getOffsetOf(t);
            return {
                left: e.left,
                top: e.top,
                width: t.outerWidth(),
                height: t.outerHeight()
            }
        },
        _getOffsetOf: function(t) {
            var e = t.offset();
            return "pageYOffset" in window && (e.top -= window.pageYOffset - (document.documentElement.scrollTop || document.body.scrollTop), e.left -= window.pageXOffset - (document.documentElement.scrollLeft || document.body.scrollLeft)), e
        },
        _calcDrawingCss: function(e) {
            var n = this.__base.apply(this, arguments);
            if ("undefined" == typeof this._fixedAnchor && (this._fixedAnchor = this._getFirstFixedParent(this._anchor)), this._fixedAnchor) {
                var i = 0,
                    o = 0,
                    s = this._getFirstFixedParent(this._scope);
                if (s) {
                    var r = s.offset();
                    i = r.left, o = r.top
                }
                n.left -= t(window).scrollLeft() - i, n.top -= t(window).scrollTop() - o
            }
            return t.extend(n, {
                position: this._fixedAnchor ? "fixed" : ""
            })
        },
        _getFirstFixedParent: function(e) {
            for (e = e[0]; e;) {
                if (1 === e.nodeType && "fixed" === t(e).css("position")) return t(e);
                e = e.parentNode
            }
            return null
        },
        _calcZIndexGroupLevel: function() {
            var t = this.__base.apply(this, arguments);
            return this._destructor.findBlocksOutside("z-index-group").reduce(function(t, e) {
                return t + Number(e.getMod("level"))
            }, t)
        },
        _bindToDestructor: function() {
            return this._destructor.on("destruct", this._onPopupAnchorDestruct, this), this
        },
        _unbindFromDestructor: function() {
            return this._destructor && this._destructor.un("destruct", this._onPopupAnchorDestruct, this),
                this
        },
        _onPopupAnchorDestruct: function() {
            this.domElem && BEM.DOM.destruct(this.domElem)
        },
        _getParentPopup: function() {
            if (void 0 === this._parentPopup) {
                var t = this._anchor.closest(".popup, .popup2");
                this._parentPopup = this.findBlockOn(t, this.__self.getName()) || this.findBlockOn(t, "popup")
            }
            return this._parentPopup
        }
    });
    var n = BEM.DOM;
    n.decl("_popup2-destructor", {
        destruct: function() {
            this.trigger("destruct"), this.__base.apply(this, arguments)
        }
    })
}(jQuery), BEM.DOM.decl({
    block: "popup2",
    modName: "hiding",
    modVal: "yes"
}, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), this._anchorParents = null, this._isAnchorVisible = void 0, this._updateIsAnchorVisible = $.throttle(this._updateIsAnchorVisible, this.__self.UPDATE_TARGET_VISIBILITY_THROTTLING_INTERVAL, this)
            }
        },
        visible: {
            yes: function() {
                this._anchorParents = this._getAnchorParents(), this._bindToAnchorParents(), this.__base.apply(this, arguments)
            },
            "": function() {
                this.__base.apply(this, arguments), this._updateIsAnchorVisible.stop(), this._unbindFromAnchorParents(), this._anchorParents = null, this._isAnchorVisible = void 0
            }
        }
    },
    _getAnchorParents: function() {
        for (var t, e = this; e && e._anchor;) t = e, e = e._getParentPopup();
        return $(t._anchor).parents()
    },
    setAnchor: function(t) {
        return this.__base.apply(this, arguments), this._unbindFromAnchorParents(), this._isAnchorVisible = void 0, this.hasMod("visible") ? (this._anchorParents = this._getAnchorParents(), this._bindToAnchorParents()) : this._anchorParents = null, this
    },
    _unbindFromDestructor: function() {
        return this._updateIsAnchorVisible.stop && this._updateIsAnchorVisible.stop(), this.__base.apply(this, arguments)
    },
    _calcDrawingCss: function(t) {
        var e = this.__base.apply(this, arguments);
        return "undefined" == typeof this._isAnchorVisible && (this._isAnchorVisible = this._calcIsAnchorVisible()), $.extend(e, {
            display: this._isAnchorVisible ? "" : "none"
        })
    },
    _calcIsAnchorVisible: function() {
        var t = this._anchor,
            e = this._getOffsetOf(t),
            n = e.left,
            i = e.top,
            o = n + t.outerWidth(),
            s = i + t.outerHeight(),
            r = this.getMod("direction"),
            a = Math.floor(this._checkDirection(r, "top") ? i : s),
            c = Math.floor(this._checkDirection(r, "left") ? n : o),
            l = !0;
        return this._anchorParents.each(function(t, e) {
            if ("BODY" === e.tagName) return !1;
            e = $(e);
            var n = /scroll|hidden|auto/,
                i = n.test(e.css("overflow-y")),
                o = n.test(e.css("overflow-x"));
            if (i || o) {
                var s = this._getOffsetOf(e),
                    r = Math.floor(s.top);
                if (a < r || r + e.outerHeight() < a) return l = !1;
                var u = Math.floor(s.left);
                return l = c >= u && u + e.outerWidth() >= c
            }
        }.bind(this)), l
    },
    _bindToAnchorParents: function() {
        return this.bindTo(this._anchorParents, "scroll", this._onAnchorParentsScroll)
    },
    _unbindFromAnchorParents: function() {
        return this._updateIsAnchorVisible.stop(), this._anchorParents && this.unbindFrom(this._anchorParents, "scroll"), this
    },
    _onAnchorParentsScroll: function() {
        this.redraw()._updateIsAnchorVisible()
    },
    _onWinScollAndResize: function() {
        this.hasMod("visible") && (this.__base.apply(this, arguments), this._updateIsAnchorVisible())
    },
    _updateIsAnchorVisible: function() {
        if (this.domElem) {
            var t = this._calcIsAnchorVisible();
            t !== this._isAnchorVisible && (this._isAnchorVisible = t, this.redraw())
        }
    }
}, {
    UPDATE_TARGET_VISIBILITY_THROTTLING_INTERVAL: 100
}), BEM.DOM.decl("lang-switcher", {
    setRetpath: function(t) {
        var e = encodeURIComponent(t),
            n = this.findBlockOn("dropdown2").getPopup();
        return this.findElem(n.domElem, "lang").map(function() {
            var t = $(this),
                n = t.attr("href");
            if (n) {
                var i = n.replace(/(&retpath=)[^\&]*/, "$1" + e);
                i !== n && t.attr("href", i)
            }
        }), this
    }
}, {
    live: !0
}), BEM.DOM.decl({
    block: "dropdown2",
    modName: "switcher",
    modVal: "link"
}, null, {
    live: function() {
        return this.liveInitOnBlockInsideEvent("click", "link", function(t) {
            this._onSwitcherClick(t)
        }), this.__base()
    }
}),
function(t) {
    t.event.special.pointerpress || t.each({
        pointerpress: "pointerdown",
        pointerrelease: "pointerup pointercancel"
    }, function(e, n) {
        function i(n) {
            var i, o = n.type;
            return "mouse" === n.pointerType && 1 !== n.which || (n.type = e, i = t.event.dispatch.apply(this, arguments), n.type = o), i
        }
        t.event.special[e] = {
            setup: function() {
                t(this).on(n, i)
            },
            teardown: function() {
                t(this).off(n, i)
            }
        }
    })
}(jQuery), BEM.DOM.decl("control", {
    onSetMod: {
        focused: {
            yes: function() {
                return !this.hasMod("disabled") && void(this._focused || (this._focus(), this.trigger("focus")))
            },
            "": function() {
                this._focused && (this._blur(), this.trigger("blur"))
            }
        },
        disabled: {
            "*": function(t, e) {
                var n = this._getControl();
                n.prop("disabled", Boolean(e)).attr("aria-disabled", Boolean(e)), n.attr("tabindex", e ? null : this.params._tabindex)
            },
            yes: function() {
                this.delMod("focused")
            }
        }
    },
    _focus: function() {
        this._getControl().focus()
    },
    _blur: function() {
        this._getControl().blur()
    },
    _getControl: function() {
        var t = this.elem("control");
        return t.length > 0 ? t : this.domElem
    },
    _onFocusin: function() {
        this._focused = !0, this.trigger("focus").setMod("focused", "yes").bindTo("focusout", this._onFocusout)
    },
    _onFocusout: function() {
        this._focused = !1, this.trigger("blur").delMod("focused").unbindFrom("focusout")
    },
    getDefaultParams: function() {
        return {
            _tabindex: this._getControl().attr("tabindex")
        }
    }
}, {
    live: function() {
        this.liveBindTo("focusin", function(t) {
            this._onFocusin(t)
        }), parseInt(BEM.blocks["i-ua"].ios, 10) >= 8 && this.liveBindTo("control", "focusin", function(t) {
            t.preventDefault()
        })
    }
}), BEM.DOM.decl({
    block: "link",
    baseBlock: "control"
}, {
    onSetMod: {
        hovered: {
            yes: function() {
                return !this.hasMod("disabled")
            }
        },
        pressed: {
            yes: function() {
                return !this.hasMod("disabled")
            }
        },
        disabled: {
            "": function() {
                this.__base.apply(this, arguments), this.domElem.attr("tabindex", this.params._tabindex)
            },
            yes: function() {
                this.__base.apply(this, arguments), this.domElem.attr("tabindex", -1), this.delMod("pressed")
            }
        }
    },
    _onPointerpress: function(t) {
        this.setMod("pressed", "yes").bindToDoc("pointerrelease", this._onPointerrelease)
    },
    _onPointerrelease: function(t) {
        this.delMod("pressed").unbindFromDoc("pointerrelease")
    }
}, {
    live: function() {
        return this.liveBindTo("pointerpress", function(t) {
            this.hasMod("disabled") || this._onPointerpress(t)
        }), this.__base()
    }
}), BEM.DOM.decl("link", {
    onSetMod: {
        hovered: {
            yes: function() {
                return !this.hasMod("disabled")
            }
        },
        disabled: {
            yes: function() {
                this.__base.apply(this, arguments), this.delMod("hovered")
            }
        }
    },
    _onPointerenter: function(t) {
        this.setMod("hovered", "yes")
    },
    _onPointerleave: function(t) {
        this.delMod("hovered")
    }
}, {
    live: function() {
        return this.liveBindTo("pointerover pointerout", function(t) {
            this.hasMod("disabled") || this.domElem[0].contains(t.relatedTarget) || ("pointerover" === t.type ? this._onPointerenter(t) : this._onPointerleave(t))
        }), this.__base.apply(this, arguments)
    }
}), BEM.DOM.decl({
    block: "link",
    modName: "pseudo",
    modVal: "yes"
}, {
    _onClick: function(t) {
        t.preventDefault(), this.hasMod("disabled") || this.trigger("click", this._buildClickEventData(t))
    },
    _onKeydown: function(t) {
        BEM.blocks.keycodes.is(t.keyCode, "ENTER", "SPACE") && (BEM.blocks.keycodes.is(t.keyCode, "SPACE") && t.preventDefault(), this.setMod("pressed", "yes"))
    },
    _onKeyup: function(t) {
        BEM.blocks.keycodes.is(t.keyCode, "ENTER", "SPACE") && (BEM.blocks.keycodes.is(t.keyCode, "SPACE") && this.trigger("click"), this.delMod("pressed"))
    },
    _buildClickEventData: function(t) {
        return {
            domEvent: t,
            isModKey: t.ctrlKey || t.altKey || t.metaKey || t.shiftKey
        }
    }
}, {
    live: function() {
        return this.liveBindTo({
            modName: "pseudo",
            modVal: "yes"
        }, "pointerclick", function(t) {
            this._onClick(t)
        }).liveBindTo({
            modName: "pseudo",
            modVal: "yes"
        }, "keydown", function(t) {
            this.hasMod("disabled") || this._onKeydown(t)
        }).liveBindTo({
            modName: "pseudo",
            modVal: "yes"
        }, "keyup", function(t) {
            this.hasMod("disabled") || this._onKeyup(t)
        }), this.__base()
    }
}), BEM.DOM.decl({
    block: "menu",
    baseBlock: "control"
}, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), this.elem("item").attr("id", function(t, e) {
                    return e || $.identify()
                }), this._val = this.getVal()
            }
        },
        disabled: function(t, e) {
            this.__base.apply(this, arguments), this.setMod(this.elem("item"), t, e)
        }
    },
    onElemSetMod: {
        item: {
            hovered: {
                yes: function(t) {
                    return !this.hasMod(t, "disabled") && (this.delMod(this.elem("item", "hovered", "yes"), "hovered"), this.domElem.attr("aria-activedescendant", t.attr("id")), void this.trigger("item-hover", {
                        item: t
                    }))
                },
                "": function() {
                    this.domElem.removeAttr("aria-activedescendant"), this.trigger("item-hover", {})
                }
            },
            checked: function(t, e, n) {
                this.domElem.attr("aria-selected", Boolean(n))
            },
            disabled: {
                yes: function() {
                    this.delMod("hovered"), this.domElem.attr("aria-disabled", !0)
                },
                "": function() {
                    this.domElem.attr("aria-disabled", !1)
                }
            }
        }
    },
    _onChange: function() {
        var t = this._val,
            e = this.getVal();
        return t !== e && (this._val = e, this.trigger("change", {
            prevVal: t,
            currVal: e
        })), this
    },
    getItems: function(t, e) {
        return this.elem("item", t, e).get().map(function(t) {
            return $(t)
        })
    },
    setContent: function(t) {
        return BEM.DOM.update(this.domElem, t), this.reset(), this
    },
    getVal: function() {},
    reset: function() {
        this.dropElemCache()
    },
    _onItemEnter: function(t, e) {
        this.setMod(t, "hovered", "yes")
    },
    _onItemLeave: function(t, e) {
        this.delMod(t, "hovered")
    },
    _onItemFocusin: function(t, e) {
        this.setMod(t, "hovered", "yes")
    },
    _onFocusout: function(t) {
        this.__base.apply(this, arguments), this.delMod(this.elem("item", "hovered", "yes"), "hovered")
    },
    _onItemClick: function(t, e, n) {
        this.trigger("click", {
            item: t,
            source: n.source
        })
    }
}, {
    live: function() {
        return this.liveBindTo("item", "pointerover pointerout", function(t) {
            var e = t.data.domElem;
            this.hasMod(e, "disabled", "yes") || e[0].contains(t.relatedTarget) || ("pointerover" === t.type ? this._onItemEnter(e, t) : this._onItemLeave(e, t))
        }).liveBindTo("item", "pointerclick", function(t) {
            var e = t.data.domElem;
            this.hasMod(e, "disabled") || this._onItemClick(e, t, {
                source: "pointer"
            })
        }).liveBindTo("item", "focusin", function(t) {
            var e = t.data.domElem;
            this.hasMod(e, "disabled") || this._onItemFocusin(e, t)
        }).liveBindTo("focusout", function(t) {
            this._onFocusout(t)
        }), this.__base()
    }
}), BEM.DOM.decl("menu", {
    onSetMod: {
        focused: {
            yes: function() {
                return this.__base.apply(this, arguments), !this.hasMod("type", "navigation") && (this.elem("item", "hovered", "yes").length || (this.setMod(this.elem("item").eq(0), "hovered", "yes"), this._scrollToItem(this.elem("item").eq(0))), void this.bindToDoc("keydown", this._onKeydown).bindToDoc("keyup", this._onKeyup).bindToDoc("keypress", this._onKeypress))
            },
            "": function() {
                this.__base.apply(this, arguments), this.unbindFromDoc("keydown keyup keypress").delMod(this.elem("item", "hovered", "yes"), "hovered")
            }
        }
    },
    hoverNext: function(t) {
        for (var e, n, i = t ? this.getItems().reverse() : this.getItems(), o = 0, s = !1; n = i[o]; o++)
            if (!this.hasMod(n, "disabled"))
                if (this.hasMod(n, "hovered")) s = !0;
                else {
                    if (s) {
                        e = n;
                        break
                    }
                    e || (e = n)
                } e && (this.setMod(e, "hovered", "yes"), this._scrollToItem(e))
    },
    hoverText: function(t, e) {
        for (var n, i = this.getItems(), o = i.length, s = this._normalizeText(t), r = e || 0; r < o;) {
            if (n = i[r], !this.hasMod(n, "disabled") && 0 === this._normalizeText(n.text()).indexOf(s)) return this.setMod(n, "hovered", "yes"), void this._scrollToItem(n);
            r++, r === i.length && (r = 0, o = e)
        }
    },
    _normalizeText: function(t) {
        return t.toLowerCase().replace(/ё/, "е")
    },
    reset: function() {
        this.__base.apply(this, arguments), this._dropSearchCache()
    },
    _dropSearchCache: function() {
        this._lastTime = this._lastChar = this._searchTerm = void 0
    },
    _scrollToItem: function(t) {
        var e = this.domElem.offset().top,
            n = t.offset().top,
            i = 0;
        n < e ? i = n - e : (i = n + t.outerHeight() - e - this.domElem.outerHeight(), i < 0 && (i = 0)), this.domElem.scrollTop(this.domElem.scrollTop() + i)
    },
    _onKeydown: function(t, e) {
        var n = BEM.blocks.keycodes,
            i = t.keyCode;
        t.shiftKey || t.ctrlKey || t.altKey || t.metaKey || ((n.is(i, "UP", "DOWN") || !e && i === n.SPACE) && t.preventDefault(), n.is(i, "UP", "DOWN") && (this.hoverNext(n.is(i, "UP")), this._dropSearchCache()))
    },
    _onKeyup: function(t) {
        var e = BEM.blocks.keycodes,
            n = t.keyCode;
        t.shiftKey || t.ctrlKey || t.altKey || t.metaKey || e.is(n, "ENTER", "SPACE") && this._onItemClick(this.elem("item", "hovered", "yes"), t, {
            source: "keyboard"
        })
    },
    _onKeypress: function(t) {
        var e, n, i = Number(new Date),
            o = t.charCode,
            s = String.fromCharCode(o).toLowerCase(),
            r = s === this._lastChar && 1 === this._searchTerm.length,
            a = this.getItems();
        return o <= BEM.blocks.keycodes.SPACE || t.ctrlKey || t.altKey || t.metaKey ? void(this._lastTime = i) : (i - this._lastTime > this.SEARCH_TIMEOUT || r ? this._searchTerm = s : this._searchTerm = (this._searchTerm || "") + s, this._lastChar = s, this._lastTime = i, e = this.elem("item", "hovered", "yes"), n = $($.map(a, function(t) {
            return t.get()
        })).index(e), n = n >= 0 ? n : 0, r && 0 === this._normalizeText(e.text()).indexOf(this._searchTerm) && (n = n >= a.length - 1 ? 0 : n + 1), void this.hoverText(this._searchTerm, n))
    },
    SEARCH_TIMEOUT: 1500
}), BEM.DOM.decl("suggest2", {
    onSetMod: {
        js: {
            inited: function() {
                this.params.form || this.findBlockOutside("suggest2-form"), this._lastSubmitTime = 0, this._lastBlurTime = 0, this._clear()
            }
        }
    },
    _bodyHandler: function(t) {
        if (!this._isDestructing) {
            var e = $(t.target),
                n = this.containsDomElem(e) || this.params.form.containsDomElem(e);
            n || (this._freezeInputFocus = !1)
        }
    },
    getDefaultParams: function() {
        return {
            submitBySelect: !1,
            updateOnEnterByKeyboard: !0,
            onFocus: "request",
            requestOnEmptyInput: !1,
            abortQueries: !1,
            sequentialQueriesTimeout: !1
        }
    },
    destruct: function() {
        this.unbindAllEvents(), this.__base.apply(this, arguments)
    },
    init: function() {
        var t = this;
        t.params.form.on("submit", function(e, n) {
            t._lastSubmitTime = (new Date).getTime(), t._isActualSearchCGIParams ? t._isActualSearchCGIParams = !1 : "suggest2-counter" !== n.data.block && n.data.prevent !== !1 && this.removeHiddenInputs(), t._clear(), t._model.reset(), t._popup.hide()
        }), t._input = t.params["suggest2-input"], t._popup = t.params["suggest2-popup"], t._inputValue = t._input.val(), t._model = t.initModel(), t._view = t.initView(), t._counter = t.initCounter(), t._model.on({
            response: this.setItems,
            reject: function(e, n) {
                2 === n.code && (t._popup.hide(), t._clear())
            }
        }, t), t.bindToDoc("pointerclick", t._bodyHandler), t.bindEvents(), this._input.isFocused() && this._doRequest();
        var e = BEM.blocks["i-ua"] && BEM.blocks["i-ua"].ua.toLowerCase();
        return e && e.indexOf("mozilla/5.0") > -1 && e.indexOf("android ") > -1 && e.indexOf("applewebkit") > -1 && !(e.indexOf("chrome") > -1) && t.setMod("old-flex", !0), t
    },
    initModel: function() {
        return BEM.create("suggest2-model", this.params)
    },
    getModel: function() {
        return this._model
    },
    initView: function(t, e) {
        var n = this.getMod("type");
        return t = $.extend(t, this.params.viewMods || {}), "simple" !== n && "all" !== n || (t.simple = "yes"), "advanced" !== n && "all" !== n || (t.advanced = "yes"), BEM.create({
            block: "suggest2-view",
            mods: t || {}
        }, e || {})
    },
    getView: function() {
        return this._view
    },
    initCounter: function() {
        return this.params.counter ? this.params.counter.initValues().bindEvents() : void 0
    },
    getCounter: function() {
        return this._counter
    },
    setDataConverter: function(t) {
        return this.getModel().getProvider().convert = t, this
    },
    setRequestData: function(t) {
        return this.getModel().getProvider().getRequestData = t, this
    },
    setRequestUrl: function(t) {
        return this.getModel().getProvider().getRequestUrl = t, this
    },
    setOwner: function(t) {
        return this._popup.owner(t), this
    },
    bindEvents: function() {
        var t = this;
        return t._input.bindEvents({
            change: t._onChange,
            focus: t._onFocus,
            blur: t._onBlur
        }, t), t._popup.on({
            preshow: function() {
                t.trigger("preshow")
            },
            show: function() {
                t._onShow()
            },
            hide: function(e, n) {
                t._onHide(n)
            }
        }), t.params.form && t.params.form.on("button-press", t._onSearchButtonMousedown, t), BEM.blocks["suggest2-item"].on(t.domElem, {
            "link-click": function(e, n) {
                t._counter && "_self" === $(n.domEvent.target).attr("target") && n.domEvent.preventDefault()
            }
        }), t
    },
    _onShow: function() {
        this.trigger("show")
    },
    _onHide: function(t) {
        this.trigger("hide", t)
    },
    _onSearchButtonMousedown: function() {
        this._input.realVal(this._input.val()), this._popup.hide()
    },
    unbindAllEvents: function() {
        var t = this;
        return t.unbindFromDoc("pointerclick"), t._input.unbindAllEvents(), t.params.form.un("submit"), t._model.un("response").un("reject"), t._popup.un("preshow").un("show").un("hide"), t.params.form && t.params.form.un("button-press", t._onSearchButtonMousedown, t), t
    },
    setItems: function(t, e) {
        var n = this,
            i = e.data.items || [];
        return n._isFormSubmitDurinQuery() || !i.length ? (n._popup.hide(), n._clear()) : this.params.sequentialQueriesTimeout || n._input.val() === e.val ? (n._text = e.val, n._pos = e.pos, n._meta = e.data.meta || {}, n._popup.show(n._view.html(i, n._meta)).width(n.getPopupWidth()), n._items = n.findBlocksInside("suggest2-item"), n._clearItems().trigger("update", {
            val: n._text,
            pos: n._pos,
            items: n._items
        }), n) : n._clear()
    },
    getItems: function() {
        return this._items || []
    },
    isBlur: function() {
        return this._isBlur && !this._isMouseDown
    },
    getPopupWidth: function() {},
    getInputWidth: function() {
        return 0
    },
    isNeedSubmitFormOnSelectItem: function(t) {
        return this.params.submitBySelect && "link" !== t.getMod("interact")
    },
    _isFormSubmitDurinQuery: function() {
        return !!this._lastSubmitTime && (this._model.filterRequestsByVal(this._input.realVal()), this._model.isTimeInRequestInterval(this._lastSubmitTime))
    },
    _onChange: function(t, e) {
        this._inputValue !== this._input.val() && (this._inputValue = this._input.val(), this._doRequest(e))
    },
    _doRequest: function(t) {
        var e = this.getCounter();
        this._model.request(this._input.realVal(this._input.val()), this._input.getCaretPosition(), t, e && e.getCurrentReqId())
    },
    _onFocus: function() {
        !this._popup.isShown() && this._isBlur && this.params.onFocus && this._isLastBlurTimeLater(50) && (this.getItems().length && this._input.val() === this._text ? (this._clearItems(), this._popup.show()) : this._isMouseDown || "request" !== this.params.onFocus || this._doRequest())
    },
    _onBlur: function() {
        this._isBlur ? (this._clear(), this._popup.hide()) : this._freezeInputFocus ? (this._clear(), this._input.focus()) : this._isMouseDown && this._input.focus(), this._lastBlurTime = (new Date).getTime(), this._isBlur = !0
    },
    _getItemIndex: function(t) {
        return this.getItems().indexOf(t)
    },
    _clear: function() {
        return this._isBlur = !0, this._freezeInputFocus = !1, this._clearItems()
    },
    _clearItems: function() {
        return this._isMouseDown = !1, this._enterItemIndex = -1, this._unselectItems()
    },
    _isLastBlurTimeLater: function(t) {
        return (new Date).getTime() - this._lastBlurTime > t
    },
    _unselectItems: function(t) {
        var e = t ? [].slice.call(arguments) : this.getItems();
        return e.forEach(function(t) {
            t.onLeave()
        }), this
    },
    _onSelectItem: function(t, e) {
        var n = this,
            i = n._getItemIndex(t),
            o = t.onSelect(e),
            s = t.valOnSelect();
        return n._text = n._input.realVal(s), n._isBlur = !0, n._freezeInputFocus = !1, n._setSearchCGIParams(t), n.trigger("select", {
            val: n._text,
            pos: n._pos,
            item: t,
            meta: n._meta,
            itemIndex: i,
            byKeyboard: e,
            callbackOnSelect: o
        }), s !== !1 && (n._items = [], this.isNeedSubmitFormOnSelectItem(t) && n.params.form.submit()), i
    },
    _isActualSearchCGIParams: !1,
    _setSearchCGIParams: function(t) {
        this.params.form.removeHiddenInputs(), t.params.searchCGI && (this._isActualSearchCGIParams = !0, this.params.form.appendHiddenInputs(t.params.searchCGI.map(function(t) {
            return {
                name: t[0],
                value: t[1]
            }
        })))
    },
    _onDownItem: function() {
        this._isBlur = !1, this._isMouseDown = !0
    }
}), BEM.DOM.decl("suggest2", {
    bindEvents: function() {
        var t = this;
        return t._input.bindEvents({
            keydown: t._onKeyDown,
            keyup: t._onKeyUp,
            keypress: t._onKeyPress,
            mousedown: function() {
                t._input.isFocused() && t._onFocus()
            }
        }, t), BEM.blocks["suggest2-item"].on(t.domElem, {
            mouseover: function(e) {
                t._onEnterItem(e.block, !1)
            },
            mouseout: function(e, n) {
                var i = e.block.domElem[0];
                i === n.relatedTarget || $.contains(i, n.relatedTarget) || t._onLeaveItem(e.block, !1)
            },
            mousedown: function() {
                t._onDownItem()
            },
            click: function(e) {
                t._onSelectItem(e.block, !1)
            }
        }), t.__base.apply(t, arguments)
    },
    _onKeyDown: function(t) {
        var e = this.__self.keyboard,
            n = t.which;
        !this._popup.isShown() || n !== e.up && n !== e.down || (t.preventDefault(), this._enterByKeyboard(n))
    },
    _onKeyUp: function(t) {
        var e = this.__self.keyboard;
        if (t.which !== e.left && t.which !== e.right || (this.trigger("change-cursor-pos"), this._model.request(this._input.realVal(this._input.val()), this._input.getCaretPosition())), t.which === e.right && this._enterItemIndex !== -1 && this._enterItemByKeyboard) {
            var n = this._items[this._enterItemIndex];
            n && this.trigger("ahead", {
                item: n,
                val: "link" === n.getMod("interact") ? n.elem("text").text() : n.val()
            })
        }
    },
    _onKeyPress: function(t) {
        if (t.which === this.__self.keyboard.enter && this._enterItemIndex !== -1 && this._enterItemByKeyboard) {
            var e = this._items[this._enterItemIndex];
            e && (t.preventDefault(), this._onSelectItem(e, !0))
        }
    },
    _enterByKeyboard: function(t) {
        var e = t - 39,
            n = this._items.length,
            i = this._enterItemIndex + e;
        return i === -1 || i === n ? (this._enterItemIndex = i, this._unselectItems(this._items[i]), this.trigger("out", {
            val: this._text,
            byKeyboard: !0
        })) : (i < 0 ? i = n - 1 : i >= n && (i = 0), void this._onEnterItem(this._items[i], !0))
    },
    _onEnterItem: function(t, e) {
        this._enterItemIndex = this._getItemIndex(t), this._enterItemByKeyboard = e, this._unselectItems(), t.onEnter(e)
    },
    _onLeaveItem: function(t, e) {
        this._clearItems()._unselectItems(t)
    }
}, {
    keyboard: {
        enter: 13,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    },
    live: function() {
        return this.liveBindTo("mousedown", function() {
            this._onDownItem()
        }), this.__base()
    }
}), BEM.DOM.decl("suggest2", {
    getInputLeft: function() {
        return 0
    },
    getInputWidth: function() {
        return 0
    },
    getContainerWidth: function() {
        return 0
    },
    getMetrics: function() {
        var t = this.getInputLeft(),
            e = this.getInputWidth(),
            n = this.getContainerWidth() - t;
        return {
            marginLeft: t,
            minWidth: e >= n ? n : e,
            maxWidth: n
        }
    },
    adjustView: function() {
        return this.getMetrics()
    },
    _resizeHandler: function() {}
}), BEM.DOM.decl("suggest2", {
    init: function() {
        this.__base.apply(this, arguments);
        var t = this.params;
        this._urlSuffix = t.urlSuffix || "", this.setDataConverter(function(e) {
            if (!e || !e.length) return {
                data: {}
            };
            var n, i = e[1];
            (t.urlSuffix || t.goToSuggestByEnter || t.customRegionsCenter) && (n = {
                weatherSfx: t.urlSuffix,
                goToSuggestByEnter: t.goToSuggestByEnter,
                customRegionsCenter: t.customRegionsCenter
            });
            var o = t.excludeKindsClimate || [],
                s = t.excludeKindsCompare || !1,
                r = t.isCompareTypeAddOnly || !1;
            o && o.length && (i = i.filter(function(t) {
                return !t || !t.kind || o.indexOf(t.kind) === -1
            }), t.excludeResultsLength && (i = i.slice(0, t.excludeResultsLength)));
            var a;
            return i = i.map(function(e) {
                return a = !(!s || "all" === s || s.indexOf(e.kind) !== -1) && {
                    location: e.geoid || {
                        lat: e.lat,
                        lon: e.lon
                    },
                    name: e.name_short
                }, ["weather", e.name, "", "", "", {
                    url: BEM.blocks["geo-suggest-util"].getUrl(e, n),
                    target: "_self",
                    hl: e.hl,
                    geoInfo: {
                        lon: e.lon,
                        lat: e.lat,
                        spnLat: e.spnlat,
                        spnLon: e.spnlon,
                        geoId: e.geoid
                    },
                    compareLocation: a,
                    isCompareTypeAddOnly: r,
                    disableNavigation: t.disableNavigation
                }]
            }), {
                orig: e[0],
                items: i,
                meta: {}
            }
        })
    }
}), BEM.DOM.decl("suggest2", {
    init: function() {
        var t = this;
        t.__base.apply(t, arguments), t._$header = $(".yandex-header__content").length > 0 ? $(".yandex-header__content") : $(".header-meteum__content"), t._$input = t._$header.find(".input__control"), t._search = t._$header.find(".search2").bem("search2"), t._searchInput = t._search.findBlockInside("input"), t._searchInputClear = t._searchInput.elem("clear"), t.params.options && t.params.options.clid && (t._clid = t.params.options.clid), t._isMapPage = "/maps" === t._urlSuffix, t.params.form.on("submit", function() {
            this.appendHiddenInputs([{
                name: "via",
                value: "srp"
            }]), t._clid && this.appendHiddenInputs([{
                name: "clid",
                value: t._clid
            }])
        }), t._searchInput.on("change", t._onSearchQueryChange.bind(t)), t._onSearchQueryChange()
    },
    _onSearchQueryChange: function() {
        var t = this;
        t._searchInput.hasMod(t._searchInputClear, "visibility", "visible") ? t._search.setMod("has-input", "yes") : t._search.delMod("has-input")
    },
    bindEvents: function() {
        var t = this;
        return t._setSizes = t._setSizes.bind(t), BEM.blocks["suggest2-item"].on(t.domElem, {
            click: function(e, n) {
                var i = n.domEvent.target,
                    o = 0 !== $(i).closest(".compare-cities-action").length;
                if (!o)
                    if (t._isMapPage) n.domEvent.preventDefault(), n.domEvent.stopImmediatePropagation(), t._onSelectItem(e.block, !1, i);
                    else {
                        var s = $(n.domEvent.target).closest("a");
                        if (s && s.hasClass("suggest2-item__link")) {
                            var r = s.attr("href");
                            r && (window.location = r)
                        }
                    }
            }
        }), t._popup.params.suggest.on({
            update: t._setSizes
        }, this), t.__self._resizeCallbacks.push(t._setSizes), t.__base.apply(t, arguments)
    },
    _setSizes: function() {
        var t = this,
            e = t.domElem.find(".suggest2__items"),
            n = t.params.form.domElem.width();
        if (e.css("min-width", n + "px"), t.params.customLeftIndent) {
            var i = t._isMapPage ? parseInt(t._$input.offset().left, 10) : parseInt(t._$input.offset().left - t._$header.offset().left, 10);
            e.css("margin-left", i + "px")
        }
    },
    _onSelectItem: function(t, e, n) {
        var i = this;
        if (i.params["suggest2-popup"].hide(), i.params.input.val(""), i.params.input._blur(), e || n && !$(n).bem("compare-cities-action").hasMod("contains")) {
            if (t.hasMod("compare", "full")) return void $(t.findBlockInside("compare-cities-action").domElem).trigger("pointerclick");
            var o;
            i._isMapPage || (o = t.onSelect(e));
            var s = i._getItemIndex(t),
                r = t.valOnSelect();
            return i._text = i._input.realVal(r), i._isBlur = !0, i._freezeInputFocus = !1, i._setSearchCGIParams(t), i.trigger("select", {
                val: i._text,
                pos: i._pos,
                item: t,
                meta: i._meta,
                itemIndex: s,
                byKeyboard: e,
                callbackOnSelect: o
            }), r !== !1 && (i._items = [], this.isNeedSubmitFormOnSelectItem(t) && i.params.form.submit()), s
        }
    }
}), BEM.decl("suggest2-model", {
    onSetMod: {
        js: {
            inited: function() {
                this._requests = []
            }
        }
    },
    destruct: function() {
        this._provider && this._provider.destruct(), this.__base.apply(this, arguments)
    },
    getProvider: function() {
        return this._provider ? this._provider : (this._provider = this.setProvider(this.params), this._provider)
    },
    setProvider: function(t) {
        return this._provider = BEM.create({
            block: "suggest2-provider",
            mods: t.providerMods || {}
        }, t), this._provider
    },
    getCancelRequestConditions: function() {
        return [{
            block: "suggest2",
            show: !1
        }, {
            block: "suggest2",
            event: "select"
        }, {
            block: "suggest2-item",
            event: "select"
        }, {
            block: "suggest2",
            event: "out"
        }, {
            block: "suggest2-item",
            show: !1
        }, {
            block: "suggest2-popup",
            event: "hide"
        }, {
            suggest: !1
        }, {
            source: "sample"
        }]
    },
    request: function(t, e, n, i) {
        var o = this,
            s = {
                val: t,
                caretPosition: e,
                reqId: i,
                data: n
            };
        o._requests.push(s);
        var r = o._isNeedRequest(t, n);
        return r.need ? (s.requestTime = (new Date).getTime(), o.lastSendedRequest = s, o.trigger("request", {
            val: t,
            pos: e,
            request: s
        }), o.getProvider().get(t, e, i, function(t, e, n, i) {
            s.responseTime = (new Date).getTime(), $.extend(s, {
                duration: s.responseTime - s.requestTime,
                error: n.error,
                fromCache: i,
                itemsCount: n.items ? n.items.length : 0
            }), o._onResponse(t, e, n, s);
            var r = o._requests[o._requests.length - 1];
            o.params.sequentialQueriesTimeout && r && r.val !== t && o.request(r.val, r.caretPosition, r.data)
        }), o) : o.trigger("reject", {
            val: t,
            pos: e,
            code: r.code,
            reason: r.reason || {}
        })
    },
    isTimeInRequestInterval: function(t) {
        for (var e = this._requests.length - 1; e >= 0; e--)
            if (t > this._requests[e].requestTime && t < this._requests[e].responseTime) return !0;
        return !1
    },
    filterRequestsByVal: function(t) {
        this._requests = this._requests.filter(function(e) {
            return e.val === t
        })
    },
    _isNeedRequest: function(t, e) {
        if ("" === t && !this.params.requestOnEmptyInput) return {
            need: !1,
            code: 2
        };
        var n;
        if (this.lastSendedRequest && this.lastSendedRequest.val === t) return {
            need: !1,
            code: 4
        };
        if (this.params.sequentialQueriesTimeout)
            for (n = this._requests.length - 1; n >= 0; n--) {
                var i = this._requests[n];
                if (void 0 === i.responseTime && (new Date).getTime() - i.requestTime < this.params.sequentialQueriesTimeout) return {
                    need: !1,
                    code: 3,
                    reason: {
                        request: i
                    }
                }
            }
        if (!e) return {
            need: !0
        };
        var o, s = this.getCancelRequestConditions();
        t: for (n = 0; n < s.length; n++) {
            o = s[n];
            for (var r in o)
                if (o.hasOwnProperty(r) && o[r] !== e[r]) continue t;
            return {
                need: !1,
                code: 1,
                reason: {
                    condition: o
                }
            }
        }
        return {
            need: !0
        }
    },
    _onResponse: function(t, e, n, i) {
        var o = {
            val: t,
            pos: e,
            data: n || [],
            request: i
        };
        BEM.channel("suggest2").trigger("response", o), this.trigger("response", o)
    },
    reset: function() {
        this._requests = [], this.lastSendedRequest = null
    }
}), BEM.DOM.decl("suggest2-detect", {
    onSetMod: {
        js: {
            inited: function() {
                this.bindToDoc("keydown", function(t) {
                    this.__self._pressedKeyCode = t.which
                }, this).bindToDoc("keyup", function() {
                    this.__self._pressedKeyCode = null
                }, this), this.__self.isSupportInlineSVG() || this.setMod("inlinesvg", "no")
            }
        }
    }
}, {
    _pressedKeyCode: null,
    isPressedEscape: function() {
        return 27 === this._pressedKeyCode
    },
    _isSupportInlineSVG: null,
    isSupportInlineSVG: function() {
        if (null !== this._isSupportInlineSVG) return this._isSupportInlineSVG;
        var t = document.createElement("div");
        return t.innerHTML = "<svg/>", this._isSupportInlineSVG = "http://www.w3.org/2000/svg" === (t.firstChild && t.firstChild.namespaceURI), this._isSupportInlineSVG
    }
}),
function(t) {
    if (!t.support.cors && t.ajaxTransport && window.XDomainRequest) {
        var e = /^(https?:)?\/\//i,
            n = /^get|post$/i,
            i = new RegExp("^(//|" + location.protocol + ")", "i");
        t.ajaxTransport("* text html json", function(o, s, r) {
            if (o.crossDomain && o.async && n.test(o.type) && e.test(o.url) && i.test(o.url)) {
                var a = null;
                return {
                    send: function(e, n) {
                        var i = "",
                            r = (s.dataType || "").toLowerCase();
                        a = new XDomainRequest, /^\d+$/.test(s.timeout) && (a.timeout = s.timeout), a.ontimeout = function() {
                            n(500, "timeout")
                        }, a.onload = function() {
                            var e = "Content-Length: " + a.responseText.length + "\r\nContent-Type: " + a.contentType,
                                i = {
                                    code: 200,
                                    message: "success"
                                },
                                o = {
                                    text: a.responseText
                                };
                            try {
                                if ("html" === r || /text\/html/i.test(a.contentType)) o.html = a.responseText;
                                else if ("json" === r || "text" !== r && /\/json/i.test(a.contentType)) try {
                                    o.json = t.parseJSON(a.responseText)
                                } catch (t) {
                                    i.code = 500, i.message = "parseerror"
                                }
                            } catch (t) {
                                throw t
                            } finally {
                                n(i.code, i.message, o, e)
                            }
                        }, a.onprogress = function() {}, a.onerror = function() {
                            n(500, "error", {
                                text: a.responseText
                            })
                        }, s.data && (i = "string" === t.type(s.data) ? s.data : t.param(s.data)), a.open(o.type, o.url), a.send(i)
                    },
                    abort: function() {
                        a && a.abort()
                    }
                }
            }
        })
    }
}(jQuery), BEM.decl("suggest2-provider", {
    getDefaultParams: function() {
        return {
            cache: !1,
            type: "GET",
            dataType: "jsonp",
            timeout: 2e3
        }
    },
    _cachedResponses: Object.create ? Object.create(null) : {},
    _cachingTime: 6e4,
    _lastQuery: null,
    get: function(t, e, n, i) {
        "function" == typeof n && (i = n, n = void 0);
        var o = this,
            s = o.params.abortQueries,
            r = "jsonp" === this.params.dataType,
            a = o._extendParamsData(o.getRequestData(t, e, n));
        i = i.bind(o, t, e), s && null !== o._lastQuery && o._lastQuery.abort(), o._lastQuery = $.ajax(a).done(function(t) {
            i(o.convert(t), o._validateCache(this.url))
        }).fail(function(t, e) {
            !s && !r && i({
                error: e || "error"
            })
        })
    },
    convert: function(t) {
        return {
            orig: t[0],
            items: t[1],
            meta: t[2]
        }
    },
    getRequestData: function(t, e, n) {
        return $.extend({
            part: t,
            pos: e
        }, n && {
            suggest_reqid: n
        }, BEM.blocks["suggest2-detect"].isSupportInlineSVG() && {
            svg: 1
        })
    },
    getRequestUrl: function() {
        return this.params.url
    },
    _extendParamsData: function(t) {
        return this.params.url = this.getRequestUrl(), this.params.data = $.extend(this.params.data || {}, t), this.params.traditional = !0, this.params
    },
    _validateCache: function(t) {
        var e = Boolean(this._cachedResponses[t]) && this._cachedResponses[t] > Date.now();
        return !e && this._addToCache(t), e
    },
    _addToCache: function(t) {
        this._cachedResponses[t] = Date.now() + this._cachingTime, setTimeout(function() {
            this._cachedResponses[t] = void 0
        }.bind(this), this._cachingTime)
    }
}), BEM.decl("suggest2-provider", {
    getDefaultParams: function() {
        return $.extend(this.__base(), {
            timeout: 4e3
        })
    }
}), BEM.DOM.decl("suggest2-item", {
    val: function() {
        if (void 0 !== this.params.val) return this.params.val;
        var t = this.elem("text");
        return (t.length ? t : this.domElem).text()
    },
    valOnSelect: function() {
        return this.val()
    },
    valOnEnter: function() {
        return this.val()
    },
    valOnLeave: function() {
        return this.val()
    },
    onEnter: function(t) {
        return this.setMod("selected", "yes").triggerEvent("enter", {
            val: this.valOnEnter(),
            byKeyboard: t
        })
    },
    onLeave: function(t) {
        return this.domElem ? this.delMod("selected").triggerEvent("leave", {
            val: this.valOnLeave(),
            byKeyboard: t
        }) : this
    },
    onSelect: function(t) {
        this.triggerEvent("select", {
            val: this.valOnSelect(),
            byKeyboard: t
        })
    },
    _onPointerpress: function(t) {
        this.setMod("pressed", "yes").bindToDoc("pointerrelease", this._onPointerrelease)
    },
    _onPointerrelease: function(t) {
        this.delMod("pressed").unbindFromDoc("pointerrelease")
    },
    triggerEvent: function(t, e) {
        return this.trigger(t, {
            val: e.val,
            id: this.domElem.attr("id"),
            show: !1,
            byKeyboard: e.byKeyboard
        })
    }
}, {
    live: function() {
        return this.liveBindTo("pointerpress", function(t) {
            this.hasMod("disabled") || this._onPointerpress(t)
        }), this.__base()
    }
}), BEM.DOM.decl("suggest2-item", {}, {
    live: function() {
        return this.liveBindTo("mouseover mouseout mousedown pointerclick", function(t) {
            this.trigger("pointerclick" === t.type ? "click" : t.type, {
                domEvent: t
            })
        }).liveBindTo("link", "pointerclick", function(t) {
            this.trigger("link-click", {
                domEvent: t
            })
        }), this.__base()
    }
}), BEM.DOM.decl("compare-cities-action", {
    onSetMod: {
        js: function() {
            var t = this;
            t._location = t.params.location, t._showTooltip = t._showTooltip.bind(t), t._hideTooltip = t._hideTooltip.bind(t)
        }
    },
    _render: function(t) {
        var e = this,
            n = t || e._getParams();
        "limit" !== n.actionType && (BEM.blocks["i-compare-cookie"][n.actionType](e._location), e.setMod("contains", n.contains)), t || ($('.compare-cities-action[data-id="' + e.domElem.data("id") + '"]').each(function(t, e) {
            $(e).bem("compare-cities-action")._render(n)
        }), BEM.channel("compare-cities-action").trigger(n.actionType, n), e._showCompareNotice(n))
    },
    _getParams: function() {
        var t = this,
            e = {};
        if ("no" === t.getMod("contains")) {
            var n = BEM.blocks["i-compare-cookie"].getLength();
            n < BEM.blocks["i-config"].param("compare").limit ? (e.contains = "yes", e.actionType = "add") : e.actionType = "limit"
        } else e.contains = "no", e.actionType = "remove";
        return e
    },
    _showCompareNotice: function(t) {
        var e = this;
        e._getCompareNotice().trigger("compare-action-done", {
            actionType: t.actionType,
            name: this.params.name
        })
    },
    _getCompareNotice: function() {
        var t = this,
            e = t.__self.compareNotice;
        return e || (e = t.findBlockOutside("b-page").findBlockInside("compare-notice"), t.__self.compareNotice = e), e
    },
    _getTooltip: function() {
        var t = this,
            e = t.__self.tooltip;
        return e && e.domElem || (e = $(BH.apply({
            block: "tooltip",
            mods: {
                theme: "normal",
                size: "s",
                autoclosable: "yes"
            },
            js: {
                to: ["top-center", "bottom-center", "left-center", "right-center"],
                mainOffset: 8
            },
            mix: {
                block: "compare-cities-action",
                elem: "tooltip"
            }
        })).bem("tooltip"), t.__self.tooltip = e), e
    },
    _showTooltip: function() {
        var t = this;
        if (t.hasMod("with-tooltip")) {
            var e = t.params.texts,
                n = t.hasMod("contains", "yes") ? "remove" : "add",
                i = e && e[n] || BEM.I18N("interface-desktop", "compare-" + n);
            t._getTooltip().setOwner(t.domElem).setContent(i).setMod("shown", "yes")
        }
    },
    _hideTooltip: function() {
        var t = this;
        t.hasMod("with-tooltip") && t._getTooltip().delMod("shown")
    }
}, {
    compareNotice: !1,
    tooltip: !1,
    live: function() {
        this.liveBindTo("mouseover", function(t) {
            var e = this;
            $(t.relatedTarget).trigger("mouseover"), e._showTooltip()
        }), this.liveBindTo("mouseout", function() {
            var t = this;
            t._hideTooltip()
        }), this.liveBindTo("pointerclick", function(t) {
            var e = this;
            e._render(), t.preventDefault()
        })
    }
}), BEM.DOM.decl("i-compare-cookie", {}, {
    _core: function() {
        var t = this;
        return t._coreCache || (t._coreCache = blocks.get("i-compare-cookie__core")), t._coreCache
    },
    add: function(t) {
        var e = this;
        e.toggle(t, !0)
    },
    addDefault: function(t) {
        var e = this;
        t && !e.raw() && e.add(t)
    },
    remove: function(t) {
        var e = this;
        e.toggle(t, !1)
    },
    toggle: function(t, e) {
        var n = this,
            i = n._core().toggle(n.raw(), t, e);
        n._setValue(i)
    },
    contains: function(t) {
        var e = this;
        return e._core().contains(e.raw(), t)
    },
    getLength: function() {
        var t = this;
        return t._core().getLength(t.raw())
    },
    raw: function() {
        return $.cookie((BEM.blocks["i-config"].param("compare") || {})["cookie-name"])
    },
    _setValue: function(t) {
        var e = BEM.blocks["i-global"].param("gdpr"),
            n = parseInt($.cookie("gdpr"), 10) || 0,
            i = BEM.blocks["i-config"].param("compare");
        e && e.levels.other.indexOf(n) > -1 && i && $.cookie(i["cookie-name"], t, {
            path: BEM.blocks["i-global"].param("service-root"),
            expires: BEM.blocks["i-config"].param("compare")["cookie-expires-days"]
        })
    }
}), BEM.DOM.decl("tooltip", {
    onSetMod: {
        js: {
            inited: function() {
                this._popup = null, this._owner = null
            }
        },
        shown: {
            yes: function() {
                this._getPopup().setMod("visible", "yes").unbindFromDoc("keydown")
            },
            "": function() {
                this._getPopup().delMod("visible")
            }
        }
    },
    getOwner: function() {
        return this._owner
    },
    setOwner: function(t) {
        return this._owner = t, this._getPopup().setAnchor(t), this
    },
    setContent: function(t) {
        return BEM.DOM.update(this.elem("content"), t), this.redraw()
    },
    redraw: function() {
        return this.hasMod("shown", "yes") && this._getPopup().redraw(), this
    },
    destruct: function() {
        this.delMod("shown"), this.__base.apply(this, arguments)
    },
    _getPopup: function() {
        return this._popup || (this._popup = this.findBlockOn("popup2").on("beforeOpen", this._onPopupShow, this).on("beforeClose", this._onPopupHide, this)), this._popup
    },
    _onPopupShow: function() {
        this.trigger("show")
    },
    _onPopupHide: function() {
        this.delMod("shown").trigger("hide")
    },
    _onClick: function() {
        this.trigger("click").delMod("shown")
    }
}, {
    live: function() {
        this.liveBindTo("click", function() {
            this._onClick()
        })
    }
}), BEM.DOM.decl("tooltip", {
    _onEnter: function() {
        this.setMod("hovered", "yes")
    },
    _onLeave: function() {
        this.delMod("hovered")
    }
}, {
    live: function() {
        return this.liveBindTo("pointerover pointerout", function(t) {
            this.domElem[0].contains(t.relatedTarget) || ("pointerover" === t.type ? this._onEnter(t) : this._onLeave(t))
        }), this.__base()
    }
}), BEM.DOM.decl("inline-icon", {
    onSetMod: {
        id: function(t, e) {
            var n = BH.apply({
                block: "inline-icon",
                mods: {
                    id: e
                }
            });
            this.domElem.find("svg").replaceWith($(n).find("svg"))
        }
    }
}), BEM.DOM.decl({
    block: "compare-cities-action",
    modName: "kind",
    modVal: "list-action"
}, {
    onSetMod: {
        contains: function(t, e) {
            var n = this;
            n.__base.apply(this, arguments);
            var i = n.elem("text"),
                o = n.params.texts,
                s = "yes" === e ? "remove" : "add",
                r = o && o[s] || BEM.I18N("interface-desktop", "compare-" + s);
            i && i.text(r), this.findBlockInside("inline-icon").toggleMod("id", "list-remove", "list-add")
        }
    }
}), BEM.DOM.decl({
    block: "compare-cities-action",
    modName: "with-tooltip",
    modVal: "yes"
}, {
    onSetMod: {
        contains: function(t, e) {
            var n = this;
            if (n.__base.apply(n, arguments), n.domElem.is(":visible")) {
                var i = "yes" === e ? "remove" : "add",
                    o = n.params.texts && n.params.texts[i] || BEM.I18N("interface-desktop", "compare-" + ("yes" === e ? "remove" : "add"));
                n._getTooltip().setContent(o)
            }
        }
    }
}), BEM.decl("suggest2-popup", {
    onSetMod: {
        js: {
            inited: function() {
                this._popup = this.params.popup, this._popupContent = this.params.popupContentElem && this._popup.findElem(this.params.popupContentElem), this.bindSuggestEvents()
            }
        }
    },
    show: function(t) {
        return this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = null), this._popup.domElem ? (t && this.setContent(t), this.isShown() ? this : (this.trigger("preshow"), this._setPosition(), this.trigger("show"), this)) : this
    },
    _setPosition: function() {
        throw new Error("Этот метод должен быть переопределен в модификаторе _for")
    },
    hide: function(t) {
        var e = this;
        return e.isShown() && !e.hideTimeout && (e.hideTimeout = setTimeout(function() {
            e._doHide(), e.trigger("hide", t || {}), e.hideTimeout = null
        }, 300)), e
    },
    _doHide: function() {
        throw new Error("Этот метод должен быть переопределен в модификаторе _for")
    },
    setContent: function(t) {
        return this._popupContent ? BEM.DOM.update(this._popupContent, t) : this._popup.setContent(t), this
    },
    isShown: function() {
        throw new Error("Этот метод должен быть переопределен в модификаторе _for")
    },
    owner: function(t) {
        return t ? (this.params.owner = t, this) : this.params.owner
    },
    get: function() {
        return this._popup
    },
    width: function(t) {
        return void 0 === t ? this._popup.domElem.outerWidth() : (this._popup.domElem.outerWidth(t), this)
    },
    destruct: function() {
        this._popup && (this.unbindAllEvents(), this.__base.apply(this, arguments))
    },
    bindSuggestEvents: function() {
        return this.params.suggest.on({
            select: this._onSuggestSelect,
            update: this._onSuggestUpdate
        }, this), this
    },
    _onSuggestSelect: function(t, e) {
        this.hide(e)
    },
    _onSuggestUpdate: function(t, e) {
        e.items.length || this.hide({
            response: "empty"
        })
    },
    unbindAllEvents: function() {
        return this.params.suggest.un("select").un("update"), this
    }
}), BEM.decl("suggest2-view", {
    html: function(t, e) {
        return BEMHTML.apply(this.build(t, e))
    },
    build: function(t, e) {
        return {
            block: "suggest2",
            elem: "content",
            elemMods: {
                theme: "normal"
            },
            content: this.buildItems(t, e)
        }
    },
    buildItems: function(t, e) {
        return t.reduce(function(t, e) {
            return t.push(this.buildItem(e)), t
        }.bind(this), [])
    },
    buildItem: function(t) {
        var e = this.__self._getPrefs(t),
            n = this.__self._getType(t, e),
            i = "html" === n || "bemjson" === n ? {} : {
                type: n
            };
        return this._getItemByType(t, e, n, {
            text: {
                elem: "text",
                content: this.__self._highlight(this.__self._getText(t, e), e)
            },
            mods: i,
            js: e.js || {},
            props: {},
            content: []
        })
    },
    _getItemByType: function(t, e, n, i) {
        var o = i.text,
            s = i.mods,
            r = i.js,
            a = i.props,
            c = i.content;
        0 === c.length && c.push(o), this.__self._getPersonal(e) && (s.personal = "yes", c.push({
            elem: "spacer"
        }, {
            elem: "cross",
            elemMods: {
                type: "delete"
            }
        })), e.url && (s.interact = "link", a.url = this.__self._resolveUrl(e.url), e.target && (a.target = e.target)), e.search_cgi && (r.searchCGI = e.search_cgi), e.attrs && (a.attrs = e.attrs);
        var l, u = BEM.blocks["i-global"];
        return "nav" === n ? l = "object" == typeof t[5] ? t[5].counter : t[5] : "bemjson" === n && (l = e.counter), l && (r.safeclickUrl = (u.param("click-host") + l).split("/*/").join("/reqid=" + u.param("reqid") + "/path=695.770/vars=-js-ready=1/*/")), $.extend({
            block: "suggest2-item",
            mods: s,
            js: r,
            content: c
        }, a)
    }
}, {
    _getPrefs: function(t) {
        if (!Array.isArray(t)) return {};
        var e = t[t.length - 1];
        return $.isPlainObject(e) ? e : {}
    },
    _getType: function(t, e) {
        return Array.isArray(t) ? t[0] || "text" : "text"
    },
    _getText: function(t) {
        return Array.isArray(t) ? t[1] : t
    },
    _highlight: function(t, e) {
        if (!e.hl) return t;
        var n, i = e.hl.sort(function(t, e) {
                return t[0] - e[0]
            }).filter(function(t) {
                return t[0] >= 0
            }),
            o = [],
            s = 0;
        return i.length ? (i.forEach(function(e) {
            n = s > e[0] ? s : e[0], o.push(t.slice(s, n)), o.push({
                elem: "highlight",
                content: t.slice(n, s = e[1])
            })
        }, this), o.push(t.slice(s)), o.filter(function(t) {
            return t
        })) : t
    },
    _resolveUrl: function(t) {
        return (/[\/]{2}/.test(t) ? "" : "http://") + t
    },
    _getPersonal: function(t) {
        return Boolean(t.pers)
    },
    _getPersonalProps: function(t) {
        var e = {
            pers: 1
        };
        return t && (e.label = t), e
    }
}), BEM.decl("suggest2-view", {}, {
    _getGroupType: function(t, e) {
        return t.pers ? "nah" : ["nav"].indexOf(e) !== -1 ? e : "text"
    },
    _getTextLabel: function(t) {
        return BEM.I18N("suggest2", t)
    }
}), BEM.decl("suggest2-view", {
    _getItemByType: function(t, e, n, i) {
        var o = i.text,
            s = i.mods,
            r = i.js,
            a = i.props,
            c = i.content;
        if (0 === c.length && c.push(o), e.url && (s.interact = "link", a.url = e.disableNavigation ? "#" : this.__self._resolveUrl(e.url), e.target && (a.target = e.target)), a.geoInfo = e.geoInfo, a.compareLocation = e.compareLocation || !1, a.isCompareTypeAddOnly = e.isCompareTypeAddOnly || !1, a.contains = a.compareLocation && BEM.blocks["i-compare-cookie"].contains(a.compareLocation.location), !a.isCompareTypeAddOnly || a.compareLocation && !a.contains) return a.isCompareTypeAddOnly && (s.compare = "full"), $.extend({
            block: "suggest2-item",
            mods: s,
            js: r,
            content: c
        }, a)
    }
}), BEM.decl("suggest2-input", {
    onSetMod: {
        js: {
            inited: function() {
                var t = this;
                t._input = t.params.input, t.disableBrowserAutocomplete(), t.realVal(t.val()), t.bindEvents({
                    change: function(e, n) {
                        t._onChange(e, n)
                    },
                    clear: $.throttle(function(e, n) {
                        t._onClear(e, n)
                    }, 300)
                }), t.bindSuggestEvents()
            }
        }
    },
    _onChange: function(t, e) {
        this.trigger("change", e)
    },
    _onClear: function(t, e) {
        this.trigger("clear", e)
    },
    destruct: function() {
        this.unbindAllEvents(), this.__base.apply(this, arguments)
    },
    get: function() {
        return this._input
    },
    isFocused: function() {
        return this._input.hasMod("focused")
    },
    focus: function() {
        return this._input.setMod("focused", "yes"), this
    },
    blur: function() {
        return this._input.delMod("focused"), this
    },
    getControl: function() {
        return this._input.elem("control")
    },
    val: function(t, e) {
        return this._input.val.apply(this._input, arguments)
    },
    valWithoutSuggest: function(t, e) {
        return this._input.val.call(this._input, t, $.extend(e, {
            suggest: !1
        }))
    },
    realVal: function(t) {
        return void 0 === t ? this._realVal : ("string" == typeof t && (this._realVal = t), this._realVal)
    },
    width: function() {
        return this._input.domElem.width()
    },
    getCaretPosition: function() {
        var t, e = this.getControl()[0],
            n = this.val().length;
        return document.selection ? (t = document.selection.createRange(), t.moveStart("character", -n), t.text.length) : "number" == typeof e.selectionStart ? e.selectionStart : n
    },
    moveCaretToEnd: function() {
        var t = this.getControl()[0],
            e = t.value.length;
        if ("undefined" != typeof t.createTextRange) {
            var n = t.createTextRange();
            n.collapse(!1), n.select()
        } else "number" == typeof t.selectionStart && (t.scrollLeft = 999999, t.setSelectionRange(e, e));
        return this
    },
    disableBrowserAutocomplete: function() {
        this.getControl().attr({
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            spellcheck: "false",
            "aria-autocomplete": "list"
        })
    },
    _bindedEventsNames: [],
    bindEvents: function(t, e) {
        return Object.keys(t).forEach(function(n) {
            this._bindedEventsNames.indexOf(n) === -1 && this._bindedEventsNames.push(n), this._eventsFilter(n).on(n, t[n].bind(e || this))
        }, this), this
    },
    bindSuggestEvents: function() {
        var t = this.params.suggest;
        return t.on({
            out: function(t, e) {
                this.a11yDeactive(), this._changeValueByEvent(t, e)
            }
        }, this), BEM.blocks["suggest2-item"].on(t.domElem, {
            tpah: this._onSuggestItemTpah,
            select: this._onSuggestItemSelect,
            enter: this._onSuggestItemEnter
        }, this), this
    },
    _onSuggestItemTpah: function(t, e) {
        this._changeValueByEvent(t, e), this.moveCaretToEnd()
    },
    _onSuggestItemSelect: function(t, e) {
        "link" !== t.block.getMod("interact") && (this._changeValueByEvent(t, e), this.moveCaretToEnd())
    },
    _onSuggestItemEnter: function(t, e) {
        this.a11yActive(e.id), e.byKeyboard && this.params.updateOnEnterByKeyboard && (this._changeValueByEvent(t, e), this.moveCaretToEnd())
    },
    unbindAllEvents: function() {
        return this._input.domElem && this._bindedEventsNames.forEach(function(t) {
            var e = this._eventsFilter(t);
            e[e instanceof BEM.DOM ? "un" : "off"](t)
        }, this), this._bindedEventsNames = [], this.params.suggest.un("out"), this
    },
    a11yActive: function(t) {
        this.getControl().attr("aria-activedescendant", t)
    },
    a11yDeactive: function() {
        this.getControl().removeAttr("aria-activedescendant")
    },
    _eventsFilter: function(t) {
        var e = ["blur", "focus", "change", "clear"];
        return e.indexOf(t) !== -1 ? this._input : this.getControl()
    },
    _changeValueByEvent: function(t, e) {
        var n = e && void 0 !== e.val ? e.val : this.realVal();
        this.val(n, $.extend({
            block: t.block.__self.getName(),
            event: t.type
        }, e))
    }
}), BEM.decl("suggest2-input", {
    onSetMod: {
        js: {
            inited: function() {
                var t = this;
                t.__base.apply(this, arguments), t.bindEvents({
                    keydown: function(e) {
                        t._onKeyDown(e)
                    }
                }, t)
            }
        }
    },
    _onKeyDown: function(t) {
        t.which === this.params.suggest.__self.keyboard.enter && this.trigger("enter")
    }
}),
function(t) {
    t.dom = {
        getActiveElement: function() {
            try {
                return t(document.activeElement)
            } catch (e) {
                return t()
            }
        }
    }, t.fn.isFocused = function() {
        return this.is(t.dom.getActiveElement())
    }
}(jQuery), BEM.DOM.decl({
    block: "button2",
    baseBlock: "control"
}, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments)
            }
        },
        pressed: {
            yes: function() {
                return !this.hasMod("disabled") && void this.trigger("press")
            },
            "": function() {
                this.trigger("release")
            }
        },
        checked: {
            yes: function() {
                this.trigger("check").domElem.attr("aria-pressed", "true")
            },
            "": function() {
                this.trigger("uncheck").domElem.attr("aria-pressed", "false")
            }
        },
        disabled: {
            yes: function() {
                this.__base.apply(this, arguments), this.delMod("pressed")
            }
        },
        focused: {
            "": function() {
                this.__base.apply(this, arguments), this.delMod("pressed")
            }
        },
        progress: {
            yes: function() {
                this.setMod("disabled", "yes")
            },
            "": function() {
                this.delMod("disabled")
            }
        }
    },
    getText: function() {
        return this.elem("text").text()
    },
    setText: function(t) {
        return this.elem("text").text(t), this
    },
    _onClick: function(t) {
        (!this._preventClick || t.detail > 0) && this.trigger("click", this._buildClickEventData(t)), this._preventClick = !1
    },
    _processClick: function(t) {
        this.trigger("click", this._buildClickEventData(t))
    },
    _onPointerpress: function(t) {
        this.setMod("pressed", "yes").bindToDoc("pointerrelease", this._onPointerrelease)
    },
    _onPointerrelease: function() {
        this.delMod("pressed").unbindFromDoc("pointerrelease")
    },
    _onKeydown: function(t) {
        var e = t.keyCode,
            n = BEM.blocks.keycodes;
        n.is(e, this.params.pressKeys) && (this.setMod("pressed", "yes"), n.is(e, this.params.prvntKeys) && t.preventDefault())
    },
    _onKeyup: function(t) {
        var e = t.keyCode,
            n = BEM.blocks.keycodes;
        n.is(e, this.params.prvntKeys) && t.preventDefault(), n.is(e, this.params.pressKeys) && (this.delMod("pressed"), n.is(e, this.params.clickKeys) && (this._preventClick = !0, this._processClick(t)))
    },
    _buildClickEventData: function(t) {
        return {
            domEvent: t,
            isModKey: t.ctrlKey || t.altKey || t.metaKey || t.shiftKey
        }
    },
    getDefaultParams: function() {
        return $.extend(this.__base(), {
            pressKeys: ["SPACE", "ENTER"],
            prvntKeys: [],
            clickKeys: []
        })
    }
}, {
    live: function() {
        return this.liveBindTo("pointerpress", function(t) {
            this.hasMod("disabled") || this._onPointerpress(t)
        }).liveBindTo("pointerclick", function(t) {
            this.hasMod("disabled") || this._onClick(t)
        }).liveBindTo("keydown", function(t) {
            this._onKeydown(t)
        }).liveBindTo("keyup", function(t) {
            this._onKeyup(t)
        }), this.__base()
    }
}), BEM.DOM.decl("button2", {
    onSetMod: {
        hovered: {
            yes: function() {
                return !this.hasMod("disabled")
            }
        },
        disabled: {
            yes: function() {
                this.__base.apply(this, arguments), this.delMod("hovered")
            }
        }
    },
    _onPointerenter: function() {
        this.setMod("hovered", "yes")
    },
    _onPointerleave: function() {
        this.delMod("hovered")
    },
    _onClick: function() {
        this.__base.apply(this, arguments), this._isDestructing || this.setMod("focused", "yes")
    }
}, {
    live: function() {
        return 8 === BEM.blocks["i-ua"].ie && this.liveBindTo("dblclick", function(t) {
            this.hasMod("disabled") || this._onClick(t)
        }), this.liveBindTo("pointerover pointerout", function(t) {
            this.hasMod("disabled") || this.domElem[0].contains(t.relatedTarget) || ("pointerover" === t.type ? this._onPointerenter(t) : this._onPointerleave(t))
        }).liveBindTo("mousedown", function(t) {
            t.preventDefault()
        }), this.__base()
    }
}), BEM.DOM.decl("i-ua", {}, {
    placeholder: "placeholder" in document.createElement("input")
}), BEM.DOM.decl("input", {
    onSetMod: {
        js: {
            inited: function() {
                this._val = this.elem("control").val()
            }
        },
        disabled: {
            "*": function(t, e) {
                this.elem("control").prop("disabled", e)
            },
            yes: function() {
                this.delMod("focused")
            }
        },
        focused: function(t, e) {
            return !this.hasMod("disabled") && (e ? this._focused || this._focus() : this._focused && this._blur(), void this.afterCurrentEvent(function() {
                this.domElem && this.trigger(e ? "focus" : "blur")
            }))
        }
    },
    isDisabled: function() {
        return this.hasMod("disabled", "yes")
    },
    val: function(t, e) {
        var n = "undefined" != typeof t,
            i = this.elem("control");
        return t = n ? null === t ? "" : t.toString() : i.val(), this._val !== t && (this._val = t, i.val() !== t && i.val(t), this.trigger("change", e)), n ? this : t
    },
    name: function(t) {
        var e = this.elem("control");
        return arguments.length ? (e.attr("name", t), this) : e.attr("name")
    },
    getSelectionEnd: function() {
        var t = this.elem("control")[0],
            e = 0;
        if ("number" == typeof t.selectionEnd) e = t.selectionEnd;
        else {
            var n = document.selection.createRange();
            if (n && n.parentElement() === t) {
                var i = t.value.length,
                    o = t.createTextRange();
                o.moveToBookmark(n.getBookmark());
                var s = t.createTextRange();
                s.collapse(!1), e = o.compareEndPoints("EndToEnd", s) > -1 ? i : -o.moveEnd("character", -i)
            }
        }
        return e
    },
    _onFocus: function() {
        if (parseInt(BEM.blocks["i-ua"].ios, 10) >= 8 && !this.hasMod("type", "textarea")) {
            var t = this.elem("control")[0];
            t.selectionStart === t.value.length && (t.scrollLeft = t.scrollWidth)
        }
        return this._focused = !0, this.setMod("focused", "yes")
    },
    _onBlur: function() {
        return this._returnFocus ? (this.afterCurrentEvent(function() {
            this.domElem && this._focus()
        }), this) : this.hasMod(this.elem("clear"), "pressed") ? this : (this._focused = !1, this.delMod("focused"))
    },
    _focus: function() {
        return !this.hasMod("disabled", "yes") && void this.elem("control").focus()
    },
    _blur: function() {
        this._returnFocus = !1, this.elem("control").blur()
    },
    _updateVal: function() {
        this.val(this.elem("control").val())
    },
    destruct: function() {
        this._blur(), this.__base.apply(this, arguments)
    }
}, {
    live: function() {
        this.liveBindTo("control", "focusin focusout", function(t) {
            this["focusin" === t.type ? "_onFocus" : "_onBlur"](t)
        }), this.liveBindTo("control", "input", function() {
            this._updateVal()
        }), 9 === document.documentMode && (this.liveBindTo("control", "focusin", function() {
            this.bindToDoc("selectionchange", this._updateVal)
        }), this.liveBindTo("control", "focusout", function() {
            this.unbindFromDoc("selectionchange")
        }))
    }
}), BEM.DOM.decl("input", {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments);
                var t = this.elem("control"),
                    e = $.dom.getActiveElement(),
                    n = this.params.autoFocus && !e.is("input, textarea");
                (e[0] === t[0] || n) && (this.setMod("focused", "yes")._focused = !0), this.params.shortcut && this.bindToDoc("keydown", function(t) {
                    t.ctrlKey && t.which === BEM.blocks.keycodes.UP && !$(t.target).is("input, textarea") && this.setMod("focused", "yes")
                })
            }
        }
    },
    _focus: function() {
        if (this.__base() === !1) return !1;
        var t = this.elem("control")[0];
        if (t.createTextRange && !t.selectionStart) {
            var e = t.createTextRange();
            e.move("character", t.value.length), e.select()
        }
    },
    destruct: function() {
        this.params.shortcut && this.unbindFromDoc("keydown"), this.__base.apply(this, arguments)
    },
    _onPointerenter: function(t) {
        this.setMod("hovered", "yes")
    },
    _onPointerleave: function(t) {
        this.delMod("hovered")
    },
    _updateValNextTick: function() {
        this.afterCurrentEvent(function() {
            this.domElem && this._updateVal()
        })
    }
}, {
    live: function() {
        return this.liveBindTo("box", "pointerover pointerout", function(t) {
            this.hasMod("disabled") || this.elem("box")[0].contains(t.relatedTarget) || ("pointerover" === t.type ? this._onPointerenter(t) : this._onPointerleave(t))
        }), this.liveBindTo("control", "dragenter"), this.liveBindTo("control", "dragend", function() {
            this._updateValNextTick()
        }), "documentMode" in document && document.documentMode <= 8 && (this.liveBindTo("control", "focusin", function() {
            this.bindTo("control", "propertychange keyup", this._updateVal), this.bindTo("control", "cut paste", function() {
                this._updateValNextTick()
            })
        }), this.liveBindTo("control", "focusout", function() {
            this.unbindFrom("control", "cut paste"), this.unbindFrom("control", "propertychange keyup"), this._updateValNextTick()
        })), this.__base()
    }
}), BEM.DOM.decl("input", {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), this.on("change", this._updateClear)._updateClear()
            }
        }
    },
    _onClearClick: function() {
        return this.trigger("clear"), this.removeInsets && this.removeInsets(), this.clearInput({
            source: "clear"
        })._focus()
    },
    clearInput: function(t) {
        return this.val("", t), this
    },
    _updateClear: function() {
        return this.toggleMod(this.elem("clear"), "visibility", "visible", Boolean(this._val))
    }
}, {
    live: function() {
        return this.liveBindTo("clear", "pointerpress", function(t) {
            this.setMod(this.elem("clear"), "pressed", "yes")
        }).liveBindTo("clear", "pointerover", function(t) {
            this.setMod(this.elem("clear"), "hovered", "yes")
        }).liveBindTo("clear", "pointerout", function(t) {
            this.delMod(this.elem("clear"), "hovered")
        }).liveBindTo("clear", "pointerclick", function() {
            this.delMod(this.elem("clear"), "pressed"), this._onClearClick()
        }).liveBindTo("control", "paste", function() {
            this.setMod(this.elem("clear"), "visibility", "visible")
        }), this.__base()
    }
}), BEM.DOM.decl("input", {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), (this._hasHint = Boolean(this.elem("hint")[0])) && this.on("change", this._updateHint)._updateHint()
            }
        },
        focused: function() {
            return this.__base.apply(this, arguments) !== !1 && void(this._hasHint && this._updateHint())
        }
    },
    _updateHint: function() {
        this.toggleMod(this.elem("hint"), "visibility", "visible", !this.val())
    }
}), BEM.DOM.decl("suggest2-counter", {
    pointerStartEvent: "pointerdown",
    onSetMod: {
        js: {
            inited: function() {
                this.clear()
            }
        }
    },
    destruct: function() {
        this.unbindAllEvents()
    },
    getDefaultParams: function() {
        return {
            submitBySelect: !1,
            suggestReqID: !1,
            preventSubmit: !0,
            host: "//yandex.ru",
            path: "clck/jclck",
            dataUrl: "http://ya.ru",
            params: {},
            timeout: 300
        }
    },
    metaProps: {
        exprt: "exprt",
        r: "region",
        log: "log"
    },
    clear: function() {
        var t = this;
        return t._params = {
            user_input: "",
            text: ""
        }, t._times = [], t._renderTimes = [], t._renderTime = 0, t._path = {
            service: t.params.service,
            state: "not_shown",
            index: 0,
            personal: "nah_not_shown",
            submit: ""
        }, t._ratio = {
            len: 0,
            queryLen: 0,
            actionsCount: 0
        }, t._firstChange = 0, t._lastChange = 0, t._sinceChange = {
            first: 0,
            last: 0
        }, t._selectedText = "", t._session = 0, t._reqID = this.__self._generateReqID(), t._meta = {}, t._afterSendAjaxCallback, t._startClickTime = null, t._startInputTime = null, t._requests = [], t._clicksCount = 0, t
    },
    submit: function(t) {
        var e = this,
            n = e.params.suggest.params["suggest2-input"],
            i = n.val();
        e._params.text = i, e._params.pos = n.getCaretPosition(), e._params.times = e._requests.map(function(t) {
            return !t.error && t.duration ? t.duration : 0
        }).join("."), e.params.suggestReqID && e.attachReqID(), e.sendAjax(e.getUrl(), $.extend({
            submitForm: !0,
            afterSendAjaxCallback: function() {}
        }, t)), e.trigger("submit", e._getSubmitEventData()).clear(), e._params.prev_query = i
    },
    _getSubmitEventData: function() {
        var t = this;
        return {
            path: t._path,
            times: t._times,
            render_times: t._params.times,
            prev_query: t._params.prev_query,
            user_input: t._params.user_input,
            text: t._params.text,
            pos: t._params.pos,
            ratio: t._ratio,
            since_first_change: t._sinceChange.first,
            since_last_change: t._sinceChange.last,
            session: t._session,
            suggest_reqid: t._reqID,
            meta: t._meta,
            url: t.getUrl()
        }
    },
    sendAjax: function(t, e) {
        return $.ajax({
            type: "GET",
            url: t,
            dataType: "script",
            timeout: this._getAjaxTimeout()
        }).always(this._sendAjaxAlways.bind(this, e)), this
    },
    _getAjaxTimeout: function() {
        return this.params.timeout
    },
    afterSendAjax: function(t) {
        return this._afterSendAjaxCallback = t, this
    },
    getUrl: function() {
        return this.params.host + ["/", this.params.path].concat(this._getUrlParams()).join("/").replace(/(\/+)/g, "/")
    },
    _sendAjaxAlways: function(t) {
        t || (t = {}), this.params.preventSubmit && t.submitForm && this.params.form.submit({
            block: this.__self.getName(),
            prevent: !1
        }), t.afterSendAjaxCallback && t.afterSendAjaxCallback(), this._afterSendAjaxCallback && this._afterSendAjaxCallback()
    },
    _getUrlParams: function() {
        var t = this;
        return this._getParamsList().concat(t._getData()).reduce(function(e, n) {
            return e.concat(t._getParams(n))
        }, []).concat(["/"])
    },
    _getParamsList: function() {
        var t = this;
        return [t.params.params, t._getPath(), t._params, t._getRatio(), t._getSinceChange(), t._getSession(), t._getResponsesShows(), {
            suggest_reqid: t._reqID
        }]
    },
    initValues: function() {
        return this._params.prev_query = this.params.suggest.params["suggest2-input"].val(), this
    },
    attachReqID: function() {
        this._reqID = this.__self._generateReqID(), this.params.form.appendHiddenInputs([{
            name: "suggest_reqid",
            value: this._reqID
        }])
    },
    getCurrentReqId: function() {
        return this._reqID
    },
    bindEvents: function() {
        var t = this,
            e = t.params,
            n = e.suggest,
            i = e.form,
            o = n.getModel(),
            s = n.params["suggest2-input"],
            r = n.params["suggest2-popup"];
        return i.on({
            "button-click": t._onFormButtonClick,
            submit: t._onFormSubmit
        }, t), o.on({
            request: t._onModelRequest,
            response: t._onModelResponse
        }, t), s.on({
            change: t._onInputChange,
            enter: t._onInputEnter
        }, t), r.on({
            show: t._onPopupShow
        }, t), BEM.blocks["suggest2-item"].on(n.domElem, "enter", t._onSuggestItemEnter, t), n.on({
            update: t._onSuggestUpdate,
            select: t._onSuggestSelect
        }, t), t._input = s._input, t._input.bindTo(t.pointerStartEvent, t._onInputClick.bind(t)).on("focus", t._onInputFocus, t), t._input.findElem("control").on("blur", t._onInputBlur.bind(t)), t
    },
    _onInputClick: function() {
        this._startInputTime || (this._startClickTime = Date.now())
    },
    _onClickPopup: function() {
        this._clicksCount++
    },
    _onInputFocus: function() {
        this._timeoutInputTime && clearTimeout(this._timeoutInputTime), this._startInputTime = this._startClickTime
    },
    _onInputBlur: function(t) {
        this._timeoutInputTime = setTimeout(function() {
            this._startClickTime = null, this._startInputTime = null
        }.bind(this), 300)
    },
    _onFormButtonClick: function() {
        "keyboard" !== this._path.submit && (this._path.submit = "button_by_mouse")
    },
    _onFormSubmit: function(t, e) {
        e.data.block !== this.__self.getName() && e.data.prevent !== !1 && (this.params.preventSubmit && (e.stopImmediatePropagation(), e.preventDefault()), this._doSubmit())
    },
    _doSubmit: function() {
        this.submit()
    },
    _onModelRequest: function(t, e) {
        this._requests.push(e.request)
    },
    _onModelResponse: function(t, e) {
        if (Object(e.data).items) {
            var n = e.data.items;
            this._path.personal = this._hasPersonal(n) ? "nah_not_used" : "nah_not_shown", this._meta = e.data.meta || {}, this._renderTime = new Date, this._setMetaProps(e), this._requests && delete this._requests[e.val.toLowerCase()]
        }
    },
    _onInputChange: function(t, e) {
        e && "clear" !== e.source || (this._params.user_input = t.block.val(), this[this._firstChange ? "_lastChange" : "_firstChange"] = new Date, this._startInputTime || (this._startInputTime = this._firstChange.getTime())), this._selectedText && (this._path.state = "edit"), this._ratio.actionsCount++
    },
    _onInputEnter: function() {
        this._path.submit = "keyboard"
    },
    _onPopupShow: function() {
        "not_shown" === this._path.state && (this._path.state = "not_used")
    },
    _onSuggestItemEnter: function(t, e) {
        e.byKeyboard && this.params.suggest.params.updateOnEnterByKeyboard && (this._selectedText = e.val, this._path.state = "suggest")
    },
    _onSuggestUpdate: function() {
        this._addRenderTime(new Date - this._renderTime)
    },
    _onSuggestSelect: function(t, e) {
        var n = this;
        n._path.state = e.byKeyboard ? "keyboard" : "mouse", n._path.index = e.itemIndex + 1, n._selectedText = e.val, e.item.hasMod("personal") && (n._path.personal = "nah_used"), n.params.submitBySelect && (n._path.submit = e.byKeyboard ? "keyboard" : "click_by_mouse", n._params.pos = e.pos, n._params.text = this._selectedText), n.params.suggest.isNeedSubmitFormOnSelectItem(e.item) || n.submit({
            submitForm: !1,
            afterSendAjaxCallback: e.callbackOnSelect
        }), e.item.params.safeclickUrl && ((new Image).src = e.item.params.safeclickUrl)
    },
    unbindAllEvents: function() {
        var t = this.params,
            e = t.suggest,
            n = t.form,
            i = e.params["suggest2-popup"];
        return n.un("button-click").un("submit"), e.getModel().un("request").un("response"), e.params["suggest2-input"].un("change").un("enter"), i.un("show").un("hide"), e.un("select"), this
    },
    _hasPersonal: function(t) {
        return t.some(function(t) {
            return 1 === BEM.blocks["suggest2-view"]._getPrefs(t).pers
        })
    },
    _setMetaProps: function(t) {
        t.data.meta && Object.keys(this.metaProps).forEach(function(e) {
            this._params[this.metaProps[e]] = t.data.meta[e] || ""
        }, this)
    },
    _getParams: function(t) {
        return Object.keys(t).reduce(function(e, n) {
            return "" === t[n] ? e : (e.push(n + "=" + encodeURIComponent(t[n]).replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%2C/g, ",")), e)
        }, [])
    },
    _getPath: function() {
        return {
            path: [this._path.service, this._path.state, "p" + this._path.index, this._path.personal, this._path.submit].join(".")
        }
    },
    _getSession: function() {
        return this._session = (new Date).getTime() + Math.round(1e4 * Math.random()), {
            session: this._session
        }
    },
    _getSinceChange: function() {
        var t = this._getSinceTime("first"),
            e = this._startInputTime && Date.now() - this._startInputTime || 0;
        return {
            since_first_change: t,
            since_last_change: this._getSinceTime("last"),
            total_input_time: e
        }
    },
    _getSinceTime: function(t) {
        var e = "_" + t + "Change";
        return this._sinceChange[t] = this[e] ? (new Date).getTime() - this[e] : 0, this._sinceChange[t]
    },
    _getResponsesShows: function() {
        return this._requests.reduce(function(t, e) {
            return t.rqs++, e.error || (e.responseTime && t.rsp++, 0 === e.itemsCount && t.ersp++, e.fromCache && t.cchd++), t
        }, {
            rqs: 0,
            rsp: 0,
            rndr: this._renderTimes.length,
            ersp: 0,
            clks: this._clicksCount,
            cchd: 0
        })
    },
    _getRatio: function() {
        return this._ratio.len = this._params.user_input.length, this._ratio.queryLen = this._params.text.length, {
            ratio: [this._ratio.len, this._ratio.queryLen, this._ratio.actionsCount].join(".")
        }
    },
    _addRenderTime: function(t) {
        return this._renderTimes.push(t), this._params.render_times = this._renderTimes.join("."), this
    },
    _getData: function() {
        return {
            "*data": "url=" + this.params.dataUrl
        }
    }
}, {
    _generateReqID: function() {
        var t = BEM.blocks["i-global"] && BEM.blocks["i-global"].param("yandexuid") ? BEM.blocks["i-global"].param("yandexuid") : this._random(9) + this._random(9);
        return t + String(Date.now()).slice(-7) + this._random(7)
    },
    _random: function(t) {
        return Math.random().toString().slice(-Math.min(t, 10))
    }
}, {
    live: function() {
        this.liveInitOnBlockEvent("init", "suggest2-form")
    }
}), BEM.DOM.decl("suggest2-counter", {
    bindEvents: function() {
        this.__base.apply(this, arguments);
        var t = this.params.suggest;
        return BEM.blocks["suggest2-item"].on(t.domElem, "pointerclick", this._onClickPopup.bind(this)), this
    }
}), BEM.DOM.decl("suggest2-form", {
    onSetMod: {
        js: {
            inited: function() {
                this._isReady = !1, this._nodes = this.initNodes()
            }
        }
    },
    getDefaultParams: function() {
        return {
            inputName: "input",
            buttonName: "button2",
            popupName: "popup"
        }
    },
    destruct: function() {
        this._nodes.forEach(function(t) {
            t.suggest.domElem && BEM.DOM.destruct(t.suggest.domElem), this.unbindFormEvents(t), t.counter && t.counter.destruct(), t.proxies.input.destruct(), t.proxies.popup.destruct()
        }, this), this.__base.apply(this, arguments)
    },
    getOwner: function(t) {},
    isReady: function() {
        return this._isReady
    },
    initNodes: function() {
        var t = this.getNodes();
        return t.forEach(function(t) {
            t.suggest.init()
        }), this._isReady = !0, this.trigger("ready", {
            nodes: t
        }), t
    },
    getNodes: function() {
        return this.getNodeList().map(function(t) {
            var e = t.suggest,
                n = e.params;
            return n.form = this, n.input = t.input, n.popup = t.popup, n.button = t.button, t.proxies = {}, t.proxies.popup = n["suggest2-popup"] = BEM.create({
                block: "suggest2-popup",
                mods: $.extend({
                    for: this.params.popupName
                }, this.params.popupMods)
            }, this._getNodePopupParams(e, n)), t.proxies.input = n["suggest2-input"] = BEM.create({
                block: "suggest2-input",
                mods: this.params.inputMods
            }, this._getNodeInputParams(e, n)), t.counter && (t.counter.params.form = this, t.counter.params.suggest = e, n.counter = t.counter), this.bindFormEvents(t), t
        }, this)
    },
    _getNodeInputParams: function(t, e) {
        return {
            suggest: t,
            input: e.input,
            updateOnEnterByKeyboard: e.updateOnEnterByKeyboard
        }
    },
    _getNodePopupParams: function(t, e, n) {
        return {
            suggest: t,
            popup: e.popup,
            popupContentElem: this.params.popupContentElem,
            owner: this.getOwner(n) || e.input
        }
    },
    bindFormEvents: function(t) {
        var e = this;
        return t.button && t.button.bindTo("pointerclick", function(t) {
            e._onButtonClick(t)
        }), e.bindTo("submit", function(t, n) {
            e.onSubmit(t, n)
        }), e
    },
    _onButtonClick: function(t) {
        this.trigger("button-click", {
            domEvent: t
        })
    },
    unbindFormEvents: function(t) {
        var e = this;
        return t.button && t.button.un("pointerclick"), e.unbindFrom("submit"), e
    },
    submit: function(t) {
        return this.domElem.trigger("submit", t || {}), this
    },
    onSubmit: function(t, e) {
        t.data = e || {}, this.trigger("submit", t)
    },
    getNodeList: function() {
        var t = this,
            e = [];
        return t.elem("node").each(function(n, i) {
            var o = $(i),
                s = t._getFormNodeElems(o);
            e.push(t._getFormNodeBlocks(s, o))
        }), e
    },
    _getFormNodeElems: function(t) {
        return {
            input: this.findElem(t, "input"),
            button: this.findElem(t, "button")
        }
    },
    _getSuggestForNode: function(t) {
        return this.findBlockInside(t, "suggest2")
    },
    _getFormNodeBlocks: function(t, e) {
        var n = this._getSuggestForNode(e);
        return {
            node: e,
            suggest: n,
            counter: this.findBlockOn("suggest2-counter"),
            input: this.findBlockOn(t.input, "input"),
            button: this.findBlockOn(t.button, this.params.buttonName),
            popup: n.findBlockOn(this.params.popupName)
        }
    },
    appendHiddenInputs: function(t) {
        return BEM.DOM.append(this.domElem, BEMHTML.apply(t.map(function(t) {
            return {
                block: this.__self.getName(),
                elem: "hidden-input",
                tag: "input",
                attrs: {
                    type: "hidden",
                    name: t.name,
                    value: t.value
                }
            }
        }, this))), this
    },
    removeHiddenInputs: function() {
        return BEM.DOM.destruct(this.findElem(this.domElem, "hidden-input")), this
    }
}, {
    live: function() {
        var t = this;
        return this.liveInitOnBlockInsideEvent("mousedown pointerdown change focus", "input"), (!BEM.blocks["i-ua"].ie || BEM.blocks["i-ua"].ie > 8) && (this.liveBindTo("input", "mousedown pointerdown change focus", function(e) {
            t.disableNativeAutocomplete(e.target)
        }), this.disableNativeAutocompleteAll()), this.__base()
    },
    disableNativeAutocompleteAll: function() {
        var t = document.querySelectorAll(".suggest2-form__input .input__control");
        t = Array.prototype.slice.call(t), t.forEach(this.disableNativeAutocomplete.bind(this))
    },
    disableNativeAutocomplete: function(t) {
        if ("off" !== t.getAttribute("autocapitalize")) {
            var e = {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                spellcheck: "false",
                "aria-autocomplete": "list"
            };
            for (var n in e) t.setAttribute(n, e[n]);
            this.hideNativeAutocomplete(t)
        }
    },
    hideNativeAutocomplete: function(t) {
        var e = document.activeElement === t;
        e && t.blur(), e && t.focus()
    }
}), BEM.decl({
    block: "suggest2-popup",
    modName: "for",
    modVal: "popup2"
}, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), this._popup.on("beforeClose", function() {
                    this.afterCurrentEvent(function() {
                        BEM.blocks["suggest2-detect"].isPressedEscape() && this.trigger("hide", {})
                    })
                }, this)
            }
        }
    },
    _setPosition: function() {
        this._popup.setAnchor(this.params.owner), this._popup.setMod("visible", "yes")
    },
    _doHide: function(t) {
        this._popup.delMod("visible")
    },
    isShown: function() {
        return !!this._popup && this._popup.hasMod("visible")
    }
}), BEM.DOM.decl({
    block: "suggest2",
    modName: "theme",
    modVal: "large"
}, {
    initView: function(t, e) {
        return t = t || {}, this.__base($.extend(t, {
            adjustable: "yes",
            theme: "large",
            group: "false" !== this.getMod("group") && (t.group || this.getMod("group") || "type")
        }), e)
    }
}), BEM.DOM.decl({
    block: "suggest2",
    modName: "theme",
    modVal: "large"
}, {
    updateItemMinWidth: function() {
        var t = this.getInputWidth() + this.getInputOffset();
        return this._view.setMinWidth(t), t
    },
    getInputOffset: function() {
        return this._input.get().domElem.offset().left
    }
}), BEM.decl({
    block: "suggest2-view",
    modName: "theme",
    modVal: "large"
}, {
    build: function(t, e) {
        var n = this.__base.apply(this, arguments);
        return n.elemMods.theme = "large", n
    }
}), BEM.decl({
    block: "suggest2-view",
    modName: "theme",
    modVal: "large"
}, {
    getMinWidth: function() {
        return this._minWidth || 0
    },
    getMaxWidth: function() {
        return this._maxWidth || 0
    },
    setMinWidth: function(t) {
        return this._minWidth = t, this
    },
    setMaxWidth: function(t) {
        return this._maxWidth = t, this
    },
    getMarginLeft: function() {
        return this._marginLeft
    },
    setMarginLeft: function(t) {
        return this._marginLeft = t, this
    },
    build: function(t, e) {
        var n = this.__base.apply(this, arguments),
            i = ["min-width:" + this.getMinWidth() + "px;"],
            o = this.getMaxWidth();
        o && i.push("max-width:" + o + "px;");
        var s = this.getMarginLeft();
        return s && i.push("margin-left:" + s + "px;"), n.attrs = {
            style: i.join(" ")
        }, n
    }
}), BEM.DOM.decl({
    block: "suggest2-item",
    modName: "personal",
    modVal: "yes"
}, {
    onSetMod: {
        js: {
            inited: function() {
                this._catchEvents && this._crossCatchHandler && this.bindTo("cross", this._catchEvents, this._crossCatchHandler), this.historyElem = this.elem("text").text()
            }
        }
    },
    val: function() {
        return this.params.val ? this.params.val : this.elem("text").text()
    },
    remove: function(t) {
        var e = this;
        this.domElem.one("webkitTransitionEnd transitionend", function() {
            e.domElem.remove(), t && t()
        }), this.domElem.css("height", 0)
    }
}), BEM.DOM.decl({
    block: "suggest2-item",
    modName: "personal",
    modVal: "yes"
}, {
    _catchEvents: "click",
    _crossCatchHandler: function(t) {
        t.preventDefault(), t.stopImmediatePropagation(), this.trigger("delete")
    }
}), BEM.DOM.decl({
    block: "suggest2",
    modName: "adaptive",
    modVal: "yes"
}, {
    init: function() {
        this.__base.apply(this, arguments), this._boundResizeHandler = this._resizeHandler.bind(this), this.__self._bindToWinResize(this._boundResizeHandler)
    },
    _resizeHandler: function() {
        this._popup.width(this.getPopupWidth())
    },
    destruct: function() {
        this.__self._unbindFromWinResize(this._boundResizeHandler), this._boundResizeHandler = null, this.__base.apply(this, arguments)
    }
}, {
    _resizeCallbacks: [],
    _bindToWinResize: function(t) {
        return this._resizeCallbacks.push(t), this
    },
    _unbindFromWinResize: function(t) {
        for (var e = 0; e < this._resizeCallbacks.length; e++)
            if (this._resizeCallbacks[e] === t) return this._resizeCallbacks.splice(e, 1), this;
        return this
    },
    _getResizeCallback: function() {
        return $.throttle(function() {
            var t = arguments;
            this._resizeCallbacks.forEach(function(e) {
                e.apply(this, t)
            }, this)
        }, 300, this)
    },
    live: function() {
        return this._resizeCallback = this._getResizeCallback(), BEM.DOM.win.on("resize", this._resizeCallback), this.__base()
    }
}), BEM.DOM.decl({
    block: "suggest2",
    modName: "adaptive",
    modVal: "yes"
}, {
    _minWidth: 0,
    _maxWidth: 0,
    _resizeHandler: function() {
        this.__base.apply(this), this.afterCurrentEvent(function() {
            this.adjustView()
        })
    },
    _onShow: function() {
        this.__base.apply(this), this.hasMod("theme", "large") && this._applyMetricsToContent()
    },
    adjustView: function() {
        var t = this.__base.apply(this, arguments),
            e = t.minWidth,
            n = t.maxWidth,
            i = !1;
        return e !== this._minWidth && (this._minWidth = e, i = !0), n !== this._maxWidth && (this._maxWidth = n, i = !0), i && this._popup.isShown() && this._applyMetricsToContent(), t
    },
    _applyMetricsToContent: function() {
        this.__base.apply(this, arguments);
        var t = this.findElem("content");
        this._minWidth && t.css("min-width", this._minWidth), this._maxWidth && t.css("max-width", this._maxWidth)
    }
}), BEM.DOM.decl({
    block: "suggest2",
    modName: "adjustable",
    modVal: "yes"
}, {
    _marginLeft: 0,
    init: function() {
        this.__base.apply(this, arguments), this.adjustView()
    },
    adjustView: function() {
        var t = this.__base.apply(this, arguments);
        this._view.setMarginLeft(t.marginLeft), this._view.setMinWidth(t.minWidth), this._view.setMaxWidth(t.maxWidth);
        var e = !1;
        return t.marginLeft !== this._marginLeft && (this._marginLeft = t.marginLeft, e = !0), e && this._popup.isShown() && this._applyMetricsToContent(), t
    },
    getInputLeft: function() {
        var t = this._input.get().findElem("control"),
            e = t.offset(),
            n = t[0];
        if (!n) return 0;
        var i = n.currentStyle ? n.currentStyle : window.getComputedStyle(n),
            o = parseInt(i.borderLeftWidth, 10) || 0,
            s = parseInt(i.paddingLeft, 10) || 0;
        return e.left + o + s
    },
    getInputWidth: function() {
        return this._input.get().domElem.outerWidth()
    },
    getContainerWidth: function() {
        return BEM.DOM.scope.width()
    },
    _applyMetricsToContent: function() {
        this.__base.apply(this, arguments);
        var t = this.findElem("content");
        this._marginLeft && t.css("margin-left", this._marginLeft)
    }
}), BEM.decl({
    block: "suggest2-view",
    modName: "group",
    modVal: "type"
}, {
    buildItems: function(t, e) {
        var n, i;
        return t.reduce(function(t, e) {
            var o = this.__self._getPrefs(e),
                s = this.__self._getType(e, o),
                r = this.__self._getGroupType(o, s);
            return n !== r && (n = r, i = [], t.push({
                block: "suggest2",
                elem: "group",
                content: [{
                    elem: "title",
                    content: this.__self._getTextLabel(n)
                }, {
                    elem: "items",
                    content: i
                }]
            })), i.push(this.buildItem(e)), t
        }.bind(this), [])
    }
}), BEM.DOM.decl({
    block: "suggest2",
    modName: "theme",
    modVal: "normal"
}, {
    getPopupWidth: function() {
        return this._input.width()
    }
}), BEM.decl({
    block: "suggest2-view",
    modName: "simple",
    modVal: "yes"
}, {
    _getType: function(t, e) {
        var n = this.__base.apply(this, arguments);
        return "icon" !== n || e.icon ? n : "text"
    },
    _getItemByType: function(t, e, n, i) {
        var o = i.text,
            s = i.mods,
            r = i.js,
            a = i.props,
            c = i.content;
        switch (n) {
            case "fact":
                c.push(o, {
                    elem: "bullet"
                }, {
                    elem: "fact",
                    content: t[2]
                });
                break;
            case "weather":
                c.push(o, {
                    elem: "icon",
                    elemMods: {
                        weather: t[3]
                    }
                }, {
                    elem: "fact",
                    content: t[2]
                });
                break;
            case "traffic":
                c.push(o, {
                    elem: "icon",
                    elemMods: {
                        traffic: t[3]
                    }
                }, {
                    elem: "fact",
                    content: t[2]
                });
                break;
            case "nav":
                r.val = t[1], s.interact = "link", a.url = this.__self._resolveUrl(t[4]), c.push({
                    elem: "text",
                    content: t[3]
                }, {
                    elem: "bullet"
                }, {
                    elem: "fact",
                    content: t[2]
                });
                break;
            case "icon":
                var l = {};
                e.icon.forEach(function(t, e, n) {
                    Array.isArray(t) ? l[t[0]] = t[1] : 0 === e && (l[t] = n[e + 1])
                }), c.push(o, $.extend({
                    elem: "icon",
                    elemMods: {
                        size: "s"
                    }
                }, l)), e.fact && c.push({
                    elem: "fact",
                    content: e.fact
                })
        }
        return this.__base.apply(this, arguments)
    }
}), BEM.DOM.decl({
    block: "suggest2-item",
    modName: "interact",
    modVal: "link"
}, {
    onSelect: function(t) {
        var e = this;
        e.__base.apply(e, arguments);
        var n = e.elem("link");
        if (t || "_self" === n.attr("target")) return function() {
            e._locationChange(n.attr("href"))
        }
    },
    _locationChange: function(t) {
        window.location = t
    },
    valOnSelect: function() {
        return !1
    }
}), BEM.DOM.decl("footer", {
    onSetMod: {
        js: function() {
            this.bindTo("chat-link", "click", function(t) {
                t.preventDefault(), BEM.blocks["chat-script"].openChat()
            })
        }
    }
}), BEM.DOM.decl("redir", {
    onSetMod: {
        js: function() {
            this.abt = this.params.abt, this.requestId = this.params.nonce || BEM.blocks["i-global"].param("nonce"), this.indexCounter = 0, this.slots = "", this.abt.boxes && (this.slots = "/test_buckets=" + this.abt.boxes + "/test_ids=" + this.abt.boxes + "/slots=" + this.abt.boxes), this.send(this.params.events)
        }
    },
    send: function(t) {
        if (t) {
            Array.isArray(t) || (t = [t]);
            var e = Date.now();
            t = t.map(function(t) {
                return this.indexCounter++, {
                    id: t.id,
                    parent_id: t.parent_id || 0,
                    event_index: this.indexCounter,
                    event_type: t.type,
                    user_timestamp: e,
                    path: t.path,
                    vars: t.vars || null
                }
            }, this), (new Image).src = "https://clck.yandex.ru/counter/dtype=bebr/pid=619/session_id=" + this.requestId + "/user_timestamp=" + e + "/events=" + encodeURIComponent(JSON.stringify(t)) + "/user_agent=" + encodeURIComponent(navigator.userAgent) + this.slots + "/*"
        }
    }
}), BEM.DOM.decl("webgl-checker", {
    onSetMod: {
        js: function() {
            var t = this,
                e = BEM.blocks["i-metrika"],
                n = t._hasWebGl() ? "HasWebGL" : "NoWebGL";
            e.reachGoal(n)
        }
    },
    _hasWebGl: function() {
        var t = document.createElement("canvas"),
            e = t.getContext("webgl") || t.getContext("experimental-webgl");
        return Boolean(e)
    }
}),
function() {
    function t(t) {
        var e = this;
        e._pageCode = t, e._subPage = Ya.Rum.makeSubPage(t), e.sendFirstPaint = e.sendFirstPaint.bind(e), e.sendLoad = e.sendLoad.bind(e)
    }
    t.prototype.sendFirstPaint = function() {
        var t = this;
        t._sendTimeMark("2793")
    }, t.prototype.sendLoad = function() {
        var t = this;
        t._sendTimeMark("1724")
    }, t.prototype._sendTimeMark = function(t) {
        var e = this;
        Ya.Rum.sendTimeMark(t, Ya.Rum.getTime(), !1, e._subPage)
    }, window.YwRum = {
        createSubPage: function(e) {
            var n = Ya.Rum._vars.rum_id;
            if (!e) throw new Error("YwRum.createSubPage: argument subPageCode is required");
            return Ya.Rum.makeSubPage ? new t(n + "." + e) : void(console && console.error && console.error("Ya.Rum.makeSubPage not defined yet"))
        }
    }
}(), window.Ya && window.Ya.Rum && (window.BEM && BEM.channel("i-bem").onFirst("start-init", function() {
    Ya.Rum.getSetting("sendBeforeBemInited") && Ya.Rum.sendTimeMark("2418")
}).onFirst("init", function() {
    Ya.Rum.sendTimeMark("2295")
}), function(t, e) {
    function n() {
        O = t.getVarsList(), t.getSetting("sendClientUa") && O.push("1042=" + encodeURIComponent(navigator.userAgent))
    }

    function i() {
        A = O.concat(["143.2129=" + ct])
    }

    function o(t) {
        function e() {
            removeEventListener("DOMContentLoaded", e), removeEventListener("load", e), t()
        }
        "loading" === document.readyState ? (addEventListener("DOMContentLoaded", e), addEventListener("load", e)) : t()
    }

    function s() {
        ct && setTimeout(function() {
            t.sendTimeMark = l, t.sendResTiming = p, t.timeEnd = d;
            for (var e = t._defRes; e.length;) {
                var n = e.shift();
                p(n[0], n[1])
            }
            for (var i = t._defTimes; i.length;) {
                var o = i.shift();
                l(o[0], o[1], !1, o[2])
            }
            Object.keys(ot).forEach(function(t) {
                h(t)
            }), a(), c(), t.getSetting("sendAutoElementTiming") && _t(), x(), "complete" === document.readyState ? r() : addEventListener("load", r)
        }, 0)
    }

    function r() {
        t.getSetting("disableOnLoadTasks") || (removeEventListener("load", r), m(), _(), b(), k(), w())
    }

    function a() {
        var e = Z.domContentLoadedEventStart,
            n = Z.domContentLoadedEventEnd;
        if (0 === e && 0 === n) return void setTimeout(a, 50);
        var i = O.concat(["2129=" + ct, "1036=" + (Z.domainLookupStart - ct), "1037=" + (Z.domainLookupEnd - Z.domainLookupStart), "1038=" + (Z.connectEnd - Z.connectStart), Z.secureConnectionStart && "1383=" + (Z.connectEnd - Z.secureConnectionStart), "1039=" + (Z.responseStart - Z.connectEnd), "1040=" + (Z.responseEnd - Z.responseStart), "1040.906=" + (Z.responseEnd - Z.domainLookupStart), "1310.2084=" + (Z.domLoading - Z.responseStart), "1310.2085=" + (Z.domInteractive - Z.responseStart), "1310.1309=" + (n - e), "1310.1007=" + (e - Z.responseStart), navigator.deviceMemory && "3140=" + navigator.deviceMemory, navigator.hardwareConcurrency && "3141=" + navigator.hardwareConcurrency]);
        Object.keys($).forEach(function(t) {
            t in Z && Z[t] && i.push($[t] + "=" + D(Z[t], ct))
        }), t.vsStart ? (i.push("1484=" + (W[t.vsStart] || 2771)), t.vsChanged && i.push("1484.719=1")) : i.push("1484=" + W.visible), tt && (tt.redirectCount && i.push("1384.1385=" + tt.redirectCount), 1 !== tt.type && 2 !== tt.type || i.push("770.76=" + tt.type)), T(i), P(N, i)
    }

    function c() {
        if (at && (t.getSetting("forcePaintTimeSending") || !t.isVisibilityChanged())) {
            for (var e = J.getEntriesByType("paint"), n = 0; n < e.length; n++) {
                var i = e[n],
                    o = K[i.name];
                o && !lt[i.name] && (lt[i.name] = !0, ut++, l("1926." + o, i.startTime))
            }
            if (ut < Y) try {
                new Q(function(t, e) {
                    c(), e && e.disconnect()
                }).observe({
                    entryTypes: ["paint"]
                })
            } catch (t) {}
        }
    }

    function l(n, i, o, s) {
        i === e && (i = X()), o !== e && o !== !0 || t.mark(n, i);
        var r = I(n);
        if (r.push("207=" + D(i)), u(r, s)) {
            P(L, r), nt[n] = nt[n] || [], nt[n].push(i);
            var a = t._markListeners[n];
            a && a.length && a.forEach(function(t) {
                t(i)
            })
        }
    }

    function u(t, e) {
        if (e) {
            if (e.isCanceled && e.isCanceled()) return !1;
            Object.keys(e).forEach(function(n) {
                "function" != typeof e[n] && t.push(n + "=" + e[n])
            })
        }
        return !0
    }

    function d(t, e) {
        var n = ot[t];
        n && 0 !== n.length && (n.push(X(), e), h(t))
    }

    function h(n, i, o) {
        var s, r, a, c = ot[n];
        if ("undefined" != typeof i ? (r = t.getTime(), s = r - i) : c && (s = c[0], r = c[1], a = c[2]), s !== e && r !== e) {
            var l = I(n);
            l.push("207.2154=" + D(s), "207.1428=" + D(r), "2877=" + D(r - s)), u(l, o) && u(l, a) && (P(j, l), delete ot[n])
        }
    }

    function p(e, n) {
        C(n, function(i) {
            if (i) {
                var o = I(e);
                t.getSetting("sendUrlInResTiming") && o.push("13=" + encodeURIComponent(n)), S(o, i[0]), P(q, o)
            }
        })
    }

    function m() {
        var e = t.getSetting("periodicStatsIntervalMs");
        e || null === e || (e = 15e3), e && (dt = setInterval(f, e)), addEventListener("beforeunload", f)
    }

    function f() {
        var e = !1;
        t._periodicTasks.forEach(function(t) {
            t() && (e = !0)
        }), e || clearInterval(dt)
    }

    function _() {
        if (Q) {
            var e = J.getEntriesByType("navigation");
            g(e);
            var n = J.getEntriesByType("resource");
            g(n);
            try {
                new Q(function(t) {
                    g(t.getEntries())
                }).observe({
                    entryTypes: ["resource", "navigation"]
                })
            } catch (t) {}
            t._periodicTasks.push(y)
        }
    }

    function g(t) {
        if (t && t.length)
            for (var e = it, n = 0; n < t.length; n++) {
                var i = v(t[n]);
                if (i) {
                    var o = i.domain + "-" + i.extension,
                        s = e[o] = e[o] || {
                            count: 0,
                            size: 0
                        };
                    s.count++, s.size += i.size
                }
            }
    }

    function v(t) {
        var e = t.transferSize;
        if (null != e) {
            rt.href = t.name;
            var n = rt.pathname;
            if (0 !== n.indexOf("/clck")) {
                var i = n.lastIndexOf("."),
                    o = "";
                return i != -1 && n.lastIndexOf("/") < i && n.length - i <= 5 && (o = n.slice(i + 1)), {
                    size: e,
                    domain: rt.hostname,
                    extension: o
                }
            }
        }
    }

    function y() {
        var e = t.getSetting("maxTrafficCounters") || 250;
        if (pt >= e) return !1;
        for (var n = Object.keys(it), i = "", o = 0; o < n.length; o++) {
            var s = n[o],
                r = it[s];
            i += encodeURIComponent(s) + "!" + r.count + "!" + r.size + ";"
        }
        if (i.length) {
            pt++;
            var a = O.concat(["d=" + i, "t=" + D(X())]);
            P(V, a)
        }
        return it = {}, pt < e
    }

    function b() {
        if (Q) try {
            new Q(function(t, e) {
                var n = t.getEntries()[0];
                if (n) {
                    var i = n.processingStart - n.startTime;
                    h("first-input", i), e.disconnect()
                }
            }).observe({
                type: "first-input",
                buffered: !0
            })
        } catch (t) {}
    }

    function k() {
        if (Q) {
            var t = new Q(function(t) {
                var e = t.getEntries();
                null == ht && (ht = 0);
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.hadRecentInput || (ht += i.value)
                }
            });
            try {
                t.observe({
                    type: "layout-shift",
                    buffered: !0
                })
            } catch (t) {}
            addEventListener("visibilitychange", function e() {
                if ("hidden" === document.visibilityState) {
                    removeEventListener("visibilitychange", e);
                    try {
                        "function" == typeof t.takeRecords && t.takeRecords(), t.disconnect()
                    } catch (t) {}
                    M()
                }
            }), addEventListener("beforeunload", M)
        }
    }

    function M() {
        if (null != ht) {
            var t = Math.round(1e6 * ht) / 1e6;
            P(z, O.concat("s=" + t)), ht = null
        }
    }

    function w() {
        if (Q && (t.getSetting("forcePaintTimeSending") || !t.isVisibilityChanged())) {
            var e = new Q(function(t) {
                for (var e = t.getEntries(), n = 0; n < e.length; n++) {
                    var i = e[n];
                    mt = i.renderTime || i.loadTime
                }
                ft || (l("largest-loading-elem-paint", mt), ft = !0)
            });
            try {
                e.observe({
                    type: "largest-contentful-paint",
                    buffered: !0
                })
            } catch (t) {}
            addEventListener("visibilitychange", function t() {
                if ("hidden" === document.visibilityState) {
                    removeEventListener("visibilitychange", t);
                    try {
                        "function" == typeof e.takeRecords && e.takeRecords(), e.disconnect()
                    } catch (t) {}
                    E()
                }
            }), addEventListener("beforeunload", E)
        }
    }

    function E() {
        null != mt && (l("largest-contentful-paint", mt), mt = null)
    }

    function x(e, n, i) {
        function o() {
            var i, a = n || s,
                c = X(),
                l = t._tti.events || [],
                u = l.length;
            0 !== u && (i = l[u - 1], a = Math.max(a, Math.floor(i.startTime + i.duration))), c - a >= U ? r(e, a, l) : c - a >= H ? r(e, (n || s) + H, l) : setTimeout(o, 1e3)
        }
        if (t._tti) {
            var s = X(),
                r = function(e, o, r) {
                    var a = {
                        2796.2797: B(r, n),
                        689.2322: D(s)
                    };
                    i && Object.keys(i).forEach(function(t) {
                        a[t] = i[t]
                    }), l(e || "2795", o, !0, a), t._tti.fired = !0
                };
            o()
        }
    }

    function T(t) {
        et && t.push("2437=" + (G[et.type] || 2771), et.downlinkMax !== e && "2439=" + et.downlinkMax, et.effectiveType && "2870=" + et.effectiveType, et.rtt !== e && "rtt=" + et.rtt, et.downlink !== e && "dwl=" + et.downlink)
    }

    function C(t, e) {
        function n() {
            var t = J.getEntriesByName(i);
            return t.length ? e(t) : void(o++ < F ? (setTimeout(n, s), s += s) : e(null))
        }
        if (!at) return e(null);
        st.href = t;
        var i = st.href,
            o = 0,
            s = 100;
        setTimeout(n, 0)
    }

    function B(t, e) {
        return t = t || [], e = e || 0, t.filter(function(t) {
            return t.startTime - e >= -50
        }).map(function(t) {
            var e = t.name ? t.name.split("-").map(function(t) {
                    return t[0]
                }).join("") : "u",
                n = Math.floor(t.startTime),
                i = Math.floor(n + t.duration);
            return e + "-" + n + "-" + i
        }).join(".")
    }

    function I(e) {
        return A.concat(["1701=" + e, t.ajaxStart && "1201.2154=" + D(t.ajaxStart), t.ajaxComplete && "1201.2052=" + D(t.ajaxComplete)])
    }

    function S(t, e) {
        Object.keys($).forEach(function(n) {
            if (n in e) {
                var i = e[n];
                (i || 0 === i) && t.push($[n] + "=" + D(i))
            }
        })
    }

    function D(t, e) {
        return "string" == typeof t ? encodeURIComponent(t) : Math.round(1e3 * (t - (e || 0))) / 1e3
    }

    function P(e, n) {
        var i = encodeURIComponent(window.YaStaticRegion || "unknown");
        n.push("-cdn=" + i);
        var o = n.filter(Boolean).join(",");
        t.send(null, e, o)
    }
    if (!t) throw new Error("Rum: interface is not included");
    if (!t.enabled) return t.getSetting = function() {
        return ""
    }, t.getVarsList = function() {
        return []
    }, void(t.getResourceTimings = t.pushConnectionTypeTo = t.pushTimingTo = t.normalize = t.sendCounter = t.sendDelta = t.sendTimeMark = t.sendResTiming = t.sendTTI = t.makeSubPage = t.sendHeroElement = t.onReady = function() {});
    t.getVarsList = function() {
        var e = t._vars;
        return Object.keys(e).map(function(t) {
            return t + "=" + encodeURIComponent(e[t]).replace(/\*/g, "%2A")
        })
    }, t.setVars = function(e) {
        Object.keys(e).forEach(function(n) {
            t._vars[n] = e[n]
        }), n(), i()
    };
    var O, A, N = "690.1033",
        L = "690.2096.207",
        j = "690.2096.2877",
        R = "690.2096.2892",
        q = "690.2096.2044",
        V = "690.2096.361",
        z = "690.2096.4004",
        F = 10,
        U = 3e3,
        H = 2e4,
        $ = {
            connectEnd: 2116,
            connectStart: 2114,
            decodedBodySize: 2886,
            domComplete: 2124,
            domContentLoadedEventEnd: 2131,
            domContentLoadedEventStart: 2123,
            domInteractive: 2770,
            domLoading: 2769,
            domainLookupEnd: 2113,
            domainLookupStart: 2112,
            duration: 2136,
            encodedBodySize: 2887,
            entryType: 2888,
            fetchStart: 2111,
            initiatorType: 2889,
            loadEventEnd: 2126,
            loadEventStart: 2125,
            nextHopProtocol: 2890,
            redirectCount: 1385,
            redirectEnd: 2110,
            redirectStart: 2109,
            requestStart: 2117,
            responseEnd: 2120,
            responseStart: 2119,
            secureConnectionStart: 2115,
            startTime: 2322,
            transferSize: 2323,
            type: 76,
            unloadEventEnd: 2128,
            unloadEventStart: 2127,
            workerStart: 2137
        },
        W = {
            visible: 1,
            hidden: 2,
            prerender: 3
        },
        G = {
            bluetooth: 2064,
            cellular: 2065,
            ethernet: 2066,
            none: 1229,
            wifi: 2067,
            wimax: 2068,
            other: 861,
            unknown: 836,
            0: 836,
            1: 2066,
            2: 2067,
            3: 2070,
            4: 2071,
            5: 2768
        },
        K = {
            "first-paint": 2793,
            "first-contentful-paint": 2794
        },
        Y = Object.keys(K).length,
        X = t.getTime,
        Q = window.PerformanceObserver,
        J = window.performance || {},
        Z = J.timing || {},
        tt = J.navigation || {},
        et = navigator.connection,
        nt = {},
        it = {},
        ot = t._deltaMarks,
        st = document.createElement("link"),
        rt = document.createElement("a"),
        at = "function" == typeof J.getEntriesByType,
        ct = Z.navigationStart;
    if (n(), i(), t.ajaxStart = 0, t.ajaxComplete = 0, Q) try {
        new Q(function(t, e) {
            var n = t.getEntriesByType("navigation")[0];
            if (n) {
                e && e.disconnect();
                var i = [];
                S(i, n), T(i), P(R, O.concat(i))
            }
        }).observe({
            entryTypes: ["navigation"]
        })
    } catch (t) {}
    o(s), t._getCommonVars = function() {
        return O
    };
    var lt = {},
        ut = 0;
    t.getTimeMarks = function() {
        return nt
    };
    var dt;
    t._periodicTasks = [];
    var ht, pt = 0,
        mt = null,
        ft = !1,
        _t = Q ? function() {
            if (t.getSetting("forcePaintTimeSending") || !t.isVisibilityChanged()) try {
                new Q(function(t) {
                    for (var e = t.getEntries(), n = 0; n < e.length; n++) {
                        var i = e[n];
                        l("element-timing." + i.identifier, i.startTime)
                    }
                }).observe({
                    type: "element",
                    buffered: !0
                })
            } catch (t) {}
        } : function() {};
    t.sendTTI = x, t.sendHeroElement = function(t) {
        l("2876", t)
    }, t._subpages = {}, t.makeSubPage = function(e, n) {
        var i = t._subpages[e];
        "undefined" == typeof i ? t._subpages[e] = i = 0 : t._subpages[e] = ++i;
        var o = !1;
        return {
            689.2322: D("undefined" != typeof n ? n : X()),
            2924: e,
            2925: i,
            isCanceled: function() {
                return o
            },
            cancel: function() {
                o = !0
            }
        }
    }, t._getLongtasksStringValue = B, t.getResourceTimings = C, t.pushConnectionTypeTo = T, t.pushTimingTo = S, t.normalize = D, t.sendCounter = P, t.sendDelta = h, t.sendTrafficData = y, t.finalizeLayoutShiftScore = M, t.finalizeLargestContentfulPaint = E, t.onReady = o
}(Ya.Rum), Ya.Rum.enabled && addEventListener("load", function t() {
    removeEventListener("load", t);
    var e = Ya.Rum;
    if (e.sendTimeMark("1724"), e.getSetting("sendAutoResTiming"))
        for (var n = document.querySelectorAll("script[data-rCid], div[data-rCid]"), i = 0, o = n.length; i < o; i++) {
            var s = n[i],
                r = s.src;
            if (!r) {
                var a = getComputedStyle(s).backgroundImage;
                if (a) {
                    var c = a.match(/^url\(["']?(.*?)["']?\)$/);
                    c && (r = c[1])
                }
            }
            r && e.sendResTiming(s.getAttribute("data-rCid"), r)
        }
})),
function() {
    function t() {
        var t;
        try {
            t = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                t = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {
                t = !1
            }
        }
        return t || "undefined" == typeof XMLHttpRequest || (t = new XMLHttpRequest), t
    }

    function e(t) {
        return /^(?:(?![^:@]+:[^:@\/]*@)[^:\/?#.]+:)?(?:\/\/)?(?:(?:[^:@\/]*(?::[^:@\/]*)?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)/.exec(t || "")[1]
    }

    function n(t) {
        this.cspUrl = t.cspUrl || "//" + (t.cspHost || s) + "/csp", this.reqid = t.reqid, this.login = t.login, this.yandexuid = t.yandexuid, this.checkTimeout = t.checkTimeout || o, this.checkTimeoutId = null, this.from = t.from || r, this.counter = t.counter || a, this.tld = t.tld || c, this.domainExact = t.domainExact || ["yandex." + this.tld, "yastatic.net", "yandex.st"], this.domainSuffix = t.domainSuffix || [".yandex." + this.tld, ".yandex.net", ".yandex.ru"], this.onSendError = t.onSendError, this._onReady = this.check.bind(this);
        var e, n = document.cookie;
        return this.login || (e = n.match(/(?:^|;)\s*yandex_login\s*=\s*([^;]+)/), e && (this.login = e[1].trim())), this.yandexuid || (e = n.match(/(?:^|;)\s*yandexuid\s*=\s*([^;]+)/), e && (this.yandexuid = e[1].trim())), this
    }
    var i = {},
        o = 5e3,
        s = "csp.yandex.net",
        r = "web4",
        a = "690.1893.1894",
        c = "ru";
    n.prototype.start = function() {
        return document.addEventListener("DOMContentLoaded", this._onReady, !1), this
    }, n.prototype.stop = function() {
        return this._removeListener(), document.removeEventListener("DOMContentLoaded", this._onReady), this
    }, n.prototype._removeListener = function() {
        this.checkTimeoutId && (this.removeListenerCallback(), clearTimeout(this.checkTimeoutId))
    }, n.prototype.check = function() {
        if ("withCredentials" in t()) {
            var e = document.documentElement,
                n = function(t) {
                    var e = t.target,
                        n = e.nodeName.toLowerCase();
                    "script" !== n && "object" !== n || this._detect(e)
                }.bind(this);
            return this._detectByElem("script"), this._detectByElem("object"), e.addEventListener("load", n, !0), this.removeListenerCallback = function() {
                e.removeEventListener("load", n, !0)
            }, this._removeListener(), this.checkTimeoutId = setTimeout(this.removeListenerCallback, this.checkTimeout), this
        }
    }, n.prototype._detectByElem = function(t) {
        for (var e, n = document.getElementsByTagName(t), i = 0; i < n.length; i++) e = n[i], this._detect(e)
    }, n.prototype._detect = function(t) {
        if (t.src && !t.checked) {
            t.checked = !0;
            var e = t.src;
            this._filterSrc(e) && this._send(e)
        }
    }, n.prototype._filterSrc = function(t) {
        var n = e(t);
        return this.domainExact.every(function(t) {
            return t !== n
        }) && this.domainSuffix.every(function(t) {
            return t = t.replace(/\./g, "\\."), !new RegExp(t + "$").test(n)
        })
    }, n.prototype._send = function(e) {
        var n = t(),
            i = "from=" + encodeURIComponent(this.from) + "&path=" + encodeURIComponent(this.counter) + "&reqid=" + encodeURIComponent(this.reqid) + "&url=" + encodeURIComponent(e) + "&yandex_login=" + encodeURIComponent(this.login) + "&yandexuid=" + encodeURIComponent(this.yandexuid);
        n.open("POST", this.cspUrl, !0), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.onreadystatechange = function() {
            4 === n.readyState && 200 !== n.status && this.onSendError && this.onSendError(n.status, n.responseText)
        }.bind(this), n.send(i)
    }, i.exports = n, BEM.DOM.decl("detect-scripts", {
        onSetMod: {
            js: {
                inited: function() {
                    var t = this.findBlockOn("i-global"),
                        e = t ? t.params : this.params,
                        n = i.exports,
                        o = e["detect-domains"],
                        s = o.filter(function(t) {
                            return t.indexOf("*") === -1
                        }),
                        r = o.filter(function(t) {
                            return 0 === t.indexOf("*")
                        }).map(function(t) {
                            return t.substr(1)
                        });
                    new n({
                        cspHost: e["detect-host"],
                        from: "weather",
                        tld: e.tld,
                        reqid: e.reqId,
                        domainExact: s,
                        domainSuffix: r
                    }).check()
                }
            }
        }
    })
}(), BEM.DOM.decl("adblock-detector", {
    onSetMod: {
        js: function() {
            var t = {
                    src: "https://static-mon.yandex.net/static/main.js?pid=yandex_pogoda"
                },
                e = this.params.param;
            e && (t.cookie = e), ! function() {
                var e, n = ["weHsigz1BMn0Aw9UCYb3zxjLihjLyxnZAwDUzwq=", "zgv0zwn0x0LoteLorq==", "we1mshr0CfjLCxvLC3q=", "yMvLCMTH", "vu5ltK9xtG==", "zgf0yq==", "C3rLChm=", "y2fSBgjHy2S=", "Aw5MCMfTzq==", "rw1WDhKGy29UzMLNlNnYyW==", "ChvZAa==", "BgvUz3rO", "oYbWyxrOps87igrVBwfPBJ0U", "C3bSAxq=", "r0vu", "weHsihjLCxvLC3qGzxjYB3i=", "C3jJ", "vfjvu1rfrcbysfiGqu5tv0vs", "yMXVy2TLza==", "weHsiefou1DfuG==", "vgLTzw91Da==", "yMXVy2TLCG==", "DMfSDwu=", "C3bIlNj1", "u3rHDhvZoIa=", "y2HHCKnVzgvbDa==", "DgfNCW==", "CNq/CM5Kpte=", "y29TlMfT", "Dhj1C3rLza==", "zNjVBunOyxjdB2rL", "rNvUy3rPB24=", "w29IAMvJDcbbCNjHEv0=", "weHsignVBNn0CNvJDg9YigvYCM9Y", "Aw5PDa==", "CMvTB3zLrxzLBNrmAxn0zw5LCG==", "weHsifjfuvvfu1q=", "y29VA2LL", "CgLK", "rxjYB3iGD2HPBguGC3vIC2nYAwjPBMCGre9nq29UDgvUDeXVywrLza==", "zg9ty3jVBgW=", "mI4XlJa=", "C2vUzejLywnVBG==", "C2vSzG==", "yMX0C3i=", "yNjVD3nLCG==", "zwXLBwvUDa==", "B25LCNjVCG==", "zxzLBNq=", "vw5RBM93BG==", "zxHWAxjLCW==", "AgfZt3DUuhjVCgvYDhK=", "Ag9ZDg5HBwu=", "Dg9gAxHLza==", "ywfIx2rLDgvJDa==", "D2L0AenYzwrLBNrPywXZ", "C3rHDhvZvgv4Da==", "B3bLBG==", "u3rYAw5N", "sLnptG==", "zxzLBNroyw1L", "zgv4lM5LDc9HzhzL", "zg9JDw1LBNrfBgvTzw50", "oYbtyw1Lu2L0zt1oB25LoYbZzwn1CMu=", "Ahr0Chm6lY9ZDgf0", "AwmTBw9UlNLHBG==", "rgf0zq==", "y29TlNrY", "zgv2AwnL", "veLnru9vva==", "sgvHzgvYigXLBMD0AcbKB2vZBID0ig1HDgnO", "AhjLzG==", "y29TCgXLDgu=", "ChjVDg90ExbL", "Bg9HzgLUzW==", "su5msu5f", "CMvHzhLtDgf0zq==", "u1rbuLq=", "yKHwA1KYrt0=", "werVBwfPBLjLCxvLC3q=", "yMLUza==", "C2v0vgLTzw91Da==", "y29UDgv4Da==", "yNrVyq==", "Dg9vventDhjPBMC=", "Bg9JywXtDg9YywDL", "y28UAwW=", "y29TlMDL", "DMvYC2LVBG==", "Aw4UDwe=", "zg9JDw1LBNrnB2rL", "ywrKAxrPB25HBa==", "Bg9JyxrPB24=", "BMfTzq==", "ywrKrxzLBNrmAxn0zw5LCG==", "CMvZCg9UC2vuzxH0", "oYbLEhbPCMvZpq==", "ic0G", "Dg9W", "zxzLBNrFzgv0zwn0x0LoteLorq==", "BMf2AwDHDg9Y", "y29UDgvUDc1Szw5NAhq=", "C2XPy2u=", "C2vYDMLJzq==", "DgLTzxn0yw1W", "yMvMB3jLDw5SB2fK", "y3LJywrH", "y2fSBa==", "ue9tva==", "C2vUza==", "BxnRlNj1", "Aw5KzxHpzG==", "BgfIzwXZ", "y2XLyxjuAw1LB3v0", "DgLTzw91Da==", "B25SB2fK", "zxzLBNruExbL", "BwvZC2fNzq==", "Dg9tDhjPBMC=", "z2v0q29TChv0zwrtDhLSzq==", "weHsievsuKjbq0S=", "re9nq29UDgvUDeXVywrLza==", "tNvTyMvY", "re9nieXpqurfra==", "re9difjfqurz", "tK9ux0jmt0nlruq=", "AM9PBG==", "C3rHy2S=", "BhvKy2e=", "C2v0sxrLBq==", "C3rYAw5NAwz5", "DgLTzq==", "zNvUy3rPB24=", "zg9TywLU", "z2v0uMvZCg9UC2vizwfKzxi=", "CgfNzwHPzgu="];
                e = n,
                    function(t) {
                        for (; --t;) e.push(e.shift())
                    }(272);
                var i = function(t, e) {
                    var o = n[t = +t];
                    void 0 === i.rxwhFs && (i.SPtpzv = function(t) {
                        for (var e = function(t) {
                                for (var e, n, i = String(t).replace(/=+$/, ""), o = "", s = 0, r = 0; n = i.charAt(r++); ~n && (e = s % 4 ? 64 * e + n : n, s++ % 4) && (o += String.fromCharCode(255 & e >> (-2 * s & 6)))) n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(n);
                                return o
                            }(t), n = [], i = 0, o = e.length; i < o; i++) n += "%" + ("00" + function(t, e) {
                            return " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(t[e]) + 32
                        }(e, i).toString(16)).slice(-2);
                        return decodeURIComponent(n)
                    }, i.hbLtoG = {}, i.rxwhFs = !0);
                    var s = i.hbLtoG[t];
                    return void 0 === s ? (o = i.SPtpzv(o), i.hbLtoG[t] = o) : o = s, o
                };
                ! function(t, e, n) {
                    function o(t) {
                        var e = p,
                            n = {};
                        n.d = t, n.t = r() - P, D[e("0xb")](n)
                    }

                    function s(t) {
                        return typeof t === p("0x85")
                    }

                    function r() {
                        var e = p;
                        return t[e("0x7b")](new(t[e("0x43")]))
                    }

                    function a(e, n, i) {
                        var o, s, a = p;
                        try {
                            t[a("0x56")] && (i && (s = p, o = (24e5 * (r() / 24e5)[s("0x36")]())[s("0x77")](36)[s("0x67")](0, 10), n = t[a("0x54")](o) + T + t[a("0x54")](function(e, n) {
                                for (var i = p, o = [], s = 0; s < e[i("0xc")]; s++) {
                                    var r = e[i("0x1a")](s) ^ n[i("0x1a")](s % n[i("0xc")]);
                                    o[i("0xb")](t[i("0x3b")][i("0x1f")](r))
                                }
                                return o[i("0x7f")]("")
                            }(n, o))), t[a("0x56")][a("0x82")](e, n))
                        } catch (t) {}
                    }

                    function c(t) {
                        var e = p("0x2a");
                        B && B(t, e), a(E, e)
                    }

                    function l(t, e) {
                        var n = p;
                        return e ? t[n("0xe")](".")[n("0x67")](-e)[n("0x7f")](".") : t
                    }

                    function u(n, i) {
                        function o() {
                            for (var t = u, n = 0; n < g[t("0xc")]; n++) {
                                var i = g[n];
                                e[t("0x26")] = i[t("0x5e")] + "=" + i[t("0x17")] + t("0x61") + i[t("0x33")] + t("0xd") + i[t("0x86")] + t("0x40")
                            }
                        }
                        var u = p,
                            d = r(),
                            h = new(t[u("0x43")])(d + 36e5 * m[b])[u("0x55")](),
                            g = [],
                            v = l(t[u("0x5d")][u("0x35")], 2); - 1 !== f[u("0x70")](v) && (v = l(t[u("0x5d")][u("0x35")], 3));
                        for (var k = m[y], M = 0; M < k[u("0xc")]; M++) {
                            var E = {};
                            E[u("0x5e")] = k[M], E[u("0x17")] = 1, E[u("0x33")] = h, E[u("0x86")] = v, g[u("0xb")](E)
                        }
                        var T, B, I = function(t) {
                            for (var n = p, i = e[n("0x26")][n("0xe")]("; "), o = 0; o < i[n("0xc")]; o++) {
                                var s = i[o][n("0xe")]("=");
                                if (s[0] === t) return s[n("0x67")](1)[n("0x7f")]("=")
                            }
                            return null
                        }(w);
                        I && (e[u("0x26")] = w + "=" + I + u("0xd") + v + u("0x40"), (T = {})[u("0x5e")] = w, T[u("0x17")] = I, T[u("0x33")] = new(t[u("0x43")])(0)[u("0x55")](), T[u("0x86")] = v, g[u("0xb")](T));
                        try {
                            t[u("0x5f")](u("0x6a"), o), t[u("0x5f")](u("0x0"), o)
                        } catch (t) {
                            o()
                        }
                        try {
                            ! function(e, n) {
                                var i = p,
                                    o = {};
                                o[i("0x59")] = i("0x2a"), o[i("0x2f")] = e, o[i("0x5c")] = n, o[i("0x9")] = t[i("0x63")] !== t[i("0x2c")], o[i("0x7")] = D;
                                var a = {};
                                a[i("0x2e")] = i("0x32"), a[i("0x45")] = i("0x32"), a[i("0x16")] = i("0x4c"), a[i("0x27")] = i("0x32"), a[i("0x2f")] = "i0", a[i("0x59")] = "1";
                                var c = {};
                                c[i("0x64")] = 1;
                                var l = {};
                                l[i("0x6")] = o, l[i("0x71")] = a, l[i("0x1b")] = c, l[i("0x5d")] = t[i("0x5d")][i("0x48")], l[i("0x69")] = r(), l[i("0x68")] = i("0x37"), l[i("0x3d")] = i("0x2"), l[i("0x75")] = i("0x31"), l[i("0x17")] = 1, l[i("0x59")] = "1";
                                var u, d = l,
                                    h = t[i("0x3c")][i("0x83")](d);
                                s(t[i("0x65")][i("0x2b")]) ? t[i("0x65")][i("0x2b")](C, h) : ((u = new _)[i("0x3a")](i("0x6d"), C, !0), u[i("0x6e")](h))
                            }(n, i = i || ""), a(x, [(new(t[u("0x43")]))[u("0x55")](), u("0x5"), n, i, t[(B = p)("0x5d")] ? typeof t[B("0x5d")][B("0x77")] === B("0x85") ? t[B("0x5d")][B("0x77")]() : t[B("0x5d")][B("0x48")] || "" : ""][u("0x7f")]("\n"), !0)
                        } catch (t) {}
                        var S = {};
                        S[u("0x13")] = !0, S[u("0x16")] = u("0x5"), c(S)
                    }

                    function d(t, e, n) {
                        var i = p,
                            o = new _;
                        if (0 !== o[i("0x4d")]) throw new Error(i("0x22"));
                        if (o[i("0x3a")](i("0xf"), t, !0), 1 !== o[i("0x4d")] || o[i("0x6e")] !== _[i("0x4a")][i("0x6e")]) throw new Error(i("0x1"));
                        o[i("0x38")] = !0, o[i("0x74")] = function() {
                            e(o)
                        }, o[i("0x30")] = function() {
                            var t = i;
                            n(t("0x10"), t("0x19") + o[t("0x39")])
                        }, o[i("0x6e")]()
                    }
                    var h, p = i,
                        m = {};
                    for (h in n) n[p("0x34")](h) && (m[h] = n[h]);
                    var f = [p("0x44"), p("0x58"), p("0x1d"), p("0x57"), p("0x6f"), p("0x18"), p("0x5a")],
                        _ = t[p("0x50")] || t[p("0x3")],
                        g = p("0x11"),
                        v = p("0x1e"),
                        y = p("0x26"),
                        b = p("0x84"),
                        k = p("0x53"),
                        M = p("0x8"),
                        w = p("0x6b"),
                        E = p("0x4"),
                        x = p("0x81"),
                        T = p("0x4f"),
                        C = [p("0x41"), p("0x42"), p("0x3e"), p("0x1c")][p("0x7f")]("");
                    m[y] = m[y] || p("0x2d");
                    try {
                        ({})[p("0x77")][p("0x6c")](m[y]) !== p("0x21") && (m[y] = [m[y]])
                    } catch (t) {}
                    m[b] = m[b] || 336, m[k] = m[k] || {};
                    var B = m[M];
                    if (m[M] = c, m[g]) {
                        var I = m[g],
                            S = m[v],
                            D = [],
                            P = r();
                        try {
                            if (!s(t[p("0x5f")]) || !s(t[p("0x78")]) || !s(t[p("0x20")][p("0x4a")][p("0x51")]) || e[p("0x5b")] && e[p("0x5b")] <= 10) {
                                var O = {};
                                return O[p("0x13")] = !1, O[p("0x16")] = p("0x7e"), c(O)
                            }
                        } catch (t) {}
                        var A, N, L, j, R, q = null;
                        m[p("0x73")] && (A = function() {
                                var t = p;
                                o(t("0x46")), u(t("0x15"))
                            }, N = 2e4, L = r(), j = null, R = !1, function e() {
                                var n = i;
                                R || (r() - L >= N ? A() : j = t[n("0x52")](function() {
                                    e()
                                }, 100))
                            }(), q = function() {
                                R = !0, t[i("0x72")](j)
                            }),
                            function(t) {
                                var n = p;
                                if (o(n("0x4e")), e[n("0x4d")] === n("0x49") || e[n("0x4d")] !== n("0x4b") && !e[n("0x3f")][n("0x29")]) o(n("0x7d")), t();
                                else try {
                                    e[n("0x5f")] && e[n("0x5f")](n("0x7a"), function i() {
                                        var s = n;
                                        o(s("0x7c")), e[s("0x24")](s("0x7a"), i), t()
                                    })
                                } catch (t) {
                                    o(n("0x28")), u(t && t[n("0x80")])
                                }
                            }(function() {
                                var n = p;
                                try {
                                    var i = r();
                                    o(n("0x25")), d(I, function(i) {
                                        var s = n;
                                        try {
                                            q && q(), o(s("0x14"));
                                            var r = t[s("0x7b")](i[s("0x87")](s("0x66"))),
                                                a = i[s("0x60")][s("0xc")];
                                            if (!r || r < 32e3 || r !== a) return u(s("0x47"), r + s("0x62") + a), 0;
                                            new(t[s("0x20")])(i[s("0x60")])[s("0x6c")](m[k]), m[k][s("0x23")](t, e, m)
                                        } catch (t) {
                                            u(t && t[s("0x76")])
                                        }
                                    }, function(t, e) {
                                        var s, a = n;
                                        try {
                                            q && q(), o(a("0x79")), r() - i < 2e3 ? S ? d(S, function() {
                                                o(a("0x12")), u(t, e)
                                            }, function() {
                                                var t = a,
                                                    e = {};
                                                e[t("0x13")] = !1, e[t("0x16")] = t("0x7e"),
                                                    c(e)
                                            }) : u(t, e) : ((s = {})[a("0x13")] = !1, s[a("0x16")] = a("0x7e"), c(s))
                                        } catch (t) {
                                            u(t && t[a("0x76")])
                                        }
                                    })
                                } catch (t) {
                                    u(t && t[n("0x80")])
                                }
                            })
                    } else u(p("0xa"))
                }(window, document, t)
            }()
        }
    }
}), BEM.DOM.decl("my-location", {
    onSetMod: {
        js: function() {
            this.lang = BEM.I18N.lang(), this.initMod = this.getMod("type"), this.serviceRoot = BEM.blocks["i-global"].param("service-root"), this._tankerErrorKeyPrefix = this._tankerErrorKeyPrefix || "geolocation-error-", this._metrikaCounter = BEM.blocks["i-metrika"], this._attachEvents()
        }
    },
    _attachEvents: function() {
        var t = ["click", this._getPosition];
        this.params.clicker && t.unshift(this.elem(this.params.clicker)), this.bindTo.apply(this, t)
    },
    _getPosition: function(t, e) {
        var n = this;
        e = e || {}, n._reachGoal(e.reachGoalEvent || "click")._startProcess(), BEM.blocks["i-geolocation"].updateLocation(!1, {
            isGeolocationExp: n.params.isGeolocationExp
        }).then(function(t) {
            n._reachGoal("success"), window.location.href = n._getUrl(t.geoObject, __assign(__assign({}, t.coords), {
                isGeolocationExp: n.params.isGeolocationExp
            }))
        }).fail(n._error.bind(n))
    },
    _getUrl: function(t, e) {
        var n = this,
            i = $.queryParam("lang"),
            o = $.queryParam("clid"),
            s = $.cookie("yandex_gid"),
            r = $.cookie("ygu"),
            a = BEM.blocks["i-global"].param("rid"),
            c = {
                lat: e.latitude,
                lon: e.longitude
            };
        if (i && (c.lang = i), o && (c.clid = o), e.isGeolocationExp && !r && s) {
            var l = t.locality && t.locality.slug;
            return a === Number(s) ? l ? n.serviceRoot + "/" + l + "?" + $.param(c) : n.serviceRoot + "/" + s + "?" + $.param(c) : n.serviceRoot + "/" + (l ? l : s)
        }
        return t.locality && t.locality.slug ? n.serviceRoot + "/" + t.locality.slug + "?" + $.param(c) : n.serviceRoot + "?" + $.param(c)
    },
    _startProcess: function() {
        "success" === this.getMod("type") && this.setMod("progress-after-success"), this.setMod("type", "progress")
    },
    _error: function(t) {
        var e = this;
        e._reachGoal("error")._reachGoal("error-" + t.message), e._showErrorMessage(e._errorCodeToMessageCode(t.message))
    },
    _errorCodeToMessageCode: function(t) {
        switch (t) {
            case "permission-denied":
            case "geolocation-timeout":
                return "disable";
            case "offline":
            case "geo-object-error":
            case "gpsave-error":
                return "network";
            default:
                return "unknown"
        }
    },
    _showErrorMessage: function(t) {},
    _reachGoal: function(t) {
        var e = this;
        return e._metrikaCounter.reachGoal("my-location." + t), e
    }
}), BEM.DOM.decl("my-location", {
    onSetMod: {
        js: function() {
            var t = this;
            t.__base.apply(t, arguments), t._spin = t.findBlockInside("spin2"), t._$text = t.elem("text"), t._closeErrorPopup = t._closeErrorPopup.bind(t)
        }
    },
    _getPosition: function() {
        var t = this;
        t._$text.html(t.params.progressText || BEM.I18N("interface-desktop", "clarify-my-location-progress")), t._spin && (t.domElem.addClass("my-location_padded"), t._spin.setMod("progress", "yes")), t.__base.apply(t, arguments)
    },
    _showErrorMessage: function(t) {
        var e = this;
        e._$text.html(e.params.defaultText || BEM.I18N("interface-desktop", "clarify-my-location")), e.setMod("type", "error"), e.unbindFrom("click"), e._popup || (e._popup = e.findBlockInside("tooltip"));
        var n = "disable" === t,
            i = BEM.I18N("interface-desktop", e._tankerErrorKeyPrefix + (n ? "disabled" : t)),
            o = n ? 8e3 : 5e3,
            s = {
                message: i
            };
        "disable" === t && (o = 8e3, s.manualLink = e.params.manualLink);
        var r = $(BH.apply(blocks.exec("popup-content_type_geolocation-" + (n ? "disabled" : "error"), s)));
        r.bem("popup-content").findBlockInside("button2_popup-close").bindTo("click", e._closeErrorPopup), e._spin && (e.domElem.removeClass("my-location_padded"), e._spin.delMod("progress")), e._popup.setOwner(e.domElem).setContent(r).setMod("shown", "yes"), setTimeout(e._closeErrorPopup, o)
    },
    _closeErrorPopup: function() {
        var t = this;
        t._popup.delMod("shown"), t.bindTo("click", t._getPosition)
    }
}), BEM.DOM.decl("i-geolocation", {}, {
    get: function(t, e) {
        if (1 === arguments.length && (e = t, t = {}), t = $.extend({
                enableHighAccuracy: !0,
                timeout: 15,
                cacheTime: 15
            }, t), t.timeout *= 1e3, t.maximumAge = 1e3 * t.cacheTime * 60, delete t.cacheTime, "geolocation" in navigator) {
            var n = !1,
                i = setTimeout(function() {
                    n = !0, e({
                        error: 4
                    })
                }, t.timeout + 300);
            navigator.geolocation.getCurrentPosition(function(t) {
                n || (clearTimeout(i), e(t))
            }, function(t) {
                n || (clearTimeout(i), e({
                    error: t.code
                }))
            }, t)
        } else e({
            error: 0
        })
    }
}), BEM.decl("i-geolocation", {}, {
    _gpSaveUrlDefault: "/gpsave",
    _gpSaveUrlMeteum: "/front/gpsave",
    _locationCookieAgeThreshold: 9e5,
    _locatingProgress: null,
    updateLocation: function(t, e) {
        var n = this;
        return n._getLocation().then(function(i) {
            return n._saveLocationToCookie(i.coords, t, e).then(function() {
                return i
            })
        })
    },
    isLocationCookieTooOld: function() {
        var t = 1e3 * (BEM.blocks["i-global"].param("laasTimestamp") || 0),
            e = Math.abs(Date.now() - t);
        return e > this._locationCookieAgeThreshold
    },
    getGeolocationPermissionStatus: function() {
        var t = $.Deferred();
        return "permissions" in navigator ? navigator.permissions.query({
            name: "geolocation"
        }).then(function(e) {
            t.resolve(e.state || e.status)
        }).catch(function(e) {
            t.reject(e)
        }) : t.resolve("no_info"), t.promise()
    },
    _getLocation: function() {
        return this._getCurrentPosition().then(this._testCoordsRelevance).then(this._normalizeCoordsPrecision).then(this._getGeoObject)
    },
    _getEndpoint: function() {
        return BEM.blocks["i-global"].param("isMeteum") ? this._gpSaveUrlMeteum : this._gpSaveUrlDefault
    },
    _saveLocationToCookie: function(t, e, n) {
        var i = this,
            o = 1,
            s = {
                device: o,
                format: "json",
                lat: t.latitude,
                lon: t.longitude,
                lang: BEM.blocks["i-global"].param("lang"),
                precision: t.accuracy || 5e3,
                persistent: 0,
                sk: BEM.blocks["i-global"].param("secret-key")
            };
        e || (s.mobile = 1, s.force_region_change = 1), n && n.isGeolocationExp && (s.force_region_change = 0);
        var r = $.Deferred();
        return $.get(i._getEndpoint(), s).done(function(t) {
            t.error ? r.reject(new Error({
                sk_check_failed: "gpsave-sk-check-failed",
                bad_precision: "gpsave-bad-precision"
            } [t.error] || "gpsave-reported-error")) : r.resolve()
        }).fail(function() {
            navigator.onLine === !1 ? r.reject(new Error("offline")) : r.reject(new Error("gpsave-error"))
        }), r.promise()
    },
    _positionResolver: function(t, e) {
        var n = this;
        navigator.geolocation.getCurrentPosition(t.resolve, function(e) {
            t.reject(n._normalizePositionError(e))
        }, e)
    },
    _getCurrentPosition: function() {
        var t = this;
        if (this._locatingProgress) return this._locatingProgress;
        var e = $.Deferred();
        this._positionResolver(e, {
            timeout: 5e3,
            enableHighAccuracy: !0,
            maximumAge: 1
        });
        var n = setTimeout(function() {
            t._positionResolver(e, {
                timeout: 0,
                enableHighAccuracy: !1,
                maximumAge: 1 / 0
            })
        }, 5100);
        return e.always(function() {
            t._locatingProgress = null, clearTimeout(n)
        }), this._locatingProgress = e.promise(), this._locatingProgress
    },
    _normalizePositionError: function(t) {
        return new Error({
            1: "permission-denied",
            2: "position-unavailable",
            3: "geolocation-timeout"
        } [t.code] || "unknown-error")
    },
    _testCoordsRelevance: function(t) {
        var e = 2e3,
            n = 9e5,
            i = new Date("2001-01-01").getTime(),
            o = (new Date).getTime(),
            s = !(t.coords.accuracy > e),
            r = !(o - t.timestamp > n && o - t.timestamp - i > n);
        return s ? r ? t : $.Deferred().reject(new Error("irrelevant-timestamp")) : $.Deferred().reject(new Error("irrelevant-accuracy"))
    },
    _normalizeCoordsPrecision: function(t) {
        var e = $.extend({}, t.coords);
        return e.latitude = Number(parseFloat(e.latitude).toFixed(6)), e.longitude = Number(parseFloat(e.longitude).toFixed(6)), e
    },
    _getGeoObject: function(t) {
        var e = $.Deferred();
        return $.get(BEM.blocks["i-global"].param("service-root") + "/front/geo-object", {
            lat: t.latitude,
            lon: t.longitude
        }).done(function(n) {
            e.resolve({
                geoObject: n,
                coords: t
            })
        }).fail(function(t) {
            404 === Number(t.status) ? e.reject(new Error("no-geoid-for-coords")) : navigator.onLine === !1 ? e.reject(new Error("offline")) : e.reject(new Error("geo-object-error"))
        }), e.promise()
    }
}), BEM.DOM.decl("button", {
    onSetMod: {
        js: {
            inited: function() {
                var t = this.isDisabled(),
                    e = this.domElem;
                (this._href = e.attr("href")) && t && e.removeAttr("href")
            }
        },
        disabled: function(t, e) {
            var n = this.domElem;
            e && this.delMod("hovered"), this._href && (e ? n.removeAttr("href") : n.attr("href", this._href)), this.afterCurrentEvent(function() {
                n && n.prop("disabled", e)
            })
        },
        pressed: function(t, e) {
            return !this.hasMod("disabled") && void this.trigger(e ? "press" : "release")
        }
    },
    isDisabled: function() {
        return this.hasMod("disabled", "yes")
    },
    url: function(t) {
        return "undefined" == typeof t ? this._href : (this._href = t, this.isDisabled() || this.domElem.attr("href", t), this)
    },
    getUrl: function() {
        return this.url()
    },
    setUrl: function(t) {
        return this.url(t)
    },
    _onPointerpress: function(t) {
        this.setMod("pressed", "yes").bindToDoc("pointerrelease", this._onPointerrelease)
    },
    _onPointerrelease: function(t) {
        this.delMod("pressed").unbindFromDoc("pointerrelease")
    },
    _onClick: function(t) {
        this.isDisabled() ? t.preventDefault() : this.afterCurrentEvent(function() {
            this.domElem && this.trigger("click")
        })
    }
}, {
    live: function() {
        this.liveBindTo("pointerclick", function(t) {
            this._onClick(t)
        }).liveBindTo("pointerpress", function(t) {
            this.isDisabled() || this._onPointerpress(t)
        })
    }
}), BEM.DOM.decl("button", {
    onSetMod: {
        focused: {
            yes: function() {
                return !this.isDisabled() && (this.bindToWin("unload", function() {
                    this.delMod("focused")
                }).bindTo("keydown", this._onKeyDown), this._isControlFocused() || this._getControl().focus(), void this.trigger("focus"))
            },
            "": function() {
                var t = BEM.blocks["i-ua"].opera < 13;
                this.unbindFromWin("unload").unbindFrom("keydown"), (t || document.hasFocus()) && this._isControlFocused() && this._getControl().blur(), this.trigger("blur")
            }
        },
        disabled: function(t, e) {
            this.__base.apply(this, arguments), e && (this.delMod("focused"), this.domElem.keyup())
        },
        hovered: function(t, e) {
            return !this.isDisabled() && void(!e && this.delMod("pressed"))
        },
        pressed: function() {
            return this.isDisabled() || this.setMod("focused", "yes"), this.__base.apply(this, arguments)
        }
    },
    _getControl: function() {
        return this.elem("control").length && this.elem("control") || this.domElem
    },
    _isControlFocused: function() {
        return this.containsDomElem($.dom.getActiveElement())
    },
    _onKeyDown: function(t) {
        var e = BEM.blocks.keycodes,
            n = t.keyCode;
        !this._keyDowned && e.is(n, "ENTER", "SPACE") && (this._keyDowned = !0, this.setMod("pressed", "yes").bindTo("keyup", function() {
            this.delMod("pressed").unbindFrom("keyup"), delete this._keyDowned, n === e.SPACE && this.domElem.attr("href") && (document.location = this.domElem.attr("href"))
        }))
    },
    destruct: function() {
        this.delMod("focused"), this.__base.apply(this, arguments)
    }
}, {
    live: function() {
        return this.liveBindTo("pointerover pointerout", function(t) {
            this.isDisabled() || this.domElem[0].contains(t.relatedTarget) || this.toggleMod("hovered", "yes", "pointerover" === t.type)
        }).liveBindTo("focusin focusout", function(t) {
            this.toggleMod("focused", "yes", "focusin" === t.type)
        }), 8 === BEM.blocks["i-ua"].ie && this.liveBindTo("mouseup mouseout", function(t) {
            this.domElem.height()
        }), this.__base()
    }
}), BEM.DOM.decl({
    name: "button",
    modName: "pseudo",
    modVal: "yes"
}, {
    _onClick: function(t) {
        this.__base.apply(this, arguments), this._href && t.preventDefault()
    }
}), BEM.DOM.decl({
    block: "button2",
    modName: "type",
    modVal: "link"
}, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments), this._url = this.params._url || this.domElem.attr("href")
            }
        },
        disabled: {
            "": function() {
                this.__base.apply(this, arguments), this.domElem.attr("tabindex", this.params._tabindex).attr("href", this._url)
            },
            yes: function() {
                this.__base.apply(this, arguments), void 0 !== this._url && this.domElem.attr("tabindex", -1), this.domElem.removeAttr("href")
            }
        }
    },
    getUrl: function() {
        return this._url
    },
    setUrl: function(t) {
        return this._url = t, this.hasMod("disabled") || this.domElem.attr("href", t), this
    },
    getDefaultParams: function() {
        return $.extend(this.__base(), {
            pressKeys: ["ENTER"]
        })
    }
}), BEM.DOM.decl({
    block: "button2",
    modName: "type",
    modVal: "link"
}, {}, {
    live: function() {
        return this.liveBindTo("dragend", function(t) {
            this.hasMod("type", "link") && !this.hasMod("disabled") && this.delMod("pressed")
        }), this.__base()
    }
}),
function() {
    BEM.DOM.decl("debug-ad", {
        onSetMod: {
            js: function() {
                this._cookieKey = "yw_debug_ad", this._visibilityClass = "debug-ad-visible", this._visible = this._checkVisibility(), this._visible && this._setVisible(), this.bindTo("click", this._toggleDebugPanel)
            }
        },
        _toggleDebugPanel: function() {
            this._visible ? this._setInvisible() : this._setVisible()
        },
        _checkVisibility: function() {
            return Boolean($.cookie(this._cookieKey))
        },
        _setVisible: function() {
            var t = new Date;
            t.setTime(t.getTime() + 2592e6), $.cookie(this._cookieKey, "1", {
                path: BEM.blocks["i-global"].param("service-root"),
                expires: t
            }), document.body.classList.add(this._visibilityClass), this._visible = !0, this.setMod("active", "yes")
        },
        _setInvisible: function() {
            $.cookie(this._cookieKey, null, {
                path: BEM.blocks["i-global"].param("service-root")
            }), document.body.classList.remove(this._visibilityClass), this._visible = !1, this.delMod("active")
        }
    })
}(), BEM.decl("chat-script", {}, {
    openChat: function() {
        var t = "79e29205-4ada-9321-4d10-d7c3d79c5d04";
        try {
            new Ya.ChatWidget({
                guid: t,
                buttonText: "",
                title: BEM.I18N("interface-common", "chat"),
                theme: "hidden",
                collapsedDesktop: "never",
                collapsedTouch: "never",
                autocloseable: !0
            }).showChat({
                guid: t
            })
        } catch (t) {
            window.Ya && Ya.Rum && Ya.Rum.logError({
                message: "Can't open chat",
                additional: {
                    error: t
                }
            })
        }
    }
}), BEM.DOM.decl("gdpr", {
    onSetMod: {
        js: function() {
            var t = this;
            t.GDPR_COOKIE_NAME = "gdpr_weather", t.GDPR_COOKIE_NAME_METRIKA = "gdpr", t.IS_GDPR_COOKIE_NAME = "is_gdpr";
            var e = t.elem("button", "settings", "step-2"),
                n = t.elem("button", "settings", "accept-all"),
                i = t.elem("button", "settings", "accept-selected"),
                o = t.elem("settings", "step", "1"),
                s = t.elem("settings", "step", "2");
            e.on("click", function(e) {
                e.preventDefault(), t.toggleMod(o, "invisible", "yes", "no"), t.toggleMod(s, "invisible", "yes", "no")
            }), n.on("click", function() {
                t._setAcceptedCookies(0), t.setMod("hidden", "yes")
            }), i.on("click", function() {
                t._setAcceptSelected(), t.setMod("hidden", "yes")
            })
        }
    },
    _setAcceptSelected: function() {
        var t = this.elem("checkbox", "type", "analytic")[0].checked,
            e = this.elem("checkbox", "type", "other")[0].checked;
        t && e ? this._setAcceptedCookies(0) : t && !e ? this._setAcceptedCookies(2) : !t && e ? this._setAcceptedCookies(3) : this._setAcceptedCookies(1)
    },
    _setAcceptedCookies: function(t) {
        var e = this,
            n = new Date;
        n.setMonth(n.getMonth() + 12);
        var i = t.toString(),
            o = n.toUTCString();
        [e.GDPR_COOKIE_NAME, e.GDPR_COOKIE_NAME_METRIKA].forEach(function(t) {
            e._setCookie(t, i, {
                expires: o
            })
        }), e._validateCookies()
    },
    _setCookie: function(t, e, n) {
        var i = n.expires,
            o = n.path,
            s = void 0 === o ? "/" : o,
            r = this._getCookieValue(t, e, i, s);
        document.cookie = t + "=" + r
    },
    _getCookieValue: function(t, e, n, i) {
        var o = e;
        return i && (o += "; path=" + i), n && (o += "; expires=" + n), o
    },
    _getCookie: function(t) {
        var e, n = null === (e = document.cookie) || void 0 === e ? void 0 : e.match(new RegExp("(^|;\\s*)" + t + "=([^;]+)"));
        if (n && n[2]) return n[2]
    },
    _validateCookies: function() {
        var t = this;
        document.cookie.split(";").map(function(t) {
            return {
                name: t.split("=")[0].trim()
            }
        }).forEach(function(e) {
            var n = e.name,
                i = t._cfg.find(function(t) {
                    return t.name === n
                });
            i && !t._isGdprAllowed(i.type) && t._removeCookie(n)
        })
    },
    _removeCookie: function(t) {
        this._setCookie(t, "", {
            expires: new Date(0).toUTCString()
        })
    },
    _isGdprAllowed: function(t) {
        var e = this;
        if (!e._isGdprCountry()) return !0;
        var n = e._getGdprFromCookies();
        return "undefined" == typeof n ? "tech" === t : "all" === n || n === t
    },
    _getGdprFromCookies: function() {
        var t = this._getCookie(this.GDPR_COOKIE_NAME);
        if ("undefined" != typeof t) return Number(t)
    },
    _isGdprCountry: function() {
        return 0 !== Number(this._getCookie(this.IS_GDPR_COOKIE_NAME))
    },
    _cfg: [{
        name: "yw_cmpr",
        type: "other",
        description: "List of cities for compare"
    }, {
        name: "yw_cmpr_section",
        type: "other",
        description: "Name of folded section on page"
    }, {
        name: "yw_cmpr_idx",
        type: "other",
        description: "Index of folded section on page"
    }, {
        name: "yw_rr_shwn",
        type: "analytic",
        description: "Flag of hidden dialog about rain at real-time"
    }, {
        name: "yw_fav",
        type: "other",
        description: "List of favorites locations"
    }, {
        name: "yw_ub_a4",
        type: "other",
        description: "Flag of hidden dialog about deprecated browser"
    }, {
        name: "Session_id",
        type: "tech",
        description: "authorization"
    }, {
        name: "yp",
        type: "other",
        description: "portal_container"
    }, {
        name: "yw_spc",
        type: "tech",
        description: "Allergens alert configuration"
    }, {
        name: "yw_pla",
        type: "tech",
        description: "Allergens"
    }, {
        name: "my",
        type: "tech",
        description: "portal_settings"
    }, {
        name: "yw_preset",
        type: "tech",
        description: "current preset"
    }, {
        name: "yw_order_preset",
        type: "tech",
        description: "order of presets"
    }, {
        name: "yw_m_alert",
        type: "tech",
        description: "count of alerts"
    }]
}), $(function() {
    BEM.afterCurrentEvent(function() {
        BEM.channel("i-bem").trigger("start-init"), BEM.DOM.init(function() {
            BEM.channel("i-bem").trigger("init")
        })
    })
}), BEM.DOM.decl("axe", {
    onSetMod: {
        js: {
            inited: function() {
                this.loadScript({
                    src: BEM.blocks["i-global"].param("stHost") + "/i/axe/axe.min.js",
                    onload: this.axeOnLoad.bind(this)
                }), this.axe = null
            }
        }
    },
    loadScript: function(t) {
        var e = t.src,
            n = t.onload,
            i = document.createElement("script");
        i.defer = !0, i.src = e, i.onload = n, i.crossOrigin = "anonymous", document.head.appendChild(i)
    },
    getConfig: function() {
        var t = this.axe;
        return {
            allowedOrigins: ["<unsafe_all_origins>"],
            reporter: "v2",
            disableOtherRules: !0,
            rules: __spreadArrays(t.getRules(["wcag2a", "wcag21a", "best-practice"]).map(function(t) {
                return __assign(__assign({}, t), {
                    id: t.ruleId,
                    enabled: !0
                })
            }), [{
                id: "color-contrast",
                enabled: !1
            }, {
                id: "aria-text",
                enabled: !1
            }, {
                id: "audio-caption",
                enabled: !1
            }])
        }
    },
    axeOnLoad: function() {
        var t = this.params.autorun;
        this.axe = window.axe;
        var e = this.axe;
        e.configure(this.getConfig()), window.axeRunContext = {
            exclude: [
                ['iframe[src*="https://yastatic.net/safeframe-bundles/"]'],
                ['a[href="https://yabs.yandex.ru/pogoda/yellow"]'],
                [".yandex-header .notifier"],
                [".yandex-header .search2"]
            ]
        }, window.axeRunOptions = {
            resultTypes: ["violations"],
            iframes: !1
        }, t && this.loadScript({
            src: BEM.blocks["i-global"].param("stHost") + "/i/axe/axeReactLogger.js",
            onload: function() {
                setTimeout(function() {
                    e.run(window.axeRunContext, window.axeRunOptions).then(window.axeReactLogger).catch(console.error)
                }, 1e3)
            }
        })
    }
}), BEM.DOM.decl({
    block: "b-page",
    modName: "type",
    modVal: "index"
}, {
    onSetMod: {
        js: function() {
            this.params && this.params.ski && BEM.blocks["i-metrika"].reachGoal("ski_page", {
                page: "index"
            })
        }
    }
}), BEM.DOM.decl("anchor", {
    onSetMod: {
        js: function() {
            this._scrollDelay = 500, this._animationDuration = 1e3;
            var t = window.location.hash;
            t && this._navigate(t)
        }
    },
    _navigate: function(t) {
        var e = this;
        return /^#dn?_/.test(t) ? ($(".forecast-details_segment").length || BEM.channel("forecast-details-segment").trigger("start"), setTimeout(function() {
            e._scroll(t)
        }, this._scrollDelay)) : void this._scroll(t)
    },
    _scroll: function(t) {
        var e = $("[data-anchor=" + t.slice(1) + "]");
        e.length && $("html, body").animate({
            scrollTop: e.offset().top
        }, this._animationDuration)
    }
}, {
    live: function() {
        return this.liveBindTo("click", function(t) {
            var e = this.domElem[0].href && this.domElem[0].href.split("#")[1];
            e && (t.preventDefault(), this._navigate("#" + e), window.intersectForecastDetails && window.intersectForecastDetails._removeFromObserver())
        }), !0
    }
}), BEM.DOM.decl("promo", {
    onSetMod: {
        js: function() {
            this._promoName = this.params.name;
            var t = parseInt(this.params.shows, 10);
            this.LS_NAME = "yw_" + this._promoName + "_promo", this.MAX_SHOWN_VALUE = t;
            var e = Number(localStorage.getItem(this.LS_NAME)) || 0;
            localStorage.setItem(this.LS_NAME, ++e), e <= this.MAX_SHOWN_VALUE && (this.delMod("hidden"), !this.params.showAfterClick && this.domElem.on("click", this._onLinkClick.bind(this))), this.elem("close").on("click", this._onCloseClick.bind(this))
        }
    },
    _onLinkClick: function() {
        this._metrikaCounter = BEM.blocks["i-metrika"], this._metrikaCounter && this._metrikaCounter.reachGoal(this._promoName + "_promo_click"), this._setVisited()
    },
    _onCloseClick: function(t) {
        t.preventDefault(), t.stopPropagation(), this._metrikaCounter = BEM.blocks["i-metrika"], this._metrikaCounter && this._metrikaCounter.reachGoal(this._promoName + "_promo_close"), this.setMod("hidden"), this._setVisited()
    },
    _setVisited: function() {
        localStorage.setItem(this.LS_NAME, this.MAX_SHOWN_VALUE)
    }
}), BEM.DOM.decl("agro-promo", {
    onSetMod: {
        js: function() {
            var t = this,
                e = BEM.blocks["i-metrika"],
                n = t.findBlockOn("promo");
            n.hasMod("hidden") || e.reachGoal("AgroPromo.shown");
            var i = t.elem("close");
            i.on("click", function(t) {
                t.preventDefault(), e.reachGoal("AgroPromo.close"), n.setMod("hidden"), localStorage.setItem(n.LS_NAME, n.MAX_SHOWN_VALUE)
            })
        }
    }
}), BEM.DOM.decl("day-anchor", {
    onSetMod: {
        js: function() {
            this.page = this.findBlockOutside("b-page");
            var t = this.page.findBlockInside("forecasts");
            return t ? (this.tabs = t.findBlockInside("tabs"), this.scroller = this.page.findBlockInside("forecast-detailed"), void(this.metrikaParams = {
                lang: BEM.I18N.lang(),
                title: document.title,
                referrer: document.referrer,
                day: this.params.dayIndex
            })) : this.__self.liveUnbindFrom("click")
        }
    },
    _navigate: function() {
        this.tabs && (this.tabs.activate(1), this.scroller.scroll(this.params.anchor), BEM.blocks["i-metrika"].reachGoal("day.to.details", this.metrikaParams))
    }
}, {
    live: function() {
        return this.liveBindTo("click", function() {
            this._navigate()
        }), !0
    }
}), BEM.DOM.decl("fact__hourly", {
    onSetMod: {
        js: function() {
            $.ajax({
                url: BEM.blocks["i-global"].param("stHost") + "/i/swiper/swiper.min.js",
                success: function() {
                    this._initSwiper(), BEM.channel("swiper").trigger("init")
                }.bind(this)
            })
        }
    },
    _initSwiper: function() {
        function t(t) {
            t.preventDefault(), n._swiper.slideTo(n._swiper.activeIndex + n.swiperSlidesPerGroup, n.swiperSpeed), "prev" !== n.getMod("nav-visible") && n._reachGoal("arrows_click.forward")
        }

        function e(t) {
            t.preventDefault(), n._swiper.slideTo(n._swiper.activeIndex - n.swiperSlidesPerGroup, n.swiperSpeed), "next" !== n.getMod("nav-visible") && n._reachGoal("arrows_click.back")
        }
        var n = this;
        n._metrikaCounter = BEM.blocks["i-metrika"], n.swiperSpeed = 480, n.swiperSlidesPerGroup = 3;
        var i = ".fact .fact__hourly-nav-action_type_next",
            o = ".fact .fact__hourly-nav-action_type_prev",
            s = n.findBlockInside("fact__hourly-swiper").domElem;
        n.win = BEM.DOM.win, n._swiper = new Swiper(s, {
            slidesPerView: "auto",
            keyboard: !0,
            roundLengths: !0,
            resistance: !1,
            slidesOffsetAfter: 16,
            navigation: {
                nextEl: i,
                prevEl: o
            },
            a11y: {
                prevSlideMessage: n.params.a11yPrevSlideText,
                nextSlideMessage: n.params.a11yNextSlideText
            },
            touchEventsTarget: "wrapper",
            on: {
                slideChangeTransitionStart: function() {
                    n._swiper.progress > .95 && n._swiper.progress < 1 && n._swiper.slideTo(n._swiper.activeIndex + n.swiperSlidesPerGroup + 1, n.swiperSpeed)
                },
                slideNextTransitionStart: function() {
                    n._reachGoal("looked.forward")
                },
                slideChangeTransitionEnd: n._updateNavVisibilityMod.bind(n),
                reachBeginning: n._updateNavVisibilityMod.bind(n),
                reachEnd: n._updateNavVisibilityMod.bind(n),
                touchStart: function(t) {
                    n._startPosition = n._getXPosition(t)
                },
                touchEnd: function(t) {
                    n._endPosition = n._getXPosition(t), Math.abs(n._endPosition - n._startPosition) > 5 && n._reachGoal("drag_and_drop")
                }
            }
        }), n._swiper.navigation.$nextEl.off("click").on("click", t), n._swiper.navigation.$prevEl.off("click").on("click", e), n._deferredResize = $.debounce(n._resize.bind(n), 100), n.win.on("resize", n._deferredResize), n._resize()
    },
    _updateNavVisibilityMod: function() {
        var t = this,
            e = t._swiper;
        switch (!0) {
            case e.isEnd:
                t.setMod("nav-visible", "prev"), t._reachGoal("seen_end");
                break;
            case e.isBeginning:
                t.setMod("nav-visible", "next");
                break;
            default:
                t.setMod("nav-visible", "all")
        }
    },
    _getXPosition: function(t) {
        return t.changedTouches && t.changedTouches.length ? t.changedTouches[0].clientX : t.clientX
    },
    _resize: function() {
        var t = this;
        window.innerWidth <= 1150 && "minimal" !== t._lastState ? (t._lastState = "minimal", t._swiper.params.slidesOffsetAfter = 40, t._swiper.params.slidesOffsetBefore = 24, t.setMod("width", "minimal"), t._swiper.update(!0)) : window.innerWidth > 1150 && "normal" !== t._lastState && (t._lastState = "normal", t._swiper.params.slidesOffsetAfter = 16, t._swiper.params.slidesOffsetBefore = 0, t.delMod("width"), t._swiper.update(!0))
    },
    _reachGoal: function(t) {
        var e = this;
        return e._metrikaCounter.reachGoal("hourly." + t), e
    }
}), BEM.DOM.decl("forecast-briefly", {
    onSetMod: {
        js: function() {
            var t = this;
            BEM.channel("swiper").on("init", t._initSwiper.bind(t))
        }
    },
    _initSwiper: function() {
        var t = this;
        t._isSliderMoving = !1, t._isInitialMoving = !0, t._tooltip = t.findBlockInside("tooltip"), t._tooltip.setContent(BEM.I18N("interface-common", "climate-tooltip-average-data"));
        var e = BEM.blocks["i-metrika"],
            n = 480,
            i = 3,
            o = "forecast-briefly__day_climate",
            s = t.params.initialSlide || 0;
        t._swiper = new Swiper(t.elem("days"), {
            slidesPerView: "auto",
            keyboard: !1,
            roundLengths: !0,
            speed: n,
            initialSlide: s,
            touchEventsTarget: "wrapper",
            navigation: {
                nextEl: ".forecast-briefly .forecast-briefly__side-button_pos_right",
                prevEl: ".forecast-briefly .forecast-briefly__side-button_pos_left"
            },
            a11y: {
                prevSlideMessage: t.params.a11yPrevSlideText,
                nextSlideMessage: t.params.a11yNextSlideText
            },
            on: {
                sliderMove: function(n) {
                    t._hideTooltip(), t._isSliderMoving || ("mouse pen".indexOf(n.pointerType) === -1 ? e.reachGoal("SausageHorizontalScroll") : e.reachGoal("SausageDragAndDrop"), t._isSliderMoving = !0)
                },
                slideChangeTransitionEnd: function() {
                    if (t._isInitialMoving) return void(t._isInitialMoving = !1);
                    t._isSliderMoving = !1;
                    var n = $(this.slides[this.activeIndex]),
                        i = this.activeIndex + (Math.floor(this.size / n.width()) - 2),
                        s = $(this.slides[i]);
                    (n.hasClass(o) || s.hasClass(o)) && e.reachGoal("SausageSeenClimate"), this.previousIndex < this.activeIndex ? e.reachGoal("SausageLookedForward") : this.previousIndex > this.activeIndex && e.reachGoal("SausageLookedBack")
                },
                reachEnd: function() {
                    e.reachGoal("SausageSeenEnd")
                }
            }
        }), t._swiper.navigation.$nextEl.off("click").on("click", function(o) {
            o.preventDefault(), t._swiper.slideTo(t._swiper.activeIndex + i, n), e.reachGoal("SausageForwardArrowClick")
        }), t._swiper.navigation.$prevEl.off("click").on("click", function(o) {
            o.preventDefault(), t._swiper.slideTo(t._swiper.activeIndex - i, n), e.reachGoal("SausageBackArrowClick")
        });
        var r = t.buildSelector("day_climate");
        t.domElem.on("mouseenter", r, this._showTooltip.bind(t)).on("mouseleave", r, this._hideTooltip.bind(t))
    },
    _showTooltip: function(t) {
        var e = this;
        e._tooltip.setOwner($(t.currentTarget)), e._tooltip.setMod("shown", "yes")
    },
    _hideTooltip: function() {
        var t = this;
        t._tooltip.delMod("shown")
    }
}), $(function() {
    var t = $(".maps-widget-nowcast__tiled-nowcast-layer_pattern");
    if (t.length) {
        var e = t.hasClass("maps-widget-nowcast__tiled-nowcast-layer_webgl"),
            n = t.hasClass("maps-widget-nowcast__tiled-nowcast-layer_complete-tiles"),
            i = t.hasClass("maps-widget-nowcast__tiled-nowcast-layer_no-retina"),
            o = e ? new window.WebGlNowcastAnimationRenderer({
                frames: 1,
                pattern: n ? "/i/maps/all-patterns-with-bg.png" : "/i/maps/all-patterns.png",
                disableRetina: i
            }) : new window.NowcastAnimationRenderer({
                frames: 1
            }),
            s = t && t.find(".instant-map-layer__layer");
        if (s.attr("data-tiles")) {
            var r = JSON.parse(s.attr("data-tiles"));
            if (e && !o.isWebGL()) {
                var a = s.clone().prependTo(t),
                    c = r.map(function(t) {
                        return 'url("' + t.replace(/&encoded=1/g, "") + '")'
                    }).join(",");
                a.css({
                    "background-image": c,
                    opacity: .7
                })
            }
            $.when.apply($, r.map(function(t) {
                return o.prepareTile(t, !0).then(function(t) {
                    return t.src || t.toDataURL && t.toDataURL()
                })
            })).then(function() {
                var t = [].slice.call(arguments),
                    e = 'url("' + t.join('"), url("') + '")';
                s.css("background-image", e), $(".maps-widget-nowcast").addClass("maps-widget-nowcast_ready")
            })
        }
    }
}), BEM.decl("i-intersection-observer", {}, {
    IntersectionObserver: function(t, e, n) {
        var i = this;
        this._element = t, this._percent = e, this._callback = n, this._intersectComplete = !1, this._handlerDomLoaded = void 0, this._viewportIntersect = void 0, this._observer = void 0, this.startViewportObserver = function() {
            if (i._viewportIntersect = parseFloat(i._percent).toFixed(1), !("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype)) return i._startViewportObserverPolyfill();
            var t = {
                root: null,
                rootMargin: "0px",
                threshold: i._viewportIntersect
            };
            i._observer = new IntersectionObserver(i._startFromObserver.bind(i), t), i._observer.observe(i._element)
        }, this._startFromObserver = function(t) {
            !i._intersectComplete && t && t[0] && t[0].intersectionRatio >= i._viewportIntersect && (i._observer.unobserve(i._element), i._callback())
        }, this._startViewportObserverPolyfill = function() {
            i._handlerDomLoaded = i._viewportHandler.bind(i), window.addEventListener ? (addEventListener("DOMContentLoaded", i._handlerDomLoaded, !1), addEventListener("load", i._handlerDomLoaded, !1), addEventListener("scroll", i._handlerDomLoaded, !1), addEventListener("resize", i._handlerDomLoaded, !1)) : (i._callback(), i._intersectComplete = !0)
        }, this._removeFromObserver = function() {
            i._observer.unobserve(i._element)
        }, this._viewportHandler = function() {
            !i._intersectComplete && i._isElementInViewport(i._element) && (i._callback(), i._intersectComplete = !0, removeEventListener("DOMContentLoaded", i._handlerDomLoaded, !1), removeEventListener("load", i._handlerDomLoaded, !1), removeEventListener("scroll", i._handlerDomLoaded, !1), removeEventListener("resize", i._handlerDomLoaded, !1))
        }, this._isElementInViewport = function(t) {
            var e = t.getBoundingClientRect();
            return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth)
        }
    }
}), BEM.DOM.decl("camera", {
    onSetMod: {
        js: {
            inited: function() {
                if (this.params = this.params || {}, this._src = this.params.src, this._frame = this.params.frameId && document.getElementById(this.params.frameId), this._playButton = this.params.buttonId && document.getElementById(this.params.buttonId), this._src && this._frame && this._playButton) {
                    var t = new BEM.blocks["i-intersection-observer"].IntersectionObserver(this._frame, .5, this._startVideo.bind(this));
                    t.startViewportObserver()
                }
            }
        }
    },
    _startVideo: function() {
        var t = this;
        this._frame.src = this._src, this._videoStarted = !0, this._playButton.classList.add("camera__button_prepare-remove"), setTimeout(function() {
            t._playButton.outerHTML = ""
        }, 3e3)
    }
}), BEM.DOM.decl("iframe-pollution-widget", {
    onSetMod: {
        js: {
            inited: function() {
                var t = this.elem("frame")[0];
                this._frame = t, this._messageHandler = this._onMessage.bind(this), window.addEventListener("message", this._messageHandler), t.style.width = t.offsetWidth - 1 + "px", setTimeout(function() {
                    t.style.width = ""
                }, 0)
            },
            "": function() {
                window.removeEventListener("message", this._messageHandler)
            }
        }
    },
    _onMessage: function(t) {
        t.source === this._frame.contentWindow && "size" === t.data.type && (this._frame.style.height = t.data.height + "px")
    }
}), BEM.DOM.decl("forecast-details-segment", {
    onSetMod: {
        js: function() {
            var t = this.params;
            if (this._loading = !1, this._$dataTarget = this.elem("container"), this._url = t.serviceRoot + "/segment/details", this._query = t.query, BEM.channel("forecast-details-segment").on("start", this._start.bind(this)), window.location.hash || this.params.drawImmediately) this._start();
            else {
                var e = document.getElementById("content_bottom"),
                    n = 1;
                window.intersectForecastDetails = new BEM.blocks["i-intersection-observer"].IntersectionObserver(e, n, this._start.bind(this)), window.intersectForecastDetails.startViewportObserver()
            }
        }
    },
    _start: function() {
        this.domElem.prepend('<link rel="stylesheet" href="' + this.params.css + '">'), setTimeout(this._load.bind(this), 10)
    },
    _load: function() {
        this._loading || (this._loading = !0, this.setMod("loading", "yes"), $.ajax(this._url, {
            data: this._query,
            dataType: "html",
            headers: {
                "X-Requested-With": "weather-front"
            }
        }).done(this._ajaxSuccess.bind(this)).fail(this._ajaxError).always(this._ajaxComplete.bind(this)))
    },
    _ajaxComplete: function() {
        this._loading = !1, this.delMod("loading")
    },
    _ajaxError: function() {},
    _ajaxSuccess: function(t) {
        this._$dataTarget.append(t);
        var e = this.findBlockInside(this._$dataTarget, "forecast-details");
        e = e && e.domElem, this._$dataTarget = e || this._$dataTarget, BEM.channel("half-sticky-adv").trigger("init")
    }
}), BEM.DOM.decl("forecast-details", {
    onSetMod: {
        js: function() {
            this._isMainPage = "segment-details" === this.params.page, this._isMainPageWithHash = this._isMainPage && location.hash, this._isMainPage && !this._isMainPageWithHash || (this._scrollDelay = 50, this._initAnchors(), this._jumpToHash())
        }
    },
    _initAnchors: function() {
        var t, e = this,
            n = {},
            i = [];
        Array.prototype.slice.call(e.elem("day")).forEach(function(e, o) {
            var s = $(e),
                r = s.data("anchor"),
                a = s.data("weekend");
            n[r] = {
                anchor: r,
                target: s.parent(),
                index: o
            }, i[o] = r, a && (t = r)
        }), e._anchors = {
            data: n,
            index: i,
            weekendDay: t
        }
    },
    _getAnchorByIndex: function(t) {
        var e = this;
        return e._anchors.data[e._anchors.index[t]]
    },
    _jumpToHash: function() {
        var t = this,
            e = location.hash;
        e ? (e = e.slice(1), setTimeout(function() {
            window.scrollTo(0, 0), setTimeout(function() {
                BEM.DOM.win.scrollTop() > 0 || t.scroll(e)
            }, t._scrollDelay)
        }, 1)) : this._showFirstNativeAdIfNeeded()
    },
    _getAds: function() {
        var t = this;
        return t._ads || (t._ads = t.findBlocksInside("jsadv").map(function(t) {
            return {
                max: t.params.max,
                space: t.params.space,
                stickToMax: t.params.stickToMax,
                elem: $(t.domElem),
                content: t.params.content,
                index: t.params.index
            }
        })), t._ads
    },
    _hideAds: function() {
        var t = this;
        t._getAds().forEach(function(t) {
            t.elem.hide()
        })
    },
    _showAd: function(t, e, n) {
        t.show().parent().insertAfter(e), n && t.append(BH.apply(n))
    },
    _showFirstNativeAdIfNeeded: function() {
        var t = this._getAds()[0],
            e = this._anchors.index[0];
        t && t.content && this._showAd(t.elem, this._anchors.data[e].target, t.content)
    },
    _alignAds: function(t) {
        var e = this,
            n = e._getAds(),
            i = e._anchors;
        if (n && n.length) {
            if (this._hideAds(), !Number(t)) {
                var o = t.split("_");
                "d" !== o[0] && (t = i.index[Number(t.split("_")[1] - 1)] || i.weekendDay);
            }
            n.forEach(function(n) {
                var o = i.data[t];
                if (n.space && (o = e._getAnchorByIndex(n.space + o.index)), o)
                    if (e._isMainPageWithHash) {
                        if ((o.index < 3 || 1 === n.index) && (o = e._getAnchorByIndex(n.index)), !o) return;
                        e._showAd(n.elem, o.target, n.content)
                    } else {
                        if (o.index > n.max) {
                            if (!n.stickToMax) return;
                            o = e._getAnchorByIndex(n.max)
                        }
                        if (!o) return;
                        e._showAd(n.elem, o.target, n.content)
                    }
            })
        }
    },
    scroll: function(t) {
        var e = Number(t) ? "d_" + t : t,
            n = $("[data-anchor=" + e + ']:not(".jsadv")');
        n.length && (this._alignAds(e), $("html, body").animate({
            scrollTop: n.offset().top - 42
        }, 1e3))
    }
}), BEM.DOM.decl("climate-header-fixed", {
    onSetMod: {
        js: function() {
            var t = this;
            t._isContentAlignCenter = t.params.isContentAlignCenter, t._sources = t.params.sources, t._movableSources = [], t._$wrapper = t.elem("wrapper");
            var e = t.params.trackVisibilityElemSelector ? t.params.trackVisibilityElemSelector : t._sources[0].source;
            t._$trackVisibilityElem = $(e), t._$trackVisibilityElem.length && (t._$offsetRightElem = t.params.offsetRightElemSelector ? $(t.params.offsetRightElemSelector) : void 0, t.bindToWin("resize scroll", $.throttle(t._handleScroll, 10)), t._handleScroll())
        },
        shown: function() {
            var t = this;
            t._moveSources()
        }
    },
    _handleScroll: function() {
        var t = this;
        t._updateFixedHeaderVisibility(), t._updateSize()
    },
    _updateFixedHeaderVisibility: function() {
        var t = this,
            e = t._$trackVisibilityElem.offset().top + t._$trackVisibilityElem.height() - BEM.DOM.win.scrollTop() > 0;
        e && t._shown ? (t._shown = !1, t.delMod("shown")) : e || t._shown || (t._created || (t._created = !0, t._createChildElements()), t._shown = !0, t.setMod("shown", "yes"))
    },
    _moveSources: function() {
        var t = this;
        t._movableSources.forEach(function(e) {
            var n, i = $(e.source);
            n = t._shown ? e.dest ? t.elem(e.dest.elem) : t._$wrapper : $(e.wrapper), e.shownClass && i.toggleClass(e.shownClass, t._shown), i.appendTo(n)
        })
    },
    _createChildElements: function() {
        var t = this;
        t._sources.forEach(function(e) {
            var n = $(e.source);
            if (!e.persistentMove) return void t._movableSources.push(e);
            var i = e.dest ? t.elem(e.dest.elem) : t._$wrapper;
            n.length && i.length && n.appendTo(i)
        })
    },
    _updateSize: function() {
        var t = this,
            e = BEM.DOM.doc.scrollLeft();
        if (t._$offsetRightElem) {
            var n = t._$offsetRightElem.offset().left,
                i = BEM.DOM.win.width() - n + e,
                o = t._isContentAlignCenter ? t.findBlockOutside("b-page__container").domElem.offset().left : 0,
                s = -e + o;
            t.domElem.css({
                left: s,
                right: i
            })
        } else t.domElem.scrollLeft(e)
    }
}, {
    live: !0
}), BEM.DOM.decl("meteumBanner-promo", {
    onSetMod: {
        js: function() {
            var t = this;
            this.LS_NAME = "yw_meteumai_promo";
            var e = t.params.isMapsPage;
            this.$button = this.elem("button"), this.$button.on("click", this._setVisited.bind(this)), t.win = BEM.DOM.win, e || (t._deferredResize = $.debounce(t._resize.bind(t), 100), t.win.on("resize", t._deferredResize), t.selectorsToCalcHeight = [".alerts", ".content__top", ".forecast-briefly"], t._resize()), t._setTheme()
        }
    },
    _resize: function() {
        for (var t = this, e = 0, n = 0; n < t.selectorsToCalcHeight.length; n++) {
            var i = document.querySelector(t.selectorsToCalcHeight[n]);
            i && (e += i.offsetHeight + 8)
        }
        t.domElem.css({
            height: e - 8 + "px"
        })
    },
    _setVisited: function() {
        localStorage.setItem(this.LS_NAME, "1")
    },
    _setTheme: function() {
        this.setMod("theme", localStorage.getItem(this.LS_NAME) ? "white" : "black")
    }
}), BEM.DOM.decl("pro-entry-points", {
    onSetMod: {
        js: function() {
            this.LS_NAME = "yw_details_theme", this.LS_VALUE = 1, localStorage.setItem(this.LS_NAME, this.LS_VALUE)
        }
    }
}),
function(t) {
    function e(t, e) {
        if (h && p) {
            var n = "keyset: " + e._keyset + " key: " + e._key + " (lang: " + e._lang + ")";
            console.log(t, n)
        }
    }

    function n(t) {
        return "string" == typeof t ? t : t.block + (t.elem ? c + t.elem : "") + (t.modName ? a + t.modName + a + t.modVal : "")
    }

    function i(t) {
        var e = {};
        return t.split(c).forEach(function(t, n) {
            var i = [n ? "elem" : "block", "mod", "val"];
            t.split(a).forEach(function(t, n) {
                e[i[n]] = t
            })
        }), e
    }

    function o(t) {
        t && d.push(t)
    }

    function s() {
        return d.length && d.pop()
    }

    function r() {
        this._lang = "", this._prj = "lego", this._keyset = "", this._key = ""
    }
    if ("function" == typeof t.I18N && t.I18N._proto) return t.I18N;
    "undefined" == typeof i18n && (i18n = {}), BEM = t;
    var a = "_",
        c = "__",
        l = "ru",
        u = {},
        d = [],
        h = !1,
        p = "undefined" != typeof console && "function" == typeof console.log;
    r.prototype = {
        lang: function(t) {
            return this._lang = t, this
        },
        project: function(t) {
            return this._prj = t, this
        },
        keyset: function(t, e) {
            return e && o(this._keyset), this._keyset = n(t), this
        },
        key: function(t) {
            return this._key = t, this
        },
        decl: function(t) {
            var e = i(this._keyset),
                n = "i-tanker" === e.block ? "tanker" : this._prj,
                o = e.elem || this._keyset,
                s = this._key;
            n = i18n[n] || (i18n[n] = {}), o = n[o] || (n[o] = {}), o[s] = "function" == typeof t ? t : function() {
                return t
            };
            var r = u[this._lang] || (u[this._lang] = {}),
                a = r[this._keyset] || (r[this._keyset] = {});
            a[s] = t
        },
        val: function(t, n) {
            var i = u[this._lang] && u[this._lang][this._keyset];
            if (!i) return e("[I18N_NO_KEYSET] %s", this), "";
            i = i[this._key];
            var o = typeof i;
            return "undefined" === o ? (e("[I18N_NO_VALUE] %s", this), "") : "string" === o ? i : i.call(n || this, t)
        },
        _cache: function() {
            return u
        }
    };
    var m = function(t, e, n) {
        return m.keyset(t).key(e, n)
    };
    m._proto = new r, m.project = function(t) {
        return this._proto.project(t), this
    }, m.keyset = function(t) {
        return this._proto.keyset(t, !0), this
    }, m.key = function(t, e) {
        var n, i, o = this._proto;
        return o.lang(this._lang).key(t), n = o.val(e, m), i = s(), i && o.keyset(i, !1), n
    }, m.decl = function(t, e, n) {
        var i, o = this._proto;
        n && n.lang && o.lang(n.lang), o.keyset(t);
        for (i in e) e.hasOwnProperty(i) && o.key(i).decl(e[i]);
        return this
    }, m.lang = function(t) {
        return "undefined" != typeof t && (this._lang = t), this._lang
    }, m.debug = function(t) {
        h = !!t
    }, m.lang(l), t.I18N = m
}("undefined" == typeof BEM ? {} : BEM), "undefined" != typeof BEM && BEM.I18N && (BEM.I18N.decl("allergens", {
    alder: "ольха",
    alder_gen: "ольхи",
    ash: "ясень",
    ash_gen: "ясеня",
    birch: "берёза",
    birch_gen: "берёзы",
    cereals: "злаки",
    cereals_gen: "злаков",
    elm: "вяз",
    elm_gen: "вяза",
    hazel: "орешник",
    hazel_gen: "орешника",
    maple: "клён",
    maple_gen: "клёна",
    nettle: "крапива",
    nettle_gen: "крапивы",
    not_allergic: "Я не аллергик",
    not_allergic_now: "Сейчас аллергии нет",
    oak: "дуб",
    oak_gen: "дуба",
    other: "другое",
    pine: "сосна",
    pine_gen: "сосны",
    ragweed: "амброзия",
    ragweed_gen: "амброзии",
    sagebrush: "полынь",
    sagebrush_gen: "полыни",
    spruce: "ель",
    spruce_gen: "ели",
    unknown: "я не знаю",
    weedy: "сорные травы",
    weedy_gen: "сорных трав",
    willow: "ива",
    willow_gen: "ивы"
}, {
    lang: "ru"
}), BEM.I18N.decl("b-statcounter__metrika", {
    JSERR_incorrectID: "Incorrect ID has been passed."
}, {
    lang: "ru"
}), BEM.I18N.decl("copyright", {
    link: function(t) {
        return "ООО «" + t.content + "»"
    },
    yandex: "ЯНДЕКС"
}, {
    lang: "ru"
}), BEM.I18N.decl("footer", {
    about: "О компании",
    "about-url": "//company.yandex.ru",
    advert: "Реклама",
    "advert-url": "//advertising.yandex.ru/kupislova.xml?advertising",
    apps: "Мобильные приложения",
    "apps-url": "//mobile.yandex.ru",
    stat: "Статистика",
    termsofuse: "Лицензия на поиск",
    "termsofuse-url": "//legal.yandex.ru/termsofuse/"
}, {
    lang: "ru"
}), BEM.I18N.decl("i-services", {
    404: "404",
    adresa: "Адреса",
    advertising: "Реклама",
    afisha: "Афиша",
    all: "Все сервисы",
    api: "API",
    appmetrica: "AppMetrica",
    appsearch: "Приложения",
    audience: "Аудитории",
    auto: "Авто",
    autoru: "Авто.ру",
    avia: "Авиабилеты",
    aziada: "Азиада",
    ba: "Баян",
    backapv: "Партнер Я.Карт",
    balance: "Баланс",
    bar: "Бар",
    "bar-ie": "Бар для ИЕ",
    "bar-ie9": "Бар для ИЕ9",
    bayan: "Баннеры Яндекса",
    blogs: "Блоги",
    books: "Книги",
    browser: "Браузер",
    calendar: "Календарь",
    captcha: "ой...",
    catalogwdgt: "Каталог виджетов",
    chrome: "Хром с поиском Яндекса",
    city: "Города",
    cityday: "День города",
    clickhouse: "ClickHouse",
    collection: "Коллекция",
    company: "Компания",
    contest: "Contest",
    delivery: "Доставка",
    desktop: "Персональный поиск",
    direct: "Директ",
    "direct.market": "Маркет",
    disk: "Диск",
    display: "Дисплей",
    ege: "ЕГЭ",
    expert: "Эксперт",
    feedback: "Обратная связь",
    feedback2: "Обратная связь",
    ff: "ФФ с поиском Яндекса",
    fotki: "Фотки",
    fresh: "Свежее",
    games: "Игрушки",
    geocontext: "Геоконтекст",
    goroda: "Города",
    help: "Помощь",
    i: "Мои сервисы",
    ie: "ИЕ с поиском Яндекса",
    images: "Картинки",
    "images-com": "Картинки",
    interests: "Интересы",
    internet: "Интернет",
    kassa: "Касса",
    keyboard: "Клавиатура",
    kraski: "Краски",
    kuda: "Куда все идут",
    large: "Яндекс для слабовидящих",
    legal: "Правовые документы",
    lenta: "Лента",
    libra: "Библиотека",
    literacy: "Неделя борьбы за грамотность",
    local: "Локальная сеть",
    lost: "Незабудки",
    love: "День взаимного тяготения — 13 августа",
    mail: "Почта",
    maps: "Карты",
    "maps-wiki": "Народная карта",
    market: "Маркет",
    "market.advertising": "Маркет",
    master: "Мастер",
    metrika: "Метрика",
    metro: "Метро",
    mobile: "Мобильный",
    moikrug: "Мой Круг",
    money: "Деньги",
    museums: "Дни исторического и культурного наследия",
    music: "Музыка",
    "music-partner": "Музыка: статистика",
    nahodki: "Мои находки",
    nano: "Нано",
    newhire: "Наниматор",
    news: "Новости",
    notifications: "Нотификационная панель",
    oauth: "Авторизация",
    online: "Онлайн",
    openid: "OpenID",
    opera: "Opera Software",
    opinion: "Цитаты",
    partners: "Рекламная сеть",
    partnersearch: "Поиск для партнеров",
    passport: "Паспорт",
    pdd: "Почта для домена",
    peoplesearch: "Люди",
    perevod: "Переводчик",
    probki: "Пробки",
    pulse: "блоги: пульс",
    punto: "Punto switcher",
    pvo: "Ответы",
    rabota: "Работа",
    radar: "Радар",
    ramazan: "",
    rasp: "Расписания",
    realty: "Недвижимость",
    referats: "Рефераты",
    rk: "Есть вопросы?",
    root: "Яндекс.Олимпиада для Unix администраторов",
    school: "Школа",
    search: "Поиск",
    server: "Сервер",
    shtrafi: "Штрафы",
    site: "Поиск для сайта",
    slovari: "Словари",
    so: "Самооборона",
    social: "Социализм",
    soft: "Программы",
    sport: "Спорт",
    sprav: "Справочник",
    start: "Стартовая страница",
    stat: "Статистика",
    subs: "Подписки",
    taxi: "Такси",
    telephony: "Телефония",
    terms: "Разговорник",
    tests: "Тесты и опросы",
    tickets: "Билеты",
    time: "Яндекс.Время",
    toloka: "Яндекс.Толока",
    toster: "Тосты",
    translate: "Переводчик",
    tune: "Настройки",
    tv: "ТВ",
    uslugi: "Услуги",
    video: "Видео",
    "video-com": "Видео",
    vno: "ВНО",
    wdgt: "Виджеты",
    weather: "Погода",
    webmaster: "Вебмастер",
    "webmaster-api": "API Вебмастера",
    widgets: "Виджеты",
    wordstat: "Статистика",
    wow: "Я.ру",
    www: "Поиск",
    xmlsearch: "XML",
    yaca: "Каталог",
    yamb: "Медийные баннеры",
    zakladki: "Закладки"
}, {
    lang: "ru"
}), BEM.I18N.decl("i-tanker__dynamic", {
    gender: function(t) {
        return function(t) {
            return t[t.gender]
        }.call(this, t)
    },
    plural: function(t) {
        return function(t) {
            var e = isNaN(parseInt(t.count)) ? 0 : t.count,
                n = e % 10,
                i = e % 100;
            return 1 == n && 11 != i ? t.one : n > 1 && n < 5 && (i < 10 || i > 20) ? t.some : t.many
        }.call(this, t)
    },
    plural_adv: function(t) {
        return function(t) {
            var e = isNaN(parseInt(t.count)) ? 0 : t.count;
            return 0 === e ? t.none : this.keyset("i-tanker__dynamic").key("plural", {
                count: t.count,
                one: t.one,
                some: t.some,
                many: t.many
            })
        }.call(this, t)
    },
    toggle: function(t) {
        return function(t) {
            return Boolean(t.condition) ? t.true : t.false
        }.call(this, t)
    }
}, {
    lang: "ru"
}), BEM.I18N.decl("interface-a11y", {
    altitude: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "На высоте %height метр",
            some: "На высоте %height метра",
            many: "На высоте %height метров",
            none: "На высоте %height метров"
        })
    },
    back: "Назад",
    camera: "Погода на камерах: %s",
    centimetre: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "%s сантиметр",
            some: "%s сантиметра",
            many: "%s сантиметров",
            none: "%s сантиметров"
        })
    },
    day: "Днем:",
    "day-duration": "Длина светового дня: %value",
    "details.top-card.daytime-prognosis": "%d %c, %t",
    "feels-like": "Ощущается как %temp",
    goToNowcastMap: "Перейти на карту осадков",
    goToPlus: "Перейти на Яндекс Плюс",
    goToPollenMap: "Перейти на карту пыльцы",
    goToPressureMap: "Перейти на карту давления",
    goToSnowMap: "Перейти на карту глубины снега",
    goToTempMap: "Перейти на карту температуры",
    goToWeather: "Перейти на главную Яндекс.Погода",
    goToWindMap: "Перейти на карту ветра",
    goToYandex: "Перейти на главную Яндекс",
    hPa: "Гектопаскалей",
    hourlyDayStartAndEnd: "%c в %t",
    hourlyWeather: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "В %h час %c, %t",
            some: "В %h часа %c, %t",
            many: "В %h часов %c, %t",
            none: "В %h часов %c, %t"
        })
    },
    hourlyWeatherTitle: "Почасовой прогноз",
    humidity_high: "высокая влажность",
    humidity_low: "низкая влажность",
    humidity_norm: "влажность в норме",
    humidity_value: "Влажность: %number",
    kmph: "Километров в час",
    meters: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "%s метр",
            some: "%s метра",
            many: "%s метров",
            none: "%s метров"
        })
    },
    mmHg: "Миллиметров ртутного столба",
    more: "Ещё",
    mps: "Метров в секунду",
    nextSlide: "Пролистать вперед",
    night: "Ночью:",
    notifierCount: "Уведомления. Новых уведомлений: %count",
    nowTemp: "Текущая температура",
    nowWind: "Ветер сейчас:",
    "preset-switcher-title": "Какой тип предупреждений вам интереснее?",
    pressure_value: "Давление: %number %unit",
    prevSlide: "Пролистать назад",
    range: "от %min до %max",
    redefineGeolocation: "Ваше текущее местоположение %s. Нажмите, чтобы уточнить еще раз",
    removeSearchValue: "Удалить поисковый запрос",
    search: "Поиск",
    "sunrise-value": "Восход: %time",
    "sunset-value": "Закат: %time",
    "temp-at-alt": "На высоте %m %t",
    "temperature-card-item": "%{time}: %{temp}, %{condition}, %{feelsLike}.",
    "tide-last": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "В конце дня %height метр",
            some: "В конце дня %height метра",
            many: "В конце дня %height метров",
            none: "В конце дня %height метров"
        })
    },
    "tide-max": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "в %time локальный максимум, величина %value метр.",
            some: "в %time локальный максимум, величина %value метра.",
            many: "в %time локальный максимум, величина %value метров.",
            none: "в %time локальный максимум, величина %value метров."
        })
    },
    "tide-min": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "в %time локальный минимум, величина %value метр.",
            some: "в %time локальный минимум, величина %value метра.",
            many: "в %time локальный минимум, величина %value метров.",
            none: "в %time локальный минимум, величина %value метров."
        })
    },
    "tide-start": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "В начале дня %height метр.",
            some: "В начале дня %height метра.",
            many: "В начале дня %height метров.",
            none: "В начале дня %height метров."
        })
    },
    user2: "Ваш профиль. Новых писем: %count",
    "wave-card-item": "%time: %height, %direction, %period.",
    "wave-common": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Высота волн %height метр %direction, %period",
            some: "Высота волн %height метра, %direction, %period",
            many: "Высота волн %height метров, %direction, %period",
            none: "Высота волн %height метров, %direction, %period"
        })
    },
    "wave-height-zero": "нет волн",
    "wave-period": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "период %value секунда",
            some: "период %value секунды",
            many: "период %value секунд",
            none: "период %value секунд"
        })
    },
    "weather-by-altitude": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "На высоте %altitude метр %cloudiness, %temp",
            some: "На высоте %altitude метра %cloudiness, %temp",
            many: "На высоте %altitude метров %cloudiness, %temp",
            none: "На высоте %altitude метров %cloudiness, %temp"
        })
    },
    whetherNow: "Погода сейчас",
    "wind-card-item": "%{time}: %{condition}, %{speed}, %{gust},  %{direction}."
}, {
    lang: "ru"
}), BEM.I18N.decl("interface-common", {
    "404-text": "Вы попали на несуществующую страницу.<br> Вероятно, это произошло из-за опечатки или неправильной раскладки клавиатуры. <br><br> Если вы прошли сюда по ссылке, <a class='link' target='_blank' href='%s'>поделитесь ею с нами</a>, пожалуйста.",
    "500-text": "Сервис погоды временно недоступен.<br> Мы уже знаем о проблеме и работаем над её устранением.",
    "500-title": "Сервис временно недоступен",
    agreement: "Пользовательское соглашение",
    "agro-banner.button": "Узнать",
    "agro-banner.text.1": "Погодные решения для сева озимых",
    "agro-banner.text.2": "Погодная платформа для сельского хозяйства",
    air: "Воздух",
    alder: "Ольха",
    allergen: "Аллерген",
    "allergen-concentration": "Концентрация зёрен пыльцы в м<sup>3</sup> воздуха",
    "allergen-concentration-info-link": "https://yandex.ru/pogoda/docs/pollen-map.html#pollen-table",
    "another-city": "Погода рядом",
    "aqi-air-quality": "Качество воздуха AQI",
    "aqi-good": "в норме",
    "aqi-hazard": "опасное",
    "aqi-moderate": "выше нормы",
    "aqi-quality-description": "Воздух — {aqi-value} AQI, {aqi-meaning}",
    "aqi-unhealthy": "высокое",
    "aqi-unhealthy-a-bit": "слегка вредное",
    "aqi-unhealthy-a-lot": "очень вредное",
    "aqi-value": "%value AQI",
    ash: "Ясень",
    "autotranslate-button": "Понятно",
    "autotranslate-title": "Сайт переведён автоматически",
    "bandit-title": "А пока вы можете заказать погоду на удачу",
    birch: "Берёза",
    cereals: "Злаки",
    "channel-messenger": "Канал в Мессенджере",
    chat: "Чат",
    "climate-caption-air-humidity": "влажность воздуха",
    "climate-caption-cloudy-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "день с переменной облачностью",
            some: "дня с переменной облачностью",
            many: "дней с переменной облачностью",
            none: "дней с переменной облачностью"
        })
    },
    "climate-caption-rainfall": "мм осадков",
    "climate-caption-rainfall-title": "осадков",
    "climate-caption-rainfall-units": "мм",
    "climate-caption-rainfall-year-percentage": "{percentage}% годовой нормы",
    "climate-caption-rainy-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "день с длительными осадками",
            some: "дня с длительными осадками",
            many: "дней с длительными осадками",
            none: "дней с длительными осадками"
        })
    },
    "climate-caption-sunny-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "ясный день",
            some: "ясных дня",
            many: "ясных дней",
            none: "ясных дней"
        })
    },
    "climate-caption-temp-water": "Температура воды",
    "climate-tooltip-average-data": "Усреднённые данные за 10 лет",
    close: "Закрыть",
    cm: "см",
    "compare-day_types-title": "Солнечные, облачные и дождливые дни",
    "compare-menu-title": "Сравнение городов",
    "compare-preset-title": "Готовые подборки городов",
    "compare-promo": "Добавьте в список для сравнения погоды",
    "compare-remove-result_empty": "В списке больше нет городов",
    "copyright-meteum": "Beyond ML",
    "copyright-yandex": "ООО «ЯНДЕКС»",
    "data-providers-copyright": "Исходные данные: ООО «Яндекс.Пробки»; Росгидромет, ФГБУ «ЦАО»; © %year ECMWF; NOAA",
    "data-providers-copyright-wl": "Исходные данные: ООО «Яндекс.Пробки»; Росгидромет, ФГБУ «ЦАО»",
    "day-ak": "днём",
    "day-history-max-prec-mm": "Рекордные осадки: %s мм",
    "day-history-max-prec-mm-short": "Осадки",
    "day-history-max-temp": "Температурный максимум: %s",
    "day-history-max-temp-short": "Температура max",
    "day-history-min-temp": "Температурный минимум: %s",
    "day-history-min-temp-short": "Температура min",
    "day-history-prec-zero": "В этот день не было осадков",
    "day-history-prec-zero-short": "Без осадков",
    "day-history-record": "Побит рекорд",
    "day-history-title": "Этот день за %s наблюдений",
    "day-history-wind": "Самый сильный ветер, до %s",
    "day-history-wind-short": "Скорость ветра",
    "day-history-wind-zero": "В этот день, как правило, безветренно",
    "day-history-wind-zero-short": "Безветренно",
    "day-short-names": "Пн,Вт,Ср,Чт,Пт,Сб,Вс",
    "daylight-hours": "Световой день",
    "days-left": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Остался %d день",
            some: "Осталось %d дня",
            many: "Осталось %d дней",
            none: "Осталось %d дней"
        })
    },
    days_count: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "%s день",
            some: "%s дня",
            many: "%s дней",
            none: "%s дней"
        })
    },
    "default-retry": "Попробовать снова",
    "detailed-forecast": "Подробный прогноз",
    "details-breadcrumb-n-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Погода на {count} день",
            some: "Погода на {count} дня",
            many: "Погода на {count} дней",
            none: "Погода на {count} дней"
        })
    },
    "details-breadcrumb-weekend": "Погода на выходные",
    discuss: "Обсудить",
    "distance-km": "от вас %distance км",
    diurnal: "за сутки",
    "diurnal-change": "{number} за сутки",
    elm: "Вяз",
    "evening-ak": "вечером",
    extreme: "экстремальный",
    "favorite-title": "Избранное",
    feedback: "Обратная связь",
    feels: "Ощущается",
    "feels-like": "Ощущается как",
    "feels-like-temp": "Температура, ощущается как",
    find: "Найти",
    forecast: "Прогноз",
    "forecast-wind": "Ветер и порывы",
    forecast_condition_all_day: "%condition весь день",
    forecast_condition_first_half: "%condition в 1-й половине",
    forecast_condition_second_half: "%condition во 2-й половине",
    forecast_day_number: "%dayNumber-е",
    forecast_humidity_hight: "Высокая",
    forecast_humidity_low: "Низкая",
    forecast_humidity_norm: "В норме",
    forecast_pressure_hight: "Высокое",
    forecast_pressure_hight_jump: "резкое повышение",
    forecast_pressure_increase: "Повышенное",
    forecast_pressure_low: "Низкое",
    forecast_pressure_low_jump: "резкое понижение",
    forecast_pressure_lowering: "Пониженное",
    forecast_pressure_norm: "В норме",
    forecast_title_short: "На 10 дней",
    forecast_wind_hight: "Сильный",
    forecast_wind_light: "Легкий",
    forecast_wind_low: "Слабый",
    forecast_wind_middle: "Средний",
    forecast_wind_middle_up: "Умеренный",
    forecast_wind_storm: "Шторм",
    forecast_wind_tornado: "Ураган",
    "future-event-day": "{{day}} днём",
    "future-event-day-after-tomorrow": "послезавтра",
    "future-event-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "через {{n}} день",
            some: "через {{n}} дня",
            many: "через {{n}} дней",
            none: "через {{n}} дней"
        })
    },
    "future-event-evening": "{{day}} вечером",
    "future-event-morning": "{{day}} утром",
    "future-event-night": "в ночь на {{day}}",
    "future-event-time": "в {{time}}",
    "future-event-today": "сегодня",
    "future-event-tomorrow": "завтра",
    "gentime-updating": "Данные обновились в %time%",
    "geolocation-error-full-disable": "Уточните местоположение, разрешив браузеру доступ к геопозиции в настройках устройства",
    "geolocation-error-full-network": "Нет интернета, попробуйте позже",
    "geolocation-error-full-unknown": "Что-то пошло не так, попробуйте позже или воспользуйтесь поиском",
    "geolocation-specify-global": "Моё местоположение",
    "geolocation.how-to-allow.android": "https://yandex.ru/support/common/browsers-settings/geo-android.html",
    "geolocation.how-to-allow.default": "https://yandex.ru/support/common/browsers-settings/geolocation.html",
    "geolocation.how-to-allow.ios": "https://yandex.ru/support/common/browsers-settings/geo-ios.html",
    "geolocation.how-to-allow.windowsphone": "https://yandex.ru/support/common/browsers-settings/geo-winphone.html",
    "geomagnetic-field": "геомагнитное поле",
    "good-weather": "Хорошей погоды!",
    hPa: "гПа",
    "happy-new-year": "С новым годом!",
    hazel: "Орешник",
    high: "высокий",
    home: "Дом",
    hour: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "час",
            some: "часа",
            many: "часов",
            none: "часов"
        })
    },
    humidity: "Влажность",
    "icon-10-days": "10 дней",
    "icon-main": "главное",
    "icon-month": "месяц",
    "icon-on-map": "на карте",
    "in-month": "в %{month}",
    "in-the-world": "В мире",
    in_all_days: "Во все дни",
    km: "км",
    kmph: "км/ч",
    "lat-lon": "%lat-val %lat-unit, %lon-val %lon-unit",
    "lat-north-short": "с.ш.",
    "lat-south-short": "ю.ш.",
    "learn-more": "Узнать подробнее",
    "link-app": "Мобильное приложение",
    "link.b2b": "Для бизнеса",
    loading: "Загрузка",
    "lon-east-short": "в.д.",
    "lon-west-short": "з.д.",
    "longterm-nowcast-tooltip": "дальше прогноз по часам",
    low: "низкий",
    "low-tide-title": "Отлив",
    magic_box_popup_desc: "У Яндекса новая технология прогноза",
    magic_box_popup_no: "Не сейчас",
    magic_box_popup_yes: "Узнать",
    "magnetic-field": "Магнитное поле",
    "magnetic-field_0": "спокойное",
    "magnetic-field_1": "неустойчивое",
    "magnetic-field_2": "слабо возмущенное",
    "magnetic-field_3": "возмущенное",
    "magnetic-field_4": "магнитная буря",
    "magnetic-field_5": "большая магнитная буря",
    "magnetic-field_full_0": "Спокойное магнитное поле",
    "magnetic-field_full_1": "Неустойчивое магнитное поле",
    "magnetic-field_full_2": "Слабо возмущённое магнитное поле",
    "magnetic-field_full_3": "Возмущённое магнитное поле",
    "magnetic-field_full_4": "Магнитная буря",
    "magnetic-field_full_5": "Большая магнитная буря",
    "map.layer.icon": "Метки",
    "map.layer.wind": "Анимация ветра",
    maple: "Клён",
    "maps-widget-fact.link-to-map": "Открыть",
    "maps-widget-fact.pupkin_title": "Данные погодных карт временно недоступны",
    "maps-widget-fact.title": "Погода сейчас и прогноз — на картах",
    "maps-widget.alert.common": "Посмотреть изменения",
    "maps-widget.title.nowcast": "Карта осадков",
    "maps-widget.title.pollen": "Карта пыльцы",
    "maps-widget.title.pressure": "Карта давления",
    "maps-widget.title.snow-depth": "Карта глубины снега",
    "maps-widget.title.temperature": "Карта температуры",
    "maps-widget.title.wind": "Карта ветров",
    "maps.pollen.health-alert.button": "Обратиться к аллергологу онлайн",
    "maps.pollen.health-alert.contraindications": "Есть противопоказания. Посоветуйтесь с врачом.",
    "maps.pollen.no-data.day": "Не удалось получить данные. Уже разбираемся",
    "maps.pollen.no-data.period": "Не удалось получить данные. Уже разбираемся",
    "maps.pollen.popup-button": "Перейти",
    "maps.pollen.popup-null.title": "Рядом с вами нет пыльцы растений-аллергенов. Вы можете перейти к датам, когда она появится в воздухе.",
    "maps.pollen.timeline-text-climate": "Статистика на основе климатических данных за 7 лет",
    medium: "средний",
    "meta-default-description-main": "Подробный прогноз погоды на сегодня, завтра, неделю, 10 дней, месяц на Яндекс.Погоде. Прогноз погоды с точностью до района",
    "meta-default-description-main_meteumai": "Подробный прогноз погоды на сегодня, завтра, неделю, 10 дней, месяц на Meteum. Прогноз погоды с точностью до района",
    "meta-default-title-main": "Яндекс.Погода – точный прогноз погоды в любой точке мира",
    "meta-default-title-main_meteumai": "Meteum – точный прогноз погоды в любой точке мира",
    "meta-description-fallback": "Подробный прогноз погоды на сегодня, завтра, неделю, 10 дней, месяц на Яндекс.Погоде. Прогноз погоды с точностью до района",
    "meta-description-fallback-n-days": "Подробный прогноз погоды на сегодня, завтра, неделю, 3 дня, 5 дней, 7 дней, 9 дней, 10 дней, 14 дней, 16 дней, месяц на Яндекс.Погоде. Прогноз погоды с точностью до района",
    "meta-description-fallback-n-days_meteumai": "Подробный прогноз погоды на сегодня, завтра, неделю, **3 дня, 5 дней, 7 дней, 9 дней**, 10 дней, **14 дней, 16 дней**, месяц на Meteum. Прогноз погоды с точностью до района",
    "meta-description-main": "Подробный прогноз погоды для %{genitive}s на сегодня, завтра, неделю, 10 дней, месяц на Яндекс.Погоде. Прогноз погоды %{preposition}s %{prepositional}s с точностью до района",
    "meta-description-main-n-days": "Подробный прогноз погоды на сегодня, завтра, неделю, 3 дня, 5 дней, 7 дней, 9 дней, 10 дней, 14 дней, 16 дней, месяц на Яндекс.Погоде. Прогноз погоды %{preposition}s %{prepositional}s с точностью до района",
    "meta-description-main-n-days_meteumai": "Подробный прогноз погоды на сегодня, завтра, неделю, 3 дня, 5 дней, 7 дней, 9 дней, 10 дней, 14 дней, 16 дней, месяц на Meteum. Прогноз погоды %{preposition}s %{prepositional}s с точностью до района",
    "meta-description-main-nowcast-piece": "Карта осадков онлайн",
    "meta-description-maps-nowcast": "%{nominative}s: погода на карте в реальном времени по данным с метеорадаров на Яндекс.Погоде. Анимированная карта осадков и молний онлайн. Прогноз осадков в конкретном месте на каждые десять минут. Температура воздуха, давление и влажность, скорость ветра, магнитное поле и УФ-индекс. ☼ Время восхода и заката солнца. Мобильное приложение Яндекс.Погода.",
    "meta-description-maps-pollen": "Пыльцевой мониторинг Яндекс.Погоды показывает текущую концентрацию растительных аллергенов на карте %{genitive}s, а также прогноз концентрации. Концентрация пыльцы деревьев и других растений: берёза, сосна, клён, ольха, орешник, дуб, амброзия, полынь, ясень, ива, ель, вяз, крапива, злаковые и сорные травы. Аллергическая обстановка %{preposition}s %{prepositional}s.",
    "meta-description-maps-pressure": "Атмосферное давление на карте %{genitive}s. Прогноз изменения атмосферного давления на сегодня — %{preposition}s %{prepositional}s и других городах по всему миру. Яндекс.Погода — сервис точного прогноза погоды. Температура воздуха и воды, давление и влажность, скорость ветра, магнитное поле и УФ-индекс. ☼ Время восхода и заката солнца. Прогноз погоды в мобильном приложении.",
    "meta-description-maps-snow": "Глубина слоя снега на карте %{genitive}s. Прогноз изменения высоты снежного покрова на сегодня и на неделю — %{preposition}s %{prepositional}s и других городах по всему миру. Карта показывает, где лежит много снега, выпадет снег или растает",
    "meta-description-maps-temperature": "Температура воздуха на карте %{genitive}s в реальном времени на Яндекс.Погоде. Прогноз изменения температуры %{preposition}s %{prepositional}s и других городах по всему миру на карте. Яндекс.Погода — сервис точного прогноза погоды",
    "meta-description-maps-wind": "Скорость и направление ветра на карте %{genitive}s. Прогноз силы и направления ветра %{preposition}s %{prepositional}s и других городах по всему миру. Яндекс.Погода — сервис точного прогноза погоды. Температура воздуха и воды, давление и влажность, скорость ветра, магнитное поле и УФ-индекс. ☼ Время восхода и заката солнца. Прогноз погоды в мобильном приложении.",
    "meta-description-month-with-no-water-nom": "%s: Прогноз погоды на месяц. %s: Долгосрочный прогноз погоды на 30 дней. %s: Погода по месяцам на Яндекс.Погоде, температура воздуха днём и ночью, осадки, количество солнечных дней, давление и влажность",
    "meta-description-month-with-no-water-selected": "Погода %{preposition}s %{prepositional}s в %{month}: температура воздуха, количество солнечных дней, осадки, давление и влажность",
    "meta-description-month-with-no-water-selected-nom": "%s: Погода в %{month}, температура воздуха днём и ночью, количество солнечных дней, осадки, давление и влажность. %s: Погода по месяцам на Яндекс.Погоде, прогноз на сегодня, завтра, неделю, 10 дней, месяц",
    "meta-description-month-with-water-nom": "%s: Прогноз погоды на месяц на Яндекс.Погоде. %s: Долгосрочный прогноз погоды на 30 дней. %s: Погода по месяцам, температура воздуха днём и ночью, температура воды",
    "meta-description-month-with-water-selected": "Погода %{preposition}s %{prepositional}s в %{month}: температура воздуха, количество солнечных дней, осадки, давление и влажность. Температура воды %{preposition}s %{prepositional}s в %{month} на Яндекс.Погоде",
    "meta-description-month-with-water-selected-nom": "%s: Погода в %{month}, температура воздуха днём, температура ночью, количество солнечных дней, осадки, давление и влажность. %s: Температура воды в %{month}.",
    "meta-description-nowcast-fallback": "Погода на карте в реальном времени по данным с метеорадаров. Анимированная карта осадков онлайн. Прогноз осадков в конкретном месте на каждые десять минут. Температура воздуха, давление и влажность, скорость ветра, магнитное поле и УФ-индекс. ☼ Время восхода и заката солнца. Мобильное приложение Яндекс.Погода.",
    "meta-keywords-nowcast": "карта осадков, карта осадков онлайн, карта осадков в реальном времени, радар, метеорадар, погода на карте.",
    "meta-title-10-days": "Погода %{preposition}s %{prepositional}s на 10 дней",
    "meta-title-10-days-nom": "%s: погода на 10 дней",
    "meta-title-main": "Прогноз погоды %{preposition}s %{prepositional}s на 10 дней — Яндекс.Погода ",
    "meta-title-main-14": "Прогноз погоды %{preposition}s %{prepositional}s на 14 дней — Яндекс.Погода",
    "meta-title-main-n-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Прогноз погоды %{preposition}s %{prepositional}s на %{days} день — Яндекс.Погода",
            some: "Прогноз погоды %{preposition}s %{prepositional}s на %{days} дня — Яндекс.Погода",
            many: "Прогноз погоды %{preposition}s %{prepositional}s на %{days} дней — Яндекс.Погода",
            none: "Прогноз погоды %{preposition}s %{prepositional}s на %{days} дней — Яндекс.Погода"
        })
    },
    "meta-title-maps-nowcast": "Погода %{preposition}s %{prepositional}s — карта осадков ☂ и гроз онлайн — Яндекс.Погода",
    "meta-title-maps-nowcast-with-date": "Погода %{preposition}s %{prepositional}s %{time}s — карта осадков ☂ и гроз онлайн",
    "meta-title-maps-pollen": "Пыльцевой мониторинг – 2019 на карте %{genitive}s: концентрация пыльцы растений и деревьев по районам — Яндекс.Погода",
    "meta-title-maps-pressure": "Погода %{preposition}s %{prepositional}s: атмосферное давление на карте — Яндекс.Погода",
    "meta-title-maps-snow": "Погода %{preposition}s %{prepositional}s: высота снежного покрова на карте — Яндекс.Погода",
    "meta-title-maps-temperature": "Погода %{preposition}s %{prepositional}s: температура на карте онлайн — Яндекс.Погода",
    "meta-title-maps-wind": "Погода %{preposition}s %{prepositional}s: скорость и направление ветра на карте — Яндекс.Погода",
    "meta-title-month": "Погода %{preposition}s %{prepositional}s на месяц",
    "meta-title-month-nom": "%s: Погода на месяц",
    "meta-title-month-selected": "Погода %{preposition}s %{prepositional}s в %{month}",
    "meta-title-month-selected-nom": "Погода в %{month}. %s",
    "meta-title-nowcast": "Погода %{preposition}s %{prepositional}s — карта осадков и гроз онлайн — Яндекс.Погода",
    "meteo-stations": "Метеостанции",
    meters: "%s м",
    "meters-short-unit": "м",
    meteum: "Метеум",
    "meteum-description": "Как Яндекс рассчитывает точный прогноз погоды для каждого конкретного места.",
    "meteum-promo-button-text": "Узнать",
    "meteum-promo-question": "Как Яндекс рассчитывает свой прогноз погоды?",
    "meteum-tech": "Технология точного прогноза",
    "meteum-title": "Технология Meteum",
    minute: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "минута",
            some: "минуты",
            many: "минут",
            none: "минут"
        })
    },
    mmHg: "мм рт. ст.",
    mobile: "Мобильная версия",
    month: "Прогноз на месяц",
    "month-names-partitive": "января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря",
    "month-names-short-partitive": "янв|февр|марта|апр|мая|июня|июля|авг|сент|окт|нояб|дек",
    "month-nom-names": "январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь",
    "month-prep-names": "январе,феврале,марте,апреле,мае,июне,июле,августе,сентябре,октябре,ноябре,декабре",
    months: "янв.|февр.|март|апр.|май|июнь|июль|авг.|сент.|окт.|нояб.|дек.",
    "months-switcher": "Погода по месяцам",
    months_genitive: "янв.|февр.|марта|апр.|мая|июня|июля|авг.|сент.|окт.|нояб.|дек.",
    "moon-phase_label": "Фаза луны",
    more: "Ещё",
    "more-details": "Подробнее",
    "morning-ak": "утром",
    mps: "м/с",
    "my-location-precise": "Уточните геолокацию",
    "nav-forecast-n-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Прогноз на {count} день",
            some: "Прогноз на {count} дня",
            many: "Прогноз на {count} дней",
            none: "Прогноз на {count} дней"
        })
    },
    "nav-forecast-n-days-short": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "На {count} день",
            some: "На {count} дня",
            many: "На {count} дней",
            none: "На {count} дней"
        })
    },
    "nav-forecast-n-detailed": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Подробный прогноз на {count} день",
            some: "Подробный прогноз на {count} дня",
            many: "Подробный прогноз на {count} дней",
            none: "Подробный прогноз на {count} дней"
        })
    },
    "nearest-water-value": "%location %temp",
    nettle: "Крапива",
    new: "новое",
    "new-map-layer": "новая карта",
    "news-additional-source-count": "и ещё %number",
    next_week_alerts_group: "На следующей неделе: %s",
    "night-ak": "ночью",
    "no-search-result": "По вашему запросу ничего не нашлось",
    "not-found": "По вашему запросу ничего не найдено",
    now: "Сейчас",
    "nowcast-button": "Осадки на карте",
    "nowcast.banner.nodata": "Данные ближайшего метеорадара временно недоступны",
    "nowcast.banner.subtitle": "Показать на карте",
    "nowcast.banner.subtitle.show.forecast": "Посмотреть",
    "nowcast.banner.text.empty": "Открыть карту осадков",
    "nowcast.banner.title.show.forecast": "Прогноз осадков на карте",
    "nowcast.map.noradars": "Серым обозначены области,<br>для которых нет данных метеорадаров",
    oak: "Дуб",
    "other-cities-title": "Погода в других городах",
    "page-doesnt-exist": "Такой страницы не существует",
    "past-event-1-hour": "час назад",
    "past-event-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} день назад",
            some: "{{n}} дня назад",
            many: "{{n}} дней назад",
            none: "{{n}} дней назад"
        })
    },
    "past-event-half-hour": "полчаса назад",
    "past-event-hours": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} час назад",
            some: "{{n}} часа назад",
            many: "{{n}} часов назад",
            none: "{{n}} часов назад"
        })
    },
    "past-event-near": "только что",
    "past-event-yesterday": "вчера",
    "perfect-visibility": ">10 км",
    pine: "Сосна",
    "polar-day": "Полярный день",
    "polar-night": "Полярная ночь",
    pollen: "Пыльца",
    "pollen-level.high": "высокая концентрация",
    "pollen-level.high-concentration": "высокая концентрация",
    "pollen-level.low": "низкая",
    "pollen-level.low-concentration": "низкая концентрация",
    "pollen-level.middle": " средняя",
    "pollen-level.middle-concentration": "средняя концентрация",
    "pp-button-title-text-android": "Скачать приложение Яндекс в Google Play",
    "pp-button-title-text-huawei": "Скачать приложение Яндекс в App Gallery",
    "pp-button-title-text-ios": "Скачать приложение Яндекс в App Store",
    precipitation: "осадки",
    "preset-base": "Общий",
    "preset-fishing": "Рыбалка",
    "preset-gardening": "Сад и огород",
    "preset-mountains": "В горах",
    "preset-running": "Бег",
    "preset-running-aqi-note": "Прогноз отражает общий уровень загрязнения воздуха на основе модельных расчетов концентрации химических веществ в воздухе. Данные являются оценочными",
    "preset-running-aqi-note-label": "Информация про качество воздуха AQI",
    "preset-title-entry-points": "Прогноз для вашего хобби",
    "preset-water-sport": "Водный спорт",
    pressure: "Давление",
    "pressure-change": "%time: %value %unit, %type",
    "pressure-jump": "скачок",
    "pressure-legend-jump": "Резкое изменение на %value и более единиц",
    "pressure-legend-norm": "Норма для вашей локации от %down до %up %unit",
    "pressure-legend-uncomfortable": "Выше или ниже нормы",
    "pressure-norm": "норма",
    "pressure-with-unit": "Давление, %unit",
    "pro-common-title": "Общие",
    "promo-techno.intro": "Как Яндекс рассчитывает свой прогноз погоды?",
    "promo-techno.read": "Читать",
    "promo-urok.button": "Узнать",
    "promo-urok.intro": "«Урок цифры» для школьников: «Как Яндекс предсказывает погоду»",
    "promo.paranja.button": "Посмотреть",
    "promo.paranja.checkbox.layers": "Галочки внизу включают и выключают отображение части данных",
    "promo.paranja.checkbox.layers.pollen": "Здесь можно выбрать аллергены, которые будут видны на карте. По умолчанию выбраны все",
    "promo.paranja.checkbox.maps": "Карты переключаются здесь",
    "promo.paranja.checkbox.timeline": "По временной шкале можно перемещаться назад и вперёд",
    "promo.paranja.text": "Теперь на карте можно увидеть прогноз не только осадков, но и температуры, давления и ветра",
    "promo.paranja.text.nowcast": "На живой карте осадков видно, где пойдёт дождь или снег. Карта знает прошлое, настоящее и будущее каждой тучи.",
    "promo.paranja.text.pollen": "На карте погоды теперь можно посмотреть концентрацию пыльцы в воздухе. Не дайте аллергии застать вас врасплох!",
    "promo.paranja.title": "Новые погодные карты",
    "promo.paranja.title.nowcast": "Дождь и снег в прямом эфире",
    "promo.paranja.title.pollen": "Карта пыльцы",
    radar: "Радар",
    ragweed: "Амброзия",
    "read-more": "Читать ещё",
    retry: "Повторить загрузку",
    "running-condition-discomfort": "Бег в такую погоду может быть дискомфортным",
    "running-condition-undesirable": "Не рекомендовано бегать в такую погоду",
    "running-condition-well": "Благоприятная погода для бега",
    sagebrush: "Полынь",
    satellite: "Спутник",
    "search-history": "История поиска",
    "search-place": "Город или район",
    "search-place-enter": "Введите город или район",
    "second-short": "%value с",
    "selected-location": "Текущее: %location",
    "service-name": "Яндекс Погода",
    share: "Поделиться",
    "share-facebook": "Facebook",
    "share-odnoklassniki": "Одноклассники",
    "share-telegram": "Telegram",
    "share-twitter": "Twitter",
    "share-viber": "Viber",
    "share-vkontakte": "ВКонтакте",
    "share-whatsapp": "WhatsApp",
    "shortened-forecast": "Краткий прогноз",
    "show-lightnings": "Молнии",
    "similar-cities": "Города с похожей погодой в %{month}",
    "ski-card-maps-link": "Карта снега",
    "ski-card-snow-maps": "Карта снега",
    "ski-card-title": "Интенсивность снегопада",
    "ski-closed": "Сезон закрыт %date",
    "ski-closing": "Закрытие сезона %date",
    "ski-details-humidity": "Влажность",
    "ski-details-not-snow": "Свежего снега не ожидается",
    "ski-details-other": "Дополнительно",
    "ski-details-pressure": "Давление, мм.рт.ст",
    "ski-details-snow": "Свежий снег, мм",
    "ski-details-visibility": "Видимость, км",
    "ski-details-wind": "Ветер и порывы, м/с",
    "ski-fallback": "Погода по высотам",
    "ski-onboarding-btn": "Посмотреть",
    "ski-onboarding-text": "Теперь в Яндекс.Погоде можно смотреть подробный прогноз на горнолыжных курортах",
    "ski-opened": "Сезон открылся %date",
    "ski-opening": "Открытие сезона %date",
    "ski-promo-text": "Точный прогноз погоды для горнолыжных курортов",
    "ski-resort-forecast": "Погода по высотам",
    "ski-snow-alert": "Снег был %time часа назад",
    "ski-snow-alert-future": "Снегопад будет {{time}}",
    "ski-snow-alert-half-hour": "Снег был полчаса назад",
    "ski-snow-alert-hour": "Снег был час назад",
    "ski-snow-alert-past": "Снег был {{time}}",
    "ski_alert.hide": "Скрыть",
    "ski_alert.thanks": " Спасибо, теперь мы сможем показывать вам более полезную информацию",
    "snow-depth-map": "Глубина снега",
    "snow-map-full-snow": "более 5 м",
    "snow-map-lower-bound": "от %n см",
    "snow-map-no-snow": "нет снега",
    "snow-map-upper-bound": "до %n см",
    "snowy-days-count": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "%s день снег",
            some: "%s дня снег",
            many: "%s дней снег",
            none: "%s дней снег"
        })
    },
    "social-links-title": "Мы в социальных сетях",
    soil: "Почва",
    "soil-moisture-and-temp-level-1": "Почва сухая, %{temp}",
    "soil-moisture-and-temp-level-2": "Почва влажная, %{temp}",
    "soil-moisture-and-temp-level-3": "Почва сырая, %{temp}",
    "soil-moisture-level-1": "Почва сухая",
    "soil-moisture-level-2": "Почва влажная",
    "soil-moisture-level-3": "Почва сырая",
    "sources-data": "Источники данных",
    "specify-location": "Найти меня",
    "sport-condition-discomfort": "Занятие спортом на улице в такую погоду может быть дискомфортным",
    "sport-condition-undesirable": "Не рекомендовано заниматься спортом на улице в такую погоду",
    "sport-condition-well": "Благоприятная погода для занятия спортом на улице",
    spruce: "Ель",
    "stage.plural.not-releasing-pollen": "не цветут рядом с вами",
    "stage.plural.releasing-pollen": "цветут рядом с вами",
    "stage.singular.not-releasing-pollen": "не цветёт рядом с вами",
    "stage.singular.releasing-pollen": "цветёт рядом с вами",
    stat: "Статистика",
    "summer-sport-title": "Летний спорт",
    "sun-and-moon": "Солнце и луна",
    "sunny-days-count": "%s  дн. солнце",
    sunrise: "Восход",
    sunset: "Закат",
    support: "Справка",
    "support-channel": "Поддержка",
    "temp-water": "t воды",
    temperature: "температура",
    "temperature-air": "Температура воздуха %{temp}",
    "temperature-short": "Темп.",
    this_week_alerts_group: "На этой неделе: %s",
    "tide-extremum": "в %time уровень воды %value",
    "tide-title": "Прилив",
    tides: "Приливы",
    "time.format.date-time": "%date в %time",
    "time.format.h-m": "%h ч %m мин",
    "time.format.yesterday-time": "вчера в %time",
    "timeline.loading-error": "не удалось получить данные",
    "timeline.no-data": "для этого места нет данных",
    "timeline.reload": "обновить",
    "title-10-days": "Погода на 10 дней %{preposition}s %{prepositional}s",
    "title-10-days-nom": "Погода на 10 дней — %s",
    "title-attention": "Предупреждение",
    "title-n-days-nom": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Погода на {count} день — %s",
            some: "Погода на {count} дня — %s",
            many: "Погода на {count} дней — %s",
            none: "Погода на {count} дней — %s"
        })
    },
    today: "сегодня",
    tomorrow: "завтра",
    total: "всего",
    "try-another-city": "Попробуйте выбрать другой город",
    "ugc-nowcast-alert-noprec": "По сообщениям пользователей, осадков нет",
    "ugc-nowcast-alert-rain": "По сообщениям пользователей, идёт дождь",
    "ugc-nowcast-alert-sleet": "По сообщениям пользователей, идут осадки",
    "ugc-nowcast-alert-snow": "По сообщениям пользователей, идёт снег",
    "ugc-report-tooltip-noprec": "Пользователь сообщил, что здесь без осадков",
    "ugc-report-tooltip-rain": "Пользователь сообщил, что здесь идёт дождь",
    "ugc-report-tooltip-sleet": "Пользователь сообщил, что здесь идут осадки",
    "ugc-report-tooltip-snow": "Пользователь сообщил, что здесь идёт снег",
    "ugc-reports": "Сигналы пользователей",
    "until-the-new-year": "До нового года",
    "up-to": "до %s",
    "user-agreement": "Пользовательское соглашение",
    "usually-in-month": "обычно в %{month}",
    "uv-index": "УФ-индекс",
    "uv-index-value": "УФ-индекс: %value",
    "value-km": "%s км",
    "value-sm": "%value см",
    "very-high": "очень высокий",
    visibility: "Видимость",
    "water-temperature": "Температура воды",
    "water-temperature-value": "Вода днём %value",
    "wave-calm": "штиль",
    "wave-e": "c востока",
    "wave-height": "Высота волн",
    "wave-n": "с севера",
    "wave-ne": "с северо-востока",
    "wave-nw": "с северо-запада",
    "wave-period": "Период",
    "wave-s": "с юга",
    "wave-se": "c юго-востока",
    "wave-sw": "с юго-запада",
    "wave-w": "с запада",
    waves: "Волны, %unit",
    weather: "Погода",
    "weather-brief-14": "Погода на 14 дней",
    "weather-brief-N": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Погода на {count} день",
            some: "Погода на {count} дня",
            many: "Погода на {count} дней",
            none: "Погода на {count} дней"
        })
    },
    "weather-forecast": "Прогноз погоды",
    "weather-in-world": "Погода в мире",
    "weather-month": "На месяц",
    "weather-news": "Новости погоды",
    "weather-news-short": "Новости",
    "weather-online": "погода в прямом эфире",
    "weather-today": "Погода сегодня — %s",
    "weather-tomorrow": "Погода завтра — %s",
    weather_in: "Погода %preposition %prepositional",
    "webgl.error.button.hide": "Больше не показывать",
    "webgl.error.button.ok": "ОК",
    "webgl.error.disable": "Включите WebGL в настройках браузера. Если там такого нет, лучше смотреть карту в другом браузере",
    weedy: "Сорные травы",
    week_day_friday: "пятница",
    week_day_monday: "понедельник",
    week_day_saturday: "суббота",
    week_day_short_friday: "пт",
    week_day_short_monday: "пн",
    week_day_short_saturday: "сб",
    week_day_short_sunday: "вс",
    week_day_short_thursday: "чт",
    week_day_short_tuesday: "вт",
    week_day_short_wednesday: "ср",
    week_day_sunday: "воскресенье",
    week_day_thursday: "четверг",
    week_day_tuesday: "вторник",
    week_day_wednesday: "среда",
    weekend_alerts_group: "В выходные: %s",
    "white-meta-default-description-main": "Подробный прогноз погоды на сегодня, завтра, неделю, 10 дней, месяц. Прогноз погоды с точностью до района. ☂ Карта осадков онлайн и другие погодные карты. Температура воздуха и воды, давление и влажность, скорость ветра, магнитное поле и УФ-индекс. ☼ Время восхода и заката солнца. Информация о климате регионов.",
    "white-meta-description-fallback": "Подробный прогноз погоды на сегодня, завтра, неделю, 10 дней, месяц. Прогноз погоды с точностью до района. ☂ Карта осадков онлайн и другие погодные карты. Температура воздуха и воды, давление и влажность, скорость ветра, магнитное поле и УФ-индекс. ☼ Время восхода и заката солнца. Информация о климате регионов.",
    "white-meta-description-main": "Подробный прогноз погоды для %{genitive}s на сегодня, завтра, неделю, 10 дней, месяц. Прогноз погоды %{preposition}s %{prepositional}s с точностью до района. ☂ Карта осадков онлайн и другие погодные карты. Температура воздуха и воды, давление и влажность, скорость ветра, магнитное поле и УФ-индекс. ☼ Время восхода и заката солнца. Информация о климате регионов. ",
    willow: "Ива",
    wind: "Ветер",
    "wind-calm": "Штиль",
    "wind-calm-short": "Штиль",
    "wind-e": "восточный",
    "wind-e-short": "В",
    "wind-guest-title": "Порывы ветра",
    "wind-gust": "Порывы",
    "wind-n": "северный",
    "wind-n-short": "С",
    "wind-ne": "северо-восточный",
    "wind-ne-short": "СВ",
    "wind-nw": "северо-западный",
    "wind-nw-short": "СЗ",
    "wind-s": "южный",
    "wind-s-short": "Ю",
    "wind-se": "юго-восточный",
    "wind-se-short": "ЮВ",
    "wind-speed": "Ветер: %@",
    "wind-sw": "юго-западный",
    "wind-sw-short": "ЮЗ",
    "wind-w": "западный",
    "wind-w-short": "З",
    "wind-with-unit": "Ветер, %unit",
    "winter-sport-title": "Зимний спорт",
    work: "Работа",
    "ya-pogoda": "Яндекс.Погода",
    years: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "год",
            some: "года",
            many: "лет",
            none: "лет"
        })
    },
    yesterday: "вчера",
    "yesterday-temp": "Вчера в это время"
}, {
    lang: "ru"
}), BEM.I18N.decl("interface-desktop", {
    a11y_cameras_title: "Онлайн-веб-камеры в %city и в других городах",
    "allergen-main": "Основной аллерген — %allergen",
    "allergens-main": "Основные аллергены: %allergens",
    "at-another-time": "В другой раз",
    "bar-weather": "Погода в вашем браузере",
    cameras_title: "Веб-камеры в других городах",
    "cities-dynamic": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "%d город",
            some: "%d города",
            many: "%d городов",
            none: "%d городов"
        })
    },
    "clarify-my-location": "Перейти к моему местоположению",
    "clarify-my-location-progress": "Чуть-чуть подождите",
    "clarify-my-location-progress-short": "Подождите..",
    "clarify-my-location-short": "Рядом со мной",
    "clarify-my-location-success": "Моё местоположение",
    "climate-caption-temp-day": "Температура днём",
    "climate-caption-temp-night": "Температура ночью",
    color: "Цвет",
    colorful: "разноцветный",
    "compare-add": "Добавить к сравнению",
    "compare-add-city": "Добавьте город",
    "compare-add-result": "Добавлено к сравнению: %s",
    "compare-add-short": "Сравнить",
    "compare-empty-list-text": "Начните печатать название города и выберите нужный из списка или посмотрите готовые подборки для сравнения погоды в разных городах.",
    "compare-go": "Перейти к сравнению",
    "compare-list-length": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "В списке %n место",
            some: "В списке %n места",
            many: "В списке %n мест",
            none: "В списке %n мест"
        })
    },
    "compare-my-comparison-link": "Перейти к моему сравнению",
    "compare-preset-1": "Курорты Чёрного моря",
    "compare-preset-2": "Где хорошо летом в Европе",
    "compare-preset-3": "Где отдохнуть в Азии",
    "compare-preset-4": "В Европу на Рождество",
    "compare-preset-5": "Северное побережье Европы",
    "compare-preset-6": "Где купаться в Африке",
    "compare-preset-7": "Города Тайланда",
    "compare-remove": "Удалить из сравнения",
    "compare-remove-result": "Удалено из сравнения: %s",
    "compare-remove-short": "В сравнении",
    "compare-restrict-advice": "Удалите место, чтобы добавить другое",
    "compare-restrict-message": "Нельзя добавить в сравнение больше %n мест",
    "copyright-tech-climate": "Прогноз погоды на %{month} %{year} года на основе исторических данных за последние 10 лет.",
    "copyright-tech-climate-30days": "Прогноз погоды на месяц на основе исторических данных за последние 10 лет.",
    "copyright-tech-fallback": "%s: локальный прогноз погоды рассчитан с помощью технологии Meteum",
    "copyright-tech-fallback-wl": "%s",
    "copyright-tech-meteum": "Прогноз погоды %s1 %s2 на сегодня, завтра и на ближайшую неделю с точностью до района — рассчитан с помощью технологии Meteum",
    "copyright-tech-meteum-coordinates": "Локальный прогноз рассчитан с помощью технологии Meteum",
    "copyright-tech-meteum-wl": "Прогноз погоды %s1 %s2 на сегодня, завтра и на ближайшую неделю с точностью до района",
    countries: "Страны",
    "countries-dynamic": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "%d страна",
            some: "%d страны",
            many: "%d стран",
            none: "%d стран"
        })
    },
    "data-providers-copyright-for-meteum-pages": "Исходные данные: ООО «Яндекс.Пробки»; Росгидромет, ФГБУ «ЦАО»; © 2020 ECMWF; NOAA",
    "details-breadcrumb": "Погода на 10 дней",
    "details-more": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Показать еще %n день",
            some: "Показать еще %n дня",
            many: "Показать еще %n дней",
            none: ""
        })
    },
    "fact-humidity": "Влажность",
    "fact-pressure": "Давление",
    "fact-water": "Вода",
    "fact-wind": "Ветер",
    field_0: "спокойное",
    field_1: "неустойчивое",
    field_2: "слабо возмущенное",
    field_3: "возмущенное",
    field_4: "магнитная буря",
    field_5: "большая магнитная буря",
    field_redesign_0: "Спокойное магнитное поле",
    field_redesign_1: "Неустойчивое магнитное поле",
    field_redesign_2: "Слабо возмущённое магнитное поле",
    field_redesign_3: "Возмущённое магнитное поле",
    field_redesign_4: "Магнитная буря",
    field_redesign_5: "Большая магнитная буря",
    "geolocation-error-disabled": "У вас запрещена геолокация, разрешите её в настройках браузера",
    "geolocation-error-network": "Нет соединения с интернетом. Попробуйте позже",
    "geolocation-error-unknown": "Не получилось уточнить место. Попробуйте позже",
    "hourly-link-label": "Почасовой прогноз",
    "index-header": "Погода %{preposition}s %{prepositional}s",
    "informer-code": "Код информера",
    "informer-header": "Актуальная информация о погоде — на вашем\n          сайте\n        ",
    "informer-select-city": "Выбрать информер погоды для города:",
    "informer-text1": "Вы можете установить на своём сайте информер с данными о\n          погоде.\n        ",
    "informer-text2": "Выберите интересующий вас регион и вариант информера, подходящий\n          вам по цвету и размеру. Разместите полученный код на страницах своего сайта или блога.\n        ",
    informers: "Информеры",
    "link-API": "API Яндекс.Погоды",
    "link-app-store": "Скачать Яндекс.Погоду в AppStore",
    "link-apps": "Мобильные приложения",
    "link-forecast": "Прогноз погоды",
    "link-google-play": "Скачать Яндекс.Погоду на Google Play",
    "link-windows-store": "Скачать Яндекс.Погоду в Windows Store",
    links: "Ссылки",
    "location-precise": "Уточнить местоположение",
    "magnetic-field": "Магнитное поле",
    "maps-ad-hide": "Скрыть рекламу",
    "maps.pollen.clear": "Все аллергены",
    "maps.pollen.toggle.hide": "Свернуть",
    "maps.pollen.toggle.show": "Показать всё",
    "max-temp-day-alt": "Максимальная температура днём",
    "meta-description-fallback": "Подробный прогноз погоды в городах всего мира на ближайшие 10 дней на Яндекс.Погоде. Температура воздуха и воды, осадки, давление и влажность, скорость ветра, магнитное поле и УФ-индекс",
    "meta-description-region": "Подробный прогноз погоды в городах %{genitive}s и всего мира на ближайшие 10 дней на Яндекс.Погоде. Температура воздуха и воды, осадки, давление и влажность, скорость ветра, магнитное поле и УФ-индекс",
    "meta-description-region-no-chief": "Подробный прогноз погоды в городах всего мира на ближайшие 10 дней на Яндекс.Погоде. Температура воздуха и воды, осадки, давление и влажность, скорость ветра, магнитное поле и УФ-индекс",
    "meta-description-widgets": "Яндекс.Погода предоставляет актуальную информацию о погоде для использования на вашем сайте. Вы можете установить на своём сайте информер с данными о погоде. Выберите интересующий вас регион и вариант информера, подходящий вам по цвету и размеру. На информере есть облачность, осадки, температура днём, температура ночью и ссылка на прогноз на 10 дней.",
    "meta-keywords-nowcast": "карта осадков, карта осадков онлайн, карта осадков в реальном времени, радар, метеорадар, погода на карте.",
    "meta-title-choose": "Прогноз погоды по городам",
    "meta-title-region": "Погода %{preposition}s %{prepositional}s — Яндекс.Погода",
    "meta-title-widgets": "Информер погоды для вашего сайта",
    "min-temp-night-alt": "Минимальная температура ночью",
    "month-forecast": "Прогноз на месяц",
    "moon-phase_label": "Фаза луны",
    "my-location-hint-done": "Прогноз рассчитан для ваших координат",
    "my-location-hint-get": "Рассчитать прогноз для моих координат",
    "nav-forecast-10d-detailed": "Подробный прогноз на 10 дней",
    "nav-forecast-10d-v2": "Прогноз на 10 дней",
    "nav-forecast-10d-v2-short": "На 10 дней",
    "nav-forecast-30d-v2": "Прогноз на месяц",
    "nav-forecast-30d-v2-short": "На месяц",
    "nav-maps-v2": "Погода на карте",
    "nav-maps-v2-short": "На карте",
    "open-manual": "Открыть инструкцию",
    "other-cities": "Другие города",
    "other-cities-title": "Погода в других городах",
    partners: "Партнёрам",
    "pollen-alert-button-not-interesting": "Неинтересно",
    "pollen-alert-button-notify": "Сообщать мне о пыльце",
    "pollen-alert-popup-allergens-hide": "Не оповещать меня о пыльце",
    "pollen-alert-popup-allergens-save": "Сохранить",
    "pollen-alert-popup-allergens-title": "Выберите аллергены",
    "pollen-alert-popup-hide-cancel": "Отмена",
    "pollen-alert-popup-hide-description": "Вернуть уведомления будет нельзя",
    "pollen-alert-popup-hide-title": "Скрыть уведомления для аллергиков?",
    "pollen-alert-popup-hide-yes": "Хорошо",
    "pollen-today-concentration-high": "В воздухе высокая концентрация пыльцы",
    "pollen-today-concentration-low": "В воздухе низкая концентрация пыльцы",
    "pollen-today-concentration-medium": "В воздухе средняя концентрация пыльцы",
    "pollen-today-concentration-none": "В воздухе нет пыльцы растений-аллергенов",
    "search-result-title": "Вы искали:",
    size: "Размер",
    "temp-alt-celsius": "%d° по Цельсию",
    "timeline-forecast": "Прогноз",
    "try-first": "Посмотреть",
    "weather-in": "Погода %p %s",
    "weather-in-cities": "Погода в городах",
    "weather-on-map": "Погода на карте",
    "weather-unknown": "погода в этом городе нам неизвестна",
    "weather-with-you": "Погода с собой",
    white: "белый",
    "widget-ya": "Виджет для Яндекса"
}, {
    lang: "ru"
}), BEM.I18N.decl("interface-gdpr", {
    "gdpr.button.accept.all": "Принять все файлы cookie",
    "gdpr.button.confirm.choice": "Подтвердить",
    "gdpr.button.settings": "Настройки файлов cookie",
    "gdpr.choice.analytic": "Аналитические файлы cookie",
    "gdpr.choice.essential": "Обязательные файлы cookie",
    "gdpr.choice.other": "Другие файлы cookie",
    "gdpr.description": "Meteum использует обязательные, аналитические, маркетинговые и другие файлы cookie. Они нужны для обеспечения бесперебойной работы сайта Meteum и запоминания ваших персональных настроек. Для получения более подробной информации, пожалуйста, ознакомьтесь с нашей Политикой использования файлов cookie.",
    "gdpr.title": "Вкусно и полезно"
}, {
    lang: "ru"
}), BEM.I18N.decl("interface-metatags", {
    "forecast-countries": "Прогноз погоды для разных стран — Яндекс.Погода",
    "meta-description-fallback": "Подробный прогноз погоды на сегодня, завтра, неделю, 10 дней, месяц на Яндекс.Погоде. Прогноз погоды с точностью до района",
    "meta-description-fallback_meteumai": "Подробный прогноз погоды на сегодня, завтра, неделю, 10 дней, месяц на Meteum. Прогноз погоды с точностью до района",
    "meta-description-main": "Подробный прогноз погоды для %{genitive}s на сегодня, завтра, неделю, 10 дней, месяц на Яндекс.Погоде. Прогноз погоды %{preposition}s %{prepositional}s с точностью до района",
    "meta-description-main-nowcast-piece": "Карта осадков онлайн — Яндекс.Погода",
    "meta-description-main_meteumai": "Подробный прогноз погоды для %{genitive}s на сегодня, завтра, неделю, 10 дней, месяц на Meteum. Прогноз погоды %{preposition}s %{prepositional}s с точностью до района",
    "meta-description-month-with-no-water-nom": "%s: Прогноз погоды на месяц. %s: Долгосрочный прогноз погоды на 30 дней. %s: Погода по месяцам на Яндекс.Погоде, температура воздуха днём и ночью, осадки, количество солнечных дней, давление и влажность",
    "meta-description-month-with-no-water-selected": "Погода %{preposition}s %{prepositional}s в %{month}: температура воздуха, количество солнечных дней, осадки, давление и влажность. Прогноз погоды %{preposition}s %{prepositional}s по месяцам на Яндекс.Погоде",
    "meta-description-month-with-no-water-selected-nom": "%s: Погода в %{month}, температура воздуха днём и ночью, количество солнечных дней, осадки, давление и влажность",
    "meta-description-region": "Подробный прогноз погоды в городах %{genitive}s и всего мира на ближайшие 10 дней на Яндекс.Погоде. Температура воздуха и воды, осадки, давление и влажность, скорость ветра, магнитное поле и УФ-индекс",
    "meta-description-region-no-chief": "Подробный прогноз погоды в городах всего мира на ближайшие 10 дней на Яндекс.Погоде. Температура воздуха и воды, осадки, давление и влажность, скорость ветра, магнитное поле и УФ-индекс",
    "meta-description-weekend": "Яндекс.Погода — Подробный прогноз погоды %{preposition}s %{prepositional}s на выходные. Информация о температуре воздуха, силе ветра, давлении и влажности воздуха %{preposition}s %{prepositional}s",
    "meta-title-main": "Прогноз погоды %{preposition}s %{prepositional}s на 10 дней — Яндекс.Погода",
    "meta-title-main-14": "Прогноз погоды %{preposition}s %{prepositional}s на 14 дней — Яндекс.Погода",
    "meta-title-main-n-days": function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "Прогноз погоды %{preposition}s %{prepositional}s на %{days} день — Яндекс.Погода",
            some: "Прогноз погоды %{preposition}s %{prepositional}s на %{days} дня — Яндекс.Погода",
            many: "Прогноз погоды %{preposition}s %{prepositional}s на %{days} дней — Яндекс.Погода",
            none: "Прогноз погоды %{preposition}s %{prepositional}s на %{days} дней — Яндекс.Погода"
        })
    },
    "meta-title-month": "Погода %{preposition}s %{prepositional}s на месяц — Яндекс.Погода",
    "meta-title-month-nom": "%s: Погода на месяц — Яндекс.Погода ",
    "meta-title-month-selected": "Погода %{preposition}s %{prepositional}s в %{month} — Яндекс.Погода ",
    "meta-title-month-selected-nom": "Погода в %{month}. %s: Яндекс.Погода ",
    "meta-title-region": "Погода %{preposition}s %{prepositional}s — Яндекс.Погода",
    "meta-title-today": "Погода %{preposition}s %{prepositional}s сегодня — Яндекс.Погода",
    "meta-title-tomorrow": "Погода %{preposition}s %{prepositional}s завтра — Яндекс.Погода",
    "meta-title-weekend": "Прогноз погоды %{preposition}s %{prepositional}s на выходные, прогноз погоды %{nominative}s на субботу и воскресение — Яндекс.Погода",
    "month-prep-names": "январе,феврале,марте,апреле,мае,июне,июле,августе,сентябре,октябре,ноябре,декабре",
    short_forecast_title: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "На %{days} день",
            some: "На %{days} дня",
            many: "На %{days} дней",
            none: ""
        })
    },
    "title-weekend-nom": "Погода на выходные — %s"
}, {
    lang: "ru"
}), BEM.I18N.decl("interface-seo-descriptions", {
    climate_comfort_locative: "{{in_month: В январе}}{{months_list:, а также в феврале, ноябре и декабре}} {{location_nom: Москва}} cчитается местом, комфортным для посещения.",
    climate_comfort_nominative: "{{in_month: В январе}}{{months_list:, а также в феврале, ноябре и декабре}} {{location_nom: Москва}} cчитается местом, комфортным для посещения.",
    climate_days_cloudy_first: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} пасмурный",
            some: "{{n}} пасмурных",
            many: "{{n}} пасмурных",
            none: "{{n}} пасмурных"
        })
    },
    climate_days_cloudy_last: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} пасмурный день",
            some: "{{n}} пасмурных дня",
            many: "{{n}} пасмурных дней",
            none: "{{n}} пасмурных дня"
        })
    },
    climate_days_cloudy_middle: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} пасмурный",
            some: "{{n}} пасмурных",
            many: "{{n}} пасмурных",
            none: "{{n}} пасмурных"
        })
    },
    climate_days_cloudy_only: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} пасмурный день",
            some: "{{n}} пасмурных дня",
            many: "{{n}} пасмурных дней",
            none: "{{n}} пасмурных дня"
        })
    },
    climate_days_list_first: "{{item: 10 дождливых}}",
    climate_days_list_last: " и {{item: 1 пасмурный день}}",
    climate_days_list_middle: ", {{item: 1 пасмурный}}",
    climate_days_list_second: " и {{item: 1 пасмурный день}}",
    climate_days_locative: "В среднем {{in_month: в феврале}} {{location_loc: в Москве}} {{days: 10 дождливых, 1 пасмурный и 4 дня с переменной облачностью}}.",
    climate_days_nominative: "В среднем {{in_month: в феврале}} {{location_nom: Москва}} имеет {{days: 10 дождливых, 1 пасмурный и 4 дня с переменной облачностью}}.",
    climate_days_partly_first: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} день с переменной облачностью",
            some: "{{n}} дня с переменной облачностью",
            many: "{{n}} дней с переменной облачностью",
            none: "{{n}} дня с переменной облачностью"
        })
    },
    climate_days_partly_last: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} день с переменной облачностью",
            some: "{{n}} дня с переменной облачностью",
            many: "{{n}} дней с переменной облачностью",
            none: "{{n}} дня с переменной облачностью"
        })
    },
    climate_days_partly_middle: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} с переменной облачностью",
            some: "{{n}} с переменной облачностью",
            many: "{{n}} с переменной облачностью",
            none: "{{n}} с переменной облачностью"
        })
    },
    climate_days_partly_only: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} день с переменной облачностью",
            some: "{{n}} дня с переменной облачностью",
            many: "{{n}} дней с переменной облачностью",
            none: "{{n}} дня с переменной облачностью"
        })
    },
    climate_days_rainy_first: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} дождливый",
            some: "{{n}} дождливых",
            many: "{{n}} дождливых",
            none: "{{n}} дождливых"
        })
    },
    climate_days_rainy_last: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: " дождливый день",
            some: "{{n}} дождливых дня",
            many: "{{n}} дождливых дней",
            none: "{{n}} дождливых дня"
        })
    },
    climate_days_rainy_middle: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} дождливый",
            some: "{{n}} дождливых",
            many: "{{n}} дождливых",
            none: "{{n}} дождливых"
        })
    },
    climate_days_rainy_only: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} дождливый день",
            some: "{{n}} дождливых дня",
            many: "{{n}} дождливых дней",
            none: "{{n}} дождливых дня"
        })
    },
    climate_days_snowy_first: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} день со снегом",
            some: "{{n}} дня со снегом",
            many: "{{n}} дней со снегом",
            none: "{{n}} дня со снегом"
        })
    },
    climate_days_snowy_last: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} день со снегом",
            some: "{{n}} дня со снегом",
            many: "{{n}} дней со снегом",
            none: "{{n}} дня со снегом"
        })
    },
    climate_days_snowy_middle: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} со снегом",
            some: "{{n}} со снегом",
            many: "{{n}} со снегом",
            none: "{{n}} со снегом"
        })
    },
    climate_days_snowy_only: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} день со снегом",
            some: "{{n}} дня со снегом",
            many: "{{n}} дней со снегом",
            none: "{{n}} дня со снегом"
        })
    },
    climate_days_sunny_first: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} ясный",
            some: "{{n}} ясных",
            many: "{{n}} ясных",
            none: "{{n}} ясных"
        })
    },
    climate_days_sunny_last: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} ясный день",
            some: "{{n}} ясных дня",
            many: "{{n}} ясных дней",
            none: "{{n}} ясных дня"
        })
    },
    climate_days_sunny_middle: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} ясный",
            some: "{{n}} ясных",
            many: "{{n}} ясных",
            none: "{{n}} ясных"
        })
    },
    climate_days_sunny_only: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} ясный день",
            some: "{{n}} ясных дня",
            many: "{{n}} ясных дней",
            none: "{{n}} ясных дня"
        })
    },
    climate_desc_cold: "холодный",
    climate_desc_dull: "пасмурный",
    climate_desc_freezy: "морозный",
    climate_desc_hot: "жаркий",
    climate_desc_list_first: "{{item: снежный}}",
    climate_desc_list_last: " и {{item: ветреный}}",
    climate_desc_list_middle: ", {{item: холодный}}",
    climate_desc_list_second: " и {{item: ветреный}}",
    climate_desc_locative: "{{in_month: В феврале}} климат {{location_loc: в Москве}} можно охарактеризовать как {{desc: снежный, холодный и ветреный}}.",
    climate_desc_nominative: "{{in_month: В феврале}} {{location_nom: Москва}} имеет {{desc: снежный, холодный и ветреный}} климат.",
    climate_desc_rainy: "дождливый",
    climate_desc_snowy: "снежный",
    climate_desc_sunny: "солнечный",
    climate_desc_warm: "теплый",
    climate_desc_windy: "ветреный",
    climate_discomfort_locative: "{{in_month: В январе}}{{months_list:, а также в феврале, ноябре и декабре}} {{location_nom: Москва}} cчитается местом, некомфортным для посещения.",
    climate_discomfort_nominative: "{{in_month: В январе}}{{months_list:, а также в феврале, ноябре и декабре}} {{location_nom: Москва}} cчитается местом, некомфортным для посещения.",
    climate_in_month: "в {{month_prep: феврале}}",
    climate_months_list_first: ", а также в {{month_prep: феврале}}",
    climate_months_list_last: " и {{month_prep: феврале}}",
    climate_months_list_middle: ", {{month_prep: феврале}}",
    climate_months_list_second: " и {{month_prep: феврале}}",
    climate_months_nom: "январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь",
    climate_months_prep: "январе,феврале,марте,апреле,мае,июне,июле,августе,сентябре,октябре,ноябре,декабре",
    climate_most_cold: "холодный",
    climate_most_dull: "пасмурный",
    climate_most_freezy: "морозный",
    climate_most_hot: "жаркий",
    climate_most_list_first: "{{item: снежный}}",
    climate_most_list_last: " и {{item: ветреный}}",
    climate_most_list_middle: ", {{item: холодный}}",
    climate_most_list_second: " и {{item: ветреный}}",
    climate_most_locative: "{{month_nom: Февраль}} {{location_loc: в Москве}} — самый {{most_desc: снежный, холодный и ветреный}} месяц в году.",
    climate_most_nominative: "{{location_nom: Москва}}. Здесь {{month_nom: февраль}} — самый {{most_desc: снежный, холодный и ветреный}} месяц в году.",
    climate_most_rainy: "дождливый",
    climate_most_snowy: "снежный",
    climate_most_sunny: "солнечный",
    climate_most_warm: "теплый",
    climate_most_windy: "ветреный",
    climate_polar_day_locative: "Также {{in_month: в июне}} {{location_loc: в Мурманске}} наблюдается пик полярного дня.",
    climate_polar_day_nominative: "Также {{in_month: в июне}} {{location_nom: Мурманск}} проходит через пик полярного дня.",
    climate_polar_night_locative: "Также {{in_month: в декабре}} {{location_loc: в Мурманске}} наблюдается пик полярной ночи.",
    climate_polar_night_nominative: "Также {{in_month: в декабре}} {{location_nom: Мурманск}} проходит через пик полярной ночи.",
    climate_prec_strength: "{{type: Дожди}} преимущественно {{strength: умеренные}}.",
    climate_prec_strength_medium: "умеренные",
    climate_prec_strength_rain: "Дожди",
    climate_prec_strength_snow: "Снегопады",
    climate_prec_strength_strong: "сильные",
    climate_prec_strength_weak: "слабые",
    climate_temp: function(t) {
        return this.keyset("i-tanker__dynamic").key("plural_adv", {
            count: t.count,
            one: "{{n}} градус",
            some: "{{n}} градуса",
            many: "{{n}} градусов",
            none: "{{n}} градуса"
        })
    },
    climate_temp_locative: "Средняя температура днём {{in_month: в феврале}} {{temp: 2 градуса мороза}}.",
    climate_temp_minus: "{{temp: 10 градусов}} мороза",
    climate_temp_nominative: "Средняя температура днём {{in_month: в феврале}} {{temp: 2 градуса мороза}}.",
    climate_temp_plus: "{{temp: 25 градусов}} тепла",
    climate_temp_zero: "около нуля"
}, {
    lang: "ru"
}), BEM.I18N.decl("lang-switcher", {
    all: "Ещё"
}, {
    lang: "ru"
}), BEM.I18N.decl("pollution", {
    "widget-title": "Прогноз загрязнения воздуха"
}, {
    lang: "ru"
}), BEM.I18N.decl("search2", {
    "search-button-text": "Найти",
    "search-input-label": "Запрос",
    "search-service-label": "Поиск по сервису",
    "search-web-label": "Поиск в интернете"
}, {
    lang: "ru"
}), BEM.I18N.decl("suggest2", {
    fact: "Факты",
    group: "Группа подсказок",
    nah: "Вы искали",
    nav: "Сайт",
    on_other_devices: "На других устройствах",
    text: "Поиск",
    traffic: "Пробки",
    weather: "Погода"
}, {
    lang: "ru"
}), BEM.I18N.decl("suggest2-item", {
    "quick-answer": "Быстрый ответ"
}, {
    lang: "ru"
}), BEM.I18N.decl("weather-alerts-pollen", {
    increasing_concentration_allergen: "В ближайшие дни в воздухе повысится концентрация пыльцы %(allergen_gen)s",
    increasing_concentration_allergens: "В ближайшие дни в воздухе повысится концентрация пыльцы %(allergens_gen)s",
    peak_release_period_allergen: "В течение недели наступит пик цветения %(allergen_gen)s",
    peak_release_period_allergens: "В течение недели наступит пик цветения %(allergens_gen)s",
    reducing_concentration_allergen: "В ближайшие дни в воздухе понизится концентрация пыльцы %(allergen_gen)s",
    reducing_concentration_allergens: "В ближайшие дни в воздухе понизится концентрация пыльцы %(allergens_gen)s",
    will_begin_within_one_month_allergen: "В течение месяца обычно зацветает %(allergen)s",
    will_begin_within_one_month_allergens: "В течение месяца обычно зацветают %(allergens)s",
    will_begin_within_one_week_allergen: "В течение недели зацветёт %(allergen)s",
    will_begin_within_one_week_allergens: "В течение недели зацветут %(allergens)s",
    will_begin_within_two_week_allergen: "В течение двух недель обычно зацветает %(allergen)s",
    will_begin_within_two_week_allergens: "В течение двух недель обычно зацветают %(allergens)s"
}, {
    lang: "ru"
}), BEM.I18N.decl("weather-conditions-v2", {
    "blowing-snow": "метель",
    clear: "ясно",
    cloudy: "облачно с прояснениями",
    "cloudy-and-light-rain": "небольшой дождь",
    "cloudy-and-light-snow": "небольшой снег",
    "cloudy-and-rain": "дождь",
    "cloudy-and-snow": "снег",
    "continuous-heavy-rain": "сильный дождь",
    "drifting-snow": "слабая метель",
    drizzle: "морось",
    dust: "пыль",
    "dust-suspension": "пылевая взвесь",
    duststorm: "пыльная буря",
    fog: "туман",
    "freezing-rain": "ледяной дождь",
    hail: "град",
    "heavy-rain": "ливень",
    "ice-pellets": "ледяная крупа",
    "light-rain": "небольшой дождь",
    "light-snow": "небольшой снег",
    mist: "дымка",
    "moderate-rain": "дожди",
    overcast: "пасмурно",
    "overcast-and-light-rain": "небольшой дождь",
    "overcast-and-light-snow": "небольшой снег",
    "overcast-and-rain": "сильный дождь",
    "overcast-and-snow": "снегопад",
    "overcast-and-wet-snow": "дождь со снегом",
    "overcast-thunderstorms-with-rain": "сильный дождь, гроза",
    "partly-cloudy": "малооблачно",
    "partly-cloudy-and-light-rain": "небольшой дождь",
    "partly-cloudy-and-light-snow": "небольшой снег",
    "partly-cloudy-and-rain": "дождь",
    "partly-cloudy-and-snow": "снег",
    rain: "дождь",
    showers: "ливни",
    smoke: "смог",
    snow: "снег",
    "snow-showers": "снегопад",
    thunderstorm: "гроза",
    "thunderstorm-wet-snow": "гроза, дождь со снегом",
    "thunderstorm-with-duststorm": "пыльная буря с грозой",
    "thunderstorm-with-hail": "гроза с градом",
    "thunderstorm-with-rain": "дождь с грозой",
    "thunderstorm-with-snow": "гроза, снег",
    tornado: "торнадо",
    "volcanic-ash": "вулканический пепел",
    "wet-snow": "дождь со снегом"
}, {
    lang: "ru"
}), BEM.I18N.decl("weather-moon", {
    "decreasing-moon": "Убывающая луна",
    "first-quarter": "Первая четверть",
    "full-moon": "Полнолуние",
    "growing-moon": "Растущая луна",
    "last-quarter": "Последняя четверть",
    "moon-code-0": "Полнолуние",
    "moon-code-1": "Убывающая луна",
    "moon-code-10": "Растущая луна",
    "moon-code-11": "Растущая луна",
    "moon-code-12": "Первая четверть",
    "moon-code-13": "Растущая луна",
    "moon-code-14": "Растущая луна",
    "moon-code-15": "Растущая луна",
    "moon-code-2": "Убывающая луна",
    "moon-code-3": "Убывающая луна",
    "moon-code-4": "Последняя четверть",
    "moon-code-5": "Убывающая луна",
    "moon-code-6": "Убывающая луна",
    "moon-code-7": "Убывающая луна",
    "moon-code-8": "Новолуние",
    "moon-code-9": "Растущая луна",
    "new-moon": "Новолуние"
}, {
    lang: "ru"
}), BEM.I18N.lang("ru")),
function(t) {
    var e = function() {
        function t() {
            this._lastMatchId = 0, this._matchers = [], this._infiniteLoopDetection = !1, this.lib = {}, this._shortTags = {};
            for (var t = 0; t < n.length; t++) this._shortTags[n[t]] = 1;
            this._options = {}, this._optJsAttrName = "onclick", this._optJsAttrIsJs = !0, this._optJsCls = "i-bem", this._optJsElem = !0, this._optEscapeContent = !1, this._optNobaseMods = !1, this._optDelimElem = "__", this._optDelimMod = "_", this._optShortTagCloser = "/>", this.utils = {
                _expandoId: (new Date).getTime(),
                bh: this,
                isSimple: function(t) {
                    if (!t || t === !0) return !0;
                    var e = typeof t;
                    return "string" === e || "number" === e
                },
                extend: function(t) {
                    t && "object" == typeof t || (t = {});
                    for (var e = 1, n = arguments.length; e < n; e++) {
                        var i, o = arguments[e];
                        if (o)
                            for (i in o) t[i] = o[i]
                    }
                    return t
                },
                position: function() {
                    var t = this.node;
                    return "content" === t.index ? 1 : t.position
                },
                isFirst: function() {
                    var t = this.node;
                    return "content" === t.index || 1 === t.position
                },
                isLast: function() {
                    var t = this.node;
                    return "content" === t.index || t.position === t.arr._listLength
                },
                tParam: function(t, e, n) {
                    var i = "__tp_" + t,
                        o = this.node;
                    if (arguments.length > 1) return !n && this.tParam(t) || (o[i] = e), this;
                    for (; o;) {
                        if (o.hasOwnProperty(i)) return o[i];
                        o = o.parentNode
                    }
                },
                process: function(t) {
                    var e = this.ctx,
                        n = this.node,
                        i = this.bh.processBemJson(t, e.block);
                    return this.ctx = e, this.node = n, i
                },
                applyBase: function() {
                    var t = this.node,
                        e = t.json,
                        n = e.block,
                        i = e.mods,
                        o = this.bh._fastMatcher(this, e);
                    return void 0 !== o && (this.ctx = t.arr[t.index] = t.json = o, t.block = n, t.mods = i), this
                },
                stop: function() {
                    return this.ctx._stop = !0, this
                },
                generateId: function() {
                    return "uniq" + this._expandoId + ++e
                },
                mod: function(t, e, n) {
                    var i = this.ctx.elem ? "elemMods" : "mods";
                    if (arguments.length > 1) {
                        var o = this.ctx[i];
                        return o[t] = !o.hasOwnProperty(t) || n ? e : o[t], this
                    }
                    return this.ctx[i][t]
                },
                mods: function(t, e) {
                    var n = this.ctx.elem ? "elemMods" : "mods",
                        i = this.ctx[n];
                    return void 0 !== t ? (this.ctx[n] = e ? this.extend(i, t) : this.extend(t, i), this) : i
                },
                tag: function(t, e) {
                    return void 0 === t ? this.ctx.tag : ((e || void 0 === this.ctx.tag) && (this.ctx.tag = t), this)
                },
                mix: function(t, e) {
                    return void 0 === t ? this.ctx.mix : (this.ctx.mix = e || !this.ctx.mix ? t : (Array.isArray(this.ctx.mix) ? this.ctx.mix : [this.ctx.mix]).concat(t), this)
                },
                attr: function(t, e, n) {
                    var i;
                    return arguments.length > 1 ? (i = this.ctx.attrs || (this.ctx.attrs = {}), i[t] = !i.hasOwnProperty(t) || n ? e : i[t], this) : (i = this.ctx.attrs, i ? i[t] : void 0)
                },
                attrs: function(t, e) {
                    var n = this.ctx.attrs || {};
                    return void 0 === t ? n : (this.ctx.attrs = e ? this.extend(n, t) : this.extend(t, n), this)
                },
                bem: function(t, e) {
                    return void 0 === t ? this.ctx.bem : ((e || void 0 === this.ctx.bem) && (this.ctx.bem = t), this)
                },
                js: function(t, e) {
                    var n = this.ctx;
                    return void 0 === t ? n.js : (e || void 0 === n.js ? n.js = t : n.js !== !1 && (n.js = this.extend(n.js, t)), this)
                },
                cls: function(t, e) {
                    return void 0 === t ? this.ctx.cls : ((e || void 0 === this.ctx.cls) && (this.ctx.cls = t), this)
                },
                param: function(t, e, n) {
                    return void 0 === e ? this.ctx[t] : ((n || void 0 === this.ctx[t]) && (this.ctx[t] = e), this)
                },
                content: function(t, e) {
                    return void 0 === t ? this.ctx.content : ((e || void 0 === this.ctx.content) && (this.ctx.content = t), this)
                },
                html: function(t, e) {
                    return void 0 === t ? this.ctx.html : ((e || void 0 === this.ctx.html) && (this.ctx.html = t), this)
                },
                json: function() {
                    return this.ctx
                }
            }
        }
        var e = 0;
        t.prototype = {
            constructor: t,
            setOptions: function(t) {
                var e;
                for (e in t) this._options[e] = t[e];
                if (t.jsAttrName && (this._optJsAttrName = t.jsAttrName), t.jsAttrScheme && (this._optJsAttrIsJs = "js" === t.jsAttrScheme), void 0 !== t.jsCls && (this._optJsCls = t.jsCls), t.hasOwnProperty("jsElem") && (this._optJsElem = t.jsElem), t.clsNobaseMods && (this._optNobaseMods = !0), t.escapeContent && (this._optEscapeContent = t.escapeContent), t.delimElem && (this._optDelimElem = t.delimElem), t.delimMod && (this._optDelimMod = t.delimMod), t.xhtml === !1 && (this._optShortTagCloser = ">"), t.shortTags)
                    for (var n = 0; n < t.shortTags.length; n++) this._shortTags[t.shortTags[n]] = 1;
                return this
            },
            getOptions: function() {
                return this._options
            },
            enableInfiniteLoopDetection: function(t) {
                return this._infiniteLoopDetection = t, this
            },
            apply: function(t) {
                return this.toHtml(this.processBemJson(t))
            },
            match: function(t, e) {
                if (!t) return this;
                if (Array.isArray(t)) return t.forEach(function(n, i) {
                    this.match(t[i], e)
                }, this), this;
                if ("object" == typeof t) {
                    for (var n in t) this.match(n, t[n]);
                    return this
                }
                return e.__id = "__func" + this._lastMatchId++, this._matchers.push([t, e]), this._fastMatcher = null, this
            },
            beforeEach: function(t) {
                return this.match("$before", t)
            },
            afterEach: function(t) {
                return this.match("$after", t)
            },
            buildMatcher: function() {
                function t(t, e) {
                    for (var n = {}, i = 0, o = t.length; i < o; i++) {
                        var s = t[i],
                            r = s[e] || "__no_value__";
                        (n[r] || (n[r] = [])).push(s)
                    }
                    return n
                }

                function e(t, e, n) {
                    t.push("json." + e + " = true;", "subRes = _m" + n + "(ctx, json);", 'if (subRes !== undefined) return (subRes || "");', "if (json._stop) return;")
                }
                var n, i, o, s, r, a, c, l, u = [],
                    d = ["bh = this"],
                    h = this._matchers,
                    p = [];
                for (n = h.length - 1; n >= 0; n--) a = h[n], r = a[0], d.push("_m" + n + " = ms[" + n + "][1]"), s = {
                    fn: a[1],
                    index: n
                }, ~r.indexOf(this._optDelimElem) ? (c = r.split(this._optDelimElem), l = c[0].split(this._optDelimMod), s.block = l[0], l.length > 1 && (s.blockMod = l[1], s.blockModVal = l[2] || !0), c = c[1].split(this._optDelimMod), s.elem = c[0], c.length > 1 && (s.elemMod = c[1], s.elemModVal = c[2] || !0)) : (c = r.split(this._optDelimMod), s.block = c[0], c.length > 1 && (s.blockMod = c[1], s.blockModVal = c[2] || !0)), p.push(s);
                var m = t(p, "block"),
                    f = m.$before,
                    _ = m.$after;
                if (_ && delete m.$after, u.push("var " + d.join(", ") + ";", "function applyMatchers(ctx, json) {", "var subRes;"), f)
                    for (delete m.$before, i = 0, o = f.length; i < o; i++) s = f[i], e(u, s.fn.__id, s.index);
                u.push("switch (json.block) {");
                for (var g in m) {
                    u.push('case "' + g + '":');
                    var v = t(m[g], "elem");
                    u.push("switch (json.elem) {");
                    for (var y in v) {
                        "__no_value__" === y ? u.push("case undefined:") : u.push('case "' + y + '":');
                        var b = v[y];
                        for (i = 0, o = b.length; i < o; i++) {
                            s = b[i];
                            var k = s.fn,
                                M = [];
                            M.push("!json." + k.__id), s.elemMod && M.push('json.elemMods && json.elemMods["' + s.elemMod + '"] === ' + (s.elemModVal === !0 || '"' + s.elemModVal + '"')), s.blockMod && M.push('json.mods && json.mods["' + s.blockMod + '"] === ' + (s.blockModVal === !0 || '"' + s.blockModVal + '"')), u.push("if (" + M.join(" && ") + ") {"), e(u, k.__id, s.index), u.push("}")
                        }
                        u.push("break;")
                    }
                    u.push("}", "break;")
                }
                if (u.push("}"), _)
                    for (i = 0, o = _.length; i < o; i++) s = _[i], e(u, s.fn.__id, s.index);
                return u.push("};", "return applyMatchers;"), u.join("\n")
            },
            processBemJson: function(t, e, n) {
                function i() {
                    this.ctx = null
                }
                if (null != t) {
                    var o, s, r, a, c, l, u, d, h, p, m = [t],
                        f = [{
                            json: t,
                            arr: m,
                            index: 0,
                            block: e,
                            mods: null
                        }],
                        _ = this._fastMatcher || (this._fastMatcher = Function("ms", this.buildMatcher())(this._matchers)),
                        g = !n,
                        v = this._infiniteLoopDetection;
                    i.prototype = this.utils;
                    for (var y = new i; o = f.shift();) {
                        if (s = o.json, r = o.block, a = o.mods, Array.isArray(s)) {
                            for (c = 0, l = 0, u = s.length; c < u; c++) h = s[c], h !== !1 && null != h && "object" == typeof h && f.push({
                                json: h,
                                arr: s,
                                index: c,
                                position: ++l,
                                block: r,
                                mods: a,
                                parentNode: o
                            });
                            s._listLength = l
                        } else {
                            var b, k = !1;
                            if (s.elem ? (r = s.block = s.block || r, s.elemMods || (s.elemMods = s.mods || {}, s.mods = null), a = s.mods = s.mods || a) : s.block && (r = s.block, a = s.mods = s.mods || {}), "object" == typeof s) {
                                if (v) {
                                    if (s.__processCounter = (s.__processCounter || 0) + 1, _.__processCounter = (_.__processCounter || 0) + 1, s.__processCounter > 100) throw new Error('Infinite json loop detected at "' + s.block + (s.elem ? this._optDelimElem + s.elem : "") + '".');
                                    if (_.__processCounter > 1e3) throw new Error('Infinite matcher loop detected at "' + s.block + (s.elem ? this._optDelimElem + s.elem : "") + '".')
                                }
                                p = void 0, s._stop || (y.node = o, y.ctx = s, p = _(y, s), void 0 !== p && (s = p, o.json = s, o.block = r, o.mods = a, f.push(o), k = !0))
                            }
                            if (!k && g && (b = s.content))
                                if (Array.isArray(b)) {
                                    var M;
                                    do {
                                        for (M = !1, c = 0, u = b.length; c < u; c++)
                                            if (Array.isArray(b[c])) {
                                                M = !0;
                                                break
                                            } M && (s.content = b = b.concat.apply([], b))
                                    } while (M);
                                    for (c = 0, l = 0, u = b.length, d = u - 1; c < u; c++) h = b[c], h !== !1 && null != h && "object" == typeof h && f.push({
                                        json: h,
                                        arr: b,
                                        index: c,
                                        position: ++l,
                                        block: r,
                                        mods: a,
                                        parentNode: o
                                    });
                                    b._listLength = l
                                } else f.push({
                                    json: b,
                                    arr: s,
                                    index: "content",
                                    block: r,
                                    mods: a,
                                    parentNode: o
                                })
                        }
                        o.arr[o.index] = s
                    }
                    return m[0]
                }
            },
            toHtml: function(t) {
                this._buf = "", this._html(t);
                var e = this._buf;
                return delete this._buf, e
            },
            _html: function(t) {
                var e, n, a;
                if (t !== !1 && null != t)
                    if ("object" != typeof t) this._buf += this._optEscapeContent ? i(t) : t;
                    else if (Array.isArray(t))
                    for (e = 0, n = t.length; e < n; e++) a = t[e], a !== !1 && null != a && this._html(a);
                else {
                    if (t.toHtml) {
                        var c = t.toHtml.call(this, t) || "";
                        return void(this._buf += c)
                    }
                    var l = t.bem !== !1;
                    if ("undefined" != typeof t.tag && !t.tag) return void(t.html ? this._buf += t.html : this._html(t.content));
                    t.mix && !Array.isArray(t.mix) && (t.mix = [t.mix]);
                    var u, d, h, p = "",
                        m = "",
                        f = !1;
                    if (u = t.attrs)
                        for (e in u) d = u[e], d === !0 ? m += " " + e : d !== !1 && null !== d && void 0 !== d && (m += " " + e + '="' + o(d) + '"');
                    if (l) {
                        var _ = t.block + (t.elem ? this._optDelimElem + t.elem : "");
                        t.block && (p = r(t, _, null, this._optNobaseMods, this._optDelimMod), t.js && ((h = {})[_] = t.js === !0 ? {} : t.js));
                        var g = this._optJsCls && (this._optJsElem || !t.elem),
                            v = t.mix;
                        if (v && v.length)
                            for (e = 0, n = v.length; e < n; e++) {
                                var y = v[e];
                                if (y && y.bem !== !1) {
                                    var b = y.block || t.block || "",
                                        k = y.elem || (y.block ? null : t.block && t.elem),
                                        M = b + (k ? this._optDelimElem + k : "");
                                    b && (p += r(y, M, _, this._optNobaseMods, this._optDelimMod), y.js && ((h = h || {})[M] = y.js === !0 ? {} : y.js, f = !0, g || (g = b && this._optJsCls && (this._optJsElem || !k))))
                                }
                            }
                        if (h) {
                            g && (p += " " + this._optJsCls);
                            var w = f || t.js !== !0 ? s(JSON.stringify(h)) : '{"' + _ + '":{}}';
                            m += " " + (t.jsAttr || this._optJsAttrName) + "='" + (this._optJsAttrIsJs ? "return " + w : w) + "'"
                        }
                    }
                    t.cls && (p = (p ? p + " " : "") + o(t.cls).trim());
                    var E = t.tag || "div";
                    this._buf += "<" + E + (p ? ' class="' + p + '"' : "") + (m ? m : ""), this._shortTags[E] ? this._buf += this._optShortTagCloser : (this._buf += ">", t.html ? this._buf += t.html : this._html(t.content), this._buf += "</" + E + ">")
                }
            }
        };
        var n = "area base br col command embed hr img input keygen link menuitem meta param source track wbr".split(" "),
            i = t.prototype.xmlEscape = function(t) {
                return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            },
            o = t.prototype.attrEscape = function(t) {
                return (t + "").replace(/&/g, "&amp;").replace(/"/g, "&quot;")
            },
            s = t.prototype.jsAttrEscape = function(t) {
                return (t + "").replace(/&/g, "&amp;").replace(/'/g, "&#39;")
            },
            r = function(t, e, n, i, o) {
                var s, r, a, c = "";
                if (n !== e && (n && (c += " "), c += e), s = t.elem && t.elemMods || t.mods)
                    for (a in s) r = s[a], (r || 0 === r) && (c += " " + (i ? o : e + o) + a + (r === !0 ? "" : o + r));
                return c
            };
        return t
    }();
    "undefined" != typeof module && (module.exports = e);
    var n = new e;
    n.setOptions({
        jsAttrName: "data-bem",
        jsAttrScheme: "json"
    });
    var i = function(t, e) {
        ! function() {
            n.match("suggest2__items", function(t) {
                t.tag("ul")
            })
        }(),
        function() {
            n.match("suggest2-item", function(t) {
                t.tag("li"), t.js(!0)
            }), n.match("suggest2-item__text", function(t, e) {
                t.tag("span"), e.text ? t.content(Array.isArray(e.text) ? e.text.map(function(t) {
                    return "string" == typeof t ? {
                        tag: !1,
                        html: n.xmlEscape(t)
                    } : t
                }, this) : {
                    tag: !1,
                    html: n.xmlEscape(e.text)
                }) : t.content(Array.isArray(e.content) ? e.content.map(function(t) {
                    return "string" == typeof t ? {
                        tag: !1,
                        html: n.xmlEscape(t)
                    } : t
                }, this) : {
                    tag: !1,
                    html: n.xmlEscape(e.content)
                }, !0)
            }), n.match("suggest2-item__fact", function(t) {
                t.tag("span")
            })
        }(),
        function() {
            n.match("suggest2-item__link", function(t, e) {
                t.tag("a"), t.attrs({
                    href: e.url,
                    target: e.target
                })
            })
        }(),
        function() {
            n.match("compare-cities-action", function(t) {
                t.tag("button")
            })
        }(),
        function() {
            n.match("tooltip", function(t, e) {
                t.mod("view", "classic");
                var n = t.js() || {},
                    i = {
                        target: "anchor",
                        hiding: "yes",
                        autoclosable: t.mods().autoclosable || "no",
                        theme: "normal",
                        view: t.mod("view")
                    },
                    o = n.to && [].concat(n.to),
                    s = void 0 === n.mainOffset ? n.offset : n.mainOffset;
                return o && (o = o.map(function(t) {
                    return t.indexOf("-") < 0 && (t += "-center"), t
                })), [{
                    block: "popup2",
                    mods: i,
                    directions: o || ["right-center", "bottom-center", "top-center", "left-center"],
                    mainOffset: s,
                    secondaryOffset: n.secondaryOffset,
                    tailOffset: n.tailOffset,
                    zIndexGroupLevel: n.zIndexGroupLevel,
                    mix: [{
                        block: "tooltip",
                        mods: t.mods()
                    }].concat(t.mix()),
                    content: [{
                        block: "tooltip",
                        elem: "backdrop",
                        content: e.tail !== !1 && {
                            block: "popup2",
                            elem: "tail"
                        }
                    }, {
                        block: "tooltip",
                        elem: "content",
                        content: t.content()
                    }]
                }]
            })
        }(),
        function() {
            n.match("popup2", function(t, e) {
                if (t.mod("view", "classic").js({
                        mainOffset: e.mainOffset,
                        secondaryOffset: e.secondaryOffset,
                        viewportOffset: e.viewportOffset,
                        tailOffset: e.tailOffset,
                        tailSize: e.tailSize,
                        directions: e.directions,
                        zIndexGroupLevel: e.zIndexGroupLevel
                    }), e.hasTail) {
                    var n = [].concat(t.content());
                    t.content([].concat({
                        elem: "tail"
                    }, n), !0)
                }
            })
        }(),
        function() {
            n.match("popup2", function(t) {
                t.applyBase(), "anchor" === t.mod("target") && (t.mod("hiding", "yes"), "yes" === t.mod("visible") && t.mod("outside", "yes"))
            })
        }(),
        function() {
            n.match("popup2_hiding_yes", function(t) {
                "anchor" !== t.mod("target") && t.mod("target", "anchor", !0), t.applyBase()
            })
        }(),
        function() {
            var t = n.lib,
                e = t.global = n.utils.extend({
                    lang: "ru",
                    tld: "ru",
                    "content-region": "ru",
                    "click-host": "//clck.yandex.ru",
                    "passport-host": "https://passport.yandex.ru",
                    "pass-host": "https://pass.yandex.ru",
                    "social-host": "https://social.yandex.ru",
                    "export-host": "https://export.yandex.ru",
                    login: "",
                    "lego-static-host": "https://yastatic.net/lego/2.10-142"
                }, t.global);
            e._public = {
                id: !0,
                lang: !0,
                tld: !0,
                "content-region": !0,
                "user-region": !0,
                login: !0,
                displayName: !0,
                index: !0,
                yandexuid: !0,
                "passport-host": !0,
                "pass-host": !0,
                "passport-msg": !0,
                "static-host": !0,
                "lego-static-host": !0,
                "social-host": !0,
                clck: !0,
                "click-host": !0,
                "export-host": !0,
                "i-host": !0,
                "social-retpath": !0,
                "lego-path": !0,
                sid: !0,
                retpath: !0,
                uid: !0
            }, e.makePublic = function(t, i) {
                return "object" == typeof t ? void(e._public = n.utils.extend({}, e._public, t)) : ("undefined" == typeof i && (i = !0), void(e._public[t] = i))
            }, e.isPublic = function(t) {
                return Boolean(e._public[t])
            }, e.setTld = function(t) {
                var i = "tr" === t ? "yandex.com.tr" : "yandex." + t,
                    o = ["ua", "by", "kz"].indexOf(t) !== -1 ? "yandex.ru" : i;
                n.utils.extend(e, {
                    tld: t,
                    "content-region": t,
                    "click-host": "//clck." + o,
                    "passport-host": "https://passport." + o,
                    "pass-host": "https://pass." + i,
                    "social-host": "https://social." + i,
                    "export-host": "https://export." + i
                })
            };
            var i = {
                _backup: null,
                exists: function() {
                    return Boolean(this._backup)
                },
                save: function() {
                    this._backup = n.utils.extend({}, e)
                },
                restore: function() {
                    var t;
                    for (t in e) delete e[t];
                    n.utils.extend(e, this._backup)
                }
            };
            n.match("i-global", function(e, n) {
                e.tag("");
                var o = t.global,
                    s = n.params || {};
                i.exists() ? n.reset !== !1 && i.restore() : i.save(), s.tld && s.tld !== o.tld && o.setTld(s.tld), e.extend(o, s)
            })
        }(),
        function() {
            n.match("i-global", function(t, e) {
                n.lib.global.makePublic({
                    "lego-static-host": !1,
                    nonce: !0,
                    host: !0,
                    "secret-key": !0,
                    "secret-key-v2": !0,
                    "service-root": !0,
                    rid: !0,
                    urid: !0,
                    slug: !0,
                    metrikaId: !0,
                    stHost: !0,
                    theme: !0,
                    kubr: !0,
                    "map-version": !0,
                    "detect-host": !0,
                    "detect-domains": !0,
                    reqId: !0,
                    rumAdvPosNames: !0,
                    unit: !0,
                    lang: !0,
                    laasTimestamp: !0,
                    "is-region-user-choice": !0,
                    gdpr: !0,
                    "icons-inline": !0,
                    isMeteum: !0,
                    isAmerica: !0,
                    isMTLang: !0,
                    mtLangsPrepositions: !0,
                    extParams: !0,
                    isAmPm: !0
                }), e.safeJsonStringify && (n.lib.safeJsonStringify = e.safeJsonStringify), e.inlineIcons && (n.lib.inlineIcons = e.inlineIcons), e.iconsBase64 && (n.lib.iconsBase64 = e.iconsBase64)
            })
        }(),
        function() {
            n.match("i-ua", function(t, e) {
                t.bem(!1).tag("script").attr("nonce", e.nonce || n.lib.global.nonce).content([';(function(d,e,c,r){e=d.documentElement;c="className";r="replace";e[c]=e[c][r]("i-ua_js_no","i-ua_js_yes");if(d.compatMode!="CSS1Compat")e[c]=e[c][r]("i-ua_css_standart","i-ua_css_quirks")})(document);', t.content()], !0)
            })
        }(),
        function() {
            n.match("i-ua", function(t) {
                t.attr("nonce", n.lib.global.nonce, !0)
            })
        }(),
        function() {
            n.match("i-ua", function(t) {
                t.content([{
                    tag: !1,
                    html: [";(function(d,e,c,n,w,v,f){", "e=d.documentElement;", 'c="className";', 'n="createElementNS";', 'f="firstChild";', 'w="http://www.w3.org/2000/svg";', 'e[c]+=" i-ua_svg_"+(!!d[n]&&!!d[n](w,"svg").createSVGRect?"yes":"no");', 'v=d.createElement("div");', 'v.innerHTML="<svg/>";', 'e[c]+=" i-ua_inlinesvg_"+((v[f]&&v[f].namespaceURI)==w?"yes":"no");', "})(document);"].join("")
                }, t.content()], !0)
            })
        }(),
        function() {
            n.match("tooltip_theme_promo", function(t, e) {
                t.js({
                    secondaryOffset: -30,
                    tailOffset: 30
                })
            })
        }(),
        function() {
            var t = {
                "list-add": '<svg viewBox="0 0 16 16">\n    <path fill="currentColor" d="M1 3a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2H1zM0 8c0-.6.4-1 1-1h7a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1zm0 4c0-.6.4-1 1-1h4a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1zm9 1a1 1 0 1 1 0-2h2V9a1 1 0 1 1 2 0v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H9z"/>\n</svg>\n',
                "list-remove": '<svg viewBox="0 0 16 16">\n    <path fill="currentColor" d="M1 3a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2H1zM0 8l1-1h7a1 1 0 1 1 0 2H1L0 8zm0 4l1-1h4a1 1 0 1 1 0 2H1l-1-1M10 13l4-6h2v1l-5 7H9l-2-3v-1h2l1 2z"/>\n</svg>\n',
                geolocation: '<svg viewBox="0 0 16 16"><path fill="currentColor" d="M6.3 9.7l-3.5-1a1 1 0 01-.2-1.9l9.7-4.2a.8.8 0 011.1 1l-4.2 9.8a1 1 0 01-2-.2l-.9-3.5z"/></svg>\n'
            };
            n.match("inline-icon", function(e) {
                e.tag("span").attrs({
                    "aria-hidden": "true"
                }).content(t[e.mods().id])
            })
        }(),
        function() {
            n.match("i-bem__i18n", function(t, e) {
                var i = e.keyset,
                    o = e.key,
                    s = e.params || {};
                return i || o ? (e.content && (s.content = n.apply(e.content)), {
                    tag: !1,
                    html: n.lib.i18n(i, o, s)
                }) : void t.tag(!1)
            })
        }(),
        function() {
            n.match("button2", function(t, e) {
                function i(e) {
                    return t.isSimple(e) || "object" == typeof e && e.html && e.tag === !1
                }
                var o = Boolean(t.mod("disabled"));
                void 0 === e.mods.view && t.mod("view", "classic", !0), t.param("tabindex", "0").tag("button").js({
                    _tabindex: o ? e.tabindex : void 0
                }).attrs({
                    type: "button",
                    autocomplete: "off",
                    id: e.id,
                    title: e.title,
                    name: e.name,
                    value: e.val,
                    disabled: o,
                    "aria-disabled": o && "true",
                    tabindex: !o && e.tabindex
                }).tParam("_size", t.mod("size")), e.content || t.content([e.icon && {
                    elem: "icon",
                    icon: e.icon
                }, e.iconLeft && {
                    elem: "icon",
                    elemMods: {
                        side: "left"
                    },
                    icon: e.iconLeft
                }, e.iconRight && {
                    elem: "icon",
                    elemMods: {
                        side: "right"
                    },
                    icon: e.iconRight
                }, void 0 !== e.text && (i(e.text) ? {
                    elem: "text",
                    content: {
                        tag: !1,
                        html: n.xmlEscape(e.text)
                    }
                } : t.extend({}, e.text, {
                    elem: "text"
                }))].filter(Boolean))
            })
        }(),
        function() {
            n.match("button2__text", function(t, e) {
                t.tag("span")
            })
        }(),
        function() {
            n.match("button2__text", function(t) {
                t.attr("tabindex", "0")
            })
        }(),
        function() {
            n.match("icon", function(t, e) {
                var n = void 0 !== e.url,
                    i = (t.attr("style") || "") + (n ? ";background-image:url('" + e.url + "');" : "");
                t.tag("span"), t.attr("style", i || void 0, !0)
            })
        }(),
        function() {
            var t = {
                    "bkn-p-ra-d": "bkn_+ra_d",
                    "bkn-p-ra-n": "bkn_+ra_n",
                    "bkn-p-sn-d": "bkn_+sn_d",
                    "bkn-p-sn-n": "bkn_+sn_n",
                    "bkn-m-ra-d": "bkn_-ra_d",
                    "bkn-m-ra-n": "bkn_-ra_n",
                    "bkn-m-sn-d": "bkn_-sn_d",
                    "bkn-m-sn-n": "bkn_-sn_n",
                    "bkn-d": "bkn_d",
                    "bkn-n": "bkn_n",
                    "bkn-ra-d": "bkn_ra_d",
                    "bkn-ra-n": "bkn_ra_n",
                    "bkn-sn-d": "bkn_sn_d",
                    "bkn-sn-n": "bkn_sn_n",
                    ovc: "ovc",
                    "ovc-p-ra": "ovc_+ra",
                    "ovc-p-sn": "ovc_+sn",
                    "ovc-m-ra": "ovc_-ra",
                    "ovc-ra-sn": "ovc_ra_sn",
                    "ovc-m-sn": "ovc_-sn",
                    "ovc-ra": "ovc_ra",
                    "ovc-sn": "ovc_sn",
                    "ovc-ts-ra": "ovc_ts_ra",
                    "skc-d": "skc_d",
                    "skc-n": "skc_n",
                    "ovc-ha": "ovc_ha",
                    "ovc-ts": "ovc_ts",
                    "ovc-ts-ha": "ovc_ts_ha",
                    "fg-d": "fg_d",
                    "fg-n": "fg_n",
                    smog: "smog",
                    dst: "dst",
                    "du-st": "du_st",
                    "du-ts": "du_ts",
                    "m-bl": "-bl",
                    bl: "bl",
                    "ovc-ra-ice": "ovc_ra_ice",
                    strm: "strm",
                    vlka: "vlka",
                    sunrise: "fct_sn_rs",
                    sunset: "fct_sn_dwn"
                },
                e = {
                    "bkn-p-ra-d": "fct_+ra",
                    "bkn-p-ra-n": "fct_+ra",
                    "bkn-p-sn-d": "fct_+sn",
                    "bkn-p-sn-n": "fct_+sn",
                    "bkn-m-ra-d": "fct_-ra",
                    "bkn-m-ra-n": "fct_-ra",
                    "bkn-m-sn-d": "fct_-sn",
                    "bkn-m-sn-n": "fct_-sn",
                    "bkn-d": "bkn_d",
                    "bkn-n": "bkn_n",
                    "bkn-ra-d": "fct_ra",
                    "bkn-ra-n": "fct_ra",
                    "bkn-sn-d": "fct_sn",
                    "bkn-sn-n": "fct_sn",
                    ovc: "ovc",
                    "ovc-p-ra": "fct_+ra",
                    "ovc-p-sn": "fct_+sn",
                    "ovc-m-ra": "fct_-ra",
                    "ovc-ra-sn": "fct_ra_sn",
                    "ovc-m-sn": "fct_-sn",
                    "ovc-ra": "fct_ra",
                    "ovc-sn": "fct_sn",
                    "ovc-ts-ra": "fct_ts_ra",
                    "skc-d": "skc_d",
                    "skc-n": "skc_n",
                    "ovc-ts": "fct_ts",
                    "ovc-ra-ice": "fct_ra_ice",
                    "ovc-ts-ha": "fct_ts_ha",
                    "ovc-ha": "fct_ha"
                };
            n.match("icon", function(n, i) {
                if (i.ariaLabelText ? n.attr("aria-label", i.ariaLabelText) : n.attr("aria-hidden", "true"), n.mod("thumb")) {
                    var o = i.mods && i.mods.thumb,
                        s = i.mods && i.mods.color;
                    if (o && s) {
                        var r;
                        if (["wnd", "water"].indexOf(o) > -1) r = "//yastatic.net/weather/i/icons/svg/" + o + ".svg";
                        else {
                            var a = s.indexOf("-prec"),
                                c = a > -1 && s.substr(0, a),
                                l = "//yastatic.net/weather/i/icons/funky",
                                u = c || s,
                                d = c ? e[o] : t[o];
                            r = l + "/" + u + "/" + (d || o) + ".svg"
                        }
                        n.tag("img"), n.attr("src", r)
                    }
                } else {
                    n.tag("i"), n.attr("data-width", n.mod("size"));
                    var h = n.content();
                    if (n.content("", !0), i.abbr) {
                        var p = [{
                            tag: "abbr",
                            mix: {
                                block: "icon-abbr"
                            },
                            attrs: {
                                title: h,
                                "aria-label": h,
                                role: "text"
                            },
                            content: i.abbr
                        }, i];
                        return i.invert ? p.reverse() : p
                    }
                    h && n.attr("title", h)
                }
            })
        }(),
        function() {
            n.match("search2", function(t, e) {
                t.tag("form").attrs({
                    role: "search",
                    action: e.url,
                    "aria-label": e.label
                }).content([{
                    elem: "input",
                    content: e.input
                }, {
                    elem: "button",
                    content: e.button
                }, e.hidden && Object.keys(e.hidden).map(function(t) {
                    return {
                        elem: "hidden",
                        attrs: {
                            name: t,
                            value: e.hidden[t]
                        }
                    }
                })])
            })
        }(),
        function() {
            n.match("search2", function(t, e) {
                t.attr("aria-label", e.ariaLabelText)
            })
        }(),
        function() {
            n.match("i-ua", function(t) {
                t.content([";(function(d,e,p){", "e=d.documentElement;", 'p="placeholder";', 'e.className+=" i-ua_"+p+(p in d.createElement("input")?"_yes":"_no")', "})(document);", t.content()], !0)
            })
        }(),
        function() {
            n.match("input", function(t, e) {
                var i = "object" == typeof t.js() ? t.js() : {},
                    o = t.mods(),
                    s = {
                        autofocus: "yes",
                        width: "content",
                        "tap-ahead": "yes"
                    };
                i.live = Boolean(i.live) && !i.autoFocus && !Object.keys(s).some(function(t) {
                    return o[t] === s[t]
                });
                var r = e.value;
                t.isSimple(r) || (r = n.apply(r));
                var a;
                e.hasOwnProperty("placeholder") && (a = e.placeholder, t.isSimple(a) || (a = n.apply(a)));
                var c = e.id || t.generateId();
                t.tag("span").js(i).mod("theme", "normal").tParam("inputId", c).tParam("labelId", "label" + c).tParam("hintId", "hint" + c).tParam("name", e.name || "").tParam("value", r).tParam("inputLink", !0).tParam("iconLeft", e.icon || e.iconLeft).tParam("iconRight", e.iconRight).tParam("placeholder", a).tParam("live", i.live).tParam("disabled", o.disabled).tParam("hasClear", "no" !== o.clear)
            })
        }(),
        function() {
            n.match("input__box", function(t) {
                t.tag("span"), t.content([t.tParam("iconLeft") && {
                    elem: "icon",
                    icon: t.tParam("iconLeft"),
                    elemMods: {
                        side: "left"
                    }
                }, t.tParam("iconRight") && {
                    elem: "icon",
                    icon: t.tParam("iconRight"),
                    elemMods: {
                        side: "right"
                    }
                }, t.tParam("hasClear") && {
                    elem: "clear",
                    elemMods: t.tParam("value") || 0 === t.tParam("value") ? {
                        visibility: "visible"
                    } : void 0,
                    content: " "
                }, t.content()].filter(Boolean), !0)
            })
        }(),
        function() {
            n.match("input__control", function(t, e) {
                var n = t.tParam("value"),
                    i = t.tParam("placeholder");
                return t.tag("input").attrs(t.extend({
                    id: t.tParam("inputId"),
                    name: t.tParam("name"),
                    placeholder: i,
                    "aria-labelledby": t.tParam("labelId") + " " + t.tParam("hintId")
                }, e.controlAttrs)), t.tParam("disabled") && t.attr("disabled", !0), (n || 0 === n || "" === n) && t.attr("value", n), t.tParam("live") && t.attr("autocomplete", "off"), {
                    elem: "box",
                    content: t.json()
                }
            })
        }(),
        function() {
            n.match("input__clear", function(t) {
                t.tag("span").attr("unselectable", "on")
            })
        }(),
        function() {
            n.match("input__hint", function(t) {
                var e = t.tParam("value");
                t.tag("label").attrs({
                    id: t.tParam("hintId"),
                    for: t.tParam("inputId"),
                    "aria-hidden": "true"
                }), t.tParam("iconLeft") && t.mod("lpad", "yes"), t.tParam("iconRight") && t.mod("rpad", "yes"), e || 0 === e || t.mod("visibility", "visible")
            }), n.match("input__control", function(t) {
                var e = t.tParam("placeholder");
                if (e) return [{
                    elem: "hint",
                    content: e
                }, t.json()]
            })
        }(),
        function() {
            n.match("suggest2-item__fact", function(t, e) {
                e.color && t.attr("style", ";color:" + e.color + ";" + (t.attr("style") || ""), !0), t.content([{
                    block: "suggest2",
                    elem: "a11y",
                    content: BEM.I18N("suggest2-item", "quick-answer") + ": "
                }, {
                    tag: !1,
                    html: n.xmlEscape(e.content)
                }], !0)
            })
        }(),
        function() {
            n.match("suggest2__a11y", function(t) {
                t.tag("span")
            })
        }(),
        function() {
            n.match("suggest2-item__icon", function(t, e) {
                var n = BEM.blocks && BEM.blocks["suggest2-detect"] && BEM.blocks["suggest2-detect"],
                    i = n && n.isSupportInlineSVG(),
                    o = i ? "svg" : "png";
                t.param("autoType") && t.param(o, "//yastatic.net/suggest-flag-icons/icon." + t.param("autoType") + o, !0);
                var s = e.png && e.svg ? e[o] : e.svg || e.png;
                s && t.attr("style", 'background-image:url("' + s + '");' + (t.attr("style") || ""), !0), t.tag("span")
            })
        }(),
        function() {
            n.match("suggest2-item__icon", function(t) {
                if (t.mod("weather")) {
                    var e = t.mod("weather").replace("-", "minus-").replace("+", "plus-").replace(/_/g, "-");
                    t.param("autoType", "weather." + e + ".", !0), t.mod("weather", e, !0)
                }
            })
        }(),
        function() {
            n.match("suggest2__items", function(t) {
                t.attrs({
                    role: "listbox",
                    id: "search-results"
                })
            })
        }(),
        function() {
            n.match("suggest2__button", function(t) {
                t.tag("button"), t.attrs({
                    type: "submit"
                })
            })
        }(),
        function() {
            n.match("suggest2-item__highlight", function(t, e) {
                t.tag("b"), t.bem(!1), t.content(n.xmlEscape(e.content))
            })
        }(),
        function() {
            n.match("suggest2__title", function(t, e) {
                t.content([{
                    elem: "a11y",
                    content: BEM.I18N("suggest2", "group") + ": "
                }, e.content], !0)
            })
        }(),
        function() {
            n.match("suggest2_theme_normal__content", function(t) {
                t.tag("ul")
            })
        }(),
        function() {
            n.match("suggest2-item__bullet", function(t) {
                t.tag("span"), t.attr("aria-hidden", !0)
            })
        }(),
        function() {
            n.match("suggest2-item_type_nav__fact", function(t, e) {
                t.content(n.xmlEscape(e.content), !0)
            })
        }(),
        function() {
            n.match("suggest2-item_interact_link", function(t, e) {
                t.content({
                    elem: "link",
                    url: e.url,
                    target: e.target || "_blank",
                    content: e.content
                }, !0)
            }), n.match("suggest2-item_interact_link__text", function(t, e) {
                "nav" !== e.mods.type && "icon" !== e.mods.type || t.mod("type", "url")
            })
        }(),
        function() {
            n.match("suggest2-item_interact_link", function(t, e) {
                var n = e.compareLocation,
                    i = e.contains,
                    o = e.isCompareTypeAddOnly,
                    s = blocks.get("compare-cities-utils"),
                    r = i ? "remove" : "add";
                t.tag("li"), t.js({
                    geoInfo: e.geoInfo
                }), t.content([{
                    block: "suggest2-item",
                    elem: "link",
                    mods: !o && {
                        "with-compare": Boolean(n)
                    },
                    attrs: {
                        role: "option"
                    },
                    url: e.url,
                    target: e.target || "_blank",
                    content: e.content
                }, n && {
                    block: "compare-cities-action",
                    js: {
                        location: n.location,
                        name: n.name
                    },
                    attrs: {
                        "data-id": JSON.stringify(n.location)
                    },
                    mods: {
                        contains: i ? "yes" : "no",
                        "with-tooltip": !o && "yes",
                        kind: "list-action"
                    },
                    mix: {
                        block: "suggest2-item",
                        elem: "compare",
                        mods: {
                            type: o && "full"
                        }
                    },
                    content: {
                        block: "inline-icon",
                        mods: {
                            id: "list-" + r
                        }
                    },
                    hash: s.getLocationHash(n.location)
                }], !0);
                var a = e.mods || {};
                ["nav", "icon"].indexOf(a.type) !== -1 && t.tParam("textUrl", !0), t.stop()
            })
        }(),
        function() {
            n.match("suggest2-item__text_type_title-url", function(t) {
                t.tag("div")
            })
        }(),
        function() {
            n.match("suggest2-item__text_type_green-url", function(t) {
                t.tag("div")
            })
        }(),
        function() {
            n.match("suggest2-item__icon", function(t) {
                t.mod("traffic") && t.param("autoType", "traffic." + t.mod("traffic") + ".", !0)
            })
        }(),
        function() {
            n.match("button", function(t, e) {
                var n = e.url;
                if (t.js(!0).tag(n ? "a" : "button").attr("tabindex", e.tabindex), n) {
                    var i = "_blank" === e.target,
                        o = t.attr("rel") || "";
                    t.attrs({
                        href: n,
                        target: e.target
                    }), i && (o && o.indexOf("noopener") !== -1 || (o = o ? o += " noopener" : "noopener", t.attr("rel", o, !0)))
                } else t.attrs({
                    type: e.type || "button",
                    autocomplete: "off",
                    name: e.name,
                    value: e.value
                });
                t.content({
                    elem: "text",
                    tag: "span",
                    content: t.content()
                }, !0)
            })
        }(),
        function() {
            n.match("button_disabled_yes", function(t, e) {
                e.url ? t.attr("aria-disabled", "true") : t.attr("disabled", !0)
            })
        }(),
        function() {
            n.match("button2_type_link", function(t, e) {
                var n = t.mods(),
                    i = void 0 !== e.url,
                    o = Boolean(n.disabled),
                    s = e.tabindex;
                void 0 === s && (s = "0"), t.tag("a").js({
                    _url: t.mod("disabled") ? e.url : void 0
                }).attrs({
                    target: e.target,
                    autocomplete: void 0,
                    type: void 0,
                    href: t.mod("disabled") ? void 0 : e.url,
                    disabled: void 0,
                    tabindex: o ? i && -1 : s
                });
                var r = "_blank" === e.target,
                    a = t.attr("rel") || "";
                r && (a && a.indexOf("noopener") !== -1 || (a = a ? a += " noopener" : "noopener", t.attr("rel", a, !0)))
            })
        }(),
        function() {
            n.match("script", function(t, e) {
                var i = {
                    src: e.url
                };
                e.url || (i.nonce = e.nonce || n.lib.global.nonce), e.type && (i.type = e.type), e.language && (i.language = e.language), e.async && (i.async = !0), e.defer && (i.defer = !0), t.bem(!1).tag("script").attrs(i)
            })
        }()
    };
    n.lib.i18n = t.BEM.I18N;
    var o = !0;
    "object" == typeof modules ? (modules.define("BH", [], function(e) {
        n.lib.i18n = t.BEM.I18N, i(), e(n)
    }), modules.define("BEMHTML", ["BH"], function(t) {
        t(n)
    }), o = !1) : "object" == typeof exports && (i(), n.BEMHTML = n, module.exports = n, o = !1), o && (n.lib.i18n = t.BEM.I18N, i(), t.BH = n, t.BEMHTML = n)
}("undefined" != typeof window ? window : "undefined" != typeof global ? global : this);
var Blocks = function() {
"use strict";

function t() {
    this._methods = {}, this.lib = {}
}
return t.prototype.declare = function(t, e) {
    if (!t || "string" != typeof t) throw new TypeError("Argument `name` must be a string");
    if (null === e || void 0 === e) throw new TypeError("Argument `method` must not be Null or undefined");
    return this._methods[t] = e, this
}, t.prototype.decl = t.prototype.declare, t.prototype.has = function(t) {
    if (!t || "string" != typeof t) throw new TypeError("Argument `name` must be a string");
    return Boolean(this._methods[t])
}, t.prototype.get = function(t) {
    if (!t || "string" != typeof t) throw new TypeError("Argument `name` must be a string");
    var e = this._methods[t];
    if (!e) throw new Error("Priv method `" + t + "` was not declared");
    return e
}, t.prototype.exec = function(t) {
    if (!t || "string" != typeof t) throw new TypeError("Argument `name` must be a string");
    var e = this._methods[t];
    if (!e) throw new Error("Priv method `" + t + "` was not declared");
    var n, i = typeof e;
    if ("function" !== i) throw n = ["object", "undefined"].indexOf(i), new TypeError("Can't exec priv method `" + t + "` because It's a" + (n ? "n " : " ") + i + " not a function");
    var o = Array.prototype.slice.call(arguments, 1);
    return e.apply(this, o)
}, t
}();
"undefined" != typeof module && (module.exports = Blocks);
var blocks = new Blocks,
DAYS_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
MONTH_NAMES_PARTITIVE = BEM.I18N("interface-common", "month-names-partitive").split(","),
MONTH_NAMES_NOMINATIVE = BEM.I18N("interface-common", "month-nom-names").split(","),
MONTH_NAMES_SHORT_PARTITIVE = BEM.I18N("interface-common", "month-names-short-partitive").split("|"),
MONTH_NAMES_SHORT_NOMINATIVE = BEM.I18N("interface-common", "months").split("|"),
NECESSARY_DAY_PARTS = ["day_short", "morning", "day", "evening", "night_next"],
COMMA_DECIMAL_SEPARATOR_LANGUAGES = ["ru", "uk", "be", "kk", "uz", "tr"],
MOON_CODE_TO_MOON_STAGE = {
    0: {
        name: "full-moon",
        index: 4
    },
    1: {
        name: "waning-gibbous",
        index: 3
    },
    2: {
        name: "waning-gibbous",
        index: 3
    },
    3: {
        name: "waning-gibbous",
        index: 3
    },
    4: {
        name: "last-quarter",
        index: 2
    },
    5: {
        name: "waning-crescent",
        index: 1
    },
    6: {
        name: "waning-crescent",
        index: 1
    },
    7: {
        name: "waning-crescent",
        index: 1
    },
    8: {
        name: "new-moon",
        index: 0
    },
    9: {
        name: "waxing-crescent",
        index: 7
    },
    10: {
        name: "waxing-crescent",
        index: 7
    },
    11: {
        name: "waxing-crescent",
        index: 7
    },
    12: {
        name: "first-quarter",
        index: 6
    },
    13: {
        name: "waxing-gibbous",
        index: 5
    },
    14: {
        name: "waxing-gibbous",
        index: 5
    },
    15: {
        name: "waxing-gibbous",
        index: 5
    }
};
blocks.declare("i-utils", {
isWeekend: function(t) {
    return [0, 6].indexOf(t.day()) > -1
},
isToday: function(t, e) {
    return t.isSame(e, "day")
},
isTomorrow: function(t, e) {
    return t.isSame(e.clone().add(1, "d"), "day")
},
isYesterday: function(t, e) {
    return t.isSame(e.clone().subtract(1, "d"), "day")
},
replaceForBe: function(t) {
    return (t || "").replace(/([аеёiоуыэуя]\s+)у/gi, "$1ў")
},
uniq: function(t) {
    var e = -1,
        n = t.length,
        i = [];
    t: for (; ++e < n;) {
        for (var o = t[e], s = i.length; s--;)
            if (i[s] === o) continue t;
        i.push(o)
    }
    return i
},
formatHumidity: function(t, e) {
    return "tr" === e ? "%" + t : t + "%"
},
capitalizeFirstLetter: function(t) {
    return t.charAt(0).toUpperCase() + t.slice(1)
},
splitArrayIntoChunks: function(t, e) {
    var n, i = t.length,
        o = [];
    for (n = 0; n < i; n += e) o.push(t.slice(n, n + e));
    return o
},
addParamToUrl: function(t, e) {
    Array.isArray(e) && (e = e.join("&"));
    var n = t.split("#"),
        i = n[0],
        o = n[1];
    return i + (i.split("?")[1] ? "&" : "?") + e + (o ? "#" + o : "")
},
makeURLSavingParameters: ["from", "lang", "app_integration", "app_integration_no_ads", "app_integration_collapsed_sausage", "app_integration_loader_event", "app_integration_hide_first_ad", "app_integration_home_lat", "app_integration_home_lon", "app_integration_favorites", "adv_turboapp", "yw_preset", "adv_preset", "clid", "datasync_token", "autotest", "america", "usemock"],
makeURLCustomQueryWhitelist: ["acc_maps", "nowcast", "nowcast_header", "appsearch_header", "retpath", "from", "via", "details_lazy_load", "main_lazy_load", "no_controls", "app_integration_home_lat", "app_integration_home_lon", "app_integration_favorites"],
makeURL: function(t, e) {
    e = e || {};
    var n, i = blocks.options || e.overrideOptions,
        o = i.protocol,
        s = i.host,
        r = i.isMeteum,
        a = e.query,
        c = e.dropQuery,
        l = void 0 === c ? [] : c,
        u = e.isTurboApp,
        d = e.front2 ? "/weather" : i.serviceRoot;
    e.absolute ? (n = o + "://" + s + d, e.tld && (n = n.replace(i.tld, e.tld))) : n = d, !r || "" !== t && "/" !== t ? "/" === t ? t = n + (u ? "/" : "") : t.startsWith(n) || (t = t.startsWith("/") ? "" + n + t : n + "/" + t) : t = "/";
    var h = t.split("#");
    t = h[0];
    var p = h[1],
        m = e.preciseQuery !== !1,
        f = e.coords || i.coords,
        _ = [];
    return e.front2 && _.push("front2=1"), m && (f && (_.push("lat=" + f.lat), _.push("lon=" + f.lon)), i.suggest && (_.push("name=" + i.suggest.name), _.push("kind=" + i.suggest.kind))), (i.queryLang || e.front2) && i.language && _.push("lang=" + i.language), i.query && (i.query.showmethehamster && l !== !0 && l.indexOf("showmethehaster") === -1 && _.push("showmethehamster=" + encodeURIComponent(i.query.showmethehamster)), this.makeURLSavingParameters.forEach(function(t) {
        i.query[t] && l !== !0 && l.indexOf(t) === -1 && _.push(t + "=" + encodeURIComponent(i.query[t]))
    })), a && this.makeURLCustomQueryWhitelist.forEach(function(t) {
        var e = a[t];
        e && _.push(t + "=" + encodeURIComponent(e))
    }), _.length && (t = this.addParamToUrl(t, _)), t + (p ? "#" + p : "")
},
makeNativeNowcastMapUrl: function() {
    var t = blocks.options.itsMyLocation,
        e = blocks.options.coords,
        n = blocks.options.region,
        i = t && Boolean(e),
        o = "weathernative://map";
    return i ? o + "?lat=" + e.lat + "&lon=" + e.lon : o + "?lat=" + n.lat + "&lon=" + n.lon + "&geoid=" + n.id
},
getMordaUrl: function(t, e) {
    var n = Object.entries(e || {}).map(function(t) {
        var e = t[0],
            n = t[1];
        return e + "=" + n
    }).join("&");
    return "ru" === t ? "//ya.ru?" + n : "//yandex." + t + "?" + n
},
getCopyrightLink: function(t, e) {
    return e ? "//yandex.com" : "ru" === t ? "//ya.ru" : "//yandex." + t
},
serialize: function(t, e) {
    return (e ? "&" : "?") + Object.keys(t).reduce(function(e, n) {
        return e.push(n + "=" + encodeURIComponent(t[n])), e
    }, []).join("&")
},
getDayNumber: function(t) {
    return Number(t.date.slice(-2))
},
plural: function(t, e) {
    var n = [2, 0, 1, 1, 1, 2];
    return e[t % 100 > 4 && t % 100 < 20 ? 2 : n[t % 10 < 5 ? t % 10 : 5]]
},
nbspForEmpty: function(t, e) {
    return t ? e || t : " "
},
getRandomString: function(t, e) {
    var n = Math.random() * (e - t) + t;
    return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, n)
},
getAdParams: function(t, e) {
    if (t && t.length) {
        var n = t[0],
            i = t[1],
            o = blocks.data,
            s = blocks.options;
        return e || (e = s.user.cry ? this.getRandomString(4, 9) : e = n), {
            target: e,
            params: {
                blockId: n,
                defaultId: i,
                renderTo: e,
                statId: s.adStatId,
                async: !0,
                extParams: this.getAdExtParams(o.fact, s)
            }
        }
    }
},
getAdExtParams: function(t, e) {
    if (t) {
        var n = "",
            i = "";
        return e.region && e.region.country && (n += "&country=", n += e.region.country), e.clid && (i += "&distr-id=", i += e.clid), "&temp=" + t.temp + "&icon=" + t.icon + "&humidity=" + t.humidity + "&city=" + e.regionId + n + "&reqid=" + e.requestId + i + "&awaps_section=8939"
    }
},
getAdfoxParams: function(t) {
    if (t) {
        var e = blocks.options;
        return {
            params: {
                ownerId: 249598,
                containerId: e.user.cry ? this.getRandomString(4, 9) : t.id,
                async: !0,
                params: {
                    p1: t.p1,
                    p2: t.p2,
                    puid1: ""
                }
            }
        }
    }
},
getMajorVersion: function(t) {
    return parseInt(t, 10)
},
getWindSpeed: function(t, e) {
    return "kmph" === e ? ~~(3.6 * t) : t
},
formatWindSpeed: function(t, e, n) {
    var i = this.getWindSpeed(t, e);
    return n && n.addZero && "kmph" !== e && t % 1 === 0 && (i += ".0"), n && (i = n.comma ? String(i).replace(".", ",") : this.formatDecimalSeparator(i, n.lang)), String(i)
},
formatDecimalSeparator: function(t, e) {
    return e && COMMA_DECIMAL_SEPARATOR_LANGUAGES.indexOf(e) !== -1 ? String(t).replace(".", ",") : t
},
manuallyChangeLatLonByRegionId: function(t) {
    return (blocks.options.configDynamic.maps.regionsCenter || {})[t] || {}
},
buildMapBackButtonUrl: function(t) {
    var e = t.referrer,
        n = t.isAppIntegration,
        i = t.slug,
        o = t.initialQueries,
        s = t.isTurboApp;
    if (e) return e.indexOf("via") === -1 ? this.addParamToUrl(e, "via=mapb") : e.replace(new RegExp("via=([^&]*)"), "via=mapb");
    var r = {
        via: "mapd"
    };
    o = o || {};
    var a = o && o.app_integration_home_lat,
        c = o && o.app_integration_home_lon;
    return n && a && c && (r.app_integration_home_lat = a, r.app_integration_home_lat = c), this.makeURL("/" + (!n && i || ""), {
        query: r,
        absolute: !0,
        isTurboApp: s
    })
},
makeMapUrlByRegion: function(t, e) {
    var n, i, o = this.manuallyChangeLatLonByRegionId(t.id),
        s = (o.spn_lat || t.spn_lat || 30) / 2,
        r = (o.spn_lon || t.spn_lon || 145) / 2,
        a = o.lat || t.lat,
        c = o.lon || t.lon;
    e ? (n = e.lat, i = e.lon) : (n = a, i = c);
    var l = c - r + "," + (a - s),
        u = c + r + "," + (a + s);
    return ["lat=" + n, "lon=" + i, "bounds=" + encodeURIComponent(l + ";" + u)].join("&")
},
getWeekDayName: function(t) {
    return BEM.I18N("interface-common", "week_day_" + DAYS_NAMES[t])
},
getShortWeekDayName: function(t) {
    return BEM.I18N("interface-common", "week_day_short_" + DAYS_NAMES[t])
},
getMonthNominativeName: function(t) {
    return MONTH_NAMES_NOMINATIVE[t]
},
getMonthShortNominativeName: function(t) {
    return MONTH_NAMES_SHORT_NOMINATIVE[t]
},
getMonthShortPartiveName: function(t) {
    return MONTH_NAMES_SHORT_PARTITIVE[t]
},
getMonthPartitiveName: function(t) {
    return MONTH_NAMES_PARTITIVE[t]
},
_getHourlyWeatherFromForecasts: function(t, e) {
    var n = e && e[0] && e[0].hours,
        i = e && e[1] && e[1].hours,
        o = (n || []).slice(t.hour());
    return [].concat(o, i || []).slice(0, 24).map(function(t) {
        return {
            hour: t.hour,
            hour_ts: t.hour_ts,
            temp: t.temp,
            icon: t.icon
        }
    })
},
_getMaxMinTempFromDayParts: function(t) {
    var e = Math.max(t.morning.temp_max, t.day.temp_max, t.evening.temp_max, t.night_next.temp_max),
        n = Math.min(t.morning.temp_min, t.day.temp_min, t.evening.temp_min, t.night_next.temp_min);
    return {
        temp_min: n,
        temp_max: e
    }
},
_getDayParameters: function(t) {
    for (var e = this, n = t.parts, i = 0; i < NECESSARY_DAY_PARTS.length; i++)
        if (!n[NECESSARY_DAY_PARTS[i]]) return;
    var o = e._getMaxMinTempFromDayParts(n);
    return o.date = t.date, o.date_ts = t.date_ts, o.icon = n.day_short.icon, o
},
prepareWeatherDataForMetrika: function(t, e) {
    var n = this,
        i = {};
    return t.forecasts && (i.days = t.forecasts.reduce(function(t, e) {
        var i = n._getDayParameters(e);
        return i && t.push(i), t
    }, []), i.hourly = n._getHourlyWeatherFromForecasts(e, t.forecasts)), t.nowcastAlert && (i.nowcastAlert = t.nowcastAlert.title), t.fact && (i.fact = t.fact), i
},
getMoonStage: function(t) {
    return MOON_CODE_TO_MOON_STAGE[t]
},
getCorrectTimeZoneName: function(t) {
    return blocks.options.lib.getCorrectTimeZoneName(t)
},
logFromPriv: function(t, e) {
    var n = e.page,
        i = e.lib.logger;
    if (i) {
        "function" != typeof i.zerror && (e.lib.logger = i({
            prefix: "ctrl:pages:" + n
        }));
        var o = Object.assign({
            level: "warning",
            locals: e
        }, t);
        e.lib.logger.zerror(o)
    }
},
getFormattedTime: function(t, e) {
    if ("undefined" == typeof Intl || !t) return t;
    var n = t.split(":").map(function(t) {
            return Number(t.replace(/^0/, ""))
        }),
        i = n[0],
        o = n[1];
    if (!i && 0 !== i || !o && 0 !== o) return t;
    var s = new Date;
    return s.setHours(i), s.setMinutes(o), Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "numeric",
        hourCycle: e ? "h12" : "h23"
    }).format(s)
},
isCookieAvailableByType: function(t, e) {
    if (void 0 === t || "0" === t) return !0;
    switch (e) {
        case "analytic":
            return "2" === t;
        case "other":
            return "3" === t
    }
    return "1" === t
}
}), blocks.declare("i-compare-cookie__core", {
_DELIMITER: ";",
add: function(t, e) {
    var n = this;
    n.toggle(t, e, !0)
},
remove: function(t, e) {
    var n = this;
    n.toggle(t, e, !1)
},
toggle: function(t, e, n) {
    var i = this,
        o = i._pack(e),
        s = i._split(t),
        r = s.indexOf(o);
    return r > -1 ? n !== !0 && s.splice(r, 1) : n !== !1 && s.push(o), s.join(i._DELIMITER)
},
contains: function(t, e) {
    var n = this;
    return n._split(t).indexOf(n._pack(e)) > -1
},
getLength: function(t) {
    var e = this;
    return e._split(t).length
},
_pack: function(t) {
    return "object" == typeof t ? t.lat + "," + t.lon : String(t)
},
_split: function(t) {
    var e = this;
    return t ? t.split(e._DELIMITER) : []
}
}), blocks.declare("i-compare-cookie", {
_core: blocks.get("i-compare-cookie__core"),
contains: function(t) {
    var e = this;
    return e._core.contains(e._raw(), t)
},
_raw: function() {
    var t = blocks.options;
    return t.cookies[t.config.compare.cookies.cityList.name]
}
}), blocks.declare("compare-cities-utils", {
getLocationHash: function(t, e, n) {
    return t ? t : "lat-" + String(e).replace(".", "-") + "-lon-" + String(n).replace(".", "-")
}
}), blocks.declare("popup-content_type_geolocation-error", function(t) {
return {
    block: "popup-content",
    mods: {
        type: "geolocation-error"
    },
    content: [{
        block: "tooltip",
        elem: "description",
        content: t.message
    }, {
        block: "tooltip",
        elem: "buttons",
        content: [{
            block: "button2",
            mods: {
                view: "classic",
                tone: "default",
                size: "m",
                theme: "action",
                "popup-close": !0
            },
            text: BEM.I18N("interface-common", "close")
        }]
    }]
}
}), blocks.declare("popup-content_type_geolocation-disabled", function(t) {
return {
    block: "popup-content",
    mods: {
        type: "geolocation-disabled"
    },
    content: [{
        block: "tooltip",
        elem: "description",
        content: t.message
    }, {
        block: "tooltip",
        elem: "buttons",
        content: [{
            block: "button2",
            mods: {
                view: "classic",
                tone: "default",
                size: "m",
                theme: "clear",
                "popup-close": !0
            },
            text: BEM.I18N("interface-desktop", "at-another-time")
        }, {
            block: "button2",
            mods: {
                view: "classic",
                tone: "default",
                size: "m",
                theme: "action",
                type: "link"
            },
            text: BEM.I18N("interface-desktop", "open-manual"),
            url: t.manualLink,
            target: "_blank"
        }]
    }]
}
});