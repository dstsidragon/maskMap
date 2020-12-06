

//DOM
var informationList = document.querySelector('.informationList');

//取得今日日期
var _Today=new Date();
var _day = _Today.getDay();


//顯示日期&可購買證號
function showdate(){
    datechangechiness()
    iddaycanbuy()

var fullyear = _Today.getUTCFullYear()+'-'+(_Today.getMonth()+1)+'-'+_Today.getDate(); 

document.querySelector('.yymmdd').innerHTML = fullyear;
};
//星期轉換國字
function datechangechiness(){
    switch(_day){
        case 0:
            day="日";
            break;
        case 1:
            day="一";
            break;
        case 2:
            day="二";
            break;
        case 3:
            day="三";
            break;
        case 4:
            day="四";
            break;
        case 5:
            day="五";
            break;
        case 6:
            day="六";
            break;

    }
    document.querySelector('.day').innerHTML="星期" + day;
}  
//篩選身分證號
function iddaycanbuy(){
    switch(_day){
        case 0:
            day="0~9";
            break;
        case 1:
            day="1,3,5,7,9";
            break;
        case 2:
            day="2,4,6,8,0";
            break;
        case 3:
            day="1,3,5,7,9";
            break;
        case 4:
            day="2,4,6,8,0";
            break;
        case 5:
            day="1,3,5,7,9";
            break;
        case 6:
            day="2,4,6,8,0";
            break;

    }
    document.querySelector('.idcanbuy').innerHTML='身分證末碼為<em class="idcode">'+ day+"</em>可購買";
}

//宣告地圖的值
var  l=22.604799;
var y= 120.2976256;
var map = L.map('map', {
    center: [l,y],
    zoom: 11
});


//將載入的地圖資訊加到變數--Leaflet OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//點擊地圖，顯示經緯度
function onMapClick(e) {
	L.popup().setLatLng(e.latlng)
		.setContent('經緯度'+e.latlng.toString())
		.openOn(map)
};
map.on('click',onMapClick);

//icon樣式
var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
var blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
var goldIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  //新增一個圖層，專門放ICON群組
  var markers = new L.MarkerClusterGroup().addTo(map);;

  
