<script setup>


</script>

<template>
    <section class="calendar__functions">

        <div class="days__week">
            <div class="day__card selected">
                <span class="day">Mon</span>
                <span class="date">17</span>
            </div>
            <div class="day__card">
                <span class="day">Tue</span>
                <span class="date">18</span>
            </div>
            <div class="day__card">
                <span class="day">Wed</span>
                <span class="date">19</span>
            </div>
            <div class="day__card">
                <span class="day">Thu</span>
                <span class="date">20</span>
            </div>
            <div class="day__card">
                <span class="day">Fri</span>
                <span class="date">21</span>
            </div>
            <div class="day__card">
                <span class="day">Sat</span>
                <span class="date">21</span>
            </div>
            <div class="day__card">
                <span class="day">Sun</span>
                <span class="date">21</span>
            </div>
        </div>

        <div class="date__available">

            <div class="showtime__card selected">
                <span class="time">13:00</span>
                <span class="price">$5.25 •3D</span>
            </div>
            <div class="showtime__card">
                <span class="time">15:45</span>
                <span class="price">$5.99 •3D</span>
            </div>
            <div class="showtime__card">
                <span class="time">18:50</span>
                <span class="price">$4.50 •3D</span>
            </div>
            <div class="showtime__card">
                <span class="time">20:30</span>
                <span class="price">$6.50 •3D</span>
            </div>
            <div class="showtime__card">
                <span class="time">20:30</span>
                <span class="price">$6.50 •3D</span>
            </div>

        </div>

        <p style="padding: 20px 30px 15px 30px; color: var(--color-gray)" >¡Has seleccionado un asiento preferencial!</p>

        <div class="booking__seat">

            <div class="total__price">
                <p>Price</p>
                <p>$40.000</p>
            </div>
            <button>Buy Ticket</button>
        </div>

    </section>
</template>

<style scoped>

.booking__seat{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px 15px 15px;
    color: var(--color-white);
    margin-top: 5px;
    margin-right: 30px;
}

button {

    background-color: var(--color-red);
    color: var(--color-white);
    width: 65%;
    padding: 15px 0px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
}

.calendar__functions {
    padding: 25px 0px 15px 30px;
}

.days__week {
    display: flex;
    overflow-x: auto;
    padding: 10px;
    gap: 15px;
    scrollbar-width: none;
}

.day__card {
    display: flex;
    background-color: var(--color-lightGray);
    color:var(--color-black);
    padding: 15px;
    text-align: center;
    flex-direction: column;
    border-radius: 10px;
    min-width: 60px;
    cursor: pointer;

}

.day__card .day {
    font-size: 0.8em;
    margin-bottom: 10px;

}

.day__card .date {
    font-size: 24px;
    font-weight: bold;
}

.date__available {
    display: flex;
    overflow-x: auto;
    padding: 10px 0px 0px 10px;
    gap: 20px;
    scrollbar-width: none;
}

.showtime__card {
  background-color: var(--color-lightGray);
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 10px;
  flex-shrink: 0;
  min-width: 90px;
  height: 70px;
  justify-content: center;
}

.showtime__card.selected,
.day__card.selected,
.date__card.selected {
  background-color: var(--color-red);
  color: var(--color-white);
}

.showtime__card .time {
  display: block;
  font-weight: bold;
  font-size: 18px;
}

.showtime__card .price {
  font-size: 14px;
  font-weight: normal;
}


</style>