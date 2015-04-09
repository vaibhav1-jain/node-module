// frontend.js
		$(function () {
			"use strict";

			// for better performance - to avoid searching in DOM
			var content = $('#content');
			var inputName = $('#inputName');
			var status = $('#status');
			var message = $('#message');
			var inputMessage = $('#inputMessage');
			
			// my name sent to the server
			var myName = false;
			var myCount = false;

			// if user is running mozilla then use it's built-in WebSocket
			window.WebSocket = window.WebSocket || window.MozWebSocket;

			// if browser doesn't support WebSocket, just show some notification and exit
			if (!window.WebSocket) {
				content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
											+ 'support WebSockets.'} ));
				inputName.hide();
				$('span').hide();
				return;
			}
		//	var  connection = io.connect('http://localhost:8040');
			// open connection
			var connection = new WebSocket('ws://localhost:8040');
			connection.onerror = function (error) {
				// just in there were some problems with conenction...
				content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
											+ 'connection or the server is down.</p>' } ));
			};

			// most important part - incoming messages
			connection.onmessage = function (message) {
				
				try {
					var json = JSON.parse(message.data);
					//alert("json 1 " +json);
				} catch (e) {
					console.log('This doesn\'t look like a valid JSON: ', message.data);
					return;
				}

				if (json.type === 'message') { // it's a single message
					inputMessage.removeAttr('disabled'); // let the user write another message
					var dataIndex=json.data.text.split(':');
				//	alert(dataIndex);
					if(json.data.index==myCount ){
					
						if(json.data.text ==""){
						}
						else 
							addMessage(json.data.author,json.data.index, json.data.text);
					}
					else if(dataIndex[0]==myCount){
						
						addMessage(json.data.author,json.data.index, dataIndex[1]);
						var json = JSON.stringify({ type:'writeFile', data: dataIndex[1]});
						
						connection.send(json);
					}
		   
				}else if (json.type === 'userIndex') { // it's a single message
						
						myCount=json.index;
						//alert(myCount);
				}else {
					console.log('Hmm..., I\'ve never seen JSON like this: ', json);
				}
			};

		inputName.keydown(function(e) {
			if (e.keyCode === 13) {
				var msg = $(this).val();
				connection.send(msg);
				var msg = "";
				connection.send(msg);
				// we know that the first message sent from a user their name
					myName = msg;
					inputName.attr("disabled", true);
			}
		});
		inputMessage.keydown(function(e) {
			if (e.keyCode === 13) {
				var msg = $(this).val();
				// send the message as an ordinary text
				//alert(msg);
				connection.send(msg);
			}
		});
			function addMessage(author,index, message) {
				content.append('<p><span>' + author + '</span>' + ' : ' + message + '</p>');
			}     
		});