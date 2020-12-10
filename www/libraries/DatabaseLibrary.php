<?php
namespace libraries;

use PDO;
use utils\logUtil;
use utils\singletonUtil;

class DatabaseLibrary {
	use singletonUtil;
	use logUtil;

	public static $DEBUG = 0x00000010; // enable : 디버그한다.
	public static $ROWCOUNT = 0x00000100; // enable : 줄의 개수를 센다.
	public static $LASTINSERTID = 0x00001000; // enable : insert문일 때 id를 반환.
	public static $NORESULT = 0x00010000; // enable : result를 반환하지 않음. update나 insert 사용 시 유용하다.

	private $pdoDB = null;

	private function __construct() {
		$host = 'yupitereu.cafe24.com';
		$dbName = 'yupitereu';
		$userName = 'yupitereu';
		$password = 'q1w2e3r4';

		try {
			$this->pdoDB = new PDO("mysql:dbname={$dbName};host={$host};port=3306;charset=utf8", $userName, $password);
		} catch (\PDOException $e) {
			$this->infoLog($e->getMessage());
		}
	}

	/*
	 * 호출 방법
	 * $this->executeQuery("SELECT * FROM member where memberNo=:memberNo", [':memberNo' => 1240], DatabaseLibrary::$DEBUG | DatabaseLibrary::$ROWCOUNT, PDO::FETCH_ASSOC);
	 * @param $_option과 $_fetchStyle은 기본값이 존재하므로 특별한 경우가 아니면 입력하지 않는다.
	 *
	 * @return
	 * result : select 로 fetch된 내용. FETCHOPTION_TABLEARRAY 시 결과가 정리되며, FETCHOPTION_NONRESULT 시 존재하지 않음.
	 * rowCount : 변경된 row 개수. FETCHOPTION_ROWCOUNT 시에만 존재.
	 * lastInsertId : insert 시 id. FETCHOPTION_LASTINSERTID 시에만 존재.
	 *
	 * return 배열의 원소가 하나라면, 그 원소로 return 값이 변경된다.
	 * 예를 들어 리턴값 배열에 result 하나만 있다면 [(result 배열)] 가 아니라 (result 배열) 이 반환된다.
	 */
	public function executeQuery($_query, $_param = [], $_option = 0, $_fetchStyle = PDO::FETCH_ASSOC) {
		$returnValue = array();
		try {
			$stmt = $this->pdoDB->prepare($_query);
			$stmt->execute($_param);
		} catch (\PDOException $e) {
			$this->errorLog($e->getMessage());
			return ['errorCode'=>$stmt->errorCode(), 'errorInfo'=>$stmt->errorInfo()];
		}

		// 잘못된 쿼리 디버깅
		if ($stmt->errorCode() != PDO::ERR_NONE) {
			$errors = $stmt->errorInfo();
			$this->errorLog($errors[2]);
			// return ['errorCode'=>$stmt->errorCode(), 'errorInfo'=>$stmt->errorInfo()];
		}

		// 디버그 로그를 에러로그에 기록 설정 여부
		if ($_option & self::$DEBUG) {
			$this->infoLog($stmt->errorInfo());
			$this->infoLog($this->debug($_query, $_param));
		}

		// 쿼리가 영향을 미친 로우의 개수 인출
		if ($_option & self::$ROWCOUNT) {
			$returnValue['rowCount'] = $stmt->rowCount();
		}

		// insert인 경우 id를 반환.
		if ($_option & self::$LASTINSERTID) {
			$returnValue['lastInsertId'] = $this->pdoDB->lastInsertId();
		}

		// result를 요청한 경우 fetch
		if (!($_option & self::$NORESULT)) {
			$returnValue['result'] = $stmt->fetchAll($_fetchStyle);
		}
		if (count($returnValue)<=1) {
			foreach($returnValue as $k=>$v){
				$returnValue = $v;
				break;
			}
		}

		$stmt->closeCursor();
		return $returnValue;
	}

	/*
	 * 데이터베이스 트랜잭션을 시작
	 */
	public function sqlStartTransaction() {
		$this->pdoDB->beginTransaction();
	}

	/*
	 * 데이터베이스 변경된 내용 반영 및 트랜잭션 종료
	 */
	public function sqlCommit() {
		$this->pdoDB->commit();
	}

	/*
	 * 데이터베이스 변경된 내용 취소 및 트랜잭션 종료
	 */
	public function sqlRollback() {
		$this->pdoDB->rollback();
	}

	/*
	 * executeQuery 메소드 실행 시 DEBUG 옵션이 활상화된 경우 데이터베이스 오류사항을 반환
	 */
	private function debug($sql, $parameters) {
		$keys = array();
		$values = array();
		/*
		 * Get longest keys first, sot the regex replacement doesn't
		 * cut markers (ex : replace ":username" with "'joe'name"
		 * if we have a param name :user )
		 */
		$isNamedMarkers = false;
		if (count($parameters) && is_string(key($parameters))) {
			uksort($parameters, function($k1, $k2) {
				return strlen($k2) - strlen($k1);
			});
			$isNamedMarkers = true;
		}
		foreach ($parameters as $key => $value) {
			// check if named parameters (':param') or anonymous parameters ('?') are used
			if (is_string($key)) {
				$keys[] = '/:'.ltrim($key, ':').'/';
			} else {
				$keys[] = '/[?]/';
			}
			// bring parameter into human-readable format
			if (is_string($value)) {
				$values[] = "'" . addslashes($value) . "'";
			} elseif(is_int($value)) {
				$values[] = strval($value);
			} elseif (is_float($value)) {
				$values[] = strval($value);
			} elseif (is_array($value)) {
				$values[] = implode(',', $value);
			} elseif (is_null($value)) {
				$values[] = 'NULL';
			}
		}
		if ($isNamedMarkers) {
			return preg_replace($keys, $values, $sql);
		} else {
			return preg_replace($keys, $values, $sql, 1, $count);
		}
	}
}