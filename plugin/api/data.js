"use strict";
var defaultObj = {};
var obj = {
  signPosition: null,
  images: null,
  signatureImage: null,
  angle: 0
}
//插件变量赋值
function setOptions(n) {
  obj.images = n.images
}
//插件初始变量
function getOptions() {
  return obj
}

function initData() {
  defaultObj = {}, obj = {
    signPosition: null,
    images: null,
    signatureImage: null,
    angle: 0
  }
}

function myShowModal(e, n, o, c) {
  var i = !1,
    r = "确定",
    s = "提示";
  o && (i = !0), c && "object" === (void 0 === c ? "undefined" : t(c)) && (r = c.confirmText ? c.confirmText : r, s = c.title ? c.title : s), wx.showModal({
    title: s,
    content: e,
    showCancel: i,
    confirmText: r,
    confirmColor:"#108ee9",
    success: function(t) {
      t.confirm ? n && "function" == typeof n && n() : t.cancel && o && "function" == typeof o && o()
    }
  })
}
function compareVersion(t, e) {
  t = t.split("."), e = e.split(".");
  for (var n = Math.max(t.length, e.length); t.length < n;) t.push("0");
  for (; e.length < n;) e.push("0");
  for (var o = 0; o < n; o++) {
    var c = parseInt(t[o]),
      i = parseInt(e[o]);
    if (c > i) return 1;
    if (c < i) return -1
  }
  return 0
}
module.exports = {
  setOptions: setOptions,
  getOptions: getOptions,
  initData: initData,
  compareVersion: compareVersion,
  myShowModal: myShowModal
}