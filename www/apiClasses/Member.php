<?php
namespace apiClasses;

use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use libraries\DatabaseLibrary;
use Psr\Container\ContainerInterface;
use Firebase\JWT\JWT;
use utils\logUtil;
use utils\messageUtil;
use utils\singletonUtil;
use utils\cookieUtil;

class Member
{
	use logUtil;
	use singletonUtil;
	use cookieUtil;
	use messageUtil;

	protected $container, $view;
	private $databaseLibrary;
	private $secretKey1, $secretKey2, $issuedAt, $expire, $serverName;
	/**
	 * Member constructor.
	 * @param ContainerInterface $container
	 */
	public function __construct(ContainerInterface $container)
	{
		$this->container = $container;
		$this->databaseLibrary = DatabaseLibrary::getInstance();
		$this->secretKey1  = 'bGS6lzFqvvS88ALbOxatm6/Vk7mLQyzqaS34Q4oR1ew9';
		$this->secretKey2  = 'bGS6lzFqvvS88ALbfsadffeVk7mLQyzqaS34Q4oR1ew9';
		$this->issuedAt   = time();
		$this->expire     = strtotime("+30 minutes");
		$this->serverName = "yupitereu@cafe24.com";
	}

	/**
	 * @return bool
	 */
	public function jwtAuthorization(): bool
	{
		$headers = apache_request_headers();
		$accessToken = trim(str_replace('Bearer ', '', $headers['authorization']));
		$refreshToken = $headers['refresh-token'];
		if ($accessToken && $refreshToken) {
			try {
				$accessTokenData = JWT::decode($accessToken, $this->secretKey1, ['HS512']);
				$_SESSION['memberNo'] = $accessTokenData->memberNo;
			} catch (ExpiredException $e) {
				$refreshTokenData = JWT::decode($refreshToken, $this->secretKey2, ['HS512']);
				$accessToken = $this->createJwtToken('accessToken', $refreshTokenData->memberNo);
				$_SESSION['memberNo'] = $refreshTokenData->memberNo;
			} catch (BeforeValidException $e) {
				return false;
			} catch (SignatureInvalidException $e) {
				return false;
			}

			$_SESSION['accessToken'] = $accessToken;
			$_SESSION['refreshToken'] = $refreshToken;
			return true;
		} else if ($refreshToken) {
			try {
				$refreshTokenData = JWT::decode($refreshToken, $this->secretKey2, ['HS512']);
			} catch (\Exception $e) {
				$this->infoLog("invalid refresh Token");
				return false;
			}

			$accessToken = $this->createJwtToken('accessToken', $refreshTokenData->memberNo);
			$_SESSION['memberNo'] = $refreshTokenData->memberNo;
			$_SESSION['accessToken'] = $accessToken;
			$_SESSION['refreshToken'] = $refreshToken;
			return true;
		}

		$_SESSION['memberNo'] = null;
		$_SESSION['accessToken'] = null;
		$_SESSION['refreshToken'] = null;
		return false;
	}

	/**
	 * @param string $tokenType
	 * @param int $memberNo
	 */
	public function createJwtToken(string $tokenType, int $memberNo): string
	{
		$data = [
				'iat' => $this-> issuedAt,         // Issued at: time when the token was generated
				'iss' => $this-> serverName,                       // Issuer
				'nbf' => $this-> issuedAt,         // Not before
				'exp' => $this -> expire,                         // Expire
				'memberNo' => $memberNo                     // User name
		];

		if ($tokenType === 'refreshToken') {
			unset($data['exp']);
		}

		$_SESSION[$tokenType] = JWT::encode($data, $tokenType === 'accessToken' ? $this->secretKey1 : $this->secretKey2, 'HS512');

		return $_SESSION[$tokenType];
	}

	/**
	 * @param $memberNo
	 * @return mixed
	 */
	public function login($memberNo)
	{
		$_SESSION['memberNo'] = $memberNo;
		$this->createJwtToken('accessToken', $memberNo);
		$this->createJwtToken('refreshToken', $memberNo);
	}

	public function getMemberInfo($request, $response)
	{
		$rows = $this->databaseLibrary->executeQuery("select memberNo, memberName, activeState from member where memberNo = :memberNo and activeState < 3", [':memberNo' => $_SESSION['memberNo']]);
		if (count($rows) === 1) {
			return $response->withAddedHeader('authorization', 'Bearer ' . $_SESSION['accessToken'])->withJson(['isMember' => true, 'userInfo' => $rows[0]]);
		} else {
			$response->withJson(['isMember' => false]);
		}
	}

	public function joinMember($request, $response)
	{
		$param = $request->getParsedBody();
		$joinSql = "insert into member (memberName, socialType, socialId, memberPassword) values (:memberName, :socialType, :socialId, sha2('fjkwlejf1?', 512))";
		$memberNo = $this->databaseLibrary->executeQuery($joinSql, [':memberName'=>$param['kakaoAccount']['properties']['nickname'], ':socialType'=>$param['socialType'], ':socialId'=>$param['kakaoAccount']['id']], DatabaseLibrary::$LASTINSERTID | DatabaseLibrary::$NORESULT | DatabaseLibrary::$DEBUG);
		$this->login($memberNo);

		$rows = $this->databaseLibrary->executeQuery("select memberNo, memberName, activeState from member where socialType = :socialType and activeState < 3 and socialId = :kakaoId", [':socialType' => $param['socialType'], ':kakaoId' => $param['kakaoAccount']['id']]);
		if (count($rows) === 1) {
			return $response->withAddedHeader('authorization', 'Bearer ' . $_SESSION['accessToken'])->withJson(['isMember' => true, 'refreshToken' => $_SESSION['refreshToken'], 'userInfo' => $rows[0]]);
		} else {
			return $response->withJson(['isMember' => false]);
		}
	}

	public function kakaoAuthComplete($request, $response)
	{
		$param = $request->getParsedBody();

		$tokenResponse = $this->postMessageSend('https://kauth.kakao.com/oauth/token', ['content-type' => 'application/x-www-form-urlencoded;charset=utf-8'],
				['grant_type' => 'authorization_code', 'client_id' => '35bbe933edfb3c69b4b9d011b7a0b969', 'redirect_uri' => $param['redirectUri'], 'code' => $param['code']]);
		$tokenResponse = json_decode($tokenResponse) ?? [];
		$accountResponse = $this->postMessageSend('https://kapi.kakao.com/v2/user/me', ['content-type' => 'application/x-www-form-urlencoded;charset=utf-8', 'authorization' => "Bearer {$tokenResponse->access_token}"], []);
		$accountResponse = json_decode($accountResponse) ?? [];

		if ($accountResponse->code === -401) {
			return $response->withStatus(401, $accountResponse->msg)->withJson(['message' => '카카오 인증 코드가 유효하지 않습니다.']);
		} else {
			$rows = $this->databaseLibrary->executeQuery("select memberNo, memberName, activeState from member where socialType = 'kakao' and socialId = :kakaoId  and activeState < 3", [':kakaoId' => $accountResponse->id]);
			if (count($rows) === 1) {
				$this->login($rows[0]['memberNo']);
				return $response->withAddedHeader('authorization', 'Bearer ' . $_SESSION['accessToken'])->withJson(['isMember' => true, 'refreshToken' => $_SESSION['refreshToken'], 'userInfo' => $rows[0]]);
			} else {
				return $response->withJson(['isMember' => false, 'kakaoAccount' => $accountResponse]);
			}
		}
	}
}