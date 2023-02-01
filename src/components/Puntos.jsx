import { useState } from 'react';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import { DataContext } from '../context/userContext';
import '../assets/css/Puntos.css';

function Puntos() {
	const { names, setNames } = useContext(DataContext);

	const [result1, setResult1] = useState({ set1: 0, set2: 0, set3: 0, totalPoints: 0 });
	const [result2, setResult2] = useState({ set1: 0, set2: 0, set3: 0, totalPoints: 0 });
	const [disabled, setDisabled] = useState(false);
	const [victory, setVictory] = useState({ show: false, Message: '' });
	const [error, setError] = useState('');
	const [isLoadling, setIsLoadling] = useState(false);

	useEffect(() => {
		(async () => {
			const data = {
				idTeam1: '',
				idTeam2: '',
				sets: [
					{
						Equipo1set1: result1.set1,
						Equipo1set2: result1.set2,
						Equipo2set1: result2.set1,
						Equipo2set2: result2.set2,
						totalPoints: { equipo1: result1.totalPoints, equipo2: result2.totalPoints },
						finished: false,
					},
				],
			};
			// console.log(data);
			if (isLoadling) {
				await axios
					.post('http://localhost:3900/api/score', data)

					.then(() => {
						setIsLoadling(false);
					})
					.catch((err) => {
						setError(err.message);
						setIsLoadling(false);
						console.error('Error ', err.message);
					});
				setIsLoadling(false);
			}
		})();
	}, [result1, result2]);

	// async function hans() {}

	async function handleClickOne() {
		setIsLoadling(true);

		setResult1({ ...result1, totalPoints: result1.totalPoints + 15 });
		if (result1.totalPoints === 30) {
			setResult1({ ...result1, totalPoints: result1.totalPoints + 10 });
		}
		if (result1.totalPoints === 40 && result2.set1 < 2) {
			setResult1({ ...result1, set1: result1.set1 + 1, totalPoints: 0 });
			setResult2({ ...result2, totalPoints: 0 });
		}
		if (result1.set1 === 2 && result1.totalPoints === 40) {
			setResult1({ ...result1, set2: result1.set2 + 1, totalPoints: 0 });
		}
		if (result2.set2 === 2 && result1.totalPoints === 40) {
			setResult1({ ...result1, set3: result1.set3 + 1, totalPoints: 0 });
		}
		if (result2.set1 === 2 && result1.totalPoints === 40) {
			setResult1({ ...result1, set2: result1.set2 + 1, totalPoints: 0 });
		}
		if (result1.set2 === 2 && result1.totalPoints === 40) {
			setResult1({ ...result1, set3: result1.set3 + 1, totalPoints: 0 });
		}
		
		if (result1.set1 === 2 && result1.set2 === 1 && result1.totalPoints === 40) {
			setResult1({ ...result1, set2: 2, totalPoints: 0 });

			setDisabled(true);
			return setVictory({
				show: true,
				Message: `
			🏆${names[0]} & ${names[1]}🏆`,
			});
		}
		if (result1.set2 === 2 && result1.set3 === 1 && result1.totalPoints === 40) {
			setResult1({ ...result1, set3: 2, totalPoints: 0 });

			setDisabled(true);
			return setVictory({
				show: true,
				Message: `
			🏆${names[0]} & ${names[1]}🏆`,
			});
		}
		if (result1.set1 === 2 && result1.set3 === 1 && result1.totalPoints === 40) {
			setResult1({ ...result1, set3: 2, totalPoints: 0 });

			setDisabled(true);
			return setVictory({
				show: true,
				Message: `
			🏆${names[0]} & ${names[1]}🏆`,
			});
		}
	}
	function deleteClickA() {
		setResult1({ ...result1, totalPoints: result1.totalPoints - 15 });
		if (result1.totalPoints === 40) {
			setResult1({ ...result1, totalPoints: result1.totalPoints - 10 });
		}
		if (result1.totalPoints === 0) {
			setResult1({ ...result1 });
		}
	}
	async function handleClickTwo() {
		setIsLoadling(true);

		setResult2({ ...result2, totalPoints: result2.totalPoints + 15 });
		if (result2.totalPoints === 30) {
			setResult2({ ...result2, totalPoints: result2.totalPoints + 10 });
		}
		if (result2.totalPoints === 40 && result1.set1 !== 2) {
			setResult2({ ...result2, set1: result2.set1 + 1, totalPoints: 0 });
			setResult1({ ...result1, totalPoints: 0 });
		}
		if (result2.set1 === 2 && result2.totalPoints === 40) {
			setResult2({ ...result2, set2: result2.set2 + 1, totalPoints: 0 });
		}
		if (result2.totalPoints === 40 && result1.set2 === 2) {
			setResult2({ ...result2, set3: result2.set3 + 1, totalPoints: 0 });
			setResult1({ ...result1, totalPoints: 0 });
		}

		if (result2.totalPoints === 40 && result1.set1 === 2) {
			setResult1({ ...result1, totalPoints: 0 });
			setResult2({ ...result2, set2: result2.set2 + 1, totalPoints: 0 });
		}

		if (result2.set2 === 2 && result2.totalPoints === 40) {
			setResult2({ ...result2, set3: result2.set3 + 1, totalPoints: 0 });
		}
		if (result2.set1 === 2 && result2.set2 === 1 && result2.totalPoints === 40) {
			setResult2({ ...result2, set2: 2, totalPoints: 0 });

			setDisabled(true);
			return setVictory({
				show: true,
				Message: `🏆 ${names[2]} & ${names[3]} 🏆`,
			});
		}
		if (result2.set2 === 2 && result2.set3 === 1 && result2.totalPoints === 40) {
			setResult2({ ...result2, set3: 2, totalPoints: 0 });

			setDisabled(true);
			return setVictory({
				show: true,
				Message: `🏆 ${names[2]} & ${names[3]} 🏆`,
			});
		}
		if (result2.set1 === 2 && result2.set3 === 1 && result2.totalPoints === 40) {
			setResult2({ ...result2, set3: 2, totalPoints: 0 });

			setDisabled(true);
			return setVictory({
				show: true,
				Message: `🏆 ${names[2]} & ${names[3]} 🏆`,
			});
		}
	}
	function deleteClickB() {
		setResult2({ ...result2, totalPoints: result2.totalPoints - 15 });
		if (result2.totalPoints === 40) {
			setResult2({ ...result2, totalPoints: result2.totalPoints - 10 });
		}
		if (result2.totalPoints === 0) {
			setResult2({ ...result2 });
		}
	}
	return (
		<>
			<table className="table text-uppercase bg--table">
				<thead>
					<tr>
						<th>Jugadores</th>
						<th>set 1</th>
						<th>set 2</th>
						<th>set 3</th>
						<th>points</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border-right">
							<div className="d-flex flex-column align-items-start">
								<p>{names[0]}</p>
								<p>{names[1]}</p>
							</div>
						</td>

						<td className="align-middle bgcolor">{result1.set1}</td>
						<td className="align-middle bgcolor">{result1.set2}</td>
						<td className="align-middle bgcolor">{result1.set3}</td>
						<td className="align-middle bgcolor--resultado">{result1.totalPoints}</td>
					</tr>
					<tr>
						<td className="border-right">
							<div className="d-flex flex-column align-items-start">
								<p>{names[2]}</p>
								<p>{names[3]}</p>
							</div>
						</td>
						<td className="align-middle bgcolor">{result2.set1}</td>
						<td className="align-middle bgcolor">{result2.set2}</td>
						<td className="align-middle bgcolor">{result2.set3}</td>
						<td className="align-middle bgcolor--resultado">{result2.totalPoints}</td>
					</tr>
				</tbody>
			</table>
			<div className="d-flex flex-column align-items-center">
				{victory.Message && (
					<h3 className="text-center victory">
						¡CAMPEONES!
						<h2>
							<span className="text__message">{victory.Message}</span>
						</h2>
					</h3>
				)}

				{victory.show && (
					<img
						src="https://thumbs.gfycat.com/EasygoingComplicatedIndianpalmsquirrel-size_restricted.gif"
						alt="lets gooo"
					/>
				)}
			</div>

			<div className="container d-flex text-uppercase flex-column align-items-center">
				<div>
					<input
						disabled={disabled}
						className="my-3 mx-3 css-button text-uppercase"
						type="button"
						value="sumar a"
						onClick={handleClickOne}
					/>
					<input
						disabled={disabled}
						className="my-3 mx-3 css-button text-uppercase"
						type="button"
						value="sumar b"
						onClick={handleClickTwo}
					/>
				</div>
				<div className="text2">
					<input
						className="mx-3 css-button text-uppercase"
						type="button"
						value="restar a"
						onClick={deleteClickA}
					/>
					<input
						className="mx-3 css-button text-uppercase"
						type="button"
						value="restar b"
						onClick={deleteClickB}
					/>
				</div>
			</div>
		</>
	);
}
export default Puntos;

// context
// lt -h https://hiddenloop.dev -p 3900
