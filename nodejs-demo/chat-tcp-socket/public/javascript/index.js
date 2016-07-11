$(function() {
	var content = $('.main');
	var input = $('#sendMessage');
	var button = $('#send');
	var myName = false;
	var showUsername = $('#showUsername');

	var socket = io.connect();
	/*$('#send').click(function(e) {
		socket.emit('chat message', $('#sendMessage').val());
		$('#sendMessage').val('');
	});
	
	socket.on('chat message', function(msg) {
		$('.main').append($('<li>').text(msg));
	});*/

	socket.on('message', function(obj) {
		console.log('wozhixing');
		var p = '<p><span style="color:' + obj.color + '">' + obj.author + '</span> @ ' + obj.time + ':' + obj.text + '</p>';
		content.append(p);
	});

	socket.on('system', function(obj) {
		showUsername.hide();
		var p = '';
		if(obj.type === 'welcome') {
			p = '<p style="background:' + obj.color +'">system @' + obj.time + ': Welcome ' + obj.text + '</p>';
		} else if(obj.type === 'disconnect'){
			p = '<p style="background:' + obj.color +'">system @' + obj.time + ': Bye ' + obj.text + '</p>';
		}

		content.append(p);
	});

	input.keydown(function(e) {
		
		if(e.keyCode === 13) {
			var msg = input.val();
			if(!msg) return;
			socket.send(msg);
			input.val('');
			if(myName === false) {
				myName = msg;
			}
		}
	});

	button.click(function() {
		var msg = input.val();
		if(!msg) return;
		socket.send(msg);
		input.val('');
		if(myName === false) {
			myName = msg;
		}
	});

});
