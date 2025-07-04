import formatTimestamp from './formatTimestamp'

describe('formatTimestamp', () => {
  it('returns date in expected format', () => {
    const result = formatTimestamp(1700000000)
    // Check the pattern rather than exact time
    expect(result).toMatch(/^[A-Za-z]{3,5} \d{1,2}(st|nd|rd|th) [A-Za-z]+ \d{4}, \d{2}:\d{2}$/)
  })

  it('correctly applies ordinal suffixes', () => {
    expect(formatTimestamp(0)).toMatch(/1st/)       // Jan 1st 1970
    expect(formatTimestamp(86400)).toMatch(/2nd/)   // Jan 2nd 1970
    expect(formatTimestamp(172800)).toMatch(/3rd/)  // Jan 3rd 1970
    expect(formatTimestamp(259200)).toMatch(/4th/)  // Jan 4th 1970
  })

  it('pads single-digit minutes', () => {
    // Any timestamp with single-digit minutes
    const result = formatTimestamp(1672531200) // Jan 1st 2023 00:00 in most zones
    expect(result).toMatch(/, 00:00$/)
  })

  it('uses correct day/month names', () => {
    // Jan 1st 1970 was a Thursday in most zones (🤞)
    expect(formatTimestamp(0)).toMatch(/Thurs 1st January 1970/)
  })
})