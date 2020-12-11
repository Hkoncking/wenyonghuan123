/**
 * 
 * @authors cherish yii2 (cherish@cherish.pw)
 * @date    2020-12-10 16:48:28
 * @version v1.0
 * @description the core js of todolist project
 * 
 * ━━━━━━神兽出没━━━━━━
 * 　　   ┏┓　 ┏┓
 * 　┏━━━━┛┻━━━┛┻━━━┓
 * 　┃              ┃
 * 　┃       ━　    ┃
 * 　┃　  ┳┛ 　┗┳   ┃
 * 　┃              ┃
 * 　┃       ┻　    ┃
 * 　┃              ┃
 * 　┗━━━┓      ┏━━━┛ Code is far away from bugs with the animal protecting.
 *       ┃      ┃     神兽保佑,代码无bug。
 *       ┃      ┃
 *       ┃      ┗━━━┓
 *       ┃      　　┣┓
 *       ┃      　　┏┛
 *       ┗━┓┓┏━━┳┓┏━┛
 *     　  ┃┫┫　┃┫┫
 *     　  ┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */

// 请根据考试说明文档中列出的需求进行作答
// 预祝各位顺利通过本次考试，see you next week！
// ...
$(function() {

    //1.清除form中input的回车事件
    $('form').on('keydown',function(event) {
        if(event.keyCode == 13) return false
    })
    //获取localstorage
    local()
    function local () {
        var len = localStorage.length
        // console.log(len)
        var arr = new Array()
        for (let i = 0; i < len; i++) {
            var getkey = localStorage.key(i)
            var getval = localStorage.getItem(getkey)
            // if(getkey == 'done') return
            arr[i] = {
                "key": getkey,
                "val": getval
            }
        }
        bindHtml(arr)
    }
    // console.log(arr)

   //2.input回车添加事件函数
    keyCode()
    function keyCode( ) {
        // console.log(value)
        $('#title').keyup(function(e) {

            //获取输入框value值
            const value = $(this).val().trim()
            //获取键盘编号
            const key = e.keyCode
    
            if(key == 13){
                if(!value) return
                window.localStorage.setItem(`${value}`, value)
                local()
                $(this).val(" ")
            }
        })
    }

    //2.1.在进行渲染页面
    function bindHtml (cart){
       
        // console.log(cart)
        let str = ``
        for (let i = 0; i < cart.length; i++){
            str += `
                <li>
                    <input type="checkbox" />
                    <p onclick="edit(3)">${cart[i].val}</p>
                    <a href="javascript:remove(3)">-</a>
                </li>
            `
        }
        
        $('#todolist').append($(str))
        count()
    }
    //3.正在进行事件部分
    //3.1单选框
   
        var donearr = new Array()
        $('#todolist').on('click', 'input', function() {
            const todo = $(this).nextAll('p').text()
            const obj = {"val":todo}
            donearr.push(obj)
            console.log(donearr)
            localStorage.setItem('done',JSON.stringify(donearr))
            const check = $(this).prop('checked')
            if (check) {
                bindDone()
                $(this).parent().remove()
                localStorage.removeItem(todo)
                count()
            }
        })


    //3.2a标签删除
    $('#todolist').on('click', 'a', function() {
        const val =  $(this).prevAll('p').text()
        $(this).parent().remove()
        count()
        localStorage.removeItem(val)
    })
    
    
    //3.3修改正在进行条目数量
    function count() {
        const num = $('#todolist > li').length
        // console.log(num)
        $('#todocount').text(num)
    }

    //4.已经完成渲染
    bindDone()
    function bindDone () {
        // console.log(text)
        const donelist = JSON.parse(localStorage.getItem('done'))
        console.log(donelist)
        let str = ``
        let donetext = $('#donelist p').text()
        // console.log(donetext)
        for (let i = 0; i < donelist.length; i++){
            // console.log(donetext.indexOf(donelist[i].val))
        //    if(donetext.indexOf(donelist[i].val) !== -1) return
            str += `
                <li>
                    <input type="checkbox" checked="checked" />
                    <p onclick="edit(4)">${donelist[i].val}</p>
                    <a href="javascript:remove(4)">-</a>
                </li>
            `
        }
        // console.log(str)
        $('#donelist').append($(str))
        localStorage.removeItem('done')
        finished()
    }
    //5.已经完成事件部分
    //5.1 单选框
    $('#donelist').on('click', 'input', function() {
        const done = $(this).nextAll('p').text()
        // console.log(todo)
        const check = $(this).prop('checked')
        // console.log(check)
        if (!check) {
            bindHtml(done)
            $(this).parent().remove()
            finished()
        }
    })
    //删除
    $('#donelist').on('click', 'a', function() {
        const val =  $(this).prevAll('p').text()
        $(this).parent().remove()
        finished()
        localStorage.removeItem(val)
    })
    //已经完成条目数量
    function finished() {
        const num = $('#donelist > li').length
        // console.log(num)
        $('#donecount').text(num)
    }



})