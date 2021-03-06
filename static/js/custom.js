! function(e, t) { "object" == typeof exports ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : t(e.jQuery) }(this, function(e) { var t = function(e, t) { var n, r = document.createElement("canvas");
            e.appendChild(r), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(r); var i = r.getContext("2d");
            r.width = r.height = t.size; var s = 1;
            window.devicePixelRatio > 1 && (s = window.devicePixelRatio, r.style.width = r.style.height = [t.size, "px"].join(""), r.width = r.height = t.size * s, i.scale(s, s)), i.translate(t.size / 2, t.size / 2), i.rotate((-.5 + t.rotate / 180) * Math.PI); var o = (t.size - t.lineWidth) / 2;
            t.scaleColor && t.scaleLength && (o -= t.scaleLength + 2), Date.now = Date.now || function() { return +(new Date) }; var u = function(e, t, n) { n = Math.min(Math.max(-1, n || 0), 1); var r = 0 >= n ? !0 : !1;
                    i.beginPath(), i.arc(0, 0, o, 0, 2 * Math.PI * n, r), i.strokeStyle = e, i.lineWidth = t, i.stroke() },
                a = function() { var e, n;
                    i.lineWidth = 1, i.fillStyle = t.scaleColor, i.save(); for (var r = 24; r > 0; --r) r % 6 === 0 ? (n = t.scaleLength, e = 0) : (n = .6 * t.scaleLength, e = t.scaleLength - n), i.fillRect(-t.size / 2 + e, 0, n, 1), i.rotate(Math.PI / 12);
                    i.restore() },
                f = function() { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) { window.setTimeout(e, 1e3 / 60) } }(),
                l = function() { t.scaleColor && a(), t.trackColor && u(t.trackColor, t.lineWidth, 1) };
            this.getCanvas = function() { return r }, this.getCtx = function() { return i }, this.clear = function() { i.clearRect(t.size / -2, t.size / -2, t.size, t.size) }, this.draw = function(e) { t.scaleColor || t.trackColor ? i.getImageData && i.putImageData ? n ? i.putImageData(n, 0, 0) : (l(), n = i.getImageData(0, 0, t.size * s, t.size * s)) : (this.clear(), l()) : this.clear(), i.lineCap = t.lineCap; var r;
                r = "function" == typeof t.barColor ? t.barColor(e) : t.barColor, u(r, t.lineWidth, e / 100) }.bind(this), this.animate = function(e, n) { var r = Date.now();
                t.onStart(e, n); var i = function() { var s = Math.min(Date.now() - r, t.animate.duration),
                        o = t.easing(this, s, e, n - e, t.animate.duration);
                    this.draw(o), t.onStep(e, n, o), s >= t.animate.duration ? t.onStop(e, n) : f(i) }.bind(this);
                f(i) }.bind(this) },
        n = function(e, n) { var r = { barColor: "#ef1e25", trackColor: "#f9f9f9", scaleColor: "#dfe0e0", scaleLength: 5, lineCap: "round", lineWidth: 3, size: 110, rotate: 0, animate: { duration: 1e3, enabled: !0 }, easing: function(e, t, n, r, i) { return t /= i / 2, 1 > t ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n }, onStart: function() {}, onStep: function() {}, onStop: function() {} }; if ("undefined" != typeof t) r.renderer = t;
            else { if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                r.renderer = SVGRenderer } var i = {},
                s = 0,
                o = function() { this.el = e, this.options = i; for (var t in r) r.hasOwnProperty(t) && (i[t] = n && "undefined" != typeof n[t] ? n[t] : r[t], "function" == typeof i[t] && (i[t] = i[t].bind(this)));
                    i.easing = "string" == typeof i.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[i.easing]) ? jQuery.easing[i.easing] : r.easing, "number" == typeof i.animate && (i.animate = { duration: i.animate, enabled: !0 }), "boolean" != typeof i.animate || i.animate || (i.animate = { duration: 1e3, enabled: i.animate }), this.renderer = new i.renderer(e, i), this.renderer.draw(s), e.dataset && e.dataset.percent ? this.update(parseFloat(e.dataset.percent)) : e.getAttribute && e.getAttribute("data-percent") && this.update(parseFloat(e.getAttribute("data-percent"))) }.bind(this);
            this.update = function(e) { return e = parseFloat(e), i.animate.enabled ? this.renderer.animate(s, e) : this.renderer.draw(e), s = e, this }.bind(this), this.disableAnimation = function() { return i.animate.enabled = !1, this }, this.enableAnimation = function() { return i.animate.enabled = !0, this }, o() };
    e.fn.easyPieChart = function(t) { return this.each(function() { var r;
            e.data(this, "easyPieChart") || (r = e.extend({}, t, e(this).data()), e.data(this, "easyPieChart", new n(this, r))) }) } });
