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
  };
  
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
  } | null;
  
  type Contact = {
    // Define properties if details are available
  } | null;
  
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
  