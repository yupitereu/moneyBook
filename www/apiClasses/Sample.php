<?php
namespace apiClasses;

use libraries\DatabaseLibrary;
use Psr\Container\ContainerInterface;
use utils\logUtil;
use utils\singletonUtil;

class Sample {
	use logUtil;
	use singletonUtil;

	protected $container, $view, $pdo;
	private $databaseLibrary;

	public function __construct(ContainerInterface $container) {
		$this->container = $container;
		$this->databaseLibrary = DatabaseLibrary::getInstance();
	}

	function call($request, $response) {
		$rows = $this->databaseLibrary->executeQuery('select * from member where 1=1');
		return $response->withJson($rows);
	}
}