var cells = document.getElementsByClassName('cell')
var keybinds =
	{
		'103': cells[0],
		'104': cells[1],
		'105': cells[2],
		'100': cells[3],
		'102': cells[4],
		'97': cells[5],
		'98': cells[6],
		'99': cells[7]
	}

$(window).on('keydown', function(e) {
	var keyindex = keybinds[e.which.toString()];
	console.log(keyindex)
	if (keyindex) {
		playSound($(keyindex));
	}
})

$('#btns').on('click', function(e) {
	if ($(e.target).hasClass('btn')) {
		playSound($(e.target).parent());
	}
})

function playSound(cell) {
	cell.find('.anim').animate({
		width: '110px',
		height: '110px',
		margin: '-5px'
	}, 100, function(){
		cell.find('.anim').animate({
			width: '100px',
			height: '100px',
			margin: '0'
		},100)
	});
	var aud = cell.find('audio').get(0);
	aud.currentTime = 0;
	aud.play();
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


var sequence = [];

$('#go').on('click', function() {
	sequence.push($(cells[rand(0,7)]));
	var id = 0;
	var loop = window.setInterval(function() {
		playSound(sequence[id]);
		id++;
		console.log(id)
		if (id >= sequence.length) {clearInterval(loop)}
	}, 400);
});