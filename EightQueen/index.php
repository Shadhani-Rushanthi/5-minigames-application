<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" xmlns:fb="http://ogp.me/ns/fb#">


<HEAD>
<TITLE>Eight Queens Problem</TITLE>
<META name="Description" content="Eight Queens Problem">
<META name="keywords" content="8 queens, board, place, attack, solution, 8x8, 9x9, 10x10">


<!--   Style Sheet -->
<link rel="stylesheet" type="text/css" href="style.css" />

<style> 
#container {
	font-family: courier;
	font-size: 16px;
	padding: 10px;
	color: #ffffff;
	width: 550px;
	margin: auto;
}

.mainmenu{
	width: 240px;
}

 
#chessboard_container {
	width: 500px;
	float: left;
}

#stats {
	width: 200px;
	float: left;
	margin: 15px 0;
}

#stats h4, #stats .current_queens li {
	margin: 15px 0;
}

#stats ol {
	list-style: decimal;
	padding: 0 25px;
}

.chessboard {
  border:10px solid #AC14DB;
  border-radius: 8px;
  background-color: #C0C0C0;
            }

.chessboard td {
    
	width: 45px;
	height: 45px;
	vertical-align: middle;
	text-align: center;
}

.chessboard td.queen {
	background: url(queen.png) no-repeat center center;
}

.chessboard td.light {
	background-color: #df85fa;
}

.chessboard td.dark {
	background-color: #20032f;
}

.chessboard td.dark.conflict {
	background-color: #f10505;
}

.chessboard td.light.conflict {
	background-color: #f10505;
}

.chessboard td.success {
	background-color: #09ba47;
}

.bg {
        /* The image used */
        background-image: url("sample3.jpg");
      
        /* Full height */
        height: 100%;
      
        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }


</style>



<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js">
</script>


</HEAD>

<body class="bg">



<div id="fb-root"></div>
<!-- <script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=1112649215446595";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script> -->
<!-- <script>
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=1112649215446595";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  </script> -->


<div id="wrap">


<!-- Menu -->
</div>

<div id="dgsidebar">

</div>

<center>
<div ID="dgmain">
<h1>Eight 👑 Queens Puzzle Game</h1>

<table width=700>
<tr>

</td>

<td>
<p class=main style="font-size: 20px;">
	<div class="box" style="height: 20px; width: 500px; border-color: #9e45b9; background-color: #9e45b9;">
		Please read the instructions before you start the game</i>.</p>
	</div>
	<div class="box" style="height: 140px; width: 500px; background-color: #000000; border-color: #000000; box-shadow: 2px 2px 4px #000000;">
		<ol >
			<li>Enter your name</li>
			<li>Click the board to place the queens</li>
			<li>If you want remove the queens, click try again.</li>
			<li>If your answer matching with previous users answers then you have to try again.</li>
		  </ol>
	</div>
</td>
</tr>
</table>



<h3>GIVE IT A GO.. &hellip;</h3>


<!-- Chess Board -->
<table width=400>
<tr align=center>
<td>
<div id="container">
			
			<div id="chessboard_container"></div>
			
		</div>
</td>
<td  align=left valign=top>
<div id="stats">
<p class=main style="font-size: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Click the board to place Queens.</P>
<p class=main></P>

	<form id="userForm">
		<input type="text" name="username" placeholder="Enter your name" required
			style="height: 30px; width: 230px; font-size: 20px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
		
		</form> <br>
				<input type="button" value="Try Aain" id="clear_board"
				style="width: 240px; height: 25px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; background-color: #1f1e1e; color: #ffffff; border-color: #AC14DB;border-radius: 10px;"/>
				<!-- <input type="button" value="Main Menu" id="backButton"
				style="width: 240px; height: 25px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; background-color: #1f1e1e; color: #ffffff; border-color: #AC14DB;border-radius: 10px;"/> -->
				<a href="../index.php" class="mainmenu" style="height: 25px; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; background-color: #1f1e1e; color: #ffffff; border-color: #AC14DB;border-radius: 10px; text-decoration:none;">Main menu</a>
				<h4><mark style="background-color: #DFB3FB;">Current Queens</mark></h4>
				<div class="box">
					<ol class="current_queens"></ol>
				</div>
				
			</div>
</td>
</tr>
</table>


