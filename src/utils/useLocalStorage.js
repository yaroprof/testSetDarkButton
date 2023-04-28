import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
	// getting stored value
  // Функція getStorageValue отримує ключ та значення за замовчуванням, та повертає значення з локального сховища, якщо таке є, або значення за замовчуванням.
	const saved = localStorage.getItem(key);
	const initial = JSON.parse(saved);
	return initial || defaultValue;
}

// Функція useLocalStorage приймає два аргументи: ключ (key) та значення за замовчуванням (defaultValue). Вона повертає масив з двох елементів: поточне значення з локального сховища та функцію, що дозволяє змінювати це значення.
export const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		// storing input name
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};
