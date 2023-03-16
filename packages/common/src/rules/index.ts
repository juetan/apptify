// 来源：any-rule

/**
 * 火车车次
 * @description 正则表达式
 * @default ^[GCDZTSPKXLY1-9]\d{1,4}$
 * @example G1868
 */
export const RuleTrainNumber = /^[GCDZTSPKXLY1-9]\d{1,4}$/;

/**
 * 手机机身码(IMEI)
 * @description 正则表达式
 * @default ^\d{15,17}$
 * @example 123456789012345
 */
export const RuleIMEI = /^\d{15,17}$/;

/**
 * 必须带端口号的网址(或ip)
 * @description 正则表达式
 * @default ^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$
 * @example https://www.qq.com:8080
 */
export const RuleUrlWithPort = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/;

/**
 * 网址(URL)
 * @description 正则表达式
 * @default ^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?
 * @example www.qq.com
 */
export const RuleUrl = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;

/**
 * 统一社会信用代码
 * @description 正则表达式
 * @default ^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$
 * @example 91230184MA1BUFLT44
 */
export const RuleUscc = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;

/**
 * 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
 * @description 正则表达式
 * @default ^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$
 * @example 91110108772551611J
 */
export const RuleUsccLoose = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;

/**
 * 迅雷链接
 * @description 正则表达式
 * @default ^thunderx?:\/\/[a-zA-Z\d]+=$
 * @example thunder://QUEsICdtYWduZXQ6P3h0PXVybjpidGloOjBCQTE0RTUxRkUwNjU1RjE0Qzc4NjE4RjY4NDY0QjZFNTEyNjcyOUMnWlo=
 */
export const RuleTorrent = /^thunderx?:\/\/[a-zA-Z\d]+=$/;

/**
 * ed2k链接(宽松匹配)
 * @description 正则表达式
 * @default ^ed2k:\/\/\|file\|.+\|\/$
 * @example ed2k://|file|%E5%AF%84%E7%94%9F%E8%99%AB.PARASITE.2019.HD-1080p.X264.AAC-UUMp4(ED2000.COM).mp4|2501554832|C0B93E0879C6071CBED732C20CE577A3|h=5HTKZPQFYRKORN52I3M7GQ4QQCIHFIBV|/
 */
export const RuleEd2k = /^ed2k:\/\/\|file\|.+\|\/$/;

/**
 * 磁力链接(宽松匹配)
 * @description 正则表达式
 * @default ^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$
 * @example magnet:?xt=urn:btih:40A89A6F4FB1498A98087109D012A9A851FBE0FC
 */
export const RuleTorrentLoose = /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/;

/**
 * 子网掩码(不包含 0.0.0.0)
 * @description 正则表达式
 * @default ^(254|252|248|240|224|192|128)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$
 * @example 255.255.255.0
 */
export const RuleSubnetMask =
  /^(254|252|248|240|224|192|128)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/;

/**
 * linux"隐藏文件"路径
 * @description 正则表达式
 * @default ^\/(?:[^/]+\/)*\.[^/]*
 * @example /usr/ad/.dd
 */
export const RuleLinuxHiddenPath = /^\/(?:[^/]+\/)*\.[^/]*/;

/**
 * linux文件夹路径
 * @description 正则表达式
 * @default ^\/(?:[^/]+\/)*$
 * @example /usr/ad/dd/
 */
export const RuleLinuxFolderPath = /^\/(?:[^/]+\/)*$/;

/**
 * linux文件路径
 * @description 正则表达式
 * @default ^\/(?:[^/]+\/)*[^/]+$
 * @example /root/b.ts
 */
export const RuleLinuxFilePath = /^\/(?:[^/]+\/)*[^/]+$/;

/**
 * window"文件夹"路径
 * @description 正则表达式
 * @default ^[a-zA-Z]:\\(?:\w+\\?)*$
 * @example C:\Users\Administrator\Desktop
 */
export const RuleWindowsFolderPath = /^[a-zA-Z]:\\(?:\w+\\?)*$/;

