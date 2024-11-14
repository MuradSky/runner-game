import { create } from 'zustand';

interface State {
    chooseHero: string | null;
    isBack: boolean,
    isOpenPreview: boolean;
    addOpenPreview: (v: boolean) => void;
    addPerson: (v: string) => void;
    addBack: (v: boolean) => void;
}

const useStore = create<State>()(
    (set) => ({
        isBack: true,
        chooseHero: null,
        isOpenPreview: false,
        addOpenPreview(isOpenPreview) {
            set({ isOpenPreview });
        },
        addPerson(chooseHero) {
            set({ chooseHero });
        },
        addBack(isBack) {
            set({ isBack });
        }
    })
);

export default useStore;
