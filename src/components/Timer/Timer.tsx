import React from 'react';
import styles from './Timer.module.css';
import convertTimestampToMinutesSeconds from '../../utils/convertTimestampToMinutesSeconds';

type TimerPropsType = {
	timeLeft: number
}

class Timer extends React.Component<TimerPropsType> {
	render() {
		return <div className={styles.timer}>
			{convertTimestampToMinutesSeconds(this.props.timeLeft)}
		</div>
	}
}

export default Timer;