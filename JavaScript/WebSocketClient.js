
var networkList_receiveList =[
		["ST501","ST502","ST503","ST504","ST505","ST506","ST507","ST508","ST509","ST510","ST511","ST512","ST513"],
		["ST514","ST515","ST516","ST517","ST518","ST519","ST520","ST521","ST522","ST523","ST524","ST525","ST526","ST527"],
		["ST528","ST529","ST530","ST531","ST532","ST533","ST534","ST535","ST536","ST537","ST538","ST539"],
		["ST540","ST541","ST542","ST543"],
		["ST601","ST602"],
		["ST603"],
		["ST701","ST702"],
		["ST703","ST704"],
		["ST705","ST706"],
		["ST707","ST708","ST709"],
		["ST801"]
		];

var selected_group=0 ;
var stop_auto_query=false;
var received_msg="" ;
var selected_station="";
var upsNetworkInfo_local;
var local_station;
function wait(msecs)
{
	var start = new Date().getTime();
	var cur = start;
	while(cur - start < msecs)
	{
	cur = new Date().getTime();
	}
}

var send_command="UPS_LOG";	



var log_code = {
		   11:'배터리로그',
		   12:'컨버터상태',
		   13:'인버터상태',
		   14:'컨버터작동',
		   15:'인버터작동',
	   };
var log_code_battery_state ={
		0 : 'BMS1 축전지 저전압 이상',				
		1 : 'BMS1 축전지 과전압 이상',				
		2 : 'BMS1 충전 과전류 이상',				
		3 : 'BMS1 방전 과전류 이상',				
		4 : 'BMS1 과온도 이상',				
		5 : 'MBS1 축전지 잔량 이상',				
		6 : 'BMS1 퓨즈 소손'	,
		7 : '',
		8 : 'BMS2 축전지 저전압 이상',				
		9 : 'BMS2 축전지 과전압 이상',				
		10 : 'BMS2 충전 과전류 이상',				
		11 : 'BMS2 방전 과전류 이상',				
		12 : 'BMS2 과온도 이상',			
		13 : 'MBS2 축전지 잔량 이상',				
		14 : 'BMS2 퓨즈 소손',
		15 :''
}
/* 
 *  0EC5  0000 1110 1100 0101
 *  
 */
var log_code_Converter_State ={
		0 : '충전기 퓨즈 이상(1)',				
		1 : '',				
		2 : '충전기 과열 이상(1)',				
		3 : 'Output_NFB 열림',				
		4 : 'Input_NFB  열림',				
		5 : 'Battery_NFB 열림',				
		6 : 'Converter_OC'	,
		7 : 'Battery_OV',
		8 : 'Emergency_FAULT',				
		9 : 'Converter_R_GDU',				
		10 : 'Converter_S_GDU',				
		11 : 'Converter_T_GDU',				
		12 : 'CONVERTER 중지',			
		13 : 'INVERTER 중지',				
		14 : 'INVERTER TRANSFER 중지',
		15 :''
}
/*0x1D E3   0001 1101 1110 0011    */
var log_codeInverter_State ={
		0 : '',				
		1 : '인버터퓨즈이상',				
		2 : '배터리휴즈이상',				
		3 : '바이패스차단기 열림',				
		4 : '',				
		5 : '인버터과열',				
		6 : '바이패스과열'	,
		7 : '인버터과전류',
		8 : '배터리 저전압',				
		9 : 'Slave Aux-Power Fault',				
		10 :'Inverter_R_GDU',				
		11 :'Inverter_S_GDU',				
		12 :'Inverter_T_RGDU',			
		13 :'CANA ERR',				
		14 :'CANB ERR',
		15 :''
}
var log_Converter_Operation_Fault ={
		0 : '배터리 차단기 이상',				
		1 : '컨버터 전류제한 이상',				
		2 : '배터리 전류제한 이상',				
		3 : '배터리 과전압 제한 이상',				
		4 : '배터리 저전압 제한 이상',				
		5 : '입력상회전 이상',				
		6 : '입력저전압 이상',
		7 : '입력과전압 이상',
		8 : '입력로직 이상',				
		9 : '입력 주파수 이상',				
		10 :'입력 비동기 이상',				
		11 :'정전',				
		12 :'입력 M/C이상',			
		13 :'입력 상결상',				
		14 :'복전',
		15 :'',
}
var log_Inverter_Operation_Fault ={
		0 : '인버터 M/C이상',				
		1 : '인버터과부하 정지',				
		2 : '인버터출력전압이상',				
		3 : '',				
		4 : '바이패스주파수이상',				
		5 : '바이패스상회전이상',				
		6 : '바이패스저전압이상',
		7 : '바이패스과전압이상',
		8 : '인버터비동기이상',				
		9 : '출력과부하',				
		10 :'유지부수차단기이상',				
		11 :'인버터운전',				
		12 :'',			
		13 :'Slave1 output M/C fault',				
		14 :'Slave2 output M/C fault',
		15 :'',
}

var data_select_from_menu=false;

var interval_value ;

function getSelectGroup()
{
	var weapon = document.getElementsByName("weapon");
	for (i = 0; i < weapon.length; i++){
		currentWeapon = weapon[i];
		if (currentWeapon.checked){
			return i;
			
		} 
	} 

}
function selectRadioBox()
{
	selected_group = 0;
	var weapon = document.getElementsByName("weapon");
	for (i = 0; i < weapon.length; i++){
		currentWeapon = weapon[i];
		if (currentWeapon.checked){
			selected_group = i;
			onBodyLoadEvent();
			
		} 
	} 
}

function autoQuery()
{
	data_select_from_menu = false;
	if( (document.getElementById("start_button")).value == '자동검색시작' )
	{
		console.log((document.getElementById("start_button")).value);
		(document.getElementById("start_button")).value = '자동검색중';
		(document.getElementById("start_button")).value.blink();
        (document.getElementById("start_button")).style.backgroundColor=  "#00ff00";
        stop_auto_query = false;
		myfunction();
	}
	else 
	{
		stop_auto_query = true;
		(document.getElementById("start_button")).value = '자동검색시작';
		(document.getElementById("start_button")).style.backgroundColor=  "#dbfff4";
		clearInterval(interval_value);
	}
}


/*
오류코드 정의
 	if(upsModeBusData.Converter_State & 0x0EC5 )
		writeLog(systemTime,12, upsModeBusData.Converter_State);		// 12 Converter_State
	if(upsModeBusData.Inverter_State & 0x1DE3)
		writeLog(systemTime,13, upsModeBusData.Inverter_State);			// 13 Converter_State
	if(upsModeBusData.Converter_Operation_Fault & 0x3BDE)
		writeLog(systemTime,14, upsModeBusData.Converter_Operation_Fault);	// 14 Converter_Operation_Fault
	if(upsModeBusData.Inverter_Operation_Fault &  0x07D5)
	writeLog(systemTime,15, upsModeBusData.Inverter_Operation_Fault);	// 15 Inverter_Operation_Fault
 */


function change_image_status(normal)
{
		var str_id ="stationImg_"+ selected_station;
		if(!normal)
		{
																	   
			document.getElementById(str_id).src="../img/trainHead_fault.png";
		}
		else
		{
			
			document.getElementById(str_id).src="../img/trainHead_normal.png";
		}
}


function change_image_status_all()
{
	for(var i=0; i< networkList_receiveList[selected_group].length; i++)
	{
		

		var str_id ="stationImg_"+ StationAndUpsInfo[networkList_receiveList[selected_group][i]].station_code;
		if( StationAndUpsInfo[networkList_receiveList[selected_group][i]].Converter_Operation_Fault & 0x3BDE )
		{
			document.getElementById(str_id).src="../img/trainHead_fault.png";
		}
		else
		{
			document.getElementById(str_id).src="../img/trainHead_normal.png";
		}	
	}
}


function selectStation_1()
{
	station = 'ST501';
	selectStation(station)
}


