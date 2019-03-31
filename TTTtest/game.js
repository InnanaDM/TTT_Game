$(document).ready( function() {

    // variable definitions
    const MAX_TIME = 60; //max time in seconds for the quiz
    var timeElapsed = 0; //time elapsed in seconds since game start
    var timer; //timer variable
    var quizCompleted = false; //is true when the user press the botton done
    var correct = 0; 
    var incorrect = 0; 
    var unanswered = 0;
    var correctAnswersKey = []; //[1,2,3,4,3,2,1,4];

    //set of question and answers
    var quiz = [
        {
            question: 'In what country is it illegal for a woman to leave her home without the permission of her husband ?',
            options: ["Iraq",'Egypt','Israel','Afghanistan'],
            answer: 4
        }, 
        {
            question: 'All the stars, planets and galaxies that can be seen today make up what percentage of our universe ?',
            options: ['20 percent','23 percent','4 percent','5 percent'],
            answer: 3
        }, 
        {
            question: 'Who wrote the novel "Lord of the Flies" ?',
            options: ['Milton William Cooper','William Golding','Harper Lee','Nathan McCall'],
            answer: 2
        }, 
        {
            question: 'Which was the first known civilization to be recorded in history ?',
            options: ['Aztecs','Ancient Egypt','Jiahu','Ancient Sumer'] ,
            answer: 4
        }, 
        {
            question: 'The geographical center of the world is located where ?',
            options: ['Western Georgia','Somewhere in Eastern Europe','Off the coast of Australia','In lower Egypt'],
            answer: 4
        },

        {   question: 'How much of our world oceans is UNEXPLORED ?',
            options: ['94 percent','98 percent','95 percent','90 percent'],
            answer: 3
        }, 
        {
            question: 'Who invented the first blimp ?',
            options: ['John F. Pickering','Benjamin Banneker','George T. Sampson','Lewis Latimer'],
            answer: 1
        }, 
        {
            question: 'What is the frequency of life ?',
            options: ['488 Hz','234 Hz','444 Hz','432 Hz'],
            answer: 4
        }
    ];

    //create quiz
    
    for ( var i = 0; i < quiz.length; i++ ){
        var answer = i+1;
        var form = $('<form>');
        form.append( $('<h4>').text( quiz[i].question ) );
        for ( var j = 0; j < quiz[i].options.length; j++ ) {
            var value = j+1;
            var div = $('<div>').addClass( 'form-check-inline' );
            var label = $('<label for="q'+answer+value+'">').addClass( 'form-check-label' );
            //var radio = $('<input type="radio" id="q'+answer+value+'" name="answer'+answer+'" value="' + value + '">');
            var radio = $('<input>').attr({
                type: 'radio',
                id: 'q'+answer+value,
                name: 'answer'+answer,
                value: value
            });
            radio.addClass( 'form-check-input' );
            label.append( radio );
            label.append( quiz[i].options[j] );
            div.append( label );
            form.append( div );
        }
        //$('#quizCol').append( form );
        form.insertBefore( "#btnDone" );
        correctAnswersKey.push( quiz[i].answer );
    }

    
    //register on click event for start button
    $('#btnStart').click( gameStart );

    function gameStart() {
        console.log( 'Game started' );
        //hide button
        $('#colBtnStart').hide();
        //show timer
        $('#timeRemain').text( MAX_TIME );
        $('#timer').show();
        //show options
        $('#quizContainer').show();
        //start timer
        timer = setInterval( eachSecond, 1000 ); //run eachSecond() function every second;
    }

    function eachSecond() {
        //update timeElapsed variable
        timeElapsed++;
        console.log( 'Time Elapsed (s): ' + timeElapsed );
        //update time remaining on screen
        $('#timeRemain').text( MAX_TIME - timeElapsed);
        //check if timeElapsed has reach the MAX_TIME or quiz has completed to show the results
        if ( ( timeElapsed >= MAX_TIME ) || ( quizCompleted ) ) {
            clearInterval( timer );
            showResult();
        }
    }

    //register on click event for done button
    $('#btnDone').click( userDone );

    function userDone() {
        console.log( 'User has pressed the button DONE.' );
        quizCompleted = true;
    }

    function showResult() {
        console.log('Showing the result...');
        //hide timer and questions
        $('#timer').hide();
        $('#quizContainer').hide();
        //compare results with answers key
        for ( var i=0; i < correctAnswersKey.length; i++ ) {
            var index = i+1;
            var answer = $("input[name='answer" + index + "']:checked").val();
            if ( answer == correctAnswersKey[i] ) {
                correct++;
            } else if ( answer == undefined ) {
                unanswered++;
            } else {
                incorrect++;
            }
        }
        //update results on screen
        $('#correct').text( correct );
        $('#incorrect').text( incorrect );
        $('#unanswered').text( unanswered );
        //show result container
        $('#resultContainer').show();
    }

} );
