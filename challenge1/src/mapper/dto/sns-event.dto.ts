export class SnsEventDto {
  Records: Record[];
}

class Record {
  eventVersion: string;
  ses: Ses;
  eventSource: string;
}

class Ses {
  receipt: Receipt;
  mail: Mail;
}

class Mail {
  timestamp: Date;
  source: string;
  messageId: string;
  destination: string[];
  headersTruncated: boolean;
  headers: Header[];
  commonHeaders: CommonHeaders;
}

class CommonHeaders {
  returnPath: string;
  from: string[];
  date: string;
  to: string[];
  messageId: string;
  subject: string;
}

class Header {
  name: string;
  value: string;
}

class Receipt {
  timestamp: Date;
  processingTimeMillis: number;
  recipients: string[];
  spamVerdict: { status: string };
  virusVerdict: { status: string };
  spfVerdict: { status: string };
  dkimVerdict: { status: string };
  dmarcVerdict: { status: string };
  dmarcPolicy: string;
  action: Action;
}

class Action {
  type: string;
  topicArn: string;
}