function selectStation(station)
{
	console.log(station);
	
	selected_station = station;
	local_station  = StationAndUpsInfo[station];
	
	(document.getElementById("main_title")).innerHTML="서울교통공사 UPS관리시스템(" + local_station.station_name + ")";
	console.log("local_station.station_name:"+ selected_station);
	console.log("local_station.station_name:"+ local_station.station_name);
	var connect_str ='ws://'+ upsNetworkInfo_local[station].ipaddress+':80/echo' ;
	clearDataField_toWeb();
	data_select_from_menu = true;
	getWinsockUpsDatafunction(connect_str,'UPS_DATA');
}

function moveUrl(station)
{
	var newwindow = window.open("UpsSetup_Network.HTML?station_name="+selected_station);
	//newdocument=newwindow.document;
	//var text = newdocument.getElementById("content");
	//console.log(newdocument);
	//text.innerHTML = "<BR>"+ "GOOD"+ "<BR>" ;
	
	//var myWindow = window.open("");   // Opens a new window
	//myWindow.document.write("<p>A new window!</p>");         // Some text in the new window
	//myWindow.focus();  	
}

function BIT(num)
{
	return	(0x00000001 << num);
}

function resset()
{
	StationAndUpsInfo[selected_station].Converter_State =0;
	StationAndUpsInfo[selected_station].Inverter_State =  0;									//13
	StationAndUpsInfo[selected_station].Converter_Operation_Fault =   0;
	StationAndUpsInfo[selected_station].Inverter_Operation_Fault =  0;
}

function myfunction12_4()
{
	console.log("selected_station"+selected_station);


	
	if(StationAndUpsInfo[selected_station].Converter_State )
		StationAndUpsInfo[selected_station].Converter_State = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Converter_State = 0xffff & 1 << 4;				//테스트 12-4

	parse_error_code_for_upsDiagram();
}
function myfunction13_3()
{
	console.log("selected_station"+selected_station);
	if(StationAndUpsInfo[selected_station].Inverter_State )
		StationAndUpsInfo[selected_station].Inverter_State = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Inverter_State = 0xffff & 1 << 3;				//테스트 12-4
	parse_error_code_for_upsDiagram();
}
function myfunction15_10()
{
	console.log("selected_station"+selected_station);
	if(StationAndUpsInfo[selected_station].Inverter_Operation_Fault )
		StationAndUpsInfo[selected_station].Inverter_Operation_Fault = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Inverter_Operation_Fault = 0xffff & 1 << 10;				//테스트 12-4
	parse_error_code_for_upsDiagram();
}
function myfunction12_3()
{
	console.log("selected_station"+selected_station);
	if(StationAndUpsInfo[selected_station].Converter_State )
		StationAndUpsInfo[selected_station].Converter_State = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Converter_State = 0xffff & 1 << 3;				//테스트 12-4
	parse_error_code_for_upsDiagram();
}
function myfunction14_11()
{
	console.log("selected_station"+selected_station);
	if(StationAndUpsInfo[selected_station].Converter_Operation_Fault )
		StationAndUpsInfo[selected_station].Converter_Operation_Fault = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Converter_Operation_Fault = 0xffff & 1 << 11;				//테스트 12-4
	parse_error_code_for_upsDiagram();
}
function myfunction12_12()
{
	console.log("selected_station"+selected_station);
	if(StationAndUpsInfo[selected_station].Converter_State )
		StationAndUpsInfo[selected_station].Converter_State = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Converter_State = 0xffff & 1 << 12;				//테스트 12-4
	parse_error_code_for_upsDiagram();
}
function myfunction12_5()
{
	console.log("selected_station"+selected_station);
	if(StationAndUpsInfo[selected_station].Converter_State )
		StationAndUpsInfo[selected_station].Converter_State = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Converter_State = 0xffff & 1 << 5;				//테스트 12-4
	parse_error_code_for_upsDiagram();
}
function myfunction12_13()
{
	console.log("selected_station"+selected_station);
	if(StationAndUpsInfo[selected_station].Converter_State )
		StationAndUpsInfo[selected_station].Converter_State = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Converter_State = 0xffff & 1 << 13;				//테스트 12-4
	parse_error_code_for_upsDiagram();
}
function myfunction12_14()
{
	console.log("selected_station"+selected_station);
	if(StationAndUpsInfo[selected_station].Converter_State )
		StationAndUpsInfo[selected_station].Converter_State = 0;				//테스트 12-4
	else
		StationAndUpsInfo[selected_station].Converter_State = 0xffff & 1 << 14;				//테스트 12-4
	parse_error_code_for_upsDiagram();
}


function EventWindow(eventString)
{
}

function myfunction()
{
	selected_group = getSelectGroup();
	selected_station = networkList_receiveList[selected_group][0];
	
	var connect_str ='ws://'+ upsNetworkInfo_local[selected_station].ipaddress+':80/echo' ;
	myfuncGen = getWinsockResponse(connect_str,'UPS_DATA');
	myfunction_timer();
	
}


