import { Button } from '../../../button/button';
import styles from './sorting.module.css';
import { useStateManager } from '../../../../state-manager';

export const Sorting = () => {
	const {
		state: {
			options: { isAlphabetSorting },
		},
		updateState,
	} = useStateManager();

	const onChange = ({ target }) => {
		updateState({
			options: {
				isAlphabetSorting: target.checked,
			}
		})
	};

	return (
		<Button>
			<input
				className={styles.checkbox}
				id="sorting-button"
				type="checkbox"
				checked={isAlphabetSorting}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor="sorting-button">
				A&darr;
			</label>
		</Button>
	);
};
