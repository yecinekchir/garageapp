/**
 * Created by yecin on 06/02/2016.
 */
var dataLevel = [];
function loadData(){
    $.ajax
    ({
        url: "data.json",
        contentType: 'application/json',
        dataType: 'json',
        success: function(data)
        {
            dataLevel[0] = data.levels[0];
            dataLevel[1] = data.levels[1];
            console.log(dataLevel);
            showData();
        },

        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR);
        }
    })
}

function showData(){
    //Level 1
    for(i=0;i<24;i++){
        var row = document.createElement("tr");
        var time = document.createElement("th");
        if(i<10){
            time.innerHTML = "0"+i+":00";
        }
        else{
            time.innerHTML = i+":00";
        }
        time.width = "15px";
        var parking1 = document.createElement("th");
        parking1.id = "parking1Col1row"+i;
        parking1.width = "25px";
        var parking2 = document.createElement("th");
        parking2.id = "parking1Col2row"+i;
        parking2.width = "25px";
        var parking3 = document.createElement("th");
        parking3.id = "parking1Col3row"+i;
        parking3.width = "25px";
        var parking4 = document.createElement("th");
        parking4.id = "parking1Col4row"+i;
        parking4.width = "25px";
        row.appendChild(time);
        row.appendChild(parking1);
        row.appendChild(parking2);
        row.appendChild(parking3);
        row.appendChild(parking4);
        document.getElementById("parkingLevel1").appendChild(row);
    }
    for(i=0;i<dataLevel[0].slots.length;i++){
        for(j=0;j<dataLevel[0].slots[i].parkings.length;j++){
            var d = new Date(2016,1,7);
            d.setHours(0);
            d.setSeconds(0);
            d.setMinutes(dataLevel[0].slots[i].parkings[j].time);
            var element = "parking1Col"+ (i+1) +"row"+ d.getHours();
            console.log(element);
            document.getElementById(element).style.backgroundColor = "#f0f0f0";
            var plate = dataLevel[0].slots[i].parkings[j].plate;
            document.getElementById(element).innerHTML = plate;
            document.getElementById(element).value = i+""+j;
            document.getElementById(element).onclick = function() { getDetails(this.value,0); };
        }
    }
    //Level 2
    for(i=0;i<24;i++){
        row = document.createElement("tr");
        time = document.createElement("th");
        if(i<10){
            time.innerHTML = "0"+i+":00";
        }
        else{
            time.innerHTML = i+":00";
        }
        time.width = "15px";
        parking1 = document.createElement("th");
        parking1.id = "parking2Col1row"+i;
        parking1.width = "25px";
        parking2 = document.createElement("th");
        parking2.id = "parking2Col2row"+i;
        parking2.width = "25px";
        parking3 = document.createElement("th");
        parking3.width = "25px";
        parking3.id = "parking2Col3row"+i;
        row.appendChild(time);
        row.appendChild(parking1);
        row.appendChild(parking2);
        row.appendChild(parking3);
        document.getElementById("parkingLevel2").appendChild(row);
    }
    for(i=0;i<dataLevel[1].slots.length;i++){
        for(j=0;j<dataLevel[1].slots[i].parkings.length;j++){
            d = new Date(2016,1,7);
            d.setHours(0);
            d.setSeconds(0);
            d.setMinutes(dataLevel[1].slots[i].parkings[j].time);
            element = "parking2Col"+ (i+1) +"row"+ d.getHours();
            console.log(element);
            document.getElementById(element).style.backgroundColor = "#f0f0f0";
            plate = dataLevel[1].slots[i].parkings[j].plate;
            document.getElementById(element).innerHTML = plate;
            document.getElementById(element).value = i+""+j;
            document.getElementById(element).onclick = function() { getDetails(this.value,1); };
        }
    }
}

function getDetails(details,level){
    var startDate = new Date(2016,1,7);
    var endDate = new Date(2016,1,7);
    startDate.setHours(0);
    startDate.setSeconds(0);
    startDate.setMinutes(dataLevel[level].slots[details[0]].parkings[details[1]].time);
    endDate.setMinutes(dataLevel[level].slots[details[0]].parkings[details[1]].time + 60);
    document.getElementById("plate").innerHTML = dataLevel[level].slots[details[0]].parkings[details[1]].plate;
    document.getElementById("startTime").innerHTML = "Parked in<br>"+startDate.getHours() +":"+ startDate.getMinutes();
    document.getElementById("endTime").innerHTML = "Stays until<br>"+endDate.getHours() +":"+ endDate.getMinutes();
}

var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
    showLeft = document.getElementById( 'showLeft' ),
    hideLeft = document.getElementById( 'hideLeft' )

showLeft.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( menuLeft, 'cbp-spmenu-open' );
    disableOther( 'showLeft' );
};

hideLeft.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( menuLeft, 'cbp-spmenu-open' );
    disableOther( 'showLeft' );
};

function disableOther( button ) {
    if( button !== 'showLeft' ) {
        classie.toggle( showLeft, 'disabled' );
    }
}