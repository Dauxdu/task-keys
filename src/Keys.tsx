import { KeyboardEvent, useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);

    function saveName(id: number, name: string) {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, name } : item,
            ),
        );
    }

    const sortedItems = [...items].sort((a, b) =>
        props.sorting === 'ASC' ? a.id - b.id : b.id - a.id,
    );

    return (
        <div>
            {sortedItems.map((item) => (
                <EditableItem key={item.id} item={item} onSave={saveName} />
            ))}
        </div>
    );
}

function EditableItem(props: {
    item: IItem;
    onSave: (id: number, name: string) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(props.item.name);

    function startEditing() {
        setValue(props.item.name);
        setIsEditing(true);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            props.onSave(props.item.id, value);
            setIsEditing(false);
        } else if (event.key === 'Escape') {
            setIsEditing(false);
        }
    }

    if (isEditing) {
        return (
            <div>
                <input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>
        );
    }

    return (
        <div>
            <span onClick={startEditing}>{props.item.name}</span>
        </div>
    );
}
