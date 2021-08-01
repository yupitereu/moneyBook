<template>
	<div id="styleguide">
     <!-- box -->
    <div class="box">
      <p class="box-title">button</p>
      <div class="box-cont">
        <div class="btn">button</div>
      </div>
      <div class="box-cont">
        <div class="btn btn-xl">xl button</div>
        <div class="btn btn-lg">lg button</div>
        <div class="btn btn-sm">sm button</div>
        <div class="btn btn-xs">xs button</div>
      </div>
      <div class="box-cont">
        <div class="btn btn-primary">primary button</div>
        <div class="btn btn-secondary">secondary button</div>
        <div class="btn btn-disabled">disabled button</div>
      </div>

      <div class="box-cont">
        <div class="btn btn-line">button</div>
        <div class="btn btn-line btn-line-primary">primary button</div>
        <div class="btn btn-line btn-line-secondary">secondary button</div>
        <div class="btn btn-line btn-line-disabled">disabled button</div>
      </div>

      <div class="box-cont">
        <div class="btn btn-ra">button</div>
        <div class="btn btn-block">block button</div>
        <div class="btn btn-square">square button</div>
        <div class="btn btn-transparent">transparent button</div>
      </div>

      <div class="box-cont">
        <div class="btn btn-line btn-ra">button</div>
        <div class="btn btn-line btn-block">block button</div>
        <div class="btn btn-line btn-square">square button</div>
        <div class="btn btn-line btn-transparent">transparent button</div>
      </div>
    </div>
    <!-- //box -->
    <!-- box -->
    <div class="box">
      <p class="box-title">outline</p>
      <div class="box-cont flex">
        <div class="bd" style="width:100px;height:100px">outline</div>
        <div class="bd-top" style="width:100px;height:100px">outline</div>
        <div class="bd-bottom" style="width:100px;height:100px">outline</div>
        <div class="bd-right" style="width:100px;height:100px">outline</div>
        <div class="bd-left" style="width:100px;height:100px">outline</div>
      </div>
    </div>
    <!-- //box -->
    <!-- box -->
    <div class="box">
      <p class="box-title">color</p>
      <div class="box-cont">
        <p class="">본문 색상을 확인해보세요.</p>
        <p class="primary">본문 색상을 확인해보세요.</p>
        <p class="dark-primary">본문 색상을 확인해보세요.</p>
        <p class="secondary">본문 색상을 확인해보세요.</p>
        <p class="third">본문 색상을 확인해보세요.</p>
        <p class="danger">본문 색상을 확인해보세요.</p>
        <p class="white">본문 색상을 확인해보세요.</p>
        <p class="black">본문 색상을 확인해보세요.</p>
        <p class="medium-gray">본문 색상을 확인해보세요.</p>
        <p class="gray">본문 색상을 확인해보세요.</p>
        <p class="light-gray">본문 색상을 확인해보세요.</p>
        <p class="point1">본문 색상을 확인해보세요.</p>
      </div>

      <div class="box-cont">
        <p class="">본문 색상을 확인해보세요.</p>
        <p class="bg-primary">본문 색상을 확인해보세요.</p>
        <p class="bg-primary-dark">본문 색상을 확인해보세요.</p>
        <p class="bg-secondary">본문 색상을 확인해보세요.</p>
        <p class="bg-dark">본문 색상을 확인해보세요.</p>
        <p class="bg-gray">본문 색상을 확인해보세요.</p>
      </div>
    </div>
    <!-- //box -->

    <!-- box -->
    <div class="box">
      <div class="box-title">on/off checkbox</div>
      <div class="box-cont">

        <label class="btn-switch">
          <input type="checkbox"/>
          <span class="onoff-switch"></span>
        </label>

      </div>
    </div>
    <!-- //box -->

    <!-- box -->
    <div class="box">
      <div class="box-title">checkbox</div>
      <div class="box-cont">

        <label class="input-check">
          <input type="checkbox" checked="checked">
          기본 체크박스 스타일입니다.
          <span class="checkmark"></span>
        </label>

      </div>
    </div>
    <!-- //box -->

    <!-- box -->
    <div class="box">
      <div class="box-title">radio</div>
      <div class="box-cont">

        <label class="input-radio">
          <input type="radio" checked="radio">
          기본 라디오 스타일입니다.
          <span class="radiomark"></span>
        </label>

      </div>
    </div>
    <!-- //box -->

    <!-- box -->
    <div class="box">
      <div class="box-title"></div>
      <div class="box-cont">

      </div>
    </div>
    <!-- //box -->

  </div>
</template>

<script>
export default {
	name: "StyleGuide"
}
</script>

<style scoped>
.box {margin-bottom:4rem;}
.box-title {font-size:2.4rem;}
.box-cont {margin-bottom:2rem;}
</style>