import React from 'react';
import { ThemeType, IntervalType } from '../../App';
import styles from './Settings.module.css';
import Button from '../Button/Button';

type SettingsPropsType = {
	theme: ThemeType,
	changeTheme: () => void,
	interval: IntervalType,
	changeInterval: () => void
};

class Settings extends React.Component<SettingsPropsType> {
	render() {
		return (
			<div className={styles.settings}>
				<Button
					text={'25-5' === this.props.interval ? "50-10" : "25-5"}
					callback={this.props.changeInterval}
				/>
				<Button
					text={'light' === this.props.theme ? "Dark" : "Light"}
					callback={this.props.changeTheme}
				/>
			</div>
		);
	}
}

export default Settings;