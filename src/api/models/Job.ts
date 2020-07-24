export interface Job {
    name: string;
    description?: string;
    schedule: string;
    timeZone?: string;
    userUpdateTime?: string;
    state?: State;
    status?: Status;
    scheduleTime?: string;
    lastAttemptTime?: string;
    retryConfig?: RetryConfig;
    attemptDeadline?: string;
    pubsubTarget?: PubsubTarget;
    httpTarget?: HttpTarget;
}

export enum State {
    STATE_UNSPECIFIED = 'state unspecified',
    ENABLED = 'enabled',
    PAUSED = 'paused',
    DISABLED = 'disabled',
    UPDATE_FAILED = 'update failed',
}

export interface Status {
    code: number;
    message: string;
    details: object[];
}

export interface RetryConfig {
    retryCount: number;
    maxRetryDuration: string;
    minBAckoffDuration: string;
    maxBackoffDuration: string;
    maxDoublings: number;
}

export interface PubsubTarget {
    topicName: string;
    data: string;
    attribute?: Map<string, string>;
}

export interface HttpTarget {
  uri: string;
  body?: string;
  httpMethod: httpMethod;
}

export enum httpMethod {
  'GET',
  'PUT',
  'DELETE',
  'POST',
}
