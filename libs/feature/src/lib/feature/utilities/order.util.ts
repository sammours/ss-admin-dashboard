import { orderStatus } from "../data";

export class OrderUtil {
    public static getIcon(status: string) {
        return orderStatus.find(x => x.text === status)?.icon ?? 'home';
    }

    public static isConfirmed(status: string) {
        return OrderUtil.isStatus('Confirmed', status);
    }

    public static isInTransit(status: string) {
        return OrderUtil.isStatus('In transit', status);
    }

    public static isPreOrder(status: string) {
        return OrderUtil.isStatus('Pre-order', status);
    }

    public static isCancelled(status: string) {
        return OrderUtil.isStatus('Cancelled', status);
    }

    private static isStatus(should: string, is: string) {
        return should.toLocaleLowerCase() === (is + '').toLocaleLowerCase();
    }
}