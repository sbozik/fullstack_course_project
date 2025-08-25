
export type UserRecord = {
    name: string;
    answer: "yes" | "no" | "if-needed";
};

export type DateRecord = {
    timestamp: number;
    records: UserRecord[];
};