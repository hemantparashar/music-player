var imgDir = "assets/",
	songDir = "songs/";

var songs = [
	{
	name:"Lean On",
	artist:"Major Lazer, MO, DJ Snake",
	duration:"2:56",
	link:songDir+"lean.mp3",
	songImg:imgDir+"lean.jpg",
	coverImg:imgDir+"lean-cover.jpg"
	},
	{
	name:"Sun is shining",
	artist:"Axwell-Ingrosso",
	duration:"4:10",
	link:songDir+"sun.mp3",
	songImg:imgDir+"sun.jpg",
	coverImg:imgDir+"sun-cover.jpg"
	},
	{
	name:"Maps",
	artist:"Maroon 5",
	duration:"3:10",
	link:songDir+"maps.mp3",
	songImg:imgDir+"maps.jpg",
	coverImg:imgDir+"maps-cover.jpg"
	},
	{
	name:"Love me again",
	artist:"John Newman",
	duration:"3:54",
	link:songDir+"love.mp3",
	songImg:imgDir+"love.jpg",
	coverImg:imgDir+"love-cover.jpg"
	},
	{
	name:"Omnia",
	artist:"Armin Van Burren",
	duration:"3:44",
	link:songDir+"armin.mp3",
	songImg:imgDir+"armin.jpg",
	coverImg:imgDir+"armin-cover.jpg"
	}
];


var compiled1 = Handlebars.compile($('#template1').html()),
			compiled2 = Handlebars.compile($('#template2').html());

	$('#songs').html(compiled1(songs));
	$('#album-cover').html(compiled2(songs));
