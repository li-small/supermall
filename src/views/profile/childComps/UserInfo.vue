<template>
  <div id="user-info">
    <a href="#">
      <div class="user-wrap">
        <div class="user-icon">
          <img src="~assets/img/profile/avatar.svg" alt="" />
        </div>
        <div class="user-center">
          <div class="login">登录/注册</div>
          <div class="phone">
            <img src="~assets/img/profile/phone.svg" alt="" />
            <span>暂无绑定手机号</span>
          </div>
        </div>
        <div class="user-right"></div>
      </div>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 10px;
}

.user-wrap {
  color: #fff;
  display: flex;
  font-size: 14px;
}

.user-wrap img {
  width: 85%;
}

.user-icon {
  flex: 1;
}

.user-center {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.phone {
  margin-left: -6px;
  margin-top: 5px;
}

.phone img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.user-right {
  flex: 1;
  font-family: "icomoon";
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>