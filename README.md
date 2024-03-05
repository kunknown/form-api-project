# form-api-project

## Features

NOTE: `status` query param is not included as there was no clarity on what fields represent the `in_progress` or `finished` status.

### Sorting
Ascending order (oldest first) - 
Descending order (newest first) - /cLZojxk94ous/filteredResponses?asc=desc

### Date Range Filter
Both beforeDate & afterDate - /cLZojxk94ous/filteredResponses?beforeDate='2024-02-24T00:00:00.000Z'&afterDate='2024-06-24T00:00:00.000Z'
Only beforeDate - /cLZojxk94ous/filteredResponses?beforeDate='2024-02-24T00:00:00.000Z'
Only afterDate - /cLZojxk94ous/filteredResponses?afterDate='2024-02-24T00:00:00.000Z'

### Offset
Offset by 3 - /cLZojxk94ous/filteredResponses?offset=3

### Limit
Limit by 5 - /cLZojxk94ous/filteredResponses?limit=5

### Edit Link
Add Edit Link - /cLZojxk94ous/filteredResponses?includeEditLink=true

### Filters
Filter by check-in date before June 1, 2024 UTC - /cLZojxk94ous/filteredResponses?filters=dSRAe3hygqVwTpPK69p5tdless_than'2024-06-01T05:00:00.000Z'
Filter by employee count greater than 2 - /cLZojxk94ous/filteredResponses?filters=fFnyxwWa3KV6nBdfBDCHEAgreater_than2
Filter by Email not empty - /cLZojxk94ous/filteredResponses?filters=kc6S6ThWu3cT5PVZkwKUg4does_not_equal
Filter by Name is Jhonny - /cLZojxk94ous/filteredResponses?filters=bE2Bo4cGUv49cjnqZ4UnkWequalsjhonny