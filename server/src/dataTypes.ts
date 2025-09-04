export type UserRecord = {
    name: string;
    answer: "yes" | "no" | "if-needed";
};

export type DateRecord = {
    timestamp: number;
    records: UserRecord[];
};

export type PollingEvent = {
    id: string | number;
    location?: string;
    title: string;
    dates: DateRecord[];
};