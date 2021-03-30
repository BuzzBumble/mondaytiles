export const getItemsForBoard = (id: number) => {
  let query = `
    query {
      boards (ids: [${id}]) {
        name
        items {
          name
          column_values {
            title
            text
          }
        }
      }
    }
  `

  return query;
}