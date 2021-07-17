<?php
namespace apiClasses;

use libraries\DatabaseLibrary;
use Psr\Container\ContainerInterface;
use utils\logUtil;
use utils\singletonUtil;
use utils\cookieUtil;

class Member
{
	use logUtil;
	use singletonUtil;
	use cookieUtil;

	protected $container, $view;
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

	/**
	 * @return bool
	 */
	public function jwtAuthorization(): bool
	{
		$headers = apache_request_headers();
		$accessToken = trim(str_replace('Bearer ', '', $headers['authorization']));
		$refreshToken = $headers['refresh-token'];
		error_log(print_r([$accessToken, $refreshToken], true));

		return true;
	}

	/**
	 * @param $request
	 * @param $response
	 * @return mixed
	 */
	public function login($request, $response)
	{
		return $response->withAddedHeader('authorization', 'Bearer 111');
	}
}