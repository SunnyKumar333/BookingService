import {confirmBooking, createBooking,createIdempotantyKey, finilizeIdempotantyKey, getIdempotantyKeyWithLock} from "../reposatory/booking.reposatory";
import {CreateBookingDTO} from "../dto/booking.dto";
import generateIdepotanteyKey from "../utils/helpers/generateIdepotanteyKey";
import {BadRequestError, InternalServerError} from "../utils/errors/app.error";
import PrismaClient from "../prisma/client";
import { redlock} from "../config/redis.config";
import { serverConfig } from "../config";



export async function createBookingService(createBookingDTO:CreateBookingDTO){
    const ttl=Number(serverConfig.LOCK_TTL);
    const bookingResource=`hotelid:${createBookingDTO.hotelId}`;
    // console.log( "🤣",bookingResource,ttl);
    try{
        await redlock.acquire([bookingResource],ttl);
        
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
    catch(error){

            throw new InternalServerError("This resourse is busy, you can try it later");
            
        }
      

}

export async function finializeBookingService(key:string) {
        return await PrismaClient.$transaction(async (txn)=>{
        const idempotantyKey= await getIdempotantyKeyWithLock(txn,key);
        if(!idempotantyKey || !idempotantyKey.bookingId){
            throw new BadRequestError("idempotantyKey not found");
        }
        else if(idempotantyKey.finalized){
            throw new BadRequestError("idempotantyKey is already finilized");
        }
        const booking=await confirmBooking(txn,idempotantyKey.bookingId);
        await finilizeIdempotantyKey(txn,key);
        return booking;
    })
    
}