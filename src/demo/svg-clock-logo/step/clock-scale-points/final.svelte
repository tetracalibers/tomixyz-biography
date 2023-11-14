<script>
  import { cx, cy, r } from "../../config"
  import { calcArcLength, fitViewbox } from "../../utils"
</script>

<svg width="300" height="300" use:fitViewbox={{ padding: 10 }}>
  <!-- 時計の目盛り -->
  <g fill="none" stroke="black" stroke-linecap="round">
    <!-- 1分ごとの目盛り -->
    <circle cx={cx} cy={cy} r={r} stroke-width="4" stroke-dasharray={`0.01 ${calcArcLength(r, 6)}`}></circle>
    <!-- 5分ごとの目盛り -->
    <circle cx={cx} cy={cy} r={r} stroke-width="8" stroke-dasharray={`0.1 ${calcArcLength(r, 30)}`}></circle>
  </g>
</svg>
