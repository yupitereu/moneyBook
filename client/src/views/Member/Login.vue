<template>
	<div id="login" class="flex">
    <div id="login-head" class="flex">LOGIN</div>
    <div id="login-content" class="flex">
      <p class="txt-area flex">
        쉽고 편리하게<br />
        나의 자산을 관리하세요
      </p>
      <div id="sns-area">
        <div class="btn btn-lg btn-block btn-kakao" @click="kakaoLoginRequest"><span class="ico"></span>카카오톡으로 이용하기</div>
        <div v-if="false" class="btn btn-lg btn-block btn-apple"><span class="ico"></span>Apple로 이용하기</div>
        <p class="txt flex">또는</p>

        <div class="btn-area">
            <div class="btn btn-ra btn-xl btn-naver"><span class="ico"></span><span class="hidden">Naver로 이용하기</span></div>
            <div class="btn btn-ra btn-xl btn-ra btn-google"><span class="ico"></span><span class="hidden">Google로 이용하기</span></div>
        </div>
      </div>

    </div>
    <div id="login-footer" class="flex">
      <div>VER 1.0.0</div>
      <div>이용약관</div>
    </div>
  </div>

</template>

<script src="./Login.js" />

<style scoped>
#login {
  width:100%;
  height:100vh;
  justify-content: space-between;
  flex-direction: column;
}
#login-head {
  width:100%;
  height:60px;
  align-items: center;
  font-size:20px;
  color:#111;
  font-weight: bold;
}
#login-content {
  height:100%;
  padding:0 12px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-around;
}
#login-content .txt-area {
  align-items: center;
  flex:1 1 0;
  color:#111;
  font-size:24px;
  font-weight: bold;
}
#sns-area {
  flex:2 1 0;
}
#sns-area .btn-kakao,
#sns-area .btn-apple {
  max-width: 40rem;
}
#sns-area .btn-kakao {
  background-color:#FFE716;
  color:#333;
  margin-bottom:12px;
}
#sns-area .btn-apple {
  background-color:#161616;
  color:#fff;
}
#sns-area p {
  margin:40px 0;
  background-color:#fff;
  align-items: center;
  color:#aaa;
}
#sns-area p:before,
#sns-area p:after {
  display:inline-block;
  content:"";
  width:40px;
  height:1px;
  background-color:#ddd;
}
#sns-area p:before {
  margin-right:6px;
}
#sns-area p:after {
  margin-left:6px;
}
#sns-area .btn-area {
  display:flex;
  justify-content: center;
  align-items: center;
}
#sns-area .btn-area > div{
  margin:0 3px;
}
#sns-area .btn-area .btn-naver {
  background-color:#00C300;
}
#sns-area .btn-area .btn-google {
  background-color:#F23921;
}

#sns-area .btn .ico {
  background:url("~@/assets/ico-login@2x.png") 0 0 no-repeat;
  background-size: 138px 39px;
  width:2.4rem;
  height:2.4rem;
}
#sns-area .btn-kakao .ico,
#sns-area .btn-apple .ico {
 position:absolute;
  top:1.2rem;
  left:2rem;
}
#sns-area .btn-kakao .ico {
  background-position: 0 -8px;
}
#sns-area .btn-apple .ico {
  background-position: -30px -8px;
}
#sns-area .btn-naver .ico {
  background-position: -72px -8px;
}
#sns-area .btn-google .ico {
  background-position: -114px -8px;
}
#login-footer {
  padding:20px 12px;
  justify-content: space-between;
  color:#aaa;

}
</style>