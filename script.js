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
      isPaused = false;
      var commands = $('#droppable').children(".xyi");
      var i = stopIndex;      
      function f(){
        setTimeout(function(){
          if(commands.eq(i).children('input').val())
          {
            inputVal=commands.eq(i).children('input').val();
          }

          if(commands.eq(i).text()==='REPEAT')
          {   var k=0;         
            for (var j = 0; j < commands.eq(i).children('input').val(); j++) {
                
              function repeat(){
              setTimeout(function(){
              k=i;
              while(commands.eq(k).text() !== 'END'){         
                if(commands.eq(k).children('input').val())
                {
                  inputVal=commands.eq(k).children('input').val();
                }
                running(commands.eq(k).text(),inputVal);
                ++k;
                }
              }, 1000/$('.speedRange').val());}
              
              repeat();
            };
            console.log(k);
            if(j==commands.eq(i).children('input').val()-1){i=k;}
          }

          running(commands.eq(i).text(),inputVal);
          ++i;
          console.log(i);
          if (isPaused) stopIndex=i;
          if(i>=commands.size()-1) stopIndex=0;
          if(i<commands.size() && !isPaused){
            f(stopIndex);
          }
        }, 1000/$('.speedRange').val());
      }
      f();      
    });    
  });