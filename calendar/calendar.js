/**
 * Created by SunshineLXH on 2016/4/14.
 */
//绑定事件
function addEvent( obj, type, handle ) {
    try {
        obj.addEventListener( type, handle, false );
    }
    catch (e) {
        try {
            obj.attachEvent( 'on' + type, handle );
        }
        catch (e) {
            obj['on' + type] = handle;
        }
    }
    return false;
}

//给小于0的数前面加0
function addZero(num) {
    return num = num < 10 ? '0' + num : num;
}

var myDate;
var blocks;
var selYear, selMonth, selDay;
var aLi, holidayInfo, solarDay, lunarDay;

var offOn1 = true, offOn2 = true, offOn3 = true;

var hPlan = ['2016节假日安排','元旦','春节','清明节','劳动节','端午节','中秋节','国庆节'];

//获取元素
var tMonitor   = document.getElementsByClassName('time-monitor')[0],
    bDatesBar  = document.getElementsByClassName('base-dates-bar')[0],
    bDate      = bDatesBar.getElementsByTagName('span')[0],
    bWeekday   = bDatesBar.getElementsByTagName('span')[1],
    dShowPanel = document.getElementsByClassName('date-show-panel')[0],
    lunar      = document.getElementsByClassName('lunar')[0],
    lGanzhi    = document.getElementsByClassName('lunar-ganzi')[0],
    animal     = document.getElementsByClassName('animal')[0],
    astro      = document.getElementsByClassName('astro')[0],
    dDetail = document.getElementsByClassName('dates-detail')[0];

var yControl     = document.getElementsByClassName('year-control')[0],
    ct1          = yControl.getElementsByClassName('control')[0],
    mControl = document.getElementsByClassName('month-control')[0],
    ct2          = mControl.getElementsByClassName('control')[0],
    hControl = document.getElementsByClassName('holiday-control')[0],
    ct3          = hControl.getElementsByClassName('control-holiday')[0];

var yBtn    = ct1.getElementsByClassName('year')[0],
    trig1   = ct1.getElementsByClassName('trigger')[0],
    mBtn   = ct2.getElementsByClassName('month')[0],
    trig2   = ct2.getElementsByClassName('trigger')[0],
    hBtn = ct3.getElementsByClassName('holiday')[0],
    trig3   = ct3.getElementsByClassName('trigger')[0];

//上一年、下一年按钮， 上一月、下一月按钮
var prevYBtn = document.getElementsByClassName('prev')[0],
    nextYBtn = document.getElementsByClassName('next')[0],
    prevMBtn = document.getElementsByClassName('prev')[1],
    nextMBtn = document.getElementsByClassName('next')[1];

//返回今天
var toToday = document.getElementsByClassName('btn-today')[0];

/*
 * 右上角的时钟
 * */
function currentTime() {
    myDate = new Date();

    var getCurSeconds = addZero(myDate.getSeconds()),
        getCurMinutes = addZero(myDate.getMinutes()),
        getCurHours = addZero(myDate.getHours());

    tMonitor.innerHTML = getCurHours + ':' + getCurMinutes + ':' + getCurSeconds;
}

//先让它运行一次，再给它开个定时器，让时分秒走起来
currentTime();
setInterval(currentTime, 1000);

/*
 * 初始化
 * */
dropList();

/*
 * 生成下拉框
 * */
function dropList () {
    var listUl1 = document.createElement('ul'),
        listUl2 = document.createElement('ul'),
        listUl3 = document.createElement('ul');

    //生成年下拉框
    for ( var i = 1900; i < 2051; i++ ) {
        var yli = document.createElement('li');
        yli.innerHTML = i + '年';
        listUl1.appendChild(yli);
    }
    listUl1.className = "listUl1";
    yControl.appendChild(listUl1);

    //生成月下拉框
    for ( var j = 1; j < 13; j++ ) {
        var mli = document.createElement('li');
        mli.innerHTML = j + '月';
        listUl2.appendChild(mli);
    }
    listUl2.className = "listUl2";
    mControl.appendChild(listUl2);

    //生成节假日下拉框
    for (var k = 0; k < hPlan.length; k++ ) {
        var hli = document.createElement('li');
        hli.innerHTML = hPlan[k];
        listUl3.appendChild(hli);
    }
    listUl3.className = "listUl3";
    hControl.appendChild(listUl3);
}

