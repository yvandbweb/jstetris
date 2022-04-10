var lines=13;
var columns=9;
var gridarr=[];
var gridarrPrevious=[];
var gridarrColor=[];
var gridarrPreviousColor=[];
var square=[];
var squarerotated=[];
var zigzag1=[];
var zigzag2=[];
var zigzag11=[];
var zigzag12=[];
var littlel1=[];
var littlel2=[];
var littlel3=[];
var littlel4=[];
var linerotated=[];
var dotrotated=[];
var line=[];
var dot=[];
var littlet1=[];
var littlet2=[];
var littlet3=[];
var littlet4=[];
var linetwo=[];
var linetworotated=[];
var currentItem=[];
var previousItem=[];
var currentLegend=[];

//square
square[0]=[1,1];
square[1]=[1,1];

squarerotated[0]=[1,1];
squarerotated[1]=[1,1];


//zigzag
zigzag1[0]=[2,2,2];
zigzag1[1]=[1,1,5];
zigzag1[2]=[4,1,1];

zigzag2[0]=[0,5,1];
zigzag2[1]=[2,1,1];
zigzag2[2]=[0,1,5];

zigzag11[0]=[2,2,2];
zigzag11[1]=[5,1,1];
zigzag11[2]=[1,1,4];

zigzag12[0]=[1,5,0];
zigzag12[1]=[1,1,2];
zigzag12[2]=[5,1,0];


//littlel
littlel1[0]=[2,2,2];
littlel1[1]=[1,1,1];
littlel1[2]=[1,4,5];

littlel2[0]=[0,1,1];
littlel2[1]=[0,4,1];
littlel2[2]=[2,5,1];

littlel3[0]=[2,0,0];
littlel3[1]=[5,4,1];
littlel3[2]=[1,1,1];

littlel4[0]=[1,5,0];
littlel4[1]=[1,5,2];
littlel4[2]=[1,1,0];

//littlet
littlet1[0]=[2,2,2];
littlet1[1]=[1,1,1];
littlet1[2]=[4,1,5];

littlet2[0]=[4,1,2];
littlet2[1]=[1,1,2];
littlet2[2]=[5,1,2];

littlet3[0]=[2,0,0];
littlet3[1]=[5,1,4];
littlet3[2]=[1,1,1];

littlet4[0]=[1,4,0];
littlet4[1]=[1,1,2];
littlet4[2]=[1,5,0];


//line
line[0]=[2,0,0,0];
line[1]=[2,2,2,0];
line[2]=[2,2,2,2];
line[3]=[1,1,1,1];

linerotated[0]=[1,4,0,0];
linerotated[1]=[1,2,0,0];
linerotated[2]=[1,2,2,0];
linerotated[3]=[1,2,2,2];

//linetwo
linetwo[0]=[2,2];
linetwo[1]=[1,1];

linetworotated[0]=[1,2];
linetworotated[1]=[1,2];

//dot
dot[0]=[1];

dotrotated[0]=[1];

var previousItem;
var timeout;
var right1=columns;
var left1=columns;
var right2=columns;
var left2=columns;
var topbot=lines;
var middle;
var middle1=3;
var timelaps1=1000;
var timelaps;
var timelapsinterval=300;
var objectwidth;
var rotatednot;
var tbd;
var colorItem;
var previouscolorItem;
var currentitemid;
var previousitemid;
var tbdarr;
var tbdtop;
var colorarr;
var linecount;

function init_tetris(){
  clearTimeout(timeout);
	var gridname;
	var gridshow="";
                    //zigzag    littlet  line     linetwo  dot       littlel square  zigzag2
  colorarr=new Array("b21919"  ,"bd1ddb","7200ff","2500ff","00a3ff","ff0600","00ff0a","fff800");

	for (i=0;i<lines;i++){
		gridarr[i]=[];
    gridarrColor[i]=[];
		for (j=0;j<columns;j++){
			gridname=i+"block"+j;
			gridarr[i][j]=0;
      gridarrColor[i][j]="ffffff";
			gridshow+='<div id="'+gridname+'" class="tetris_block"></div>';

		}
		gridshow+='<div class="clear"></div>';
	}

  document.getElementById("tetris").innerHTML=gridshow;

  gridshow="";
  var gridshow2="";
  var gridname2="";
  for (i=0;i<2;i++){
		gridarrPrevious[i]=[];
    gridarrPreviousColor[i]=[];
		for (j=0;j<4;j++){
			gridname=i+"block_prev"+j;
      gridname2=i+"block_prev2"+j;
			gridarrPrevious[i][j]=0;
      gridarrPreviousColor[i][j]="ffffff";
			gridshow+='<div id="'+gridname+'" class="tetris_blockprev"></div>';
      gridshow2+='<div id="'+gridname2+'" class="tetris_blockprev"></div>';

		}
		gridshow+='<div class="clear"></div>';
	}

  document.getElementById("prev").innerHTML=gridshow;
  document.getElementById("prev2").innerHTML=gridshow2;

  document.getElementById("gameover").innerHTML="";
  document.getElementById("gameover2").innerHTML="";


  currentitemid=getmathrand();
  previousitemid=getmathrand();
  getItem(currentitemid,"current");
  getItem(previousitemid,"previous");
  middle=middle1;
  previouscolorItem=colorarr[previousitemid-2];
  colorItem=colorarr[currentitemid-2];
  tbd=-1;
  rotatednot=1;
  timelaps=timelaps1;
  linecount=0;
  drawPreviousItem();
  document.getElementById("lines2").innerHTML=linecount;
  document.getElementById("speed2").innerHTML=timelaps;
  document.getElementById("lines3").innerHTML=linecount;
  document.getElementById("speed3").innerHTML=timelaps;
  timeout=setTimeout(function(){thegameteris()},timelaps);

}

