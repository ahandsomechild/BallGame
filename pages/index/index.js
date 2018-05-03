//index.js
//获取应用实例
const app = getApp()
var timer;
Page({
  data: {
    awidth:70,
    aheight:30,
    aleft:120,
    abottom:200,
    bredius:30,
    bleft:150,
    bbottom:0,
    // //设置小球在x,y轴移动的距离
    speedX:3,
    speedY:4,
    bspeed:10, // 设置小球移动速度
    xdirec:1,
    ydirec:1,
    swidth:wx.getSystemInfoSync().windowWidth,
    sheight: wx.getSystemInfoSync().windowHeight
  },
  fail:function(){
     wx.showToast({
      title: 'Game over',
      icon: 'warn',
      duration: 1000,
      mask: true
    })
  }, 
  onChange: function (e) {
    console.log(e.detail)
    this.data.aleft = e.detail.x;
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    timer = setInterval(function () {
      that.run()
      // console.log("111")
    }, this.data.bspeed);  
  },
  run:function(){
    var the = this;
    // var w = document.body.clientWidth;
    // var h = document.body.clientHeight;
    // console.log(this.data.swidth);
    // console.log(this.data.sheight);
    this.setData({
      bleft: this.data.bleft + this.data.speedX * this.data.xdirec,
      bbottom: this.data.bbottom + this.data.speedY * this.data.ydirec
    })
    //碰到屏幕反弹
    //right
    if(this.data.bleft+30>this.data.swidth){
      this.data.xdirec = -this.data.xdirec
    }
    //top  从上面出去游戏就结束啦
    if(this.data.bbottom+30>this.data.sheight){
      the.fail()
    }
    //left
    if(this.data.bleft<0){
      this.data.xdirec = -this.data.xdirec
    }
    if(this.data.bbottom<0){
      this.data.ydirec = -this.data.ydirec
    }
    
    //碰到挡板反弹
    if (this.data.bbottom == this.data.sheight - this.data.aheight - this.data.bredius && this.data.bleft > this.data.aleft - this.data.bredius && this.data.bleft < this.data.aleft + this.data.awidth){
      this.data.ydirec = -this.data.ydirec
    }
    // if((this.data.bleft+30 == this.data.aleft||this.data.bleft == this.data.aleft+100) && (this.data.bbottom+15> this.data.abottom&&this.data.bbottom<this.data.abottom+15)){
    //   this.data.xdirec = -this.data.xdirec
    // }
    // if (this.data.bbottom == this.data.abottom && (this.data.bleft+30 > this.data.aleft) && (this.data.bleft < this.data.aleft + 100)){
    //   this.data.ydirec = -this.data.ydirec
    // }
    // if (this.data.bleft == this.data.aleft && (this.data.bbottom + 30 > this.data.abottom) && (this.data.bbottom < this.data.abottom + 15)){
    //   this.data.xdirec = -this.data.xdirec
    // }
    // console.log(this.data.bleft)
    // console.log(this.data.bbottom)
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
