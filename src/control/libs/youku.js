function s(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }
    function i(e, t) {
        var i, n, r, a, o;
        return r = 2147483648 & e,
        a = 2147483648 & t,
        i = 1073741824 & e,
        n = 1073741824 & t,
        o = (1073741823 & e) + (1073741823 & t),
        i & n ? 2147483648 ^ o ^ r ^ a : i | n ? 1073741824 & o ? 3221225472 ^ o ^ r ^ a : 1073741824 ^ o ^ r ^ a : o ^ r ^ a
    }
    function n(e, t, i) {
        return e & t | ~e & i
    }
    function r(e, t, i) {
        return e & i | t & ~i
    }
    function a(e, t, i) {
        return e ^ t ^ i
    }
    function o(e, t, i) {
        return t ^ (e | ~i)
    }
    function s(e, r, a, o, s, l, u) {
        return e = i(e, i(i(n(r, a, o), s), u)),
        i(t(e, l), r)
    }
    function l(e, n, a, o, s, l, u) {
        return e = i(e, i(i(r(n, a, o), s), u)),
        i(t(e, l), n)
    }
    function u(e, n, r, o, s, l, u) {
        return e = i(e, i(i(a(n, r, o), s), u)),
        i(t(e, l), n)
    }
    function c(e, n, r, a, s, l, u) {
        return e = i(e, i(i(o(n, r, a), s), u)),
        i(t(e, l), n)
    }
    function d(e) {
        for (var t, i = e.length, n = i + 8, r = (n - n % 64) / 64, a = 16 * (r + 1), o = new Array(a - 1), s = 0, l = 0; i > l; )
            t = (l - l % 4) / 4,
            s = 8 * (l % 4),
            o[t] = o[t] | e.charCodeAt(l) << s,
            l++;
        return t = (l - l % 4) / 4,
        s = 8 * (l % 4),
        o[t] = o[t] | 128 << s,
        o[a - 2] = i << 3,
        o[a - 1] = i >>> 29,
        o
    }
    function f(e) {
        var t, i, n = "", r = "";
        for (i = 0; 3 >= i; i++)
            t = 255 & e >>> 8 * i,
            r = "0" + t.toString(16),
            n += r.substr(r.length - 2, 2);
        return n
    }
    function p(e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", i = 0; i < e.length; i++) {
            var n = e.charCodeAt(i);
            128 > n ? t += String.fromCharCode(n) : n > 127 && 2048 > n ? (t += String.fromCharCode(192 | n >> 6),
            t += String.fromCharCode(128 | 63 & n)) : (t += String.fromCharCode(224 | n >> 12),
            t += String.fromCharCode(128 | 63 & n >> 6),
            t += String.fromCharCode(128 | 63 & n))
        }
        return t
    }
    var h, m, v, g, y, b, _, w, k, x = [], C = 7, T = 12, E = 17, S = 22, A = 5, I = 9, P = 14, L = 20, D = 4, N = 11, O = 16, R = 23, j = 6, M = 10, $ = 15, F = 21;
    for (e = p(e),
    x = d(e),
    b = 1732584193,
    _ = 4023233417,
    w = 2562383102,
    k = 271733878,
    h = 0; h < x.length; h += 16)
        m = b,
        v = _,
        g = w,
        y = k,
        b = s(b, _, w, k, x[h + 0], C, 3614090360),
        k = s(k, b, _, w, x[h + 1], T, 3905402710),
        w = s(w, k, b, _, x[h + 2], E, 606105819),
        _ = s(_, w, k, b, x[h + 3], S, 3250441966),
        b = s(b, _, w, k, x[h + 4], C, 4118548399),
        k = s(k, b, _, w, x[h + 5], T, 1200080426),
        w = s(w, k, b, _, x[h + 6], E, 2821735955),
        _ = s(_, w, k, b, x[h + 7], S, 4249261313),
        b = s(b, _, w, k, x[h + 8], C, 1770035416),
        k = s(k, b, _, w, x[h + 9], T, 2336552879),
        w = s(w, k, b, _, x[h + 10], E, 4294925233),
        _ = s(_, w, k, b, x[h + 11], S, 2304563134),
        b = s(b, _, w, k, x[h + 12], C, 1804603682),
        k = s(k, b, _, w, x[h + 13], T, 4254626195),
        w = s(w, k, b, _, x[h + 14], E, 2792965006),
        _ = s(_, w, k, b, x[h + 15], S, 1236535329),
        b = l(b, _, w, k, x[h + 1], A, 4129170786),
        k = l(k, b, _, w, x[h + 6], I, 3225465664),
        w = l(w, k, b, _, x[h + 11], P, 643717713),
        _ = l(_, w, k, b, x[h + 0], L, 3921069994),
        b = l(b, _, w, k, x[h + 5], A, 3593408605),
        k = l(k, b, _, w, x[h + 10], I, 38016083),
        w = l(w, k, b, _, x[h + 15], P, 3634488961),
        _ = l(_, w, k, b, x[h + 4], L, 3889429448),
        b = l(b, _, w, k, x[h + 9], A, 568446438),
        k = l(k, b, _, w, x[h + 14], I, 3275163606),
        w = l(w, k, b, _, x[h + 3], P, 4107603335),
        _ = l(_, w, k, b, x[h + 8], L, 1163531501),
        b = l(b, _, w, k, x[h + 13], A, 2850285829),
        k = l(k, b, _, w, x[h + 2], I, 4243563512),
        w = l(w, k, b, _, x[h + 7], P, 1735328473),
        _ = l(_, w, k, b, x[h + 12], L, 2368359562),
        b = u(b, _, w, k, x[h + 5], D, 4294588738),
        k = u(k, b, _, w, x[h + 8], N, 2272392833),
        w = u(w, k, b, _, x[h + 11], O, 1839030562),
        _ = u(_, w, k, b, x[h + 14], R, 4259657740),
        b = u(b, _, w, k, x[h + 1], D, 2763975236),
        k = u(k, b, _, w, x[h + 4], N, 1272893353),
        w = u(w, k, b, _, x[h + 7], O, 4139469664),
        _ = u(_, w, k, b, x[h + 10], R, 3200236656),
        b = u(b, _, w, k, x[h + 13], D, 681279174),
        k = u(k, b, _, w, x[h + 0], N, 3936430074),
        w = u(w, k, b, _, x[h + 3], O, 3572445317),
        _ = u(_, w, k, b, x[h + 6], R, 76029189),
        b = u(b, _, w, k, x[h + 9], D, 3654602809),
        k = u(k, b, _, w, x[h + 12], N, 3873151461),
        w = u(w, k, b, _, x[h + 15], O, 530742520),
        _ = u(_, w, k, b, x[h + 2], R, 3299628645),
        b = c(b, _, w, k, x[h + 0], j, 4096336452),
        k = c(k, b, _, w, x[h + 7], M, 1126891415),
        w = c(w, k, b, _, x[h + 14], $, 2878612391),
        _ = c(_, w, k, b, x[h + 5], F, 4237533241),
        b = c(b, _, w, k, x[h + 12], j, 1700485571),
        k = c(k, b, _, w, x[h + 3], M, 2399980690),
        w = c(w, k, b, _, x[h + 10], $, 4293915773),
        _ = c(_, w, k, b, x[h + 1], F, 2240044497),
        b = c(b, _, w, k, x[h + 8], j, 1873313359),
        k = c(k, b, _, w, x[h + 15], M, 4264355552),
        w = c(w, k, b, _, x[h + 6], $, 2734768916),
        _ = c(_, w, k, b, x[h + 13], F, 1309151649),
        b = c(b, _, w, k, x[h + 4], j, 4149444226),
        k = c(k, b, _, w, x[h + 11], M, 3174756917),
        w = c(w, k, b, _, x[h + 2], $, 718787259),
        _ = c(_, w, k, b, x[h + 9], F, 3951481745),
        b = i(b, m),
        _ = i(_, v),
        w = i(w, g),
        k = i(k, y);
    var U = f(b) + f(_) + f(w) + f(k);
    return U.toLowerCase()
}

module.exports = s;