function resetkeepblack(){
	for (i=0;i<gridarr.length;i++){
		for (j=0;j<gridarr[i].length;j++){
            if (gridarr[i][j]==0){
                document.getElementById(i+"block"+j).className = 'tetris_block';
                document.getElementById(i+"block"+j).style.backgroundColor="#ffffff";
            }
            if (gridarr[i][j]==1 || gridarr[i][j]==3){
                document.getElementById(i+"block"+j).className = 'tetris_block';
                document.getElementById(i+"block"+j).style.backgroundColor="#"+gridarrColor[i][j];
            }
            //document.getElementById(i+"block"+j).innerHTML="<span style='color:grey'>"+gridarr[i][j]+"</span>";
		}
	}
}

function resetkeepblackPrevious(){
	for (i=0;i<2;i++){
		for (j=0;j<4;j++){
            if (gridarrPrevious[i][j]==0){
                document.getElementById(i+"block_prev"+j).className = 'tetris_blockprev';
                document.getElementById(i+"block_prev"+j).style.backgroundColor="#ffffff";
                document.getElementById(i+"block_prev2"+j).className = 'tetris_blockprev';
                document.getElementById(i+"block_prev2"+j).style.backgroundColor="#ffffff";
            }
            if (gridarrPrevious[i][j]==1){
                document.getElementById(i+"block_prev"+j).className = 'tetris_blockprev_color';
                document.getElementById(i+"block_prev"+j).style.backgroundColor="#"+gridarrPreviousColor[i][j];
                document.getElementById(i+"block_prev2"+j).className = 'tetris_blockprev_color';
                document.getElementById(i+"block_prev2"+j).style.backgroundColor="#"+gridarrPreviousColor[i][j];
            }
		}
	}
}



function removelinethingy(){
    for (i=0;i<gridarr.length;i++){
        for (j=0;j<gridarr[i].length;j++){
            if (gridarr[i][j]!=3){
              gridarr[i][j]=0;
              gridarrColor[i][j]="ffffff";
            }
        }
    }
}

function removelinethingyPrevious(){
    for (i=0;i<gridarr.length;i++){
        for (j=0;j<gridarr[i].length;j++){
            if (gridarr[i][j]!=3){
              gridarr[i][j]=0;
              gridarrColor[i][j]="ffffff";
            }
        }
    }
}


function removelines(){
    var removeline;
    var remlines=[];
    for (i=0;i<gridarr.length;i++){
        removeline=true;
        for (j=0;j<gridarr[i].length;j++){
            if (gridarr[i][j]!=3)
                removeline=false;
        }
        if (removeline==true){
            remlines.push(i);
            linecount++;
            if (linecount%2==0 && timelaps>timelapsinterval)
                timelaps=timelaps-timelapsinterval;

                document.getElementById("lines2").innerHTML=linecount;
                document.getElementById("speed2").innerHTML=timelaps;
                document.getElementById("lines3").innerHTML=linecount;
                document.getElementById("speed3").innerHTML=timelaps;
        }
    }
    if (remlines.length>0){
          var tmp5=[];
          var tmp6=[];
          a=0;
          for (i=0;i<gridarr.length;i++){
            if (remlines.includes(i)){
                tmp5[a]=[];
                tmp6[a]=[];
                for (j=0;j<gridarr[i].length;j++){
                     tmp5[a][j]=0;
                     tmp6[a][j]="ffffff";
                }
                a++;
            }
          }

           var a=tmp5.length;

           for (i=0;i<gridarr.length;i++){
             if (!remlines.includes(i)){
                 tmp5[a]=[];
                 tmp6[a]=[];
                 for (j=0;j<gridarr[i].length;j++){
                      tmp5[a][j]=gridarr[i][j];
                      tmp6[a][j]=gridarrColor[i][j];
                 }
                 a++;
             }
           }

           gridarr=tmp5;
           gridarrColor=tmp6;

    }
}

