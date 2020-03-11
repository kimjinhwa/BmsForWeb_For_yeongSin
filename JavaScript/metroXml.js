
var xmlDoc=null;

function saveJsonData(){
	var str = JSON.stringify(StationAndUpsInfo);
	//console.log(str);
	localStorage.setItem('station_info_localStorage', str);
	//storage.removeItem(station_info_localStorage);
}
function readStationInformation(){
	//localStorage.setItem('bgcolor', 'red');
	var retrievedObject ;
	retrievedObject = localStorage.getItem('station_info_localStorage');
	var parsedObject ;
	if(retrievedObject == null)  //처음이면
	{
		saveJsonData();
		StationAndUpsInfo = StationAndUpsInfo;  // 기본으로 자지 정보를 사용한다
	}
	else
	{
		parsedObject = JSON.parse(retrievedObject); // 그렇지 않으면 변경된 정보를 사용한다.
		StationAndUpsInfo = parsedObject;
	}
	
}

function openXml(){
	
	var str = JSON.stringify(StationAndUpsInfo);
	console.log(str);
	localStorage.setItem('station_info_localStorage', str);

	var retrievedObject = localStorage.getItem('station_info_localStorage');
	var parsedObject = JSON.parse(retrievedObject);
	
	console.log(parsedObject);
	console.log(  parsedObject.ST501.station_name);
	for( var prop in parsedObject.ST501.station_name){
		console.log(prop);
	}
		
	/*
	for( const prop in parsedObject)
	{
		var stri = "parsedObject."+prop;
		console.log(stri);
		
		for( const pro in stri){
			console.log(pro);
		}
	}
	*/
	
	// CONVERT STRING TO REGULAR JS OBJECT
	//
	//console.log(parsedObject.items[1].Desc);
	
	// ACCESS DATA
	
	
	//xmlDoc=loadXMLDoc("../xml/SeoulSubway.xml"); 
	//var xhttp = new XMLHttpRequest();
	//  xhttp.open("GET", "../xml/SeoulSubway.xml", true);
	//  xhttp.send();

	
	//
	//xhttp.onreadystatechange = function() {
	//    if (this.readyState == 4 && this.status == 200) {
	//      document.getElementById("demo").innerHTML =
	//      this.responseText;
	//    }
	//  };
	
	  
	  //var doc = getXMLDom('../xml/SeoulSubway.xml');
	//var cnt = getDomLength("part");
	//var txt = "";
	//for(var i=0; i<cnt; i++)
	//{
	//txt = txt+getValue("station_name",i);
	//} 
	//document.getElementById("myDiv").innerHTML=txt;
}

function getXmlObj()
{
 var xmlhttp = null;
  
 // Mozilla/Safari
 if (window.XMLHttpRequest) {
  xmlhttp = new XMLHttpRequest();
 }
 else if (window.ActiveXObject) {// IE
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 }
 
 return xmlhttp;
}
 

function getXMLDom(pUrl,pOption,pSearchValue)
{
    
 var xmlhttp = getXmlObj(); 
 var templateStr = null;
 var pAsync = false;
  
  
 if (pOption == "TRUE")
 {
  pAsync = true;
 }
  
 if (pOption == "POST")
 {
  xmlhttp.open("POST",pUrl,pAsync);
  xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
 }
 else
 {
  xmlhttp.open("GET",pUrl,pAsync);
  
 }
 xmlhttp.onreadystatechange = function () {
   
  if(xmlhttp.readyState == "4")
  {
   xmlDoc = xmlhttp.responseXML;
  }

 }
  
 xmlhttp.send(); 
 return xmlDoc;
}
function getDomLength(pName,pDom)
{
 try
 {
  return pDom.getElementsByTagName(pName).length;
   
 }
 catch (e)
 {
  return xmlDoc.getElementsByTagName(pName).length;
 }
}
 
function getValue(pName,pIndex,pAttr)
{
  
 if (typeof pIndex == "undefined" || pIndex =="")
 {
  pIndex = 0;
 }
  
 x = xmlDoc.getElementsByTagName(pName);
 
 if (typeof pAttr == "undefined" || pAttr =="")
 {
   
   
  if(x[pIndex].hasChildNodes())
  {
   v = x[pIndex].childNodes[0].nodeValue;
  }
  else
  {
   v = "";
  }
 
 }
 else
 {
   v = x[pIndex].getAttribute(pAttr);
 }
  
 return v;
}
function getXMLText(pCode,pValue)
{
 var xDom = getXMLDom('code_test.xml');  
 var cnt = getDomLength(pCode,xDom);
 var strHTML = ""  ;
 for(var i=0;i<cnt;i++)
 {
  if(getValue(pCode,i,"code") == pValue)
  strHTML = getValue(pCode,i,"text");
 }
  
  
 return strHTML;
}



//var str = JSON.stringify(StationAndUpsInfo);
//var st  = parsedObject.ST501;
//st.Bat_current_rms= 100;
//console.log(st);

//IntegerIndexedElementSet(StationAndUpsInfo, 1, "ST503");

//parsedObject.ST501 = st;
//console.log(parsedObject.ST501.Bat_current_rms);
