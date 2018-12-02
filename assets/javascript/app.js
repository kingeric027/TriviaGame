
var time = 20;
var q = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var intervalId;

var trivia = {questions: ["Who was the 2nd president of the United States?",
"In what battle did the British forces surrender to George Washington?",
"What date did the stock market crash, marking the beginning of the 'Great Depression'?",
"How many men signed the Declaration of Independence?",
"How many states seceded from the Union in the Civil War?",
"How many Americans were killed in the Civil War?",
"What river did George Washington famously cross to attack the British on Christmas Eve?",
"What U.S. president commissioned the expidition of Lewis and Clark?",
"What famous American is on the $50 dollar bill?"],

answers:["John Adams","Yorktown","October 29th, 1929", "56","11","620,000",
"Ohio River","Thomas Jefferson","Ulysses S. Grant"],

options:["Thomas Jefferson", "John Adams","Alexander Hamilton","James Madison",
"Lexington","Bunker Hill","Saratoga","Yorktown",
"October 29th, 1929","November 1st, 1920","October 20th, 1930","June 18th, 1912",
"13","7","71","56",
"5","6","13","11",
"5,000","25,000","235,000","620,000",
"Allegheny River","Ohio River","Missouri River","Mississippi River",
"George Washington","Thomas Jefferson","James Monroe","Ulysses S. Grant",
"Theodore Rosevelt", "Harriet Tubman", "Ulysses S. Grant", "Martin Luther King Jr."],

gifs: ["https://media.giphy.com/media/3o7btZSWGqBFMJfPcQ/giphy.gif",
"https://media.giphy.com/media/3ohhwIYnvpQOc4fmRa/giphy.gif",
"https://media.giphy.com/media/ftGTY1fO9ARUI/giphy.gif",
"https://media.giphy.com/media/FoT5Xj1MUg78Q/giphy.gif",
"https://media.giphy.com/media/l2Sq7hRcP1BjnJqSs/giphy.gif",
"https://media.giphy.com/media/B313NwxrHpzUs/giphy.gif",
"https://media.giphy.com/media/HNs7T1ZhUls0o/giphy.gif",
"https://media.giphy.com/media/4PomNMh0h3Gpi/giphy.gif",
"https://media.giphy.com/media/uFtywzELtkFzi/giphy.gif"]
};

questionAsk = function(){
    time = 20;
    $(".time").text("Time Remaining: " + time);
    $(".time").css({"color":"black"});
    run();
    //countdown();
    $(".options").html("");
    var o1 = $("<div>").text(trivia.options[4*q]);
    o1.addClass("choice");
    var o2 = $("<div>").text(trivia.options[4*q+1]);
    o2.addClass("choice");
    var o3 = $("<div>").text(trivia.options[4*q+2]);
    o3.addClass("choice");
    var o4 = $("<div>").text(trivia.options[4*q+3]);
    o4.addClass("choice");
    $(".question").text(trivia.questions[q]);
    $(".question").css({"color":"black",
                        "font-size":"20px"});
    $(".options").append(o1, o2, o3, o4);
    $("button").remove();
};

userResponse = function(event){
    stop();
    if(event=="empty"){
        $(".question").text("Out of time!");
        $(".options").html("The correct answer is " + trivia.answers[q]);
        unanswered++;
    } else{
        let answer = event.target.innerHTML;
        console.log(answer);
        if(answer == trivia.answers[q]){
            $(".question").text("Correct!");
            $(".question").css({"color":"darkgreen",
                                "font-size":"28px",
                            "font-weight":"bold"});
            $(".options").html("");
            var gif = $("<img>");
            gif.attr("src", trivia.gifs[q]);
            $(".options").append(gif);
            correct++;
        }else{
            $(".question").text("Nope!");
            $(".question").css({"color":"darkred",
                                "font-size":"28px",
                            "font-weight":"bold"});
            $(".options").html("The correct answer is " + trivia.answers[q]);
            incorrect ++;
        }
    }
    q++;
    if(q>=trivia.questions.length){
        setTimeout(displayResults, 4000);
    }else{
        setTimeout(questionAsk, 4000);
    }
};

displayResults = function(){
    stop();
    $(".time").text("");
    $(".options").html("");
    $(".question").text("All done, here's how you did!");
    var r1 = $("<div>").text("Correct nswers: " + correct);
    var r2 = $("<div>").text("Incorrect answers: " + incorrect);
    var r3 = $("<div>").text("Unanswered: " + unanswered);
    var r4 = $("<div>").text("Start Over");
    r4.addClass("restart");
    $(".options").append(r1, r2, r3, r4);
}




function run() {
    clearInterval(intervalId);
    intervalId = setInterval(countdown, 1000);
}

countdown = function() {
    time = time - 1;
    $(".time").text("Time Remaining: " + time);
    if(time<10){
        $(".time").css({"color":"darkred"});
    }
    if(time==0){
        userResponse("empty");
    }
}

function stop() {
    clearInterval(intervalId);
}

function restart(){
    time = 30;
    q = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0; 
    questionAsk();
}


$(document).ready(function() {
    $("button").on("click", function() {
        questionAsk();
        //console.log("start");       
        //setInterval(countdown, 1000);
    });

    $(".options").on("click", ".choice", function(e) {
        userResponse(e);
        console.log(q);
        console.log(trivia.questions.length);
        //if(q>=trivia.questions.length){
        //    setTimeout(displayResults, 4000);
        //}else{
        //    setTimeout(questionAsk, 4000);
        //}
    })
    $(".options").on("click", ".restart", function(e){
        restart();
    })
});


//setInterval(countdown, 1000);

