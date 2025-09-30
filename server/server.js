/*********************************************************************
* 룰렛 게임 서버 프로그램
S->C 데이터 전송 /?getdata
C->S 베팅
내부함수 결과만들기

게임시간 구성
대기시간 20초
롤링시간 10초

Required modules
*forever
*socket.io
*mysql
*fs
*url
*php-unserialize

베팅정보
0: 꽝
1: 당첨금 수령완료
8: 비정상 환급완료
9: 당첨결과 미발표
**********************************************************************/
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

console.log("Starting server");
console.log("Loading Modules...");


//////////////////////////////////////////////////////////////////////
// config
//////////////////////////////////////////////////////////////////////
var userlist=["테스터","별빛","달빛","이순신","김구","세종대왕"];
var betmodelist=["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","even","odd","red","black","1st12","2nd12","3rd12","1to18","19to36","even","odd","red","black","1st12","2nd12","3rd12","1to18","19to36","even","odd","red","black","1st12","2nd12","3rd12","1to18","19to36","even","odd","red","black","1st12","2nd12","3rd12","1to18","19to36"];
var pointmodelist=["50000","100000","200000","350000","400000","500000","800000"];
var randommin=16;
var randommax=25;
var randomtxt="";

var adminid="403";
var per1=1.95;
var per2=2.8;
var per3=33.5;
var betlimit=1000000;
var dbname="neo_demo";
var mysql=require("mysql");
var sessloc="../../../files/sessions/";
var conn = mysql.createConnection({
	host: '127.0.0.1',
	user : 'neo',
	password : 'ejqmfk88!',
	insecureAuth: true
});
//////////////////////////////////////////////////////////////////////
// end config
//////////////////////////////////////////////////////////////////////

conn.connect();
conn.query("USE "+dbname);
var server=require('http').createServer(svr).listen(8001);
var io = require('socket.io')({path:'/socket.io'}).listen(server);
var url = require('url');
var game_interval = 120000; //millisecond
var rest_interval = 10000;
var rounds=1;
var finishRound=new Date().getTime()+game_interval;
var soc=false;
var a=1;
var lat="1";
var bets="1";
var phps=require("php-unserialize");
var users=[];
var sockets=[];
var datenow=getdate();
var daycount=1;

