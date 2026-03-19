import { createContext } from 'react';
import { useState } from 'react';

const StateManagerContext = createContext({
	state: null,
	updateState: () => {},
});

// Проверяем, является ли объект пустым.
const checkEmptyObject = (obj) => Object.keys(obj).length === 0;

// Маршрутизация обновления
const getUpdatedState = (state, newState) => {
	Array.isArray(newState)
		? updateStateArray(state, newState)
		: updateStateObject(state, newState);
};

const updateStateArray = (state, newState) => {

	newState.reduce((updatedState, { id, ...itemData }) => {

		// 1. Ищем существующий элемент по id
		const foundItem = state.find(({ id: itemId }) => id === itemId);

		// 2. Если элемента нет - добавляем в начало
		if (!foundItem) {
			return [{ id, ...itemData }, ...updatedState];
		}

		// 3. Если itemData пустой - удаляем элемент
		if (checkEmptyObject(itemData)) {
			return updatedState.filter(({ id: idToItemCheck }) => id !== idToItemCheck);
		}

		// 4. Иначе - обновляем элемент
		return updatedState.map((item) => {
			if (item.id === id) {
				return { ...item, ...itemData };
			} else {
				return item;
			}
		});
	}, state);
};

const updateStateObject = (state, newState) => {
	Object.entries(newState).reduce(
		(updatedState, [key, value]) => ({
			...updatedState,
			[key]:
				typeof value === 'object' ? getUpdatedState(updatedState[key], value) : value,
		}),
		state,
	);
};

export const StateManager = ({ children, initialState }) => {
	const [state, setState] = useState(initialState);

	const updateState = (newState) => {
		setState(getUpdatedState(state, newState));
	};

	return (
		<StateManagerContext.Provider value={{ state, updateState }}>
			{children}
		</StateManagerContext.Provider>
	);
};
