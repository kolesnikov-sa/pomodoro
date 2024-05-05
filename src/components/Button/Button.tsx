import React from 'react';
import styles from './Button.module.css';

type ButtonPropsType = {
	text: string,
	callback: () => void,
	backgroundColor?: string,
	disabled?: boolean
}

class Button extends React.Component<ButtonPropsType> {
	render() {
		return <div
			className={`${styles.button} ${this.props.disabled && styles.disabled}`}
			style={{backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "none"}}
			onClick={this.props.callback}>
			{this.props.text}
		</div>
	}
}

export default Button;