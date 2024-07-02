import { categories } from "../data";

export class CategoryUtil {
    public static getIcon(category: string) {
        return categories.find(x => x.text === category)?.icon ?? 'home';
    }
}