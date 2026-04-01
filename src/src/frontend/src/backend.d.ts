export declare const submitContact: (name: string, email: string, phone: string, service: string, message: string) => Promise<boolean>;
export declare const getSubmissions: () => Promise<Array<{name: string; email: string; phone: string; service: string; message: string; timestamp: bigint}>>;
