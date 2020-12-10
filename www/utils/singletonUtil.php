<?php
namespace utils;

trait singletonUtil {
	protected static $instances = [];

	public static function getInstance() {
		$fullClassNames = explode("\\", get_called_class());
		$calledClass = array_pop($fullClassNames);
		$singleInstance = null;

		if (isset(self::$instances[$calledClass]) == false) {
			$singleInstance = new static();
			self::$instances[$calledClass] = &$singleInstance;
		} else {
			$singleInstance = &self::$instances[$calledClass];
		}
		return $singleInstance;
	}
}