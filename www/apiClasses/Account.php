<?php
namespace apiClasses;

use libraries\DatabaseLibrary;
use Psr\Container\ContainerInterface;

class Account
{
	protected $container;
	private $databaseLibrary;

	/**
	 * Member constructor.
	 * @param ContainerInterface $container
	 */
	public function __construct(ContainerInterface $container)
	{
		$this->container = $container;
		$this->databaseLibrary = DatabaseLibrary::getInstance();
	}

	public function getAccountCategory($request, $response)
	{
		$rows = $this->databaseLibrary->executeQuery("select categoryNo, type, categoryName from accountCategory where memberNo = :memberNo and activeState = true", [':memberNo' => $_SESSION['memberNo']]);
		return $response->withAddedHeader('authorization', 'Bearer ' . $_SESSION['accessToken'])->withJson($rows);
	}
}
