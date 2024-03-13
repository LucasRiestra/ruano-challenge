import React from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import { FilterProps } from '../../interfaces/interfaces';

export const Filter: React.FC<FilterProps> = ({ items, setItems }) => {
  const options = ['None', 'Most Recent', 'Less Recent'];

  const onOptionChange = (e:any) => {
    let sortedItems;
    switch (e.value) {
      case 'Most Recent':
        sortedItems = [...items].sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'Less Recent':
        sortedItems = [...items].sort((a, b) => a.releaseYear - b.releaseYear);
        break;
      default:
        sortedItems = items;
    }
    setItems(sortedItems);
  };

  return (
    <div style={{ width: '20vh', margin: '2vh auto' }}>
      <SelectBox
        items={options}
        defaultValue={options[0]}
        onValueChanged={onOptionChange}
      />
    </div>
  );
};

export default Filter;