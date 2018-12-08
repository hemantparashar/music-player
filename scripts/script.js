var audio;
$(window).load(function(){
	var $previous 	= $('#previous'),
		$play 	 	= $('#play'),
		$pause	 	= $('#pause'),
		$stop	 	= $('#stop'),
		$next	 	= $('#next'),
		$repeat	 	= $('#repeat'),
		$list	 	= $('#list'),
		$repeat	 	= $('#repeat'),
		$pslider 	= $('#progress-slide'),
		$timer	 	= $('#timer'),
		$totDur  	= $('#totalDuration'),
		$mute    	= $('#mute'),
		$fullVol 	= $('#full-vol'),
		$songTitle	= $('#songTitle'),
		$songArtist	= $('#songArtist'),
		$playlist 	= $('#playlist'),
		$songs    	= $('#songs'),
		$songsList 	= $('#songs li'),
		$timer 		= $('#timer'),
		$mp3Player 	= $('#mp3player'),
		$close 		= $('#close'),
		$songImg 	= $('div.songImg'),
		$songCover 	= $('div.cover');

	$('#mp3player-base').css('opacity','1');
	var counter=0;
	var song =  $songsList.eq(counter).data('link');	
	audio = new Audio(song);
	$totDur.text(songs[counter].duration);
	$songTitle.text(songs[counter].name);
	$songArtist.text(songs[counter].artist);
	$songImg.removeClass('activeSongImg').eq(counter).addClass('activeSongImg');
	$songCover.removeClass('activeSongCover').eq(counter).addClass('activeSongCover');
	$songs.children().eq(counter).addClass('activeSongPlaylist');
	$songsList.children('.icons').children('i.fa-play').show();
	$songsList.children('.icons').children('i.fa-pause').hide();
	$mute.hide();
	
	$play.click(function(){
		audio.addEventListener('timeupdate', function(){
				$pslider.slider('option', 'value', audio.currentTime);
				$timer.text(formatTime(audio.currentTime));
			});
		audio.play();
		$play.hide();
		$pause.show();		
		$pslider.slider({ max:audio.duration});
		change(counter);		
		
	});
	
	$pause.click(function(){
		audio.pause();
		$play.show();
		$pause.hide();
		$songsList.children('.icons').children('i.fa-play').show();
		$songsList.children('.icons').children('i.fa-pause').hide();
	});

	$stop.click(function(){
		audio.pause();
		audio.currentTime=0;
		$play.show();
		$pause.hide();
		$songsList.children('.icons').children('i.fa-play').show();
		$songsList.children('.icons').children('i.fa-pause').hide();
	});


	$next.click(function(){
		audio.pause();	
		counter++;
		if(counter>4){
			counter=0;
		}
		playsong(counter);
		});


	$previous.click(function(){
		audio.pause();	
		counter--;
		if(counter<0){
			counter=4;
		}
		playsong(counter);
	});


	$repeat.click(function(){
		$repeat.toggleClass('active');
		if($repeat.hasClass('active')){
			audio.loop=true;
		}else{
			audio.loop=false;
		}
	});

	$fullVol.click(function(){
		$fullVol.fadeOut(300);
		$mute.fadeIn(300);
		audio.volume=0;
	});

	$mute.click(function(){
		$mute.fadeOut(300);
		$fullVol.fadeIn(300);
		audio.volume=1;
	});
	
	$pslider.slider({  
		animate: true,
	    range: "min",
	    value: 0,
	    min: 0,
	    max:256,
	    step: 0.1,
	    slide: function(event, ui){
	    	audio.currentTime = ui.value;	
	    }
	});

	function playsong(counter){
		song =  $songsList.eq(counter).data('link');
		audio = new Audio(song);
		$pslider.slider('option', 'value',0);
		$totDur.text(songs[counter].duration);
		$songTitle.text(songs[counter].name);
		$songArtist.text(songs[counter].artist);
		change(counter);			
		audio.play();
		$play.hide();
		$pause.show();
		audio.addEventListener('timeupdate', function(){
				$pslider.slider('option', 'value', audio.currentTime);
				$timer.text(formatTime(audio.currentTime));
			});
}

	function change(counter){
		$songImg.removeClass('activeSongImg').eq(counter).addClass('activeSongImg');
		$songCover.removeClass('activeSongCover').eq(counter).addClass('activeSongCover');
		$songs.children().removeClass('activeSongPlaylist').eq(counter).addClass('activeSongPlaylist');
		$songsList.children('.icons').children('i.fa-play').show();
		$songsList.children('.icons').children('i.fa-pause').hide();
		$songs.children().eq(counter).children('.icons').children('i.fa-pause').fadeIn(200);
		$songs.children().eq(counter).children('.icons').children('i.fa-play').fadeOut(200);
		$pslider.slider({ max:audio.duration});
		}

	function formatTime(millisec){
		val = Number(millisec);
		var sec = Math.floor(millisec%60);
		var min = Math.floor(millisec/60);
		if(sec < 10){sec = '0'+sec;}
		return min+':'+sec;
	}

	$(audio).on("ended",function(){
		$pslider.slider('option', 'value',0);
		counter++;
		playsong(counter);
		change(counter);
	});


	$songsList.click(function(){
		var position= $(this).index();
		counter=position;
		console.log(position+"---pos++ ="+(position+1));
		audio.pause();
		audio.currentTime=0;
		$pslider.slider('option', 'value', audio.currentTime);
		change(position);
		playsong(position);
		$songsList.children('.icons').children('i.fa-play').show();
		$songsList.children('.icons').children('i.fa-pause').hide();		
		$(this).children('.icons').children('i.fa-play').hide();
		$(this).children('.icons').children('i.fa-pause').show();
	});

	initControls();

	$(window).on('resize',function(){
	// 	if(window.innerWidth<650){
	// location.reload();
	// }
		initControls();
	});

	function initControls(){
		if(window.innerWidth>650){

		$list.mouseenter(function(){
			$playlist.addClass('wobble');
			setTimeout(function(){$playlist.removeClass('wobble');},700);
				
		});

		$list.click(function(){

			if($playlist.hasClass('wobble')===false){
				$playlist.addClass('slidePlaylist shadow').css('z-index','600!important');			
				$mp3Player.addClass('slideMp3Player').addClass('front');
				$songs.addClass('songsListActive').css('z-index','600!important');
				$('#overlayNotClickable').addClass('clickable');
				setTimeout(function(){$close.show().addClass('cross');},1000);

				setTimeout(function(){

				$playlist.removeClass('slidePlaylist');
				$mp3Player.removeClass('slideMp3Player');
				},500);
			}
		});

		$close.click(function(){
			$close.removeClass('cross');

			setTimeout(function(){
			$close.css('display','none');
			},700);
			setTimeout(function(){
				$playlist.addClass('slidePlaylist').css('z-index','400!important');
			$mp3Player.addClass('slideMp3Player').removeClass('front');
			$songs.removeClass('songsListActive').css('z-index','400!important');
			
			$('#overlayNotClickable').removeClass('clickable');
			setTimeout(function(){
			$playlist.removeClass('slidePlaylist shadow');
			$mp3Player.removeClass('slideMp3Player');
			},700);
				
			},500);
			
			
		});
	}else{

		$list.click(function(){
			$playlist.addClass('slidePlaylist');
			setTimeout(function(){$close.show().addClass('cross');},700);
		});

		$close.click(function(){
			$close.removeClass('cross');
			setTimeout(function(){$playlist.removeClass('slidePlaylist');},700);
		});
	}
}


});	