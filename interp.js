/**
 * @author Scott Christopher Stauffer <scstauf at gmail dot com>
 */

(function () {
    String.prototype.interp = function (v) {
        var s = this.valueOf(),
            a = [],
            ns = '',
            b = false,
            e = false,
            l = s.length,
            al = arguments.length,
            i = 0,
            n = -1,
            c = '';

        if (!s || l === 0) return '';
        if (v.constructor === Array) a = v;
        else
            for (i = 0; i < al; i++)
                a.push(arguments[i]);

        for (i = 0; i < l; i++) {
            c = s[i];
            if (' \t\n\r\v'.indexOf(c) > -1) {
                ns += c;
                continue;
            }
            if (!isNaN(c) && b)
                n = parseInt(c);
            else {
                e = (s[i - 1] === '\\');
                switch (c) {
                    case '\\':
                        if (e)
                            ns += c;
                        break;
                    case '{':
                        if (e)
                            ns += c;
                        else
                            b = true;
                        break;
                    case '}':
                        if (e)
                            ns += c;
                        else if (b) {
                            ns += a[n];
                            b = false;
                            n = -1;
                        }
                        break;
                    default:
                        ns += c;
                        break;
                }
            }
        } return ns;
    }
})();
