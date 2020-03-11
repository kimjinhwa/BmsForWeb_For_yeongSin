
var canvas = document.getElementById("ups_canvas");
var ctx = canvas.getContext('2d');



var line_width=5;
var start_x = 15;
var start_y = 5;


//canvas.style.width=400;
//canvas.style.height=175;
//ctx.scale(0.5,0.5);

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function ups_diagram_draw() {

	var pic= document.getElementById("stationImg");

	//pic.src = "../img/subway_seoul_5.gif" ;
	//ctx.scale(0.5,0.5);
	//ctx.drawImage(pic,0,0, 800, 350);
	//ctx.scale(1,1);
	
}
function showupsdiagrm(state_show)
{
	if(state_show)
	{
		var canvas = document.getElementById("imageDiv");
		canvas.style.display = 'block';
		 canvas = document.getElementById("imageDiv1");
			canvas.style.display = "none";
	}
	else
	{
		var canvas = document.getElementById("imageDiv");
		canvas.style.display = "none";
		canvas = document.getElementById("imageDiv1");
			canvas.style.display = 'block';
		
	}
}
function scr_2_ONOFF(onoff)
{
	if(onoff=='ON'){
		scr_2("red");
	}
	else 
	{
		scr_2("green");
	}
}

function scr_1_ONOFF(onoff)
{
	if(onoff=='ON'){
		scr_1("red");
		//scr_1_line("red");
	}
	else 
	{
		scr_1("green");
		//scr_1_line("green");
	}
}

function inverterONOFF(onoff)
{
	if(onoff=='ON'){
		inverter_6("red");
		draw_10("red");
	}
	else 
	{
		inverter_6("green");
		draw_10("green");
	}
}

function converterONOFF(onoff)
{
	if(onoff=='ON'){
		converter_5("red");
		
	}
	else 
	{
		converter_5("green");
		
	}
}

function sw_2(onoff)
{
	if(onoff=='ON'){
		sw1_design(112,110,"red");
		draw_15("red");
	}
	else 
	{
		sw1_design(112,110-18,"green");
		draw_15("green");
	}
}

function sw_3(onoff)
{
	if(onoff=='ON'){
		sw1_design(112,70,"red");
		//draw_8("red");
	}
	else 
	{
		sw1_design(112,70-18,"green");
		//draw_8("green");
	}
}


function sw_4(onoff)
{
	if(onoff=='ON'){
		sw1_design(112,18,"red");
		//draw_12("red");
	}
	else 
	{
		sw1_design(112,20-18,"green");
		//draw_12("green");
	}
}

function sw_11(onoff)
{
	if(onoff=='ON'){
		sw1_design(617,110,"red");
	}
	else 
	{
		sw1_design(617,110-18,"green");
	}
}

function sw_13(onoff)
{
	if(onoff=='ON'){
		sw1_design_vertical(345,146,"red");
		bat_line(345,160,"red")
		//draw_16("red");
	}
	else
	{
		sw1_design_vertical(345+18,146,"green");
		bat_line(345,160,"green")
		//draw_16("green");
	}
	
	battery(300,180,"cyan")
}


function bat_line(xx,yy,fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*xx,y=scale*yy;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);
	
	x =x+scale*15 ; y = y; // x 로 15
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*20; // 아래로 15 
	ctx.lineTo(x,y); 	
	
	x =x-scale*15 ; y = y; // -x 로 15
	ctx.lineTo(x,y); 	

	
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
}
function battery(xx,yy,fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*xx,y=scale*yy;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);
	
	x =x+scale*105 ; y = y; // x 로 15
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*25; // 아래로 15 
	ctx.lineTo(x,y); 	
	
	x =x-scale*105 ; y = y; // -x 로 15
	ctx.lineTo(x,y); 	

	
	ctx.closePath();
	ctx.stroke();
	ctx.fill();

	x=scale*(xx+5),y=scale*(yy +19);
	ctx.fillStyle = "black";
 	ctx.font = "7pt sans-serif";
 	ctx.fillText("BATTERY",x,y);
	
	
}

