const { Client, RichEmbed } = require('discord.js');
const client = new Client();
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var token = require('./token');

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
                riceArr[i] = riceArr[i].split('*')[0];
                riceArr[i] = riceArr[i].replace('\n','');
                riceArr[i] = riceArr[i].replace('에너지단백질칼슘철분','');
                riceArr[i] = riceArr[i].replace('/','');
            }
        }
        
        var gub = new Array(3);
        for(var i=0; i<3; i++){
          gub[i] = new Array();
        }
        for(var i=0; i<3; i++){
          var data = riceArr[i].split(/\s+/);
          for(var j=0; j<data.length; j++){
            if(data[j] !== '') gub[i].push(' - ' + data[j]);
          }
        }

        const embed = new RichEmbed()
        .setTitle('오늘의 급식')
        .setColor(3447003)
        .setDescription("안녕하세요? 저는 GSM의 영양사 최화랑입니다. 오늘의 급식을 알려드리겠습니다.")
        .setThumbnail("https://i.imgur.com/2lR7eTd.jpg")
        .addField("아침", gub[0])
        .addField("점심", gub[1])
        .addField("저녁", gub[2]);
        message.channel.send(embed);
    });
  });
}

client.on("ready", () => {
  console.log("준비 완료!");
  client.user.setActivity("league of legends");
});
 
client.on("message", message => {
  var msg = message.content.split(/\s+/);
  var command = msg[0];
  if (command === "안녕") {
    message.channel.send("안녕하세요. 저는 GSM에서 **질량**이 가장 **큰** 최화랑입니다.");
  }
  if (command === "몸무게") {
    message.channel.send("제 몸무게는 __**132kg**__ 입니다.");
  }
  if (command === "급식") {
    rice(message);
  }
  if (command === "코드업"){
    fs.readFile('./code/'+msg[1]+'.txt', 'utf8', function(err, data){
      if(err) message.channel.send("그건없어요...");
      else{
        message.channel.send(msg[1]+"번 코드업 문제 정답입니다.");
        message.channel.send("```"+data+"```");
      }
    });
  }
  if (command === "help" || command === "소환"){
    const embed = new RichEmbed()
        .setTitle('GSM학생 부회장인 제가 사용법을 알려드리겠습니다.')
        .setColor(3447003)
        .setDescription("안녕하세요? 광주 소프트웨어 마이스터고등학교의 학생이기도 합니다. 오늘은 제 얘기만 해야 하는데요, 차마 제 얘기만 할 수 없어서 도움말을 알려 드리겠습니다.")
        .setThumbnail("https://i.imgur.com/pElxVsb.jpg")
        .addField("급식", " 제가 오늘의 영양사가 되어서 오늘의 급식을 알려 드리겠습니다.")
        .addField("코드업 (번호)", "코드업 띄우고 번호를 입력하시면 코드업 정답을 나재희 선생님 몰래 알려드립니다. 다 있지는 않습니다.")
        message.channel.send(embed);
  }
});
 
client.on("guildMemberAdd", (member) => {
  newUsers.set(member.id, member.user);
});

client.login(token.token); 