function parse_error_code_for_upsDiagram()
{


	//parseInt(mac_address[0]).toString(16)+"."+
	local_station  = StationAndUpsInfo[selected_station];
	console.log("12:0x"+parseInt(StationAndUpsInfo[selected_station].Converter_State).toString(16));
	console.log("13:0x"+parseInt(StationAndUpsInfo[selected_station].Inverter_State).toString(16));
	console.log("14:0x"+parseInt(StationAndUpsInfo[selected_station].Converter_Operation_Fault).toString(16));
	console.log("15:0x"+parseInt(StationAndUpsInfo[selected_station].Inverter_Operation_Fault).toString(16));

	if(  StationAndUpsInfo[selected_station].Year_made  == 0 ) return;

	//StationAndUpsInfo[selected_station].Inverter_State = 0xffff  & 1 << 3;
	clear();
	if(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 4) ){			sw_2('ON');  change_image_status(true);}// 12,4 if 1 -> red INPUT_NFB
	else 																		{			sw_2('OFF'); change_image_status(false);}//		0    -> blue

	if(StationAndUpsInfo[selected_station].Inverter_State & (0xffff & 1 << 3) )	{			sw_3('ON'); change_image_status(true); } 
	else 																		{			sw_3('OFF');change_image_status(false);  }

	//StationAndUpsInfo[selected_station].Inverter_Operation_Fault = 0xffff  & 1 << 10;
	if( (StationAndUpsInfo[selected_station].Inverter_Operation_Fault & (0xffff & 1 << 10) )){	sw_4('ON'); change_image_status(false); }
	else 																					 {	sw_4('OFF'); change_image_status(true);} 

	//StationAndUpsInfo[selected_station].Converter_State = 0xffff  & 1 << 3;
	if(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 3) )			{sw_11('ON');change_image_status(true);}  
	else 																					{sw_11('OFF'); change_image_status(false);}

	//StationAndUpsInfo[selected_station].Converter_State = 0xffff  & 1 << 5;
	if(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 5) )			{sw_13('ON'); change_image_status(true); }
	else 																					{sw_13('OFF');change_image_status(false);} 

	//StationAndUpsInfo[selected_station].Converter_Operation_Fault = 0xffff  & 0 << 11;
	if(!(StationAndUpsInfo[selected_station].Converter_Operation_Fault & (0xffff & 1 << 11) ))	{draw_1('red');change_image_status(false);  }
	else 																						{draw_1('green');change_image_status(true); }

	//draw_15('green')
	//StationAndUpsInfo[selected_station].Converter_Operation_Fault = 0xffff  & 0 << 11;
	if(!(StationAndUpsInfo[selected_station].Converter_Operation_Fault & (0xffff & 1 << 11)) && 
		StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 4)
	)																						{draw_15('red');}  
	else 																					{draw_15('green');} 

	//StationAndUpsInfo[selected_station].Converter_State = 0xffff  & 1 << 12;
	if(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 12) )			{converterONOFF('ON');change_image_status(true);}  
	else 																					{converterONOFF('OFF');change_image_status(false);} 

	if(	StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 12) || 
		StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 5)
	)																						{draw_16('red');  }
	else 																					{draw_16('green');}
	//inverterONOFF('OFF');	
	//StationAndUpsInfo[selected_station].Converter_State = 0xffff  & 1 << 13;
	if(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 13) )			{inverterONOFF('ON');}  
	else 																					{inverterONOFF('OFF');}

	if(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 14) ){			scr_1_ONOFF('ON');  scr_2_ONOFF('OFF'); }
	else 																		 {			scr_1_ONOFF('OFF'); scr_2_ONOFF('ON'); }

	///draw_8(
	if(!(StationAndUpsInfo[selected_station].Converter_Operation_Fault & (0xffff & 1 << 11)) &&
		StationAndUpsInfo[selected_station].Inverter_State & (0xffff & 1 << 3)	 	
	)																				{draw_8('red');  }
	else 																					{draw_8('green');}

	//scr_1_line("red");
	if(
		(	(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 13) ) && (StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 14)) ) || 
		(	!(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 14) ) && !(StationAndUpsInfo[selected_station].Converter_Operation_Fault & (0xffff & 1 << 11)) &&  (StationAndUpsInfo[selected_station].Inverter_State & (0xffff & 1 << 3))) 
	)																					{scr_1_line('red');}  
	else 																			{scr_1_line('green');}

	if(
		((((StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 13) ) && (StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 14)) ) ||
			(!(StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 14) ) && !(StationAndUpsInfo[selected_station].Converter_Operation_Fault & (0xffff & 1 << 11)) &&
				(StationAndUpsInfo[selected_station].Inverter_State & (0xffff & 1 << 3))))   &&  (StationAndUpsInfo[selected_station].Converter_State & (0xffff & 1 << 3)) ) ||
		(StationAndUpsInfo[selected_station].Inverter_Operation_Fault & (0xffff & 1 << 10) )

	)																					{draw_12('red');  }
	else 																				{draw_12('green'); }	
	//parse_error_code
	//StationAndUpsInfo[selected_station].Converter_State ;//12
	//StationAndUpsInfo[selected_station].Inverter_State ;//13
	//StationAndUpsInfo[selected_station].Converter_Operation_Fault ;//14
	//StationAndUpsInfo[selected_station].Inverter_Operation_Fault ;//15
	/*
	오류코드 정의
		if(upsModeBusData.Converter_State & 0x0EC5 )
			writeLog(systemTime,12, upsModeBusData.Converter_State);		// 12 Converter_State
		if(upsModeBusData.Inverter_State & 0x1DE3)
			writeLog(systemTime,13, upsModeBusData.Inverter_State);			// 13 Converter_State
		if(upsModeBusData.Converter_Operation_Fault & 0x3BDE)
			writeLog(systemTime,14, upsModeBusData.Converter_Operation_Fault);	// 14 Converter_Operation_Fault
		if(upsModeBusData.Inverter_Operation_Fault &  0x07D5)
		writeLog(systemTime,15, upsModeBusData.Inverter_Operation_Fault);	// 15 Inverter_Operation_Fault
		*/
	/*
	var ups_status_string=" "+selected_station+":" ;
	if(StationAndUpsInfo[selected_station].Converter_State & 0x0EC5 )
	{
		ups_status_string += parse_error_code(12,StationAndUpsInfo[selected_station].Converter_State);
		//ups_status_string += "<br />";
	}
	if(StationAndUpsInfo[selected_station].Inverter_State & 0x1DE3 )
	{
		ups_status_string += parse_error_code(13,StationAndUpsInfo[selected_station].Converter_State);
		//ups_status_string += "<br />";
	}
	if(StationAndUpsInfo[selected_station].Converter_Operation_Fault & 0x3BDE )
	{
		ups_status_string += parse_error_code(14,StationAndUpsInfo[selected_station].Converter_Operation_Fault);
		//ups_status_string += "<br />";
		//change_image_status(false);
	}
	if(StationAndUpsInfo[selected_station].Inverter_Operation_Fault & 0x07D5 )
	{
		ups_status_string += parse_error_code(15,StationAndUpsInfo[selected_station].Inverter_Operation_Fault);
		//ups_status_string += "<br />";
		//change_image_status(false);
	}
	*/
		var ups_status_string="";
		var isError=false;
		if( ((StationAndUpsInfo[selected_station].Inverter_Operation_Fault & 0x00F0) == 0) &&
			((StationAndUpsInfo[selected_station].Inverter_State & BIT(6)) == 0) &&
			((StationAndUpsInfo[selected_station].Inverter_State & BIT(3)) != 0)
		){} //정상
	else {isError=true;ups_status_string += "전원이상(BYPASS),";}

	//입력이상
	if( (StationAndUpsInfo[selected_station].Converter_Operation_Fault & 0x2EE0) == 0   ){} //정상
	else {isError=true;ups_status_string += "입력이상(정전)";}

	if(	    (StationAndUpsInfo[selected_station].Converter_State & BIT(5)) != 0 &&
		(StationAndUpsInfo[selected_station].Converter_State & BIT(7)) == 0 &&
		((StationAndUpsInfo[selected_station].Converter_Operation_Fault & 0b00011101)==0)  && /*0 2 3 4*/
		((StationAndUpsInfo[selected_station].Inverter_State & 0b100000100)==0)   /* 2 8*/
	){} //정상
	else {isError=true;ups_status_string += "배터리부이상,";}
	if( ((StationAndUpsInfo[selected_station].Converter_State			& 0b0000111111000100) == 0) &&    
		((StationAndUpsInfo[selected_station].Converter_State 			& 0b0000000000010000) != 0) &&	
		((StationAndUpsInfo[selected_station].Converter_Operation_Fault & 0b0001000100001110) == 0) 
	){} //정상
	else {isError=true;ups_status_string += "충전부이상,";}

	if( 	((StationAndUpsInfo[selected_station].Converter_State					& 0b0000000110000000) == 0) &&    
		((StationAndUpsInfo[selected_station].Converter_State 					& 0b0000000000001000) != 0) &&	
		((StationAndUpsInfo[selected_station].Inverter_State		   			& 0b0001110110100010) == 0) && 
		((StationAndUpsInfo[selected_station].Converter_Operation_Fault		    & 0b0000000000010000) == 0) &&
		((StationAndUpsInfo[selected_station].Inverter_Operation_Fault		    & 0b0000011000000111) == 0) 
	){} //정상
	else {isError=true;ups_status_string += "인버터부이상,";}

	if( 	((StationAndUpsInfo[selected_station].Converter_State					& 0b0100000000000000) != 0)     
	){} //정상
	else {isError=true;ups_status_string += "BYPASS모드";	}
	if(isError==true)
	{
		var myWindow = window.open("", "MsgWindow", "width=800,height=200");
		myWindow.document.body.style.backgroundColor = "pink";
		myWindow.focus();
		var d = new Date();
		//
		//myWindow.document.write("<input  class='mybutton' id='button' type='button' value='인쇄' onClick=''/>");
		myWindow.document.write("<p> ");
		myWindow.document.write(d.getFullYear() +"/" + (d.getMonth()+1) +"/" + d.getDate() + " " );
		myWindow.document.write(d.getHours() +":" + d.getMinutes() +":" + d.getSeconds() + " " );
		myWindow.document.write("EVENT : " + StationAndUpsInfo[selected_station].station_name+" ");
		myWindow.document.write( ups_status_string);
		myWindow.document.write( "</p>");
	}

	//console.log("UPS_STATUS:"+ups_status_string);
	//(document.getElementById("text")).value=ups_status_string+"\r\n";	
}

