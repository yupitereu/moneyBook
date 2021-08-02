<?php

use apiClasses\Member;
use Slim\App;
use Slim\Views\PhpRenderer;

require 'vendor/autoload.php';

// 스크립트 최대시간 설정
@set_time_limit(0);

date_default_timezone_set("Asia/Seoul");
define('G_CHARSET', 'UTF-8');  // 캐릭터셋 결정
define('G_LOG_PATH', $_SERVER['DOCUMENT_ROOT'].'/../logs/');
@ini_set("error_log", G_LOG_PATH . date('Ymd'));

// instantiate the App object
$app = new App();

// ------------------------------------- container -------------------------------------
$container = $app->getContainer();

$container['view'] = function () {
	return new PhpRenderer('dist/');
};

// ------------------------------------- middleWare -------------------------------------
$middleWare = function ($request, $response, $next) use ($container) {
	// 컨트롤러 수행 전 실행할 코드
	session_start();

	$jwtPassList = ['/api/member/kakaoAuthComplete', '/api/member/joinMember'];
	if (strpos($request->getUri()->getPath(), '/api/') === 0 && in_array($request->getUri()->getPath(), $jwtPassList) === false) {
		$MemberClass = new Member($container);
		$authResult = $MemberClass->jwtAuthorization();
		if ($authResult === false) {
			return $response->withStatus(401, 'Not member');
		}
	}
	return $next($request, $response); // router 매핑
};

// ------------------------------------- route -------------------------------------
// api 로 요청시는 controller 의 method 에 자동 매핑
$app->any('/api/{apiClassName}/{methodName}', function ($request, $response, $args) use ($container) {
	$apiClassName = $args['apiClassName'] ?? 'Sample';
	$apiClassName = 'apiClasses\\'. ucfirst($apiClassName);
	$methodName = $args['methodName'] ?? 'index';

	if (class_exists($apiClassName)) {
		$apiClass = new $apiClassName($container);
		if (is_callable([$apiClassName, $methodName])) {
			return $apiClass->$methodName($request, $response);
		} else {
			return $response->withJson(['status' => 404, 'msg' => 'page not found'], 404);
		}
	} else {
		return $response->withJson(['status' => 404, 'msg' => 'page not found'], 404);
	}
})->add($middleWare);

$indexMapper = function ($request, $response) {
	return $this->view->render($response, 'index.html');
};

$app->get('/', $indexMapper)->add($middleWare);
$app->get('/{route1}/', $indexMapper)->add($middleWare);
$app->get('/{route1}', $indexMapper)->add($middleWare);
$app->get('/{route1}/{route2}', $indexMapper)->add($middleWare);
$app->get('/{route1}/{route2}/', $indexMapper)->add($middleWare);

// ------------------------------------- route -------------------------------------

// Run application
try {
	$app->run();
} catch (Throwable $e) {
	error_log($e->getMessage());
}