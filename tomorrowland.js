//Load https://www.tomorrowland.com/en/festival/line-up/stages/friday-17-july-2020
//Run this script in the console

var weekendOneOnly = true;

var stages = document.querySelectorAll('.stage__content ');

var stageCount = weekendOneOnly ? 43 : stages.length;
var artists = [];

for (let i = 0; i < stageCount; i++) {
	const stage = stages[i];
	stage.getElementsByTagName('li').forEach((l) => artists.push(l.textContent.trim()));
}

artists.toString();