(function(e, t, n) { "use strict"; var r = e.document,
        i = e.Modernizr,
        s = function(e) { return e.charAt(0).toUpperCase() + e.slice(1) },
        o = "Moz Webkit O Ms".split(" "),
        u = function(e) { var t = r.documentElement.style,
                n; if (typeof t[e] == "string") return e;
            e = s(e); for (var i = 0, u = o.length; i < u; i++) { n = o[i] + e; if (typeof t[n] == "string") return n } },
        a = u("transform"),
        f = u("transitionProperty"),
        l = { csstransforms: function() { return !!a }, csstransforms3d: function() { var e = !!u("perspective"); if (e) { var n = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
                        r = "@media (" + n.join("transform-3d),(") + "modernizr)",
                        i = t("<style>" + r + "{#modernizr{height:3px}}" + "</style>").appendTo("head"),
                        s = t('<div id="modernizr" />').appendTo("html");
                    e = s.height() === 3, s.remove(), i.remove() } return e }, csstransitions: function() { return !!f } },
        c; if (i)
        for (c in l) i.hasOwnProperty(c) || i.addTest(c, l[c]);
    else { i = e.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" }; var h = " ",
            p; for (c in l) p = l[c](), i[c] = p, h += " " + (p ? "" : "no-") + c;
        t("html").addClass(h) } if (i.csstransforms) { var d = i.csstransforms3d ? { translate: function(e) { return "translate3d(" + e[0] + "px, " + e[1] + "px, 0) " }, scale: function(e) { return "scale3d(" + e + ", " + e + ", 1) " } } : { translate: function(e) { return "translate(" + e[0] + "px, " + e[1] + "px) " }, scale: function(e) { return "scale(" + e + ") " } },
            v = function(e, n, r) { var i = t.data(e, "isoTransform") || {},
                    s = {},
                    o, u = {},
                    f;
                s[n] = r, t.extend(i, s); for (o in i) f = i[o], u[o] = d[o](f); var l = u.translate || "",
                    c = u.scale || "",
                    h = l + c;
                t.data(e, "isoTransform", i), e.style[a] = h };
        t.cssNumber.scale = !0, t.cssHooks.scale = { set: function(e, t) { v(e, "scale", t) }, get: function(e, n) { var r = t.data(e, "isoTransform"); return r && r.scale ? r.scale : 1 } }, t.fx.step.scale = function(e) { t.cssHooks.scale.set(e.elem, e.now + e.unit) }, t.cssNumber.translate = !0, t.cssHooks.translate = { set: function(e, t) { v(e, "translate", t) }, get: function(e, n) { var r = t.data(e, "isoTransform"); return r && r.translate ? r.translate : [0, 0] } } } var m, g;
    i.csstransitions && (m = { WebkitTransitionProperty: "webkitTransitionEnd", MozTransitionProperty: "transitionend", OTransitionProperty: "oTransitionEnd otransitionend", transitionProperty: "transitionend" }[f], g = u("transitionDuration")); var y = t.event,
        b = t.event.handle ? "handle" : "dispatch",
        w;
    y.special.smartresize = { setup: function() { t(this).bind("resize", y.special.smartresize.handler) }, teardown: function() { t(this).unbind("resize", y.special.smartresize.handler) }, handler: function(e, t) { var n = this,
                r = arguments;
            e.type = "smartresize", w && clearTimeout(w), w = setTimeout(function() { y[b].apply(n, r) }, t === "execAsap" ? 0 : 100) } }, t.fn.smartresize = function(e) { return e ? this.bind("smartresize", e) : this.trigger("smartresize", ["execAsap"]) }, t.Isotope = function(e, n, r) { this.element = t(n), this._create(e), this._init(r) }; var E = ["width", "height"],
        S = t(e);
    t.Isotope.settings = { resizable: !0, layoutMode: "masonry", containerClass: "isotope", itemClass: "isotope-item", hiddenClass: "isotope-hidden", hiddenStyle: { opacity: 0, scale: .001 }, visibleStyle: { opacity: 1, scale: 1 }, containerStyle: { position: "relative", overflow: "hidden" }, animationEngine: "best-available", animationOptions: { queue: !1, duration: 800 }, sortBy: "original-order", sortAscending: !0, resizesContainer: !0, transformsEnabled: !0, itemPositionDataEnabled: !1 }, t.Isotope.prototype = { _create: function(e) { this.options = t.extend({}, t.Isotope.settings, e), this.styleQueue = [], this.elemCount = 0; var n = this.element[0].style;
            this.originalStyle = {}; var r = E.slice(0); for (var i in this.options.containerStyle) r.push(i); for (var s = 0, o = r.length; s < o; s++) i = r[s], this.originalStyle[i] = n[i] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms(); var u = { "original-order": function(e, t) { return t.elemCount++, t.elemCount }, random: function() { return Math.random() } };
            this.options.getSortData = t.extend(this.options.getSortData, u), this.reloadItems(), this.offset = { left: parseInt(this.element.css("padding-left") || 0, 10), top: parseInt(this.element.css("padding-top") || 0, 10) }; var a = this;
            setTimeout(function() { a.element.addClass(a.options.containerClass) }, 0), this.options.resizable && S.bind("smartresize.isotope", function() { a.resize() }), this.element.delegate("." + this.options.hiddenClass, "click", function() { return !1 }) }, _getAtoms: function(e) { var t = this.options.itemSelector,
                n = t ? e.filter(t).add(e.find(t)) : e,
                r = { position: "absolute" }; return n = n.filter(function(e, t) { return t.nodeType === 1 }), this.usingTransforms && (r.left = 0, r.top = 0), n.css(r).addClass(this.options.itemClass), this.updateSortData(n, !0), n }, _init: function(e) { this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(e) }, option: function(e) { if (t.isPlainObject(e)) { this.options = t.extend(!0, this.options, e); var n; for (var r in e) n = "_update" + s(r), this[n] && this[n]() } }, _updateAnimationEngine: function() { var e = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""),
                t; switch (e) {
                case "css":
                case "none":
                    t = !1; break;
                case "jquery":
                    t = !0; break;
                default:
                    t = !i.csstransitions }
            this.isUsingJQueryAnimation = t, this._updateUsingTransforms() }, _updateTransformsEnabled: function() { this._updateUsingTransforms() }, _updateUsingTransforms: function() { var e = this.usingTransforms = this.options.transformsEnabled && i.csstransforms && i.csstransitions && !this.isUsingJQueryAnimation;
            e || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = e ? this._translate : this._positionAbs }, _filter: function(e) { var t = this.options.filter === "" ? "*" : this.options.filter; if (!t) return e; var n = this.options.hiddenClass,
                r = "." + n,
                i = e.filter(r),
                s = i; if (t !== "*") { s = i.filter(t); var o = e.not(r).not(t).addClass(n);
                this.styleQueue.push({ $el: o, style: this.options.hiddenStyle }) } return this.styleQueue.push({ $el: s, style: this.options.visibleStyle }), s.removeClass(n), e.filter(t) }, updateSortData: function(e, n) { var r = this,
                i = this.options.getSortData,
                s, o;
            e.each(function() { s = t(this), o = {}; for (var e in i) !n && e === "original-order" ? o[e] = t.data(this, "isotope-sort-data")[e] : o[e] = i[e](s, r);
                t.data(this, "isotope-sort-data", o) }) }, _sort: function() { var e = this.options.sortBy,
                t = this._getSorter,
                n = this.options.sortAscending ? 1 : -1,
                r = function(r, i) { var s = t(r, e),
                        o = t(i, e); return s === o && e !== "original-order" && (s = t(r, "original-order"), o = t(i, "original-order")), (s > o ? 1 : s < o ? -1 : 0) * n };
            this.$filteredAtoms.sort(r) }, _getSorter: function(e, n) { return t.data(e, "isotope-sort-data")[n] }, _translate: function(e, t) { return { translate: [e, t] } }, _positionAbs: function(e, t) { return { left: e, top: t } }, _pushPosition: function(e, t, n) { t = Math.round(t + this.offset.left), n = Math.round(n + this.offset.top); var r = this.getPositionStyles(t, n);
            this.styleQueue.push({ $el: e, style: r }), this.options.itemPositionDataEnabled && e.data("isotope-item-position", { x: t, y: n }) }, layout: function(e, t) { var n = this.options.layoutMode;
            this["_" + n + "Layout"](e); if (this.options.resizesContainer) { var r = this["_" + n + "GetContainerSize"]();
                this.styleQueue.push({ $el: this.element, style: r }) }
            this._processStyleQueue(e, t), this.isLaidOut = !0 }, _processStyleQueue: function(e, n) { var r = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css",
                s = this.options.animationOptions,
                o = this.options.onLayout,
                u, a, f, l;
            a = function(e, t) { t.$el[r](t.style, s) }; if (this._isInserting && this.isUsingJQueryAnimation) a = function(e, t) { u = t.$el.hasClass("no-transition") ? "css" : r, t.$el[u](t.style, s) };
            else if (n || o || s.complete) { var c = !1,
                    h = [n, o, s.complete],
                    p = this;
                f = !0, l = function() { if (c) return; var t; for (var n = 0, r = h.length; n < r; n++) t = h[n], typeof t == "function" && t.call(p.element, e, p);
                    c = !0 }; if (this.isUsingJQueryAnimation && r === "animate") s.complete = l, f = !1;
                else if (i.csstransitions) { var d = 0,
                        v = this.styleQueue[0],
                        y = v && v.$el,
                        b; while (!y || !y.length) { b = this.styleQueue[d++]; if (!b) return;
                        y = b.$el } var w = parseFloat(getComputedStyle(y[0])[g]);
                    w > 0 && (a = function(e, t) { t.$el[r](t.style, s).one(m, l) }, f = !1) } }
            t.each(this.styleQueue, a), f && l(), this.styleQueue = [] }, resize: function() { this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout() }, reLayout: function(e) { this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, e) }, addItems: function(e, t) { var n = this._getAtoms(e);
            this.$allAtoms = this.$allAtoms.add(n), t && t(n) }, insert: function(e, t) { this.element.append(e); var n = this;
            this.addItems(e, function(e) { var r = n._filter(e);
                n._addHideAppended(r), n._sort(), n.reLayout(), n._revealAppended(r, t) }) }, appended: function(e, t) { var n = this;
            this.addItems(e, function(e) { n._addHideAppended(e), n.layout(e), n._revealAppended(e, t) }) }, _addHideAppended: function(e) { this.$filteredAtoms = this.$filteredAtoms.add(e), e.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({ $el: e, style: this.options.hiddenStyle }) }, _revealAppended: function(e, t) { var n = this;
            setTimeout(function() { e.removeClass("no-transition"), n.styleQueue.push({ $el: e, style: n.options.visibleStyle }), n._isInserting = !1, n._processStyleQueue(e, t) }, 10) }, reloadItems: function() { this.$allAtoms = this._getAtoms(this.element.children()) }, remove: function(e, t) { this.$allAtoms = this.$allAtoms.not(e), this.$filteredAtoms = this.$filteredAtoms.not(e); var n = this,
                r = function() { e.remove(), t && t.call(n.element) };
            e.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({ $el: e, style: this.options.hiddenStyle }), this._sort(), this.reLayout(r)) : r() }, shuffle: function(e) { this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(e) }, destroy: function() { var e = this.usingTransforms,
                t = this.options;
            this.$allAtoms.removeClass(t.hiddenClass + " " + t.itemClass).each(function() { var t = this.style;
                t.position = "", t.top = "", t.left = "", t.opacity = "", e && (t[a] = "") }); var n = this.element[0].style; for (var r in this.originalStyle) n[r] = this.originalStyle[r];
            this.element.unbind(".isotope").undelegate("." + t.hiddenClass, "click").removeClass(t.containerClass).removeData("isotope"), S.unbind(".isotope") }, _getSegments: function(e) { var t = this.options.layoutMode,
                n = e ? "rowHeight" : "columnWidth",
                r = e ? "height" : "width",
                i = e ? "rows" : "cols",
                o = this.element[r](),
                u, a = this.options[t] && this.options[t][n] || this.$filteredAtoms["outer" + s(r)](!0) || o;
            u = Math.floor(o / a), u = Math.max(u, 1), this[t][i] = u, this[t][n] = a }, _checkIfSegmentsChanged: function(e) { var t = this.options.layoutMode,
                n = e ? "rows" : "cols",
                r = this[t][n]; return this._getSegments(e), this[t][n] !== r }, _masonryReset: function() { this.masonry = {}, this._getSegments(); var e = this.masonry.cols;
            this.masonry.colYs = []; while (e--) this.masonry.colYs.push(0) }, _masonryLayout: function(e) { var n = this,
                r = n.masonry;
            e.each(function() { var e = t(this),
                    i = Math.ceil(e.outerWidth(!0) / r.columnWidth);
                i = Math.min(i, r.cols); if (i === 1) n._masonryPlaceBrick(e, r.colYs);
                else { var s = r.cols + 1 - i,
                        o = [],
                        u, a; for (a = 0; a < s; a++) u = r.colYs.slice(a, a + i), o[a] = Math.max.apply(Math, u);
                    n._masonryPlaceBrick(e, o) } }) }, _masonryPlaceBrick: function(e, t) { var n = Math.min.apply(Math, t),
                r = 0; for (var i = 0, s = t.length; i < s; i++)
                if (t[i] === n) { r = i; break }
            var o = this.masonry.columnWidth * r,
                u = n;
            this._pushPosition(e, o, u); var a = n + e.outerHeight(!0),
                f = this.masonry.cols + 1 - s; for (i = 0; i < f; i++) this.masonry.colYs[r + i] = a }, _masonryGetContainerSize: function() { var e = Math.max.apply(Math, this.masonry.colYs); return { height: e } }, _masonryResizeChanged: function() { return this._checkIfSegmentsChanged() }, _fitRowsReset: function() { this.fitRows = { x: 0, y: 0, height: 0 } }, _fitRowsLayout: function(e) { var n = this,
                r = this.element.width(),
                i = this.fitRows;
            e.each(function() { var e = t(this),
                    s = e.outerWidth(!0),
                    o = e.outerHeight(!0);
                i.x !== 0 && s + i.x > r && (i.x = 0, i.y = i.height), n._pushPosition(e, i.x, i.y), i.height = Math.max(i.y + o, i.height), i.x += s }) }, _fitRowsGetContainerSize: function() { return { height: this.fitRows.height } }, _fitRowsResizeChanged: function() { return !0 }, _cellsByRowReset: function() { this.cellsByRow = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByRowLayout: function(e) { var n = this,
                r = this.cellsByRow;
            e.each(function() { var e = t(this),
                    i = r.index % r.cols,
                    s = Math.floor(r.index / r.cols),
                    o = (i + .5) * r.columnWidth - e.outerWidth(!0) / 2,
                    u = (s + .5) * r.rowHeight - e.outerHeight(!0) / 2;
                n._pushPosition(e, o, u), r.index++ }) }, _cellsByRowGetContainerSize: function() { return { height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top } }, _cellsByRowResizeChanged: function() { return this._checkIfSegmentsChanged() }, _straightDownReset: function() { this.straightDown = { y: 0 } }, _straightDownLayout: function(e) { var n = this;
            e.each(function(e) { var r = t(this);
                n._pushPosition(r, 0, n.straightDown.y), n.straightDown.y += r.outerHeight(!0) }) }, _straightDownGetContainerSize: function() { return { height: this.straightDown.y } }, _straightDownResizeChanged: function() { return !0 }, _masonryHorizontalReset: function() { this.masonryHorizontal = {}, this._getSegments(!0); var e = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = []; while (e--) this.masonryHorizontal.rowXs.push(0) }, _masonryHorizontalLayout: function(e) { var n = this,
                r = n.masonryHorizontal;
            e.each(function() { var e = t(this),
                    i = Math.ceil(e.outerHeight(!0) / r.rowHeight);
                i = Math.min(i, r.rows); if (i === 1) n._masonryHorizontalPlaceBrick(e, r.rowXs);
                else { var s = r.rows + 1 - i,
                        o = [],
                        u, a; for (a = 0; a < s; a++) u = r.rowXs.slice(a, a + i), o[a] = Math.max.apply(Math, u);
                    n._masonryHorizontalPlaceBrick(e, o) } }) }, _masonryHorizontalPlaceBrick: function(e, t) { var n = Math.min.apply(Math, t),
                r = 0; for (var i = 0, s = t.length; i < s; i++)
                if (t[i] === n) { r = i; break }
            var o = n,
                u = this.masonryHorizontal.rowHeight * r;
            this._pushPosition(e, o, u); var a = n + e.outerWidth(!0),
                f = this.masonryHorizontal.rows + 1 - s; for (i = 0; i < f; i++) this.masonryHorizontal.rowXs[r + i] = a }, _masonryHorizontalGetContainerSize: function() { var e = Math.max.apply(Math, this.masonryHorizontal.rowXs); return { width: e } }, _masonryHorizontalResizeChanged: function() { return this._checkIfSegmentsChanged(!0) }, _fitColumnsReset: function() { this.fitColumns = { x: 0, y: 0, width: 0 } }, _fitColumnsLayout: function(e) { var n = this,
                r = this.element.height(),
                i = this.fitColumns;
            e.each(function() { var e = t(this),
                    s = e.outerWidth(!0),
                    o = e.outerHeight(!0);
                i.y !== 0 && o + i.y > r && (i.x = i.width, i.y = 0), n._pushPosition(e, i.x, i.y), i.width = Math.max(i.x + s, i.width), i.y += o }) }, _fitColumnsGetContainerSize: function() { return { width: this.fitColumns.width } }, _fitColumnsResizeChanged: function() { return !0 }, _cellsByColumnReset: function() { this.cellsByColumn = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByColumnLayout: function(e) { var n = this,
                r = this.cellsByColumn;
            e.each(function() { var e = t(this),
                    i = Math.floor(r.index / r.rows),
                    s = r.index % r.rows,
                    o = (i + .5) * r.columnWidth - e.outerWidth(!0) / 2,
                    u = (s + .5) * r.rowHeight - e.outerHeight(!0) / 2;
                n._pushPosition(e, o, u), r.index++ }) }, _cellsByColumnGetContainerSize: function() { return { width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth } }, _cellsByColumnResizeChanged: function() { return this._checkIfSegmentsChanged(!0) }, _straightAcrossReset: function() { this.straightAcross = { x: 0 } }, _straightAcrossLayout: function(e) { var n = this;
            e.each(function(e) { var r = t(this);
                n._pushPosition(r, n.straightAcross.x, 0), n.straightAcross.x += r.outerWidth(!0) }) }, _straightAcrossGetContainerSize: function() { return { width: this.straightAcross.x } }, _straightAcrossResizeChanged: function() { return !0 } }, t.fn.imagesLoaded = function(e) {
        function n() { e.call(i, s) }

        function r(e) { var i = e.target;
            i.src !== u && t.inArray(i, a) === -1 && (a.push(i), --o <= 0 && (setTimeout(n), s.unbind(".imagesLoaded", r))) } var i = this,
            s = i.find("img").add(i.filter("img")),
            o = s.length,
            u = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            a = []; return o || n(), s.bind("load.imagesLoaded error.imagesLoaded", r).each(function() { var e = this.src;
            this.src = u, this.src = e }), i }; var x = function(t) { e.console && e.console.error(t) };
    t.fn.isotope = function(e, n) { if (typeof e == "string") { var r = Array.prototype.slice.call(arguments, 1);
            this.each(function() { var n = t.data(this, "isotope"); if (!n) { x("cannot call methods on isotope prior to initialization; attempted to call method '" + e + "'"); return } if (!t.isFunction(n[e]) || e.charAt(0) === "_") { x("no such method '" + e + "' for isotope instance"); return }
                n[e].apply(n, r) }) } else this.each(function() { var r = t.data(this, "isotope");
            r ? (r.option(e), r._init(n)) : t.data(this, "isotope", new t.Isotope(e, this, n)) }); return this } })(window, jQuery);
