# form-api-project

## Features

NOTE: `status` query param is not included as I had no clarity on which fields represent the `in_progress` or `finished` status.

### Sorting
- Ascending order (oldest first) - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses
- Descending order (newest first) - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?sort=desc

### Date Range Filter
- Both beforeDate & afterDate - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?beforeDate=2024-06-24T00:00:00.000Z&afterDate=2024-03-01T00:00:00.000Z
- Only beforeDate - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?beforeDate=2024-03-01T00:00:00.000Z
- Only afterDate - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?afterDate=2024-03-01T00:00:00.000Z

### Offset
- Offset by 3 - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?offset=3

### Limit
- Limit by 5 - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?limit=5

### Edit Link
- Add Edit Link - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?includeEditLink=true

### Filters
- Filter by check-in date before June 1, 2024 - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?filters=dSRAe3hygqVwTpPK69p5tdless_than2024-06-01T00:00:00.000Z
- Filter by employee count greater than 2 - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?filters=fFnyxwWa3KV6nBdfBDCHEAgreater_than2
- Filter by Email not empty - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?filters=kc6S6ThWu3cT5PVZkwKUg4does_not_equalnull
- Filter by Name is Jhonny - https://form-api-project.onrender.com/cLZojxk94ous/filteredResponses?filters=bE2Bo4cGUv49cjnqZ4UnkWequalsjohnny

#### Feel free to mix & match any of the query parameters
