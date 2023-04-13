## 介绍
- 内置JQeury和类型提示
- 内置LayUI和类型提示，并修正LayUI在cdn加载中没有正确加载css的问题。

## 问题
以下网站可能会导致加载失败
- 设置了HTTPS的网站
- 设置了安全策略的网站

可在浏览器启动时指定
- --disable-web-security
- --user-data-dir="D:/chroe"
