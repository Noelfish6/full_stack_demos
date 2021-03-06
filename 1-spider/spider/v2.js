var request = require('request');
var fs = require('fs');



var keyword = '上海万众医院';

//获取url的函数
function getURL(adcode, keyword) {
  return encodeURI('http://ditu.amap.com/service/poiInfo?query_type=TQUERY&pagesize=100&pagenum=1&cluster_state=4&city=' + adcode + '&keywords=' + keyword);
}

var url = getURL(310100, keyword);

var data, list, d, result;
request.get(url, function(e, res, body) {
  if (!e && res.statusCode == 200) {
    body = JSON.parse(body);
    data = body.data;
    list = data[0].list;
    d = list[0];
    result = {
      city: d.cityname,
      name: d.name,
      lat: d.location.lat,
      lng: d.location.lng,
      tel: d.tel
    };
    fs.writeFileSync('./data/output.json', JSON.stringify(result), 'utf8');
  }
});
