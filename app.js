const Discord = require("discord.js");
const client = new Discord.Client();
var cheerio = require('cheerio');
var request = require('request');

var url = 'http://www.gsm.hs.kr/xboard/board.php?tbnum=8';

function rice(message){
  request(url, function(error, response, html){
    var $ = cheerio.load(html);
    S = ".today";
    $(S).each(function(){
        var rice = $(this).text();
        var n = rice.length;
        for(var i=0;i<n;i++){
            rice = rice.replace('.', '');
            //rice = rice.replace(' ', '');
            rice = rice.replace('\t', '');
            for(var j=0;j<10;j++){
                rice = rice.replace(j,'');
            }
        }
        
        var rice = rice.replace('\n(월)\n\n\n\n','');
        var rice = rice.replace('\n(화)\n\n\n\n','');
        var rice = rice.replace('\n(수)\n\n\n\n','');
        var rice = rice.replace('\n(목)\n\n\n\n','');
        var rice = rice.replace('\n(금)\n\n\n\n','');
        var riceArr = rice.split('\n\n\n\n\n');
        console.log("PAGE LOADED");

        
        for(var i=0;i<3;i++){
            var n = riceArr[i].length;
            for(var j=0;j<n;j++){
                riceArr[i] = riceArr[i].replace('\n','');
                riceArr[i] = riceArr[i].replace('에너지단백질칼슘철분','');
                riceArr[i] = riceArr[i].replace('/','');
                riceArr[i] = riceArr[i].replace('*','');
            }
        }
        
        message.channel.send("오늘의 급식입니다.");
        message.channel.send("아침");
        message.channel.send("``"+riceArr[0]+'``');
        message.channel.send("점심");
        message.channel.send("``"+riceArr[1]+'``');
        message.channel.send("저녁");
        message.channel.send("``"+riceArr[2]+'``');
    });
  });
}


client.on("ready", () => {
  console.log("준비 완료!");
});
 
client.on("message", message => {
  if (message.content == "안녕") {
    message.channel.send("안녕하세요. 저는 GSM에서 질량이 가장 큰 최화랑입니다.");
  }
  if (message.content == "몸무게") {
    message.channel.send("제 몸무게는 130kg 입니다.");
  }
  if (message.content == "급식") {
    rice(message);
  }
});
 
client.login("NTE5MzgxMDYzMDAxMTc4MTI1.Duenvg.437cgDlvCWh_ilmoxPF4g85ijwM"); 