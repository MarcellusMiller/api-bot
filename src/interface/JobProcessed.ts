export interface JobProcessed {
    slug: string;
    title: string;
    description: string;
    url: string;
    authorName: string;
    skills: string[];
    minBudget: number;
    maxBudget: number;
    postedTime: Date;
    contry: string;
    isUrgent: boolean;
}