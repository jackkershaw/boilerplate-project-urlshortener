TODO

user journey and how to fulfill it:

- user enters url into box, clicks Post url
- url is posted to /api/shorturl and goes to mongodb database
- get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
- When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
- If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }

HINT: Also, you can use the function dns.lookup(host, cb) from the dns core module to verify a submitted URL.
