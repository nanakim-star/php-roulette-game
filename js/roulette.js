$(document).ready(function () {
    $.fn.extend({
        roulette: function (config) {
            var numorder = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
            var numred = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
            var numblack = [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26];
            var numgreen = [0];
            var numberLoc = [];
            var roulette = $(this).find('#roulette');
            var connectionErrorAlert = $(this).find('.connection-error-alert');
            var connectionErrorAlertTimeout = null;
            var roulette = $(this);
            var rouletteTable = $(this).find('.rouletteTable');
            var cover = $(this).find('.cover');
            var plate = $(this).find('.plate');
            var ball = $(this).find('.ball');
            var winnerBlock = $(this).find('.winnerBorder .winner');
            var roundBlock = $(this).find('.round .round-number');
            var progressBar = $(this).find('.progress-bar');
            var coinsSpan = $(this).find('.coins');
            var betWindow = $(this).find('.betWindow');
            var rollsList = $(this).find('.rollsList');
            var currentBets = $(this).find('.betWindow .currentBets');
            var currentBetsList = $(this).find('.currentBetsList');
            var betShadow = $(this).find('.betWindow .currentBets .bet-shadow');
            var lastBetsUser = $(this).find('.lastBetsUser');
            var pfx = $.keyframe.getVendorPrefix();
            var rotationsTime = 8;
            var wheelSpinTime = 6;
            var ballSpinTime = 4;
            var serverTime = 0;
            var localTime = 0;
            var timeDiff = 0;
            var timeDiffs = [];
            var currentRound = 0;
            var currentRoundFinish = 0;
            var winner = -1;
            var currentStatus = 0;
            var spinnReady = false;
            var userCoins = 0;
            var lastRounds = '';
            var userBets = [];
            var pickReady = false;
            var lastWinRoll = -1;
            var lastFailRoll = -1;
            var lastWinNotify = -1;
            var lastBet = 0;
            var $div = $('<div></div>');
            var a = 0;
            var lockedBuy = false;
            var updateBalanceFnc = config.updateBalanceFnc;
            var rouletteAddr = 'http://222.237.78.14:8001';//'http://roulette.fanobet.com:60606';
            var socket = io.connect(rouletteAddr);
            var userObject = config.userObject;
            var soundStop = 1; // 0 = off ; 1 = on
            var audioBackground = new Audio("/game/roullette/files/bg.mp3");
            var audioRollSound = new Audio("/game/roullette/files/roll.mp3");
            var audioWinSound = new Audio("/game/roullette/files/coins.mp3");
			var checktime=new Date(0);
			var sitename="";
			var varDate="1970-01-01";
			var varRound="1";
			var scrolln=0;

			function scr(){
				var k=$(".status2").scrollTop();
				$(".status2").scrollTop("+1");
				if($(".status2").scrollTop() == k){
					$(".status2").scrollTop(0);
				}
				$(".status2").animate({scrollTop:$(this).scrollTop()+100},5000,"swing",scr);
			}
			scr();

            // setup music & sound
            var music_mode_cookie = getCookie('roulette_music_mode');
            if(music_mode_cookie==1){
                roulette.find('input[name=music_mode]').prop('checked',true);
            }
            var sound_mode_cookie = getCookie('roulette_sound_mode');
            if(sound_mode_cookie==1){
                roulette.find('input[name=sound_mode]').prop('checked',true);
				soundStop=0;
            }
            

            createSpinner();

            // sound and music enable
            if(roulette.find('input[name=music_mode]').prop('checked') ){
                audioBackgroundPlay();
            }

            roulette.find('input[name=music_mode]').change(function(){
                if(roulette.find('input[name=music_mode]')[0].checked){
                    setCookie("roulette_music_mode",1,60*60*24*30);
                    audioBackgroundPlay();
                } else {
                    setCookie("roulette_music_mode",0,60*60*24*30);
                    audioBackgroundStop();
                }
            });

            roulette.find('input[name=sound_mode]').change(function(){
                if(roulette.find('input[name=sound_mode]')[0].checked){
                    setCookie("roulette_sound_mode", 1, 60 * 60 * 24 * 30);
                    soundStop = 0;
                } else {
                    setCookie("roulette_sound_mode", 0, 60 * 60 * 24 * 30);
                    audioRollSound.pause();
                    audioRollSound.currentTime = 0;
                    audioWinSound.pause();
                    audioWinSound.currentTime = 0;
                    soundStop = 1;
                }
            });

            socket.on('connect', function (msg) {
                socket.emit('login', userObject);
                roulette.find('.connected').show();
                roulette.find('.disconnected').hide();
            });

            socket.on('disconnect', function (msg) {
                roulette.find('.connected').hide();
                roulette.find('.disconnected').show();
            });

            socket.on('showWinner', function (msg) {
                winner = msg;
                spinTo(msg);
                refresh();
            });

            socket.on('userInfo', function (msg) {
                userBets = msg.currentBets;
                userCoins = msg.balance;
                refresh();
            });

            socket.on('winNotification', function (msg) {
                winNotify(msg);
            });

            socket.on('pump', function (msg) {
                currentStatus = msg.status;
                currentRound = msg.round;
                currentRoundFinish = msg.finishRound;
                lastRounds = msg.lastRounds;
				varDate = msg.datenow;
				varRound = msg.count;

				$(".status2 tbody").html("");
				if(msg.bet.length>=1){
					var betdata=msg.bet.split(",");
					for(ak in betdata){
						var row=betdata[ak].split("|");
						$("<tr><td>"+row[0]+"님이 "+trans(row[1])+"에 "+formatNumber(row[2])+"원을 배팅하였습니다!</td></tr>").appendTo(".status2 tbody");
					}
				}
                var tmpDiff = Date.now() - msg.ts;
                if( timeDiff == 0 || Math.abs(timeDiff-tmpDiff)<2000) {
                    timeDiffs.push(tmpDiff);
                    if(timeDiffs.length>6) timeDiffs.shift();
                    var sum = timeDiffs.reduce(function(a, b) { return a + b; });
                    timeDiff = sum / timeDiffs.length;
                }

                // setup stats
                if (msg.stats.length > 0) {
                    for (var i in msg.stats) {
                        var element = msg.stats[i].bet;
                        var stake = msg.stats[i].stake;
                        rouletteTable.find('[data-pick=' + element + '] div .cash').attr('value', stake);
                    }
                } else {
                    //rouletteTable.find('[data-pick] div .cash').each(function (index) {
                    //    $(this).attr('value', 0).html('');
                    //});
                }
                refresh();
            });

            socket.on('newRound', function (msg) {
                currentStatus = 1;
                currentRound = msg.round;
                currentRoundFinish = msg.finishRound;
                lastRounds = msg.lastRounds;
                winnerBlock.html("?");
                winnerBlock.addClass('silver').removeClass('red').removeClass('black').removeClass('green');
                rouletteTable.find('[data-pick] div .cash').each(function (index) {
                    $(this).attr('value', 0).html('');
                });
                refresh();
            });

            socket.on('closeRound', function (msg) {

            });

			$(".pick-input").on("keyup",function(e){
				$(this).val(formatNumber(parseInt($(this).val().replace(",",""))));
			});

            function createSpinner() {
                var temparc = 360 / numorder.length;

                for (var i in numorder) {
                    var num = numorder[i];
                    numberLoc[numorder[i]] = [];
                    numberLoc[numorder[i]][0] = i * temparc;
                    numberLoc[numorder[i]][1] = (i * temparc) + temparc;
                }

            }

            function resetAni() {

                var animationPlayState = "animation-play-state";
                var playStateRunning = "running";

                $(plate).css(pfx + animationPlayState, playStateRunning).css(pfx + "animation", "none");
                $(ball).css(pfx + animationPlayState, playStateRunning).css(pfx + "animation", "none");
                winnerBlock.html('?');
                winnerBlock.removeClass('red').removeClass('green').removeClass('black').addClass('silver');

            }

            function spinTo(num) {
                audioRoll();
                winner = num;
                var temp = numberLoc[num][0] + 4;
                var rndSpace = Math.floor((Math.random() * 360) + 1);
                resetAni();
                setTimeout(function () {
                    bgrotateTo(rndSpace);
                    ballrotateTo(rndSpace + temp);
                }, 500);

            }

            function bgrotateTo(deg) {
                var dest = 360 * wheelSpinTime + deg;
                var temptime = (rotationsTime * 1000) - 1000;

                $.keyframe.define({
                    name: 'rotate',
                    from: {
                        transform: 'rotate(0deg)'
                    },
                    to: {
                        transform: 'rotate(' + dest + 'deg)'
                    }
                });

                $(plate).playKeyframe({
                    name: 'rotate',
                    duration: temptime,
                    timingFunction: 'ease-in-out',
                    complete: function () {

                    }
                });


            }

            function finishSpin() {
                winnerBlock.html(winner);
                winnerBlock.removeClass('silver').removeClass('red').removeClass('black').removeClass('green');
                if (numred.indexOf(winner) >= 0) winnerBlock.addClass('red');
                if (numblack.indexOf(winner) >= 0) winnerBlock.addClass('black');
                if (numgreen.indexOf(winner) >= 0) winnerBlock.addClass('green');
                refresh();
            }

            function ballrotateTo(deg) {
                var temptime = (rotationsTime * 1000);
                var dest = (-360 * ballSpinTime) - (360 - deg);

                $.keyframe.define({
                    name: 'rotate2',
                    from: {
                        transform: 'rotate(0deg) translate(85px) '
                    },
                    to: {
                        transform: 'rotate(' + dest + 'deg) translate(85px) '
                    }
                });

                $(ball).playKeyframe({
                    name: 'rotate2',
                    duration: temptime,
                    timingFunction: 'ease-in-out',
                    complete: function () {
                        finishSpin();
                    }
                });

            }

            function refreshProgress() {
                if (currentStatus == 1) {
                    var seconds = ((((currentRoundFinish - Math.floor(Date.now())) + timeDiff)) / 1000).toFixed(2);
                    var progress = ((seconds * 100) / 120).toFixed(2);
                    if (seconds >= 0) {
                        winnerBlock.html("?");
                        winnerBlock.addClass('silver').removeClass('red').removeClass('black').removeClass('green');
                        progressBar
                            .css('width', progress + '%')
                            .find('span')
                            .html(seconds + '초');
						if(seconds >=30){
							progressBar.css('background-color','skyblue');
						} else {
							progressBar.css('background-color','rgb(224,28,17)');
						}
                    } else {
                        progressBar
                            .css('width', '0%')
                            .find('span')
                            .html('대기중');
                        currentStatus = 2;
                    }
                }
            }
			function isNumeric(num, opt){
			  num = String(num).replace(/^\s+|\s+$/g, "");
			  if(typeof opt == "undefined" || opt == "1"){
				var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
			  }else if(opt == "2"){
				var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
			  }else if(opt == "3"){
				var regex = /^[0-9]+(\.[0-9]+)?$/g;
			  }else{
				var regex = /^[0-9]$/g;
			  }
			  if( regex.test(num) ){
				num = num.replace(/,/g, "");
				return isNaN(num) ? false : true;
			  }else{ return false;  }
			}
			 
			function getNumeric(str, opt){
			  if(isNumeric(str, opt)){
				str = String(str).replace(/^\s+|\s+$/g, "").replace(/,/g, "");
				return Number(str);
			  }else{
				return str;
			  }
			}

			function formatNumber(str, opt){
			  var rstr = "", sign = "";
			  if(isNumeric(str, opt)){
				str = String(getNumeric(str, opt));
				if(str.substr(0, 1) == "-" ){
				  sign = "-";
				  str = str.substr(1);
				}
				var arr = str.split(".");
				for(var ii = 0 ; ii < arr[0].length ; ii++){
				  if( ii % 3 == 0 && ii > 0){
					rstr = arr[0].substring(arr[0].length-ii,arr[0].length-ii-1) + "," + rstr;
				  }else{
					rstr = arr[0].substring(arr[0].length-ii,arr[0].length-ii-1) + rstr;
				  }
				}
				rstr = sign + rstr;
				return arr.length > 1 ? rstr + "." + arr[1] : rstr;
			  }else{
				return str;
			  }
			}

            function refresh() {
                coinsSpan.html(formatNumber(userCoins));
                //roundBlock.html(currentRound);
				roundBlock.html(varDate+" "+varRound+"회차");
				String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
				String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
				Number.prototype.zf = function(len){return this.toString().zf(len);};
                //render last rounds
                var numbers = lastRounds.split(",");
				var arrs=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
				$.ajax({
					url:"./sitename"
				}).done(function(e){
					$(".site").html(e);
				});
				if(checktime<new Date()-10000){
					rollsList.children("table").children("tbody").html("");
					for (var i in numbers) {
						if(i<100){
							if(checktime>new Date()-5000){ continue; }
							var data=numbers[i].split("|");
							var element = $("<span>" + data[0] + "</span>");
							if (numred.indexOf(parseInt(data[0])) >= 0) element.addClass('red');
							if (numblack.indexOf(parseInt(data[0])) >= 0) element.addClass('black');
							if (numgreen.indexOf(parseInt(data[0])) >= 0) element.addClass('green');
							var rst=$("<tr></tr>");
							var time=new Date(parseInt(data[1]));
							var date=time.getFullYear()+"-"+(time.getMonth()+1).zf(2)+"-"+time.getDate().zf(2);
							$("<td>"+data[3]+"</td>").attr("valign","middle").appendTo(rst);
							$("<td>"+data[4]+"회</td>").appendTo(rst);
							$("<td></td>").append(element).appendTo(rst);
							rollsList.children("table").children("tbody").append(rst);
							arrs[data[0]]++;
						}
					}
					var numb = [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26];
					var numr = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
					$(".status tbody").html("");
					var tmp=0;for(var a in arrs){if(a!=0 && a%2==1){tmp+=arrs[a];}}
					$("<tr><td>홀</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					var tmp=0;for(var a in arrs){if(a!=0 && a%2==0){tmp+=arrs[a];}}
					$("<tr><td>짝</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					var tmp=0;for(var a in arrs){if(numb.indexOf(parseInt(a))>=0){tmp+=arrs[a];}}
					$("<tr><td>검정</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					var tmp=0;for(var a in arrs){if(numr.indexOf(parseInt(a))>=0){tmp+=arrs[a];}}
					$("<tr><td>빨강</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					$("<tr><td>0</td><td>"+arrs[0]+"%</td></tr>").appendTo(".status tbody");
					var tmp=0;for(var a in arrs){if(a>=1 && a<=12){tmp+=arrs[a];}}
					$("<tr><td>1~12</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					var tmp=0;for(var a in arrs){if(a>=13 && a<=24){tmp+=arrs[a];}}
					$("<tr><td>13~24</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					var tmp=0;for(var a in arrs){if(a>=25 && a<=36){tmp+=arrs[a];}}
					$("<tr><td>25~36</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					var tmp=0;for(var a in arrs){if(a>=1 && a<=18){tmp+=arrs[a];}}
					$("<tr><td>1~18</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					var tmp=0;for(var a in arrs){if(a>=19 && a<=36){tmp+=arrs[a];}}
					$("<tr><td>19~36</td><td>"+tmp+"%</td></tr>").appendTo(".status tbody");
					checktime=new Date();
                }
                // render bets lists
                currentBetsList.html("");
                roulette.find('.your-bet-title').css("display", "none");
                if (userBets){
					var ak=0;
                    for (var i in userBets) {
                        if (userBets[i].round == currentRound) {
							ak=ak+1;
                            var className = "silver";
                            if (userBets[i].bet == 'red') className = 'red';
                            if (userBets[i].bet == 'black') className = 'black';
                            if (parseInt(userBets[i].bet) == userBets[i].bet) {
                                if (numred.indexOf(parseInt(userBets[i].bet)) >= 0) className = 'red';
                                if (numblack.indexOf(parseInt(userBets[i].bet)) >= 0) className = 'black';
                                if (numgreen.indexOf(parseInt(userBets[i].bet)) >= 0) className = 'green';
                            }
                            var element = $("<div class='ball-section'><div class='list-ball " + className + "'>" + trans(userBets[i].bet) + "</div><span>" + formatNumber(userBets[i].stake) + "</span><span>머니</span></div>");
                            currentBetsList.append(element);
                            roulette.find('.your-bet-title').css("display", "block");
							var cell=$(".rouletteTable td[data-pick='"+userBets[i].bet+"'] div");
							cell.find('.chipwrap').remove();
							var chips=$('<div class="chipwrap"><div class="c1"></div><div class="c2"></div><div class="c3"></div></div>');
							var chip3value=Math.floor(parseInt(userBets[i].stake)/1000000);
							var chip2value=Math.floor((parseInt(userBets[i].stake)-(1000000*chip3value))/100000);
							var chip1value=Math.floor((parseInt(userBets[i].stake)-(1000000*chip3value)-(chip2value*100000))/10000);
							for(i=0;i<chip3value;i++){
								chips.find(".c3").append('<div class="chip3"></div>');
							}
							for(i=0;i<chip2value;i++){
								chips.find(".c2").append('<div class="chip2"></div>');
							}
							for(i=0;i<chip1value;i++){
								chips.find(".c1").append('<div class="chip1"></div>');
							}
							if(parseInt(userBets[i].stake)<10000){
								chips.find(".c1").append('<div class="chip1"></div>');
							}
							cell.append(chips);
                        }
                    }
					if(ak==0){
						$(".chipwrap").remove();
					}
				}
                // render lastBetsUser
                lastBetsUser.find('table tbody').html("");
                if (userBets)
                    for (var i in userBets) {
						var className = 'silver';
                        if (userBets[i].round != currentRound) {
                            
                            if (userBets[i].bet == 'red') className = 'red';
                            if (userBets[i].bet == 'black') className = 'black';
                            if (parseInt(userBets[i].bet) == userBets[i].bet) {
                                if (numred.indexOf(parseInt(userBets[i].bet)) >= 0) className = 'red';
                                if (numblack.indexOf(parseInt(userBets[i].bet)) >= 0) className = 'black';
                                if (numgreen.indexOf(parseInt(userBets[i].bet)) >= 0) className = 'green';
                            }
							var st="비정상";
							switch(userBets[i].status){
								case 0:
									st="낙첨";
									break;
								case 1:
									st="당첨";
									break;
								case 8:
									st="환급";
									break;
								case 9:
									st="낙첨";
									break;

							}
                            var element = $("<tr><td><span style=\"font-size:6px\">" + userBets[i].date+"</span><br />"+userBets[i].round + "회</td><td><div class='" + className + "'>" + trans(userBets[i].bet) + "</div></td><td>" + formatNumber(userBets[i].stake) + "</td><td>" + st + "</td></tr>");
                            
                            lastBetsUser.find('table tbody').append(element);
                        }
                    }

                if (currentStatus < 1) {
                    betWindow.find(".overlay-locked").show();
                    progressBar
                        .attr('aria-valuenow', 0).css('width', 0 + '%')
                        .find('span')
                        .html('대기중');
                }
                if (currentStatus == 1) {
                    betWindow.find(".overlay-locked").hide();
                    winnerBlock.html("?");
                    winnerBlock.addClass('silver').removeClass('red').removeClass('black').removeClass('green');
                }
                // waiting
                if (currentStatus == 2) {
                    betWindow.find(".overlay-locked").show();
                    progressBar
                        .attr('aria-valuenow', 0).css('width', 0 + '%')
                        .find('span')
                        .html('대기중');
                }
                /*
                 if (currentStatus == 1 && pickReady) {
                 if (!betWindow.is(":visible")) betWindow.show();
                 } else {
                 if (betWindow.is(":visible")) betWindow.hide();
                 }
                 */
            }

            function winNotify(value) {
				setTimeout(function(){
					audioWin();
					if (lastWinNotify != currentRound) {
						lastWinNotify = currentRound;
						$('#roulette .winNotify').slideDown(500);
						setTimeout(function () {
							$('#roulette .winNotify').slideUp(500);
						}, 2000);
					}
				},8000);
            }

            function pick(pick) {
                pickReady = true;
                betWindow.find('input[name=pick]').val(pick);
                var h1 = betWindow.find('.pick-ball');
                h1.removeClass('silver').removeClass('red').removeClass('black').removeClass('green');
                h1.html(trans(pick));
                if (pick == "1to18" || pick == '1st12' || pick == 'even' || pick == '2nd12' || pick == '3rd12' || pick == 'odd' || pick == '19to36') {
                    h1.addClass('silver');
                } else if (pick == 'black') {
                    h1.addClass('black');
                } else if (pick == 'red') {
                    h1.addClass('red');
                } else {
                    pick = parseInt(pick);
                    if (numred.indexOf(pick) >= 0) h1.addClass('red');
                    if (numblack.indexOf(pick) >= 0) h1.addClass('black');
                    if (numgreen.indexOf(pick) >= 0) h1.addClass('green');
                }
            }

            $('#roulette .betWindow').find('input[name=stake]').keyup(function(){
                $('#roulette .betWindow').find('input[name=stake]').val($(this).val());
            }).change(function(){
                $('#roulette .betWindow').find('input[name=stake]').val($(this).val());
            });

            $('form.buyForm ').find('input[name=coins]').keyup(function(){
                $('form.buyForm ').find('input[name=coins]').val($(this).val());
            }).change(function(){
                $('form.buyForm ').find('input[name=coins]').val($(this).val());
            });

            function submitPick() {
                betWindow.find(".overlay-loading").show();
                $.ajax({
                    method: "POST",
                    url: rouletteAddr+"/pick",
                    async: true,
                    cache: false,
                    data: {
                        'pick': $('#roulette .betWindow').find('input[name=pick]').val().replace(/ /g, ''),
                        'stake': $('#roulette .betWindow').find('input[name=stake]').val().replace(",",""),
                        'uid': userObject.uid,
                        'token': userObject.token
                    },
                    timeout: 2500
                }).done(function (msg) {
                    if (msg.status == 0) {
                        userCoins = msg.balance;
                        userBets = msg.lastBets;
                        lastBet = $('#roulette .betWindow').find('input[name=stake]').val();
                        $('#roulette .betWindow').find('input[name=stake]').val('0');

                        // render currentBets
                        /*console.log(userBets[0]);
                        var className = "silver";
                        if (userBets[0].bet == 'red') className = 'red';
                        if (userBets[0].bet == 'black') className = 'black';
                        if (parseInt(userBets[0].bet) == userBets[0].bet) {
                            if (numred.indexOf(parseInt(userBets[0].bet)) >= 0) className = 'red';
                            if (numblack.indexOf(parseInt(userBets[0].bet)) >= 0) className = 'black';
                            if (numgreen.indexOf(parseInt(userBets[0].bet)) >= 0) className = 'green';
                        }
                        console.log(userBets[0] + ' ' + className);

                        var html = "<div id='bet-ball-info' class='" + className + " pick-ball bet-ball' >" + userBets[0].bet + "</div><span id='bet-stake-info'>" + userBets[0].stake + " COINS</span>";
                        console.log(html);
                        var element = $(html);
                        currentBets.css("display", "block");
                        betShadow.append(html);
                        console.log(betShadow.html());
                        cover.css('z-index', 5);
                        setTimeout(function () {
                            cover.css('z-index', -1);
                            currentBets.css("display", "none");
                            //betShadow.children("div").remove().html("");
                            betShadow.find('#bet-ball-info').remove();
                            betShadow.find('#bet-stake-info').remove();
                        }, 800);*/

                        refresh();
                    } else {
                        betError(msg.error);
                    }
                    setTimeout(function () {
                        betWindow.find(".overlay-loading").hide();
                    }, 100);
                }).fail(function () {
                    connectionError()
                });
            }

            function audioRoll() {
                if (soundStop == 0)
                setTimeout(function(){
                    audioRollSound.play();
                },500);
            }

            function audioWin() {
                if (soundStop == 0)
                audioWinSound.play();
            }

            function audioBackgroundPlay() {
                audioBackground.loop = true;
                audioBackground.volume = 0.4;
                audioBackground.play();
            }

            function audioBackgroundStop() {
                audioBackground.pause();
            }

            function betError(msg) {
                betWindow.find(".error").html(msg);
                betWindow.find(".error").show();
                setTimeout(function () {
                    betWindow.find(".error").hide();
                }, 4000);
            }

            function setCookie(name,value,expires) {
                if (expires) {
                    var date = new Date();
                    date.setTime(date.getTime()+(expires*1000));
                    var expires = "; expires="+date.toGMTString();
                }
                else var expires = "";
                document.cookie = name+"="+value+expires+"; path=/";
            }

            function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i <ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length,c.length);
                    }
                }
                return "";
            }

            function connectionError() {
                //connectionErrorAlert.html(msg.error);
                connectionErrorAlert.show();
                clearTimeout(connectionErrorAlertTimeout);
                connectionErrorAlertTimeout = setTimeout(function () {
                    betWindow.find(".error").hide();
                }, 4000);
            }

            $(this).find('table [data-pick]').click(function () {
                betWindow.find(".error").hide();
                pick($(this).attr('data-pick'));
            });

            betWindow.find('[type=submit]').click(function () {
                submitPick();
            });

            roulette.find("form.buyForm button[name=buy]").click(function(event){
                event.preventDefault();
                if(lockedBuy) return false;
                roulette.find("form.buyForm").find(".overlay-loading").show();
                lockedBuy = true;
                $.ajax({
                    method: "GET",
                    url: rouletteAddr+'/buy',
                    async: true,
                    cache: false,
                    data: {
                        'coins': roulette.find("form.buyForm input[name=coins]").val(),
                        'uid': config.userObject.uid,
                        'token': config.userObject.token
                    },
                    json: true,
                    timeout: 2500
                }).done(function (msg) {
                    lockedBuy = false;
                    if (msg.status == 0) {
                        userCoins = msg.balance;
                        if(typeof updateBalanceFnc == "function"){
                            updateBalanceFnc(msg.balanceInService);
                        }
                        refresh();
                    } else {
                        roulette.find("form.buyForm").parent().find('.alert').html(msg.error).show();
                        setTimeout(function(){
                            roulette.find("form.buyForm").parent().find('.alert').hide();
                        },2000);
                    }
                    setTimeout(function () {
                        roulette.find("form.buyForm").find(".overlay-loading").hide();
                    }, 100);
                }).fail(function () {
                    lockedBuy = false;
                    connectionError();
                    setTimeout(function () {
                        roulette.find("form.buyForm").find(".overlay-loading").hide();
                    }, 100);
                });
            });

            roulette.find("form.buyForm button[name=sell]").click(function(event){
                event.preventDefault();
                if(lockedBuy) return false;
                roulette.find("form.buyForm").find(".overlay-loading").show();
                lockedBuy = true;
                $.ajax({
                    method: "GET",
                    url: rouletteAddr+'/sell',
                    async: true,
                    cache: false,
                    data: {
                        'coins': roulette.find("form.buyForm input[name=coins]").val(),
                        'uid': config.userObject.uid,
                        'token': config.userObject.token
                    },
                    json: true,
                    timeout: 2500
                }).done(function (msg) {
                    lockedBuy = false;
                    if (msg.status == 0) {
                        userCoins = msg.balance;
                        if(typeof updateBalanceFnc == "function"){
                            updateBalanceFnc(msg.balanceInService);
                        }
                        refresh();
                    } else {
                        roulette.find("form.buyForm").parent().find('.alert').html(msg.error).show();
                        setTimeout(function(){
                            roulette.find("form.buyForm").parent().find('.alert').hide();
                        },2000);
                    }
                    setTimeout(function () {
                        roulette.find("form.buyForm").find(".overlay-loading").hide();
                    }, 100);
                }).fail(function () {
                    lockedBuy = false;
                    connectionError();
                    setTimeout(function () {
                        roulette.find("form.buyForm").find(".overlay-loading").hide();
                    }, 100);
                });
            });

            betWindow.find('.helpers button').click(function () {
                var rel = $(this).attr('rel');
                var stakeInput = betWindow.find('input[name=stake]');
                if (stakeInput.val() == '') stakeInput.val(0);
                var currentValue = parseInt(stakeInput.val().replace(",",""));
                switch (rel) {
                    case 'last':
                        stakeInput.val(lastBet);
                        break;
                    case '+1000':
                        stakeInput.val(currentValue + 1000);
                        break;
                    case '+5000':
                        stakeInput.val(currentValue + 5000);
                        break;
                    case '+10000':
                        stakeInput.val(currentValue + 10000);
                        break;
                    case '+50000':
                        stakeInput.val(currentValue + 50000);
                        break;
                    case 'x1/2':
                        stakeInput.val(parseInt(currentValue / 2));
                        break;
                    case 'x2':
                        stakeInput.val(parseInt(currentValue * 2));
                        break;
                    case 'max':
                        stakeInput.val(userCoins);
                        break;
                    case 'reset':
                        stakeInput.val(0);
                        break;
                }
				stakeInput.val(formatNumber(stakeInput.val()));
            });

            function timerStakes() {
                rouletteTable.find('[data-pick] div .cash').each(function (index) {
                    
                    var value = ($(this).attr('value'));
                    var current = ($(this).html());
                    if (typeof value !== typeof undefined && value !== false) {
                        if (typeof current === typeof undefined || current == '') {
                            current = 0;
                        } else {
                            current = parseInt(current.replace(",",""));
                        }
                        var hop = parseInt((parseInt(value) - current) / 5);
                        if (hop < 1) hop = 2;
                        if (current != parseInt(value)) {
                            $(this).html(formatNumber(Math.min(current + hop, parseInt(value))));
                        }
                    } else {
                        $(this).html("");
                    }

                });
            }
			
			function trans(k){
				var m="";
				switch(k){
					case "black":
						m="검정";
						break;
					case "red":
						m="빨강";
						break;
					case "odd":
						m="홀";
						break;
					case "even":
						m="짝";
						break;
					case "1st12":
						m="1 ~ 12";
						break;
					case "2nd12":
						m="13 ~ 24";
						break;
					case "3rd12":
						m="25 ~ 36";
						break;
					case "1to18":
						m="1 ~ 18";
						break;
					case "19to36":
						m="19 ~ 36";
						break;
					default:
						m=k;
						break;
				}
				return m;
			}
            (function refreshStakesInterval() {
                $.when(timerStakes()).then(function () {
                    setTimeout(refreshStakesInterval, 50);
                });
            })();

            (function refreshProgressInterval() {
                $.when(refreshProgress()).then(function () {
                    setTimeout(refreshProgressInterval, 100);
                });
            })();



            return this;
        }
    });
});