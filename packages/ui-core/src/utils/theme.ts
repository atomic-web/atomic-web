import { ThemeType } from "../shared/types/theme";

export const getSize = (theme : ThemeType, size : string) => theme?.global?.size?.[size] ?? size;
