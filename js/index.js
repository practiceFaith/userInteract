var loadingRender = (function () {
    var $loading = $('#loading'),
        $em = $loading.find('em');
    var imgAry = ["icon.png", "zf_concatAddress.png", "zf_concatInfo.png", "zf_concatPhone.png", "zf_course.png", "zf_course1.png", "zf_course2.png", "zf_course3.png", "zf_course4.png", "zf_course5.png", "zf_course6.png", "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_cubeTip.png", "zf_emploment.png", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", "zf_messageLogo.png", "zf_messageStudent.png", "zf_outline.png", "zf_phoneBg.jpg", "zf_phoneDetail.png", "zf_phoneListen.png", "zf_phoneLogo.png", "zf_return.png", "zf_style1.jpg", "zf_style2.jpg", "zf_style3.jpg", "zf_styleTip1.png", "zf_styleTip2.png", "zf_teacher1.png", "zf_teacher2.png", "zf_teacher3.jpg", "zf_teacher4.png", "zf_teacher5.png", "zf_teacher6.png", "zf_teacherTip.png"];
    var step = 0,
        total = imgAry.length;
    return {
        init: function () {
            $loading.css('display', 'block');
            $.each(imgAry, function (index, item) {
                var oImg = new Image;
                oImg.src = 'img/' + item;
                oImg.onload = function () {
                    step++;
                    $em.css('width', step / total * 100 + '%');
                    oImg = null;
                    if (step === total) {
                        window.setTimeout(function () {
                            $loading.css('display', 'none');
                            phoneRender.init();
                        }, 2000);
                    }
                }
            });
        }
    }
})();

var phoneRender = (function () {
    var $phone = $('#phone'),
        $time = $phone.children('.time'),
        $listenBox = $phone.children('.listenBox'),
        $listen = $listenBox.children('.listen'),
        $hangupBox = $phone.children('.hangupBox'),
        $hangup = $hangupBox.children('.hangup'),
        $listenBell = $phone.children('#listenBell')[0],
        $say = $phone.children('#say')[0],
        sayTimer = null;

    function sayTimerFn() {
        $say.play();
        sayTimer = window.setInterval(function () {
            var time = $say.currentTime,
                duration = $say.duration,
                hour = '', minute = '', second = '';
            hour = Math.floor(time / 60 / 60);
            minute = Math.floor(time / 60);
            second = Math.floor(time % 60);
            hour < 10 ? hour = '0' + hour : null;
            minute < 10 ? minute = '0' + minute : null;
            second < 10 ? second = '0' + second : null;
            if (hour == 0) {
                $time.html(minute + ':' + second);
            } else {
                $time.html(hour + ':' + minute + ':' + second);
            }
            if (time === duration) {
                closeSay();
            }

        }, 1000);
    }

    function closeSay() {
        $say.pause();
        window.clearInterval(sayTimer);
        sayTimer = null;
        $phone.css('transform', 'translateY(' + document.documentElement.clientHeight + 10 + 'px)').on('webkitTransitionEnd', function () {
            $phone.css('display', 'none');
        });
        messageRender.init();
    }

    return {
        init: function () {
            $phone.css('display', 'block');
            $listenBell.play();
            $listen.singleTap(function () {
                $listenBell.pause();
                $listenBox.css('display', 'none');
                $hangupBox.css('transform', 'translateY(0)');
                $time.css('display', 'block');
                sayTimerFn();
                $hangup.singleTap(function () {
                    closeSay();
                });
            });
        }
    }
})();
var messageRender = (function () {
    var $message = $('#message'),
        $messageList = $message.children('.messageList'),
        $messageLi = $messageList.children('li'),
        $keyboad = $message.children('.keyboad'),
        $textBox = $keyboad.children('.textBox'),
        $send = $keyboad.children('.send'),
        $audio = $message.children('#music')[0];

    var autoTimer = null,
        step = -1,
        total = $messageLi.length,
        result = '',
        bounceTop = 0;

    function sendMessage() {
        autoTimer = window.setInterval(function () {
            step++;
            var currentLi = $messageLi.eq(step);
            currentLi.css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
            if (step === 2) {
                window.clearInterval(autoTimer);
                $keyboad.css('transform', 'translateY(0)');
                $textBox.css('display', 'block');
                printingText();
            }
            if (step === 3) {
                currentLi.html(result);
                result = null;
            }
            if (step > 3) {
                bounceTop -= currentLi[0].offsetHeight + 10;
                $messageList.css('transform', 'translateY(' + bounceTop + 'px)');
            }
            if (step === total - 1) {
                window.clearInterval(autoTimer);
                $audio.pause();
                $message.css('opacity', '0');
                window.setTimeout(function () {
                    $message.css('display', 'none');
                    cubeRender.init();
                }, 1000);
            }
        }, 1500);
    }

    function printingText() {
        var str = '都学了啊，可还是找不到工作！',
            index = -1,
            total = str.length;
        var timer = window.setInterval(function () {
            index++;
            result += str[index];
            $textBox.html(result);
            if (index === total - 1) {
                window.clearInterval(timer);
                $send.css('display', 'block').singleTap(function () {
                    $textBox.css('display', 'none');
                    $keyboad.css('transform', 'translateY(3.7rem)');
                    sendMessage();
                });
            }
        }, 200);
    }

    return {
        init: function () {
            $message.css('display', 'block');
            $audio.play();
            sendMessage();
        }
    }
}());
var cubeRender = (function () {
    var $cube = $('#cube'),
        $cubeBox = $cube.children('.cubeBox'),
        $cubeLi = $cubeBox.children('li');

    function start(event) {
        var point = event.touches[0];
        $(this).attr({
            startX: point.clientX,
            startY: point.clientY,
            changeX: 0,
            changeY: 0
        });
    }

    function move(event) {
        var point = event.touches[0],
            changeX = point.clientX - $(this).attr('startX'),
            changeY = point.clientY - $(this).attr('startY');
        $(this).attr({
            changeX: changeX,
            changeY: changeY
        });
    }

    function end(event) {
        var changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY')),
            rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));
        rotateX = rotateX - changeY / 3;
        rotateY = rotateY + changeX / 3;
        $(this).attr({
            rotateX: rotateX,
            rotateY: rotateY
        }).css('transform', 'scale(.6) rotateX(' + rotateX + 'deg) ' + 'rotateY(' + rotateY + 'deg)');
    }

    return {
        init: function () {
            $cube.css('display', 'block');
            $cubeBox.attr({
                rotateX: -35,
                rotateY: 45
            }).on('touchstart', start).on('touchmove', move).on('touchend', end);
            $cubeLi.singleTap(function () {
                var index=$(this).index();
                $cube.css('display','none');
                swiperRender.init(index);
            });
        }
    }
}());
var swiperRender = (function () {
    $swiper = $('#swiper'),
        $makisu = $('#makisu'),
        $return = $swiper.children('.return');

    function change(example) {
        var slidesAry = example.slides,
            activeIndex = example.activeIndex;
        if (activeIndex === 0) {
            $makisu.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: .8
            });
            $makisu.makisu('open');
        } else {
            $makisu.makisu({
                selector: 'dd',
                overlap: .6,
                speed: 0
            });
            $makisu.makisu('close');
        }
        $.each(slidesAry, function (index, item) {
            if (index === activeIndex) {
                item.id = 'page' + (activeIndex + 1);
                return;
            }
            item.id = null;
        });
    }

    return {
        init: function (index) {
            $swiper.css('display', 'block');
            var mySwiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                onTransitionEnd: change,
                onInit: change
            });
            mySwiper.slideTo(index, 0);
            $return.singleTap(function () {
                $swiper.css('display','none');
                $('#cube').css('display','block');
            });
        }
    }
}());
var urlParameter = window.location.href.queryURLParameter(),
    page = parseFloat(urlParameter['page']);
if (page === 0 || isNaN(page)) {
    page = 0;
}
switch (page) {
    case 0:
        loadingRender.init();
        break;
    case 1:
        phoneRender.init();
        break;
    case 2:
        messageRender.init();
        break;
    case 3:
        cubeRender.init();
        break;
    case 4:
        swiperRender.init();
        break;
}
