;

/**
 * super global variables
 * _config  √
 * _user    √
 * _car     °
 */
var _user = {}, // user info
    _config = _config; // dd config

/**
 * jsapi权限验证配置
 * _config 是保存dd配置的全局变量
 */
DingTalkPC.config({
    agentId: _config.agentId[0], // this app ID
    corpId: _config.corpId[0],
    timeStamp: _config.timeStamp,
    nonceStr: _config.nonceStr,
    signature: _config.signature, // jsapi signature
    // type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi。
    jsApiList: [ // 需要调用的jsapi列表
        'runtime.info',
        'biz.contact.choose',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'biz.ding.post',
        'biz.util.openLink',
        'ui.pullToRefresh.enable',
        'ui.pullToRefresh.stop',
        'biz.util.openLink',
        'biz.navigation.setLeft',
        'biz.navigation.setTitle',
        'biz.user.get'
    ]
}); // jsapi permission

/**
 * 钉钉入口
 */
DingTalkPC.ready(function() {

    /**
     * 容器
     */
    // 获取微应用免登授权码、登陆用户信息
    DingTalkPC.runtime.permission.requestAuthCode({
        corpId: _config.corpId[0],
        onSuccess: function(result) {
            console.log('微应用免登授权码: ', result);
            $.ajax({
                url: "server/verification/get-user-info.php?access_token=" + _config.accessToken + "&code=" + result.code,
                method: 'GET',
                dataType: 'json',
                success: function(respond) {
                    $('p.notification').html('验证成功！going back~');
                    _user = respond; //
                    localStorage.setItem('thisUser', JSON.stringify(_user));
                    window.history.back(); return false; // Safari要求 return false 方可回退
                },
                error: function() {
                  $('p.notification').html('验证失败！');
                  localStorage.setItem('thisUser', 'error');
                  window.history.back(); return false;
                }
            });
        },
        onFail: function(err) {
            console.log('微应用免登授权码, 错误: ', err);
        }

    });

    /**
     * 其他业务
     */

});

DingTalkPC.error(function(err) {
    console.log('错误信息: ' + JSON.stringify(err));
    alert('错误信息: ' + JSON.stringify(err));
});
