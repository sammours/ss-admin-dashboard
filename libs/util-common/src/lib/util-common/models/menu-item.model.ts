import { IconType } from "./icon-type.model";

export interface MenuItem {
    text: string;
    link: string;
    icon?: IconType;
    badge?: string;
    children?: MenuItem[];
}