console.log("Done...");
conn.query("select * from roullet where result IS NOT NULL order by game_no desc limit 0,1",function(err, results, fields){
	if(err){throw err;}
	if(results.length>0){
		rounds=results[0].game_no+1;
		if(results[0].date == datenow){
			daycount=results[0].count+1;
		}
	} else {
		rounds=1;
	}
console.log("Starting Round "+rounds+"("+datenow+" #"+daycount+")");
console.log("Finding Error Betting Log...");
conn.query("select * from roullet_bet where status=9",function(e,results,f){
	if(results.length>0){
		console.log("Find "+results.length+" Error(s).");
		for(dd in results){
			conn.query("select * from roullet where game_no='"+results[dd].game_id+"'",function(e2,r2,f2){
				if(r2.length>0){
					var result=r2[0].result;
					var x=results[dd].bet;
					var resultPoint=0;
					switch(true){
						case (x>=0 && x<=35):
							//숫자로 베팅시 당첨 산출
							if(x==result){
								resultPoint=results[dd].point*35;
							}
							break;
						case (x=="black"):
							var numblack = [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26];
							if(numblack.indexOf(result)>=0){
								resultPoint=results[dd].point*2;
							}
							break;
						case (x=="red"):
							var numred = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
							if(numred.indexOf(result)>=0){
								resultPoint=results[dd].point*2;
							}
							break;
						case (x=="1st12"):
							if(result>=1 && result<=12){
								resultPoint=results[dd].point*3;
							}
							break;
						case (x=="2nd12"):
							if(result>=13 && result<=24){
								resultPoint=results[dd].point*3;
							}
							break;
						case (x=="3rd12"):
							if(result>=25 && result<=36){
								resultPoint=results[dd].point*3;
							}
							break;
						case (x=="odd"):
							if(result!=0 && result%2==1){
								resultPoint=results[dd].point*2;
							}
							break;
						case (x=="even"):
							if(result!=0 && result%2==0){
								resultPoint=results[dd].point*2;
							}
							break;
						case (x=="1to18"):
							if(result>=1 && result<=18){
								resultPoint=results[dd].point*2;
							}
							break;
						case (x=="19to36"):
							if(result>=19 && result<=36){
								resultPoint=results[dd].point*2;
							}
					}
					console.log(resultPoint);
					if(resultPoint>0){
						resultPoint=resultPoint*fee;
						var timenow=new Date().format('yyyyMMyyhhmmss');
						/* DB구조에 맞춰 변경 필요 */
						conn.query("update sc_money set money=money+'"+resultPoint+"' where member_srl='"+results[dd].member_id+"'");
						conn.query("insert into sc_moneyhistory set member_srl='"+results[dd].member_id+"', module_srl='0', htype='A', money='"+resultPoint+"', content='R"+results[dd].game_id+"회차 룰렛 게임 베팅 포인트 지급', act='procMoneyAdminUpdateMoney', ipaddress='127.0.0.1', regdate='"+timenow+"'");
						/* DB구조에 맞춰 변경 필요 */

						conn.query("update roullet_bet set status=1 where member_id='"+results[dd].member_id+"' AND game_id='"+results[dd].game_id+"' AND bet='"+results[dd].bet+"'");
						console.log("Add Winner Point for :"+results[dd].member_id+" Point:+"+resultPoint);
					} else {
						conn.query("update roullet_bet set status=0 where member_id='"+results[dd].member_id+"' AND game_id='"+results[dd].game_id+"' AND bet='"+results[dd].bet+"'");
					}
				} else {
					var timenow=new Date().format('yyyyMMyyhhmmss');
					/* DB구조에 맞춰 변경 필요 */
					conn.query("update sc_money set money=money+'"+results[dd].point+"' where member_srl='"+results[dd].member_id+"'");
					conn.query("insert into sc_moneyhistory set member_srl='"+results[dd].member_id+"', module_srl='0', htype='A', money='"+results[dd].point+"', content='R"+results[dd].game_id+"회차 룰렛 게임 베팅 포인트 시스템오류 환급', act='procMoneyAdminUpdateMoney', ipaddress='127.0.0.1', regdate='"+timenow+"'");
					/* DB구조에 맞춰 변경 필요 */

					conn.query("update roullet_bet set status=8 where member_id='"+results[dd].member_id+"' AND game_id='"+results[dd].game_id+"' AND bet='"+results[dd].bet+"'");
					console.log("Return Point for :"+results[dd].member_id+" Point:+"+results[dd].point);
				}
			});
		}
	} else {
		console.log("Done. No Errors");
	}
});
getlatest();
io.sockets.on('connection', function(socket) {
	soc=socket;
	socket.on('login',function(msg){
		if(typeof msg.token !== "undefined"){
			var session=require('fs').readFile(sessloc+"sess_"+msg.token,'utf-8',function(err,data){
				if(err){ console.log(err); return false;}
				var result=phps.unserializeSession(data);
				if(typeof result.member_srl !== "undefined"){
					if(typeof users[msg.uid] != "undefined"){
						delete users[msg.uid];
						sockets[msg.uid].disconnect();
					}
					users[msg.uid]=result.member_srl;
					sockets[msg.uid]=socket;
					user_id=result.member_srl;
					/* DB구조에 맞춰 변경 필요 */
					var member=conn.query("select * from sc_money where member_srl='"+user_id+"' limit 0,1",function(err,results,fields){
					/* DB구조에 맞춰 변경 필요 */
						if(err){ console.log(err);}
						conn.query("select * from roullet_bet where member_id='"+user_id+"' order by game_id desc limit 0,50",function(e,r,f){
							if(e){ console.log(e);}
							rm=[];
							for(k in r){
								rm.push({"round":r[k].game_id,"stake":r[k].point,"bet":r[k].bet,"status":r[k].status,"date":r[k].date,"count":r[k].count});
							}
							var rtn={
								"balance":results[0].money,
								"currentBets":rm
							}
							socket.emit("userInfo",rtn);
						});
					});
				}
			});
		}
		ret={
			finishRound:finishRound,
			lastRounds:lat,
			round:3,
			stats:"",
			status:1,
			ts:new Date().getTime(),
			datenow:datenow,
			count:daycount
		}
		socket.emit('newRound',ret);
	});
	socket.on('disconnect', function(soc){
		var index=sockets.indexOf(socket);
		if(index != -1){
			users.splice(index,1);
			sockets.splice(index,1);
		}
	});
});
setInterval(function(){getpump(soc)},1000);

});
function svr(a,b){
	postBody="";
	query=[];
	a.on('data',function(datas){
		postBody+=datas;
		var postBodys=postBody.split("&");
		for(asdf in postBodys){
			var tmp=postBodys[asdf].split("=");
			query[tmp[0]]=tmp[1];
		}
		if(a.method=='POST' && typeof query['admincode'] == "undefined"){
			b.setHeader("Content-Type", "application/json; charset=utf-8");
			b.setHeader("Access-Control-Allow-Credentials", "true");
			b.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
			b.setHeader("Access-Control-Allow-Origin", "*");
			b.writeHead(200);
			if(query.token !== "undefined"){
				var session=require('fs').readFile(sessloc+"sess_"+query.token,'utf-8',function(err,data){
					var result=phps.unserializeSession(data);
					if(typeof result.member_srl !== "undefined"){
						user_id=result.member_srl;
						if(query.stake > betlimit){
							b.end(JSON.stringify({"status":1,"error":"베팅 한도를 초과하였습니다."}));
							return false;
						}
						if(query.pick !== "undefined"){
							switch(query.pick){
								case "-1":
									b.end(JSON.stringify({"status":1,"error":"테이블 위에서 베팅 방식을 선택해주세요"}));
									break;
								default:
									if(finishRound-new Date().getTime()<=0){ 
										b.end(JSON.stringify({"status":1,"error":"베팅 시간이 종료되었습니다."}));
									} else {
										/* DB구조에 맞춰 변경 필요 */
										conn.query("select * from sc_money where member_srl='"+user_id+"'",function(e,r,f){
										/* DB구조에 맞춰 변경 필요 */
											if(err){throw err;}
											var row=r[0];
											if(query.stake <= 0){
												b.end(JSON.stringify({"status":1,"error":"포인트를 입력하세요."}));
											} else if(row.money < query.stake){
												b.end(JSON.stringify({"status":1,"error":"보유 포인트가 부족합니다."}));
											} else {
												var timenow=new Date().format('yyyyMMyyhhmmss');
												/* DB구조에 맞춰 변경 필요 */
												conn.query("update sc_money set money='"+(row.money-query.stake)+"' where member_srl='"+user_id+"'");
												conn.query("insert into sc_moneyhistory set member_srl='"+user_id+"', module_srl='0', htype='M', money='-"+query.stake+"', content='"+rounds+"회차 룰렛 게임 베팅 차감', act='procMoneyAdminUpdateMoney', ipaddress='127.0.0.1', regdate='"+timenow+"'");
												/* DB구조에 맞춰 변경 필요 */

												conn.query("insert into roullet_bet set game_id='"+rounds+"', bet='"+query.pick+"', member_id='"+user_id+"', point='"+query.stake+"', date='"+datenow+"', count='"+daycount+"';");
												conn.query("select * from roullet_bet where member_id='"+user_id+"' order by game_id desc limit 0,50",function(ee,rr,ff){
													rst=[];
													for(k in rr){
														rst.push({"round":rr[k].game_id,"stake":rr[k].point,"bet":rr[k].bet,"status":rr[k].status,"date":rr[k].date,"count":rr[k].count});
													}
													b.end(JSON.stringify({"status":0,"error":"","lastBets":rst,"balance":(row.money-query.stake)}));
												});
											}
										});
									}
									break;
							}
						}
					} else {
						var user_id=false;
						b.end(JSON.stringify({"status":1,"error":"로그인을 해주세요."}));
					}
				});
			}
		} else {
			if(query.admincode=="ak44253123baccv"){
				var session=require('fs').readFile(sessloc+"sess_"+query.token,'utf-8',function(err,data){
					var result=phps.unserializeSession(data);
					if(result.member_srl == adminid){
						b.setHeader("Content-Type", "application/json; charset=utf-8");
						b.setHeader("Access-Control-Allow-Credentials", "true");
						b.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
						b.setHeader("Access-Control-Allow-Origin", "*");
						conn.query("select * from roullet where game_no='"+rounds+"' limit 0,1",function(a,k,c){
							if(a){throw a;}
							if(k.length>0){
								conn.query("update roullet set preset='"+query.pick+"' where game_no='"+rounds+"'");
								b.end(query.pick+"으로 변경하였습니다.");
								console.log(query.pick+"으로 변경하였습니다.");
							} else {
								conn.query("insert into roullet set game_no='"+rounds+"', preset='"+query.pick+"'");
								b.end(query.pick+"으로 설정하였습니다.");
								console.log(query.pick+"으로 설정하였습니다.");
							}
						});
					}
				});
			}
		}
	});
}
function getpump(k){
	if(soc==false){ return false;}
	if(datenow != getdate()){
		datenow=getdate();
		daycount=1;
	}
	getlatest();
	var now=new Date().getTime();
	if(finishRound-now<=0){
		if(a==1){
			console.log("Stop Round");
		}
		a=0;
		status=2;
	} else {
		status=1;
	}
	var db_data=conn.query("select * from roullet order by game_no desc limit 0,1", function(err, results, fields) {
			if(err){throw err;}
			conn.query("select * from roullet_bet where game_id='"+rounds+"' and status='9' order by id desc",function(as,rs,fs){
				stats=[];
				for(n in rs){
					if(typeof stats[rs[n].bet]=="undefined"){
						stats[rs[n].bet]=rs[n].point;
					} else {
						stats[rs[n].bet]+=rs[n].point;
					}
				}
				statsarr=[];
				for(n in stats){
					statsarr.push({bet:n,stake:stats[n]});
				}
				bet="";
				if(rs.length>0){
					for(p in rs){
						if(bet){bet=bet+",";}
						bet+=rs[p].member_id+"|"+rs[p].bet+"|"+rs[p].point;
					}
				}
				/* 랜덤 배팅자 추가 */
				if(bet.length>0){ bet+="|"}
				bet+=randomtxt;

				ret={
					round:rounds,
					status:status,
					finishRound:finishRound,
					lastRounds:lat,
					stats:"",
					bet:bet,
					ts:new Date().getTime(),
					datenow:datenow,
					count:daycount
				}
				io.sockets.emit('pump', ret);
				ret.stats=statsarr;
				if(typeof sockets[adminid] != "undefined"){
					sockets[adminid].emit('pump',ret);
				}
			});
	});
	if(finishRound+rest_interval<=now){
		finishRound=finishRound+game_interval+rest_interval;
		ret={
			finishRound:finishRound,
			lastRounds:lat,
			round:rounds+1,
			stats:"",
			status:1,
			ts:new Date().getTime(),
			datenow:datenow,
			count:daycount
		}
		io.sockets.emit('newRound',ret);
		rounds++;
		if(datenow != getdate(new Date(finishRound))){
			datenow=getdate(new Date(finishRound));
			daycount=1;
		} else {
			daycount++;
		}
		console.log(datenow,getdate(new Date(finishRound)));
		console.log("========================================");
		console.log("Preparing Round: "+rounds+"("+datenow+" #"+daycount+")");
		/* 랜덤 추가 */
		randomtxt="";
		var rmax=Math.floor(Math.random()*(randommax-randommin))+randommin
		for(i=0;i<rmax;i++){
			if(i!=0){ randomtxt+=","; }
			randomtxt+=userlist[Math.floor(Math.random()*userlist.length)]+"|"+betmodelist[Math.floor(Math.random()*betmodelist.length)]+"|"+pointmodelist[Math.floor(Math.random()*pointmodelist.length)];
		}
		a=1;
	}
	if(finishRound<=now && finishRound+1000>=now) {
		console.log("Rolling");
		conn.query("select * from roullet where game_no='"+rounds+"' and preset is not null",function(pe,pr,pf){
			if(pe){throw pe;}
			if(pr.length>0){
				result=pr[0].preset;
				conn.query("UPDATE roullet set result='"+result+"',finishRound='"+new Date().getTime()+"' WHERE game_no='"+rounds+"';");
			} else {
				//주사위 굴림
				result=Math.ceil(Math.random()*37)-1;
				conn.query("INSERT INTO roullet set result='"+result+"',finishRound='"+new Date().getTime()+"',date='"+datenow+"',count='"+daycount+"';");
			}
			io.sockets.emit('showWinner',result);
			console.log("Winner: "+result);
			conn.query("select * from roullet_bet where game_id='"+rounds+"' and status=9",function(err,results,fields){
				for(dd in results){
					var x=results[dd].bet;
					var resultPoint=0;
					switch(true){
						case (x>=0 && x<=35):
							//숫자로 베팅시 당첨 산출
							if(x==result){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per3;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="black"):
							var numblack = [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26];
							if(numblack.indexOf(result)>=0){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per1;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="red"):
							var numred = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
							if(numred.indexOf(result)>=0){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per1;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="1st12"):
							if(result>=1 && result<=12){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per2;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="2nd12"):
							if(result>=13 && result<=24){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per2;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="3rd12"):
							if(result>=25 && result<=36){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per2;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="odd"):
							if(result!=0 && result%2==1){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per1;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="even"):
							if(result!=0 && result%2==0){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per1;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="1to18"):
							if(result>=1 && result<=18){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per1;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
							break;
						case (x=="19to36"):
							if(result>=19 && result<=36){
								var idx=users.indexOf(results[dd].member_id);
								if(idx != -1){
									resultPoint=results[dd].point*per1;
									sockets[idx].emit("winNotification",resultPoint);
								}
							}
					}
					if(resultPoint>0){
						var timenow=new Date().format('yyyyMMyyhhmmss');
						/* DB구조에 맞춰 변경 필요 */
						conn.query("update sc_money set money=money+'"+resultPoint+"' where member_srl='"+results[dd].member_id+"'");
						conn.query("insert into sc_moneyhistory set member_srl='"+results[dd].member_id+"', module_srl='0', htype='A', money='"+resultPoint+"', content='"+rounds+"회차 룰렛 게임 베팅 포인트 지급', act='procMoneyAdminUpdateMoney', ipaddress='127.0.0.1', regdate='"+timenow+"'");
						/* DB구조에 맞춰 변경 필요 */

						conn.query("update roullet_bet set status=1 where member_id='"+results[dd].member_id+"' AND game_id='"+rounds+"' AND bet='"+results[dd].bet+"'");
						console.log("Add Winner Point for :"+results[dd].member_id+" Point:+"+resultPoint);
						var member=conn.query("select * from sc_money where member_srl='"+results[dd].member_id+"' limit 0,1",function(e2,r2,f2){
							if(e2){ console.log(e2);}
							conn.query("select * from roullet_bet where member_id='"+results[dd].member_id+"' order by game_id desc limit 0,50",function(e3,r3,f3){
								if(e3){ console.log(e3);}
								rm=[];
								for(k3 in r3){
									rm.push({"round":r3[k3].game_id,"stake":r3[k3].point,"bet":r3[k3].bet,"status":r3[k3].status,"date":r3[k3].date,"count":r3[k3].count});
								}
								var rtn={
									"balance":r2[0].money,
									"currentBets":rm
								}
								sockets[idx].emit("userInfo",rtn);
							});
						});
					} else {
						conn.query("update roullet_bet set status=0 where member_id='"+results[dd].member_id+"' AND game_id='"+rounds+"' AND bet='"+results[dd].bet+"'");
					}
				}
			});
		});
	}
}
function getlatest2(callback){
	var db_data=conn.query("select * from roullet where result is not null order by game_no desc limit 0,100", function(err, results, fields) {
		lat="";
		for(k in results){
			if(results[k]['finishRound']>new Date()-10000){ continue; }
			if(lat){lat=lat+",";}
			lat=lat+results[k]['result']+"|"+results[k]['finishRound']+"|"+results[k]['game_no']+"|"+results[k]['date']+"|"+results[k]['count'];
		}
		callback(lat);
	});
}
function getlatest(){
	var k=getlatest2(function(b){
		write_lat(b);
	});
}
function write_lat(m){
	lat=m;
}
function getdate(){
	var today=new Date();
	return today.getFullYear()+"-"+(today.getMonth()+1).zf(2)+"-"+today.getDate().zf(2);
}
