
// HTTPS API
import https from 'https'
import { encode as qen } from 'querystring'

/**
 * Executes an HTTP request
 * @param {string | URL} url The url
 * @returns {Promise<any>} The response
 */
export const get = (url: string | URL, { method = "GET", headers, data, params }: RequestParams = {}): Promise<any> => new Promise((res, rej) => {

  // Starts a new HTTPS request
  const req = https.request(url + (params ? (Array.isArray(params) && params.length > 0 ? q([params[0], ...params.slice(1)]) : q(params)) : ""), { method, headers }, r => {

    // Stores data
    let data = ''

    // Stores data chunks
    r.on('data', chunk => data += chunk)

    // Sends response on end of request
    r.on('end', () => {

      // If the format was JSON, parse(with test) and return
      if (/^application\/json/.test(r.headers['content-type']))
        try { return res(JSON.parse(data)) } catch (err) { console.log(`JSON Parse on content of type ${r.headers['content-type']} failed.\nError: ${err}\nData: ${data}`) }

      // Sends raw data as response if no json
      res(data)
    })
  }).on('error', rej)

  // If there is data to be sent, send it
  if (data) req.write(data)

  // Sends the request
  req.end()
})

/**
 * Makes a namespace 
 * @param {string} url The namespace url
 * @param {{ query?: string }} [params] Options ig
 * @returns {(params: string, { query: string }) => Promise<any>} The function that does the reqs
 */
export const namespace = (url: string, { query }: { query?: { [key: string]: string }, headers?: Record<string, string> } = {}): RequestNamepsace => {

  // Returns a function that does the reqs
  return (path: string, { params }) => get(url + path, { params: [params] })
}


/**
 * Purifies an object, deleting all undefined props.
 * @param {{ [key: string]: any }} obj The object that you want to purify
 * @returns {{ [key: string]: any }} The purified object
 */
const purify = (obj: O<any>) => {
  let ret: { [ x: string ]: any }= {};
  for(let i in obj)
    if(i !== undefined) ret[i] = obj[i];
  return ret;
}

/**
 * Parses a bunch of objects, mashes them together, and makes a query string
 * @param {{ [key: string]: any }} original First query to parse
 * @param {{ [key: string]: any }[]} rest Other queries to parse
 * @returns {string} The query
 */
const q = (original: any, ...rest: any[]) => qen(purify(Object.assign(original, ...rest)))