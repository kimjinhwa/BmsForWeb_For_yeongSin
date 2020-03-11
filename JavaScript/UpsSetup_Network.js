

var local_ipSet_station_name  ;
var received_msg="";

//webSocket('ws://192.168.0.55:80/echo','SET_IPAD');
var send_command;
var webSocket = function(tarGetAddress,command_kind){
	
	//console.log("WebSocket is supported by your Browser!");
	//console.log('ARG :' + tarGetAddress);
	//console.log('send_command :' + send_command);
	//console.log('command_kind :' + command_kind);
	//alert(this.connected);
	//	send_command = command_kind;
	
    if ("WebSocket" in window)
    {
       var ws = new WebSocket(tarGetAddress);

	   
       ws.onopen = function()
       {
          console.log('ws connected :' + command_kind);
          ws.send(command_kind);
          received_msg = "";
          console.log("Message is sent..."+this.readyState );
       };
	   var command = 0 ;
	   
       ws.onmessage = function (evt) 
       { 
    	    console.log("received...."+ evt.data);
    	    received_msg = evt.data ;
    	    //if(received_msg > 10) Socket.close();
    	}
		
       ws.onclose = function()
       { 
    	  
          console.log("Connection is closed..."+ this.readyState); 
       };
			
       window.onbeforeunload = function(event) {
          socket.close();
       };
    }
    
    else
    {
       alert("WebSocket NOT supported by your Browser!");
    }	
    return ws;
}




function saveUpsNetworkInfo(){
	var str = JSON.stringify(UpsNetworkInfo);
	localStorage.setItem('UpsNetworkInfo_localDrive', str);
};

function readUpsNetworkInfo(){
	var retrievedObject = localStorage.getItem('UpsNetworkInfo_localDrive');
	
	var parsedObject = JSON.parse(retrievedObject);
	
	if(parsedObject == null	) UpsNetworkInfo = UpsNetworkInfo ;
	else UpsNetworkInfo = parsedObject;
	//var st  = parsedObject.ST501;
	//st.Bat_current_rms= 100;
	//console.log(st);
};


function  onBodyLoadEventUpsSetup()
{
	var text = document.getElementById("network_Legend");
	
	readUpsNetworkInfo();

	local_ipSet_station_name  = UpsNetworkInfo.ST501;   //페이지 시작은 이곳으로 정한다./
	
	console.log(text);
	text.innerHTML = "역사 코드 :ST501"+" 네트웍 설정" ;
	
	setFileData();
	//text = localStorage.getItem('ipaddress_input_text');
	//text.value ="";
	
}


function setFileData()
{
	var text = document.getElementById("ipaddress_input_text");
	text.value = local_ipSet_station_name.ipaddress;

	text = document.getElementById("gateway_input_text");
	text.value = local_ipSet_station_name.gateway;

	text = document.getElementById("subnetmask_input_text");
	text.value = local_ipSet_station_name.subnetmask;

	text = document.getElementById("subnetmask_input_text");
	text.value = local_ipSet_station_name.subnetmask;

	text = document.getElementById("macaddress_input_text");
	var mac_address = (local_ipSet_station_name.macAddress).split(".");;
	
	var str =

	text.value = parseInt(mac_address[0]).toString(16)+"."+
		parseInt(mac_address[1]).toString(16)+":"+
		parseInt(mac_address[2]).toString(16)+":"+
		parseInt(mac_address[3]).toString(16)+":"+
		parseInt(mac_address[4]).toString(16)+":"+
		parseInt(mac_address[5]).toString(16) ;
}

function selectStation_UpsSetup(station)
{	//local_ipSet_station_name
	var text = document.getElementById("network_Legend");
	text.innerHTML = "역사 코드 :" +station+ " 네트웍 설정" ;

	//var str = "ST501";
	console.log(UpsNetworkInfo[station]);
	local_ipSet_station_name = UpsNetworkInfo[station];  // 해당 역사를 변수로 받고
	
	setFileData();
	
}
function setNetwork_UpsSetup()
{
	var text = document.getElementById("ipaddress_input_text");
	local_ipSet_station_name.ipaddress = text.value;

	text = document.getElementById("gateway_input_text");
	local_ipSet_station_name.gateway = text.value ; 

	text = document.getElementById("subnetmask_input_text");
	local_ipSet_station_name.subnetmask = text.value  ;

	//webSocket("ws://192.168.0.55:80/echo","SET_MACA=");
	
	if(confirm(local_ipSet_station_name.ipaddress+ "의 \r\n" +
			"네트웍 IP가 변경 합니다." +
			"UPS동작에는 영향을 미치지 않습니다.\r\n" +
			"계속 진행 하시겠습니까?")
	)
	{
		saveUpsNetworkInfo();
	
		//var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
		//var command= 'SET_IPAD='+local_ipSet_station_name.ipaddress;
		//send_command = 'SET_IPAD';
		//webSocket(connectString,command);
		//myfunction();
	}
	else
	{
		alert("취소 되었습니다.")
	}
}


