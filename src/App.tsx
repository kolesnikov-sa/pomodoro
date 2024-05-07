import React from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Button from './components/Button/Button';
import Mode from './components/Mode/Mode';
import Settings from './components/Settings/Settings';

import convertTimestampToMinutesSeconds from './utils/convertTimestampToMinutesSeconds';

import ding from './sounds/ding.mp3';

type AppPropsType = {};

type ModeType = 'timer' | 'pause';
export type ThemeType = 'light' | 'dark';

type AppStateType = {
	startTime: number,
	totalTime: number,
	timeLeft: number,
	activeTimerId: number,
	started: boolean,
	paused: boolean,
	mode: ModeType,
	theme: ThemeType,
}

class App extends React.Component {
	constructor(props: AppPropsType) {
		super(props);

		this.runTimer = this.runTimer.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.pauseTimer = this.pauseTimer.bind(this);
		this.resumeTimer = this.resumeTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.nextMode = this.nextMode.bind(this);
		this.changeTheme = this.changeTheme.bind(this);
	}

	initialTimeLeft = 25 * 60 * 1000; // 25 minutes
	initialPauseLeft = 5 * 60 * 1000 // 5 minutes

	audio = new Audio(ding);

	state: AppStateType = {
		startTime: 0,
		totalTime: this.initialTimeLeft,
		timeLeft: this.initialTimeLeft,
		activeTimerId: 0,
		started: false,
		paused: false,
		mode: 'timer',
		theme: 'light',
	}

	runTimer() {
		const currentTime = new Date().getTime();
		const timeLeft = this.state.startTime + this.state.totalTime - currentTime;

		if (timeLeft <= 0) {
			this.audio.play();
			this.nextMode();
			return;
		}

		this.setState({
			...this.state,
			timeLeft: timeLeft
		});

		if (this.state.started && !this.state.paused) {
			document.title = ('timer' === this.state.mode ? "Work " : "Pause ") + convertTimestampToMinutesSeconds(timeLeft);
		}
	}

	startTimer() {
		const activeTimerId = setInterval(
			this.runTimer,
			10
		);

		this.setState({
			...this.state,
			startTime: new Date().getTime(),
			totalTime: 'timer' === this.state.mode ? this.initialTimeLeft : this.initialPauseLeft,
			timeLeft: 'timer' === this.state.mode ? this.initialTimeLeft : this.initialPauseLeft,
			activeTimerId: activeTimerId,
			started: true,
			paused: false
		});
	}

	pauseTimer() {
		clearInterval(this.state.activeTimerId);

		this.setState({
			...this.state,
			starter: true,
			paused: true
		});
	}

	resumeTimer() {
		const activeTimerId = setInterval(
			this.runTimer,
			10
		);

		this.setState({
			...this.state,
			startTime: new Date().getTime(),
			totalTime: this.state.timeLeft,
			activeTimerId: activeTimerId,
			started: true,
			paused: false
		});
	}

	stopTimer() {
		clearInterval(this.state.activeTimerId);

		this.setState({
			...this.state,
			startTime: 'timer' === this.state.mode ? this.initialTimeLeft : this.initialPauseLeft,
			timeLeft: 'timer' === this.state.mode ? this.initialTimeLeft : this.initialPauseLeft,
			started: false,
			paused: false,
		});

		document.title = "Pomodoro";
	}

	nextMode() {
		this.stopTimer();

		if ('timer' === this.state.mode) {
			this.setState({
				...this.state,
				startTime: 0,
				totalTime: this.initialPauseLeft,
				timeLeft: this.initialPauseLeft,
				activeTimerId: 0,
				started: false,
				paused: false,
				mode: 'pause'
			});
		} else {
			this.setState({
				...this.state,
				startTime: 0,
				totalTime: this.initialTimeLeft,
				timeLeft: this.initialTimeLeft,
				activeTimerId: 0,
				started: false,
				paused: false,
				mode: 'timer'
			});
		}
	}

	changeTheme() {
		this.setState({
			...this.state,
			theme: 'light' === this.state.theme ? 'dark' : 'light'
		});
	}

	render() {
		return (
			<div className={`${"App"}${'light' !== this.state.theme ? ' dark' : ''}`}>
				<Mode mode={this.state.mode} />
				<Timer timeLeft={this.state.timeLeft} />
				<ProgressBar
					totalTime={this.state.totalTime}
					timeLeft={this.state.timeLeft}
					mode={this.state.mode}
				/>
				<div className="buttons">
					<Button
						text={!this.state.started ? "Start" : !this.state.paused ? "Pause" : "Resume"}
						callback={!this.state.started ? this.startTimer : !this.state.paused ? this.pauseTimer : this.resumeTimer}
					/>
					<Button text="Stop" callback={this.state.started ? this.stopTimer : () => {}} disabled={!this.state.started}/>
					<Button text="Skip" callback={this.nextMode} />
				</div>
				<Settings theme={this.state.theme} changeTheme={this.changeTheme} />
			</div>
		);
	}
}

export default App;
