import { Dayjs } from "dayjs";
import { Moment } from "moment-timezone";

interface DataType {
  type: string;
  ttl: string | number;
  value: string;
  action: string | null;
  namespace: string | null;
  ruleId: string;
  taskId: string;
  creationTime: number;
  destination: string;
  author: string | null;
  source: string | null;
}

type AuthVerifyResponse = {
  error?: string;
  data?: {
    valid: boolean;
  };
};

type FormType = {
  fileName: string;
  webbSourceType: string;
  formType: string;
  taskType: string;
  dateSearchType: string;
  timeType?: string;
};

type GeneratedSpl = {
  enable: boolean;
  spl: string;
  destination: Array<string>;
  action: string;
  nameSpace: string;
  expiration: number;
  ruleId: string;
  project?: string;
  logstore?: string;
  override_setting: {
    dateSearchType: string;
    absoluteDate: {
      startDatetime: string;
      stopDatetime: string;
    };
    relativeDate: {
      timeInMinutes: number;
    };
  };
  [x: string]: any;
};

type RawSpl = {
  searchStartTime?: Dayjs | string;
  searchEndTime?: Dayjs | string;
  searchTimeRange?: number;
  ruleId: string;
  spl: string;
  ttl: number;
  destination: Array<string>;
  action: string;
  nameSpace: stirng;
  project?: string;
  logstore?: string;
};

type SubmitStatus = {
  statusCode: number;
  statusMessage: string;
};

type WebbRuleItem = {
  fileName: string;
  scheduleIntervals: string;
  uploadTime: string;
};

type WebbRuleContent = {
  [x: string]: any;
};

type WebbBreakDownObj = {
  [x: string]: any;
};

type WebbFormData = {
  timeType?: string;
  fileName: string;
  webbSourceType: string;
  taskType: string;
  dateSearchType: string;
  scheduleIntervals: string;
  spl_config: Array<RawSpl>;
};

type WebbGlobalFields = {
  fileName: string;
  webbSourceType: string;
  formType: string;
  taskType: string;
  dateSearchType: string;
  scheduleIntervals: string;
};