(function(e) {
    function t(e) { return e.replace(/(:|\.)/g, "\\$1") } var n = "1.4.13",
        r = {},
        i = { exclude: [], excludeWithin: [], offset: 0, direction: "top", scrollElement: null, scrollTarget: null, beforeScroll: function() {}, afterScroll: function() {}, easing: "swing", speed: 400, autoCoefficent: 2, preventDefault: true },
        s = function(t) { var n = [],
                r = false,
                i = t.dir && t.dir == "left" ? "scrollLeft" : "scrollTop";
            this.each(function() { if (this == document || this == window) { return } var t = e(this); if (t[i]() > 0) { n.push(this) } else { t[i](1);
                    r = t[i]() > 0; if (r) { n.push(this) }
                    t[i](0) } }); if (!n.length) { this.each(function(e) { if (this.nodeName === "BODY") { n = [this] } }) } if (t.el === "first" && n.length > 1) { n = [n[0]] } return n },
        o = "ontouchend" in document;
    e.fn.extend({ scrollable: function(e) { var t = s.call(this, { dir: e }); return this.pushStack(t) }, firstScrollable: function(e) { var t = s.call(this, { el: "first", dir: e }); return this.pushStack(t) }, smoothScroll: function(n, r) { n = n || {}; if (n === "options") { if (!r) { return this.first().data("ssOpts") } return this.each(function() { var t = e(this),
                        n = e.extend(t.data("ssOpts") || {}, r);
                    e(this).data("ssOpts", n) }) } var i = e.extend({}, e.fn.smoothScroll.defaults, n),
                s = e.smoothScroll.filterPath(location.pathname);
            this.unbind("click.smoothscroll touchstart.smoothscroll").bind("click.smoothscroll touchstart.smoothscroll", function(n) { var r = this,
                    o = e(this),
                    u = e.extend({}, i, o.data("ssOpts") || {}),
                    a = i.exclude,
                    f = u.excludeWithin,
                    l = 0,
                    c = 0,
                    h = true,
                    p = {},
                    d = location.hostname === r.hostname || !r.hostname,
                    v = u.scrollTarget || (e.smoothScroll.filterPath(r.pathname) || s) === s,
                    m = t(r.hash); if (!u.scrollTarget && (!d || !v || !m)) { h = false } else { while (h && l < a.length) { if (o.is(t(a[l++]))) { h = false } } while (h && c < f.length) { if (o.closest(f[c++]).length) { h = false } } } if (h) { if (u.preventDefault) { n.preventDefault() }
                    e.extend(p, u, { scrollTarget: u.scrollTarget || m, link: r });
                    e.smoothScroll(p) } }); return this } });
    e.smoothScroll = function(t, n) { if (t === "options" && typeof n === "object") { return e.extend(r, n) } var i, s, o, u, a = 0,
            f = "offset",
            l = "scrollTop",
            c = {},
            h = {},
            p = []; if (typeof t === "number") { i = e.extend({ link: null }, e.fn.smoothScroll.defaults, r);
            o = t } else { i = e.extend({ link: null }, e.fn.smoothScroll.defaults, t || {}, r); if (i.scrollElement) { f = "position"; if (i.scrollElement.css("position") == "static") { i.scrollElement.css("position", "relative") } } }
        l = i.direction == "left" ? "scrollLeft" : l; if (i.scrollElement) { s = i.scrollElement; if (!/^(?:HTML|BODY)$/.test(s[0].nodeName)) { a = s[l]() } } else { s = e("html, body").firstScrollable(i.direction) }
        i.beforeScroll.call(s, i);
        o = typeof t === "number" ? t : n || e(i.scrollTarget)[f]() && e(i.scrollTarget)[f]()[i.direction] || 0;
        c[l] = o + a + i.offset;
        u = i.speed; if (u === "auto") { u = c[l] || s.scrollTop();
            u = u / i.autoCoefficent }
        h = { duration: u, easing: i.easing, complete: function() { i.afterScroll.call(i.link, i) } }; if (i.step) { h.step = i.step } if (s.length) { s.stop().animate(c, h) } else { i.afterScroll.call(i.link, i) } };
    e.smoothScroll.version = n;
    e.smoothScroll.filterPath = function(e) { return e.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "") };
    e.fn.smoothScroll.defaults = i })(jQuery);
