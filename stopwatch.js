$(document).ready(function(){
    var mode =0;
    var lapCounter=0;
    var timeCounter=0;
    var action;
    var lapnumber=0;
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //show only buttons in use for now
    hideShowbuttons("#startButton","#LapButton");
    
    //
    $("#startButton").click(function(){
        mode=1;
        hideShowbuttons("#stopButton","#LapButton");
        startAction();
    });
    
    $("#stopButton").click(function(){
        hideShowbuttons("#ResumeButton","#resetButton");
        clearInterval(action);
    });
    
    $("#ResumeButton").click(function(){
        hideShowbuttons("#stopButton","#LapButton");
        startAction();
    });
    
    $("#LapButton").click(function(){
        if(mode){
            clearInterval(action);
            lapCounter =0;
            addLap();
            startAction();
        }
    });
    
    $("#resetButton").click(function(){
        location.reload();
    });

    
    
    
    //Functions
    
    
    
    function hideShowbuttons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    
    
    
    function startAction(){
        action = setInterval(function(){
                timeCounter++;
                if(timeCounter == 60*100*100){
                    timeCounter =0;
                }
                lapCounter++;
                if(lapCounter == 60*100*100){
                    lapCounter =0;
                }
                updateTime();
            },10);
    }
    
    
    
    
    
    /* */
    function updateTime(){
        
        // Calculating timeMinutes,lapSeconds,lapCentiseconds from the lapCounter's current value.
        timeMinutes= Math.floor(timeCounter/6000);
        timeSeconds= Math.floor((timeCounter%6000)/100);
        timeCentiseconds= Math.floor(timeCounter%6000)%100;
        
        // Using 'text' class/method of jquery by passing our element(<span>) with ID #timeminutes to jquery for the purpose of display.
        // 'format' function called for displaying lapMinutes,lapseconds and lapCentiseconds in double digit format.
        $("#timeminutes").text(format(timeMinutes));
        $("#timeseconds").text(format(timeSeconds));
        $("#timecentiseconds").text(format(timeCentiseconds));

        // Calculating lapMinutes,lapseconds,lapCentiseconds from the lapCounter's current value.
        lapMinutes= Math.floor(lapCounter/6000);
        lapseconds= Math.floor((lapCounter%6000)/100);
        lapCentiseconds= Math.floor(lapCounter%6000)%100;
        
        // Using 'text' class/method of jquery by passing our element(<span>) with ID #lapminutes to jquery for the purpose of display.
        // 'format' function called for displaying lapMinutes,lapseconds and lapCentiseconds in double digit format.
        $("#lapminutes").text(format(lapMinutes));
        $("#lapseconds").text(format(lapseconds));
        $("#lapcentiseconds").text(format(lapCentiseconds));
    }
    
    
    
    
    
    /* This is a function to keep the number format of our 'Lap' and 'Time' spans in form of double digits like this "01:02:50". Not like
       this "1:2:50".*/
    
    function format(number){
        if(number<10){
            return "0" + number;
        }else{
            return number;
        }
    }
    
    
    
    
    
    /* This is a function for adding laps on our web page by clicking 'lap' button. Here we increase the 'lapnumber' counter everytime you click        'lap' button for printing laps in numeric order like Lap1, Lap2, Lap3....so on. Here we made an element structure which consists of              'lapnumber'(Lap1,Lap2...) and 'laptime'(0:23:56) for records. Here we have made element in script inside a function. This is how we design      an element in <script> or '.js' file(inside a function). Here we designed 'div' within 'divs'. Here, we have stored the element we build        inside a variable for further use, for example if we want to append this element to another parent element. We can do this by passing            variable to jquery in which we stored our element. Like we did at last '$(myLapDetails).appendTo("#lap");'.*/
    
    function addLap(){
        lapnumber++;
        var myLapDetails=
            '<div class = "laps">'+
                '<div class = "laptimetitle">'+
                    'Lap' + lapnumber +
                '</div>'+
                '<div class = "laptime">'+
                    '<span>'+ format(lapMinutes)+ '</span>' + ':' + '<span>' + format(lapseconds)+ '</span>' + ':' + '<span>' + format(lapCentiseconds) + '</span>'+
                '</div>'+
            '</div>';
        $(myLapDetails).appendTo("#lap");
    }
});