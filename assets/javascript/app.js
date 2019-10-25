$('#start').on('click',function(){
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})


var questions = [{
    question: "What was the name of the revolutionary artificial intelligence system built by Cyberdyne Systems in the Terminator movies?",
    answers: ["Skynet", "Initech", "Bossa Nova Robotics", "Brain Corp"],
    correctAnswer:"Skynet",
}, {
    question: "Which Actor/Actress has won the most Oscars for acting?",
    answers: ["Jack Nicholson", "Meryl Streep", "Daniel Day-Lewis", "Katharine Hepburn"],
    correctAnswer:"Katharine Hepburn"
}, {
    question: "What was the name of the kingdom where the 2013 animated movie Frozen is set?",
    answers: ["Pandora", "Arendale", "The Shire", "Lilliput"],
    correctAnswer:"Arendale"
}, {
    question: "What was the name of the protagonist crime family in the Godfather movies?",
    answers: ["Soluzzo", "Andolini", "Santino", "Corleone"],
    correctAnswer:"Corleone"
}, {
    question: "How many infinity Stones are there in the MCU?",
    answers: ["4", "5", "6", "7"],
    correctAnswer:"6"
}, {
    question: "Who was the most voluptuous female in Toontown?",
    answers: ["Betty Boop", "Jessica Rabbit", "Lola Bunny", "Foxxy Love"],
    correctAnswer:"Jessica Rabbit"
}, {
    question: "Which movie franchise has the most sequels?",
    answers: ["Godzilla", "Marvel Cinematic Universe", "James Bond", "Star Trek"],
    correctAnswer:"Godzilla"
}, {
    question: "What did Zach Galifianakis character 'Alan', call the baby he carries around with him in the first Hangover movie",
    answers: ["Juan", "Pedro", "Carlos", "Jose"],
    correctAnswer:"Carlos"
}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("Time Up!");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2>TIME REMAINING: <span id= 'counter'>30</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
                currentQuestion].answers[i]+'">'+questions[game.
                currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
        },
    
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>OUT OF TIME!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.
            currentQuestion].correctAnswer+'</h3>');
            if(game.currentQuestion==questions.length-1){
                setTimeout(game.results,3*1000);
            } else {
                setTimeout(game.nextQuestion,3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>ALL DONE!</h2>");
        $('#subwrapper').append("<h3>correct: "+game.correct+"</h3>");
        $('#subwrapper').append("<h3>incorrect: "+game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>unanswered: "+game.unanswered+"</h3>");
        $('#subwrapper').append("<button id= 'reset'>RESET</button>");

    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].
            correctAnswer){
                game.answeredCorrectly();
            } else {
                game.answeredIncorrectly();
            }
    },
    answeredCorrectly: function(){
        console.log("YOU GOT IT!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.
            currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log("WRONG!");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    reset: function(){
        game.currentQuestions = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion = 0;
    }
}
