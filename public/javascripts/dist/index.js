require([
	"../lib/jquery/jquery"
	],function(){
		$(function(){
			$('input[name=login]').click(function(){
				location.href = '/login';
			});
			$('input[name=regiest]').click(function(){
				location.href = '/regiest';
			});		
		})
});
