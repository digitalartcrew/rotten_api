$(function(){

var movieIds = ["771305050","770672122", "771382361", "771379327", 
"771258835", "771382352", "771415974", "771324839", "770680853",
"771314279", "771378742", "771417663", "771312080", "771323153"];

 var data;
 var $movie_preview = $("#movie_preview");
 var movieChoice = $("#movieSelect").val();
 var count = 0;
 var snacks = [];
 var snackbar = 0;
 var timerInt;
 var c = 11;

 //Snack Bar Cost
      //Buy Snacks
      $(".soda").on("click", function(){
        if(count>0){
        if (snackbar<6){
        $(".snack_loader").append("<div class='soda'></div>");
        snackbar++;
        count--;
      }
      }
        $(".scoreUp").text("$"+count);  
      });


      $(".candy").on("click", function(){
        if(count>0){
        if (snackbar<6){
        $(".snack_loader").append("<div class='candy'></div>");
        snackbar++;
        count-=2;
      }
      }
        $(".scoreUp").text("$"+count);  
      });


       $(".popcorn").on("click", function(){
     if(count>0){
        if (snackbar<6){
        $(".snack_loader").append("<div class='popcorn'></div>");
        snackbar++;
        count-=3;
      }
      }
        $(".scoreUp").text("$"+count);  
      });


        $(".peanuts").on("click", function(){
      if(count>0){
        if (snackbar<6){
        $(".snack_loader").append("<div class='peanuts'></div>");
        snackbar++;
        count-=4;
      }
      }
        $(".scoreUp").text("$"+count);  
      });


         $(".hotdog").on("click", function(){
         if(count>0){
        if (snackbar<6){
        $(".snack_loader").append("<div class='hotdog'></div>");
        snackbar++;
        count-=5;
      }
      }
        $(".scoreUp").text("$"+count);  
      });




    



     $("#next-bt").on("click", nextMovie); 
     $(".buyFood").on("click", buyFood);

     function generateMovie(){
        $.ajax({
        method: "GET",
        url: "http://api.rottentomatoes.com/api/public/v1.0/movies/"+_.sample(movieIds)+"/clips.json?",
        data: {
        apikey: "dyp348ambaanxxsqknfp94hu",
        },
        dataType: "jsonp",
        }).done(function(response){
           startClock();
         data = response; 
        
         $movie_preview.attr('src', data.clips[0].thumbnail);
         $("h2").text("????");
         submitMovie();
          console.log(data); 

            //Redeem Snack Hints
  $(".snack_loader").on("click",".soda", function(){
    $(this).removeClass("soda");
    var hint = _.first(data.clips[0].title, 1);
     $("h2").text("Hint"+": "+ hint.join(""));
    console.log(hint.join(""));
  }); 

    $(".snack_loader").on("click",".candy", function(){
    $(this).removeClass("candy");
    var hint = _.first(data.clips[0].title, 2);
     $("h2").text("Hint"+": "+ hint.join(""));
    console.log(hint.join(""));
  }); 

      $(".snack_loader").on("click",".popcorn", function(){
    $(this).removeClass("popcorn");
    var hint = _.first(data.clips[0].title, 3);
     $("h2").text("Hint"+": "+ hint.join(""));
    console.log(hint.join(""));
  }); 

        $(".snack_loader").on("click",".peanuts", function(){
    $(this).removeClass("peanuts");
    var hint = _.first(data.clips[0].title, 4);
     $("h2").text("Hint"+": "+ hint.join(""));
    console.log(hint.join(""));
  }); 

          $(".snack_loader").on("click",".hotdog", function(){
    $(this).removeClass("hotdog");
    var hint = _.first(data.clips[0].title, 5);
     $("h2").text("Hint"+": "+ hint.join(""));
    console.log(hint.join(""));
  }); 



        });
        }

       
    function submitMovie (){
    
          $("form").submit(function(){
        if( $("#movieSelect").val() === data.clips[0].title){
        // $("h2").text(data.clips[0].title);
        $("h2").text("Correct.");
        
        $(".scoreUp").text("$"+count);
        count++;
        console.log("Winner");
        $("#movieSelect").val("");

        } else {

        	 $("h2").text("Try Again");
        console.log("try again");
        $("#movieSelect").val("");
        }
        });
    }

//Timer

    function startClock() {
      if (c >= 0) {
      timerInt = setInterval(timer, 1000);
      console.log("Clock started!");
      }
    }

    function timer(){
      $(".timer").text(c);
      c--;
      // console.log(c);

        if(c>=0){
        $(".timer").text(c);

          }
        if(c===0){
             $("h2").text(data.clips[0].title);
             clearInterval(timerInt);
             c = 11;
             setTimeout(generateMovie, 3000);
        }

    }

    function stopClock() {
      clearInterval(timerInt);
      console.log("Interval stopped!");
    }



    function buyFood(){
      $("#hotdog").click(function(){
        console.log(count -hotdog);
        console.log("button working");
      });


      //Highlight Concession div
      //Have user select an input
      //Give each snack a value
      //Subtract this value from count
    }

   // Invoke when 'Next Scene' is clicked 
   function nextMovie() {
     clearInterval(timerInt);
     c = 11;
     generateMovie();
   }

generateMovie();





});