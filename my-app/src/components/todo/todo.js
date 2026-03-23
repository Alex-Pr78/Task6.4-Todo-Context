import { Button } from '../button/button';
import { updateTodo, createTodo, deleteTodo } from '../../api';
import { useStateManager } from '../../state-manager';
import { NEW_TODO_ID } from '../../constants';
import styles from './todo.module.css';

export const Todo = ({ id, title, completed }) => {
	const {
		state: {
			editingTodo: { id: editingTodoId, title: editingTodoTitle },
		},
		updateState,
	} = useStateManager();

	const isEditing = id === editingTodoId;

	const onEdit = () => updateState({ editingTodo: { id, title } });

	const onTitleChange = ({ target }) => {
		updateState({ title: target.value });
	};

	const onCompletedChange = ({ target }) => {
		updateTodo({ id, completed: target.checked }).then(() => {
			updateState({ todos: [{ id, completed: target.checked }] });
		});
	};

	const onNewTodoSave = () => {
		createTodo({ title, completed }).then((todo) => {
			updateState({ todos: [{ id: NEW_TODO_ID }, todo] });
		});
	};

	const onEditingTodoSave = () => {
		updateTodo({ id, title }).then(() => {
			updateState({
				todos: [{ id, title: editingTodoTitle }],
				editingTodo: { id: null },
			});
		});
	};

	const onSave = () => {
		if (id === NEW_TODO_ID) {
			onNewTodoSave();
		} else {
			onEditingTodoSave();
		}
	};

	const onRemove = () => {
		deleteTodo(id).then(() => updateState({ todos: [{ id }] }));
	};

	return (
		<div className={styles.todo}>
			<input
				className={styles.checkbox}
				type="checkbox"
				checked={completed}
				onChange={onCompletedChange}
			/>
			<div className={styles.title}>
				{isEditing ? (
					<input type="text" value={editingTodoTitle} onChange={onTitleChange} />
				) : (
					<div onClick={onEdit}>{title}</div>
				)}
			</div>
			<div>
				{isEditing ? (
					<Button onClick={onSave}>✎</Button>
				) : (
					<Button onClick={onRemove}>✖</Button>
				)}
			</div>
		</div>
	);
};
