export type Call = {
  id: number;
  direct_link: string;
  direction: "inbound" | "outbound";
  status: "done" | "missed" | "ongoing";
  missed_call_reason: string | null;
  started_at: number;
  answered_at: number | "no_available_agent" | null;
  ended_at: number;
  duration: number;
  voicemail: string | null;
  recording: string | null;
  asset: string | null;
  raw_digits: string;
  user: User | null;
  contact: Contact | null;
  archived: boolean;
  assigned_to: number | null;
  transferred_by: number | null;
  transferred_to: number | null;
  cost: string;
  number: UserNumber;
  tags?: Tag[];
  comments?: CallComment[];
};

type Tag = {
  id: number
  created_at: number
  tagged_by: unknown
  name: string

}

type User = {
  id: number;
  direct_link: string;
  name: string;
  email: string;
  available: boolean;
  availability_status: "available" | "unavailable" | "busy";
  created_at: string; // ISO 8601 Date string
  time_zone: string;
  language: string;
}

type Contact = {
  id: number
  first_name: string
  last_name: string
  company_name: string
  phone_numbers: {
    id: number
    label: string,
    value: string
  }
}

export type CallComment = {
  id: number
  content: string
  posted_at: number
  posted_by: CommentAuthor | null
}

type CommentAuthor = {
  direct_link: string
  name: string
  email: string
  available: true
  availability_status: string
  created_at: string
}

type UserNumber = {
  id: number;
  direct_link: string;
  name: string;
  digits: string;
  created_at: string; // ISO 8601 Date string
  country: string;
  time_zone: string;
  open: boolean;
  availability_status: string; // Add specific statuses if known
  is_ivr: boolean;
  live_recording_activated: boolean;
  priority: string | null;
  messages: unknown; // Replace with proper type if structure is known
};
