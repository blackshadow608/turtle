  $(function() {
    $('.clear').click(function(){
      $.turtle.cg();
      $('#turtle').offset({left: 500, top: 300}).pu();

    })
    $( ".draggable" ).draggable({helper: "clone",connectToSortable: "#droppable",
        start: function( event, ui ) {
        var clone = $(ui.helper);
        clone.addClass("xyi");    
      },
         stop: function(event, ui){
          $(ui.helper).css('width','100%');
        }
    });
    $( "#droppable" ).sortable({
      over: function(){
        removeIntent=false
      },
      out:function(){
        removeIntent=true
      },
      beforeStop:function(event, ui){
        if(removeIntent ==true){
          ui.item.remove()
        }
      }
    });
    var isPaused = false;
    var inputVal= "";
    var stopIndex = 0;
    $('.pause').click(function(){isPaused=true;console.log(isPaused)})
    $('.stop').click(function(){stopIndex=0;isPaused=true;})
    $('.play').click(function(){    
      function running(comand, value){
        $('#turtle').speed($('.speedRange').val());
        if (comand === "MOVEpx"){
          $('#turtle').fd(value);
        }
        if (comand === "UP TAIL"){
          $('#turtle').pu();
        }
        if (comand === "TURN LEFTpx"){
          $('#turtle').lt(value);
        }
         if (comand === "TURN RIGHTpx"){
          $('#turtle').rt(value);
        }
         if (comand === "DOWN TAIL"){
          $('#turtle').pd();
        }
      }
      var commands = $('#droppable').children(".xyi");
      var compiled=[];
      for(var i=0;i<commands.size();i++){
        inputVal = "";
        if(commands.eq(i).text()!=='REPEAT')
        {
          if(commands.eq(i).children('input').val())
            {
              inputVal=commands.eq(i).children('input').val();
            }
          compiled.push({
            'command':commands.eq(i).text(),
            'valik':inputVal
          })
        }else{
          var rep=commands.eq(i).children('input').val()-1;
          var tempArray=[];
          i++;          
          while(commands.eq(i).text()!='END'){
            if(commands.eq(i).children('input').val())
            {
              inputVal=commands.eq(i).children('input').val();
            }
            tempArray.push({
              'command':commands.eq(i).text(),
              'valik':commands.eq(i).children('input').val()
            })
            i++;
          }
          var tmp=tempArray
          for (var j=0;j<rep;j++){
            tempArray=tempArray.concat(tmp);
          }
          console.log(tempArray);

          compiled = compiled.concat(tempArray);
        }
      }
      isPaused = false;
      var i = stopIndex;      
      function f(){
        setTimeout(function(){
          running(compiled[i].command,compiled[i].valik);
          ++i;
          console.log(i);
          if (isPaused) stopIndex=i;
          if(i>=compiled.length-1) stopIndex=0;
          if(i<compiled.length && !isPaused){
            f(stopIndex);
          }
        }, 1000/$('.speedRange').val());
      }
      f();      
    });    
  });