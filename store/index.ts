import { create } from 'zustand';

interface State {
    chooseHero: string | null;
    isBack: boolean;
    isOpenPreview: boolean;
    addOpenPreview: (v: boolean) => void;
    addPerson: (v: string) => void;
    addBack: (v: boolean) => void;
    addCoin: () => void;
    addResumeGame: () => void;
    addIsFinish: () => void;
    addIsPause: () => void;
    addOpenResult: (v: boolean) => void;
    addReset: () => void;
    addIsGameOver: () => void;
    coins: number;
    isGamePaused: boolean;
    isGameOver: boolean;
    isGameFinish: boolean;
    isOpenResult: boolean;
    isGameFail: boolean;
    openWinModal: (string | number)[]
    addOpenWinModal: (t?: string, n?: number) => void,
    addFail: () => void,
}

const initState = {
    isBack: true,
    chooseHero: null,
    isOpenPreview: false,
    coins: 0,
    isGamePaused: false,
    isGameOver: false,
    isGameFinish: false,
    isOpenResult: false,
    openWinModal: [],
    isGameFail: false,
};

const useStore = create<State>()(
    (set, get) => ({
        ...initState,

        addOpenWinModal(t, n) {
            if (t && n && n >-1) {
                set({
                    openWinModal: [t, n]
                });
            } else {
                set({
                    openWinModal: []
                });
            }
        },
        addOpenResult(isOpenResult) {
            set({
                isOpenResult,
            });
        },
        addFail() {
            set({
                isGameFail: true,
            });
        },
        addIsFinish() {
            set({
                isGameFinish: true,
            });
        },
        addIsGameOver() {
            set({
                isGameOver: true,
            });
        },
        addIsPause() {
            set({
                isGamePaused: true,
            });
        },
        addCoin() {
            const coins = get().coins+1;
            set({
                coins,
            });
        },
        addResumeGame() {
            set({
                isGamePaused: false,
            });
        },
        addOpenPreview(isOpenPreview) {
            set({ isOpenPreview });
        },
        addPerson(chooseHero) {
            set({ chooseHero });
        },
        addBack(isBack) {
            set({ isBack });
        },
        addReset() {
            set({
                ...initState,
            });
        }
    })
);

export default useStore;