function parse_error_code(error_kind,error_code)
{
	var log_work ;
	var ret_string ="";
	
	//console.log("log_code :"+error_kind);
	
	if(error_kind == 11)
		log_work = log_code_battery_state;
	else if(error_kind == 12)
	{
		log_work = log_code_Converter_State;
 		if(  !(error_code & (1 << 0))  ) { ret_string+= log_work[0];ret_string+=", ";ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;"; }
 		if(  (error_code & (1 << 1))  ) { ret_string+= log_work[1];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  !(error_code & (1 << 2))  ){ ret_string+= log_work[2];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  !(error_code & (1 << 3))  ) {ret_string+= log_work[3];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  !(error_code & (1 << 4))  ) { ret_string+= log_work[4];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  !(error_code & (1 << 5))  ) {ret_string+= log_work[5];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  (error_code & (1 << 6))  )  { ret_string+= log_work[6];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;";}
 		if(  (error_code & (1 << 7))  ) { ret_string+= log_work[7];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  (error_code & (1 << 8))  ) { ret_string+= log_work[8];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  (error_code & (1 << 9))  ) { ret_string+= log_work[9];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  (error_code & (1 << 10))  ) {ret_string+= log_work[10];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  (error_code & (1 << 11))  ) { ret_string+= log_work[11];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  !(error_code & (1 << 12))  ) { ret_string+= log_work[12];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  !(error_code & (1 << 13))  ) {ret_string+= log_work[13];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
 		if(  !(error_code & (1 << 14))  ) {ret_string+= log_work[14];ret_string+=", "; ret_string+="<br />&nbsp;&nbsp;&nbsp;&nbsp;";}
		return ret_string;

	}
	else if(error_kind == 13)
	{
		log_work = log_codeInverter_State;
 		if(  (error_code & (1 << 0))  ) { ret_string+= log_work[0];ret_string+=", "; }
 		if(  ~(error_code & (1 << 1))  ) { ret_string+= log_work[1];ret_string+=", "; }
 		if(  ~(error_code & (1 << 2))  ){ ret_string+= log_work[2];ret_string+=", "; }
 		if(  ~(error_code & (1 << 3))  ) {ret_string+= log_work[3];ret_string+=", "; }
 		if(  ~(error_code & (1 << 4))  ) { ret_string+= log_work[4];ret_string+=", "; }
 		if(  ~(error_code & (1 << 5))  ) {ret_string+= log_work[5];ret_string+=", "; }
 		if(  (error_code & (1 << 6))  )  { ret_string+= log_work[6];ret_string+=", "; }
 		if(  (error_code & (1 << 7))  ) { ret_string+= log_work[7];ret_string+=", "; }
 		if(  (error_code & (1 << 8))  ) { ret_string+= log_work[8];ret_string+=", "; }
 		if(  (error_code & (1 << 9))  ) { ret_string+= log_work[9];ret_string+=", "; }
 		if(  (error_code & (1 << 10))  ) {ret_string+= log_work[10];ret_string+=", "; }
 		if(  (error_code & (1 << 11))  ) { ret_string+= log_work[11];ret_string+=", "; }
 		if(  ~(error_code & (1 << 12))  ) { ret_string+= log_work[12];ret_string+=", "; }
 		if(  ~(error_code & (1 << 13))  ) {ret_string+= log_work[13];ret_string+=", "; }
 		if(  ~(error_code & (1 << 14))  ) {ret_string+= log_work[14];ret_string+=", "; }
		return ret_string;

	}
		
	else if(error_kind == 14)
	{
		log_work = log_Converter_Operation_Fault;	
 		if(  (error_code & (1 << 0))  ) { ret_string+= log_work[0];ret_string+=", "; }
 		if(  (error_code & (1 << 1))  ) { ret_string+= log_work[1];ret_string+=", "; }
 		if(  (error_code & (1 << 2))  ){ ret_string+= log_work[2];ret_string+=", "; }
 		if(  (error_code & (1 << 3))  ) {ret_string+= log_work[3];ret_string+=", "; }
 		if(  (error_code & (1 << 4))  ) { ret_string+= log_work[4];ret_string+=", "; }
 		if(  (error_code & (1 << 5))  ) {ret_string+= log_work[5];ret_string+=", "; }
 		if(  (error_code & (1 << 6))  )  { ret_string+= log_work[6];ret_string+=", "; }
 		if(  (error_code & (1 << 7))  ) { ret_string+= log_work[7];ret_string+=", "; }
 		if(  (error_code & (1 << 8))  ) { ret_string+= log_work[8];ret_string+=", "; }
 		if(  (error_code & (1 << 9))  ) { ret_string+= log_work[9];ret_string+=", "; }
 		if(  (error_code & (1 << 10))  ) {ret_string+= log_work[10];ret_string+=", "; }
 		if(  (error_code & (1 << 11))  ) { ret_string+= log_work[11];ret_string+=", "; }
 		if(  (error_code & (1 << 12))  ) { ret_string+= log_work[12];ret_string+=", "; }
 		if(  (error_code & (1 << 13))  ) {ret_string+= log_work[13];ret_string+=", "; }
 		//if(  (error_code & (1 << 14))  ) {ret_string+= log_work[14];ret_string+=", "; }
		return ret_string;

	}
	
	else if(error_kind == 15)
	{
		log_work = log_Inverter_Operation_Fault;
 		if(  (error_code & (1 << 0))  ) { ret_string+= log_work[0];ret_string+=", "; }
 		if(  (error_code & (1 << 1))  ) { ret_string+= log_work[1];ret_string+=", "; }
 		if(  (error_code & (1 << 2))  ){ ret_string+= log_work[2];ret_string+=", "; }
 		if(  (error_code & (1 << 3))  ) {ret_string+= log_work[3];ret_string+=", "; }
 		if(  (error_code & (1 << 4))  ) { ret_string+= log_work[4];ret_string+=", "; }
 		if(  (error_code & (1 << 5))  ) {ret_string+= log_work[5];ret_string+=", "; }
 		if(  (error_code & (1 << 6))  )  { ret_string+= log_work[6];ret_string+=", "; }
 		if(  (error_code & (1 << 7))  ) { ret_string+= log_work[7];ret_string+=", "; }
 		if(  (error_code & (1 << 8))  ) { ret_string+= log_work[8];ret_string+=", "; }
 		if(  (error_code & (1 << 9))  ) { ret_string+= log_work[9];ret_string+=", "; }
 		if(  (error_code & (1 << 10))  ) {ret_string+= log_work[10];ret_string+=", "; }
 		if(  (error_code & (1 << 11))  ) { ret_string+= log_work[11];ret_string+=", "; }
 		if(  (error_code & (1 << 12))  ) { ret_string+= log_work[12];ret_string+=", "; }
 		if(  (error_code & (1 << 13))  ) {ret_string+= log_work[13];ret_string+=", "; }
 		if(  (error_code & (1 << 14))  ) {ret_string+= log_work[14];ret_string+=", "; }
		return ret_string;
	}
	//console.log("log_code :"+log_work);
	
}

function write_log_textArea(evtdata)
{
   	
	var rev_str = evtdata.split(":");
	console.log(rev_str[0]);
	var text = document.getElementById("text");
	var logDate =  new Date(parseInt ( rev_str[1])*1000 ) ;
	//logDate.setTime( parseInt ( rev_str[1]) );
	//logDate.setTime( rev_str[1] );
	var str_log_code = log_code[parseInt ( rev_str[2])];
	var str_log_error_string = parse_error_code(parseInt ( rev_str[2]),parseInt ( rev_str[3]) );
	
	text.value +=  (logDate.getFullYear()-70) 
					+":" + (logDate.getMonth()+1)
					+":" + logDate.getDate()
					+" " + logDate.getHours()
					+"-" + logDate.getMinutes()
					+"-" + logDate.getSeconds()
					+'\t' + str_log_code+'\t' +str_log_error_string+'\r\n' ;  
	  
	
	/*
	text.value +=  rev_str[1]  
	+'\t' + str_log_code+'\t' +str_log_error_string+'\r\n' ;  
	*/
	received_msg += evtdata ;
}

function reflash_screen_upsData()
{
}
/*
function getJsonDataField_toMemory(local_station)
{
	var rev_str;
	rev_str[0] = local_station.Year_made   ;						// 0
	rev_str[1] = local_station.Month_made   ;
	rev_str[2] = local_station.Date_made   ;	
	rev_str[3] = local_station.Ups_Capacitor   ;
	rev_str[4] = local_station.Input_Phase   ;
	rev_str[5] = local_station.Input_Voltage   ;
	rev_str[6] = local_station.Output_Phase   ;
	rev_str[7] = local_station.Output_Voltage   ;
	rev_str[8] = local_station.Installed_Battery_Cells   ;
	rev_str[9] = local_station.reserved_1   ;
	rev_str[10] = local_station.reserved_2   ;					// 10	
	rev_str[11] = local_station.BMS_1_2_STATE   ;					
	rev_str[12] = local_station.Converter_State   ;
	rev_str[13] = local_station.Inverter_State   ;
	rev_str[14] = local_station.Converter_Operation_Fault   ;
	rev_str[15] = local_station.Inverter_Operation_Fault   ;
	
	rev_str[16] = local_station.Input_r_volt_rms   ;				//입력전압 R
	rev_str[17] = local_station.Input_s_volt_rms   ;
	rev_str[18] = local_station.Input_t_volt_rms   ;
	rev_str[19] = local_station.Input_r_current_rms   ;		//입력전류 R
	rev_str[20] = local_station.Input_s_current_rms   ;		// 20	
	rev_str[21] = local_station.Input_t_current_rms   ;			
	rev_str[22] = local_station.Input_frequency   ;
	
	rev_str[23] = local_station.Bypass_r_volt_rms   ;
	rev_str[24] = local_station.Bypass_s_volt_rms   ;
	rev_str[25] = local_station.Bypass_t_volt_rms   ;
	rev_str[26] = local_station.Bypass_r_current_rms   ;
	rev_str[27] = local_station.Bypass_s_current_rms   ;
	rev_str[28] = local_station.Bypass_t_current_rms   ;
	rev_str[29] = local_station.Bypass_Frequency   ;
	
	rev_str[30] = local_station.Inverter_u_volt_rms   ;			// 30 	 인버터전류 제외 UVW 
	rev_str[31] = local_station.Inverter_v_volt_rms   ;			
	rev_str[32] = local_station.Inverter_w_volt_rms   ;
	rev_str[33] = local_station.Inverter_u_curr_rms   ;
	rev_str[34] = local_station.Inverter_V_curr_rms   ;
	rev_str[35] = local_station.Inverter_W_curr_rms   ;
	rev_str[36] = local_station.Inverter_Frequency   ;
	rev_str[37] = local_station.Bat_volt_rms   ;
	rev_str[38] = local_station.Bat_current_rms   ;
	rev_str[39] = local_station.Input_kva_address_KVA   ;			 //제외 
	rev_str[40] = local_station.Input_kw_KW   ;					//  제외 40
	rev_str[41] = local_station.Input_kvar_KVAR   ;				// 제외 
	rev_str[42] = local_station.Input_power_factor_Pf   ;			// 제외
	
	rev_str[43] = local_station.Output_r_volt_rms   ;
	rev_str[44] = local_station.Output_s_volt_rms   ;
	rev_str[45] = local_station.Output_t_volt_rms   ;
	rev_str[46] = local_station.Output_u_current_rms   ;
	rev_str[47] = local_station.Output_v_current_rms   ;
	rev_str[48] = local_station.Output_w_current_rms   ;
	rev_str[49] = local_station.Output_frequency   ;
	rev_str[50] = local_station.Output_kva_KVA   ;				//50  제외 
	rev_str[51] = local_station.Output_kw_KW   ;				 //제외
	rev_str[52] = local_station.Output_kvar_KVAR   ;			 //제외 
	rev_str[53] = local_station.Output_Power_factor_Pf   ;		 //제외 
	rev_str[54] = local_station.Output_R_Load   ;
	rev_str[55] = local_station.Output_S_Load   ;
	rev_str[56] = local_station.Output_T_Load   ;					//56
		
}
*/

function getJsonDataField_toMemory(rev_str,local_station)
{
	//console.log("rev_str length is "+rev_str.length );
	//console.log("rev_str[0]"+rev_str[0] );
	if( rev_str.length < 56)
	{
		console.log("data short"+ rev_str.length);
		return;  //데이타는 57개 이지만 마지막에 널이 하나 있게 설계 되었다.
	}

	local_station.Year_made   = rev_str[0] ;						// 0
	local_station.Month_made   = rev_str[1] ;
	local_station.Date_made   = rev_str[2] ;	
	local_station.Ups_Capacitor   = rev_str[3] ;
	local_station.Input_Phase   = rev_str[4] ;
	local_station.Input_Voltage   = rev_str[5] ;
	local_station.Output_Phase   = rev_str[6] ;
	local_station.Output_Voltage   = rev_str[7] ;
	local_station.Installed_Battery_Cells   = rev_str[8] ;
	local_station.reserved_1   = rev_str[9] ;
	local_station.reserved_2   = rev_str[10] ;					// 10
	
	local_station.BMS_1_2_STATE   = rev_str[11] ;					
	local_station.Converter_State   = rev_str[12] ;
	local_station.Inverter_State   = rev_str[13] ;
	local_station.Converter_Operation_Fault   = rev_str[14] ;
	local_station.Inverter_Operation_Fault   = rev_str[15] ;
	
	local_station.Input_r_volt_rms   = rev_str[16] ;				//입력전압 R
	local_station.Input_s_volt_rms   = rev_str[17] ;
	local_station.Input_t_volt_rms   = rev_str[18] ;
	local_station.Input_r_current_rms   = rev_str[19] ;		//입력전류 R
	local_station.Input_s_current_rms   = rev_str[20] ;		// 20	
	local_station.Input_t_current_rms   = rev_str[21] ;			
	local_station.Input_frequency   = rev_str[22] ;
	
	local_station.Bypass_r_volt_rms   = rev_str[23] ;
	local_station.Bypass_s_volt_rms   = rev_str[24] ;
	local_station.Bypass_t_volt_rms   = rev_str[25] ;
	local_station.Bypass_r_current_rms   = rev_str[26] ;
	local_station.Bypass_s_current_rms   = rev_str[27] ;
	local_station.Bypass_t_current_rms   = rev_str[28] ;
	local_station.Bypass_Frequency   = rev_str[29] ;
	
	local_station.Inverter_u_volt_rms   = rev_str[30] ;			// 30 	 인버터전류 제외 UVW 
	local_station.Inverter_v_volt_rms   = rev_str[31] ;			
	local_station.Inverter_w_volt_rms   = rev_str[32] ;
	local_station.Inverter_u_curr_rms   = rev_str[33] ;
	local_station.Inverter_V_curr_rms   = rev_str[34] ;
	local_station.Inverter_W_curr_rms   = rev_str[35] ;
	local_station.Inverter_Frequency   = rev_str[36] ;
	
	local_station.Bat_volt_rms   = rev_str[37] ;
	local_station.Bat_current_rms   = rev_str[38] ;
	
	local_station.Input_kva_address_KVA   = rev_str[39] ;			 //제외 
	local_station.Input_kw_KW   = rev_str[40] ;					//  제외 40
	local_station.Input_kvar_KVAR   = rev_str[41] ;				// 제외 
	local_station.Input_power_factor_Pf   = rev_str[42] ;			// 제외
	
	local_station.Output_r_volt_rms   = rev_str[43] ;
	local_station.Output_s_volt_rms   = rev_str[44] ;
	local_station.Output_t_volt_rms   = rev_str[45] ;
	local_station.Output_u_current_rms   = rev_str[46] ;
	local_station.Output_v_current_rms   = rev_str[47] ;
	local_station.Output_w_current_rms   = rev_str[48] ;
	local_station.Output_frequency   = rev_str[49] ;
	local_station.Output_kva_KVA   = rev_str[50] ;				//50  제외 
	local_station.Output_kw_KW   = rev_str[51] ;				 //제외
	local_station.Output_kvar_KVAR   = rev_str[52] ;			 //제외 
	local_station.Output_Power_factor_Pf   = rev_str[53] ;		 //제외 
	local_station.Output_R_Load   = rev_str[54] ;
	local_station.Output_S_Load   = rev_str[55] ;
	local_station.Output_T_Load   = rev_str[56] ;					//56	
	return local_station;
}

//var networkList_receiveList = ["ST501","ST502","ST503","ST504","ST505","ST506"];
function html_station_image_span()
{
	var doc = (document.getElementById("station_image_span")) ;

	doc.innerHTML="";

	

	var str_name ;
	var str_code ;
	//console.log(StationAndUpsInfo);
	selected_group = getSelectGroup();
	for(var i=0; i< networkList_receiveList[selected_group].length; i++)
	{
		//StationAndUpsInfo[networkList_receiveList[selected_group][i]].station_name;
		str_code = StationAndUpsInfo[networkList_receiveList[selected_group][i]].station_code ;
		str_name = StationAndUpsInfo[networkList_receiveList[selected_group][i]].station_name ;
		doc.innerHTML += 	"<span ><img class='stationImg'  id='stationImg_"+str_code+"' src='../img/trainHead_normal.png'   onClick=selectStation('"+str_code+"') ></img> </span>" ; 
	}
	//console.log(doc.innerHTML);
	var doc = (document.getElementById("station_image_p")) ;
	var str_name ;
	var str_code ;
	doc.innerHTML="";
	for(var i=0; i< networkList_receiveList[selected_group].length; i++)
	{
		StationAndUpsInfo[networkList_receiveList[selected_group][i]].station_name;
		str_name = StationAndUpsInfo[networkList_receiveList[selected_group][i]].station_name ;
		str_code = StationAndUpsInfo[networkList_receiveList[selected_group][i]].station_code ;
		doc.innerHTML += "<span class='station_name' id='station_"+str_code+"'  >" + str_name+  "</span>" ; 
		//<span class="station_name" id="station_01" >방화 </span>
	}
}
selected_station = "ST501";
function onBodyLoadEvent()
{
	//console.log("retrievedObject : "+retrievedObject);
	//StationAndUpsInfo['ST502'].station_name = "방화";
	//console.log("StationAndUpsInfo['ST502'].station_name : "+StationAndUpsInfo['ST502'].station_name);
	//saveJsonData();
	
	localStorage.clear();
	
	readStationInformation();
	 
	if(local_station==null)
	local_station  = StationAndUpsInfo.ST501;  // 해당 역사를 변수로 받고

	setJsonDataField_toWeb(local_station);
	
	console.log("local_station : "+local_station);
	
	var retrievedObject = localStorage.getItem('UpsNetworkInfo_localDrive');
	
	if(retrievedObject == null) 
	{
		console.log("UpsNetworkInfo : "+UpsNetworkInfo);
		upsNetworkInfo_local = UpsNetworkInfo ;
	}
	else upsNetworkInfo_local = JSON.parse(retrievedObject);

	
	(document.getElementById("main_title")).innerHTML="서울교통공사 UPS관리시스템(" + StationAndUpsInfo['ST501'].station_name + ")";
	
	clearDataField_toWeb();
	
	//selectStation(selected_station);
	//if(selected_group == 0)
	//	parse_error_code_for_upsDiagram();
	ups_diagram_draw();
	
	html_station_image_span();
	change_image_status_all();
}

function setJsonDataField_toWeb(local_station)
{
	var text ;
	//설치년월일
	text = document.getElementById("Year_made_value");
	text.innerHTML = local_station.Year_made +"/" 
				   + local_station.Month_made +"/"
				   + local_station.Date_made +"V"
	//UPS용량 Ups_Capacitor_value
	text = document.getElementById("Ups_Capacitor_value");
	text.innerHTML = local_station.Ups_Capacitor +"KVA"
	//UPS입력 Input_Phase_value
	text = document.getElementById("Input_Phase_value");
		text.innerHTML =  ( local_station.Input_Phase == 1 ? "단":"삼")  +"상";
	//UPS입력 전원 Input_Voltage_value
	text = document.getElementById("Input_Voltage_value");
		text.innerHTML =  local_station.Input_Voltage+"V";
	
	//UPS출력전압 Output_Voltage Output_Voltage_value
	text = document.getElementById("Output_Voltage_value");
		text.innerHTML =  local_station.Output_Voltage+"V";
	//UPS입력 Output_Phase_value
	text = document.getElementById("Output_Phase_value");
		text.innerHTML =  ( local_station.Output_Phase == 1 ? "단":"삼")  +"상";
	
	//축전지 셀수 Installed_Battery_Cells_value
	text = document.getElementById("Installed_Battery_Cells_value");
		text.innerHTML =  local_station.Installed_Battery_Cells+"셀";
	//		 
	//선택역사코드 selected_station
	text = document.getElementById("selected_station_value");
		text.innerHTML = local_station.station_name;
		
		
	// 입력전압
	text = document.getElementById("Input_rst_volt_rms_value");
	text.innerHTML = local_station.Input_r_volt_rms +"/" 
				   + local_station.Input_s_volt_rms +"/"
				   + local_station.Input_t_volt_rms +"V"

	// 입력전류 Input_r_current_rms
	text = document.getElementById("Input_r_current_rms_value");
	text.innerHTML = local_station.Input_r_current_rms +"/" 
				   + local_station.Input_s_current_rms +"/"
				   + local_station.Input_t_current_rms +"A";
	//입력 주파수  Input_frequency Input_frequency_value
	//console.log("local_station.Year_made" +StationAndUpsInfo.ST501);
	text = document.getElementById("Input_frequency_value");
	text.innerHTML = local_station.Input_frequency/10 +"Hz" 
	
	// 바이패스전압 Bypass_r_volt_rms   Bypass_rst_volt_rms_value
	text = document.getElementById("Bypass_rst_volt_rms_value");
	text.innerHTML = local_station.Bypass_r_volt_rms +"/" 
				   + local_station.Bypass_s_volt_rms +"/"
				   + local_station.Bypass_t_volt_rms +"V"
	// 바이패스전류 Bypass_r_current_rms Bypass_rst_current_rms_value
	text = document.getElementById("Bypass_rst_current_rms_value");
	text.innerHTML = local_station.Bypass_r_current_rms +"/" 
				   + local_station.Bypass_s_current_rms +"/"
				   + local_station.Bypass_t_current_rms +"A";
	//바이패스 주파수  Bypass_Frequency  Bypass_Frequency_value
	//console.log("local_station.Year_made" +StationAndUpsInfo.ST501);
	text = document.getElementById("Bypass_Frequency_value");
	text.innerHTML = local_station.Bypass_Frequency/10 +"Hz" 

	
	// 인버터 전압  Inverter_u_volt_rms   Inverter_uvw_volt_rms_value
	text = document.getElementById("Inverter_uvw_volt_rms_value");
	text.innerHTML = local_station.Inverter_u_volt_rms +"/" 
				   + local_station.Inverter_v_volt_rms +"/"
				   + local_station.Inverter_w_volt_rms +"V"
	
	
	// 출력 전압  Output_r_volt_rms   Output_rms_volt_rms_value
	text = document.getElementById("Output_rms_volt_rms_value");
	text.innerHTML = local_station.Output_r_volt_rms +"/" 
				   + local_station.Output_s_volt_rms +"/"
				   + local_station.Output_t_volt_rms +"V"
	// 출력 전류 Bypass_r_current_rms Bypass_rst_current_rms_value
	text = document.getElementById("Output_uvw_current_rms_value");
	text.innerHTML = local_station.Output_u_current_rms +"/" 
				+ local_station.Output_v_current_rms +"/"
				+ local_station.Output_w_current_rms +"A";
	//출력 주파수  Bypass_Frequency  Output_frequency_value
	//console.log("local_station.Year_made" +StationAndUpsInfo.ST501);
	text = document.getElementById("Output_frequency_value");
	text.innerHTML = local_station.Output_frequency/10 +"Hz" 
	//출력 부하율  Bypass_Frequency  Output_frequency_value
	text = document.getElementById("Output_RST_Load_value");
	text.innerHTML = local_station.Output_R_Load +"/" 
				+ local_station.Output_S_Load +"/"
				+ local_station.Output_T_Load +"%"	
 
	//축전지 전압  Bat_volt_rms   Bat_volt_rms_value
	text = document.getElementById("Bat_volt_rms_value");
	text.innerHTML = local_station.Bat_volt_rms +"V" 
	//축전지 전압  Bat_current_rms   Bat_current_rms_value
	text = document.getElementById("Bat_current_rms_value");
	text.innerHTML = local_station.Bat_current_rms +"A" 
	
	
}
function clearDataField_toWeb()
{
	var text ;
	//console.log("clear");
	//설치년월일
	text = document.getElementById("Year_made_value");
	text.innerHTML = "1900/01/01 00:00:00"
	//UPS용량 Ups_Capacitor_value
	text = document.getElementById("Ups_Capacitor_value");
	text.innerHTML = "-KVA"
	//UPS입력 Input_Phase_value
	text = document.getElementById("Input_Phase_value");
		text.innerHTML =  ( local_station.Input_Phase == 1 ? "단":"삼")  +"상";
	//UPS입력 전원 Input_Voltage_value
	text = document.getElementById("Input_Voltage_value");
		text.innerHTML =  "00.0V";
	
	//UPS출력전압 Output_Voltage Output_Voltage_value
	text = document.getElementById("Output_Voltage_value");
		text.innerHTML =  "00.0V";
	//UPS입력 Output_Phase_value
	text = document.getElementById("Output_Phase_value");
		text.innerHTML =  ( local_station.Output_Phase == 1 ? "단":"삼")  +"상";
	
	//축전지 셀수 Installed_Battery_Cells_value
	text = document.getElementById("Installed_Battery_Cells_value");
		text.innerHTML =  "00셀";
	//		 
	//선택역사코드 selected_station
	text = document.getElementById("selected_station_value");
		text.innerHTML = local_station.station_name;
		
		
	// 입력전압
	text = document.getElementById("Input_rst_volt_rms_value");
	text.innerHTML ="00/00/00V"

	// 입력전류 Input_r_current_rms
	text = document.getElementById("Input_r_current_rms_value");
	text.innerHTML = local_station.Input_r_current_rms +"/" 
				   + local_station.Input_s_current_rms +"/"
				   + local_station.Input_t_current_rms +"A";
	//입력 주파수  Input_frequency Input_frequency_value
	//console.log("local_station.Year_made" +StationAndUpsInfo.ST501);
	text = document.getElementById("Input_frequency_value");
	text.innerHTML = "00Hz" 
	
	// 바이패스전압 Bypass_r_volt_rms   Bypass_rst_volt_rms_value
	text = document.getElementById("Bypass_rst_volt_rms_value");
	text.innerHTML = "00/00/00V"
	// 바이패스전류 Bypass_r_current_rms Bypass_rst_current_rms_value
	text = document.getElementById("Bypass_rst_current_rms_value");
	text.innerHTML = local_station.Bypass_r_current_rms +"/" 
				   + local_station.Bypass_s_current_rms +"/"
				   + local_station.Bypass_t_current_rms +"A";
	//바이패스 주파수  Bypass_Frequency  Bypass_Frequency_value
	//console.log("local_station.Year_made" +StationAndUpsInfo.ST501);
	text = document.getElementById("Bypass_Frequency_value");
	text.innerHTML = "00Hz" 

	
	// 인버터 전압  Inverter_u_volt_rms   Inverter_uvw_volt_rms_value
	text = document.getElementById("Inverter_uvw_volt_rms_value");
	text.innerHTML = "00/00/00V"
	
	
	// 출력 전압  Output_r_volt_rms   Output_rms_volt_rms_value
	text = document.getElementById("Output_rms_volt_rms_value");
	text.innerHTML = "00/00/00V"
	// 출력 전류 Bypass_r_current_rms Bypass_rst_current_rms_value
	text = document.getElementById("Output_uvw_current_rms_value");
	text.innerHTML = "00/00/00A";
	//출력 주파수  Bypass_Frequency  Output_frequency_value
	//console.log("local_station.Year_made" +StationAndUpsInfo.ST501);
	text = document.getElementById("Output_frequency_value");
	text.innerHTML = "00Hz" 
	//출력 부하율  Bypass_Frequency  Output_frequency_value
	text = document.getElementById("Output_RST_Load_value");
	text.innerHTML = "00/00/00%"	
 
	//축전지 전압  Bat_volt_rms   Bat_volt_rms_value
	text = document.getElementById("Bat_volt_rms_value");
	text.innerHTML = local_station.Bat_volt_rms +"V" 
	//축전지 전압  Bat_current_rms   Bat_current_rms_value
	text = document.getElementById("Bat_current_rms_value");
	text.innerHTML = local_station.Bat_current_rms +"A" 
}

function parse_ups_data(evtdata)
{
	console.log("parse...."+evtdata)
	var rev_str = evtdata.split(":");
	//var local_station  ;
	//
	//if( selected_station == "ST501" )
	{
		local_station  = StationAndUpsInfo[selected_station];  // 해당 역사를 변수로 받고
		//console.log(StationAndUpsInfo);
		//console.log(StationAndUpsInfo["ST501"]);
		//console.log("local_station----------------- :"+selected_station);
		//console.log(local_station);
		//console.log(rev_str);
		if(rev_str.length >= 54  && rev_str.length < 56  )
		{
			local_station=getJsonDataField_toMemory(rev_str,local_station); //파싱하여 데이타를 채우고
			StationAndUpsInfo[selected_station] = local_station ;  // 받은 데이타를 전역 변수에 적용 시킨다.
			setJsonDataField_toWeb(local_station); //웹 화면에 적용시킨다.
			saveJsonData(); // 이제 이데이타는 로컬 메모리에 저장한다.
		}
		else if(rev_str.length > 56 ) // NEP
		{
			local_station=getJsonDataField_toMemory(rev_str,local_station); //파싱하여 데이타를 채우고
			StationAndUpsInfo[selected_station] = local_station ;  // 받은 데이타를 전역 변수에 적용 시킨다.
			setJsonDataField_toWeb(local_station); //웹 화면에 적용시킨다.
			saveJsonData(); // 이제 이데이타는 로컬 메모리에 저장한다.
		}

	}

}


var ups_data_count =0;
//var reevived_ups_data="";

var webSocket = function(tarGetAddress,command_kind,request_info){
	
		console.log('ARG :' + tarGetAddress);
		console.log('command_kind :' + command_kind);
		send_command = command_kind;
		var ws ;
        if ("WebSocket" in window)
        {
        	ws = new WebSocket(tarGetAddress);
		   
           ws.onopen = function()
           {
              received_msg ="";
              //received_msg = request_info;
              console.log('ws connected :' + send_command);
              
              //ws.send("UPS_DATA");
              ups_data_count=0;;
              ws.send(send_command);
              console.log("Message is sent...");
              
              //if( received_msg.length > 0)console.log("Message was received..." + received_msg);
              //else console.log("receive  message failed - "  );
              //console.log("Message is received..." +received_msg );
              //alert("Message is sent...");
              //
           };
		   var command = 0 ;
		   
           ws.onmessage = function (evt) 
           { 
              //received_msg = evt.data;
              //alert("Message is received..." + evt.data);
        	   //console.log(evt.data + " " + ups_data_count);
        	   if(send_command=="UPS_LOG")
       		   {
        		   write_log_textArea(evt.data);
       		   }
        	   else if(send_command=="UPS_DATA")
			   {
				   //if(received_msg.length == 0)received_msg = request_info;
				   ups_data_count++;
				   received_msg+=evt.data;
				   if(data_select_from_menu)
				   {
					   if(ups_data_count > 2)
					   {
						   parse_ups_data(received_msg);
						   parse_error_code_for_upsDiagram();
						   data_select_from_menu = false;
					   }
				   }
				   else
				   {
					   if(ups_data_count > 2)
					   {
						   parse_ups_data(received_msg);
						   parse_error_code_for_upsDiagram();
					   }
				   }

			   }
        	   else if(send_command=="SET_MACA=80.86.100.85.83.71")
        	   {
        		   alert("SET_MACA " + evt.data);
        	   }
        		   
        	}
			
           ws.onclose = function()
           { 
              // websocket is closed.
              //alert("Connection is closed...");
              console.log("Connection is closed..."); 
           };
				
           window.onbeforeunload = function(event) {
              socket.close();
           };
           return ws;
        }
        
        else
        {
           alert("WebSocket NOT supported by your Browser!");
        }	
	
}

var wSocket = function WebSocketTest_1(message)
 {
 }       



var myfuncGen ;// = setIpAddressProcedure();


function getWinsockUpsDatafunction(connect_str,command_data)
{
	webSocket(connect_str,'UPS_DATA',local_station);
}	
	


function myfunction_timer() { //'This is the beginning of your original function which is effectively replaced by a handler inserted as follows..
	//'-----------------------------------Insert Handler..
	var obj = myfuncGen.next(); //'start it
	if (obj.done == false) {
		//'adjust for the amount of time you wish to yield (depends how much screen drawing is required or etc)
		setTimeout(myfunction_timer, 1000); 
		console.log( " Timer routine started ");
	}
	else{
		console.log( " Timer routine is running");
	}
}	

function *getWinsockResponse(connect_str , command_data )  // 'UPS_DATA' 로그는 사용하지 않는다.
{
	//var networkList_receiveList = ["ST501","ST501","ST501","ST501","ST501","ST501"];
	send_command = "UPS_DATA"
	var retry_count = 0;  // 에러시
	var socket_connected=false;
	var data_received_ok=false;
	var ws;
	selected_group = getSelectGroup();
	var i=0;
	//for(var i=0; i< networkList_receiveList[selected_group].length; i++)
	while(true)
	{
		if(stop_auto_query == true ) return;
		console.log( "watting data receive.. " + networkList_receiveList[selected_group][i] );
		//var connect_str ='ws://192.168.0.55:80/echo' ;
	
		received_msg = "";
		connect_str ='ws://'+ upsNetworkInfo_local[networkList_receiveList[selected_group][i]].ipaddress+':80/echo' ;
		selected_station = networkList_receiveList[selected_group][i] ;  // selected_station 는 저장 할 때 사용한다.
		retry_count = 0;
		for(retry_count ;retry_count < 1; retry_count++)
		{
			console.log(connect_str + " 연결요청 : " + retry_count) ;
			socket_connected=false;
			data_received_ok=false;
			ws=webSocket(connect_str,command_data);
			ms = new Date().getTime();
			var wait_count = 0;
			while (!data_received_ok )
			{
				if( ws.readyState == 3) socket_connected= true;
				if( new Date().getTime() < ms + 1000 );
				else 
				{
					wait_count++;
					ms = new Date().getTime();
					//alert(wait_count);
				}
				if(wait_count > 10)
				{
					break;
				}
				if( received_msg.length > 10 )
				{
					data_received_ok = true;
					break;
				}// while 문을 벗어나기 위해
				yield;	
				
			}
			if( received_msg.length > 10 ) // for 문을 벗어나기 위해.
				break;
			if(socket_connected)   // 소켓이 연결되었을 경우에만...
			while(ws.readyState != 3)
			{
				console.log(ws.readyState);
				yield;
			}

			yield;
		}
		if(received_msg.length < 10 ) 
		{
			/*
			var myWindow = window.open("", "MsgWindow", "width=800,height=200");
			myWindow.document.body.style.backgroundColor = "pink";
			myWindow.focus();
			var d = new Date();
			myWindow.document.write("<p> ");
			myWindow.document.write(d.getFullYear() +"/" + d.getMonth()+1 +"/" + d.getDate() + " " );
			myWindow.document.write(d.getHours() +":" + d.getMinutes() +":" + d.getSeconds() + " " );
			myWindow.document.write("메세지 수신  실패 : " + StationAndUpsInfo[networkList_receiveList[selected_group][i]].station_name+"</p>");
			*/
		}
		if( received_msg.length > 10 )
		{
			(document.getElementById("message_status_div")).style.backgroundColor=  "#00ff00";
			(document.getElementById("message_status_span")).innerHTML=networkList_receiveList[selected_group][i] + " 메세지 수신 완료 ";
			parse_ups_data(received_msg);
		}
		else
		{
			(document.getElementById("message_status_div")).style.backgroundColor=  "#ff0000";
			(document.getElementById("message_status_span")).innerHTML=networkList_receiveList[selected_group][i] + " 메세지 수신 실퍠 ";	
		}
		yield;
		i++;
		if( i >= networkList_receiveList[selected_group].length ) i = 0;
	}
}

function *setIpAddressProcedure()
{
	var ms;
	
	console.log( "demonstrating progress.. " );
	
	var connect_str ='ws://192.168.0.55:80/echo' ;
	webSocket(connect_str,'UPS_DATA');
	//WebSocketTest("IPADDRESS=192.168.0.55");
	ms = new Date().getTime();
	//조건문에 데이타 이벤트가 왔는지를 보면 되겠다 시간과 같이.
	while (new Date().getTime() < ms + 500);
	yield;
	
	console.log("Good !" + received_msg);
	WebSocketTest("GATEWAY=192.168.0.1");
	ms = new Date().getTime();
	while (new Date().getTime() < ms + 500);
	yield;
	console.log("Good !" + received_msg);
	
	WebSocketTest("SUBNETMASK=255.255.255.0");
	ms = new Date().getTime();
	while (new Date().getTime() < ms + 500);
	yield;
	console.log("Good !" + received_msg);
	yield;
	//alert("Data was Saved!!");
	
}	
	
	
function WebSocketTest(message)
{
	if ("WebSocket" in window)
	{
		var ws = new WebSocket("ws://192.168.0.55:80/echo");
		ws.onopen = function()
		{
			// Web Socket is connected, send data using send()
			//ws.send("Message to send");
			received_msg ="";
			console.log('ws connected');
			ws.send(message);
			console.log("Message is sent...");
			//if( received_msg.length > 0)console.log("Message was received..." + received_msg);
			//else console.log("receive  message failed - "  );
			//console.log("Message is received..." +received_msg );
			//alert("Message is sent...");
			//
		};
		var command = 0 ;

		ws.onmessage = function (evt) 
		{ 
			received_msg = evt.data;
			//alert("Message is received..." + evt.data);
			console.log("Message is received..." + evt.data);
			//ws.send("IPADDRESS=192.168.0.55");
		};

		ws.onclose = function()
		{ 
			// websocket is closed.
			//alert("Connection is closed...");
			console.log("Connection is closed..."); 
		};

		window.onbeforeunload = function(event) {
			socket.close();
		};
	}

	else
	{
		// The browser doesn't support WebSocket
		alert("WebSocket NOT supported by your Browser!");
	}
}
         
  
		
         
         
     	/*
     	function TimerTest()
     	{
     	   	//setTimeout(setIpAddressProcedure,10);
     	   	setIpAddressProcedure(0);
     	}
     	//var ipAddress_step =0;
     	function setIpAddressProcedure(ipAddress_step)
     	{
     		switch(ipAddress_step)
     		{
     			case 0: 
     				WebSocketTest("IPADDRESS=192.168.0.55");
     				ipAddress_step++;
     				setTimeout(setIpAddressProcedure(1),1000);
     			break;
     			case 1:
     				WebSocketTest("GATEWAY=192.168.0.1");
     				ipAddress_step++;
     				setTimeout(setIpAddressProcedure(2),3000);
     			break;
     			default:
     			break;
     		}
     	}
     	function setGateWayAddress()
     	{
     		WebSocketTest("GATEWAY=192.168.0.1");
     		//setTimeout(this_wait,300);
     	}
     	*/
     	
     	/*             	
     	function wait(msecs){
     	var start = 0;
     	
     	  if (received_msg.length == 0)
     	  {
     		if( waitFunctionCount < 5) setTimeout(wait,msecs);
     	    waitFunctionCount++;
     	    console.log("wait count : " + waitFunctionCount);
     	    return waitFunctionCount;
     	  } else 
     	  {
     	  	console.log("wait lenth : " + received_msg.length);
     	  	return waitFunctionCount=0;
     	  }
     	}
         */
       
         
