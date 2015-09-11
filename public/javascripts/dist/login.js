require([
	"../lib/jquery/jquery"
	],function(){
		$(function(){
			var form = document.forms['loginIn'],
				tips = document.getElementById('tips'),
				username = form.elements['username'],
				password = form.elements['password'];
			form.onsubmit = function(){
				if(username.value === ''){
					tips.innerHTML = "请输入账号";
				}else if(password.value === ''){
					tips.innerHTML = '请输入密码';
				}else{
					$.ajax({
						url: '/login/onLogin',
						data : {
							username : username.value,
							password : password.value
						},
						type: 'post',
						success : function(r){
							console.log(r);
							if(!r.success){
								tips.innerHTML = r.message;
							}else{
								location.href = 'loginSuccess';
							}
						}
					});
				}
				return false;
			}

			$.ajax({
				url: '/ajax',
				success : function(r){
					console.log(r);
				}
			});
		});
});