var myfuncGen ;
function myfunction()
{
	var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
	var command= 'SET_IPAD='+local_ipSet_station_name.ipaddress;
	send_command = 'SET_IPAD';
	//webSocket(connectString,command);
	myfuncGen = getWinsockResponse(connectString,command);
	myfunction_timer();
	//var connect_str ='ws://'+ UpsNetworkInfo[selected_station].ipaddress+':80/echo' ;
	//myfuncGen = getWinsockResponse(connect_str,'SET_IPAD');
	//myfunction_timer();
}

function myfunction_timer() { //'This is the beginning of your original function which is effectively replaced by a handler inserted as follows..
	//'-----------------------------------Insert Handler..
	  var obj = myfuncGen.next(); //'start it

	  if (obj.done == false) {
	    setTimeout(myfunction_timer, 100); //'adjust for the amount of time you wish to yield (depends how much screen drawing is required or etc)
	  }

}

function setNetwork_IpSetup()
{
	var text = document.getElementById("ipaddress_input_text");

	//text = document.getElementById("gateway_input_text");
	//local_ipSet_station_name.gateway = text.value ; 

	//text = document.getElementById("subnetmask_input_text");
	//local_ipSet_station_name.subnetmask = text.value  ;

	//webSocket("ws://192.168.0.55:80/echo","SET_MACA=");
	
	if(confirm(local_ipSet_station_name.ipaddress+ "의 \r\n" +
			"네트웍 IP가 변경 합니다." +
			"UPS동작에는 영향을 미치지 않습니다.\r\n" +
			"계속 진행 하시겠습니까?")
	)
	{
		
		var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
		var command= 'SET_IPAD='+text.value;
		send_command = 'SET_IPAD';
		var ws = webSocket(connectString,command);
		
		local_ipSet_station_name.ipaddress = text.value;
		saveUpsNetworkInfo();
		
	}
	else
	{
		alert("취소 되었습니다.")
	}
}
function setNetwork_GatewaySetup()
{
	//var text = document.getElementById("ipaddress_input_text");
	//local_ipSet_station_name.ipaddress = text.value;

	var text = document.getElementById("gateway_input_text");
	 

	//text = document.getElementById("subnetmask_input_text");
	//local_ipSet_station_name.subnetmask = text.value  ;

	
	//webSocket("ws://192.168.0.55:80/echo","SET_MACA=");
	
	if(confirm(local_ipSet_station_name.ipaddress+ "의 \r\n" +
			"네트웍 게이트웨이를  변경 합니다." +
			"UPS동작에는 영향을 미치지 않습니다.\r\n" +
			"계속 진행 하시겠습니까?")
	)
	{
		
		received_msg="";
		var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
		var command= 'SET_GATE='+text.value;  // gateway
		send_command = 'SET_GATE';
		var ws=webSocket(connectString,command);
	
		local_ipSet_station_name.gateway = text.value ;
		saveUpsNetworkInfo();
	}
	else
	{
		alert("취소 되었습니다.")
	}
}

function setNetwork_SubnetSetup()
{
	//var text = document.getElementById("ipaddress_input_text");
	//local_ipSet_station_name.ipaddress = text.value;

	//text = document.getElementById("gateway_input_text");
	//local_ipSet_station_name.gateway = text.value ; 

	var text = document.getElementById("subnetmask_input_text");
	

	//webSocket("ws://192.168.0.55:80/echo","SET_MACA=");
	
	if(confirm(local_ipSet_station_name.ipaddress+ "의 \r\n" +
			"서브넷 마스크를를  변경 합니다." +
			"UPS동작에는 영향을 미치지 않습니다.\r\n" +
			"계속 진행 하시겠습니까?")
	)
	{
		
		received_msg="";
		var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
		var command= 'SET_SUBM='+text.value;  // gateway
		send_command = 'SET_SUBM';
		var ws=webSocket(connectString,command);

		local_ipSet_station_name.subnetmask = text.value  ;
		saveUpsNetworkInfo();
	}
	else
	{
		alert("취소 되었습니다.")
	}

}

function setNetwork_webport()
{
	var text = document.getElementById("web_port_input_text");
	

	if(confirm(local_ipSet_station_name.port+ "의 \r\n" +
			"를  변경 합니다." +
			"이 변경은 특별한 이유가 없는 이상 하지 않습니다.\r\n" +
			"계속 진행 하시겠습니까?")
	)
	{
		local_ipSet_station_name.port = 16;
		var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':'+ local_ipSet_station_name.port + '/echo' ;
		
		local_ipSet_station_name.port = text.value;
		
		var command= 'WEB_PORT='+local_ipSet_station_name.macAddress;  // mac.address;
		
		send_command = 'WEB_PORT';
		var ws=webSocket(connectString,command);
		saveUpsNetworkInfo();
		received_msg="";

	}
	else
	{
		alert("취소 되었습니다.")
	}

	
}

