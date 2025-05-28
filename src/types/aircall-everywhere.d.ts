declare module 'aircall-everywhere' {
  export default class AircallPhone {
    constructor(options: AircallPhoneOptions);
    isLoggedIn(callback: (result: boolean) => void): void;
    on<E extends keyof AircallEventMap>(event: E, callback: (event: AircallEventMap[E]) => void): void;
    send(event: 'dial_number', payload: { phone_number: string }, callback: (success: boolean, data?: unknown) => void): void;
  }

  export type AircallPhoneOptions = {
    domToLoadPhone: string;
    onLogin: (settings: AircallPhoneSettings) => void;
    onLogout: () => void;
    integrationToLoad?: string,
    size: 'big' | 'small' | 'auto',
  }

  export type AircallPhoneSettings = {
    user: {
      email: string;
      first_name: string;
      last_name: string;
      company_name: string;
    };
    settings: Record<string, unknown>;
  }

  export type AircallEventIncomingCall = {
    from: string,
    to: string,
    call_id: number
  }

  export type AircallEventCallEndRingtone = {
    answer_status: 'answered' | 'disconnected' | 'refused',
    call_id: number,
  }

  export type AircallEventOutgoingCall = {
    from: string,
    to: string,
    call_id: number,
  }

  export type AircallEventOutgoingAnswered = {
    call_id: number,
  }

  export type AircallEventCallEnded = {
    duration: number,
    call_id: number
  }

  export type AircallEventCommentSaved = {
    comment: string,
    call_id: number,
  }

  export type AircallEventExternalDial = {
    phone_number: string,
  }

  export type AircallEventPowerdialerUpdated = {
    // no content
  }

  export interface AircallEventMap {
    incoming_call: AircallEventIncomingCall;
    call_end_ringtone: AircallEventCallEndRingtone;
    outgoing_call: AircallEventOutgoingCall;
    outgoing_answered: AircallEventOutgoingAnswered;
    call_ended: AircallEventCallEnded;
    comment_saved: AircallEventCommentSaved;
    external_dial: AircallEventExternalDial;
    powerdialer_updated: AircallEventPowerdialerUpdated;
  }
}