function sw1_design_vertical(xx,yy,fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*xx,y=scale*yy;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x+scale*15 ; y = y; // x 로 15
	ctx.lineTo(x,y); 	

	x =x ; y = y -scale*15; // 위로 15 
	ctx.lineTo(x,y); 	
	
	x =x+scale*3 ; y = y;//  x로 3
	ctx.lineTo(x,y); 


	x =x ; y = y +scale*45; // 아래로 45 
	ctx.lineTo(x,y); //�Ʒ��� 5	

	x =x-scale*3 ; y = y; // -x 3
	ctx.lineTo(x,y); 	


	x =x ; y = y-scale*15; //위로 15
	ctx.lineTo(x,y); 

	x =x-scale*15 ; y = y; // -x 15
	ctx.lineTo(x,y); 	

	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
}


function sw1_design(xx,yy,fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*xx,y=scale*yy;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*3;
	ctx.lineTo(x,y); // ���� 5

	x =x+scale*45 ; y = y; // ������ 45
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*3; // 
	ctx.lineTo(x,y); //�Ʒ��� 5	

	x =x-scale*15 ; y = y; // -x 15
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*15; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	

	x =x-scale*15 ; y = y; // -x 15
	ctx.lineTo(x,y); 	

	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	ctx.closePath();
	ctx.stroke();
	ctx.fill();

}


function draw_15(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*145,y=scale*125;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*115 ; y = y; // ������ 115
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*15; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	


	ctx.closePath();
	ctx.stroke();
	ctx.fill();

}
function draw_8(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*145,y=scale*85;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*375; y = y; // ������ 385
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*15; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	


	ctx.closePath();
	ctx.stroke();
	ctx.fill();

}


function converter_5(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*260,y=scale*(125 + 7.5);
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*30;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*50 ; y = y; // ������ 50
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*30; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	

	x =x-scale*50  ; y = y ; // 
	ctx.lineTo(x,y); //-x�� 50	

	ctx.closePath();
	ctx.stroke();
	ctx.fill();

	x=scale*260,y=scale*(125 + 7.5);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x =x+scale*50  ; y =  y - scale*30 ; // 
	ctx.lineTo(x,y); //�밢������ 30 50	
	ctx.closePath();
	ctx.stroke();

	x=scale*260,y=scale*(125 );
	ctx.fillStyle = "black";
 	ctx.font = "16pt sans-serif";
 	ctx.fillText("~",x,y);
 	//ctx.strokeText("this",x,y);
	x=scale*280,y=scale*(120 );
	ctx.fillStyle = "black";
 	ctx.font = "16pt sans-serif";
 	ctx.fillText("_",x,y);

}
function inverter_6(fill_color)
{

	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*390,y=scale*(125 + 7.5);
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*30;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*50 ; y = y; // ������ 50
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*30; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	

	x =x-scale*50  ; y = y ; // 
	ctx.lineTo(x,y); //-x�� 50	

	ctx.closePath();
	ctx.stroke();
	ctx.fill();

	x=scale*(390),y=scale*(125 + 7.5 );
	ctx.beginPath();
	ctx.moveTo(x, y);
	x =x+scale*50  ; y =  y - scale*30 ; // 
	ctx.lineTo(x,y); //�밢������ 30 50	
	ctx.closePath();
	ctx.stroke();

	x=scale*385,y=scale*(125 );
	ctx.fillStyle = "black";
 	ctx.font = "16pt sans-serif";
 	ctx.fillText("~",x,y);
 	//ctx.strokeText("this",x,y);
	x=scale*412,y=scale*(120 );
	ctx.fillStyle = "black";
 	ctx.font = "16pt sans-serif";
 	ctx.fillText("_",x,y);

}
function draw_16(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*310,y=scale*125;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*80 ; y = y; // ������ 50
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*15; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	

	x =x+scale*(-32.5) ; y = y; // -x��  32.5
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*20; // 
	ctx.lineTo(x,y); //�Ʒ��� 20	

	x =x+scale*(-15) ; y = y; // -x��  15
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*(-20); // 
	ctx.lineTo(x,y); //���� 20	

	ctx.closePath();
	ctx.stroke();
	ctx.fill();

}

