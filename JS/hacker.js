
$(document).ready(function() {
			var canvas = document.createElement("canvas")
			canvas.setAttribute("id", "hacker");
			canvas.style.width = "300px";
			canvas.style.height = "800px";
			var s = window.screen;
			var width = hacker.width = s.width;
			var height = hacker.height;
			var yPositions = Array(300).join(0).split('');
			var ctx = hacker.getContext('2d');
			var draw = function() {
				ctx.fillStyle = 'rgba(0,0,0,.05)';
				ctx.fillRect(0, 0, width, height);
				ctx.fillStyle = 'greenyellow';
				ctx.font = '10pt Georgia';
				yPositions.map(function(y, index) {
					text = String.fromCharCode(70 + Math.random() * 33);
					x = (index * 10) + 10;
					hacker.getContext('2d').fillText(text, x, y);
					if (y > Math.random() * 1e4) {
						yPositions[index] = 0;
					} else {
						yPositions[index] = y + 10;
					}
				});
			};
			RunMatrix();

			function RunMatrix() {
				Game_Interval = setInterval(draw, 30);
			}
		}
