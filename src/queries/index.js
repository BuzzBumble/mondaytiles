import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();
const token = process.env.REACT_APP_API_TOKEN;
monday.setToken(token);

export const getBoard = (id) => {
  let query = `
    query ($boardIds: [Int]) {
      boards (ids: $boardIds) {
        columns {
          id
          type
          title
          settings_str
        }
        items {
          id
          name
          column_values {
            id
            type
            title
            text
            additional_info
          }
          group {
            id
            title
            color
          }
        }
      }
    }
  `

  return monday.api(query, { variables: { boardIds: [id] }});
}