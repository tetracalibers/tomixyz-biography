<script lang="ts">
  import { createTable, Render, Subscribe } from "svelte-headless-table"
  import { readable } from "svelte/store"

  interface Word {
    word: string
    meaning: string
    example_sentences: {
      en: string
      ja: string
    }[]
  }

  export let words: Word[]

  const table = createTable(readable(words))

  const columns = table.createColumns([
    table.column({
      accessor: "word",
      header: "Word"
    }),
    table.column({
      accessor: "meaning",
      header: "Meaning"
    }),
    table.column({
      accessor: "example_sentences",
      header: "Example"
    })
  ])

  const { headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns)
</script>

<table {...$tableAttrs}>
  <thead>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <th {...attrs}>
                <Render of={cell.render()} />
              </th>
            </Subscribe>
          {/each}
        </tr>
      </Subscribe>
    {/each}
  </thead>
  <tbody {...$tableBodyAttrs}>
    {#each $rows as row (row.id)}
      <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each row.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <td {...attrs}>
                <Render of={cell.render()} />
              </td>
            </Subscribe>
          {/each}
        </tr>
      </Subscribe>
    {/each}
  </tbody>
</table>
