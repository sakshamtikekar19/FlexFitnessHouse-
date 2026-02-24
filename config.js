// Optional: set this to your JSONBin "latest" URL so the site loads pricing & trainers from the cloud.
// Leave empty to use data.json from your server.
var FLEX_DATA_URL = 'https://api.jsonbin.io/v3/b/6990ba6ad0ea881f40ba88da/latest?meta=false';
// If your bin is private, either: (1) Make bin public in Admin → Publish to web → Make bin public, OR
// (2) set your JSONBin Master Key here so the site can read (keep this file private or use a read-only key if available):
// var FLEX_DATA_READ_KEY = 'your-key';
var FLEX_DATA_READ_KEY = '';

// Visitor-submitted reviews (JSONBin): create a second bin at jsonbin.io with content {"reviews":[]}, make it public, copy its "latest" URL below.
// Then deploy the repo to Vercel and set env vars JSONBIN_SUBMITTED_BIN_ID + JSONBIN_MASTER_KEY; set SUBMIT_REVIEW_API_URL to your Vercel URL + /api/submit-review
var SUBMITTED_REVIEWS_BIN_URL = 'https://api.jsonbin.io/v3/b/699dad8bd0ea881f40d5163b/latest?meta=false';
var SUBMIT_REVIEW_API_URL = 'https://flex-fitness-house.vercel.app/api/submit-review';
