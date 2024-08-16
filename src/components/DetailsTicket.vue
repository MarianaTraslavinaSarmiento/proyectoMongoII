<script setup>
</script>

<template>
    <div class="order-summary">
        <div class="order-number">
            <span style="font-size: 13px;" class="label">ORDER NUMBER : </span>
            <span style="font-size: 13px; color:var(--color-white)" class="value">123456786</span>
        </div>


        <div class="price-item">
            <span style="color: var(--color-textGray)" class="ticket__count">1 TICKET</span>
            <span class="seat__number">$1,99 x 1</span>
        </div>

        <hr style="height: 8px;">

        <div class="price-item">
            <span class="item-name">REGULAR SEAT</span>
            <span class="item-price">$24,99 x 3</span>
        </div>

        <hr>
    </div>
</template>

<style scoped>
.order-summary {
    color: #999999;
    padding: 20px;
    font-weight: bold
}

.order-number {
    margin-bottom: 20px;
}



.ticket-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-white)
}

hr {
    border: none;
    border-top: 1px solid #333333;
    margin: 15px 0;
}

.price-item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 16px;
    color: var(--color-textGray)
}

</style>