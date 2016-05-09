var LIGHT_BG = "../images/giftly2.png",
    DARK_BG = "../images/giftly2reverse.png",
	/**
     * indicates whether the switch between stages is done automatically or by clicking a button
     * @type {boolean}
     */
    autoSwitchStages = false,
    autoSwitchSetTimeout;



function _keyCodeToLetter(keyCode) {
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

function _onLoading($scope) {
    return function(){
        $(document).unbind('keydown').bind('keydown', function(evt) {
            if( evt.which == 8 ) {
                $scope.keyPressed("backSpace");
                evt.preventDefault();
            }
        });
        $(document).keypress(function (evt) {
            var letter = _keyCodeToLetter(evt.keyCode);
            if (letter) {
                $scope.keyPressed(letter);
            }
        });
    }
}

function _setBackground(bg) {
    $("body").css("background-image", "url(" + bg + ")");
}

function _setManualSwitch() {
    autoSwitchStages = false;
    $("#manualMove").addClass("stateSelected");
    $("#autoMove").removeClass("stateSelected")
}

function _setAutoSwitch() {
    autoSwitchStages = true;
    $("#autoMove").addClass("stateSelected");
    $("#manualMove").removeClass("stateSelected")
}

mainApp.controller('homeCTR',['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function () {
        $(document).unbind('keydown');
        $(document).unbind('keypress');
        if ($("body").css("background-image") === "none") {
            _setBackground(LIGHT_BG);
        }
    });

}]);

mainApp.controller('configurationsCTR',['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function () {
        if (autoSwitchStages) {
            _setAutoSwitch();
        } else {
            _setManualSwitch();
        }
    });

    $scope.darkSelected = function () {
        _setBackground(DARK_BG);
    };

    $scope.lightSelected = function () {
        _setBackground(LIGHT_BG);
    };

    $scope.autoMoveSelected = function () {
        _setAutoSwitch();
    };

    $scope.manualMoveSelected = function () {
        _setManualSwitch();
    };

}]);