(function(e) { e.extend(e.fn, { validate: function(n) { if (!this.length) return n && n.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0; var r = e.data(this[0], "validator"); return r ? r : (this.attr("novalidate", "novalidate"), r = new e.validator(n, this[0]), e.data(this[0], "validator", r), r.settings.onsubmit && (this.validateDelegate(":submit", "click", function(n) { r.settings.submitHandler && (r.submitButton = n.target), e(n.target).hasClass("cancel") && (r.cancelSubmit = !0), void 0 !== e(n.target).attr("formnovalidate") && (r.cancelSubmit = !0) }), this.submit(function(n) {
                function s() { var s; return r.settings.submitHandler ? (r.submitButton && (s = e("<input type='hidden'/>").attr("name", r.submitButton.name).val(e(r.submitButton).val()).appendTo(r.currentForm)), r.settings.submitHandler.call(r, r.currentForm, n), r.submitButton && s.remove(), !1) : !0 } return r.settings.debug && n.preventDefault(), r.cancelSubmit ? (r.cancelSubmit = !1, s()) : r.form() ? r.pendingRequest ? (r.formSubmitted = !0, !1) : s() : (r.focusInvalid(), !1) })), r) }, valid: function() { if (e(this[0]).is("form")) return this.validate().form(); var n = !0,
                r = e(this[0].form).validate(); return this.each(function() { n = n && r.element(this) }), n }, removeAttrs: function(n) { var r = {},
                i = this; return e.each(n.split(/\s/), function(e, t) { r[t] = i.attr(t), i.removeAttr(t) }), r }, rules: function(n, r) { var i = this[0]; if (n) { var s = e.data(i.form, "validator").settings,
                    o = s.rules,
                    u = e.validator.staticRules(i); switch (n) {
                    case "add":
                        e.extend(u, e.validator.normalizeRule(r)), delete u.messages, o[i.name] = u, r.messages && (s.messages[i.name] = e.extend(s.messages[i.name], r.messages)); break;
                    case "remove":
                        if (!r) return delete o[i.name], u; var a = {}; return e.each(r.split(/\s/), function(e, t) { a[t] = u[t], delete u[t] }), a } } var f = e.validator.normalizeRules(e.extend({}, e.validator.classRules(i), e.validator.attributeRules(i), e.validator.dataRules(i), e.validator.staticRules(i)), i); if (f.required) { var l = f.required;
                delete f.required, f = e.extend({ required: l }, f) } return f } }), e.extend(e.expr[":"], { blank: function(n) { return !e.trim("" + e(n).val()) }, filled: function(n) { return !!e.trim("" + e(n).val()) }, unchecked: function(n) { return !e(n).prop("checked") } }), e.validator = function(n, r) { this.settings = e.extend(!0, {}, e.validator.defaults, n), this.currentForm = r, this.init() }, e.validator.format = function(n, r) { return 1 === arguments.length ? function() { var r = e.makeArray(arguments); return r.unshift(n), e.validator.format.apply(this, r) } : (arguments.length > 2 && r.constructor !== Array && (r = e.makeArray(arguments).slice(1)), r.constructor !== Array && (r = [r]), e.each(r, function(e, t) { n = n.replace(RegExp("\\{" + e + "\\}", "g"), function() { return t }) }), n) }, e.extend(e.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", validClass: "valid", errorElement: "label", focusInvalid: !0, errorContainer: e([]), errorLabelContainer: e([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function(e) { this.lastActive = e, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(e)).hide()) }, onfocusout: function(e) { this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e) }, onkeyup: function(e, t) {
                (9 !== t.which || "" !== this.elementValue(e)) && (e.name in this.submitted || e === this.lastElement) && this.element(e) }, onclick: function(e) { e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode) }, highlight: function(n, r, i) { "radio" === n.type ? this.findByName(n.name).addClass(r).removeClass(i) : e(n).addClass(r).removeClass(i) }, unhighlight: function(n, r, i) { "radio" === n.type ? this.findByName(n.name).removeClass(r).addClass(i) : e(n).removeClass(r).addClass(i) } }, setDefaults: function(n) { e.extend(e.validator.defaults, n) }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", maxlength: e.validator.format("Please enter no more than {0} characters."), minlength: e.validator.format("Please enter at least {0} characters."), rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."), range: e.validator.format("Please enter a value between {0} and {1}."), max: e.validator.format("Please enter a value less than or equal to {0}."), min: e.validator.format("Please enter a value greater than or equal to {0}.") }, autoCreateRanges: !1, prototype: { init: function() {
                function n(n) { var r = e.data(this[0].form, "validator"),
                        i = "on" + n.type.replace(/^validate/, "");
                    r.settings[i] && r.settings[i].call(r, this[0], n) }
                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset(); var r = this.groups = {};
                e.each(this.settings.groups, function(n, i) { "string" == typeof i && (i = i.split(/\s/)), e.each(i, function(e, t) { r[t] = n }) }); var i = this.settings.rules;
                e.each(i, function(n, r) { i[n] = e.validator.normalizeRule(r) }), e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", n).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", n), this.settings.invalidHandler && e(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler) }, form: function() { return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid() }, checkForm: function() { this.prepareForm(); for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]); return this.valid() }, element: function(n) { n = this.validationTargetFor(this.clean(n)), this.lastElement = n, this.prepareElement(n), this.currentElements = e(n); var r = this.check(n) !== !1; return r ? delete this.invalid[n.name] : this.invalid[n.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r }, showErrors: function(n) { if (n) { e.extend(this.errorMap, n), this.errorList = []; for (var r in n) this.errorList.push({ message: n[r], element: this.findByName(r)[0] });
                    this.successList = e.grep(this.successList, function(e) { return !(e.name in n) }) }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors() }, resetForm: function() { e.fn.resetForm && e(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue") }, numberOfInvalids: function() { return this.objectLength(this.invalid) }, objectLength: function(e) { var t = 0; for (var n in e) t++; return t }, hideErrors: function() { this.addWrapper(this.toHide).hide() }, valid: function() { return 0 === this.size() }, size: function() { return this.errorList.length }, focusInvalid: function() { if (this.settings.focusInvalid) try { e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (n) {} }, findLastActive: function() { var n = this.lastActive; return n && 1 === e.grep(this.errorList, function(e) { return e.element.name === n.name }).length && n }, elements: function() { var n = this,
                    r = {}; return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() { return !this.name && n.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in r || !n.objectLength(e(this).rules()) ? !1 : (r[this.name] = !0, !0) }) }, clean: function(n) { return e(n)[0] }, errors: function() { var n = this.settings.errorClass.replace(" ", "."); return e(this.settings.errorElement + "." + n, this.errorContext) }, reset: function() { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([]), this.currentElements = e([]) }, prepareForm: function() { this.reset(), this.toHide = this.errors().add(this.containers) }, prepareElement: function(e) { this.reset(), this.toHide = this.errorsFor(e) }, elementValue: function(n) { var r = e(n).attr("type"),
                    i = e(n).val(); return "radio" === r || "checkbox" === r ? e("input[name='" + e(n).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i }, check: function(n) { n = this.validationTargetFor(this.clean(n)); var r, i = e(n).rules(),
                    s = !1,
                    o = this.elementValue(n); for (var u in i) { var a = { method: u, parameters: i[u] }; try { if (r = e.validator.methods[u].call(this, o, n, a.parameters), "dependency-mismatch" === r) { s = !0; continue } if (s = !1, "pending" === r) return this.toHide = this.toHide.not(this.errorsFor(n)), void 0; if (!r) return this.formatAndAdd(n, a), !1 } catch (f) { throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + n.id + ", check the '" + a.method + "' method.", f), f } } return s ? void 0 : (this.objectLength(i) && this.successList.push(n), !0) }, customDataMessage: function(n, r) { return e(n).data("msg-" + r.toLowerCase()) || n.attributes && e(n).attr("data-msg-" + r.toLowerCase()) }, customMessage: function(e, t) { var n = this.settings.messages[e]; return n && (n.constructor === String ? n : n[t]) }, findDefined: function() { for (var e = 0; arguments.length > e; e++)
                    if (void 0 !== arguments[e]) return arguments[e];
                return void 0 }, defaultMessage: function(n, r) { return this.findDefined(this.customMessage(n.name, r), this.customDataMessage(n, r), !this.settings.ignoreTitle && n.title || void 0, e.validator.messages[r], "<strong>Warning: No message defined for " + n.name + "</strong>") }, formatAndAdd: function(n, r) { var i = this.defaultMessage(n, r.method),
                    s = /\$?\{(\d+)\}/g; "function" == typeof i ? i = i.call(this, r.parameters, n) : s.test(i) && (i = e.validator.format(i.replace(s, "{$1}"), r.parameters)), this.errorList.push({ message: i, element: n }), this.errorMap[n.name] = i, this.submitted[n.name] = i }, addWrapper: function(e) { return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e }, defaultShowErrors: function() { var e, t; for (e = 0; this.errorList[e]; e++) { var n = this.errorList[e];
                    this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message) } if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]); if (this.settings.unhighlight)
                    for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show() }, validElements: function() { return this.currentElements.not(this.invalidElements()) }, invalidElements: function() { return e(this.errorList).map(function() { return this.element }) }, showLabel: function(n, r) { var i = this.errorsFor(n);
                i.length ? (i.removeClass(this.settings.validClass).addClass(this.settings.errorClass), i.html(r)) : (i = e("<" + this.settings.errorElement + ">").attr("for", this.idOrName(n)).addClass(this.settings.errorClass).html(r || ""), this.settings.wrapper && (i = i.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(i).length || (this.settings.errorPlacement ? this.settings.errorPlacement(i, e(n)) : i.insertAfter(n))), !r && this.settings.success && (i.text(""), "string" == typeof this.settings.success ? i.addClass(this.settings.success) : this.settings.success(i, n)), this.toShow = this.toShow.add(i) }, errorsFor: function(n) { var r = this.idOrName(n); return this.errors().filter(function() { return e(this).attr("for") === r }) }, idOrName: function(e) { return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name) }, validationTargetFor: function(e) { return this.checkable(e) && (e = this.findByName(e.name).not(this.settings.ignore)[0]), e }, checkable: function(e) { return /radio|checkbox/i.test(e.type) }, findByName: function(n) { return e(this.currentForm).find("[name='" + n + "']") }, getLength: function(n, r) { switch (r.nodeName.toLowerCase()) {
                    case "select":
                        return e("option:selected", r).length;
                    case "input":
                        if (this.checkable(r)) return this.findByName(r.name).filter(":checked").length } return n.length }, depend: function(e, t) { return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, t) : !0 }, dependTypes: { "boolean": function(e) { return e }, string: function(n, r) { return !!e(n, r.form).length }, "function": function(e, t) { return e(t) } }, optional: function(n) { var r = this.elementValue(n); return !e.validator.methods.required.call(this, r, n) && "dependency-mismatch" }, startRequest: function(e) { this.pending[e.name] || (this.pendingRequest++, this.pending[e.name] = !0) }, stopRequest: function(n, r) { this.pendingRequest--, 0 > this.pendingRequest && (this.pendingRequest = 0), delete this.pending[n.name], r && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !r && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) }, previousValue: function(n) { return e.data(n, "previousValue") || e.data(n, "previousValue", { old: null, valid: !0, message: this.defaultMessage(n, "remote") }) } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function(n, r) { n.constructor === String ? this.classRuleSettings[n] = r : e.extend(this.classRuleSettings, n) }, classRules: function(n) { var r = {},
                i = e(n).attr("class"); return i && e.each(i.split(" "), function() { this in e.validator.classRuleSettings && e.extend(r, e.validator.classRuleSettings[this]) }), r }, attributeRules: function(n) { var r = {},
                i = e(n),
                s = i[0].getAttribute("type"); for (var o in e.validator.methods) { var u; "required" === o ? (u = i.get(0).getAttribute(o), "" === u && (u = !0), u = !!u) : u = i.attr(o), /min|max/.test(o) && (null === s || /number|range|text/.test(s)) && (u = Number(u)), u ? r[o] = u : s === o && "range" !== s && (r[o] = !0) } return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r }, dataRules: function(n) { var r, i, s = {},
                o = e(n); for (r in e.validator.methods) i = o.data("rule-" + r.toLowerCase()), void 0 !== i && (s[r] = i); return s }, staticRules: function(n) { var r = {},
                i = e.data(n.form, "validator"); return i.settings.rules && (r = e.validator.normalizeRule(i.settings.rules[n.name]) || {}), r }, normalizeRules: function(n, r) { return e.each(n, function(s, o) { if (o === !1) return delete n[s], void 0; if (o.param || o.depends) { var u = !0; switch (typeof o.depends) {
                        case "string":
                            u = !!e(o.depends, r.form).length; break;
                        case "function":
                            u = o.depends.call(r, r) }
                    u ? n[s] = void 0 !== o.param ? o.param : !0 : delete n[s] } }), e.each(n, function(s, o) { n[s] = e.isFunction(o) ? o(r) : o }), e.each(["minlength", "maxlength"], function() { n[this] && (n[this] = Number(n[this])) }), e.each(["rangelength", "range"], function() { var r;
                n[this] && (e.isArray(n[this]) ? n[this] = [Number(n[this][0]), Number(n[this][1])] : "string" == typeof n[this] && (r = n[this].split(/[\s,]+/), n[this] = [Number(r[0]), Number(r[1])])) }), e.validator.autoCreateRanges && (n.min && n.max && (n.range = [n.min, n.max], delete n.min, delete n.max), n.minlength && n.maxlength && (n.rangelength = [n.minlength, n.maxlength], delete n.minlength, delete n.maxlength)), n }, normalizeRule: function(n) { if ("string" == typeof n) { var r = {};
                e.each(n.split(/\s/), function() { r[this] = !0 }), n = r } return n }, addMethod: function(n, r, i) { e.validator.methods[n] = r, e.validator.messages[n] = void 0 !== i ? i : e.validator.messages[n], 3 > r.length && e.validator.addClassRules(n, e.validator.normalizeRule(n)) }, methods: { required: function(n, r, i) { if (!this.depend(i, r)) return "dependency-mismatch"; if ("select" === r.nodeName.toLowerCase()) { var s = e(r).val(); return s && s.length > 0 } return this.checkable(r) ? this.getLength(n, r) > 0 : e.trim(n).length > 0 }, email: function(e, t) { return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e) }, url: function(e, t) { return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e) }, date: function(e, t) { return this.optional(t) || !/Invalid|NaN/.test("" + new Date(e)) }, dateISO: function(e, t) { return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(e) }, number: function(e, t) { return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e) }, digits: function(e, t) { return this.optional(t) || /^\d+$/.test(e) }, creditcard: function(e, t) { if (this.optional(t)) return "dependency-mismatch"; if (/[^0-9 \-]+/.test(e)) return !1; var n = 0,
                    r = 0,
                    i = !1;
                e = e.replace(/\D/g, ""); for (var s = e.length - 1; s >= 0; s--) { var o = e.charAt(s);
                    r = parseInt(o, 10), i && (r *= 2) > 9 && (r -= 9), n += r, i = !i } return 0 === n % 10 }, minlength: function(n, r, i) { var s = e.isArray(n) ? n.length : this.getLength(e.trim(n), r); return this.optional(r) || s >= i }, maxlength: function(n, r, i) { var s = e.isArray(n) ? n.length : this.getLength(e.trim(n), r); return this.optional(r) || i >= s }, rangelength: function(n, r, i) { var s = e.isArray(n) ? n.length : this.getLength(e.trim(n), r); return this.optional(r) || s >= i[0] && i[1] >= s }, min: function(e, t, n) { return this.optional(t) || e >= n }, max: function(e, t, n) { return this.optional(t) || n >= e }, range: function(e, t, n) { return this.optional(t) || e >= n[0] && n[1] >= e }, equalTo: function(n, r, i) { var s = e(i); return this.settings.onfocusout && s.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() { e(r).valid() }), n === s.val() }, remote: function(n, r, i) { if (this.optional(r)) return "dependency-mismatch"; var s = this.previousValue(r); if (this.settings.messages[r.name] || (this.settings.messages[r.name] = {}), s.originalMessage = this.settings.messages[r.name].remote, this.settings.messages[r.name].remote = s.message, i = "string" == typeof i && { url: i } || i, s.old === n) return s.valid;
                s.old = n; var o = this;
                this.startRequest(r); var u = {}; return u[r.name] = n, e.ajax(e.extend(!0, { url: i, mode: "abort", port: "validate" + r.name, dataType: "json", data: u, success: function(i) { o.settings.messages[r.name].remote = s.originalMessage; var u = i === !0 || "true" === i; if (u) { var a = o.formSubmitted;
                            o.prepareElement(r), o.formSubmitted = a, o.successList.push(r), delete o.invalid[r.name], o.showErrors() } else { var f = {},
                                l = i || o.defaultMessage(r, "remote");
                            f[r.name] = s.message = e.isFunction(l) ? l(n) : l, o.invalid[r.name] = !0, o.showErrors(f) }
                        s.valid = u, o.stopRequest(r, u) } }, i)), "pending" } } }), e.format = e.validator.format })(jQuery),
