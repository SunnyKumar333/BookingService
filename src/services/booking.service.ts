import {confirmBooking, createBooking,createIdempotantyKey, finilizeIdempotantyKey, getIdempotantyKey} from "../reposatory/booking.reposatory";
import {CreateBookingDTO} from "../dto/booking.dto"
import generateIdepotanteyKey from "../utils/helpers/generateIdepotanteyKey";
import {BadRequestError} from "../utils/errors/app.error"


export async function createBookingService(createBookingDTO:CreateBookingDTO){
    const booking=await createBooking({
        userId:createBookingDTO.userId,
        hotelId:createBookingDTO.hotelId,
        bookingAmmount:createBookingDTO.bookingAmount,
        totalGuests:createBookingDTO.totalGuest
    });

    const idempotantyKey=await generateIdepotanteyKey();
    await createIdempotantyKey(idempotantyKey,booking.id);

    return {
        bookingId:booking.id,
        idempotantyKey
    }

}

export async function finializeBookingService(key:string) {
    const idempotantyKey= await getIdempotantyKey(key);
    if(!idempotantyKey){
        throw new BadRequestError("idempotantyKey not found");
    }
    else if(idempotantyKey.finalized){
        throw new BadRequestError("idempotantyKey is already finilized");
    }
    const booking=await confirmBooking(idempotantyKey.bookingId);
    await finilizeIdempotantyKey(key);
    return booking;
}