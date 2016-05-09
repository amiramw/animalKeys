/**
 * Created by Tal Waserman on 21/02/15.
 */
angular.module('mainApp').factory('sounds', ['$state', function ($state) {

    var success_snd = new Audio("./sounds/success.wav"),
        wrong_snd = new Audio("./sounds/wrong.wav"),
        swipe_snd = new Audio("./sounds/swipe.mp3"),
        tryAgain_snd = new Audio("./sounds/tryAgain.wav"),
        //TODO need to make recordings of all these words. The first one is just for test that there is a sound.
        words_snd = {
            afarsek: new Audio('./voice/words/Alef.mp3')
            /*agas : new Audio('./voice/words/agas.mp3'),
             agvaniet : new Audio('./voice/words/agvaniet.mp3'),
             almond : new Audio('./voice/words/almond.mp3'),
             arnav : new Audio('./voice/words/arnav.mp3'),
             avatiah : new Audio('./voice/words/avatiah.mp3'),
             ball : new Audio('./voice/words/ball.mp3'),
             banana : new Audio('./voice/words/banana.mp3'),
             barbur : new Audio('./voice/words/barbur.mp3'),
             bee : new Audio('./voice/words/bee.mp3'),
             belt : new Audio('./voice/words/belt.mp3'),
             boat : new Audio('./voice/words/boat.mp3'),
             book : new Audio('./voice/words/book.mp3'),
             bread : new Audio('./voice/words/bread.mp3'),
             buterfly : new Audio('./voice/words/buterfly.mp3'),
             car : new Audio('./voice/words/car.mp3'),
             cat : new Audio('./voice/words/cat.mp3'),
             chair : new Audio('./voice/words/chair.mp3'),
             cheese : new Audio('./voice/words/cheese.mp3'),
             chocolate : new Audio('./voice/words/chocolate.mp3'),
             cloun : new Audio('./voice/words/cloun.mp3'),
             cow : new Audio('./voice/words/cow.mp3'),
             djiraf : new Audio('./voice/words/djiraf.mp3'),
             dog : new Audio('./voice/words/dog.mp3'),
             dolfin : new Audio('./voice/words/dolfin.mp3'),
             door : new Audio('./voice/words/door.mp3'),
             dov : new Audio('./voice/words/dov.mp3'),
             elefant : new Audio('./voice/words/elefant.mp3'),
             fireworks : new Audio('./voice/words/fireworks.mp3'),
             Flower : new Audio('./voice/words/Flower.mp3'),
             fox : new Audio('./voice/words/fox.mp3'),
             frog : new Audio('./voice/words/frog.mp3'),
             gezer : new Audio('./voice/words/gezer.mp3'),
             gold : new Audio('./voice/words/gold.mp3'),
             Haluk : new Audio('./voice/words/Haluk.mp3'),
             hamburger : new Audio('./voice/words/hamburger.mp3'),
             Hamor : new Audio('./voice/words/Hamor.mp3'),
             hands : new Audio('./voice/words/hands.mp3'),
             har : new Audio('./voice/words/har.mp3'),
             hatul : new Audio('./voice/words/hatul.mp3'),
             Hazil : new Audio('./voice/words/Hazil.mp3'),
             hipo : new Audio('./voice/words/hipo.mp3'),
             horse : new Audio('./voice/words/horse.mp3'),
             howl : new Audio('./voice/words/howl.mp3'),
             karnaf : new Audio('./voice/words/karnaf.mp3'),
             Kengeru : new Audio('./voice/words/Kengeru.mp3'),
             key : new Audio('./voice/words/key.mp3'),
             keyboard : new Audio('./voice/words/keyboard.mp3'),
             Kipo : new Audio('./voice/words/Kipo.mp3'),
             kiwi : new Audio('./voice/words/kiwi.mp3'),
             Klemantina : new Audio('./voice/words/Klemantina.mp3'),
             kova : new Audio('./voice/words/kova.mp3'),
             lemon : new Audio('./voice/words/lemon.mp3'),
             lev : new Audio('./voice/words/lev.mp3'),
             lion : new Audio('./voice/words/lion.mp3'),
             lizard : new Audio('./voice/words/lizard.mp3'),
             magafaim : new Audio('./voice/words/magafaim.mp3'),
             meduza : new Audio('./voice/words/meduza.mp3'),
             mishmish : new Audio('./voice/words/mishmish.mp3'),
             monkey : new Audio('./voice/words/monkey.mp3'),
             moon : new Audio('./voice/words/moon.mp3'),
             nad : new Audio('./voice/words/nad.mp3'),
             nemalya : new Audio('./voice/words/nemalya.mp3'),
             Nevel : new Audio('./voice/words/Nevel.mp3'),
             olive : new Audio('./voice/words/olive.mp3'),
             peekok : new Audio('./voice/words/peekok.mp3'),
             perah : new Audio('./voice/words/perah.mp3'),
             Phone : new Audio('./voice/words/Phone.mp3'),
             pilow : new Audio('./voice/words/pilow.mp3'),
             pilpel : new Audio('./voice/words/pilpel.mp3'),
             racon : new Audio('./voice/words/racon.mp3'),
             raven : new Audio('./voice/words/raven.mp3'),
             rimon : new Audio('./voice/words/rimon.mp3'),
             ring : new Audio('./voice/words/ring.mp3'),
             rooster : new Audio('./voice/words/rooster.mp3'),
             sal : new Audio('./voice/words/sal.mp3'),
             sea : new Audio('./voice/words/sea.mp3'),
             shablul : new Audio('./voice/words/shablul.mp3'),
             shezif : new Audio('./voice/words/shezif.mp3'),
             Shoev : new Audio('./voice/words/Shoev.mp3'),
             sir : new Audio('./voice/words/sir.mp3'),
             snake : new Audio('./voice/words/snake.mp3'),
             spoon : new Audio('./voice/words/spoon.mp3'),
             swine : new Audio('./voice/words/swine.mp3'),
             Tale : new Audio('./voice/words/Tale.mp3'),
             Talit : new Audio('./voice/words/Talit.mp3'),
             tapuah : new Audio('./voice/words/tapuah.mp3'),
             tapuz : new Audio('./voice/words/tapuz.mp3'),
             tarnegol : new Audio('./voice/words/tarnegol.mp3'),
             Tavas : new Audio('./voice/words/Tavas.mp3'),
             tiger : new Audio('./voice/words/tiger.mp3'),
             traficLight : new Audio('./voice/words/traficLight.mp3'),
             train : new Audio('./voice/words/train.mp3'),
             Traktor : new Audio('./voice/words/Traktor.mp3'),
             Trumpet : new Audio('./voice/words/Trumpet.mp3'),
             tuki : new Audio('./voice/words/tuki.mp3'),
             Turtle : new Audio('./voice/words/Turtle.mp3'),
             tut : new Audio('./voice/words/tut.mp3'),
             tzvi : new Audio('./voice/words/tzvi.mp3'),
             vafel : new Audio('./voice/words/vafel.mp3'),
             vav : new Audio('./voice/words/vav.mp3'),
             vilon : new Audio('./voice/words/vilon.mp3'),
             wombat : new Audio('./voice/words/wombat.mp3'),
             Yaen : new Audio('./voice/words/Yaen.mp3'),
             yarakot : new Audio('./voice/words/yarakot.mp3'),
             zahal : new Audio('./voice/words/zahal.mp3'),
             Zdaf : new Audio('./voice/words/Zdaf.mp3'),
             Zebra : new Audio('./voice/words/Zebra.mp3'),
             ziporim : new Audio('./voice/words/ziporim.mp3'),
             zvi : new Audio('./voice/words/zvi.mp3') */
        },
        letter_snd =
        {
            Alef: new Audio('./voice/Alef.mp3'),
            Ayin: new Audio('./voice/Ayin.mp3'),
            Bet: new Audio('./voice/Bet.mp3'),
            Chet: new Audio('./voice/Chet.mp3'),
            Dalet: new Audio('./voice/Dalet.mp3'),
            Gimel: new Audio('./voice/Gimel.mp3'),
            Hey: new Audio('./voice/Hey.mp3'),
            Kaf: new Audio('./voice/Kaf.mp3'),
            Kaf1: new Audio('./voice/Kaf1.mp3'),
            Kuf: new Audio('./voice/Kuf.mp3'),
            Lamed: new Audio('./voice/Lamed.mp3'),
            Mem: new Audio('./voice/Mem.mp3'),
            Mem1: new Audio('./voice/Mem1.mp3'),
            Nun: new Audio('./voice/Nun.mp3'),
            Nun1: new Audio('./voice/Nun1.mp3'),
            Pe: new Audio('./voice/Pe.mp3'),
            Pe1: new Audio('./voice/Pe1.mp3'),
            Reish: new Audio('./voice/Reish.mp3'),
            Samech: new Audio('./voice/Samech.mp3'),
            Shin: new Audio('./voice/Shin.mp3'),
            Taf: new Audio('./voice/Taf.mp3'),
            Tet: new Audio('./voice/Tet.mp3'),
            Vav: new Audio('./voice/Vav.mp3'),
            Yud: new Audio('./voice/Yud.mp3'),
            Zadik: new Audio('./voice/Zadik.mp3'),
            Zadik1: new Audio('./voice/Zadik1.mp3'),
            Zain: new Audio('./voice/Zain.mp3')
        },
        audioLetter = [],
		lastPlayed = -1;

    return {
        success: function () {
            success_snd.play();
        },
        wrong: function () {
            wrong_snd.play();
        },
        swipe: function () {
            swipe_snd.play();
        },
        letter: function (letter) {
			console.log(letter);
			var placeInList = ++lastPlayed;
			function doChangeIfCan() {
				function changeLetter() {
					audioLetter[placeInList] = letter_snd[letter];
					lastPlayed = placeInList;
					letter_snd[letter].play();
				}

				if (placeInList === 0 || audioLetter[placeInList - 1] && audioLetter[placeInList - 1].ended) {
					changeLetter();
				} else {
					setTimeout(function () {
						doChangeIfCan();
					}, 200);
				}
			}
			doChangeIfCan();
        },
        word: function (word) {
            words_snd[word].play();
        },
        tryAgain: function() {
            tryAgain_snd.play();
        }
    };
}]);