function(e) { var t = {}; if (e.ajaxPrefilter) e.ajaxPrefilter(function(e, n, r) { var i = e.port; "abort" === e.mode && (t[i] && t[i].abort(), t[i] = r) });
    else { var n = e.ajax;
        e.ajax = function(r) { var s = ("mode" in r ? r : e.ajaxSettings).mode,
                o = ("port" in r ? r : e.ajaxSettings).port; return "abort" === s ? (t[o] && t[o].abort(), t[o] = n.apply(this, arguments), t[o]) : n.apply(this, arguments) } } }(jQuery),
function(e) { e.extend(e.fn, { validateDelegate: function(n, r, i) { return this.bind(r, function(r) { var o = e(r.target); return o.is(n) ? i.apply(o, arguments) : void 0 }) } }) }(jQuery);
(function(e) { var t = "Close",
        n = "BeforeClose",
        r = "AfterClose",
        i = "BeforeAppend",
        s = "MarkupParse",
        o = "Open",
        u = "Change",
        a = "mfp",
        f = "." + a,
        l = "mfp-ready",
        c = "mfp-removing",
        h = "mfp-prevent-close",
        p, d = function() {},
        v = !!window.jQuery,
        m, g = e(window),
        y, b, w, E, S, x = function(e, t) { p.ev.on(a + e + f, t) },
        T = function(t, n, r, i) { var s = document.createElement("div"); return s.className = "mfp-" + t, r && (s.innerHTML = r), i ? n && n.appendChild(s) : (s = e(s), n && s.appendTo(n)), s },
        N = function(t, n) { p.ev.triggerHandler(a + t, n), p.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), p.st.callbacks[t] && p.st.callbacks[t].apply(p, e.isArray(n) ? n : [n])) },
        C = function(t) { if (t !== S || !p.currTemplate.closeBtn) p.currTemplate.closeBtn = e(p.st.closeMarkup.replace("%title%", p.st.tClose)), S = t; return p.currTemplate.closeBtn },
        k = function() { e.magnificPopup.instance || (p = new d, p.init(), e.magnificPopup.instance = p) },
        L = function() { var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"]; if (e.transition !== undefined) return !0; while (t.length)
                if (t.pop() + "Transition" in e) return !0;
            return !1 };
    d.prototype = { constructor: d, init: function() { var t = navigator.appVersion;
            p.isIE7 = t.indexOf("MSIE 7.") !== -1, p.isIE8 = t.indexOf("MSIE 8.") !== -1, p.isLowIE = p.isIE7 || p.isIE8, p.isAndroid = /android/gi.test(t), p.isIOS = /iphone|ipad|ipod/gi.test(t), p.supportsTransition = L(), p.probablyMobile = p.isAndroid || p.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), b = e(document), p.popupsCache = {} }, open: function(t) { y || (y = e(document.body)); var n; if (t.isObj === !1) { p.items = t.items.toArray(), p.index = 0; var r = t.items,
                    i; for (n = 0; n < r.length; n++) { i = r[n], i.parsed && (i = i.el[0]); if (i === t.el[0]) { p.index = n; break } } } else p.items = e.isArray(t.items) ? t.items : [t.items], p.index = t.index || 0; if (p.isOpen) { p.updateItemHTML(); return }
            p.types = [], E = "", t.mainEl && t.mainEl.length ? p.ev = t.mainEl.eq(0) : p.ev = b, t.key ? (p.popupsCache[t.key] || (p.popupsCache[t.key] = {}), p.currTemplate = p.popupsCache[t.key]) : p.currTemplate = {}, p.st = e.extend(!0, {}, e.magnificPopup.defaults, t), p.fixedContentPos = p.st.fixedContentPos === "auto" ? !p.probablyMobile : p.st.fixedContentPos, p.st.modal && (p.st.closeOnContentClick = !1, p.st.closeOnBgClick = !1, p.st.showCloseBtn = !1, p.st.enableEscapeKey = !1), p.bgOverlay || (p.bgOverlay = T("bg").on("click" + f, function() { p.close() }), p.wrap = T("wrap").attr("tabindex", -1).on("click" + f, function(e) { p._checkIfClose(e.target) && p.close() }), p.container = T("container", p.wrap)), p.contentContainer = T("content"), p.st.preloader && (p.preloader = T("preloader", p.container, p.st.tLoading)); var u = e.magnificPopup.modules; for (n = 0; n < u.length; n++) { var a = u[n];
                a = a.charAt(0).toUpperCase() + a.slice(1), p["init" + a].call(p) }
            N("BeforeOpen"), p.st.showCloseBtn && (p.st.closeBtnInside ? (x(s, function(e, t, n, r) { n.close_replaceWith = C(r.type) }), E += " mfp-close-btn-in") : p.wrap.append(C())), p.st.alignTop && (E += " mfp-align-top"), p.fixedContentPos ? p.wrap.css({ overflow: p.st.overflowY, overflowX: "hidden", overflowY: p.st.overflowY }) : p.wrap.css({ top: g.scrollTop(), position: "absolute" }), (p.st.fixedBgPos === !1 || p.st.fixedBgPos === "auto" && !p.fixedContentPos) && p.bgOverlay.css({ height: b.height(), position: "absolute" }), p.st.enableEscapeKey && b.on("keyup" + f, function(e) { e.keyCode === 27 && p.close() }), g.on("resize" + f, function() { p.updateSize() }), p.st.closeOnContentClick || (E += " mfp-auto-cursor"), E && p.wrap.addClass(E); var c = p.wH = g.height(),
                h = {}; if (p.fixedContentPos && p._hasScrollBar(c)) { var d = p._getScrollbarSize();
                d && (h.marginRight = d) }
            p.fixedContentPos && (p.isIE7 ? e("body, html").css("overflow", "hidden") : h.overflow = "hidden"); var v = p.st.mainClass; return p.isIE7 && (v += " mfp-ie7"), v && p._addClassToMFP(v), p.updateItemHTML(), N("BuildControls"), e("html").css(h), p.bgOverlay.add(p.wrap).prependTo(p.st.prependTo || y), p._lastFocusedEl = document.activeElement, setTimeout(function() { p.content ? (p._addClassToMFP(l), p._setFocus()) : p.bgOverlay.addClass(l), b.on("focusin" + f, p._onFocusIn) }, 16), p.isOpen = !0, p.updateSize(c), N(o), t }, close: function() { if (!p.isOpen) return;
            N(n), p.isOpen = !1, p.st.removalDelay && !p.isLowIE && p.supportsTransition ? (p._addClassToMFP(c), setTimeout(function() { p._close() }, p.st.removalDelay)) : p._close() }, _close: function() { N(t); var n = c + " " + l + " ";
            p.bgOverlay.detach(), p.wrap.detach(), p.container.empty(), p.st.mainClass && (n += p.st.mainClass + " "), p._removeClassFromMFP(n); if (p.fixedContentPos) { var i = { marginRight: "" };
                p.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i) }
            b.off("keyup" + f + " focusin" + f), p.ev.off(f), p.wrap.attr("class", "mfp-wrap").removeAttr("style"), p.bgOverlay.attr("class", "mfp-bg"), p.container.attr("class", "mfp-container"), p.st.showCloseBtn && (!p.st.closeBtnInside || p.currTemplate[p.currItem.type] === !0) && p.currTemplate.closeBtn && p.currTemplate.closeBtn.detach(), p._lastFocusedEl && e(p._lastFocusedEl).focus(), p.currItem = null, p.content = null, p.currTemplate = null, p.prevHeight = 0, N(r) }, updateSize: function(e) { if (p.isIOS) { var t = document.documentElement.clientWidth / window.innerWidth,
                    n = window.innerHeight * t;
                p.wrap.css("height", n), p.wH = n } else p.wH = e || g.height();
            p.fixedContentPos || p.wrap.css("height", p.wH), N("Resize") }, updateItemHTML: function() { var t = p.items[p.index];
            p.contentContainer.detach(), p.content && p.content.detach(), t.parsed || (t = p.parseEl(p.index)); var n = t.type;
            N("BeforeChange", [p.currItem ? p.currItem.type : "", n]), p.currItem = t; if (!p.currTemplate[n]) { var r = p.st[n] ? p.st[n].markup : !1;
                N("FirstMarkupParse", r), r ? p.currTemplate[n] = e(r) : p.currTemplate[n] = !0 }
            w && w !== t.type && p.container.removeClass("mfp-" + w + "-holder"); var i = p["get" + n.charAt(0).toUpperCase() + n.slice(1)](t, p.currTemplate[n]);
            p.appendContent(i, n), t.preloaded = !0, N(u, t), w = t.type, p.container.prepend(p.contentContainer), N("AfterChange") }, appendContent: function(e, t) { p.content = e, e ? p.st.showCloseBtn && p.st.closeBtnInside && p.currTemplate[t] === !0 ? p.content.find(".mfp-close").length || p.content.append(C()) : p.content = e : p.content = "", N(i), p.container.addClass("mfp-" + t + "-holder"), p.contentContainer.append(p.content) }, parseEl: function(t) { var n = p.items[t],
                r;
            n.tagName ? n = { el: e(n) } : (r = n.type, n = { data: n, src: n.src }); if (n.el) { var i = p.types; for (var s = 0; s < i.length; s++)
                    if (n.el.hasClass("mfp-" + i[s])) { r = i[s]; break }
                n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href")) } return n.type = r || p.st.type || "inline", n.index = t, n.parsed = !0, p.items[t] = n, N("ElementParse", n), p.items[t] }, addGroup: function(e, t) { var n = function(n) { n.mfpEl = this, p._openClick(n, e, t) };
            t || (t = {}); var r = "click.magnificPopup";
            t.mainEl = e, t.items ? (t.isObj = !0, e.off(r).on(r, n)) : (t.isObj = !1, t.delegate ? e.off(r).on(r, t.delegate, n) : (t.items = e, e.off(r).on(r, n))) }, _openClick: function(t, n, r) { var i = r.midClick !== undefined ? r.midClick : e.magnificPopup.defaults.midClick; if (!i && (t.which === 2 || t.ctrlKey || t.metaKey)) return; var s = r.disableOn !== undefined ? r.disableOn : e.magnificPopup.defaults.disableOn; if (s)
                if (e.isFunction(s)) { if (!s.call(p)) return !0 } else if (g.width() < s) return !0;
            t.type && (t.preventDefault(), p.isOpen && t.stopPropagation()), r.el = e(t.mfpEl), r.delegate && (r.items = n.find(r.delegate)), p.open(r) }, updateStatus: function(e, t) { if (p.preloader) { m !== e && p.container.removeClass("mfp-s-" + m), !t && e === "loading" && (t = p.st.tLoading); var n = { status: e, text: t };
                N("UpdateStatus", n), e = n.status, t = n.text, p.preloader.html(t), p.preloader.find("a").on("click", function(e) { e.stopImmediatePropagation() }), p.container.addClass("mfp-s-" + e), m = e } }, _checkIfClose: function(t) { if (e(t).hasClass(h)) return; var n = p.st.closeOnContentClick,
                r = p.st.closeOnBgClick; if (n && r) return !0; if (!p.content || e(t).hasClass("mfp-close") || p.preloader && t === p.preloader[0]) return !0; if (t !== p.content[0] && !e.contains(p.content[0], t)) { if (r && e.contains(document, t)) return !0 } else if (n) return !0; return !1 }, _addClassToMFP: function(e) { p.bgOverlay.addClass(e), p.wrap.addClass(e) }, _removeClassFromMFP: function(e) { this.bgOverlay.removeClass(e), p.wrap.removeClass(e) }, _hasScrollBar: function(e) { return (p.isIE7 ? b.height() : document.body.scrollHeight) > (e || g.height()) }, _setFocus: function() {
            (p.st.focus ? p.content.find(p.st.focus).eq(0) : p.wrap).focus() }, _onFocusIn: function(t) { if (t.target !== p.wrap[0] && !e.contains(p.wrap[0], t.target)) return p._setFocus(), !1 }, _parseMarkup: function(t, n, r) { var i;
            r.data && (n = e.extend(r.data, n)), N(s, [t, n, r]), e.each(n, function(e, n) { if (n === undefined || n === !1) return !0;
                i = e.split("_"); if (i.length > 1) { var r = t.find(f + "-" + i[0]); if (r.length > 0) { var s = i[1];
                        s === "replaceWith" ? r[0] !== n[0] && r.replaceWith(n) : s === "img" ? r.is("img") ? r.attr("src", n) : r.replaceWith('<img src="' + n + '" class="' + r.attr("class") + '" />') : r.attr(i[1], n) } } else t.find(f + "-" + e).html(n) }) }, _getScrollbarSize: function() { if (p.scrollbarSize === undefined) { var e = document.createElement("div");
                e.id = "mfp-sbm", e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), p.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e) } return p.scrollbarSize } }, e.magnificPopup = { instance: null, proto: d.prototype, modules: [], open: function(t, n) { return k(), t ? t = e.extend(!0, {}, t) : t = {}, t.isObj = !0, t.index = n || 0, this.instance.open(t) }, close: function() { return e.magnificPopup.instance && e.magnificPopup.instance.close() }, registerModule: function(t, n) { n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t) }, defaults: { disableOn: 0, key: null, midClick: !1, mainClass: "", preloader: !0, focus: "", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 0, prependTo: null, fixedContentPos: "auto", fixedBgPos: "auto", overflowY: "auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>', tClose: "Close (Esc)", tLoading: "Loading..." } }, e.fn.magnificPopup = function(t) { k(); var n = e(this); if (typeof t == "string")
            if (t === "open") { var r, i = v ? n.data("magnificPopup") : n[0].magnificPopup,
                    s = parseInt(arguments[1], 10) || 0;
                i.items ? r = i.items[s] : (r = n, i.delegate && (r = r.find(i.delegate)), r = r.eq(s)), p._openClick({ mfpEl: r }, n, i) } else p.isOpen && p[t].apply(p, Array.prototype.slice.call(arguments, 1));
        else t = e.extend(!0, {}, t), v ? n.data("magnificPopup", t) : n[0].magnificPopup = t, p.addGroup(n, t); return n }; var A = "inline",
        O, M, _, D = function() { _ && (M.after(_.addClass(O)).detach(), _ = null) };
    e.magnificPopup.registerModule(A, { options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" }, proto: { initInline: function() { p.types.push(A), x(t + "." + A, function() { D() }) }, getInline: function(t, n) { D(); if (t.src) { var r = p.st.inline,
                        i = e(t.src); if (i.length) { var s = i[0].parentNode;
                        s && s.tagName && (M || (O = r.hiddenClass, M = T(O), O = "mfp-" + O), _ = i.after(M).detach().removeClass(O)), p.updateStatus("ready") } else p.updateStatus("error", r.tNotFound), i = e("<div>"); return t.inlineElement = i, i } return p.updateStatus("ready"), p._parseMarkup(n, {}, t), n } } }); var P = "ajax",
        H, B = function() { H && y.removeClass(H) },
        j = function() { B(), p.req && p.req.abort() };
    e.magnificPopup.registerModule(P, { options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' }, proto: { initAjax: function() { p.types.push(P), H = p.st.ajax.cursor, x(t + "." + P, j), x("BeforeChange." + P, j) }, getAjax: function(t) { H && y.addClass(H), p.updateStatus("loading"); var n = e.extend({ url: t.src, success: function(n, r, i) { var s = { data: n, xhr: i };
                        N("ParseAjax", s), p.appendContent(e(s.data), P), t.finished = !0, B(), p._setFocus(), setTimeout(function() { p.wrap.addClass(l) }, 16), p.updateStatus("ready"), N("AjaxContentAdded") }, error: function() { B(), t.finished = t.loadError = !0, p.updateStatus("error", p.st.ajax.tError.replace("%url%", t.src)) } }, p.st.ajax.settings); return p.req = e.ajax(n), "" } } }); var F, I = function(t) { if (t.data && t.data.title !== undefined) return t.data.title; var n = p.st.image.titleSrc; if (n) { if (e.isFunction(n)) return n.call(p, t); if (t.el) return t.el.attr(n) || "" } return "" };
    e.magnificPopup.registerModule("image", { options: { markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>', cursor: "mfp-zoom-out-cur", titleSrc: "title", verticalFit: !0, tError: '<a href="%url%">The image</a> could not be loaded.' }, proto: { initImage: function() { var e = p.st.image,
                    n = ".image";
                p.types.push("image"), x(o + n, function() { p.currItem.type === "image" && e.cursor && y.addClass(e.cursor) }), x(t + n, function() { e.cursor && y.removeClass(e.cursor), g.off("resize" + f) }), x("Resize" + n, p.resizeImage), p.isLowIE && x("AfterChange", p.resizeImage) }, resizeImage: function() { var e = p.currItem; if (!e || !e.img) return; if (p.st.image.verticalFit) { var t = 0;
                    p.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", p.wH - t) } }, _onImageHasSize: function(e) { e.img && (e.hasSize = !0, F && clearInterval(F), e.isCheckingImgSize = !1, N("ImageHasSize", e), e.imgHidden && (p.content && p.content.removeClass("mfp-loading"), e.imgHidden = !1)) }, findImageSize: function(e) { var t = 0,
                    n = e.img[0],
                    r = function(i) { F && clearInterval(F), F = setInterval(function() { if (n.naturalWidth > 0) { p._onImageHasSize(e); return }
                            t > 200 && clearInterval(F), t++, t === 3 ? r(10) : t === 40 ? r(50) : t === 100 && r(500) }, i) };
                r(1) }, getImage: function(t, n) { var r = 0,
                    i = function() { t && (t.img[0].complete ? (t.img.off(".mfploader"), t === p.currItem && (p._onImageHasSize(t), p.updateStatus("ready")), t.hasSize = !0, t.loaded = !0, N("ImageLoadComplete")) : (r++, r < 200 ? setTimeout(i, 100) : s())) },
                    s = function() { t && (t.img.off(".mfploader"), t === p.currItem && (p._onImageHasSize(t), p.updateStatus("error", o.tError.replace("%url%", t.src))), t.hasSize = !0, t.loaded = !0, t.loadError = !0) },
                    o = p.st.image,
                    u = n.find(".mfp-img"); if (u.length) { var a = document.createElement("img");
                    a.className = "mfp-img", t.img = e(a).on("load.mfploader", i).on("error.mfploader", s), a.src = t.src, u.is("img") && (t.img = t.img.clone()), a = t.img[0], a.naturalWidth > 0 ? t.hasSize = !0 : a.width || (t.hasSize = !1) } return p._parseMarkup(n, { title: I(t), img_replaceWith: t.img }, t), p.resizeImage(), t.hasSize ? (F && clearInterval(F), t.loadError ? (n.addClass("mfp-loading"), p.updateStatus("error", o.tError.replace("%url%", t.src))) : (n.removeClass("mfp-loading"), p.updateStatus("ready")), n) : (p.updateStatus("loading"), t.loading = !0, t.hasSize || (t.imgHidden = !0, n.addClass("mfp-loading"), p.findImageSize(t)), n) } } }); var q, R = function() { return q === undefined && (q = document.createElement("p").style.MozTransform !== undefined), q };
    e.magnificPopup.registerModule("zoom", { options: { enabled: !1, easing: "ease-in-out", duration: 300, opener: function(e) { return e.is("img") ? e : e.find("img") } }, proto: { initZoom: function() { var e = p.st.zoom,
                    r = ".zoom",
                    i; if (!e.enabled || !p.supportsTransition) return; var s = e.duration,
                    o = function(t) { var n = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            r = "all " + e.duration / 1e3 + "s " + e.easing,
                            i = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                            s = "transition"; return i["-webkit-" + s] = i["-moz-" + s] = i["-o-" + s] = i[s] = r, n.css(i), n },
                    u = function() { p.content.css("visibility", "visible") },
                    a, f;
                x("BuildControls" + r, function() { if (p._allowZoom()) { clearTimeout(a), p.content.css("visibility", "hidden"), i = p._getItemToZoom(); if (!i) { u(); return }
                        f = o(i), f.css(p._getOffset()), p.wrap.append(f), a = setTimeout(function() { f.css(p._getOffset(!0)), a = setTimeout(function() { u(), setTimeout(function() { f.remove(), i = f = null, N("ZoomAnimationEnded") }, 16) }, s) }, 16) } }), x(n + r, function() { if (p._allowZoom()) { clearTimeout(a), p.st.removalDelay = s; if (!i) { i = p._getItemToZoom(); if (!i) return;
                            f = o(i) }
                        f.css(p._getOffset(!0)), p.wrap.append(f), p.content.css("visibility", "hidden"), setTimeout(function() { f.css(p._getOffset()) }, 16) } }), x(t + r, function() { p._allowZoom() && (u(), f && f.remove(), i = null) }) }, _allowZoom: function() { return p.currItem.type === "image" }, _getItemToZoom: function() { return p.currItem.hasSize ? p.currItem.img : !1 }, _getOffset: function(t) { var n;
                t ? n = p.currItem.img : n = p.st.zoom.opener(p.currItem.el || p.currItem); var r = n.offset(),
                    i = parseInt(n.css("padding-top"), 10),
                    s = parseInt(n.css("padding-bottom"), 10);
                r.top -= e(window).scrollTop() - i; var o = { width: n.width(), height: (v ? n.innerHeight() : n[0].offsetHeight) - s - i }; return R() ? o["-moz-transform"] = o.transform = "translate(" + r.left + "px," + r.top + "px)" : (o.left = r.left, o.top = r.top), o } } }); var U = "iframe",
        z = "//about:blank",
        W = function(e) { if (p.currTemplate[U]) { var t = p.currTemplate[U].find("iframe");
                t.length && (e || (t[0].src = z), p.isIE8 && t.css("display", e ? "block" : "none")) } };
    e.magnificPopup.registerModule(U, { options: { markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>', srcAction: "iframe_src", patterns: { youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" }, vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" }, gmaps: { index: "//maps.google.", src: "%id%&output=embed" } } }, proto: { initIframe: function() { p.types.push(U), x("BeforeChange", function(e, t, n) { t !== n && (t === U ? W() : n === U && W(!0)) }), x(t + "." + U, function() { W() }) }, getIframe: function(t, n) { var r = t.src,
                    i = p.st.iframe;
                e.each(i.patterns, function() { if (r.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? r = r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : r = this.id.call(this, r)), r = this.src.replace("%id%", r), !1 }); var s = {}; return i.srcAction && (s[i.srcAction] = r), p._parseMarkup(n, s, t), p.updateStatus("ready"), n } } }); var X = function(e) { var t = p.items.length; return e > t - 1 ? e - t : e < 0 ? t + e : e },
        V = function(e, t, n) { return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n) };
    e.magnificPopup.registerModule("gallery", { options: { enabled: !1, arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', preload: [0, 2], navigateByImgClick: !0, arrows: !0, tPrev: "Previous (Left arrow key)", tNext: "Next (Right arrow key)", tCounter: "%curr% of %total%" }, proto: { initGallery: function() { var n = p.st.gallery,
                    r = ".mfp-gallery",
                    i = Boolean(e.fn.mfpFastClick);
                p.direction = !0; if (!n || !n.enabled) return !1;
                E += " mfp-gallery", x(o + r, function() { n.navigateByImgClick && p.wrap.on("click" + r, ".mfp-img", function() { if (p.items.length > 1) return p.next(), !1 }), b.on("keydown" + r, function(e) { e.keyCode === 37 ? p.prev() : e.keyCode === 39 && p.next() }) }), x("UpdateStatus" + r, function(e, t) { t.text && (t.text = V(t.text, p.currItem.index, p.items.length)) }), x(s + r, function(e, t, r, i) { var s = p.items.length;
                    r.counter = s > 1 ? V(n.tCounter, i.index, s) : "" }), x("BuildControls" + r, function() { if (p.items.length > 1 && n.arrows && !p.arrowLeft) { var t = n.arrowMarkup,
                            r = p.arrowLeft = e(t.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(h),
                            s = p.arrowRight = e(t.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(h),
                            o = i ? "mfpFastClick" : "click";
                        r[o](function() { p.prev() }), s[o](function() { p.next() }), p.isIE7 && (T("b", r[0], !1, !0), T("a", r[0], !1, !0), T("b", s[0], !1, !0), T("a", s[0], !1, !0)), p.container.append(r.add(s)) } }), x(u + r, function() { p._preloadTimeout && clearTimeout(p._preloadTimeout), p._preloadTimeout = setTimeout(function() { p.preloadNearbyImages(), p._preloadTimeout = null }, 16) }), x(t + r, function() { b.off(r), p.wrap.off("click" + r), p.arrowLeft && i && p.arrowLeft.add(p.arrowRight).destroyMfpFastClick(), p.arrowRight = p.arrowLeft = null }) }, next: function() { p.direction = !0, p.index = X(p.index + 1), p.updateItemHTML() }, prev: function() { p.direction = !1, p.index = X(p.index - 1), p.updateItemHTML() }, goTo: function(e) { p.direction = e >= p.index, p.index = e, p.updateItemHTML() }, preloadNearbyImages: function() { var e = p.st.gallery.preload,
                    t = Math.min(e[0], p.items.length),
                    n = Math.min(e[1], p.items.length),
                    r; for (r = 1; r <= (p.direction ? n : t); r++) p._preloadItem(p.index + r); for (r = 1; r <= (p.direction ? t : n); r++) p._preloadItem(p.index - r) }, _preloadItem: function(t) { t = X(t); if (p.items[t].preloaded) return; var n = p.items[t];
                n.parsed || (n = p.parseEl(t)), N("LazyLoad", n), n.type === "image" && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function() { n.hasSize = !0 }).on("error.mfploader", function() { n.hasSize = !0, n.loadError = !0, N("LazyLoadError", n) }).attr("src", n.src)), n.preloaded = !0 } } }); var $ = "retina";
    e.magnificPopup.registerModule($, { options: { replaceSrc: function(e) { return e.src.replace(/\.\w+$/, function(e) { return "@2x" + e }) }, ratio: 1 }, proto: { initRetina: function() { if (window.devicePixelRatio > 1) { var e = p.st.retina,
                            t = e.ratio;
                        t = isNaN(t) ? t() : t, t > 1 && (x("ImageHasSize." + $, function(e, n) { n.img.css({ "max-width": n.img[0].naturalWidth / t, width: "100%" }) }), x("ElementParse." + $, function(n, r) { r.src = e.replaceSrc(r, t) })) } } } }),
        function() { var t = 1e3,
                n = "ontouchstart" in window,
                r = function() { g.off("touchmove" + s + " touchend" + s) },
                i = "mfpFastClick",
                s = "." + i;
            e.fn.mfpFastClick = function(i) { return e(this).each(function() { var o = e(this),
                        u; if (n) { var a, f, l, c, h, p;
                        o.on("touchstart" + s, function(e) { c = !1, p = 1, h = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], f = h.clientX, l = h.clientY, g.on("touchmove" + s, function(e) { h = e.originalEvent ? e.originalEvent.touches : e.touches, p = h.length, h = h[0]; if (Math.abs(h.clientX - f) > 10 || Math.abs(h.clientY - l) > 10) c = !0, r() }).on("touchend" + s, function(e) { r(); if (c || p > 1) return;
                                u = !0, e.preventDefault(), clearTimeout(a), a = setTimeout(function() { u = !1 }, t), i() }) }) }
                    o.on("click" + s, function() { u || i() }) }) }, e.fn.destroyMfpFastClick = function() { e(this).off("touchstart" + s + " click" + s), n && g.off("touchmove" + s + " touchend" + s) } }(), k() })(window.jQuery || window.Zepto);
