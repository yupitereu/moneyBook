<template>
	<div id="styleguide">
     <!-- box -->
    <div class="box">
      <p class="box-title">button</p>
      <div class="box-cont">
        <div class="btn">button</div>
      </div>
      <div class="box-cont">
        <div class="btn-xl">button</div>
        <div class="btn-lg">button</div>
        <div class="btn-sm">button</div>
        <div class="btn-xs">button</div>
      </div>
      <div class="box-cont">
        <div class="btn-primary">button</div>
        <div class="btn-secondary">button</div>
        <div class="btn-disabled">button</div>
      </div>

      <div class="box-cont">
        <div class="btn-line">button</div>
        <div class="btn-line btn-primary">button</div>
        <div class="btn-line btn-secondary">button</div>
        <div class="btn-line btn-disabled">button</div>
      </div>

      <div class="box-cont">
        <div class="btn-ra">button</div>
        <div class="btn-block">button</div>
        <div class="btn-square">button</div>
        <div class="btn-transparent">button</div>
      </div>

      <div class="box-cont">
        <div class="btn-line btn-ra">button</div>
        <div class="btn-line btn-block">button</div>
        <div class="btn-line btn-square">button</div>
        <div class="btn-line btn-transparent">button</div>
      </div>
    </div>
    <!-- //box -->
    <!-- box -->
    <div class="box">
      <p class="box-title">outline</p>
      <div class="box-cont">
        <div class="bd" style="width:100px;height:100px">outline</div>
        <div class="bd-top" style="width:100px;height:100px">outline</div>
        <div class="bd-bottom" style="width:100px;height:100px">outline</div>
        <div class="bd-left" style="width:100px;height:100px">outline</div>
        <div class="bd-right" style="width:100px;height:100px">outline</div>
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