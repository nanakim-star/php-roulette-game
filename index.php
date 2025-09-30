<?php 
ini_set("session.save_path","../../files/sessions");
session_start();

?><!doctype html>
<html lang="en" ng-app="StarterApp">
<head>
        <meta name="viewport" content="width=500,initial-scale=0.7,maximum-scale=1.0,user-scalable=no"/>
        <meta charset="UTF-8">

        <script src="./js/jquery-1.11.3.min.js"></script>
        <script src="./js/jquery-migrate-1.2.1.min.js"></script>

        <script src="./js/angular.js?v=1.0"></script>
        <script src="./js/angular-cookies.min.js"></script>
        <script src="./js/bootstrap.min.js"></script>
        <script src="./js/ui-bootstrap-tpls-0.10.0.js"></script>
        <script src="./js/jquery-ui.slider.js"></script>
        <script src="./js/moment.min.js"></script>
        <script src="./js/moment-timezone-with-data-2010-2020.min.js"></script>
        <script type="text/javascript" src='./js/jstz.min.js'></script>
        <script src="./js/jquery-ui.autocomplete.js"></script>
        
		<script src="./js/jquery.keyframes.min.js"></script>
		<script src="http://cdn.socket.io/socket.io-1.4.5.js"></script>
		<script src="./js/roulette.js?v=2.40.28330"></script>

                    <link rel="stylesheet" href="./files/jquery-ui.css"/>
        <link rel="stylesheet" href="./files/jquery-ui2.css">
        <link href="./files/font-awesome.min.css" rel="stylesheet">
        <link href="./files/bootstrap.min.css" rel="stylesheet">
        <link rel="apple-touch-icon" href="./files/favicon.png">
        <link rel="Shortcut icon" href="./files/favicon.png"/>
        <link href="./files/bootstrap-theme.css" rel="stylesheet">

        <link rel="stylesheet" href="./files/style.min.css?v=2.45.28330">
        
    <link rel="stylesheet" href="./files/roulette.css?v=2.39">

        <script>
            var angularChangeDelimiter = true;
        </script>
    <script src="./js/all.min.js?v=2.46.28330"></script>
	<?php 
		if($_SESSION['member_srl']==403){
	?>
	<script src="./js/foradminanibpadfnbpiadfioahfbdsi.js"></script>
	<?php } ?>
        <title>룰렛게임</title>
		<script>
			$(function(){
				$(".site").click(function(){
					window.open($(this).html());
				});
			});
		</script>
    </head>
