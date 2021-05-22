<script>
import { unixSecondToDate, getCalendar } from "~/utils/time";
import Text from "./Text.svelte";

    export let list;
</script>

<ul>
    {#each list as l}
        <li><Text>{`${l.sk} / winner: ${l.winner} / host: ${l.host} / createdAt: ${getCalendar(unixSecondToDate(l.createdAt))}`}</Text></li>
    {/each}
</ul>