<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-435375-4']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

  
$(function() {
	/* BEGIN Creating chessboard */
	if ($('#chessboard_container').length > 0) {
		var letters = Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
		var light_square = true;
		$('#chessboard_container').html('<table class="chessboard" ></table>');
		for (var i = 1; i <= 8; i++) { // Ranks
			$('.chessboard').append('<tr class="rank r' + i + '"></tr>');
			$('.r' + i).prepend('<td><span style="background-color:silver"><font color=black>&nbsp;' + (9 - i) + '&nbsp;</font></span></td>'); // Rank number (left)
			for (var j = 1; j <= 8; j++) { // Files
				$('.r' + i).append('<td class="file f' + j + ' ' + (light_square ? 'light' : 'dark') 
						+ '" title="' + letters[j - 1] + (9 - i) + '"></td>'); // Square
				light_square = !light_square;
			}
			$('.r' + i).append('<td><span style="background-color:silver"><font color=black>&nbsp;' + (9 - i) + '&nbsp;</font></span></td>'); // Rank number (right)
			light_square = !light_square;
		}
		$('.chessboard').prepend('<tr class="files"></tr>');
		$('.chessboard').append('<tr class="files"></tr>');
		$('.files').prepend('<td></td>');
		for (i in letters) {
			$('.files').append('<td><span style="background-color:silver"><font color=black>&nbsp;' + letters[i] + '&nbsp;</font></span></td>');
		}
		$('.files').append('<td></td>');
	}
	/* END Creating chessboard */
	
	$('.chessboard .file').click(function() {
		var sn = 'Q' + $(this).attr('title');
		if ($(this).hasClass('queen')) {
			$(this).removeClass('queen conflict');
			$('.' + sn).remove();
		}
		else {
			if ($('.chessboard .queen').length < 8) {
				$(this).addClass('queen');
				$('.current_queens').append('<li class="' + sn + '">' + sn + '</li>');
			}
		}
		check();
	});

	$('#clear_board').click(function() {
		$('.chessboard .queen').click();
	});
	$('#backButton').click(function() {
		window.location.replace("../Home/../index");
	});

	$('#undo').click(function() {
		var sn = $('.current_queens li:last-child').text().slice(1, 3);
		$('.chessboard .queen[title=' + sn + ']').click();
	});
});

function check() {
	for (var i = 1; i <= 8; i++) { // Ranks
		for (var j = 1; j <= 8; j++) { // Files
			if ($('.chessboard .r' + i + ' .f' + j).hasClass('queen')) {
				conflict = false;
				var x, y;
				// Horizontal
				x = 1;
				while (!conflict && x <= 8) {
					conflict = x != i && $('.chessboard .r' + x + ' .f' + j).hasClass('queen');
					x++;
				}
				// Vertical
				y = 1;
				while (!conflict && y <= 8) {
					conflict = y != j && $('.chessboard .r' + i + ' .f' + y).hasClass('queen');
					y++;
				}
				// North-west
				x = i - 1; y = j - 1;
				while (!conflict && x > 0 && y > 0) {
					conflict = $('.chessboard .r' + x + ' .f' + y).hasClass('queen');
					x--;
					y--;
				}
				// North-east
				x = i - 1; y = j + 1;
				while (!conflict && x > 0 && y < 9) {
					conflict = $('.chessboard .r' + x + ' .f' + y).hasClass('queen');
					x--;
					y++;
				}
				// South-east
				x = i + 1; y = j + 1;
				while (!conflict && x < 9 && y < 9) {
					conflict = $('.chessboard .r' + x + ' .f' + y).hasClass('queen');
					x++;
					y++;
				}
				// South-west
				x = i + 1; y = j - 1;
				while (!conflict && x < 9 && y > 0) {
					conflict = $('.chessboard .r' + x + ' .f' + y).hasClass('queen');
					x++;
					y--;
				}
				conflict ? $('.chessboard .r' + i + ' .f' + j).addClass('conflict') : $('.chessboard .r' + i + ' .f' + j).removeClass('conflict');
			}
		}
	}

	
	
	if ($('.chessboard .queen').length === 8 && $('.chessboard .conflict').length === 0) {
  alert("Congratulations! You have successfully placed 8 queens.");
}

}

</script>

</div>

<div id="dgfooter">
<!-- <img src='/images/backgroundwb.jpg'>
<p>&copy; 2009-2013 DataGenetics</p> -->
<hr size="10px">
</div>

</div>

</body>

</html>