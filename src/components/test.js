const [pointOne, setPointOne] = useState(0);
const [pointTwo, setPointTwo] = useState(0);
const [gameOne, setGameOne] = useState(0);
const [gameTwo, setGameTwo] = useState(0);
const [secondOne, setSecondOne] = useState(0);

const [point2One, setPoint2One] = useState(0);
const [point2Two, setPoint2Two] = useState(0);
const [game2One, setGame2One] = useState(0);
const [game2Two, setGame2Two] = useState(0);
const [second2One, setSecond2One] = useState(0);
const [victory, setVictory] = useState({ show: false, Message: '' });
const [disable, setDisable] = useState(false);

// function handleClickOne(){
// 	setPoints((points) => ({ ...points, team1: 1 }));
// }
// function handleClickOne() {
//     setPoint(point + 15);
//     // if (game === 2) {
// 	// 	setCosmo(cosmo + 1);
// 	// 	setGame(0);
//     //     setPoint(0)
// 	// }
//     if (game === 1 && point === 40) {
//         setCosmo(cosmo + 1);
//         setVictory({ show: true, Message: 'VICTORIAAAAAAA' });
//         setGame(0);
//         setPoint(0);
//     }
//     else if (point === 30) {
//         setPoint(point + 10);
//     }
//     else if (point >= 40) {
//         setGame(game + 1);
//         setPoint(0);
//     }

// }
function handleClickOne() {
	// setPoints((points) => ({ ...points, team1: 1 }));

	setPointOne(pointOne + 15);

	if (gameOne === 2 && pointOne >= 40) {
		setSecondOne(secondOne + 1);
		setPointOne(0);
		setGameOne(gameOne);
	} else if (pointOne >= 40) {
		setGameOne(gameOne + 1);
		setPointOne(0);
	}
	if (secondOne === 1 && pointOne === 40 && gameOne === 2) {
		setVictory({ show: true, Message: 'VICTORIAAAAAAA' });
		setDisable(true);
	} else if (pointOne === 30) {
		setPointOne(pointOne + 10);
	}
}
function handleClickTwo() {
	setPoint2One(point2One + 15);
}
