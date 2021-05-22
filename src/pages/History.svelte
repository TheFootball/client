<script>
    import { onMount } from "svelte";
    import HistoryList from "~/components/HistoryList.svelte";
    import { api } from "~/utils/api";
    import { HISTORY } from "~/utils/endpoints";

    let list = [];

    onMount(async () => {
        const {data} = await api.get(HISTORY);
        list = data.list;
    })
</script>

<div class="history-wrapper">
    <h1>History</h1>
    <div class="history-list">
        <HistoryList list={list} />
    </div>
</div>

<style lang="scss">
    .history-wrapper {
        width: 100%;
        height: 100vh;
        display: flex;
    }
</style>