function setNetwork_MacaddressSetup()
{
	var text = document.getElementById("ipaddress_input_text");
	local_ipSet_station_name.ipaddress = text.value;

	text = document.getElementById("gateway_input_text");
	local_ipSet_station_name.gateway = text.value ; 

	text = document.getElementById("subnetmask_input_text");
	local_ipSet_station_name.subnetmask = text.value  ;

	//webSocket("ws://192.168.0.55:80/echo","SET_MACA=");
	
	if(confirm(local_ipSet_station_name.ipaddress+ "의 \r\n" +
			"맥 어드레스를  변경 합니다." +
			"이 변경은 특별한 이유가 없는 이상 하지 않습니다.\r\n" +
			"계속 진행 하시겠습니까?")
	)
	{
		saveUpsNetworkInfo();
		received_msg="";
		var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
		var command= 'SET_MACA='+local_ipSet_station_name.macAddress;  // mac.address;
		send_command = 'SET_MACA';
		var ws=webSocket(connectString,command);
	}
	else
	{
		alert("취소 되었습니다.")
	}
	
}

function setNetwork_ofoff()
{
	received_msg="";
	var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
	var command= 'REBOOT';  // mac.address;
	send_command = 'REBOOT';
	var ws=webSocket(connectString,command);
}

function *getWinsockResponse(connect_str , command_data )  // 'UPS_DATA' 로그는 사용하지 않는다.
{
		// IPADDRESS루틴
		var connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
		var command= 'SET_IPAD='+local_ipSet_station_name.ipaddress;
		send_command = 'SET_IPAD';

		
		console.log(connectString);
		var ws = webSocket(connectString,command);
		ms = new Date().getTime();
		while (true ){
			if( new Date().getTime() < ms + 3000 );
			else break;
			if( received_msg.length > 10 ) break;
			yield;
			
		};yield;
		ws.close();yield;
		if( received_msg.length > 10 ){
			console.log("Good receive msg : " + received_msg + " " + received_msg.length );
			alert("IPADRESS="+received_msg + "로 설정 변경되었습니다.")
		}
		else{
			alert(received_msg + "설정에 실패 했습니다..")};
		yield;
		while(ws.readyState != 3)
		{
			console.log(ws.readyState);
			yield;
		}

		// GATEWAY루틴
		received_msg="";
		connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
		command= 'SET_GATE='+local_ipSet_station_name.gateway;  // gateway
		send_command = 'SET_GATE';

		console.log(connectString);
		ws=webSocket(connectString,command);
		ms = new Date().getTime();
		while (true ){
			if( new Date().getTime() < ms + 3000 );
			else break;
			if( received_msg.length > 10 ) break;
			yield;
			console.log(ws.readyState);
		};yield;
		ws.close();
		yield;

		if( received_msg.length > 10 ){
			console.log("Good receive msg : " + received_msg + " " + received_msg.length );
			alert("GateWay="+received_msg + "로 설정 변경되었습니다.")
		}
		else{
			alert(received_msg + "설정에 실패 했습니다..")};
		yield;
		yield;
		while(ws.readyState != 3)
		{
			console.log(ws.readyState);
			yield;
		}

		// subnet mask
		received_msg="";
		connectString ='ws://'+ local_ipSet_station_name.ipaddress + ':80' + '/echo' ;
		command= 'SET_SUBM='+local_ipSet_station_name.subnetmask;  // gateway
		send_command = 'SET_SUBM';

		
		//if (ws.readyState === WebSocket.OPEN) alert("SOCKETE NOT CLOSE");
		//else alert("SOCKETE  CLOSE");
		console.log(connectString);
		ws=webSocket(connectString,command);
		ms = new Date().getTime();
		while (true ){
			if( new Date().getTime() < ms + 5000 );
			else break;
			if( received_msg.length > 10 ) break;
			yield;
			console.log(ws.readyState);
		};yield;
		if( received_msg.length > 10 ){
			console.log("Good receive msg : " + received_msg + " " + received_msg.length );
			alert("subnet mask를 "+received_msg + "로 설정 변경되었습니다.")
		}
		else{
			console.log("fail receive msg : " + received_msg + " " + received_msg.length );
			alert(received_msg + "설정에 실패 했습니다..")
			};
		yield;
		ws.close();
		while(ws.readyState != 3)
		{
			console.log(ws.readyState);
			yield;
		}
		
}






/*
 			if(send_command=="SET_IPAD")
			{
			   alert(evt.data + "로 설정 변경되었습니다.")
			}
			  else if(send_command=="SET_MACA")
		    {
			   alert("SET_MACA " + evt.data);
		    }
 
 */

//CONNECTING	0	The connection is not yet open.
//OPEN	1	The connection is open and ready to communicate.
//CLOSING	2	The connection is in the process of closing.
//CLOSED	3	The connection is closed or couldn't be opened.
