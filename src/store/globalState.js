
import { reactive } from "vue";

export const globalState = reactive({
    dataSeats: [],
    ticket_overview: {},
    current_price: 0,
    increment_seat: 0,
    selectedSeatId: null,
    previousSeat: null,
    selectedSeatType: null,
   
})