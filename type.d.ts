interface DataType {
    type: string;
    ttl: number;
    value: string;
    action: string | null;
    namespace: string | null;
    ruleid: string;
    taskid: string;
    creationTime: number;
    destination: string;
    author: string | null;
}

type AuthVerifyResponse = {
    error?: string;
    data?: {
        valid: boolean;
    };
};