function draw_10(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*440,y=scale*125;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*80 ; y = y; // ������ 80
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*15; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	


	ctx.closePath();
	ctx.stroke();
	ctx.fill();

}
function scr_1_designF(xx,yy,fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*xx,  y=scale*(yy);
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
	
	ctx.moveTo(x, y);
	x =x+scale*15 ; y = y;
	ctx.lineTo(x,y); //  x�� 15

	x =x ; y = y-scale*5;
	ctx.lineTo(x,y); //  ���� 5

	x =x+scale*10 ; y = y+scale*5;
	ctx.lineTo(x,y); //  x�� 10

	x =x+scale*(-10) ; y = y+scale*5;
	ctx.lineTo(x,y); //  -x�� 10

	x =x ; y = y-scale*5;
	ctx.lineTo(x,y); //  ���� 5

	
	ctx.closePath();
	ctx.stroke();
	//ctx.fill();

	x=scale*(xx+25),  y=scale*(yy-8);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x =x ; y = y+scale*16;
	ctx.lineTo(x,y); //  ���� 5
	ctx.closePath();
	ctx.stroke();

	x=scale*(xx+25),  y=scale*(yy);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x =x+scale*10 ; y = y;
	ctx.lineTo(x,y); //  ���� 5
	ctx.closePath();
	ctx.stroke();

	x=scale*(xx+25),  y=scale*(yy);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x =x+scale*10 ; y = y-3;
	ctx.lineTo(x,y); //  ���� 5
	ctx.closePath();
	ctx.stroke();

}
function scr_1_designR(xx,yy,fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*xx,  y=scale*(yy);
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
	
	ctx.moveTo(x, y);
	x =x+scale*10 ; y = y;
	ctx.lineTo(x,y); //  x�� 15

	x =x+scale*10 ; y = y;
	ctx.moveTo(x, y);

	x =x ; y = y-scale*5;
	ctx.lineTo(x,y); //  ���� 5

	x =x-scale*10 ; y = y+scale*5;
	ctx.lineTo(x,y); //  -x�� 10

	x =x+scale*(+10) ; y = y+scale*5;
	ctx.lineTo(x,y); //  +x�� 10

	x =x ; y = y-scale*5;
	ctx.lineTo(x,y); //  ���� 5

	
	ctx.closePath();
	ctx.stroke();
	//ctx.fill();
	
	x=scale*(xx+12),  y=scale*(yy-8);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x =x ; y = y+scale*16;
	ctx.lineTo(x,y); //  ���� 5
	ctx.closePath();
	ctx.stroke();
	
	
	var x=scale*(xx+20),  y=scale*(yy);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x =x+scale*15 ; y = y;
	ctx.lineTo(x,y); //  ���� 5
	ctx.closePath();
	ctx.stroke();

	var x=scale*(xx+10),  y=scale*(yy);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x =x-scale*10 ; y = y+3;
	ctx.lineTo(x,y); //  ���� 5
	ctx.closePath();
	ctx.stroke();
	

}

function scr_1(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*520,y=scale*(125 +25);
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*50;
	ctx.lineTo(x,y); // ���� 50

	x =x+scale*50 ; y = y; // ������ 50
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*50; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	

	x =x-scale*50  ; y = y ; // 
	ctx.lineTo(x,y); //-x�� 50	

	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	scr_1_designF(525,115,"black");
	scr_1_designR(525,135,"black");

}
function scr_2(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*520,y=scale*(125 -30 );
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*50;
	ctx.lineTo(x,y); // ���� 50

	x =x+scale*50 ; y = y; // ������ 50
	ctx.lineTo(x,y); 	

	x =x ; y = y +scale*50; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	

	x =x-scale*50  ; y = y ; // 
	ctx.lineTo(x,y); //-x�� 50	

	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	scr_1_designF(525,115-55,"black");
	scr_1_designR(525,135-55,"black");

}