/*
 * 上一年，下一年，上一月，下一月，选择节假日，返回今天
 * */
var yLi = document.getElementsByClassName('listUl1')[0].getElementsByTagName('li'),
    mLi = document.getElementsByClassName('listUl2')[0].getElementsByTagName('li'),
    hLi = document.getElementsByClassName('listUl3')[0].getElementsByTagName('li');

//选择年
for ( var i = 0; i < yLi.length; i++ ) {
    addEvent( yLi[i], 'click', showHidden1 );
    yLi[i].onclick = function () {
        selYear = parseInt(this.innerHTML.substr(0, 4));
        yBtn.innerHTML = selYear + '年';
        drawCalendar( selYear, selMonth, selDay );
    };
}

//上一年
prevYBtn.onclick = function () {
    if ( parseInt(yBtn.innerHTML.substr(0,4)) > 1900 ) {
        selYear = parseInt(yBtn.innerHTML.substr(0,4)) - 1;
        yBtn.innerHTML = selYear + '年';
        drawCalendar( selYear, selMonth, selDay );
    }
};

//下一年
nextYBtn.onclick = function () {
    if ( parseInt(yBtn.innerHTML.substr(0,4)) < 2050 ) {
        selYear = parseInt(yBtn.innerHTML.substr(0,4)) + 1;
        yBtn.innerHTML = selYear + '年';
        drawCalendar( selYear, selMonth, selDay );
    }
};

//选择月
for ( var i = 0; i < mLi.length; i++) {
    addEvent(mLi[i], 'click', showHidden2);
    mLi[i].onclick = function () {
        if ( this.innerHTML.length == 2 ) {
            selMonth = parseInt( this.innerHTML.substr(0,1) );
            mBtn.innerHTML = selMonth + '月';
        }
        else {
            selMonth = parseInt(this.innerHTML.substr(0,2));
            mBtn.innerHTML = selMonth + '月';
        }
        drawCalendar( selYear, selMonth, selDay );
    };
}

//上一月
prevMBtn.onclick = function () {
    if ( mBtn.innerHTML.length < 3 ) {
        if ( parseInt(mBtn.innerHTML.substr(0, 1) ) > 1 ) {
            selMonth = parseInt( mBtn.innerHTML.substr(0, 1) ) - 1;
            mBtn.innerHTML = selMonth + '月';
        }
        else {
            selMonth = 12;
            mBtn.innerHTML = selMonth + '月';
            selYear = parseInt( yBtn.innerHTML.substr(0, 4) ) - 1;
            yBtn.innerHTML = selYear + '年';
        }
    }
    else {
        selMonth = parseInt( mBtn.innerHTML.substr(0, 2) ) - 1;
        mBtn.innerHTML = selMonth + '月';
    }
    drawCalendar( selYear, selMonth, selDay );
};

//下一月
nextMBtn.onclick = function () {
    if ( mBtn.innerHTML.length < 3 ) {
        selMonth = parseInt( mBtn.innerHTML.substr(0, 1) ) + 1;
        mBtn.innerHTML = selMonth + '月';
    }
    else {
        if ( parseInt( mBtn.innerHTML.substr(0, 2) ) < 12 ) {
            selMonth = parseInt( mBtn.innerHTML.substr(0, 2) ) + 1
            mBtn.innerHTML = selMonth + '月';
        }
        else {
            selMonth = 1;
            mBtn.innerHTML = selMonth + '月';
            selYear = parseInt( yBtn.innerHTML.substr(0,4) ) + 1
            yBtn.innerHTML = selYear + '年';
        }
    }
    drawCalendar( selYear, selMonth, selDay );
};

//2016年节假日选择
for ( var i = 0; i < hLi.length; i++ ) {
    addEvent( hLi[i], 'click', showHidden3 );

    hLi[i].onclick = function () {
        hBtn.innerHTML = this.innerHTML;
        hBtn.style.textAlign = 'center';

        switch ( this.innerHTML ) {
            case '元旦':
                drawCalendar(2016, 1, 1);
                break;
            case '春节':
                drawCalendar(2016, 2, 8);
                break;
            case '清明节':
                drawCalendar(2016, 4, 4);
                break;
            case '劳动节':
                drawCalendar(2016, 5, 1);
                break;
            case '端午节':
                drawCalendar(2016, 6, 9);
                break;
            case '中秋节':
                drawCalendar(2016, 9, 15);
                break;
            case '国庆节':
                drawCalendar(2016, 10, 1);
                break;
        }
    };
}

