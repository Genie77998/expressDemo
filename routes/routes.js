exports.setRequestUrl=function(app){
	var user = require('./users');
	//app.all('/login', notAuthentication);
	app.get('/', user.index);
	app.get('/login', user.login);
  app.post('/login/onLogin', user.onLogin);
  app.get('/ajax', user.ajax);
	app.get('/loginSuccess', user.loginSuccess);
  app.get('/logout', user.loginOut);
}


function authentication(req, res, next) {
  if (!req.session.user) {
    req.session.error='请先登陆';
    return res.redirect('/login');
  }
  next();
}

function notAuthentication(req, res, next) {
	if (typeof req.session.user !='undefined' && req.session.user) {
    	req.session.error='已登陆';
    	return res.redirect('/');
  	}
  	next();
}
