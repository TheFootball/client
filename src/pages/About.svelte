<script>
import Text from "~/components/Text.svelte";

</script>

<div class="about">
    <div class="about__header">
        <Text color="orange" size={82}>About</Text>
    </div>
    <div class="about__content">
        <Text as="p">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </Text>
        <Text as="p">
            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
        </Text>
        <Text as="p">
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"  
        </Text>
    </div>
</div>

<style lang="scss">
    .about {
        width: 100%;
        height: 100vh;
        padding: 116px;
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("../assets/images/aboutBackground.svg");
    }

    .about__header {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .about__content {
        margin-top: 116px;
    }
</style>