/**
 * window下"文件"路径
 * @description 正则表达式
 * @default ^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$
 * @example C:\Users\Administrator\Desktop\qq.link
 */
export const RuleWindowsFilePath = /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/;

/**
 * 股票代码(A股)
 * @description 正则表达式
 * @default ^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$
 * @example sz000858
 */
export const RuleStockCodeA = /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/;

/**
 * 大于等于0, 小于等于150, 支持小数位出现5, 如145.5, 用于判断考卷分数
 * @description 正则表达式
 * @default ^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:\.5)?$
 * @example 150
 */
export const RuleTestScore = /^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:\.5)?$/;

/**
 * html注释
 * @description 正则表达式
 * @default <!--[\s\S]*?-->
 * @example <!--<div class="_bubble"></div>--><div>chenguzhen87</div><div class="_bubble"></div>-->
 */
export const RuleHtmlComment = /<!--[\s\S]*?-->/g;

/**
 * md5格式(32位)
 * @description 正则表达式
 * @default ^[a-fA-F0-9]{32}$
 * @example 21fe181c5bfc16306a6828c1f7b762e8
 */
export const RuleMd5 = /^[a-fA-F0-9]{32}$/;

/**
 * GUID/UUID
 * @description 正则表达式
 * @default ^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$
 * @example e155518c-ca1b-443c-9be9-fe90fdab7345
 */
export const RuleGUID = /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i;

/**
 * 版本号(version)格式必须为X.Y.Z
 * @description 正则表达式
 * @default ^\d+(?:\.\d+){2}$
 * @example 16.3.10
 */
export const RuleVersion = /^\d+(?:\.\d+){2}$/;

/**
 * 视频(video)链接地址（视频格式可按需增删）
 * @description 正则表达式
 * @default ^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$
 * @example http://www.abc.com/video/wc.avi
 */
export const RuleVideoUrl = /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i;

/**
 * 图片(image)链接地址（图片格式可按需增删）
 * @description 正则表达式
 * @default ^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$
 * @example https://www.abc.com/logo.png
 */
export const RuleImageUrl = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i;

/**
 * 24小时制时间（HH:mm:ss）
 * @description 正则表达式
 * @default ^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$
 * @example 23:34:55
 */
export const RuleTime24 = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

/**
 * 12小时制时间（hh:mm:ss）
 * @description 正则表达式
 * @default ^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$
 * @example 11:34:55
 */
export const RuleTime12 = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/;

/**
 * base64格式
 * @description 正则表达式
 * @default ^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$
 * @example data:image/gif;base64,xxxx==
 */
export const RuleBase64 =
  /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;

/**
 * 数字/货币金额（支持负数、千分位分隔符）
 * @description 正则表达式
 * @default ^-?\d{1,3}(,\d{3})*(\.\d{1,2})?$
 * @example 100
 */
export const RuleCurrency = /^-?\d{1,3}(,\d{3})*(\.\d{1,2})?$/;

/**
 * 银行卡号（10到30位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）
 * @description 正则表达式
 * @default ^[1-9]\d{9,29}$
 * @example 6234567890
 */
export const RuleBankCardNumber = /^[1-9]\d{9,29}$/;

/**
 * 中文姓名
 * @description 正则表达式
 * @default ^(?:[\u4e00-\u9fa5·]{2,16})$
 * @example 葛二蛋
 */
export const RuleChineseName = /^(?:[\u4e00-\u9fa5·]{2,16})$/;

/**
 * 英文姓名
 * @description 正则表达式
 * @default (^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)
 * @example James
 */
export const RuleEnglishName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;

/**
 * 车牌号(新能源)
 * @description 正则表达式
 * @default ^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$
 * @example 京AD92035
 */
export const RuleCarNumberNewEnergy =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/;

/**
 * 车牌号(非新能源)
 * @description 正则表达式
 * @default ^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$
 * @example 京A00599
 */
export const RuleCarNumberNormal =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/;

/**
 * 车牌号(新能源+非新能源)
 * @description 正则表达式
 * @default ^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$
 * @example 京A12345D
 */