function checkbottom(mid){
    var possible=false;
    var tbdtmp=tbd;
    for (i=currentItem.length-1;i>=0;i--){
        tmp=mid;
        for (j=0;j<currentItem[i].length;j++){
            if (tbdtmp>=0){
                if (currentItem[i][j]==1 && gridarr[tbdtmp]==undefined){
                    possible=true;
                }else if (currentItem[i][j]==1 && (gridarr[tbdtmp][tmp]==3)){
                    possible=true;
                }
            }
            tmp++;
        }
        tbdtmp--;
    }

    return possible;
}

function checkItemRotate(mid){
    var possible=true;
    var tbdtmp=tbd;

    if (mid<0 || checkTop()=="gameover")
      return false;

    for (i=0;i<currentItem.length;i++){
        tmp=mid;
        for (j=0;j<currentItem[i].length;j++){
                if (gridarr[tbdtmp]==undefined){
                    possible=false;
                }else if (gridarr[tbdtmp]!=undefined && gridarr[tbdtmp][tmp]==undefined){
                    possible=false;
                }else if (currentItem[i][j]==2 && gridarr[tbdtmp][tmp]==3){
                    possible=false;
                }else if (currentItem[i][j]==5 && gridarr[tbdtmp][tmp]==3){
                      possible=false;
                }

                if (currentItem[i][j]==1 && tmp>=columns)
                  possible=false;

                tmp++;
        }
        tbdtmp++;
    }

    return possible;
}

function checkSimulateItem(mid){
    var possible=true;
    var tbdtmp=tbd;

    if (checkTop()=="gameover")
      return false;

    for (i=currentItem.length-1;i>=0;i--){
        tmp=mid;
        for (j=0;j<currentItem[i].length;j++){
          if (currentItem[i][j]==1){
                  if ((gridarr[tbdtmp]!=undefined && gridarr[tbdtmp][tmp]==3)){
                      possible=false;
                  }

                  if (tmp>=columns || tmp<0){
                    possible=false;
                  }
          }
          if (tbdtmp>lines){
            possible=false;
          }
          tmp++;
        }
        tbdtmp--;
    }

    return possible;
}



function linethingy(mid,equalsthree){
    removelines();
    removelinethingy();
    var tmp=mid;
    var tbdtmp=tbd;
    var drewline=false;

    for (i=currentItem.length-1;i>=0;i--){
        tmp=mid;
        if (tbdtmp>=0){
            for (j=0;j<currentItem[i].length;j++){
                if (equalsthree==true && currentItem[i][j]==1 && gridarr[tbdtmp-1]!=undefined){
                    gridarr[tbdtmp-1][tmp]=3;
                    gridarrColor[tbdtmp-1][tmp]=colorItem;
                    drewline=true;
                }else if (currentItem[i][j]==1 && gridarr[tbdtmp]!=undefined){
                    gridarr[tbdtmp][tmp]=1;
                    gridarrColor[tbdtmp][tmp]=colorItem;
                    drewline=true;
                }
                tmp++;
            }
        }
        tbdtmp--;
    }

    if (checkTop()!="gameover")
        resetkeepblack();

}

function getItem(mathrand,type){
    var tmp=[];
    switch (mathrand)
    {
        case 2: tmp=zigzag1;
        break;
        case 3: tmp=littlet1;
        break;
        case 4: tmp=line;
        break;
        case 5: tmp=linetwo;
        break;
        case 6: tmp=dot;
        break;
        case 7: tmp=littlel1;
        break;
        case 8: tmp=square;
        break;
        case 9: tmp=zigzag11;
        break;

    }

    if (type=="current"){
        currentItem1(tmp);
    }else
        previousItem1(tmp);
}

function getItemRotate2(mathrand){

    var tmp;
    switch (mathrand)
    {
        case 2: tmp=zigzag2;
        break;
        case 3: tmp=littlet2;
        break;
        case 4: tmp=linerotated;
        break;
        case 5: tmp=linetworotated;
        break;
        case 6: tmp=dotrotated;
        break;
        case 7: tmp=littlel2;
        break;
        case 8: tmp=squarerotated;
        break;
        case 9: tmp=zigzag12;
        break;
    }

    currentItem1(tmp);
}

