const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const libReceiver = require('lib')({token: process.env.STDLIB_SECONDARY_TOKEN});

/**
* An HTTP endpoint that copies rows from one Airtable Base's Table to Another
* @param {string} sourceTableName The source name of the table you're copying from
* @param {string} destinationTableName The destination name of the table you're copying to
* @param {integer} count The total number of results to copy
* @param {integer} batchSize The number of results to copy at once
* @returns {string} copyResult The result of the copy operation
*/
module.exports = async (
  sourceTableName = 'Source Table',
  destinationTableName = 'Destination Table',
  count,
  batchSize = 10
) => {

  let t0 = new Date().valueOf();
  let n = 0;

  while (n < count) {

    let b = Math.min(count - n, batchSize);

    let selectResult = await lib.airtable.query['@0.4.2'].select({
      table: sourceTableName,
      where: [
        {
          copied: null
        }
      ],
      limit: {
        count: b
      }
    });

    console.log(selectResult);

    let insertResult = await libReceiver.airtable.query['@0.4.2'].insert({
      table: destinationTableName,
      fieldsets: selectResult.rows.map(row => {
        delete row.fields.copied;
        return row.fields;
      })
    });

    let updateResult = await lib.airtable.query['@0.4.2'].update({
      table: sourceTableName,
      where: [
        {
          copied: null
        }
      ],
      limit: {
        count: b
      },
      fields: {
        copied: true
      }
    });

    n += b;

  }

  let t = new Date().valueOf() - t0;
  return `${n} rows copied from ${sourceTableName} to ${destinationTableName}. Took ${t}ms.`;

};