export const RuleCarNumber =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;

/**
 * 手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段
 * @description 正则表达式
 * @default ^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$
 * @example 008618311006933
 */
export const RulePhoneNumberStrict =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;

/**
 * 手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可
 * @description 正则表达式
 * @default ^(?:(?:\+|00)86)?1[3-9]\d{9}$
 * @example 008618311006933
 */
export const RulePhoneNumber = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

/**
 * 手机号(mobile phone)中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条
 * @description 正则表达式
 * @default ^(?:(?:\+|00)86)?1\d{10}$
 * @example 008618311006933
 */
export const RulePhoneNumberLoose = /^(?:(?:\+|00)86)?1\d{10}$/;

/**
 * 日期(宽松)
 * @description 正则表达式
 * @default ^\d{1,4}(-)(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31)$
 * @example 1990-12-12
 */
export const RuleDate = /^\d{1,4}(-)(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31)$/;

/**
 * 日期(严谨, 支持闰年判断)
 * @description 正则表达式
 * @default ^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$
 * @example 1990-12-12
 */
export const RuleDateStrict =
  /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/;

/**
 * 中国省
 * @description 正则表达式
 * @default ^浙江|上海|北京|天津|重庆|黑龙江|吉林|辽宁|内蒙古|河北|新疆|甘肃|青海|陕西|宁夏|河南|山东|山西|安徽|湖北|湖南|江苏|四川|贵州|云南|广西|西藏|江西|广东|福建|台湾|海南|香港|澳门$
 * @example 浙江
 */
export const RuleProvince =
  /^浙江|上海|北京|天津|重庆|黑龙江|吉林|辽宁|内蒙古|河北|新疆|甘肃|青海|陕西|宁夏|河南|山东|山西|安徽|湖北|湖南|江苏|四川|贵州|云南|广西|西藏|江西|广东|福建|台湾|海南|香港|澳门$/;

/**
 * 可以被moment转化成功的时间 YYYYMMDD HH:mm:ss
 * @description 正则表达式
 * @default ^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$
 * @example 2020/01/01 23:59:59
 */
export const RuleDateTime =
  /^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

/**
 * email(邮箱)
 * @description 正则表达式
 * @default ^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
 * @example 90203918@qq.com
 */
export const RuleEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * 座机(tel phone)电话(国内),如: 0341-86091234
 * @description 正则表达式
 * @default ^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$
 * @example 0936-4211235
 */
export const RulePhoneNumberLandline = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;

/**
 * 身份证号(1代,15位数字)
 * @description 正则表达式
 * @default ^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$
 * @example 123456991010193
 */
export const RuleIDNumber1 = /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/;

/**
 * 身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 * @description 正则表达式
 * @default ^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$
 * @example 12345619991205131x
 */
export const RuleIDNumber2 = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;

/**
 * 身份证号, 支持1/2代(15位/18位数字)
 * @description 正则表达式
 * @default ^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$
 * @example 622223199912051311
 */
export const RuleIDNumber =
  /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;

/**
 * 护照（包含香港、澳门）
 * @description 正则表达式
 * @default (^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)
 * @example s28233515
 */
export const RulePassport =
  /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;

/**
 * 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
 * @description 正则表达式
 * @default ^[a-zA-Z]\w{4,15}$
 * @example justin
 */
export const RuleAccount = /^[a-zA-Z]\w{4,15}$/;

/**
 * 中文/汉字
 * @description 正则表达式
 * @default ^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$
 * @example 正则
 */
export const RuleChineseCharacter =
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;

/**
 * 小数(支持科学计数)
 * @description 正则表达式
 * @default ^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$
 * @example 0.0
 */
export const RuleDecimal = /^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$/;

/**
 * 只包含数字
 * @description 正则表达式
 * @default ^\d+$
 * @example 12345678
 */
export const RuleNumber = /^\d+$/;

/**
 * html标签(宽松匹配)
 * @description 正则表达式
 * @default <(\w+)[^>]*>(.*?<\/\1>)?
 * @example <div id="app"> 2333 </div>
 */
