<?php
namespace utils;

trait logUtil {
	// 로그 레벨이 따라서 다르게 나옴
	private $currentLogLevel;

	public function logUtilConstruct() { }

	// 실서버, 테스트서버인 경우 출력
	public function errorLog($data) {
		if($this->currentLogLevel >= 1) {
			error_log(print_r($data, true));
		}
	}

	// 테스트서버인 경우 출력
	public function infoLog($data) {
		error_log(print_r($data, true));
	}

	// 로그 텍스트 파일 생성 및 데이터 출력
	public function customLog($_path, $_fileName, $_logData) {
		$logPath = G_LOG_PATH.$_path;
		if(!is_dir($logPath)){
			mkdir($logPath, 0777);
		}

		$user = (isset($_SESSION['member']) ? $_SESSION['member']['memberNo'] : '0').(isset($_COOKIE['deviceInfo']) ? '|'.$_COOKIE['deviceInfo'] : '');
		$logFile = fopen($logPath.'/'.date('Ymd').'_'.$_fileName, 'a+');
		fwrite($logFile, '['.$user.'|'.date('Y-m-d H:i:s', time()).'] '.print_r($_logData, true)."\r\n");
		fclose($logFile);
	}
}
