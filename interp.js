/**
 * @author Scott Christopher Stauffer <scstauf at gmail dot com>
 */

String.prototype.interp = function(v) {
	var s = this.valueOf();
	
	if (!s || s.length === 0)
		return '';

	function _gv(_n, _v) {
		var _s = '';
		try {
			_s = _v[_n];
		}
		catch (err) {
			console.error(err.message);
		}
		return _s;
	}

	var ns = '',
		b = false,
		n = -1,
		l = s.length;

	for (var i = 0; i < l; i++) {
		var c = s[i];
	
		if (' \t\n\r\v'.indexOf(c) > -1) {
			ns += c;
			continue;
		}
		
		if (!isNaN(c)) n = parseInt(c);
		else {
			switch (c) {
				case '{':
					if (s[i - 1] === '\\') ns += c;
					else b = true;
					break;
				case '}':
					if (s[i - 1] === '\\') ns += c;
					else {
						ns += _gv(n, v);
						b = false;
						n = -1;
					}
					break;
				default:
					ns += c;
					break;
			}
		}
	}

	return ns;
}
