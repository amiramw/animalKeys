function keyCodeToLetter(keyCode) {
    var letters = ['Alef', 'Bet', 'Gimel', 'Dalet', 'Hey', 'Vav', 'Zain', 'Chet', 'Tet', 'Yud', 'Kaf1', 'Kaf',
        'Lamed', 'Mem1', 'Mem', 'Nun1', 'Nun', 'Samech', 'Ayin', 'Pe1', 'Pe', 'Zadik1', 'Zadik', 'Kuf', 'Reish',
        'Shin', 'Taf'].map(function (letter) {
            return letter + ".png";
        });
    if (keyCode === 32) {
        return "space";
    }
    var position = keyCode - 1488;
    return letters[position];
}

function _keyboardEventsBinding($scope) {
    return function(){
        $(document).unbind('keydown').bind('keydown', function(evt) {
            if( evt.which == 8 ) {
                $scope.keyPressed("backSpace");
                evt.preventDefault();
            }
        });
        $(document).keypress(function (evt) {
            var letter = keyCodeToLetter(evt.keyCode);
            if (letter) {
                $scope.keyPressed(letter);
            }
        });
    }
}

mainApp.controller('homeCTR',['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function () {
        $(document).unbind('keydown');
        $(document).unbind('keypress');
    });

}]);

