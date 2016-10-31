var cells = document.getElementsByClassName('cell-note');

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


function Sequence() {
	self = this; //ABHISEKP HALP WHY DOES THIS WORK WTF AM I DOING!? what happenes here?
	this.input = [];
	this.ary = [];

	/* add a random number to the sequence */
	this.add = function() {
		this.ary.push(rand(0, 7));
	};

	/* play the sequence */
	this.play = function() {
		var id = 0;
		var loop = setInterval(function() {
			playSound(self.ary[id]);
			id++;

			if (id >= self.ary.length) {
				clearInterval(loop)
			}

		}, 400);
	};

	/* compare input to the sequence */
	this.compare = function() {
		if (this.input[this.input.length-1] === this.ary[this.input.length-1]) {
			if (this.input.length === this.ary.length) {
				//CORRECT!
				console.log('correct!')
				seq.input = [];
				seq.add();

				setTimeout(seq.play, 450);
				return;
			}
		} else {
			//WRONG
			console.log('wrong!')
			seq.input = [];
			setTimeout(seq.play, 450);
			return;
		}
	}

};

var seq = new Sequence();

/*
keyboard input 
passes an index(Number) to the inputHandler()
*/

$(window).on('keydown', function(e) {
	var keyindex = keybinds[e.which.toString()];
	if (keyindex || keyindex === 0) {
		inputHandler(keyindex);
	}
})

/*
mouse input 
passes an index(Number) to the inputHandler()
*/

$('#btns').on('click', function(e) {
	if ($(e.target).hasClass('btn-note')) {
		inputHandler($(e.target).parent().index('.cell-note'));
	}
})

/*
input handling
*/

function inputHandler(index) {
	seq.input.push(index);
	if (index || index === 0) {
		playSound(index);
	}
	if (seq.ary.length > 0) {
		seq.compare();
	}
}

/*
animation and sound
*/

function playSound(cell) {
	cell = $(cells[cell]);

	cell.find('.anim').animate({
		width: '110px',
		height: '110px',
		margin: '-5px'
	}, 100, function() {
		cell.find('.anim').animate({
			width: '100px',
			height: '100px',
			margin: '0'
		}, 100)
	});

	var aud = cell.find('audio').get(0);
	aud.currentTime = 0;
	aud.play();
}

$('#go').on('click', function() {
	seq.add();
	seq.play();
	input = [];
});

