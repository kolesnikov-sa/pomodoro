import React from 'react';
import styles from './ProgressBar.module.css';

type ProgressBarPropsType = {
	totalTime: number,
	timeLeft: number,
	mode: string
}

class ProgressBar extends React.Component<ProgressBarPropsType> {
	displayProgress (totalTime: number, timeLeft: number) {
		const progressBarRightPercentage = (1 - timeLeft / totalTime) * 100 ;
		return progressBarRightPercentage;
	}

	render() {
		return <div className={styles.progressBar}>
			<div className={styles.progressBarBody}>
				<div
					className={`${styles.progressBarBodyProgress} ${'timer' === this.props.mode ? styles.progressBarBodyProgressTimer : styles.progressBarBodyProgressPause}`}
					style={{left: `${this.displayProgress(this.props.totalTime, this.props.timeLeft)}%`}}
				></div>
			</div>
		</div>
	}
}

export default ProgressBar;