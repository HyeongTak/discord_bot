const { Client, RichEmbed } = require('discord.js');
const client = new Client();
var cheerio = require('cheerio');
var request = require('request');

function rice(message){
  request('http://www.gsm.hs.kr/xboard/board.php?tbnum=8', function(error, response, html){
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
        
        var gub = new Array(3);
        for(var i=0; i<3; i++){
          gub[i] = new Array();
        }
        gub[0].push('아침');
        gub[1].push('점심');
        gub[2].push('저녁');
        for(var i=0; i<3; i++){
          var data = riceArr[i].split(/\s+/);
          for(var j=0; j<data.length; j++){
            if(data[j] !== '') gub[i].push('-' + data[j]);
          }
        }

        const embed = new RichEmbed()
      // Set the title of the field
        .setTitle('오늘의 급식')
        // Set the color of the embed
        .setColor(0xFF0000)
        // Set the main content of the embed
        .setDescription(gub[0].concat(gub[1]).concat(gub[2]));
      // Send the embed to the same channel as the message
        message.channel.send(embed);

    });
  });
}

client.on("ready", () => {
  console.log("준비 완료!");
  message => {message.channel.send("화랑봇 준비완료!!");}
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