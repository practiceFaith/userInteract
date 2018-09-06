(function (pro) {
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype));
/*自执行函数写法：1，（function（）{}（））;推荐
*               2，（function(){}）（）;
*               3,~function(){}();  + - ! 但不能又返回值
*               4,trurn &&function(){}(); trune|  false||
*               5,0,function(){}();
* */