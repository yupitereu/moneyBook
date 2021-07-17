<?php
namespace utils;

trait cookieUtil {
	protected $defalutOptions = array(
			'expires' => 0,
			'path' => '/',
			'domain' => 'baedalgeek.com',
			'secure' => false,
			'httponly' => false
	);

	public function getCookie($_name) {
		if (isset($_name) && isset($_COOKIE[$_name])) return $_COOKIE[$_name];
		else return '';
	}

	public function setCookie($_name, $_value, $_options) {
		if (!$_name) return '';
		if (isset($_value) == false) $_options['expires'] = -1; // delete cookie

		$_options['expires'] = isset($_options['expires']) ? $_options['expires'] : $this->defalutOptions['expires'];
		$_options['path'] = isset($_options['path']) ? $_options['path'] : $this->defalutOptions['path'];
		$_options['domain'] = isset($_options['domain']) ? $_options['domain'] : $this->defalutOptions['domain'];
		$_options['secure'] = isset($_options['secure']) ? $_options['secure'] : $this->defalutOptions['secure'];
		$_options['httponly'] = isset($_options['httponly']) ? $_options['httponly'] : $this->defalutOptions['httponly'];
		if ($_options['expires']) {
			if (is_numeric($_options['expires'])) {
				$_options['expires'] = time() + (intval($_options['expires']));
			} else {
				$_options['expires'] = 0;
			}
		}
		@setcookie($_name, $_value, $_options['expires'], $_options['path'], $_options['domain'], $_options['secure'], $_options['httponly']);
	}

	// cookie clear
	public function clearCookies() {
		if (is_array($_COOKIE)) {
			foreach($_COOKIE as $k => $v) {
				$this->setCookie($k, null, $this->defalutOptions);
			}
		}
	}
}
