import dayjs from "dayjs";

export function handleSearchQuery(data: any) {
  let str = "";
  const {
    value,
    ruleId,
    source,
    action,
    taskId,
    destination,
    type,
    creationSearchStartTime,
    creationSearchEndTime,
    ttlSearchEndTime,
    ttlSearchStartTime,
  } = data;

  if (value) {
    str += "&value=" + value;
  }
  if (source) {
    str += "&source=" + source;
  }
  if (action) {
    str += "&action=" + action;
  }
  if (taskId) {
    str += "&taskId=" + taskId;
  }
  if (ruleId) {
    str += "&ruleId=" + ruleId;
  }
  if (destination) {
    str +="&destination=" + destination;
  }
  if (type) {
    str += "&type=" + type;
  }
  if (creationSearchEndTime) {
    const startCreationTime = dayjs(creationSearchStartTime).unix();
    str += "&startCreationTime=" + startCreationTime;
  }

  if (creationSearchEndTime) {
    const endCreationTime = dayjs(creationSearchEndTime).unix();
    str += "&endCreationTime=" + endCreationTime;
  }

  if (ttlSearchStartTime) {
    const startTTL = dayjs(ttlSearchStartTime).unix();
    str += "&startTTL=" + startTTL;
  }

  if (ttlSearchEndTime) {
    const endTTL = dayjs(ttlSearchEndTime).unix();
    str += "&endTTL=" + endTTL;
  }

  return str;
}