mainApp.controller('completeTheWordCTR',['$scope','$http','sounds','util', function($scope, $http, sounds, util) {
    $scope.val = 0;
    $scope.numLetters = 5;
    var imageIndex = 0, wordEntered = [], div, imageLocation, imageLetters;


    $scope.$on('$viewContentLoaded', _keyboardEventsBinding($scope));
    $scope.keyPressed = function(letter){

        var imageList = util.getImageList(),
            allWords =  util.getAllWords();

        switch(letter) {
            case "space":
                util.changeImage();
                sounds.swipe();

                if(document.getElementsByClassName('completeWord')[0].getElementsByTagName("img").length > 0)
                    document.getElementsByClassName('completeWord')[0].innerHTML = "";

                imageIndex++;
                wordEntered = [];
                _cleanContainer();

                //Get image name;
                var image = document.getElementsByClassName('animaleImage')[0].getElementsByTagName("img")[0].src.split('/');
                image = image[image.length-1];
                //get image letters
                for (var i = 0;i<allWords.length  ;i++) {
                    if(allWords[i].image === image)
                    {
                        imageLetters = allWords[i].letters;
                        $scope.numLetters = imageLetters.length;
                    }
                }

            break;

            case "backSpace":
                if(document.getElementsByClassName('completeWord')[0].getElementsByTagName("img").length > 0)
                {
                    document.getElementsByClassName('completeWord')[0].getElementsByTagName("img")[document.getElementsByClassName('completeWord')[0].getElementsByTagName("img").length-1].remove();
                    wordEntered.pop();
                }
                if(document.getElementsByClassName('completeWord')[0].getElementsByTagName("img").length === 0){
                    _cleanContainer();
                }
                else
                {
                    //Get image name;
                    var image = document.getElementsByClassName('animaleImage')[0].getElementsByTagName("img")[0].src.split('/');
                    image = image[image.length-1];

                    tempObject = {
                        "image": image,
                        "letters": wordEntered
                    };

                    if(_checkWord(tempObject))
                    {
                        sounds.success();
                        $('.completeWord').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                        $scope.val = parseInt($scope.val) +1;
                        util.fadeInOut();
                    }
                }

            break;

            default:
                //Letter pressed
                sounds.letter(letter.split('.')[0]);
                var element = document.getElementsByClassName('completeWord')[0];
                element.className = element.className + " completeWordContainer ";

                var tempObject;

                //Update word on screen
                imageLocation =  "images/letters/"+letter;
                div = document.createElement("img");
                div.src = imageLocation;
                div.style.width = "60px" ;
                div.style.height = "60px" ;
                div.style.float = "right";
                document.getElementsByClassName('completeWord')[0].appendChild(div);

                wordEntered.push(letter);

                //Get image name;
                var image = document.getElementsByClassName('animaleImage')[0].getElementsByTagName("img")[0].src.split('/');
                image = image[image.length-1];

                tempObject = {
                    "image": image,
                    "letters": wordEntered
                };

                if(_checkWord(tempObject))
                {
                    sounds.success();
                    $scope.val = parseInt($scope.val) +1;

                    //fadeIn fadeOut the score
                    util.fadeInOut();
                    util.fadeInOutCompleteWord();
                }
        }//switch

        function _checkWord(array) {
            var bool, element;
            for (var i = 0;i<allWords.length  ;i++) {
                if(allWords[i].image === array.image)
                {
                    bool = true;
                    element = document.getElementsByClassName('completeWord')[0];
                    element.className = "completeWord completeWordContainer transition" + " green ";

                    for(var j = 0;j<array.letters.length ;j++)
                    {
                        if(allWords[i].letters[j] !== array.letters[j])
                        {
                            bool = false;
                            element = document.getElementsByClassName('completeWord')[0];
                            element.className = "completeWord completeWordContainer transition" + " red ";

                        }
                    }
                    if(bool && array.letters.length === allWords[i].letters.length)
                    {
                        //correct word
                        return bool;
                    }
                    else
                        bool = false;
                }
            }
            return false;
        }
        function _cleanContainer(){
            element = document.getElementsByClassName('completeWord')[0];
            element.className = "completeWord";
        }
    }; //keyPress
}]);
mainApp.controller('knowTheLettersCTR',['$scope','sounds', function($scope, sounds) {
    $scope.$on('$viewContentLoaded', _keyboardEventsBinding($scope));
    $scope.keyPressed = function(letter){
        var imageLocation, div;
        if(letter !== 'space' && letter !== 'backSpace')
        {
            if(document.getElementsByClassName('enlargedLatter')[0].getElementsByTagName("img").length > 0)
            {
                document.getElementsByClassName('enlargedLatter')[0].getElementsByTagName("img")[0].remove();
            }
            imageLocation =  "images/letters/"+letter;
            div = document.createElement("img");
            div.src = imageLocation;
            div.style.width = "200px" ;
            div.style.height = "200px" ;
            document.getElementsByClassName('enlargedLatter')[0].appendChild(div);
            sounds.letter(letter.split('.')[0]);
        }
    }; //keyPressed()
}]);
mainApp.controller('firstLetterCTR',['$scope', 'sounds','util', function($scope, sounds, util) {
    var imageList, div;
    $scope.val = 0;

    $scope.$on('$viewContentLoaded', _keyboardEventsBinding($scope));
    $scope.keyPressed = function(letter){

        imageList = util.getImageList();

        if(letter === 'space')
        {
            util.changeImage();
            sounds.swipe();
        }
        else if(letter !== 'backSpace'){
            sounds.letter(letter.split('.')[0]);
            /*sounds.letter("./voice/"+letter.split('.')[0]+".mp3");*/

            if(document.getElementsByClassName('enlargedLatter')[0].getElementsByTagName("img").length > 0)
                document.getElementsByClassName('enlargedLatter')[0].getElementsByTagName("img")[0].remove();

            var imageLocation =  "images/letters/"+letter;
            div = document.createElement("img");
            div.src = imageLocation;
            div.style.width = "448px" ;
            div.style.height = "285px" ;
            document.getElementsByClassName('enlargedLatter')[0].appendChild(div);

            if(_compareImageAndLetter())
            {
                sounds.success();
                $scope.val = parseInt($scope.val) +1;

                //fadeIn fadeOut the score
                util.fadeInOut();
                //fadeIn fadeOut the letter
                util.fadeInOutLetter();
            }
            else {
                sounds.wrong();
            }//else
        }//else

        function _compareImageAndLetter(){
            var tempArr = document.getElementsByClassName('animaleImage')[0].getElementsByTagName("img")[0].src.split('/'),
                imageName = tempArr[tempArr.length-1],
                letterFromImage = imageName.split('_')[1].split('.')[0],
                letter = imageLocation.split('/')[2].split('.')[0];
            return (letter === letterFromImage )
        }

    };//keyPressed()

}]);