angular.module('mainApp').factory('util', ['$http', function util($http) {
    var allWords, imageList;

    $http.get('javascripts/controllers/words.json').success(function (data) {
        allWords = data;
    });

    $http.get(location.origin + "/animalList").success(function (data) {
        imageList = data.images.split(',');
    });

    return {
        getAllWords: function () {
            return allWords;
        },
        getImageList: function () {
            return imageList;
        },
        getRandomNumber: function () {
            return Math.floor(Math.random() * imageList.length) + 1;
        },
        changeImage: function () {
            var newimage;
            if (document.getElementsByClassName('animaleImage')[0].getElementsByTagName("img").length > 0) {
                document.getElementsByClassName('animaleImage')[0].getElementsByTagName("img")[0].remove();

                newimage = document.createElement("img");
                newimage.src = "/images/animales/" + imageList[this.getRandomNumber()];
                newimage.style.width = "448px";
                newimage.style.height = "285px";
                document.getElementsByClassName('animaleImage')[0].appendChild(newimage);
            }
        },
        fadeInOut: function () {
            document.getElementsByClassName('scoreNumber')[0].style.color = "green";
            setTimeout(function () {
                document.getElementsByClassName('scoreNumber')[0].style.color = "black";
            }, 500);
            setTimeout(function () {
                document.getElementsByClassName('scoreNumber')[0].style.color = "green";
            }, 1000);
            setTimeout(function () {
                document.getElementsByClassName('scoreNumber')[0].style.color = "black";
            }, 1500);
        },
        fadeInOutCompleteWord: function () {
            document.getElementsByClassName('completeWord ')[0].style.background = "lightgreen";
            setTimeout(function () {
                document.getElementsByClassName('completeWord ')[0].style.background = "white";
            }, 500);
            setTimeout(function () {
                document.getElementsByClassName('completeWord ')[0].style.background = "lightgreen";
            }, 1000);
            setTimeout(function () {
                document.getElementsByClassName('completeWord ')[0].style.background = "white";
            }, 1500);
            setTimeout(function () {
                document.getElementsByClassName('completeWord ')[0].style.background = "";
            }, 2000);
        },
        fadeInLetter: function (background) {
            document.getElementsByClassName('enlargedLatter ')[0].style.background = background;
            setTimeout(function () {
                document.getElementsByClassName('enlargedLatter ')[0].style.background = "transparent";
            }, 500);
            setTimeout(function () {
                document.getElementsByClassName('enlargedLatter ')[0].style.background = background;
            }, 1000);
        },
        clearImage: function () {
            if (document.getElementsByClassName('enlargedLatter')[0].getElementsByTagName("img").length > 0) {
                document.getElementsByClassName('enlargedLatter')[0].getElementsByTagName("img")[0].remove();
            }
        }
    }

}]);