function getItemRotate3(mathrand){

    var tmp;
    switch (mathrand)
    {
        case 2: tmp=zigzag1;
        break;
        case 3: tmp=littlet3;
        break;
        case 4: tmp=line;
        break;
        case 5: tmp=linetwo;
        break;
        case 6: tmp=dot;
        break;
        case 7: tmp=littlel3;
        break;
        case 8: tmp=square;
        break;
        case 9: tmp=zigzag11;
        break;
    }

    currentItem1(tmp);
}

function getItemRotate4(mathrand){

    var tmp;
    switch (mathrand)
    {
        case 2: tmp=zigzag2;
        break;
        case 3: tmp=littlet4;
        break;
        case 4: tmp=linerotated;
        break;
        case 5: tmp=linetworotated;
        break;
        case 6: tmp=dotrotated;
        break;
        case 7: tmp=littlel4;
        break;
        case 8: tmp=squarerotated;
        break;
        case 9: tmp=zigzag12;
        break;
    }

    currentItem1(tmp);
}

function currentItem1(tmp1){
   currentItem=[];
    for (i=0;i<tmp1.length;i++){
        currentItem[i]=[];
        for (j=0;j<tmp1[i].length;j++){
            currentItem[i][j]=tmp1[i][j];
        }
    }
}

function previousItem1(tmp2){
    previousItem=[];
    for (i=0;i<tmp2.length;i++){
        previousItem[i]=[];
        for (j=0;j<tmp2[i].length;j++){
            previousItem[i][j]=tmp2[i][j];
        }
    }
}

function drawPreviousItem(){
  for (i=0;i<2;i++){
    for (j=0;j<4;j++){
      gridarrPrevious[i][j]=0;
      gridarrPreviousColor[i][j]="ffffff";
    }
  }

  var igridp=0;
  var jgridp=0;
  var drewline=false;
	for (i=0;i<previousItem.length;i++){
    jgridp=0;
		for (j=0;j<previousItem[i].length;j++){
      if (previousItem[i][j]==1){
          gridarrPrevious[igridp][jgridp]=1;
          gridarrPreviousColor[igridp][jgridp]=previouscolorItem;
          drewline=true;
          jgridp++;
      }

      if (previousItem[i][j]==4 || previousItem[i][j]==5){
          gridarrPrevious[igridp][jgridp]=0;
          gridarrPreviousColor[igridp][jgridp]=="ffffff";
          jgridp++;
      }
		}

    if (drewline)
      igridp++;

    drewline=false;
  }

  resetkeepblackPrevious();
}


function checkTop(){
    test=false;
    for (j=0;j<gridarr[0].length;j++){
        if (gridarr[0][j]==3)
            test="gameover";
    }
    return test;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function getmathrand(){
    return randomIntFromInterval(2,9);
}

function thegameteris(){
    clearTimeout(timeout);
    tbd++;

    var test=checkbottom(middle);

    if (test==false){
        linethingy(middle,test);
		    timeout=setTimeout(function(){thegameteris()},timelaps);
    }else{
        linethingy(middle,test);
        if (checkTop()=="gameover"){
                tbd=-10;
                document.getElementById("gameover").innerHTML="game over <input type='button' value='restart' class='button' onclick='init_tetris()' />";
                document.getElementById("gameover2").innerHTML="game over <input type='button' value='restart' class='button' onclick='init_tetris()' />";
        }else{

                currentitemid=previousitemid;
                previousitemid=getmathrand();
                getItem(currentitemid,"current");
                getItem(previousitemid,"previous");
                middle=middle1;
                previouscolorItem=colorarr[previousitemid-2];
                colorItem=colorarr[currentitemid-2];
                tbd=-1;
                rotatednot=1;
                drawPreviousItem();
                timeout=setTimeout(function(){thegameteris()},timelaps);
        }
    }

}
function clickright(){
    if (checkSimulateItem(middle+1)==true){
        ++middle;
        linethingy(middle,false);
    }
}

function clickleft(){
    if (checkSimulateItem(middle-1)==true){
        --middle;
        linethingy(middle,false);
    }
}
function clickrotate(){
    if (checkItemRotate(middle)==true){
        rotatednot++;
        if (rotatednot==2){
          getItemRotate2(currentitemid);
        }else if (rotatednot==3){
          getItemRotate3(currentitemid);
        }else if (rotatednot==4){
          getItemRotate4(currentitemid);
        }else{
           rotatednot=1;
           getItem(currentitemid,"current");
        }


        linethingy(middle,false);
    }
}

function clickbottom(){
    if (checkbottom(middle)==false){
        clearTimeout(timeout);
        thegameteris();

    }
}


function set_date_init_tetris(){
  const d = new Date();
  let year = d.getFullYear();
  document.getElementById("year").innerHTML=year;
}



/*
function clickleft(event){

	alert(event.key);
}


element.addEventListener("click", function(){ alert("Hello World!"); });
*/
