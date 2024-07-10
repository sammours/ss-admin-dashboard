export const mailFolders: string[] = [
    'inbox',
    'flagged',
    'drafts',
    'junk'
];

export type MailFolder = typeof mailFolders[number];
