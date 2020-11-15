<?php
namespace controllers;

use utils\logUtil;

class SampleController {
	use logUtil;

	public function __construct() {
		$this->infoLog('call Sample');
	}

	function call($request, $response, $args) {
		return $response->withJson(['msg'=>'text']);
	}
}