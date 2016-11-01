var PLAYBACK_DELAY = 350;


var cells = document.getElementsByClassName('cell-note');
var aud_wrong = document.getElementById('aud_wrong');
var counter = document.getElementById('go');
var keybinds = {
	'103': 0,
	'104': 1,
	'105': 2,
	'100': 3,
	'102': 4,
	'97': 5,
	'98': 6,
	'99': 7
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function leftpad(str, len, ch) {
	str = String(str);
	var i = -1;
	if (!ch && ch !== 0) ch = ' ';
	len = len - str.length;
	while (++i < len) {
		str = ch + str;
	}
	return str;
}

function shiftHue(n) {
	n = Math.abs(n) % 360;
	for (var i = 0, j = cells.length; i < j; i++) {
		$(cells[i])
			.find('.btn')
			.css({
				'background-color':
				'hsl(' + (n+i*45) + ', 75%, 50%)'
			})
	}
}


//this object handles input sequence and game sequence
function Sequence() {
	var input = [],
		playback = false,
		ary = [];


	this.reset = function() {
		input = [];
		ary = [];
		counter.innerHTML = leftpad(ary.length, 2, '0');
	}
	this.insert = function(n) {
		input.push(n);
	}

	// add a random number to the sequence
	this.add = function() {
		ary.push(rand(0, 7));
		counter.innerHTML = leftpad(ary.length, 2, '0')
	};

	// play the sequence 
	this.play = function() {
		if (playback) {
			return
		}
		playback = true;
		var id = 0;
		var loop = setInterval(function() {
			playSound(ary[id]);
			id++;

			if (id >= ary.length) {
				clearInterval(loop);
				playback = false;
			}

		}, PLAYBACK_DELAY);
	};

	// compare argument(Array of inputs(Indexes)) to the sequence
	this.compare = function() {
		if (ary.length === 0) {
			return;
		}

		if (input[input.length - 1] === ary[input.length - 1]) {
			if (input.length === ary.length) {
				//CORRECT!
				input = [];
				this.add();

				setTimeout(this.play, 450);
				return;
			}
		} else {
			//WRONG
			aud_wrong.currentTime = 0;
			aud_wrong.play();
			input = [];
			setTimeout(this.play, 450);
			return;
		}
	}

};

var seq = new Sequence();



//INPUT 
//keyboard and mouse input listeners pass an index(Number) to the inputHandler()
//which corresponds to the index of the element triggered in an group of class .cell-note
//keyboard input
$(window).on('keydown', function(e) {
		var index = keybinds[e.which.toString()];
		if (index || index === 0) {
			inputHandler(index);
		}
	})
	//mouse input 
$('#btns').on('click', function(e) {
		if ($(e.target).hasClass('btn-note')) {
			var index = $(e.target).parent().index('.cell-note');
			inputHandler(index);
		}
	})
	//input handling
function inputHandler(index) {
	seq.insert(index);
	if (index || index === 0) {
		playSound(index);
	}
	seq.compare();
}



//animation and sound
function playSound(cell) {
	cell = $(cells[cell]);

	cell.find('.btn').animate({
		width: '110px',
		height: '110px',
		margin: '-5px'
	}, 100, function() {
		cell.find('.btn').animate({
			width: '100px',
			height: '100px',
			margin: '0'
		}, 100)
	});

	var aud = cell.find('audio').get(0);
	aud.currentTime = 0;
	aud.play();
}


//start / reset
$('#go').on('click', function() {
	seq.reset();
	seq.add();
	seq.play();
});