function scr_1_line(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*570,y=scale*(125);
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*20 ; y = y; // x ����  20
	ctx.lineTo(x,y); 	

	x =x ; y = y -scale*25; // ���� 30
	ctx.lineTo(x,y); 

	x =x-scale*20  ; y = y ; // 
	ctx.lineTo(x,y); //-x�� 20	
	
	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*40  ; y = y ; // 
	ctx.lineTo(x,y); //+x�� 45	
	
	x =x ; y = y+scale*40;
	ctx.lineTo(x,y); //  �Ʒ���  45

	x =x+scale*20  ; y = y ; // 
	ctx.lineTo(x,y); //+x�� 20	

	x =x ; y = y+scale*15;
	ctx.lineTo(x,y); // �Ʒ��� 15
	
	ctx.closePath();
	ctx.stroke();
	ctx.fill();

}
function draw_12(fill_color)
{
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*650,y=scale*(125);
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
	ctx.beginPath();
		
	ctx.moveTo(x, y);

	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*50 ; y = y; // x ����  50
	ctx.lineTo(x,y); 	

	x =x ; y = y -scale*75; // ���� 75
	ctx.lineTo(x,y); 

	x =x-scale*555  ; y = y ; // 
	ctx.lineTo(x,y); //-x�� 555	
	
	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*570  ; y = y ; //+x�� 570 
	ctx.lineTo(x,y); 	
	
	x =x ; y = y+scale*90;//  아래로 105
	ctx.lineTo(x,y); 

	x =x+scale*30  ; y = y ; //옆으로 30 
	ctx.lineTo(x,y); 	

	x =x ; y = y+scale*15;//  아래로 15
	ctx.lineTo(x,y); 
	
	
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}


function draw_1(fill_color) {
	
	var line_width = 15;
	var scale = 0.4 ;
	var x=scale*25,y=scale*125;
	ctx.strokeStyle = "black";
	ctx.lineWidth = "1";
	ctx.fillStyle = fill_color;
        
	ctx.beginPath();

	ctx.moveTo(x, y);

	x =x ; y = y-scale*15;
	ctx.lineTo(x,y); // ���� 15

	x =x+scale*50 ; y = y; // ������ 50
	ctx.lineTo(x,y); 	

	x =x ; y = y - scale*90; // ���� 90
	ctx.lineTo(x,y); 	

	x =x +scale*50; y = y; // 
	ctx.lineTo(x,y); //������ 50	

	x =x ; y = y +scale*15; // 
	ctx.lineTo(x,y); //�Ʒ��� 15	

	x =x -scale*35 ; y =  y; // 
	ctx.lineTo(x,y); //�ݴ뿷���� 35	

	x =x ; y =  y+scale*35; // 
	ctx.lineTo(x,y); //�Ʒ������� 35	

	x =x+scale*35 ; y =  y; // 
	ctx.lineTo(x,y); //  ������ 35	

	x =x ; y =  y+scale*15; // 
	ctx.lineTo(x,y); //  �Ʒ���  15	

	x =x -scale*35 ; y =  y; // 
	ctx.lineTo(x,y); //�ݴ뿷���� 35	

	x =x ; y =  y+scale*25; // 
	ctx.lineTo(x,y); //�Ʒ������� 35	

	x =x +scale*35; y = y; // 
	ctx.lineTo(x,y); //������ 50	

	x =x ; y =  y+scale*15; // 
	ctx.lineTo(x,y); //  �Ʒ���  15	

	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}


/*
	var scale =0.4;
	var hi=60*scale,wd=40*scale;
	ctx.beginPath();
	ctx.moveTo(x,y);
ctx.lineTo(x+wd,y+hi/2);
ctx.lineTo(x,y+hi);
ctx.lineTo(x,y);
ctx.moveTo(x+wd,y);
ctx.lineTo(x+wd,y+hi);
ctx.moveTo(x+wd,y+hi/2);
ctx.lineTo(x+wd*2,y+hi/2);
ctx.moveTo(x+wd,y+hi/2); 
ctx.lineTo(x+wd*2,y-hi/5);
ctx.moveTo(x,y+hi/2);
ctx.lineTo(x-hi/2,y+hi/2);
ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
ctx.fill();
ctx.stroke();
	
*/