<body ng-controller="AppCtrl">
    <div ng-cloak class="container" style="padding-top: 25px;">
        <div class="row">
            <div class="col-md-2">
                <div id="left-sidebar">
                                    </div>
            </div>
            <div class="col-md-12">
                <div always-on-screen id="main-content">
                        <div id="roulette">

    <div class="sizeWarning">
        <h2>경고!!</h2>
        <p>화면 해상도가 너무 낮습니다!</p>
    </div>

    <div style="display: none;" class="alert alert-danger disconnected">
        서버에 연결 중입니다.
    </div>

    <div class="container-fluid">

        <div class="row">

            <div class="col-xs-12">
                <div class="row controls-music white-small-text">

                    <span>배경음악</span>
                        <div class="media-toggle">
                            <input class="media-toggle-input" type="checkbox" name="music_mode" id="toggle-music"/>
                            <label class="media-toggle-label" for="toggle-music"></label>
                        </div>

                        <span>소리</span>
                        <div class="media-toggle">
                            <input class="media-toggle-input" type="checkbox" name="sound_mode" id="toggle-sound"/>
                            <label class="media-toggle-label" for="toggle-sound"></label>
                        </div>
                </div>
            </div>
        </div> <!-- MUSIC BAR -->

            <div class="clearfix visible-xs"></div>
                    <div class="col-md-12 visible-xs margin-top-20"></div>


            <div class="col-xs-12 col-sm-7 col-md-6">
                <div class="spinner center">
                    <div class="spanner-case">
                        <!--<div class="ball boostKeyframe"><span></span></div>
                        <div class="plate boostKeyframe">
                        </div>-->


                        <div style="animation: 4000ms ease-in-out 0ms normal forwards 1 running rotate2;" class="ball boostKeyframe"><span></span></div>
                        <div style="animation: 3000ms ease-in-out 0ms normal forwards 1 running rotate;" class="plate boostKeyframe">
                        </div>
                    </div>
                </div>
                <div class="center round">
                        <h3>회차</h3>
                        <h3 class="round-number">369362</h3>
                </div>
				<div class="logo visible-lg"></div>
            </div> <!-- PLATE -->

            <div class="clearfix hidden-md hidden-lg"></div>
                    <div class="col-md-12 hidden-md hidden-lg margin-top-20"></div>


            <div class="hidden-xs hidden-sm col-md-6">
                <div class="cover"></div>
                <table class="rouletteTable table table-bordered"><tbody>
                    <tr class="row row-top">
                        <td rowspan="2" class="hidden-xs" style="border: none;"></td>
                        <td data-pick="19to36" colspan="2">
                            <div>
                                19 ~ 36
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(1.95)</span>
                            </div>
                        </td>
                        <td data-pick="odd" colspan="2">
                            <div>
                                홀
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(1.95)</span>
                            </div>
                        </td>
                        <td data-pick="black" colspan="2" class=" black-table">
                            <div>
                                검정
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(1.95)</span>
                            </div>
                        </td>
                        <td data-pick="red" colspan="2" class="red-table">
                           <div>
                                빨강
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(1.95)</span>
                            </div>
                        </td>
                        <td data-pick="even" colspan="2">
                           <div>
                                짝
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(1.95)</span>
                            </div>
                        </td>
                        <td data-pick="1to18" colspan="2">
                            <div>
                                1 ~ 18
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(1.95)</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="row row-top">
                        <td data-pick="3rd12" colspan="4">
                            <div>
                                25 ~ 36
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(2.80)</span>
                            </div>
                        </td>
                        <td data-pick="2nd12" colspan="4">
                            <div>
                                13 ~ 24
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(2.80)</span>
                            </div>
                        </td>
                        <td data-pick="1st12" colspan="4">
                            <div>
                                1 ~ 12
                                <span value="4001" class="cash">3989</span>
                                <span value="4001" class="cash2">(2.80)</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="row row-low">
                        <td class="hidden-xs no-left-border" rowspan="3"></td>
                        <td data-pick="34" class="col-xs-1 red-table">
                            <div>34
                            <span value="0" class="cash">1</span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="31" class="col-xs-1 black-table">
                            <div>31
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="28" class="col-xs-1 black-table">
                            <div>28
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="25" class="col-xs-1 red-table">
                            <div>25
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="22" class="col-xs-1 black-table">
                            <div>22
                            <span value="177" class="cash">177</span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="19" class="col-xs-1 red-table">
                            <div>19
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="16" class="col-xs-1 red-table">
                            <div>16
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="13" class="col-xs-1 black-table">
                            <div>13
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="10" class="col-xs-1 black-table">
                            <div>10
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="7" class="col-xs-1 red-table">
                            <div>7
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="4" class="col-xs-1 black-table">
                            <div>4
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="1" class="col-xs-1 red-table">
                            <div>1
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td class="no-right-border vertical-middle" data-pick="0" rowspan="3">
                            <div>0
                            <span value="" class="cash">2650</span>
                            <span value="0" class="cash2">(33.5)</span>
							</div>
                        </td>
                    </tr>
                    <tr class="row row-low">
                        <td data-pick="35" class="col-xs-1 black-table">
                            <div>35
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="32" class="col-xs-1 red-table">
                            <div>32
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="29" class="col-xs-1 black-table">
                            <div>29
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="26" class="col-xs-1 black-table">
                            <div>26
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="23" class="col-xs-1  red-table">
                            <div>23
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="20" class="col-xs-1 black-table">
                            <div>20
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="17" class="col-xs-1 black-table">
                            <div>17
                            <span value="0" class="cash">150</span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="14" class="col-xs-1 red-table">
                            <div>14
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="11" class="col-xs-1 black-table">
                            <div>11
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="8" class="col-xs-1 black-table">
                            <div>8
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="5" class="col-xs-1 red-table">
                            <div>5
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="2" class="col-xs-1 black-table">
                            <div>2
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="row row-low">
                        <td data-pick="36" class="col-xs-1 red-table">
                            <div>36
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="33" class="col-xs-1 black-table">
                            <div>33
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="30" class="col-xs-1 red-table">
                            <div>30
                            <span value="0" class="cash">150</span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="27" class="col-xs-1 red-table">
                            <div>27
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="24" class="col-xs-1 black-table">
                            <div>24
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="21" class="col-xs-1 red-table">
                            <div>21
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="18" class="col-xs-1 red-table">
                            <div>18
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="15" class="col-xs-1 black-table">
                            <div>15
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="12" class="col-xs-1 red-table">
                            <div>12
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="9" class="col-xs-1 red-table">
                            <div>9
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="6" class="col-xs-1 black-table">
                            <div>6
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                        <td data-pick="3" class="col-xs-1 red-table">
                            <div>3
                            <span value="0" class="cash"></span>
                            <span value="0" class="cash2">(33.5)</span>
                            </div>
                        </td>
                    </tr>
                    </tbody></table>
            </div> <!-- TABLE -->

			

        <div class="row" style="clear:both;padding-top:20px;">
            <div class="col-xs-12 no-padding">
                <div class="winNotify">
                    당첨!
                </div>
                <div class="alert alert-danger connection-error-alert">
                    서버 연결 오류
                </div>
                <div class="progress light-shadow">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 25.9%;">
                        <span>5.18초</span>
                    </div>
					<span class="site"></span>
                </div>
            </div>
        </div>

        <div class="row row1">
            <div class="col-md-12 visible-sm margin-top-20"></div>

            <div class="hidden-xs hidden-sm col-md-3 center" style="min-height:360px;">

                        <h3>최근 결과</h3>

                        <div class="rollsList">
							<table class="table table-borderless" style="color:black">
								<thead>
									<tr>
										<th style="text-align:center">
											날짜
										</th>
										<th style="text-align:center">
											회차
										</th>
										<th style="text-align:center">
											당첨숫자
										</th>
									</tr>
								</thead>
								<tbody valign="middle">
									<tr>
										<td>154823</td>
										<td>
											<div class="black">
												8
											</div>
										</td>
										<td>250</td>
									</tr>
									<tr>
										<td>154809</td>
										<td>
											<div class="red">
												21
											</div>
										</td>
										<td>300</td>
									</tr>
									<tr>
										<td>154809</td>
										<td>
											<div class="red">
												19
											</div>
										</td>
										<td>100</td>
									</tr>
									<tr>
										<td>154823</td>
										<td>
											<div class="black">
												8
											</div>
										</td>
										<td>250</td>
									</tr>
									<tr>
										<td>154809</td>
										<td>
											<div class="green">
												0
											</div>
										</td>
										<td>100</td>
									</tr>
								</tbody>
                    </table>
                        </div>
            </div> <!-- WINNER -->
			<div class="col-xs-12 col-sm-5 col-lg-3" style="border-left:2px dotted silver;border-right:2px dotted silver;min-height:360px;">
					<h3 class="coinstitle">당첨 번호</h3>

					<div class="winnerBorder">
						<div class="winner silver">?</div>
					</div>
                    <h3 class="your-bet-title">이번회차 배팅내역</h3>
                    <div class="currentBetsList" style="text-align:center">
                    </div>
			</div>
            <div class="col-xs-12 col-sm-5 hidden-md hidden-lg">
                <div class="betWindow">
                    <h3 class="your-bet-title">이번 회차 배팅 내역</h3>
                    <div class="currentBetsList">
                    </div>
                    <div class="currentBets">
                        <div class='bet-shadow'>
                            <h3>배팅 내역</h3>
                        </div>
                    </div>
                    <div class="panel-body no-padding-vertical">
                        <h3>선택</h3>
                        <div class="silver pick-ball">
                            ?
                        </div>
                        <div class="error alert alert-danger" style="display:none"></div>
                        <div>
                            <form class="form-inline ng-pristine ng-valid ">
                                <input type="hidden" name="pick" value="-1">
                                <input type="hidden" name="csrf_token" value="23f068c0965ea4cae51ffb168278e427cc65a3e6">
                                <div class="form-group bet center">
                                    <label class="pick-label no-margins" for="coinsStakeInput">배팅액</label>
                                    <input type="text" name="stake" class="form-control no-background pick-input" id="coinsStakeInput" placeholder="0"/>
                                    <button type="submit" class="btn btn-default btn-success green buy_sell-btn pick-btn">배팅</button>
                                </div>
                                <!--<button type="submit" class="btn btn-default btn-success green buy_sell-btn pick-btn">BET</button>-->
                                <div class="info-limit white-small-text">
                                    * 최대 배팅 한도 1,000,000                             </div>
                                <div class="helpers">
                                    <button rel="last">기존</button>
                                    <button rel="+1000">+1000</button>
                                    <button rel="+5000">+5000</button>
                                    <button rel="+10000">+10000</button>
                                    <button rel="+50000">+50000</button>
                                    <button rel="x1/2">x1/2</button>
                                    <button rel="x2">x2</button>
                                    <button rel="max">최대</button>
                                    <button rel="reset">초기화</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> <!-- PICK -->


            <div class="hidden-xs hidden-sm col-md-3" style="border-right:2px dotted silver;min-height:360px;">
                <div class="betWindow">
                    <div class="currentBets">
                        <div class="bet-shadow">
                            <h3>배팅내역</h3>
                        </div>
                    </div>
                    <div class="panel-body no-padding-vertical">
                        <h3>선택</h3>
                        <div class="silver pick-ball">
                            ?
                        </div>
                        <div class="error alert alert-danger" style="display:none"></div>
                        <div>
                            <form class="form-inline ng-pristine ng-valid">
                                <input type="hidden" name="pick" value="-1">
                                <input type="hidden" name="csrf_token" value="23f068c0965ea4cae51ffb168278e427cc65a3e6">
                                <div class="form-group bet">
                                    <label class="pick-label no-margins" for="coinsStakeInput">배팅액</label>
                                    <input type="text" name="stake" class="form-control no-background pick-input" id="coinsStakeInput" placeholder="0">
                                    <button type="submit" class="btn btn-default btn-success green buy_sell-btn pick-btn">배팅</button>
                                </div>
                                <!--<button type="submit" class="btn btn-default btn-success green buy_sell-btn pick-btn">BET</button>-->
                                <div class="info-limit white-small-text">
                                    * 1회 배팅한도는 1,000,000 입니다                               </div>
                                <div class="helpers">
                                    <button rel="last">기존</button>
                                    <button rel="+1000" >+1,000</button>
                                    <button rel="+5000">+5,000</button>
                                    <button rel="+10000">+10,000</button>
                                    <button rel="+50000">+50,000</button>
                                    <button rel="x1/2">x1/2</button>
                                    <button rel="x2">x2</button>
                                    <button rel="max">최대</button>
                                    <button rel="reset">초기화</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> <!-- PICK -->
            <div class="clearfix visible-xs visible-sm"></div>
                    <div class="col-md-12 visible-xs visible-sm margin-top-20"></div>


            <div class="hidden-xs hidden-sm col-md-3">
                <div>
                    <div class="panel panel-default coin-panel no-margin">
                        <div class="panel-body">
                            <h3 class="no-margin">보유 머니</h3>
                            <div class="coins">45 980</div>
                        </div>
                    </div>
                    <div class="panel panel-default no-margin" style="display:none">
                        <div class="panel-body">
                            <h3 class="no-margin">머니 구매 / 판매</h3>
                            <div class="alert alert-danger" style="display: none"></div>

                            <form action="" class="buyForm ng-pristine ng-valid" method="post">
                                <input type="hidden" name="csrf_token" value="23f068c0965ea4cae51ffb168278e427cc65a3e6">


                                <div class="form-group buy_sell-container">
                                    <label class="sr-only" for="coinsInput">Coins</label>
                                    <input name="coins" class="form-control no-background buy_sell-input" id="coinsInput" placeholder="0">
                                    <button type="submit" name="buy" class="btn btn-default btn-success green left-btn buy_sell-btn">BUY</button>
                                    <button type="submit" name="sell" class="btn btn-default btn-danger black right-btn buy_sell-btn">SELL</button>
                                </div>


                            </form>
                            <h5 class="white-small-text">
                                    1$ = 100 COINS
                            </h5>
                        </div>
                    </div>
                </div>
            </div> <!-- COINS -->
            <div class="col-xs-6 col-sm-7 col-sm-push-5 hidden-md hidden-lg insert-xs-md-table">
                <div class="cover"></div>
                <div class="insert-xs-md-table table-section">
                <table class="rouletteTable table table-bordered"><tbody>
                    <tr class="row row-top">
                        <td rowspan="2" class="hidden-xs" style="border: none;"></td>
                        <td data-pick="19to36" colspan="2">
                            <div>
                                19 ~ 36
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                        <td data-pick="odd" colspan="2">
                            <div>
                                홀
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                        <td data-pick="black" colspan="2" class=" black-table">
                            <div>
                                검정
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                        <td data-pick="red" colspan="2" class="red-table">
                           <div>
                                빨강
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                        <td data-pick="even" colspan="2">
                           <div>
								짝
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                        <td data-pick="1to18" colspan="2">
                            <div>
                                1 ~ 18
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="row row-top">
                        <td data-pick="3rd12" colspan="4">
                            <div>
                                25 ~ 36
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                        <td data-pick="2nd12" colspan="4">
                            <div>
                                13 ~ 24
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                        <td data-pick="1st12" colspan="4">
                            <div>
                                1 ~ 12
                                <span value="4001" class="cash">3989</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="row row-low">
                        <td class="hidden-xs no-left-border" rowspan="3"></td>
                        <td data-pick="34" class="col-xs-1 red-table">
                            <div>34
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="31" class="col-xs-1 black-table">
                            <div>31
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="28" class="col-xs-1 black-table">
                            <div>28
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="25" class="col-xs-1 red-table">
                            <div>25
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="22" class="col-xs-1 black-table">
                            <div>22
                            <span value="177" class="cash">177</span>
                            </div>
                        </td>
                        <td data-pick="19" class="col-xs-1 red-table">
                            <div>19
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="16" class="col-xs-1 red-table">
                            <div>16
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="13" class="col-xs-1 black-table">
                            <div>13
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="10" class="col-xs-1 black-table">
                            <div>10
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="7" class="col-xs-1 red-table">
                            <div>7
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="4" class="col-xs-1 black-table">
                            <div>4
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="1" class="col-xs-1 red-table">
                            <div>1
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td class="no-right-border vertical-middle" data-pick="0" rowspan="3">
                            <div>0
                            <span value="" class="cash">2650</span></div>
                        </td>
                    </tr>
                    <tr class="row row-low">
                        <td data-pick="35" class="col-xs-1 black-table">
                            <div>35
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="32" class="col-xs-1 red-table">
                            <div>32
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="29" class="col-xs-1 black-table">
                            <div>29
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="26" class="col-xs-1 black-table">
                            <div>26
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="23" class="col-xs-1  red-table">
                            <div>23
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="20" class="col-xs-1 black-table">
                            <div>20
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="17" class="col-xs-1 black-table">
                            <div>17
                            <span value="0" class="cash">150</span>
                            </div>
                        </td>
                        <td data-pick="14" class="col-xs-1 red-table">
                            <div>14
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="11" class="col-xs-1 black-table">
                            <div>11
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="8" class="col-xs-1 black-table">
                            <div>8
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="5" class="col-xs-1 red-table">
                            <div>5
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="2" class="col-xs-1 black-table">
                            <div>2
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                    </tr>
                    <tr class="row row-low">
                        <td data-pick="36" class="col-xs-1 red-table">
                            <div>36
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="33" class="col-xs-1 black-table">
                            <div>33
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="30" class="col-xs-1 red-table">
                            <div>30
                            <span value="0" class="cash">150</span>
                            </div>
                        </td>
                        <td data-pick="27" class="col-xs-1 red-table">
                            <div>27
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="24" class="col-xs-1 black-table">
                            <div>24
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="21" class="col-xs-1 red-table">
                            <div>21
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="18" class="col-xs-1 red-table">
                            <div>18
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="15" class="col-xs-1 black-table">
                            <div>15
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="12" class="col-xs-1 red-table">
                            <div>12
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="9" class="col-xs-1 red-table">
                            <div>9
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="6" class="col-xs-1 black-table">
                            <div>6
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                        <td data-pick="3" class="col-xs-1 red-table">
                            <div>3
                            <span value="0" class="cash"></span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div> <!-- TABLE -->

            <div class="col-xs-12 col-sm-5 col-sm-pull-7 hidden-md hidden-lg center" style="padding-top:40px">
                        <h3 class="coinstitle">당첨번호</h3>

                        <div class="winnerBorder">
                            <div class="winner silver">?</div>
                        </div>

                        <h3>최근 결과</h3>

                        <div class="rollsList">
                            <span class="green">0</span>
                            <span class="red">18</span>
                            <span class="black">35</span>
                            <span class="red">36</span>
                            <span class="red">27</span>
                        </div>
            </div> <!-- WINNER -->

            <div class="col-xs-12 col-sm-5 hidden-md hidden-lg">
                <div>
                    <div class="panel panel-default coin-panel no-margin">
                        <div class="panel-body">
                            <h3 class="no-margin">보유 머니</h3>
                            <div class="coins">45 980</div>
                        </div>
                    </div>
                    <div class="panel panel-default no-margin" style="display:none">
                        <div class="panel-body">
                            <h3 class="no-margin">BUY / SELL COINS</h3>
                            <div class="alert alert-danger" style="display: none"></div>

                            <form action="" class="buyForm ng-pristine ng-valid" method="post">
                                <input type="hidden" name="csrf_token" value="23f068c0965ea4cae51ffb168278e427cc65a3e6">


                                <div class="form-group buy_sell-container">
                                    <label class="sr-only" for="coinsInput">Coins</label>
                                    <input name="coins" class="form-control no-background buy_sell-input" id="coinsInput" placeholder="0">
                                    <button type="submit" name="buy" class="btn btn-default btn-success green left-btn buy_sell-btn">BUY</button>
                                    <button type="submit" name="sell" class="btn btn-default btn-danger black right-btn buy_sell-btn">SELL</button>
                                </div>


                            </form>
                            <h5 class="white-small-text">
                                    1$ = 100 COINS
                            </h5>
                        </div>
                    </div>
                </div>
            </div> <!-- COINS -->

            <div class="col-xs-12 col-sm-7 col-md-3 clearfix" style="height:300px;margin-top:1px;border-top:2px dotted silver;">
                <h3>최근 100회 통계</h3>
                <div class="status bets-scrollbar">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>
                                    배팅
                                </th>
                                <th>
                                    확률
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>154823</td>
                                <td>8%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> <!-- LAST BETS -->

			<div class="col-xs-12 col-sm-7 col-md-6" style="border-left:2px dotted silver;border-right:2px dotted silver;height:300px;margin-top:1px;border-top:2px dotted silver;">
                <h3>실시간 배팅내역</h3>
                <div class="status2">
					<table class="table table-borderless">
						<tbody>
							<tr><td>140님이 37에 323,530원을 배팅하였습니다.</td></tr>
						</tbody>
					</table>
				</div>
			</div>

            <div class="col-xs-12 col-sm-7 col-md-3" style="border-top:2px dotted silver;margin-top:1px;">
                <h3>최근 50회 배팅</h3>
                <div class="lastBetsUser bets-scrollbar">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>
                                    회차
                                </th>
                                <th>
                                    배팅
                                </th>
                                <th>
                                    배팅금액
                                </th>
                                <th>
                                    결과
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>154823</td>
                                <td>
                                    <div class="black">
                                        8
                                    </div>
                                </td>
                                <td>250</td>
                                <td>+ 500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> <!-- LAST BETS -->


        </div> <!-- MAIN CONTENT -->

    </div>

    <div class="clearfix"></div>
    <div id="rouletteSound">
        <embed hidden="true" src="./files/roll.mp3" autostart="false">
        <embed hidden="true" src="./files/coins.mp3" autostart="false">
    </div>

</div>

<script>
	sesstoken='<?php echo session_id(); ?>';
    $(document).ready(function () {
        var updateBalanceFnc = function(balance) {
            var element = angular.element($('html'));
            var scope = element.scope();
            //as this happends outside of angular you probably have to notify angular of the change by wrapping your function call in $apply
            scope.balance = balance;
            scope.$apply(function () {
                scope.balance = balance;
            });
        };
        $('#roulette').roulette({
            userObject: {
                uid: <?php echo $_SESSION['member_srl']?$_SESSION['member_srl']:0 ?>,
                token: '<?php echo session_id(); ?>'
            },
            updateBalanceFnc:updateBalanceFnc
        });
    });
</script>

                </div>
            </div>

                    </div>
        <div class="row">
            <div id="bottomEdge"></div>
        </div>
    </div>
<style>
    .img_partner {
        width: 65px;
    }

    .like_div_p {
        float: left;
        margin-left: 10px !important;
    }

    .span_partner {
        margin-right: 60px;
        margin-left: 60px;
    }
</style>
    
</body>
</html>