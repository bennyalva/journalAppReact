import { types } from "../types/types";

export const setErrorAction = (msgError) => ({
    type: types.uiSetError,
    payload: msgError
});
export const removeErrorAction = () => ({
    type: types.uiRemoveError
});
export const startLoading = () => ({
    type: types.uiStartLoading
});
export const finishLoading = () => ({
    type: types.uiFinishLoading
});