// ==UserScript==
// @name         Discord中Midjourney自动切图与下载
// @namespace    http://tampermonkey.net/
// @version      0.22
// @description  Discord自动点击Midjourney的U1、U2、U3、U4，自动跳过四格图片直接下载大图，满60张会自动下载zip包，不到60张可以点击手动下载。
// @author       laolu(vx:laolu2045)
// @match        https://discord.com/channels/*/*
// @icon         https://www.midjourney.com/favicon.ico
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @license      MIT License
// ==/UserScript==

(function () {
  "use strict";
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function clickButtons(lastMsg) {
    const buttonArr = Array.from(lastMsg.querySelectorAll("button")).filter(
      (button) =>
        ["U1", "U2", "U3", "U4"].some(
          (text) => button.textContent.trim() === text
        )
    );
    if (buttonArr.length >= 4) {
      for (let i = 0; i < 4; i++) {
        buttonArr[i].click();
        console.log("点击1下U按钮");
        await sleep(3000); // 在每次点击后等待3秒，1秒=1000
      }
    }
  }
  //自动下载
  async function download() {
    (() => {
      var Wt = Object.create;
      var Ot = Object.defineProperty;
      var Zt = Object.getOwnPropertyDescriptor;
      var Mt = Object.getOwnPropertyNames;
      var Ht = Object.getPrototypeOf,
        Gt = Object.prototype.hasOwnProperty;
      var bt = ((c) =>
        typeof require < "u"
          ? require
          : typeof Proxy < "u"
          ? new Proxy(c, {
              get: (A, _) => (typeof require < "u" ? require : A)[_],
            })
          : c)(function (c) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw new Error('Dynamic require of "' + c + '" is not supported');
      });
      var Kt = (c, A) => () => (
        A || c((A = { exports: {} }).exports, A), A.exports
      );
      var Yt = (c, A, _, o) => {
        if ((A && typeof A == "object") || typeof A == "function")
          for (let s of Mt(A))
            !Gt.call(c, s) &&
              s !== _ &&
              Ot(c, s, {
                get: () => A[s],
                enumerable: !(o = Zt(A, s)) || o.enumerable,
              });
        return c;
      };
      var Vt = (c, A, _) => (
        (_ = c != null ? Wt(Ht(c)) : {}),
        Yt(
          A || !c || !c.__esModule
            ? Ot(_, "default", { value: c, enumerable: !0 })
            : _,
          c
        )
      );
      var Tt = Kt((Bt, zt) => {
        (function (c) {
          typeof Bt == "object" && typeof zt < "u"
            ? (zt.exports = c())
            : typeof define == "function" && define.amd
            ? define([], c)
            : ((typeof window < "u"
                ? window
                : typeof global < "u"
                ? global
                : typeof self < "u"
                ? self
                : this
              ).JSZip = c());
        })(function () {
          return (function c(A, _, o) {
            function s(b, y) {
              if (!_[b]) {
                if (!A[b]) {
                  var m = typeof bt == "function" && bt;
                  if (!y && m) return m(b, !0);
                  if (r) return r(b, !0);
                  var v = new Error("Cannot find module '" + b + "'");
                  throw ((v.code = "MODULE_NOT_FOUND"), v);
                }
                var i = (_[b] = { exports: {} });
                A[b][0].call(
                  i.exports,
                  function (d) {
                    var n = A[b][1][d];
                    return s(n || d);
                  },
                  i,
                  i.exports,
                  c,
                  A,
                  _,
                  o
                );
              }
              return _[b].exports;
            }
            for (
              var r = typeof bt == "function" && bt, h = 0;
              h < o.length;
              h++
            )
              s(o[h]);
            return s;
          })(
            {
              1: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./utils"),
                    s = c("./support"),
                    r =
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                  (_.encode = function (h) {
                    for (
                      var b,
                        y,
                        m,
                        v,
                        i,
                        d,
                        n,
                        l = [],
                        a = 0,
                        p = h.length,
                        w = p,
                        S = o.getTypeOf(h) !== "string";
                      a < h.length;

                    )
                      (w = p - a),
                        (m = S
                          ? ((b = h[a++]),
                            (y = a < p ? h[a++] : 0),
                            a < p ? h[a++] : 0)
                          : ((b = h.charCodeAt(a++)),
                            (y = a < p ? h.charCodeAt(a++) : 0),
                            a < p ? h.charCodeAt(a++) : 0)),
                        (v = b >> 2),
                        (i = ((3 & b) << 4) | (y >> 4)),
                        (d = 1 < w ? ((15 & y) << 2) | (m >> 6) : 64),
                        (n = 2 < w ? 63 & m : 64),
                        l.push(
                          r.charAt(v) + r.charAt(i) + r.charAt(d) + r.charAt(n)
                        );
                    return l.join("");
                  }),
                    (_.decode = function (h) {
                      var b,
                        y,
                        m,
                        v,
                        i,
                        d,
                        n = 0,
                        l = 0,
                        a = "data:";
                      if (h.substr(0, a.length) === a)
                        throw new Error(
                          "Invalid base64 input, it looks like a data url."
                        );
                      var p,
                        w =
                          (3 * (h = h.replace(/[^A-Za-z0-9+/=]/g, "")).length) /
                          4;
                      if (
                        (h.charAt(h.length - 1) === r.charAt(64) && w--,
                        h.charAt(h.length - 2) === r.charAt(64) && w--,
                        w % 1 != 0)
                      )
                        throw new Error(
                          "Invalid base64 input, bad content length."
                        );
                      for (
                        p = s.uint8array
                          ? new Uint8Array(0 | w)
                          : new Array(0 | w);
                        n < h.length;

                      )
                        (b =
                          (r.indexOf(h.charAt(n++)) << 2) |
                          ((v = r.indexOf(h.charAt(n++))) >> 4)),
                          (y =
                            ((15 & v) << 4) |
                            ((i = r.indexOf(h.charAt(n++))) >> 2)),
                          (m = ((3 & i) << 6) | (d = r.indexOf(h.charAt(n++)))),
                          (p[l++] = b),
                          i !== 64 && (p[l++] = y),
                          d !== 64 && (p[l++] = m);
                      return p;
                    });
                },
                { "./support": 30, "./utils": 32 },
              ],
              2: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./external"),
                    s = c("./stream/DataWorker"),
                    r = c("./stream/Crc32Probe"),
                    h = c("./stream/DataLengthProbe");
                  function b(y, m, v, i, d) {
                    (this.compressedSize = y),
                      (this.uncompressedSize = m),
                      (this.crc32 = v),
                      (this.compression = i),
                      (this.compressedContent = d);
                  }
                  (b.prototype = {
                    getContentWorker: function () {
                      var y = new s(o.Promise.resolve(this.compressedContent))
                          .pipe(this.compression.uncompressWorker())
                          .pipe(new h("data_length")),
                        m = this;
                      return (
                        y.on("end", function () {
                          if (
                            this.streamInfo.data_length !== m.uncompressedSize
                          )
                            throw new Error(
                              "Bug : uncompressed data size mismatch"
                            );
                        }),
                        y
                      );
                    },
                    getCompressedWorker: function () {
                      return new s(o.Promise.resolve(this.compressedContent))
                        .withStreamInfo("compressedSize", this.compressedSize)
                        .withStreamInfo(
                          "uncompressedSize",
                          this.uncompressedSize
                        )
                        .withStreamInfo("crc32", this.crc32)
                        .withStreamInfo("compression", this.compression);
                    },
                  }),
                    (b.createWorkerFrom = function (y, m, v) {
                      return y
                        .pipe(new r())
                        .pipe(new h("uncompressedSize"))
                        .pipe(m.compressWorker(v))
                        .pipe(new h("compressedSize"))
                        .withStreamInfo("compression", m);
                    }),
                    (A.exports = b);
                },
                {
                  "./external": 6,
                  "./stream/Crc32Probe": 25,
                  "./stream/DataLengthProbe": 26,
                  "./stream/DataWorker": 27,
                },
              ],
              3: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./stream/GenericWorker");
                  (_.STORE = {
                    magic: "\0\0",
                    compressWorker: function () {
                      return new o("STORE compression");
                    },
                    uncompressWorker: function () {
                      return new o("STORE decompression");
                    },
                  }),
                    (_.DEFLATE = c("./flate"));
                },
                { "./flate": 7, "./stream/GenericWorker": 28 },
              ],
              4: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./utils"),
                    s = (function () {
                      for (var r, h = [], b = 0; b < 256; b++) {
                        r = b;
                        for (var y = 0; y < 8; y++)
                          r = 1 & r ? 3988292384 ^ (r >>> 1) : r >>> 1;
                        h[b] = r;
                      }
                      return h;
                    })();
                  A.exports = function (r, h) {
                    return r !== void 0 && r.length
                      ? o.getTypeOf(r) !== "string"
                        ? (function (b, y, m, v) {
                            var i = s,
                              d = v + m;
                            b ^= -1;
                            for (var n = v; n < d; n++)
                              b = (b >>> 8) ^ i[255 & (b ^ y[n])];
                            return -1 ^ b;
                          })(0 | h, r, r.length, 0)
                        : (function (b, y, m, v) {
                            var i = s,
                              d = v + m;
                            b ^= -1;
                            for (var n = v; n < d; n++)
                              b = (b >>> 8) ^ i[255 & (b ^ y.charCodeAt(n))];
                            return -1 ^ b;
                          })(0 | h, r, r.length, 0)
                      : 0;
                  };
                },
                { "./utils": 32 },
              ],
              5: [
                function (c, A, _) {
                  "use strict";
                  (_.base64 = !1),
                    (_.binary = !1),
                    (_.dir = !1),
                    (_.createFolders = !0),
                    (_.date = null),
                    (_.compression = null),
                    (_.compressionOptions = null),
                    (_.comment = null),
                    (_.unixPermissions = null),
                    (_.dosPermissions = null);
                },
                {},
              ],
              6: [
                function (c, A, _) {
                  "use strict";
                  var o = null;
                  (o = typeof Promise < "u" ? Promise : c("lie")),
                    (A.exports = { Promise: o });
                },
                { lie: 37 },
              ],
              7: [
                function (c, A, _) {
                  "use strict";
                  var o =
                      typeof Uint8Array < "u" &&
                      typeof Uint16Array < "u" &&
                      typeof Uint32Array < "u",
                    s = c("pako"),
                    r = c("./utils"),
                    h = c("./stream/GenericWorker"),
                    b = o ? "uint8array" : "array";
                  function y(m, v) {
                    h.call(this, "FlateWorker/" + m),
                      (this._pako = null),
                      (this._pakoAction = m),
                      (this._pakoOptions = v),
                      (this.meta = {});
                  }
                  (_.magic = "\b\0"),
                    r.inherits(y, h),
                    (y.prototype.processChunk = function (m) {
                      (this.meta = m.meta),
                        this._pako === null && this._createPako(),
                        this._pako.push(r.transformTo(b, m.data), !1);
                    }),
                    (y.prototype.flush = function () {
                      h.prototype.flush.call(this),
                        this._pako === null && this._createPako(),
                        this._pako.push([], !0);
                    }),
                    (y.prototype.cleanUp = function () {
                      h.prototype.cleanUp.call(this), (this._pako = null);
                    }),
                    (y.prototype._createPako = function () {
                      this._pako = new s[this._pakoAction]({
                        raw: !0,
                        level: this._pakoOptions.level || -1,
                      });
                      var m = this;
                      this._pako.onData = function (v) {
                        m.push({ data: v, meta: m.meta });
                      };
                    }),
                    (_.compressWorker = function (m) {
                      return new y("Deflate", m);
                    }),
                    (_.uncompressWorker = function () {
                      return new y("Inflate", {});
                    });
                },
                { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 },
              ],
              8: [
                function (c, A, _) {
                  "use strict";
                  function o(i, d) {
                    var n,
                      l = "";
                    for (n = 0; n < d; n++)
                      (l += String.fromCharCode(255 & i)), (i >>>= 8);
                    return l;
                  }
                  function s(i, d, n, l, a, p) {
                    var w,
                      S,
                      x = i.file,
                      F = i.compression,
                      B = p !== b.utf8encode,
                      P = r.transformTo("string", p(x.name)),
                      O = r.transformTo("string", b.utf8encode(x.name)),
                      M = x.comment,
                      X = r.transformTo("string", p(M)),
                      g = r.transformTo("string", b.utf8encode(M)),
                      T = O.length !== x.name.length,
                      e = g.length !== M.length,
                      D = "",
                      $ = "",
                      L = "",
                      J = x.dir,
                      j = x.date,
                      q = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
                    (d && !n) ||
                      ((q.crc32 = i.crc32),
                      (q.compressedSize = i.compressedSize),
                      (q.uncompressedSize = i.uncompressedSize));
                    var C = 0;
                    d && (C |= 8), B || (!T && !e) || (C |= 2048);
                    var E = 0,
                      V = 0;
                    J && (E |= 16),
                      a === "UNIX"
                        ? ((V = 798),
                          (E |= (function (H, nt) {
                            var ot = H;
                            return (
                              H || (ot = nt ? 16893 : 33204), (65535 & ot) << 16
                            );
                          })(x.unixPermissions, J)))
                        : ((V = 20),
                          (E |= (function (H) {
                            return 63 & (H || 0);
                          })(x.dosPermissions))),
                      (w = j.getUTCHours()),
                      (w <<= 6),
                      (w |= j.getUTCMinutes()),
                      (w <<= 5),
                      (w |= j.getUTCSeconds() / 2),
                      (S = j.getUTCFullYear() - 1980),
                      (S <<= 4),
                      (S |= j.getUTCMonth() + 1),
                      (S <<= 5),
                      (S |= j.getUTCDate()),
                      T &&
                        (($ = o(1, 1) + o(y(P), 4) + O),
                        (D += "up" + o($.length, 2) + $)),
                      e &&
                        ((L = o(1, 1) + o(y(X), 4) + g),
                        (D += "uc" + o(L.length, 2) + L));
                    var G = "";
                    return (
                      (G += `
\0`),
                      (G += o(C, 2)),
                      (G += F.magic),
                      (G += o(w, 2)),
                      (G += o(S, 2)),
                      (G += o(q.crc32, 4)),
                      (G += o(q.compressedSize, 4)),
                      (G += o(q.uncompressedSize, 4)),
                      (G += o(P.length, 2)),
                      (G += o(D.length, 2)),
                      {
                        fileRecord: m.LOCAL_FILE_HEADER + G + P + D,
                        dirRecord:
                          m.CENTRAL_FILE_HEADER +
                          o(V, 2) +
                          G +
                          o(X.length, 2) +
                          "\0\0\0\0" +
                          o(E, 4) +
                          o(l, 4) +
                          P +
                          D +
                          X,
                      }
                    );
                  }
                  var r = c("../utils"),
                    h = c("../stream/GenericWorker"),
                    b = c("../utf8"),
                    y = c("../crc32"),
                    m = c("../signature");
                  function v(i, d, n, l) {
                    h.call(this, "ZipFileWorker"),
                      (this.bytesWritten = 0),
                      (this.zipComment = d),
                      (this.zipPlatform = n),
                      (this.encodeFileName = l),
                      (this.streamFiles = i),
                      (this.accumulate = !1),
                      (this.contentBuffer = []),
                      (this.dirRecords = []),
                      (this.currentSourceOffset = 0),
                      (this.entriesCount = 0),
                      (this.currentFile = null),
                      (this._sources = []);
                  }
                  r.inherits(v, h),
                    (v.prototype.push = function (i) {
                      var d = i.meta.percent || 0,
                        n = this.entriesCount,
                        l = this._sources.length;
                      this.accumulate
                        ? this.contentBuffer.push(i)
                        : ((this.bytesWritten += i.data.length),
                          h.prototype.push.call(this, {
                            data: i.data,
                            meta: {
                              currentFile: this.currentFile,
                              percent: n ? (d + 100 * (n - l - 1)) / n : 100,
                            },
                          }));
                    }),
                    (v.prototype.openedSource = function (i) {
                      (this.currentSourceOffset = this.bytesWritten),
                        (this.currentFile = i.file.name);
                      var d = this.streamFiles && !i.file.dir;
                      if (d) {
                        var n = s(
                          i,
                          d,
                          !1,
                          this.currentSourceOffset,
                          this.zipPlatform,
                          this.encodeFileName
                        );
                        this.push({ data: n.fileRecord, meta: { percent: 0 } });
                      } else this.accumulate = !0;
                    }),
                    (v.prototype.closedSource = function (i) {
                      this.accumulate = !1;
                      var d = this.streamFiles && !i.file.dir,
                        n = s(
                          i,
                          d,
                          !0,
                          this.currentSourceOffset,
                          this.zipPlatform,
                          this.encodeFileName
                        );
                      if ((this.dirRecords.push(n.dirRecord), d))
                        this.push({
                          data: (function (l) {
                            return (
                              m.DATA_DESCRIPTOR +
                              o(l.crc32, 4) +
                              o(l.compressedSize, 4) +
                              o(l.uncompressedSize, 4)
                            );
                          })(i),
                          meta: { percent: 100 },
                        });
                      else
                        for (
                          this.push({
                            data: n.fileRecord,
                            meta: { percent: 0 },
                          });
                          this.contentBuffer.length;

                        )
                          this.push(this.contentBuffer.shift());
                      this.currentFile = null;
                    }),
                    (v.prototype.flush = function () {
                      for (
                        var i = this.bytesWritten, d = 0;
                        d < this.dirRecords.length;
                        d++
                      )
                        this.push({
                          data: this.dirRecords[d],
                          meta: { percent: 100 },
                        });
                      var n = this.bytesWritten - i,
                        l = (function (a, p, w, S, x) {
                          var F = r.transformTo("string", x(S));
                          return (
                            m.CENTRAL_DIRECTORY_END +
                            "\0\0\0\0" +
                            o(a, 2) +
                            o(a, 2) +
                            o(p, 4) +
                            o(w, 4) +
                            o(F.length, 2) +
                            F
                          );
                        })(
                          this.dirRecords.length,
                          n,
                          i,
                          this.zipComment,
                          this.encodeFileName
                        );
                      this.push({ data: l, meta: { percent: 100 } });
                    }),
                    (v.prototype.prepareNextSource = function () {
                      (this.previous = this._sources.shift()),
                        this.openedSource(this.previous.streamInfo),
                        this.isPaused
                          ? this.previous.pause()
                          : this.previous.resume();
                    }),
                    (v.prototype.registerPrevious = function (i) {
                      this._sources.push(i);
                      var d = this;
                      return (
                        i.on("data", function (n) {
                          d.processChunk(n);
                        }),
                        i.on("end", function () {
                          d.closedSource(d.previous.streamInfo),
                            d._sources.length ? d.prepareNextSource() : d.end();
                        }),
                        i.on("error", function (n) {
                          d.error(n);
                        }),
                        this
                      );
                    }),
                    (v.prototype.resume = function () {
                      return (
                        !!h.prototype.resume.call(this) &&
                        (!this.previous && this._sources.length
                          ? (this.prepareNextSource(), !0)
                          : this.previous ||
                            this._sources.length ||
                            this.generatedError
                          ? void 0
                          : (this.end(), !0))
                      );
                    }),
                    (v.prototype.error = function (i) {
                      var d = this._sources;
                      if (!h.prototype.error.call(this, i)) return !1;
                      for (var n = 0; n < d.length; n++)
                        try {
                          d[n].error(i);
                        } catch {}
                      return !0;
                    }),
                    (v.prototype.lock = function () {
                      h.prototype.lock.call(this);
                      for (var i = this._sources, d = 0; d < i.length; d++)
                        i[d].lock();
                    }),
                    (A.exports = v);
                },
                {
                  "../crc32": 4,
                  "../signature": 23,
                  "../stream/GenericWorker": 28,
                  "../utf8": 31,
                  "../utils": 32,
                },
              ],
              9: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../compressions"),
                    s = c("./ZipFileWorker");
                  _.generateWorker = function (r, h, b) {
                    var y = new s(
                        h.streamFiles,
                        b,
                        h.platform,
                        h.encodeFileName
                      ),
                      m = 0;
                    try {
                      r.forEach(function (v, i) {
                        m++;
                        var d = (function (p, w) {
                            var S = p || w,
                              x = o[S];
                            if (!x)
                              throw new Error(
                                S + " is not a valid compression method !"
                              );
                            return x;
                          })(i.options.compression, h.compression),
                          n =
                            i.options.compressionOptions ||
                            h.compressionOptions ||
                            {},
                          l = i.dir,
                          a = i.date;
                        i._compressWorker(d, n)
                          .withStreamInfo("file", {
                            name: v,
                            dir: l,
                            date: a,
                            comment: i.comment || "",
                            unixPermissions: i.unixPermissions,
                            dosPermissions: i.dosPermissions,
                          })
                          .pipe(y);
                      }),
                        (y.entriesCount = m);
                    } catch (v) {
                      y.error(v);
                    }
                    return y;
                  };
                },
                { "../compressions": 3, "./ZipFileWorker": 8 },
              ],
              10: [
                function (c, A, _) {
                  "use strict";
                  function o() {
                    if (!(this instanceof o)) return new o();
                    if (arguments.length)
                      throw new Error(
                        "The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide."
                      );
                    (this.files = Object.create(null)),
                      (this.comment = null),
                      (this.root = ""),
                      (this.clone = function () {
                        var s = new o();
                        for (var r in this)
                          typeof this[r] != "function" && (s[r] = this[r]);
                        return s;
                      });
                  }
                  ((o.prototype = c("./object")).loadAsync = c("./load")),
                    (o.support = c("./support")),
                    (o.defaults = c("./defaults")),
                    (o.version = "3.10.1"),
                    (o.loadAsync = function (s, r) {
                      return new o().loadAsync(s, r);
                    }),
                    (o.external = c("./external")),
                    (A.exports = o);
                },
                {
                  "./defaults": 5,
                  "./external": 6,
                  "./load": 11,
                  "./object": 15,
                  "./support": 30,
                },
              ],
              11: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./utils"),
                    s = c("./external"),
                    r = c("./utf8"),
                    h = c("./zipEntries"),
                    b = c("./stream/Crc32Probe"),
                    y = c("./nodejsUtils");
                  function m(v) {
                    return new s.Promise(function (i, d) {
                      var n = v.decompressed.getContentWorker().pipe(new b());
                      n.on("error", function (l) {
                        d(l);
                      })
                        .on("end", function () {
                          n.streamInfo.crc32 !== v.decompressed.crc32
                            ? d(new Error("Corrupted zip : CRC32 mismatch"))
                            : i();
                        })
                        .resume();
                    });
                  }
                  A.exports = function (v, i) {
                    var d = this;
                    return (
                      (i = o.extend(i || {}, {
                        base64: !1,
                        checkCRC32: !1,
                        optimizedBinaryString: !1,
                        createFolders: !1,
                        decodeFileName: r.utf8decode,
                      })),
                      y.isNode && y.isStream(v)
                        ? s.Promise.reject(
                            new Error(
                              "JSZip can't accept a stream when loading a zip file."
                            )
                          )
                        : o
                            .prepareContent(
                              "the loaded zip file",
                              v,
                              !0,
                              i.optimizedBinaryString,
                              i.base64
                            )
                            .then(function (n) {
                              var l = new h(i);
                              return l.load(n), l;
                            })
                            .then(function (n) {
                              var l = [s.Promise.resolve(n)],
                                a = n.files;
                              if (i.checkCRC32)
                                for (var p = 0; p < a.length; p++)
                                  l.push(m(a[p]));
                              return s.Promise.all(l);
                            })
                            .then(function (n) {
                              for (
                                var l = n.shift(), a = l.files, p = 0;
                                p < a.length;
                                p++
                              ) {
                                var w = a[p],
                                  S = w.fileNameStr,
                                  x = o.resolve(w.fileNameStr);
                                d.file(x, w.decompressed, {
                                  binary: !0,
                                  optimizedBinaryString: !0,
                                  date: w.date,
                                  dir: w.dir,
                                  comment: w.fileCommentStr.length
                                    ? w.fileCommentStr
                                    : null,
                                  unixPermissions: w.unixPermissions,
                                  dosPermissions: w.dosPermissions,
                                  createFolders: i.createFolders,
                                }),
                                  w.dir || (d.file(x).unsafeOriginalName = S);
                              }
                              return (
                                l.zipComment.length &&
                                  (d.comment = l.zipComment),
                                d
                              );
                            })
                    );
                  };
                },
                {
                  "./external": 6,
                  "./nodejsUtils": 14,
                  "./stream/Crc32Probe": 25,
                  "./utf8": 31,
                  "./utils": 32,
                  "./zipEntries": 33,
                },
              ],
              12: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils"),
                    s = c("../stream/GenericWorker");
                  function r(h, b) {
                    s.call(this, "Nodejs stream input adapter for " + h),
                      (this._upstreamEnded = !1),
                      this._bindStream(b);
                  }
                  o.inherits(r, s),
                    (r.prototype._bindStream = function (h) {
                      var b = this;
                      (this._stream = h).pause(),
                        h
                          .on("data", function (y) {
                            b.push({ data: y, meta: { percent: 0 } });
                          })
                          .on("error", function (y) {
                            b.isPaused ? (this.generatedError = y) : b.error(y);
                          })
                          .on("end", function () {
                            b.isPaused ? (b._upstreamEnded = !0) : b.end();
                          });
                    }),
                    (r.prototype.pause = function () {
                      return (
                        !!s.prototype.pause.call(this) &&
                        (this._stream.pause(), !0)
                      );
                    }),
                    (r.prototype.resume = function () {
                      return (
                        !!s.prototype.resume.call(this) &&
                        (this._upstreamEnded
                          ? this.end()
                          : this._stream.resume(),
                        !0)
                      );
                    }),
                    (A.exports = r);
                },
                { "../stream/GenericWorker": 28, "../utils": 32 },
              ],
              13: [
                function (c, A, _) {
                  "use strict";
                  var o = c("readable-stream").Readable;
                  function s(r, h, b) {
                    o.call(this, h), (this._helper = r);
                    var y = this;
                    r.on("data", function (m, v) {
                      y.push(m) || y._helper.pause(), b && b(v);
                    })
                      .on("error", function (m) {
                        y.emit("error", m);
                      })
                      .on("end", function () {
                        y.push(null);
                      });
                  }
                  c("../utils").inherits(s, o),
                    (s.prototype._read = function () {
                      this._helper.resume();
                    }),
                    (A.exports = s);
                },
                { "../utils": 32, "readable-stream": 16 },
              ],
              14: [
                function (c, A, _) {
                  "use strict";
                  A.exports = {
                    isNode: typeof Buffer < "u",
                    newBufferFrom: function (o, s) {
                      if (Buffer.from && Buffer.from !== Uint8Array.from)
                        return Buffer.from(o, s);
                      if (typeof o == "number")
                        throw new Error(
                          'The "data" argument must not be a number'
                        );
                      return new Buffer(o, s);
                    },
                    allocBuffer: function (o) {
                      if (Buffer.alloc) return Buffer.alloc(o);
                      var s = new Buffer(o);
                      return s.fill(0), s;
                    },
                    isBuffer: function (o) {
                      return Buffer.isBuffer(o);
                    },
                    isStream: function (o) {
                      return (
                        o &&
                        typeof o.on == "function" &&
                        typeof o.pause == "function" &&
                        typeof o.resume == "function"
                      );
                    },
                  };
                },
                {},
              ],
              15: [
                function (c, A, _) {
                  "use strict";
                  function o(x, F, B) {
                    var P,
                      O = r.getTypeOf(F),
                      M = r.extend(B || {}, y);
                    (M.date = M.date || new Date()),
                      M.compression !== null &&
                        (M.compression = M.compression.toUpperCase()),
                      typeof M.unixPermissions == "string" &&
                        (M.unixPermissions = parseInt(M.unixPermissions, 8)),
                      M.unixPermissions &&
                        16384 & M.unixPermissions &&
                        (M.dir = !0),
                      M.dosPermissions && 16 & M.dosPermissions && (M.dir = !0),
                      M.dir && (x = a(x)),
                      M.createFolders && (P = l(x)) && p.call(this, P, !0);
                    var X =
                      O === "string" && M.binary === !1 && M.base64 === !1;
                    (B && B.binary !== void 0) || (M.binary = !X),
                      ((F instanceof m && F.uncompressedSize === 0) ||
                        M.dir ||
                        !F ||
                        F.length === 0) &&
                        ((M.base64 = !1),
                        (M.binary = !0),
                        (F = ""),
                        (M.compression = "STORE"),
                        (O = "string"));
                    var g = null;
                    g =
                      F instanceof m || F instanceof h
                        ? F
                        : d.isNode && d.isStream(F)
                        ? new n(x, F)
                        : r.prepareContent(
                            x,
                            F,
                            M.binary,
                            M.optimizedBinaryString,
                            M.base64
                          );
                    var T = new v(x, g, M);
                    this.files[x] = T;
                  }
                  var s = c("./utf8"),
                    r = c("./utils"),
                    h = c("./stream/GenericWorker"),
                    b = c("./stream/StreamHelper"),
                    y = c("./defaults"),
                    m = c("./compressedObject"),
                    v = c("./zipObject"),
                    i = c("./generate"),
                    d = c("./nodejsUtils"),
                    n = c("./nodejs/NodejsStreamInputAdapter"),
                    l = function (x) {
                      x.slice(-1) === "/" && (x = x.substring(0, x.length - 1));
                      var F = x.lastIndexOf("/");
                      return 0 < F ? x.substring(0, F) : "";
                    },
                    a = function (x) {
                      return x.slice(-1) !== "/" && (x += "/"), x;
                    },
                    p = function (x, F) {
                      return (
                        (F = F !== void 0 ? F : y.createFolders),
                        (x = a(x)),
                        this.files[x] ||
                          o.call(this, x, null, { dir: !0, createFolders: F }),
                        this.files[x]
                      );
                    };
                  function w(x) {
                    return (
                      Object.prototype.toString.call(x) === "[object RegExp]"
                    );
                  }
                  var S = {
                    load: function () {
                      throw new Error(
                        "This method has been removed in JSZip 3.0, please check the upgrade guide."
                      );
                    },
                    forEach: function (x) {
                      var F, B, P;
                      for (F in this.files)
                        (P = this.files[F]),
                          (B = F.slice(this.root.length, F.length)) &&
                            F.slice(0, this.root.length) === this.root &&
                            x(B, P);
                    },
                    filter: function (x) {
                      var F = [];
                      return (
                        this.forEach(function (B, P) {
                          x(B, P) && F.push(P);
                        }),
                        F
                      );
                    },
                    file: function (x, F, B) {
                      if (arguments.length !== 1)
                        return (x = this.root + x), o.call(this, x, F, B), this;
                      if (w(x)) {
                        var P = x;
                        return this.filter(function (M, X) {
                          return !X.dir && P.test(M);
                        });
                      }
                      var O = this.files[this.root + x];
                      return O && !O.dir ? O : null;
                    },
                    folder: function (x) {
                      if (!x) return this;
                      if (w(x))
                        return this.filter(function (O, M) {
                          return M.dir && x.test(O);
                        });
                      var F = this.root + x,
                        B = p.call(this, F),
                        P = this.clone();
                      return (P.root = B.name), P;
                    },
                    remove: function (x) {
                      x = this.root + x;
                      var F = this.files[x];
                      if (
                        (F ||
                          (x.slice(-1) !== "/" && (x += "/"),
                          (F = this.files[x])),
                        F && !F.dir)
                      )
                        delete this.files[x];
                      else
                        for (
                          var B = this.filter(function (O, M) {
                              return M.name.slice(0, x.length) === x;
                            }),
                            P = 0;
                          P < B.length;
                          P++
                        )
                          delete this.files[B[P].name];
                      return this;
                    },
                    generate: function () {
                      throw new Error(
                        "This method has been removed in JSZip 3.0, please check the upgrade guide."
                      );
                    },
                    generateInternalStream: function (x) {
                      var F,
                        B = {};
                      try {
                        if (
                          (((B = r.extend(x || {}, {
                            streamFiles: !1,
                            compression: "STORE",
                            compressionOptions: null,
                            type: "",
                            platform: "DOS",
                            comment: null,
                            mimeType: "application/zip",
                            encodeFileName: s.utf8encode,
                          })).type = B.type.toLowerCase()),
                          (B.compression = B.compression.toUpperCase()),
                          B.type === "binarystring" && (B.type = "string"),
                          !B.type)
                        )
                          throw new Error("No output type specified.");
                        r.checkSupport(B.type),
                          (B.platform !== "darwin" &&
                            B.platform !== "freebsd" &&
                            B.platform !== "linux" &&
                            B.platform !== "sunos") ||
                            (B.platform = "UNIX"),
                          B.platform === "win32" && (B.platform = "DOS");
                        var P = B.comment || this.comment || "";
                        F = i.generateWorker(this, B, P);
                      } catch (O) {
                        (F = new h("error")).error(O);
                      }
                      return new b(F, B.type || "string", B.mimeType);
                    },
                    generateAsync: function (x, F) {
                      return this.generateInternalStream(x).accumulate(F);
                    },
                    generateNodeStream: function (x, F) {
                      return (
                        (x = x || {}).type || (x.type = "nodebuffer"),
                        this.generateInternalStream(x).toNodejsStream(F)
                      );
                    },
                  };
                  A.exports = S;
                },
                {
                  "./compressedObject": 2,
                  "./defaults": 5,
                  "./generate": 9,
                  "./nodejs/NodejsStreamInputAdapter": 12,
                  "./nodejsUtils": 14,
                  "./stream/GenericWorker": 28,
                  "./stream/StreamHelper": 29,
                  "./utf8": 31,
                  "./utils": 32,
                  "./zipObject": 35,
                },
              ],
              16: [
                function (c, A, _) {
                  "use strict";
                  A.exports = c("stream");
                },
                { stream: void 0 },
              ],
              17: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./DataReader");
                  function s(r) {
                    o.call(this, r);
                    for (var h = 0; h < this.data.length; h++)
                      r[h] = 255 & r[h];
                  }
                  c("../utils").inherits(s, o),
                    (s.prototype.byteAt = function (r) {
                      return this.data[this.zero + r];
                    }),
                    (s.prototype.lastIndexOfSignature = function (r) {
                      for (
                        var h = r.charCodeAt(0),
                          b = r.charCodeAt(1),
                          y = r.charCodeAt(2),
                          m = r.charCodeAt(3),
                          v = this.length - 4;
                        0 <= v;
                        --v
                      )
                        if (
                          this.data[v] === h &&
                          this.data[v + 1] === b &&
                          this.data[v + 2] === y &&
                          this.data[v + 3] === m
                        )
                          return v - this.zero;
                      return -1;
                    }),
                    (s.prototype.readAndCheckSignature = function (r) {
                      var h = r.charCodeAt(0),
                        b = r.charCodeAt(1),
                        y = r.charCodeAt(2),
                        m = r.charCodeAt(3),
                        v = this.readData(4);
                      return (
                        h === v[0] && b === v[1] && y === v[2] && m === v[3]
                      );
                    }),
                    (s.prototype.readData = function (r) {
                      if ((this.checkOffset(r), r === 0)) return [];
                      var h = this.data.slice(
                        this.zero + this.index,
                        this.zero + this.index + r
                      );
                      return (this.index += r), h;
                    }),
                    (A.exports = s);
                },
                { "../utils": 32, "./DataReader": 18 },
              ],
              18: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils");
                  function s(r) {
                    (this.data = r),
                      (this.length = r.length),
                      (this.index = 0),
                      (this.zero = 0);
                  }
                  (s.prototype = {
                    checkOffset: function (r) {
                      this.checkIndex(this.index + r);
                    },
                    checkIndex: function (r) {
                      if (this.length < this.zero + r || r < 0)
                        throw new Error(
                          "End of data reached (data length = " +
                            this.length +
                            ", asked index = " +
                            r +
                            "). Corrupted zip ?"
                        );
                    },
                    setIndex: function (r) {
                      this.checkIndex(r), (this.index = r);
                    },
                    skip: function (r) {
                      this.setIndex(this.index + r);
                    },
                    byteAt: function () {},
                    readInt: function (r) {
                      var h,
                        b = 0;
                      for (
                        this.checkOffset(r), h = this.index + r - 1;
                        h >= this.index;
                        h--
                      )
                        b = (b << 8) + this.byteAt(h);
                      return (this.index += r), b;
                    },
                    readString: function (r) {
                      return o.transformTo("string", this.readData(r));
                    },
                    readData: function () {},
                    lastIndexOfSignature: function () {},
                    readAndCheckSignature: function () {},
                    readDate: function () {
                      var r = this.readInt(4);
                      return new Date(
                        Date.UTC(
                          1980 + ((r >> 25) & 127),
                          ((r >> 21) & 15) - 1,
                          (r >> 16) & 31,
                          (r >> 11) & 31,
                          (r >> 5) & 63,
                          (31 & r) << 1
                        )
                      );
                    },
                  }),
                    (A.exports = s);
                },
                { "../utils": 32 },
              ],
              19: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./Uint8ArrayReader");
                  function s(r) {
                    o.call(this, r);
                  }
                  c("../utils").inherits(s, o),
                    (s.prototype.readData = function (r) {
                      this.checkOffset(r);
                      var h = this.data.slice(
                        this.zero + this.index,
                        this.zero + this.index + r
                      );
                      return (this.index += r), h;
                    }),
                    (A.exports = s);
                },
                { "../utils": 32, "./Uint8ArrayReader": 21 },
              ],
              20: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./DataReader");
                  function s(r) {
                    o.call(this, r);
                  }
                  c("../utils").inherits(s, o),
                    (s.prototype.byteAt = function (r) {
                      return this.data.charCodeAt(this.zero + r);
                    }),
                    (s.prototype.lastIndexOfSignature = function (r) {
                      return this.data.lastIndexOf(r) - this.zero;
                    }),
                    (s.prototype.readAndCheckSignature = function (r) {
                      return r === this.readData(4);
                    }),
                    (s.prototype.readData = function (r) {
                      this.checkOffset(r);
                      var h = this.data.slice(
                        this.zero + this.index,
                        this.zero + this.index + r
                      );
                      return (this.index += r), h;
                    }),
                    (A.exports = s);
                },
                { "../utils": 32, "./DataReader": 18 },
              ],
              21: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./ArrayReader");
                  function s(r) {
                    o.call(this, r);
                  }
                  c("../utils").inherits(s, o),
                    (s.prototype.readData = function (r) {
                      if ((this.checkOffset(r), r === 0))
                        return new Uint8Array(0);
                      var h = this.data.subarray(
                        this.zero + this.index,
                        this.zero + this.index + r
                      );
                      return (this.index += r), h;
                    }),
                    (A.exports = s);
                },
                { "../utils": 32, "./ArrayReader": 17 },
              ],
              22: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils"),
                    s = c("../support"),
                    r = c("./ArrayReader"),
                    h = c("./StringReader"),
                    b = c("./NodeBufferReader"),
                    y = c("./Uint8ArrayReader");
                  A.exports = function (m) {
                    var v = o.getTypeOf(m);
                    return (
                      o.checkSupport(v),
                      v !== "string" || s.uint8array
                        ? v === "nodebuffer"
                          ? new b(m)
                          : s.uint8array
                          ? new y(o.transformTo("uint8array", m))
                          : new r(o.transformTo("array", m))
                        : new h(m)
                    );
                  };
                },
                {
                  "../support": 30,
                  "../utils": 32,
                  "./ArrayReader": 17,
                  "./NodeBufferReader": 19,
                  "./StringReader": 20,
                  "./Uint8ArrayReader": 21,
                },
              ],
              23: [
                function (c, A, _) {
                  "use strict";
                  (_.LOCAL_FILE_HEADER = "PK"),
                    (_.CENTRAL_FILE_HEADER = "PK"),
                    (_.CENTRAL_DIRECTORY_END = "PK"),
                    (_.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07"),
                    (_.ZIP64_CENTRAL_DIRECTORY_END = "PK"),
                    (_.DATA_DESCRIPTOR = "PK\x07\b");
                },
                {},
              ],
              24: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./GenericWorker"),
                    s = c("../utils");
                  function r(h) {
                    o.call(this, "ConvertWorker to " + h), (this.destType = h);
                  }
                  s.inherits(r, o),
                    (r.prototype.processChunk = function (h) {
                      this.push({
                        data: s.transformTo(this.destType, h.data),
                        meta: h.meta,
                      });
                    }),
                    (A.exports = r);
                },
                { "../utils": 32, "./GenericWorker": 28 },
              ],
              25: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./GenericWorker"),
                    s = c("../crc32");
                  function r() {
                    o.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
                  }
                  c("../utils").inherits(r, o),
                    (r.prototype.processChunk = function (h) {
                      (this.streamInfo.crc32 = s(
                        h.data,
                        this.streamInfo.crc32 || 0
                      )),
                        this.push(h);
                    }),
                    (A.exports = r);
                },
                { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 },
              ],
              26: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils"),
                    s = c("./GenericWorker");
                  function r(h) {
                    s.call(this, "DataLengthProbe for " + h),
                      (this.propName = h),
                      this.withStreamInfo(h, 0);
                  }
                  o.inherits(r, s),
                    (r.prototype.processChunk = function (h) {
                      if (h) {
                        var b = this.streamInfo[this.propName] || 0;
                        this.streamInfo[this.propName] = b + h.data.length;
                      }
                      s.prototype.processChunk.call(this, h);
                    }),
                    (A.exports = r);
                },
                { "../utils": 32, "./GenericWorker": 28 },
              ],
              27: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils"),
                    s = c("./GenericWorker");
                  function r(h) {
                    s.call(this, "DataWorker");
                    var b = this;
                    (this.dataIsReady = !1),
                      (this.index = 0),
                      (this.max = 0),
                      (this.data = null),
                      (this.type = ""),
                      (this._tickScheduled = !1),
                      h.then(
                        function (y) {
                          (b.dataIsReady = !0),
                            (b.data = y),
                            (b.max = (y && y.length) || 0),
                            (b.type = o.getTypeOf(y)),
                            b.isPaused || b._tickAndRepeat();
                        },
                        function (y) {
                          b.error(y);
                        }
                      );
                  }
                  o.inherits(r, s),
                    (r.prototype.cleanUp = function () {
                      s.prototype.cleanUp.call(this), (this.data = null);
                    }),
                    (r.prototype.resume = function () {
                      return (
                        !!s.prototype.resume.call(this) &&
                        (!this._tickScheduled &&
                          this.dataIsReady &&
                          ((this._tickScheduled = !0),
                          o.delay(this._tickAndRepeat, [], this)),
                        !0)
                      );
                    }),
                    (r.prototype._tickAndRepeat = function () {
                      (this._tickScheduled = !1),
                        this.isPaused ||
                          this.isFinished ||
                          (this._tick(),
                          this.isFinished ||
                            (o.delay(this._tickAndRepeat, [], this),
                            (this._tickScheduled = !0)));
                    }),
                    (r.prototype._tick = function () {
                      if (this.isPaused || this.isFinished) return !1;
                      var h = null,
                        b = Math.min(this.max, this.index + 16384);
                      if (this.index >= this.max) return this.end();
                      switch (this.type) {
                        case "string":
                          h = this.data.substring(this.index, b);
                          break;
                        case "uint8array":
                          h = this.data.subarray(this.index, b);
                          break;
                        case "array":
                        case "nodebuffer":
                          h = this.data.slice(this.index, b);
                      }
                      return (
                        (this.index = b),
                        this.push({
                          data: h,
                          meta: {
                            percent: this.max
                              ? (this.index / this.max) * 100
                              : 0,
                          },
                        })
                      );
                    }),
                    (A.exports = r);
                },
                { "../utils": 32, "./GenericWorker": 28 },
              ],
              28: [
                function (c, A, _) {
                  "use strict";
                  function o(s) {
                    (this.name = s || "default"),
                      (this.streamInfo = {}),
                      (this.generatedError = null),
                      (this.extraStreamInfo = {}),
                      (this.isPaused = !0),
                      (this.isFinished = !1),
                      (this.isLocked = !1),
                      (this._listeners = { data: [], end: [], error: [] }),
                      (this.previous = null);
                  }
                  (o.prototype = {
                    push: function (s) {
                      this.emit("data", s);
                    },
                    end: function () {
                      if (this.isFinished) return !1;
                      this.flush();
                      try {
                        this.emit("end"),
                          this.cleanUp(),
                          (this.isFinished = !0);
                      } catch (s) {
                        this.emit("error", s);
                      }
                      return !0;
                    },
                    error: function (s) {
                      return (
                        !this.isFinished &&
                        (this.isPaused
                          ? (this.generatedError = s)
                          : ((this.isFinished = !0),
                            this.emit("error", s),
                            this.previous && this.previous.error(s),
                            this.cleanUp()),
                        !0)
                      );
                    },
                    on: function (s, r) {
                      return this._listeners[s].push(r), this;
                    },
                    cleanUp: function () {
                      (this.streamInfo =
                        this.generatedError =
                        this.extraStreamInfo =
                          null),
                        (this._listeners = []);
                    },
                    emit: function (s, r) {
                      if (this._listeners[s])
                        for (var h = 0; h < this._listeners[s].length; h++)
                          this._listeners[s][h].call(this, r);
                    },
                    pipe: function (s) {
                      return s.registerPrevious(this);
                    },
                    registerPrevious: function (s) {
                      if (this.isLocked)
                        throw new Error(
                          "The stream '" + this + "' has already been used."
                        );
                      (this.streamInfo = s.streamInfo),
                        this.mergeStreamInfo(),
                        (this.previous = s);
                      var r = this;
                      return (
                        s.on("data", function (h) {
                          r.processChunk(h);
                        }),
                        s.on("end", function () {
                          r.end();
                        }),
                        s.on("error", function (h) {
                          r.error(h);
                        }),
                        this
                      );
                    },
                    pause: function () {
                      return (
                        !this.isPaused &&
                        !this.isFinished &&
                        ((this.isPaused = !0),
                        this.previous && this.previous.pause(),
                        !0)
                      );
                    },
                    resume: function () {
                      if (!this.isPaused || this.isFinished) return !1;
                      var s = (this.isPaused = !1);
                      return (
                        this.generatedError &&
                          (this.error(this.generatedError), (s = !0)),
                        this.previous && this.previous.resume(),
                        !s
                      );
                    },
                    flush: function () {},
                    processChunk: function (s) {
                      this.push(s);
                    },
                    withStreamInfo: function (s, r) {
                      return (
                        (this.extraStreamInfo[s] = r),
                        this.mergeStreamInfo(),
                        this
                      );
                    },
                    mergeStreamInfo: function () {
                      for (var s in this.extraStreamInfo)
                        Object.prototype.hasOwnProperty.call(
                          this.extraStreamInfo,
                          s
                        ) && (this.streamInfo[s] = this.extraStreamInfo[s]);
                    },
                    lock: function () {
                      if (this.isLocked)
                        throw new Error(
                          "The stream '" + this + "' has already been used."
                        );
                      (this.isLocked = !0),
                        this.previous && this.previous.lock();
                    },
                    toString: function () {
                      var s = "Worker " + this.name;
                      return this.previous ? this.previous + " -> " + s : s;
                    },
                  }),
                    (A.exports = o);
                },
                {},
              ],
              29: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils"),
                    s = c("./ConvertWorker"),
                    r = c("./GenericWorker"),
                    h = c("../base64"),
                    b = c("../support"),
                    y = c("../external"),
                    m = null;
                  if (b.nodestream)
                    try {
                      m = c("../nodejs/NodejsStreamOutputAdapter");
                    } catch {}
                  function v(d, n) {
                    return new y.Promise(function (l, a) {
                      var p = [],
                        w = d._internalType,
                        S = d._outputType,
                        x = d._mimeType;
                      d.on("data", function (F, B) {
                        p.push(F), n && n(B);
                      })
                        .on("error", function (F) {
                          (p = []), a(F);
                        })
                        .on("end", function () {
                          try {
                            var F = (function (B, P, O) {
                              switch (B) {
                                case "blob":
                                  return o.newBlob(
                                    o.transformTo("arraybuffer", P),
                                    O
                                  );
                                case "base64":
                                  return h.encode(P);
                                default:
                                  return o.transformTo(B, P);
                              }
                            })(
                              S,
                              (function (B, P) {
                                var O,
                                  M = 0,
                                  X = null,
                                  g = 0;
                                for (O = 0; O < P.length; O++) g += P[O].length;
                                switch (B) {
                                  case "string":
                                    return P.join("");
                                  case "array":
                                    return Array.prototype.concat.apply([], P);
                                  case "uint8array":
                                    for (
                                      X = new Uint8Array(g), O = 0;
                                      O < P.length;
                                      O++
                                    )
                                      X.set(P[O], M), (M += P[O].length);
                                    return X;
                                  case "nodebuffer":
                                    return Buffer.concat(P);
                                  default:
                                    throw new Error(
                                      "concat : unsupported type '" + B + "'"
                                    );
                                }
                              })(w, p),
                              x
                            );
                            l(F);
                          } catch (B) {
                            a(B);
                          }
                          p = [];
                        })
                        .resume();
                    });
                  }
                  function i(d, n, l) {
                    var a = n;
                    switch (n) {
                      case "blob":
                      case "arraybuffer":
                        a = "uint8array";
                        break;
                      case "base64":
                        a = "string";
                    }
                    try {
                      (this._internalType = a),
                        (this._outputType = n),
                        (this._mimeType = l),
                        o.checkSupport(a),
                        (this._worker = d.pipe(new s(a))),
                        d.lock();
                    } catch (p) {
                      (this._worker = new r("error")), this._worker.error(p);
                    }
                  }
                  (i.prototype = {
                    accumulate: function (d) {
                      return v(this, d);
                    },
                    on: function (d, n) {
                      var l = this;
                      return (
                        d === "data"
                          ? this._worker.on(d, function (a) {
                              n.call(l, a.data, a.meta);
                            })
                          : this._worker.on(d, function () {
                              o.delay(n, arguments, l);
                            }),
                        this
                      );
                    },
                    resume: function () {
                      return (
                        o.delay(this._worker.resume, [], this._worker), this
                      );
                    },
                    pause: function () {
                      return this._worker.pause(), this;
                    },
                    toNodejsStream: function (d) {
                      if (
                        (o.checkSupport("nodestream"),
                        this._outputType !== "nodebuffer")
                      )
                        throw new Error(
                          this._outputType + " is not supported by this method"
                        );
                      return new m(
                        this,
                        { objectMode: this._outputType !== "nodebuffer" },
                        d
                      );
                    },
                  }),
                    (A.exports = i);
                },
                {
                  "../base64": 1,
                  "../external": 6,
                  "../nodejs/NodejsStreamOutputAdapter": 13,
                  "../support": 30,
                  "../utils": 32,
                  "./ConvertWorker": 24,
                  "./GenericWorker": 28,
                },
              ],
              30: [
                function (c, A, _) {
                  "use strict";
                  if (
                    ((_.base64 = !0),
                    (_.array = !0),
                    (_.string = !0),
                    (_.arraybuffer =
                      typeof ArrayBuffer < "u" && typeof Uint8Array < "u"),
                    (_.nodebuffer = typeof Buffer < "u"),
                    (_.uint8array = typeof Uint8Array < "u"),
                    typeof ArrayBuffer > "u")
                  )
                    _.blob = !1;
                  else {
                    var o = new ArrayBuffer(0);
                    try {
                      _.blob =
                        new Blob([o], { type: "application/zip" }).size === 0;
                    } catch {
                      try {
                        var s = new (self.BlobBuilder ||
                          self.WebKitBlobBuilder ||
                          self.MozBlobBuilder ||
                          self.MSBlobBuilder)();
                        s.append(o),
                          (_.blob = s.getBlob("application/zip").size === 0);
                      } catch {
                        _.blob = !1;
                      }
                    }
                  }
                  try {
                    _.nodestream = !!c("readable-stream").Readable;
                  } catch {
                    _.nodestream = !1;
                  }
                },
                { "readable-stream": 16 },
              ],
              31: [
                function (c, A, _) {
                  "use strict";
                  for (
                    var o = c("./utils"),
                      s = c("./support"),
                      r = c("./nodejsUtils"),
                      h = c("./stream/GenericWorker"),
                      b = new Array(256),
                      y = 0;
                    y < 256;
                    y++
                  )
                    b[y] =
                      252 <= y
                        ? 6
                        : 248 <= y
                        ? 5
                        : 240 <= y
                        ? 4
                        : 224 <= y
                        ? 3
                        : 192 <= y
                        ? 2
                        : 1;
                  b[254] = b[254] = 1;
                  function m() {
                    h.call(this, "utf-8 decode"), (this.leftOver = null);
                  }
                  function v() {
                    h.call(this, "utf-8 encode");
                  }
                  (_.utf8encode = function (i) {
                    return s.nodebuffer
                      ? r.newBufferFrom(i, "utf-8")
                      : (function (d) {
                          var n,
                            l,
                            a,
                            p,
                            w,
                            S = d.length,
                            x = 0;
                          for (p = 0; p < S; p++)
                            (64512 & (l = d.charCodeAt(p))) == 55296 &&
                              p + 1 < S &&
                              (64512 & (a = d.charCodeAt(p + 1))) == 56320 &&
                              ((l = 65536 + ((l - 55296) << 10) + (a - 56320)),
                              p++),
                              (x +=
                                l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4);
                          for (
                            n = s.uint8array ? new Uint8Array(x) : new Array(x),
                              p = w = 0;
                            w < x;
                            p++
                          )
                            (64512 & (l = d.charCodeAt(p))) == 55296 &&
                              p + 1 < S &&
                              (64512 & (a = d.charCodeAt(p + 1))) == 56320 &&
                              ((l = 65536 + ((l - 55296) << 10) + (a - 56320)),
                              p++),
                              l < 128
                                ? (n[w++] = l)
                                : (l < 2048
                                    ? (n[w++] = 192 | (l >>> 6))
                                    : (l < 65536
                                        ? (n[w++] = 224 | (l >>> 12))
                                        : ((n[w++] = 240 | (l >>> 18)),
                                          (n[w++] = 128 | ((l >>> 12) & 63))),
                                      (n[w++] = 128 | ((l >>> 6) & 63))),
                                  (n[w++] = 128 | (63 & l)));
                          return n;
                        })(i);
                  }),
                    (_.utf8decode = function (i) {
                      return s.nodebuffer
                        ? o.transformTo("nodebuffer", i).toString("utf-8")
                        : (function (d) {
                            var n,
                              l,
                              a,
                              p,
                              w = d.length,
                              S = new Array(2 * w);
                            for (n = l = 0; n < w; )
                              if ((a = d[n++]) < 128) S[l++] = a;
                              else if (4 < (p = b[a]))
                                (S[l++] = 65533), (n += p - 1);
                              else {
                                for (
                                  a &= p === 2 ? 31 : p === 3 ? 15 : 7;
                                  1 < p && n < w;

                                )
                                  (a = (a << 6) | (63 & d[n++])), p--;
                                1 < p
                                  ? (S[l++] = 65533)
                                  : a < 65536
                                  ? (S[l++] = a)
                                  : ((a -= 65536),
                                    (S[l++] = 55296 | ((a >> 10) & 1023)),
                                    (S[l++] = 56320 | (1023 & a)));
                              }
                            return (
                              S.length !== l &&
                                (S.subarray
                                  ? (S = S.subarray(0, l))
                                  : (S.length = l)),
                              o.applyFromCharCode(S)
                            );
                          })(
                            (i = o.transformTo(
                              s.uint8array ? "uint8array" : "array",
                              i
                            ))
                          );
                    }),
                    o.inherits(m, h),
                    (m.prototype.processChunk = function (i) {
                      var d = o.transformTo(
                        s.uint8array ? "uint8array" : "array",
                        i.data
                      );
                      if (this.leftOver && this.leftOver.length) {
                        if (s.uint8array) {
                          var n = d;
                          (d = new Uint8Array(
                            n.length + this.leftOver.length
                          )).set(this.leftOver, 0),
                            d.set(n, this.leftOver.length);
                        } else d = this.leftOver.concat(d);
                        this.leftOver = null;
                      }
                      var l = (function (p, w) {
                          var S;
                          for (
                            (w = w || p.length) > p.length && (w = p.length),
                              S = w - 1;
                            0 <= S && (192 & p[S]) == 128;

                          )
                            S--;
                          return S < 0 || S === 0 ? w : S + b[p[S]] > w ? S : w;
                        })(d),
                        a = d;
                      l !== d.length &&
                        (s.uint8array
                          ? ((a = d.subarray(0, l)),
                            (this.leftOver = d.subarray(l, d.length)))
                          : ((a = d.slice(0, l)),
                            (this.leftOver = d.slice(l, d.length)))),
                        this.push({ data: _.utf8decode(a), meta: i.meta });
                    }),
                    (m.prototype.flush = function () {
                      this.leftOver &&
                        this.leftOver.length &&
                        (this.push({
                          data: _.utf8decode(this.leftOver),
                          meta: {},
                        }),
                        (this.leftOver = null));
                    }),
                    (_.Utf8DecodeWorker = m),
                    o.inherits(v, h),
                    (v.prototype.processChunk = function (i) {
                      this.push({ data: _.utf8encode(i.data), meta: i.meta });
                    }),
                    (_.Utf8EncodeWorker = v);
                },
                {
                  "./nodejsUtils": 14,
                  "./stream/GenericWorker": 28,
                  "./support": 30,
                  "./utils": 32,
                },
              ],
              32: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./support"),
                    s = c("./base64"),
                    r = c("./nodejsUtils"),
                    h = c("./external");
                  function b(n) {
                    return n;
                  }
                  function y(n, l) {
                    for (var a = 0; a < n.length; ++a)
                      l[a] = 255 & n.charCodeAt(a);
                    return l;
                  }
                  c("setimmediate"),
                    (_.newBlob = function (n, l) {
                      _.checkSupport("blob");
                      try {
                        return new Blob([n], { type: l });
                      } catch {
                        try {
                          var a = new (self.BlobBuilder ||
                            self.WebKitBlobBuilder ||
                            self.MozBlobBuilder ||
                            self.MSBlobBuilder)();
                          return a.append(n), a.getBlob(l);
                        } catch {
                          throw new Error("Bug : can't construct the Blob.");
                        }
                      }
                    });
                  var m = {
                    stringifyByChunk: function (n, l, a) {
                      var p = [],
                        w = 0,
                        S = n.length;
                      if (S <= a) return String.fromCharCode.apply(null, n);
                      for (; w < S; )
                        l === "array" || l === "nodebuffer"
                          ? p.push(
                              String.fromCharCode.apply(
                                null,
                                n.slice(w, Math.min(w + a, S))
                              )
                            )
                          : p.push(
                              String.fromCharCode.apply(
                                null,
                                n.subarray(w, Math.min(w + a, S))
                              )
                            ),
                          (w += a);
                      return p.join("");
                    },
                    stringifyByChar: function (n) {
                      for (var l = "", a = 0; a < n.length; a++)
                        l += String.fromCharCode(n[a]);
                      return l;
                    },
                    applyCanBeUsed: {
                      uint8array: (function () {
                        try {
                          return (
                            o.uint8array &&
                            String.fromCharCode.apply(null, new Uint8Array(1))
                              .length === 1
                          );
                        } catch {
                          return !1;
                        }
                      })(),
                      nodebuffer: (function () {
                        try {
                          return (
                            o.nodebuffer &&
                            String.fromCharCode.apply(null, r.allocBuffer(1))
                              .length === 1
                          );
                        } catch {
                          return !1;
                        }
                      })(),
                    },
                  };
                  function v(n) {
                    var l = 65536,
                      a = _.getTypeOf(n),
                      p = !0;
                    if (
                      (a === "uint8array"
                        ? (p = m.applyCanBeUsed.uint8array)
                        : a === "nodebuffer" &&
                          (p = m.applyCanBeUsed.nodebuffer),
                      p)
                    )
                      for (; 1 < l; )
                        try {
                          return m.stringifyByChunk(n, a, l);
                        } catch {
                          l = Math.floor(l / 2);
                        }
                    return m.stringifyByChar(n);
                  }
                  function i(n, l) {
                    for (var a = 0; a < n.length; a++) l[a] = n[a];
                    return l;
                  }
                  _.applyFromCharCode = v;
                  var d = {};
                  (d.string = {
                    string: b,
                    array: function (n) {
                      return y(n, new Array(n.length));
                    },
                    arraybuffer: function (n) {
                      return d.string.uint8array(n).buffer;
                    },
                    uint8array: function (n) {
                      return y(n, new Uint8Array(n.length));
                    },
                    nodebuffer: function (n) {
                      return y(n, r.allocBuffer(n.length));
                    },
                  }),
                    (d.array = {
                      string: v,
                      array: b,
                      arraybuffer: function (n) {
                        return new Uint8Array(n).buffer;
                      },
                      uint8array: function (n) {
                        return new Uint8Array(n);
                      },
                      nodebuffer: function (n) {
                        return r.newBufferFrom(n);
                      },
                    }),
                    (d.arraybuffer = {
                      string: function (n) {
                        return v(new Uint8Array(n));
                      },
                      array: function (n) {
                        return i(new Uint8Array(n), new Array(n.byteLength));
                      },
                      arraybuffer: b,
                      uint8array: function (n) {
                        return new Uint8Array(n);
                      },
                      nodebuffer: function (n) {
                        return r.newBufferFrom(new Uint8Array(n));
                      },
                    }),
                    (d.uint8array = {
                      string: v,
                      array: function (n) {
                        return i(n, new Array(n.length));
                      },
                      arraybuffer: function (n) {
                        return n.buffer;
                      },
                      uint8array: b,
                      nodebuffer: function (n) {
                        return r.newBufferFrom(n);
                      },
                    }),
                    (d.nodebuffer = {
                      string: v,
                      array: function (n) {
                        return i(n, new Array(n.length));
                      },
                      arraybuffer: function (n) {
                        return d.nodebuffer.uint8array(n).buffer;
                      },
                      uint8array: function (n) {
                        return i(n, new Uint8Array(n.length));
                      },
                      nodebuffer: b,
                    }),
                    (_.transformTo = function (n, l) {
                      if (((l = l || ""), !n)) return l;
                      _.checkSupport(n);
                      var a = _.getTypeOf(l);
                      return d[a][n](l);
                    }),
                    (_.resolve = function (n) {
                      for (
                        var l = n.split("/"), a = [], p = 0;
                        p < l.length;
                        p++
                      ) {
                        var w = l[p];
                        w === "." ||
                          (w === "" && p !== 0 && p !== l.length - 1) ||
                          (w === ".." ? a.pop() : a.push(w));
                      }
                      return a.join("/");
                    }),
                    (_.getTypeOf = function (n) {
                      return typeof n == "string"
                        ? "string"
                        : Object.prototype.toString.call(n) === "[object Array]"
                        ? "array"
                        : o.nodebuffer && r.isBuffer(n)
                        ? "nodebuffer"
                        : o.uint8array && n instanceof Uint8Array
                        ? "uint8array"
                        : o.arraybuffer && n instanceof ArrayBuffer
                        ? "arraybuffer"
                        : void 0;
                    }),
                    (_.checkSupport = function (n) {
                      if (!o[n.toLowerCase()])
                        throw new Error(
                          n + " is not supported by this platform"
                        );
                    }),
                    (_.MAX_VALUE_16BITS = 65535),
                    (_.MAX_VALUE_32BITS = -1),
                    (_.pretty = function (n) {
                      var l,
                        a,
                        p = "";
                      for (a = 0; a < (n || "").length; a++)
                        p +=
                          "\\x" +
                          ((l = n.charCodeAt(a)) < 16 ? "0" : "") +
                          l.toString(16).toUpperCase();
                      return p;
                    }),
                    (_.delay = function (n, l, a) {
                      setImmediate(function () {
                        n.apply(a || null, l || []);
                      });
                    }),
                    (_.inherits = function (n, l) {
                      function a() {}
                      (a.prototype = l.prototype), (n.prototype = new a());
                    }),
                    (_.extend = function () {
                      var n,
                        l,
                        a = {};
                      for (n = 0; n < arguments.length; n++)
                        for (l in arguments[n])
                          Object.prototype.hasOwnProperty.call(
                            arguments[n],
                            l
                          ) &&
                            a[l] === void 0 &&
                            (a[l] = arguments[n][l]);
                      return a;
                    }),
                    (_.prepareContent = function (n, l, a, p, w) {
                      return h.Promise.resolve(l)
                        .then(function (S) {
                          return o.blob &&
                            (S instanceof Blob ||
                              ["[object File]", "[object Blob]"].indexOf(
                                Object.prototype.toString.call(S)
                              ) !== -1) &&
                            typeof FileReader < "u"
                            ? new h.Promise(function (x, F) {
                                var B = new FileReader();
                                (B.onload = function (P) {
                                  x(P.target.result);
                                }),
                                  (B.onerror = function (P) {
                                    F(P.target.error);
                                  }),
                                  B.readAsArrayBuffer(S);
                              })
                            : S;
                        })
                        .then(function (S) {
                          var x = _.getTypeOf(S);
                          return x
                            ? (x === "arraybuffer"
                                ? (S = _.transformTo("uint8array", S))
                                : x === "string" &&
                                  (w
                                    ? (S = s.decode(S))
                                    : a &&
                                      p !== !0 &&
                                      (S = (function (F) {
                                        return y(
                                          F,
                                          o.uint8array
                                            ? new Uint8Array(F.length)
                                            : new Array(F.length)
                                        );
                                      })(S))),
                              S)
                            : h.Promise.reject(
                                new Error(
                                  "Can't read the data of '" +
                                    n +
                                    "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"
                                )
                              );
                        });
                    });
                },
                {
                  "./base64": 1,
                  "./external": 6,
                  "./nodejsUtils": 14,
                  "./support": 30,
                  setimmediate: 54,
                },
              ],
              33: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./reader/readerFor"),
                    s = c("./utils"),
                    r = c("./signature"),
                    h = c("./zipEntry"),
                    b = c("./support");
                  function y(m) {
                    (this.files = []), (this.loadOptions = m);
                  }
                  (y.prototype = {
                    checkSignature: function (m) {
                      if (!this.reader.readAndCheckSignature(m)) {
                        this.reader.index -= 4;
                        var v = this.reader.readString(4);
                        throw new Error(
                          "Corrupted zip or bug: unexpected signature (" +
                            s.pretty(v) +
                            ", expected " +
                            s.pretty(m) +
                            ")"
                        );
                      }
                    },
                    isSignature: function (m, v) {
                      var i = this.reader.index;
                      this.reader.setIndex(m);
                      var d = this.reader.readString(4) === v;
                      return this.reader.setIndex(i), d;
                    },
                    readBlockEndOfCentral: function () {
                      (this.diskNumber = this.reader.readInt(2)),
                        (this.diskWithCentralDirStart = this.reader.readInt(2)),
                        (this.centralDirRecordsOnThisDisk =
                          this.reader.readInt(2)),
                        (this.centralDirRecords = this.reader.readInt(2)),
                        (this.centralDirSize = this.reader.readInt(4)),
                        (this.centralDirOffset = this.reader.readInt(4)),
                        (this.zipCommentLength = this.reader.readInt(2));
                      var m = this.reader.readData(this.zipCommentLength),
                        v = b.uint8array ? "uint8array" : "array",
                        i = s.transformTo(v, m);
                      this.zipComment = this.loadOptions.decodeFileName(i);
                    },
                    readBlockZip64EndOfCentral: function () {
                      (this.zip64EndOfCentralSize = this.reader.readInt(8)),
                        this.reader.skip(4),
                        (this.diskNumber = this.reader.readInt(4)),
                        (this.diskWithCentralDirStart = this.reader.readInt(4)),
                        (this.centralDirRecordsOnThisDisk =
                          this.reader.readInt(8)),
                        (this.centralDirRecords = this.reader.readInt(8)),
                        (this.centralDirSize = this.reader.readInt(8)),
                        (this.centralDirOffset = this.reader.readInt(8)),
                        (this.zip64ExtensibleData = {});
                      for (
                        var m, v, i, d = this.zip64EndOfCentralSize - 44;
                        0 < d;

                      )
                        (m = this.reader.readInt(2)),
                          (v = this.reader.readInt(4)),
                          (i = this.reader.readData(v)),
                          (this.zip64ExtensibleData[m] = {
                            id: m,
                            length: v,
                            value: i,
                          });
                    },
                    readBlockZip64EndOfCentralLocator: function () {
                      if (
                        ((this.diskWithZip64CentralDirStart =
                          this.reader.readInt(4)),
                        (this.relativeOffsetEndOfZip64CentralDir =
                          this.reader.readInt(8)),
                        (this.disksCount = this.reader.readInt(4)),
                        1 < this.disksCount)
                      )
                        throw new Error("Multi-volumes zip are not supported");
                    },
                    readLocalFiles: function () {
                      var m, v;
                      for (m = 0; m < this.files.length; m++)
                        (v = this.files[m]),
                          this.reader.setIndex(v.localHeaderOffset),
                          this.checkSignature(r.LOCAL_FILE_HEADER),
                          v.readLocalPart(this.reader),
                          v.handleUTF8(),
                          v.processAttributes();
                    },
                    readCentralDir: function () {
                      var m;
                      for (
                        this.reader.setIndex(this.centralDirOffset);
                        this.reader.readAndCheckSignature(
                          r.CENTRAL_FILE_HEADER
                        );

                      )
                        (m = new h(
                          { zip64: this.zip64 },
                          this.loadOptions
                        )).readCentralPart(this.reader),
                          this.files.push(m);
                      if (
                        this.centralDirRecords !== this.files.length &&
                        this.centralDirRecords !== 0 &&
                        this.files.length === 0
                      )
                        throw new Error(
                          "Corrupted zip or bug: expected " +
                            this.centralDirRecords +
                            " records in central dir, got " +
                            this.files.length
                        );
                    },
                    readEndOfCentral: function () {
                      var m = this.reader.lastIndexOfSignature(
                        r.CENTRAL_DIRECTORY_END
                      );
                      if (m < 0)
                        throw this.isSignature(0, r.LOCAL_FILE_HEADER)
                          ? new Error(
                              "Corrupted zip: can't find end of central directory"
                            )
                          : new Error(
                              "Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"
                            );
                      this.reader.setIndex(m);
                      var v = m;
                      if (
                        (this.checkSignature(r.CENTRAL_DIRECTORY_END),
                        this.readBlockEndOfCentral(),
                        this.diskNumber === s.MAX_VALUE_16BITS ||
                          this.diskWithCentralDirStart === s.MAX_VALUE_16BITS ||
                          this.centralDirRecordsOnThisDisk ===
                            s.MAX_VALUE_16BITS ||
                          this.centralDirRecords === s.MAX_VALUE_16BITS ||
                          this.centralDirSize === s.MAX_VALUE_32BITS ||
                          this.centralDirOffset === s.MAX_VALUE_32BITS)
                      ) {
                        if (
                          ((this.zip64 = !0),
                          (m = this.reader.lastIndexOfSignature(
                            r.ZIP64_CENTRAL_DIRECTORY_LOCATOR
                          )) < 0)
                        )
                          throw new Error(
                            "Corrupted zip: can't find the ZIP64 end of central directory locator"
                          );
                        if (
                          (this.reader.setIndex(m),
                          this.checkSignature(
                            r.ZIP64_CENTRAL_DIRECTORY_LOCATOR
                          ),
                          this.readBlockZip64EndOfCentralLocator(),
                          !this.isSignature(
                            this.relativeOffsetEndOfZip64CentralDir,
                            r.ZIP64_CENTRAL_DIRECTORY_END
                          ) &&
                            ((this.relativeOffsetEndOfZip64CentralDir =
                              this.reader.lastIndexOfSignature(
                                r.ZIP64_CENTRAL_DIRECTORY_END
                              )),
                            this.relativeOffsetEndOfZip64CentralDir < 0))
                        )
                          throw new Error(
                            "Corrupted zip: can't find the ZIP64 end of central directory"
                          );
                        this.reader.setIndex(
                          this.relativeOffsetEndOfZip64CentralDir
                        ),
                          this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END),
                          this.readBlockZip64EndOfCentral();
                      }
                      var i = this.centralDirOffset + this.centralDirSize;
                      this.zip64 &&
                        ((i += 20), (i += 12 + this.zip64EndOfCentralSize));
                      var d = v - i;
                      if (0 < d)
                        this.isSignature(v, r.CENTRAL_FILE_HEADER) ||
                          (this.reader.zero = d);
                      else if (d < 0)
                        throw new Error(
                          "Corrupted zip: missing " + Math.abs(d) + " bytes."
                        );
                    },
                    prepareReader: function (m) {
                      this.reader = o(m);
                    },
                    load: function (m) {
                      this.prepareReader(m),
                        this.readEndOfCentral(),
                        this.readCentralDir(),
                        this.readLocalFiles();
                    },
                  }),
                    (A.exports = y);
                },
                {
                  "./reader/readerFor": 22,
                  "./signature": 23,
                  "./support": 30,
                  "./utils": 32,
                  "./zipEntry": 34,
                },
              ],
              34: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./reader/readerFor"),
                    s = c("./utils"),
                    r = c("./compressedObject"),
                    h = c("./crc32"),
                    b = c("./utf8"),
                    y = c("./compressions"),
                    m = c("./support");
                  function v(i, d) {
                    (this.options = i), (this.loadOptions = d);
                  }
                  (v.prototype = {
                    isEncrypted: function () {
                      return (1 & this.bitFlag) == 1;
                    },
                    useUTF8: function () {
                      return (2048 & this.bitFlag) == 2048;
                    },
                    readLocalPart: function (i) {
                      var d, n;
                      if (
                        (i.skip(22),
                        (this.fileNameLength = i.readInt(2)),
                        (n = i.readInt(2)),
                        (this.fileName = i.readData(this.fileNameLength)),
                        i.skip(n),
                        this.compressedSize === -1 ||
                          this.uncompressedSize === -1)
                      )
                        throw new Error(
                          "Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)"
                        );
                      if (
                        (d = (function (l) {
                          for (var a in y)
                            if (
                              Object.prototype.hasOwnProperty.call(y, a) &&
                              y[a].magic === l
                            )
                              return y[a];
                          return null;
                        })(this.compressionMethod)) === null
                      )
                        throw new Error(
                          "Corrupted zip : compression " +
                            s.pretty(this.compressionMethod) +
                            " unknown (inner file : " +
                            s.transformTo("string", this.fileName) +
                            ")"
                        );
                      this.decompressed = new r(
                        this.compressedSize,
                        this.uncompressedSize,
                        this.crc32,
                        d,
                        i.readData(this.compressedSize)
                      );
                    },
                    readCentralPart: function (i) {
                      (this.versionMadeBy = i.readInt(2)),
                        i.skip(2),
                        (this.bitFlag = i.readInt(2)),
                        (this.compressionMethod = i.readString(2)),
                        (this.date = i.readDate()),
                        (this.crc32 = i.readInt(4)),
                        (this.compressedSize = i.readInt(4)),
                        (this.uncompressedSize = i.readInt(4));
                      var d = i.readInt(2);
                      if (
                        ((this.extraFieldsLength = i.readInt(2)),
                        (this.fileCommentLength = i.readInt(2)),
                        (this.diskNumberStart = i.readInt(2)),
                        (this.internalFileAttributes = i.readInt(2)),
                        (this.externalFileAttributes = i.readInt(4)),
                        (this.localHeaderOffset = i.readInt(4)),
                        this.isEncrypted())
                      )
                        throw new Error("Encrypted zip are not supported");
                      i.skip(d),
                        this.readExtraFields(i),
                        this.parseZIP64ExtraField(i),
                        (this.fileComment = i.readData(this.fileCommentLength));
                    },
                    processAttributes: function () {
                      (this.unixPermissions = null),
                        (this.dosPermissions = null);
                      var i = this.versionMadeBy >> 8;
                      (this.dir = !!(16 & this.externalFileAttributes)),
                        i == 0 &&
                          (this.dosPermissions =
                            63 & this.externalFileAttributes),
                        i == 3 &&
                          (this.unixPermissions =
                            (this.externalFileAttributes >> 16) & 65535),
                        this.dir ||
                          this.fileNameStr.slice(-1) !== "/" ||
                          (this.dir = !0);
                    },
                    parseZIP64ExtraField: function () {
                      if (this.extraFields[1]) {
                        var i = o(this.extraFields[1].value);
                        this.uncompressedSize === s.MAX_VALUE_32BITS &&
                          (this.uncompressedSize = i.readInt(8)),
                          this.compressedSize === s.MAX_VALUE_32BITS &&
                            (this.compressedSize = i.readInt(8)),
                          this.localHeaderOffset === s.MAX_VALUE_32BITS &&
                            (this.localHeaderOffset = i.readInt(8)),
                          this.diskNumberStart === s.MAX_VALUE_32BITS &&
                            (this.diskNumberStart = i.readInt(4));
                      }
                    },
                    readExtraFields: function (i) {
                      var d,
                        n,
                        l,
                        a = i.index + this.extraFieldsLength;
                      for (
                        this.extraFields || (this.extraFields = {});
                        i.index + 4 < a;

                      )
                        (d = i.readInt(2)),
                          (n = i.readInt(2)),
                          (l = i.readData(n)),
                          (this.extraFields[d] = {
                            id: d,
                            length: n,
                            value: l,
                          });
                      i.setIndex(a);
                    },
                    handleUTF8: function () {
                      var i = m.uint8array ? "uint8array" : "array";
                      if (this.useUTF8())
                        (this.fileNameStr = b.utf8decode(this.fileName)),
                          (this.fileCommentStr = b.utf8decode(
                            this.fileComment
                          ));
                      else {
                        var d = this.findExtraFieldUnicodePath();
                        if (d !== null) this.fileNameStr = d;
                        else {
                          var n = s.transformTo(i, this.fileName);
                          this.fileNameStr = this.loadOptions.decodeFileName(n);
                        }
                        var l = this.findExtraFieldUnicodeComment();
                        if (l !== null) this.fileCommentStr = l;
                        else {
                          var a = s.transformTo(i, this.fileComment);
                          this.fileCommentStr =
                            this.loadOptions.decodeFileName(a);
                        }
                      }
                    },
                    findExtraFieldUnicodePath: function () {
                      var i = this.extraFields[28789];
                      if (i) {
                        var d = o(i.value);
                        return d.readInt(1) !== 1 ||
                          h(this.fileName) !== d.readInt(4)
                          ? null
                          : b.utf8decode(d.readData(i.length - 5));
                      }
                      return null;
                    },
                    findExtraFieldUnicodeComment: function () {
                      var i = this.extraFields[25461];
                      if (i) {
                        var d = o(i.value);
                        return d.readInt(1) !== 1 ||
                          h(this.fileComment) !== d.readInt(4)
                          ? null
                          : b.utf8decode(d.readData(i.length - 5));
                      }
                      return null;
                    },
                  }),
                    (A.exports = v);
                },
                {
                  "./compressedObject": 2,
                  "./compressions": 3,
                  "./crc32": 4,
                  "./reader/readerFor": 22,
                  "./support": 30,
                  "./utf8": 31,
                  "./utils": 32,
                },
              ],
              35: [
                function (c, A, _) {
                  "use strict";
                  function o(d, n, l) {
                    (this.name = d),
                      (this.dir = l.dir),
                      (this.date = l.date),
                      (this.comment = l.comment),
                      (this.unixPermissions = l.unixPermissions),
                      (this.dosPermissions = l.dosPermissions),
                      (this._data = n),
                      (this._dataBinary = l.binary),
                      (this.options = {
                        compression: l.compression,
                        compressionOptions: l.compressionOptions,
                      });
                  }
                  var s = c("./stream/StreamHelper"),
                    r = c("./stream/DataWorker"),
                    h = c("./utf8"),
                    b = c("./compressedObject"),
                    y = c("./stream/GenericWorker");
                  o.prototype = {
                    internalStream: function (d) {
                      var n = null,
                        l = "string";
                      try {
                        if (!d) throw new Error("No output type specified.");
                        var a =
                          (l = d.toLowerCase()) === "string" || l === "text";
                        (l !== "binarystring" && l !== "text") ||
                          (l = "string"),
                          (n = this._decompressWorker());
                        var p = !this._dataBinary;
                        p && !a && (n = n.pipe(new h.Utf8EncodeWorker())),
                          !p && a && (n = n.pipe(new h.Utf8DecodeWorker()));
                      } catch (w) {
                        (n = new y("error")).error(w);
                      }
                      return new s(n, l, "");
                    },
                    async: function (d, n) {
                      return this.internalStream(d).accumulate(n);
                    },
                    nodeStream: function (d, n) {
                      return this.internalStream(
                        d || "nodebuffer"
                      ).toNodejsStream(n);
                    },
                    _compressWorker: function (d, n) {
                      if (
                        this._data instanceof b &&
                        this._data.compression.magic === d.magic
                      )
                        return this._data.getCompressedWorker();
                      var l = this._decompressWorker();
                      return (
                        this._dataBinary ||
                          (l = l.pipe(new h.Utf8EncodeWorker())),
                        b.createWorkerFrom(l, d, n)
                      );
                    },
                    _decompressWorker: function () {
                      return this._data instanceof b
                        ? this._data.getContentWorker()
                        : this._data instanceof y
                        ? this._data
                        : new r(this._data);
                    },
                  };
                  for (
                    var m = [
                        "asText",
                        "asBinary",
                        "asNodeBuffer",
                        "asUint8Array",
                        "asArrayBuffer",
                      ],
                      v = function () {
                        throw new Error(
                          "This method has been removed in JSZip 3.0, please check the upgrade guide."
                        );
                      },
                      i = 0;
                    i < m.length;
                    i++
                  )
                    o.prototype[m[i]] = v;
                  A.exports = o;
                },
                {
                  "./compressedObject": 2,
                  "./stream/DataWorker": 27,
                  "./stream/GenericWorker": 28,
                  "./stream/StreamHelper": 29,
                  "./utf8": 31,
                },
              ],
              36: [
                function (c, A, _) {
                  (function (o) {
                    "use strict";
                    var s,
                      r,
                      h = o.MutationObserver || o.WebKitMutationObserver;
                    if (h) {
                      var b = 0,
                        y = new h(d),
                        m = o.document.createTextNode("");
                      y.observe(m, { characterData: !0 }),
                        (s = function () {
                          m.data = b = ++b % 2;
                        });
                    } else if (o.setImmediate || o.MessageChannel === void 0)
                      s =
                        "document" in o &&
                        "onreadystatechange" in
                          o.document.createElement("script")
                          ? function () {
                              var n = o.document.createElement("script");
                              (n.onreadystatechange = function () {
                                d(),
                                  (n.onreadystatechange = null),
                                  n.parentNode.removeChild(n),
                                  (n = null);
                              }),
                                o.document.documentElement.appendChild(n);
                            }
                          : function () {
                              setTimeout(d, 0);
                            };
                    else {
                      var v = new o.MessageChannel();
                      (v.port1.onmessage = d),
                        (s = function () {
                          v.port2.postMessage(0);
                        });
                    }
                    var i = [];
                    function d() {
                      var n, l;
                      r = !0;
                      for (var a = i.length; a; ) {
                        for (l = i, i = [], n = -1; ++n < a; ) l[n]();
                        a = i.length;
                      }
                      r = !1;
                    }
                    A.exports = function (n) {
                      i.push(n) !== 1 || r || s();
                    };
                  }).call(
                    this,
                    typeof global < "u"
                      ? global
                      : typeof self < "u"
                      ? self
                      : typeof window < "u"
                      ? window
                      : {}
                  );
                },
                {},
              ],
              37: [
                function (c, A, _) {
                  "use strict";
                  var o = c("immediate");
                  function s() {}
                  var r = {},
                    h = ["REJECTED"],
                    b = ["FULFILLED"],
                    y = ["PENDING"];
                  function m(a) {
                    if (typeof a != "function")
                      throw new TypeError("resolver must be a function");
                    (this.state = y),
                      (this.queue = []),
                      (this.outcome = void 0),
                      a !== s && n(this, a);
                  }
                  function v(a, p, w) {
                    (this.promise = a),
                      typeof p == "function" &&
                        ((this.onFulfilled = p),
                        (this.callFulfilled = this.otherCallFulfilled)),
                      typeof w == "function" &&
                        ((this.onRejected = w),
                        (this.callRejected = this.otherCallRejected));
                  }
                  function i(a, p, w) {
                    o(function () {
                      var S;
                      try {
                        S = p(w);
                      } catch (x) {
                        return r.reject(a, x);
                      }
                      S === a
                        ? r.reject(
                            a,
                            new TypeError("Cannot resolve promise with itself")
                          )
                        : r.resolve(a, S);
                    });
                  }
                  function d(a) {
                    var p = a && a.then;
                    if (
                      a &&
                      (typeof a == "object" || typeof a == "function") &&
                      typeof p == "function"
                    )
                      return function () {
                        p.apply(a, arguments);
                      };
                  }
                  function n(a, p) {
                    var w = !1;
                    function S(B) {
                      w || ((w = !0), r.reject(a, B));
                    }
                    function x(B) {
                      w || ((w = !0), r.resolve(a, B));
                    }
                    var F = l(function () {
                      p(x, S);
                    });
                    F.status === "error" && S(F.value);
                  }
                  function l(a, p) {
                    var w = {};
                    try {
                      (w.value = a(p)), (w.status = "success");
                    } catch (S) {
                      (w.status = "error"), (w.value = S);
                    }
                    return w;
                  }
                  ((A.exports = m).prototype.finally = function (a) {
                    if (typeof a != "function") return this;
                    var p = this.constructor;
                    return this.then(
                      function (w) {
                        return p.resolve(a()).then(function () {
                          return w;
                        });
                      },
                      function (w) {
                        return p.resolve(a()).then(function () {
                          throw w;
                        });
                      }
                    );
                  }),
                    (m.prototype.catch = function (a) {
                      return this.then(null, a);
                    }),
                    (m.prototype.then = function (a, p) {
                      if (
                        (typeof a != "function" && this.state === b) ||
                        (typeof p != "function" && this.state === h)
                      )
                        return this;
                      var w = new this.constructor(s);
                      return (
                        this.state !== y
                          ? i(w, this.state === b ? a : p, this.outcome)
                          : this.queue.push(new v(w, a, p)),
                        w
                      );
                    }),
                    (v.prototype.callFulfilled = function (a) {
                      r.resolve(this.promise, a);
                    }),
                    (v.prototype.otherCallFulfilled = function (a) {
                      i(this.promise, this.onFulfilled, a);
                    }),
                    (v.prototype.callRejected = function (a) {
                      r.reject(this.promise, a);
                    }),
                    (v.prototype.otherCallRejected = function (a) {
                      i(this.promise, this.onRejected, a);
                    }),
                    (r.resolve = function (a, p) {
                      var w = l(d, p);
                      if (w.status === "error") return r.reject(a, w.value);
                      var S = w.value;
                      if (S) n(a, S);
                      else {
                        (a.state = b), (a.outcome = p);
                        for (var x = -1, F = a.queue.length; ++x < F; )
                          a.queue[x].callFulfilled(p);
                      }
                      return a;
                    }),
                    (r.reject = function (a, p) {
                      (a.state = h), (a.outcome = p);
                      for (var w = -1, S = a.queue.length; ++w < S; )
                        a.queue[w].callRejected(p);
                      return a;
                    }),
                    (m.resolve = function (a) {
                      return a instanceof this ? a : r.resolve(new this(s), a);
                    }),
                    (m.reject = function (a) {
                      var p = new this(s);
                      return r.reject(p, a);
                    }),
                    (m.all = function (a) {
                      var p = this;
                      if (
                        Object.prototype.toString.call(a) !== "[object Array]"
                      )
                        return this.reject(new TypeError("must be an array"));
                      var w = a.length,
                        S = !1;
                      if (!w) return this.resolve([]);
                      for (
                        var x = new Array(w), F = 0, B = -1, P = new this(s);
                        ++B < w;

                      )
                        O(a[B], B);
                      return P;
                      function O(M, X) {
                        p.resolve(M).then(
                          function (g) {
                            (x[X] = g),
                              ++F !== w || S || ((S = !0), r.resolve(P, x));
                          },
                          function (g) {
                            S || ((S = !0), r.reject(P, g));
                          }
                        );
                      }
                    }),
                    (m.race = function (a) {
                      var p = this;
                      if (
                        Object.prototype.toString.call(a) !== "[object Array]"
                      )
                        return this.reject(new TypeError("must be an array"));
                      var w = a.length,
                        S = !1;
                      if (!w) return this.resolve([]);
                      for (var x = -1, F = new this(s); ++x < w; )
                        (B = a[x]),
                          p.resolve(B).then(
                            function (P) {
                              S || ((S = !0), r.resolve(F, P));
                            },
                            function (P) {
                              S || ((S = !0), r.reject(F, P));
                            }
                          );
                      var B;
                      return F;
                    });
                },
                { immediate: 36 },
              ],
              38: [
                function (c, A, _) {
                  "use strict";
                  var o = {};
                  (0, c("./lib/utils/common").assign)(
                    o,
                    c("./lib/deflate"),
                    c("./lib/inflate"),
                    c("./lib/zlib/constants")
                  ),
                    (A.exports = o);
                },
                {
                  "./lib/deflate": 39,
                  "./lib/inflate": 40,
                  "./lib/utils/common": 41,
                  "./lib/zlib/constants": 44,
                },
              ],
              39: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./zlib/deflate"),
                    s = c("./utils/common"),
                    r = c("./utils/strings"),
                    h = c("./zlib/messages"),
                    b = c("./zlib/zstream"),
                    y = Object.prototype.toString,
                    m = 0,
                    v = -1,
                    i = 0,
                    d = 8;
                  function n(a) {
                    if (!(this instanceof n)) return new n(a);
                    this.options = s.assign(
                      {
                        level: v,
                        method: d,
                        chunkSize: 16384,
                        windowBits: 15,
                        memLevel: 8,
                        strategy: i,
                        to: "",
                      },
                      a || {}
                    );
                    var p = this.options;
                    p.raw && 0 < p.windowBits
                      ? (p.windowBits = -p.windowBits)
                      : p.gzip &&
                        0 < p.windowBits &&
                        p.windowBits < 16 &&
                        (p.windowBits += 16),
                      (this.err = 0),
                      (this.msg = ""),
                      (this.ended = !1),
                      (this.chunks = []),
                      (this.strm = new b()),
                      (this.strm.avail_out = 0);
                    var w = o.deflateInit2(
                      this.strm,
                      p.level,
                      p.method,
                      p.windowBits,
                      p.memLevel,
                      p.strategy
                    );
                    if (w !== m) throw new Error(h[w]);
                    if (
                      (p.header && o.deflateSetHeader(this.strm, p.header),
                      p.dictionary)
                    ) {
                      var S;
                      if (
                        ((S =
                          typeof p.dictionary == "string"
                            ? r.string2buf(p.dictionary)
                            : y.call(p.dictionary) === "[object ArrayBuffer]"
                            ? new Uint8Array(p.dictionary)
                            : p.dictionary),
                        (w = o.deflateSetDictionary(this.strm, S)) !== m)
                      )
                        throw new Error(h[w]);
                      this._dict_set = !0;
                    }
                  }
                  function l(a, p) {
                    var w = new n(p);
                    if ((w.push(a, !0), w.err)) throw w.msg || h[w.err];
                    return w.result;
                  }
                  (n.prototype.push = function (a, p) {
                    var w,
                      S,
                      x = this.strm,
                      F = this.options.chunkSize;
                    if (this.ended) return !1;
                    (S = p === ~~p ? p : p === !0 ? 4 : 0),
                      typeof a == "string"
                        ? (x.input = r.string2buf(a))
                        : y.call(a) === "[object ArrayBuffer]"
                        ? (x.input = new Uint8Array(a))
                        : (x.input = a),
                      (x.next_in = 0),
                      (x.avail_in = x.input.length);
                    do {
                      if (
                        (x.avail_out === 0 &&
                          ((x.output = new s.Buf8(F)),
                          (x.next_out = 0),
                          (x.avail_out = F)),
                        (w = o.deflate(x, S)) !== 1 && w !== m)
                      )
                        return this.onEnd(w), !(this.ended = !0);
                      (x.avail_out !== 0 &&
                        (x.avail_in !== 0 || (S !== 4 && S !== 2))) ||
                        (this.options.to === "string"
                          ? this.onData(
                              r.buf2binstring(s.shrinkBuf(x.output, x.next_out))
                            )
                          : this.onData(s.shrinkBuf(x.output, x.next_out)));
                    } while ((0 < x.avail_in || x.avail_out === 0) && w !== 1);
                    return S === 4
                      ? ((w = o.deflateEnd(this.strm)),
                        this.onEnd(w),
                        (this.ended = !0),
                        w === m)
                      : S !== 2 || (this.onEnd(m), !(x.avail_out = 0));
                  }),
                    (n.prototype.onData = function (a) {
                      this.chunks.push(a);
                    }),
                    (n.prototype.onEnd = function (a) {
                      a === m &&
                        (this.options.to === "string"
                          ? (this.result = this.chunks.join(""))
                          : (this.result = s.flattenChunks(this.chunks))),
                        (this.chunks = []),
                        (this.err = a),
                        (this.msg = this.strm.msg);
                    }),
                    (_.Deflate = n),
                    (_.deflate = l),
                    (_.deflateRaw = function (a, p) {
                      return ((p = p || {}).raw = !0), l(a, p);
                    }),
                    (_.gzip = function (a, p) {
                      return ((p = p || {}).gzip = !0), l(a, p);
                    });
                },
                {
                  "./utils/common": 41,
                  "./utils/strings": 42,
                  "./zlib/deflate": 46,
                  "./zlib/messages": 51,
                  "./zlib/zstream": 53,
                },
              ],
              40: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./zlib/inflate"),
                    s = c("./utils/common"),
                    r = c("./utils/strings"),
                    h = c("./zlib/constants"),
                    b = c("./zlib/messages"),
                    y = c("./zlib/zstream"),
                    m = c("./zlib/gzheader"),
                    v = Object.prototype.toString;
                  function i(n) {
                    if (!(this instanceof i)) return new i(n);
                    this.options = s.assign(
                      { chunkSize: 16384, windowBits: 0, to: "" },
                      n || {}
                    );
                    var l = this.options;
                    l.raw &&
                      0 <= l.windowBits &&
                      l.windowBits < 16 &&
                      ((l.windowBits = -l.windowBits),
                      l.windowBits === 0 && (l.windowBits = -15)),
                      !(0 <= l.windowBits && l.windowBits < 16) ||
                        (n && n.windowBits) ||
                        (l.windowBits += 32),
                      15 < l.windowBits &&
                        l.windowBits < 48 &&
                        !(15 & l.windowBits) &&
                        (l.windowBits |= 15),
                      (this.err = 0),
                      (this.msg = ""),
                      (this.ended = !1),
                      (this.chunks = []),
                      (this.strm = new y()),
                      (this.strm.avail_out = 0);
                    var a = o.inflateInit2(this.strm, l.windowBits);
                    if (a !== h.Z_OK) throw new Error(b[a]);
                    (this.header = new m()),
                      o.inflateGetHeader(this.strm, this.header);
                  }
                  function d(n, l) {
                    var a = new i(l);
                    if ((a.push(n, !0), a.err)) throw a.msg || b[a.err];
                    return a.result;
                  }
                  (i.prototype.push = function (n, l) {
                    var a,
                      p,
                      w,
                      S,
                      x,
                      F,
                      B = this.strm,
                      P = this.options.chunkSize,
                      O = this.options.dictionary,
                      M = !1;
                    if (this.ended) return !1;
                    (p = l === ~~l ? l : l === !0 ? h.Z_FINISH : h.Z_NO_FLUSH),
                      typeof n == "string"
                        ? (B.input = r.binstring2buf(n))
                        : v.call(n) === "[object ArrayBuffer]"
                        ? (B.input = new Uint8Array(n))
                        : (B.input = n),
                      (B.next_in = 0),
                      (B.avail_in = B.input.length);
                    do {
                      if (
                        (B.avail_out === 0 &&
                          ((B.output = new s.Buf8(P)),
                          (B.next_out = 0),
                          (B.avail_out = P)),
                        (a = o.inflate(B, h.Z_NO_FLUSH)) === h.Z_NEED_DICT &&
                          O &&
                          ((F =
                            typeof O == "string"
                              ? r.string2buf(O)
                              : v.call(O) === "[object ArrayBuffer]"
                              ? new Uint8Array(O)
                              : O),
                          (a = o.inflateSetDictionary(this.strm, F))),
                        a === h.Z_BUF_ERROR &&
                          M === !0 &&
                          ((a = h.Z_OK), (M = !1)),
                        a !== h.Z_STREAM_END && a !== h.Z_OK)
                      )
                        return this.onEnd(a), !(this.ended = !0);
                      B.next_out &&
                        ((B.avail_out !== 0 &&
                          a !== h.Z_STREAM_END &&
                          (B.avail_in !== 0 ||
                            (p !== h.Z_FINISH && p !== h.Z_SYNC_FLUSH))) ||
                          (this.options.to === "string"
                            ? ((w = r.utf8border(B.output, B.next_out)),
                              (S = B.next_out - w),
                              (x = r.buf2string(B.output, w)),
                              (B.next_out = S),
                              (B.avail_out = P - S),
                              S && s.arraySet(B.output, B.output, w, S, 0),
                              this.onData(x))
                            : this.onData(s.shrinkBuf(B.output, B.next_out)))),
                        B.avail_in === 0 && B.avail_out === 0 && (M = !0);
                    } while (
                      (0 < B.avail_in || B.avail_out === 0) &&
                      a !== h.Z_STREAM_END
                    );
                    return (
                      a === h.Z_STREAM_END && (p = h.Z_FINISH),
                      p === h.Z_FINISH
                        ? ((a = o.inflateEnd(this.strm)),
                          this.onEnd(a),
                          (this.ended = !0),
                          a === h.Z_OK)
                        : p !== h.Z_SYNC_FLUSH ||
                          (this.onEnd(h.Z_OK), !(B.avail_out = 0))
                    );
                  }),
                    (i.prototype.onData = function (n) {
                      this.chunks.push(n);
                    }),
                    (i.prototype.onEnd = function (n) {
                      n === h.Z_OK &&
                        (this.options.to === "string"
                          ? (this.result = this.chunks.join(""))
                          : (this.result = s.flattenChunks(this.chunks))),
                        (this.chunks = []),
                        (this.err = n),
                        (this.msg = this.strm.msg);
                    }),
                    (_.Inflate = i),
                    (_.inflate = d),
                    (_.inflateRaw = function (n, l) {
                      return ((l = l || {}).raw = !0), d(n, l);
                    }),
                    (_.ungzip = d);
                },
                {
                  "./utils/common": 41,
                  "./utils/strings": 42,
                  "./zlib/constants": 44,
                  "./zlib/gzheader": 47,
                  "./zlib/inflate": 49,
                  "./zlib/messages": 51,
                  "./zlib/zstream": 53,
                },
              ],
              41: [
                function (c, A, _) {
                  "use strict";
                  var o =
                    typeof Uint8Array < "u" &&
                    typeof Uint16Array < "u" &&
                    typeof Int32Array < "u";
                  (_.assign = function (h) {
                    for (
                      var b = Array.prototype.slice.call(arguments, 1);
                      b.length;

                    ) {
                      var y = b.shift();
                      if (y) {
                        if (typeof y != "object")
                          throw new TypeError(y + "must be non-object");
                        for (var m in y) y.hasOwnProperty(m) && (h[m] = y[m]);
                      }
                    }
                    return h;
                  }),
                    (_.shrinkBuf = function (h, b) {
                      return h.length === b
                        ? h
                        : h.subarray
                        ? h.subarray(0, b)
                        : ((h.length = b), h);
                    });
                  var s = {
                      arraySet: function (h, b, y, m, v) {
                        if (b.subarray && h.subarray)
                          h.set(b.subarray(y, y + m), v);
                        else for (var i = 0; i < m; i++) h[v + i] = b[y + i];
                      },
                      flattenChunks: function (h) {
                        var b, y, m, v, i, d;
                        for (b = m = 0, y = h.length; b < y; b++)
                          m += h[b].length;
                        for (
                          d = new Uint8Array(m), b = v = 0, y = h.length;
                          b < y;
                          b++
                        )
                          (i = h[b]), d.set(i, v), (v += i.length);
                        return d;
                      },
                    },
                    r = {
                      arraySet: function (h, b, y, m, v) {
                        for (var i = 0; i < m; i++) h[v + i] = b[y + i];
                      },
                      flattenChunks: function (h) {
                        return [].concat.apply([], h);
                      },
                    };
                  (_.setTyped = function (h) {
                    h
                      ? ((_.Buf8 = Uint8Array),
                        (_.Buf16 = Uint16Array),
                        (_.Buf32 = Int32Array),
                        _.assign(_, s))
                      : ((_.Buf8 = Array),
                        (_.Buf16 = Array),
                        (_.Buf32 = Array),
                        _.assign(_, r));
                  }),
                    _.setTyped(o);
                },
                {},
              ],
              42: [
                function (c, A, _) {
                  "use strict";
                  var o = c("./common"),
                    s = !0,
                    r = !0;
                  try {
                    String.fromCharCode.apply(null, [0]);
                  } catch {
                    s = !1;
                  }
                  try {
                    String.fromCharCode.apply(null, new Uint8Array(1));
                  } catch {
                    r = !1;
                  }
                  for (var h = new o.Buf8(256), b = 0; b < 256; b++)
                    h[b] =
                      252 <= b
                        ? 6
                        : 248 <= b
                        ? 5
                        : 240 <= b
                        ? 4
                        : 224 <= b
                        ? 3
                        : 192 <= b
                        ? 2
                        : 1;
                  function y(m, v) {
                    if (v < 65537 && ((m.subarray && r) || (!m.subarray && s)))
                      return String.fromCharCode.apply(null, o.shrinkBuf(m, v));
                    for (var i = "", d = 0; d < v; d++)
                      i += String.fromCharCode(m[d]);
                    return i;
                  }
                  (h[254] = h[254] = 1),
                    (_.string2buf = function (m) {
                      var v,
                        i,
                        d,
                        n,
                        l,
                        a = m.length,
                        p = 0;
                      for (n = 0; n < a; n++)
                        (64512 & (i = m.charCodeAt(n))) == 55296 &&
                          n + 1 < a &&
                          (64512 & (d = m.charCodeAt(n + 1))) == 56320 &&
                          ((i = 65536 + ((i - 55296) << 10) + (d - 56320)),
                          n++),
                          (p += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4);
                      for (v = new o.Buf8(p), n = l = 0; l < p; n++)
                        (64512 & (i = m.charCodeAt(n))) == 55296 &&
                          n + 1 < a &&
                          (64512 & (d = m.charCodeAt(n + 1))) == 56320 &&
                          ((i = 65536 + ((i - 55296) << 10) + (d - 56320)),
                          n++),
                          i < 128
                            ? (v[l++] = i)
                            : (i < 2048
                                ? (v[l++] = 192 | (i >>> 6))
                                : (i < 65536
                                    ? (v[l++] = 224 | (i >>> 12))
                                    : ((v[l++] = 240 | (i >>> 18)),
                                      (v[l++] = 128 | ((i >>> 12) & 63))),
                                  (v[l++] = 128 | ((i >>> 6) & 63))),
                              (v[l++] = 128 | (63 & i)));
                      return v;
                    }),
                    (_.buf2binstring = function (m) {
                      return y(m, m.length);
                    }),
                    (_.binstring2buf = function (m) {
                      for (
                        var v = new o.Buf8(m.length), i = 0, d = v.length;
                        i < d;
                        i++
                      )
                        v[i] = m.charCodeAt(i);
                      return v;
                    }),
                    (_.buf2string = function (m, v) {
                      var i,
                        d,
                        n,
                        l,
                        a = v || m.length,
                        p = new Array(2 * a);
                      for (i = d = 0; i < a; )
                        if ((n = m[i++]) < 128) p[d++] = n;
                        else if (4 < (l = h[n])) (p[d++] = 65533), (i += l - 1);
                        else {
                          for (
                            n &= l === 2 ? 31 : l === 3 ? 15 : 7;
                            1 < l && i < a;

                          )
                            (n = (n << 6) | (63 & m[i++])), l--;
                          1 < l
                            ? (p[d++] = 65533)
                            : n < 65536
                            ? (p[d++] = n)
                            : ((n -= 65536),
                              (p[d++] = 55296 | ((n >> 10) & 1023)),
                              (p[d++] = 56320 | (1023 & n)));
                        }
                      return y(p, d);
                    }),
                    (_.utf8border = function (m, v) {
                      var i;
                      for (
                        (v = v || m.length) > m.length && (v = m.length),
                          i = v - 1;
                        0 <= i && (192 & m[i]) == 128;

                      )
                        i--;
                      return i < 0 || i === 0 ? v : i + h[m[i]] > v ? i : v;
                    });
                },
                { "./common": 41 },
              ],
              43: [
                function (c, A, _) {
                  "use strict";
                  A.exports = function (o, s, r, h) {
                    for (
                      var b = (65535 & o) | 0,
                        y = ((o >>> 16) & 65535) | 0,
                        m = 0;
                      r !== 0;

                    ) {
                      for (
                        r -= m = 2e3 < r ? 2e3 : r;
                        (y = (y + (b = (b + s[h++]) | 0)) | 0), --m;

                      );
                      (b %= 65521), (y %= 65521);
                    }
                    return b | (y << 16) | 0;
                  };
                },
                {},
              ],
              44: [
                function (c, A, _) {
                  "use strict";
                  A.exports = {
                    Z_NO_FLUSH: 0,
                    Z_PARTIAL_FLUSH: 1,
                    Z_SYNC_FLUSH: 2,
                    Z_FULL_FLUSH: 3,
                    Z_FINISH: 4,
                    Z_BLOCK: 5,
                    Z_TREES: 6,
                    Z_OK: 0,
                    Z_STREAM_END: 1,
                    Z_NEED_DICT: 2,
                    Z_ERRNO: -1,
                    Z_STREAM_ERROR: -2,
                    Z_DATA_ERROR: -3,
                    Z_BUF_ERROR: -5,
                    Z_NO_COMPRESSION: 0,
                    Z_BEST_SPEED: 1,
                    Z_BEST_COMPRESSION: 9,
                    Z_DEFAULT_COMPRESSION: -1,
                    Z_FILTERED: 1,
                    Z_HUFFMAN_ONLY: 2,
                    Z_RLE: 3,
                    Z_FIXED: 4,
                    Z_DEFAULT_STRATEGY: 0,
                    Z_BINARY: 0,
                    Z_TEXT: 1,
                    Z_UNKNOWN: 2,
                    Z_DEFLATED: 8,
                  };
                },
                {},
              ],
              45: [
                function (c, A, _) {
                  "use strict";
                  var o = (function () {
                    for (var s, r = [], h = 0; h < 256; h++) {
                      s = h;
                      for (var b = 0; b < 8; b++)
                        s = 1 & s ? 3988292384 ^ (s >>> 1) : s >>> 1;
                      r[h] = s;
                    }
                    return r;
                  })();
                  A.exports = function (s, r, h, b) {
                    var y = o,
                      m = b + h;
                    s ^= -1;
                    for (var v = b; v < m; v++)
                      s = (s >>> 8) ^ y[255 & (s ^ r[v])];
                    return -1 ^ s;
                  };
                },
                {},
              ],
              46: [
                function (c, A, _) {
                  "use strict";
                  var o,
                    s = c("../utils/common"),
                    r = c("./trees"),
                    h = c("./adler32"),
                    b = c("./crc32"),
                    y = c("./messages"),
                    m = 0,
                    v = 4,
                    i = 0,
                    d = -2,
                    n = -1,
                    l = 4,
                    a = 2,
                    p = 8,
                    w = 9,
                    S = 286,
                    x = 30,
                    F = 19,
                    B = 2 * S + 1,
                    P = 15,
                    O = 3,
                    M = 258,
                    X = M + O + 1,
                    g = 42,
                    T = 113,
                    e = 1,
                    D = 2,
                    $ = 3,
                    L = 4;
                  function J(t, R) {
                    return (t.msg = y[R]), R;
                  }
                  function j(t) {
                    return (t << 1) - (4 < t ? 9 : 0);
                  }
                  function q(t) {
                    for (var R = t.length; 0 <= --R; ) t[R] = 0;
                  }
                  function C(t) {
                    var R = t.state,
                      I = R.pending;
                    I > t.avail_out && (I = t.avail_out),
                      I !== 0 &&
                        (s.arraySet(
                          t.output,
                          R.pending_buf,
                          R.pending_out,
                          I,
                          t.next_out
                        ),
                        (t.next_out += I),
                        (R.pending_out += I),
                        (t.total_out += I),
                        (t.avail_out -= I),
                        (R.pending -= I),
                        R.pending === 0 && (R.pending_out = 0));
                  }
                  function E(t, R) {
                    r._tr_flush_block(
                      t,
                      0 <= t.block_start ? t.block_start : -1,
                      t.strstart - t.block_start,
                      R
                    ),
                      (t.block_start = t.strstart),
                      C(t.strm);
                  }
                  function V(t, R) {
                    t.pending_buf[t.pending++] = R;
                  }
                  function G(t, R) {
                    (t.pending_buf[t.pending++] = (R >>> 8) & 255),
                      (t.pending_buf[t.pending++] = 255 & R);
                  }
                  function H(t, R) {
                    var I,
                      f,
                      u = t.max_chain_length,
                      k = t.strstart,
                      N = t.prev_length,
                      U = t.nice_match,
                      z =
                        t.strstart > t.w_size - X
                          ? t.strstart - (t.w_size - X)
                          : 0,
                      W = t.window,
                      K = t.w_mask,
                      Z = t.prev,
                      Y = t.strstart + M,
                      rt = W[k + N - 1],
                      tt = W[k + N];
                    t.prev_length >= t.good_match && (u >>= 2),
                      U > t.lookahead && (U = t.lookahead);
                    do
                      if (
                        W[(I = R) + N] === tt &&
                        W[I + N - 1] === rt &&
                        W[I] === W[k] &&
                        W[++I] === W[k + 1]
                      ) {
                        (k += 2), I++;
                        do;
                        while (
                          W[++k] === W[++I] &&
                          W[++k] === W[++I] &&
                          W[++k] === W[++I] &&
                          W[++k] === W[++I] &&
                          W[++k] === W[++I] &&
                          W[++k] === W[++I] &&
                          W[++k] === W[++I] &&
                          W[++k] === W[++I] &&
                          k < Y
                        );
                        if (((f = M - (Y - k)), (k = Y - M), N < f)) {
                          if (((t.match_start = R), U <= (N = f))) break;
                          (rt = W[k + N - 1]), (tt = W[k + N]);
                        }
                      }
                    while ((R = Z[R & K]) > z && --u != 0);
                    return N <= t.lookahead ? N : t.lookahead;
                  }
                  function nt(t) {
                    var R,
                      I,
                      f,
                      u,
                      k,
                      N,
                      U,
                      z,
                      W,
                      K,
                      Z = t.w_size;
                    do {
                      if (
                        ((u = t.window_size - t.lookahead - t.strstart),
                        t.strstart >= Z + (Z - X))
                      ) {
                        for (
                          s.arraySet(t.window, t.window, Z, Z, 0),
                            t.match_start -= Z,
                            t.strstart -= Z,
                            t.block_start -= Z,
                            R = I = t.hash_size;
                          (f = t.head[--R]),
                            (t.head[R] = Z <= f ? f - Z : 0),
                            --I;

                        );
                        for (
                          R = I = Z;
                          (f = t.prev[--R]),
                            (t.prev[R] = Z <= f ? f - Z : 0),
                            --I;

                        );
                        u += Z;
                      }
                      if (t.strm.avail_in === 0) break;
                      if (
                        ((N = t.strm),
                        (U = t.window),
                        (z = t.strstart + t.lookahead),
                        (W = u),
                        (K = void 0),
                        (K = N.avail_in),
                        W < K && (K = W),
                        (I =
                          K === 0
                            ? 0
                            : ((N.avail_in -= K),
                              s.arraySet(U, N.input, N.next_in, K, z),
                              N.state.wrap === 1
                                ? (N.adler = h(N.adler, U, K, z))
                                : N.state.wrap === 2 &&
                                  (N.adler = b(N.adler, U, K, z)),
                              (N.next_in += K),
                              (N.total_in += K),
                              K)),
                        (t.lookahead += I),
                        t.lookahead + t.insert >= O)
                      )
                        for (
                          k = t.strstart - t.insert,
                            t.ins_h = t.window[k],
                            t.ins_h =
                              ((t.ins_h << t.hash_shift) ^ t.window[k + 1]) &
                              t.hash_mask;
                          t.insert &&
                          ((t.ins_h =
                            ((t.ins_h << t.hash_shift) ^ t.window[k + O - 1]) &
                            t.hash_mask),
                          (t.prev[k & t.w_mask] = t.head[t.ins_h]),
                          (t.head[t.ins_h] = k),
                          k++,
                          t.insert--,
                          !(t.lookahead + t.insert < O));

                        );
                    } while (t.lookahead < X && t.strm.avail_in !== 0);
                  }
                  function ot(t, R) {
                    for (var I, f; ; ) {
                      if (t.lookahead < X) {
                        if ((nt(t), t.lookahead < X && R === m)) return e;
                        if (t.lookahead === 0) break;
                      }
                      if (
                        ((I = 0),
                        t.lookahead >= O &&
                          ((t.ins_h =
                            ((t.ins_h << t.hash_shift) ^
                              t.window[t.strstart + O - 1]) &
                            t.hash_mask),
                          (I = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                          (t.head[t.ins_h] = t.strstart)),
                        I !== 0 &&
                          t.strstart - I <= t.w_size - X &&
                          (t.match_length = H(t, I)),
                        t.match_length >= O)
                      )
                        if (
                          ((f = r._tr_tally(
                            t,
                            t.strstart - t.match_start,
                            t.match_length - O
                          )),
                          (t.lookahead -= t.match_length),
                          t.match_length <= t.max_lazy_match &&
                            t.lookahead >= O)
                        ) {
                          for (
                            t.match_length--;
                            t.strstart++,
                              (t.ins_h =
                                ((t.ins_h << t.hash_shift) ^
                                  t.window[t.strstart + O - 1]) &
                                t.hash_mask),
                              (I = t.prev[t.strstart & t.w_mask] =
                                t.head[t.ins_h]),
                              (t.head[t.ins_h] = t.strstart),
                              --t.match_length != 0;

                          );
                          t.strstart++;
                        } else
                          (t.strstart += t.match_length),
                            (t.match_length = 0),
                            (t.ins_h = t.window[t.strstart]),
                            (t.ins_h =
                              ((t.ins_h << t.hash_shift) ^
                                t.window[t.strstart + 1]) &
                              t.hash_mask);
                      else
                        (f = r._tr_tally(t, 0, t.window[t.strstart])),
                          t.lookahead--,
                          t.strstart++;
                      if (f && (E(t, !1), t.strm.avail_out === 0)) return e;
                    }
                    return (
                      (t.insert = t.strstart < O - 1 ? t.strstart : O - 1),
                      R === v
                        ? (E(t, !0), t.strm.avail_out === 0 ? $ : L)
                        : t.last_lit && (E(t, !1), t.strm.avail_out === 0)
                        ? e
                        : D
                    );
                  }
                  function Q(t, R) {
                    for (var I, f, u; ; ) {
                      if (t.lookahead < X) {
                        if ((nt(t), t.lookahead < X && R === m)) return e;
                        if (t.lookahead === 0) break;
                      }
                      if (
                        ((I = 0),
                        t.lookahead >= O &&
                          ((t.ins_h =
                            ((t.ins_h << t.hash_shift) ^
                              t.window[t.strstart + O - 1]) &
                            t.hash_mask),
                          (I = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                          (t.head[t.ins_h] = t.strstart)),
                        (t.prev_length = t.match_length),
                        (t.prev_match = t.match_start),
                        (t.match_length = O - 1),
                        I !== 0 &&
                          t.prev_length < t.max_lazy_match &&
                          t.strstart - I <= t.w_size - X &&
                          ((t.match_length = H(t, I)),
                          t.match_length <= 5 &&
                            (t.strategy === 1 ||
                              (t.match_length === O &&
                                4096 < t.strstart - t.match_start)) &&
                            (t.match_length = O - 1)),
                        t.prev_length >= O && t.match_length <= t.prev_length)
                      ) {
                        for (
                          u = t.strstart + t.lookahead - O,
                            f = r._tr_tally(
                              t,
                              t.strstart - 1 - t.prev_match,
                              t.prev_length - O
                            ),
                            t.lookahead -= t.prev_length - 1,
                            t.prev_length -= 2;
                          ++t.strstart <= u &&
                            ((t.ins_h =
                              ((t.ins_h << t.hash_shift) ^
                                t.window[t.strstart + O - 1]) &
                              t.hash_mask),
                            (I = t.prev[t.strstart & t.w_mask] =
                              t.head[t.ins_h]),
                            (t.head[t.ins_h] = t.strstart)),
                            --t.prev_length != 0;

                        );
                        if (
                          ((t.match_available = 0),
                          (t.match_length = O - 1),
                          t.strstart++,
                          f && (E(t, !1), t.strm.avail_out === 0))
                        )
                          return e;
                      } else if (t.match_available) {
                        if (
                          ((f = r._tr_tally(t, 0, t.window[t.strstart - 1])) &&
                            E(t, !1),
                          t.strstart++,
                          t.lookahead--,
                          t.strm.avail_out === 0)
                        )
                          return e;
                      } else
                        (t.match_available = 1), t.strstart++, t.lookahead--;
                    }
                    return (
                      t.match_available &&
                        ((f = r._tr_tally(t, 0, t.window[t.strstart - 1])),
                        (t.match_available = 0)),
                      (t.insert = t.strstart < O - 1 ? t.strstart : O - 1),
                      R === v
                        ? (E(t, !0), t.strm.avail_out === 0 ? $ : L)
                        : t.last_lit && (E(t, !1), t.strm.avail_out === 0)
                        ? e
                        : D
                    );
                  }
                  function et(t, R, I, f, u) {
                    (this.good_length = t),
                      (this.max_lazy = R),
                      (this.nice_length = I),
                      (this.max_chain = f),
                      (this.func = u);
                  }
                  function at() {
                    (this.strm = null),
                      (this.status = 0),
                      (this.pending_buf = null),
                      (this.pending_buf_size = 0),
                      (this.pending_out = 0),
                      (this.pending = 0),
                      (this.wrap = 0),
                      (this.gzhead = null),
                      (this.gzindex = 0),
                      (this.method = p),
                      (this.last_flush = -1),
                      (this.w_size = 0),
                      (this.w_bits = 0),
                      (this.w_mask = 0),
                      (this.window = null),
                      (this.window_size = 0),
                      (this.prev = null),
                      (this.head = null),
                      (this.ins_h = 0),
                      (this.hash_size = 0),
                      (this.hash_bits = 0),
                      (this.hash_mask = 0),
                      (this.hash_shift = 0),
                      (this.block_start = 0),
                      (this.match_length = 0),
                      (this.prev_match = 0),
                      (this.match_available = 0),
                      (this.strstart = 0),
                      (this.match_start = 0),
                      (this.lookahead = 0),
                      (this.prev_length = 0),
                      (this.max_chain_length = 0),
                      (this.max_lazy_match = 0),
                      (this.level = 0),
                      (this.strategy = 0),
                      (this.good_match = 0),
                      (this.nice_match = 0),
                      (this.dyn_ltree = new s.Buf16(2 * B)),
                      (this.dyn_dtree = new s.Buf16(2 * (2 * x + 1))),
                      (this.bl_tree = new s.Buf16(2 * (2 * F + 1))),
                      q(this.dyn_ltree),
                      q(this.dyn_dtree),
                      q(this.bl_tree),
                      (this.l_desc = null),
                      (this.d_desc = null),
                      (this.bl_desc = null),
                      (this.bl_count = new s.Buf16(P + 1)),
                      (this.heap = new s.Buf16(2 * S + 1)),
                      q(this.heap),
                      (this.heap_len = 0),
                      (this.heap_max = 0),
                      (this.depth = new s.Buf16(2 * S + 1)),
                      q(this.depth),
                      (this.l_buf = 0),
                      (this.lit_bufsize = 0),
                      (this.last_lit = 0),
                      (this.d_buf = 0),
                      (this.opt_len = 0),
                      (this.static_len = 0),
                      (this.matches = 0),
                      (this.insert = 0),
                      (this.bi_buf = 0),
                      (this.bi_valid = 0);
                  }
                  function it(t) {
                    var R;
                    return t && t.state
                      ? ((t.total_in = t.total_out = 0),
                        (t.data_type = a),
                        ((R = t.state).pending = 0),
                        (R.pending_out = 0),
                        R.wrap < 0 && (R.wrap = -R.wrap),
                        (R.status = R.wrap ? g : T),
                        (t.adler = R.wrap === 2 ? 0 : 1),
                        (R.last_flush = m),
                        r._tr_init(R),
                        i)
                      : J(t, d);
                  }
                  function lt(t) {
                    var R = it(t);
                    return (
                      R === i &&
                        (function (I) {
                          (I.window_size = 2 * I.w_size),
                            q(I.head),
                            (I.max_lazy_match = o[I.level].max_lazy),
                            (I.good_match = o[I.level].good_length),
                            (I.nice_match = o[I.level].nice_length),
                            (I.max_chain_length = o[I.level].max_chain),
                            (I.strstart = 0),
                            (I.block_start = 0),
                            (I.lookahead = 0),
                            (I.insert = 0),
                            (I.match_length = I.prev_length = O - 1),
                            (I.match_available = 0),
                            (I.ins_h = 0);
                        })(t.state),
                      R
                    );
                  }
                  function ht(t, R, I, f, u, k) {
                    if (!t) return d;
                    var N = 1;
                    if (
                      (R === n && (R = 6),
                      f < 0
                        ? ((N = 0), (f = -f))
                        : 15 < f && ((N = 2), (f -= 16)),
                      u < 1 ||
                        w < u ||
                        I !== p ||
                        f < 8 ||
                        15 < f ||
                        R < 0 ||
                        9 < R ||
                        k < 0 ||
                        l < k)
                    )
                      return J(t, d);
                    f === 8 && (f = 9);
                    var U = new at();
                    return (
                      ((t.state = U).strm = t),
                      (U.wrap = N),
                      (U.gzhead = null),
                      (U.w_bits = f),
                      (U.w_size = 1 << U.w_bits),
                      (U.w_mask = U.w_size - 1),
                      (U.hash_bits = u + 7),
                      (U.hash_size = 1 << U.hash_bits),
                      (U.hash_mask = U.hash_size - 1),
                      (U.hash_shift = ~~((U.hash_bits + O - 1) / O)),
                      (U.window = new s.Buf8(2 * U.w_size)),
                      (U.head = new s.Buf16(U.hash_size)),
                      (U.prev = new s.Buf16(U.w_size)),
                      (U.lit_bufsize = 1 << (u + 6)),
                      (U.pending_buf_size = 4 * U.lit_bufsize),
                      (U.pending_buf = new s.Buf8(U.pending_buf_size)),
                      (U.d_buf = 1 * U.lit_bufsize),
                      (U.l_buf = 3 * U.lit_bufsize),
                      (U.level = R),
                      (U.strategy = k),
                      (U.method = I),
                      lt(t)
                    );
                  }
                  (o = [
                    new et(0, 0, 0, 0, function (t, R) {
                      var I = 65535;
                      for (
                        I > t.pending_buf_size - 5 &&
                        (I = t.pending_buf_size - 5);
                        ;

                      ) {
                        if (t.lookahead <= 1) {
                          if ((nt(t), t.lookahead === 0 && R === m)) return e;
                          if (t.lookahead === 0) break;
                        }
                        (t.strstart += t.lookahead), (t.lookahead = 0);
                        var f = t.block_start + I;
                        if (
                          ((t.strstart === 0 || t.strstart >= f) &&
                            ((t.lookahead = t.strstart - f),
                            (t.strstart = f),
                            E(t, !1),
                            t.strm.avail_out === 0)) ||
                          (t.strstart - t.block_start >= t.w_size - X &&
                            (E(t, !1), t.strm.avail_out === 0))
                        )
                          return e;
                      }
                      return (
                        (t.insert = 0),
                        R === v
                          ? (E(t, !0), t.strm.avail_out === 0 ? $ : L)
                          : (t.strstart > t.block_start &&
                              (E(t, !1), t.strm.avail_out),
                            e)
                      );
                    }),
                    new et(4, 4, 8, 4, ot),
                    new et(4, 5, 16, 8, ot),
                    new et(4, 6, 32, 32, ot),
                    new et(4, 4, 16, 16, Q),
                    new et(8, 16, 32, 32, Q),
                    new et(8, 16, 128, 128, Q),
                    new et(8, 32, 128, 256, Q),
                    new et(32, 128, 258, 1024, Q),
                    new et(32, 258, 258, 4096, Q),
                  ]),
                    (_.deflateInit = function (t, R) {
                      return ht(t, R, p, 15, 8, 0);
                    }),
                    (_.deflateInit2 = ht),
                    (_.deflateReset = lt),
                    (_.deflateResetKeep = it),
                    (_.deflateSetHeader = function (t, R) {
                      return t && t.state
                        ? t.state.wrap !== 2
                          ? d
                          : ((t.state.gzhead = R), i)
                        : d;
                    }),
                    (_.deflate = function (t, R) {
                      var I, f, u, k;
                      if (!t || !t.state || 5 < R || R < 0)
                        return t ? J(t, d) : d;
                      if (
                        ((f = t.state),
                        !t.output ||
                          (!t.input && t.avail_in !== 0) ||
                          (f.status === 666 && R !== v))
                      )
                        return J(t, t.avail_out === 0 ? -5 : d);
                      if (
                        ((f.strm = t),
                        (I = f.last_flush),
                        (f.last_flush = R),
                        f.status === g)
                      )
                        if (f.wrap === 2)
                          (t.adler = 0),
                            V(f, 31),
                            V(f, 139),
                            V(f, 8),
                            f.gzhead
                              ? (V(
                                  f,
                                  (f.gzhead.text ? 1 : 0) +
                                    (f.gzhead.hcrc ? 2 : 0) +
                                    (f.gzhead.extra ? 4 : 0) +
                                    (f.gzhead.name ? 8 : 0) +
                                    (f.gzhead.comment ? 16 : 0)
                                ),
                                V(f, 255 & f.gzhead.time),
                                V(f, (f.gzhead.time >> 8) & 255),
                                V(f, (f.gzhead.time >> 16) & 255),
                                V(f, (f.gzhead.time >> 24) & 255),
                                V(
                                  f,
                                  f.level === 9
                                    ? 2
                                    : 2 <= f.strategy || f.level < 2
                                    ? 4
                                    : 0
                                ),
                                V(f, 255 & f.gzhead.os),
                                f.gzhead.extra &&
                                  f.gzhead.extra.length &&
                                  (V(f, 255 & f.gzhead.extra.length),
                                  V(f, (f.gzhead.extra.length >> 8) & 255)),
                                f.gzhead.hcrc &&
                                  (t.adler = b(
                                    t.adler,
                                    f.pending_buf,
                                    f.pending,
                                    0
                                  )),
                                (f.gzindex = 0),
                                (f.status = 69))
                              : (V(f, 0),
                                V(f, 0),
                                V(f, 0),
                                V(f, 0),
                                V(f, 0),
                                V(
                                  f,
                                  f.level === 9
                                    ? 2
                                    : 2 <= f.strategy || f.level < 2
                                    ? 4
                                    : 0
                                ),
                                V(f, 3),
                                (f.status = T));
                        else {
                          var N = (p + ((f.w_bits - 8) << 4)) << 8;
                          (N |=
                            (2 <= f.strategy || f.level < 2
                              ? 0
                              : f.level < 6
                              ? 1
                              : f.level === 6
                              ? 2
                              : 3) << 6),
                            f.strstart !== 0 && (N |= 32),
                            (N += 31 - (N % 31)),
                            (f.status = T),
                            G(f, N),
                            f.strstart !== 0 &&
                              (G(f, t.adler >>> 16), G(f, 65535 & t.adler)),
                            (t.adler = 1);
                        }
                      if (f.status === 69)
                        if (f.gzhead.extra) {
                          for (
                            u = f.pending;
                            f.gzindex < (65535 & f.gzhead.extra.length) &&
                            (f.pending !== f.pending_buf_size ||
                              (f.gzhead.hcrc &&
                                f.pending > u &&
                                (t.adler = b(
                                  t.adler,
                                  f.pending_buf,
                                  f.pending - u,
                                  u
                                )),
                              C(t),
                              (u = f.pending),
                              f.pending !== f.pending_buf_size));

                          )
                            V(f, 255 & f.gzhead.extra[f.gzindex]), f.gzindex++;
                          f.gzhead.hcrc &&
                            f.pending > u &&
                            (t.adler = b(
                              t.adler,
                              f.pending_buf,
                              f.pending - u,
                              u
                            )),
                            f.gzindex === f.gzhead.extra.length &&
                              ((f.gzindex = 0), (f.status = 73));
                        } else f.status = 73;
                      if (f.status === 73)
                        if (f.gzhead.name) {
                          u = f.pending;
                          do {
                            if (
                              f.pending === f.pending_buf_size &&
                              (f.gzhead.hcrc &&
                                f.pending > u &&
                                (t.adler = b(
                                  t.adler,
                                  f.pending_buf,
                                  f.pending - u,
                                  u
                                )),
                              C(t),
                              (u = f.pending),
                              f.pending === f.pending_buf_size)
                            ) {
                              k = 1;
                              break;
                            }
                            (k =
                              f.gzindex < f.gzhead.name.length
                                ? 255 & f.gzhead.name.charCodeAt(f.gzindex++)
                                : 0),
                              V(f, k);
                          } while (k !== 0);
                          f.gzhead.hcrc &&
                            f.pending > u &&
                            (t.adler = b(
                              t.adler,
                              f.pending_buf,
                              f.pending - u,
                              u
                            )),
                            k === 0 && ((f.gzindex = 0), (f.status = 91));
                        } else f.status = 91;
                      if (f.status === 91)
                        if (f.gzhead.comment) {
                          u = f.pending;
                          do {
                            if (
                              f.pending === f.pending_buf_size &&
                              (f.gzhead.hcrc &&
                                f.pending > u &&
                                (t.adler = b(
                                  t.adler,
                                  f.pending_buf,
                                  f.pending - u,
                                  u
                                )),
                              C(t),
                              (u = f.pending),
                              f.pending === f.pending_buf_size)
                            ) {
                              k = 1;
                              break;
                            }
                            (k =
                              f.gzindex < f.gzhead.comment.length
                                ? 255 & f.gzhead.comment.charCodeAt(f.gzindex++)
                                : 0),
                              V(f, k);
                          } while (k !== 0);
                          f.gzhead.hcrc &&
                            f.pending > u &&
                            (t.adler = b(
                              t.adler,
                              f.pending_buf,
                              f.pending - u,
                              u
                            )),
                            k === 0 && (f.status = 103);
                        } else f.status = 103;
                      if (
                        (f.status === 103 &&
                          (f.gzhead.hcrc
                            ? (f.pending + 2 > f.pending_buf_size && C(t),
                              f.pending + 2 <= f.pending_buf_size &&
                                (V(f, 255 & t.adler),
                                V(f, (t.adler >> 8) & 255),
                                (t.adler = 0),
                                (f.status = T)))
                            : (f.status = T)),
                        f.pending !== 0)
                      ) {
                        if ((C(t), t.avail_out === 0))
                          return (f.last_flush = -1), i;
                      } else if (t.avail_in === 0 && j(R) <= j(I) && R !== v)
                        return J(t, -5);
                      if (f.status === 666 && t.avail_in !== 0) return J(t, -5);
                      if (
                        t.avail_in !== 0 ||
                        f.lookahead !== 0 ||
                        (R !== m && f.status !== 666)
                      ) {
                        var U =
                          f.strategy === 2
                            ? (function (z, W) {
                                for (var K; ; ) {
                                  if (
                                    z.lookahead === 0 &&
                                    (nt(z), z.lookahead === 0)
                                  ) {
                                    if (W === m) return e;
                                    break;
                                  }
                                  if (
                                    ((z.match_length = 0),
                                    (K = r._tr_tally(
                                      z,
                                      0,
                                      z.window[z.strstart]
                                    )),
                                    z.lookahead--,
                                    z.strstart++,
                                    K && (E(z, !1), z.strm.avail_out === 0))
                                  )
                                    return e;
                                }
                                return (
                                  (z.insert = 0),
                                  W === v
                                    ? (E(z, !0), z.strm.avail_out === 0 ? $ : L)
                                    : z.last_lit &&
                                      (E(z, !1), z.strm.avail_out === 0)
                                    ? e
                                    : D
                                );
                              })(f, R)
                            : f.strategy === 3
                            ? (function (z, W) {
                                for (var K, Z, Y, rt, tt = z.window; ; ) {
                                  if (z.lookahead <= M) {
                                    if ((nt(z), z.lookahead <= M && W === m))
                                      return e;
                                    if (z.lookahead === 0) break;
                                  }
                                  if (
                                    ((z.match_length = 0),
                                    z.lookahead >= O &&
                                      0 < z.strstart &&
                                      (Z = tt[(Y = z.strstart - 1)]) ===
                                        tt[++Y] &&
                                      Z === tt[++Y] &&
                                      Z === tt[++Y])
                                  ) {
                                    rt = z.strstart + M;
                                    do;
                                    while (
                                      Z === tt[++Y] &&
                                      Z === tt[++Y] &&
                                      Z === tt[++Y] &&
                                      Z === tt[++Y] &&
                                      Z === tt[++Y] &&
                                      Z === tt[++Y] &&
                                      Z === tt[++Y] &&
                                      Z === tt[++Y] &&
                                      Y < rt
                                    );
                                    (z.match_length = M - (rt - Y)),
                                      z.match_length > z.lookahead &&
                                        (z.match_length = z.lookahead);
                                  }
                                  if (
                                    (z.match_length >= O
                                      ? ((K = r._tr_tally(
                                          z,
                                          1,
                                          z.match_length - O
                                        )),
                                        (z.lookahead -= z.match_length),
                                        (z.strstart += z.match_length),
                                        (z.match_length = 0))
                                      : ((K = r._tr_tally(
                                          z,
                                          0,
                                          z.window[z.strstart]
                                        )),
                                        z.lookahead--,
                                        z.strstart++),
                                    K && (E(z, !1), z.strm.avail_out === 0))
                                  )
                                    return e;
                                }
                                return (
                                  (z.insert = 0),
                                  W === v
                                    ? (E(z, !0), z.strm.avail_out === 0 ? $ : L)
                                    : z.last_lit &&
                                      (E(z, !1), z.strm.avail_out === 0)
                                    ? e
                                    : D
                                );
                              })(f, R)
                            : o[f.level].func(f, R);
                        if (
                          ((U !== $ && U !== L) || (f.status = 666),
                          U === e || U === $)
                        )
                          return t.avail_out === 0 && (f.last_flush = -1), i;
                        if (
                          U === D &&
                          (R === 1
                            ? r._tr_align(f)
                            : R !== 5 &&
                              (r._tr_stored_block(f, 0, 0, !1),
                              R === 3 &&
                                (q(f.head),
                                f.lookahead === 0 &&
                                  ((f.strstart = 0),
                                  (f.block_start = 0),
                                  (f.insert = 0)))),
                          C(t),
                          t.avail_out === 0)
                        )
                          return (f.last_flush = -1), i;
                      }
                      return R !== v
                        ? i
                        : f.wrap <= 0
                        ? 1
                        : (f.wrap === 2
                            ? (V(f, 255 & t.adler),
                              V(f, (t.adler >> 8) & 255),
                              V(f, (t.adler >> 16) & 255),
                              V(f, (t.adler >> 24) & 255),
                              V(f, 255 & t.total_in),
                              V(f, (t.total_in >> 8) & 255),
                              V(f, (t.total_in >> 16) & 255),
                              V(f, (t.total_in >> 24) & 255))
                            : (G(f, t.adler >>> 16), G(f, 65535 & t.adler)),
                          C(t),
                          0 < f.wrap && (f.wrap = -f.wrap),
                          f.pending !== 0 ? i : 1);
                    }),
                    (_.deflateEnd = function (t) {
                      var R;
                      return t && t.state
                        ? (R = t.state.status) !== g &&
                          R !== 69 &&
                          R !== 73 &&
                          R !== 91 &&
                          R !== 103 &&
                          R !== T &&
                          R !== 666
                          ? J(t, d)
                          : ((t.state = null), R === T ? J(t, -3) : i)
                        : d;
                    }),
                    (_.deflateSetDictionary = function (t, R) {
                      var I,
                        f,
                        u,
                        k,
                        N,
                        U,
                        z,
                        W,
                        K = R.length;
                      if (
                        !t ||
                        !t.state ||
                        (k = (I = t.state).wrap) === 2 ||
                        (k === 1 && I.status !== g) ||
                        I.lookahead
                      )
                        return d;
                      for (
                        k === 1 && (t.adler = h(t.adler, R, K, 0)),
                          I.wrap = 0,
                          K >= I.w_size &&
                            (k === 0 &&
                              (q(I.head),
                              (I.strstart = 0),
                              (I.block_start = 0),
                              (I.insert = 0)),
                            (W = new s.Buf8(I.w_size)),
                            s.arraySet(W, R, K - I.w_size, I.w_size, 0),
                            (R = W),
                            (K = I.w_size)),
                          N = t.avail_in,
                          U = t.next_in,
                          z = t.input,
                          t.avail_in = K,
                          t.next_in = 0,
                          t.input = R,
                          nt(I);
                        I.lookahead >= O;

                      ) {
                        for (
                          f = I.strstart, u = I.lookahead - (O - 1);
                          (I.ins_h =
                            ((I.ins_h << I.hash_shift) ^ I.window[f + O - 1]) &
                            I.hash_mask),
                            (I.prev[f & I.w_mask] = I.head[I.ins_h]),
                            (I.head[I.ins_h] = f),
                            f++,
                            --u;

                        );
                        (I.strstart = f), (I.lookahead = O - 1), nt(I);
                      }
                      return (
                        (I.strstart += I.lookahead),
                        (I.block_start = I.strstart),
                        (I.insert = I.lookahead),
                        (I.lookahead = 0),
                        (I.match_length = I.prev_length = O - 1),
                        (I.match_available = 0),
                        (t.next_in = U),
                        (t.input = z),
                        (t.avail_in = N),
                        (I.wrap = k),
                        i
                      );
                    }),
                    (_.deflateInfo = "pako deflate (from Nodeca project)");
                },
                {
                  "../utils/common": 41,
                  "./adler32": 43,
                  "./crc32": 45,
                  "./messages": 51,
                  "./trees": 52,
                },
              ],
              47: [
                function (c, A, _) {
                  "use strict";
                  A.exports = function () {
                    (this.text = 0),
                      (this.time = 0),
                      (this.xflags = 0),
                      (this.os = 0),
                      (this.extra = null),
                      (this.extra_len = 0),
                      (this.name = ""),
                      (this.comment = ""),
                      (this.hcrc = 0),
                      (this.done = !1);
                  };
                },
                {},
              ],
              48: [
                function (c, A, _) {
                  "use strict";
                  A.exports = function (o, s) {
                    var r,
                      h,
                      b,
                      y,
                      m,
                      v,
                      i,
                      d,
                      n,
                      l,
                      a,
                      p,
                      w,
                      S,
                      x,
                      F,
                      B,
                      P,
                      O,
                      M,
                      X,
                      g,
                      T,
                      e,
                      D;
                    (r = o.state),
                      (h = o.next_in),
                      (e = o.input),
                      (b = h + (o.avail_in - 5)),
                      (y = o.next_out),
                      (D = o.output),
                      (m = y - (s - o.avail_out)),
                      (v = y + (o.avail_out - 257)),
                      (i = r.dmax),
                      (d = r.wsize),
                      (n = r.whave),
                      (l = r.wnext),
                      (a = r.window),
                      (p = r.hold),
                      (w = r.bits),
                      (S = r.lencode),
                      (x = r.distcode),
                      (F = (1 << r.lenbits) - 1),
                      (B = (1 << r.distbits) - 1);
                    t: do {
                      w < 15 &&
                        ((p += e[h++] << w),
                        (w += 8),
                        (p += e[h++] << w),
                        (w += 8)),
                        (P = S[p & F]);
                      e: for (;;) {
                        if (
                          ((p >>>= O = P >>> 24),
                          (w -= O),
                          (O = (P >>> 16) & 255) === 0)
                        )
                          D[y++] = 65535 & P;
                        else {
                          if (!(16 & O)) {
                            if (!(64 & O)) {
                              P = S[(65535 & P) + (p & ((1 << O) - 1))];
                              continue e;
                            }
                            if (32 & O) {
                              r.mode = 12;
                              break t;
                            }
                            (o.msg = "invalid literal/length code"),
                              (r.mode = 30);
                            break t;
                          }
                          (M = 65535 & P),
                            (O &= 15) &&
                              (w < O && ((p += e[h++] << w), (w += 8)),
                              (M += p & ((1 << O) - 1)),
                              (p >>>= O),
                              (w -= O)),
                            w < 15 &&
                              ((p += e[h++] << w),
                              (w += 8),
                              (p += e[h++] << w),
                              (w += 8)),
                            (P = x[p & B]);
                          r: for (;;) {
                            if (
                              ((p >>>= O = P >>> 24),
                              (w -= O),
                              !(16 & (O = (P >>> 16) & 255)))
                            ) {
                              if (!(64 & O)) {
                                P = x[(65535 & P) + (p & ((1 << O) - 1))];
                                continue r;
                              }
                              (o.msg = "invalid distance code"), (r.mode = 30);
                              break t;
                            }
                            if (
                              ((X = 65535 & P),
                              w < (O &= 15) &&
                                ((p += e[h++] << w),
                                (w += 8) < O && ((p += e[h++] << w), (w += 8))),
                              i < (X += p & ((1 << O) - 1)))
                            ) {
                              (o.msg = "invalid distance too far back"),
                                (r.mode = 30);
                              break t;
                            }
                            if (((p >>>= O), (w -= O), (O = y - m) < X)) {
                              if (n < (O = X - O) && r.sane) {
                                (o.msg = "invalid distance too far back"),
                                  (r.mode = 30);
                                break t;
                              }
                              if (((T = a), (g = 0) === l)) {
                                if (((g += d - O), O < M)) {
                                  for (M -= O; (D[y++] = a[g++]), --O; );
                                  (g = y - X), (T = D);
                                }
                              } else if (l < O) {
                                if (((g += d + l - O), (O -= l) < M)) {
                                  for (M -= O; (D[y++] = a[g++]), --O; );
                                  if (((g = 0), l < M)) {
                                    for (M -= O = l; (D[y++] = a[g++]), --O; );
                                    (g = y - X), (T = D);
                                  }
                                }
                              } else if (((g += l - O), O < M)) {
                                for (M -= O; (D[y++] = a[g++]), --O; );
                                (g = y - X), (T = D);
                              }
                              for (; 2 < M; )
                                (D[y++] = T[g++]),
                                  (D[y++] = T[g++]),
                                  (D[y++] = T[g++]),
                                  (M -= 3);
                              M &&
                                ((D[y++] = T[g++]), 1 < M && (D[y++] = T[g++]));
                            } else {
                              for (
                                g = y - X;
                                (D[y++] = D[g++]),
                                  (D[y++] = D[g++]),
                                  (D[y++] = D[g++]),
                                  2 < (M -= 3);

                              );
                              M &&
                                ((D[y++] = D[g++]), 1 < M && (D[y++] = D[g++]));
                            }
                            break;
                          }
                        }
                        break;
                      }
                    } while (h < b && y < v);
                    (h -= M = w >> 3),
                      (p &= (1 << (w -= M << 3)) - 1),
                      (o.next_in = h),
                      (o.next_out = y),
                      (o.avail_in = h < b ? b - h + 5 : 5 - (h - b)),
                      (o.avail_out = y < v ? v - y + 257 : 257 - (y - v)),
                      (r.hold = p),
                      (r.bits = w);
                  };
                },
                {},
              ],
              49: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils/common"),
                    s = c("./adler32"),
                    r = c("./crc32"),
                    h = c("./inffast"),
                    b = c("./inftrees"),
                    y = 1,
                    m = 2,
                    v = 0,
                    i = -2,
                    d = 1,
                    n = 852,
                    l = 592;
                  function a(g) {
                    return (
                      ((g >>> 24) & 255) +
                      ((g >>> 8) & 65280) +
                      ((65280 & g) << 8) +
                      ((255 & g) << 24)
                    );
                  }
                  function p() {
                    (this.mode = 0),
                      (this.last = !1),
                      (this.wrap = 0),
                      (this.havedict = !1),
                      (this.flags = 0),
                      (this.dmax = 0),
                      (this.check = 0),
                      (this.total = 0),
                      (this.head = null),
                      (this.wbits = 0),
                      (this.wsize = 0),
                      (this.whave = 0),
                      (this.wnext = 0),
                      (this.window = null),
                      (this.hold = 0),
                      (this.bits = 0),
                      (this.length = 0),
                      (this.offset = 0),
                      (this.extra = 0),
                      (this.lencode = null),
                      (this.distcode = null),
                      (this.lenbits = 0),
                      (this.distbits = 0),
                      (this.ncode = 0),
                      (this.nlen = 0),
                      (this.ndist = 0),
                      (this.have = 0),
                      (this.next = null),
                      (this.lens = new o.Buf16(320)),
                      (this.work = new o.Buf16(288)),
                      (this.lendyn = null),
                      (this.distdyn = null),
                      (this.sane = 0),
                      (this.back = 0),
                      (this.was = 0);
                  }
                  function w(g) {
                    var T;
                    return g && g.state
                      ? ((T = g.state),
                        (g.total_in = g.total_out = T.total = 0),
                        (g.msg = ""),
                        T.wrap && (g.adler = 1 & T.wrap),
                        (T.mode = d),
                        (T.last = 0),
                        (T.havedict = 0),
                        (T.dmax = 32768),
                        (T.head = null),
                        (T.hold = 0),
                        (T.bits = 0),
                        (T.lencode = T.lendyn = new o.Buf32(n)),
                        (T.distcode = T.distdyn = new o.Buf32(l)),
                        (T.sane = 1),
                        (T.back = -1),
                        v)
                      : i;
                  }
                  function S(g) {
                    var T;
                    return g && g.state
                      ? (((T = g.state).wsize = 0),
                        (T.whave = 0),
                        (T.wnext = 0),
                        w(g))
                      : i;
                  }
                  function x(g, T) {
                    var e, D;
                    return g && g.state
                      ? ((D = g.state),
                        T < 0
                          ? ((e = 0), (T = -T))
                          : ((e = 1 + (T >> 4)), T < 48 && (T &= 15)),
                        T && (T < 8 || 15 < T)
                          ? i
                          : (D.window !== null &&
                              D.wbits !== T &&
                              (D.window = null),
                            (D.wrap = e),
                            (D.wbits = T),
                            S(g)))
                      : i;
                  }
                  function F(g, T) {
                    var e, D;
                    return g
                      ? ((D = new p()),
                        ((g.state = D).window = null),
                        (e = x(g, T)) !== v && (g.state = null),
                        e)
                      : i;
                  }
                  var B,
                    P,
                    O = !0;
                  function M(g) {
                    if (O) {
                      var T;
                      for (
                        B = new o.Buf32(512), P = new o.Buf32(32), T = 0;
                        T < 144;

                      )
                        g.lens[T++] = 8;
                      for (; T < 256; ) g.lens[T++] = 9;
                      for (; T < 280; ) g.lens[T++] = 7;
                      for (; T < 288; ) g.lens[T++] = 8;
                      for (
                        b(y, g.lens, 0, 288, B, 0, g.work, { bits: 9 }), T = 0;
                        T < 32;

                      )
                        g.lens[T++] = 5;
                      b(m, g.lens, 0, 32, P, 0, g.work, { bits: 5 }), (O = !1);
                    }
                    (g.lencode = B),
                      (g.lenbits = 9),
                      (g.distcode = P),
                      (g.distbits = 5);
                  }
                  function X(g, T, e, D) {
                    var $,
                      L = g.state;
                    return (
                      L.window === null &&
                        ((L.wsize = 1 << L.wbits),
                        (L.wnext = 0),
                        (L.whave = 0),
                        (L.window = new o.Buf8(L.wsize))),
                      D >= L.wsize
                        ? (o.arraySet(L.window, T, e - L.wsize, L.wsize, 0),
                          (L.wnext = 0),
                          (L.whave = L.wsize))
                        : (D < ($ = L.wsize - L.wnext) && ($ = D),
                          o.arraySet(L.window, T, e - D, $, L.wnext),
                          (D -= $)
                            ? (o.arraySet(L.window, T, e - D, D, 0),
                              (L.wnext = D),
                              (L.whave = L.wsize))
                            : ((L.wnext += $),
                              L.wnext === L.wsize && (L.wnext = 0),
                              L.whave < L.wsize && (L.whave += $))),
                      0
                    );
                  }
                  (_.inflateReset = S),
                    (_.inflateReset2 = x),
                    (_.inflateResetKeep = w),
                    (_.inflateInit = function (g) {
                      return F(g, 15);
                    }),
                    (_.inflateInit2 = F),
                    (_.inflate = function (g, T) {
                      var e,
                        D,
                        $,
                        L,
                        J,
                        j,
                        q,
                        C,
                        E,
                        V,
                        G,
                        H,
                        nt,
                        ot,
                        Q,
                        et,
                        at,
                        it,
                        lt,
                        ht,
                        t,
                        R,
                        I,
                        f,
                        u = 0,
                        k = new o.Buf8(4),
                        N = [
                          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2,
                          14, 1, 15,
                        ];
                      if (
                        !g ||
                        !g.state ||
                        !g.output ||
                        (!g.input && g.avail_in !== 0)
                      )
                        return i;
                      (e = g.state).mode === 12 && (e.mode = 13),
                        (J = g.next_out),
                        ($ = g.output),
                        (q = g.avail_out),
                        (L = g.next_in),
                        (D = g.input),
                        (j = g.avail_in),
                        (C = e.hold),
                        (E = e.bits),
                        (V = j),
                        (G = q),
                        (R = v);
                      t: for (;;)
                        switch (e.mode) {
                          case d:
                            if (e.wrap === 0) {
                              e.mode = 13;
                              break;
                            }
                            for (; E < 16; ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            if (2 & e.wrap && C === 35615) {
                              (k[(e.check = 0)] = 255 & C),
                                (k[1] = (C >>> 8) & 255),
                                (e.check = r(e.check, k, 2, 0)),
                                (E = C = 0),
                                (e.mode = 2);
                              break;
                            }
                            if (
                              ((e.flags = 0),
                              e.head && (e.head.done = !1),
                              !(1 & e.wrap) ||
                                (((255 & C) << 8) + (C >> 8)) % 31)
                            ) {
                              (g.msg = "incorrect header check"), (e.mode = 30);
                              break;
                            }
                            if ((15 & C) != 8) {
                              (g.msg = "unknown compression method"),
                                (e.mode = 30);
                              break;
                            }
                            if (
                              ((E -= 4),
                              (t = 8 + (15 & (C >>>= 4))),
                              e.wbits === 0)
                            )
                              e.wbits = t;
                            else if (t > e.wbits) {
                              (g.msg = "invalid window size"), (e.mode = 30);
                              break;
                            }
                            (e.dmax = 1 << t),
                              (g.adler = e.check = 1),
                              (e.mode = 512 & C ? 10 : 12),
                              (E = C = 0);
                            break;
                          case 2:
                            for (; E < 16; ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            if (((e.flags = C), (255 & e.flags) != 8)) {
                              (g.msg = "unknown compression method"),
                                (e.mode = 30);
                              break;
                            }
                            if (57344 & e.flags) {
                              (g.msg = "unknown header flags set"),
                                (e.mode = 30);
                              break;
                            }
                            e.head && (e.head.text = (C >> 8) & 1),
                              512 & e.flags &&
                                ((k[0] = 255 & C),
                                (k[1] = (C >>> 8) & 255),
                                (e.check = r(e.check, k, 2, 0))),
                              (E = C = 0),
                              (e.mode = 3);
                          case 3:
                            for (; E < 32; ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            e.head && (e.head.time = C),
                              512 & e.flags &&
                                ((k[0] = 255 & C),
                                (k[1] = (C >>> 8) & 255),
                                (k[2] = (C >>> 16) & 255),
                                (k[3] = (C >>> 24) & 255),
                                (e.check = r(e.check, k, 4, 0))),
                              (E = C = 0),
                              (e.mode = 4);
                          case 4:
                            for (; E < 16; ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            e.head &&
                              ((e.head.xflags = 255 & C), (e.head.os = C >> 8)),
                              512 & e.flags &&
                                ((k[0] = 255 & C),
                                (k[1] = (C >>> 8) & 255),
                                (e.check = r(e.check, k, 2, 0))),
                              (E = C = 0),
                              (e.mode = 5);
                          case 5:
                            if (1024 & e.flags) {
                              for (; E < 16; ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              (e.length = C),
                                e.head && (e.head.extra_len = C),
                                512 & e.flags &&
                                  ((k[0] = 255 & C),
                                  (k[1] = (C >>> 8) & 255),
                                  (e.check = r(e.check, k, 2, 0))),
                                (E = C = 0);
                            } else e.head && (e.head.extra = null);
                            e.mode = 6;
                          case 6:
                            if (
                              1024 & e.flags &&
                              (j < (H = e.length) && (H = j),
                              H &&
                                (e.head &&
                                  ((t = e.head.extra_len - e.length),
                                  e.head.extra ||
                                    (e.head.extra = new Array(
                                      e.head.extra_len
                                    )),
                                  o.arraySet(e.head.extra, D, L, H, t)),
                                512 & e.flags &&
                                  (e.check = r(e.check, D, H, L)),
                                (j -= H),
                                (L += H),
                                (e.length -= H)),
                              e.length)
                            )
                              break t;
                            (e.length = 0), (e.mode = 7);
                          case 7:
                            if (2048 & e.flags) {
                              if (j === 0) break t;
                              for (
                                H = 0;
                                (t = D[L + H++]),
                                  e.head &&
                                    t &&
                                    e.length < 65536 &&
                                    (e.head.name += String.fromCharCode(t)),
                                  t && H < j;

                              );
                              if (
                                (512 & e.flags &&
                                  (e.check = r(e.check, D, H, L)),
                                (j -= H),
                                (L += H),
                                t)
                              )
                                break t;
                            } else e.head && (e.head.name = null);
                            (e.length = 0), (e.mode = 8);
                          case 8:
                            if (4096 & e.flags) {
                              if (j === 0) break t;
                              for (
                                H = 0;
                                (t = D[L + H++]),
                                  e.head &&
                                    t &&
                                    e.length < 65536 &&
                                    (e.head.comment += String.fromCharCode(t)),
                                  t && H < j;

                              );
                              if (
                                (512 & e.flags &&
                                  (e.check = r(e.check, D, H, L)),
                                (j -= H),
                                (L += H),
                                t)
                              )
                                break t;
                            } else e.head && (e.head.comment = null);
                            e.mode = 9;
                          case 9:
                            if (512 & e.flags) {
                              for (; E < 16; ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              if (C !== (65535 & e.check)) {
                                (g.msg = "header crc mismatch"), (e.mode = 30);
                                break;
                              }
                              E = C = 0;
                            }
                            e.head &&
                              ((e.head.hcrc = (e.flags >> 9) & 1),
                              (e.head.done = !0)),
                              (g.adler = e.check = 0),
                              (e.mode = 12);
                            break;
                          case 10:
                            for (; E < 32; ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            (g.adler = e.check = a(C)),
                              (E = C = 0),
                              (e.mode = 11);
                          case 11:
                            if (e.havedict === 0)
                              return (
                                (g.next_out = J),
                                (g.avail_out = q),
                                (g.next_in = L),
                                (g.avail_in = j),
                                (e.hold = C),
                                (e.bits = E),
                                2
                              );
                            (g.adler = e.check = 1), (e.mode = 12);
                          case 12:
                            if (T === 5 || T === 6) break t;
                          case 13:
                            if (e.last) {
                              (C >>>= 7 & E), (E -= 7 & E), (e.mode = 27);
                              break;
                            }
                            for (; E < 3; ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            switch (
                              ((e.last = 1 & C), (E -= 1), 3 & (C >>>= 1))
                            ) {
                              case 0:
                                e.mode = 14;
                                break;
                              case 1:
                                if ((M(e), (e.mode = 20), T !== 6)) break;
                                (C >>>= 2), (E -= 2);
                                break t;
                              case 2:
                                e.mode = 17;
                                break;
                              case 3:
                                (g.msg = "invalid block type"), (e.mode = 30);
                            }
                            (C >>>= 2), (E -= 2);
                            break;
                          case 14:
                            for (C >>>= 7 & E, E -= 7 & E; E < 32; ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            if ((65535 & C) != ((C >>> 16) ^ 65535)) {
                              (g.msg = "invalid stored block lengths"),
                                (e.mode = 30);
                              break;
                            }
                            if (
                              ((e.length = 65535 & C),
                              (E = C = 0),
                              (e.mode = 15),
                              T === 6)
                            )
                              break t;
                          case 15:
                            e.mode = 16;
                          case 16:
                            if ((H = e.length)) {
                              if ((j < H && (H = j), q < H && (H = q), H === 0))
                                break t;
                              o.arraySet($, D, L, H, J),
                                (j -= H),
                                (L += H),
                                (q -= H),
                                (J += H),
                                (e.length -= H);
                              break;
                            }
                            e.mode = 12;
                            break;
                          case 17:
                            for (; E < 14; ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            if (
                              ((e.nlen = 257 + (31 & C)),
                              (C >>>= 5),
                              (E -= 5),
                              (e.ndist = 1 + (31 & C)),
                              (C >>>= 5),
                              (E -= 5),
                              (e.ncode = 4 + (15 & C)),
                              (C >>>= 4),
                              (E -= 4),
                              286 < e.nlen || 30 < e.ndist)
                            ) {
                              (g.msg = "too many length or distance symbols"),
                                (e.mode = 30);
                              break;
                            }
                            (e.have = 0), (e.mode = 18);
                          case 18:
                            for (; e.have < e.ncode; ) {
                              for (; E < 3; ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              (e.lens[N[e.have++]] = 7 & C),
                                (C >>>= 3),
                                (E -= 3);
                            }
                            for (; e.have < 19; ) e.lens[N[e.have++]] = 0;
                            if (
                              ((e.lencode = e.lendyn),
                              (e.lenbits = 7),
                              (I = { bits: e.lenbits }),
                              (R = b(
                                0,
                                e.lens,
                                0,
                                19,
                                e.lencode,
                                0,
                                e.work,
                                I
                              )),
                              (e.lenbits = I.bits),
                              R)
                            ) {
                              (g.msg = "invalid code lengths set"),
                                (e.mode = 30);
                              break;
                            }
                            (e.have = 0), (e.mode = 19);
                          case 19:
                            for (; e.have < e.nlen + e.ndist; ) {
                              for (
                                ;
                                (et =
                                  ((u =
                                    e.lencode[C & ((1 << e.lenbits) - 1)]) >>>
                                    16) &
                                  255),
                                  (at = 65535 & u),
                                  !((Q = u >>> 24) <= E);

                              ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              if (at < 16)
                                (C >>>= Q), (E -= Q), (e.lens[e.have++] = at);
                              else {
                                if (at === 16) {
                                  for (f = Q + 2; E < f; ) {
                                    if (j === 0) break t;
                                    j--, (C += D[L++] << E), (E += 8);
                                  }
                                  if (((C >>>= Q), (E -= Q), e.have === 0)) {
                                    (g.msg = "invalid bit length repeat"),
                                      (e.mode = 30);
                                    break;
                                  }
                                  (t = e.lens[e.have - 1]),
                                    (H = 3 + (3 & C)),
                                    (C >>>= 2),
                                    (E -= 2);
                                } else if (at === 17) {
                                  for (f = Q + 3; E < f; ) {
                                    if (j === 0) break t;
                                    j--, (C += D[L++] << E), (E += 8);
                                  }
                                  (E -= Q),
                                    (t = 0),
                                    (H = 3 + (7 & (C >>>= Q))),
                                    (C >>>= 3),
                                    (E -= 3);
                                } else {
                                  for (f = Q + 7; E < f; ) {
                                    if (j === 0) break t;
                                    j--, (C += D[L++] << E), (E += 8);
                                  }
                                  (E -= Q),
                                    (t = 0),
                                    (H = 11 + (127 & (C >>>= Q))),
                                    (C >>>= 7),
                                    (E -= 7);
                                }
                                if (e.have + H > e.nlen + e.ndist) {
                                  (g.msg = "invalid bit length repeat"),
                                    (e.mode = 30);
                                  break;
                                }
                                for (; H--; ) e.lens[e.have++] = t;
                              }
                            }
                            if (e.mode === 30) break;
                            if (e.lens[256] === 0) {
                              (g.msg = "invalid code -- missing end-of-block"),
                                (e.mode = 30);
                              break;
                            }
                            if (
                              ((e.lenbits = 9),
                              (I = { bits: e.lenbits }),
                              (R = b(
                                y,
                                e.lens,
                                0,
                                e.nlen,
                                e.lencode,
                                0,
                                e.work,
                                I
                              )),
                              (e.lenbits = I.bits),
                              R)
                            ) {
                              (g.msg = "invalid literal/lengths set"),
                                (e.mode = 30);
                              break;
                            }
                            if (
                              ((e.distbits = 6),
                              (e.distcode = e.distdyn),
                              (I = { bits: e.distbits }),
                              (R = b(
                                m,
                                e.lens,
                                e.nlen,
                                e.ndist,
                                e.distcode,
                                0,
                                e.work,
                                I
                              )),
                              (e.distbits = I.bits),
                              R)
                            ) {
                              (g.msg = "invalid distances set"), (e.mode = 30);
                              break;
                            }
                            if (((e.mode = 20), T === 6)) break t;
                          case 20:
                            e.mode = 21;
                          case 21:
                            if (6 <= j && 258 <= q) {
                              (g.next_out = J),
                                (g.avail_out = q),
                                (g.next_in = L),
                                (g.avail_in = j),
                                (e.hold = C),
                                (e.bits = E),
                                h(g, G),
                                (J = g.next_out),
                                ($ = g.output),
                                (q = g.avail_out),
                                (L = g.next_in),
                                (D = g.input),
                                (j = g.avail_in),
                                (C = e.hold),
                                (E = e.bits),
                                e.mode === 12 && (e.back = -1);
                              break;
                            }
                            for (
                              e.back = 0;
                              (et =
                                ((u = e.lencode[C & ((1 << e.lenbits) - 1)]) >>>
                                  16) &
                                255),
                                (at = 65535 & u),
                                !((Q = u >>> 24) <= E);

                            ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            if (et && !(240 & et)) {
                              for (
                                it = Q, lt = et, ht = at;
                                (et =
                                  ((u =
                                    e.lencode[
                                      ht + ((C & ((1 << (it + lt)) - 1)) >> it)
                                    ]) >>>
                                    16) &
                                  255),
                                  (at = 65535 & u),
                                  !(it + (Q = u >>> 24) <= E);

                              ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              (C >>>= it), (E -= it), (e.back += it);
                            }
                            if (
                              ((C >>>= Q),
                              (E -= Q),
                              (e.back += Q),
                              (e.length = at),
                              et === 0)
                            ) {
                              e.mode = 26;
                              break;
                            }
                            if (32 & et) {
                              (e.back = -1), (e.mode = 12);
                              break;
                            }
                            if (64 & et) {
                              (g.msg = "invalid literal/length code"),
                                (e.mode = 30);
                              break;
                            }
                            (e.extra = 15 & et), (e.mode = 22);
                          case 22:
                            if (e.extra) {
                              for (f = e.extra; E < f; ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              (e.length += C & ((1 << e.extra) - 1)),
                                (C >>>= e.extra),
                                (E -= e.extra),
                                (e.back += e.extra);
                            }
                            (e.was = e.length), (e.mode = 23);
                          case 23:
                            for (
                              ;
                              (et =
                                ((u =
                                  e.distcode[C & ((1 << e.distbits) - 1)]) >>>
                                  16) &
                                255),
                                (at = 65535 & u),
                                !((Q = u >>> 24) <= E);

                            ) {
                              if (j === 0) break t;
                              j--, (C += D[L++] << E), (E += 8);
                            }
                            if (!(240 & et)) {
                              for (
                                it = Q, lt = et, ht = at;
                                (et =
                                  ((u =
                                    e.distcode[
                                      ht + ((C & ((1 << (it + lt)) - 1)) >> it)
                                    ]) >>>
                                    16) &
                                  255),
                                  (at = 65535 & u),
                                  !(it + (Q = u >>> 24) <= E);

                              ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              (C >>>= it), (E -= it), (e.back += it);
                            }
                            if (
                              ((C >>>= Q), (E -= Q), (e.back += Q), 64 & et)
                            ) {
                              (g.msg = "invalid distance code"), (e.mode = 30);
                              break;
                            }
                            (e.offset = at), (e.extra = 15 & et), (e.mode = 24);
                          case 24:
                            if (e.extra) {
                              for (f = e.extra; E < f; ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              (e.offset += C & ((1 << e.extra) - 1)),
                                (C >>>= e.extra),
                                (E -= e.extra),
                                (e.back += e.extra);
                            }
                            if (e.offset > e.dmax) {
                              (g.msg = "invalid distance too far back"),
                                (e.mode = 30);
                              break;
                            }
                            e.mode = 25;
                          case 25:
                            if (q === 0) break t;
                            if (((H = G - q), e.offset > H)) {
                              if ((H = e.offset - H) > e.whave && e.sane) {
                                (g.msg = "invalid distance too far back"),
                                  (e.mode = 30);
                                break;
                              }
                              (nt =
                                H > e.wnext
                                  ? ((H -= e.wnext), e.wsize - H)
                                  : e.wnext - H),
                                H > e.length && (H = e.length),
                                (ot = e.window);
                            } else
                              (ot = $), (nt = J - e.offset), (H = e.length);
                            for (
                              q < H && (H = q), q -= H, e.length -= H;
                              ($[J++] = ot[nt++]), --H;

                            );
                            e.length === 0 && (e.mode = 21);
                            break;
                          case 26:
                            if (q === 0) break t;
                            ($[J++] = e.length), q--, (e.mode = 21);
                            break;
                          case 27:
                            if (e.wrap) {
                              for (; E < 32; ) {
                                if (j === 0) break t;
                                j--, (C |= D[L++] << E), (E += 8);
                              }
                              if (
                                ((G -= q),
                                (g.total_out += G),
                                (e.total += G),
                                G &&
                                  (g.adler = e.check =
                                    e.flags
                                      ? r(e.check, $, G, J - G)
                                      : s(e.check, $, G, J - G)),
                                (G = q),
                                (e.flags ? C : a(C)) !== e.check)
                              ) {
                                (g.msg = "incorrect data check"), (e.mode = 30);
                                break;
                              }
                              E = C = 0;
                            }
                            e.mode = 28;
                          case 28:
                            if (e.wrap && e.flags) {
                              for (; E < 32; ) {
                                if (j === 0) break t;
                                j--, (C += D[L++] << E), (E += 8);
                              }
                              if (C !== (4294967295 & e.total)) {
                                (g.msg = "incorrect length check"),
                                  (e.mode = 30);
                                break;
                              }
                              E = C = 0;
                            }
                            e.mode = 29;
                          case 29:
                            R = 1;
                            break t;
                          case 30:
                            R = -3;
                            break t;
                          case 31:
                            return -4;
                          case 32:
                          default:
                            return i;
                        }
                      return (
                        (g.next_out = J),
                        (g.avail_out = q),
                        (g.next_in = L),
                        (g.avail_in = j),
                        (e.hold = C),
                        (e.bits = E),
                        (e.wsize ||
                          (G !== g.avail_out &&
                            e.mode < 30 &&
                            (e.mode < 27 || T !== 4))) &&
                        X(g, g.output, g.next_out, G - g.avail_out)
                          ? ((e.mode = 31), -4)
                          : ((V -= g.avail_in),
                            (G -= g.avail_out),
                            (g.total_in += V),
                            (g.total_out += G),
                            (e.total += G),
                            e.wrap &&
                              G &&
                              (g.adler = e.check =
                                e.flags
                                  ? r(e.check, $, G, g.next_out - G)
                                  : s(e.check, $, G, g.next_out - G)),
                            (g.data_type =
                              e.bits +
                              (e.last ? 64 : 0) +
                              (e.mode === 12 ? 128 : 0) +
                              (e.mode === 20 || e.mode === 15 ? 256 : 0)),
                            ((V == 0 && G === 0) || T === 4) &&
                              R === v &&
                              (R = -5),
                            R)
                      );
                    }),
                    (_.inflateEnd = function (g) {
                      if (!g || !g.state) return i;
                      var T = g.state;
                      return T.window && (T.window = null), (g.state = null), v;
                    }),
                    (_.inflateGetHeader = function (g, T) {
                      var e;
                      return g && g.state && 2 & (e = g.state).wrap
                        ? (((e.head = T).done = !1), v)
                        : i;
                    }),
                    (_.inflateSetDictionary = function (g, T) {
                      var e,
                        D = T.length;
                      return g && g.state
                        ? (e = g.state).wrap !== 0 && e.mode !== 11
                          ? i
                          : e.mode === 11 && s(1, T, D, 0) !== e.check
                          ? -3
                          : X(g, T, D, D)
                          ? ((e.mode = 31), -4)
                          : ((e.havedict = 1), v)
                        : i;
                    }),
                    (_.inflateInfo = "pako inflate (from Nodeca project)");
                },
                {
                  "../utils/common": 41,
                  "./adler32": 43,
                  "./crc32": 45,
                  "./inffast": 48,
                  "./inftrees": 50,
                },
              ],
              50: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils/common"),
                    s = [
                      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
                      35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258,
                      0, 0,
                    ],
                    r = [
                      16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18,
                      18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21,
                      16, 72, 78,
                    ],
                    h = [
                      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
                      257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
                      8193, 12289, 16385, 24577, 0, 0,
                    ],
                    b = [
                      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21,
                      22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28,
                      29, 29, 64, 64,
                    ];
                  A.exports = function (y, m, v, i, d, n, l, a) {
                    var p,
                      w,
                      S,
                      x,
                      F,
                      B,
                      P,
                      O,
                      M,
                      X = a.bits,
                      g = 0,
                      T = 0,
                      e = 0,
                      D = 0,
                      $ = 0,
                      L = 0,
                      J = 0,
                      j = 0,
                      q = 0,
                      C = 0,
                      E = null,
                      V = 0,
                      G = new o.Buf16(16),
                      H = new o.Buf16(16),
                      nt = null,
                      ot = 0;
                    for (g = 0; g <= 15; g++) G[g] = 0;
                    for (T = 0; T < i; T++) G[m[v + T]]++;
                    for ($ = X, D = 15; 1 <= D && G[D] === 0; D--);
                    if ((D < $ && ($ = D), D === 0))
                      return (
                        (d[n++] = 20971520),
                        (d[n++] = 20971520),
                        (a.bits = 1),
                        0
                      );
                    for (e = 1; e < D && G[e] === 0; e++);
                    for ($ < e && ($ = e), g = j = 1; g <= 15; g++)
                      if (((j <<= 1), (j -= G[g]) < 0)) return -1;
                    if (0 < j && (y === 0 || D !== 1)) return -1;
                    for (H[1] = 0, g = 1; g < 15; g++) H[g + 1] = H[g] + G[g];
                    for (T = 0; T < i; T++)
                      m[v + T] !== 0 && (l[H[m[v + T]]++] = T);
                    if (
                      ((B =
                        y === 0
                          ? ((E = nt = l), 19)
                          : y === 1
                          ? ((E = s), (V -= 257), (nt = r), (ot -= 257), 256)
                          : ((E = h), (nt = b), -1)),
                      (g = e),
                      (F = n),
                      (J = T = C = 0),
                      (S = -1),
                      (x = (q = 1 << (L = $)) - 1),
                      (y === 1 && 852 < q) || (y === 2 && 592 < q))
                    )
                      return 1;
                    for (;;) {
                      for (
                        P = g - J,
                          M =
                            l[T] < B
                              ? ((O = 0), l[T])
                              : l[T] > B
                              ? ((O = nt[ot + l[T]]), E[V + l[T]])
                              : ((O = 96), 0),
                          p = 1 << (g - J),
                          e = w = 1 << L;
                        (d[F + (C >> J) + (w -= p)] =
                          (P << 24) | (O << 16) | M | 0),
                          w !== 0;

                      );
                      for (p = 1 << (g - 1); C & p; ) p >>= 1;
                      if (
                        (p !== 0 ? ((C &= p - 1), (C += p)) : (C = 0),
                        T++,
                        --G[g] == 0)
                      ) {
                        if (g === D) break;
                        g = m[v + l[T]];
                      }
                      if ($ < g && (C & x) !== S) {
                        for (
                          J === 0 && (J = $), F += e, j = 1 << (L = g - J);
                          L + J < D && !((j -= G[L + J]) <= 0);

                        )
                          L++, (j <<= 1);
                        if (
                          ((q += 1 << L),
                          (y === 1 && 852 < q) || (y === 2 && 592 < q))
                        )
                          return 1;
                        d[(S = C & x)] = ($ << 24) | (L << 16) | (F - n) | 0;
                      }
                    }
                    return (
                      C !== 0 && (d[F + C] = ((g - J) << 24) | (64 << 16) | 0),
                      (a.bits = $),
                      0
                    );
                  };
                },
                { "../utils/common": 41 },
              ],
              51: [
                function (c, A, _) {
                  "use strict";
                  A.exports = {
                    2: "need dictionary",
                    1: "stream end",
                    0: "",
                    "-1": "file error",
                    "-2": "stream error",
                    "-3": "data error",
                    "-4": "insufficient memory",
                    "-5": "buffer error",
                    "-6": "incompatible version",
                  };
                },
                {},
              ],
              52: [
                function (c, A, _) {
                  "use strict";
                  var o = c("../utils/common"),
                    s = 0,
                    r = 1;
                  function h(u) {
                    for (var k = u.length; 0 <= --k; ) u[k] = 0;
                  }
                  var b = 0,
                    y = 29,
                    m = 256,
                    v = m + 1 + y,
                    i = 30,
                    d = 19,
                    n = 2 * v + 1,
                    l = 15,
                    a = 16,
                    p = 7,
                    w = 256,
                    S = 16,
                    x = 17,
                    F = 18,
                    B = [
                      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3,
                      3, 4, 4, 4, 4, 5, 5, 5, 5, 0,
                    ],
                    P = [
                      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8,
                      8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13,
                    ],
                    O = [
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
                    ],
                    M = [
                      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14,
                      1, 15,
                    ],
                    X = new Array(2 * (v + 2));
                  h(X);
                  var g = new Array(2 * i);
                  h(g);
                  var T = new Array(512);
                  h(T);
                  var e = new Array(256);
                  h(e);
                  var D = new Array(y);
                  h(D);
                  var $,
                    L,
                    J,
                    j = new Array(i);
                  function q(u, k, N, U, z) {
                    (this.static_tree = u),
                      (this.extra_bits = k),
                      (this.extra_base = N),
                      (this.elems = U),
                      (this.max_length = z),
                      (this.has_stree = u && u.length);
                  }
                  function C(u, k) {
                    (this.dyn_tree = u),
                      (this.max_code = 0),
                      (this.stat_desc = k);
                  }
                  function E(u) {
                    return u < 256 ? T[u] : T[256 + (u >>> 7)];
                  }
                  function V(u, k) {
                    (u.pending_buf[u.pending++] = 255 & k),
                      (u.pending_buf[u.pending++] = (k >>> 8) & 255);
                  }
                  function G(u, k, N) {
                    u.bi_valid > a - N
                      ? ((u.bi_buf |= (k << u.bi_valid) & 65535),
                        V(u, u.bi_buf),
                        (u.bi_buf = k >> (a - u.bi_valid)),
                        (u.bi_valid += N - a))
                      : ((u.bi_buf |= (k << u.bi_valid) & 65535),
                        (u.bi_valid += N));
                  }
                  function H(u, k, N) {
                    G(u, N[2 * k], N[2 * k + 1]);
                  }
                  function nt(u, k) {
                    for (
                      var N = 0;
                      (N |= 1 & u), (u >>>= 1), (N <<= 1), 0 < --k;

                    );
                    return N >>> 1;
                  }
                  function ot(u, k, N) {
                    var U,
                      z,
                      W = new Array(l + 1),
                      K = 0;
                    for (U = 1; U <= l; U++) W[U] = K = (K + N[U - 1]) << 1;
                    for (z = 0; z <= k; z++) {
                      var Z = u[2 * z + 1];
                      Z !== 0 && (u[2 * z] = nt(W[Z]++, Z));
                    }
                  }
                  function Q(u) {
                    var k;
                    for (k = 0; k < v; k++) u.dyn_ltree[2 * k] = 0;
                    for (k = 0; k < i; k++) u.dyn_dtree[2 * k] = 0;
                    for (k = 0; k < d; k++) u.bl_tree[2 * k] = 0;
                    (u.dyn_ltree[2 * w] = 1),
                      (u.opt_len = u.static_len = 0),
                      (u.last_lit = u.matches = 0);
                  }
                  function et(u) {
                    8 < u.bi_valid
                      ? V(u, u.bi_buf)
                      : 0 < u.bi_valid &&
                        (u.pending_buf[u.pending++] = u.bi_buf),
                      (u.bi_buf = 0),
                      (u.bi_valid = 0);
                  }
                  function at(u, k, N, U) {
                    var z = 2 * k,
                      W = 2 * N;
                    return u[z] < u[W] || (u[z] === u[W] && U[k] <= U[N]);
                  }
                  function it(u, k, N) {
                    for (
                      var U = u.heap[N], z = N << 1;
                      z <= u.heap_len &&
                      (z < u.heap_len &&
                        at(k, u.heap[z + 1], u.heap[z], u.depth) &&
                        z++,
                      !at(k, U, u.heap[z], u.depth));

                    )
                      (u.heap[N] = u.heap[z]), (N = z), (z <<= 1);
                    u.heap[N] = U;
                  }
                  function lt(u, k, N) {
                    var U,
                      z,
                      W,
                      K,
                      Z = 0;
                    if (u.last_lit !== 0)
                      for (
                        ;
                        (U =
                          (u.pending_buf[u.d_buf + 2 * Z] << 8) |
                          u.pending_buf[u.d_buf + 2 * Z + 1]),
                          (z = u.pending_buf[u.l_buf + Z]),
                          Z++,
                          U === 0
                            ? H(u, z, k)
                            : (H(u, (W = e[z]) + m + 1, k),
                              (K = B[W]) !== 0 && G(u, (z -= D[W]), K),
                              H(u, (W = E(--U)), N),
                              (K = P[W]) !== 0 && G(u, (U -= j[W]), K)),
                          Z < u.last_lit;

                      );
                    H(u, w, k);
                  }
                  function ht(u, k) {
                    var N,
                      U,
                      z,
                      W = k.dyn_tree,
                      K = k.stat_desc.static_tree,
                      Z = k.stat_desc.has_stree,
                      Y = k.stat_desc.elems,
                      rt = -1;
                    for (u.heap_len = 0, u.heap_max = n, N = 0; N < Y; N++)
                      W[2 * N] !== 0
                        ? ((u.heap[++u.heap_len] = rt = N), (u.depth[N] = 0))
                        : (W[2 * N + 1] = 0);
                    for (; u.heap_len < 2; )
                      (W[
                        2 * (z = u.heap[++u.heap_len] = rt < 2 ? ++rt : 0)
                      ] = 1),
                        (u.depth[z] = 0),
                        u.opt_len--,
                        Z && (u.static_len -= K[2 * z + 1]);
                    for (k.max_code = rt, N = u.heap_len >> 1; 1 <= N; N--)
                      it(u, W, N);
                    for (
                      z = Y;
                      (N = u.heap[1]),
                        (u.heap[1] = u.heap[u.heap_len--]),
                        it(u, W, 1),
                        (U = u.heap[1]),
                        (u.heap[--u.heap_max] = N),
                        (u.heap[--u.heap_max] = U),
                        (W[2 * z] = W[2 * N] + W[2 * U]),
                        (u.depth[z] =
                          (u.depth[N] >= u.depth[U] ? u.depth[N] : u.depth[U]) +
                          1),
                        (W[2 * N + 1] = W[2 * U + 1] = z),
                        (u.heap[1] = z++),
                        it(u, W, 1),
                        2 <= u.heap_len;

                    );
                    (u.heap[--u.heap_max] = u.heap[1]),
                      (function (tt, ut) {
                        var mt,
                          ft,
                          _t,
                          st,
                          yt,
                          St,
                          ct = ut.dyn_tree,
                          At = ut.max_code,
                          Lt = ut.stat_desc.static_tree,
                          Pt = ut.stat_desc.has_stree,
                          jt = ut.stat_desc.extra_bits,
                          It = ut.stat_desc.extra_base,
                          gt = ut.stat_desc.max_length,
                          wt = 0;
                        for (st = 0; st <= l; st++) tt.bl_count[st] = 0;
                        for (
                          ct[2 * tt.heap[tt.heap_max] + 1] = 0,
                            mt = tt.heap_max + 1;
                          mt < n;
                          mt++
                        )
                          gt <
                            (st =
                              ct[2 * ct[2 * (ft = tt.heap[mt]) + 1] + 1] + 1) &&
                            ((st = gt), wt++),
                            (ct[2 * ft + 1] = st),
                            At < ft ||
                              (tt.bl_count[st]++,
                              (yt = 0),
                              It <= ft && (yt = jt[ft - It]),
                              (St = ct[2 * ft]),
                              (tt.opt_len += St * (st + yt)),
                              Pt &&
                                (tt.static_len += St * (Lt[2 * ft + 1] + yt)));
                        if (wt !== 0) {
                          do {
                            for (st = gt - 1; tt.bl_count[st] === 0; ) st--;
                            tt.bl_count[st]--,
                              (tt.bl_count[st + 1] += 2),
                              tt.bl_count[gt]--,
                              (wt -= 2);
                          } while (0 < wt);
                          for (st = gt; st !== 0; st--)
                            for (ft = tt.bl_count[st]; ft !== 0; )
                              At < (_t = tt.heap[--mt]) ||
                                (ct[2 * _t + 1] !== st &&
                                  ((tt.opt_len +=
                                    (st - ct[2 * _t + 1]) * ct[2 * _t]),
                                  (ct[2 * _t + 1] = st)),
                                ft--);
                        }
                      })(u, k),
                      ot(W, rt, u.bl_count);
                  }
                  function t(u, k, N) {
                    var U,
                      z,
                      W = -1,
                      K = k[1],
                      Z = 0,
                      Y = 7,
                      rt = 4;
                    for (
                      K === 0 && ((Y = 138), (rt = 3)),
                        k[2 * (N + 1) + 1] = 65535,
                        U = 0;
                      U <= N;
                      U++
                    )
                      (z = K),
                        (K = k[2 * (U + 1) + 1]),
                        (++Z < Y && z === K) ||
                          (Z < rt
                            ? (u.bl_tree[2 * z] += Z)
                            : z !== 0
                            ? (z !== W && u.bl_tree[2 * z]++,
                              u.bl_tree[2 * S]++)
                            : Z <= 10
                            ? u.bl_tree[2 * x]++
                            : u.bl_tree[2 * F]++,
                          (W = z),
                          (rt =
                            (Z = 0) === K
                              ? ((Y = 138), 3)
                              : z === K
                              ? ((Y = 6), 3)
                              : ((Y = 7), 4)));
                  }
                  function R(u, k, N) {
                    var U,
                      z,
                      W = -1,
                      K = k[1],
                      Z = 0,
                      Y = 7,
                      rt = 4;
                    for (K === 0 && ((Y = 138), (rt = 3)), U = 0; U <= N; U++)
                      if (
                        ((z = K),
                        (K = k[2 * (U + 1) + 1]),
                        !(++Z < Y && z === K))
                      ) {
                        if (Z < rt) for (; H(u, z, u.bl_tree), --Z != 0; );
                        else
                          z !== 0
                            ? (z !== W && (H(u, z, u.bl_tree), Z--),
                              H(u, S, u.bl_tree),
                              G(u, Z - 3, 2))
                            : Z <= 10
                            ? (H(u, x, u.bl_tree), G(u, Z - 3, 3))
                            : (H(u, F, u.bl_tree), G(u, Z - 11, 7));
                        (W = z),
                          (rt =
                            (Z = 0) === K
                              ? ((Y = 138), 3)
                              : z === K
                              ? ((Y = 6), 3)
                              : ((Y = 7), 4));
                      }
                  }
                  h(j);
                  var I = !1;
                  function f(u, k, N, U) {
                    G(u, (b << 1) + (U ? 1 : 0), 3),
                      (function (z, W, K, Z) {
                        et(z),
                          Z && (V(z, K), V(z, ~K)),
                          o.arraySet(z.pending_buf, z.window, W, K, z.pending),
                          (z.pending += K);
                      })(u, k, N, !0);
                  }
                  (_._tr_init = function (u) {
                    I ||
                      ((function () {
                        var k,
                          N,
                          U,
                          z,
                          W,
                          K = new Array(l + 1);
                        for (z = U = 0; z < y - 1; z++)
                          for (D[z] = U, k = 0; k < 1 << B[z]; k++) e[U++] = z;
                        for (e[U - 1] = z, z = W = 0; z < 16; z++)
                          for (j[z] = W, k = 0; k < 1 << P[z]; k++) T[W++] = z;
                        for (W >>= 7; z < i; z++)
                          for (j[z] = W << 7, k = 0; k < 1 << (P[z] - 7); k++)
                            T[256 + W++] = z;
                        for (N = 0; N <= l; N++) K[N] = 0;
                        for (k = 0; k <= 143; ) (X[2 * k + 1] = 8), k++, K[8]++;
                        for (; k <= 255; ) (X[2 * k + 1] = 9), k++, K[9]++;
                        for (; k <= 279; ) (X[2 * k + 1] = 7), k++, K[7]++;
                        for (; k <= 287; ) (X[2 * k + 1] = 8), k++, K[8]++;
                        for (ot(X, v + 1, K), k = 0; k < i; k++)
                          (g[2 * k + 1] = 5), (g[2 * k] = nt(k, 5));
                        ($ = new q(X, B, m + 1, v, l)),
                          (L = new q(g, P, 0, i, l)),
                          (J = new q(new Array(0), O, 0, d, p));
                      })(),
                      (I = !0)),
                      (u.l_desc = new C(u.dyn_ltree, $)),
                      (u.d_desc = new C(u.dyn_dtree, L)),
                      (u.bl_desc = new C(u.bl_tree, J)),
                      (u.bi_buf = 0),
                      (u.bi_valid = 0),
                      Q(u);
                  }),
                    (_._tr_stored_block = f),
                    (_._tr_flush_block = function (u, k, N, U) {
                      var z,
                        W,
                        K = 0;
                      0 < u.level
                        ? (u.strm.data_type === 2 &&
                            (u.strm.data_type = (function (Z) {
                              var Y,
                                rt = 4093624447;
                              for (Y = 0; Y <= 31; Y++, rt >>>= 1)
                                if (1 & rt && Z.dyn_ltree[2 * Y] !== 0)
                                  return s;
                              if (
                                Z.dyn_ltree[18] !== 0 ||
                                Z.dyn_ltree[20] !== 0 ||
                                Z.dyn_ltree[26] !== 0
                              )
                                return r;
                              for (Y = 32; Y < m; Y++)
                                if (Z.dyn_ltree[2 * Y] !== 0) return r;
                              return s;
                            })(u)),
                          ht(u, u.l_desc),
                          ht(u, u.d_desc),
                          (K = (function (Z) {
                            var Y;
                            for (
                              t(Z, Z.dyn_ltree, Z.l_desc.max_code),
                                t(Z, Z.dyn_dtree, Z.d_desc.max_code),
                                ht(Z, Z.bl_desc),
                                Y = d - 1;
                              3 <= Y && Z.bl_tree[2 * M[Y] + 1] === 0;
                              Y--
                            );
                            return (Z.opt_len += 3 * (Y + 1) + 5 + 5 + 4), Y;
                          })(u)),
                          (z = (u.opt_len + 3 + 7) >>> 3),
                          (W = (u.static_len + 3 + 7) >>> 3) <= z && (z = W))
                        : (z = W = N + 5),
                        N + 4 <= z && k !== -1
                          ? f(u, k, N, U)
                          : u.strategy === 4 || W === z
                          ? (G(u, 2 + (U ? 1 : 0), 3), lt(u, X, g))
                          : (G(u, 4 + (U ? 1 : 0), 3),
                            (function (Z, Y, rt, tt) {
                              var ut;
                              for (
                                G(Z, Y - 257, 5),
                                  G(Z, rt - 1, 5),
                                  G(Z, tt - 4, 4),
                                  ut = 0;
                                ut < tt;
                                ut++
                              )
                                G(Z, Z.bl_tree[2 * M[ut] + 1], 3);
                              R(Z, Z.dyn_ltree, Y - 1),
                                R(Z, Z.dyn_dtree, rt - 1);
                            })(
                              u,
                              u.l_desc.max_code + 1,
                              u.d_desc.max_code + 1,
                              K + 1
                            ),
                            lt(u, u.dyn_ltree, u.dyn_dtree)),
                        Q(u),
                        U && et(u);
                    }),
                    (_._tr_tally = function (u, k, N) {
                      return (
                        (u.pending_buf[u.d_buf + 2 * u.last_lit] =
                          (k >>> 8) & 255),
                        (u.pending_buf[u.d_buf + 2 * u.last_lit + 1] = 255 & k),
                        (u.pending_buf[u.l_buf + u.last_lit] = 255 & N),
                        u.last_lit++,
                        k === 0
                          ? u.dyn_ltree[2 * N]++
                          : (u.matches++,
                            k--,
                            u.dyn_ltree[2 * (e[N] + m + 1)]++,
                            u.dyn_dtree[2 * E(k)]++),
                        u.last_lit === u.lit_bufsize - 1
                      );
                    }),
                    (_._tr_align = function (u) {
                      G(u, 2, 3),
                        H(u, w, X),
                        (function (k) {
                          k.bi_valid === 16
                            ? (V(k, k.bi_buf), (k.bi_buf = 0), (k.bi_valid = 0))
                            : 8 <= k.bi_valid &&
                              ((k.pending_buf[k.pending++] = 255 & k.bi_buf),
                              (k.bi_buf >>= 8),
                              (k.bi_valid -= 8));
                        })(u);
                    });
                },
                { "../utils/common": 41 },
              ],
              53: [
                function (c, A, _) {
                  "use strict";
                  A.exports = function () {
                    (this.input = null),
                      (this.next_in = 0),
                      (this.avail_in = 0),
                      (this.total_in = 0),
                      (this.output = null),
                      (this.next_out = 0),
                      (this.avail_out = 0),
                      (this.total_out = 0),
                      (this.msg = ""),
                      (this.state = null),
                      (this.data_type = 2),
                      (this.adler = 0);
                  };
                },
                {},
              ],
              54: [
                function (c, A, _) {
                  (function (o) {
                    (function (s, r) {
                      "use strict";
                      if (!s.setImmediate) {
                        var h,
                          b,
                          y,
                          m,
                          v = 1,
                          i = {},
                          d = !1,
                          n = s.document,
                          l = Object.getPrototypeOf && Object.getPrototypeOf(s);
                        (l = l && l.setTimeout ? l : s),
                          (h =
                            {}.toString.call(s.process) === "[object process]"
                              ? function (S) {
                                  process.nextTick(function () {
                                    p(S);
                                  });
                                }
                              : (function () {
                                  if (s.postMessage && !s.importScripts) {
                                    var S = !0,
                                      x = s.onmessage;
                                    return (
                                      (s.onmessage = function () {
                                        S = !1;
                                      }),
                                      s.postMessage("", "*"),
                                      (s.onmessage = x),
                                      S
                                    );
                                  }
                                })()
                              ? ((m = "setImmediate$" + Math.random() + "$"),
                                s.addEventListener
                                  ? s.addEventListener("message", w, !1)
                                  : s.attachEvent("onmessage", w),
                                function (S) {
                                  s.postMessage(m + S, "*");
                                })
                              : s.MessageChannel
                              ? (((y = new MessageChannel()).port1.onmessage =
                                  function (S) {
                                    p(S.data);
                                  }),
                                function (S) {
                                  y.port2.postMessage(S);
                                })
                              : n &&
                                "onreadystatechange" in
                                  n.createElement("script")
                              ? ((b = n.documentElement),
                                function (S) {
                                  var x = n.createElement("script");
                                  (x.onreadystatechange = function () {
                                    p(S),
                                      (x.onreadystatechange = null),
                                      b.removeChild(x),
                                      (x = null);
                                  }),
                                    b.appendChild(x);
                                })
                              : function (S) {
                                  setTimeout(p, 0, S);
                                }),
                          (l.setImmediate = function (S) {
                            typeof S != "function" &&
                              (S = new Function("" + S));
                            for (
                              var x = new Array(arguments.length - 1), F = 0;
                              F < x.length;
                              F++
                            )
                              x[F] = arguments[F + 1];
                            var B = { callback: S, args: x };
                            return (i[v] = B), h(v), v++;
                          }),
                          (l.clearImmediate = a);
                      }
                      function a(S) {
                        delete i[S];
                      }
                      function p(S) {
                        if (d) setTimeout(p, 0, S);
                        else {
                          var x = i[S];
                          if (x) {
                            d = !0;
                            try {
                              (function (F) {
                                var B = F.callback,
                                  P = F.args;
                                switch (P.length) {
                                  case 0:
                                    B();
                                    break;
                                  case 1:
                                    B(P[0]);
                                    break;
                                  case 2:
                                    B(P[0], P[1]);
                                    break;
                                  case 3:
                                    B(P[0], P[1], P[2]);
                                    break;
                                  default:
                                    B.apply(r, P);
                                }
                              })(x);
                            } finally {
                              a(S), (d = !1);
                            }
                          }
                        }
                      }
                      function w(S) {
                        S.source === s &&
                          typeof S.data == "string" &&
                          S.data.indexOf(m) === 0 &&
                          p(+S.data.slice(m.length));
                      }
                    })(typeof self > "u" ? (o === void 0 ? this : o) : self);
                  }).call(
                    this,
                    typeof global < "u"
                      ? global
                      : typeof self < "u"
                      ? self
                      : typeof window < "u"
                      ? window
                      : {}
                  );
                },
                {},
              ],
            },
            {},
            [10]
          )(10);
        });
      });
      var vt = Vt(Tt(), 1);
      function Et(c, A) {
        let _ = document.createElement("a");
        (_.style.display = "none"),
          (_.download = A),
          (_.href = URL.createObjectURL(c)),
          document.body.appendChild(_),
          _.click(),
          document.body.removeChild(_);
      }
      async function Ct(c) {
        try {
          return (await fetch(c)).blob();
        } catch {
          return null;
        }
      }
      function Ft(c) {
        var _;
        if (!c) return !1;
        let A =
          (_ = c.querySelector("h3[class^=header] span[class^=username]")) ==
          null
            ? void 0
            : _.textContent;
        if (A === "Midjourney Bot" || "niji・journey Bot") return !0;
        if (!A) return Ft(c.previousElementSibling);
      }
      function Nt(c) {
        var A, _, o, s;
        if (Ft(c)) {
          let r = c.id.substring(14),
            h = Array.from(
              ((A = c.querySelector("div[id^=message-content-]>strong")) == null
                ? void 0
                : A.childNodes) ?? []
            )
              .filter((m) => m.nodeType === Node.TEXT_NODE)
              .map((m) => m.textContent)
              .join(" "),
            b =
              (_ = c.querySelector(
                "div[class^=messageAttachment] div[class^=imageWrapper] a[data-role=img]"
              )) == null
                ? void 0
                : _.href;
          if (
            !(
              ((s =
                (o = Array.from(c.querySelectorAll("button"))) == null
                  ? void 0
                  : o.map((m) => m.textContent)) == null
                ? void 0
                : s.join("")) === "U1U2U3U4V1V2V3V4"
            )
          )
            return { id: r, prompts: h, url: b };
        }
      }
      async function Xt() {
        var r;
        let c = document.querySelector('ol[class^="scrollerInner-"]');
        if (!c) {
          alert(
            "\u8BF7\u6253\u5F00discord.com\uFF0C\u5E76\u8FDB\u5165\u5230newbie-*\u623F\u95F4"
          );
          return;
        }
        let _ = Array.from(c.children)
            .filter((h) => h.tagName === "LI")
            .map(Nt)
            .filter(
              (h) => (h == null ? void 0 : h.id) && (h == null ? void 0 : h.url)
            ),
          o = new vt.default();
        for (let h = 0; h < _.length; ++h) {
          console.log("[\u4E0B\u8F7D\u4E2D] ", `${h + 1} / ${_.length}`);
          let b = _[h];
          if (!b) continue;
          let y =
              (r = b.url.match(/^.+\/(.+?)\.png.*$/)) == null ? void 0 : r[1],
            m = await Ct(b.url);
          m &&
            y &&
            (o == null || o.file(`${y}.png`, m, { binary: !0 }),
            o == null ||
              o.file(`${y}.meta.json`, JSON.stringify(b, void 0, 4)));
        }
        let s = await o.generateAsync({ type: "blob" });
        Et(s, `midjourney-${Date.now()}.zip`);
      }
      var dt = new vt.default(),
        pt = 0,
        kt = new Set(),
        //大图打包数量  60张
        Rt = 60,
        xt;
      function Dt(c) {
        var _;
        let A = Nt(c);
        if (A != null && A.id && A.url) {
          let o =
            (_ = A.url.match(/^.+\/(.+?)\.png.*$/)) == null ? void 0 : _[1];
          o &&
            !kt.has(o) &&
            (kt.add(o),
            Ct(A.url).then((s) => {
              s &&
                (dt == null || dt.file(`${o}.png`, s, { binary: !0 }),
                dt == null ||
                  dt.file(`${o}.meta.json`, JSON.stringify(A, void 0, 4))),
                pt++,
                console.log(
                  `[NEW ARTWORK] ${A.url}`,
                  `[ZIP COUNT] ${pt} / ${Rt}`
                ),
                pt >= Rt && Ut();
            }));
        }
      }
      async function qt() {
        xt = new MutationObserver((A) => {
          A.forEach((_) => {
            let o = _.addedNodes;
            if (
              _.type === "childList" &&
              o != null &&
              o.length &&
              _.target.tagName === "OL"
            )
              o.forEach((s) => {
                let r = s;
                r.tagName === "LI" &&
                  r.id.startsWith("chat-messages-") &&
                  Dt(r);
              });
            else if (
              _.type === "attributes" &&
              _.attributeName === "class" &&
              _.target.tagName === "DIV" &&
              _.target.className.includes("imageWrapper")
            ) {
              let s = _.target;
              for (; (s == null ? void 0 : s.tagName) !== "LI" && s; )
                s = s.parentElement;
              s && Dt(s);
            }
          });
        });
        let c = document.querySelector('ol[class^="scrollerInner-"]');
        c && xt.observe(c, { attributes: !0, childList: !0, subtree: !0 });
      }
      async function Ut() {
        if (pt) {
          let c = dt;
          (dt = new vt.default()), (pt = 0), kt.clear();
          let A = await c.generateAsync({ type: "blob" });
          Et(A, `midjourney-${Date.now()}.zip`);
        }
      }
      window.xiazai = Ut;
      window.stopObserveAndDownload = function () {
        xt && xt.disconnect(),
          (dt = new vt.default()),
          (kt = new Set()),
          (pt = 0);
      };
      Xt();
      qt();
    })();
  }

  async function main() {
    console.log("启动脚本...");
    await sleep(10000);

    let style = document.createElement("style");
    let style_on = document.createElement("style");
    style.innerText = `.Btn{display:flex;width:90%;height:35px;margin:10px;justify-content: center;align-items: center;background-color: #2b2d31;color: white;font-weight: bolder;border-radius: 20px;box-shadow: 1px 1px 8px #e7ec1acf;}`;
    style_on.innerText = `.Btn_on{display:flex;width:90%;height:35px;margin:10px;justify-content: center;align-items: center;background-color: #2b2d31;color: white;font-weight: bolder;border-radius: 20px;box-shadow: 1px 1px 8px #1aec3fcf;}`;

    document.head.appendChild(style);
    document.head.appendChild(style_on);

    let btn1 = document.createElement("button");
    btn1.innerText = "手动下载";
    btn1.setAttribute("class", "Btn");
    document.querySelector(".scroller-1ox3I2").prepend(btn1);
    document.querySelector(".Btn").addEventListener("click", function () {
      console.log("手动下载");
      xiazai();
    });

    let btn2 = document.createElement("button");
    btn2.innerText = "自动下载大图";
    btn2.setAttribute("class", "Btn");
    document.querySelector(".scroller-1ox3I2").prepend(btn2);

    let btn2isRunning = false; // 初始状态为未运行

    document.querySelector(".Btn").addEventListener("click", function () {
      if (btn2isRunning) {
        // 如果已经在运行，那么停止它
        stopObserveAndDownload();
        btn2.innerText = "自动下载大图"; // 按钮文字变回原样
        btn2.setAttribute("class", "Btn");
      } else {
        // 否则，开始运行
        download();
        btn2.innerText = "自动下载大图（已开启）"; // 按钮文字变成：已开启
        btn2.setAttribute("class", "Btn_on");
      }
      btn2isRunning = !btn2isRunning; // 切换运行状态
    });

    let btn3 = document.createElement("button");
    btn3.innerText = "自动选大图";
    btn3.setAttribute("class", "Btn");
    document.querySelector(".scroller-1ox3I2").prepend(btn3);

    let isRunning = false; // 初始状态为未运行
    let intervalId = null; // 保存setInterval的ID

    document.querySelector(".Btn").addEventListener("click", function () {
      if (isRunning) {
        // 如果已经在运行，那么停止它
        clearInterval(intervalId);
        btn3.innerText = "自动选大图"; // 按钮文字变回原样
        btn3.setAttribute("class", "Btn");
      } else {
        // 否则，开始运行
        let lastCheckedMessage = null;
        intervalId = setInterval(async function () {
          const allMsg = document.getElementsByClassName(
            "messageListItem-ZZ7v6g"
          ); //获取消息列表
          const lastMsg = allMsg[allMsg.length - 1]; //获取最后一条消息的元素
          if (lastMsg !== lastCheckedMessage) {
            lastCheckedMessage = lastMsg;
            await clickButtons(lastMsg);
          }
        }, 100); // 每100毫秒检查一次
        btn3.innerText = "自动选大图（已开启）"; // 按钮文字变成：已开启
        btn3.setAttribute("class", "Btn_on");
      }
      isRunning = !isRunning; // 切换运行状态
    });
  }
  main();
})();
