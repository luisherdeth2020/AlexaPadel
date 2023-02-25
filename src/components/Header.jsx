import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { DataContext } from '../context/userContext';
import styles from './Header.module.css';

const Header = () => {
	const navigate = useNavigate();
	const { names, setNames } = useContext(DataContext);
	const [inputValue, setInputValue] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [message, setMessage] = useState({ show: false, message: '' });

	const enviarForm = (e) => {
		e.preventDefault();

		if (inputValue === '') {
			setMessage({ show: true, message: 'Número de participantes es ' });
			return;
		}
		setNames([...names, inputValue]);
		setInputValue('');
		if (names.length === 3) {
			setMessage({ show: false });
			setDisabled(true);
		}

		if (names.length === 1) {
			setMessage({ show: false });
		}
	};

	const restablecer = () => {
		setNames([]);
		setMessage({ show: false });
	};
	const onEnter = () => {
		if (names.length === 2 || names.length === 4) {
			navigate('/marcador');
		}
		if (names.length === 0 || names.length === 1 || names.length === 3) {
			setMessage({ show: true, message: 'Número de participantes es ' });
		}
	};

	return (
		<>
			<div className="container">
				<h1>BIENVENIDO A WIKIPADEL</h1>
				<div className="subtitle my-5">
					<h2>Nombre de los participantes</h2>
				</div>
				<div className={styles.container__main}>
					<form onSubmit={enviarForm}>
						<input
							placeholder="Introduce participante"
							disabled={disabled}
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<button className={styles.add} disabled={disabled} type="submit">
							Añadir
						</button>
						<button onClick={restablecer} className={styles.add} type="submit">
							Restablecer
						</button>

						{message.show && (
							<div className={styles.message}>
								⚠️{message.message}
								<span className={styles.message__num}>2 ó 4</span>⚠️
							</div>
						)}
					</form>
					<div className={styles.participantes}>
						<div className={styles.participantes__caja}>
							{names.map((name, index) => (
								<p className={styles.participantes__name} key={index}>
									🥎 {name}
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
			<button onClick={onEnter} className="my-5 fs-2 button_30" role="button">
				Entrar
			</button>
		</>
	);
};

export default Header;
