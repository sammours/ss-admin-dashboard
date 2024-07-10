import { PaginatedList } from "@ss-admin-dashboard/util-common";
import { DateTime } from "luxon";
import { MailFolder } from "../data";

export class MailModel {
    id = '';
    from = '';
    sender = '';
    subject = '';
    body = '';
    folder: MailFolder = '';
    date: DateTime | undefined;
    avatar = '';
    isRead = false;
}

export class MailPaginatedList extends PaginatedList<MailModel> {
    public inboxCount = 0;
    public junkCount = 0;
    public flaggedCount = 0;
    public draftsCount = 0;
}