/*
 * 年选择、月选择、节假日选择的显示与隐藏
 * */
var lUl1 = document.getElementsByClassName('listUl1')[0],
    lUl2 = document.getElementsByClassName('listUl2')[0],
    lUl3 = document.getElementsByClassName('listUl3')[0];

addEvent(toToday, 'click', function () {
    hBtn.innerHTML = '2016年节假日安排';
    drawCalendar();
});

//年按钮显示与隐藏
function showHidden1() {
    if ( offOn1 ) {
        lUl1.style.display = 'block';
        offOn1 = false;
    }
    else {
        lUl1.style.display = 'none';
        offOn1 = true;
    }
}

//月按钮显示与隐藏
function showHidden2() {
    if ( offOn2 ) {
        lUl2.style.display = 'block';
        offOn2 = false;
    }
    else {
        lUl2.style.display = 'none';
        offOn2 = true;
    }
}

//节假日显示与隐藏
function showHidden3() {
    if ( offOn3 ) {
        lUl3.style.display = 'block';
        offOn3 = false;
    }
    else {
        lUl3.style.display = 'none';
        offOn3 = true;
    }
}

//分别给年按钮、月按钮、节假日按钮绑定事件
addEvent( yBtn, 'click', showHidden1 );
addEvent( trig1, 'click', showHidden1 );

addEvent( mBtn, 'click', showHidden2 );
addEvent( trig2, 'click', showHidden2 );

addEvent( hBtn, 'click', showHidden3 );
addEvent( trig3, 'click', showHidden3 );


