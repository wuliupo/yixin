(function(){var using=NEJ.P;var p=using("nej.p");var e=using("nej.e");var j=using("nej.j");var v=using("nej.v");var u=using("nej.u");var du=using("dd.util");var needCaptcha=j._$cookie("needCaptcha")||false;var login={init:function(){this.initNode();this.initData();this.initEvent()},initNode:function(){this.form=e._$get("login-form");this.account=e._$get("account");this.password=e._$get("password");this.accountType=e._$get("account-type");this.remember=e._$get("remember");this.submit=e._$get("submit-button");this.message=e._$get("message");this.msgcnt=e._$get("msgcnt");this.md5=e._$get("passwordToMD5");this.captchaWrap=e._$get("captcha-wrap");this.captcha=e._$get("captcha");this.captchaImg=e._$get("captcha-img");this.captchaUpdate=e._$get("captcha-update");j._$cookie("appurl",{expires:-1});j._$cookie("apptoken",{expires:-1})},search:function(){var search=document.location.search;var obj={};if(search){var params=search.substr(1).split("&");for(var i=0;i<params.length;i++){var param=params[i].split("=");var paramName=decodeURIComponent(param[0]);var paramValue=decodeURIComponent(param[1]);obj[paramName]=paramValue}}return obj}(),initData:function(){this.data=this.getData();this.fillData();var url=login.search.url;if(url){if(!/^https?:\/\//.test(url)){url="http://"+url}}this.url=url||"/index";e._$placeholder(this.account);e._$placeholder(this.password)},initEvent:function(){v._$addEvent(this.form,"submit",this.onSubmit._$bind(this));v._$addEvent(this.captchaUpdate,"click",this.onClickCaptchaUpdate._$bind(this));if(this.account.value==""){this.account.focus()}else if(this.password.value==""){this.password.focus()}else if(needCaptcha&&this.captcha.value==""){this.captcha.focus()}else{this.submit.focus()}if(needCaptcha){this.showCaptcha()}},checkForm:function(){if(this.account.value==""){this.showError("请输入用户名！");this.account.focus();return false}if(this.password.value==""){this.showError("请输入密码！");this.password.focus();return false}if(!du.validator.password(this.password.value)){this.showError("密码格式错误！");this.password.focus();return false}if(needCaptcha&&this.captcha.value==""){this.showError("请输入验证码！");this.captcha.focus();return false}return true},onSubmit:function(event){v._$stop(event);if(this.checkForm()){this.setData();this.md5.value=u._$md52hex(this.password.value);this.doSend()}},doSend:function(){var data={account:this.account.value,password:this.md5.value,loginType:this.accountType.value};if(needCaptcha){data.captcha=this.captcha.value}data=u._$object2query(data);j._$requestByREST("/rest/login",{headers:{"Content-Type":"application/x-www-form-urlencoded"},method:"POST",data:data,onload:this.cbSend._$bind(this)})},cbSend:function(json){if(json&&json.code==200){this.clearCaptcha();var url=json.result.indexOf("http")==0?json.result:this.url;location.href=url}else{if(json&&json.code==401){this.showCaptcha()}this.updateCaptcha();this.showError(json&&json.message||"登录失败，服务端返回异常")}},showCaptcha:function(){needCaptcha=true;j._$cookie("needCaptcha",{value:true,expires:7});e._$addClassName(this.captchaWrap,"z-show")},clearCaptcha:function(){needCaptcha=false;j._$cookie("needCaptcha",{expires:-1})},onClickCaptchaUpdate:function(){this.updateCaptcha()},updateCaptcha:function(){this.captchaImg.src=this.captchaImg.getAttribute("src",2).replace(/(?:\?t=\d+)?$/,"?t="+Date.now())},fillData:function(){var data=this.data;var account=data.account;var remember=data.remember;if(!remember){this.remember.checked=false}else{this.remember.checked=true}if(account){this.account.value=decodeURIComponent(account)}else{this.account.value=""}},getData:function(){var account=j._$cookie("account");var remember=j._$cookie("remember");return{account:account,remember:remember}},setData:function(){var account=this.account.value;var remember=this.remember.checked;if(remember){j._$cookie("account",{value:encodeURIComponent(account),expires:7});j._$cookie("remember",{value:remember,expires:7})}else{j._$cookie("remember",{expires:-1});j._$cookie("account",{expires:-1})}},showError:function(str){this.msgcnt.innerText=str;if(e._$hasClassName(this.message,"z-show")){this.showErrorAgain()}else{e._$addClassName(this.message,"z-show")}},showErrorAgain:function(){e._$delClassName(this.message,"z-show");setTimeout(function(){e._$addClassName(this.message,"z-show")},100)}};function checkSupport(){if(j._$cookie("checkSupport")){return}var b=p._$KERNEL.browser;var v=parseInt(p._$KERNEL.version);if(b=="ie"&&v<8){du.showError({message:'您的浏览器版本过低，请升级到 IE8 以上，<a href="http://developer.163.com/notice/ie_update.html?ref=plus.yixin.im" target="_blank" class="f-du">立即升级</a>！',autoDisappear:false,closer:function(){j._$cookie("checkSupport",{value:1,expires:7})}})}}login.init();checkSupport()})()