export const RuleHtmlElement = /<(\w+)[^>]*>(.*?<\/\1>)?/;

/**
 * 匹配中文汉字和中文标点
 * @description 正则表达式
 * @default [\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]
 * @example 匹配中文汉字以及中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
 */
export const RuleChineseCharacterWithMark =
  /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;

/**
 * qq号格式正确
 * @description 正则表达式
 * @default ^[1-9][0-9]{4,10}$
 * @example 903013545
 */
export const RuleQQNumber = /^[1-9][0-9]{4,10}$/;

/**
 * 数字和字母组成
 * @description 正则表达式
 * @default ^[A-Za-z0-9]+$
 * @example james666
 */
export const RuleWord = /^[A-Za-z0-9]+$/;

/**
 * 英文字母
 * @description 正则表达式
 * @default ^[a-zA-Z]+$
 * @example Russel
 */
export const RuleAlphabet = /^[a-zA-Z]+$/;

/**
 * 小写英文字母组成
 * @description 正则表达式
 * @default ^[a-z]+$
 * @example russel
 */
export const RuleLowcase = /^[a-z]+$/;

/**
 * 大写英文字母
 * @description 正则表达式
 * @default ^[A-Z]+$
 * @example ABC
 */
export const RuleUpcase = /^[A-Z]+$/;

/**
 * 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 * @description 正则表达式
 * @default ^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$
 * @example Kd@curry666
 */
export const RulePassword = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

/**
 * 用户名校验，4到16位（字母，数字，下划线，减号）
 * @description 正则表达式
 * @default ^[\w-]{4,16}$
 * @example xiaohua_qq
 */
export const RuleUsername = /^[\w-]{4,16}$/;

/**
 * ip-v4[:端口]
 * @description 正则表达式
 * @default ^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$
 * @example 172.16.0.0
 */
export const RulePortIpv4 =
  /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/;

/**
 * ip-v6[:端口]
 * @description 正则表达式
 * @default (^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$)|(^\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$)
 * @example 2031:0000:130f:0000:0000:09c0:876a:130b
 */
export const RulePortIpv6 =
  /(^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$)|(^\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$)/i;

/**
 * 16进制颜色
 * @description 正则表达式
 * @default ^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8}|[a-fA-F0-9]{4})$
 * @example #f00
 */
export const RuleColorHex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{8}|[a-fA-F0-9]{4})$/;

/**
 * 微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线
 * @description 正则表达式
 * @default ^[a-zA-Z][-_a-zA-Z0-9]{5,19}$
 * @example github666
 */
export const RuleWechatAccount = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;

/**
 * 邮政编码(中国)
 * @description 正则表达式
 * @default ^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$
 * @example 734500
 */
export const RulePostCode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;

/**
 * 中文和数字
 * @description 正则表达式
 * @default ^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$
 * @example 哈哈哈
 */
export const RuleChineseAndNumber =
  /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/;

/**
 * 不能包含字母
 * @description 正则表达式
 * @default ^[^A-Za-z]*$
 * @example 你好6啊
 */
export const RuleNotAlphabet = /^[^A-Za-z]*$/;

/**
 * java包名
 * @description 正则表达式
 * @default ^([a-zA-Z_]\w*)+([.][a-zA-Z_]\w*)+$
 * @example com.bbb.name
 */
export const RuleJavaPackageName = /^([a-zA-Z_]\w*)+([.][a-zA-Z_]\w*)+$/;

/**
 * mac地址
 * @description 正则表达式
 * @default ^(([a-f0-9][0,2,4,6,8,a,c,e]:([a-f0-9]{2}:){4})|([a-f0-9][0,2,4,6,8,a,c,e]-([a-f0-9]{2}-){4}))[a-f0-9]{2}$
 * @example 38:f9:d3:4b:f5:51
 */
