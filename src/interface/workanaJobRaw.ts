export interface WorkanaJobRaw {
    slug: string;
    title: string;
    description: string;
    authorName: string;
    skills: {anchorText: string}[];
    budget: string;
    isUrgent: boolean;
}