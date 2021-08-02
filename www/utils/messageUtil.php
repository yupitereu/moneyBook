<?php
namespace utils;

trait messageUtil {
	private function postMessageSend($_url, $_head, $_data) {
		$ch = curl_init();                                 //curl 초기화
		curl_setopt($ch,CURLOPT_URL, $_url);              //URL 지정하기
		curl_setopt($ch,CURLOPT_CONNECTTIMEOUT, 10);      //connection timeout 10초
		curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);   //원격 서버의 인증서가 유효한지 검사 안함
		if(count($_head)>0) {
			$header = [];
			foreach($_head as $k => $v) {
				array_push($header, $k.":".$v);
			}
			curl_setopt($ch,CURLOPT_HTTPHEADER, $header);
		} //헤더에 넣기
		curl_setopt($ch,CURLOPT_POSTFIELDS, http_build_query($_data));      //POST data
		curl_setopt($ch,CURLOPT_POST, true);              //true시 post 전송
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);      //성공 시 문자열 받기
		$response = curl_exec($ch);
		curl_close($ch);

		return $response;
	}
}