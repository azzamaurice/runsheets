import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';
import type { RunSheetItem } from '@/types/runsheet';

const nextId = (): number => Date.now() + Math.random();

const serviceTitle = useStorage<string>('service-title', '');
const serviceDate = useStorage<string>('service-date', new Date().toISOString().slice(0, 10));
const items = useStorage<RunSheetItem[]>('runsheet-items', [
    { id: nextId(), time: '09:00', title: '', description: '' },
]);

export const useRunsheet = (): {
    serviceTitle: Ref<string>;
    serviceDate: Ref<string>;
    items: Ref<RunSheetItem[]>;
    addItem: () => void;
    removeItem: (index: number) => void;
    updateItem: (index: number, field: keyof RunSheetItem, value: string) => void;
} => {
    const addItem = (): void => {
        items.value.push({ id: nextId(), time: '', title: '', description: '' });
    };

    const removeItem = (index: number): void => {
        if (items.value.length <= 1) return;
        items.value.splice(index, 1);
    };

    const updateItem = (index: number, field: keyof RunSheetItem, value: string): void => {
        const item = items.value[index];
        if (item) item[field] = value as never;
    };

    return { serviceTitle, serviceDate, items, addItem, removeItem, updateItem };
};
