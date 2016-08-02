$(function() {
  kongbai = {};
  
  for (var i = 0; i < 15; i++) {
    $('<i>').addClass('hang').appendTo('.qipan');
    $('<b>').addClass('shu').appendTo('.qipan');
    for (var j = 0; j < 15; j++) {
      kongbai[i + '-' + j] = {
        x: i,
        y: j
      };
      $('<div>')
      .addClass('qizi')
      .attr('id', i + '-' + j)
      .data('pos', {
        x: i,
        y: j
      })
      .appendTo('.qipan');
    }
  }
  //获取位置设置data
  //   var kaiguan=true;
  //   $('.qipan .qizi').on('click',function () {
  //     $(this).addClass(function () {
  //       return (kaiguan) ?'hei':'bai';
  //     })
  //     kaiguan=!kaiguan;
  // })
  var hei = {};
  var bai = {};
  var isAi = false;
  var kaiguan = true;
  var join = function(n1, n2) {
    return n1 + '-' + n2;
  }
  var panduan = function(pos, biao) {
    var h = 1
      
    , s = 1
      
    , zx = 1
      
    , yx = 1;
    var tx, ty;
    tx = pos.x;
    ty = pos.y;
    while (biao[join(tx, ty - 1)]) {
      h++;
      ty--;
    }
    tx = pos.x;
    ty = pos.y;
    while (biao[join(tx, ty + 1)]) {
      h++;
      ty++;
    }
    // if(h>=5){
    //  return true;
    // }
    tx = pos.x;
    ty = pos.y;
    while (biao[join(tx - 1, ty)]) {
      s++;
      tx--;
    }
    tx = pos.x;
    ty = pos.y;
    while (biao[join(tx + 1, ty)]) {
      s++;
      tx++;
    }
    // if(s>=5){
    //  return true;
    // }
    tx = pos.x;
    ty = pos.y;
    while (biao[join(tx - 1, ty - 1)]) {
      zx++;
      tx--;
      ty--;
    }
    tx = pos.x;
    ty = pos.y;
    while (biao[join(tx + 1, ty + 1)]) {
      zx++;
      tx++;
      ty++;
    }
    // if(zx>=5){
    //  return true;
    // }
    tx = pos.x;
    ty = pos.y;
    while (biao[join(tx - 1, ty + 1)]) {
      yx++;
      tx--;
      ty++;
    }
    tx = pos.x;
    ty = pos.y;
    while (biao[join(tx + 1, ty - 1)]) {
      yx++;
      tx++;
      ty--;
    }
    // if(yx>=5){
    //  return true;
    // }
    return Math.max(h, s, zx, yx);
    //return true;
  }
  var ai = function() {
    var max = -Infinity;
    var zuobiao;
    for (var i in kongbai) {
      var weixie = panduan(kongbai[i], hei);
      if (weixie > max) {
        max = weixie;
        zuobiao = kongbai[i];
      }
    }
    var max1 = -Infinity;
    var zuobiao1;
    for (var i in kongbai) {
      var weixie = panduan(kongbai[i], bai);
      if (weixie > max1) {
        max1 = weixie;
        zuobiao1 = kongbai[i];
      }
    }
    return (max > max1) ? zuobiao : zuobiao1;
  }
  var zhuangtai;
  start = function() {
    
    $('.qipan .qizi').on('click', function() {
      if ($(this).hasClass('hei') || $(this).hasClass('bai')) {
        return;
      }
      
      var pos = $(this).data('pos');
      if (kaiguan) {
        zhuangtai = 'playing';
        startTime();
        $(this).addClass('hei');
        hei[pos.x + '-' + pos.y] = true;
        delete kongbai[join(pos.x, pos.y)];
        if (panduan(pos, hei) >= 5) {
          
          $('.qipan').addClass('zhezhao');
          $(".kuanghei").show();
          
          zhuangtai = 'paused';
          endTime();
          $('.qipan .qizi').off('click');
        
        }
        if (isAi) {
          var pos = ai();
          $('#' + join(pos.x, pos.y)).addClass('bai');
          bai[join(pos.x, pos.y)] = true;
          delete kongbai[join(pos.x, pos.y)];
          if (panduan(pos, bai) >= 5) {
            
            $('.qipan').addClass('zhezhao');
            $('.kuangbai').show();
            zhuangtai = 'paused';
            endTime();
            $('.qipan .qizi').off('click');
          }
          return;
        }
      
      } else {
        $(this).addClass('bai');
        bai[pos.x + '-' + pos.y] = true;
        if (panduan(pos, bai) >= 5) {
          $('.qipan').addClass('zhezhao');
          $('.kuangbai').show();
          zhuangtai = 'paused';
          endTime();
          $('.qipan .qizi').off('click');
        
        }
      }
      
      kaiguan = !kaiguan;
    })
  }
  
  chongxin = function() {
    $('.qipan .qizi').remove();
    
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        kongbai[i + '-' + j] = {
          x: i,
          y: j
        };
        $('<div>')
        .addClass('qizi')
        .attr('id', i + '-' + j)
        .data('pos', {
          x: i,
          y: j
        })
        .appendTo('.qipan');
      }
    
    }
    bai = {};
    hei = {};
    endTime();
    zhuangtai = 'paused';
  }
  
  $('.jiemian .renren').on('click', function(e) {
    e.preventDefault();
    $(".jiemian").addClass("jiemianhide");
    $('.ren').show(100);
    $(".qipan").slideDown(1000);
  })
  $('.ren .kaishi').on('click', function(e) {
    e.preventDefault();
    endTime();
    start();
    startTime();
    zhuangtai = true;
  })
  $('.ren .chongxin').on('click', function(e) {
    e.preventDefault();
    chongxin();
    endTime();
    start();
    startTime();
  })
  
  $('.jiemian .renji').on('click', function(e) {
    e.preventDefault();
    $(".jiemian").addClass("jiemianhide");
    $('.ji').show(100);
    $(".qipan").slideDown(1000);
  
  })
  $('.jiemian .jianjie').on('click', function(e) {
    e.preventDefault();
    $('.guize').slideDown().delay(4000).slideUp();
  })
  
  $('.ren .zhuye').on('click', function(e) {
    e.preventDefault();
    $('.ren').hide(100);
    $(".qipan .qizi").remove();
    endTime();
    $('.qipan .qizi').off('click');
    chongxin();
    start();
    startTime();
    $(".qipan").hide(100);
    $(".jiemian").removeClass('jiemianhide').show(1000);
  
  })
  $('.ji .zhuye').on('click', function(e) {
    e.preventDefault();
    $('.ji').hide(100);
    $(".qipan .qizi").remove();
    endTime();
    $('.qipan .qizi').off('click');
    chongxin();
    start();
    startTime();
    $(".qipan").hide(100);
    $(".jiemian").removeClass('jiemianhide').show(1000);
  })
  $('.ji .kaishi').on('click', function(e) {
    e.preventDefault();
    endTime();
    isAi = true;
    start();
    startTime();
    zhuangtai = true;
  })
  $('.ji .chongxin').on('click', function(e) {
    e.preventDefault();
    chongxin();
    endTime();
    start();
    startTime();
  })
  $('.kuangbai .sure').on('click', function() {
    $('.kuangbai').css('display', 'none');
    $('.qipan').removeClass('zhezhao');
    chongxin();
    start();
    endTime();
    startTime();
  })
  $('.kuanghei .sure').on('click', function() {
    $('.kuanghei').css('display', 'none');
    $('.qipan').removeClass('zhezhao');
    chongxin();
    endTime();
    start();
    startTime();
  })
  function startTime() {
    clearInterval(tt);
    tt = setInterval(jishi, 500);
  }
  function endTime() {
    clearInterval(tt);
  }
  var tt;
  var shijian = 0;
  var min = 0;
  var second = 0;
  function jishi() {
    if (zhuangtai == "paused") {
      shijian = 0;
      min = 0;
      second = 0;
      $(".jishi span").html("0:00");
    }
    shijian += 1;
    second = shijian % 60;
    if (shijian % 60 == 0) {
      min = parseInt(min);
      min += 1;
      min = (min < 10) ? '0' + min : min;
    }
    second = (second < 10) ? '0' + second : second;
    $(".jishi span").html(min + ':' + second);
    zhuangtai = "playing";
  }

})
