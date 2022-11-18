/* TODO: JSFIX could not patch the breaking change:
D3 5.0 deprecates and removes the d3-queue module 
Suggested fix: As an alternative to this module you can either use Promise.all to run multiple promises and process the result or another external module like `p-queue`.
Promise.all is rather simple to use and simply requires you to run it with an array of each promise currently parsed to a .defer() method, and then instead of queue.await you use the .then() method on the returned promise.
For an example and documentation see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all */
import { queue } from 'd3-queue';
import {csv, tsv, json} from 'd3-request'

export default function(files, cb){
  var q = queue()
  files.forEach(function(d){
    var type = d.split('.').reverse()[0]

    var loadFn = {csv: csv, tsv: tsv, json: json}[type]
    if (!loadFn) return cb(new Error('Invalid type', d))
    q.defer(loadFn, d) 
  })
  q.awaitAll(cb)
}