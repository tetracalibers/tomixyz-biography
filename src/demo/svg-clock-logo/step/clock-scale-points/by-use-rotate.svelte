<script>
  import { fitViewbox } from "../../utils"

  // 中心(cx, cy),半径rの円上に点を配置する
  const cx = 300
  const cy = 300
  const r = 200
</script>

<svg width="300" height="300" use:fitViewbox={{ padding: 10 }}>
  <defs>
    <circle id="point-5min" cx={r} cy="0" r="8" />
    <circle id="point-1min" cx={r} cy="0" r="4" />
  </defs>

  <!-- 時計の目盛りを並べる円 -->
  <circle cx={cx} cy={cy} r={r} fill="none" stroke="black" />

  <!-- 時計の目盛り -->
  <g transform={`translate(${cx}, ${cy})`}>
    <!-- 5分ごとの目盛り -->
    <g fill-opacity="0.8" fill="#F675A8">
      {#each Array.from({ length: 12 }) as _, i}
        <use href="#point-5min" transform={`rotate(${i * 30})`} />
      {/each}
    </g>

    <!-- 1分ごとの目盛り -->
    <g fill="#95BDFF">
      {#each Array.from({ length: 60 }) as _, i}
        {#if i % 5 !== 0}
          <use href="#point-1min" transform={`rotate(${i * 6})`} />
        {/if}
      {/each}
    </g>
  </g>
</svg>
