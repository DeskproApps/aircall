import parsePhoneNumberFromString from "libphonenumber-js";

/**
 * Checks if a given phone number string is E.164 compliant.
 * 
 * @example
 * isE164Compliant('+14155552671') // true (Valid US number)
 *
 * @example
 * isE164Compliant('14155552671') // false (Missing '+')
 *
 * @example
 * isE164Compliant('+447777777777') // true (Valid UK number)
 */
export default function isE164Compliant(input: string): boolean {
  const phoneNumberMeta = parsePhoneNumberFromString(input)

  if (!phoneNumberMeta || !phoneNumberMeta.isValid()) {
    return false
  }

  const e164 = phoneNumberMeta.number

  return /^\+[1-9]\d{1,14}$/.test(e164)
}