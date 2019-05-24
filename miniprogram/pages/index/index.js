var plugin = requirePlugin("myPlugin");
var that;
var images = {}
Page({
  onLoad: function(options) {
    that = this
    that.setData({
      targetIndex: (options.targetIndex) ? options.targetIndex : "0",
      imgList: (options.imgList) ? options.imgList.split(',') : [], //申请书，调解文书
    })
    images = Object.assign({}, that.data.imgList)
  },
  onShow() {
    plugin.setOptions({
      images: images, //传入需要签名的图片
      signatureImage: ""
    });
  }
})