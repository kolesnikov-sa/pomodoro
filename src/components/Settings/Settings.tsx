import React from 'react';
import { ThemeType } from '../../App';
import styles from './Settings.module.css';
import Button from '../Button/Button';

type SettingsPropsType = {
	theme: ThemeType
	changeTheme: () => void
};

class Settings extends React.Component<SettingsPropsType> {
	render() {
		return (
			<div className={styles.settings}>
				<Button
					text={'light' === this.props.theme ? "\u263E" : "\u2600"}
					callback={this.props.changeTheme}
					color="#aaa"
					noBorder={true}
					fontSize='1.5rem'
				/>
			</div>
		);
	}
}

export default Settings;