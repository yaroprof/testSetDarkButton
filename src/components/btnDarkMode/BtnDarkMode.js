import { useEffect } from 'react';
import { useLocalStorage } from './../../utils/useLocalStorage';
import detectDarkMode from '../../utils/detectDarkMode';

import sun from './sun.svg';
import moon from './moon.svg';
import './style.css';

const BtnDarkMode = () => {
  // useLocalStorage отримує актуальні чи дефолтні значення зі сховища; актуальні - darkMode (key у сховищі), якщо його немає - встан. дефолтне. При отриманні даних зі сховища BtnDarkMode запускає detectDarkMode та отримує актуальні дані
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', detectDarkMode());
  // за результатми darkMode body отримує той, чи інший клас та стилі
  useEffect(() => {
    if (darkMode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // matchMedia- аналізує, яку тему встановив клієнт , якщо темну, тоді привласн. true, світла- false/ відповідно спрацьовує - setDarkMode
    window
      .matchMedia('(prefers-color-scheme: dark)')
      // Метод addEventListener() прослуховує зміни в об'єкті matchMedia('(prefers-color-scheme: dark)'), що визначає, чи вибраний на пристрої користувачем темний чи світлий режим.
      // Коли стан цього об'єкта змінюється, відбувається подія change, і передається об'єкт event, що містить інформацію про зміни.
      // В залежності від того, який режим було обрано, виконується один з двох варіантів:
      // якщо змінюється на темну тему, змінна newColorScheme приймає значення 'dark'
      // якщо змінюється на світлу тему, змінна newColorScheme приймає значення 'light'
      // Отже, змінна newColorScheme визначає, який режим теми було обрано, і передається в функцію setDarkMode() для оновлення налаштувань теми в додатку.
      .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? 'dark' : 'light';
        setDarkMode(newColorScheme);
      });
  }, [setDarkMode]);

  // toggleDarkMode запускає ф-ю setDarkMode , Яка змінює показник на протилежний
  const toggleDarkMode = () => {
    setDarkMode((currentValue) => {
      return currentValue === 'light' ? 'dark' : 'light';
    });
  };

  const btnNormal = 'dark-mode-btn';
  const btnActive = 'dark-mode-btn dark-mode-btn--active';

  return (
    <button className={darkMode === 'dark' ? btnActive : btnNormal} onClick={toggleDarkMode}>
      <img src={sun} alt="Light mode" className="dark-mode-btn__icon" />
      <img src={moon} alt="Dark mode" className="dark-mode-btn__icon" />
    </button>
  );
};

export default BtnDarkMode;
