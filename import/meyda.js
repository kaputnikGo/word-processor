! function(r, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (r = "undefined" != typeof globalThis ? globalThis : r || self).Meyda = t()
}(this, (function() {
    "use strict";
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
    function r(r, t, e) {
        if (e || 2 === arguments.length)
            for (var a, n = 0, i = t.length; n < i; n++) !a && n in t || (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
        return r.concat(a || t)
    }
    var t = Object.freeze({
            __proto__: null,
            blackman: function(r) {
                for (var t = new Float32Array(r), e = 2 * Math.PI / (r - 1), a = 2 * e, n = 0; n < r / 2; n++) t[n] = .42 - .5 * Math.cos(n * e) + .08 * Math.cos(n * a);
                for (n = Math.ceil(r / 2); n > 0; n--) t[r - n] = t[n - 1];
                return t
            },
            sine: function(r) {
                for (var t = Math.PI / (r - 1), e = new Float32Array(r), a = 0; a < r; a++) e[a] = Math.sin(t * a);
                return e
            },
            hanning: function(r) {
                for (var t = new Float32Array(r), e = 0; e < r; e++) t[e] = .5 - .5 * Math.cos(2 * Math.PI * e / (r - 1));
                return t
            },
            hamming: function(r) {
                for (var t = new Float32Array(r), e = 0; e < r; e++) t[e] = .54 - .46 * Math.cos(2 * Math.PI * (e / r - 1));
                return t
            }
        }),
        e = {};

    function a(r) {
        for (; r % 2 == 0 && r > 1;) r /= 2;
        return 1 === r
    }

    function n(r, a) {
        if ("rect" !== a) {
            if ("" !== a && a || (a = "hanning"), e[a] || (e[a] = {}), !e[a][r.length]) try {
                e[a][r.length] = t[a](r.length)
            } catch (r) {
                throw new Error("Invalid windowing function")
            }
            r = function(r, t) {
                for (var e = [], a = 0; a < Math.min(r.length, t.length); a++) e[a] = r[a] * t[a];
                return e
            }(r, e[a][r.length])
        }
        return r
    }

    function i(r, t, e) {
        for (var a = new Float32Array(r), n = 0; n < a.length; n++) a[n] = n * t / e, a[n] = 13 * Math.atan(a[n] / 1315.8) + 3.5 * Math.atan(Math.pow(a[n] / 7518, 2));
        return a
    }

    function o(r) {
        return Float32Array.from(r)
    }

    function u(r) {
        return 1125 * Math.log(1 + r / 700)
    }

    function f(r, t, e) {
        for (var a, n = new Float32Array(r + 2), i = new Float32Array(r + 2), o = t / 2, f = u(0), c = (u(o) - f) / (r + 1), l = new Array(r + 2), s = 0; s < n.length; s++) n[s] = s * c, i[s] = (a = n[s], 700 * (Math.exp(a / 1125) - 1)), l[s] = Math.floor((e + 1) * i[s] / t);
        for (var h = new Array(r), m = 0; m < h.length; m++) {
            h[m] = new Array(e / 2 + 1).fill(0);
            for (s = l[m]; s < l[m + 1]; s++) h[m][s] = (s - l[m]) / (l[m + 1] - l[m]);
            for (s = l[m + 1]; s < l[m + 2]; s++) h[m][s] = (l[m + 2] - s) / (l[m + 2] - l[m + 1])
        }
        return h
    }

    function c(t, e, a, n, i, o, u) {
        void 0 === n && (n = 5), void 0 === i && (i = 2), void 0 === o && (o = !0), void 0 === u && (u = 440);
        var f = Math.floor(a / 2) + 1,
            c = new Array(a).fill(0).map((function(r, n) {
                return t * function(r, t) {
                    return Math.log2(16 * r / t)
                }(e * n / a, u)
            }));
        c[0] = c[1] - 1.5 * t;
        var l, s, h, m = c.slice(1).map((function(r, t) {
                return Math.max(r - c[t])
            }), 1).concat([1]),
            p = Math.round(t / 2),
            g = new Array(t).fill(0).map((function(r, e) {
                return c.map((function(r) {
                    return (10 * t + p + r - e) % t - p
                }))
            })),
            w = g.map((function(r, t) {
                return r.map((function(r, e) {
                    return Math.exp(-.5 * Math.pow(2 * g[t][e] / m[e], 2))
                }))
            }));
        if (s = (l = w)[0].map((function() {
                return 0
            })), h = l.reduce((function(r, t) {
                return t.forEach((function(t, e) {
                    r[e] += Math.pow(t, 2)
                })), r
            }), s).map(Math.sqrt), w = l.map((function(r, t) {
                return r.map((function(r, t) {
                    return r / (h[t] || 1)
                }))
            })), i) {
            var v = c.map((function(r) {
                return Math.exp(-.5 * Math.pow((r / t - n) / i, 2))
            }));
            w = w.map((function(r) {
                return r.map((function(r, t) {
                    return r * v[t]
                }))
            }))
        }
        return o && (w = r(r([], w.slice(3)), w.slice(0, 3))), w.map((function(r) {
            return r.slice(0, f)
        }))
    }

    function l(r, t) {
        for (var e = 0, a = 0, n = 0; n < t.length; n++) e += Math.pow(n, r) * Math.abs(t[n]), a += t[n];
        return e / a
    }

    function s(r) {
        var t = r.ampSpectrum,
            e = r.barkScale;
        if ("object" != typeof t || "object" != typeof e) throw new TypeError;
        var a = 24,
            n = new Float32Array(a),
            i = 0,
            o = t,
            u = new Int32Array(25);
        u[0] = 0;
        for (var f = e[o.length - 1] / a, c = 1, l = 0; l < o.length; l++)
            for (; e[l] > f;) u[c++] = l, f = c * e[o.length - 1] / a;
        u[24] = o.length - 1;
        for (l = 0; l < a; l++) {
            for (var s = 0, h = u[l]; h < u[l + 1]; h++) s += o[h];
            n[l] = Math.pow(s, .23)
        }
        for (l = 0; l < n.length; l++) i += n[l];
        return {
            specific: n,
            total: i
        }
    }

    function h(r) {
        var t = r.ampSpectrum;
        if ("object" != typeof t) throw new TypeError;
        for (var e = new Float32Array(t.length), a = 0; a < e.length; a++) e[a] = Math.pow(t[a], 2);
        return e
    }
    var m = null;
    var p = function(r, t) {
        var e = r.length;
        return t = t || 2, m && m[e] || function(r) {
            (m = m || {})[r] = new Array(r * r);
            for (var t = Math.PI / r, e = 0; e < r; e++)
                for (var a = 0; a < r; a++) m[r][a + e * r] = Math.cos(t * (a + .5) * e)
        }(e), r.map((function() {
            return 0
        })).map((function(a, n) {
            return t * r.reduce((function(r, t, a, i) {
                return r + t * m[e][a + n * e]
            }), 0)
        }))
    };
    var g = Object.freeze({
        __proto__: null,
        buffer: function(r) {
            return r.signal
        },
        rms: function(r) {
            var t = r.signal;
            if ("object" != typeof t) throw new TypeError;
            for (var e = 0, a = 0; a < t.length; a++) e += Math.pow(t[a], 2);
            return e /= t.length, e = Math.sqrt(e)
        },
        energy: function(r) {
            var t = r.signal;
            if ("object" != typeof t) throw new TypeError;
            for (var e = 0, a = 0; a < t.length; a++) e += Math.pow(Math.abs(t[a]), 2);
            return e
        },
        complexSpectrum: function(r) {
            return r.complexSpectrum
        },
        spectralSlope: function(r) {
            var t = r.ampSpectrum,
                e = r.sampleRate,
                a = r.bufferSize;
            if ("object" != typeof t) throw new TypeError;
            for (var n = 0, i = 0, o = new Float32Array(t.length), u = 0, f = 0, c = 0; c < t.length; c++) {
                n += t[c];
                var l = c * e / a;
                o[c] = l, u += l * l, i += l, f += l * t[c]
            }
            return (t.length * f - i * n) / (n * (u - Math.pow(i, 2)))
        },
        spectralCentroid: function(r) {
            var t = r.ampSpectrum;
            if ("object" != typeof t) throw new TypeError;
            return l(1, t)
        },
        spectralRolloff: function(r) {
            var t = r.ampSpectrum,
                e = r.sampleRate;
            if ("object" != typeof t) throw new TypeError;
            for (var a = t, n = e / (2 * (a.length - 1)), i = 0, o = 0; o < a.length; o++) i += a[o];
            for (var u = .99 * i, f = a.length - 1; i > u && f >= 0;) i -= a[f], --f;
            return (f + 1) * n
        },
        spectralFlatness: function(r) {
            var t = r.ampSpectrum;
            if ("object" != typeof t) throw new TypeError;
            for (var e = 0, a = 0, n = 0; n < t.length; n++) e += Math.log(t[n]), a += t[n];
            return Math.exp(e / t.length) * t.length / a
        },
        spectralSpread: function(r) {
            var t = r.ampSpectrum;
            if ("object" != typeof t) throw new TypeError;
            return Math.sqrt(l(2, t) - Math.pow(l(1, t), 2))
        },
        spectralSkewness: function(r) {
            var t = r.ampSpectrum;
            if ("object" != typeof t) throw new TypeError;
            var e = l(1, t),
                a = l(2, t),
                n = l(3, t);
            return (2 * Math.pow(e, 3) - 3 * e * a + n) / Math.pow(Math.sqrt(a - Math.pow(e, 2)), 3)
        },
        spectralKurtosis: function(r) {
            var t = r.ampSpectrum;
            if ("object" != typeof t) throw new TypeError;
            var e = t,
                a = l(1, e),
                n = l(2, e),
                i = l(3, e),
                o = l(4, e);
            return (-3 * Math.pow(a, 4) + 6 * a * n - 4 * a * i + o) / Math.pow(Math.sqrt(n - Math.pow(a, 2)), 4)
        },
        amplitudeSpectrum: function(r) {
            return r.ampSpectrum
        },
        zcr: function(r) {
            var t = r.signal;
            if ("object" != typeof t) throw new TypeError;
            for (var e = 0, a = 1; a < t.length; a++)(t[a - 1] >= 0 && t[a] < 0 || t[a - 1] < 0 && t[a] >= 0) && e++;
            return e
        },
        loudness: s,
        perceptualSpread: function(r) {
            for (var t = s({
                    ampSpectrum: r.ampSpectrum,
                    barkScale: r.barkScale
                }), e = 0, a = 0; a < t.specific.length; a++) t.specific[a] > e && (e = t.specific[a]);
            return Math.pow((t.total - e) / t.total, 2)
        },
        perceptualSharpness: function(r) {
            for (var t = s({
                    ampSpectrum: r.ampSpectrum,
                    barkScale: r.barkScale
                }), e = t.specific, a = 0, n = 0; n < e.length; n++) a += n < 15 ? (n + 1) * e[n + 1] : .066 * Math.exp(.171 * (n + 1));
            return a *= .11 / t.total
        },
        powerSpectrum: h,
        mfcc: function(r) {
            var t = r.ampSpectrum,
                e = r.melFilterBank,
                a = r.numberOfMFCCCoefficients,
                n = r.bufferSize;
            if ("object" != typeof t) throw new TypeError("Valid ampSpectrum is required to generate MFCC");
            if ("object" != typeof e) throw new TypeError("Valid melFilterBank is required to generate MFCC");
            var i = Math.min(40, Math.max(1, a || 13)),
                o = h({
                    ampSpectrum: t
                }),
                u = e.length,
                f = Array(u);
            if (u < i) throw new Error("Insufficient filter bank for requested number of coefficients");
            for (var c = new Float32Array(u), l = 0; l < c.length; l++) {
                f[l] = new Float32Array(n / 2), c[l] = 0;
                for (var s = 0; s < n / 2; s++) f[l][s] = e[l][s] * o[s], c[l] += f[l][s];
                c[l] = Math.log(c[l] + 1)
            }
            var m = Array.prototype.slice.call(c);
            return p(m).slice(0, i)
        },
        chroma: function(r) {
            var t = r.ampSpectrum,
                e = r.chromaFilterBank;
            if ("object" != typeof t) throw new TypeError("Valid ampSpectrum is required to generate chroma");
            if ("object" != typeof e) throw new TypeError("Valid chromaFilterBank is required to generate chroma");
            var a = e.map((function(r, e) {
                    return t.reduce((function(t, e, a) {
                        return t + e * r[a]
                    }), 0)
                })),
                n = Math.max.apply(Math, a);
            return n ? a.map((function(r) {
                return r / n
            })) : a
        },
        spectralFlux: function(r) {
            var t = r.signal,
                e = r.previousSignal,
                a = r.bufferSize;
            if ("object" != typeof t || "object" != typeof e) throw new TypeError;
            for (var n = 0, i = -a / 2; i < t.length / 2 - 1; i++) x = Math.abs(t[i]) - Math.abs(e[i]), n += (x + Math.abs(x)) / 2;
            return n
        }
    });

    function w(r) {
        if (Array.isArray(r)) {
            for (var t = 0, e = Array(r.length); t < r.length; t++) e[t] = r[t];
            return e
        }
        return Array.from(r)
    }
    var v = {},
        d = {},
        _ = {
            bitReverseArray: function(r) {
                if (void 0 === v[r]) {
                    for (var t = (r - 1).toString(2).length, e = "0".repeat(t), a = {}, n = 0; n < r; n++) {
                        var i = n.toString(2);
                        i = e.substr(i.length) + i, i = [].concat(w(i)).reverse().join(""), a[n] = parseInt(i, 2)
                    }
                    v[r] = a
                }
                return v[r]
            },
            multiply: function(r, t) {
                return {
                    real: r.real * t.real - r.imag * t.imag,
                    imag: r.real * t.imag + r.imag * t.real
                }
            },
            add: function(r, t) {
                return {
                    real: r.real + t.real,
                    imag: r.imag + t.imag
                }
            },
            subtract: function(r, t) {
                return {
                    real: r.real - t.real,
                    imag: r.imag - t.imag
                }
            },
            euler: function(r, t) {
                var e = -2 * Math.PI * r / t;
                return {
                    real: Math.cos(e),
                    imag: Math.sin(e)
                }
            },
            conj: function(r) {
                return r.imag *= -1, r
            },
            constructComplexArray: function(r) {
                var t = {};
                t.real = void 0 === r.real ? r.slice() : r.real.slice();
                var e = t.real.length;
                return void 0 === d[e] && (d[e] = Array.apply(null, Array(e)).map(Number.prototype.valueOf, 0)), t.imag = d[e].slice(), t
            }
        },
        S = function(r) {
            var t = {};
            void 0 === r.real || void 0 === r.imag ? t = _.constructComplexArray(r) : (t.real = r.real.slice(), t.imag = r.imag.slice());
            var e = t.real.length,
                a = Math.log2(e);
            if (Math.round(a) != a) throw new Error("Input size must be a power of 2.");
            if (t.real.length != t.imag.length) throw new Error("Real and imaginary components must have the same length.");
            for (var n = _.bitReverseArray(e), i = {
                    real: [],
                    imag: []
                }, o = 0; o < e; o++) i.real[n[o]] = t.real[o], i.imag[n[o]] = t.imag[o];
            for (var u = 0; u < e; u++) t.real[u] = i.real[u], t.imag[u] = i.imag[u];
            for (var f = 1; f <= a; f++)
                for (var c = Math.pow(2, f), l = 0; l < c / 2; l++)
                    for (var s = _.euler(l, c), h = 0; h < e / c; h++) {
                        var m = c * h + l,
                            p = c * h + l + c / 2,
                            g = {
                                real: t.real[m],
                                imag: t.imag[m]
                            },
                            w = {
                                real: t.real[p],
                                imag: t.imag[p]
                            },
                            v = _.multiply(s, w),
                            d = _.subtract(g, v);
                        t.real[p] = d.real, t.imag[p] = d.imag;
                        var S = _.add(v, g);
                        t.real[m] = S.real, t.imag[m] = S.imag
                    }
            return t
        },
        y = S,
        b = function() {
            function r(r, t) {
                var e = this;
                if (this._m = t, !r.audioContext) throw this._m.errors.noAC;
                if (r.bufferSize && !a(r.bufferSize)) throw this._m._errors.notPow2;
                if (!r.source) throw this._m._errors.noSource;
                this._m.audioContext = r.audioContext, this._m.bufferSize = r.bufferSize || this._m.bufferSize || 256, this._m.hopSize = r.hopSize || this._m.hopSize || this._m.bufferSize, this._m.sampleRate = r.sampleRate || this._m.audioContext.sampleRate || 44100, this._m.callback = r.callback, this._m.windowingFunction = r.windowingFunction || "hanning", this._m.featureExtractors = g, this._m.EXTRACTION_STARTED = r.startImmediately || !1, this._m.channel = "number" == typeof r.channel ? r.channel : 0, this._m.inputs = r.inputs || 1, this._m.outputs = r.outputs || 1, this._m.numberOfMFCCCoefficients = r.numberOfMFCCCoefficients || this._m.numberOfMFCCCoefficients || 13, this._m.spn = this._m.audioContext.createScriptProcessor(this._m.bufferSize, this._m.inputs, this._m.outputs), this._m.spn.connect(this._m.audioContext.destination), this._m._featuresToExtract = r.featureExtractors || [], this._m.barkScale = i(this._m.bufferSize, this._m.sampleRate, this._m.bufferSize), this._m.melFilterBank = f(Math.max(this._m.melBands, this._m.numberOfMFCCCoefficients), this._m.sampleRate, this._m.bufferSize), this._m.inputData = null, this._m.previousInputData = null, this._m.frame = null, this._m.previousFrame = null, this.setSource(r.source), this._m.spn.onaudioprocess = function(r) {
                    var t;
                    null !== e._m.inputData && (e._m.previousInputData = e._m.inputData), e._m.inputData = r.inputBuffer.getChannelData(e._m.channel), e._m.previousInputData ? ((t = new Float32Array(e._m.previousInputData.length + e._m.inputData.length - e._m.hopSize)).set(e._m.previousInputData.slice(e._m.hopSize)), t.set(e._m.inputData, e._m.previousInputData.length - e._m.hopSize)) : t = e._m.inputData,
                        function(r, t, e) {
                            if (r.length < t) throw new Error("Buffer is too short for frame length");
                            if (e < 1) throw new Error("Hop length cannot be less that 1");
                            if (t < 1) throw new Error("Frame length cannot be less that 1");
                            var a = 1 + Math.floor((r.length - t) / e);
                            return new Array(a).fill(0).map((function(a, n) {
                                return r.slice(n * e, n * e + t)
                            }))
                        }(t, e._m.bufferSize, e._m.hopSize).forEach((function(r) {
                            e._m.frame = r;
                            var t = e._m.extract(e._m._featuresToExtract, e._m.frame, e._m.previousFrame);
                            "function" == typeof e._m.callback && e._m.EXTRACTION_STARTED && e._m.callback(t), e._m.previousFrame = e._m.frame
                        }))
                }
            }
            return r.prototype.start = function(r) {
                this._m._featuresToExtract = r || this._m._featuresToExtract, this._m.EXTRACTION_STARTED = !0
            }, r.prototype.stop = function() {
                this._m.EXTRACTION_STARTED = !1
            }, r.prototype.setSource = function(r) {
                this._m.source && this._m.source.disconnect(this._m.spn), this._m.source = r, this._m.source.connect(this._m.spn)
            }, r.prototype.setChannel = function(r) {
                r <= this._m.inputs ? this._m.channel = r : console.error("Channel " + r + " does not exist. Make sure you've provided a value for 'inputs' that is greater than " + r + " when instantiating the MeydaAnalyzer")
            }, r.prototype.get = function(r) {
                return this._m.inputData ? this._m.extract(r || this._m._featuresToExtract, this._m.inputData, this._m.previousInputData) : null
            }, r
        }(),
        M = {
            audioContext: null,
            spn: null,
            bufferSize: 512,
            sampleRate: 44100,
            melBands: 26,
            chromaBands: 12,
            callback: null,
            windowingFunction: "hanning",
            featureExtractors: g,
            EXTRACTION_STARTED: !1,
            numberOfMFCCCoefficients: 13,
            _featuresToExtract: [],
            windowing: n,
            _errors: {
                notPow2: new Error("Meyda: Buffer size must be a power of 2, e.g. 64 or 512"),
                featureUndef: new Error("Meyda: No features defined."),
                invalidFeatureFmt: new Error("Meyda: Invalid feature format"),
                invalidInput: new Error("Meyda: Invalid input."),
                noAC: new Error("Meyda: No AudioContext specified."),
                noSource: new Error("Meyda: No source node specified.")
            },
            createMeydaAnalyzer: function(r) {
                return new b(r, Object.assign({}, M))
            },
            listAvailableFeatureExtractors: function() {
                return Object.keys(this.featureExtractors)
            },
            extract: function(r, t, e) {
                var n = this;
                if (!t) throw this._errors.invalidInput;
                if ("object" != typeof t) throw this._errors.invalidInput;
                if (!r) throw this._errors.featureUndef;
                if (!a(t.length)) throw this._errors.notPow2;
                void 0 !== this.barkScale && this.barkScale.length == this.bufferSize || (this.barkScale = i(this.bufferSize, this.sampleRate, this.bufferSize)), void 0 !== this.melFilterBank && this.barkScale.length == this.bufferSize && this.melFilterBank.length == this.melBands || (this.melFilterBank = f(Math.max(this.melBands, this.numberOfMFCCCoefficients), this.sampleRate, this.bufferSize)), void 0 !== this.chromaFilterBank && this.chromaFilterBank.length == this.chromaBands || (this.chromaFilterBank = c(this.chromaBands, this.sampleRate, this.bufferSize)), void 0 === t.buffer ? this.signal = o(t) : this.signal = t;
                var u = F(t, this.windowingFunction, this.bufferSize);
                if (this.signal = u.windowedSignal, this.complexSpectrum = u.complexSpectrum, this.ampSpectrum = u.ampSpectrum, e) {
                    var l = F(e, this.windowingFunction, this.bufferSize);
                    this.previousSignal = l.windowedSignal, this.previousComplexSpectrum = l.complexSpectrum, this.previousAmpSpectrum = l.ampSpectrum
                }
                var s = function(r) {
                    return n.featureExtractors[r]({
                        ampSpectrum: n.ampSpectrum,
                        chromaFilterBank: n.chromaFilterBank,
                        complexSpectrum: n.complexSpectrum,
                        signal: n.signal,
                        bufferSize: n.bufferSize,
                        sampleRate: n.sampleRate,
                        barkScale: n.barkScale,
                        melFilterBank: n.melFilterBank,
                        previousSignal: n.previousSignal,
                        previousAmpSpectrum: n.previousAmpSpectrum,
                        previousComplexSpectrum: n.previousComplexSpectrum,
                        numberOfMFCCCoefficients: n.numberOfMFCCCoefficients
                    })
                };
                if ("object" == typeof r) return r.reduce((function(r, t) {
                    var e;
                    return Object.assign({}, r, ((e = {})[t] = s(t), e))
                }), {});
                if ("string" == typeof r) return s(r);
                throw this._errors.invalidFeatureFmt
            }
        },
        F = function(r, t, e) {
            var a = {};
            void 0 === r.buffer ? a.signal = o(r) : a.signal = r, a.windowedSignal = n(a.signal, t), a.complexSpectrum = y(a.windowedSignal), a.ampSpectrum = new Float32Array(e / 2);
            for (var i = 0; i < e / 2; i++) a.ampSpectrum[i] = Math.sqrt(Math.pow(a.complexSpectrum.real[i], 2) + Math.pow(a.complexSpectrum.imag[i], 2));
            return a
        };
    return "undefined" != typeof window && (window.Meyda = M), M
}));
//# sourceMappingURL=meyda.min.js.map
