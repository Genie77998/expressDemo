"use strict";
var fs = require('fs'),
    tool = require('../units/tools');
var session = null;
exports.index = function(req, res, next) {
	res.render('index');
};

exports.login = function(req, res, next) {
    if(session){
        res.render('loginSuccess',session);
        return;
    }
    res.render('login',{message:''});
};

exports.ajax = function(req,res,next){
    res.json({
        success : true,
        message : 'ajax'
    });
}

exports.onLogin = function(req, res, next) {
    var mdPassword = tool.md5(req.body.password);
    findOne({
    	"username" : req.body.username,
    	"password" : mdPassword
    }, function(err, userInfo) {
        if (err) {
            res.json({
                success:false,
                message: "登陆失败！"
            });
        } else {
            if (userInfo) {
                res.json({
                    success:true,
                    url : 'loginSuccess',
                    userInfo : userInfo
                });
                session = userInfo;
            } else {
                res.json({
                    success:false,
                    message: "用户名和密码错误！"
                });
            }
        }
    });
};

exports.loginSuccess = function(req, res, next){
    if(session){
        res.render('loginSuccess',session);
    }else{
        res.render('login',{message:''});
    }
    
}

exports.loginOut = function(req, res, next){
    session = null;
    res.render('login',{message:''});
}

function findOne(obj, callback) {
    var errs = null,
        userInfo = null;
    fs.readFile('./data/user.json', 'utf-8', function(err, data) {
        if (err) {
            errs = err;
            console.log(err);
        } else {
        	data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if (obj.username == data[i].userName && obj.password == tool.md5(data[i].password)) {
                    userInfo = data[i];
                }
            }
        }
        typeof callback !== 'undefined' && callback.constructor === Function && callback(errs, userInfo);
    });
}
