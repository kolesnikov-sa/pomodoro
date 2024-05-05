import React from 'react';
import styles from './Mode.module.css';

type ModePropsType = {
	mode: string
}

class Mode extends React.Component<ModePropsType> {
	render() {
		return(
			<div
				className={'timer' === this.props.mode ? `${styles.mode} ${styles.modeWork}` : `${styles.mode} ${styles.modePause}`}
			>
				{'timer' === this.props.mode ? "Work" : "Pause"}
			</div>
		);
	}
}

export default Mode;