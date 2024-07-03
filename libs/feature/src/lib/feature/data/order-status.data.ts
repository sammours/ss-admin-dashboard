import { IconType } from "@ss-admin-dashboard/util-common";

export const orderStatus: { icon: IconType, text: string }[] = [
    { icon: 'save', text: 'Confirmed'},
    { icon: 'truck', text: 'In transit'},
    { icon: 'bookmark', text: 'Pre-order'},
    { icon: 'x', text: 'Cancelled'},
]