export const RuleMacAdress =
  /^(([a-f0-9][0,2,4,6,8,a,c,e]:([a-f0-9]{2}:){4})|([a-f0-9][0,2,4,6,8,a,c,e]-([a-f0-9]{2}-){4}))[a-f0-9]{2}$/i;

/**
 * 匹配连续重复的字符
 * @description 正则表达式
 * @default (.)\1+
 * @example 我我我
 */
export const RuleRepeatCharacter = /(.)\1+/;

/**
 * 数字和英文字母组成，并且同时含有数字和英文字母
 * @description 正则表达式
 * @default ^(?=.*[a-zA-Z])(?=.*\d).+$
 * @example 我a我1我
 */
export const RuleAlphabetAndNumber = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

/**
 * 香港身份证
 * @description 正则表达式
 * @default ^[a-zA-Z]\d{6}\([\dA]\)$
 * @example K034169(1)
 */
export const RuleIDCardHongKong = /^[a-zA-Z]\d{6}\([\dA]\)$/;

/**
 * 澳门身份证
 * @description 正则表达式
 * @default ^[1|5|7]\d{6}\(\d\)$
 * @example 5686611(1)
 */
export const RuleIDCardMacau = /^[1|5|7]\d{6}\(\d\)$/;

/**
 * 台湾身份证
 * @description 正则表达式
 * @default ^[a-zA-Z][0-9]{9}$
 * @example U193683453
 */
export const RuleIDCardTaiwan = /^[a-zA-Z][0-9]{9}$/;

/**
 * 大写字母，小写字母，数字，特殊符号 `@#$%^&*`~()-+=` 中任意3项密码
 * @description 正则表达式
 * @default ^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]
 * @example a1@
 */
export const RulePasswordStrong =
  /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;

/**
 * ASCII码表中的全部的特殊字符
 * @description 正则表达式
 * @default [\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]+
 * @example [
 */
export const RuleASCIISpecialCharacter = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]+/;

/**
 * 正整数，不包含0
 * @description 正则表达式
 * @default ^\+?[1-9]\d*$
 * @example 1231
 */
export const RuleIntegerPositive = /^\+?[1-9]\d*$/;

/**
 * 负整数，不包含0
 * @description 正则表达式
 * @default ^-[1-9]\d*$
 * @example -1231
 */
export const RuleIntegerNegitive = /^-[1-9]\d*$/;

/**
 * 整数
 * @description 正则表达式
 * @default ^(?:0|(?:-?[1-9]\d*))$
 * @example -1231
 */
export const RuleInteger = /^(?:0|(?:-?[1-9]\d*))$/;

/**
 * 浮点数
 * @description 正则表达式
 * @default ^(-?[1-9]\d*\.\d+|-?0\.\d*[1-9]\d*|0\.0+)$
 * @example 1.23
 */
export const RuleFloatingNumber = /^(-?[1-9]\d*\.\d+|-?0\.\d*[1-9]\d*|0\.0+)$/;

/**
 * 浮点数(严格)
 * @description 正则表达式
 * @default ^(-?[1-9]\d*\.\d+|-?0\.\d*[1-9])$
 * @example 1.23
 */
export const RuleFloatingNumberStrict = /^(-?[1-9]\d*\.\d+|-?0\.\d*[1-9])$/;

/**
 * email(支持中文邮箱)
 * @description 正则表达式
 * @default ^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
 * @example 90203918@qq.com
 */
export const RuleEmailWithChinese = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

/**
 * 域名(非网址, 不包含协议)
 * @description 正则表达式
 * @default ^([0-9a-zA-Z-]{1,}\.)+([a-zA-Z]{2,})$
 * @example www.baidu.com
 */
export const RuleDomain = /^([0-9a-zA-Z-]{1,}\.)+([a-zA-Z]{2,})$/;

/**
 * 军官/士兵证
 * @description 正则表达式
 * @default ^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$
 * @example 军字第2001988号
 */
export const RuleCertificateOfficer = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;

/**
 * 户口薄
 * @description 正则表达式
 * @default (^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)
 * @example 441421999707223115
 */
export const RuleHouseholdRegister = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
