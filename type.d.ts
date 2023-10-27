interface DataType {
    type: string;
    ttl: number;
    value: string;
    action: string | null;
    namespace: string | null;
    ruleId: string;
    taskId: string;
    creationTime: number;
    destination: string;
    author: string | null;
    source: string | null;
};

type AuthVerifyResponse = {
    error?: string;
    data?: {
        valid: boolean;
    };
};

type FormType = {
    webbSourceType: string;
    formType: string;
    taskType: string;
    dataSearchType: string;
}