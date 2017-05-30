# mini-jq

迷你版jquery

## 使用

```js
$(document).ready(function () {
    var html = $('#container').html();
    console.log(html);

    var text = $('#container h1').text();
    console.log('h1 的文本是 => ' + text);

    $('#list li').each(function (index, item) {
        console.log($(item).text());
    });

    console.log('第2个节点的文本是 => ' + $('li').eq(1).text());
    console.log('最后一个节点的文本是 => ' + $('li').last().text());

    console.log('username => ' + $('#username').val());

    $('#changeText').on('click', function () {
        console.log('点击按钮后 username => ' + $('#username').val());
    });

//        $.ajax({
//            url: 'https://api.github.com/users/biezhi',
//            method: 'get',
//            dataType: 'json',
//            success: function (response) {
//                console.log(response);
//            },
//            error: function (e) {
//                console.error(e);
//            }
//        });

    $.getJSON('https://api.github.com/users/biezhi', function (response) {
        console.log(response);
    });

});
```

## 参考资料

- https://blog.garstasio.com/you-dont-need-jquery/selectors
- https://github.com/oneuijs/You-Dont-Need-jQuery


