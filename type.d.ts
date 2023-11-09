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
    dateSearchType: string;
}


type Spl = {
    enable: boolean;
    spl: string;
    ruleId: string;
    destination: string;
    action?: string;
    nameSpace?: string;
    expiration: number;
    override_setting: {
        dateSearchType: string;
        absoluteDate: {
            startDatetime: string;
            stopDatetime: string;
        }
        relativeDate: {
            timeInMinutes: number;
        }
        project: string;
        logstore: string;
    }
}

type SubmitStatus = {
    statusCode: number;
    statusMessage: string;
  };