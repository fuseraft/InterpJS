/**
 * @author Scott Christopher Stauffer <scstauf at gmail dot com>
 */

String.prototype.interp = function(v) {
	var s = this.valueOf();
	
	if (!s || s.length === 0) return '';

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
		
		if (!isNaN(c) && b) n = parseInt(c);
		else {
			var e = (s[i - 1] === '\\');
			switch (c) {
				case '\\':
					if (e) ns += c;
					break;
				case '{':
					if (e) ns += c;
					else b = true;
					break;
				case '}':
					if (e) ns += c;
					else if (b) {
						try {
							ns += v[n];
						}
						catch (err) {
							console.error(err.message);
						}
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
