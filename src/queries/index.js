import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

export const getBoard = (id) => {
  let query = `
    query ($boardIds: [Int]) {
      boards (ids: $boardIds) {
        columns {
          id
          type
        }
        items {
          id
          name
          column_values {
            id
            type
            title
            text
          }
          group {
            id
            title
          }
        }
      }
    }
  `

  return monday.api(query, { variables: { boardIds: [id] }});
}