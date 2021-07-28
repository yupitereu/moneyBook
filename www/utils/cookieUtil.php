<?php
namespace utils;

trait cookieUtil {
	protected $defaultOptions = array(
			'expires' => 0,
			'path' => '/',
			'secure' => false,
			'httponly' => false
	);

	public function getCookie($_name): string
	{
		if (isset($_name) && isset($_COOKIE[$_name])) return $_COOKIE[$_name];
		else return '';
	}

	public function setCookie($_name, $_value, $_options = []): bool
	{
		if (!$_name) return false;
		if (isset($_value) == false) $_options['expires'] = -1; // delete cookie

		$_options['expires'] = isset($_options['expires']) ? $_options['expires'] : $this->defaultOptions['expires'];
		$_options['path'] = isset($_options['path']) ? $_options['path'] : $this->defaultOptions['path'];
		$_options['domain'] = isset($_options['domain']) ? $_options['domain'] : $_SERVER['SERVER_NAME'];
		$_options['secure'] = isset($_options['secure']) ? $_options['secure'] : $this->defaultOptions['secure'];
		$_options['httponly'] = isset($_options['httponly']) ? $_options['httponly'] : $this->defaultOptions['httponly'];
		if ($_options['expires']) {
			if (is_numeric($_options['expires'])) {
				$_options['expires'] = time() + (intval($_options['expires']));
			} else {
				$_options['expires'] = 0;
			}
		}
		@setcookie($_name, $_value, $_options['expires'], $_options['path'], $_options['domain'], $_options['secure'], $_options['httponly']);
		return true;
	}

	// cookie clear
	public function clearCookies()
	{
		if (is_array($_COOKIE)) {
			foreach($_COOKIE as $k => $v) {
				$this->setCookie($k, null, $this->defaultOptions);
			}
		}
	}
}