var calendar = {
    //数字转汉字
    nStr1:['日','一','二','三','四','五','六','七','八','九','十'],
    //日期转中文说法
    nStr2:['初','十','廿','卅'],
    //月份转中文说法
    nStr3:['正','二','三','四','五','六','七','八','九','十','冬','腊'],
    //阳历国际节日
    solarFestival:[
        "0101 元旦",
        "0214 情人节",
        "0308 妇女节",
        "0312 植树节",
        "0315 消费者权益日",
        "0401 愚人节",
        "0501 劳动节",
        "0504 青年节",
        "0512 护士节",
        "0601 儿童节",
        "0701 建党节",
        "0801 建军节",
        "0910 教师节",
        "0928 孔子诞辰",
        "1001 国庆节",
        "1006 老人节",
        "1024 联合国日",
        "1224 平安夜",
        "1225 圣诞节"],

    //农历节日
    lunarFestival:[
        "0101 春节",
        "0115 元宵节",
        "0505 端午节",
        "0707 七夕情人节",
        "0715 中元节",
        "0815 中秋节",
        "0909 重阳节",
        "1208 腊八节",
        "1224 小年"],

    //天干
    gan:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
    //地支
    zhi:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
    //生肖
    animals:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],

    //24节气
    solarTerm:["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],

    sTInfo:[0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758],

    //获取阳历某月天数
    sMDays:function(y, m) {
        var dNum = 0;
        if ( m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12 ) {
            dNum = 31;
        }
        else if ( m == 4 || m == 6 || m == 9 || m == 11 ) {
            dNum = 30;
        }
        else if ( m == 2 && calendar.isLeapYear(y) ) {
            dNum = 29;
        }
        else {
            dNum = 28;
        }
        return dNum;
    },

    //判断某年是否是闰年

    isLeapYear:function (y) {
        if ( y % 4 == 0 && y % 100 != 0 ) {
            return true;
        }
        else {
            if ( y % 400 == 0 ) {
                return true;
            }
            else {
                return false;
            }
        }
    },

    //获取农历某年的总天数
    lYDays:function (y) {
        var i, sum = 348;
        for ( i = 0x8000; i > 0x8; i >>= 1 ) {
            sum += ( calendar.lunarInfo[y - 1900] & i ) ? 1 : 0;
        }
        return ( sum + calendar.leapDays(y) );
    },

    //闰大小信息表
    lunarInfo:[
        0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
        0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
        0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
        0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
        0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
        0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
        0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
        0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
        0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
        0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
        0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
        0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
        0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
        0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
        0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
        0x14b63],//2050

    //某年闰月天数，若无闰月返回0
    leapDays:function (y) {
        if ( calendar.leapMonth (y) ) {
            return ( (calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29 );
        }
        return 0;
    },

    //查看某年那一月是闰月，返回
    leapMonth:function (y) {
        return ( calendar.lunarInfo[y - 1900] & 0xf );
    },

    //传入偏移量返回干支, 根据尾数得到天干，除以12的余数得到地支
    toGanZhi:function(offset) {
        return calendar.gan[offset % 10] + calendar.zhi[offset % 12];
    },

    toChMonth:function (m) {
        var sd = calendar.nStr3[m - 1];
        sd += '月';
        return sd;
    },

    toChDay:function (d) {
        var ld;
        switch (d) {
            case 10:
                ld = '初十';
                break;
            case 20:
                ld = '二十';
                break;
            case 30:
                ld = '三十';
                break;
            default:
                ld = calendar.nStr2[Math.floor(d / 10)];
                ld += calendar.nStr1[d % 10];
        }
        return ld;
    },

    //农历某月天数
    lMDays:function (y, m) {
        return((calendar.lunarInfo[y-1900]&(0x10000>>m))?30:29);
    },

    //返回某年所属生肖
    getAnimal:function(y) {
        return calendar.animals[(y - 4) % 12];
    },

    getTerm:function (y, n) {
    var offDate = new Date((31556925974.7*(y-1900)+calendar.sTInfo[n]*60000)+Date.UTC(1900,0,6,2,5));
    return(offDate.getUTCDate());
},

    //根据阳历日期，得到详细的包含阳历和阴历信息的json对象
    slInfo:function ( y, m, d ) {
        if ( y < 1900 || y > 2050 ) return -1;
        if ( !y ) var oDate = new Date();
        else var oDate = new Date( y, parseInt(m) - 1, d );
        var i, leap, temp;
        var y = oDate.getFullYear(),
            m = addZero(oDate.getMonth() + 1),
            d = addZero(oDate.getDate());

        var offset = ( Date.UTC(y, m - 1, d) - Date.UTC(1900, 0, 31) ) / 86400000;

        for ( i = 1900; i < 2051 && offset > 0; i++ ) {
            temp = calendar.lYDays(i);
            offset -= temp;
        }
        if ( offset < 0 ) {
            offset += temp;
            i--;
        }

        //判断是否是今天
        var isT = new Date(),
            isToday = false;
        if ( isT.getFullYear() == y && isT.getMonth() + 1 == m && isT.getDate() == d ) {
            isToday = true;
        }

        //判断y.m.d是星期几
        var thWeek = oDate.getDay(),
            chWeek = calendar.nStr1[thWeek];

        var isLeap = false;

        //农历年
        var year = i,
            leap = calendar.leapMonth(i);

        //查看是否是闰月,如果是计算闰月天数，如果不是计算农历普通月的天数
        for ( var i = 1; i < 13 && offset > 0 ; i++ ) {
            if ( leap > 0 && i == (leap + 1) && isLeap == false ) {
                --i;
                isLeap = true;
                temp = calendar.leapDays(year);
            }
            else {
                temp = calendar.lMDays(year, i);
            }
            //将isLeap变为false
            if ( isLeap == true && i == (leap + 1) )
                isLeap = false;
            offset -= temp;
        }
        if ( offset == 0 && leap > 0 && i == leap+1){
            if ( isLeap ){
                isLeap = false;
            }
            else{
                isLeap = true;
                --i;
            }
        }

        if ( offset < 0 ){
            offset += temp;
            --i;
        }

        //农历月
        var month 	= addZero(i);

        //农历日
        var day 	= addZero(offset + 1);

        //天干地支处理
        var sm 	  = m - 1;
        var term3 = calendar.getTerm(year,3); //该农历年立春日期
        var gzY   = calendar.toGanZhi(year-4);//普通按年份计算，下方尚需按立春节气来修正

        //依据立春日进行修正gzY
        if( sm < 2 && d < term3 ) {
            gzY = calendar.toGanZhi(year - 5);
        }else {
            gzY = calendar.toGanZhi(year - 4);
        }


        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        var firstNode 	= calendar.getTerm(y, (m*2-1));//返回当月「节」为几日开始
        var secondNode = calendar.getTerm(y, (m*2));//返回当月「节」为几日开始

        //依据12节气修正干支月

        var gzM 	= 	calendar.toGanZhi((y - 1900) * 12 + m + 11);
        if ( d >= firstNode ) {
            gzM 	= 	calendar.toGanZhi((y - 1900) * 12 + m + 12);
        }

        //传入的日期是否是节气
        var isTerm = false,
            Term = null;
        if ( firstNode == d ) {
            isTerm 	= true;
            Term 	= calendar.solarTerm[m * 2 - 1];
        }
        if ( secondNode==d ) {
            isTerm 	= true;
            Term 	= calendar.solarTerm[(m - 1)* 2 ];
        }

        var isHFestival = false;
        var isSFestival = false,
            sFestival = null;
        for ( var i = 0; i < calendar.solarFestival.length; i++ ) {
            if ( calendar.solarFestival[i].substr(0,4) == m + d  ) {
                isSolarFestival = true;
                sFestival = calendar.solarFestival[i].substr(5);
                if ( m + d == "0101" || m + d == "0501" || m + d == "1001") {
                    isHFestival = true;
                }
            }
        }

        var isLFestival = false,
            lFestival = null;
        for ( var i = 0; i < calendar.lunarFestival.length; i++ ) {
            if ( calendar.lunarFestival[i].substr(0, 4) == month + day ) {
                isLFestival = true;
                lFestival = calendar.lunarFestival[i].substr(5);
                if ( month + day == "0101" || month + day == "0505" || month + day == "0815" ) {
                    isHFestival = true;
                }
            }
        }

        //日柱 当月一日与1900年1月1日相差的天数
        var dayCyclical = Date.UTC( y, sm, 1, 0, 0, 0, 0 ) / 86400000 + 25567 + 10;
        var gzD = calendar.toGanZhi(dayCyclical+d-1);


        return {
            'isToday': isToday,
            'chWeek': '星期' + chWeek,
            //公历
            'sYear': y,
            'sMonth': m,
            'sDay': d,
            //农历
            'lYear': year,
            'lMonth': month,
            'lDay': day,
            //干支
            'gzYear' : gzY,
            'gzMonth' : gzM,
            'gzDay' : gzD,

            'IMonthCn': ( isLeap ? '闰' : '' ) + calendar.toChMonth(month),
            'IDayCn': calendar.toChDay(day),

            'animal': calendar.getAnimal(year),
            'isLeap': isLeap,
            'isTerm': isTerm,
            'Term': Term,
            'isSolarFestival' : isSFestival,
            'solarFestival' : sFestival,
            'isLunarFestival' : isLFestival,
            'lunarFestival' : lFestival,
            'isHolidayFestival' : isHFestival
        }
    }
};

initial();

function initial() {
    //循环生成42个方块
    for ( var i = 0; i < 42; i++ ) {
        var oLi = document.createElement('li');
        oLi.style.position = 'relative';
        //对末列样式进行处理
        if (i != 0 && (i + 1) % 7 == 0) oLi.className = "oLi oLi-last";
        else oLi.className = 'oLi';
        //对第六列和第七列的字体加红色
        if ( (i!=0 && (i + 1) % 7 == 0) || (i + 2) % 7 == 0) {
            oLi.style.color = "#B04343";
        }
        //对末行样式进行微调
        if (i == 35 || i == 36 || i == 37 || i == 38 || i == 39 || i == 40) oLi.className = "oLi oLi-lastRow";
        if (i == 41) oLi.className = "oLi oLi-last oLi-lastRow";

        //每个方块由span，div,span三个子元素组成
        var oSpan1 = document.createElement('span');
        oSpan1.className = 'holidayInfo';
        var oDiv = document.createElement('div');
        oDiv.className = 'solarDay';
        var oSpan2 = document.createElement('span');
        oSpan2.className = 'lunarDay';

        oLi.appendChild( oSpan1 );
        oLi.appendChild( oDiv );
        oLi.appendChild( oSpan2 );

        dDetail.appendChild( oLi );
    }
    //获取42个方块
    aLi         = dDetail.getElementsByTagName('li');
    holidayInfo = dDetail.getElementsByClassName('holidayInfo');
    solarDay    = dDetail.getElementsByClassName('solarDay');
    lunarDay    = dDetail.getElementsByClassName('lunarDay');
}

/*
* 根据传入的日期渲染页面
* */
drawCalendar();

function drawCalendar (year, month, day) {
    var sDate = new Date();
    var y = year ? year : sDate.getFullYear(),
        m = month ? month : (sDate.getMonth() + 1),
        d = day ? day : sDate.getDate();

    yBtn.innerHTML = y + '年';
    mBtn.innerHTML = m + '月';

    var cs = calendar.slInfo(y, m, d);

    //右边
    bDate.innerHTML = y + '-' + m + '-' + d;
    bWeekday.innerHTML = cs.chWeek;
    dShowPanel.innerHTML = d;

    lunar.innerHTML = calendar.slInfo(y, m, d).IMonthCn + calendar.slInfo(y, m, d).IDayCn;

    animal.innerHTML = cs.animal;
    astro.innerHTML = cs.gzYear + '年';

    lGanzhi.innerHTML = cs.gzMonth + '月    ' + cs.gzDay + '日';

    var dayNum = 0,
        preMNum = 0,
        NextMNum = 0;

    dayNum = calendar.sMDays(y, m);

    if ( m == 1 ) preMNum = calendar.sMDays( y - 1, 12 );
    else preMNum = calendar.sMDays( y, m - 1 );

    if ( m == 12 ) nextMNum = calendar.sMDays( y + 1, 1 );
    else nextMNum = calendar.sMDays( y, m + 1 );

    sDate.setFullYear(y);
    sDate.setMonth(m - 1);
    sDate.setDate(1);

    switch ( sDate.getDay() ) {
        case 0:
            ab( y, m, d, 6, dayNum, preMNum );
            break;
        case 1:
            ab( y, m, d, 0, dayNum, preMNum );
            break;
        case 2:
            ab( y, m, d, 1, dayNum, preMNum );
            break;
        case 3:
            ab( y, m, d, 2, dayNum, preMNum );
            break;
        case 4:
            ab( y, m, d, 3, dayNum, preMNum );
            break;
        case 5:
            ab( y, m, d, 4, dayNum, preMNum );
            break;
        case 6:
            ab( y, m,  d, 5,dayNum, preMNum );
            break;
    }
}

function ab ( y, m,  d, num,dayNum, preMNum ) {
    //把之前加的样式去掉
    for ( var i = 0; i < aLi.length; i++ )  {
        solarDay[i].innerHTML = '';
        holidayInfo[i].innerHTML = '';
        holidayInfo[i].style.background = '';
        holidayInfo[i].style.color = '';
        holidayInfo[i].innerHTML = '';
        lunarDay[i].innerHTML = '';
        lunarDay[i].style.color = '#999999';
        lunarDay[i].style.fontWeight = 'normal';
        solarDay[i].parentNode.style.opacity = 1;
        solarDay[i].parentNode.style.background = '#FFFFFF';
    }

    var sDate = new Date();
    //如果是在当前月的页面上，给‘今天’加上特殊样式，如果不是在当前月把之前加的去掉
    if ( y == sDate.getFullYear() && m == sDate.getMonth() + 1 ) {
        if ( !document.getElementsByClassName('td')[0]) {
            var div = document.createElement('div');
            div.className = 'td';
            solarDay[num + d - 1].parentNode.appendChild(div);
        }
    }
    else {
        if (document.getElementsByClassName('td')[0]) {
            var div = document.getElementsByClassName('td')[0];
            div.parentNode.removeChild(div);
        }
    }

    blocks = [];
    //当月
    for ( var i = 0; i < dayNum; i++ ) {
        solarDay[i + num].innerHTML = i + 1;
        blocks.push(y + ':' + addZero(m) + ':' + addZero(i + 1));
        if (calendar.slInfo(y, m, (i + 1)).isHolidayFestival) {
            bb(i + num);
        }

        if ( calendar.slInfo(y, m, (i + 1)).lunarFestival ) {
            lunarDay[i + num].innerHTML = calendar.slInfo(y, m, (i + 1)).lunarFestival;
            cc(i + num);
        }
        else if ( calendar.slInfo(y, m, (i + 1)).solarFestival ) {
            lunarDay[i + num].innerHTML = calendar.slInfo(y, m, (i + 1)).solarFestival;
            cc(i + num);
        }
        else if ( calendar.slInfo(y, m, (i + 1)).isTerm ) {
            lunarDay[i + num].innerHTML = calendar.slInfo(y, m, (i + 1)).Term;
            cc(i + num);
        }
        else {
            lunarDay[i + num].innerHTML = calendar.slInfo(y, m, (i + 1)).IMonthCn + calendar.slInfo(y, m, (i + 1)).IDayCn;
        }
    }

    function cc(i) {
        lunarDay[i].style.color = 'red';
        lunarDay[i].style.fontWeight = 'bold';
    }

    //上一月
    for ( var i = num -1, j = preMNum; j > preMNum - num, i >= 0; i--, j-- ) {
        solarDay[i].innerHTML = j;
        solarDay[i].parentNode.style.opacity = 0.7;
        solarDay[i].parentNode.style.background = '#F7F5F3';
        if ( m ==1 ) {
            var py = y - 1,
                pm = 12;
        }
        else {
            var py = y,
                pm = m - 1;
        }
        blocks.unshift(py + ':' + addZero(pm) + ':' + addZero(j));
        if ( calendar.slInfo(py, pm, j).isHolidayFestival ) {
            bb(i);
        }

        if ( calendar.slInfo(py, pm, j).lunarFestival ) {
            lunarDay[i].innerHTML = calendar.slInfo(py,pm,j).lunarFestival;
            cc(i);
        }
        else if ( calendar.slInfo(py, pm, j).solarFestival ) {
            lunarDay[i].innerHTML = calendar.slInfo(py,pm,j).solarFestival;
            cc(i);
        }
        else if ( calendar.slInfo(py, pm, j).isTerm ) {
            lunarDay[i].innerHTML = calendar.slInfo(py, pm, j).Term;
            cc(i);
        }
        else {
            lunarDay[i].innerHTML = calendar.slInfo(py, pm, j).IMonthCn + calendar.slInfo(py, pm, j).IDayCn;
        }
    }

    //下一月
    for ( var i = num + dayNum, j = 1; i < 42, j <= 42 - num -dayNum; i++, j++ ) {
        solarDay[i].innerHTML = j;
        solarDay[i].parentNode.style.opacity = 0.7;
        solarDay[i].parentNode.style.background = '#F7F5F3';
        if ( m == 12 ) {
            var ny = y + 1,
                nm = 1;
        }
        else {
            var ny = y,
                nm = m + 1;
        }
        blocks.push(ny + ':' + addZero(nm) + ':' + addZero(j));

        if ( calendar.slInfo(ny, nm, j).isHolidayFestival ) {
            bb(i);
        }

        if ( calendar.slInfo(ny, nm, j).lunarFestival ) {
            lunarDay[i].innerHTML = calendar.slInfo(ny, nm, j).lunarFestival;
            cc(i);
        }
        else if ( calendar.slInfo(ny, nm, j).solarFestival ) {
            lunarDay[i].innerHTML = calendar.slInfo(ny, nm, j).solarFestival;
            cc(i);
        }
        else if ( calendar.slInfo(ny, nm, j).isTerm ) {
            lunarDay[i].innerHTML = calendar.slInfo(ny, nm, j).Term;
            cc(i);
        }
        else {
            lunarDay[i].innerHTML = calendar.slInfo(ny, nm, j).IMonthCn + calendar.slInfo(y, m, j).IDayCn;
        }
    }
}

function bb (i) {
    holidayInfo[i].style.background = 'red';
    holidayInfo[i].style.color = '#fff';
    holidayInfo[i].innerHTML = '休';
}

for ( var i = 0; i < aLi.length; i ++) {
    aLi[i].index = i;
    addEvent(aLi[i], 'click', function() {
        var sy = parseInt(blocks[this.index].substr(0,4)),
            sm = parseInt(blocks[this.index].substr(5,2)),
            sd = parseInt(blocks[this.index].substr(8,2));
        drawCalendar(sy, sm, sd);
    });
}