mainApp.controller('completeTheWordCTR',['$scope','$http','sounds','util', function($scope, $http, sounds, util) {
    $scope.val = 0;
    var numOfLetters = 5;
    $scope.numLetters = numOfLetters;
    $scope.success = false;
    var imageIndex = 0, wordEntered = [], div, imageLocation, imageLetters;

    /**
     * When clicking the speaker the current image is evaluated to the sound according to the NAME of the source!
     * Meaning images name should be with the convention <NameOfItem>_<FirstLetterOfItem>.png and the NameOfLetter should
     * Not include special characters. e.g. afarsek_Alef.png .
     */
    //TODO Enable when recordings are available
    //$(document.getElementById('speaker')).click(function(){
    //    var sWord, sImageName, aPathOfImage = $(document.getElementById('completeWordImage'))[0].src.split('/');
    //    sImageName = aPathOfImage[aPathOfImage.length-1];
    //    sWord = sImageName.substring(0,sImageName.indexOf('_'));
    //    sounds.word(sWord);
    //});


    var _addPlaceHolders = function(containerElement, remainingLetters) {
        for (var i = 0; i < remainingLetters; i++) {
            //Update word on screen
            var div = document.createElement("img");
            div.style.width = "60px" ;
            div.style.height = "60px" ;
            div.style.float = "right";
            containerElement.appendChild(div);
        }


        containerElement.className = containerElement.className + " completeWordContainer";
    };

    var _clearPlaceHoldersAndInsertLetter = function(containerElement, newLetter){

        var imageElements = containerElement.getElementsByTagName("img");
        for (var i = 0; i < imageElements.length; i++) {
            if (!imageElements[i].src){
                containerElement.insertBefore(newLetter, imageElements[i]);
                imageElements = containerElement.getElementsByTagName("img");
                containerElement.removeChild(imageElements[imageElements.length - 1]);
                break;
            }
        }

    };

    var _clearLetterAndInsertPlaceHolder = function(containerElement){

        var imageElements = containerElement.getElementsByTagName("img");
        var indexToRemove = -1;
        for (var i = 0; i < imageElements.length; i++) {
            if (!imageElements[i].src){
                indexToRemove  = i;
                break;
            }
        }
        if (indexToRemove == -1) {
            indexToRemove = imageElements.length;
        }

        if (indexToRemove > 0) {
            containerElement.removeChild(imageElements[indexToRemove -1]);
            var div = document.createElement("img");
            div.style.width = "60px" ;
            div.style.height = "60px" ;
            div.style.float = "right";
            containerElement.appendChild(div);
        }
    };

    $scope.$on('$viewContentLoaded', _onLoading($scope));
    $scope.$on('$viewContentLoaded', function($scope){
        _addPlaceHolders(document.getElementsByClassName('completeWord')[0], numOfLetters);
    });
    $scope.keyPressed = function(letter){

        var allWords =  util.getAllWords();

        switch(letter) {
            case "space":
                clearTimeout(autoSwitchSetTimeout);
                $scope.success = false;
                util.changeImage();
                sounds.swipe();

                var element = document.getElementsByClassName('completeWord')[0];

                if(element.getElementsByTagName("img").length > 0)
                    element.innerHTML = "";

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

                _addPlaceHolders(element, $scope.numLetters);

            break;

            case "backSpace":
                if ($scope.success) {
                    return;
                }
                if(document.getElementsByClassName('completeWord')[0].getElementsByTagName("img").length > 0)
                {
                    _clearLetterAndInsertPlaceHolder(document.getElementsByClassName('completeWord')[0]);
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
                if ($scope.success) {
                    return;
                }
                sounds.letter(letter.split('.')[0]);
                var element = document.getElementsByClassName('completeWord')[0];
                element.className = element.className + " completeWordContainer ";

                var tempObject;

                var containerElement = document.getElementsByClassName('completeWord')[0];
                //Update word on screen
                imageLocation =  "images/letters/"+letter;
                div = document.createElement("img");
                div.src = imageLocation;
                div.style.width = "60px" ;
                div.style.height = "60px" ;
                div.style.float = "right";

                _clearPlaceHoldersAndInsertLetter(containerElement, div);

                //containerElement.appendChild(div);

                _addPlaceHolders(containerElement, ($scope.numLetters - containerElement.getElementsByTagName("img").length));

                if (wordEntered.length < $scope.numLetters) {
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
                        $scope.success = true;

                        if ($scope.val % 5 === 0) {
                            var medalElement = document.getElementsByClassName("medalPopup")[0];
                            $(medalElement).fadeIn(2000);
                            $(medalElement).fadeOut(1000);
                        }

                        //fadeIn fadeOut the score
                        util.fadeInOut();
                        util.fadeInOutCompleteWord();
                        if (autoSwitchStages) {
                            autoSwitchSetTimeout = setTimeout(function () {
                                $scope.keyPressed("space");
                            }, 5000);
                        }
                    }
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
mainApp.controller('knowTheLettersCTR',['$scope','sounds', 'util', function($scope, sounds, util) {
    $scope.$on('$viewContentLoaded', _onLoading($scope));
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
            div.className = "twisterInDown";
            document.getElementsByClassName('enlargedLatter')[0].appendChild(div);

            util.fadeInLetter("green");
            sounds.letter(letter.split('.')[0]);
        }
    }; //keyPressed()
}]);


mainApp.controller('firstLetterCTR',['$scope', 'sounds','util', function($scope, sounds, util) {
    var imageList, div;
    $scope.val = 0;

    $scope.$on('$viewContentLoaded', _onLoading($scope));
    $scope.keyPressed = function(letter){

        imageList = util.getImageList();

        if(letter === 'space')
        {
            clearTimeout(autoSwitchSetTimeout);
            util.changeImage();
            util.clearImage();
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
                util.fadeInLetter("green");
                if (autoSwitchStages) {
                    autoSwitchSetTimeout = setTimeout(function () {
                        $scope.keyPressed("space");
                    }, 5000);
                }

            }
            else {
                util.fadeInLetter("red");
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


