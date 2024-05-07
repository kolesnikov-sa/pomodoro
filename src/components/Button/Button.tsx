import React from 'react';
import styles from './Button.module.css';

type ButtonPropsType = {
	text: string,
	callback: () => void,
	fontSize?: string,
	color?: string,
	backgroundColor?: string,
	noBorder?: boolean,
	disabled?: boolean
}

class Button extends React.Component<ButtonPropsType> {
	render() {
		return <div
			className={`${styles.button} ${this.props.disabled && styles.disabled} ${this.props.noBorder && styles.noBorder}`}
			style={{
				fontSize: this.props.fontSize ? this.props.fontSize : "inherit",
				color: (this.props.color && !this.props.disabled) ? this.props.color : "",
				backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "none"
			}}
			onClick={this.props.callback}>
			{this.props.text}
		</div>
	}
}

export default Button;