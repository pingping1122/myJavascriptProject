// window.onload 是页面全部加载完成，甚至包括图片

// 统计字符串长度
function getLength(str) {
    // \x00-\xff对应的为单字节
    // 非单字节--即汉字替换成双字节
    var len = str.replace(/[^\x00-\xff]/g, 'xx').length;
    return len;
}

// 查找字符n在str中出现的次数
function findStr(str, n) {
    var temp = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === n) {
            temp++;
        }
    }
    return temp;
}

window.onload = function () {
    var inputs = document.getElementsByTagName('input');
    var nameInput = inputs[0];
    var passInput = inputs[1];
    var pass2Input = inputs[2];
    var ps = document.getElementsByTagName('p');
    var name_msg = ps[0];
    var pass_msg = ps[1];
    var pass2_msg = ps[2];
    var ems = document.getElementsByTagName('em');
    var count = document.getElementById('count');
    var name_len = 0;


    /**
     * 用户名要求：--数字、字母（不区分大小写）、汉字、下划线。
     * */
    // onfocus--输入框获取焦点
    nameInput.onfocus = function () {
        name_msg.setAttribute('class', 'tip');
        name_msg.innerHTML = '5-25个字符，一个汉字为两个字符，推荐使用中文会员名';
        name_msg.style.display = 'inline-block';
    };
    // onkeyup--键盘抬起
    nameInput.onkeyup = function () {
        count.style.visibility = "visible";
        name_len = getLength(this.value);
        count.innerHTML = name_len + "个字符";
        if (name_len === 0) {
            count.style.visibility = "invisible";
        }
    };
    // onblur--输入框失去焦点
    nameInput.onblur = function () {
        // 1、非法字符
        var name_reg = /[^\w\u4E00-\u9FFF]/g; // 匹配所有的非法字符
        if (name_reg.test(this.value)) {
            name_msg.setAttribute('class', 'error');
            name_msg.innerHTML = '含有非法字符';
            name_msg.style.display = 'inline-block';
        }
        // 2、不能为空
        else if (this.value === '') {
            name_msg.setAttribute('class', 'error');
            name_msg.innerHTML = '不能为空';
            name_msg.style.display = 'inline-block';
        }
        // 3、长度超过25个字符
        else if (name_len > 25) {
            name_msg.setAttribute('class', 'error');
            name_msg.innerHTML = '长度超过25个字符';
            name_msg.style.display = 'inline-block';
        }
        // 4、长度小于5个字符
        else if (name_len < 5) {
            name_msg.setAttribute('class', 'error');
            name_msg.innerHTML = '长度小于5个字符';
            name_msg.style.display = 'inline-block';
        }
        // 5、ok
        else {
            name_msg.setAttribute('class', 'success');
            name_msg.innerHTML = 'OK!';
            name_msg.style.display = 'inline-block';
        }
    };


    /**
     *  密码要求：--6-16个字符，请使用字母加数字或符号的组合，不能单独使用字符、数字或符号。
     *  ---只有当密码强度为中的时候---确认密码输入框才能用
     * */
    // onfocus--输入框获取焦点
    passInput.onfocus = function () {
        pass_msg.setAttribute('class', 'tip');
        pass_msg.innerHTML = '6-16个字符，请使用字母加数字或符号的组合，不能单独使用字符、数字或符号';
        pass_msg.style.display = 'inline-block';
    };
    // onkeyup--键盘抬起
    passInput.onkeyup = function () {
        // 大于5个字符--中
        if (this.value.length > 5) {
            ems[1].className = 'activate';
            pass2Input.removeAttribute('disabled');
            pass2_msg.className = 'tip';
            pass2_msg.innerHTML = '请再输入一次！';
            pass2_msg.style.display = 'inline-block';
        } else {
            ems[1].className = '';
            pass2Input.setAttribute('disabled', 'true');
            pass2_msg.className = 'tip';
            pass2_msg.innerHTML = '请再输入一次！';
            pass2_msg.style.display = 'none';
        }
        // 大于10个字符--强
        if (this.value.length > 10) {
            ems[2].className = 'activate';
        } else {
            ems[2].className = '';
        }
    };
    // onblur--输入框失去焦点
    passInput.onblur = function () {
        var num = findStr(this.value, this.value[0]);
        var n_reg = /[^\d]/g; // 非数字
        var t_reg = /[^a-zA-Z]/g; //非字母
        // 1、不能为空
        if (this.value === '') {
            pass_msg.setAttribute('class', 'error');
            pass_msg.innerHTML = '密码不能为空';
            pass_msg.style.display = 'inline-block';
        }
        // 2、不能用相同字符
        else if (num === this.value.length) {
            pass_msg.setAttribute('class', 'error');
            pass_msg.innerHTML = '不能用相同字符';
            pass_msg.style.display = 'inline-block';
        }
        // 3、长度应为6-16个字符
        else if (this.value.length < 6 || this.value.length > 16) {
            pass_msg.setAttribute('class', 'error');
            pass_msg.innerHTML = '长度应为6-16个字符';
            pass_msg.style.display = 'inline-block';
        }
        // 4、不能全为数字
        else if (!n_reg.test(this.value)) {
            pass_msg.setAttribute('class', 'error');
            pass_msg.innerHTML = '不能全为数字';
            pass_msg.style.display = 'inline-block';
        }
        // 5、不能全为字母
        else if (!t_reg.test(this.value)) {
            pass_msg.setAttribute('class', 'error');
            pass_msg.innerHTML = '不能全为字母';
            pass_msg.style.display = 'inline-block';
        }
        // 6、ok
        else {
            pass_msg.setAttribute('class', 'success');
            pass_msg.innerHTML = 'OK!';
            pass_msg.style.display = 'inline-block';
        }
    };


    /**
     *  密码确认：--只在输入框失去焦点时进行判断。
     * */
    // onblur--输入框失去焦点
    pass2Input.onblur = function () {
        if (this.value !== passInput.value) {
            pass2_msg.setAttribute('class', 'error');
            pass2_msg.innerHTML = '两次输入密码不一致';
            pass2_msg.style.display = 'inline-block';
        }
        else {
            pass2_msg.setAttribute('class', 'success');
            pass2_msg.innerHTML = 'OK!';
            pass2_msg.style.display = 'inline-block';
        }
    };
};