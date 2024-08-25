<script lang="ts">
  import { createRender, createTable, Render, Subscribe } from "svelte-headless-table"
  import { addSubRows, addExpandedRows } from "svelte-headless-table/plugins"
  import { readable } from "svelte/store"
  import ExpandIndicator from "./ExpandIndicator.svelte"

  interface Word {
    en: string
    ja: string
    example_sentences: {
      en: string
      ja: string
    }[]
  }

  export let words: Word[]

  const table = createTable(readable(words), {
    sub: addSubRows({
      children: "example_sentences"
    }),
    expand: addExpandedRows()
  })

  const columns = table.createColumns([
    table.display({
      id: "expanded",
      header: "",
      cell: ({ row }, { pluginStates }) => {
        const { isExpanded, canExpand, isAllSubRowsExpanded } = pluginStates.expand.getRowState(row)
        return createRender(ExpandIndicator, {
          depth: row.depth,
          isExpanded,
          canExpand,
          isAllSubRowsExpanded
        })
      }
    }),
    table.column({
      accessor: "en",
      header: "English"
    }),
    table.column({
      accessor: "ja",
      header: "Japanese"
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
