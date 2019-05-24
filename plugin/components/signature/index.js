var dataJson = require("../../api/data.js");

Component({
  data: {
    images: [],
    currentImage: "",
    currentIndex: 0,
    imageWidth: "375",
    imageHeight: "600",
    bShowPop: !1,
    bShowViewImagesPage: !0,
    bHasSignature: !1,
    videos: {},
    videoWidth: "",
    videoHeight: "",
    closeBtnoffsetY: "",
    closeBtnoffsetX: "",
    bShowStatus: !1,
    bShowBack: !0,
    boxHeight: 200
  },
  attached: function() {
    dataJson.initData(),
      this.signatureImage = null,
      this.imagesKeys = [],
      this.imagesValues = [],
      this.bHasImg = !0,
      this.bIsRecordVideo = !0,
      this.signPosition = null,
      this.angle = 0,
      this.bIsPressDown = !1,
      this.arrx = [],
      this.arry = [],
      this.arrz = [],
      this.canvasw = 0,
      this.canvash = 0,
      this.imageCanvasW = 1e3,
      this.currentImage = null,
      this.currentImagePath = null,
      this.signPath = null,
      this.signaturePath = null,
      this.videoPath = null,
      this.ctx = null,
      this.camCtx = wx.createCameraContext(this),
      this.vidCtx = wx.createVideoContext("video", this),
      this.bIsPlaying = !1
  },
  ready() {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        if (dataJson.compareVersion("2.0.4", res.SDKVersion) == 1) dataJson.myShowModal("你微信版本较低，可能无法正常使用签名功能，请升级到最新版微信！")
        _this.windowWidth = res.windowWidth,
          _this.windowHeight = res.windowHeight,
          _this.canvasw = _this.windowWidth,
          _this.canvash = _this.canvasw * (1040 / 750),
          _this.ctx = wx.createCanvasContext("signCanvas", _this),
          _this.ctx.beginPath(),
          _this.boxHeight = res.model.indexOf('iPhone X') >= 0 ? 268 : 200
      },
    })
    var a = dataJson.getOptions();
    this.signPosition = a.signPosition;
    var e = a.images;
    if (this.signatureImage = a.signatureImage, this.angle = a.angle, !e) return this.bHasImg = !1, void this.setData({
      bShowViewImagesPage: !1,
      bShowBack: !1
    });
    this.imagesKeys = [], this.imagesValues = [];
    for (var n in e) this.imagesKeys.push(n), this.imagesValues.push(e[n]);
    e && this.setData({
      images: this.imagesValues.concat()
    })
  },
  methods: {
    // 左右滑动
    swiperChange(e) {
      var current = e.detail.current;
      this.setData({
        currentIndex: current
      })
    },
    // 图片预览
    previewImage(e) {
      var src = e.currentTarget.dataset.src;
      wx.previewImage({
        urls: [src]
      })
    },
    // 签名按钮
    signature: function() {
      var _this = this;
      _this.currentImage = _this.imagesValues[_this.data.currentIndex];
      wx.showToast({
        title: '加载中',
        mask: true,
        icon: "loading",
        duration: 5000
      })
      const fileLoad = wx.downloadFile({
        url: _this.currentImage,
        success: res => {
          wx.getImageInfo({
            src: res.tempFilePath,
            success: res => {
              wx.hideToast();
              _this.currentImagePath = res.path;
              var iWidth = res.width,
                iHeight = res.height,
                winW = _this.windowWidth,
                winH = _this.windowHeight - 70;
              iWidth <= iHeight ? (winW = winH * (iWidth / iHeight)) > _this.windowWidth && (winH = (winW = _this.windowWidth) * (iHeight / iWidth)) : winH = winW * (iHeight / iWidth);
              _this.startX = (_this.windowWidth - winW) / 2;
              _this.startY = (_this.windowHeight - 70 - winH) / 2
              console.log(_this.startX)
              console.log(_this.startY)
            }
          })
        },
        fail: err => {
          fileLoad.abort()
        }
      })
      // fileLoad.onProgressUpdate((res) => {
      //   console.log(res)
      //   wx.showToast({
      //     title: `正在下载${res.progress}%`,
      //     icon: 'loading',
      //     duration: 60000
      //   });
      // })
    },
  }
})