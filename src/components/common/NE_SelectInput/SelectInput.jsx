import React from 'react';
import styles from './SelectInput.module.scss';

export default function SelectInput({ value, options, onChange }) {
  return (
    <select className={styles.container} value={value} onChange={onChange}>
      {options?.map((option) => (
        <option key={option} value={option}>
          {option?.name || option}
        </option>
      ))}
    </select>
  );
}