(function() { var e = [].indexOf || function(e) { for (var t = 0, n = this.length; t < n; t++) { if (t in this && this[t] === e) return t } return -1 },
        t = [].slice;
    (function(e, t) { if (typeof define === "function" && define.amd) { return define("waypoints", ["jquery"], function(n) { return t(n, e) }) } else { return t(e.jQuery, e) } })(window, function(n, r) { var i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b;
        i = n(r);
        c = e.call(r, "ontouchstart") >= 0;
        u = { horizontal: {}, vertical: {} };
        a = 1;
        l = {};
        f = "waypoints-context-id";
        d = "resize.waypoints";
        v = "scroll.waypoints";
        m = 1;
        g = "waypoints-waypoint-ids";
        y = "waypoint";
        b = "waypoints";
        s = function() {
            function e(e) { var t = this;
                this.$element = e;
                this.element = e[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + a++;
                this.oldScroll = { x: e.scrollLeft(), y: e.scrollTop() };
                this.waypoints = { horizontal: {}, vertical: {} };
                this.element[f] = this.id;
                l[this.id] = this;
                e.bind(v, function() { var e; if (!(t.didScroll || c)) { t.didScroll = true;
                        e = function() { t.doScroll(); return t.didScroll = false }; return r.setTimeout(e, n[b].settings.scrollThrottle) } });
                e.bind(d, function() { var e; if (!t.didResize) { t.didResize = true;
                        e = function() { n[b]("refresh"); return t.didResize = false }; return r.setTimeout(e, n[b].settings.resizeThrottle) } }) }
            e.prototype.doScroll = function() { var e, t = this;
                e = { horizontal: { newScroll: this.$element.scrollLeft(), oldScroll: this.oldScroll.x, forward: "right", backward: "left" }, vertical: { newScroll: this.$element.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up" } }; if (c && (!e.vertical.oldScroll || !e.vertical.newScroll)) { n[b]("refresh") }
                n.each(e, function(e, r) { var i, s, o;
                    o = [];
                    s = r.newScroll > r.oldScroll;
                    i = s ? r.forward : r.backward;
                    n.each(t.waypoints[e], function(e, t) { var n, i; if (r.oldScroll < (n = t.offset) && n <= r.newScroll) { return o.push(t) } else if (r.newScroll < (i = t.offset) && i <= r.oldScroll) { return o.push(t) } });
                    o.sort(function(e, t) { return e.offset - t.offset }); if (!s) { o.reverse() } return n.each(o, function(e, t) { if (t.options.continuous || e === o.length - 1) { return t.trigger([i]) } }) }); return this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll } };
            e.prototype.refresh = function() { var e, t, r, i = this;
                r = n.isWindow(this.element);
                t = this.$element.offset();
                this.doScroll();
                e = { horizontal: { contextOffset: r ? 0 : t.left, contextScroll: r ? 0 : this.oldScroll.x, contextDimension: this.$element.width(), oldScroll: this.oldScroll.x, forward: "right", backward: "left", offsetProp: "left" }, vertical: { contextOffset: r ? 0 : t.top, contextScroll: r ? 0 : this.oldScroll.y, contextDimension: r ? n[b]("viewportHeight") : this.$element.height(), oldScroll: this.oldScroll.y, forward: "down", backward: "up", offsetProp: "top" } }; return n.each(e, function(e, t) { return n.each(i.waypoints[e], function(e, r) { var i, s, o, u, a;
                        i = r.options.offset;
                        o = r.offset;
                        s = n.isWindow(r.element) ? 0 : r.$element.offset()[t.offsetProp]; if (n.isFunction(i)) { i = i.apply(r.element) } else if (typeof i === "string") { i = parseFloat(i); if (r.options.offset.indexOf("%") > -1) { i = Math.ceil(t.contextDimension * i / 100) } }
                        r.offset = s - t.contextOffset + t.contextScroll - i; if (r.options.onlyOnScroll && o != null || !r.enabled) { return } if (o !== null && o < (u = t.oldScroll) && u <= r.offset) { return r.trigger([t.backward]) } else if (o !== null && o > (a = t.oldScroll) && a >= r.offset) { return r.trigger([t.forward]) } else if (o === null && t.oldScroll >= r.offset) { return r.trigger([t.forward]) } }) }) };
            e.prototype.checkEmpty = function() { if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) { this.$element.unbind([d, v].join(" ")); return delete l[this.id] } }; return e }();
        o = function() {
            function e(e, t, r) { var i, s; if (r.offset === "bottom-in-view") { r.offset = function() { var e;
                        e = n[b]("viewportHeight"); if (!n.isWindow(t.element)) { e = t.$element.height() } return e - n(this).outerHeight() } }
                this.$element = e;
                this.element = e[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = t;
                this.enabled = r.enabled;
                this.id = "waypoints" + m++;
                this.offset = null;
                this.options = r;
                t.waypoints[this.axis][this.id] = this;
                u[this.axis][this.id] = this;
                i = (s = this.element[g]) != null ? s : [];
                i.push(this.id);
                this.element[g] = i }
            e.prototype.trigger = function(e) { if (!this.enabled) { return } if (this.callback != null) { this.callback.apply(this.element, e) } if (this.options.triggerOnce) { return this.destroy() } };
            e.prototype.disable = function() { return this.enabled = false };
            e.prototype.enable = function() { this.context.refresh(); return this.enabled = true };
            e.prototype.destroy = function() { delete u[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id]; return this.context.checkEmpty() };
            e.getWaypointsByElement = function(e) { var t, r;
                r = e[g]; if (!r) { return [] }
                t = n.extend({}, u.horizontal, u.vertical); return n.map(r, function(e) { return t[e] }) }; return e }();
        p = { init: function(e, t) { var r;
                t = n.extend({}, n.fn[y].defaults, t); if ((r = t.handler) == null) { t.handler = e }
                this.each(function() { var e, r, i, u;
                    e = n(this);
                    i = (u = t.context) != null ? u : n.fn[y].defaults.context; if (!n.isWindow(i)) { i = e.closest(i) }
                    i = n(i);
                    r = l[i[0][f]]; if (!r) { r = new s(i) } return new o(e, r, t) });
                n[b]("refresh"); return this }, disable: function() { return p._invoke.call(this, "disable") }, enable: function() { return p._invoke.call(this, "enable") }, destroy: function() { return p._invoke.call(this, "destroy") }, prev: function(e, t) { return p._traverse.call(this, e, t, function(e, t, n) { if (t > 0) { return e.push(n[t - 1]) } }) }, next: function(e, t) { return p._traverse.call(this, e, t, function(e, t, n) { if (t < n.length - 1) { return e.push(n[t + 1]) } }) }, _traverse: function(e, t, i) { var s, o; if (e == null) { e = "vertical" } if (t == null) { t = r }
                o = h.aggregate(t);
                s = [];
                this.each(function() { var t;
                    t = n.inArray(this, o[e]); return i(s, t, o[e]) }); return this.pushStack(s) }, _invoke: function(e) { this.each(function() { var t;
                    t = o.getWaypointsByElement(this); return n.each(t, function(t, n) { n[e](); return true }) }); return this } };
        n.fn[y] = function() { var e, r;
            r = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : []; if (p[r]) { return p[r].apply(this, e) } else if (n.isFunction(r)) { return p.init.apply(this, arguments) } else if (n.isPlainObject(r)) { return p.init.apply(this, [null, r]) } else if (!r) { return n.error("jQuery Waypoints needs a callback function or handler option.") } else { return n.error("The " + r + " method does not exist in jQuery Waypoints.") } };
        n.fn[y].defaults = { context: r, continuous: true, enabled: true, horizontal: false, offset: 0, triggerOnce: false };
        h = { refresh: function() { return n.each(l, function(e, t) { return t.refresh() }) }, viewportHeight: function() { var e; return (e = r.innerHeight) != null ? e : i.height() }, aggregate: function(e) { var t, r, i;
                t = u; if (e) { t = (i = l[n(e)[0][f]]) != null ? i.waypoints : void 0 } if (!t) { return [] }
                r = { horizontal: [], vertical: [] };
                n.each(r, function(e, i) { n.each(t[e], function(e, t) { return i.push(t) });
                    i.sort(function(e, t) { return e.offset - t.offset });
                    r[e] = n.map(i, function(e) { return e.element }); return r[e] = n.unique(r[e]) }); return r }, above: function(e) { if (e == null) { e = r } return h._filter(e, "vertical", function(e, t) { return t.offset <= e.oldScroll.y }) }, below: function(e) { if (e == null) { e = r } return h._filter(e, "vertical", function(e, t) { return t.offset > e.oldScroll.y }) }, left: function(e) { if (e == null) { e = r } return h._filter(e, "horizontal", function(e, t) { return t.offset <= e.oldScroll.x }) }, right: function(e) { if (e == null) { e = r } return h._filter(e, "horizontal", function(e, t) { return t.offset > e.oldScroll.x }) }, enable: function() { return h._invoke("enable") }, disable: function() { return h._invoke("disable") }, destroy: function() { return h._invoke("destroy") }, extendFn: function(e, t) { return p[e] = t }, _invoke: function(e) { var t;
                t = n.extend({}, u.vertical, u.horizontal); return n.each(t, function(t, n) { n[e](); return true }) }, _filter: function(e, t, r) { var i, s;
                i = l[n(e)[0][f]]; if (!i) { return [] }
                s = [];
                n.each(i.waypoints[t], function(e, t) { if (r(i, t)) { return s.push(t) } });
                s.sort(function(e, t) { return e.offset - t.offset }); return n.map(s, function(e) { return e.element }) } };
        n[b] = function() { var e, n;
            n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : []; if (h[n]) { return h[n].apply(null, e) } else { return h.aggregate.call(null, n) } };
        n[b].settings = { resizeThrottle: 100, scrollThrottle: 30 }; return i.on("load.waypoints", function() { return n[b]("refresh") }) }) }).call(this);
(function(e) { "use strict";

    function t() { var t = e(".statistics").find(".num"); var n = [];
        t.each(function(t) { n[t] = e(this).text() });
        e(".statistics").waypoint({ handler: function() { t.each(function(t) { var r = e(this);
                    e({ tmp: 0 }).animate({ tmp: n[t] }, { duration: 1200, easing: "swing", step: function() { r.text(Math.ceil(this.tmp)) } }) }) }, triggerOnce: true, offset: "90%" }) }

    function n() { var t = e(".resume .timeline-cont .desc-box"),
            n = t.filter(":odd"),
            r = t.filter(":even");
        t.addClass("ar-desc-box");
        n.addClass("ar-left");
        r.addClass("ar-right");
        t.waypoint({ handler: function() { var t = e(this); if (t.hasClass("ar-left")) t.removeClass("ar-left");
                else t.removeClass("ar-right") }, triggerOnce: true, offset: "100%" }) }

    function r() { var t = e(".filter-port"),
            n = e(".filter-menu");
        e(window).on("load resize", function() { t.isotope({ itemSelector: ".item", animationEngine: "best-available", transformsEnabled: true, resizesContainer: true, resizable: true, easing: "linear", layoutMode: "masonry" });
            n.find("a").on("click touchstart", function(r) { var i = e(this),
                    s = i.data("filter"); if (i.hasClass("filter-current")) return false;
                n.find("a").removeClass("filter-current");
                i.addClass("filter-current");
                t.isotope({ filter: s });
                r.stopPropagation();
                r.preventDefault() }) }) }

    function i() { var t = e("#contact-form"),
            n = "<span class='elegant-eleganticons-44 form-success'>Your message has been sent!</span>",
            r = "<span class='elegant-eleganticons-45 form-error'>Oops! something went wrong with the server.</span>",
            i;
        t.validate({ rules: { name: { required: true, minlength: 2 }, email: "required", message: { required: true, minlength: 5 } }, errorClass: "invalid-error", errorElement: "span" });
        t.submit(function(s) { if (t.valid()) { e.ajax({ url: t.attr("action"), type: "POST", data: t.serialize(), success: function() { i = n }, error: function() { i = r }, complete: function() { e(".form-success, .form-error").remove();
                        t.find("#form-submit").parent().after(e(i).fadeIn(500, function() { t[0].reset() })) } }) }
            s.preventDefault() }) }

    function s() { var t = e(".main-nav"),
            n = e(".inner-nav a[href='#about']");
        t.find(".nav-control").on("click touchstart", function(t) { if (t.target.parentNode == this) { e(this).find(".inner-nav").toggleClass("show-nav");
                t.stopPropagation();
                t.preventDefault() } });
        n.smoothScroll(a);
        t.find(".inner-nav a").not(n).smoothScroll({ direction: "top", offset: -104, speed: 600 }) }

    function o() { e(window).on("load", function() { Pace.on("done", function() { e("#preload").delay(100).fadeOut(500) }) }) }
    o(); var u = { size: 150, scaleLength: 1, barColor: "#fff", trackColor: false, lineWidth: 7, scaleColor: false, lineCap: "square", rotate: 90, onStep: function(t, n, r) { e(this.el).find("em").text(Math.round(r) + "%") } },
        a = { direction: "top", offset: -65 };
    e(".learn-more > a").smoothScroll(a);
    e(".skills").waypoint({ handler: function() { e(".chart .chart-draw").easyPieChart(u) }, triggerOnce: true, offset: "90%" });
    t();
    n();
    e(".filter-port figure a").magnificPopup({ type: "image", titleSrc: "title", key: "image-key", verticalFit: true, mainClass: "image-popup-style", tError: '<a href="%url%">The image</a> could not be loaded.', gallery: { enabled: true }, callbacks: { open: function() { this.content.addClass("fadeInLeft") }, close: function() { this.content.removeClass("fadeInLeft") } } });
    r();
    i();
    s() })(jQuery)