//載入JSON
var maskjsonData;
var maskjson;
function getjsonDate(){
    //開啟一個網路請求
      maskjson= new XMLHttpRequest();
    //跟伺服器要藥局口罩剩餘數量
    maskjson.open('get','https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
    
    //執行要資料的動作
    maskjson.send();
    
  
    var maskInf=" ";
    //當資料回傳時，執行以下語法
    maskjson.onload = function(){
        //將回傳的預設string資料，轉換成物件陣列的JSON格式
         maskjsonData = JSON.parse(maskjson.responseText);
       
              //執行顯示藥局marker
              pharmacyInf()
        //藥局資訊
        function showinformation(){
        var maskInf="";
        var maskLen = maskjsonData.features.length;
        for(var i = 0 ; i<maskLen;i++){
            //如果成人口罩沒貨就顯示灰色有就藍色
            var str='';
            if(maskjsonData.features[i].properties.mask_adult>0){
                str='#73C0D8';
            }else{
                str='#A5A5A5';
            };
            //如果兒童口罩沒貨就顯示灰色有就橘色
            var asd='';
            if(maskjsonData.features[i].properties.mask_child>0){
                asd='#FFA573';
            }else{
                asd='#A5A5A5';
            };
            maskInf+='<li class="infList"><h2>'+maskjsonData.features[i].properties.name+'</h2><p class="lii">'+maskjsonData.features[i].properties.address+'</p><p class="lii">'+maskjsonData.features[i].properties.phone+'<p><p class="lii">店家資訊:'+maskjsonData.features[i].properties.note+'</p><p class="mask_adult"style="background-color:'+str+';">成人口罩'+maskjsonData.features[i].properties.mask_adult+'</p><p class="mask_child" style="background-color:'+asd+';">兒童口罩'+maskjsonData.features[i].properties.mask_child+'</p></li>';
        }
            
        
        informationList.innerHTML=maskInf;
         };
         showinformation()
              };}
  //顯示藥局marker
function pharmacyInf(){
               
    for(var i =0;maskjsonData.features.length>i;i++){
        var mask;
        //如果成人口罩沒貨就顯示灰色有就藍色
        var str='';
        
        if(maskjsonData.features[i].properties.mask_adult===0){
        str='#A5A5A5';
        }else{
        str='#73C0D8';
         };
        //如果兒童口罩沒貨就顯示灰色有就橘色
        var asd='';
        if(maskjsonData.features[i].properties.mask_child===0){
            asd='#A5A5A5';
        }else{
            asd='#FFA573';
        };
                 //依口罩剩餘數量去用顏色marker在地圖上
       
                   if(maskjsonData.features[i].properties.mask_adult == 0&&maskjsonData.features[i].properties.mask_child == 0){
                    mask = redIcon;
                   }else if(maskjsonData.features[i].properties.mask_adult > 0&&maskjsonData.features[i].properties.mask_child == 0){
                    mask = greenIcon;
                   }else if(maskjsonData.features[i].properties.mask_adult == 0&&maskjsonData.features[i].properties.mask_child > 0){
                    mask = blueIcon;
                   }else{
                    mask = goldIcon;
                }
            
                    markers.addLayer(L.marker([maskjsonData.features[i].geometry.coordinates[1],maskjsonData.features[i].geometry.coordinates[0]], {icon: mask}).bindPopup( '<h2>'+maskjsonData.features[i].properties.name+'</h2><p class="lii">'+maskjsonData.features[i].properties.address+'</p><p class="lii">'+maskjsonData.features[i].properties.phone+'<p><p class="lii">店家資訊:'+maskjsonData.features[i].properties.note+'</p><p class="mask_adult"style="background-color:'+str+';">成人口罩'+maskjsonData.features[i].properties.mask_adult+'</p><p class="mask_child" style="background-color:'+asd+';">兒童口罩'+maskjsonData.features[i].properties.mask_child+'</p>'));
                 
                   }
                   map.addLayer(markers);
                };

//地區選單
var data =[
    {country:"--請選擇縣市--",Name:"--請選擇行政區--"},{country:"花蓮縣",Name:[ "--請選擇行政區--" ,"花蓮市", "新城鄉", "秀林鄉","吉安鄉","壽豐鄉" , "鳳林鎮","光復鄉","豐濱鄉","瑞穗鄉","萬榮鄉","玉里鎮", "卓溪鄉" ]}
    ,{country:'基隆市',Name:["--請選擇行政區--" ,"仁愛區","信義區","中正區","安樂區","暖暖區","七堵區","中山區" ]},
    {country:'臺北市',Name:["--請選擇行政區--" ,"中正區","大同區","中山區","松山區","大安區","萬華區","信義區","士林區","北投區" ,"內湖區","南港區" ,"文山區" ]},
    {country:'新北市',Name:["--請選擇行政區--" ,"萬里區","金山區" ,"板橋區","汐止區", "深坑區","石碇區","瑞芳區","平溪區","雙溪區","貢寮區","新店區","坪林區","烏來區","永和區","中和區","土城區", "三峽區","樹林區","鶯歌區","三重區","新莊區", "泰山區","林口區","蘆洲區","五股區", "八里區","淡水區","三芝區","石門區"]},
    {country:'宜蘭縣',Name:["--請選擇行政區--" ,"宜蘭市","頭城鎮", "礁溪鄉","壯圍鄉","員山鄉","羅東鎮","三星鄉","大同鄉", "五結鄉","冬山鄉" , "蘇澳鎮","南澳鄉"]},
    {country:'桃園縣',Name:[ "--請選擇行政區--" ,"中壢市","平鎮市","龍潭鄉","楊梅市", "新屋鄉", "觀音鄉","桃園市","龜山鄉","八德市","大溪鎮","復興鄉","大園鄉","蘆竹鄉"]},
    {country:'新竹市',Name:["--請選擇行政區--" ,"東區","北區","香山區"]},
    {country:'新竹縣',Name:["--請選擇行政區--" , "竹北市","湖口鄉","新豐鄉","新埔鎮", "關西鎮","芎林鄉","寶山鄉","竹東鎮","五峰鄉","橫山鄉","尖石鄉","北埔鄉","峨眉鄉"] },
    {country:'苗栗縣',Name:["--請選擇行政區--" ,"竹南鎮","頭份鎮","三灣鄉","南庄鄉","獅潭鄉", "後龍鎮", "通霄鎮","苑裡鎮","苗栗市", "造橋鄉","頭屋鄉","公館鄉","大湖鄉", "泰安鄉","銅鑼鄉", "三義鄉","西湖鄉","卓蘭鎮"] },
    { country:'臺中市',Name:[ "--請選擇行政區--" ,"中區", "東區", "南區", "西區", "北區", "北屯區", "西屯區" , "南屯區", "太平區",  "大里區" ,"霧峰區","烏日區" , "豐原區","后里區" , "石岡區", "東勢區","和平區", "新社區","潭子區", "大雅區", "神岡區","大肚區","沙鹿區",  "龍井區", "梧棲區", "清水區","大甲區", "外埔區", "大安區"]},
    {country:'彰化縣',Name:[ "--請選擇行政區--" ,"彰化市", "芬園鄉","花壇鄉", "秀水鄉","鹿港鎮", "福興鄉", "線西鄉","和美鎮", "伸港鄉" ,"員林鎮", "社頭鄉", "永靖鄉","埔心鄉","溪湖鎮", "大村鄉", "埔鹽鄉","田中鎮", "北斗鎮","田尾鄉","埤頭鄉", "溪州鄉","竹塘鄉","二林鎮","大城鄉","芳苑鄉","二水鄉" ]},
    {country:'南投縣',Name:[ "--請選擇行政區--" ,"南投市", "中寮鄉","草屯鎮","國姓鄉","埔里鎮", "仁愛鄉", "名間鄉","集集鎮", "水里鄉","魚池鄉","信義鄉","竹山鎮", "鹿谷鄉"]},
    {country:'雲林縣',Name:[ "--請選擇行政區--" ,"斗南鎮", "大埤鄉", "虎尾鎮","土庫鎮","褒忠鄉","東勢鄉","台西鄉","崙背鄉","麥寮鄉","斗六市", "林內鄉","古坑鄉","莿桐鄉","西螺鎮","二崙鄉","北港鎮","水林鄉", "口湖鄉", "四湖鄉","元長鄉" ]},
    {country:'嘉義市',Name:[ "--請選擇行政區--" ,"東區","西區"] },
    {country:'嘉義縣',Name:["--請選擇行政區--" ,"番路鄉","梅山鄉", "竹崎鄉","阿里山鄉","中埔鄉" , "大埔鄉","水上鄉" , "鹿草鄉","太保市", "朴子市","東石鄉" ,"六腳鄉","新港鄉", "民雄鄉","大林鎮", "溪口鄉","義竹鄉","布袋鎮" ]  },
    {country:'臺南市',Name:[ "--請選擇行政區--" , "中西區", "東區","南區", "北區","安平區","安南區","永康區", "歸仁區","新化區","左鎮區", "玉井區","楠西區","南化區","仁德區","關廟區", "龍崎區", "官田區", "麻豆區", "佳里區","西港區", "七股區", "將軍區","學甲區","北門區" , "新營區" ,"後壁區" ,"白河區","東山區","六甲區","下營區","柳營區","鹽水區", "善化區", "大內區", "山上區","新市區", "安定區"] },
    {country:'高雄市',Name:["--請選擇行政區--" ,"新興區", "前金區", "苓雅區","鹽埕區","鼓山區","旗津區", "前鎮區","三民區", "楠梓區", "小港區", "左營區", "仁武區","大社區","岡山區" , "路竹區", "阿蓮區", "田寮區",  "燕巢區" ,"橋頭區" ,"梓官區", "彌陀區", "永安區" , "湖內區","鳳山區" ,"大寮區" , "林園區","鳥松區"  , "大樹區","旗山區" , "美濃區","六龜區" ,"內門區" , "杉林區"  ,"甲仙區", "桃源區", "那瑪夏區", "茂林區","茄萣區" ]},
    {country:'屏東縣',Name:["--請選擇行政區--" ,"屏東市" , "三地門鄉","霧台鄉", "瑪家鄉" ,  "九如鄉","里港鄉","高樹鄉","鹽埔鄉","長治鄉","麟洛鄉","竹田鄉","內埔鄉" , "萬丹鄉","潮州鎮", "泰武鄉" ,"來義鄉", "萬巒鄉","崁頂鄉", "新埤鄉" , "南州鄉","林邊鄉", "東港鎮","琉球鄉","佳冬鄉","新園鄉","枋寮鄉","枋山鄉",  "春日鄉", "獅子鄉" ,"車城鄉" , "牡丹鄉", "恆春鎮", "滿州鄉"]},
    {country:'臺東縣',Name:[ "--請選擇行政區--" ,"台東市", "綠島鄉", "蘭嶼鄉", "延平鄉","卑南鄉" ,"鹿野鄉","關山鎮", "海端鄉","池上鄉","東河鄉","成功鎮", "長濱鄉","太麻里鄉","金峰鄉","大武鄉","達仁鄉"] },
    {country:'澎湖縣',Name:["--請選擇行政區--" ,"馬公市"  ,"西嶼鄉"  ,"望安鄉","七美鄉","白沙鄉","湖西鄉" ]},
    {country:'金門縣',Name:[ "--請選擇行政區--" ,"金沙鎮" ,"金湖鎮", "金寧鄉"  ,"金城鎮", "烈嶼鄉",  "烏坵鄉" ]},
    {country:'連江縣',Name:["--請選擇行政區--" ,"南竿鄉","北竿鄉",  "莒光鄉","東引鄉" ]}];


var local = document.querySelector('.local');
var areaselection= document.querySelector('.areaselection');
//縣市選單
function localSelect(){
    var str;
    for(var i=0;i<data.length;i++){
        str+='<option value =' + i +'>'+data[i].country+'</option>';
    }
    local.innerHTML=str;
    
};
//產生區選單
var countryName =document.querySelector('.local2');
var checkcity;
function addcountryname(e){
    var str ="";
  
   
        for(var  i = 0 ; i <data[e.target.value].Name.length  ; i++) {

            str+='<option >'+data[e.target.value].Name[i]+'</option>';
        }
    countryName.innerHTML = str;
    
    
}

//切換鎮區

function movelocal(e){

    var maskInf="";
    
    // console.log(maskjsonData.features.length)
    for(let i = 0 ; i<maskjsonData.features.length;i++){
   
        //如果成人口罩沒貨就顯示灰色有就藍色
        var str='';
        if(e.target.value==maskjsonData.features[i].properties.town){
                 
        if(maskjsonData.features[i].properties.mask_adult===0){
            str='#A5A5A5';
        }else{
            str='#73C0D8';
        };
        //如果兒童口罩沒貨就顯示灰色有就橘色
        var asd='';
        if(maskjsonData.features[i].properties.mask_child===0){
            asd='#A5A5A5';
        }else{
            asd='#FFA573';
        };
        maskInf+='<li class="infList"><h2>'+maskjsonData.features[i].properties.name+'</h2><p class="lii">'+maskjsonData.features[i].properties.address+'</p><p class="lii">'+maskjsonData.features[i].properties.phone+'<p><p class="lii">店家資訊:'+maskjsonData.features[i].properties.note+'</p><p class="mask_adult"style="background-color:'+str+';">成人口罩'+maskjsonData.features[i].properties.mask_adult+'</p><p class="mask_child" style="background-color:'+asd+';">兒童口罩'+maskjsonData.features[i].properties.mask_child+'</p></li>';

        }
        
        informationList.innerHTML=maskInf;}
};
      

          
//f區選單變換移轉經緯度
function changeSite(e){
    
    for(var i =0;maskjsonData.features.length>i;i++){
        if(e.target.value==maskjsonData.features[i].properties.town){
            map.setView([maskjsonData.features[i].geometry.coordinates[1] , maskjsonData.features[i].geometry.coordinates[0]], 16)
            
        }
    }


};


//點擊收合開啟視窗
var closeSelect= document.querySelector('.close');
var openSelect = document.querySelector('.open');
var openclose = document.querySelector('.openclose');
var menu =document.querySelector('.menu');

//收合並顯示打開選單圖示
function clickCloseSelect(e){
    e.preventDefault();
    
    menu.setAttribute('style',' display: none');
    closeSelect.setAttribute('style',' display:none');
    openSelect.setAttribute('style',' display:block')
}
//打開並顯示收合選單圖示
function clickOpenSelect(e){
    e.preventDefault();
    menu.setAttribute('style',' display: block');
    closeSelect.setAttribute('style',' display:block');
    openSelect.setAttribute('style',' display:none')
}


//事件
/*產生區選單 */
local.addEventListener("change",addcountryname,false)
/*產生藥局資訊*/ 

countryName.addEventListener('change',movelocal,false)
//點擊LI移轉經緯度
countryName.addEventListener('change',changeSite,false)
//點擊收合視窗
closeSelect.addEventListener('click',clickCloseSelect,false)
//點擊打開視窗
openSelect.addEventListener('click',clickOpenSelect,false)


//畫面初始執行
function init(){
    //日期
    showdate()

    //下拉選單
    localSelect()
    //讀取JSON
    getjsonDate()
};



//讀取執行
window.onload = function(){
    init( );
};
