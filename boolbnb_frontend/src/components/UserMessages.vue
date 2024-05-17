<template>
    <div class="messages-container fixed inset-0 w-full h-full flex items-center justify-center">
        <table class="table-auto bg-white">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>From</th>
                    <th>Message</th>
                    <th>Accomodation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td>Malcolm Lockyer</td>
                    <td>1961</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
export default {

}
</script>

<style scoped>
.messages-container {
    inset: 0;
    background-color: rgba(50, 50, 50, 0.7);
}
</style>